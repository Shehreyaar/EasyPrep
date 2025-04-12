// =============================================================
// Backend Server
// =============================================================

import expressObj from 'express';
import { cors } from './middlewares/cors.js';
import { verifyToken, admin } from './middlewares/firebaseAuthMiddleware.js';



//Express
const app = expressObj();
app.use(expressObj.json());
app.use(cors);

const firebaseAuth = admin.auth();

// =============================================================
// Auth: Register, Login, Forgot Password
// =============================================================
// REGISTER
app.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, address } = req.body;
  
    try {
      const user = await firebaseAuth.createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
  
      console.log("User created:", user.uid);
      // Save data firebase
      await admin.firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
      });

      console.log("User saved to Firestore");
  
      res.status(201).json({ message: 'User created', uid: user.uid });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

//LOGIN
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Use Firebase REST API to generate token
      const apiKey = "AIzaSyCRuI7nuTJreYg5EyD7TMhLX6W3nP0-tJ8";
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        return res.status(400).json({ error: data.error.message });
      }
      console.log("Login response from Firebase:", data); // DEBUG
      res.json({ idToken: data.idToken, uid: data.localId });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  //FORGOT PASSWORD
  app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const apiKey = "AIzaSyCRuI7nuTJreYg5EyD7TMhLX6W3nP0-tJ8";
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType: "PASSWORD_RESET", email })
      });
  
      const data = await response.json();
      if (data.error) return res.status(400).json({ error: data.error.message });
  
      res.json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send reset email' });
    }
  });
  
//VERIFY TOKEN FROM FRONTEND
  app.post('/verify-token', async (req, res) => {
    const {idToken} = req.body;
    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return  res.status().json({ uid: decodedToken.uid });
    }catch (error) {
        return res.status(401).send("Invalid token");
    }
});

// ========================================================
// User Profile (Protected) - GET | UPDATE
// ========================================================

