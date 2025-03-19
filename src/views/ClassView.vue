<template>
  <div class="classroom">
    <div class="classroom__left">
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
        :totalAdvantagesNum="totalAdvantagesNum"
      ></field-container>
    </div>
    <div class="classroom__right">
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

      <member-table
        :tableData="tableData"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        :handle-sort="handleSort"
        :calc-rate="calcRate"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      ></member-table>
    </div>
  </div>
</template>

<script>
// import { TEACHING_ASSISTANT } from '@/utils/strengths';
import CLASSMATES_1_JSON from '@/utils/data/CLASSMATES_1.json';
import CLASSMATES_2_JSON from '@/utils/data/CLASSMATES_2.json';
import CLASSMATES_3_JSON from '@/utils/data/CLASSMATES_3.json';
import CLASSMATES_4_JSON from '@/utils/data/CLASSMATES_4.json';
import CLASSMATES_5_JSON from '@/utils/data/CLASSMATES_5.json';
import CLASSMATES_6_JSON from '@/utils/data/CLASSMATES_6.json';
import CLASSMATES_7_JSON from '@/utils/data/CLASSMATES_7.json';
import CLASSMATES_8_JSON from '@/utils/data/CLASSMATES_8.json';
import CLASSMATES_9_JSON from '@/utils/data/CLASSMATES_9.json';
import CLASSMATES_10_JSON from '@/utils/data/CLASSMATES_10.json';
// eslint-disable-next-line import/no-unresolved
// import CLASSMATES_DEMO_JSON from '@/utils/data/CLASSMATES_DEMO.json';
import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';
import { ATTENTION_ANDICATOR } from '@/utils/tool';
import Field from '@/components/Field.vue';
import MemberTable from '@/components/MemberTable.vue';

export default {
  name: 'ClassView',
  data() {
    return {
      FIELDS_4,
      ADVANTAGES_34,
      currentSelectedAdvantage: {},
      statistics1to5: {},
      statistics1to10: {},
      statistics30to34: {},
      totalAdvantagesNum: 0,
      status: '1to5',
      members: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      update: 0,
      classroom: '9',
      classOptions: [
        {
          value: 'all',
          label: '全部',
        },
        {
          value: '9',
          label: '优势探索1期',
        },
        {
          value: '10',
          label: '优势探索2期',
        },
        {
          value: '1',
          label: '1期',
        },
        {
          value: '2',
          label: '2期',
        },
        {
          value: '3',
          label: '3期',
        },
        {
          value: '4',
          label: '4期',
        },
        {
          value: '5',
          label: '5期',
        },
        {
          value: '6',
          label: '6期',
        },
        {
          value: '7',
          label: '7期',
        },
        {
          value: '8',
          label: '8期',
        },
      ],
      classes: {
        CLASSMATES_1_JSON,
        CLASSMATES_2_JSON,
        CLASSMATES_3_JSON,
        CLASSMATES_4_JSON,
        CLASSMATES_5_JSON,
        CLASSMATES_6_JSON,
        CLASSMATES_7_JSON,
        CLASSMATES_8_JSON,
        CLASSMATES_9_JSON,
        CLASSMATES_10_JSON,
        // CLASSMATES_DEMO_JSON,
      },
    };
  },
  components: {
    [Field.name]: Field,
    [MemberTable.name]: MemberTable,
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
      if (this.status === '30to34') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.totalAdvantagesNum = 5 * this.members.length;
        return this.statistics30to34;
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties, operator-linebreak
      this.totalAdvantagesNum =
        this.status === '1to5'
          ? 5 * this.members.length
          : 10 * this.members.length;
      return this.status === '1to5'
        ? this.statistics1to5
        : this.statistics1to10;
    },
  },
  methods: {
    handleSort({ order }) {
      // console.log(order);
      if (order === 'ascending') {
        this.members.sort((a, b) => a.rate - b.rate);
      } else if (order === 'descending') {
        this.members.sort((a, b) => b.rate - a.rate);
      } else {
        this.members.sort((a, b) => b.sortedIndex - a.sortedIndex);
      }

      this.update += 1;
    },
    calcRate(member) {
      // console.log(member, 'calcRate');
      const { advantages1to5, advantages6to10, advantages30to34 } = member;
      const advantage1to10 = [...advantages1to5, ...advantages6to10];

      let star = 0;

      advantage1to10.forEach((item) => {
        if (ATTENTION_ANDICATOR.includes(item.CName)) {
          star += 1;
        }
      });

      advantages30to34.forEach((item) => {
        if (['成就'].includes(item.CName)) {
          star += 1;
        }
      });

      return star;
    },
    handleChange() {
      this.handleData();
    },
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
      const statistics30to34 = {};

      let classroom = [];

      if (this.classroom === 'all') {
        classroom = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= this.classOptions.length - 1; i++) {
          classroom = [...classroom, ...this.classes[`CLASSMATES_${i}_JSON`]];
        }
      } else {
        classroom = this.classes[`CLASSMATES_${this.classroom}_JSON`];
      }

      this.members = classroom.map((item, index) => {
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

            // if (!statistics30to34[temp.EName]) {
            //   statistics30to34[temp.EName] = 0;
            // }
            // statistics30to34[temp.EName] += 1;

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

        const advantages30to34 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 30; i <= 34; i++) {
          if (item[`advantage${i}`]) {
            const temp = item[`advantage${i}`];
            if (!statistics30to34[temp.EName]) {
              statistics30to34[temp.EName] = 0;
            }
            statistics30to34[temp.EName] += 1;
            advantages30to34.push({
              ...item[`advantage${i}`],
            });
          }
        }

        return {
          sortedIndex: index + 1,
          ...item,
          advantages1to5,
          advantages6to10,
          advantages30to34,
          rate: this.calcRate({
            advantages1to5,
            advantages6to10,
            advantages30to34,
          }),
        };
        // eslint-disable-next-line comma-dangle
      });

      // console.log(statistics1to5, statistics1to10);
      this.statistics1to5 = statistics1to5;
      this.statistics1to10 = statistics1to10;
      this.statistics30to34 = statistics30to34;

      this.update += 1;
    },
    resetPageInfo() {
      this.currentPage = 1;
    },
    filterMembers() {
      let filteredMembers = this.members;

      // console.log(this.status, 'status');

      if (this.currentSelectedAdvantage.EName) {
        filteredMembers = this.members.filter((item) => {
          // console.log(item, '----');
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
          } else if (this.status === '1to10') {
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
          } else if (this.status === '30to34') {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < item.advantages30to34.length; i++) {
              const temp = item.advantages30to34[i];
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
      // console.log(
      //   this.currentSelectedAdvantage,
      //   this.members,
      //   // eslint-disable-next-line comma-dangle
      //   'currentSelectedAdvantage'
      // );
      const filteredMembers = this.filterMembers();
      // console.log(filteredMembers);
      this.total = filteredMembers.length;

      const startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = startIndex + this.pageSize;
      if (endIndex > filteredMembers.length) {
        endIndex = filteredMembers.length;
      }
      this.tableData = filteredMembers.slice(startIndex, endIndex);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.update += 1;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.update += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
<style lang="scss" >
.classroom {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  &__left {
    width: 31%;
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
    width: 69%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    // padding: 38px 0 0 0;

    &__select {
      width: 174px;
      margin-bottom: 10px;
    }

    &__pagination {
      align-self: center;
    }
  }

  .el-tag {
    color: #fff;
    margin-right: 2px;
  }
}
</style>
