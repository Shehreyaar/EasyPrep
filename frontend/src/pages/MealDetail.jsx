import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/stylesMealDetail.css";

function MealDetail({ addToCart, cartLength }) {

  //meals holds the meal data 
  //setMeals is the function to update the data 
  const [meals, setMeals] = useState({});

  //selectedMeal holds the meal that the user has clicked 
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    //load all the meals from the backend 
    const fetchMeals = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:3000/meals", {
          //make a requeast in the backend to get the meals 
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }); 
        //converts response into json 
        const data = await res.json();
        const mealsData = {};

        //convert meal list to map whete the key is the mealID
        data.forEach((meal) => {
          mealsData[meal.id] = meal;
        });
        setMeals(mealsData); 
      } catch (error) {
        console.error("Failed to load meals:", error);
      }
    };

    fetchMeals();
  }, []);

  //
  const handleSelectedMeal = (mealKey) => {
    setSelectedMeal({ ...meals[mealKey], key: mealKey, quantity: 1 });
  };

  const handleClose = () => setSelectedMeal(null);

  const handleAddToCart = async () => {
    //makes sure a meal is selected before trying to add it to the cart 
    if (!selectedMeal) return;
  
    try {
      const token = sessionStorage.getItem("token");

      //makes a post request to the /cart endpoint 
      const res = await fetch("http://127.0.0.1:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //confirms authorization to perfrm action 
        },
        //converts the data to json using JSON.stringify 
        body: JSON.stringify({
          mealId: selectedMeal.id,
          quantity: selectedMeal.quantity || 1,
        }),
      });
  
      //error message if response is not okay 
      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }
  
      //show message with chosen meal 
      alert(`${selectedMeal.name} added to cart!`);

      //clears the selected meal 

      setSelectedMeal(null);
      
      //navigate("/cart"); no need to navigate to the cart page everytime a meal gets added 
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
            <div key={key} className="meal-card" onClick={() => handleSelectedMeal(key)}>
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
