import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100, // Optional, you can tweak the polling interval (ms)
    },
    host: true, // This is the same as --host, allows access from outside container
  },
})