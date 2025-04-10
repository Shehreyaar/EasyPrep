import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/stylesMealDetail.css";

function MealDetail({ addToCart, cartLength }) {
  const [meals, setMeals] = useState({});
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      //const querySnapshot = await getDocs(collection(db, "meals"));
      //const mealsData = {};
      //querySnapshot.forEach((doc) => {
        //mealsData[doc.id] = { id: doc.id, ...doc.data() };
      //});
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:3000/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const data = await res.json();
        const mealsData = {};
        data.forEach((meal) => {
          mealsData[meal.id] = meal;
        });
        setMeals(mealsData); // this line stays the same
      } catch (error) {
        console.error("Failed to load meals:", error);
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
            <a href="/home-logged-in">
              <img src="/Images/logoEasyPrep.svg" alt="EasyPrep" className="logo" />
            </a>
          </div>
          <div className="nameApp">
          <a href="/home-logged-in">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
            </a>
          </div>
          <ul className="nav-links">
            <li><a href="/search">Search Menu</a></li>
            <li><a href="/meal-detail">Nutrition Facts</a></li>
            <li><a href="/special-offers">Special Offers</a></li>
            <li><a href="/track-order">Track Order</a></li>
            <li><a href="/cart">My Cart ({cartLength})</a></li>
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
      <div id="meal-details" className="meal-details two-column-layout">
        <button className="close-btn" onClick={handleClose}>X</button>
        <div className="image-section">
          <img src={selectedMeal.imageUrl || "/Images/default-meal.jpg"} alt={selectedMeal.name} />
        </div>
        <div className="info-section">
          <h2>{selectedMeal.name}</h2>

          <p className="spaced-block">{selectedMeal.description}</p>

          <p className="spaced-block">
            <strong>Availability:</strong>{" "}
            <span style={{ color: selectedMeal.isAvailable ? "green" : "red" }}>
              {selectedMeal.isAvailable ? "Available" : "Out of Stock"}
            </span>
          </p>

          <div className="spaced-block">
            <h3>Ingredients</h3>
            <p>{selectedMeal.ingredients?.length > 0
              ? selectedMeal.ingredients.join(", ")
              : "No ingredients listed."}</p>
          </div>

          <div className="spaced-block">
            <h3>Nutrition Facts</h3>
            <p>
              Calories: {selectedMeal.calories || "N/A"} | Protein: {selectedMeal.protein || "N/A"} | 
              Carbs: {selectedMeal.carbs || "N/A"} | Fat: {selectedMeal.fat || "N/A"}
            </p>
          </div>

          <p className="price-display spaced-block">
            <strong>Price:</strong> <span>${selectedMeal.price ? selectedMeal.price.toFixed(2) : "N/A"}</span>
          </p>

          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    )}
  </>
);}

export default MealDetail;
