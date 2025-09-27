// Sample recipe data
const SAMPLE_RECIPES = [
    {
        id: 1,
        name: "Classic Spaghetti Carbonara",
        description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 20,
        servings: 4,
        difficulty: "Medium",
        rating: 4.8,
        categories: ["Italian", "Pasta", "Dinner"],
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale, diced",
            "4 large eggs",
            "100g Pecorino Romano cheese, grated",
            "Black pepper to taste",
            "Salt for pasta water"
        ],
        instructions: [
            "Bring a large pot of salted water to boil and cook spaghetti according to package directions",
            "While pasta cooks, crisp the pancetta in a large skillet over medium heat",
            "In a bowl, whisk together eggs, cheese, and plenty of black pepper",
            "Drain pasta, reserving 1 cup pasta water",
            "Add hot pasta to the skillet with pancetta",
            "Remove from heat and quickly stir in egg mixture, adding pasta water as needed",
            "Serve immediately with extra cheese and black pepper"
        ],
        nutrition: {
            calories: 520,
            protein: 28,
            carbs: 65,
            fat: 18
        }
    },
    {
        id: 2,
        name: "Mediterranean Quinoa Bowl",
        description: "Healthy quinoa bowl with fresh vegetables, feta, and lemon dressing",
        image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 25,
        servings: 2,
        difficulty: "Easy",
        rating: 4.6,
        categories: ["Healthy", "Mediterranean", "Vegetarian", "Lunch"],
        ingredients: [
            "1 cup quinoa",
            "2 cups vegetable broth",
            "1 cucumber, diced",
            "2 tomatoes, chopped",
            "1/2 red onion, thinly sliced",
            "1/2 cup kalamata olives",
            "100g feta cheese, crumbled",
            "1/4 cup olive oil",
            "2 tbsp lemon juice",
            "1 tsp dried oregano",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Rinse quinoa and cook in vegetable broth until tender, about 15 minutes",
            "Let quinoa cool completely",
            "Prepare all vegetables and combine in a large bowl",
            "Whisk together olive oil, lemon juice, oregano, salt, and pepper",
            "Add cooled quinoa to vegetables",
            "Pour dressing over salad and toss gently",
            "Top with feta cheese and serve"
        ],
        nutrition: {
            calories: 385,
            protein: 14,
            carbs: 52,
            fat: 15
        }
    },
    {
        id: 3,
        name: "Chocolate Chip Cookies",
        description: "Classic homemade chocolate chip cookies that are crispy on the outside and chewy inside",
        image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 15,
        servings: 24,
        difficulty: "Easy",
        rating: 4.9,
        categories: ["Dessert", "Baking", "Sweet"],
        ingredients: [
            "2 1/4 cups all-purpose flour",
            "1 tsp baking soda",
            "1 tsp salt",
            "1 cup butter, softened",
            "3/4 cup granulated sugar",
            "3/4 cup packed brown sugar",
            "2 large eggs",
            "2 tsp vanilla extract",
            "2 cups chocolate chips"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C)",
            "Mix flour, baking soda, and salt in a bowl",
            "Beat butter and sugars until creamy",
            "Beat in eggs and vanilla",
            "Gradually blend in flour mixture",
            "Stir in chocolate chips",
            "Drop rounded tablespoons onto ungreased cookie sheets",
            "Bake 9-11 minutes until golden brown"
        ],
        nutrition: {
            calories: 185,
            protein: 3,
            carbs: 26,
            fat: 8
        }
    },
    {
        id: 4,
        name: "Thai Green Curry",
        description: "Aromatic and spicy Thai green curry with vegetables and coconut milk",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 30,
        servings: 4,
        difficulty: "Medium",
        rating: 4.7,
        categories: ["Thai", "Spicy", "Dinner", "Vegetarian"],
        ingredients: [
            "2 tbsp green curry paste",
            "400ml coconut milk",
            "2 tbsp vegetable oil",
            "1 onion, sliced",
            "1 bell pepper, sliced",
            "1 zucchini, sliced",
            "100g green beans",
            "2 tbsp fish sauce (or soy sauce)",
            "1 tbsp brown sugar",
            "Thai basil leaves",
            "Jasmine rice to serve"
        ],
        instructions: [
            "Heat oil in a large pan over medium heat",
            "Fry curry paste for 1 minute until fragrant",
            "Add thick part of coconut milk and cook for 2 minutes",
            "Add remaining coconut milk and bring to simmer",
            "Add vegetables and cook for 10-15 minutes",
            "Stir in fish sauce and sugar",
            "Taste and adjust seasoning",
            "Garnish with Thai basil and serve with rice"
        ],
        nutrition: {
            calories: 280,
            protein: 8,
            carbs: 22,
            fat: 18
        }
    },
    {
        id: 5,
        name: "Avocado Toast with Poached Egg",
        description: "Perfect breakfast with creamy avocado, perfectly poached egg, and seasoning",
        image: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 10,
        servings: 2,
        difficulty: "Easy",
        rating: 4.5,
        categories: ["Breakfast", "Healthy", "Quick"],
        ingredients: [
            "2 slices whole grain bread",
            "1 ripe avocado",
            "2 fresh eggs",
            "1 tbsp white vinegar",
            "Salt and pepper to taste",
            "Red pepper flakes",
            "Lemon juice",
            "Everything bagel seasoning"
        ],
        instructions: [
            "Toast bread slices until golden brown",
            "Bring water to boil in a saucepan, add vinegar",
            "Create a whirlpool and carefully drop in eggs",
            "Poach eggs for 3-4 minutes",
            "Mash avocado with lemon juice, salt, and pepper",
            "Spread avocado on toast",
            "Top with poached egg",
            "Season with red pepper flakes and everything bagel seasoning"
        ],
        nutrition: {
            calories: 320,
            protein: 16,
            carbs: 28,
            fat: 18
        }
    },
    {
        id: 6,
        name: "Beef Stir Fry",
        description: "Quick and flavorful beef stir fry with fresh vegetables and savory sauce",
        image: "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800",
        cookTime: 15,
        servings: 4,
        difficulty: "Easy",
        rating: 4.6,
        categories: ["Asian", "Dinner", "Quick"],
        ingredients: [
            "500g beef sirloin, sliced thin",
            "2 tbsp vegetable oil",
            "1 bell pepper, sliced",
            "1 onion, sliced",
            "2 cloves garlic, minced",
            "1 tbsp ginger, minced",
            "3 tbsp soy sauce",
            "1 tbsp oyster sauce",
            "1 tsp sesame oil",
            "Green onions for garnish"
        ],
        instructions: [
            "Heat oil in a large wok or skillet over high heat",
            "Add beef and stir-fry for 2-3 minutes until browned",
            "Remove beef and set aside",
            "Add vegetables to pan and stir-fry for 3-4 minutes",
            "Add garlic and ginger, cook for 30 seconds",
            "Return beef to pan",
            "Add sauces and toss everything together",
            "Garnish with green onions and serve with rice"
        ],
        nutrition: {
            calories: 285,
            protein: 32,
            carbs: 12,
            fat: 12
        }
    }
];

