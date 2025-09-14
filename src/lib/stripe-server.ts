import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Your server-only Stripe helper functions, e.g., createPaymentIntent, processRefund, etc:

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
      currency: 'usd', // or from your config if dynamic
      automatic_payment_methods: { enabled: true },
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

// Similarly move all other Stripe secret-key usage functions here...
