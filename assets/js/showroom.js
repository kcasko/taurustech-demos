// TaurusTech Demo Showroom - Form Handling & Interactions

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demo-form');
  const successMessage = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      // Disable button and show loading state
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Form will auto-redirect via FormSubmit _next parameter
          // But we'll show a brief success state first
          form.style.display = 'none';
          successMessage.classList.add('show');
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Show error state
        btnText.textContent = 'Something went wrong';
        submitBtn.style.borderColor = 'var(--error)';
        
        // Reset after 3 seconds
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
        }, 3000);
      }
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
