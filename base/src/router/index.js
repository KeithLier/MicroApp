// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/micro-first/:page*',
        name: 'micro-first',
        component: () => import('../views/micro-first.vue'),
    },
    {
        path: '/micro-second/:page*',
        name: 'micro-second',
        component: () => import('../views/micro-second.vue'),
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})


export default router
