document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lenis smooth scrolling
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
    
    // RAF for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Lenis + ScrollTrigger integration
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 900);
    });

    // Page title animation
    gsap.from('.page-title h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.page-title',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Blog items animation - staggered appearance
    gsap.from('.blog-item', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.blog-grid',
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Handle blog item click
    document.querySelectorAll('.blog-item').forEach(item => {
        item.addEventListener('click', function() {
            // Redirect to a specific blog post page
            // In a real implementation, you would use data attributes or IDs to determine which blog to load
            console.log('Blog item clicked');
            // window.location.href = '/blogs/article-slug';
        });
    });
}); 