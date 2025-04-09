import React, { useState } from "react";
import { auth } from "../firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import "../css/styles.css";

function Settings() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) return alert("Usuário não autenticado");
    if (newPassword !== confirmPassword) return alert("As senhas não coincidem");

    const credential = EmailAuthProvider.credential(currentEmail, currentPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Senha atualizada com sucesso");
      setCurrentEmail("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Erro ao atualizar senha: " + error.message);
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
