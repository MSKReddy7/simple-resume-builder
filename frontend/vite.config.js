// https://vite.dev/config/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',        
    port: 5173,         
    allowedHosts: ['a95fda6fe3bd.ngrok-free.app']
  }
})
