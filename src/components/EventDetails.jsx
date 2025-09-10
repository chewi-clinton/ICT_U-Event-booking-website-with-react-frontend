import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!event) return;

    setIsBooking(true);
    try {
      // Create the booking
      const bookingData = {
        event: event.id,
        seats_booked: 1, // Default to 1 seat, you can make this dynamic
      };

      const response = await api.post("book/", bookingData);

      // Navigate to confirmation with booking data
      navigate("/bookingConfirmation", {
        state: {
          bookingData: {
            id: response.data.id,
            event_name: event.event_name,
            event_date: event.event_date,
            time: event.event_date,
            location: event.location,
            ticket_type: "General Admission",
            quantity: 1,
            total: event.ticket_price,
            booking_date: new Date().toISOString(),
          },
        },
      });
    } catch (error) {
      console.error("Booking error:", error);

      // Handle specific error cases
      if (error.response?.status === 401) {
        alert("Please log in to book an event");
        navigate("/login");
      } else if (error.response?.data?.detail) {
        alert(`Booking failed: ${error.response.data.detail}`);
      } else {
        alert("Booking failed. Please try again.");
      }
    } finally {
      setIsBooking(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="event-details-container">
        <div className="event-details-box">
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-details-container">
        <div className="event-details-box">
          <h2 style={{ color: "red" }}>Error Loading Event</h2>
          <p style={{ color: "red" }}>{error}</p>
          <button className="info-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-details-container">
        <div className="event-details-box">
          <p>No event found.</p>
          <button className="info-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-container">
      <div className="event-details-box">
        <h2 className="event-details-title">
          {event.event_name || "Event Name Not Available"}
        </h2>
        <p className="event-details-subtitle">
          {event.event_description ||
            "No description available for this event."}
        </p>
        <div className="event-details-content">
          <div className="event-agenda">
            <h3 className="agenda-title">Event Agenda</h3>
            <ul className="agenda-list">
              <li>
                <span className="agenda-icon">⏰</span> Event Start:{" "}
                {formatTime(event.event_date)}
              </li>
              <li>
                <span className="agenda-icon">👥</span> Welcome & Registration
              </li>
              <li>
                <span className="agenda-icon">🎤</span> Main Event Program
              </li>
              <li>
                <span className="agenda-icon">☕</span> Networking &
                Refreshments
              </li>
            </ul>
          </div>
          <div className="event-info">
            <h3 className="info-title">Event Details</h3>
            <ul className="info-list">
              <li>
                <span className="info-icon">📅</span>{" "}
                {formatDate(event.event_date)}
              </li>
              <li>
                <span className="info-icon">📍</span>{" "}
                {event.location || "Location TBA"}
              </li>
              <li>
                <span className="info-icon">💸</span>
                {event.ticket_price !== undefined && event.ticket_price !== null
                  ? `$${event.ticket_price}`
                  : "Free"}
              </li>
              <li>
                <span className="info-icon">🪑</span>
                {event.available_seats !== undefined &&
                event.available_seats !== null
                  ? `${event.available_seats} seats available`
                  : "Seats available"}
              </li>
            </ul>
            <button
              className="info-button"
              onClick={handleBooking}
              disabled={event.available_seats === 0 || isBooking}
            >
              {isBooking
                ? "Booking..."
                : event.available_seats === 0
                ? "Sold Out"
                : "Book Your Spot"}
            </button>
          </div>
          <div className="event-speakers">
            <h3 className="speakers-title">Event Information</h3>
            <div className="speakers-box">
              <p>Event ID: #{event.id}</p>
              <p className="speakers-subtitle">
                Total Capacity: {event.total_seats || "N/A"} seats
              </p>
              {event.image && (
                <img
                  src={event.image}
                  alt={event.event_name}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "auto",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
