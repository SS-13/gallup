<template>
  <div class="side-bar" :style="{ width: sideBarWidth }">
    <div class="icon"><img src="/favicon-32x32.png" alt="" /></div>
    <div class="menu">
      <router-link v-for="item in menuItems" :key="item.name" :to="item.path">
        <i
          :class="{
            [item.icon]: true,
            'current-route': $route.name === item.name,
          }"
        ></i>
        <span
          v-if="!isCollapsed"
          :class="{
            'current-route': $route.name === item.name,
          }"
          >{{ item.name }}</span
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { routes } from '../router/index';

export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  name: 'SideBar',
  data() {
    return {
      menuItems: routes,
    };
  },
  computed: {
    sideBarWidth() {
      return this.isCollapsed ? '60px' : '200px';
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  // width: 100%;
  // padding: 20px;
  height: 100vh;
  background-color: #2c3e50;

  .icon {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // img {
    //   height: 100%;
    // }
  }

  .menu {
    padding: 20px;

    a {
      display: block;
      color: #ffffff;
      text-decoration: none;
      font-size: 26px;
    }
  }

  .current-route {
    color: #1890ff;
  }
}
</style>
