// Contact Page JavaScript

// DOM Elements
const contactSection = document.querySelector('.contact-section');
const formContainer = document.querySelector('.form-container');
const mapContainer = document.querySelector('.map-container');
const submitButton = document.querySelector('.btn-submit');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCursorFollow();
    initScrollProgress();
    initFadeInAnimations();
    initSlideInAnimations();
    initBackToTop();
    initContactForm();
    initGoogleMap();
    
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const firstSection = document.querySelector('.form-map-section');
            if (firstSection) {
                window.scrollTo({
                    top: firstSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Initialize scroll progress indicator
 */
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', function() {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

/**
 * Initialize custom cursor follow effect
 */
function initCursorFollow() {
    const cursor = document.querySelector('.cursor-follow');
    if (!cursor) return;

    document.addEventListener('mousemove', function(e) {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseout', function() {
        cursor.style.display = 'none';
    });

    // Change cursor state on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .hover-effect');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
        });
    });
}

/**
 * Initialize fade-in animations with Intersection Observer
 */
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    if (!fadeElements.length) return;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize slide-in animations with Intersection Observer
 */
function initSlideInAnimations() {
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    
    // If no slide elements found, exit early
    if (!slideLeftElements.length && !slideRightElements.length) return;
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Only observe once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe slide-in-left elements
    slideLeftElements.forEach(el => {
        observer.observe(el);
    });
    
    // Observe slide-in-right elements
    slideRightElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize hero section animation
 */
function initHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    // Add active class with a slight delay to create a smooth entrance
    setTimeout(() => {
        heroContent.classList.add('active');
    }, 300);
}

/**
 * Initialize contact form animations and validation
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    const resetButton = document.querySelector('.reset-btn');
    
    if (!contactForm) return;

    // Form validation function
    function validateInput(input, errorMessage, validationFunction) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (!validationFunction(input.value.trim())) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            errorElement.textContent = errorMessage;
            return false;
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            errorElement.textContent = '';
            return true;
        }
    }

    // Validation rules
    const validationRules = {
        name: {
            validate: value => value.length >= 2,
            message: 'Please enter your name (minimum 2 characters)'
        },
        email: {
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        phone: {
            validate: value => value === '' || /^[0-9\+\-\s\(\)]{7,}$/.test(value),
            message: 'Please enter a valid phone number'
        },
        service: {
            validate: value => value !== '',
            message: 'Please select a service'
        },
        message: {
            validate: value => value.length >= 10,
            message: 'Please enter your message (minimum 10 characters)'
        }
    };

    // Add input event listeners for real-time validation
    Object.keys(validationRules).forEach(inputName => {
        const input = contactForm.querySelector(`[name="${inputName}"]`);
        if (input) {
            input.addEventListener('input', function() {
                validateInput(input, validationRules[inputName].message, validationRules[inputName].validate);
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate all inputs
        Object.keys(validationRules).forEach(inputName => {
            const input = contactForm.querySelector(`[name="${inputName}"]`);
            if (input) {
                const inputValid = validateInput(
                    input, 
                    validationRules[inputName].message, 
                    validationRules[inputName].validate
                );
                isValid = isValid && inputValid;
            }
        });

        if (isValid) {
            // Mock form submission with loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Hide form and show success message
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Reset form values
                contactForm.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        }
    });

    // Reset button functionality
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Hide success message and show form
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
        });
    }
}

/**
 * Initialize map interaction effects
 */
