import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/AddSession.css";

const AddSession = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event: "",
    speaker: "",
    session_title: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("sessions/", formData);
      navigate("/sessions");
    } catch (err) {
      setError("Failed to schedule session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-session-container">
      <h2>Schedule New Session</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="session-form">
        <input
          type="number"
          name="event"
          placeholder="Event ID"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="speaker"
          placeholder="Speaker ID"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="session_title"
          placeholder="Session Title"
          onChange={handleChange}
          required
        />
        <input type="time" name="start_time" onChange={handleChange} required />
        <input type="time" name="end_time" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Session"}
        </button>
      </form>
    </div>
  );
};

export default AddSession;
