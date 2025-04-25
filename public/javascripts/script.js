// Main script for interior design website
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded - initializing website functionality");
  
  // Register GSAP plugins first
  if (typeof gsap !== 'undefined') {
    console.log("GSAP detected - registering plugins");
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      console.log("ScrollTrigger registered");
    }
    if (typeof SplitText !== 'undefined') {
      gsap.registerPlugin(SplitText);
      console.log("SplitText registered");
    }
  } else {
    console.error("GSAP library not loaded!");
    return; // Exit if GSAP isn't available
  }
  
  // -----------------------------------------
  // 1. INITIALIZE DARK THEME
  // -----------------------------------------
  document.body.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
  localStorage.setItem('theme', 'dark');
  
  // -----------------------------------------
  // 2. CUSTOM CURSOR
  // -----------------------------------------
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
      });
    });
    
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = 1;
      cursorFollower.style.opacity = 0.5;
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
      cursorFollower.style.opacity = 0;
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .stat-item, .process-step, .control-dot');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, backgroundColor: '#BAA170' });
        gsap.to(cursorFollower, { scale: 1.5, borderColor: 'transparent' });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: '#BAA170' });
        gsap.to(cursorFollower, { scale: 1, borderColor: '#BAA170' });
      });
    });
  }
  
  // -----------------------------------------
  // 3. SCROLL PROGRESS INDICATOR
  // -----------------------------------------
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      scrollProgress.style.width = `${scrollPercent}%`;
    });
  }
  
  // -----------------------------------------
  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // -----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // -----------------------------------------
  // 5. YOUTUBE VIDEO BACKGROUND
  // -----------------------------------------
  const youtubeContainer = document.getElementById('youtube-container');
  if (youtubeContainer) {
    const videoId = 'sYC5BfJy2nw'; // YouTube video ID
    
    // Create player div
    const playerDiv = document.createElement('div');
    playerDiv.id = 'youtube-player';
    youtubeContainer.appendChild(playerDiv);
    
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Function to resize player
    function resizeYoutubePlayer() {
      const player = document.getElementById('youtube-player');
      if (player) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        player.style.width = Math.max(windowWidth * 1.2, windowHeight * 1.2 * (16/9)) + 'px';
        player.style.height = Math.max(windowHeight * 1.2, windowWidth * 1.2 * (9/16)) + 'px';
        player.style.position = 'absolute';
        player.style.top = '50%';
        player.style.left = '50%';
        player.style.transform = 'translate(-50%, -50%)';
      }
    }
    
    // Create player when API is ready
    window.onYouTubeIframeAPIReady = function() {
      console.log("YouTube API ready - creating player");
      new YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          playlist: videoId,
          vq: 'hd1080'
        },
        events: {
          onReady: function(event) {
            console.log("YouTube player ready");
            event.target.mute();
            event.target.playVideo();
            resizeYoutubePlayer();
          },
          onStateChange: function(event) {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    };
    
    // Handle window resize
    window.addEventListener('resize', resizeYoutubePlayer);
  }
  
  // -----------------------------------------
  // 6. HERO SECTION TEXT ANIMATIONS
  // -----------------------------------------
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroDescription = document.querySelector('.hero-description');
  const heroCta = document.querySelector('.hero-cta');
  
  if (heroTitle) {
    console.log("Animating hero text elements");
    // Make sure elements are visible
    heroTitle.style.opacity = 1;
    
    if (typeof SplitText !== 'undefined') {
      // Split text animation
      const splitTitle = new SplitText(heroTitle, { type: 'chars' });
      
      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.03,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
      });
    }
    
    // Animate other hero elements
    if (heroSubtitle) {
      heroSubtitle.style.opacity = 0;
      gsap.to(heroSubtitle, { opacity: 1, duration: 1, delay: 0.3 });
    }
    
    if (heroDescription) {
      heroDescription.style.opacity = 0;
      gsap.to(heroDescription, { opacity: 1, duration: 1, delay: 1.2 });
    }
    
    if (heroCta) {
      heroCta.style.opacity = 0;
      gsap.to(heroCta, { opacity: 1, duration: 1, delay: 1.5 });
    }
  }
  
  // -----------------------------------------
  // 7. SECTION ANIMATIONS
  // -----------------------------------------
  console.log("Setting up section animations");
  
  // Featured Projects
  const projectItems = document.querySelectorAll('.project-item');
  if (projectItems.length > 0) {
    console.log(`Found ${projectItems.length} project items to animate`);
    gsap.from(projectItems, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: '.project-gallery',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
  
  // Section Headers
  document.querySelectorAll('.section-header').forEach(header => {
    const heading = header.querySelector('h2');
    const line = header.querySelector('.section-line');
    const number = header.querySelector('.section-number');
    
    if (heading) {
      gsap.from(heading, {
        opacity: 0,
        y: 30,
        duration: 1,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (line) {
      gsap.from(line, {
        width: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (number) {
      gsap.from(number, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }
  });
  
  // About Section
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    const aboutText = aboutContent.querySelector('.about-text');
    const aboutImage = aboutContent.querySelector('.about-image');
    
    if (aboutText) {
      gsap.from(aboutText, {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (aboutImage) {
      gsap.from(aboutImage, {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
  }
  
  // -----------------------------------------
  // 8. ANIMATED STAT COUNTING
  // -----------------------------------------
  console.log("Setting up stat number animation");
  
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(number => {
    const targetValue = parseInt(number.getAttribute('data-count'));
    
    if (!isNaN(targetValue)) {
      // Start at zero
      number.textContent = '0';
      
      ScrollTrigger.create({
        trigger: number.parentElement,
        start: 'top 80%',
        onEnter: function() {
          console.log(`Animating counter to ${targetValue}`);
          let startValue = 0;
          const duration = 2; // seconds
          const increment = targetValue / (duration * 60); // assuming 60fps
          
          function updateNumber() {
            startValue += increment;
            if (startValue < targetValue) {
              number.textContent = Math.ceil(startValue);
              requestAnimationFrame(updateNumber);
            } else {
              number.textContent = targetValue;
            }
          }
          
          requestAnimationFrame(updateNumber);
        },
        once: true
      });
    }
  });
  
  // -----------------------------------------
  // 9. BEFORE-AFTER TRANSFORMATION
  // -----------------------------------------
  console.log("Setting up before-after transformation");
  
  const transformationCard = document.querySelector('.transformation-card');
  const transformationControls = document.querySelector('.transformation-controls');
  
  if (transformationCard && transformationControls) {
    console.log("Found transformation card and controls");
    
    // Check if divider exists, if not create it
    let divider = transformationCard.querySelector('.transformation-divider');
    if (!divider) {
      divider = document.createElement('div');
      divider.className = 'transformation-divider';
      transformationCard.appendChild(divider);
      console.log("Created transformation divider element");
    }
    
    // Set initial position and visibility
    divider.style.opacity = '1';
    divider.style.left = '50%';
    
    // Get sides
    const beforeSide = transformationCard.querySelector('.before-side');
    const afterSide = transformationCard.querySelector('.after-side');
    
    if (beforeSide && afterSide) {
      // Default to split view mode
      transformationCard.classList.add('view-split');
      
      // Set initial clip path for after side
      afterSide.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
      
      // Handle controls
      const controlButtons = transformationControls.querySelectorAll('.control-btn');
      controlButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Update active button
          controlButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Get view type
          const viewType = button.getAttribute('data-view');
          console.log(`Changing transformation view to: ${viewType}`);
          
          // Remove all view classes
          transformationCard.classList.remove('view-before', 'view-after', 'view-hover', 'view-split');
          
          // Apply selected view
          transformationCard.classList.add(`view-${viewType}`);
          
          // Handle transformations based on view type
          switch(viewType) {
            case 'split':
              divider.style.opacity = '1';
              afterSide.style.clipPath = 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
              break;
              
            case 'before':
              divider.style.opacity = '0';
              afterSide.style.clipPath = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)';
              break;
              
            case 'after':
              divider.style.opacity = '0';
              afterSide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
              break;
              
            case 'hover':
              divider.style.opacity = '0';
              afterSide.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
              
              // Add hover effect
              transformationCard.addEventListener('mouseenter', () => {
                if (transformationCard.classList.contains('view-hover')) {
                  afterSide.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
                }
              });
              
              transformationCard.addEventListener('mouseleave', () => {
                if (transformationCard.classList.contains('view-hover')) {
                  afterSide.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)';
                }
              });
              break;
          }
        });
      });
      
      // Draggable split functionality
      let isDragging = false;
      
      transformationCard.addEventListener('mousedown', (e) => {
        if (transformationCard.classList.contains('view-split')) {
          isDragging = true;
          document.body.style.cursor = 'ew-resize';
          updateSplitPosition(e.clientX);
        }
      });
      
      window.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.cursor = 'default';
      });
      
      window.addEventListener('mousemove', (e) => {
        if (isDragging) {
          updateSplitPosition(e.clientX);
        }
      });
      
      // Touch support
      transformationCard.addEventListener('touchstart', (e) => {
        if (transformationCard.classList.contains('view-split')) {
          isDragging = true;
          updateSplitPosition(e.touches[0].clientX);
          e.preventDefault();
        }
      });
      
      window.addEventListener('touchend', () => {
        isDragging = false;
      });
      
      window.addEventListener('touchmove', (e) => {
        if (isDragging) {
          updateSplitPosition(e.touches[0].clientX);
          e.preventDefault();
        }
      });
      
      // Function to update split position
      function updateSplitPosition(x) {
        const cardRect = transformationCard.getBoundingClientRect();
        const percentage = Math.max(10, Math.min(90, ((x - cardRect.left) / cardRect.width) * 100));
        
        afterSide.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
        divider.style.left = `${percentage}%`;
      }
    }
  }
  
  // -----------------------------------------
  // 10. PROCESS SECTION ANIMATION
  // -----------------------------------------
  console.log("Setting up process section animation");
  
  // Define the process steps data
  const processStepsData = [
    { title: "Briefing", description: "Understanding client needs.", icon: "fa-regular fa-comments" },
    { title: "Design", description: "Translating vision into blueprints.", icon: "fa-solid fa-pencil-ruler" },
    { title: "Execution", description: "Building and crafting the space.", icon: "fa-solid fa-cogs" },
    { title: "Handover", description: "Delivering a move-in ready masterpiece.", icon: "fa-regular fa-handshake" }
  ];
  
  // Get the container element
  const processStepsContainer = document.getElementById('process-steps-container');
  
  if (processStepsContainer) {
    console.log("Process steps container found, creating steps");
    
    // Clear any existing content
    processStepsContainer.innerHTML = '';
    
    // Create and append process steps
    processStepsData.forEach((step, index) => {
      // Create the process step element
      const stepElement = document.createElement('div');
      stepElement.className = 'process-step';
      stepElement.setAttribute('data-step', index + 1);
      
      // Add the HTML content for the step
      stepElement.innerHTML = `
        <div class="process-icon">
          <i class="${step.icon}"></i>
        </div>
        <span class="process-number">0${index + 1}</span>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
        <div class="process-arrow">
          <i class="fa-solid fa-arrow-right-long"></i>
        </div>
      `;
      
      // Set inline CSS to ensure proper display
      stepElement.style.display = 'flex';
      stepElement.style.opacity = '0';
      stepElement.style.transform = 'translateY(20px)';
      
      // Append the step to the container
      processStepsContainer.appendChild(stepElement);
    });
    
    // Force the container to display as grid with 4 columns
    processStepsContainer.style.display = 'grid';
    processStepsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    processStepsContainer.style.gap = '30px';
    
    // Get all process steps after creation
    const processSteps = processStepsContainer.querySelectorAll('.process-step');
    console.log(`Created ${processSteps.length} process steps`);
    
    // Apply animations to each step
    processSteps.forEach((step, index) => {
      // Animate step into view
      gsap.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2 + (index * 0.15),
        ease: 'power2.out'
      });
      
      // Apply hover effects
      const icon = step.querySelector('.process-icon i');
      const arrow = step.querySelector('.process-arrow i');
      
      step.addEventListener('mouseenter', () => {
        // Scale up
        gsap.to(step, {
          y: -8,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
          duration: 0.3
        });
        
        // Animate the bottom line
        gsap.set(step, { '--scaleX': 1 });
        
        if (icon) {
          gsap.to(icon.parentElement, {
            backgroundColor: 'var(--primary-color)',
            duration: 0.3
          });
          
          gsap.to(icon, {
            color: 'white',
            rotation: 15,
            scale: 1.2,
            duration: 0.3
          });
        }
        
        if (arrow) {
          gsap.to(arrow, {
            x: 5,
            opacity: 1,
            duration: 0.3,
            repeat: 1,
            yoyo: true
          });
        }
      });
      
      step.addEventListener('mouseleave', () => {
        // Scale back
        gsap.to(step, {
          y: 0,
          boxShadow: 'var(--box-shadow)',
          duration: 0.3
        });
        
        // Hide the bottom line
        gsap.set(step, { '--scaleX': 0 });
        
        if (icon) {
          gsap.to(icon.parentElement, {
            backgroundColor: 'rgba(186, 161, 112, 0.1)',
            duration: 0.3
          });
          
          gsap.to(icon, {
            color: 'var(--primary-color)',
            rotation: 0,
            scale: 1,
            duration: 0.3
          });
        }
      });
    });
    
    // Make sure the last process step doesn't show an arrow
    const lastStep = processSteps[processSteps.length - 1];
    if (lastStep) {
      const lastArrow = lastStep.querySelector('.process-arrow');
      if (lastArrow) {
        lastArrow.style.display = 'none';
      }
    }
    
    // Apply media queries programmatically
    const updateProcessLayout = () => {
      const windowWidth = window.innerWidth;
      
      if (windowWidth <= 768) {
        // Mobile layout: 1 column
        processStepsContainer.style.gridTemplateColumns = '1fr';
        console.log("Applied mobile layout to process steps");
      } else if (windowWidth <= 1200) {
        // Tablet layout: 2 columns
        processStepsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        console.log("Applied tablet layout to process steps");
      } else {
        // Desktop layout: 4 columns
        processStepsContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        console.log("Applied desktop layout to process steps");
      }
    };
    
    // Initial call
    updateProcessLayout();
    
    // Update on window resize
    window.addEventListener('resize', updateProcessLayout);
  } else {
    console.error("Process steps container not found in the DOM");
  }
  
  // -----------------------------------------
  // 11. TESTIMONIALS SLIDER
  // -----------------------------------------
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialDots = document.querySelectorAll('.control-dot');
  
  if (testimonialItems.length > 0 && testimonialDots.length > 0) {
    console.log(`Found ${testimonialItems.length} testimonials to animate`);
    
    let currentIndex = 0;
    let intervalId = null;
    
    // Function to show a specific testimonial
    function showTestimonial(index) {
      testimonialItems.forEach(item => item.classList.remove('active'));
      testimonialDots.forEach(dot => dot.classList.remove('active'));
      
      testimonialItems[index].classList.add('active');
      testimonialDots[index].classList.add('active');
      currentIndex = index;
    }
    
    // Set up dot click events
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        resetInterval();
      });
    });
    
    // Function to reset automatic rotation
    function resetInterval() {
      clearInterval(intervalId);
      startInterval();
    }
    
    // Function to start automatic rotation
    function startInterval() {
      intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(nextIndex);
      }, 5000);
    }
    
    // Start the automatic rotation
    startInterval();
  }
  
  // -----------------------------------------
  // 12. CTA SECTION ANIMATION
  // -----------------------------------------
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    const heading = ctaSection.querySelector('h2');
    const paragraph = ctaSection.querySelector('p');
    const button = ctaSection.querySelector('.cta-button');
    
    if (heading) {
      gsap.from(heading, {
        opacity: 0,
        y: -30,
        duration: 1,
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (paragraph) {
      gsap.from(paragraph, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
    
    if (button) {
      gsap.from(button, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: ctaSection,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      });
    }
  }
  
  console.log("Website initialization complete");
});