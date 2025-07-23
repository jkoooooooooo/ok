
export const flightService = {
  // Get all flights
  async getAllFlights(): Promise<Flight[]> {
      .from('flights')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching flights:', error)
      throw new Error('Failed to fetch flights')
    }

    return data || []
  },

  // Search flights by cities
  async searchFlights(fromCity: string, toCity: string): Promise<Flight[]> {
      .from('flights')
      .select('*')
      .ilike('from_city', `%${fromCity}%`)
      .ilike('to_city', `%${toCity}%`)
      .gt('seats_available', 0)
      .order('price', { ascending: true })

    if (error) {
      console.error('Error searching flights:', error)
      throw new Error('Failed to search flights')
    }

    return data || []
  },

  // Get flight by ID
  async getFlightById(id: string): Promise<Flight | null> {
      .from('flights')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Flight not found
      }
      console.error('Error fetching flight:', error)
      throw new Error('Failed to fetch flight')
    }

    return data
  },

  // Update flight seats (used when booking)
  async updateFlightSeats(flightId: string, newSeatsAvailable: number): Promise<void> {
      .from('flights')
      .update({ seats_available: newSeatsAvailable })
      .eq('id', flightId)

    if (error) {
      console.error('Error updating flight seats:', error)
      throw new Error('Failed to update flight seats')
    }
  }
}