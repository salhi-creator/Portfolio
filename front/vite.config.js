import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3800",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@auth": path.resolve(__dirname, "src", "auth"),

    },
  },
});
