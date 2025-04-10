import React, { useEffect, useState } from "react";
import "../css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { updateProfileBackend, getProfileBackend } from "../services/authService";

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {      
      try {
        const data = await getProfileBackend();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhone(data.phoneNumber || "");
        setAddress(data.address || "");
      } catch (err) {
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const validate = () => {
    if (!/^[A-Za-z\s]{3,}$/.test(firstName)) {
      return "First name must contain only letters and have at least 3 characters.";
    }
    if (!/^[A-Za-z\s]{3,}$/.test(lastName)) {
      return "Last name must contain only letters and have at least 3 characters.";
    }
    if (!/^\d{3} \d{3} \d{4}$/.test(phone)) {
      return "Phone must be in format xxx xxx xxxx.";
    }
    if (address.length < 5) {
      return "Address must have at least 5 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await updateProfileBackend({ firstName, lastName, phoneNumber: phone, address });
      navigate("/profile");
    } catch (err) {
      setError("Error updating profile: " + err.message);
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
          onClick={() => (window.location.href = "/profile")}
        >
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          My Account
        </button>
      </header>

      <div className="edit-profile-container">
        <h2>Edit Personal Information</h2>

        {error && <p className="error-message">{error}</p>}

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="123 456 7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
