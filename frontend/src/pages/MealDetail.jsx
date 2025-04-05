// src/pages/MealDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "../css/stylesMealDetail.css";

function MealDetail({ cartLength, refreshCart }) {
  const [meals, setMeals] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "meals"));
        const mealsData = {};
        querySnapshot.forEach((doc) => {
          mealsData[doc.id] = { id: doc.id, ...doc.data() };
        });
        setMeals(mealsData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  const handleShowDetails = (mealKey) => {
    setSelectedMeal({ ...meals[mealKey], key: mealKey, quantity: 1 });
  };

  const handleClose = () => setSelectedMeal(null);

  const handleAddToCart = () => {
    if (!selectedMeal) return;
    // Send the full meal object, not just mealId
    axios
      .post("http://127.0.0.1:3000/cart", {
        meal: selectedMeal,
        quantity: selectedMeal.quantity,
      })
      .then((response) => {
        alert(`${selectedMeal.name} added to cart successfully!`);
        // Optionally, call refreshCart if you need to update global cart state
        refreshCart && refreshCart();
        setSelectedMeal(null);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("Error adding to cart. Please try again.");
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
          <Link to="/cart">MyCart ({cartLength})</Link>
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

      <div className="meals-container">
        <h2>Select a Meal to View Nutrition Facts</h2>
        <div className="meals-grid">
          {Object.entries(meals).map(([key, meal]) => (
            <div
              key={key}
              className="meal-card"
              onClick={() => handleShowDetails(key)}
            >
              <img
                src={meal.imageUrl || "/Images/default-meal.jpg"}
                alt={meal.name}
              />
              <h3>{meal.name || "Meal Name"}</h3>
              <p>{meal.description || "No description available."}</p>
              <p>
                <strong>Price:</strong>{" "}
                {meal.price ? `$${meal.price.toFixed(2)}` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedMeal && (
        <div id="meal-details" className="meal-details">
          <button id="close-btn" onClick={handleClose}>
            X
          </button>
          <h2>{selectedMeal.name}</h2>
          <img
            src={selectedMeal.imageUrl || "/Images/default-meal.jpg"}
            alt={selectedMeal.name}
          />
          <p>{selectedMeal.description}</p>
          <p>
            <strong>Price:</strong>{" "}
            {selectedMeal.price ? `$${selectedMeal.price.toFixed(2)}` : "N/A"}
          </p>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
}

export default MealDetail;
