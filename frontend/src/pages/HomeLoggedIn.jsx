import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function HomeLoggedIn() {
    const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Family');
  
  useEffect(() => {
    const fetchMeals = async () => {
      const querySnapshot = await getDocs(collection(db, "meals"));
      const allMeals = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMeals(allMeals);
    };
  
    fetchMeals();
  }, []);
  
  const filteredMeals = selectedCategory
    ? meals.filter(meal => meal.categories?.includes(selectedCategory))
    : meals;

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
          <Link to="/cart">My Cart</Link>
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

      {/* Menu categories */}
      <section className="menu-categories">
  {["Vegan", "Vegetarian", "Family", "Thai", "Mexican", "Gluten-Free", "Low-Carb"].map(cat => (
        <div
          key={cat}
          className={`category ${selectedCategory === cat ? 'active' : ''}`}
          data-category={cat}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </div>
  ))}
      </section>


      {/* Menu scroll */}
      <section className="menu-scroll">
        <div className="menu-container">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="menu-item">
              <img src={meal.imageUrl} alt={meal.name} className="menu-img" />
              <div className="menu-info">
                <h3>{meal.category}</h3>
                <p>{meal.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      <section className="full-width-banner">
        <img
          src="/Images/bannerBottom.jpg"
          alt="BannerBottom"
          className="full-banner-img"
        />
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
