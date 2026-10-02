// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", links.classList.contains("open"));
  });
}

// Scroll-reveal animation
const revealEls = Array.from(document.querySelectorAll(".reveal"));
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  // Fallback: a fast programmatic scroll can jump past an element between
  // observer checks — sweep anything at or above the viewport into view.
  let sweeping = false;
  const sweep = () => {
    sweeping = false;
    revealEls.forEach((el) => {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("in");
        io.unobserve(el);
      }
    });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!sweeping) {
        sweeping = true;
        requestAnimationFrame(sweep);
      }
    },
    { passive: true }
  );
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Current year in footer
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
