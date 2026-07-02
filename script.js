/* =========================================================
   Ahmed Khalil — Contact Hub — script.js
   =========================================================
   ✏️  EDIT THIS SECTION ONLY to update your links/number.
   Everything below CONFIG reads from these values automatically —
   you never need to touch the HTML to change a link.
   ========================================================= */
const CONFIG = {
  instagram: {
    url: "https://www.instagram.com/its.ahmed_khalil/",
  },
  whatsapp: {
    // Digits only, including country code, no + or spaces
    number: "97339331343",
    // Optional pre-filled message. Leave as "" for a blank chat.
    message: "",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/ahmed-khalil-abdulameer/",
  },
  email: {
    address: "its.ahmad09@gmail.com",
    // Optional pre-filled subject line. Leave as "" for none.
    subject: "",
  },
};
/* ========================================================= */

(function () {
  "use strict";

  const MEDIA = {
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
    coarse: window.matchMedia("(pointer: coarse)"),
  };

  function buildWhatsAppUrl({ number, message }) {
    const base = `https://wa.me/${number}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function buildMailtoUrl({ address, subject }) {
    return subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
  }

  function wireLinks() {
    const links = {
      instagram: CONFIG.instagram.url,
      whatsapp: buildWhatsAppUrl(CONFIG.whatsapp),
      linkedin: CONFIG.linkedin.url,
      email: buildMailtoUrl(CONFIG.email),
    };

    document.querySelectorAll("[data-social]").forEach((el) => {
      const key = el.getAttribute("data-social");
      if (links[key]) {
        el.setAttribute("href", links[key]);
        el.setAttribute("aria-label", `Contact via ${key}`);
      }
    });
  }

  function initTheme() {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const stored = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = stored || (prefersLight ? "light" : "dark");

    root.setAttribute("data-theme", initial);
    toggle.setAttribute("aria-pressed", String(initial === "light"));

    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      toggle.setAttribute("aria-pressed", String(next === "light"));
    });
  }

  function initLoader() {
    const loader = document.getElementById("loader");
    const hide = () => loader.classList.add("is-hidden");
    // Small delay so the loader is a deliberate beat, not a flash
    window.addEventListener("load", () => setTimeout(hide, 350));
    // Safety net in case 'load' fires late
    setTimeout(hide, 2500);
  }

  function initFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function initRevealAnimations() {
    const revealEls = document.querySelectorAll(".hero-inner, .hub-eyebrow, .card, .footer");

    if (!revealEls.length) return;

    revealEls.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
    });

    if (MEDIA.reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  function initPointerGlow() {
    if (MEDIA.reduceMotion.matches || MEDIA.coarse.matches) return;

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    function onMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      document.body.style.setProperty("--cursor-x", `${targetX}px`);
      document.body.style.setProperty("--cursor-y", `${targetY}px`);
      if (!glow.classList.contains("is-active")) glow.classList.add("is-active");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", () => glow.classList.remove("is-active"));

    // Smooth trailing motion with rAF keeps effect fluid and low-overhead.
    function render() {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function initParticles() {
    if (MEDIA.reduceMotion.matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particleCount = MEDIA.coarse.matches ? 24 : 42;
    const particles = [];
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      radius: MEDIA.coarse.matches ? 70 : 120,
    };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function makeParticle() {
      return {
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.16, 0.16),
        size: rand(1.1, 2.5),
        pulse: rand(0.7, 1.4),
      };
    }

    for (let i = 0; i < particleCount; i += 1) {
      particles.push(makeParticle());
    }

    window.addEventListener(
      "mousemove",
      (event) => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      },
      { passive: true }
    );

    window.addEventListener("resize", resize, { passive: true });
    resize();

    // Lightweight particles with pointer repulsion to create ambient interactivity.
    function render() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < pointer.radius) {
          const force = (pointer.radius - dist) / pointer.radius;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
        }

        p.vx *= 0.988;
        p.vy *= 0.988;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -30 || p.x > window.innerWidth + 30 || p.y < -30 || p.y > window.innerHeight + 30) {
          particles[i] = makeParticle();
          continue;
        }

        const alpha = 0.18 + Math.sin(Date.now() * 0.0012 * p.pulse + i) * 0.12;
        ctx.beginPath();
        ctx.fillStyle = `rgba(141, 200, 255, ${Math.max(0.06, alpha)})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function initCardInteractions() {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) return;

    const canUsePointerFx = !MEDIA.reduceMotion.matches && !MEDIA.coarse.matches;

    cards.forEach((card) => {
      if (canUsePointerFx) {
        card.addEventListener("mousemove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const px = (x / rect.width) * 100;
          const py = (y / rect.height) * 100;
          const tiltY = ((x - rect.width / 2) / rect.width) * 8;
          const tiltX = ((rect.height / 2 - y) / rect.height) * 7;

          card.style.setProperty("--mx", `${px}%`);
          card.style.setProperty("--my", `${py}%`);
          card.style.setProperty("--tilt-x", `${tiltX}deg`);
          card.style.setProperty("--tilt-y", `${tiltY}deg`);
          card.classList.add("is-hover");
        });

        card.addEventListener("mouseleave", () => {
          card.classList.remove("is-hover");
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
        });
      }

      card.addEventListener("click", (event) => {
        // Ripple gives a tactile response while keeping navigation behavior intact.
        const rect = card.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "card-ripple";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  function initParallax() {
    if (MEDIA.reduceMotion.matches || MEDIA.coarse.matches) return;

    const heroInner = document.querySelector(".hero-inner");
    const avatar = document.querySelector(".avatar");
    if (!heroInner || !avatar) return;

    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        mouseX = x;
        mouseY = y;
      },
      { passive: true }
    );

    function render() {
      smoothX += (mouseX - smoothX) * 0.08;
      smoothY += (mouseY - smoothY) * 0.08;

      heroInner.style.transform = `translate3d(${smoothX * 8}px, ${smoothY * 6}px, 0) rotateY(${smoothX * 3}deg) rotateX(${smoothY * -2.2}deg)`;
      avatar.style.transform = `translate3d(${smoothX * -10}px, ${smoothY * -8}px, 0)`;

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function initScrollDepth() {
    if (MEDIA.reduceMotion.matches) return;

    const hero = document.querySelector(".hero");
    if (!hero) return;

    let ticking = false;

    function update() {
      const y = window.scrollY;
      const depth = Math.min(y * 0.06, 28);
      hero.style.transform = `translate3d(0, ${depth * -0.35}px, 0)`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    wireLinks();
    initTheme();
    initLoader();
    initFooterYear();
    initRevealAnimations();
    initPointerGlow();
    initParticles();
    initCardInteractions();
    initParallax();
    initScrollDepth();
  });
})();
