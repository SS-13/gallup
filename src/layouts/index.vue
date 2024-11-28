<template>
  <div>
    <el-container>
      <el-aside><side-bar :isCollapsed="isCollapsed" /></el-aside>

      <el-container>
        <el-header
          ><nav-bar
            :isCollapsed="isCollapsed"
            @changeCollapsed="changeCollapse"
        /></el-header>
        <el-main class="main"> <router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBar from './SideBar.vue';
import NavBar from './NavBar.vue';

export default {
  name: 'LayoutContainer',
  components: {
    [SideBar.name]: SideBar,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss">
.main {
  // height: calc(100vh - 40px);
  background-color: #f2f6fc;
}
</style>

  <style>
.el-header {
  padding: 0 !important;
}

.el-aside {
  width: auto !important;
}
</style>
