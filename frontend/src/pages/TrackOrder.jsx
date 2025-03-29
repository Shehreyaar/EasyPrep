import "../css/trackOrder.css";
 
const dummyOrders = [
    { orderNumber: "1", item: "Beef Steak", timeLeft: 20, status: "On the way" },
    { orderNumber: "2", item: "Chicken Burger", timeLeft: 15, status: "Preparing" },
    { orderNumber: "3", item: "Vegan Salad", timeLeft: 10, status: "Out for delivery" },
    { orderNumber: "4", item: "Grilled Salmon", timeLeft: 25, status: "Cooking" },
    { orderNumber: "5", item: "Pasta Alfredo", timeLeft: 30, status: "Just Ordered" }
];
 
const TrackOrder = () => {
    return (
        <div className="track-order-container">
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
                        <li><a href="/cart">MyCart</a></li>
                        <li><a href="/">Logout</a></li>
                    </ul>
                    <button className="login-btn" onClick={() => window.location.href = '/profile'}>
                        <img src="/Images/account.svg" alt="User" className="user-icon" />
                        MyAccount
                    </button>
                </nav>
            </header>
 
            <h2 className="title">All Orders</h2>
            <div className="order-list">
                {dummyOrders.map((order) => (
                    <div key={order.orderNumber} className="order-card">
                        <h3 className="order-number">Order #{order.orderNumber}</h3>
                        <p className="order-item"><strong>Item:</strong> {order.item}</p>
                        <p className="order-status"><strong>Status:</strong> <span className={`status ${order.status.replace(/ /g, "-").toLowerCase()}`}>{order.status}</span></p>
                        <p className="order-time"><strong>Time Left:</strong> <span className="time-left">{order.timeLeft} min</span></p>
                    </div>
                ))}
            </div>
            
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-column">
                        <h3>About EasyPrep</h3>
                        <p>Your best choice for meal prepping, delivering fresh and healthy meals directly to your door.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Search Menu</a></li>
                            <li><a href="#">Special Offers</a></li>
                            <li><a href="#">Box Meals</a></li>
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
        </div>
    );
};
 
export default TrackOrder;