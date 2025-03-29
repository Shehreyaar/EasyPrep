// src/services/CartContext.jsx

import React, { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// Provider component that wraps your entire app
export function CartProvider({ children }) {
  // Start with an empty cart (or you can initialize with your data)
  const [cart, setCart] = useState([]);

  // Function to update quantity in a given category/item
  function updateQuantity(catIndex, itemIndex, delta) {
    const updated = [...cart];
    const item = updated[catIndex].items[itemIndex];
    // Update quantity; you can also remove the item when quantity becomes 0 if desired
    item.quantity = Math.max(0, item.quantity + delta);
    setCart(updated);
  }

  // Function to add a new meal (from Search) into the cart
  // We’ll store them in a category called "From Search"
  function addToCart(meal) {
    console.log("Add to Cart clicked with meal:", meal);
    const updated = [...cart];
    // Find or create "From Search" category
    let catIndex = updated.findIndex((c) => c.category === "From Search");
    if (catIndex === -1) {
      updated.push({
        category: "From Search",
        items: [],
      });
      catIndex = updated.length - 1;
    }
    // Check if this meal is already in the "From Search" category
    const itemIndex = updated[catIndex].items.findIndex((i) => i.name === meal.name);
    if (itemIndex === -1) {
      // Not found – add it with quantity 1.
      updated[catIndex].items.push({
        name: meal.name,
        ingredients: [meal.desc],
        quantity: 1,
      });
    } else {
      // If it already exists, simply increment its quantity
      updated[catIndex].items[itemIndex].quantity++;
    }
    setCart(updated);
    console.log("Cart updated:", updated);
  }
  

  return (
    <CartContext.Provider value={{ cart, updateQuantity, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
