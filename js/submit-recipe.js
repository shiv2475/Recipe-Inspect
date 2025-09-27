// Submit recipe functionality

document.addEventListener('DOMContentLoaded', () => {
    loadCategoryCheckboxes();
});

// Load category checkboxes
function loadCategoryCheckboxes() {
    const container = document.getElementById('categoryCheckboxes');
    if (!container) return;
    
    const categories = getAllCategories();
    container.innerHTML = categories.map(category => `
        <div class="col-md-4 col-sm-6">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="cat-${category.name}" 
                       value="${category.name}">
                <label class="form-check-label" for="cat-${category.name}">
                    <i class="${category.icon} me-2"></i>${category.name}
                </label>
            </div>
        </div>
    `).join('');
}

// Add ingredient input
function addIngredient() {
    const container = document.getElementById('ingredientsList');
    const newIngredient = document.createElement('div');
    newIngredient.className = 'ingredient-item mb-2';
    newIngredient.innerHTML = `
        <div class="input-group">
            <input type="text" class="form-control ingredient-input" placeholder="e.g., 2 cups flour" required>
            <button type="button" class="btn btn-outline-danger" onclick="removeIngredient(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(newIngredient);
}

// Remove ingredient input
function removeIngredient(button) {
    const ingredientItem = button.closest('.ingredient-item');
    const container = document.getElementById('ingredientsList');
    
    // Don't remove if it's the last one
    if (container.children.length > 1) {
        ingredientItem.remove();
    }
}

// Add instruction input
function addInstruction() {
    const container = document.getElementById('instructionsList');
    const stepNumber = container.children.length + 1;
    const newInstruction = document.createElement('div');
    newInstruction.className = 'instruction-item mb-2';
    newInstruction.innerHTML = `
        <div class="input-group">
            <span class="input-group-text">${stepNumber}</span>
            <textarea class="form-control instruction-input" rows="2" placeholder="Describe this step..." required></textarea>
            <button type="button" class="btn btn-outline-danger" onclick="removeInstruction(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    container.appendChild(newInstruction);
}

// Remove instruction input
function removeInstruction(button) {
    const instructionItem = button.closest('.instruction-item');
    const container = document.getElementById('instructionsList');
    
    // Don't remove if it's the last one
    if (container.children.length > 1) {
        instructionItem.remove();
        
        // Renumber the remaining instructions
        const remainingInstructions = container.querySelectorAll('.instruction-item');
        remainingInstructions.forEach((item, index) => {
            const numberSpan = item.querySelector('.input-group-text');
            numberSpan.textContent = index + 1;
        });
    }
}

// Handle recipe submission
function handleRecipeSubmit(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    const recipe = {
        id: Date.now(), // Simple ID generation
        name: document.getElementById('recipeName').value,
        description: document.getElementById('description').value,
        cookTime: parseInt(document.getElementById('cookTime').value),
        servings: parseInt(document.getElementById('servings').value),
        difficulty: document.getElementById('difficulty').value,
        categories: [],
        ingredients: [],
        instructions: [],
        image: document.getElementById('imageUrl').value || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
        rating: 0, // New recipes start with 0 rating
        nutrition: {}
    };
    
    // Get selected categories
    const categoryCheckboxes = document.querySelectorAll('#categoryCheckboxes input[type="checkbox"]:checked');
    recipe.categories = Array.from(categoryCheckboxes).map(cb => cb.value);
    
    // Get ingredients
    const ingredientInputs = document.querySelectorAll('.ingredient-input');
    recipe.ingredients = Array.from(ingredientInputs)
        .map(input => input.value.trim())
        .filter(ingredient => ingredient);
    
    // Get instructions
    const instructionInputs = document.querySelectorAll('.instruction-input');
    recipe.instructions = Array.from(instructionInputs)
        .map(input => input.value.trim())
        .filter(instruction => instruction);
    
    // Get nutrition info (optional)
    const calories = document.getElementById('calories').value;
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;
    const fat = document.getElementById('fat').value;
    
    if (calories || protein || carbs || fat) {
        recipe.nutrition = {
            calories: calories ? parseInt(calories) : 0,
            protein: protein ? parseFloat(protein) : 0,
            carbs: carbs ? parseFloat(carbs) : 0,
            fat: fat ? parseFloat(fat) : 0
        };
    }
    
    // Validate required fields
    if (!recipe.name || !recipe.description || recipe.ingredients.length === 0 || recipe.instructions.length === 0) {
        showNotification('Please fill in all required fields', 'danger');
        return;
    }
    
    if (recipe.categories.length === 0) {
        showNotification('Please select at least one category', 'danger');
        return;
    }
    
    // In a real app, this would send to backend
    // For now, we'll just show success message and redirect
    showNotification('Recipe submitted successfully! Thank you for sharing.');
    
    setTimeout(() => {
        // Simulate redirect to the new recipe (in a real app, you'd get the ID from backend)
        window.location.href = `search.html`;
    }, 2000);
}