import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Sessions.css";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await api.get("sessions/");
        setSessions(response.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Failed to load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sessions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="sessions-container">
      <h2>Sessions</h2>
      {sessions.length > 0 ? (
        <ul className="sessions-list">
          {sessions.map((session) => (
            <li key={session.id} className="session-item">
              <span>{session.session_title}</span>
              <span>
                {session.start_time} - {session.end_time}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions found.</p>
      )}
    </div>
  );
};

export default Sessions;
