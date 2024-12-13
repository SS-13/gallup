<template>
  <div class="four-quadrants">
    <div class="four-quadrants__left">
      <div class="classroom__left__status">
        <el-radio-group v-model="status" size="mini">
          <el-radio-button label="1to5">1-5</el-radio-button>
          <el-radio-button label="1to10">1-10</el-radio-button>
          <el-radio-button label="30to34">30-34</el-radio-button>
        </el-radio-group>

        <el-tooltip
          class="item"
          effect="dark"
          content="点击选中具体才干，再次点击取消选中"
          placement="right"
        >
          <i class="el-icon-question question"></i>¸
        </el-tooltip>
      </div>

      <field-container
        :fields="FIELDS_4"
        :advantages="ADVANTAGES_34"
        :openModal="openModal"
        :closeModal="closeModal"
        :currentSelectedAdvantage="currentSelectedAdvantage"
        :statistics="statistics"
        language="zh"
      ></field-container>
    </div>
    <div class="four-quadrants__right">
      <el-select
        class="classroom__right__select"
        size="mini"
        v-model="classroom"
        placeholder="请选择班级"
        @change="handleChange"
      >
        <el-option
          v-for="item in classOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';
import { ATTENTION_ANDICATOR } from '@/utils/tool';
import Field from '@/components/Field.vue';

export default {
  name: 'four-quadrants',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
