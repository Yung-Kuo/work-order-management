import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // port: 3000,
    proxy: {
      "/tasks": `${import.meta.env.VITE_API_URL}`,
      "/products": `${import.meta.env.VITE_API_URL}`,
    },
  },
});
