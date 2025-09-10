import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Signup.css";

const Signup = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.phone
    ) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("register/", formData);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      alert(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create an account</h2>
        <p className="signup-subtitle">
          Already have an account?{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="signup-input"
          value={formData.username}
          onChange={handleInputChange}
          autoComplete="username"
          required
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="signup-input"
          value={formData.first_name}
          onChange={handleInputChange}
          autoComplete="given-name"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="signup-input"
          value={formData.last_name}
          onChange={handleInputChange}
          autoComplete="family-name"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="signup-input"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="signup-input"
          value={formData.phone}
          onChange={handleInputChange}
          autoComplete="tel"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="signup-input"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="new-password"
          required
        />

        <button type="submit" className="signup-button" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign up"}
        </button>

        <p className="signup-terms">
          By signing up, you agree to our{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => alert("Terms of Service would open here")}
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="signup-link"
            onClick={() => alert("Privacy Policy would open here")}
          >
            Privacy Policy
          </button>
          .
        </p>
      </form>
    </div>
  );
};

export default Signup;
