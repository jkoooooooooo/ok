import { Booking } from "@/types/booking";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "bookings";

// Load all bookings
function loadBookings(): Booking[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Save all bookings
function saveBookings(bookings: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export const bookingService = {
  // Create a new booking
  async createBooking(
    bookingData: Omit<Booking, "id" | "created_at" | "updated_at">
  ): Promise<Booking> {
    try {
      const newBooking: Booking = {
        ...bookingData,
        id: uuidv4(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const bookings = loadBookings();
      bookings.push(newBooking);
      saveBookings(bookings);

      return newBooking;
    } catch (error: any) {
      const message = typeof error?.message === "string" ? error.message : String(error);
      console.error("Error creating booking:", message);
      throw new Error("Failed to create booking");
    }
  },

  // Get bookings by email
  async getBookingsByEmail(email: string): Promise<Booking[]> {
    try {
      const bookings = loadBookings();
      return bookings
        .filter((b) => b.email === email)
        .sort((a, b) => b.booking_date.localeCompare(a.booking_date));
    } catch (error: any) {
      const message = typeof error?.message === "string" ? error.message : String(error);
      console.error("Error fetching bookings:", message);
      throw new Error("Failed to fetch bookings");
    }
  },

  // Get all bookings (admin)
  async getAllBookings(): Promise<Booking[]> {
    try {
      const bookings = loadBookings();
      return bookings.sort((a, b) => b.booking_date.localeCompare(a.booking_date));
    } catch (error: any) {
      const message = typeof error?.message === "string" ? error.message : String(error);
      console.error("Error fetching all bookings:", message);
      throw new Error("Failed to fetch bookings");
    }
  },

  // Update booking status
  async updateBookingStatus(
    bookingId: string,
    status: "confirmed" | "pending" | "cancelled"
  ): Promise<void> {
    try {
      const bookings = loadBookings();
      const updated = bookings.map((b) =>
        b.id === bookingId ? { ...b, status, updated_at: new Date().toISOString() } : b
      );
      saveBookings(updated);
    } catch (error: any) {
      const message = typeof error?.message === "string" ? error.message : String(error);
      console.error("Error updating booking status:", message);
      throw new Error("Failed to update booking status");
    }
  },

  // Get booking by ID
  async getBookingById(id: string): Promise<Booking | null> {
    try {
      const bookings = loadBookings();
      return bookings.find((b) => b.id === id) || null;
    } catch (error: any) {
      const message = typeof error?.message === "string" ? error.message : String(error);
      console.error("Error fetching booking:", message);
      throw new Error("Failed to fetch booking");
    }
  },
};
