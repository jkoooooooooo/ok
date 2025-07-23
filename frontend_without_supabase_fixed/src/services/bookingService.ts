import { Booking } from "@/types/booking";

const STORAGE_KEY = "bookings";

// Load all bookings from localStorage
function loadBookings(): Booking[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save all bookings to localStorage
function saveBookings(bookings: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// Add a booking
export async function bookFlight(booking: Booking): Promise<boolean> {
  try {
    const bookings = loadBookings();

    // Optional: prevent duplicate booking by flightId + email
    const exists = bookings.find(
      b => b.flightId === booking.flightId && b.email === booking.email
    );

    if (exists) {
      throw new Error("Duplicate booking");
    }

    bookings.push(booking);
    saveBookings(bookings);
    return true;
  } catch (error: any) {
    const message = typeof error?.message === "string" ? error.message : String(error);
    console.error("Booking failed:", message);
    return false;
  }
}

// Get all bookings
export async function getMyBookings(email: string): Promise<Booking[]> {
  try {
    const bookings = loadBookings();
    return bookings.filter(b => b.email === email);
  } catch (error: any) {
    const message = typeof error?.message === "string" ? error.message : String(error);
    console.error("Failed to fetch bookings:", message);
    return [];
  }
}

// Cancel a booking
export async function cancelBooking(bookingId: string): Promise<boolean> {
  try {
    let bookings = loadBookings();
    bookings = bookings.filter(b => b.id !== bookingId);
    saveBookings(bookings);
    return true;
  } catch (error: any) {
    const message = typeof error?.message === "string" ? error.message : String(error);
    console.error("Failed to cancel booking:", message);
    return false;
  }
}
