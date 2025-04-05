import React, { useState } from "react";
import { forgotPassword } from "../services/authService";
import "../css/styles.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Password reset link sent to your email!");
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (

    <>

    <header className="header">
        <div className="logo-container">
          <img src="/Images/logoEasyPrep.svg" alt="Logo" className="logo" />
        </div>
        <div className="nameApp">
          <img src="/Images/nameApp.png" alt="NameApp" className="name" />
        </div>
        <nav className="nav-menu">
          <Link to="/home-logged-in">Home</Link>
          <Link to="/search">Search Menu</Link>
          <Link to="#">Special Offers</Link>
          <Link to="#">Nutrition Facts</Link>
          <Link to="#">Track Order</Link>
        </nav>
        <button className="login-btn">
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          Login/Signup
        </button>
    </header>

      <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>
        {message && <p style={{ marginTop: "10px", color: "#C72B28" }}>{message}</p>}
      </div>
    </div>
    </>
    
  );
}

export default ForgotPassword;

