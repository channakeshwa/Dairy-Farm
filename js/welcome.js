const btn = document.getElementById("enterFarm");

btn.addEventListener("click", () => {
  document.body.style.opacity = "0";

  document.body.style.transition = ".8s";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 700);
});
// Existing JavaScript...

// Existing Functions...

// Existing Animations...

// ===============================
// Premium Farm Gallery Slider
// ===============================

const slides = document.querySelectorAll(".gallery-slide");

// ...rest of the gallery code
