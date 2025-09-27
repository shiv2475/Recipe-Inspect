// Home page functionality

document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedRecipes();
    loadCategories();
});

// Load featured recipes
function loadFeaturedRecipes() {
    const featuredContainer = document.getElementById('featuredRecipes');
    if (!featuredContainer) return;
    
    const featuredRecipes = getFeaturedRecipes(6);
    featuredContainer.innerHTML = featuredRecipes.map(recipe => createRecipeCard(recipe)).join('');
}

// Load categories
function loadCategories() {
    const categoriesContainer = document.getElementById('categoriesGrid');
    if (!categoriesContainer) return;
    
    const categories = getAllCategories();
    categoriesContainer.innerHTML = categories.map(category => createCategoryCard(category)).join('');
}

// Search functionality
function performSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input');
    const query = searchInput.value.trim();
    
    if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
}

// Quick category search
function searchByCategory(category) {
    window.location.href = `search.html?category=${encodeURIComponent(category)}`;
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (isValidEmail(email)) {
        // In a real app, this would send to a backend
        showNotification('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address', 'danger');
    }
}