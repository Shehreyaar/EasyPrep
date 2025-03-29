// src/pages/Search.jsx

import React, { useState, useContext } from "react";
import "../css/stylesSearch.css";
import { CartContext } from "../services/CartContext";
import { Link } from "react-router-dom";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  // Pull the addToCart function from the context
  const { addToCart } = useContext(CartContext);

  const meals = [
    {
      name: "Veggie Delight",
      desc: "Fresh vegetables and quinoa.",
      category: "vegetarian",
      img: "/Images/veggieDelight.jpeg",
    },
    {
      name: "Keto Chicken",
      desc: "Grilled chicken with low-carb veggies.",
      category: "keto",
      img: "/Images/ketoChicken.jpeg",
    },
    {
      name: "Protein Power Bowl",
      desc: "Packed with protein and nutrients.",
      category: "high-protein",
      img: "/Images/proteinPowerBowl.jpeg",
    },
    {
      name: "Quinoa Salad",
      desc: "Mixed greens and quinoa.",
      category: "vegetarian",
      img: "/Images/quinoaSalad.jpeg",
    },
    {
      name: "Salmon Keto",
      desc: "Grilled salmon with avocado.",
      category: "keto",
      img: "/Images/salmonKeto.jpeg",
    },
    {
      name: "Beef Steak",
      desc: "High-protein grilled beef steak.",
      category: "high-protein",
      img: "/Images/beefSteak.jpeg",
    },
  ];

  const filteredMeals = meals.filter((meal) =>
    (category === "all" || meal.category === category) &&
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo-container">
            <img src="/Images/logoEasyPrep.svg" alt="EasyPrep" className="logo" />
          </div>
          <div className="nameApp">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
          </div>
          <ul className="nav-links">
            <li><Link to="/home-logged-in">Home</Link></li>
            <li><Link to="/search">Search Menu</Link></li>
            <li><Link to="/meal-detail">Nutrition Facts</Link></li>
            <li><Link to="/special-offers">Special Offers</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/cart">MyCart</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
          <button className="login-btn" onClick={() => window.location.href = '/profile'}>
            <img src="/Images/account.svg" alt="User" className="user-icon" />
            MyAccount
          </button>
        </nav>
      </header>
      
      <section className="cart-container">
        <h1>Search for Prepped Meals</h1>
        <p>Fresh, delicious, and delivered to your doorstep.</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="keto">Keto</option>
            <option value="high-protein">High Protein</option>
          </select>
        </div>

        <div className="meal-grid">
          {filteredMeals.map((meal, index) => (
            <div className="meal-card" key={index} data-category={meal.category}>
              <img src={meal.img} alt={meal.name} className="meal-image" />
              <h3>{meal.name}</h3>
              <p>{meal.desc}</p>
              <button onClick={() => addToCart(meal)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>About EasyPrep</h3>
            <p>Your best choice for meal prepping, delivering fresh and healthy meals directly to your door.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="#">Search Menu</Link></li>
              <li><Link to="#">Special Offers</Link></li>
              <li><Link to="#">Box Meals</Link></li>
              <li><Link to="#">Track Order</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><img src="/Images/facebook.svg" alt="Facebook" /></a>
              <a href="#"><img src="/Images/instagram.svg" alt="Instagram" /></a>
              <a href="#"><img src="/Images/twitter.svg" alt="Twitter" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 EasyPrep. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Search;
