const LISTINGS = [
  {
    id: "656109",
    title: "Pronájem bytu 2+1, 48 m²",
    locality: "Anastázova, Praha 6 - Břevnov",
    price: 22000,
    currency: "CZK",
    pricePeriod: "měsíc",
    imageUrl: "images/prodej_bytu_2_1.jpg",
    detailUrl:
      "https://www.dumrealit.cz/nemovitosti/obec-praha-554782/pronajem-bytu-2-1-praha-48m2_656109",
    excerpt:
      "Pronájem 2+1, 48 m² s balkonem 13 m² v 6. NP domu v Břevnově. Slunný byt s výhledem z balkonu, kuchyň se sporákem, troubou, myčkou a lednicí, obývací pokoj s vstupem na balkon, ložnice se skříní. Koupelna s vanou, toaleta zvlášť, sklepní kóje. Plastová okna, dálkové vytápění, dům po zateplení. Poplatky nad rámec nájmu; bez domácích zvířat, k dispozici ihned. Metro A cca 15 min, klidná lokalita s občanskou vybaveností a zelení (Obora Hvězda, Šárecké údolí). Ev. č. 656109.",
  },
];

export async function fetchProperties() {
  await new Promise((r) => setTimeout(r, 180));
  return [...LISTINGS];
}

export function getPropertyById(id) {
  return LISTINGS.find((p) => p.id === String(id)) || null;
}

export function formatPrice(amount, currency = "CZK") {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatListingPrice(property) {
  const base = formatPrice(property.price, property.currency);
  if (property.pricePeriod) {
    return `${base} / ${property.pricePeriod}`;
  }
  return base;
}
