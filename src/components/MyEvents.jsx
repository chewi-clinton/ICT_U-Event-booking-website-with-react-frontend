import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/MyEvents.css";

const eventsData = [
  {
    title: "TechConference",
    subtitle: "Future of Technology Summit",
    description:
      "Join industry leaders and innovators to explore the latest trends...",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "AI Workshop",
    subtitle: "Hands-on AI Workshop",
    description: "A practical workshop on applying AI in real-world scenarios.",
    img: "https://images.unsplash.com/photo-1581091870625-7bfe38e1a7d0?auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Cybersecurity Seminar",
    subtitle: "Cybersecurity in the Digital Age",
    description:
      "Learn about the latest cybersecurity threats and how to protect your data.",
    img: "https://images.unsplash.com/photo-1581090700227-cc7bfa8e9f8c?auto=format&fit=crop&w=600&q=60",
  },
];

const MyEvents = () => {
  const navigate = useNavigate();

  return (
    <div className="my-events-container">
      <div className="my-events-box">
        <h2 className="my-events-title">My Events</h2>
        <div className="my-events-tabs">
          <button className="my-events-tab active">Upcoming</button>
          <button className="my-events-tab">Past</button>
        </div>
        <div className="my-events-grid">
          {eventsData.map((event, idx) => (
            <div key={idx} className="my-events-card">
              <img src={event.img} alt={event.title} className="card-image" />
              <h3 className="card-title">{event.title}</h3>
              <p>{event.subtitle}</p>
              <p className="card-subtitle">{event.description}</p>
              <button
                className="card-button"
                onClick={() => navigate("/eventDetails")}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
