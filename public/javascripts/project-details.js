document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    
    // Get scroll value for GSAP integration
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    // Start the animation loop
    requestAnimationFrame(raf);
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Make ScrollTrigger work with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 900);
    });
    
    // Parallax effect
    gsap.to(".parallax-image", {
        y: -580,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-background",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: false
        }
    });

    //parallax animation for big image
    gsap.to(".right", {
        y: -380,
        ease: "none",
        scrollTrigger: {
            trigger: ".dual-image-section",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: false
        }
    });
    // Add reveal animation for the dual image section
// gsap.from(".image-container", {
//     y: 100,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.2,
//     ease: "power2.out",
//     scrollTrigger: {
//         trigger: ".dual-image-section",
//         start: "top 70%",
//         toggleActions: "play none none reverse"
//     }
// });
});