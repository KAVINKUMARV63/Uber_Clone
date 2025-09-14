import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind CSS classes intelligently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number as currency string, e.g. $12.34
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

// Format a date as "X minutes/hours/days ago"
export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`

  return past.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Client-side Stripe configuration only: publishable key and appearance
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
  clientSecret: '', // To be filled dynamically client-side
}

// Fare config and fare calculation functions here...
export const FARE_CONFIG = {
  BASE_FARE: {
    economy: 2.5,
    comfort: 3.5,
    premium: 5,
    suv: 4,
  },
  PRICE_PER_KM: {
    economy: 1.2,
    comfort: 1.5,
    premium: 2,
    suv: 1.75,
  },
  PRICE_PER_MINUTE: {
    economy: 0.25,
    comfort: 0.3,
    premium: 0.4,
    suv: 0.35,
  },
  SURGE_MULTIPLIERS: {
    low: 1,
    medium: 1.5,
    high: 2,
    peak: 2.5,
  },
  BOOKING_FEE: 1,
  TAX_RATE: 0.08,
  CURRENCY: 'usd',
}

export function calculateFare(
  distanceKm: number,
  durationMinutes: number,
  vehicleType: keyof typeof FARE_CONFIG.BASE_FARE,
  surgeMultiplier: number = 1
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

// Add other safe pure utility functions as needed


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