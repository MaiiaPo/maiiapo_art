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
    {
      name: 'local-contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', (req, res, next) => {
          if (req.method === 'OPTIONS') {
            res.statusCode = 204
            res.end()
            return
          }
          if (req.method !== 'POST') {
            next()
            return
          }

          const chunks: Buffer[] = []
          req.on('data', (chunk) => chunks.push(chunk))
          req.on('end', async () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as {
                contact?: string
                workTitle?: string
                workId?: string
              }
              const contact = String(body.contact ?? '').trim()
              if (!contact) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: false }))
                return
              }

              const isOrder = Boolean(body.workTitle || body.workId)
              const lines = [
                isOrder ? 'Запрос на заказ работы' : 'Контакт с сайта',
                '',
                body.workTitle ? `Работа: ${body.workTitle}` : null,
                body.workId ? `ID: ${body.workId}` : null,
                `Контакт: ${contact}`,
              ].filter(Boolean)

              const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
              const upstream = await fetch(
                'https://formsubmit.co/ajax/maiiapoart%40gmail.com',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                  },
                  body: JSON.stringify({
                    name: 'maiiapo.site',
                    email: emailLike ? contact : 'noreply@maiiapo.com',
                    _replyto: emailLike ? contact : undefined,
                    _subject: isOrder
                      ? 'Заказ работы с сайта maiiapo'
                      : 'Вам отправлен контакт для связи с сайта maiiapo',
                    _captcha: 'false',
                    _template: 'box',
                    message: lines.join('\n'),
                  }),
                },
              )

              const raw = await upstream.text()
              let ok = upstream.ok
              try {
                const parsed = JSON.parse(raw) as { success?: unknown }
                ok = ok && Boolean(parsed.success)
              } catch {
                ok = false
              }

              res.statusCode = ok ? 200 : 502
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: ok }))
            } catch {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false }))
            }
          })
        })
      },
    },
  ],
  server: {
    watch: {
      // Windows: files being copied into assets can lock and crash native FS watchers
      usePolling: true,
      interval: 1000,
    },
  },
})
