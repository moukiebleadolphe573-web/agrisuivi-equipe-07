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