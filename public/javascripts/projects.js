document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    const projectTitles = document.querySelectorAll('.project-title');
    const projectImages = document.querySelectorAll('.project-image');
    const counterCurrent = document.querySelector('.counter-current');
    const totalProjects = projectTitles.length;
    
    // Set the total number of projects
    document.querySelector('.counter-total').textContent = totalProjects.toString().padStart(2, '0');
    
    // Reset scroll position on page refresh
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
    
    // Set first project as active initially
    if (projectTitles.length > 0) {
        projectTitles[0].classList.add('active');
    }
    
    if (projectImages.length > 0) {
        projectImages[0].classList.add('active');
    }
    
    // Current active project index
    let currentProject = 0;
    
    // Set up the wheel event handling for custom scrolling
    let isScrolling = false;
    let targetProject = 0;
    
    // Calculate center position - this will make titles center properly
    const calculateCenterPosition = (index) => {
        const windowCenter = window.innerWidth / 2;
        const titleWidth = projectTitles[index].offsetWidth;
        // We want the title to be in the center, so we need to offset by half its width
        // and also account for the initial padding (5vw from your CSS)
        const padding = window.innerWidth * 0.05; // 5vw converted to pixels
        return -(index * (window.innerWidth * 0.8)) - (titleWidth/2) + windowCenter - padding;
    };
    
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        e.preventDefault();
        
        // Determine scroll direction
        const direction = e.deltaY > 0 ? 1 : -1;
        
        // Calculate next project index with infinite loop
        targetProject = (currentProject + direction) % totalProjects;
        
        // Handle negative index for backward infinite loop
        if (targetProject < 0) targetProject = totalProjects - 1;
        
        // Only proceed if we're changing projects
        if (targetProject !== currentProject) {
            isScrolling = true;
            
            // Calculate the center position for current project
            let xPosition = calculateCenterPosition(targetProject);
            
            // Special case for looping from last to first
            if (currentProject === totalProjects - 1 && targetProject === 0 && direction > 0) {
                // First reset positions without animation (prep for loop)
                gsap.set(".project-titles", {
                    x: calculateCenterPosition(currentProject)
                });
                
                // The target position is now the first item
                xPosition = calculateCenterPosition(0);
            } 
            // Special case for looping from first to last
            else if (currentProject === 0 && targetProject === totalProjects - 1 && direction < 0) {
                // The target position is the last item
                xPosition = calculateCenterPosition(targetProject);
            }
            
            // Animate the text position - horizontal scroll
            gsap.to(".project-titles", {
                x: xPosition,
                duration: 1,
                ease: "power2.out"
            });
            
            // Update active title
            projectTitles.forEach((title, index) => {
                title.classList.toggle('active', index === targetProject);
            });
            
            // Update image - vertical slide from bottom
            projectImages.forEach((img, index) => {
                if (index === targetProject) {
                    // Prepare the new image
                    gsap.set(img, {
                        opacity: 0,
                        y: "100%"
                    });
                    
                    // Make it active
                    img.classList.add('active');
                    
                    // Animate it in
                    gsap.to(img, {
                        opacity: 1,
                        y: "0%",
                        duration: 1,
                        ease: "power2.out"
                    });
                } else {
                    // Animate out the current image
                    if (img.classList.contains('active')) {
                        gsap.to(img, {
                            opacity: 0,
                            y: "-100%",
                            duration: 1,
                            ease: "power2.out",
                            onComplete: function() {
                                img.classList.remove('active');
                                gsap.set(img, { y: "100%" }); // Reset for next time
                            }
                        });
                    }
                }
            });
            
            // Update the counter with a nice number animation
            gsap.to(counterCurrent, {
                innerText: (targetProject + 1).toString().padStart(2, '0'),
                duration: 0.5,
                snap: { innerText: 1 }, // Snap to integer values
                ease: "power2.out"
            });
            
            // Scroll indicator animation
            gsap.to(".scroll-indicator", {
                top: (targetProject / (totalProjects - 1)) * (window.innerHeight - 50), // 50 is the height of the indicator
                duration: 1,
                ease: "power2.out"
            });
            
            // Update current project
            currentProject = targetProject;
            
            // Reset scroll lock after animation completes
            setTimeout(() => {
                isScrolling = false;
                
                // If we've completed a loop and are back at position 0,
                // silently reset everything for the next cycle
                if (currentProject === 0 && direction > 0) {
                    gsap.set(".project-titles", { x: calculateCenterPosition(0) });
                }
            }, 1000);
        }
    }, { passive: false });
    
    // Prevent default scrolling
    window.addEventListener('scroll', function(e) {
        if (window.scrollY !== 0) {
            window.scrollTo(0, 0);
        }
    });
    
    // Allow touch swiping for mobile
    let touchStartY = 0;
    
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });
    
    window.addEventListener('touchmove', function(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }
        
        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;
        
        if (Math.abs(diff) > 50) { // Threshold for swipe
            const direction = diff > 0 ? 1 : -1;
            
            // Calculate next project index with infinite loop
            const nextProject = (currentProject + direction) % totalProjects;
            
            // Handle negative index for backward infinite loop
            const targetProject = nextProject < 0 ? totalProjects - 1 : nextProject;
            
            if (targetProject !== currentProject) {
                e.preventDefault();
                
                // Trigger the same transition as wheel event
                isScrolling = true;
                
                // Calculate the center position for the target project
                let xPosition = calculateCenterPosition(targetProject);
                
                // Special case for looping from last to first
                if (currentProject === totalProjects - 1 && targetProject === 0 && direction > 0) {
                    // First reset positions without animation (prep for loop)
                    gsap.set(".project-titles", {
                        x: calculateCenterPosition(currentProject)
                    });
                    
                    // The target position is now the first item
                    xPosition = calculateCenterPosition(0);
                } 
                // Special case for looping from first to last
                else if (currentProject === 0 && targetProject === totalProjects - 1 && direction < 0) {
                    // The target position is the last item
                    xPosition = calculateCenterPosition(targetProject);
                }
                
                // Update the text position
                gsap.to(".project-titles", {
                    x: xPosition,
                    duration: 1,
                    ease: "power2.out"
                });
                
                // Update active title
                projectTitles.forEach((title, index) => {
                    title.classList.toggle('active', index === targetProject);
                });
                
                // Update image with GSAP
                projectImages.forEach((img, index) => {
                    if (index === targetProject) {
                        // Prepare the new image
                        gsap.set(img, {
                            opacity: 0,
                            y: "100%"
                        });
                        
                        // Make it active
                        img.classList.add('active');
                        
                        // Animate it in
                        gsap.to(img, {
                            opacity: 1,
                            y: "0%",
                            duration: 1,
                            ease: "power2.out"
                        });
                    } else {
                        // Animate out the current image
                        if (img.classList.contains('active')) {
                            gsap.to(img, {
                                opacity: 0,
                                y: "-100%",
                                duration: 1,
                                ease: "power2.out",
                                onComplete: function() {
                                    img.classList.remove('active');
                                    gsap.set(img, { y: "100%" }); // Reset for next time
                                }
                            });
                        }
                    }
                });
                
                // Update the counter with animation
                gsap.to(counterCurrent, {
                    innerText: (targetProject + 1).toString().padStart(2, '0'),
                    duration: 0.5,
                    snap: { innerText: 1 }, // Snap to integer values
                    ease: "power2.out"
                });
                
                // Scroll indicator animation
                gsap.to(".scroll-indicator", {
                    top: (targetProject / (totalProjects - 1)) * (window.innerHeight - 50),
                    duration: 1,
                    ease: "power2.out"
                });
                
                // Update current project
                currentProject = targetProject;
                
                // Reset scroll lock after animation completes
                setTimeout(() => {
                    isScrolling = false;
                    
                    // If we've completed a loop and are back at position 0,
                    // silently reset everything for the next cycle
                    if (currentProject === 0 && direction > 0) {
                        gsap.set(".project-titles", { x: calculateCenterPosition(0) });
                    }
                }, 1000);
                
                // Reset touch start position
                touchStartY = touchY;
            }
        }
    }, { passive: false });
    
    // Initial position - center the first title
    gsap.set(".project-titles", { x: calculateCenterPosition(0) });
    
    // Add resize handler to recalculate center positions if window size changes
    window.addEventListener('resize', function() {
        gsap.set(".project-titles", { x: calculateCenterPosition(currentProject) });
    });
});