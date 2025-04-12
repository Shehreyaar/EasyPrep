import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { getFullProfile } from "../services/authService";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getFullProfile();
        setUid(data.uid);
        setFullName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to="/home-logged-in">
            <img src="/Images/logoEasyPrep.svg" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nameApp">
          <Link to="/home-logged-in">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
          </Link>
        </div>
       {/* <p><strong>UID:</strong> {uid}</p> */}
        <nav className="nav-menu">
          <Link to="/search">Search Menu</Link>
          <Link to="/meal-detail">Nutrition Facts</Link>
          <Link to="/special-offers">Special Offers</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/">Logout</Link>
        </nav>
        <button className="login-btn" onClick={() => window.location.href = '/profile'}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <img src="/Images/profile.png" alt="Profile" className="profile-pic" />
          <h2>{fullName || "Loading..."}</h2>
          <p className="email">{email || "..."}</p>          
        </div>

        <div className="profile-details">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info">
              <p><strong>Name:</strong>{fullName}</p>
              <p><strong>Email:</strong>{email}</p>
              <p><strong>Phone:</strong>{phone}</p>
            </div>
            <Link to="/edit-profile" className="edit-btn">Edit</Link>
          </div>
          

          <div className="profile-section">
            <h3>Saved Address</h3>
            <div className="address">
              <p>{address}</p>
            </div>
            <Link to="/manage-address" className="edit-btn">Manage Address</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
