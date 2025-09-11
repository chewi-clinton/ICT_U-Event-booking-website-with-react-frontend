import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await api.get("registrations/");
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="bookings-container">
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <span>Event: {booking.event_details.event_name}</span>
              <span>
                Attendee: {booking.attendee.first_name}{" "}
                {booking.attendee.last_name}
              </span>
              <span>Seats: {booking.seats_booked}</span>
              <span>Amount: ${booking.amount_paid.toFixed(2)}</span>
              <span>
                Date: {new Date(booking.booking_date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Bookings;
