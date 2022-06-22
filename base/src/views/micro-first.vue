<!-- micro-first.vue -->
<template>
    <div>
        <h1>子应用micro-first</h1>
        <!-- 
      name(必传)：应用名称
      url(必传)：应用地址，会被自动补全为http://localhost:3001/index.html
      baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/micro-first`
     -->
        <micro-app name='micro-first' url='http://localhost:3001/' baseroute='/micro-first' @created='handleCreate'
            @beforemount='handleBeforeMount' @mounted='handleMount' @unmount='handleUnmount' @error='handleError'
            @datachange='handleDataChange'></micro-app>
    </div>
</template>

<script>
export default {
    name: 'micro-first',
    methods: {
        handleCreate() {
            console.log('child-vue3 创建了')
        },

        handleBeforeMount() {
            console.log('child-vue3 即将被渲染')
        },

        handleMount() {
            console.log('child-vue3 已经渲染完成')
        },

        handleUnmount() {
            console.log('child-vue3 卸载了')
        },

        handleError() {
            console.log('child-vue3 加载出错了')
        },

        handleDataChange(e) {
            console.log('来自子应用 child-vue3 的数据:', e.detail.data)
        },
    }
}
</script>