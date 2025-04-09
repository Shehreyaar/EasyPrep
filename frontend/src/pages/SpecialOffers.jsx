import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import "../css/stylesSearch.css";

function SpecialOffers() {
  const [meals, setMeals] = useState([]);
  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const indexRef = useRef(0);

  const possibleOffers = [
    {
      title: "Buy 3 boxes and get another free!",
      desc: "",
    },
    {
      title: "Recieve a 30% discount if you purchase 10 boxes or more!",
      desc: "",
    },
    {
      title: "Have 15$ on us if your order is 50$ or more!",
      desc: "",
    },
    {
      title: "Receive $10 credit when you purchase 5 or more boxes!",
      desc: "",
    },
  ];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:3000/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
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

  const getRandomOffer = () => {
    const index = Math.floor(Math.random() * possibleOffers.length);
    return possibleOffers[index];
  };

  const rotateOffers = () => {
    if (meals.length === 0) return;

    const start = indexRef.current;
    const end = start + 5;
    const nextMeals = meals.slice(start, end);

    if (nextMeals.length === 0) {
      indexRef.current = 0;
      rotateOffers();
      return;
    }

    const mealsWithOffers = nextMeals.map(meal => {
      const offer = getRandomOffer();
      return {
        ...meal,
        specialTitle: offer.title,
        specialDesc: offer.desc,
      };
    });

    setDisplayedMeals(mealsWithOffers);
    setTimeLeft(30);
    indexRef.current += 5;
  };

  useEffect(() => {
    if (meals.length === 0) return;

    rotateOffers();

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          rotateOffers();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [meals]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

      {/* Special Offers Section */}
      <section className="cart-container">
        <h1>Special Offers</h1>
        <p>Don't miss out on these exclusive deals! New offers Daily!</p>

        <div className="meal-grid">
          {displayedMeals.map((meal, index) => (
            <div className="meal-card" key={meal.id || index}>
              <img src={meal.imageUrl} alt={meal.name} className="meal-image" />
              <h3>{meal.name}</h3>
              <p>{meal.specialTitle}</p>
              <p style={{ fontWeight: "bold", color: "#C72B28", marginTop: "10px" }}>
                Time Left: {formatTime(timeLeft)}
              </p>
              <button name="addToCart" className="add-to-cart-btn" onClick={() => (window.location.href = "/cart")} > Add to Cart </button>
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
