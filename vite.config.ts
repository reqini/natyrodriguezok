import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  base: "/", // Vercel necesita que sea root absoluto
  build: {
    outDir: path.resolve(__dirname, "dist/spa"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    copy({
      targets: [
        { src: path.resolve(__dirname, "client/images"), dest: path.resolve(__dirname, "dist/spa/images") },
        { src: path.resolve(__dirname, "client/videos"), dest: path.resolve(__dirname, "dist/spa/videos") },
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
