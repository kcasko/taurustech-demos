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
        // Get form data
        const formData = new FormData(form);
        const business = formData.get('business');
        const type = formData.get('type');
        const location = formData.get('location');
        const email = formData.get('email');
        const message = formData.get('message') || 'No additional details provided';
        
        // Create issue on GitHub (public API, no auth needed)
        const issueBody = `**New Demo Request**

**Business Name:** ${business}
**Business Type:** ${type}
**Location:** ${location}
**Email:** ${email}

**Message:**
${message}

---
*Submitted: ${new Date().toLocaleString()}*`;
        
        const response = await fetch('https://api.github.com/repos/kcasko/taurustech-demos/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            title: `Demo Request: ${business}`,
            body: issueBody,
            labels: ['demo-request']
          })
        });
        
        if (response.ok || response.status === 201) {
          // Hide form and show success message
          form.style.display = 'none';
          successMessage.classList.add('show');
          
          // Reset form for future use
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
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
