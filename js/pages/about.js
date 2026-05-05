import { injectPartial } from "../app.js";

function formatCzechYears(n) {
  if (n <= 0) return "méně než rok";
  if (n === 1) return "1 rok";
  if (n >= 2 && n <= 4) return `${n} roky`;
  return `${n} let`;
}

function initCareerStat() {
  const block = document.querySelector(".about-stat[data-career-start]");
  if (!block) return;

  const startYear = parseInt(block.getAttribute("data-career-start"), 10);
  if (Number.isNaN(startYear)) return;

  const currentYear = new Date().getFullYear();
  const years = Math.max(0, currentYear - startYear);

  const out = block.querySelector("[data-career-output]");
  const yearEl = block.querySelector("[data-career-year]");
  if (out) out.textContent = formatCzechYears(years);
  if (yearEl) yearEl.textContent = String(startYear);
}

function initTestimonialReadMore() {
  const cards = document.querySelectorAll(".testimonial");
  cards.forEach((card) => {
    const textEl = card.querySelector("p");
    if (!textEl) return;

    card.classList.add("is-collapsed");
    const hasOverflow = textEl.scrollHeight > textEl.clientHeight + 1;
    if (!hasOverflow) {
      card.classList.remove("is-collapsed");
      return;
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "testimonial__more";
    btn.setAttribute("aria-expanded", "false");
    btn.textContent = "Číst dále";

    btn.addEventListener("click", () => {
      const expanded = card.classList.toggle("is-collapsed") === false;
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      btn.textContent = expanded ? "Skrýt" : "Číst dále";
    });

    textEl.insertAdjacentElement("afterend", btn);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartial("[data-partial=header]", "header.html");
  await injectPartial("[data-partial=footer]", "footer.html");

  const { initPageMotion } = await import("../motion.js");
  initPageMotion();

  initCareerStat();
  initTestimonialReadMore();
});
