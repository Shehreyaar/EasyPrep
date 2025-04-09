import React, { useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

function EditProfile() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@email.com");
  const [phone, setPhone] = useState("+1 123-456-7890");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // continue - make code to save inside firebase....
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
          <Link to="/meal-detail">Nutrition Facts</Link>
          <Link to="/special-offers">Special Offers</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/">Logout</Link>
        </nav>
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/profile")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <div className="edit-profile-container">
        <h2>Edit Personal Information</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="+1 123-456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
