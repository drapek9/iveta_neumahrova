import { formatListingPrice } from "../services/propertiesService.js";

/**
 * @param {object} property
 * @param {{ linkToDetail?: boolean }} [opts] – výchozí false (klik na kartu nic nedělá)
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
  return `<article class="property-card">${inner}</article>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
