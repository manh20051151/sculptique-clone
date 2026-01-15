/**
 * Sculptique Clone - Main JavaScript
 */

// Gallery Image Change
function changeImage(thumb, imageSrc) {
  // Update main image
  document.getElementById('main-image').src = imageSrc;
  
  // Update active thumbnail
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

// Bundle Selection
function selectBundle(element) {
  // Remove selected class from all bundles
  document.querySelectorAll('.bundle-option').forEach(opt => opt.classList.remove('selected'));
  
  // Add selected class to clicked bundle
  element.classList.add('selected');
  
  // Check the radio button
  element.querySelector('input[type="radio"]').checked = true;
}

// FAQ Toggle
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const isOpen = faqItem.classList.contains('open');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
  
  // Toggle current item
  if (!isOpen) {
    faqItem.classList.add('open');
  }
}

// Accordion Toggle (for product info accordions)
function toggleAccordion(element) {
  const accordionItem = element.parentElement;
  const isOpen = accordionItem.classList.contains('open');
  
  // Toggle current item
  accordionItem.classList.toggle('open');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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

// Add to Cart Button Animation
document.querySelector('.add-to-cart-btn')?.addEventListener('click', function() {
  this.textContent = 'ADDING...';
  this.style.opacity = '0.7';
  
  setTimeout(() => {
    this.textContent = 'ADDED TO CART ✓';
    this.style.backgroundColor = '#00B67A';
    
    setTimeout(() => {
      this.textContent = 'ADD TO CART';
      this.style.backgroundColor = '';
      this.style.opacity = '';
    }, 2000);
  }, 800);
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  fadeInObserver.observe(section);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Counter animation for mission section
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

// Observe mission counter
const counterElement = document.querySelector('.mission-counter');
if (counterElement) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(counterElement, 93247);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterObserver.observe(counterElement);
}

// Star rating color
document.querySelectorAll('.stars, .review-stars').forEach(star => {
  star.style.color = '#FFB800';
});

console.log('Sculptique Clone loaded successfully!');
