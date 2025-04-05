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
import ManageAddress from './pages/ManageAddresses'
import EditProfile from './pages/EditProfile'
import Cart from './pages/Cart'
import SpecialOffers from './pages/SpecialOffers'
import TrackOrder from './pages/TrackOrder'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages  */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Pages - need to be logged in */}
        <Route path="/home-logged-in" element={<HomeLoggedIn />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-detail" element={<MealDetail />} />        
        <Route path="/manage-address" element={<ManageAddress />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/special-offers" element={<SpecialOffers />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />     
        
        
      </Routes>
    </Router>
  );
}

export default App
