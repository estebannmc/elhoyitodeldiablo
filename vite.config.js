import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/elhoyitodeldiablo/', // Base URL for deployment on GitHub Pages
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://fakestoreapi.com')
  }
})
