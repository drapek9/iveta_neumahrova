import { injectPartial } from "../app.js";
import { fetchProperties, getPropertyById, formatPrice } from "../services/propertiesService.js";
import { renderPropertyCard } from "../components/propertyCard.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}

function renderDetail(property) {
  const price = formatPrice(property.price, property.currency);
  return `
    <article class="property-detail section section--tight" style="padding-top: 0">
      <p style="margin-bottom: var(--space-md)">
        <a href="nabidka.html" class="nav__link">← Zpět na celou nabídku</a>
      </p>
      <div class="property-detail__hero">
        <img src="${escapeHtml(property.imageUrl)}" alt="" width="800" height="500" />
      </div>
      <h1 class="section__title" style="margin-bottom: var(--space-sm)">${escapeHtml(property.title)}</h1>
      <p class="section__lead" style="margin-bottom: var(--space-md)">${escapeHtml(property.locality)} · <strong>${escapeHtml(price)}</strong></p>
      <div class="prose">
        <p>${escapeHtml(property.excerpt || "")}</p>
        <p>Více informací vám ráda poskytnu osobně nebo po telefonu — každá nemovitost má svůj příběh a vyprávím ho v kontextu vaší situace.</p>
      </div>
      <p style="margin-top: var(--space-lg)">
        <a class="btn btn--primary" href="kontakt.html?nemovitost=${escapeHtml(property.id)}">Mám zájem o více informací</a>
      </p>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  await injectPartial("[data-partial=header]", "header.html");
  await injectPartial("[data-partial=footer]", "footer.html");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const listRoot = document.querySelector("[data-properties-list]");
  const detailRoot = document.querySelector("[data-property-detail]");

  if (id && detailRoot) {
    const property = getPropertyById(id);
    if (property) {
      detailRoot.innerHTML = renderDetail(property);
      detailRoot.hidden = false;
      if (listRoot) listRoot.hidden = true;
      const pageHeader = document.querySelector(".page-header");
      if (pageHeader) pageHeader.hidden = true;
    }
  }

  if (listRoot && !listRoot.hidden) {
    listRoot.classList.add("is-loading");
    try {
      const list = await fetchProperties();
      listRoot.innerHTML = `
        <div class="property-grid property-grid--3">
          ${list.map((p) => renderPropertyCard(p)).join("")}
        </div>
      `;
    } catch (e) {
      console.error(e);
      listRoot.innerHTML =
        '<p class="section__lead">Nepodařilo se načíst nabídku. Zkuste obnovit stránku.</p>';
    } finally {
      listRoot.classList.remove("is-loading");
    }
  }
});
