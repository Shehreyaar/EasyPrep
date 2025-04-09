import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

function Settings() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

   // const user = auth.currentUser;

    //if (!user) return alert("Usuário não autenticado");
    if (newPassword !== confirmPassword){
      alert("Passwords do not match.");
      return;
    }

    //const credential = EmailAuthProvider.credential(currentEmail, currentPassword);

    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:3000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: currentEmail,
          currentPassword,
          newPassword
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Password update failed");
      }

      alert("Password updated successfully.");
      setCurrentEmail("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Error: " + err.message);
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
          onClick={() => (window.location.href = "/profile")}
        >
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <div className="address-container">
        <h2>Account Settings</h2>

        <div className="add-address">
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <input
              type="email"
              placeholder="Your email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Settings;
