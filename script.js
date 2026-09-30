const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let ring = { x: pointer.x, y: pointer.y };

window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY };
  if (cursorDot) {
    cursorDot.style.left = `${pointer.x}px`;
    cursorDot.style.top = `${pointer.y}px`;
  }
});

function animateCursor() {
  ring.x += (pointer.x - ring.x) * 0.14;
  ring.y += (pointer.y - ring.y) * 0.14;
  if (cursorRing) {
    cursorRing.style.left = `${ring.x}px`;
    cursorRing.style.top = `${ring.y}px`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll("a, button, input, textarea").forEach((element) => {
  element.addEventListener("mouseenter", () => cursorRing?.classList.add("active"));
  element.addEventListener("mouseleave", () => cursorRing?.classList.remove("active"));
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

// Header state
const siteHeader = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

// Reveal-on-scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Animated stats
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count);
      if (!Number.isFinite(target)) return;

      let start = 0;
      const duration = 1100;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      statObserver.unobserve(number);
    });
  },
  { threshold: 0.65 }
);

document.querySelectorAll("[data-count]").forEach((number) => statObserver.observe(number));

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  });
});

// Subtle 3D movement for hero profile card
const tiltCard = document.querySelector(".tilt-card");

if (tiltCard && window.matchMedia("(pointer:fine)").matches) {
  const visual = document.querySelector(".hero-visual");

  visual?.addEventListener("pointermove", (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform =
      `rotateY(${x * 12 - 5}deg) rotateX(${y * -10 + 4}deg)`;
  });

  visual?.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "rotateY(-9deg) rotateX(7deg)";
  });
}

// Contact form: creates an email draft using the user's mail client.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:nandiajit02@gmail.com?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = "Opening your email client...";
  }
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Starfield
const canvas = document.getElementById("starfield");
const ctx = canvas?.getContext("2d");

let particles = [];
let width = 0;
let height = 0;
let pointerGlow = { x: 0, y: 0 };

function resizeCanvas() {
  if (!canvas || !ctx) return;

  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(120, Math.floor((width * height) / 13000));

  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.7 + 0.35,
    speed: Math.random() * 0.32 + 0.08,
    alpha: Math.random() * 0.4 + 0.12
  }));
}

function animateStars() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createRadialGradient(
    pointerGlow.x,
    pointerGlow.y,
    0,
    pointerGlow.x,
    pointerGlow.y,
    300
  );

  gradient.addColorStop(0, "rgba(245,199,107,.10)");
  gradient.addColorStop(1, "rgba(245,199,107,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  particles.forEach((particle) => {
    particle.y += particle.speed;

    if (particle.y > height + 10) {
      particle.y = -10;
      particle.x = Math.random() * width;
    }

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,244,218,${particle.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener("pointermove", (event) => {
  pointerGlow = { x: event.clientX, y: event.clientY };
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateStars();
