import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { getUserAddress, updateUserAddress } from "../services/authService";



function ManageAddress() {
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await getUserAddress();
        setAddress(data.address);
      } catch (err) {
        setMessage("Failed to fetch address.");
      }
    };

    fetchAddress();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserAddress(address);
      setMessage("Address updated successfully!");
    } catch (err) {
      setMessage("Failed to update address.");
    }
  };

  
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
        <nav className="nav-menu">
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