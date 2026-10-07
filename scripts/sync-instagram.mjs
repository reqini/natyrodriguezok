// Trae los números reales de la cuenta de Instagram (seguidores, publicaciones)
// usando la Instagram Graph API y los escribe en client/data/social.json.
// Lo corre solo el workflow .github/workflows/sync-instagram.yml.
//
// Necesita dos variables de entorno:
//   IG_USER_ID        -> id numérico de la cuenta de Instagram Business/Creator
//   IG_ACCESS_TOKEN   -> token de acceso de larga duración de la app de Meta
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const socialFile = path.resolve(__dirname, "../client/data/social.json");

const userId = process.env.IG_USER_ID;
const token = process.env.IG_ACCESS_TOKEN;

// Sin credenciales todavía no hay nada que sincronizar: no es un error.
if (!userId || !token) {
  console.log(
    "IG_USER_ID / IG_ACCESS_TOKEN no configurados: se saltea la sincronización.",
  );
  process.exit(0);
}

const url =
  `https://graph.facebook.com/v21.0/${userId}` +
  `?fields=followers_count,media_count,username&access_token=${token}`;

const res = await fetch(url);
const body = await res.json();

if (!res.ok) {
  const detail = body?.error?.message ?? JSON.stringify(body);
  console.error(`La API de Instagram respondió ${res.status}: ${detail}`);
  process.exit(1);
}

const followers = body.followers_count;
const posts = body.media_count;

if (typeof followers !== "number") {
  console.error("La respuesta no trajo followers_count:", JSON.stringify(body));
  process.exit(1);
}

const social = JSON.parse(readFileSync(socialFile, "utf-8"));
const previous = social.instagram.followers;

social.instagram.followers = followers;
if (typeof posts === "number") social.instagram.posts = posts;
social.instagram.lastSyncedAt = new Date().toISOString().slice(0, 10);

writeFileSync(socialFile, JSON.stringify(social, null, 2) + "\n");

const delta = followers - previous;
const sign = delta > 0 ? "+" : "";
console.log(
  `Instagram sincronizado: ${followers.toLocaleString("es-AR")} seguidores ` +
    `(${sign}${delta.toLocaleString("es-AR")} desde la última vez).`,
);
