document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navbar");

  button.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
});
