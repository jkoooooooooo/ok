const STORAGE_KEY = "bookings";

// Use built-in browser API to generate UUID
const uuidv4 = () => crypto.randomUUID();

export const bookingService = {
  async createBooking(bookingData) {
    const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const newBooking = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      ...bookingData,
    };
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  async getBookings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },
};

