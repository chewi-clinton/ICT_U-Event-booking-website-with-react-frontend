import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Registrations.css";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await api.get("registrations/");
        setRegistrations(response.data);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to load registrations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading registrations...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="registrations-container">
      <h2>Recent Registrations</h2>
      {registrations.length > 0 ? (
        <ul className="registrations-list">
          {registrations.map((reg) => (
            <li key={reg.id} className="registration-item">
              <span>
                {reg.attendee.first_name} {reg.attendee.last_name}
              </span>
              <span>{reg.event_details.event_name}</span>
              <span>{new Date(reg.booking_date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
};

export default Registrations;
