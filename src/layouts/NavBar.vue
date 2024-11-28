<template>
  <div class="nav-bar">
    <i :class="folderIcon" @click="handleClick" @keydown="handleClick"></i>
  </div>
</template>

<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  name: 'NavBar',
  data() {
    return {};
  },
  computed: {
    folderIcon() {
      return this.isCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold';
    },
  },
  methods: {
    handleClick() {
      this.$emit('changeCollapsed');
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  background-color: #2c3e50;
  color: white;

  > i {
    cursor: pointer;
  }
}
</style>
