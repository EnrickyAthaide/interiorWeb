// Initialize animations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor follow effect
    initCursorFollow();
    
    // Initialize scroll progress indicator
    initScrollProgress();
    
    // Initialize fade-in animations
    initFadeInAnimations();
    
    // Initialize achievement counters
    initCounters();
    
    // Initialize timeline animation
    initTimelineAnimation();
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
    const interactives = document.querySelectorAll('a, button, .interactive');
    
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

// Fade-in animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Achievement counter animation
function initCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counterElements.forEach(element => {
        observer.observe(element);
    });
}

// Timeline animation
function initTimelineAnimation() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const timelineProgressIndicator = document.querySelector('.timeline-progress-indicator');
    
    if (!timelineEvents.length || !timelineProgressIndicator) return;
    
    // Set up observer for timeline events
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    };
    
    let activeCount = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                activeCount++;
                
                // Update progress bar width based on active items
                const progress = (activeCount / timelineEvents.length) * 100;
                timelineProgressIndicator.style.width = `${progress}%`;
                
                // For vertical layout on mobile
                timelineProgressIndicator.style.height = `${progress}%`;
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineEvents.forEach(event => {
        observer.observe(event);
    });
    
    // Additional hover effects for timeline items
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', () => {
            const dot = event.querySelector('.event-dot');
            const year = event.querySelector('.event-year');
            
            if (dot) {
                dot.style.transform = 'translateX(-50%) scale(1.2)';
                dot.style.boxShadow = '0 0 20px rgba(171, 126, 95, 0.7)';
            }
            
            if (year) {
                year.style.color = '#ffffff';
            }
        });
        
        event.addEventListener('mouseleave', () => {
            const dot = event.querySelector('.event-dot');
            const year = event.querySelector('.event-year');
            
            if (dot) {
                dot.style.transform = 'translateX(-50%) scale(1)';
                dot.style.boxShadow = '0 0 15px rgba(171, 126, 95, 0.5)';
            }
            
            if (year) {
                year.style.color = 'var(--accent-color)';
            }
        });
    });
} 