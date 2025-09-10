import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">
          Discover and Book Events at ICT University
        </h1>
        <p className="home-subtitle">
          Explore a wide range of academic, social, and cultural events
          happening at ICT University. Find your next great experience today.
        </p>
        <button onClick={() => navigate("/myEvents")} className="home-button">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default Home;
