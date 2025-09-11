import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
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
import AdminDashboard from "./components/AdminSections.jsx";
import Attendees from "./components/Attendees.jsx";
import Bookings from "./components/Bookings.jsx";
import Speakers from "./components/Speakers.jsx";
import Sessions from "./components/Sessions.jsx";
import Registrations from "./components/Registrations.jsx";
import Reports from "./components/Reports.jsx";
import AddSpeaker from "./components/AddSpeaker.jsx";
import AddSession from "./components/AddSession.jsx";
import "./styles/App.css";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Child component to use useLocation within Router context
const AppContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const noHeaderRoutes = ["/", "/login", "/signup"];

  return (
    <div className="app-container">
      {!noHeaderRoutes.includes(location.pathname) && (
        <header className="navbar">
          <div className="navbar-brand">
            <img src={logo} alt="ICT Logo" className="brand-logo" />
            <p>ICT University Events</p>
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
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route
            path="/bookingConfirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eventDetails/:id" element={<EventDetails />} />
          <Route path="/myEvents" element={<MyEvents />} />
          <Route path="/about" element={<div>About ICT Events Page</div>} />
          <Route
            path="/contact"
            element={<div>Contact ICT University Events</div>}
          />
          <Route path="/attendees" element={<Attendees />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/speakers/create" element={<AddSpeaker />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/create" element={<AddSession />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
