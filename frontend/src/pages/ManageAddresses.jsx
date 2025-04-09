import React, { useState } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

function ManageAddresses() {
  const [addresses, setAddresses] = useState([
    { label: "Home", address: "123 Main Street, New York, NY" },
    { label: "Work", address: "456 Office Blvd, Manhattan, NY" }
  ]);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newLabel && newAddress) {
      setAddresses([...addresses, { label: newLabel, address: newAddress }]);
      setNewLabel("");
      setNewAddress("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
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
          <li><a href="/home-logged-in">Home</a></li>
          <li><a href="/search">Search Menu</a></li>
          <li><a href="/meal-detail">Nutrition Facts</a></li>
          <li><a href="/special-offers">Special Offers</a></li>
          <li><a href="/track-order">Track Order</a></li>
          <li><a href="/cart">MyCart</a></li>
          <li><a href="/">Logout</a></li>
        </nav>

        <button
          className="login-btn"
          onClick={() => (window.location.href = "/profile")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <div className="address-container">
        <h2>Manage Addresses</h2>

        <div className="address-list">
          {addresses.map((addr, index) => (
            <div key={index} className="address-card">
              <p><strong>{addr.label}:</strong> {addr.address}</p>
              <button className="edit-btn" onClick={() => alert("Edit not implemented")}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>

        <div className="add-address">
          <h3>Add New Address</h3>
          <form onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Label (e.g., Home, Work)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Full Address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">Add Address</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ManageAddresses;
