<template>
  <div class="team-view">
    <div class="team-view__toolbar">
      <el-button
        type="primary"
        icon="el-icon-refresh"
        circle
        @click="showTransferDialog = true"
      ></el-button>
    </div>

    <div class="team-view__content">
      <el-tabs class="team-view__content__tabs" type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 成员卡片</span>

          <div class="team-view__content__tabs__cardlist">
            <personal-card
              v-for="(item, index) in teamList"
              :key="index"
              :person-info="item"
              :editable="false"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="团队地图" class="team__pane">
          <div class="team-view__content__tabs__maps">
            <div class="team-left">
              <el-radio-group
                v-if="teamList.length > 0"
                v-model="status"
                size="mini"
              >
                <el-radio-button label="1to5">1-5</el-radio-button>
                <el-radio-button label="1to10">1-10</el-radio-button>
                <el-radio-button label="30to34">30-34</el-radio-button>
              </el-radio-group>

              <field-container
                v-if="teamList.length > 0"
                :fields="FIELDS_4"
                :advantages="ADVANTAGES_34"
                :openModal="openModal"
                :closeModal="closeModal"
                :currentSelectedAdvantage="currentSelectedAdvantage"
                :statistics="statistics"
                language="zh"
                :totalAdvantagesNum="totalAdvantagesNum"
              />
            </div>
            <div class="team-right">
              <member-table
                v-if="teamList.length > 0"
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
        </el-tab-pane>
        <!-- <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
      </el-tabs>
    </div>

    <el-dialog
      title="选择团队成员"
      :visible.sync="showTransferDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-transfer
        filterable
        :titles="['人才库', '当前团队分析']"
        :filter-method="filterMethod"
        filter-placeholder="请输入名称"
        v-model="value"
        :data="data"
      >
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTransferDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleTeamTransfer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCardList } from '@/utils/cache';
import ADVANTAGES_34 from '@/utils/data/ADVANTAGES_34.json';
import FIELDS_4 from '@/utils/data/FIELDS_4.json';
import { findAdvantage, ATTENTION_ANDICATOR } from '@/utils/tool';
import Field from '@/components/Field.vue';
import PersonalCard from '@/components/PersonalCard/index.vue';
import MemberTable from '@/components/MemberTable.vue';

