<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="子应用 -- Vue@3.x"/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue' // @ is an alias to /src

export default ({
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    console.log("2222232423423423")
  }
})
</script>