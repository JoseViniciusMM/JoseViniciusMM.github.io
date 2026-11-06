import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// No repositório JoseViniciusMM.github.io o site fica na raiz ("/").
// Se publicar em outro repositório (ex.: /portfolio/), defina BASE_PATH no workflow.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})
