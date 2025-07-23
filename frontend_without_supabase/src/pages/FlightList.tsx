import { useEffect, useState } from "react";
import { fetchFlights } from "@/api/fetchFlights";

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights()
      .then((data) => setFlights(data))
      .catch((err) => console.error("Error loading flights", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading flights...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
      <div className="grid gap-4">
        {flights.map((flight: any) => (
          <div key={flight.flightId} className="border p-4 rounded shadow">
            <p><strong>Flight:</strong> {flight.name}</p>
            <p><strong>From:</strong> {flight.from}</p>
            <p><strong>To:</strong> {flight.to}</p>
            <p><strong>Date:</strong> {flight.date}</p>
            <p><strong>Price:</strong> ₹{flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
