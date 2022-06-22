# MicroApp

------

本次应用用于上手MicroApp微服务框架，参考官方文档：[MicroApp](https://cangdu.org/micro-app/)

### 项目创建

项目由 vue 的[官方](https://cn.vuejs.org/)脚手架创建，基项目 base 和子项目 micro_first、micro_second

```
vue create base

vue create micro_first
vue create micro_second

```

### 基项目修改
添加本地运行配置文件 vue.config.js

```
module.exports = {
    devServer: {
        host: 'localhost'
        , port: 3000
    }
}
```

安装 micro-app 插件

	npm i @micro-zoe/micro-app --save

在入口处引入

```
// entry
import microApp from '@micro-zoe/micro-app'

microApp.start()

```

修改router/index.js文件

```
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // 增加的部分
    {
        path: '/mocro-first/:page*',
        name: 'mocro-first',
        component: () => import('../views/micro-first.vue'),
    },
    {
        path: '/mocro-second/:page*',
        name: 'mocro-second',
        component: () => import('../views/micro-second.vue'),
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```

页面中嵌入子页面，views文件中新增micro-first.vue和micro-second.vue

```
<!-- micro-first.vue -->
<template>
  <div>
    <h1>子应用</h1>
    <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3001/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/micro-first`
     -->
    <micro-app name='micro-first' url='http://localhost:3001/' baseroute='/micro-first'></micro-app>
  </div>
</template>

```

### 子项目修改

添加本地运行配置文件 vue.config.js，设置允许跨域访问

```
module.exports = {
    devServer: {
        host: 'localhost',
        port: 3001,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }
}
```