export default {
  nanme: 'TeamView',
  components: {
    PersonalCard,
    [Field.name]: Field,
    [MemberTable.name]: MemberTable,
  },
  data() {
    return {
      FIELDS_4,
      ADVANTAGES_34,
      status: '1to5',
      teamList: [],
      cardlist: Object.freeze(getCardList()),
      showTransferDialog: false,
      data: [],
      value: [],
      currentSelectedAdvantage: {},
      statistics1to5: {},
      statistics1to10: {},
      statistics30to34: {},
      totalAdvantagesNum: 0,
      members: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      update: 0,
    };
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
        this.totalAdvantagesNum = 5 * this.teamList.length;
        return this.statistics30to34;
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties, operator-linebreak
      this.totalAdvantagesNum =
        this.status === '1to5'
          ? 5 * this.teamList.length
          : 10 * this.teamList.length;

      return this.status === '1to5'
        ? this.statistics1to5
        : this.statistics1to10;
    },
  },
  mounted() {
    this.data = this.cardlist.map((item) => ({
      key: item.id,
      label: item.name,
    }));
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
    resetPageInfo() {
      this.currentPage = 1;
    },
    handleClose(done) {
      console.log('done', done);
      done();
    },
    filterMethod(query) {
      return this.data.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1,
      );
    },
    handleTeamTransfer() {
      console.log('teamList', this.value);
      const { value } = this;
      this.showTransferDialog = false;
      const teamList = this.cardlist.filter((item) => {
        const { id } = item;
        return value.includes(id);
      });

      const statistics1to5 = {};
      const statistics1to10 = {};
      const statistics30to34 = {};

      teamList.forEach((item) => {
        const { talentOrders } = item;
        talentOrders.forEach((order) => {
          const { key } = order;
          // console.log(order.value, 'order.value');

          const advantageItem = findAdvantage(order.value);
          // console.log(advantageItem, 'advantageItem');

          if (['1', '2', '3', '4', '5'].includes(key)) {
            if (!statistics1to5[advantageItem.EName]) {
              statistics1to5[advantageItem.EName] = 0;
            }
            statistics1to5[advantageItem.EName] += 1;

            if (!statistics1to10[advantageItem.EName]) {
              statistics1to10[advantageItem.EName] = 0;
            }
            statistics1to10[advantageItem.EName] += 1;
          }

          if (['6', '7', '8', '9', '10'].includes(key)) {
            if (!statistics1to10[advantageItem.EName]) {
              statistics1to10[advantageItem.EName] = 0;
            }
            statistics1to10[advantageItem.EName] += 1;
          }

          if (['30', '31', '32', '33', '34'].includes(key)) {
            if (!statistics30to34[advantageItem.EName]) {
              statistics30to34[advantageItem.EName] = 0;
            }
            statistics30to34[advantageItem.EName] += 1;
          }
        });
      });

      this.statistics1to5 = statistics1to5;
      this.statistics1to10 = statistics1to10;
      this.statistics30to34 = statistics30to34;

      console.log(this.statistics1to5, 'this.statistics1to5');
      console.log(this.statistics1to10, 'this.statistics1to10');
      console.log(this.statistics30to34, 'this.statistics30to34');

      this.teamList = teamList;
      console.log(this.teamList, 'this.teamList');
      this.handleMemberList(teamList);
    },
    handleMemberList(list) {
      // const { teamList } = this;
      const members = list.map((member) => {
        const { id, name, talentOrders } = member;
        const advantages = {};
        const range = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '30',
          '31',
          '32',
          '33',
          '34',
        ];
        talentOrders.forEach((order) => {
          const { key, value } = order;
          if (range.includes(key)) {
            const temp = findAdvantage(value);
            advantages[`advantage${key}`] = temp;
          }
        });

        console.log(advantages, 'advantages');

        const advantages1to5 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= 5; i++) {
          if (advantages[`advantage${i}`]) {
            const temp = advantages[`advantage${i}`];

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
          if (advantages[`advantage${i}`]) {
            const temp = advantages[`advantage${i}`];

            advantages6to10.push({
              ...temp,
            });
          }
        }

        const advantages30to34 = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 30; i <= 34; i++) {
          if (advantages[`advantage${i}`]) {
            const temp = advantages[`advantage${i}`];
            advantages30to34.push({
              ...temp,
            });
          }
        }

        return {
          id,
          name,
          advantages1to5,
          advantages6to10,
          advantages30to34,
          rate: this.calcRate({
            advantages1to5,
            advantages6to10,
            advantages30to34,
          }),
          // ...advantages,
        };
      });

      console.log(members, 'members');
      this.members = members;
      this.update += 1;
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
.team-view {
  position: relative;
  box-sizing: border-box;

  &__toolbar {
    box-sizing: border-box;
    position: absolute;
    top: 4px;
    right: 20px;
    // width: 100px;
    // height: 60px;
    // border: 1px dashed #d9d9d9;
    padding: 10px;
    z-index: 10;
  }

  &__content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    // height: 100%;
    // padding-top: 80px;

    &__tabs {
      position: relative;
      box-sizing: border-box;
      width: 100%;

      &__cardlist {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
      }

      &__maps {
        position: relative;
        box-sizing: border-box;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .team-left {
          width: 31%;
        }
        .team-right {
          width: 69%;
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.team-view {
  .el-transfer-panel__header,
  .el-transfer-panel__item {
    text-align: left;
  }

  .el-tabs__item {
  }
}
</style>
