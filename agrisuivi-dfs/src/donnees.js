import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function lireJson(chemin) {
  try {
    const contenu = await readFile(chemin, "utf-8");
    return JSON.parse(contenu);
  } catch (error) {
    throw new Error("Impossible de lire le fichier JSON", {
      cause: error,
    });
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