// src/pages/Cart.jsx

import React, { useContext } from "react";
import "../css/styles.css";
import "../css/cartStyle.css";
import { CartContext } from "../services/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, updateQuantity } = useContext(CartContext);
  
  console.log("Current cart:", cart);

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
        <button
          className="login-btn"
          onClick={() => (window.location.href = "/profile")}
        >
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <section className="cart-container">
        <h2 className="section-title">Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((section, catIndex) => (
            <div key={catIndex} className="cart-item">
              <h2>{section.category}</h2>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="order-item">
                  <p className="meal-name">{item.name}</p>
                  <ul className="ingredients">
                    {item.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                  <div className="quantity-control">
                    <button
                      className="decrease"
                      onClick={() => updateQuantity(catIndex, itemIndex, -1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="increase"
                      onClick={() => updateQuantity(catIndex, itemIndex, +1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        <button
          className="checkout-btn"
          onClick={() => alert("Proceeding to checkout...")}
        >
          Proceed to Checkout
        </button>
      </section>
    </>
  );
}

export default Cart;
