<template>
  <div class="side-bar" :style="{ width: sideBarWidth }">
    <div class="icon">
      <img src="favicon-32x32.png" alt="" />
      <span v-if="!isCollapsed">allup</span>
    </div>
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
          >{{ item.descName }}</span
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
      return this.isCollapsed ? '60px' : '150px';
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // img {
    //   height: 100%;
    // }

    span {
      color: #ffffff;
      font-size: 20px;
      padding-left: 2px;
    }
  }

  .menu {
    padding: 20px 0;

    a {
      display: block;
      color: #ffffff;
      text-decoration: none;
      text-align: left;
      font-size: 16px;
      margin-bottom: 20px;

      span {
        padding-left: 4px;
      }
    }
  }

  .current-route {
    color: #1890ff;
  }
}
</style>
