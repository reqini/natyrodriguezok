import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "public"),
  // Relativo: funciona tanto en natyrodriguez.online (raíz) como en
  // reqini.github.io/natyrodriguezok/ (subpath) sin tener que elegir uno.
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    copy({
      targets: [
        { src: path.resolve(__dirname, "client/images/*"), dest: path.resolve(__dirname, "dist/images") },
        { src: path.resolve(__dirname, "client/videos/*"), dest: path.resolve(__dirname, "dist/videos") },
      ],
      hook: "writeBundle",
      flatten: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
});
