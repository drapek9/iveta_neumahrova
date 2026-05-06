import { injectPartial } from "../app.js";

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartial("[data-partial=header]", "header.html");
  await injectPartial("[data-partial=footer]", "footer.html");

  const { initPageMotion } = await import("../motion.js");
  initPageMotion();
});

