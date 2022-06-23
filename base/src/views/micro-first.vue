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
      @datachange="handleDataChange"
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

    handleDataChange(e) {
      console.log("来自子应用的数据:", e.detail.data);
    },
  },
};
</script>