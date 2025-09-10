import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="event-details-container">
      <div className="event-details-box">
        <h2 className="event-details-title">
          AI in Business: Transforming Industries
        </h2>
        <p className="event-details-subtitle">
          Explore how artificial intelligence is reshaping business strategies
          and operations. Learn from industry leaders and gain insights into
          practical applications.
        </p>
        <div className="event-details-content">
          <div className="event-agenda">
            <h3 className="agenda-title">Event Agenda</h3>
            <ul className="agenda-list">
              <li>
                <span className="agenda-icon">⏰</span> Opening Keynote 9:00 AM
                - 10:00 AM
              </li>
              <li>
                <span className="agenda-icon">👥</span> Panel Discussion: AI
                Applications 10:15 AM - 11:45 AM
              </li>
              <li>
                <span className="agenda-icon">☕</span> Networking Break 11:45
                AM - 12:15 PM
              </li>
              <li>
                <span className="agenda-icon">🎤</span> Closing Remarks 12:15 PM
                - 12:45 PM
              </li>
            </ul>
          </div>

          <div className="event-info">
            <h3 className="info-title">Event Details</h3>
            <ul className="info-list">
              <li>
                <span className="info-icon">📅</span> October 26, 2024
              </li>
              <li>
                <span className="info-icon">📍</span> ICT University Main Hall
              </li>
              <li>
                <span className="info-icon">💸</span> From $99
              </li>
            </ul>
            <button
              className="info-button"
              onClick={() => navigate("/BookingConfirmation/")}
            >
              Book Your Spot
            </button>
          </div>

          <div className="event-speakers">
            <h3 className="speakers-title">Featured Speakers</h3>
            <div className="speakers-box">
              <p>Dr. Alex Turner</p>
              <p className="speakers-subtitle">CEO, AI Solutions Inc</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
