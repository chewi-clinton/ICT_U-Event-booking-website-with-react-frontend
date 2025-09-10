import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("login/", {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.user_id);
      alert("Login successful!");
      navigate("/myEvents");
    } catch (error) {
      console.error("Login error:", error);
      alert(
        error.response?.data?.non_field_errors ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would be implemented here");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1 className="login-title">Sign in to your account</h1>
        <div className="form-group">
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="current-password"
          />
        </div>
        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
            />
            Remember me
          </label>
          <button
            type="button"
            className="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        <div className="signup-link-container">
          Don't have an account?{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
