import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function lireJson(chemin) {
  try {
    const contenu = await readFile(chemin, "utf-8");
    return JSON.parse(contenu);
  } catch (erreur)  {
    throw new Error(`Impossible de lire ${chemin}`, { cause: erreur })
  }
}
export async function chargerDonnees(dossier) {
  const [parcelles, cultures, releves, recoltes] =
    await Promise.all([
      lireJson(join(dossier, "parcelles.json")),
      lireJson(join(dossier, "cultures.json")),
      lireJson(join(dossier, "releves.json")),
      lireJson(join(dossier, "recoltes.json")),
    ]);

  return {
    parcelles,
    cultures,
    releves,
    recoltes,
  };
}

export function creerReleve(parcelle, humiditeTexte, temperatureTexte, date) {
  return {
    parcelle: parcelle.toUpperCase(),
    date,
    humidite: Number(humiditeTexte),
    temperature: Number(temperatureTexte),
  };
}

export async function ajouterReleve(chemin, releve) {
  const releves = await lireJson(chemin);

  releves.push(releve);

  await writeFile(
    chemin,
    JSON.stringify(releves, null, 2),
    "utf-8"
  );

  return releves.length;
}
