<template>
  <div class="hello">
    <button @click="onHandle('/micro-first')">micro_first</button>
    <button @click="onHandle('/micro-second')">micro_second</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    onHandle(path) {
         this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
