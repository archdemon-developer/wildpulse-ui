import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/blogs',
      component: () => import('../views/BlogsView.vue')
    },
    {
      path: '/forums',
      component: () => import('../views/ForumsView.vue')
    },
    {
      path: '/start',
      component: () => import('../views/StartView.vue')
    }
  ]
})

export default router
