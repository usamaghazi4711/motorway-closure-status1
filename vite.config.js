import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths so Express can find the files
  build: {
    outDir: 'dist', // Ensures the output folder matches your server.js
    emptyOutDir: true,
  }
})
