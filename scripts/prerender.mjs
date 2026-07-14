// Renderiza la SPA con un navegador real y "hornea" el HTML resultante en
// dist/index.html, para que buscadores y crawlers de IA que no ejecutan
// JavaScript puedan leer el contenido real de la página. React sigue
// montando normalmente encima en el navegador del usuario (createRoot
// reemplaza el contenido, no hace hydrate), así que no cambia nada para
// las personas que visitan el sitio.
import { chromium } from "playwright";
import { createServer } from "http";
import { readFile } from "fs/promises";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const port = 4321;

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0]);
      let filePath = path.join(distDir, urlPath === "/" ? "index.html" : urlPath);
      try {
        const data = await readFile(filePath);
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
        res.end(data);
      } catch {
        const fallback = await readFile(path.join(distDir, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fallback);
      }
    });
    server.listen(port, () => resolve(server));
  });
}

const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
await page.waitForSelector("h1", { timeout: 10000 });

const html = await page.content();

await browser.close();
server.close();

writeFileSync(path.join(distDir, "index.html"), html);

console.log("dist/index.html prerenderizado con el contenido real de la página.");
