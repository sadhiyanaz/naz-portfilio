// Initialize Lucide Icons on document load
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  startLoader();
  initTheme();
  initMobileMenu();
  initTypewriter();
  initScrollObservers();
  initBackToTop();
  initContactForm();
});

// 1. Loading Screen Animation
function startLoader() {
  const loader = document.getElementById('loader');
  const progressBar = document.getElementById('loader-progress');
  const percentageText = document.getElementById('loader-percentage');
  
  let progress = 0;
  
  const interval = setInterval(() => {
    const increment = Math.floor(Math.random() * 12) + 4;
    progress = Math.min(progress + increment, 100);
    
    progressBar.style.width = `${progress}%`;
    percentageText.textContent = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.classList.add('hidden');
        }, 500);
      }, 300);
    }
  }, 100);
}

// 2. Dark/Light Mode Theme Hook
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  
  // Read local storage or fallback to system preference
  const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
                 
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function toggle() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggle);
}

// 3. Mobile Navigation Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  function toggleMenu() {
    mobileMenu.classList.toggle('hidden');
    
    // Toggle icon from Menu to X
    const icon = toggleBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
      icon.setAttribute('data-lucide', 'menu');
    } else {
      icon.setAttribute('data-lucide', 'x');
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = toggleBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });
}

// 4. Typewriter Loop Effect
function initTypewriter() {
  const typewriter = document.getElementById('typewriter');
  if (!typewriter) return;

  const words = [
    'Data Science Enthusiast',
    'Data Analyst',
    'Machine Learning Enthusiast',
    'AI Engineering Student'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriter.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let speed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }
    
    setTimeout(type, speed);
  }
  
  type();
}

// 5. Scroll Progress, Section Highlights and Intersection Observers
function initScrollObservers() {
  const scrollBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const fadeSections = document.querySelectorAll('.section-fade');

  // IntersectionObserver for scroll fade-in animation
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });

  fadeSections.forEach(section => {
    revealObserver.observe(section);
  });

  // Scroll listener
  window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const percentage = (window.scrollY / totalHeight) * 100;
      if (scrollBar) scrollBar.style.width = `${percentage}%`;
    }

    // 2. Navbar glassmorphic background scroll toggle
    if (window.scrollY > 20) {
      navbar.className = "fixed top-0 left-0 w-full z-40 transition-all duration-300 py-3 glass-nav-light dark:glass-nav-dark shadow-sm";
    } else {
      navbar.className = "fixed top-0 left-0 w-full z-40 transition-all duration-300 py-5 bg-transparent border-b border-transparent";
    }

    // 3. Highlight Active Section in Navbar
    let activeSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        activeSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('data-section') === activeSectionId) {
        link.classList.add('active-link');
      }
    });
  });
}

// 6. Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 7. Custom Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg transition-all duration-300 transform translate-y-2 opacity-0 select-none ${
    type === 'success' 
      ? 'bg-neutral-900 border-neutral-800 text-white dark:bg-white dark:border-neutral-200 dark:text-neutral-900' 
      : 'bg-amber-600 border-amber-700 text-white'
  }`;
  
  // Custom icons inside toast
  const icon = type === 'success' ? '✓' : '⚠';
  toast.innerHTML = `<span class="text-apple-blue font-bold">${icon}</span> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  // Animate Entrance
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  // Fade-out and Remove
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-4px]');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// 8. Contact Form Integration (EmailJS)
function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');
  const btnText = document.getElementById('submit-btn-text');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('user_name').value.trim();
    const email = document.getElementById('user_email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      showToast("Please fill in all form fields.", "warning");
      return;
    }

    // Disable button & show spinner state
    btn.disabled = true;
    btnText.textContent = "Sending...";
    const originalIcon = btn.querySelector('i');
    if (originalIcon) originalIcon.classList.add('hidden');

    // Simulate parameters check for EmailJS configs
    const serviceId = ""; // Fill this in production
    const templateId = ""; // Fill this in production
    const publicKey = ""; // Fill this in production

    if (serviceId && templateId && publicKey) {
      if (window.emailjs) {
        window.emailjs.send(serviceId, templateId, {
          user_name: name,
          user_email: email,
          message: message
        }, publicKey)
        .then(() => {
          showToast("Message sent successfully!");
          form.reset();
          resetButton();
        })
        .catch(() => {
          showToast("Failed to send. Direct email sadiyanaz768@gmail.com", "warning");
          resetButton();
        });
      }
    } else {
      // Out-of-the-box local simulation mode
      setTimeout(() => {
        showToast("Simulation: Message sent successfully!");
        form.reset();
        resetButton();
      }, 1200);
    }
  });

  function resetButton() {
    btn.disabled = false;
    btnText.textContent = "Send Message";
    const icon = btn.querySelector('i');
    if (icon) icon.classList.remove('hidden');
  }
}
