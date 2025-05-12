// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // --------------------------
    // 1. Event Handling Section
    // --------------------------
    
    // Button click event
    const clickMeButton = document.getElementById('click-me');
    const clickOutput = document.getElementById('click-output');
    
    clickMeButton.addEventListener('click', function() {
        clickOutput.textContent = "Button was clicked! ";
        clickOutput.style.color = "#2ecc71";
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = "Button not clicked yet";
            clickOutput.style.color = "";
        }, 2000);
    });
    
    // Hover effect
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = "You're hovering! ";
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = "Hover over me!";
    });
    
    // Keypress detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
    });
    
    // Secret double click
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    
    secretBox.addEventListener('dblclick', function() {
        secretOutput.classList.remove('hidden');
        
        // Hide after 3 seconds
        setTimeout(() => {
            secretOutput.classList.add('hidden');
        }, 3000);
    });
    
    // Long press detection
    let pressTimer;
    const longPressTime = 1000; // 1 second
    
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            secretOutput.textContent = "You held it long! ";
            secretOutput.classList.remove('hidden');
            
            setTimeout(() => {
                secretOutput.classList.add('hidden');
                secretOutput.textContent = " You found the secret message!";
            }, 3000);
        }, longPressTime);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // --------------------------
    // 2. Interactive Elements
    // --------------------------
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed (${colorIndex + 1}/${colors.length})`;
    });
    
    // Image gallery
    const images = document.querySelectorAll('.gallery-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(prevIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        let nextIndex = (currentImageIndex + 1) % images.length;
        showImage(nextIndex);
    }, 5000);
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // --------------------------
    // 3. Form Validation
    // --------------------------
    const userForm = document.getElementById('user-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBars = document.querySelectorAll('.strength-bar');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            userForm.reset();
            resetPasswordStrength();
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.style.display = 'none';
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password.trim() === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            resetPasswordStrength();
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            updatePasswordStrength(1);
            return false;
        } else {
            passwordError.style.display = 'none';
            
            // Calculate password strength
            let strength = 1; // Default to weak
            
            if (password.length >= 12) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            // Cap at 3 for our bars
            strength = Math.min(strength, 3);
            updatePasswordStrength(strength);
            
            return true;
        }
    }
    
    function updatePasswordStrength(strength) {
        // Reset all bars
        strengthBars.forEach(bar => {
            bar.style.backgroundColor = '#ddd';
        });
        
        // Set color based on strength
        const colors = ['#e74c3c', '#f39c12', '#2ecc71']; // Red, Orange, Green
        
        for (let i = 0; i < strength; i++) {
            strengthBars[i].style.backgroundColor = colors[strength - 1];
        }
    }
    
    function resetPasswordStrength() {
        strengthBars.forEach(bar => {
            bar.style.backgroundColor = '#ddd';
        });
    }
});
