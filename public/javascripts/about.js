document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor follow effect
    const cursor = document.querySelector('.cursor-follow');
    if (cursor) {
        // Create smoother cursor movement with GSAP
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Set initial position
        gsap.set(cursor, { left: mouseX, top: mouseY, opacity: 0 });
        
        document.addEventListener('mousemove', (e) => {
            // Update mouse position
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Make cursor visible on mouse movement
            if (parseFloat(cursor.style.opacity) === 0) {
                gsap.to(cursor, { opacity: 0.9, duration: 0.2 });
            }
        });
        
        // Animation loop for smoother following
        gsap.ticker.add(() => {
            // Calculate smooth movement with easing (lerp)
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            
            // Update cursor position
            gsap.set(cursor, { left: cursorX, top: cursorY });
        });
        
        // Add slight pulsing animation
        gsap.to(cursor, {
            scale: 1.2,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        });
        
        // Show cursor when mouse enters window
        document.addEventListener('mouseenter', () => {
            gsap.to(cursor, { opacity: 0.9, duration: 0.2 });
        });
    }

    // Initialize scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        });
    }

    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero-fullwidth');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            // Move the background image at a slower rate than scroll
            heroSection.style.backgroundPosition = `center ${scrollTop * 0.4}px`;
        });
    }

    // Initialize hero title animation
    const glitchEffect = document.querySelector('.glitch-effect');
    if (glitchEffect) {
        const glitchText = glitchEffect.getAttribute('data-text');
        
        setInterval(() => {
            glitchEffect.classList.add('active');
            
            setTimeout(() => {
                glitchEffect.classList.remove('active');
            }, 200);
        }, 3000);
    }

    // Initialize optimized parallax for elements with the parallax-item class
    const parallaxItems = document.querySelectorAll('.parallax-item');
    if (parallaxItems.length > 0) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxItems.forEach(item => {
                        const speed = item.getAttribute('data-depth') || 0.1;
                        const rect = item.getBoundingClientRect();
                        const center = window.innerHeight / 2;
                        const distance = center - rect.top - rect.height / 2;
                        
                        // Only apply parallax if item is in viewport
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            // Use transform for better performance
                            item.style.transform = `translate3d(0, ${distance * speed}px, 0)`;
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Initialize fade-in animation for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Initialize philosophy cards flip effect
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    philosophyCards.forEach(card => {
        // Add flip animation but no tilt
        card.addEventListener('mouseenter', () => {
            const cardInner = card.querySelector('.card-inner');
            gsap.to(cardInner, {
                rotationY: 180,
                duration: 0.8,
                ease: 'back.out(1.5)'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const cardInner = card.querySelector('.card-inner');
            gsap.to(cardInner, {
                rotationY: 0,
                duration: 0.8,
                ease: 'back.out(1.5)'
            });
        });
    });

    // Team cards hover effect - smooth and elegant
    const teamCards = document.querySelectorAll('.team-partner-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Create a smoother hover effect
            const img = card.querySelector('.partner-image img');
            const title = card.querySelector('.partner-overlay h3');
            const position = card.querySelector('.partner-position');
            const social = card.querySelector('.partner-social');
            const overlay = card.querySelector('.partner-overlay');
            
            gsap.to(card, {
                y: -15,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(img, {
                scale: 1.05,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(title, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.1,
                ease: 'power2.out'
            });
            
            gsap.to(position, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(social, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Smooth return to original state
            const img = card.querySelector('.partner-image img');
            const title = card.querySelector('.partner-overlay h3');
            const position = card.querySelector('.partner-position');
            const social = card.querySelector('.partner-social');
            const overlay = card.querySelector('.partner-overlay');
            
            gsap.to(card, {
                y: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
            
            gsap.to(img, {
                scale: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.to(overlay, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to([title, position, social], {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1
            });
        });
    });

    // Initialize GSAP animations if available
    if (window.gsap && window.ScrollTrigger) {
        // Team cards animation
        gsap.from('.team-partner-card', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.team-slider',
                start: 'top 80%'
            }
        });
        
        // Founder section animations
        gsap.from('.founder-image-wrapper', {
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.founder-section',
                start: 'top 80%'
            }
        });
        
        gsap.from('.founder-name, .founder-title', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.founder-content',
                start: 'top 80%'
            }
        });
        
        gsap.from('.founder-quote', {
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.founder-content',
                start: 'top 80%'
            }
        });
        
        gsap.from('.achievement', {
            y: 10,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            scrollTrigger: {
                trigger: '.founder-achievements',
                start: 'top 95%',
                toggleActions: 'play none none none'
            }
        });
        
        // Vision section animation
        gsap.from('.vision-statement', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.vision-content',
                start: 'top 80%'
            }
        });
        
        gsap.from('.vision-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
                trigger: '.vision-content',
                start: 'top 80%'
            }
        });
        
        // Section headers animation
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.children, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%'
                }
            });
        });
        
        // Team partners section animation
        gsap.from('.team-partners h2, .team-partners p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.team-partners',
                start: 'top 80%'
            }
        });
        
        // Hero content animation
        gsap.from('.hero-content > *', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.5
        });
    }

    // Initialize timeline animation
    function initTimelineAnimation() {
        const timelineSection = document.querySelector('.timeline-section');
        if (!timelineSection) return;

        const events = document.querySelectorAll('.timeline-event');
        const progress = document.querySelector('.timeline-progress-indicator');
        
        // Set up observer
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        
        let activeCount = 0;
        const totalEvents = events.length;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    activeCount = document.querySelectorAll('.timeline-event.active').length;
                    updateProgressBar();
                    // Keep observing to handle scrolling up and down
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        // Scrolled up past the element
                        entry.target.classList.remove('active');
                        activeCount = document.querySelectorAll('.timeline-event.active').length;
                        updateProgressBar();
                    }
                }
            });
        }, options);
        
        events.forEach(event => {
            observer.observe(event);
        });
        
        function updateProgressBar() {
            if (totalEvents > 0) {
                const progressValue = (activeCount / totalEvents) * 100;
                progress.style.height = `${progressValue}%`;
            }
        }
        
        // Initial update
        updateProgressBar();
    }

    // Initialize all animations when DOM is loaded
    initTimelineAnimation();

    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add pulse animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.7; }
        }
    `;
    document.head.appendChild(style);
}); 