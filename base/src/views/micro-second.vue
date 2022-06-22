<!-- micro-second.vue -->
<template>
  <div>
    <h1>子应用micro-second</h1>
    <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3002/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/micro-second`
     -->
    <micro-app name='micro-second' url='http://localhost:3002/' baseroute='/micro-second'></micro-app>
  </div>
</template>