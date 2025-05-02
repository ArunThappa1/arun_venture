document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        projectType: document.getElementById('project-type').value,
        buildingSize: document.getElementById('building-size').value,
        preferredDate: document.getElementById('preferred-date').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!validateForm(formData)) {
        return;
    }

    // Show success message
    showSuccessMessage();
    
    // Reset form
    e.target.reset();
});

function validateForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.projectType || !data.buildingSize || !data.preferredDate) {
        alert('Please fill in all required fields');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    // Building size validation
    if (isNaN(data.buildingSize) || data.buildingSize <= 0) {
        alert('Please enter a valid building size');
        return false;
    }

    // Date validation
    const today = new Date();
    const selectedDate = new Date(data.preferredDate);
    if (selectedDate < today) {
        alert('Please select a future date');
        return false;
    }

    return true;
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
    `;
    successMessage.textContent = 'Consultation request submitted successfully! We will contact you soon.';
    
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
}

// Add these CSS animations to your booking-styles.css
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
