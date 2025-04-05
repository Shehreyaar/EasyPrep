import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";



function ManageAddress() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setAddress(data.address || "");
      }
    };

    fetchAddress();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    if (!uid) return;

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { address }, { merge: true });
      setMessage("Address updated successfully!");
    } catch (err) {
      console.error("Error updating address:", err);
      setMessage("Failed to update address.");
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
          <Link to="/meal-detail">Nutrition Facts</Link>
          <Link to="#">BoxMeals</Link>
          <Link to="#">Track Order</Link>
          <Link to="/cart">MyCart</Link>
          <Link to="/">Logout</Link>
        </nav>

        <button
          className="login-btn"
          onClick={() => (window.location.href = "/profile")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <div className="address-container">
        <h2>Manage Address</h2>
        <form onSubmit={handleSave} className="add-address">
          <label htmlFor="address">My Address</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter your full address"
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: "10px" }}
            required
          />
          <button type="submit" className="submit-btn">Save Address</button>
        </form>
        {message && <p style={{ marginTop: "10px", color: "#C72B28", fontWeight: "bold" }}>{message}</p>}
      </div>
    </>
  );
}

export default ManageAddress;