import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Client-side Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#3b82f6',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: '8px',
    },
  },
  clientSecret: '', // Will be set dynamically
}

// Fare calculation constants
export const FARE_CONFIG = {
  BASE_FARE: {
    economy: 2.50,
    comfort: 3.50,
    premium: 5.00,
    suv: 4.00,
  },
  PRICE_PER_KM: {
    economy: 1.20,
    comfort: 1.50,
    premium: 2.00,
    suv: 1.75,
  },
  PRICE_PER_MINUTE: {
    economy: 0.25,
    comfort: 0.30,
    premium: 0.40,
    suv: 0.35,
  },
  SURGE_MULTIPLIERS: {
    low: 1.0,
    medium: 1.5,
    high: 2.0,
    peak: 2.5,
  },
  BOOKING_FEE: 1.00,
  TAX_RATE: 0.08, // 8%
  CURRENCY: 'usd',
}

// Calculate ride fare
export function calculateFare(
  distanceKm: number,
  durationMinutes: number,
  vehicleType: keyof typeof FARE_CONFIG.BASE_FARE,
  surgeMultiplier: number = 1.0
) {
  const baseFare = FARE_CONFIG.BASE_FARE[vehicleType]
  const distanceFare = distanceKm * FARE_CONFIG.PRICE_PER_KM[vehicleType]
  const timeFare = durationMinutes * FARE_CONFIG.PRICE_PER_MINUTE[vehicleType]
  
  const subtotal = (baseFare + distanceFare + timeFare) * surgeMultiplier
  const bookingFee = FARE_CONFIG.BOOKING_FEE
  const taxes = subtotal * FARE_CONFIG.TAX_RATE
  const totalAmount = subtotal + bookingFee + taxes

  return {
    baseFare: Math.round(baseFare * 100) / 100,
    distanceFare: Math.round(distanceFare * 100) / 100,
    timeFare: Math.round(timeFare * 100) / 100,
    surgeFare: Math.round((subtotal - (baseFare + distanceFare + timeFare)) * 100) / 100,
    bookingFee,
    taxes: Math.round(taxes * 100) / 100,
    subtotal: Math.round(subtotal * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    surgeMultiplier,
    currency: FARE_CONFIG.CURRENCY,
  }
}

// Create payment intent
export async function createPaymentIntent(
  amount: number, // in cents
  metadata: {
    rideId: string
    riderId: string
    driverId?: string
  }
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: FARE_CONFIG.CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata,
      description: `Creative Ride - ${metadata.rideId}`,
    })

    return {
      success: true,
      paymentIntent,
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Confirm payment
export async function confirmPayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    return {
      success: true,
      paymentIntent,
      status: paymentIntent.status,
    }
  } catch (error) {
    console.error('Error confirming payment:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Cancel payment intent
export async function cancelPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId)
    
    return {
      success: true,
      paymentIntent,
    }
  } catch (error) {
    console.error('Error canceling payment:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Create customer
export async function createStripeCustomer(
  email: string,
  name: string,
  userId: string
) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    })

    return {
      success: true,
      customer,
    }
  } catch (error) {
    console.error('Error creating customer:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Process refund
// Fix: Use Stripe's RefundCreateParams.Reason type
export async function processRefund(
  paymentIntentId: string,
  amount?: number,
  reason?: Stripe.RefundCreateParams.Reason // this restricts to allowed values
) {
  try {
    const params: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    }

    if (amount) params.amount = amount
    if (reason) params.reason = reason

    const refund = await stripe.refunds.create(params)

    return {
      success: true,
      refund,
    }
  } catch (error) {
    console.error('Error processing refund:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Webhook signature verification
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event | null {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return null
  }
}

// Get vehicle type display info
export function getVehicleTypeInfo(vehicleType: keyof typeof FARE_CONFIG.BASE_FARE) {
  const info = {
    economy: {
      name: 'Economy',
      description: 'Affordable rides for everyday trips',
      icon: '🚗',
      capacity: '1-4 passengers',
      estimatedTime: '2-5 min',
    },
    comfort: {
      name: 'Comfort',
      description: 'Newer cars with extra legroom',
      icon: '🚙',
      capacity: '1-4 passengers',  
      estimatedTime: '3-7 min',
    },
    premium: {
      name: 'Premium',
      description: 'High-end vehicles and top drivers',
      icon: '🏎️',
      capacity: '1-4 passengers',
      estimatedTime: '5-10 min',
    },
    suv: {
      name: 'SUV',
      description: 'Extra space for groups and luggage',
      icon: '🚐',
      capacity: '1-6 passengers',
      estimatedTime: '4-8 min',
    },
  }

  return info[vehicleType]
}