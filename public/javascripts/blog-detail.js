// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeSmoothScrolling();
});

function initializeAnimations() {
    // Hero Section Parallax
    const heroImage = document.querySelector('.hero-image .parallax-image');
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".blog-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Content images parallax
    const contentImages = document.querySelectorAll('.image-block img, .image-container img');
    contentImages.forEach(image => {
        gsap.to(image, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Next article section parallax
    const nextArticleImage = document.querySelector('.next-article-image .parallax-image');
    if (nextArticleImage) {
        gsap.to(nextArticleImage, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".next-article",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Fade in content sections
    gsap.utils.toArray('.main-content > *').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate images
    gsap.utils.toArray('.image-block, .dual-image-block').forEach(image => {
        gsap.from(image, {
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: image,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate blockquotes
    gsap.utils.toArray('blockquote').forEach(quote => {
        gsap.from(quote, {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: quote,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

function initializeSmoothScrolling() {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Integrate Lenis with GSAP
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Make ScrollTrigger work with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 900);
    });
}

// Initialize image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: "power2.inOut"
            });
        }
    });
}); 