app.get("/profile", verifyToken, async (req, res) => {
  const uid = req.user.uid;

  try {
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    const data = userDoc.data();
    res.json({
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phoneNumber,
      address: data.address,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
}); 
  
  app.get("/get-profile", verifyToken, async (req, res) => {
    const uid = req.user.uid;
  
    try {
      const userDoc = await admin.firestore().collection("users").doc(uid).get();
      if (!userDoc.exists) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json(userDoc.data());
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  });
  
  
  app.post("/edit-profile", verifyToken, async (req, res) => {
    const { firstName, lastName, phoneNumber, address } = req.body;
    const uid = req.user.uid;
  
    try {
      await admin.firestore().collection("users").doc(uid).set(
        {
          firstName,
          lastName,
          phoneNumber,
          address,
        },
        { merge: true }
      );
  
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
  
// =============================================================
//  User Address ( Protected) - GET | UPDATE
// =============================================================
  
app.get("/get-address", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  try {
    const docSnap = await admin.firestore().collection("users").doc(uid).get();
    if (!docSnap.exists) return res.status(404).json({ error: "User not found" });

    const data = docSnap.data();
    res.json({ address: data.address || "" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch address" });
  }
});

app.post("/update-address", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  const { address } = req.body;
  try {
    await admin.firestore().collection("users").doc(uid).set({ address }, { merge: true });
    res.json({ message: "Address updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update address" });
  }
});


// ============================================
//  Cart (mock local) - ADD | VIEW | DELETE | CHECKOUT
// ============================================

let cart = [];
let wallet = 1000.00; //default wallet balance 
const mealList = []

function getIdx (mealId) {
    for (let i = 0; i < mealList.length; i++) {
        if (mealList[i].id === mealId) {
            return i;
        }
    }
    return null;
}

//Checkout 
app.post('/checkout',verifyToken,async function (req, res) {
    const uid = req.user.uid;
    const clientCart = req.body.cart;

    if (!clientCart || clientCart.length === 0) {
      return res.status(400).send('Cart is empty!');
    }

    try{
      // Calculate the total price of the cart
      let total = 0;
      const detailedItems = [];

      for (let item of clientCart) {
        const mealRef = admin.firestore().collection("meals").doc(item.meal.id);
      const mealDoc = await mealRef.get();

      if (!mealDoc.exists) continue;

      const meal = mealDoc.data();
      const price = meal.price || 0;
      const quantity = item.quantity;

      total += price * quantity;

      detailedItems.push({
        mealId: item.meal.id,
        name: meal.name,
        quantity,
        price
      });
    }

    // verify amount in wallet
    const userRef = admin.firestore().collection("users").doc(uid);
    const userSnap = await userRef.get();
    const wallet = userSnap.data().wallet || 1000;
  

    if (wallet < total) {
      return res.status(403).send('Insufficient funds!');
    }

    // Save order in Firestore
    await admin.firestore().collection("orders").add({
      userId: uid,
      items: detailedItems,
      totalAmount: total,
      status: "Pending",
      orderDate: new Date().toISOString()

    });

    // Clean cart, update amount wallet
    await admin.firestore().collection("carts").doc(uid).set({ items: [] });
    await userRef.update({ wallet: wallet - total });

    res.status(200).send(`Checkout successful. Remaining balance: $${(wallet - total).toFixed(2)}`);
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).send("Server error during checkout.");
  }
});



//View cart
// Assuming you're using Firestore or similar database:
app.post("/cart", verifyToken, async (req, res) => {
  const { mealId, quantity } = req.body;
  const uid = req.user.uid;

  try {
    const mealRef = admin.firestore().collection("meals").doc(mealId);
    const mealDoc = await mealRef.get();

    if (!mealDoc.exists) return res.status(404).send("Meal not found");

    const mealData = mealDoc.data();

    const cartRef = admin.firestore().collection("carts").doc(uid);
    const userCart = (await cartRef.get()).data() || { items: [] };

    const existingItemIndex = userCart.items.findIndex(item => item.mealId === mealId);
    if (existingItemIndex >= 0) {
      userCart.items[existingItemIndex].quantity += quantity;
    } else {
      userCart.items.push({ mealId, quantity });
    }

    await cartRef.set(userCart);

    res.status(200).json({ message: "Meal added to cart", cart: userCart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Server error");
  }
});

app.get("/cart", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  try {
    const cartDoc = await admin.firestore().collection("carts").doc(uid).get();
    const cartData = cartDoc.exists ? cartDoc.data().items : [];

    const detailedItems = await Promise.all(
      cartData.map(async ({ mealId, quantity }) => {
        const mealDoc = await admin.firestore().collection("meals").doc(mealId).get();
        return {
          meal: { id: mealDoc.id, ...mealDoc.data() },
          quantity,
        };
      })
    );

    res.status(200).json(detailedItems);
  } catch (error) {
    res.status(500).send("Failed to fetch cart");
  }
});


//Delete meal from cart 
app.delete('/cart/:mealId',verifyToken, function (req, res) {
    const mealId = parseInt(req.params.mealId);
    const idx = cart.findIndex(item => item.meal.id === mealId);

    if (idx === null) { //meal not found
        return res.status(404).send('Meal not found in cart');
    }

    cart.splice(idx, 1);
    res.status(204).send();
});


// ============================================
//  Meals - GET ALL | GET BY ID
// ============================================

//Read all meals 
app.get('/meals',verifyToken,  async function (req, res) {
  //res.json(mealList); //returns the meal list 
  try {
    const snapshot = await admin.firestore().collection("meals").get();
    const meals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(meals);
  } catch (error) {
    console.error("🔥 FIRESTORE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

//Read a meal by ID
app.get('/meals/:id', verifyToken,  function (req, res,) {
  const mealId = parseInt(req.params.id);
  const meal = mealList.find(m => m.id === mealId);

  if (!meal) { //meal not found
      return res.status(404).send('Meal not found');
  }

  res.json(meal);
});

// =============================================================
// Start server
// =============================================================

const server = app.listen(3000, '127.0.0.1', function() {
    console.log( 'HTTP server listening on 127.0.0.1:3000' );
});
