/**
 * Scroll reveal + obnova cílů po dynamickém obsahu (nabídka, úvodka).
 */

const REVEAL_SELECTOR = [
  "main > section",
  "main > header.page-header",
  '[data-properties-list]:not(:empty)',
  '[data-property-detail]:not([hidden])',
  ".site-footer",
].join(", ");

let observer;

function isMostlyInViewport(el) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top < vh * 0.92 && r.bottom > vh * 0.08;
}

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
        el.removeAttribute("data-reveal");
        observer.unobserve(el);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.08,
    }
  );

  return observer;
}

function markRevealTargets() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (el.classList.contains("is-revealed")) return;
    if (reduced) {
      el.classList.add("is-revealed");
      return;
    }
    if (isMostlyInViewport(el)) {
      el.classList.add("is-revealed");
      return;
    }
    el.setAttribute("data-reveal", "");
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
