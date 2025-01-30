import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-hook-form")) {
            return "react-hook-form";
          }

          if (id.includes("zod")) {
            return "zod";
          }

          if (id.includes("axios")) {
            return "axios";
          }

          if (id.includes("framer-motion")) {
            return "framer-motion";
          }

          if (id.includes("react-dom")) {
            return "react-dom";
          }
        },
      },
    },
  },
});
