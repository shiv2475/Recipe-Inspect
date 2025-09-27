// Meal planner functionality

let mealPlan = {};
let selectedDay = null;
let selectedMeal = null;

document.addEventListener('DOMContentLoaded', () => {
    loadMealPlan();
    loadMealRecipeSuggestions();
});

// Load meal plan from storage
function loadMealPlan() {
    mealPlan = loadFromStorage(StorageKeys.MEAL_PLAN) || {};
    renderMealPlan();
}

// Save meal plan to storage
function saveMealPlan() {
    saveToStorage(StorageKeys.MEAL_PLAN, mealPlan);
}

// Render meal plan on calendar
function renderMealPlan() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];
    
    days.forEach(day => {
        meals.forEach(meal => {
            const slotElement = document.querySelector(`[data-day="${day}"][data-meal="${meal}"] .meal-slot`);
            if (slotElement) {
                const mealData = mealPlan[day]?.[meal];
                if (mealData) {
                    renderMealInSlot(slotElement, mealData, day, meal);
                } else {
                    // Show add button
                    slotElement.innerHTML = `
                        <div class="add-meal-btn" onclick="showMealModal('${day}', '${meal}')">
                            <i class="fas fa-plus"></i>
                        </div>
                    `;
                }
            }
        });
    });
}

// Render meal in slot
function renderMealInSlot(slotElement, mealData, day, meal) {
    const recipe = getRecipeById(mealData.recipeId);
    if (!recipe) return;
    
    slotElement.innerHTML = `
        <div class="meal-item">
            <button class="remove-meal" onclick="removeMealFromPlan('${day}', '${meal}')">
                <i class="fas fa-times"></i>
            </button>
            <div class="meal-title">${truncateText(recipe.name, 20)}</div>
            <div class="meal-time">${formatCookTime(recipe.cookTime)}</div>
        </div>
    `;
}

// Show meal selection modal
function showMealModal(day, meal) {
    selectedDay = day;
    selectedMeal = meal;
    
    const modal = new bootstrap.Modal(document.getElementById('mealModal'));
    modal.show();
    
    // Load recipes for modal
    searchModalRecipes('');
}

// Load meal recipe suggestions
function loadMealRecipeSuggestions() {
    const container = document.getElementById('mealRecipeSuggestions');
    if (!container) return;
    
    const suggestions = getFeaturedRecipes(8);
    container.innerHTML = suggestions.map(recipe => `
        <div class="recipe-suggestion mb-2" draggable="true" 
             ondragstart="dragStart(event)" data-recipe-id="${recipe.id}">
            <div class="d-flex align-items-center">
                <img src="${recipe.image}" alt="${recipe.name}" 
                     class="suggestion-img me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                <div class="flex-grow-1">
                    <div class="fw-bold">${truncateText(recipe.name, 25)}</div>
                    <small class="text-muted">${formatCookTime(recipe.cookTime)}</small>
                </div>
                <button class="btn btn-sm btn-outline-primary" 
                        onclick="quickAddMeal(${recipe.id})">Add</button>
            </div>
        </div>
    `).join('');
}

// Search recipes for meal planner
function searchMealRecipes(query) {
    const container = document.getElementById('mealRecipeSuggestions');
    if (!container) return;
    
    const results = searchRecipes(query);
    const limitedResults = results.slice(0, 8);
    
    if (limitedResults.length === 0) {
        container.innerHTML = '<p class="text-muted">No recipes found</p>';
        return;
    }
    
    container.innerHTML = limitedResults.map(recipe => `
        <div class="recipe-suggestion mb-2" draggable="true" 
             ondragstart="dragStart(event)" data-recipe-id="${recipe.id}">
            <div class="d-flex align-items-center">
                <img src="${recipe.image}" alt="${recipe.name}" 
                     class="suggestion-img me-2" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                <div class="flex-grow-1">
                    <div class="fw-bold">${truncateText(recipe.name, 25)}</div>
                    <small class="text-muted">${formatCookTime(recipe.cookTime)}</small>
                </div>
                <button class="btn btn-sm btn-outline-primary" 
                        onclick="quickAddMeal(${recipe.id})">Add</button>
            </div>
        </div>
    `).join('');
}

