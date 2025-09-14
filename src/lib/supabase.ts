import { createClient } from '@supabase/supabase-js'
import type { Database as DbSchema } from '@/types'

// Load env variables; throw errors if missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL env variable')
}
if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY env variable')
}
if (!supabaseServiceRole) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY env variable')
}

// Public Supabase client (use in client components)
export const supabase = createClient<DbSchema>(supabaseUrl, supabaseAnonKey)

// Admin Supabase client (only use on server side!)
export const supabaseAdmin = createClient<DbSchema>(supabaseUrl, supabaseServiceRole, {
  auth: { autoRefreshToken: false, persistSession: false },
})
// Your Database schema type for TypeScript support
export type Database = {
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
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
  }
}
