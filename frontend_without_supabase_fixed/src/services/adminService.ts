import { Flight } from "@/types/flight";

const STORAGE_KEY = "flights";

// Helper to load all flights
function loadFlights(): Flight[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Helper to save all flights
function saveFlights(flights: Flight[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
}

// Add a flight locally
export async function addFlight(flight: Flight): Promise<boolean> {
  try {
    const flights = loadFlights();
    flights.push(flight);
    saveFlights(flights);
    return true;
  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : String(error);
    console.error("Add flight error:", message);
    return false;
  }
}

// Delete a flight locally by ID
export async function deleteFlight(flightId: string): Promise<boolean> {
  try {
    let flights = loadFlights();
    flights = flights.filter(f => f.id !== flightId);
    saveFlights(flights);
    return true;
  } catch (error: any) {
    const message = typeof error?.message === 'string' ? error.message : String(error);
    console.error("Delete flight error:", message);
    return false;
  }
}
