import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // needed for docker mapping
    watch: {
      usePolling: true // needed for docker file changes on windows hosts
    }
  }
})
