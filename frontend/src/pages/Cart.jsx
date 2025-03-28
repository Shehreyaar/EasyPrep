import React, { useState } from "react";
import "../css/styles.css";
import "../css/cartStyle.css";

function Cart() {
  const [cart, setCart] = useState([
    {
      category: "Mediterranean",
      items: [
        {
          name: "Shawarma",
          ingredients: ["Chicken", "Lettuce", "Garlic Sauce", "Spicy", "Hot Peppers"],
          quantity: 10,
        },
        {
          name: "Shawarma Platter",
          ingredients: ["Greek Salad", "Chicken", "Beef", "Garlic Sauce", "Cheese"],
          quantity: 5,
        },
      ],
    },
    {
      category: "Italian",
      items: [
        {
          name: "Margherita Pizza",
          ingredients: ["Extra Cheese", "Marinara Sauce", "Mozzarella Cheese"],
          quantity: 5,
        },
      ],
    },
  ]);

  const updateQuantity = (catIndex, itemIndex, delta) => {
    const updated = [...cart];
    const item = updated[catIndex].items[itemIndex];
    item.quantity = Math.max(0, item.quantity + delta);
    setCart(updated);
  };

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
          <a href="/home-logged-in">Home</a>
          <a href="/search">Search Menu</a>
          <a href="/meal-detail">Nutrition Facts</a>
          <a href="#">BoxMeals</a>
          <a href="#">Track Order</a>
          <a href="/cart">MyCart</a>
          <a href="/">Logout</a>
        </nav>
        
        <button className="login-btn" onClick={() => (window.location.href = "/profile")}>
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          MyAccount
        </button>
      </header>

      <section className="cart-container">
      <h2 className="section-title">Your Cart</h2>       

        {cart.map((section, catIndex) => (
          <div key={catIndex} className="cart-item">
            <h2>{section.category}</h2>

            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="order-item">
                <p className="meal-name">{item.name}</p>
                <ul className="ingredients">
                  {item.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
                <div className="quantity-control">
                  <button className="decrease" onClick={() => updateQuantity(catIndex, itemIndex, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="increase" onClick={() => updateQuantity(catIndex, itemIndex, +1)}>+</button>
                </div>
              </div>
            ))}
          </div>
        ))}
       

        <button className="checkout-btn" onClick={() => alert("Proceeding to checkout...")}>
          Proceed to Checkout
        </button>
      </section>
    </>
  );
}

export default Cart;
