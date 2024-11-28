<template>
  <div class="field-container">
    <div
      class="field-container__item"
      v-for="(field, index) in fields"
      :key="index"
      :style="{
        backgroundColor: field.color,
      }"
      :data-ename="field.fieldEName"
    >
      <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
        :content="field.desc"
      >
        <div slot="reference">
          <h3>{{ field.fieldCName }}</h3>
          <p>{{ field.fieldEName }}</p>
        </div>
      </el-popover>

      <advantage-container
        :advantages="advantagesByField(field.fieldEName)"
        :color="field.color"
        :openModal="openModal"
        :closeModal="closeModal"
        :currentSelectedAdvantage="currentSelectedAdvantage"
        :statistics="statistics"
      />

      <div v-if="hasStatistics" class="sum">
        {{ calcSumByField(field.fieldEName) }}
      </div>
    </div>
  </div>
</template>

<script>
import Advantage from './Advantage.vue';

export default {
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    advantages: {
      type: Array,
      default: () => [],
    },
    openModal: {
      type: Function,
      default: () => () => {},
    },
    closeModal: {
      type: Function,
      default: () => () => {},
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
  name: 'FieldContainer',
  components: {
    [Advantage.name]: Advantage,
  },
  data() {
    return {};
  },
  computed: {
    advantagesByField() {
      //   const advantages = JSON.parse(JSON.stringify(this.advantages));
      return (fieldEName) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        this.advantages.filter((item) => item.Field === fieldEName);
    },
    hasStatistics() {
      // console.log(this.statistics, ' this.statistics');
      return Object.keys(this.statistics || {}).length > 0;
    },
  },
  methods: {
    calcSumByField(fieldEName) {
      const advantagesInField = this.advantages.filter(
        // eslint-disable-next-line comma-dangle
        (item) => item.Field === fieldEName
      );

      return advantagesInField.reduce((sum, item) => {
        // 检查对象b中是否有当前元素的EName属性，如果有，则累加其值
        if (this.statistics[item.EName]) {
          return sum + this.statistics[item.EName];
        }
        // 如果没有，直接返回当前的sum
        return sum;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.field-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  &__item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 22%;
    min-height: 80px;
    font-size: 16px;
    padding: 10px 0;
    cursor: pointer;
    filter: grayscale(0.2);

    h3,
    p {
      color: #ffffff;
      padding: 0;
      margin: 0;
      font-weight: bold;
    }

    > p {
      margin-bottom: 10px;
    }

    .sum {
      padding: 10px 0 0 0;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
