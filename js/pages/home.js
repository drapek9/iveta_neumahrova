import { injectPartial, mountPropertyGrid } from "../app.js";

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

  await mountPropertyGrid("[data-properties-preview]", { limit: 3, columns: 3 });
  initTestimonialReadMore();
});
