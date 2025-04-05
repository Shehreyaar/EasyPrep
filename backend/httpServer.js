// httpServer.js
import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Initialize Express app
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();

// For demonstration, wallet is kept in memory.
let wallet = 1000.00;

// GET /meals: Retrieve meals from Firestore
app.get('/meals', async (req, res) => {
  try {
    const snapshot = await firestore.collection('meals').get();
    const meals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(meals);
  } catch (error) {
    console.error("Error retrieving meals:", error);
    res.status(500).send("Error retrieving meals");
  }
});

// GET /meals/:id: Retrieve a specific meal by its ID
app.get('/meals/:id', async (req, res) => {
  try {
    const mealDoc = await firestore.collection('meals').doc(req.params.id).get();
    if (!mealDoc.exists) return res.status(404).send("Meal not found");
    res.json({ id: mealDoc.id, ...mealDoc.data() });
  } catch (error) {
    console.error("Error retrieving meal:", error);
    res.status(500).send("Error retrieving meal");
  }
});

// POST /cart: Add a meal to the cart.
// The frontend should send { mealId: <id>, quantity: <number> }.
// We look up the meal in Firestore and then add (or update) an entry in the "cart" collection.
app.post('/cart', async (req, res) => {
    console.log("Received payload:", req.body); // Log the incoming payload
    const { meal, quantity } = req.body;
    if (!meal || !meal.id) {
      console.error("Meal data is missing or invalid.");
      return res.status(400).send("Meal data is missing or invalid.");
    }
    try {
      // Example: Check if the meal is already in the cart (assuming you're using Firestore)
      const cartSnapshot = await firestore.collection('cart')
        .where('meal.id', '==', meal.id)
        .get();
  
      if (!cartSnapshot.empty) {
        const cartDoc = cartSnapshot.docs[0];
        const existingQuantity = cartDoc.data().quantity;
        await firestore.collection('cart').doc(cartDoc.id).update({
          quantity: existingQuantity + quantity
        });
      } else {
        await firestore.collection('cart').add({
          meal, 
          quantity
        });
      }
      res.status(200).send("Meal added successfully");
    } catch (error) {
      console.error("Error adding meal to cart:", error);
      res.status(500).send("Error adding meal to cart");
    }
  });
  

// GET /cart: Retrieve all cart items from Firestore
app.get('/cart', async (req, res) => {
  try {
    const snapshot = await firestore.collection('cart').get();
    const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(cartItems);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).send("Error retrieving cart");
  }
});

// DELETE /cart/:id: Remove a cart item by its document ID
app.delete('/cart/:id', async (req, res) => {
  try {
    await firestore.collection('cart').doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).send("Error deleting cart item");
  }
});

// POST /checkout: Process checkout, calculate total, and clear the cart
app.post('/checkout', async (req, res) => {
  try {
    const snapshot = await firestore.collection('cart').get();
    const cartItems = snapshot.docs.map(doc => doc.data());
    if (cartItems.length === 0) return res.status(400).send("Cart is empty");
    
    let total = 0;
    cartItems.forEach(item => {
      total += item.meal.price * item.quantity;
    });
    
    if (wallet < total) return res.status(403).send("Insufficient funds");
    wallet -= total;
    
    // Clear cart: delete all documents in the cart collection using a batch operation
    const batch = firestore.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    res.status(200).send("Checkout successful. Your remaining balance is: " + wallet);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).send("Error during checkout");
  }
});

// Start the server
const server = app.listen(3000, '127.0.0.1', () => {
  console.log("HTTP server listening on 127.0.0.1:3000");
});
