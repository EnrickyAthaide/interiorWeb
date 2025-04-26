// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollProgress();
    initFormValidation();
    initScrollAnimations();
    initMapAnimation();
    initBackToTop();
    initSmoothScroll();
    initFormFocus();
    initNavigationBar();
});

// Navigation Bar Behavior
function initNavigationBar() {
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.right-header nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
    
    // Special case for contact page
    if (currentPath === '/contact') {
        const contactLink = document.querySelector('.right-header nav ul li a[href="/contact"]');
        if (contactLink) contactLink.parentElement.classList.add('active');
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + '%';
        }
    });
}

// Animated Count Up for Credential Numbers
function initCountUp() {
    const credentialNumbers = document.querySelectorAll('.credential-number');
    
    if (!credentialNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const duration = 2000; // 2 seconds
                const step = finalValue / (duration / 16); // 16ms is roughly one frame at 60fps
                
                const counter = setInterval(() => {
                    currentValue += step;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (target.textContent.includes('+') ? '+' : '');
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : '');
                    }
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    credentialNumbers.forEach(number => {
        // Store the final value as a data attribute
        const finalValue = number.textContent;
        number.setAttribute('data-final-value', finalValue);
        // Start with 0
        number.textContent = '0' + (finalValue.includes('+') ? '+' : '');
        observer.observe(number);
    });
}

// Enhanced scroll animations with staggered effect
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    const slideUpElements = document.querySelectorAll('.slide-up');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element position
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 150); // 150ms staggered delay
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animation elements
    [...fadeElements, ...slideLeftElements, ...slideRightElements, ...slideUpElements].forEach(el => {
        observer.observe(el);
    });
    
    // Initialize hero content animation on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('active');
        }, 300);
    }
}

// Map animation
function initMapAnimation() {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Initialize Google Map when container is visible
                initGoogleMap();
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(mapContainer);
}

// Google Maps initialization
function initGoogleMap() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps API not loaded yet');
        return;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Replace with your actual coordinates
    const studioLocation = { lat: 40.7128, lng: -74.0060 }; // New York coordinates (example)
    
    const mapOptions = {
        zoom: 15,
        center: studioLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
            }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false
    };
    
    const map = new google.maps.Map(mapElement, mapOptions);
    
    // Add a custom marker
    const marker = new google.maps.Marker({
        position: studioLocation,
        map: map,
        title: 'Ultra Interiors Studio',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#b38b59',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff'
        },
        animation: google.maps.Animation.DROP
    });
    
    // Add info window
    const infoContent = `
        <div class="map-info-window">
            <h4>Ultra Interiors</h4>
            <p>123 Luxury Avenue, New York, NY 10001</p>
        </div>
    `;
    
    const infoWindow = new google.maps.InfoWindow({
        content: infoContent
    });
    
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
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

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form field focus effects
function initFormFocus() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Add focus class to parent on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class when not focused, unless there's a value
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state (for browser autofill)
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');
    
    const nameValidation = document.getElementById('name-validation');
    const emailValidation = document.getElementById('email-validation');
    const phoneValidation = document.getElementById('phone-validation');
    const serviceValidation = document.getElementById('service-validation');
    const messageValidation = document.getElementById('message-validation');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate Name
        if (!nameInput.value.trim()) {
            nameValidation.textContent = 'Please enter your name';
            nameInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            nameValidation.textContent = '';
            nameInput.parentElement.classList.remove('has-error');
        }
        
        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailValidation.textContent = 'Please enter your email';
            emailInput.parentElement.classList.add('has-error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            emailValidation.textContent = '';
            emailInput.parentElement.classList.remove('has-error');
        }
        
        // Validate Phone (optional)
        if (phoneInput.value.trim()) {
            const phoneRegex = /^[0-9\-\+\s\(\)]{8,20}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneValidation.textContent = 'Please enter a valid phone number';
                phoneInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                phoneValidation.textContent = '';
                phoneInput.parentElement.classList.remove('has-error');
            }
        } else {
            phoneValidation.textContent = '';
            phoneInput.parentElement.classList.remove('has-error');
        }
        
        // Validate Service
        if (serviceInput.value === '' || serviceInput.value === null) {
            serviceValidation.textContent = 'Please select a service';
            serviceInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            serviceValidation.textContent = '';
            serviceInput.parentElement.classList.remove('has-error');
        }
        
        // Validate Message
        if (!messageInput.value.trim()) {
            messageValidation.textContent = 'Please enter your message';
            messageInput.parentElement.classList.add('has-error');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageValidation.textContent = 'Your message is too short';
            messageInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            messageValidation.textContent = '';
            messageInput.parentElement.classList.remove('has-error');
        }
        
        // If form is valid, submit and show success message
        if (isValid) {
            // Add animation class to form
            contactForm.classList.add('form-submitting');
            
            // Simulate form submission (replace with actual AJAX in production)
            setTimeout(function() {
                contactForm.classList.remove('form-submitting');
                contactForm.classList.add('form-hidden');
                
                if (successMessage) {
                    successMessage.classList.add('visible');
                }
                
                // Reset form after submission
                contactForm.reset();
                
                // Remove focus class from all inputs
                document.querySelectorAll('.form-group.focused').forEach(group => {
                    group.classList.remove('focused');
                });
                
                // Hide success message after 5 seconds and show form again
                setTimeout(function() {
                    if (successMessage) {
                        successMessage.classList.remove('visible');
                    }
                    contactForm.classList.remove('form-hidden');
                }, 5000);
            }, 1500);
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (this.value.trim()) {
            nameValidation.textContent = '';
            this.parentElement.classList.remove('has-error');
        }
    });
    
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value.trim() && emailRegex.test(this.value.trim())) {
            emailValidation.textContent = '';
            this.parentElement.classList.remove('has-error');
        }
    });
    
    phoneInput.addEventListener('input', function() {
        const phoneRegex = /^[0-9\-\+\s\(\)]{8,20}$/;
        if (!this.value.trim() || phoneRegex.test(this.value.trim())) {
            phoneValidation.textContent = '';
            this.parentElement.classList.remove('has-error');
        }
    });
    
    serviceInput.addEventListener('change', function() {
        if (this.value !== '' && this.value !== null) {
            serviceValidation.textContent = '';
            this.parentElement.classList.remove('has-error');
        }
    });
    
    messageInput.addEventListener('input', function() {
        if (this.value.trim() && this.value.trim().length >= 10) {
            messageValidation.textContent = '';
            this.parentElement.classList.remove('has-error');
        }
    });
} 