// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/cartStyle.css";

function Cart({ cart, refreshCart }) {
  const handleDelete = (cartItemId) => {
    axios.delete(`http://127.0.0.1:3000/cart/${cartItemId}`)
      .then(() => {
        refreshCart();
      })
      .catch((error) => {
        console.error("Error deleting meal:", error);
        alert("Error deleting meal from cart");
      });
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
          <Link to="/cart">MyCart</Link>
          <Link to="/">Logout</Link>
        </nav>
        <button className="login-btn" onClick={() => window.location.href = "/profile"}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <section className="cart-container">
        <h2 className="section-title">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img
                src={item.meal.imageUrl || "/Images/default-meal.jpg"}
                alt={item.meal.name}
                className="meal-img"
              />
              <div className="item-details">
                <h3>{item.meal.name}</h3>
                <p>Price: ${item.meal.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
}

export default Cart;
