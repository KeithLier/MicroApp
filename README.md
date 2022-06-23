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

设置基础路由（如果基座是history路由，子应用是hash路由，这一步可省略）

```
//  router/index.js

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
  // 👇 __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由
  history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
  mode: 'history',
  routes
})

export default router
```

设置**publicPath**

这一步借助了webpack的功能，避免子应用的静态资源使用相对地址时加载失败的情况，详情参考webpack文档 [publicPath](https://webpack.docschina.org/guides/public-path/#on-the-fly)

	如果子应用不是webpack构建的，这一步可以省略。

**步骤1:**在子应用src目录下创建名称为public-path.js的文件，并添加如下内容

```
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}

```

**步骤2:** 在子应用入口文件的最顶部main.js引入public-path.js

```
// main.js
import './public-path'

```

### 生命周期
	1. created:<micro-app>标签初始化后，加载资源前触发。
	2. beforemount:加载资源完成后，开始渲染之前触发。
	3. mounted:子应用渲染结束后触发。
	4. unmount:子应用卸载时触发。
	5. error:子应用渲染出错时触发，只有会导致渲染终止的错误才会触发此生命周期。
	
示例：

```
<!-- micro-first.vue -->
<template>
  <div>
    <h1>子应用micro-first</h1>
    <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3001/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/micro-first`
     -->
    <micro-app
      name="micro-first"
      url="http://localhost:3001/"
      baseroute="/micro-first"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
    ></micro-app>
  </div>
</template>

<script>
export default {
  name: "micro-first",
  methods: {
    handleCreate() {
      console.log("micro-app元素被创建");
    },

    handleBeforeMount() {
      console.log("micro-app即将被渲染");
    },

    handleMount() {
      console.log("micro-app已经渲染完成");
    },

    handleUnmount() {
      console.log("micro-app卸载了");
    },

    handleError() {
      console.log("micro-app加载出错了");
    },

  },
};
</script>


```


### 遇到问题汇总

#### 1、子应用的静态图片无法正常加载
