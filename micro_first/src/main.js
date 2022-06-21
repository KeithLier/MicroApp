import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log('微应用渲染了1111111')
const app = createApp(App)
app.use(router).mount('#app')

