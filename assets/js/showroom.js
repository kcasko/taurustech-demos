// TaurusTech Demo Showroom - Form Handling & Interactions

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demo-form');
  const successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const business = formData.get('business');
      const type = formData.get('type');
      const location = formData.get('location');
      const email = formData.get('email');
      const message = formData.get('message') || 'No additional details provided';
      
      // Store data in sessionStorage for the thanks page
      sessionStorage.setItem('demoRequest', JSON.stringify({
        business,
        type,
        location,
        email,
        message,
        timestamp: new Date().toLocaleString()
      }));
      
      // Redirect to thanks page
      window.location.href = '/thanks.html';
    });
  }

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('.notes, .contact').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
  });
});
