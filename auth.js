// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            return;
        }
        
        // Simulate login (replace with actual API call)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Handle signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validation
        if (name.length < 2) {
            showError('name', 'Please enter your full name');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            return;
        }
        
        if (!validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            return;
        }
        
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match');
            return;
        }
        
        // Simulate signup (replace with actual API call)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        
        // Redirect to login page
        window.location.href = 'login.html';
    });
}

// Check login status on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    
    // Update navigation based on login status
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        if (loginLink) {
            if (isLoggedIn) {
                loginLink.innerHTML = `<i class="fas fa-user"></i> ${userEmail}`;
                loginLink.href = '#';
                loginLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        logout();
                    }
                });
            }
        }
    }
    
    // Redirect if trying to access auth pages while logged in
    if (isLoggedIn) {
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html')) {
            window.location.href = 'index.html';
        }
    }
}

// Helper functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentElement.querySelector('.error-message');
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    field.focus();
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Initialize auth check
document.addEventListener('DOMContentLoaded', checkLoginStatus);
