import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import copy from "rollup-plugin-copy";

// Cambia el base para GitHub Pages (ajusta el repo si es necesario)
const repoName = "natyrodriguez"; // Cambia si tu repo es diferente

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  base: `/${repoName}/`,
  server: {
    host: "::",
    port: 8080,
    fs: { allow: [".."] },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    copy({
      targets: [
        { src: path.resolve(__dirname, "client/images"), dest: path.resolve(__dirname, "dist/spa") },
        { src: path.resolve(__dirname, "client/videos"), dest: path.resolve(__dirname, "dist/spa") },
      ],
      hook: "writeBundle",
      flatten: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
