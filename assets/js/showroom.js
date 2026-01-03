// TaurusTech Demo Showroom - Form Handling & Interactions

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demo-form');
  const successMessage = document.getElementById('form-success');

  // Replace with your Formspree form ID from https://formspree.io
  const FORMSPREE_ID = 'mlgdlveq';

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
        
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Store data for thanks page display
          sessionStorage.setItem('demoRequest', JSON.stringify({
            business: formData.get('business'),
            type: formData.get('type'),
            location: formData.get('location'),
            email: formData.get('email'),
            timestamp: new Date().toLocaleString()
          }));
          
          // Redirect to thanks page
          window.location.href = '/thanks.html';
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        btnText.textContent = 'Something went wrong';
        submitBtn.style.borderColor = 'var(--error)';
        
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
