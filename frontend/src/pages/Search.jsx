import React, { useState, useEffect } from "react";
import { db } from "../firebase.js"; 
import { collection, getDocs } from "firebase/firestore";
import "../css/stylesSearch.css";

function Search() {
  // state to hold search input, meal category and list of meals
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [meals, setMeals] = useState([]);

  // fetch meals from Firebase when the component loads
  useEffect(() => {
    const fetchMeals = async () => {
      const querySnapshot = await getDocs(collection(db, "meals"));
      const mealData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMeals(mealData);
    };
    
    fetchMeals();
  }, []);

  // filter meals based on category/search term
  const filteredMeals = meals.filter(meal =>
    (category === "all" || meal.categories.includes(category)) &&
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
            <option value="Burgers & Fast Foods">Burgers & Fast Foods</option>
            <option value="ComfortFood">Comfort Food</option>
            <option value="Family">Family</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="High-Protein">High-Protein</option>
            <option value="Italian">Italian</option>
            <option value="Keto">Keto</option>
            <option value="Kids">Kids</option>
            <option value="Lebanese">Lebanese</option>
            <option value="Low-Carb">Low-Carb</option>
            <option value="Mexican">Mexican</option>
            <option value="Soups">Soups</option>
            <option value="Thai">Thai</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>

        </div>

        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <div className="meal-card" key={meal.id} data-category={meal.categories.join(", ")}> 
              <img src={meal.imageUrl} alt={meal.name} className="meal-image" />
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
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
              <li><a href="#">Search Menu</a></li>
              <li><a href="#">Special Offers</a></li>
              <li><a href="#">Box Meals</a></li>
              <li><a href="#">Track Order</a></li>
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
