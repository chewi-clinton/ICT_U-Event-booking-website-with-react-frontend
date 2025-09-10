import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/AddEvents.css";

const AddEvent = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event_name: "",
    event_description: "", // Changed from 'description' to 'event_description'
    event_date: "",
    location: "",
    total_seats: "",
    ticket_price: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added for better error display

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post("events/create/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      const errorMessage =
        error.response?.data?.event_description?.[0] ||
        error.response?.data?.error ||
        "Failed to create event. Please check the form and try again.";
      setError(errorMessage); // Display error to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-event-container">
      <div className="add-event-box">
        <h2 className="add-event-title">Add New Event</h2>
        <p className="add-event-subtitle">
          Fill in the details below to create a new event.
        </p>

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div> // Display error
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="event_name"
            placeholder="e.g., Annual Tech Conference"
            className="add-event-input"
            value={formData.event_name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="event_description" // Changed from 'description' to 'event_description'
            placeholder="Provide a detailed description of the event."
            className="add-event-textarea"
            value={formData.event_description}
            onChange={handleInputChange}
          />
          <div className="add-event-date-time">
            <input
              type="datetime-local"
              name="event_date"
              className="add-event-input half"
              value={formData.event_date}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="e.g., Main Auditorium"
              className="add-event-input half"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <input
            type="number"
            name="total_seats"
            placeholder="e.g., 500"
            className="add-event-input"
            value={formData.total_seats}
            onChange={handleInputChange}
            required
            min="1"
          />
          <input
            type="number"
            name="ticket_price"
            placeholder="e.g., 99.00"
            step="0.01"
            className="add-event-input"
            value={formData.ticket_price}
            onChange={handleInputChange}
            required
            min="0"
          />
          <input
            type="file"
            name="image"
            className="add-event-input"
            accept="image/jpeg,image/png"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="add-event-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Event..." : "Add Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
