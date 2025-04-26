// Footer functionality (back to top button)
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Admin access keyboard shortcut (Ctrl+Alt+A)
    document.addEventListener('keydown', function(e) {
        // Check for Ctrl+Alt+A combination
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
            e.preventDefault(); // Prevent default browser action
            window.location.href = '/admin'; // Redirect to admin page
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the email input
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send this to your server
                // For now, just show a simple success message
                emailInput.value = '';
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#e0c9a6';
                successMessage.style.marginTop = '10px';
                
                // Add success message after the form
                this.parentNode.appendChild(successMessage);
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
}); 