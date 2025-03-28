document.getElementById('searchBar').addEventListener('input', filterMeals);
document.getElementById('categoryFilter').addEventListener('change', filterMeals);

function filterMeals() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const meals = document.querySelectorAll('.meal-card');

    meals.forEach(meal => {
        const mealName = meal.querySelector('h3').textContent.toLowerCase();
        const mealCategory = meal.getAttribute('data-category');

        if ((mealName.includes(searchQuery) || searchQuery === "") && 
            (selectedCategory === "all" || mealCategory === selectedCategory)) {
            meal.style.display = "block";
        } else {
            meal.style.display = "none";
        }
    });
}
