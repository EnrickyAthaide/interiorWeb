// Initialize custom cursor
document.addEventListener('DOMContentLoaded', () => {
  // YouTube video background implementation
  const videoId = 'sYC5BfJy2nw'; // Your YouTube video ID
  const youtubeContainer = document.getElementById('youtube-container');
  
  if (youtubeContainer) {
    // Create YouTube player div
    const playerDiv = document.createElement('div');
    playerDiv.id = 'youtube-player';
    youtubeContainer.appendChild(playerDiv);
    
    // Function to resize YouTube iframe for full coverage
    function resizeYoutubePlayer() {
      const player = document.getElementById('youtube-player');
      if (player) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Make the player larger than the viewport to ensure full coverage
        player.style.width = Math.max(windowWidth * 1.2, windowHeight * 1.2 * (16/9)) + 'px';
        player.style.height = Math.max(windowHeight * 1.2, windowWidth * 1.2 * (9/16)) + 'px';
        
        // Center the player
        player.style.position = 'absolute';
        player.style.top = '50%';
        player.style.left = '50%';
        player.style.transform = 'translate(-50%, -50%)';
      }
    }
    
    // Load the YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = function() {
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
          playlist: videoId, // Required for looping
          vq: 'hd1080', // Force high quality
          iv_load_policy: 3, // Hide annotations
          fs: 0, // Disable fullscreen button
          origin: window.location.origin,
          cc_load_policy: 0 // Hide captions
        },
        events: {
          onReady: function(event) {
            event.target.mute();
            event.target.playVideo();
            // Resize player on first load
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
  
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply the saved theme or default to user's preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      // Switch to light theme
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      // Switch to dark theme
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  });

  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
      });
      
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Show cursor after first movement
      if (cursor.style.opacity === '0') {
        gsap.to(cursor, { opacity: 1 });
        gsap.to(cursorFollower, { opacity: 0.5 });
      }
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      gsap.to(cursor, { opacity: 0 });
      gsap.to(cursorFollower, { opacity: 0 });
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
      gsap.to(cursor, { opacity: 1 });
      gsap.to(cursorFollower, { opacity: 0.5 });
    });
    
    // Link hover effects
    document.querySelectorAll('a, button, .project-item, .stat-item, .process-step, .control-dot').forEach(el => {
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
  
  // Initialize scroll progress indicator
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      gsap.to(scrollProgress, {
        width: `${scrollPercent}%`,
        duration: 0.2,
        ease: 'power1.out'
      });
    });
  }
  
  // Initialize smooth scrolling for anchor links
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
  
  // Hero section animations with text splitting
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && typeof SplitText !== 'undefined') {
    // Split text into characters
    const splitTitle = new SplitText(heroTitle, { type: 'chars' });
    
    // Animate each character
    gsap.from(splitTitle.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.03,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });
    
    // Hero subtitle and CTA animations
    gsap.to('.hero-subtitle', { opacity: 1, duration: 1, delay: 0.3 });
    gsap.to('.hero-description', { opacity: 1, duration: 1, delay: 1.2 });
    gsap.to('.hero-cta', { opacity: 1, duration: 1, delay: 1.5 });
    
    // Parallax effect on hero video background
    gsap.to('.youtube-container', {
      y: '10%',
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Ensure video loads correctly
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
      // Add event listener for video loading error
      heroVideo.addEventListener('error', () => {
        document.querySelector('.fallback-image').style.display = 'block';
        heroVideo.style.display = 'none';
      });
      
      // Add a class when video starts playing
      heroVideo.addEventListener('playing', () => {
        heroVideo.classList.add('video-playing');
      });
    }
  } else {
    // Fallback if SplitText is not available
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.to('.hero-subtitle', { opacity: 1, duration: 1, delay: 0.3 });
    gsap.to('.hero-description', { opacity: 1, duration: 1, delay: 1.2 });
    gsap.to('.hero-cta', { opacity: 1, duration: 1, delay: 1.5 });
  }
  
  // Featured Projects Animations
  const projectItems = document.querySelectorAll('.project-item');
  if (projectItems.length > 0) {
    gsap.from(projectItems, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.project-gallery',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
  
  // Initialize Section Headers Animation
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.querySelector('h2'), {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from(header.querySelector('.section-line'), {
      width: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from(header.querySelector('.section-number'), {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // About Section Animation
  const aboutContent = document.querySelector('.about-content');
  if (aboutContent) {
    gsap.from('.about-text', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
    
    gsap.from('.about-image', {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });
  }
  
  // Animated Number Counting
  document.querySelectorAll('.stat-number').forEach(number => {
    const target = parseInt(number.getAttribute('data-count'));
    gsap.to(number, {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: number,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Before-After Transformation Functionality
  const transformationCard = document.querySelector('.transformation-card');
  const transformationControls = document.querySelector('.transformation-controls');
  
  if (transformationCard && transformationControls) {
    // Add divider element to card
    const divider = document.createElement('div');
    divider.className = 'transformation-divider';
    transformationCard.appendChild(divider);
    
    // Initialize with a nice reveal animation
    gsap.fromTo('.before-side', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: 'power2.inOut' }
    );
    
    gsap.fromTo('.after-side', 
      { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }, 
      { 
        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)', 
        duration: 1.5, 
        delay: 0.5,
        ease: 'power2.inOut' 
      }
    );
    
    // Handle control buttons
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        controlButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get view type
        const viewType = button.getAttribute('data-view');
        
        // Remove all view classes
        transformationCard.classList.remove('view-before', 'view-after', 'view-hover', 'view-split');
        
        // Add the selected view class
        transformationCard.classList.add(`view-${viewType}`);
        
        // Handle divider visibility
        if (viewType === 'split') {
          divider.style.opacity = '0.7';
          
          // Animate to split view
          gsap.to('.after-side', {
            clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else if (viewType === 'before') {
          divider.style.opacity = '0';
          
          // Animate to before view
          gsap.to('.after-side', {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else if (viewType === 'after') {
          divider.style.opacity = '0';
          
          // Animate to after view
          gsap.to('.after-side', {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else if (viewType === 'hover') {
          divider.style.opacity = '0';
          
          // Set up for hover view
          gsap.to('.after-side', {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });
    
    // Add interactive drag feature (simplified)
    let isDragging = false;
    let initialTouchX = 0;
    
    // Only apply dragging in split view mode
    transformationCard.addEventListener('mousedown', (e) => {
      if (transformationCard.classList.contains('view-split')) {
        isDragging = true;
        document.body.style.cursor = 'ew-resize';
        updateSplitPosition(e.clientX);
      }
    });
    
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = 'default';
      }
    });
    
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSplitPosition(e.clientX);
      }
    });
    
    // Touch events
    transformationCard.addEventListener('touchstart', (e) => {
      if (transformationCard.classList.contains('view-split')) {
        isDragging = true;
        initialTouchX = e.touches[0].clientX;
        updateSplitPosition(e.touches[0].clientX);
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
      let percentage = ((x - cardRect.left) / cardRect.width) * 100;
      
      // Constrain between 10% and 90%
      percentage = Math.max(10, Math.min(percentage, 90));
      
      // Update the clip path
      gsap.to('.after-side', {
        clipPath: `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`,
        duration: 0.1,
        ease: 'none',
        overwrite: true
      });
      
      // Update divider position
      gsap.to('.transformation-divider', {
        left: `${percentage}%`,
        duration: 0.1,
        ease: 'none',
        overwrite: true
      });
    }
    
    // Add hover effect for hover mode
    transformationCard.addEventListener('mouseenter', () => {
      if (transformationCard.classList.contains('view-hover')) {
        gsap.to('.after-side', {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
    
    transformationCard.addEventListener('mouseleave', () => {
      if (transformationCard.classList.contains('view-hover')) {
        gsap.to('.after-side', {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  }
  
  // Process Section Animation
  gsap.from('.process-step', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.process-steps',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  // Process Icon Animation
  document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', () => {
      gsap.to(step.querySelector('.process-icon i'), {
        rotation: 15,
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    step.addEventListener('mouseleave', () => {
      gsap.to(step.querySelector('.process-icon i'), {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power1.inOut'
      });
    });
  });
  
  // Testimonial Slider Functionality
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const testimonialDots = document.querySelectorAll('.control-dot');
  
  if (testimonialItems.length > 0) {
    // Set up automatic rotation
    let currentIndex = 0;
    
    // Function to show specific testimonial
    const showTestimonial = (index) => {
      // Hide all testimonials
      testimonialItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // Hide all dots
      testimonialDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show selected testimonial and dot
      testimonialItems[index].classList.add('active');
      testimonialDots[index].classList.add('active');
      
      // Update current index
      currentIndex = index;
    };
    
    // Set up click events for dots
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        resetInterval(); // Reset the timer when manually changing
      });
    });
    
    // Automatic rotation
    let intervalId = setInterval(() => {
      let nextIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(nextIndex);
    }, 5000);
    
    // Reset interval function
    const resetInterval = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        let nextIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(nextIndex);
      }, 5000);
    };
  }
  
  // CTA Section Animation
  gsap.from('.cta-content h2', {
    opacity: 0,
    y: -30,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.cta-content p', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.cta-button', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.4,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
});