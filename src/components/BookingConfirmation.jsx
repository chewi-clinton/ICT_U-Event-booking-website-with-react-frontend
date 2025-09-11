import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../api";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (location.state?.bookingData) {
          console.log(
            "Using booking data from navigation state:",
            location.state.bookingData
          );
          setBookingDetails(location.state.bookingData);
          setIsLoading(false);
          return;
        }

        const bookingId = searchParams.get("bookingId");
        if (bookingId) {
          console.log("Fetching booking details for ID:", bookingId);
          const response = await api.get(`bookings/${bookingId}/`);

          const booking = response.data;
          const formattedBooking = {
            id: booking.id,
            event_name: booking.event?.event_name || "Event Name Not Available",
            event_date: booking.event?.event_date
              ? new Date(booking.event.event_date).toLocaleDateString()
              : "Date TBA",
            time: booking.event?.event_date
              ? new Date(booking.event.event_date).toLocaleTimeString()
              : "Time TBA",
            location: booking.event?.location || "Location TBA",
            ticket_type: "ICT Event Registration",
            quantity: booking.seats_booked || 1,
            total: booking.amount_paid || 0,
            booking_date: booking.booking_date
              ? new Date(booking.booking_date).toLocaleDateString()
              : new Date().toLocaleDateString(),
          };

          setBookingDetails(formattedBooking);
          setIsLoading(false);
          return;
        }

        const eventId = searchParams.get("eventId");
        if (eventId) {
          console.log("Creating booking confirmation for event ID:", eventId);
          const response = await api.get(`events/${eventId}/`);
          const event = response.data;

          const mockBooking = {
            event_name: event.event_name,
            event_date: new Date(event.event_date).toLocaleDateString(),
            time: new Date(event.event_date).toLocaleTimeString(),
            location: event.location,
            ticket_type: "General Admission",
            quantity: 1,
            total: event.ticket_price,
            booking_date: new Date().toLocaleDateString(),
          };

          setBookingDetails(mockBooking);
          setIsLoading(false);
          return;
        }

        // No booking data available
        setError("No booking information found. Please try booking again.");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Failed to load booking details. Please try again.");
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [location.state, searchParams]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "Time TBA";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="booking-confirmation-container">
        <div className="booking-confirmation-box">
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-confirmation-container">
        <div className="booking-confirmation-box">
          <div className="confirmation-icon" style={{ color: "red" }}>
            ✗
          </div>
          <h2 className="confirmation-title">Booking Error</h2>
          <p className="confirmation-subtitle" style={{ color: "red" }}>
            {error}
          </p>
          <div className="confirmation-buttons">
            <button
              className="confirmation-back"
              onClick={() => navigate("/myEvents")}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="booking-confirmation-container">
        <div className="booking-confirmation-box">
          <div className="confirmation-icon" style={{ color: "orange" }}>
            ⚠
          </div>
          <h2 className="confirmation-title">No Booking Found</h2>
          <p className="confirmation-subtitle">
            No booking information was found. Please try booking again.
          </p>
          <div className="confirmation-buttons">
            <button
              className="confirmation-back"
              onClick={() => navigate("/myEvents")}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-container">
      <div className="booking-confirmation-box">
        <div className="confirmation-icon">✓</div>
        <h2 className="confirmation-title">Booking Confirmed!</h2>
        <p className="confirmation-subtitle">
          Your booking for {bookingDetails.event_name} has been successfully
          confirmed. You will receive an email with your booking details and
          ticket information shortly.
        </p>

        <div className="confirmation-details">
          <p>
            <strong>Event Name:</strong> {bookingDetails.event_name}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(bookingDetails.event_date)}
          </p>
          <p>
            <strong>Time:</strong> {formatTime(bookingDetails.time)}
          </p>
          <p>
            <strong>Location:</strong> {bookingDetails.location}
          </p>
          <p>
            <strong>Ticket Type:</strong> {bookingDetails.ticket_type}
          </p>
          <p>
            <strong>Quantity:</strong> {bookingDetails.quantity}
          </p>
          <p>
            <strong>Total:</strong> ${Number(bookingDetails.total).toFixed(2)}
          </p>
          {bookingDetails.booking_date && (
            <p>
              <strong>Booking Date:</strong> {bookingDetails.booking_date}
            </p>
          )}
          {bookingDetails.id && (
            <p>
              <strong>Booking Reference:</strong> #{bookingDetails.id}
            </p>
          )}
        </div>

        <div className="confirmation-buttons">
          <button
            className="confirmation-view"
            onClick={() => navigate("/myEvents")}
          >
            View My Events
          </button>
          <button
            className="confirmation-back"
            onClick={() => navigate("/myEvents")}
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
