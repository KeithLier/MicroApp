import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// entry
import microApp from '@micro-zoe/micro-app'

microApp.start()

const app = createApp(App)
app.use(router).mount('#app')
