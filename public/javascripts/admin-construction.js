// Admin Construction Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Animate entrance of elements
  const title = document.querySelector('.construction-title');
  const message = document.querySelector('.construction-message');
  const divider = document.querySelector('.construction-divider');
  const quote = document.querySelector('.construction-quote');
  const returnBtn = document.querySelector('.return-btn');
  const icon = document.querySelector('.construction-icon');
  
  // Animate elements with staggered timing
  gsap.from(icon, {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
  
  gsap.from(title, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out"
  });
  
  gsap.from(message, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out"
  });
  
  gsap.from(divider, {
    scaleX: 0,
    opacity: 0,
    duration: 0.8,
    delay: 0.6,
    ease: "power3.out"
  });
  
  gsap.from(quote, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.8,
    ease: "power3.out"
  });
  
  gsap.from(returnBtn, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: "power3.out"
  });
  
  // Animate decoration elements
  const decorElements = document.querySelectorAll('.decoration-element');
  
  decorElements.forEach((element, index) => {
    gsap.fromTo(element, 
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 0.1, 
        scale: 1, 
        duration: 1.5, 
        delay: 0.2 + (index * 0.2),
        ease: "power3.out"
      }
    );
  });
  
  // Add hover effect to return button
  returnBtn.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.05,
      duration: 0.3
    });
  });
  
  returnBtn.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      duration: 0.3
    });
  });
  
  // Subtle continuous animation for the icon
  gsap.to(icon, {
    y: -5,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}); 