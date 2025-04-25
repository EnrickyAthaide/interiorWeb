// Custom cursor effect
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', function(e) {
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
  
  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', function() {
    gsap.to(cursor, { opacity: 0 });
    gsap.to(cursorFollower, { opacity: 0 });
  });
  
  document.addEventListener('mouseenter', function() {
    gsap.to(cursor, { opacity: 1 });
    gsap.to(cursorFollower, { opacity: 0.5 });
  });
  
  // Add hover effect to interactive elements
  const hoverElements = document.querySelectorAll('a, button, input, .brand-link, .logo-img');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      gsap.to(cursor, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid #e0c9a6', duration: 0.3 });
      gsap.to(cursorFollower, { scale: 0, opacity: 0, duration: 0.3 });
    });
    
    element.addEventListener('mouseleave', function() {
      gsap.to(cursor, { scale: 1, backgroundColor: '#e0c9a6', border: 'none', duration: 0.3 });
      gsap.to(cursorFollower, { scale: 1, opacity: 0.5, duration: 0.3 });
    });
  });
  
  // Password visibility toggle
  const passwordToggle = document.querySelector('.password-toggle');
  const passwordInput = document.getElementById('password');
  
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      // Toggle icon
      const icon = this.querySelector('i');
      if (type === 'text') {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
  
  // Page load animations
  function initAnimations() {
    const loginPanel = document.querySelector('.login-panel');
    const loginBrand = document.querySelector('.login-brand');
    const loginForm = document.querySelector('.login-form-container');
    const parallaxImage = document.querySelector('.parallax-image');
    
    // Add animation classes
    if (loginBrand) loginBrand.classList.add('fade-in');
    if (loginForm) {
      loginForm.classList.add('slide-up');
      loginForm.style.animationDelay = '0.3s';
    }
    
    // Parallax effect on image
    if (parallaxImage) {
      window.addEventListener('mousemove', function(e) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        gsap.to(parallaxImage, {
          x: moveX,
          y: moveY,
          duration: 1
        });
      });
    }
  }
  
  // Initialize animations
  initAnimations();
}); 