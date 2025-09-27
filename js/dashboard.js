// Dashboard functionality

document.addEventListener('DOMContentLoaded', () => {
    loadFavoriteRecipes();
    loadShoppingList();
    loadRecipeHistory();
});

// Load favorite recipes
function loadFavoriteRecipes() {
    const container = document.getElementById('favoriteRecipes');
    if (!container) return;
    
    const favoriteIds = getFavorites();
    
    if (favoriteIds.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="empty-state">
                    <i class="fas fa-heart fa-3x text-muted mb-3"></i>
                    <h4>No favorite recipes yet</h4>
                    <p class="text-muted">Start exploring and save your favorite recipes!</p>
                    <a href="search.html" class="btn btn-primary">Browse Recipes</a>
                </div>
            </div>
        `;
        return;
    }
    
    const favoriteRecipes = favoriteIds.map(id => getRecipeById(id)).filter(recipe => recipe);
    container.innerHTML = favoriteRecipes.map(recipe => createRecipeCard(recipe)).join('');
}

// Load shopping list
function loadShoppingList() {
    const container = document.getElementById('shoppingList');
    if (!container) return;
    
    const shoppingList = getShoppingList();
    
    if (shoppingList.length === 0) {
        container.innerHTML = `
            <div class="text-center">
                <i class="fas fa-shopping-list fa-3x text-muted mb-3"></i>
                <h4>Your shopping list is empty</h4>
                <p class="text-muted">Add ingredients from recipes or meal plans</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = shoppingList.map(item => `
        <div class="shopping-item ${item.completed ? 'completed' : ''}">
            <input type="checkbox" ${item.completed ? 'checked' : ''} 
                   onchange="toggleShoppingListItem('${item.id}')" id="item-${item.id}">
            <label for="item-${item.id}" class="flex-grow-1">${item.name}</label>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromShoppingList('${item.id}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Load recipe history
function loadRecipeHistory() {
    const container = document.getElementById('recipeHistory');
    if (!container) return;
    
    const history = getHistory();
    
    if (history.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="empty-state">
                    <i class="fas fa-history fa-3x text-muted mb-3"></i>
                    <h4>No recipe history</h4>
                    <p class="text-muted">Your recently viewed recipes will appear here</p>
                </div>
            </div>
        `;
        return;
    }
    
    const historyRecipes = history
        .map(item => {
            const recipe = getRecipeById(item.recipeId);
            return recipe ? { ...recipe, viewedAt: item.viewedAt } : null;
        })
        .filter(recipe => recipe);
    
    container.innerHTML = historyRecipes.map(recipe => {
        const recipeCard = createRecipeCard(recipe);
        // Add viewed date to the card
        const viewedDate = formatDate(recipe.viewedAt);
        return recipeCard.replace(
            '<div class="recipe-actions">',
            `<div class="text-muted small mb-2">Viewed on ${viewedDate}</div><div class="recipe-actions">`
        );
    }).join('');
}

// Toggle shopping list item completion
function toggleShoppingListItem(itemId) {
    const shoppingList = getShoppingList();
    const item = shoppingList.find(item => item.id === itemId);
    if (item) {
        item.completed = !item.completed;
        saveToStorage(StorageKeys.SHOPPING_LIST, shoppingList);
        
        // Update the visual state
        const itemElement = document.querySelector(`#item-${itemId}`).closest('.shopping-item');
        if (item.completed) {
            itemElement.classList.add('completed');
        } else {
            itemElement.classList.remove('completed');
        }
    }
}

// Remove item from shopping list
function removeFromShoppingList(itemId) {
    let shoppingList = getShoppingList();
    shoppingList = shoppingList.filter(item => item.id !== itemId);
    saveToStorage(StorageKeys.SHOPPING_LIST, shoppingList);
    
    // Remove from display
    const itemElement = document.querySelector(`#item-${itemId}`).closest('.shopping-item');
    itemElement.remove();
    
    // Check if list is empty
    if (shoppingList.length === 0) {
        loadShoppingList();
    }
    
    showNotification('Item removed from shopping list');
}