// Authentication and user management

// User management functions
function getCurrentUser() {
    return loadFromStorage(StorageKeys.USER_DATA);
}

function saveUser(userData) {
    saveToStorage(StorageKeys.USER_DATA, userData);
    updateAuthUI();
}

function logout() {
    localStorage.removeItem(StorageKeys.USER_DATA);
    updateAuthUI();
    showNotification('Logged out successfully');
    
    // Redirect to home if on a protected page
    if (window.location.pathname.includes('dashboard')) {
        window.location.href = 'index.html';
    }
}

function updateAuthUI() {
    const user = getCurrentUser();
    const authLink = document.getElementById('authLink');
    
    if (authLink) {
        if (user) {
            authLink.textContent = user.name || 'Profile';
            authLink.href = '#';
            authLink.onclick = (e) => {
                e.preventDefault();
                showUserMenu(e);
            };
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
            authLink.onclick = null;
        }
    }
    
    updateFavoritesCount();
}

function showUserMenu(event) {
    const user = getCurrentUser();
    if (!user) return;
    
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu show';
    menu.style.position = 'absolute';
    menu.style.top = '100%';
    menu.style.right = '0';
    menu.style.zIndex = '1000';
    menu.innerHTML = `
        <a class="dropdown-item" href="dashboard.html">
            <i class="fas fa-user me-2"></i>Dashboard
        </a>
        <a class="dropdown-item" href="meal-planner.html">
            <i class="fas fa-calendar me-2"></i>Meal Planner
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" onclick="logout()">
            <i class="fas fa-sign-out-alt me-2"></i>Logout
        </a>
    `;
    
    // Remove existing menus
    document.querySelectorAll('.dropdown-menu').forEach(m => m.remove());
    
    // Position and add menu
    const authLink = event.target.closest('.nav-item');
    authLink.style.position = 'relative';
    authLink.appendChild(menu);
    
    // Remove menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', (e) => {
            if (!authLink.contains(e.target)) {
                menu.remove();
            }
        }, { once: true });
    }, 10);
}

// Favorites management
function getFavorites() {
    return loadFromStorage(StorageKeys.FAVORITES) || [];
}

function addToFavorites(recipeId) {
    const favorites = getFavorites();
    if (!favorites.includes(recipeId)) {
        favorites.push(recipeId);
        saveToStorage(StorageKeys.FAVORITES, favorites);
        updateFavoritesCount();
        return true;
    }
    return false;
}

function removeFromFavorites(recipeId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(recipeId);
    if (index > -1) {
        favorites.splice(index, 1);
        saveToStorage(StorageKeys.FAVORITES, favorites);
        updateFavoritesCount();
        return true;
    }
    return false;
}

function isRecipeFavorite(recipeId) {
    return getFavorites().includes(recipeId);
}

function toggleFavorite(recipeId) {
    if (isRecipeFavorite(recipeId)) {
        removeFromFavorites(recipeId);
        showNotification('Recipe removed from favorites');
    } else {
        addToFavorites(recipeId);
        showNotification('Recipe added to favorites');
    }
    
    // Update heart icons on current page
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    favoriteButtons.forEach(button => {
        const recipeId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
        const icon = button.querySelector('i');
        if (isRecipeFavorite(recipeId)) {
            icon.className = 'fas fa-heart text-danger';
        } else {
            icon.className = 'far fa-heart';
        }
    });
}

function updateFavoritesCount() {
    const favorites = getFavorites();
    const countElements = document.querySelectorAll('.favorites-count');
    countElements.forEach(element => {
        element.textContent = favorites.length;
    });
}

// Recipe history
function addToHistory(recipeId) {
    let history = loadFromStorage(StorageKeys.RECIPE_HISTORY) || [];
    
    // Remove if already exists to move to front
    history = history.filter(item => item.recipeId !== recipeId);
    
    // Add to front
    history.unshift({
        recipeId,
        viewedAt: new Date().toISOString()
    });
    
    // Keep only last 20 items
    history = history.slice(0, 20);
    
    saveToStorage(StorageKeys.RECIPE_HISTORY, history);
}

function getHistory() {
    return loadFromStorage(StorageKeys.RECIPE_HISTORY) || [];
}

function clearHistory() {
    localStorage.removeItem(StorageKeys.RECIPE_HISTORY);
    showNotification('Recipe history cleared');
    
    // Refresh history display if on dashboard
    if (window.location.pathname.includes('dashboard')) {
        loadRecipeHistory();
    }
}

// Shopping list management
function getShoppingList() {
    return loadFromStorage(StorageKeys.SHOPPING_LIST) || [];
}

function addToShoppingList(ingredient) {
    const shoppingList = getShoppingList();
    if (!shoppingList.find(item => item.name === ingredient)) {
        shoppingList.push({
            id: generateId(),
            name: ingredient,
            completed: false,
            addedAt: new Date().toISOString()
        });
        saveToStorage(StorageKeys.SHOPPING_LIST, shoppingList);
        return true;
    }
    return false;
}

function removeFromShoppingList(itemId) {
    let shoppingList = getShoppingList();
    shoppingList = shoppingList.filter(item => item.id !== itemId);
    saveToStorage(StorageKeys.SHOPPING_LIST, shoppingList);
}

function toggleShoppingListItem(itemId) {
    const shoppingList = getShoppingList();
    const item = shoppingList.find(item => item.id === itemId);
    if (item) {
        item.completed = !item.completed;
        saveToStorage(StorageKeys.SHOPPING_LIST, shoppingList);
    }
}

function clearShoppingList() {
    localStorage.removeItem(StorageKeys.SHOPPING_LIST);
    showNotification('Shopping list cleared');
    
    // Refresh shopping list display if on dashboard
    if (window.location.pathname.includes('dashboard')) {
        loadShoppingList();
    }
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});