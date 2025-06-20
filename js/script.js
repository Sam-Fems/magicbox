const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Optional: Close menu when any link is clicked
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });


let currentSlide = 0;
const slides = document.querySelectorAll('.slide-image');
const slideshowContainer = document.getElementById('slideshow');
let startX = 0;
let isDragging = false;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000);
}

function restartAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Swipe Events
slideshowContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

slideshowContainer.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;

  if (Math.abs(diff) > 50) {
    isDragging = false;
    if (diff < 0) {
      nextSlide();
    } else {
      prevSlide();
    }
    restartAutoSlide();
  }
}, { passive: true });

slideshowContainer.addEventListener('touchend', () => {
  isDragging = false;
});

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
  startAutoSlide();

  document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
  });

  document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
  });
});
