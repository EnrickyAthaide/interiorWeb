 // Animate Award Section
 gsap.from("#award h1", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
 gsap.from("#award p", { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });

 // Animate Featured Projects
 gsap.from("#projects h2", { duration: 1, opacity: 0, delay: 1, ease: "power2.out" });
 gsap.from(".project", {
   duration: 1,
   opacity: 0,
   y: 30,
   stagger: 0.2,
   delay: 1.5,
   ease: "power2.out"
 });

 // Animate About Us Section
 gsap.from("#about img", { duration: 1, x: -50, opacity: 0, delay: 2.5, ease: "power2.out" });
 gsap.from("#about .about-text", { duration: 1, x: 50, opacity: 0, delay: 2.5, ease: "power2.out" });
 // About Section Animation
gsap.to('.about-content > *', {
  opacity: 1,
  y: 0,
  stagger: 0.3,
  duration: 1,
  scrollTrigger: {
      trigger: '.about-section',
      start: 'top center'
  }
});
// // seamless.js
// document.addEventListener('DOMContentLoaded', function() {
//   const slider = document.querySelector('.slider');
//   const afterOverlay = document.querySelector('.after-overlay');
//   const wrapper = document.querySelector('.before-after-wrapper');

//   let isDragging = false;

//   // Start dragging when mousedown or touchstart on slider
//   const startDrag = (e) => {
//     isDragging = true;
//     e.preventDefault();
//   };

//   // Stop dragging
//   const stopDrag = () => {
//     isDragging = false;
//   };

//   // Handle drag movement
//   const onDrag = (e) => {
//     if (!isDragging) return;
//     let clientX = e.clientX;
//     if (e.touches) {
//       clientX = e.touches[0].clientX;
//     }
//     const rect = wrapper.getBoundingClientRect();
//     let offsetX = clientX - rect.left;
//     // Constrain the slider within the container
//     offsetX = Math.max(0, Math.min(offsetX, rect.width));
//     // Update the after-overlay width and slider position
//     afterOverlay.style.width = offsetX + 'px';
//     slider.style.left = offsetX + 'px';
//   };

//   slider.addEventListener('mousedown', startDrag);
//   window.addEventListener('mousemove', onDrag);
//   window.addEventListener('mouseup', stopDrag);
  
//   // Touch events for mobile devices
//   slider.addEventListener('touchstart', startDrag);
//   window.addEventListener('touchmove', onDrag);
//   window.addEventListener('touchend', stopDrag);
// });

// Animated Number Counting
document.querySelectorAll('.stat-number').forEach(number => {
  const target = parseInt(number.getAttribute('data-count'));
  const duration = 2;
  
  gsap.to(number, {
      innerText: target,
      duration: duration,
      snap: { innerText: 1 },
      scrollTrigger: {
          trigger: number,
          start: 'top 80%',
          toggleActions: 'play none none none'
      }
  });
});

 // Animate Process Section
 gsap.from("#process h2", { duration: 1, opacity: 0, delay: 3.5, ease: "power2.out" });
 gsap.from(".step", {
   duration: 1,
   opacity: 0,
   y: 30,
   stagger: 0.3,
   delay: 4,
   ease: "power2.out"
 });
 // Process Section Animation
gsap.to('.process-step', {
  opacity: 1,
  y: 0,
  stagger: 0.2,
  duration: 1,
  scrollTrigger: {
      trigger: '.our-process',
      start: 'top center'
  }
});

// Icon Hover Animation
document.querySelectorAll('.process-step').forEach(step => {
  step.addEventListener('mouseenter', () => {
      gsap.to(step.querySelector('.process-icon i'), {
          transform: 'rotate(15deg) scale(1.1)',
          duration: 0.3
      });
      gsap.to(step.querySelector('.process-icon'), {
          color: '#8b7355',
          duration: 0.3
      });
  });

  step.addEventListener('mouseleave', () => {
      gsap.to(step.querySelector('.process-icon i'), {
          transform: 'rotate(0deg) scale(1)',
          duration: 0.3
      });
      gsap.to(step.querySelector('.process-icon'), {
          color: '#1a1a1a',
          duration: 0.3
      });
  });
});

 // Animate Testimonials Section
 gsap.from("#testimonials h2", { duration: 1, opacity: 0, delay: 5, ease: "power2.out" });
 gsap.from(".testimonial", {
   duration: 1,
   opacity: 0,
   y: 20,
   stagger: 0.5,
   delay: 5.5,
   ease: "power2.out"
 });

 // Simple Auto-Rotate for Testimonials
 let testimonialIndex = 0;
 const testimonials = document.querySelectorAll(".testimonial");
 setInterval(() => {
   testimonials[testimonialIndex].classList.remove("active");
   testimonialIndex = (testimonialIndex + 1) % testimonials.length;
   testimonials[testimonialIndex].classList.add("active");
 }, 5000);

 // Animate Call To Action Section
 gsap.from("#cta h2", { duration: 1, opacity: 0, y: -20, delay: 6.5, ease: "power2.out" });
 gsap.from("#cta p", { duration: 1, opacity: 0, y: 20, delay: 6.8, ease: "power2.out" });
 gsap.from("#cta a", { duration: 1, opacity: 0, scale: 0.8, delay: 7, ease: "back.out(1.7)" });