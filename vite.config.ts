import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

function imageDirectives(url: URL) {
  const path = url.pathname.toLowerCase()

  // Keep the handwritten signature untouched.
  if (path.includes('/assets/artist/logo.png')) {
    return new URLSearchParams()
  }

  const params = new URLSearchParams({
    format: 'avif;webp',
    as: 'picture',
    effort: '5',
  })

  // Small cards never need the full source resolution.
  if (path.includes('/pages/home/catalog_')) {
    params.set('w', '320;600;900')
    params.set('quality', '76')
    return params
  }

  // Interior mockups are photographic and tolerate stronger compression.
  if (path.includes('/interior/')) {
    params.set('w', '480;900;1400')
    params.set('quality', '72')
    return params
  }

  // Process/draft shots are secondary, below-the-fold content.
  if (path.includes('/draft/')) {
    params.set('w', '360;700;1100')
    params.set('quality', '72')
    return params
  }

  // Hero and series banners can be wide, but should not ship giant originals.
  if (path.endsWith('/banner.png')) {
    params.set('w', '600;1000;1600')
    params.set('quality', '78')
    return params
  }

  // About/landing imagery.
  if (path.includes('/pages/home/') || path.includes('/aboutseries.')) {
    params.set('w', '480;800;1200')
    params.set('quality', '78')
    return params
  }

  // Main artwork and details preserve a little more texture and edge definition.
  if (path.includes('/main.') || path.includes('/detail')) {
    params.set('w', '400;800;1200')
    params.set('quality', '84')
    return params
  }

  // Sensible fallback for the rest of the raster assets.
  params.set('w', '480;900;1400')
  params.set('quality', '80')
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
