import React, { useState, useEffect } from "react";
import "../css/styles.css";
import "../css/cartStyle.css";
// import { useNavigate } from "react-router-dom"; // Uncomment if using react-router

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  // const navigate = useNavigate(); // Uncomment if using react-router

  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (mealId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.meal.id === mealId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

    try {
      const token = sessionStorage.getItem("token");
      await fetch(`http://127.0.0.1:3000/cart/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mealId, delta }),
      });
    } catch (err) {
      console.error("Failed to update cart on server", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:3000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),  
      });
  
      //const responseData = await res.text();
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Checkout failed");
      }
  
      //alert(responseData); 
      setCheckoutInfo(responseData);
      setCart([]);  //clears the cart after checking out 
    } catch (err) {
      alert("Checkout failed: " + err.message); 
      console.error(err);
    }
  }; 

  const deleteFromCart = async (mealId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:3000/cart/${mealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete item from cart");
  
      setCart((prevCart) => prevCart.filter(item => item.meal.id !== mealId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      {/* Navbar */}
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
  
      {/* Cart Content */}
      <div className="cart-container">
        <h2 className="section-title">Your Cart</h2>
  
        {loading ? (
          <p>Loading cart...</p>
        ) : cart.length === 0 && !checkoutInfo ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.meal.id}>
              <div className="order-item">
                <p className="meal-name">{item.meal.name}</p>
                <p className="meal-price">${item.meal.price} each</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.meal.id, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.meal.id, 1)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => deleteFromCart(item.meal.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
  
        {!loading && cart.length > 0 && (
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        )}
  
        {checkoutInfo && (
          <div className="checkout-result">
            {checkoutInfo.error ? (
              <p style={{ color: "red" }}>{checkoutInfo.error}</p>
            ) : (
              <>
                <p><strong>Total:</strong> ${checkoutInfo.totalAmount}</p>
                <p><strong>Discount:</strong> -${checkoutInfo.discount}</p>
                <p><strong>Final Price:</strong> ${checkoutInfo.finalAmount}</p>
                <p><strong>Remaining Balance:</strong> ${checkoutInfo.remainingBalance}</p>
                <p><strong>Offers Applied:</strong> {checkoutInfo.discountsApplied.join(", ")}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;

