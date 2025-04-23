document.addEventListener('DOMContentLoaded', function () {
    const titles = document.querySelectorAll('.title');
    const images = document.querySelectorAll('.project-image');
    const titlesSlider = document.querySelector('.titles-slider');
    const imageContainer = document.querySelector('.image-container');
    const descriptions = document.querySelectorAll('.project-description');
    const slideCounter = document.querySelector('.slide-counter');

    let currentIndex = 1; // Start with Clarendon House active
    let isAnimating = false;
    let isFirstLoad = true;
    let isNavigating = false; // Flag to prevent double navigation

    // Initial setup
    gsap.set(descriptions[currentIndex], { autoAlpha: 1 });
    gsap.set(images[currentIndex], { autoAlpha: 1 });
    images[currentIndex].classList.add('active'); // Ensure active class is set initially
    updateSliderPosition(true);

    // Handle title clicks
    titles.forEach((title, index) => {
        title.addEventListener('click', function(e) {
            // First animate to the slide
            if (!isAnimating && currentIndex !== index) {
                animateToSlide(index);
                
                // Set a timeout to navigate after animation completes
                setTimeout(() => {
                    if (!isNavigating) {
                        isNavigating = true;
                        const targetLink = title.getAttribute('data-link');
                        if (targetLink) {
                            window.location.href = targetLink;
                        }
                    }
                }, 1200); // Wait for animation to complete before navigating
            } else if (currentIndex === index) {
                // If already on this slide, navigate immediately
                const targetLink = title.getAttribute('data-link');
                if (targetLink) {
                    window.location.href = targetLink;
                }
            }
        });

        title.addEventListener('mouseenter', function () {
            const activeImage = images[index]; // Get the image at the same index
            if (activeImage) {
                gsap.to(activeImage, {
                    duration: 0.3,
                    scale: 1.3,
                    ease: "power1.out"
                });
            }
        });

        title.addEventListener('mouseleave', function () {
            const activeImage = images[index]; // Get the image at the same index
            if (activeImage) {
                gsap.to(activeImage, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power1.out"
                });
            }
        });
    });

    // Make project images clickable too
    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            if (!isNavigating) {
                isNavigating = true;
                const targetLink = titles[index].getAttribute('data-link');
                if (targetLink) {
                    window.location.href = targetLink;
                }
            }
        });
    });

    // Animation sequence function
    function animateToSlide(newIndex) {
        if (isAnimating || newIndex === currentIndex) return;
        isAnimating = true;

        const prevIndex = currentIndex;
        currentIndex = newIndex;

        // Update slide counter first
        slideCounter.textContent = `${currentIndex + 1} / ${titles.length}`;

        // Remove active class from previous image
        images[prevIndex].classList.remove('active');

        // 1. First animate the titles - text scrolls first
        const titleTimeline = gsap.timeline({
            onComplete: () => {
                // 2. Animate the image
                const imageTimeline = gsap.timeline({
                    onComplete: () => {
                        // 3. Finally animate the description
                        const descTimeline = gsap.timeline({
                            onComplete: () => {
                                isAnimating = false;
                            }
                        });

                        // Hide previous description
                        descTimeline.to(descriptions[prevIndex], {
                            duration: 0.3,
                            autoAlpha: 0,
                            y: 20
                        });

                        // Show new description
                        descTimeline.fromTo(descriptions[currentIndex],
                            { autoAlpha: 0, y: 20 },
                            { duration: 0.4, autoAlpha: 1, y: 0 }
                        );
                    }
                });

                // Hide current image with slide up
                imageTimeline.to(images[prevIndex], {
                    duration: 0.5,
                    y: "-100%",
                    autoAlpha: 0
                });

                // Show new image with slide up from bottom
                imageTimeline.fromTo(images[currentIndex],
                    { y: "100%", autoAlpha: 0 },
                    { duration: 1.3, y: "0%", autoAlpha: 1 },
                    "-=0.3"
                );

                // Add active class to new image
                images[currentIndex].classList.add('active');
            }
        });

        // Update title active states and position
        titles.forEach((title, index) => {
            if (index === currentIndex) {
                gsap.to(title, {
                    duration: 0.5,
                    color: "rgba(255, 255, 255, 1)"
                });
            } else {
                gsap.to(title, {
                    duration: 0.5,
                    color: "rgba(255, 255, 255, 0.3)"
                });
            }
        });

        // Move the slider to center the active title
        updateSliderPosition();
    }

    function updateSliderPosition(immediate = false) {
        const windowWidth = window.innerWidth;
        const activeTitle = titles[currentIndex];
        const titleWidth = activeTitle.offsetWidth;
        const titleOffset = activeTitle.offsetLeft;
        const newPosition = (windowWidth / 2) - titleOffset - (titleWidth / 2);

        if (immediate || isFirstLoad) {
            gsap.set(titlesSlider, { x: newPosition });
            isFirstLoad = false;
        } else {
            gsap.to(titlesSlider, {
                duration: 0.8,
                x: newPosition,
                ease: "power2.out"
            });
        }
    }

    // Handle scroll events
    let lastScrollTime = 0;
    window.addEventListener('wheel', function (e) {
        const now = Date.now();
        if (now - lastScrollTime < 1000 || isAnimating) return; // Debounce scrolling

        lastScrollTime = now;

        if (e.deltaY > 0) {
            // Scroll down (move right)
            if (currentIndex < titles.length - 1) {
                animateToSlide(currentIndex + 1);
            }
        } else {
            // Scroll up (move left)
            if (currentIndex > 0) {
                animateToSlide(currentIndex - 1);
            }
        }
    });

    // Handle window resize to keep title centered
    window.addEventListener('resize', () => updateSliderPosition(true));
});
