import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  appType: "spa",
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: process.env.VITE_PROXY_TARGET || "http://backend:3000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 3000,
    host: "0.0.0.0"
  }
});





