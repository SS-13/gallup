<template>
  <div class="about-us">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="90">
      </el-table-column>
      <el-table-column prop="class" label="班级" width="90"></el-table-column>
      <el-table-column label="优势1-5" width="280">
        <template slot-scope="scope">
          <el-tag
            v-for="(advantage, index) in scope.row.advantages1to5"
            :key="`advantage1_5_${index}`"
            size="small"
            :color="advantage.color"
            >{{ advantage.CName }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="优势6-10">
        <template slot-scope="scope">
          <el-tag
            v-for="(advantage, index) in scope.row.advantages6to10"
            :key="`advantage6_10_${index}`"
            size="small"
            :color="advantage.color"
            >{{ advantage.CName }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
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
// import { TEACHING_ASSISTANT } from '@/utils/strengths';
import TEACHING_ASSISTANT_JSON from '@/utils/data/TEACHING_ASSISTANT.json';

export default {
  name: 'AboutView',
  data() {
    return {
      members: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      update: 0,
    };
  },
  mounted() {
    this.handleData();
  },
  watch: {
    update() {
      this.handleCurrentPageData();
    },
  },
  methods: {
    handleData() {
      this.members = TEACHING_ASSISTANT_JSON.map((item, index) => {
        const advantages1to5 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= 5; i++) {
          if (item[`advantage${i}`]) {
            advantages1to5.push({
              ...item[`advantage${i}`],
            });
          }
        }
        const advantages6to10 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 6; i <= 10; i++) {
          if (item[`advantage${i}`]) {
            advantages6to10.push({
              ...item[`advantage${i}`],
            });
          }
        }

        return {
          sortedIndex: index + 1,
          ...item,
          advantages1to5,
          advantages6to10,
        };
      });

      this.total = this.members.length;
      this.update += 1;
    },
    handleCurrentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      if (endIndex > this.members.length) {
        endIndex = this.members.length;
      }
      this.tableData = this.members.slice(startIndex, endIndex);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.update += 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.update += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss" >
.about-us {
  .el-tag {
    color: #fff;
    margin-right: 2px;
  }
}
</style>
