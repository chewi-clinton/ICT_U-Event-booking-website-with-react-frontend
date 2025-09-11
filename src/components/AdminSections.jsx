import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  Mic,
  Clock,
  BarChart3,
  Shield,
  Plus,
  Eye,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "../api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalBookings: 0,
    totalSpeakers: 0,
    totalSessions: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          eventsRes,
          usersRes,
          bookingsRes,
          speakersRes,
          sessionsRes,
          revenueRes,
        ] = await Promise.all([
          api.get("events/"),
          api.get("users/count/"),
          api.get("registrations/"),
          api.get("speakers/"),
          api.get("sessions/"),
          api.get("bookings/total_revenue/"),
        ]);

        const activity = bookingsRes.data.map((booking) => ({
          id: booking.id,
          type: "booking",
          message: `New booking for ${booking.event_details.event_name}`,
          time: new Date(booking.booking_date).toLocaleString(),
        }));

        setStats({
          totalEvents: eventsRes.data.length || 0,
          totalAttendees: usersRes.data.total_users || 0,
          totalBookings: bookingsRes.data.length || 0,
          totalSpeakers: speakersRes.data.length || 0,
          totalSessions: sessionsRes.data.length || 0,
          totalRevenue: revenueRes.data.total_revenue || 0,
        });

        setRecentActivity(activity.slice(0, 3));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats({
          totalEvents: 0,
          totalAttendees: 0,
          totalBookings: 0,
          totalSpeakers: 0,
          totalSessions: 0,
          totalRevenue: 0,
        });
        setRecentActivity([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const adminSections = [
    {
      title: "Events Management",
      description: "Create, edit, and manage all university events",
      icon: Calendar,
      color: "bg-blue",
      hoverColor: "bg-blue-hover",
      count: stats.totalEvents,
      actions: [
        { label: "View All Events", path: "/myEvents" },
        { label: "Create New Event", path: "/addEvent" },
      ],
    },
    {
      title: "Attendees",
      description: "Manage event attendees and user registrations",
      icon: Users,
      color: "bg-green",
      hoverColor: "bg-green-hover",
      count: stats.totalAttendees,
      actions: [
        { label: "View All Attendees", path: "/attendees" },
        { label: "Recent Registrations", path: "/registrations" },
      ],
    },
    {
      title: "Bookings",
      description: "Monitor and manage event bookings and payments",
      icon: BookOpen,
      color: "bg-purple",
      hoverColor: "bg-purple-hover",
      count: stats.totalBookings,
      actions: [
        { label: "View All Bookings", path: "/bookings" },
        { label: "Booking Analytics", path: "/analytics" },
      ],
    },
    {
      title: "Speakers",
      description: "Manage event speakers and their information",
      icon: Mic,
      color: "bg-orange",
      hoverColor: "bg-orange-hover",
      count: stats.totalSpeakers,
      actions: [
        { label: "View All Speakers", path: "/speakers" },
        { label: "Add New Speaker", path: "/speakers/create" },
      ],
    },
    {
      title: "Sessions",
      description: "Schedule and manage event sessions",
      icon: Clock,
      color: "bg-red",
      hoverColor: "bg-red-hover",
      count: stats.totalSessions,
      actions: [
        { label: "View All Sessions", path: "/sessions" },
        { label: "Schedule New Session", path: "/sessions/create" },
      ],
    },
    {
      title: "Analytics",
      description: "View reports and analytics dashboard",
      icon: BarChart3,
      color: "bg-indigo",
      hoverColor: "bg-indigo-hover",
      count: `$${stats.totalRevenue.toFixed(2)}`,
      actions: [
        { label: "Dashboard Overview", path: "/analytics" },
        { label: "Event Reports", path: "/reports" },
      ],
    },
  ];

  const quickStats = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "text-blue",
      bgColor: "bg-blue-light",
      change: "+12%",
      changeType: "increase",
    },
    {
      label: "Total Attendees",
      value: stats.totalAttendees,
      icon: Users,
      color: "text-green",
      bgColor: "bg-green-light",
      change: "+8%",
      changeType: "increase",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: BookOpen,
      color: "text-purple",
      bgColor: "bg-purple-light",
      change: "+15%",
      changeType: "increase",
    },
    {
      label: "Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-orange",
      bgColor: "bg-orange-light",
      change: "+22%",
      changeType: "increase",
    },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-content">
            <div className="admin-header-left">
              <Shield className="admin-logo" />
              <div className="admin-title-section">
                <h1 className="admin-title">Admin Dashboard</h1>
                <p className="admin-subtitle">
                  ICT University Event Management
                </p>
              </div>
            </div>
            <div className="admin-header-right">
              <div className="system-status">
                <Activity className="status-icon" />
                <span className="status-text">System Online</span>
              </div>
              <button onClick={() => navigate("/")} className="public-site-btn">
                <Eye className="btn-icon" />
                View Public Site
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-main-container">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome back, Administrator</h2>
          <p className="welcome-subtitle">
            Here's what's happening with your events and attendees today.
          </p>
        </div>

        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                  <div className="stat-change">
                    <TrendingUp className="change-icon" />
                    <span className="change-percentage">{stat.change}</span>
                    <span className="change-period">vs last month</span>
                  </div>
                </div>
                <div className={`stat-icon-container ${stat.bgColor}`}>
                  <stat.icon className={`stat-icon ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-content-grid">
          <div className="admin-sections">
            <h3 className="section-title">Management Sections</h3>
            <div className="sections-grid">
              {adminSections.map((section, index) => (
                <div key={index} className="section-card">
                  <div className="section-card-content">
                    <div className="section-header">
                      <div
                        className={`section-icon-container ${section.color}`}
                      >
                        <section.icon className="section-icon" />
                      </div>
                      <div className="section-count">
                        <p className="count-value">{section.count}</p>
                      </div>
                    </div>
                    <h3 className="section-name">{section.title}</h3>
                    <p className="section-description">{section.description}</p>

                    <div className="section-actions">
                      {section.actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => navigate(action.path)}
                          className={`action-btn ${section.color} ${section.hoverColor}`}
                        >
                          <span>{action.label}</span>
                          <Plus className="action-icon" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar">
            <h3 className="sidebar-title">Recent Activity</h3>
            <div className="activity-card">
              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        <BookOpen className="activity-type-icon booking" />
                      </div>
                      <div className="activity-details">
                        <p className="activity-message">{activity.message}</p>
                        <p className="activity-time">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recent activity available.</p>
                )}
              </div>
              <button
                onClick={() => navigate("/registrations")}
                className="view-all-btn"
              >
                View All Activities
              </button>
            </div>

            <div className="system-status-card">
              <h4 className="status-title">System Status</h4>
              <div className="status-list">
                <div className="status-item">
                  <span className="service-name">Database</span>
                  <div className="service-status">
                    <CheckCircle className="status-icon online" />
                    <span className="status-label online">Online</span>
                  </div>
                </div>
                <div className="status-item">
                  <span className="service-name">API Services</span>
                  <div className="service-status">
                    <CheckCircle className="status-icon online" />
                    <span className="status-label online">Operational</span>
                  </div>
                </div>
                <div className="status-item">
                  <span className="service-name">Payment Gateway</span>
                  <div className="service-status">
                    <AlertCircle className="status-icon warning" />
                    <span className="status-label warning">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions-card">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            <button
              onClick={() => navigate("/addEvent")}
              className="quick-action-btn blue"
            >
              <Plus className="quick-action-icon" />
              Create Event
            </button>
            <button
              onClick={() => navigate("/speakers/create")}
              className="quick-action-btn green"
            >
              <Plus className="quick-action-icon" />
              Add Speaker
            </button>
            <button
              onClick={() => navigate("/sessions/create")}
              className="quick-action-btn purple"
            >
              <Plus className="quick-action-icon" />
              Schedule Session
            </button>
            <button
              onClick={() => navigate("/analytics")}
              className="quick-action-btn indigo"
            >
              <BarChart3 className="quick-action-icon" />
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
