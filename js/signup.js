// Signup page functionality

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    // Validation
    if (!name) {
        showNotification('Please enter your full name', 'danger');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'danger');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'danger');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'danger');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Please accept the terms of service', 'danger');
        return;
    }
    
    // In a real app, this would create account with backend
    // For demo, we'll create a simple user
    const userData = {
        id: generateId(),
        name: name,
        email: email,
        loginMethod: 'email',
        createdAt: new Date().toISOString(),
        loginAt: new Date().toISOString()
    };
    
    // Save user data
    saveUser(userData);
    
    showNotification('Account created successfully! Welcome to Recipe Finder.');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}