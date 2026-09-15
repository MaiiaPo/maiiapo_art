import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/works',
      name: 'works',
      component: () => import('../views/WorksPage.vue'),
    },
    {
      path: '/works/:id',
      name: 'work-detail',
      component: () => import('../views/WorkDetailPage.vue'),
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('../views/SeriesPage.vue'),
    },
    {
      path: '/series/:id',
      name: 'series-detail',
      component: () => import('../views/SeriesDetailPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
    },
    // {
    //   path: '/exhibitions',
    //   name: 'exhibitions',
    //   component: () => import('../views/ExhibitionsPage.vue'),
    // },
    // {
    //   path: '/shop',
    //   name: 'shop',
    //   component: () => import('../views/ShopPage.vue'),
    // },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsPage.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyPage.vue'),
    },
    {
      path: '/consent',
      name: 'consent',
      component: () => import('../views/ConsentPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
