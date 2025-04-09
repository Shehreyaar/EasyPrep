import React, { useState } from "react";
import "../css/stylesMealDetail.css";

function MealDetail() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const meals = {
    chicken: {
      title: "Chicken & Rice",
      desc: "High in protein & great for muscle growth.",
      img: "/Images/chickenandrice.jpg",
      nutrition: ["Calories: 450", "Protein: 35g", "Carbs: 40g", "Fat: 15g"]
    },
    salmon: {
      title: "Salmon & Quinoa",
      desc: "Rich in Omega-3 and essential nutrients.",
      img: "/Images/salmonquinoa.jpg",
      nutrition: ["Calories: 480", "Protein: 32g", "Carbs: 30g", "Fat: 22g"]
    },
    beef: {
      title: "Beef & Sweet Potato",
      desc: "A balanced meal for energy and strength.",
      img: "/Images/beefandsweetpotato.jpg",
      nutrition: ["Calories: 500", "Protein: 40g", "Carbs: 35g", "Fat: 18g"]
    },
    tofu: {
      title: "Tofu & Veggies",
      desc: "Perfect vegetarian option packed with protein.",
      img: "/Images/tofuandveggies.jpg",
      nutrition: ["Calories: 400", "Protein: 25g", "Carbs: 30g", "Fat: 15g"]
    },
    pasta: {
      title: "Whole Wheat Pasta",
      desc: "High in fiber and perfect for carb lovers.",
      img: "/Images/wholewheatpasta.jpg",
      nutrition: ["Calories: 430", "Protein: 20g", "Carbs: 55g", "Fat: 10g"]
    }
  };

  const handleShowDetails = (mealKey) => {
    setSelectedMeal(meals[mealKey]);
  };

  const handleClose = () => {
    setSelectedMeal(null);
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
          <li><a href="/cart">MyCart</a></li>
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
              <img src={meal.img} alt={meal.title} />
              <h3>{meal.title}</h3>
              <p>{meal.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedMeal && (
        <div id="meal-details" className="meal-details">
          <button id="close-btn" onClick={handleClose}>X</button>
          <h2>{selectedMeal.title}</h2>
          <img src={selectedMeal.img} alt={selectedMeal.title} />
          <p>{selectedMeal.desc}</p>
          <h3>Nutrition Facts</h3>
          <ul>
            {selectedMeal.nutrition.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>About EasyPrep</h3>
            <p>Your best choice for meal prepping, delivering fresh and healthy meals directly to your door.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/search">Search Menu</a></li>
              <li><a href="/meal-detail">Nutrition Facts</a></li>
              <li><a href="/special-offers">Special Offers</a></li>
              <li><a href="/track-order">Track Order</a></li>
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

export default MealDetail;
