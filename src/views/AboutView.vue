<template>
  <div class="about-us">
    <div class="about-us__left">
      <div class="about-us__left__status">
        <el-radio-group v-model="status" size="mini">
          <el-radio-button label="1to5">1-5</el-radio-button>
          <el-radio-button label="1to10">1-10</el-radio-button>
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
      ></field-container>
    </div>
    <div class="about-us__right">
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
              :style="{
                filter: 'grayscale(0.1)',
              }"
              >{{ advantage.CName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="优势6-10" width="280">
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
  </div>
</template>

<script>
// import { TEACHING_ASSISTANT } from '@/utils/strengths';
import TEACHING_ASSISTANT_JSON from '@/utils/data/TEACHING_ASSISTANT.json';
import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';
import Field from '@/components/Field.vue';

export default {
  name: 'AboutView',
  data() {
    return {
      FIELDS_4,
      ADVANTAGES_34,
      currentSelectedAdvantage: {},
      statistics1to5: {},
      statistics1to10: {},
      status: '1to5',
      members: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      update: 0,
    };
  },
  components: {
    [Field.name]: Field,
  },
  mounted() {
    this.handleData();
  },
  watch: {
    update() {
      this.handleCurrentPageData();
    },
    status(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.resetPageInfo();
        this.update += 1;
      }
    },
  },
  computed: {
    statistics() {
      return this.status === '1to5'
        ? this.statistics1to5
        : this.statistics1to10;
    },
  },
  methods: {
    closeModal() {
      this.currentSelectedAdvantage = {};
      this.resetPageInfo();
      this.update += 1;
    },
    openModal(advantage) {
      this.currentSelectedAdvantage = advantage;
      this.resetPageInfo();
      this.update += 1;
    },
    handleData() {
      const statistics1to5 = {};
      const statistics1to10 = {};

      this.members = TEACHING_ASSISTANT_JSON.map((item, index) => {
        const advantages1to5 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= 5; i++) {
          if (item[`advantage${i}`]) {
            const temp = item[`advantage${i}`];
            if (!statistics1to5[temp.EName]) {
              statistics1to5[temp.EName] = 0;
            }
            statistics1to5[temp.EName] += 1;

            if (!statistics1to10[temp.EName]) {
              statistics1to10[temp.EName] = 0;
            }
            statistics1to10[temp.EName] += 1;

            advantages1to5.push({
              ...temp,
            });
          }
        }
        const advantages6to10 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 6; i <= 10; i++) {
          if (item[`advantage${i}`]) {
            const temp = item[`advantage${i}`];
            if (!statistics1to10[temp.EName]) {
              statistics1to10[temp.EName] = 0;
            }
            statistics1to10[temp.EName] += 1;
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

      console.log(statistics1to5, statistics1to10);
      this.statistics1to5 = statistics1to5;
      this.statistics1to10 = statistics1to10;

      this.update += 1;
    },
    resetPageInfo() {
      this.currentPage = 1;
    },
    filterMembers() {
      let filteredMembers = this.members;

      console.log(this.status, 'status');

      if (this.currentSelectedAdvantage.EName) {
        filteredMembers = this.members.filter((item) => {
          console.log(item, '----');
          let flag = false;
          if (this.status === '1to5') {
            // item.advantages1to5
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < item.advantages1to5.length; i++) {
              const temp = item.advantages1to5[i];
              if (temp.EName === this.currentSelectedAdvantage.EName) {
                flag = true;
                break;
              }
            }
          } else {
            const combinedAdvantages1to10 = [
              ...item.advantages1to5,
              ...item.advantages6to10,
            ];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < combinedAdvantages1to10.length; i++) {
              const temp = combinedAdvantages1to10[i];
              if (temp.EName === this.currentSelectedAdvantage.EName) {
                flag = true;
                break;
              }
            }
          }

          return flag;
        });
      }
      return filteredMembers;
    },
    handleCurrentPageData() {
      console.log(
        this.currentSelectedAdvantage,
        this.members,
        // eslint-disable-next-line comma-dangle
        'currentSelectedAdvantage'
      );
      const filteredMembers = this.filterMembers();
      console.log(filteredMembers);
      this.total = filteredMembers.length;

      const startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      if (endIndex > filteredMembers.length) {
        endIndex = filteredMembers.length;
      }
      this.tableData = filteredMembers.slice(startIndex, endIndex);
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
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  &__left {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &__status {
      margin: 0 0 10px 6%;
    }

    .question {
      vertical-align: middle;
      font-size: 20px;
      margin-left: 4px;
      color: #2c3e50;
      cursor: pointer;
    }
  }
  &__right {
    width: 50%;
    position: relative;
    box-sizing: border-box;
    padding: 38px 0 0 0;
  }

  .el-tag {
    color: #fff;
    margin-right: 2px;
  }
}
</style>
