import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/blogs',
      component: () => import('../views/Blogs.vue')
    },
    {
      path: '/forums',
      component: () => import('../views/Forums.vue')
    },
    {
      path: '/start',
      component: () => import('../views/Start.vue')
    }
  ]
})

export default router
