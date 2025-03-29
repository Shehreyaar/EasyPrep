import expressObj from 'express';

const app = expressObj();

app.use(expressObj.json());

//test data, will probably store them in firebase later on?
const mealList = [
    {id: 0, name: 'Beef and Brock', price: 20.99},
    {id: 1, name: 'Quinoa Salad', price: 13.99},
    {id: 2, name: 'Rice and Salmon', price: 21.99},
    {id: 3, name: 'Vegan Burger', price: 16.99},
    {id: 4, name: 'Chicken Tenders', price: 17.99},
];

let cart = [];
let mealCounter = 0;

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
