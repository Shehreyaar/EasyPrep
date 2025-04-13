import "../css/styles.css";
import "../css/cartStyle.css";
import React, { useEffect, useState } from "react";

const Cart = () => {
  //cart ->  holds the array of meal items 
  //setCart -> is use to update the value inside the cart 
  const [cart, setCart] = useState([]);

  //loading -> bool to tcheck if data is still being fetched 
  //setLoading -> used to turn loading on or off 
  const [loading, setLoading] = useState(true);
  
  const [walletBalance, setWalletBalance] = useState(null);
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  //sums up the total items in the cart by looping thru each item's quantity
  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        //gets the stored login token 
        const token = sessionStorage.getItem("token");

        //sends to backend using bearer token to prove you're logged in 
        const res = await fetch("http://127.0.0.1:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");

        //converts the server response to JSON and puts it inthe cart 
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

  //delta -> the change in quantity ( +1 or -1 )
  const updateQuantity = async (mealId, delta) => {

    //updates the cart state using a new vesion of the cart 
    setCart((prevCart) => //gets the previous cart state to be modified 
      prevCart.map((item) => //loops over every item in the cart to create a new cart array
        item.meal.id === mealId //check if the current cart item's meal id is the same as the one we want to update
        //if so, copy all the existing properties of the current item  
        //increase or decrease the quantity by delta (+1 or -1)
        //math.max makes sure the quantity never goes below 1 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item //else, return an unchanged item 
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

  //whenever the user pressed Proceed to Checkout
  const handleCheckout = async () => {
    try {
      //send the whole cart to the backend for processing 
      //uses the token to prove we are the one logged in 
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
      //alert(responseData); 
      setCheckoutInfo(responseData);
      setCart([]);  //clears the cart after checking out 

    } catch (err) {
      alert("Checkout failed: " + err.message); 
      console.error(err);
    }
  };  

  //delete an item from the cart 
  const deleteFromCart = async (mealId) => {
    try {
      //sends an http delete request to the backend 
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:3000/cart/${mealId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, //used to identify the user 
        },
      });
  
      if (!res.ok) throw new Error("Failed to delete item from cart");
  
      //update the cart state by removing the item with the matching mealid
      setCart((prevCart) => prevCart.filter(item => item.meal.id !== mealId));
      
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  
  return (
    <>
      {/* the navbar */}
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

      {/* content inside th cart */}
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
          <>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
            </>
        )}

        {checkoutInfo && (
          <div className="checkout-result">
            {checkoutInfo.error ? (
              <p style={{ color: "red" }}>{checkoutInfo.error}</p>
            ) : (
              <>
                <p><strong>Original Total:</strong> ${Number(checkoutInfo.totalAmount).toFixed(2)}</p>
                <p><strong>Discount:</strong> -${Number(checkoutInfo.discount).toFixed(2)}</p>
                <p><strong>Final Amount:</strong> ${Number(checkoutInfo.finalAmount).toFixed(2)}</p>
                <p><strong>Remaining Wallet Balance:</strong> ${Number(checkoutInfo.remainingBalance).toFixed(2)}</p>
                <p><strong>Discounts Applied:</strong> {checkoutInfo.discountsApplied.join(", ")}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;
