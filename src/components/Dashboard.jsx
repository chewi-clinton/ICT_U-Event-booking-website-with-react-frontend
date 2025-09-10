import React from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ setCurrentPage }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            120
            <br />
            Total Events
          </div>
          <div className="dashboard-stat">
            500
            <br />
            Total Users
          </div>
          <div className="dashboard-stat">
            350
            <br />
            Total Bookings
          </div>
        </div>
        <div className="dashboard-upcoming">
          <h3 className="upcoming-title">Upcoming Events</h3>
          <table className="upcoming-table">
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>Tech Conference 2024</td>
              <td>2024-07-15</td>
              <td>Main Auditorium</td>
              <td>Active</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>Innovation Workshop</td>
              <td>2024-08-20</td>
              <td>Innovation Lab</td>
              <td>Active</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>Career Fair</td>
              <td>2024-09-10</td>
              <td>Career Center</td>
              <td>Active</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="dashboard-registrations">
          <h3 className="registrations-title">Recent User Registrations</h3>
          <table className="registrations-table">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Event</th>
            </tr>
            <tr>
              <td>Alice Johnson</td>
              <td>alice@example.com</td>
              <td>2024-06-20</td>
              <td>Tech Conference 2024</td>
            </tr>
            <tr>
              <td>Bob Williams</td>
              <td>bob@example.com</td>
              <td>2024-06-22</td>
              <td>Innovation Workshop</td>
            </tr>
            <tr>
              <td>Charlie Davis</td>
              <td>charlie@example.com</td>
              <td>2024-06-25</td>
              <td>Career Fair</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
