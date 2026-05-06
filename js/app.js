/**
 * Společná aplikační logika: navigace, partials, property listy.
 */

const PARTIAL_BASE = new URL("../partials/", import.meta.url);

export async function injectPartial(selector, partialName) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const url = new URL(partialName, PARTIAL_BASE);
    const res = await fetch(url.href);
    if (!res.ok) throw new Error(res.statusText);
    el.innerHTML = await res.text();
    const yearEl = el.querySelector && el.querySelector("#footer-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    highlightCurrentNav();
    initMobileNav();
  } catch (e) {
    console.error("Partial load failed:", partialName, e);
    el.innerHTML = "";
  }
}

export function scrollToHashWithOffset() {
  const hash = decodeURIComponent(window.location.hash || "");
  if (!hash || hash === "#") return;

  const target = document.querySelector(hash);
  if (!target) return;

  requestAnimationFrame(() => {
    const header = document.querySelector(".site-header");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function highlightCurrentNav() {
  const raw = window.location.pathname.split("/").pop();
  const currentPage = raw && raw.includes(".") ? raw : "index.html";

  document.querySelectorAll(".nav__link").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === currentPage) {
      a.setAttribute("aria-current", "page");
    }
  });
}

function initMobileNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Vyplní kontejner kartami nemovitostí.
 * @param {string} selector
 * @param {{ limit?: number, columns?: 2 | 3 }} [options]
 */
export async function mountPropertyGrid(selector, options = {}) {
  const root = document.querySelector(selector);
  if (!root) return;

  const { fetchProperties } = await import("./services/propertiesService.js");
  const { renderPropertyCard } = await import("./components/propertyCard.js");

  root.classList.add("is-loading");
  try {
    let list = await fetchProperties();
    if (typeof options.limit === "number") {
      list = list.slice(0, options.limit);
    }
    const gridClass =
      options.columns === 3 ? "property-grid property-grid--3" : "property-grid";
    root.innerHTML = `
      <div class="${gridClass}">
        ${list.map((p) => renderPropertyCard(p)).join("")}
      </div>
    `;
  } catch (e) {
    console.error(e);
    root.innerHTML =
      '<p class="section__lead">Momentálně se nepodařilo načíst nemovitosti. Zkuste to prosím znovu později.</p>';
  } finally {
    root.classList.remove("is-loading");
    import("./motion.js")
      .then((m) => m.refreshMotion())
      .catch(() => {});
  }
}

export function initContactForm(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (status) {
      status.textContent =
        "Děkuji za zprávu, brzy se ozvu.";
      status.className = "form-status form-status--ok is-visible";
    }
    form.reset();
  });
}
