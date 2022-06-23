import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HelloWorld.vue'

const routes = [
    {
        path: window.__MICRO_APP_BASE_ROUTE__ || '/',
        name: 'Home',
        component: Home
    },
]

const router = createRouter({
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
  mode: "history",
  routes
})

export default router