// Re-export types from supabase lib for consistency
export type { Flight, Booking, AdminUser } from '@/lib/supabase'

// Legacy interface for compatibility with existing components
export interface LegacyFlight {
  id: string;
  flightNumber: string;
  fromCity: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  seatsAvailable: number;
  totalSeats: number;
  price: number;
  airline: string;
  duration: string;
}

export interface SearchParams {
  fromCity: string;
  toCity: string;
  departureDate: string;
  passengers: number;
}