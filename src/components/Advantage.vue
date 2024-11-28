<template>
  <div class="advantage-container">
    <div
      class="advantage-container__item"
      v-for="(advantage, index) in advantages"
      :key="index"
      :style="{
        backgroundColor: hexToRgb(color, 0.4),
        color:
          advantage.EName === currentSelectedAdvantage.EName
            ? '#fff'
            : '#2c3e50',
      }"
      @click="handleItemClick({ ...advantage, color })"
      @keydown="handleItemClick({ ...advantage, color })"
    >
      <div class="content">
        <h3>{{ advantage.CName }}</h3>
        <p>{{ advantage.EName }}</p>
      </div>
      <div class="statistics" v-if="hasStatistics">
        <span>{{ statistics[advantage.EName] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    advantages: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '#fff',
    },
    openModal: {
      type: Function,
      default: () => {},
    },
    closeModal: {
      type: Function,
      default: () => {},
    },
    currentSelectedAdvantage: {
      type: Object,
      default: () => {},
    },
    statistics: {
      type: Object,
      default: () => {},
    },
  },
  name: 'AdvantageContainer',
  data() {
    return {};
  },
  computed: {
    hasStatistics() {
      // console.log(this.statistics, ' this.statistics');
      return Object.keys(this.statistics || {}).length > 0;
    },
  },
  mounted() {
    console.log(this.advantages);
  },
  methods: {
    handleItemClick(params) {
      if (this.currentSelectedAdvantage.EName === params.EName) {
        this.closeModal();
      } else {
        this.openModal(params);
      }
    },
    hexToRgb(color, opacity = 1) {
      // 去除#符号
      const hex = color.replace('#', '');
      // 确保是6位16进制数
      if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
      }
      // 将16进制转换为RGB
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgb(${r}, ${g}, ${b}, ${opacity})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.advantage-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;

  &__item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
    border-top: 1px solid #fff;
    // opacity: 0.8;
    cursor: pointer;

    div {
      > h3,
      > p {
        //   color: #ffffff;
        padding: 0;
        margin: 0;
      }
    }
    .content {
      flex: 1;
    }

    .statistics {
      width: auto;
      height: 100%;
      text-align: center;
      padding-right: 20px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  &__item:hover {
    color: #fff !important;
  }
}
</style>
