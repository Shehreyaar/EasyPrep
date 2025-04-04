import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setFullName(`${data.firstName} ${data.lastName}`);
        setEmail(data.email);
        setPhone(data.phoneNumber);
        setAddress(data.address);
      }
    };

    fetchUserData();
  }, []);

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
          <h2>{fullName || "Loading..."}</h2>
          <p className="email">{email || "..."}</p>          
        </div>

        <div className="profile-details">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info">
              <p><strong>Name:</strong>{" " +fullName || "Loading..."}</p>
              <p><strong>Email:</strong>{" " + email || "..."}</p>
              <p><strong>Phone:</strong>{" " + phone || "..."}</p>
            </div>
            <Link to="/edit-profile" className="edit-btn">Edit</Link>
          </div>
          

          <div className="profile-section">
            <h3>Saved Address</h3>
            <div className="address">
              <p>{address || "..."}</p>
            </div>
            <Link to="/manage-address" className="edit-btn">Manage Address</Link>
          </div>

          {/*
          <div className="profile-section">
            <h3>Security & Settings</h3>
            <p>Change Password</p>            
            <button className="edit-btn">Update Settings</button>
          </div>*/}
        </div>
      </div>
    </>
  );
}

export default Profile;
