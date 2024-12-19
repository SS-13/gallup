<template>
  <div class="advantage-container">
    <div
      class="advantage-container__item"
      :class="{
        'advantage-container__item--empty':
          hasStatistics && !statistics[advantage.EName],
      }"
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
        <h3 v-if="showLang('zh')">{{ advantage.CName }}</h3>
        <p v-if="showLang('en')">{{ advantage.EName }}</p>
      </div>
      <div class="statistics" v-if="hasStatistics">
        <span>{{ statistics[advantage.EName] || 0 }}</span>
      </div>

      <img
        v-if="hasStatistics && isFirst(advantage)"
        class="first"
        :src="crownImg"
        alt="crown"
      />
    </div>
  </div>
</template>

<script>
import crownImg from '@/assets/images/crown.png';

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
      default: () => ({}),
    },
    statistics: {
      type: Object,
      default: () => ({}),
    },
    hasStatistics: {
      type: Boolean,
      default: false,
    },
    totalAdvantagesNum: {
      type: Number,
      default: 0,
    },
    maxNum: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    language: {
      type: String,
      default: 'all',
    },
  },
  name: 'AdvantageContainer',
  data() {
    return {
      crownImg,
    };
  },
  computed: {
    showLang() {
      return (lang) => {
        if (this.language === 'all') {
          return true;
        }

        return this.language === lang;
      };
    },
    isFirst() {
      return (advantage) => this.statistics[advantage.EName] === this.maxNum;
    },
  },
  mounted() {
    console.log(this.advantages, 'this.advantages');
  },
  methods: {
    handleItemClick(params) {
      if (this.currentSelectedAdvantage.EName === params.EName) {
        this.closeModal();
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.hasStatistics) {
          // eslint-disable-next-line no-unused-expressions
          this.statistics[params.EName] && this.openModal(params);
        } else {
          this.openModal(params);
        }
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

    &:hover {
      color: #fff !important;
    }

    &--empty {
      opacity: 0.4;

      &:hover {
        color: #2c3e50 !important;
        cursor: not-allowed;
      }
    }

    div {
      > h3,
      > p {
        //   color: #ffffff;
        padding: 0;
        margin: 0;
        text-align: center;
      }
    }
    .content {
      // flex: 1;
      box-sizing: border-box;
      width: 80%;
      // border: 1px solid #333;
      text-align: center;
    }

    .statistics {
      width: 20%;
      height: 100%;
      text-align: center;
      padding-right: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    .first {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
