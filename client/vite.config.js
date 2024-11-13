import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/user": {
        target: "http://localhost:3000", // The target host
        changeOrigin: true, // Recommended for virtual hosted sites
      },
      "/favorite": {
        target: "http://localhost:3000", // The target host
        changeOrigin: true, // Recommended for virtual hosted sites
      },
      "/recipe": {
        target: "http://localhost:3000", // The target host
        changeOrigin: true, // Recommended for virtual hosted sites
      },
    },
  },
});
