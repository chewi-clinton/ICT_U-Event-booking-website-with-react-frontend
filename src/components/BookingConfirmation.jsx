import React from "react";
import "../styles/BookingConfirmation.css";

const BookingConfirmation = ({ setCurrentPage }) => {
  return (
    <div className="booking-confirmation-container">
      <div className="booking-confirmation-box">
        <div className="confirmation-icon">✓</div>
        <h2 className="confirmation-title">Booking Confirmed!</h2>
        <p className="confirmation-subtitle">
          Your booking for the ICT University Tech Conference has been
          successfully confirmed. You will receive an email with your booking
          details and ticket information shortly.
        </p>
        <div className="confirmation-details">
          <p>
            <strong>Event Name</strong> ICT University Tech Conference
          </p>
          <p>
            <strong>Date</strong> July 15, 2024
          </p>
          <p>
            <strong>Time</strong> 9:00 AM - 5:00 PM
          </p>
          <p>
            <strong>Location</strong> ICT University Auditorium
          </p>
          <p>
            <strong>Ticket Type</strong> General Admission
          </p>
          <p>
            <strong>Quantity</strong> 1
          </p>
          <p>
            <strong>Total</strong> $50.00
          </p>
        </div>
        <div className="confirmation-buttons">
          <button
            className="confirmation-view"
            onClick={() => setCurrentPage("BookingConfirmation")}
          >
            View Booking Details
          </button>
          <button
            onClick={() => setCurrentPage("events")}
            className="confirmation-back"
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
