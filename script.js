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

  document.addEventListener("DOMContentLoaded", () => {
    wireLinks();
    initTheme();
    initLoader();
    initFooterYear();
  });
})();
