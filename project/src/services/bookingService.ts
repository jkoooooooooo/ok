import { supabase } from '@/lib/supabase'
import type { Booking } from '@/lib/supabase'

export const bookingService = {
  // Create a new booking
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      throw new Error('Failed to create booking')
    }

    return data
  },

  // Get bookings by email
  async getBookingsByEmail(email: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('email', email)
      .order('booking_date', { ascending: false })

    if (error) {
      console.error('Error fetching bookings:', error)
      throw new Error('Failed to fetch bookings')
    }

    return data || []
  },

  // Get all bookings (admin)
  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: false })

    if (error) {
      console.error('Error fetching all bookings:', error)
      throw new Error('Failed to fetch bookings')
    }

    return data || []
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: 'confirmed' | 'pending' | 'cancelled'): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)

    if (error) {
      console.error('Error updating booking status:', error)
      throw new Error('Failed to update booking status')
    }
  },

  // Get booking by ID
  async getBookingById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Booking not found
      }
      console.error('Error fetching booking:', error)
      throw new Error('Failed to fetch booking')
    }

    return data
  }
}