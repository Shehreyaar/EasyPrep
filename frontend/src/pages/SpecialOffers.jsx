import React, { useEffect, useState } from "react";
import "../css/stylesSearch.css";

function SpecialOffers() {
  const offers = [
    {
      title: "Buy 1 and get 1 free!",
      desc: "Order any meal and get another one free. Limited time offer!",
      image: "/Images/salmonKeto.jpeg",
    },
    {
      title: "Buy 10x boxes and receive a 30% discount!",
      desc: "Stock up and save big on bulk orders.",
      image: "/Images/veggieDelight.jpeg",
    },
    {
      title: "Weekend Special - Free Dessert",
      desc: "Every order above $50 gets a free dessert this weekend.",
      image: "/Images/ketoChicken.jpeg",
    },
    {
      title: "Free Delivery on Orders over $75",
      desc: "Save on delivery charges for bigger orders.",
      image: "/Images/quinoaSalad.jpeg",
    },
  ];

  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hrs = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* Header */}
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

      {/* Special Offers */}
      <section className="cart-container">
        <h1>Special Offers</h1>
        <p>Don't miss out on these exclusive deals!</p>

        <div className="meal-grid">
          {offers.map((offer, index) => (
            <div className="meal-card" key={index}>
              <img src={offer.image} alt={offer.title} className="meal-image" />
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <p style={{ fontWeight: "bold", color: "#C72B28", marginTop: "10px" }}>
                Time Left: {formatTime(timeLeft)}
              </p>
            </div>
          ))}
        </div>
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

export default SpecialOffers;
