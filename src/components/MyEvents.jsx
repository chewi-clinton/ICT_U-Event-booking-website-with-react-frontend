import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/MyEvents.css";

const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get("events/"); // ✅ should match backend route
        console.log("Fetched events:", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const filteredEvents = events.filter((event) => {
    if (!event.event_date) return false; // prevent crashes
    const eventDate = new Date(event.event_date);
    const currentDate = new Date();
    return activeTab === "upcoming"
      ? eventDate > currentDate
      : eventDate <= currentDate;
  });

  return (
    <div className="my-events-container">
      <div className="my-events-box">
        <h2 className="my-events-title">My Events</h2>

        {/* Tabs */}
        <div className="my-events-tabs">
          <button
            className={`my-events-tab ${
              activeTab === "upcoming" ? "active" : ""
            }`}
            onClick={() => handleTabChange("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`my-events-tab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => handleTabChange("past")}
          >
            Past
          </button>
        </div>

        {/* Error */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading */}
        {isLoading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          <div className="my-events-grid">
            {filteredEvents.map((event) => {
              // Fix image URL (prepend backend host if relative)
              const imageUrl = event.image
                ? event.image.startsWith("http")
                  ? event.image
                  : `${process.env.REACT_APP_API_URL}${event.image}`
                : "https://via.placeholder.com/600x400";

              return (
                <div key={event.id || Math.random()} className="my-events-card">
                  <img
                    src={imageUrl}
                    alt={event.event_name || "Event Image"}
                    className="card-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/600x400")
                    }
                  />
                  <h3 className="card-title">
                    {event.event_name || "Untitled Event"}
                  </h3>
                  <p className="card-location">
                    {event.location || "No location specified"}
                  </p>
                  <p className="card-subtitle">
                    {event.event_description || "No description available."}
                  </p>
                  <button
                    className="card-button"
                    onClick={() => {
                      if (event.id) {
                        navigate(`/eventDetails/${event.id}`);
                      } else {
                        alert("Event ID not found");
                      }
                    }}
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No {activeTab} events available.</p>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
