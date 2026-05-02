import { formatPrice } from "../services/propertiesService.js";

/**
 * @param {object} property
 * @param {{ linkToDetail?: boolean }} [opts]
 */
export function renderPropertyCard(property, opts = {}) {
  const linkToDetail = opts.linkToDetail !== false;
  const price = formatPrice(property.price, property.currency);
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
    return `<a class="property-card" href="${escapeHtml(property.detailUrl)}">${inner}</a>`;
  }
  return `<article class="property-card">${inner}</article>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
