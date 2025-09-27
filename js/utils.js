// Utility functions

// Format cooking time
function formatCookTime(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes === 0) {
            return `${hours}h`;
        }
        return `${hours}h ${remainingMinutes}m`;
    }
}

// Generate star rating HTML
function generateStarRating(rating, maxStars = 5) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = maxStars - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Create recipe card HTML
function createRecipeCard(recipe) {
    const isFavorite = isRecipeFavorite(recipe.id);
    const heartClass = isFavorite ? 'fas text-danger' : 'far';
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card recipe-card h-100">
                <img src="${recipe.image}" class="card-img-top recipe-card-img" alt="${recipe.name}">
                <div class="card-body recipe-card-body d-flex flex-column">
                    <h5 class="recipe-card-title">${recipe.name}</h5>
                    <p class="recipe-card-text flex-grow-1">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span><i class="far fa-clock me-1"></i>${formatCookTime(recipe.cookTime)}</span>
                        <span><i class="fas fa-users me-1"></i>${recipe.servings} servings</span>
                        <span class="recipe-rating">${generateStarRating(recipe.rating)} ${recipe.rating}</span>
                    </div>
                    <div class="recipe-actions">
                        <a href="recipe-detail.html?id=${recipe.id}" class="btn btn-primary btn-sm">View Recipe</a>
                        <button class="btn-favorite" onclick="toggleFavorite(${recipe.id})" title="Add to favorites">
                            <i class="${heartClass} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create category card HTML
function createCategoryCard(category) {
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <a href="search.html?category=${encodeURIComponent(category.name)}" class="category-card card">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h5 class="category-title">${category.name}</h5>
                <p class="category-count">${category.count} recipes</p>
            </a>
        </div>
    `;
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible notification`;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Position it
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Update URL parameter without reload
function updateUrlParameter(param, value) {
    const url = new URL(window.location);
    if (value) {
        url.searchParams.set(param, value);
    } else {
        url.searchParams.delete(param);
    }
    window.history.replaceState({}, '', url);
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animation elements
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', debounce(animateOnScroll, 10));
    animateOnScroll(); // Run once on load
});