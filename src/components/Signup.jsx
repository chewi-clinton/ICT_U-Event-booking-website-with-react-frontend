import React, { useState } from "react";
import "../styles/Signup.css";

const Signup = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup attempt:", formData);
      alert("Signup functionality would be implemented here");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    if (setCurrentPage) {
      setCurrentPage("login");
    } else {
      alert("Login functionality would be implemented here");
    }
  };

  return (
    <div>
      <div className="signup-container">
        <form className="signup-box" onSubmit={handleSubmit}>
          <h2 className="signup-title">Create an account</h2>
          <p className="signup-subtitle">
            Already have an account?{" "}
            <button
              type="button"
              className="signup-link"
              onClick={handleLoginClick}
            >
              Log in
            </button>
          </p>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="signup-input"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your email address"
            className="signup-input"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="signup-input"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="signup-input"
            value={formData.confirmPassword}
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
    </div>
  );
};

export default Signup;
