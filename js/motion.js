/**
 * Scroll reveal + obnova cílů po dynamickém obsahu (nabídka, úvodka).
 */

const REVEAL_SELECTOR = [
  /* hero + page headers */
  ".hero__eyebrow",
  ".hero__title",
  ".hero__meta",
  ".hero__text",
  ".hero__actions",
  ".hero__visual",
  ".page-header h1",
  ".page-header p",

  /* section headers */
  ".section__title",
  ".section__lead",

  /* cards: animate text only */
  ".property-card",
  ".feature-card h3",
  ".feature-card p",

  ".feature-card",
  ".service-card h2",
  ".service-card h3",
  ".service-card p",

  ".service-card",
  ".testimonial p",
  ".testimonial footer",

  ".testimonial",
  ".cta-band h2",
  ".cta-band p",

  /* contact */
  ".contact-info h2",
  ".contact-info dl",
  "form.form label",
  "form.form input",
  "form.form textarea",
  "form.form button",

  /* property cards (rendered dynamically) */
  ".property-card h3",
  ".property-card p",
  ".property-card .property-card__meta",
  ".property-card__image",
  ".property-card__body",
  '[data-properties-list]:not(:empty)',
  '[data-property-detail]:not([hidden])',
].join(", ");

let observer;

function ensureObserver() {
  if (observer) return observer;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-revealed");
        observer.unobserve(el);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    }
  );

  return observer;
}

function setRevealVariant(el) {
  const existing = el.getAttribute("data-reveal");
  if (existing && existing !== "") {
    return;
  }

  if (
    el.classList.contains("property-card") ||
    el.classList.contains("service-card") ||
    el.classList.contains("feature-card") ||
    el.classList.contains("testimonial") ||
    el.classList.contains("hero__visual")
  ) {
    el.setAttribute("data-reveal", "card");
    return;
  }

  const tag = (el.tagName || "").toUpperCase();
  if (el.classList.contains("hero__actions")) {
    el.setAttribute("data-reveal", "fade");
    return;
  }
  if (tag === "H1" || tag === "H2" || tag === "H3") {
    el.setAttribute("data-reveal", "slide");
    return;
  }
  if (tag === "P" || tag === "DL" || tag === "LABEL") {
    el.setAttribute("data-reveal", "rise");
    return;
  }
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") {
    el.setAttribute("data-reveal", "fade");
    return;
  }
  if (tag === "FOOTER") {
    el.setAttribute("data-reveal", "fade");
    return;
  }

  el.setAttribute("data-reveal", "rise");
}

function setRevealDelay(el) {
  // Two-layer staggering:
  // 1) card-level (cards in a grid)
  // 2) inside-card (title → text → footer)
  let card = el.closest(".property-card, .service-card, .feature-card, .testimonial");
  let base = 0;

  // Hero: explicit order on page load
  if (el.closest(".hero")) {
    let hero = 0;
    if (el.classList.contains("hero__eyebrow")) hero = 0;
    else if (el.classList.contains("hero__title")) hero = 80;
    else if (el.classList.contains("hero__meta")) hero = 150;
    else if (el.classList.contains("hero__text")) hero = 210;
    else if (el.classList.contains("hero__actions")) hero = 280;
    else if (el.classList.contains("hero__visual")) hero = 210;

    el.style.setProperty("--reveal-delay", `${hero}ms`);
    return;
  }

  if (card && card.parentElement) {
    const siblings = Array.from(card.parentElement.children).filter(
      (n) => n instanceof Element
    );
    const cardIndex = siblings.indexOf(card);
    if (cardIndex >= 0) {
      base = Math.min(cardIndex * 90, 360);
    }
  }

  if (
    el.classList.contains("property-card") ||
    el.classList.contains("service-card") ||
    el.classList.contains("feature-card") ||
    el.classList.contains("testimonial")
  ) {
    const delay = Math.min(base, 520);
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    return;
  }

  const tag = (el.tagName || "").toUpperCase();
  let inner = 0;
  if (tag === "H1") inner = 0;
  else if (tag === "H2" || tag === "H3") inner = 40;
  else if (tag === "P" || tag === "DL") inner = 90;
  else if (tag === "FOOTER") inner = 120;
  else if (tag === "LABEL") inner = 0;
  else if (tag === "INPUT" || tag === "TEXTAREA") inner = 40;
  else if (tag === "BUTTON") inner = 80;

  const delay = Math.min(base + inner, 520);
  el.style.setProperty("--reveal-delay", `${delay}ms`);
}

function markRevealTargets() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.classList.contains("is-revealed")) return;
    if (reduced) {
      el.classList.add("is-revealed");
      return;
    }
    setRevealVariant(el);
    setRevealDelay(el);
  });
}

function observeMarked() {
  const io = ensureObserver();
  if (!io) return;

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.classList.contains("is-revealed")) return;
    io.observe(el);
  });
}

export function refreshMotion() {
  markRevealTargets();
  observeMarked();
}

export function initPageMotion() {
  if (window.__ivetaMotionInit) return;
  window.__ivetaMotionInit = true;
  refreshMotion();
}
