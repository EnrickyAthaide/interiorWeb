// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
let lenis;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigationBar();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Navigation Bar Behavior
function initializeNavigationBar() {
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
        if (currentPath.includes('/blogs')) {
            const blogsLink = document.querySelector('.right-header nav ul li a[href="/blogs"]');
            if (blogsLink) blogsLink.parentElement.classList.add('active');
        } else if (currentPath === linkPath) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

function initializeSmoothScrolling() {
    // Initialize Lenis for smooth scrolling
    lenis = new Lenis({
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

function initializeAnimations() {
    // Set background images from data attributes
    document.querySelectorAll('.parallax-image[data-image]').forEach(element => {
        const imageUrl = element.getAttribute('data-image');
        element.style.backgroundImage = `url('${imageUrl}')`;
    });

    // Hero Section Parallax
    const heroImage = document.querySelector('.hero-image .parallax-image');
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: -20,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".blog-hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                markers: false
            }
        });
    }

    // Content images parallax
    const contentImages = document.querySelectorAll('.image-block .parallax-image, .dual-image-block .parallax-image');
    contentImages.forEach(image => {
        gsap.to(image, {
            yPercent: -15,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
                markers: false
            }
        });
    });

    // Next article section parallax
    const nextArticleImage = document.querySelector('.next-article-image .parallax-image');
    if (nextArticleImage) {
        gsap.to(nextArticleImage, {
            yPercent: -20,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".next-article",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                markers: false
            }
        });
    }

    // Contact image parallax
    const contactImage = document.querySelector('.contact-image .parallax-image');
    if (contactImage) {
        gsap.to(contactImage, {
            yPercent: -15,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                markers: false
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
    gsap.utils.toArray('.image-block img, .dual-image-block img').forEach(image => {
        gsap.from(image, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: image,
                start: 'top 75%',
                toggleActions: "play reverse play reverse",
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