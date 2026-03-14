import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

export default defineConfig({
  // 👇 le dice a Vite que el frontend vive en /client
  root: path.resolve(__dirname, "client"),

  server: {
    host: "::",
    port: 8080,
    fs: {
      // 👇 permite acceder a todo el repo (client, shared, etc.)
      allow: [".."],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
    },
  },

  build: {
    // 👇 evita que el build quede dentro de /client
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },

  plugins: [react(), expressPlugin()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",

    configureServer(viteServer) {
      const app = createServer();

      // conecta express con el dev server de vite
      viteServer.middlewares.use(app);
    },
  };
}
