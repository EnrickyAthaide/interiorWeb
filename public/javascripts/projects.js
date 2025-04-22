document.addEventListener('DOMContentLoaded', function () {
    const titles = document.querySelectorAll('.title');
    const images = document.querySelectorAll('.project-image');
    const titlesSlider = document.querySelector('.titles-slider');
    const imageContainer = document.querySelector('.image-container');
    const descriptions = document.querySelectorAll('.project-description');
    const slideCounter = document.querySelector('.slide-counter');
    const titlesLinks = document.querySelectorAll('.title-link');

    let currentIndex = 1; // Start with Clarendon House active
    let isAnimating = false;
    let isFirstLoad = true;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Initial setup
    gsap.set(descriptions[currentIndex], { autoAlpha: 1 });
    gsap.set(images[currentIndex], { autoAlpha: 1 });
    images[currentIndex].classList.add('active'); // Ensure active class is set initially
    updateSliderPosition(true);

    // Update the counter text
    function updateCounter() {
        slideCounter.textContent = `${currentIndex + 1} / ${titles.length}`;
    }

    // Set the active project
    function setActiveProject(index) {
        // Reset all
        titles.forEach(title => title.classList.remove('active'));
        images.forEach(image => image.classList.remove('active'));
        descriptions.forEach(desc => desc.classList.remove('active'));
        
        // Set active for current index
        titles[index].classList.add('active');
        images[index].classList.add('active');
        descriptions[index].classList.add('active');
        
        // Update counter
        updateCounter();
    }

    titles.forEach((title, index) => {
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

    // Handle touch/mouse events for the titles slider
    titlesSlider.addEventListener('mousedown', startDrag);
    titlesSlider.addEventListener('touchstart', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);

    // Image hover effect (scaled on hover)
    imageContainer.addEventListener('mousemove', function(e) {
        if (isDragging) return;
        
        const activeImage = document.querySelector('.project-image.active');
        if (!activeImage) return;
        
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate how far from center (in percentage)
        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;
        
        // Scale and slight movement effect
        activeImage.style.transform = `scale(1.05) translate(${xPercent * 10}px, ${yPercent * 10}px)`;
    });
    
    imageContainer.addEventListener('mouseleave', function() {
        const activeImage = document.querySelector('.project-image.active');
        if (activeImage) {
            activeImage.style.transform = 'scale(1)';
        }
    });

    function startDrag(e) {
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
        } else {
            startX = e.clientX;
        }
        isDragging = true;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        let currentX;
        
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
        } else {
            currentX = e.clientX;
        }
        
        const diff = currentX - startX;
        
        // Determine if we should change the slide
        if (diff > 100) {
            // Move to previous slide
            currentIndex = Math.max(0, currentIndex - 1);
            setActiveProject(currentIndex);
            isDragging = false;
        } else if (diff < -100) {
            // Move to next slide
            currentIndex = Math.min(titles.length - 1, currentIndex + 1);
            setActiveProject(currentIndex);
            isDragging = false;
        }
    }
    
    function endDrag() {
        isDragging = false;
    }

    // Enable link navigation only when not dragging
    titlesLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            if (isDragging) {
                e.preventDefault();
            }
        });
    });
});
