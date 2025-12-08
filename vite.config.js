import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow Vite to listen on all addresses
    port: 5173,
    strictPort: true,
    allowedHosts: [''], // whitelist ngrok host
  },
  base: '/p156/',
  build: {
    outDir: 'docs'
  }
})