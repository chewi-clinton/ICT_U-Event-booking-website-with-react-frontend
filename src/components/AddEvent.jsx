import React from "react";
import "../styles/AddEvents.css";

const AddEvent = ({ setCurrentPage }) => {
  return (
    <div className="add-event-container">
      <div className="add-event-box">
        <h2 className="add-event-title">Add New Event</h2>
        <p className="add-event-subtitle">
          Fill in the details below to create a new event.
        </p>

        <input
          type="text"
          placeholder="e.g., Annual Tech Conference"
          className="add-event-input"
        />

        <textarea
          placeholder="Provide a detailed description of the event."
          className="add-event-textarea"
        ></textarea>

        <div className="add-event-date-time">
          <input type="date" className="add-event-input half" />
          <input type="time" className="add-event-input half" />
        </div>

        <input
          type="text"
          placeholder="e.g., Main Auditorium"
          className="add-event-input"
        />

        <input
          type="number"
          placeholder="e.g., 500"
          className="add-event-input"
        />

        <input type="file" className="add-event-input" />

        <button className="add-event-button">Add Event</button>
      </div>
    </div>
  );
};

export default AddEvent;
