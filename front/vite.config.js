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
      "/app": "http://localhost:3600",
    },
    allowedHosts: "77f1-129-45-19-177.ngrok-free.app",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@assets": path.resolve(__dirname, "src", "assets"),
    },
  },
});
