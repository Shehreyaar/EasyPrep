import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

function HomeLoggedIn() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [meals, setMeals] = useState([]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("uid");
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:3000/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setMeals(data);
        } else {
          console.error("Expected array but got:", data);
          setMeals([]);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  const allCategories = [
    "Vegan",
    "Vegetarian",
    "Family",
    "Thai",
    "Mexican",
    "Gluten-Free",
    "Low-Carb"
  ];

  // Filter meals based on selected category
  const filteredMeals = selectedCategory === "all"
    ? meals
    : meals.filter(meal =>
        meal.categories &&
        meal.categories.map(c => c.toLowerCase()).includes(selectedCategory.toLowerCase())
      );

  return (
    <>
      {/* Header remains unchanged */}
      <header className="header">
        <div className="logo-container">
          <Link to="/home-logged-in">
            <img src="/Images/logoEasyPrep.svg" alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nameApp">
          <Link to="/home-logged-in">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/search">Search Menu</Link>
          <Link to="/meal-detail">Nutrition Facts</Link>
          <Link to="/special-offers">Special Offers</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </nav>
        <button className="login-btn" onClick={() => (window.location.href = "/profile")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      {/* Welcome + Status Section */}
      <section className="horizontal-stack">
        <div className="text-content">
          <h1>Meal Prepping</h1>
          <h2>made Simple</h2>
        </div>
        <div className="banner-container">
          <img src="/Images/banner2.svg" alt="Banner" className="banner-img" />
        </div>
        <div className="orange-box">
          {[
            ["We've received your order", "Preparing box meal..."],
            ["Picking the best ingredients for you!", "Your order will be delivered shortly..."],
            ["Your rider's nearby", "They're almost there - get ready..."]
          ].map(([title, subtitle], i) => (
            <div key={i} className="info-card">
              <img src="/Images/logoEasyPrep.svg" alt="Logo" className="info-logo" />
              <div className="info-text">
                <p className="info-title">{title}</p>
                <p className="info-subtitle">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👉 Food Categories (Clickable) */}
      <section className="menu-categories">
        {allCategories.map((cat) => (
          <div
            key={cat}
            className={`category ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
            data-category={cat}
          >
            {cat}
          </div>
        ))}
      </section>

      {/* 👉 Horizontal Scroll Meals View */}
      <section className="menu-scroll">
        <div className="menu-container">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <div key={meal.id} className="menu-item">
                <img src={meal.imageUrl} alt={meal.name} className="menu-img" />
                <div className="menu-info">
                  <h3>{meal.categories?.[0] || "Meal"}</h3>
                  <p>{meal.name}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No meals available in this category.</p>
          )}
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="popular-categories">
        <h2 className="section-title">EasyPrep Popular Categories</h2>
        <div className="categories-scroll">
          {[
            ["burger", "Burgers & Fast Food"],
            ["vegan", "Vegan"],
            ["italian", "Italian"],
            ["pizza", "Kids"],
            ["confortFood", "Comfort Food"],
            ["soup", "Soups"],
          ].map(([img, name]) => (
            <div key={img} className="category-item">
              <img src={`/Images/${img}.png`} alt={name} className="category-img" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="full-width-banner">
        <img src="/Images/bannerBottom.jpg" alt="BannerBottom" className="full-banner-img" />
      </section>

      {/* Footer */}
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

export default HomeLoggedIn;
