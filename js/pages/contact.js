import { injectPartial, initContactForm } from "../app.js";

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartial("[data-partial=header]", "header.html");
  await injectPartial("[data-partial=footer]", "footer.html");

  const { initPageMotion } = await import("../motion.js");
  initPageMotion();

  const params = new URLSearchParams(window.location.search);
  const nem = params.get("nemovitost");
  const note = document.querySelector("[name=zprava]");
  if (nem && note) {
    note.placeholder = `Ráda bych se zeptala na nemovitost č. ${nem}…`;
  }

  initContactForm("#contact-form");
});
