import { defineConfig } from "vite";

// Vercel currently forces `vite build`. Build a tiny harmless stub while
// retaining the finished static site already present in dist/.
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: { input: "vite-stub.html" },
  },
});
