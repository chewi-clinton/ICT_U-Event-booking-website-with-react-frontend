import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Attendees.css";

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        const response = await api.get("attendees/"); // Assumes /attendees/ endpoint exists
        setAttendees(response.data);
      } catch (err) {
        console.error("Error fetching attendees:", err);
        setError("Failed to load attendees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading attendees...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="attendees-container">
      <h2>Attendees</h2>
      {attendees.length > 0 ? (
        <ul className="attendees-list">
          {attendees.map((attendee) => (
            <li key={attendee.id} className="attendee-item">
              <span>
                {attendee.first_name} {attendee.last_name}
              </span>
              <span>{attendee.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No attendees found.</p>
      )}
    </div>
  );
};

export default Attendees;
