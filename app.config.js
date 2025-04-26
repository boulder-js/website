import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    preset: 'cloudflare-pages',
    rollupConfig: {
      external: [
        'node:async_hooks',
        'node:path',
        'node:fs',
        'node:crypto',
        'node:util',
        'node:buffer'
      ]
    }
  }
})
