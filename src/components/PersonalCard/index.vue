<template>
  <el-card class="personal-card" shadow="hover">
    <div slot="header" class="personal-card__header">
      <span style="flex: 1; text-align: left" v-if="!isEdit"
        >{{ personInfo.name }}
        <i
          v-if="editable"
          class="el-icon-edit"
          @click="isEdit = true"
          @keydown="isEdit = true"
        ></i>
      </span>
      <span v-else style="flex: 1; text-align: left">
        <el-input
          v-model="name"
          placeholder="请输入内容"
          size="mini"
          class="personal-card__header__input"
        ></el-input>
        <i
          class="el-icon-check"
          @click="handleNameEdit('save')"
          @keydown="handleNameEdit('save')"
        ></i>
        <i
          class="el-icon-close"
          @click="handleNameEdit('close')"
          @keydown="handleNameEdit('close')"
        ></i>
      </span>

      <el-popover v-if="editable" placement="top-start" trigger="hover">
        <i class="el-icon-setting" slot="reference"></i>
        <div class="personal-card__header__setting">
          <el-button style="padding: 3px 0" type="text" icon="el-icon-edit"
            >写报告</el-button
          >
        </div>
      </el-popover>

      <el-popconfirm
        v-if="editable"
        title="确定删除该用户"
        @confirm="handleCardDelete"
      >
        <!-- <el-button slot="reference">删除</el-button> -->
        <i class="el-icon-delete" slot="reference"></i>
      </el-popconfirm>
    </div>
    <div class="personal-card__content">
      <el-popover
        placement="right"
        title="前五才干详情"
        width="600"
        height="600"
        trigger="click"
      >
        <div>
          <el-tabs tab-position="left">
            <el-tab-pane
              :label="advantage.CName"
              v-for="(advantage, idx) in advantage1to5"
              :key="`advantage_${idx}`"
            >
              <div class="personal-card__content__desc">
                <p
                  :style="{ backgroundColor: hexToRgb(advantage.color, 0.4) }"
                  v-for="(desc, jdx) in description[idx].splitDesc"
                  :key="`desc_${jdx}`"
                >
                  {{ desc }}
                </p>
                <h3>{{ description[idx].reason }}</h3>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div slot="reference" class="personal-card__content__1to5">
          <div class="label">1 - 5 :</div>
          <el-tag
            v-for="(advantage, index) in advantage1to5"
            :key="`advantage1_5_${index}`"
            size="small"
            :color="advantage.color"
            :style="{
              filter: 'grayscale(0.1)',
              color: '#ffffff',
            }"
            >{{ advantage.CName }}</el-tag
          >
        </div>
      </el-popover>

      <div class="personal-card__content__6to10">
        <div class="label">6 - 10 :</div>
        <el-tag
          v-for="(advantage, index) in advantage6to10"
          :key="`advantage6_10_${index}`"
          size="small"
          :color="advantage.color"
          :style="{
            filter: 'grayscale(0.1)',
            color: '#ffffff',
          }"
          >{{ advantage.CName }}</el-tag
        >
      </div>
      <div class="personal-card__content__11to16">
        <div class="label">11 - 16 :</div>
        <div class="tags">
          <el-tag
            v-for="(advantage, index) in advantage11to16"
            :key="`advantage11_16_${index}`"
            size="small"
            :color="advantage.color"
            :style="{
              filter: 'grayscale(0.1)',
              color: '#ffffff',
            }"
            >{{ advantage.CName }}</el-tag
          >
        </div>
      </div>
      <el-divider></el-divider>
      <div class="personal-card__content__30to34">
        <div class="label">30 - 34 :</div>
        <el-tag
          v-for="(advantage, index) in advantage30to34"
          :key="`advantage30_34_${index}`"
          size="small"
          :color="advantage.color"
          :style="{
            filter: 'grayscale(0.1)',
            color: '#ffffff',
          }"
          >{{ advantage.CName }}</el-tag
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import { findAdvantage } from '@/utils/tool';