function initMapInteraction() {
    const mapWrapper = document.querySelector('.map-wrapper');
    if (!mapWrapper) return;
    
    // Add hover effect with subtle parallax
    mapWrapper.addEventListener('mouseenter', () => {
        mapWrapper.classList.add('hover');
    });
    
    mapWrapper.addEventListener('mouseleave', () => {
        mapWrapper.classList.remove('hover');
    });
    
    // Add parallax effect to map
    mapWrapper.addEventListener('mousemove', (e) => {
        const rect = mapWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        // Calculate percentage position
        const percentX = x / rect.width;
        const percentY = y / rect.height;
        
        // Apply subtle transform to iframe (parallax effect)
        const iframe = mapWrapper.querySelector('iframe');
        if (iframe) {
            iframe.style.transform = `scale(1.05) translate(${(percentX - 0.5) * -10}px, ${(percentY - 0.5) * -10}px)`;
        }
        
        // Add subtle movement to map details box
        const mapDetails = mapWrapper.querySelector('.map-details');
        if (mapDetails) {
            mapDetails.style.transform = `translate(${(percentX - 0.5) * 5}px, ${(percentY - 0.5) * 5}px)`;
        }
    });
    
    // Reset transforms when mouse leaves
    mapWrapper.addEventListener('mouseleave', () => {
        const iframe = mapWrapper.querySelector('iframe');
        const mapDetails = mapWrapper.querySelector('.map-details');
        
        if (iframe) {
            iframe.style.transform = '';
        }
        
        if (mapDetails) {
            mapDetails.style.transform = '';
        }
    });
    
    // Add directions link functionality
    const directionsLink = document.querySelector('.directions-link');
    if (directionsLink) {
        directionsLink.addEventListener('click', (e) => {
            // This will open in a new tab by default because of target="_blank" in the HTML
            // Add ripple effect to directions link
            const rect = directionsLink.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            directionsLink.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

/**
 * Back to top button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Google Maps initialization
 */
function initGoogleMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Check if Google Maps API is loaded
    if (typeof google === 'undefined') {
        // If not loaded yet, wait and try again
        setTimeout(initGoogleMap, 500);
        return;
    }

    // Map options
    const mapOptions = {
        center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
        zoom: 14,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    };

    // Create a new map
    const map = new google.maps.Map(mapContainer, mapOptions);

    // Add marker
    const marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Ultra Interiors'
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div class="info-window">
                <h3>Ultra Interiors</h3>
                <p>123 Design Avenue<br>New York, NY 10001</p>
                <p><a href="tel:+12125551234">+1 212 555 1234</a></p>
            </div>
        `
    });

    // Open info window when marker is clicked
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });

    // Make map responsive
    window.addEventListener('resize', function() {
        const center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });
}

// Form validation
function validateForm(form) {
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const message = form.querySelector('[name="message"]');
    let isValid = true;
    
    // Reset previous errors
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.remove());
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (optional but must be valid if provided)
    if (phone.value.trim() && !validatePhone(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message or submit form
        showSuccessMessage(form);
        
        // In a real application, you would send the form data to the server here
        // form.submit();
    }
    
    return isValid;
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Helper function to validate phone
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// Show error message under input
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
    input.classList.add('error');
    
    // Add shake animation
    input.classList.add('shake');
    setTimeout(() => {
        input.classList.remove('shake');
    }, 500);
}

// Show success message
function showSuccessMessage(form) {
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message fade-in';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent!</h3>
        <p>Thank you for contacting us. We'll get back to you shortly.</p>
    `;
    
    // Hide the form
    const formElements = form.querySelectorAll('.form-group, .submit-btn');
    formElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.display = 'none';
        }, 300);
    });
    
    // Add success message
    setTimeout(() => {
        form.appendChild(successMessage);
        setTimeout(() => {
            successMessage.classList.add('active');
        }, 100);
    }, 300);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        successMessage.classList.remove('active');
        setTimeout(() => {
            successMessage.remove();
            formElements.forEach(el => {
                el.style.display = '';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 100);
            });
        }, 300);
    }, 5000);
}

// Add CSS styles for form validation
(function addFormValidationStyles() {
    if (document.getElementById('formValidationStyles')) return;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'formValidationStyles';
    styleSheet.textContent = `
        .form-group input.invalid,
        .form-group select.invalid,
        .form-group textarea.invalid {
            border-color: #e74c3c;
            box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 5px;
            display: block;
        }
        
        .form-message {
            margin: 15px 0;
            padding: 12px 15px;
            border-radius: 2px;
            font-size: 0.9rem;
        }
        
        .form-message.success {
            background-color: rgba(46, 204, 113, 0.1);
            border-left: 3px solid #2ecc71;
            color: #2ecc71;
        }
        
        .form-message.error {
            background-color: rgba(231, 76, 60, 0.1);
            border-left: 3px solid #e74c3c;
            color: #e74c3c;
        }
        
        .form-message.fade-out {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    
    document.head.appendChild(styleSheet);
})();

// Form Animations
function initFormAnimations() {
    // Focus effects
    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        input.addEventListener('focus', () => {
            formGroup.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                formGroup.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            formGroup.classList.add('focused');
        }
    });
}

// In-view animations
function initInViewAnimations() {
    const elements = [formContainer, mapContainer];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => {
        if (el) observer.observe(el);
    });
}

// Ripple effect for button
function initRippleEffect() {
    if (!submitButton) return;
    
    submitButton.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Basic form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        
        // Check required fields
        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            
            if (field.value.trim() === '') {
                isValid = false;
                formGroup.classList.add('error');
                
                const errorMessage = document.createElement('span');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'This field is required';
                formGroup.appendChild(errorMessage);
            } else {
                formGroup.classList.remove('error');
            }
        });
        
        // Check email format
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim() !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                const formGroup = emailField.closest('.form-group');
                formGroup.classList.add('error');
                
                const errorMessage = document.createElement('span');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Please enter a valid email address';
                formGroup.appendChild(errorMessage);
            }
        }
        
        // If valid, submit the form (in a real project, you'd handle the AJAX submission here)
        if (isValid) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Hide form
                contactForm.style.display = 'none';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. We'll get back to you soon.</p>
                `;
                
                formContainer.appendChild(successMessage);
                
                // Animate success message
                setTimeout(() => {
                    successMessage.classList.add('active');
                }, 100);
            }, 1500);
        }
    });
}

// Handle hover effect on the map
if (document.querySelector('.map-wrapper')) {
    const mapWrapper = document.querySelector('.map-wrapper');
    const iframe = mapWrapper.querySelector('iframe');
    
    mapWrapper.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Parallax effect
        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        
        iframe.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    mapWrapper.addEventListener('mouseleave', function() {
        iframe.style.transform = 'translate(0, 0) scale(1)';
    });
} 