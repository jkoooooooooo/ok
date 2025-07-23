export async function fetchFlights() {
  const response = await fetch("https://your-api-url.amazonaws.com/dev/flights"); // Replace with your real API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }
  return response.json();
}
