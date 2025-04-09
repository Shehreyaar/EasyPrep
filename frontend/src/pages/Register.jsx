import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import '../css/styles.css';

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, fullName);
      alert("Account successfully created!");
      navigate("/login");
    } catch (error) {
      alert("Error creating account: " + error.message);
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
        <Link to="/login">Nutrition Facts</Link>
        <Link to="/login">Special Offers</Link>
        <Link to="/login">Track Order</Link>
      </nav>
        <button className="login-btn">
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          Login/Signup
        </button>
      </header>

      <div className="auth-container">
        <div className="auth-box">
          <h2>Create an account</h2>
          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">Sign Up</button>
          </form>

          <p className="switch-auth">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
