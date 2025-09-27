// Login page functionality

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'danger');
        return;
    }
    
    // In a real app, this would authenticate with backend
    // For demo, we'll create a simple user
    const userData = {
        id: generateId(),
        email: email,
        name: email.split('@')[0], // Use part of email as name
        loginMethod: 'email',
        loginAt: new Date().toISOString(),
        remember: remember
    };
    
    // Save user data
    saveUser(userData);
    
    showNotification('Login successful!');
    
    setTimeout(() => {
        // Redirect to dashboard or previous page
        const returnUrl = getUrlParameter('return') || 'dashboard.html';
        window.location.href = returnUrl;
    }, 1000);
}

function continueAsGuest() {
    const userData = {
        id: 'guest',
        email: null,
        name: 'Guest User',
        loginMethod: 'guest',
        loginAt: new Date().toISOString(),
        isGuest: true
    };
    
    saveUser(userData);
    showNotification('Welcome! You\'re browsing as a guest.');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}