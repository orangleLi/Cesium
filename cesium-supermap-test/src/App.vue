<template>
  <div id="app">
    <TianDiTu msg="Welcome to Your Vue.js App"/>
    <!--<aircraft />-->
    <loadModel />
  </div>
</template>

<script>
import TianDiTu from './components/TianDiTu.vue'
// import loadModel from './components/loadModel.vue'
// import Aircraft from './components/Aircraft.vue'

export default {
  name: 'App',
  components: {
      TianDiTu,
      // loadModel,
      // Aircraft
  }
}
</script>

<style>
  html, body{
    margin: 0;
  }
</style>
