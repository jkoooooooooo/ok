import type { LegacyFlight } from '@/types/flight'

// Convert database flight to legacy format for existing components
export function mapFlightToLegacy(flight: Flight): LegacyFlight {
  // Generate mock departure and arrival times based on duration
  const now = new Date()
  const departureTime = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in next 7 days
  
  // Parse duration (e.g., "2h 30m" -> 150 minutes)
  const durationMatch = flight.duration.match(/(\d+)h?\s*(\d+)?m?/)
  let durationMinutes = 120 // Default 2 hours
  if (durationMatch) {
    const hours = parseInt(durationMatch[1]) || 0
    const minutes = parseInt(durationMatch[2]) || 0
    durationMinutes = hours * 60 + minutes
  }
  
  const arrivalTime = new Date(departureTime.getTime() + durationMinutes * 60 * 1000)

  return {
    id: flight.id,
    flightNumber: flight.flight_number,
    fromCity: flight.from_city,
    toCity: flight.to_city,
    departureTime: departureTime.toISOString(),
    arrivalTime: arrivalTime.toISOString(),
    seatsAvailable: flight.seats_available,
    totalSeats: flight.total_seats,
    price: flight.price,
    airline: flight.airline,
    duration: flight.duration
  }
}

// Convert legacy flight to database format
export function mapLegacyToFlight(legacyFlight: LegacyFlight): Omit<Flight, 'created_at' | 'updated_at'> {
  return {
    id: legacyFlight.id,
    flight_number: legacyFlight.flightNumber,
    from_city: legacyFlight.fromCity,
    to_city: legacyFlight.toCity,
    seats_available: legacyFlight.seatsAvailable,
    total_seats: legacyFlight.totalSeats,
    price: legacyFlight.price,
    airline: legacyFlight.airline,
    duration: legacyFlight.duration
  }
}