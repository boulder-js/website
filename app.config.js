import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    preset: 'cloudflare-pages',
    cloudflare: {
      pages: {
        routes: {
          exclude: ['/build/*']
        }
      }
    },
    compatibility_date: '2024-09-23',
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
