import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 
import "../css/stylesMealDetail.css";

function MealDetail({ addToCart, cartLength }) {
  const [meals, setMeals] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      const querySnapshot = await getDocs(collection(db, "meals"));
      const mealsData = {};
      querySnapshot.forEach((doc) => {
        mealsData[doc.id] = { id: doc.id, ...doc.data() };
      });
      setMeals(mealsData);
    };

    fetchMeals();
  }, []);

  const handleShowDetails = (mealKey) => {
    setSelectedMeal({ ...meals[mealKey], key: mealKey, quantity: 1 });
  };

  const handleClose = () => setSelectedMeal(null);

  const handleAddToCart = () => {
    if (!selectedMeal) return;
    addToCart(selectedMeal);
    alert(`${selectedMeal.name} added to cart!`);
    setSelectedMeal(null);
    navigate("/cart"); // redirect to cart
  };

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
            <li><a href="/home-logged-in">Home</a></li>
            <li><a href="/search">Search Menu</a></li>
            <li><a href="/meal-detail">Nutrition Facts</a></li>
            <li><a href="/special-offers">Special Offers</a></li>
            <li><a href="/track-order">Track Order</a></li>
            <li><a href="/cart">MyCart ({cartLength})</a></li>
            <li><a href="/">Logout</a></li>
          </ul>
          <button className="login-btn" onClick={() => window.location.href = '/profile'}>
            <img src="/Images/account.svg" alt="User" className="user-icon" />
            MyAccount
          </button>
        </nav>
      </header>

      <div className="meals-container">
        <h2>Select a Meal to View Nutrition Facts</h2>
        <div className="meals-grid">
          {Object.entries(meals).map(([key, meal]) => (
            <div key={key} className="meal-card" onClick={() => handleShowDetails(key)}>
              <img src={meal.imageUrl || "/Images/default-meal.jpg"} alt={meal.name} />
              <h3>{meal.name || "Meal Name"}</h3>
              <p>{meal.description || "No description available."}</p>
              <p><strong>Price:</strong> ${meal.price ? meal.price.toFixed(2) : "N/A"}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedMeal && (
        <div id="meal-details" className="meal-details">
          <button id="close-btn" onClick={handleClose}>X</button>
          <h2>{selectedMeal.name}</h2>
          <img src={selectedMeal.imageUrl || "/Images/default-meal.jpg"} alt={selectedMeal.name} />
          <p>{selectedMeal.description}</p>

          {/* meal availability */}
          <p>
            <strong>Availability:</strong>{" "}
            <span style={{ color: selectedMeal.isAvailable ? "green" : "red" }}>
              {selectedMeal.isAvailable ? "Available" : "Out of Stock"}
            </span>
          </p>

          {/* list of ingredients */}
          <h3>Ingredients</h3>
          <ul>
            {/* if there are ingredients, display them, else show message that there are none listed */}
            {selectedMeal.ingredients?.length > 0 ? (
              selectedMeal.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>

          {/* nutritional facta  */}
          <h3>Nutrition Facts</h3>
          <ul>
            <li>Calories: {selectedMeal.calories || "N/A"}</li>
            <li>Protein: {selectedMeal.protein || "N/A"}</li>
            <li>Carbs: {selectedMeal.carbs || "N/A"}</li>
            <li>Fat: {selectedMeal.fat || "N/A"}</li>
          </ul>

          <p><strong>Price:</strong> ${selectedMeal.price ? selectedMeal.price.toFixed(2) : "N/A"}</p>

          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
}

export default MealDetail;
