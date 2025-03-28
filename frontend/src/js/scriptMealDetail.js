const mealsData = { //dummy data to show and test
    "chicken": {
        title: "Chicken & Rice",
        image: "images/chickenandrice.jpg",
        description: "A high-protein meal with lean chicken and brown rice.",
        nutrition: ["Calories: 450", "Protein: 40g", "Carbs: 50g", "Fats: 10g"]
    },
    "salmon": {
        title: "Salmon & Quinoa",
        image: "images/salmonquinoa.jpg",
        description: "Rich in Omega-3, served with nutritious quinoa.",
        nutrition: ["Calories: 500", "Protein: 42g", "Carbs: 45g", "Fats: 15g"]
    },
    "beef": {
        title: "Beef & Sweet Potato",
        image: "images/beefandsweetpotato.jpg",
        description: "A perfect balance of proteins and healthy carbs.",
        nutrition: ["Calories: 550", "Protein: 50g", "Carbs: 60g", "Fats: 12g"]
    }, 
    "tofu": {
        title: "Tofu & Veggies",
        image: "images/tofuandveggies.jpg",
        description: "A vegetarian option loaded with plant-based proteins.",
        nutrition: ["Calories: 400", "Protein: 30g", "Carbs: 45g", "Fats: 8g"]
    },
    "pasta": {
        title: "Whole Wheat Pasta",
        image: "images/wholewheatpasta.jpg",
        description: "High in fiber and great for energy.",
        nutrition: ["Calories: 480", "Protein: 35g", "Carbs: 55g", "Fats: 9g"]
    }
};

//event listener to each meal 
document.addEventListener("DOMContentLoaded", () => {
    //if clicked element is a .meal-card, fetch the data-meal then call showMealDetails
    document.querySelector(".meals-grid").addEventListener("click", (event) => {
        const mealCard = event.target.closest(".meal-card");
        if (!mealCard) return;

        const mealKey = mealCard.dataset.meal;
        showMealDetails(mealKey);
    });

    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("meal-details").classList.add("hidden");
    });
});

//takes a mealKey and retrieves the corresponding meal data from mealsData
function showMealDetails(mealKey) {
    console.log("Showing details for:", mealKey);  
    const meal = mealsData[mealKey];
    if (meal) {
        document.getElementById("meal-title").textContent = meal.title;
        document.getElementById("meal-image").src = meal.image;
        document.getElementById("meal-description").textContent = meal.description;

        const nutritionList = document.getElementById("nutrition-facts");
        nutritionList.innerHTML = "";
        meal.nutrition.forEach(function(fact) {
            const li = document.createElement("li");
            li.textContent = fact;
            nutritionList.appendChild(li);
        });

        document.getElementById("meal-details").classList.remove("hidden");
    }
}



