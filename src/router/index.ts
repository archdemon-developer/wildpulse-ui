import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/forums',
      name: 'forums',
      component: () => import("@/views/ForumsView.vue")
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: () => import("@/views/BlogsView.vue")
    }, 
    {
      path: '/start',
      name: 'start',
      component: () => import("@/views/StartView.vue")
    },
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/HomeView.vue")
    }
  ]
})

export default router
