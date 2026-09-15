import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { redirectRuFromComToArt } from './services/geoRedirect'

async function bootstrap() {
  const redirected = await redirectRuFromComToArt()
  if (redirected) return

  createApp(App).use(router).mount('#app')
}

void bootstrap()
