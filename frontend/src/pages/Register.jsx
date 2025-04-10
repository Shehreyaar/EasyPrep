import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";
import "../css/styles.css";
import "../css/registrationForm.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // validation errors
  const [errorMsg, setErrorMsg] = useState(""); // error message for registration
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!firstName || !/^[A-Za-z\s]{3,}$/.test(firstName)) {
      newErrors.firstName = "First name must have at least 3 letters and no numbers.";
    }
    if (!lastName || !/^[A-Za-z\s]{3,}$/.test(lastName)) {
      newErrors.lastName =  "Last name must have at least 3 letters and no numbers.";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email =  "Invalid email address.";
    }
    if (password.length < 6) {
      newErrors.password =  "Password must have at least 6 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword =  "Passwords do not match.";
    }
    if (!/^\d{3} \d{3} \d{4}$/.test(phone)) {
      newErrors.phone = "Phone must be in format xxx xxx xxxx.";
    }
    if (address.length < 5) {
      newErrors.address = "Address must have at least 5 characters.";
    }
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrorMsg("");
      setErrors(validationErrors);
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
          <h2>Create an account</h2>
          <form onSubmit={handleRegister}>
          <div className="form-row">
  <div className="form-group">
    <label>First Name</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
    {errors.firstName && <p className="error-message">{errors.firstName}</p>}
  </div>

  <div className="form-group">
    <label>Last Name</label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
    />
    {errors.lastName && <p className="error-message">{errors.lastName}</p>}
  </div>
</div>

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label>Phone Number</label>
            <input
              type="text"
              placeholder="123 456 7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}

            <label>Address</label>
            <input
              type="text"
              placeholder="123 Easy Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <p className="error-message">{errors.address}</p>}

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

            <button type="submit" className="submit-btn">Sign Up</button>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
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