const RECIPE_CATEGORIES = [
    { name: "Italian", icon: "fas fa-wine-bottle", count: 45 },
    { name: "Asian", icon: "fas fa-pepper-hot", count: 38 },
    { name: "Breakfast", icon: "fas fa-coffee", count: 52 },
    { name: "Dessert", icon: "fas fa-birthday-cake", count: 67 },
    { name: "Healthy", icon: "fas fa-leaf", count: 41 },
    { name: "Quick", icon: "fas fa-clock", count: 29 },
    { name: "Vegetarian", icon: "fas fa-carrot", count: 33 },
    { name: "Dinner", icon: "fas fa-utensils", count: 78 }
];

// LocalStorage helpers
const StorageKeys = {
    FAVORITES: 'recipe_favorites',
    SHOPPING_LIST: 'shopping_list',
    MEAL_PLAN: 'meal_plan',
    RECIPE_HISTORY: 'recipe_history',
    USER_DATA: 'user_data'
};

function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// Get all recipes (in a real app, this would be an API call)
function getAllRecipes() {
    return SAMPLE_RECIPES;
}

// Get recipe by ID
function getRecipeById(id) {
    return SAMPLE_RECIPES.find(recipe => recipe.id === parseInt(id));
}

// Search recipes
function searchRecipes(query, filters = {}) {
    let results = [...SAMPLE_RECIPES];
    
    // Text search
    if (query) {
        const searchTerm = query.toLowerCase();
        results = results.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.description.toLowerCase().includes(searchTerm) ||
            recipe.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
        );
    }
    
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
        results = results.filter(recipe => 
            filters.categories.some(cat => recipe.categories.includes(cat))
        );
    }
    
    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
        results = results.filter(recipe => filters.difficulty.includes(recipe.difficulty));
    }
    
    // Time filter
    if (filters.time && filters.time.length > 0) {
        results = results.filter(recipe => {
            return filters.time.some(timeRange => {
                if (timeRange === '15') return recipe.cookTime <= 15;
                if (timeRange === '30') return recipe.cookTime > 15 && recipe.cookTime <= 30;
                if (timeRange === '60') return recipe.cookTime > 30 && recipe.cookTime <= 60;
                if (timeRange === '60+') return recipe.cookTime > 60;
                return false;
            });
        });
    }
    
    return results;
}

// Sort recipes
function sortRecipes(recipes, sortBy) {
    const sorted = [...recipes];
    
    switch (sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'time':
            return sorted.sort((a, b) => a.cookTime - b.cookTime);
        case 'newest':
            return sorted.sort((a, b) => b.id - a.id);
        default:
            return sorted;
    }
}

// Get featured recipes
function getFeaturedRecipes(limit = 6) {
    return SAMPLE_RECIPES
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Get related recipes
function getRelatedRecipes(recipe, limit = 4) {
    return SAMPLE_RECIPES
        .filter(r => r.id !== recipe.id && 
                    r.categories.some(cat => recipe.categories.includes(cat)))
        .slice(0, limit);
}

// Get all categories
function getAllCategories() {
    return RECIPE_CATEGORIES;
}