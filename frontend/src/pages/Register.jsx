import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import "../css/styles.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !address) {
      return "All fields must be filled.";
    }
    if (!/^[A-Za-z\s]{3,}$/.test(firstName)) {
      return "First name must have at least 3 letters.";
    }
    if (!/^[A-Za-z\s]{3,}$/.test(lastName)) {
      return "Last name must have at least 3 letters.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email address.";
    }
    if (password.length < 6) {
      return "Password must have at least 6 characters.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (!/^\d{3} \d{3} \d{4}$/.test(phone)) {
      return "Phone must be in format xxx xxx xxxx.";
    }
    if (address.length < 5) {
      return "Address must have at least 5 characters.";
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMsg(error);
      return;
    }

    try {
      await register(email, password, firstName, lastName, phone, address);
      navigate("/login");
    } catch (error) {
      setErrorMsg("Error creating account: " + error.message);
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
          <Link to="#">BoxMeals</Link>
          <Link to="#">Track Order</Link>
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
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

            <label>Phone Number</label>
            <input
              type="text"
              placeholder="123 456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label>Address</label>
            <input
              type="text"
              placeholder="123 Easy Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">Sign Up</button>
          </form>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <p className="switch-auth">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;

