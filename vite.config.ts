import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

function imageDirectives(url: URL) {
  const path = url.pathname.toLowerCase()

  // Keep the signature logo untouched so the thin handwritten strokes stay crisp.
  if (path.includes('/assets/artist/logo.png')) {
    return new URLSearchParams()
  }

  const params = new URLSearchParams({
    format: 'webp',
    effort: '5',
  })

  // Interiors can be compressed more aggressively: they are photographic mockups
  // and are never shown at pixel-perfect inspection scale.
  if (path.includes('/interior/')) {
    params.set('quality', '80')
    return params
  }

  // Process/draft shots are secondary content and load below the fold.
  if (path.includes('/draft/')) {
    params.set('quality', '80')
    return params
  }

  // Homepage and series banners need to stay clean while still shedding most PNG weight.
  if (path.endsWith('/banner.png') || path.includes('/pages/home/')) {
    params.set('quality', '86')
    return params
  }

  // Main artwork images keep a little more quality to preserve brush texture and edges.
  params.set('quality', '90')
  return params
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      defaultDirectives: imageDirectives,
      removeMetadata: true,
    }),
  ],
  server: {
    watch: {
      // Windows: files being copied into assets can lock and crash native FS watchers
      usePolling: true,
      interval: 1000,
    },
  },
})
