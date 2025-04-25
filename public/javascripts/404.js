// 404 Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Simple custom cursor implementation
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  // Check if we're on a device that likely has a mouse
  const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        (navigator.msMaxTouchPoints > 0);
  
  if (!isTouchDevice && cursor && cursorDot) {
    // Show cursors
    cursor.style.opacity = 0.5;
    cursorDot.style.opacity = 1;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Simple direct positioning
    document.addEventListener('mousemove', (e) => {
      // Update position without any easing or transforms
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      // Small delay for the outer cursor
      setTimeout(() => {
        cursor.style.left = (e.clientX - 10) + 'px';  // Centered (20px width)
        cursor.style.top = (e.clientY - 10) + 'px';   // Centered (20px height)
      }, 50);
    });
    
    // Highlight on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .primary-btn, .secondary-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.opacity = 0.8;
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.opacity = 0.5;
      });
    });
  }

  // Parallax effect for floating elements
  const floatingElements = document.querySelectorAll('.floating-element');
  
  if (floatingElements.length > 0) {
    floatingElements.forEach((element, index) => {
      // Random initial positions
      gsap.set(element, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2
      });
      
      // Animate each element with different durations
      gsap.to(element, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 10 + 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5
      });
    });
  }

  // Glitch effect for error code
  const glitchText = document.querySelector('.error-code.glitch');
  
  if (glitchText) {
    // Animate the error code with a glitch effect
    const timeline = gsap.timeline({repeat: -1, repeatDelay: 5});
    
    timeline
      .to(glitchText, {
        skewX: 70,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        skewX: 0,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        opacity: 0.8,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        opacity: 1,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        x: -20,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        x: 0,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        x: 15,
        scaleY: 1.5,
        duration: 0.08,
        ease: 'power4.inOut'
      })
      .to(glitchText, {
        x: 0,
        scaleY: 1,
        duration: 0.04,
        ease: 'power4.inOut'
      })
      .add('+=0.4');  // Pause between glitch effects
  }

  // Parallax effect for background elements based on mouse movement
  const container = document.querySelector('.error-container');
  
  if (container && !isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      gsap.to(container, {
        x: x * 30,
        y: y * 30,
        rotation: x * 2,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }

  // Page entrance animation
  if (container) {
    const content = document.querySelector('.error-content');
    
    gsap.from(container, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'power3.out'
    });
    
    if (content) {
      gsap.from(content.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }
});