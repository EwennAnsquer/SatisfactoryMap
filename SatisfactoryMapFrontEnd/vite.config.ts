import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100, // Optional, you can tweak the polling interval (ms)
    },
    host: true, // This is the same as --host, allows access from outside container
  },
})