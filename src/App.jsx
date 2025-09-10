import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./assets/download.jpeg";

import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AddEvent from "./components/AddEvent.jsx";
import Analytics from "./components/Analytics.jsx";
import Calendar from "./components/Calendar.jsx";
import BookingConfirmation from "./components/BookingConfirmation.jsx";
import Dashboard from "./components/Dashboard.jsx";
import EventDetails from "./components/EventDetails.jsx";
import MyEvents from "./components/MyEvents.jsx";
import Home from "./components/Home.jsx";

import "./styles/App.css";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header with navigation */}
        <header className="navbar">
          <div className="navbar-brand">
            <img src={logo} alt="ICT Logo" className="brand-logo" />
            <h1 className="brand-title">ICT University Events</h1>
          </div>

          <button
            className="hamburger"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            <span className="hamburger-icon"></span>
          </button>

          <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
            <div className="navbar-links">
              <Link to="/" onClick={() => setIsDrawerOpen(false)}>
                Home
              </Link>
              <Link to="/myEvents" onClick={() => setIsDrawerOpen(false)}>
                Events
              </Link>
              <Link to="/about" onClick={() => setIsDrawerOpen(false)}>
                About
              </Link>
              <Link to="/contact" onClick={() => setIsDrawerOpen(false)}>
                Contact
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsDrawerOpen(false)}
                className="nav-button"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsDrawerOpen(false)}
                className="nav-button"
              >
                Log In
              </Link>
            </div>
          </div>
        </header>

        {/* Main page content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route
              path="/bookingConfirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/eventDetails" element={<EventDetails />} />
            <Route path="/myEvents" element={<MyEvents />} />
            <Route path="/about" element={<div>About ICT Events Page</div>} />
            <Route
              path="/contact"
              element={<div>Contact ICT University Events</div>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
