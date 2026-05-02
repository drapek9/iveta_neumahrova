import { injectPartial, mountPropertyGrid } from "../app.js";

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartial("[data-partial=header]", "header.html");
  await injectPartial("[data-partial=footer]", "footer.html");

  await mountPropertyGrid("[data-properties-preview]", { limit: 3, columns: 3 });
});
