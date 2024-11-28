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
        :currentSelectedAdvantage="currentSelectedAdvantage"
      />
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
    currentSelectedAdvantage: {
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
  }
}
</style>
