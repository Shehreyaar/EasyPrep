import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import MealDetail from "./pages/MealDetail";
import ManageAddresses from "./pages/ManageAddresses";
import EditProfile from "./pages/EditProfile";
import Cart from "./pages/Cart";
import SpecialOffers from "./pages/SpecialOffers";
import TrackOrder from "./pages/TrackOrder";
import Settings from "./pages/Settings";

function App() {
  const [cart, setCart] = useState([]);

  // Fetch the cart data from the backend
  const refreshCart = () => {
    axios
      .get("http://127.0.0.1:3000/cart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  // Load cart data when the app mounts
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home-logged-in" element={<HomeLoggedIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        {/* Pass refreshCart to the MealDetail page so it can update the global cart */}
        <Route path="/meal-detail" element={<MealDetail refreshCart={refreshCart} />} />
        <Route path="/manage-addresses" element={<ManageAddresses />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        {/* Pass both the current cart state and refreshCart to the Cart page */}
        <Route path="/cart" element={<Cart cart={cart} refreshCart={refreshCart} />} />
        <Route path="/special-offers" element={<SpecialOffers />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
