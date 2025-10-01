import { defineConfig } from 'astro/config'
import solidJs from '@astrojs/solid-js'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile'
  }),
  integrations: [
    solidJs()
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})
