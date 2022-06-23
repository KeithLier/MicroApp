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
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
  mode: 'history',
  routes
})

export default router
