import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      // Windows: files being copied into assets can lock and crash native FS watchers
      usePolling: true,
      interval: 1000,
    },
  },
})
