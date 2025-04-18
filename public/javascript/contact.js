// Initialize animations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor follow effect
    initCursorFollow();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize map
    initMap();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize section reveal animations
    initRevealAnimations();
});

// Cursor follow effect
function initCursorFollow() {
    const cursor = document.querySelector('.cursor-follow');
    
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    // Add hover effect for interactive elements
    const interactives = document.querySelectorAll('a, button, .contact-info-card, .studio-card, .form-group input, .form-group select, .form-group textarea, .interactive');
    
    interactives.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderWidth = '1px';
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '22px';
            cursor.style.height = '22px';
            cursor.style.borderWidth = '2px';
        });
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY;
        const progress = (scrollProgress / scrollTotal) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

// Initialize Mapbox map
function initMap() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // Since we might not have a valid API key, let's create a fallback
    try {
        if (typeof mapboxgl !== 'undefined') {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2s4eXIwbTFyMDI3ODNtcGxlY3dkaTZraCJ9.Pj1QqrBZlnXZcR-XwQMGsw';
            
            const coordinates = {
                lng: -74.0060,
                lat: 40.7128,
                zoom: 13
            };
            
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [coordinates.lng, coordinates.lat],
                zoom: coordinates.zoom
            });
            
            // Add studio location markers
            const studios = [
                { city: "New York", lng: -74.0060, lat: 40.7128 },
                { city: "London", lng: -0.1278, lat: 51.5074 },
                { city: "Dubai", lng: 55.2708, lat: 25.2048 }
            ];
            
            studios.forEach(studio => {
                // Create custom marker element
                const markerEl = document.createElement('div');
                markerEl.className = 'custom-marker';
                markerEl.style.width = '24px';
                markerEl.style.height = '24px';
                markerEl.style.borderRadius = '50%';
                markerEl.style.border = '3px solid #AB7E5F';
                markerEl.style.background = 'rgba(10, 10, 10, 0.8)';
                markerEl.style.boxShadow = '0 0 15px rgba(171, 126, 95, 0.7)';
                
                new mapboxgl.Marker(markerEl)
                    .setLngLat([studio.lng, studio.lat])
                    .addTo(map);
            });
            
            // Add navigation control
            map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
            
            // Disable map zoom when scrolling
            map.scrollZoom.disable();
        } else {
            createFallbackMap(mapContainer);
        }
    } catch (error) {
        console.error("Map initialization error:", error);
        createFallbackMap(mapContainer);
    }
}

function createFallbackMap(container) {
    // Create a static map image as fallback
    container.innerHTML = '';
    container.style.backgroundImage = "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')";
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    container.style.filter = 'grayscale(0.8) brightness(0.8)';
    
    // Add a marker-like element
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.left = '50%';
    marker.style.top = '50%';
    marker.style.transform = 'translate(-50%, -50%)';
    marker.style.width = '24px';
    marker.style.height = '24px';
    marker.style.borderRadius = '50%';
    marker.style.border = '3px solid #AB7E5F';
    marker.style.background = 'rgba(10, 10, 10, 0.8)';
    marker.style.boxShadow = '0 0 15px rgba(171, 126, 95, 0.7)';
    
    container.appendChild(marker);
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');
        
        // Validate form fields
        let isValid = true;
        
        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Please enter your name');
        } else {
            removeError(name);
        }
        
        if (!email.value.trim()) {
            isValid = false;
            showError(email, 'Please enter your email');
        } else if (!isValidEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'Please enter a valid email');
        } else {
            removeError(email);
        }
        
        if (phone.value.trim() && !isValidPhone(phone.value.trim())) {
            isValid = false;
            showError(phone, 'Please enter a valid phone number');
        } else {
            removeError(phone);
        }
        
        if (!service.value) {
            isValid = false;
            showError(service, 'Please select a service');
        } else {
            removeError(service);
        }
        
        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Please enter your message');
        } else {
            removeError(message);
        }
        
        // Submit form if valid
        if (isValid) {
            // Normally we would submit the form here
            // For demo purposes, we'll just show a success message
            showSuccessMessage(contactForm);
        }
    });
    
    // Helper functions for validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('div');
        
        // Remove any existing error message
        removeError(input);
        
        // Add error class
        formGroup.classList.add('error');
        
        // Create error message
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = message;
        errorMessage.style.color = '#e57373';
        errorMessage.style.fontSize = '0.85rem';
        errorMessage.style.marginTop = '5px';
        
        // Add error message to form group
        formGroup.appendChild(errorMessage);
        
        // Add error styling to input
        input.style.borderColor = '#e57373';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Remove error class
        formGroup.classList.remove('error');
        
        // Remove error message if it exists
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        // Reset input styling
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return regex.test(phone);
    }
    
    function showSuccessMessage(form) {
        // Hide the form
        form.style.transition = 'opacity 0.3s ease';
        form.style.opacity = '0';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="color: #AB7E5F; font-size: 4rem; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="font-size: 2rem; margin-bottom: 15px;">Message Sent!</h3>
                <p style="margin-bottom: 30px; font-size: 1.1rem;">Thank you for your message. Our team will contact you shortly.</p>
                <button class="reset-form" style="background-color: transparent; border: 1px solid #AB7E5F; color: #AB7E5F; padding: 12px 25px; cursor: pointer; transition: all 0.3s ease; font-size: 1rem;">Send Another Message</button>
            </div>
        `;
        
        // Insert success message after the form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
        
        // Reset form when clicking the "Send Another Message" button
        const resetButton = successMessage.querySelector('.reset-form');
        resetButton.addEventListener('click', function() {
            // Reset the form
            form.reset();
            
            // Remove success message
            form.parentNode.removeChild(successMessage);
            
            // Show the form again
            form.style.opacity = '1';
        });
    }
}

// Section reveal animations
function initRevealAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate contact cards
                if (entry.target.classList.contains('contact-grid-section')) {
                    const cards = entry.target.querySelectorAll('.contact-info-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 200 * index);
                    });
                }
                
                // Animate studio cards
                if (entry.target.classList.contains('studios-section')) {
                    const cards = entry.target.querySelectorAll('.studio-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 200 * index);
                    });
                }
                
                // Animate social links
                if (entry.target.classList.contains('social-connect-section')) {
                    const links = entry.target.querySelectorAll('.social-link');
                    links.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, 100 * index);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        // Set initial styles for elements that will be animated
        if (section.classList.contains('contact-grid-section')) {
            const cards = section.querySelectorAll('.contact-info-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }
        
        if (section.classList.contains('studios-section')) {
            const cards = section.querySelectorAll('.studio-card');
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }
        
        if (section.classList.contains('social-connect-section')) {
            const links = section.querySelectorAll('.social-link');
            links.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        }
        
        section.classList.add('reveal-section');
        observer.observe(section);
    });
    
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal-section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal-section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
} 