// Search page functionality

let currentFilters = {
    categories: [],
    difficulty: [],
    time: []
};
let currentSort = 'relevance';
let currentPage = 1;
const resultsPerPage = 9;

document.addEventListener('DOMContentLoaded', () => {
    loadCategoryFilters();
    loadInitialResults();
    
    // Check for URL parameters
    const urlQuery = getUrlParameter('q');
    const urlCategory = getUrlParameter('category');
    
    if (urlQuery) {
        document.getElementById('searchInput').value = urlQuery;
    }
    
    if (urlCategory) {
        currentFilters.categories = [urlCategory];
        updateCategoryFilters();
    }
    
    performSearch();
});

// Load category filters
function loadCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    
    const categories = getAllCategories();
    container.innerHTML = categories.map(category => `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cat-${category.name}" 
                   value="${category.name}" onchange="applyFilters()">
            <label class="form-check-label" for="cat-${category.name}">
                ${category.name} (${category.count})
            </label>
        </div>
    `).join('');
}

// Update category filters based on current filters
function updateCategoryFilters() {
    const checkboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = currentFilters.categories.includes(checkbox.value);
    });
}

// Load initial results
function loadInitialResults() {
    const resultsContainer = document.getElementById('searchResults');
    const allRecipes = getAllRecipes();
    
    if (resultsContainer && allRecipes.length === 0) {
        resultsContainer.innerHTML = '<div class="col-12 text-center"><p>No recipes found.</p></div>';
    }
}

// Perform search
function performSearch(event) {
    if (event) {
        event.preventDefault();
        currentPage = 1; // Reset to first page
    }
    
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    
    // Update URL
    updateUrlParameter('q', query);
    
    // Get filtered results
    const results = searchRecipes(query, currentFilters);
    const sortedResults = sortRecipes(results, currentSort);
    
    displayResults(sortedResults, query);
    updateResultsCount(results.length, query);
    generatePagination(results.length);
}

// Apply filters
function applyFilters() {
    // Get category filters
    const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]:checked');
    currentFilters.categories = Array.from(categoryCheckboxes).map(cb => cb.value);
    
    // Get time filters
    const timeCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="time"]:checked');
    currentFilters.time = Array.from(timeCheckboxes).map(cb => cb.value);
    
    // Get difficulty filters
    const difficultyCheckboxes = document.querySelectorAll('input[type="checkbox"][id="easy"]:checked, input[type="checkbox"][id="medium"]:checked, input[type="checkbox"][id="hard"]:checked');
    currentFilters.difficulty = Array.from(difficultyCheckboxes).map(cb => cb.value);
    
    currentPage = 1; // Reset to first page
    performSearch();
}

// Clear filters
function clearFilters() {
    // Reset filter object
    currentFilters = {
        categories: [],
        difficulty: [],
        time: []
    };
    
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Clear search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // Clear URL parameters
    updateUrlParameter('q', '');
    updateUrlParameter('category', '');
    
    performSearch();
}

// Sort results
function sortResults(sortBy) {
    currentSort = sortBy;
    currentPage = 1; // Reset to first page
    performSearch();
}

// Display results
function displayResults(results, query) {
    const container = document.getElementById('searchResults');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="no-results">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h3>No recipes found</h3>
                    <p class="text-muted">Try adjusting your search terms or filters</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Paginate results
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    container.innerHTML = paginatedResults.map(recipe => createRecipeCard(recipe)).join('');
}

// Update results count
function updateResultsCount(count, query) {
    const countElement = document.getElementById('resultsCount');
    const queryElement = document.getElementById('searchQuery');
    
    if (countElement) {
        countElement.textContent = count;
    }
    
    if (queryElement && query) {
        queryElement.textContent = `for "${query}"`;
    } else if (queryElement) {
        queryElement.textContent = '';
    }
}

// Generate pagination
function generatePagination(totalResults) {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">Previous</a>
        </li>`;
    }
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
            <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
        </li>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">Next</a>
        </li>`;
    }
    
    container.innerHTML = paginationHTML;
}

// Go to page
function goToPage(page) {
    currentPage = page;
    performSearch();
    scrollToTop();
}