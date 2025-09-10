import React from "react";
import "../styles/Calendar.css";

const Calendar = ({ setCurrentPage }) => {
  return (
    <div className="calendar-container">
      <div className="calendar-box">
        <h2 className="calendar-title">University Events Calendar</h2>
        <p className="calendar-subtitle">
          Discover and book your next event at ICT University.
        </p>
        <input
          type="text"
          placeholder="Search events, dates, or venues"
          className="calendar-search"
        />
        <div className="calendar-grid">
          <div className="calendar-month">
            {" "}
            {/* Placeholder for October 2024 */}{" "}
          </div>
          <div className="calendar-month">
            {" "}
            {/* Placeholder for November 2024 */}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
