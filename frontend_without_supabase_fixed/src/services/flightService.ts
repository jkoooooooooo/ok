import type { Flight } from "@/types";

const STORAGE_KEY = "flights";

export const flightService = {
  // Get all flights (from localStorage)
  async getAllFlights(): Promise<Flight[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    const flights: Flight[] = stored ? JSON.parse(stored) : [];
    return flights;
  },

  // Save all flights (overwrite existing data)
  async saveFlights(flights: Flight[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  },

  // Search flights
  async searchFlights(fromCity: string, toCity: string): Promise<Flight[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    const flights: Flight[] = stored ? JSON.parse(stored) : [];

    return flights.filter(
      (flight) =>
        flight.from_city.toLowerCase().includes(fromCity.toLowerCase()) &&
        flight.to_city.toLowerCase().includes(toCity.toLowerCase()) &&
        flight.seats_available > 0
    );
  },

  // Get flight by ID
  async getFlightById(id: string): Promise<Flight | null> {
    const stored = localStorage.getItem(STORAGE_KEY);
    const flights: Flight[] = stored ? JSON.parse(stored) : [];

    return flights.find((flight) => flight.id === id) || null;
  },

  // Update flight seats
  async updateFlightSeats(flightId: string, newSeatsAvailable: number): Promise<void> {
    const stored = localStorage.getItem(STORAGE_KEY);
    let flights: Flight[] = stored ? JSON.parse(stored) : [];

    flights = flights.map((flight) =>
      flight.id === flightId ? { ...flight, seats_available: newSeatsAvailable } : flight
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  }
};
