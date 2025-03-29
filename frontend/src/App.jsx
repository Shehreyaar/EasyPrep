import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import HomeLoggedIn from './pages/HomeLoggedIn'
import Search from './pages/Search'
import Profile from './pages/Profile'
import MealDetail from './pages/MealDetail'
import ManageAddresses from './pages/ManageAddresses'
import EditProfile from './pages/EditProfile'
import Cart from './pages/Cart'
import SpecialOffers from './pages/SpecialOffers'
import TrackOrder from './pages/TrackOrder'


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages  */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Pages - need to be logged in */}
        <Route path="/home-logged-in" element={<HomeLoggedIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-detail" element={<MealDetail />} />        
        <Route path="/manage-addresses" element={<ManageAddresses />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/special-offers" element={<SpecialOffers />} />
        <Route path="/track-order" element={<TrackOrder />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />     
        
        
      </Routes>
    </Router>
  );
}

export default App
