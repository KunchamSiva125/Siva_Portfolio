import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Siva_Portfolio/',
  plugins: [
    tailwindcss(),
  ],
})