import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import '../css/styles.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password, rememberMe);
      const user = userCredential.user;

      localStorage.setItem("uid", user.uid);
      //await login(email, password);
      navigate("/home-logged-in");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
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
          <Link to="/home-logged-in">Home</Link>
          <Link to="/search">Search Menu</Link>
          <Link to="/meal-detail">Nutrition Facts</Link>
          <Link to="/special-offers">Special Offers</Link>
          <Link to="/track-order">Track Order</Link>
        </nav>
        <button className="login-btn">
          <img src="/Images/account.svg" alt="User" className="user-icon" />
          Login/Signup
        </button>
      </header>

      <div className="auth-container">
        <div className="auth-box">
          <h2>Log in to EasyPrep</h2>
          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">
              <label>
                <input type="checkbox" checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                /> Remember me
              </label>
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            <button type="submit" className="submit-btn">Log In</button>
          </form>

          <p className="switch-auth">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
