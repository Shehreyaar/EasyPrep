import expressObj from 'express';

const app = expressObj();

app.use(expressObj.json());

let cart = [];
let wallet = 1000.00; //default wallet balance 

function getIdx (mealId) {
    for (let i = 0; i < mealList.length; i++) {
        if (mealList[i].id === mealId) {
            return i;
        }
    }
    return null;
}

//Add meal to cart 
app.post('/cart', function (req, res) {
    const {mealId, quantity} = req.body;
    const meal = mealList.find(m => m.id === mealId);

    if (!meal) { //meal not found 
        return res.status(404).send('Meal not found');
    }

    cart.push({meal, quantity});
    res.status(200).send('Meal added successfully');
});

//Checkout 
app.post('/checkout', function (req, res) {
    if (cart.length === 0 ) {
        return res.status(400).send('Cart is empty');
    } 

    let total = 0;
    for (let item of cart) {
        total += item.meal.price * item.quantity; //calculate the total price 
    }

    if (wallet < total) {
        return res.status(403).send('Insufficient funds');
    }

    wallet -= total;
    cart = []; //clear the cart after successful checkout

    res.status(200).send('Checkout successful. Your remaining balance is: ' + wallet);
});

//View cart
app.get('/cart', function (req, res) {
    res.json(cart);
});

//Read all meals 
app.get('/meals', function (req, res) {
    res.json(mealList); //returns the meal list 
});

//Read a meal by ID
app.get('/meals/:id', function (req, res,) {
    const mealId = parseInt(req.params.id);
    const meal = mealList.find(m => m.id === mealId);

    if (!meal) { //meal not found
        return res.status(404).send('Meal not found');
    }

    res.json(meal);
});

//Delete meal from cart 
app.delete('/cart/:mealId', function (req, res) {
    const mealId = parseInt(req.params.mealId);
    const idx = cart.findIndex(item => item.meal.id === mealId);

    if (idx === null) { //meal not found
        return res.status(404).send('Meal not found in cart');
    }

    cart.splice(idx, 1);
    res.status(204).send();
});

//Start the server 
const server = app.listen(3000, '127.0.0.1', function() {
    console.log( 'HTTP server listening on 127.0.0.1:3000' );
});
