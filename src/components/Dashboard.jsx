import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Dashboard.css";

const Dashboard = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch events
        const eventsResponse = await api.get("events/");
        setEvents(eventsResponse.data);
        setStats((prev) => ({
          ...prev,
          totalEvents: eventsResponse.data.length,
        }));

        // Fetch recent registrations
        const registrationsResponse = await api.get("registrations/");
        setRegistrations(registrationsResponse.data);
        setStats((prev) => ({
          ...prev,
          totalBookings: registrationsResponse.data.length,
        }));

        // Fetch total users
        const usersResponse = await api.get("users/count/");
        setStats((prev) => ({
          ...prev,
          totalUsers: usersResponse.data.total_users,
        }));
      } catch (err) {
        setError(
          err.response?.data?.detail ||
            "Failed to fetch dashboard data. Please try again."
        );
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (eventId) => {
    // Placeholder for edit functionality (e.g., navigate to edit page)
    navigate(`/events/edit/${eventId}`);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`events/${eventId}/`);
        setEvents(events.filter((event) => event.id !== eventId));
        setStats((prev) => ({ ...prev, totalEvents: prev.totalEvents - 1 }));
        alert("Event deleted successfully!");
      } catch (err) {
        setError("Failed to delete event. Please try again.");
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h2 className="dashboard-title">Dashboard</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="dashboard-stat">
                {stats.totalEvents}
                <br />
                Total Events
              </div>
              <div className="dashboard-stat">
                {stats.totalUsers}
                <br />
                Total Users
              </div>
              <div className="dashboard-stat">
                {stats.totalBookings}
                <br />
                Total Bookings
              </div>
            </div>
            <div className="dashboard-upcoming">
              <h3 className="upcoming-title">Upcoming Events</h3>
              <table className="upcoming-table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map((event) => (
                      <tr key={event.id}>
                        <td>{event.event_name}</td>
                        <td>{event.event_description || "No description"}</td>
                        <td>
                          {new Date(event.event_date).toLocaleDateString()}
                        </td>
                        <td>{event.location}</td>
                        <td>
                          {new Date(event.event_date) > new Date()
                            ? "Active"
                            : "Past"}
                        </td>
                        <td>
                          <button onClick={() => handleEdit(event.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(event.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No events available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="dashboard-registrations">
              <h3 className="registrations-title">Recent User Registrations</h3>
              <table className="registrations-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Event</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length > 0 ? (
                    registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td>{`${reg.attendee.first_name} ${reg.attendee.last_name}`}</td>
                        <td>{reg.attendee.email}</td>
                        <td>
                          {new Date(reg.booking_date).toLocaleDateString()}
                        </td>
                        <td>{reg.event.event_name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No recent registrations available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
