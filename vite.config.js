import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // El botón "Descargar CV" solo aparece si existe public/cv.pdf
    // (al añadir o quitar el PDF, reinicia `npm run dev`)
    __HAS_CV__: JSON.stringify(existsSync('public/cv.pdf')),
  },
})
