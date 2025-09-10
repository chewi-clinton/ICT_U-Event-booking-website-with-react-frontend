import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

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

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt:", formData);
      alert("Login functionality would be implemented here");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would be implemented here");
  };

  const handleSignUpClick = () => {
    if (setCurrentPage) {
      setCurrentPage("signup");
    } else {
      alert("Sign up functionality would be implemented here");
    }
  };

  return (
    <div>
      <div className="login-container">
        <form className="login-box" onSubmit={handleSubmit}>
          <h1 className="login-title">Sign in to your account</h1>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="login-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
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
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
