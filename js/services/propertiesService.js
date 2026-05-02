/**
 * Služba pro načítání nemovitostí.
 *
 * Produkční napojení: nahraďte getMockProperties() voláním API (Sreality, Dumrealit, vlastní CMS).
 * Typicky: GET /api/listings → mapování polí do unified shape níže.
 */

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "Světlý byt s výhledem do zeleně",
    locality: "Praha 6 — Dejvice",
    price: 12490000,
    currency: "CZK",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    detailUrl: "nabidka.html?id=1",
    excerpt: "Klidná adresa, promyšlené dispozice — pro majitele, kterým záleží na tom, komu byt předají.",
  },
  {
    id: "2",
    title: "Rodinný dům s duší",
    locality: "Brno — Žabovřesky",
    price: 18990000,
    currency: "CZK",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    detailUrl: "nabidka.html?id=2",
    excerpt: "Prostor pro život, ne jen pro „prodej za každou cenu“. Vhodné pro rodinu hledající stabilitu.",
  },
  {
    id: "3",
    title: "Designový loft v širším centru",
    locality: "Praha 5 — Smíchov",
    price: 9850000,
    currency: "CZK",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    detailUrl: "nabidka.html?id=3",
    excerpt: "Pro klienty, kteří chtějí kombinovat městský rytmus s osobním klidem.",
  },
  {
    id: "4",
    title: "Zahrada, klid, dobré sousedy",
    locality: "Okolí Prahy — západ",
    price: 15650000,
    currency: "CZK",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    detailUrl: "nabidka.html?id=4",
    excerpt: "Méně hektiky, víc prostoru — typicky spolupracuji s majiteli, kteří řeší i „komu prodávám“.",
  },
];

/**
 * @returns {Promise<Array<{
 *   id: string,
 *   title: string,
 *   locality: string,
 *   price: number,
 *   currency: string,
 *   imageUrl: string,
 *   detailUrl: string,
 *   excerpt?: string
 * }>>}
 */
export async function fetchProperties() {
  // TODO produkce: const res = await fetch('/api/listings', { headers: { Accept: 'application/json' } });
  // const data = await res.json();
  // return normalizeApiResponse(data);

  await new Promise((r) => setTimeout(r, 180));
  return [...MOCK_LISTINGS];
}

export function getPropertyById(id) {
  return MOCK_LISTINGS.find((p) => p.id === String(id)) || null;
}

export function formatPrice(amount, currency = "CZK") {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
