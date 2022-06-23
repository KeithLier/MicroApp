/**引入 publicPath 设置 */
import './public-path'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router).mount('#app')

