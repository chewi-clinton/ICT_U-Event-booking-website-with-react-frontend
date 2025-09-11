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
  AlertCircle,
  CheckCircle,
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

  // Fetch dashboard stats and recent activity
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch stats from your API endpoints
        const [eventsRes, usersRes, registrationsRes] = await Promise.all([
          api.get("events/"),
          api.get("users/count/"),
          api.get("registrations/"),
        ]);

        // Calculate stats from the responses
        setStats({
          totalEvents: eventsRes.data.length || 0,
          totalAttendees: usersRes.data.count || 0,
          totalBookings: registrationsRes.data.length || 0,
          totalSpeakers: 8, // You might want to create an endpoint for this
          totalSessions: 15, // You might want to create an endpoint for this
          totalRevenue: 12540, // Calculate from bookings
        });

        // Mock recent activity - replace with actual API call
        setRecentActivity([
          {
            id: 1,
            type: "booking",
            message: "New booking for AI Workshop",
            time: "2 hours ago",
          },
          {
            id: 2,
            type: "event",
            message: "Tech Conference event created",
            time: "5 hours ago",
          },
          {
            id: 3,
            type: "speaker",
            message: "Dr. Smith added as speaker",
            time: "1 day ago",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Set default values on error
        setStats({
          totalEvents: 12,
          totalAttendees: 248,
          totalBookings: 156,
          totalSpeakers: 8,
          totalSessions: 15,
          totalRevenue: 12540,
        });
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
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      count: stats.totalEvents,
      actions: [
        { label: "View All Events", path: "/admin/events" },
        { label: "Create New Event", path: "/admin/events/create" },
      ],
    },
    {
      title: "Attendees",
      description: "Manage event attendees and user registrations",
      icon: Users,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      count: stats.totalAttendees,
      actions: [
        { label: "View All Attendees", path: "/admin/attendees" },
        { label: "Recent Registrations", path: "/admin/registrations" },
      ],
    },
    {
      title: "Bookings",
      description: "Monitor and manage event bookings and payments",
      icon: BookOpen,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      count: stats.totalBookings,
      actions: [
        { label: "View All Bookings", path: "/admin/bookings" },
        { label: "Booking Analytics", path: "/admin/bookings/analytics" },
      ],
    },
    {
      title: "Speakers",
      description: "Manage event speakers and their information",
      icon: Mic,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      count: stats.totalSpeakers,
      actions: [
        { label: "View All Speakers", path: "/admin/speakers" },
        { label: "Add New Speaker", path: "/admin/speakers/create" },
      ],
    },
    {
      title: "Sessions",
      description: "Schedule and manage event sessions",
      icon: Clock,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      count: stats.totalSessions,
      actions: [
        { label: "View All Sessions", path: "/admin/sessions" },
        { label: "Schedule New Session", path: "/admin/sessions/create" },
      ],
    },
    {
      title: "Analytics",
      description: "View reports and analytics dashboard",
      icon: BarChart3,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      count: `$${stats.totalRevenue}`,
      actions: [
        { label: "Dashboard Overview", path: "/admin/analytics" },
        { label: "Event Reports", path: "/admin/reports" },
      ],
    },
  ];

  const quickStats = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
      changeType: "increase",
    },
    {
      label: "Total Attendees",
      value: stats.totalAttendees,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+8%",
      changeType: "increase",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+15%",
      changeType: "increase",
    },
    {
      label: "Revenue",
      value: `$${stats.totalRevenue}`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
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
      {/* Header */}
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
              <button
                onClick={() => navigate("/myEvents")}
                className="public-site-btn"
              >
                <Eye className="btn-icon" />
                View Public Site
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-main-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome back, Administrator</h2>
          <p className="welcome-subtitle">
            Here's what's happening with your events and attendees today.
          </p>
        </div>

        {/* Quick Stats */}
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
          {/* Admin Sections Grid */}
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

          {/* Recent Activity Sidebar */}
          <div className="sidebar">
            <h3 className="sidebar-title">Recent Activity</h3>
            <div className="activity-card">
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === "booking" && (
                        <BookOpen className="activity-type-icon booking" />
                      )}
                      {activity.type === "event" && (
                        <Calendar className="activity-type-icon event" />
                      )}
                      {activity.type === "speaker" && (
                        <Mic className="activity-type-icon speaker" />
                      )}
                    </div>
                    <div className="activity-details">
                      <p className="activity-message">{activity.message}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="view-all-btn">View All Activities</button>
            </div>

            {/* System Status */}
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

        {/* Quick Actions Section */}
        <div className="quick-actions-card">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            <button
              onClick={() => navigate("/admin/events/create")}
              className="quick-action-btn blue"
            >
              <Plus className="quick-action-icon" />
              Create Event
            </button>
            <button
              onClick={() => navigate("/admin/speakers/create")}
              className="quick-action-btn green"
            >
              <Plus className="quick-action-icon" />
              Add Speaker
            </button>
            <button
              onClick={() => navigate("/admin/sessions/create")}
              className="quick-action-btn purple"
            >
              <Plus className="quick-action-icon" />
              Schedule Session
            </button>
            <button
              onClick={() => navigate("/admin/analytics")}
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
