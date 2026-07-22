const bar = document.querySelector(".progress-bar");

let width = 0;

const loading = setInterval(() => {
  width++;

  bar.style.width = width + "%";

  if (width >= 100) {
    clearInterval(loading);

    document.body.style.transition = "opacity .8s ease";

    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 800);
  }
}, 35);
