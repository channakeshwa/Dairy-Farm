/*=========================================
      WHY SECTION PREMIUM SLIDER
=========================================*/

const slides = document.querySelectorAll(".slide");
const contents = document.querySelectorAll(".content-box");
const dots = document.querySelectorAll(".dot");

let current = 0;

function changeSlide() {
  // Remove active classes
  slides[current].classList.remove("active");
  contents[current].classList.remove("active");
  dots[current].classList.remove("active");

  // Next slide
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  // Add active classes
  slides[current].classList.add("active");
  contents[current].classList.add("active");
  dots[current].classList.add("active");
}

setInterval(changeSlide, 4000);
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    slides[current].classList.remove("active");
    contents[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = Number(dot.dataset.index);

    slides[current].classList.add("active");
    contents[current].classList.add("active");
    dots[current].classList.add("active");
  });
});
/*==========================================================
            PREMIUM FARM GALLERY SLIDER
==========================================================*/

const galleryslides = document.querySelectorAll(".gallery-slide");
const gallerydots = document.querySelectorAll(".gallery-dots .dot");

const prevBtn = document.querySelector(".gallery-btn.prev");
const nextBtn = document.querySelector(".gallery-btn.next");

let currentSlide = 0;

/* Show Slide */

function showSlide(index) {
  galleryslides.forEach((slide) => slide.classList.remove("active"));

  gallerydots.forEach((dot) => dot.classList.remove("active"));

  galleryslides[index].classList.add("active");

  gallerydots[index].classList.add("active");
}

/* Next */

function nextSlide() {
  currentSlide++;

  if (currentSlide >= galleryslides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

/* Previous */

function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = galleryslides.length - 1;
  }

  showSlide(currentSlide);
}

/* Buttons */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

/* Dots */

gallerydots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;

    showSlide(currentSlide);
  });
});

/* Auto Slide */

setInterval(nextSlide, 4000);

/* Initial */

showSlide(currentSlide);
function openCartPage() {
  window.location.href = "cart.html";
}
