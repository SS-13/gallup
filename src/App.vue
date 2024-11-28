<template>
  <div id="app">
    <layout-container></layout-container>
  </div>
</template>

<script>
import Layout from './layouts/index.vue';

export default {
  name: 'App',
  components: {
    [Layout.name]: Layout,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style>
.el-header {
  padding: 0 !important;
}
</style>
