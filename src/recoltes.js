export function totalRecolte(recoltes, idParcelle) {
  return recoltes
    .filter((recolte) => recolte.parcelle === idParcelle)
    .reduce((total, recolte) => total + recolte.kg, 0);
}

export function rendement(kg, surface) {
  if (surface <= 0) {
    throw new RangeError("La surface doit être supérieure à 0");
  }
  return Math.round(kg / surface);
}
export function revenu(kg, prixKg) {
  return kg * prixKg;
}
export function bilanRecoltes(parcelles, recoltes, cultures) {
  return parcelles.map((parcelle) => {
    const culture = cultures.find((c) => c.code === parcelle.culture);
    const kg = totalRecolte(recoltes, parcelle.id);
    const rend = rendement(kg, parcelle.surface);
    const rev = revenu(kg, culture.prixKg);

    return {
      id: parcelle.id,
      producteur: parcelle.producteur,
      culture: parcelle.culture,
      kg: kg,
      rendement: rend,
      revenu: rev,
    };
  });
}