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
  document.querySelectorAll('.bundle-option-container').forEach(opt => opt.classList.remove('selected'));
  document.querySelectorAll('.bundle-option').forEach(opt => opt.classList.remove('selected'));
  document.querySelectorAll('.product-selector_perk_line').forEach(opt => opt.classList.remove('selected'));

  if (element.classList.contains('bundle-option-container')) {
    element.classList.add('selected');
    const perkLines = element.querySelectorAll('.product-selector_perk_line');
    perkLines.forEach(perkLine => {
      perkLine.classList.add('selected');
    });
  } else {
    element.classList.add('selected');
  }

  const radio = element.querySelector('input[type="radio"]');
  if (radio) {
    radio.checked = true;
  }
}

// FAQ Toggle
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const isOpen = faqItem.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));

  if (!isOpen) {
    faqItem.classList.add('open');
  }
}

// Accordion Toggle (for product info accordions)
function toggleAccordion(element) {
  let target = element.classList.contains('product_tab-block') ? element : element.closest('.product_tab-block');

  if (target) {
    target.classList.toggle('open');

    const content = target.querySelector('.product_tab-content');
    if (content) {
      if (target.classList.contains('open')) {

        content.style.paddingTop = "16px";
        content.style.paddingBottom = "8px";

        content.style.maxHeight = (content.scrollHeight + 50) + "px";
        content.style.opacity = "1";
      } else {
        // Collapse
        content.style.maxHeight = "0";
        content.style.paddingTop = "0";
        content.style.paddingBottom = "0";
        content.style.opacity = "0";
      }
    }
  }
}

// Smooth scroll for anchor links
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

// Add to Cart Button Animation
document.querySelector('.add-to-cart-btn')?.addEventListener('click', function () {
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

function toggle() {
  var blur = document.getElementById('blur');
  blur.classList.toggle('active');
  var popup = document.getElementById('popup');
  popup.classList.toggle('active');
}

function switchVideo(videoSrc) {
  document.querySelector('.popup video source').src = videoSrc;
  document.querySelector('.popup video').load();
  toggle();
}

// Frontrow Sticker Logic
function toggleFrontrow() {
  const sticker = document.getElementById('frontrow-sticker');
  sticker.classList.toggle('minimized');
}

function scrollToTestimonials(e) {
  e.preventDefault();
  document.querySelector('.testimonials-section').scrollIntoView({ behavior: 'smooth' });
}

function openFrontrowModal() {
  console.log('Open Frontrow Modal');
}

$(document).ready(function () {
  // Main Mobile Product Gallery
  function initMobileGallery() {
    if ($(window).width() <= 768) {
      if (!$('.main_product-image-carousel').hasClass('slick-initialized')) {
        $('.main_product-image-carousel').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.main_product-image-carousel_thumbs'
        });

        $('.main_product-image-carousel_thumbs').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.main_product-image-carousel',
          dots: false,
          centerMode: false,
          focusOnSelect: true,
          arrows: false
        });
      }
    }
  }

  // Debounce function to limit resize firing
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  initMobileGallery();

  $(window).resize(debounce(function () {
    initMobileGallery();
  }, 250));

  $('.main_product-carousel-prev').click(function () {
    $('.main_product-image-carousel').slick('slickPrev');
  });
  $('.main_product-carousel-next').click(function () {
    $('.main_product-image-carousel').slick('slickNext');
  });

  // Initialize Slick Slider
  $('.product_ugc-container').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Custom Navigation
  $('.product_carousel-prev').click(function () {
    $('.product_ugc-container').slick('slickPrev');
  });
  $('.product_carousel-next').click(function () {
    $('.product_ugc-container').slick('slickNext');
  });

  // Video Play/Pause
  $('.product_ugc-video').click(function () {
    var video = $(this).find('video')[0];
    var playBtn = $(this).find('.product_ugc-play');

    if (video.paused) {
      // Pause all other videos
      $('.product_ugc-video video').each(function () {
        this.pause();
        $(this).siblings('.product_ugc-play').show();
      });
      video.play();
      playBtn.hide();
    } else {
      video.pause();
      playBtn.show();
    }
  });

  $('.product_faq-box').click(function () {
    var $this = $(this);
    var $content = $this.find('.product_faq-content');
    var $svg = $this.find('.product_faq-thumb svg');

    // Toggle current box
    $content.slideToggle(300);
    $this.toggleClass('open');

    // Rotate arrow
    if ($this.hasClass('open')) {
      $svg.css('transform', 'rotate(180deg)');
    } else {
      $svg.css('transform', 'rotate(0deg)');
    }
  });

  $('.product_faq-content').hide();

  $('.close-button').click(function () {
    $('#frontrow-sticker').hide();
  });
  $('.main_product-nutrition-info').click(function () {
    $('.nutrition_popup-outer').css('display', 'flex');
  });

  $('.nutrition_popup-close').click(function () {
    $('.nutrition_popup-outer').hide();
  });

  $('.nutrition_popup-outer').click(function (e) {
    if (e.target === this) {
      $(this).hide();
    }
  });

  // Star Rating Logic
  $('.jdgm-star').hover(
    function () {
      var value = $(this).data('value');
      $(this).parent().find('.jdgm-star').each(function () {
        if ($(this).data('value') <= value) {
          $(this).addClass('hover');
        } else {
          $(this).removeClass('hover');
        }
      });
    },
    function () {
      $('.jdgm-star').removeClass('hover');
    }
  );

  $('.jdgm-star').click(function () {
    var value = $(this).data('value');
    $('#review_rating_value').val(value);

    $('.jdgm-star').removeClass('active');

    $(this).parent().find('.jdgm-star').each(function () {
      if ($(this).data('value') <= value) {
        $(this).addClass('active');
      }
    });
  });

  // Review Form Toggle Logic
  $('.jdgm-write-rev-link').click(function (e) {
    e.preventDefault();
    var $form = $('.jdgm-row-write-review');
    var $btn = $(this);

    if ($form.is(':visible')) {
      $form.slideUp();
      $btn.text('Write a review');
    } else {
      $form.slideDown();
      $btn.text('Cancel review');
    }
  });

  // Cancel button inside form
  $('.jdgm-cancel-rev').click(function (e) {
    e.preventDefault();
    $('.jdgm-row-write-review').slideUp();
    $('.jdgm-write-rev-link').text('Write a review');
  });

  $('.jdgm-submit-rev').click(function (e) {
    e.preventDefault();
    $('.jdgm-row-write-review').slideUp();
    $('.jdgm-write-rev-link').text('Write a review');
    alert('Review submitted!');
  });
});
