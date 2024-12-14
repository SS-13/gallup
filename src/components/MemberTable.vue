<template>
  <div class="member-table">
    <el-table :data="tableData" style="width: 100%" @sort-change="handleSort">
      <el-table-column fixed prop="name" label="姓名" width="75">
      </el-table-column>
      <el-table-column fixed prop="class" label="班级" width="35">
      </el-table-column>
      <!-- <el-table-column prop="class" label="班级" width="90"></el-table-column> -->
      <el-table-column label="优势1-5" width="250">
        <template slot-scope="scope">
          <el-tag
            v-for="(advantage, index) in scope.row.advantages1to5"
            :key="`advantage1_5_${index}`"
            size="small"
            :color="advantage.color"
            :style="{
              filter: 'grayscale(0.1)',
            }"
            >{{ advantage.CName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="优势6-10" width="250">
        <template slot-scope="scope">
          <el-tag
            v-for="(advantage, index) in scope.row.advantages6to10"
            :key="`advantage6_10_${index}`"
            size="small"
            :color="advantage.color"
            :style="{
              filter: 'grayscale(0.1)',
            }"
            >{{ advantage.CName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="优势30-34" width="250">
        <template slot-scope="scope">
          <el-tag
            v-for="(advantage, index) in scope.row.advantages30to34 || []"
            :key="`advantage30_34_${index}`"
            size="small"
            :color="advantage.color"
            :style="{
              filter: 'grayscale(0.1)',
            }"
            >{{ advantage.CName }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="关注指数" sortable>
        <template slot="header">
          <span>
            关注指数
            <el-tooltip
              class="item"
              effect="dark"
              content="基于前十中出现以下优势才干：'体谅', '伯乐', '包容', '责任', '审慎'；后五中出现 '成就'"
              placement="right"
            >
              <i class="el-icon-question question"></i>¸
            </el-tooltip>
          </span>
        </template>
        <template slot-scope="scope">
          <el-rate
            :value="calcRate(scope.row)"
            disabled
            :max="6"
            :colors="['#F88825', '#F88825', '#F88825']"
            :icon-classes="['el-icon-sunny', 'el-icon-sunny', 'el-icon-sunny']"
            void-icon-class="el-icon-sunny"
            disabled-void-icon-class="el-icon-sunny"
          >
          </el-rate>
        </template>
      </el-table-column>
      <!-- <el-table-column
          fixed
          prop="problem"
          label="期待解决的问题"
          width="280"
        >
        </el-table-column>
        <el-table-column fixed prop="want" label="想要收获" width="280">
        </el-table-column> -->
    </el-table>
    <el-pagination
      class="member-table__pagination"
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'MemberTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    handleSort: {
      type: Function,
      default: () => {},
    },
    calcRate: {
      type: Function,
      default: () => {},
    },
    handleSizeChange: {
      type: Function,
      default: () => {},
    },
    handleCurrentChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.member-table {
  position: relative;
  box-sizing: border-box;
  width: 100%;

  &__pagination {
    align-self: center;
  }
}
</style>
