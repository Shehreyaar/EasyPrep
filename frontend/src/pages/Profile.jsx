import React from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

function Profile() {
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
          <Link to="#">BoxMeals</Link>
          <Link to="#">Track Order</Link>
          <Link to="/cart">MyCart</Link>
          <Link to="/">Logout</Link>
        </nav>


        <button className="login-btn" onClick={() => alert("Logout clicked!")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          Logout
        </button>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <img src="/Images/profile.png" alt="Profile" className="profile-pic" />
          <h2>John Doe</h2>
          <p className="email">johndoe@email.com</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        <div className="profile-details">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info">
              <p><strong>Full Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@email.com</p>
              <p><strong>Phone:</strong> +1 123-456-7890</p>
            </div>
            <Link to="/edit-profile" className="edit-btn">Edit</Link>
          </div>

          <div className="profile-section">
            <h3>Order History</h3>
            <div className="order">
              <p><strong>Order #12345</strong> - Delivered</p>
              <p>Date: March 15, 2024</p>
              <p>Items: 2x Vegan Box, 1x Family Pack</p>
            </div>
            <button className="edit-btn">View All Orders</button>
          </div>

          <div className="profile-section">
            <h3>Saved Addresses</h3>
            <div className="address">
              <p>Home - 123 Main Street, New York, NY</p>
            </div>
            <Link to="/manage-addresses" className="edit-btn">Manage Addresses</Link>
          </div>

          <div className="profile-section">
            <h3>Security & Settings</h3>
            <p>Change Password</p>
            <p>Notification Preferences</p>
            <button className="edit-btn">Update Settings</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
