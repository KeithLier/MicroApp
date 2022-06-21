// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
    {
        path: window.__MICRO_APP_BASE_ROUTE__ || '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/page',
        name: 'page',
        component: () => import('../views/page.vue')
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  mode: 'history',
  routes
})

export default router
