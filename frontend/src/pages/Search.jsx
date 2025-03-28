import React, { useState } from "react"
import "../css/stylesSearch.css"

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const meals = [
    {
      name: "Veggie Delight",
      desc: "Fresh vegetables and quinoa.",
      category: "vegetarian",
      img: "/Images/veggieDelight.jpeg"
    },
    {
      name: "Keto Chicken",
      desc: "Grilled chicken with low-carb veggies.",
      category: "keto",
      img: "/Images/ketoChicken.jpeg"
    },
    {
      name: "Protein Power Bowl",
      desc: "Packed with protein and nutrients.",
      category: "high-protein",
      img: "/Images/proteinPowerBowl.jpeg"
    },
    {
      name: "Quinoa Salad",
      desc: "Mixed greens and quinoa.",
      category: "vegetarian",
      img: "/Images/quinoaSalad.jpeg"
    },
    {
      name: "Salmon Keto",
      desc: "Grilled salmon with avocado.",
      category: "keto",
      img: "/Images/salmonKeto.jpeg"
    },
    {
      name: "Beef Steak",
      desc: "High-protein grilled beef steak.",
      category: "high-protein",
      img: "/Images/beefSteak.jpeg"
    },
  ];

  const filteredMeals = meals.filter(meal =>
    (category === "all" || meal.category === category) &&
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <><header className="header">
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
          <li><a href="#">Box Meals</a></li>
          <li><a href="#">Track Order</a></li>
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
