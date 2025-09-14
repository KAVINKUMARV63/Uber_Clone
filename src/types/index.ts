import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn - helper to merge and conditionally join class names (Tailwind-friendly)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// JSON type for generic JSON values
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

// Supabase database schema typing
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
            id: string
          clerk_id: string
          email: string
          first_name: string
          last_name: string
          phone_number: string | null
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          first_name: string
          last_name: string
          phone_number?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          first_name?: string
          last_name?: string
          phone_number?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      drivers: {
        Row: {
          id: string
          user_id: string
          license_number: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_color: string
          license_plate: string
          vehicle_type: 'economy' | 'comfort' | 'premium' | 'suv'
          rating: number
          total_rides: number
          is_active: boolean
          is_available: boolean
          current_latitude: number | null
          current_longitude: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          license_number: string
          vehicle_make: string
          vehicle_model: string
          vehicle_year: number
          vehicle_color: string
          license_plate: string
          vehicle_type: 'economy' | 'comfort' | 'premium' | 'suv'
          rating?: number
          total_rides?: number
          is_active?: boolean
          is_available?: boolean
          current_latitude?: number | null
          current_longitude?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          license_number?: string
          vehicle_make?: string
          vehicle_model?: string
          vehicle_year?: number
          vehicle_color?: string
          license_plate?: string
          vehicle_type?: 'economy' | 'comfort' | 'premium' | 'suv'
          rating?: number
          total_rides?: number
          is_active?: boolean
          is_available?: boolean
          current_latitude?: number | null
          current_longitude?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      rides: {
        Row: {
          id: string
          rider_id: string
          driver_id: string | null
          pickup_latitude: number
          pickup_longitude: number
          pickup_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          dropoff_address: string
          status: 'requested' | 'driver_assigned' | 'driver_arrived' | 'in_progress' | 'completed' | 'canceled'
          vehicle_type: 'economy' | 'comfort' | 'premium' | 'suv'
          estimated_duration: number
          estimated_distance: number
          actual_duration: number | null
          actual_distance: number | null
          base_fare: number
          distance_fare: number
          time_fare: number
          surge_multiplier: number
          total_fare: number
          payment_status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
          stripe_payment_intent_id: string | null
          rating: number | null
          review: string | null
          requested_at: string
          accepted_at: string | null
          picked_up_at: string | null
          completed_at: string | null
          canceled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          rider_id: string
          driver_id?: string | null
          pickup_latitude: number
          pickup_longitude: number
          pickup_address: string
          dropoff_latitude: number
          dropoff_longitude: number
          dropoff_address: string
          status?: 'requested' | 'driver_assigned' | 'driver_arrived' | 'in_progress' | 'completed' | 'canceled'
          vehicle_type: 'economy' | 'comfort' | 'premium' | 'suv'
          estimated_duration: number
          estimated_distance: number
          actual_duration?: number | null
          actual_distance?: number | null
          base_fare: number
          distance_fare: number
          time_fare: number
          surge_multiplier?: number
          total_fare: number
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
          stripe_payment_intent_id?: string | null
          rating?: number | null
          review?: string | null
          requested_at?: string
          accepted_at?: string | null
          picked_up_at?: string | null
          completed_at?: string | null
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          rider_id?: string
          driver_id?: string | null
          pickup_latitude?: number
          pickup_longitude?: number
          pickup_address?: string
          dropoff_latitude?: number
          dropoff_longitude?: number
          dropoff_address?: string
          status?: 'requested' | 'driver_assigned' | 'driver_arrived' | 'in_progress' | 'completed' | 'canceled'
          vehicle_type?: 'economy' | 'comfort' | 'premium' | 'suv'
          estimated_duration?: number
          estimated_distance?: number
          actual_duration?: number | null
          actual_distance?: number | null
          base_fare?: number
          distance_fare?: number
          time_fare?: number
          surge_multiplier?: number
          total_fare?: number
          payment_status?: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled'
          stripe_payment_intent_id?: string | null
          rating?: number | null
          review?: string | null
          requested_at?: string
          accepted_at?: string | null
          picked_up_at?: string | null
          completed_at?: string | null
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}


// Format currency
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}


// Format date
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}


// Format time
export function formatTime(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}


// Format duration
export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }
  return `${remainingMinutes}m`
}


// Format distance
export function formatDistance(meters: number) {
  const km = meters / 1000
  if (km < 1) {
    return `${Math.round(meters)} m`
  }
  return `${km.toFixed(1)} km`
}


// Calculate distance between two points (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // Distance in meters
}


// Generate unique ID
export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}


// Debounce function
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}


// Throttle function
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}


// Validate phone number (basic)
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}


// Validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}


// Get time ago
export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) {
    return 'just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else {
    return formatDate(date, { month: 'short', day: 'numeric', year: 'numeric' })
  }
}


// Format phone number
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}


// Generate avatar initials
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}


// Get status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    requested: 'bg-blue-100 text-blue-800',
    driver_assigned: 'bg-yellow-100 text-yellow-800',
    driver_arrived: 'bg-orange-100 text-orange-800',
    in_progress: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
    processing: 'bg-blue-100 text-blue-800',
    succeeded: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  }
  
  return colors[status] || 'bg-gray-100 text-gray-800'
}


// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}


// Get vehicle type emoji
export function getVehicleTypeEmoji(vehicleType: string): string {
  const emojis: Record<string, string> = {
    economy: '🚗',
    comfort: '🚙', 
    premium: '🏎️',
    suv: '🚐'
  }
  
  return emojis[vehicleType] || '🚗'
}


// Sleep function for delays
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}


// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy text: ', error)
    return false
  }
}


// Parse error message
export function parseError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return 'An unknown error occurred'
}


// Check if coordinates are valid
export function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    !isNaN(lat) &&
    !isNaN(lng)
  )
}


// Get browser location
export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'))
      return
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    })
  })
}


// Format address
export function formatAddress(
  address: string,
  city?: string,
  state?: string,
  zipCode?: string
): string {
  const parts = [address]
  if (city) parts.push(city)
  if (state) parts.push(state)
  if (zipCode) parts.push(zipCode)
  
  return parts.join(', ')
}


// Check if string is empty or whitespace
export function isEmpty(str: string): boolean {
  return !str || str.trim().length === 0
}


// Safe JSON parse
export function safeJsonParse<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return defaultValue
  }
}


// Generate random color
export function getRandomColor(): string {
  const colors = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308',
    '#84CC16', '#22C55E', '#10B981', '#14B8A6',
    '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
    '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
  ]
  
  return colors[Math.floor(Math.random() * colors.length)]
}


// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString()
}
