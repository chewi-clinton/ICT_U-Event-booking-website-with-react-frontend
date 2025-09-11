import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Speakers.css";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        setLoading(true);
        const response = await api.get("speakers/");
        setSpeakers(response.data);
      } catch (err) {
        console.error("Error fetching speakers:", err);
        setError("Failed to load speakers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading speakers...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="speakers-container">
      <h2>All Speakers</h2>
      {speakers.length > 0 ? (
        <ul className="speakers-list">
          {speakers.map((speaker) => (
            <li key={speaker.id} className="speaker-item">
              <span>
                {speaker.first_name} {speaker.last_name}
              </span>
              <span>Topic: {speaker.topic}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No speakers found.</p>
      )}
    </div>
  );
};

export default Speakers;
