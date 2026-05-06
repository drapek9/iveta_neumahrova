const LISTINGS = [
  {
    id: "656102",
    title: "Pronájem komerčního objektu, kanceláře, 51 m²",
    locality: "Bubenečská, Praha 6 - Bubeneč",
    price: 24900,
    currency: "CZK",
    pricePeriod: "měsíc",
    imageUrl: "images/kancelar_51.jpg",
    detailUrl:
      "https://www.dumrealit.cz/nemovitosti/obec-praha-554782/pronajem-komercniho-objektu-kancelare-praha-51m2_656102",
    excerpt:
      "Pronájem reprezentativních kancelářských prostor 51 m² v Bubenečské ulici na Praze 6. Vstup z ulice, dvě kanceláře nebo zázemí, kuchyňka a toaleta. Prostory jsou kompletně vybavené (lze i bez nábytku), k dispozici ihned, s výbornou dostupností MHD a metra A Hradčanská. Ev. č. 656102.",
  },
  {
    id: "656048",
    title: "Pronájem bytu 2+kk, 59 m²",
    locality: "Měchnovská, Praha 4 - Chodov",
    price: 24500,
    currency: "CZK",
    pricePeriod: "měsíc",
    imageUrl: "images/pronajem_bytu_2_kk.jpg",
    detailUrl:
      "https://www.dumrealit.cz/nemovitosti/obec-0/pronajem-bytu-2-kk-59m2_656048",
    excerpt:
      "Pronájem bytu 2+kk, 59 m² s balkonem 7 m² ve 4. NP novostavby Výhledy Chodovec 2024. V ceně nájmu je parkovací stání i sklep. Byt má plně vybavenou kuchyň, samostatnou toaletu, koupelnu se sprchou a výbornou dostupnost na metro C Chodov. Ev. č. 656048.",
  },
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