// Search recipes in modal
function searchModalRecipes(query) {
    const container = document.getElementById('modalRecipeResults');
    if (!container) return;
    
    const results = searchRecipes(query);
    const limitedResults = results.slice(0, 12);
    
    container.innerHTML = limitedResults.map(recipe => `
        <div class="col-md-6 col-lg-4 mb-3">
            <div class="card recipe-modal-card" onclick="addMealToPlan(${recipe.id})">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}" 
                     style="height: 150px; object-fit: cover;">
                <div class="card-body p-2">
                    <h6 class="card-title mb-1">${truncateText(recipe.name, 30)}</h6>
                    <small class="text-muted">${formatCookTime(recipe.cookTime)} • ${recipe.difficulty}</small>
                </div>
            </div>
        </div>
    `).join('');
}

// Quick add meal without modal
function quickAddMeal(recipeId) {
    // Find an empty slot to add the meal
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const meals = ['breakfast', 'lunch', 'dinner'];
    
    for (const day of days) {
        for (const meal of meals) {
            if (!mealPlan[day]?.[meal]) {
                addMealToPlanDirect(day, meal, recipeId);
                return;
            }
        }
    }
    
    showNotification('Meal plan is full. Remove some meals first.', 'warning');
}

// Add meal to plan directly
function addMealToPlanDirect(day, meal, recipeId) {
    if (!mealPlan[day]) {
        mealPlan[day] = {};
    }
    
    mealPlan[day][meal] = {
        recipeId: recipeId,
        addedAt: new Date().toISOString()
    };
    
    saveMealPlan();
    renderMealPlan();
    showNotification('Meal added to plan');
}

// Add meal to plan from modal
function addMealToPlan(recipeId) {
    if (!selectedDay || !selectedMeal) return;
    
    addMealToPlanDirect(selectedDay, selectedMeal, recipeId);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('mealModal'));
    modal.hide();
    
    selectedDay = null;
    selectedMeal = null;
}

// Remove meal from plan
function removeMealFromPlan(day, meal) {
    if (mealPlan[day]?.[meal]) {
        delete mealPlan[day][meal];
        if (Object.keys(mealPlan[day]).length === 0) {
            delete mealPlan[day];
        }
        saveMealPlan();
        renderMealPlan();
        showNotification('Meal removed from plan');
    }
}

// Clear entire meal plan
function clearMealPlan() {
    if (confirm('Are you sure you want to clear your entire meal plan?')) {
        mealPlan = {};
        saveMealPlan();
        renderMealPlan();
        showNotification('Meal plan cleared');
    }
}

// Generate shopping list from meal plan
function generateShoppingList() {
    const ingredients = [];
    
    Object.values(mealPlan).forEach(dayPlan => {
        Object.values(dayPlan).forEach(mealData => {
            const recipe = getRecipeById(mealData.recipeId);
            if (recipe) {
                ingredients.push(...recipe.ingredients);
            }
        });
    });
    
    if (ingredients.length === 0) {
        showNotification('No meals in plan to generate shopping list', 'warning');
        return;
    }
    
    // Remove duplicates and add to shopping list
    const uniqueIngredients = [...new Set(ingredients)];
    let addedCount = 0;
    
    uniqueIngredients.forEach(ingredient => {
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

// Drag and drop functionality
function dragStart(event) {
    const recipeId = event.target.closest('[data-recipe-id]').dataset.recipeId;
    event.dataTransfer.setData('text/plain', recipeId);
    event.dataTransfer.effectAllowed = 'copy';
}

function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    
    // Visual feedback
    event.currentTarget.classList.add('drag-over');
}

function dropMeal(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');
    
    const recipeId = parseInt(event.dataTransfer.getData('text/plain'));
    const slotElement = event.currentTarget;
    const dayElement = slotElement.closest('[data-day]');
    const day = dayElement.dataset.day;
    const meal = dayElement.dataset.meal;
    
    if (recipeId && day && meal) {
        addMealToPlanDirect(day, meal, recipeId);
    }
}

// Add CSS for drag feedback
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .meal-slot.drag-over {
            border-color: var(--primary-color) !important;
            background-color: rgba(255, 112, 67, 0.1) !important;
        }
        
        .recipe-suggestion {
            cursor: grab;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.2s;
        }
        
        .recipe-suggestion:hover {
            background-color: var(--light-gray);
        }
        
        .recipe-modal-card {
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .recipe-modal-card:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
});