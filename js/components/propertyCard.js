import { formatListingPrice } from "../services/propertiesService.js";

/**
 * @param {object} property
 * @param {{ linkToDetail?: boolean }} [opts] – výchozí false (karta je klikací, ale bez přechodu)
 */
export function renderPropertyCard(property, opts = {}) {
  const linkToDetail = opts.linkToDetail === true;
  const price = formatListingPrice(property);
  const isExternal = /^https?:\/\//.test(property.detailUrl);
  const linkRel = isExternal ? ' rel="noopener noreferrer" target="_blank"' : "";
  const inner = `
    <div class="property-card__image">
      <img src="${escapeHtml(property.imageUrl)}" alt="" loading="lazy" width="800" height="600" />
    </div>
    <div class="property-card__body">
      <h3 class="property-card__title">${escapeHtml(property.title)}</h3>
      <p class="property-card__meta">${escapeHtml(property.locality)}</p>
      <p class="property-card__price">${escapeHtml(price)}</p>
    </div>
  `;

  if (linkToDetail) {
    return `<a class="property-card" href="${escapeHtml(property.detailUrl)}"${linkRel}>${inner}</a>`;
  }
  return `<a class="property-card property-card--noop" href="javascript:void(0)" aria-disabled="true">${inner}</a>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
