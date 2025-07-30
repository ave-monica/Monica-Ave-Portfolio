// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initializeWebsite();
});

function initializeWebsite() {
  // Header scroll effect
  initializeHeaderScroll();
  
  // Mobile menu functionality
  initializeMobileMenu();
  
  // Smooth scrolling for anchor links
  initializeSmoothScroll();
  
  // Initialize scroll to top button
  initializeScrollToTopButton();
  
  // Initialize project modals
  initializeProjectModals();
  
  // Initialize contact form
  initializeContactForm();
  
  // Initialize interactive shapes
  initializeInteractiveShapes();
}

// Header scroll effect
function initializeHeaderScroll() {
  const header = document.getElementById('header');
  const scrollThreshold = 50;
  
  // Check on page load
  if (window.scrollY > scrollThreshold) {
    header.classList.add('scrolled');
  }
  
  // Track active section on scroll
  window.addEventListener('scroll', () => {
    // Header background change
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveSection();
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');
  
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    
    // Update icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileNav.classList.contains('open')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });
  
  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });
}

// Smooth scrolling for anchor links
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Account for fixed header
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Track active section on scroll
function updateActiveSection() {
  const sections = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
  const mobileNavLinks = document.querySelectorAll('.nav-mobile .nav-link');
  
  // Get the section that's most in view
  let currentSection = 'hero';
  let maxVisibility = 0;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      const headerHeight = document.getElementById('header').offsetHeight;
      
      // Calculate how much of the section is visible in the viewport
      const viewportHeight = window.innerHeight;
      const visibleSectionHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, headerHeight);
      const visibleRatio = Math.max(0, visibleSectionHeight) / viewportHeight;
      
      if (visibleRatio > maxVisibility) {
        maxVisibility = visibleRatio;
        currentSection = sectionId;
      }
    }
  });
  
  // Update active nav link in desktop menu
  navLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    if (href === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Update active nav link in mobile menu
  mobileNavLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    if (href === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Scroll to top button
function initializeScrollToTopButton() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const showThreshold = 300;
  
  // Check on page load
  if (window.scrollY > showThreshold) {
    scrollToTopBtn.classList.add('show');
  }
  
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > showThreshold) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Project modals
function initializeProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const modalContainer = document.getElementById('modal-container');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  
  // Open modal when clicking on a project card
  projectCards.forEach(card => {
    const viewDetailsBtn = card.querySelector('.view-details');
    const projectId = card.getAttribute('data-project-id');
    const modal = document.getElementById(`modal-${projectId}`);
    
    if (viewDetailsBtn && modal) {
      viewDetailsBtn.addEventListener('click', () => {
        // Close any open modals
        document.querySelectorAll('.modal.open').forEach(m => {
          m.classList.remove('open');
        });
        
        // Open this modal
        modalContainer.classList.add('open');
        modal.classList.add('open');
        
        // Disable body scroll
        document.body.style.overflow = 'hidden';
      });
    }
  });
  
  // Close modal when clicking on overlay
  modalOverlay.addEventListener('click', closeAllModals);
  
  // Close modal when clicking close button
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  function closeAllModals() {
    modalContainer.classList.remove('open');
    document.querySelectorAll('.modal.open').forEach(modal => {
      modal.classList.remove('open');
    });
    
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  }
}

// Contact form
function initializeContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = contactForm.elements['name'].value;
      const email = contactForm.elements['email'].value;
      const subject = contactForm.elements['subject'].value;
      const message = contactForm.elements['message'].value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Normally you would send this data to a server
      // For demo purposes, just show an alert
      alert(`Thank you for your message, ${name}! This is a demo form, so no message was actually sent.`);
      
      // Reset form
      contactForm.reset();
    });
  }
}

// Interactive shapes
function initializeInteractiveShapes() {
  const hero = document.getElementById('hero');
  
  if (hero) {
    const shapes = hero.querySelectorAll('.geometric-shape');
    
    // Mouse move effect
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const moveX = (mouseX - windowWidth / 2) / 40;
      const moveY = (mouseY - windowHeight / 2) / 40;
      
      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.4;
        shape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });
  }
  
  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-icon, .project-card, .service-card, .stat-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      
      // Element is in viewport
      if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('.skill-icon, .project-card, .service-card, .stat-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
}