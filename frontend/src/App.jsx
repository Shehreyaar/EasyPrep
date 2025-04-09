import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import HomeLoggedIn from './pages/HomeLoggedIn';
import Search from './pages/Search';
import Profile from './pages/Profile';
import MealDetail from './pages/MealDetail';
import ManageAddress from './pages/ManageAddresses';
import EditProfile from './pages/EditProfile';
import Cart from './pages/Cart';
import SpecialOffers from './pages/SpecialOffers';
import TrackOrder from './pages/TrackOrder';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages  */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Pages - need to be logged in  - PROTECTED PAGES*/}
        <Route path="/home-logged-in" element={<PrivateRoute><HomeLoggedIn/></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><Search/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/meal-detail" element={<PrivateRoute><MealDetail/></PrivateRoute>} />        
        <Route path="/manage-address" element={<PrivateRoute><ManageAddress/></PrivateRoute>} />
        <Route path="/edit-profile" element={<PrivateRoute><EditProfile/></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>} />
        <Route path="/special-offers" element={<PrivateRoute><SpecialOffers/></PrivateRoute>} />
        <Route path="/track-order" element={<PrivateRoute><TrackOrder/></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />            
        
      </Routes>
    </Router>
  );
}

export default App
