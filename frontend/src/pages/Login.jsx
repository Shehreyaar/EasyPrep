import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, forgotPassword } from "../services/authService";
import '../css/styles.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home-logged-in");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
  
    try {
      await forgotPassword(email);
      setMessage("A reset link has been sent to your email.");
      setError("");
    } catch (err) {
      setError("Failed to send reset email.");
      setMessage("");
    }
  };
  

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src="/Images/logoEasyPrep.svg" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nameApp">
          <Link to="/">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/login">Search Menu</Link>
          <Link to="/login">Special Offers</Link>
          <Link to="/login">Nutrition Facts</Link>
          <Link to="/login">Track Order</Link>
        </nav>
        <button className="login-btn">
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          Login/Signup
        </button>
      </header>

      <div className="auth-container">
        <div className="auth-box">
          <h2>Log in to EasyPrep</h2>
          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">              
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="submit-btn">Log In</button>
          </form>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
