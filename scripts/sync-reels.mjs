import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const videosDir = path.join(root, "client/videos");
const dataFile = path.join(root, "client/data/reels.json");

const naturalCompare = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const videoFiles = readdirSync(videosDir)
  .filter((f) => f.toLowerCase().endsWith(".mp4"))
  .sort(naturalCompare);

const existing = existsSync(dataFile)
  ? JSON.parse(readFileSync(dataFile, "utf-8"))
  : [];

const existingByFile = new Map(existing.map((r) => [r.videoFile, r]));

let added = 0;
let removed = 0;

const synced = videoFiles.map((videoFile) => {
  const found = existingByFile.get(videoFile);
  if (found) return found;
  added++;
  return {
    videoFile,
    title: "Nuevo reel",
    description: "",
    views: 0,
    likes: 0,
    shares: 0,
  };
});

for (const r of existing) {
  if (!videoFiles.includes(r.videoFile)) {
    removed++;
    console.warn(`⚠️  ${r.videoFile} ya no existe en client/videos — se quitó de reels.json`);
  }
}

writeFileSync(dataFile, JSON.stringify(synced, null, 2) + "\n");

console.log(
  `reels.json sincronizado: ${synced.length} reels (${added} nuevos, ${removed} eliminados).`,
);
if (added > 0) {
  console.log(`Editá los títulos/descripciones/stats de los nuevos en client/data/reels.json`);
}
