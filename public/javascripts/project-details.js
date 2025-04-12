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

    //text animation for second section
    gsap.from("#headAni1 h2", {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#content1",
            start: "top 70%",
            end:"bottom 30%",
            toggleActions: "play reverse play reverse",
            markers:false
        }
    });
    gsap.from("#parAni1 p", {
        duration: 0.6,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#content1",
            start: "top 70%",
            end:"bottom 30%",
            toggleActions: "play reverse play reverse",
            markers:false
        }
    });

    //parallax animation for big image
    gsap.to("#right1", {
        y: -280,
        ease: "none",
        scrollTrigger: {
            trigger: "#ani1",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: false
        }
    });
    //reverse parallax for small image
    gsap.to("#left1", {
        y: 180,
        ease: "none",
        scrollTrigger: {
            trigger: "#ani1",
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

//photo zoom animation
gsap.to(".gallery-image",{
    width:"100vw", 
    height:"100vh",
    scrollTrigger:{
        trigger:".gallery-section", 
        scrub:2,
        start:"top 0%", 
        end:"top -100%",
        markers:false,
        pin:true
    }
})
gsap.to(".gallery-image img",{
    scale:1.3,
    scrollTrigger:{
        trigger:".gallery-section", 
        scrub:2,
        start:"top 0%", 
        end:"top -100%",
        markers:false,
    }
})

 //parallax animation for big image
 gsap.to("#right2", {
    y: -280,
    ease: "none",
    scrollTrigger: {
        trigger: "#ani2",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        markers: false
    }
});
//reverse parallax for small image
gsap.to("#left2", {
    y: 180,
    ease: "none",
    scrollTrigger: {
        trigger: "#ani2",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        markers: false
    }
});

//text animation like the previous one
gsap.from("#headAni2 h2", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#content2",
        start: "top 70%",
        end:"bottom 30%",
        toggleActions: "play reverse play reverse",
        markers:false
    }
});
gsap.from("#parAni2 p", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#content2",
        start: "top 70%",
        end:"bottom 30%",
        toggleActions: "play reverse play reverse",
        markers:false
    }
});

});