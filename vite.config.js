import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        privacy: resolve(root, "privacy.html"),
        terms: resolve(root, "terms.html"),
      },
    },
  },
});
