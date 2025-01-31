import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss"; // ✅ Use the correct Tailwind PostCSS plugin
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcss([tailwindcss(), autoprefixer()])],
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      external: ["openai"], // ✅ Ensures OpenAI is treated as an external dependency
      output: {
        entryFileNames: "index.js", // Prevent hashed filenames
        chunkFileNames: "chunk-[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
