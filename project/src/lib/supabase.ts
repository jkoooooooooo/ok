import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on your schema
export interface Flight {
  id: string
  flight_number: string
  from_city: string
  to_city: string
  seats_available: number
  total_seats: number
  price: number
  airline: string
  duration: string
  created_at?: string
  updated_at?: string
}

export interface Booking {
  id: string
  flight_id: string
  passenger_name: string
  email: string
  booking_date: string
  status: 'confirmed' | 'pending' | 'cancelled'
  created_at?: string
  updated_at?: string
}

export interface AdminUser {
  id: string
  username: string
  password_hash: string
  created_at?: string
  updated_at?: string
}