export default {
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    personInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  name: 'PersonalCard',
  data() {
    return {
      advantage1to5: [],
      advantage6to10: [],
      advantage11to16: [],
      advantage30to34: [],
      strengthsMap: {},
      isEdit: false,
      name: '',
      description: [],
    };
  },
  mounted() {
    console.log(this.personInfo);
    this.handlePersonInfo();
    this.name = this.personInfo.name;
  },
  methods: {
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
    handleNameEdit(type) {
      if (type === 'save') {
        this.$emit('edit', {
          id: this.personInfo.id,
          name: this.name,
        });
      } else {
        this.name = this.personInfo.name;
      }
      this.isEdit = false;
    },
    handleCardDelete() {
      console.log(this.personInfo, 'delete card');
      this.$emit('delete', this.personInfo.id);
    },
    handlePersonInfo() {
      console.log(
        '%c [ this.personInfo ]-164',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.personInfo,
      );
      const { talentOrders, description } = this.personInfo;
      this.description = description;
      const advantage1to5 = [];
      const advantage6to10 = [];
      const advantage11to16 = [];
      const advantage30to34 = [];
      const strengthsMap = {};

      talentOrders.forEach((p) => {
        const { key, value } = p;
        const advantage = findAdvantage(value) || {};
        if (key <= 5) {
          advantage1to5.push(advantage);
        } else if (key <= 10) {
          advantage6to10.push(advantage);
        } else if (key <= 16) {
          advantage11to16.push(advantage);
        } else if (key >= 30 && key <= 34) {
          advantage30to34.push(advantage);
        }
        strengthsMap[advantage.EName] = 1;
      });

      console.log(advantage1to5, 'advantage1to5');

      this.advantage1to5 = advantage1to5;
      this.advantage6to10 = advantage6to10;
      this.advantage11to16 = advantage11to16;
      this.advantage30to34 = advantage30to34;
      this.strengthsMap = strengthsMap;
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-card {
  position: relative;
  box-sizing: border-box;
  width: 320px;
  margin: 0 10px 10px 0;

  &__header {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    > i {
      margin-left: 10px;
      cursor: pointer;
    }

    &__input {
      width: 160px;
    }

    // &__setting {
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: flex-start;
    //   align-items: flex-start;
    // }
  }

  &__content {
    position: relative;
    box-sizing: border-box;
    padding: 0 10px 10px 10px;

    &__1to5,
    &__6to10,
    &__11to16,
    &__30to34 {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 10px;

      > .label {
        width: 60px;
        text-align: right;
      }

      .tags {
        flex: 1;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    &__1to5 {
      box-sizing: border-box;
      cursor: pointer;
      padding: 4px 0px;
      border: 1px solid transparent;
      border-radius: 4px;
      &:hover {
        background-color: #f5f7fa;
        border: 1px dashed #2c3e50;
        border-radius: 4px;
      }
    }

    &__desc {
      width: 100%;
      p {
        margin: 0 0 3px 0;
        padding: 4px 10px;
        font-size: 14px;
        line-height: 1.3;
        text-align: justify;
        text-align-last: left;
        color: #2c3e50;
      }
      h3 {
        margin: 0;
        padding: 4px 10px;
        text-align: justify;
        text-align-last: left;
        color: #2c3e50;
      }
    }
  }
}
</style>
<style lang="scss">
.personal-card {
  .el-card__body {
    padding: 0 !important;
  }

  .el-icon-edit,
  .el-icon-close,
  .el-icon-check {
    cursor: pointer;
  }
  .el-icon-check {
    color: #45b076;
  }
  .el-icon-delete,
  .el-icon-close {
    color: #f56c6c;
  }
  .el-popover__reference-wrapper {
    cursor: pointer;
    margin-left: 6px;
  }
}
</style>
