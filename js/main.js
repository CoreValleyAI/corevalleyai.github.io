// CoreValley AI - Main JS

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Contact form: always POST (FormSubmit rejects GET)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('formStatus');
    const btn = contactForm.querySelector('button[type="submit"]');
    const inbox = 'info@corevalley.ai';
    const originalText = btn ? btn.textContent : 'Send Message';

    if (statusEl && new URLSearchParams(window.location.search).get('sent') === '1') {
      statusEl.textContent = 'Message sent. We will get back to you shortly.';
      statusEl.className = 'form-status success';
    }

    contactForm.setAttribute('method', 'POST');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!contactForm.reportValidity()) return;

      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }

      const body = new FormData(contactForm);
      body.set('_method', 'POST');

      try {
        const res = await fetch('https://formsubmit.co/ajax/' + inbox, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === 'false' || data.success === false) {
          throw new Error(data.message || 'Send failed');
        }
        contactForm.reset();
        if (statusEl) {
          statusEl.textContent = 'Message sent. We will get back to you shortly.';
          statusEl.className = 'form-status success';
        }
        if (btn) btn.textContent = 'Message sent';
      } catch (err) {
        // Fallback: native POST (never GET)
        contactForm.method = 'POST';
        contactForm.submit();
        return;
      } finally {
        if (btn) {
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2000);
        }
      }
    });
  }

  // Smooth reveal on scroll (simple)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .gpu-card, .step, .problem-item, .solution-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});
