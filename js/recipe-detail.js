// Recipe detail page functionality

document.addEventListener('DOMContentLoaded', () => {
    const recipeId = getUrlParameter('id');
    if (recipeId) {
        loadRecipeDetail(parseInt(recipeId));
        loadRelatedRecipes(parseInt(recipeId));
        
        // Add to history
        addToHistory(parseInt(recipeId));
    } else {
        showNotification('Recipe not found', 'danger');
        setTimeout(() => {
            window.location.href = 'search.html';
        }, 2000);
    }
});

// Load recipe detail
function loadRecipeDetail(recipeId) {
    const recipe = getRecipeById(recipeId);
    const container = document.getElementById('recipeContent');
    
    if (!recipe || !container) {
        container.innerHTML = '<div class="text-center"><h3>Recipe not found</h3></div>';
        return;
    }
    
    const isFavorite = isRecipeFavorite(recipeId);
    const heartClass = isFavorite ? 'fas text-danger' : 'far';
    
    container.innerHTML = `
        <div class="row">
            <div class="col-lg-6">
                <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid recipe-image-detail mb-4">
            </div>
            <div class="col-lg-6">
                <div class="recipe-header">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h1 class="recipe-title">${recipe.name}</h1>
                            <div class="recipe-rating mb-2">
                                ${generateStarRating(recipe.rating)} 
                                <span class="ms-2">${recipe.rating}/5</span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary btn-lg btn-favorite" onclick="toggleFavorite(${recipe.id})">
                            <i class="${heartClass} fa-heart"></i>
                        </button>
                    </div>
                    
                    <p class="recipe-description">${recipe.description}</p>
                    
                    <div class="recipe-meta-detail">
                        <div class="meta-item">
                            <span class="meta-value">${formatCookTime(recipe.cookTime)}</span>
                            <span class="meta-label">Cook Time</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-value">${recipe.servings}</span>
                            <span class="meta-label">Servings</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-value">${recipe.difficulty}</span>
                            <span class="meta-label">Difficulty</span>
                        </div>
                    </div>
                    
                    <div class="recipe-categories mb-4">
                        ${recipe.categories.map(cat => 
                            `<span class="badge bg-secondary me-2 mb-2">${cat}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="recipe-actions">
                        <button class="btn btn-primary me-2" onclick="addIngredientsToShoppingList(${recipe.id})">
                            <i class="fas fa-shopping-list me-2"></i>Add to Shopping List
                        </button>
                        <button class="btn btn-outline-secondary me-2" onclick="shareRecipe(${recipe.id})">
                            <i class="fas fa-share me-2"></i>Share
                        </button>
                        <button class="btn btn-outline-secondary" onclick="printRecipe()">
                            <i class="fas fa-print me-2"></i>Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-5">
            <div class="col-lg-8">
                <div class="recipe-content">
                    <div class="row">
                        <div class="col-md-6">
                            <h3>Ingredients</h3>
                            <ul class="ingredients-list">
                                ${recipe.ingredients.map(ingredient => 
                                    `<li>${ingredient}</li>`
                                ).join('')}
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h3>Instructions</h3>
                            <ol class="instructions-list">
                                ${recipe.instructions.map((instruction, index) => 
                                    `<li>
                                        <span class="step-number">${index + 1}</span>
                                        ${instruction}
                                    </li>`
                                ).join('')}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                ${recipe.nutrition ? createNutritionInfo(recipe.nutrition) : ''}
            </div>
        </div>
    `;
}

// Create nutrition info HTML
function createNutritionInfo(nutrition) {
    return `
        <div class="nutrition-info">
            <h4>Nutrition Facts</h4>
            <div class="nutrition-grid">
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.calories}</div>
                    <div class="nutrition-label">Calories</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.protein}g</div>
                    <div class="nutrition-label">Protein</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.carbs}g</div>
                    <div class="nutrition-label">Carbs</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-value">${nutrition.fat}g</div>
                    <div class="nutrition-label">Fat</div>
                </div>
            </div>
        </div>
    `;
}

// Load related recipes
function loadRelatedRecipes(recipeId) {
    const recipe = getRecipeById(recipeId);
    const container = document.getElementById('relatedRecipes');
    
    if (!recipe || !container) return;
    
    const relatedRecipes = getRelatedRecipes(recipe, 3);
    
    if (relatedRecipes.length === 0) {
        container.parentElement.style.display = 'none';
        return;
    }
    
    container.innerHTML = relatedRecipes.map(recipe => createRecipeCard(recipe)).join('');
}

// Add ingredients to shopping list
function addIngredientsToShoppingList(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    
    let addedCount = 0;
    recipe.ingredients.forEach(ingredient => {
        if (addToShoppingList(ingredient)) {
            addedCount++;
        }
    });
    
    if (addedCount > 0) {
        showNotification(`${addedCount} ingredients added to shopping list`);
    } else {
        showNotification('All ingredients are already in your shopping list');
    }
}

// Share recipe
function shareRecipe(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    
    if (navigator.share) {
        navigator.share({
            title: recipe.name,
            text: recipe.description,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Recipe URL copied to clipboard!');
        }).catch(() => {
            showNotification('Unable to copy URL', 'danger');
        });
    }
}

// Print recipe
function printRecipe() {
    window.print();
}