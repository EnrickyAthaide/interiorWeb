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