import React from "react";
import "../styles/Analytics.css";

const Analytics = ({ setCurrentPage }) => {
  return (
    <div className="analytics-container">
      <div className="analytics-box">
        <h2 className="analytics-title">Event Analytics</h2>
        <p className="analytics-subtitle">
          Insights into event performance and user engagement.
        </p>
        <div className="analytics-charts">
          <div className="analytics-chart">
            {" "}
            {/* Placeholder for Booking Trends */}{" "}
          </div>
          <div className="analytics-chart">
            {" "}
            {/* Placeholder for Event Attendance */}{" "}
          </div>
        </div>
        <div className="analytics-stats">
          <div className="analytics-stat">
            <h3 className="stat-title">Total Bookings</h3>
            <p className="stat-value">
              1,250 <span className="stat-increase">+15%</span>
            </p>
          </div>
          <div className="analytics-stat">
            <h3 className="stat-title">Unique Attendees</h3>
            <p className="stat-value">
              850 <span className="stat-increase">+12%</span>
            </p>
          </div>
          <div className="analytics-stat">
            <h3 className="stat-title">Engagement Rate</h3>
            <p className="stat-value">
              78% <span className="stat-decrease">-2%</span>
            </p>
          </div>
        </div>
        <div className="analytics-table-container">
          <h3 className="table-title">Top Performing Events</h3>
          <table className="analytics-table">
            <tr>
              <th>Event Name</th>
              <th>Bookings</th>
              <th>Attendance Rate</th>
              <th>User Engagement</th>
            </tr>
            <tr>
              <td>Tech Conference 2024</td>
              <td>450</td>
              <td>92%</td>
              <td>High</td>
            </tr>
            <tr>
              <td>Innovation Workshop</td>
              <td>320</td>
              <td>85%</td>
              <td>High</td>
            </tr>
            <tr>
              <td>Career Fair</td>
              <td>280</td>
              <td>75%</td>
              <td>Medium</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
