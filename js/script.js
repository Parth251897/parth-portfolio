// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Navbar scroll state
const navbar = document.getElementById("navbar");
const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Scroll-reveal animations
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Contact form submission (Netlify Forms via fetch, no page reload)
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        formStatus.textContent = "Thanks! Your message has been sent.";
        contactForm.reset();
      })
      .catch(() => {
        formStatus.textContent = "Something went wrong. Please email me directly.";
      });
  });
}
