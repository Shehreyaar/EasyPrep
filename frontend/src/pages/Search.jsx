import React, { useState, useEffect } from "react";
import "../css/stylesSearch.css";

function Search() {
  // state to hold search input, meal category and list of meals
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // fetch meals from Firebase when the component loads
  useEffect(() => {
    const fetchMeals = async () => {
      //const querySnapshot = await getDocs(collection(db, "meals"));  // it cannot access directly anymore
      //const mealData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      try{
        const token = sessionStorage.getItem("token");
        console.log("Token sent:", token);
        const response = await fetch("http://localhost:3000/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        //setMeals(data); // this line stays the same


        // verify if it's array
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

  // filter meals based on category/search term
  const filteredMeals = meals.filter(meal =>
    (category === "all" || meal.categories.includes(category)) &&
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async () => {
    if (!selectedMeal) return;
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mealId: selectedMeal.id,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      alert(`${selectedMeal.name} added to cart!`);
      setSelectedMeal(null);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <header className="header">
        <nav className="navbar">
        <div className="logo-container">
            <a href="/home-logged-in">
              <img src="/Images/logoEasyPrep.svg" alt="EasyPrep" className="logo" />
            </a>
          </div>
          <div className="nameApp">
          <a href="/home-logged-in">
            <img src="/Images/nameApp.png" alt="NameApp" className="name" />
            </a>
          </div>
          <ul className="nav-links">
            <li><a href="/search">Search Menu</a></li>
            <li><a href="/meal-detail">Nutrition Facts</a></li>
            <li><a href="/special-offers">Special Offers</a></li>
            <li><a href="/track-order">Track Order</a></li>
            <li><a href="/cart">My Cart</a></li>
            <li><a href="/">Logout</a></li>
          </ul>
          <button className="login-btn" onClick={() => window.location.href = '/profile'}>
            <img src="/Images/account.svg" alt="User" className="user-icon" />
            MyAccount
          </button>
        </nav>
      </header>
      
      <section className="cart-container">
        <h1>Search for Prepped Meals</h1>
        <p>Fresh, delicious, and delivered to your doorstep.</p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="Burgers & Fast Foods">Burgers & Fast Foods</option>
            <option value="ComfortFood">Comfort Food</option>
            <option value="Family">Family</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="High-Protein">High-Protein</option>
            <option value="Italian">Italian</option>
            <option value="Keto">Keto</option>
            <option value="Kids">Kids</option>
            <option value="Lebanese">Lebanese</option>
            <option value="Low-Carb">Low-Carb</option>
            <option value="Mexican">Mexican</option>
            <option value="Soups">Soups</option>
            <option value="Thai">Thai</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>

        </div>

        <div className="meals-grid">
          {filteredMeals.map((meal) => (
            <div className="meal-card" key={meal.id} data-category={meal.categories.join(", ")} onClick={() => setSelectedMeal(meal)}> 
              <img src={meal.imageUrl} alt={meal.name} className="meal-image" />
              <h3>{meal.name}</h3>
              <p>{meal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedMeal && (
        <div id="meal-details" className="meal-details two-column-layout">
          <button className="close-btn" onClick={() => setSelectedMeal(null)}>X</button>
          <div className="image-section">
            <img src={selectedMeal.imageUrl || "/Images/default-meal.jpg"} alt={selectedMeal.name} />
          </div>
          <div className="info-section">
            <h2>{selectedMeal.name}</h2>
            <p className="spaced-block">{selectedMeal.description}</p>

            <div className="spaced-block">
              <h3>Ingredients</h3>
              <p>{selectedMeal.ingredients?.length > 0
                ? selectedMeal.ingredients.join(", ")
                : "No ingredients listed."}</p>
            </div>

            <div className="spaced-block">
              <h3>Nutrition Facts</h3>
              <p>
                Calories: {selectedMeal.calories || "N/A"} | Protein: {selectedMeal.protein || "N/A"} |
                Carbs: {selectedMeal.carbs || "N/A"} | Fat: {selectedMeal.fat || "N/A"}
              </p>
            </div>

            <p className="price-display spaced-block">
              <strong>Price:</strong> <span>${selectedMeal.price ? selectedMeal.price.toFixed(2) : "N/A"}</span>
            </p>

            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>About EasyPrep</h3>
            <p>Your best choice for meal prepping, delivering fresh and healthy meals directly to your door.</p>
          </div>
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/search">Search Menu</a></li>
              <li><a href="/meal-detail">Nutrition Facts</a></li>
              <li><a href="/special-offers">Special Offers</a></li>
              <li><a href="/track-order">Track Order</a></li>
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

export default Search;
