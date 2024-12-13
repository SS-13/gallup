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
        <el-tab-pane label="四象限分析">四象限分析</el-tab-pane>
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
import PersonalCard from '@/components/PersonalCard/index.vue';

export default {
  nanme: 'TeamView',
  components: {
    PersonalCard,
  },
  data() {
    return {
      teamList: [],
      cardlist: Object.freeze(getCardList()),
      showTransferDialog: false,
      data: [],
      value: [],
    };
  },
  mounted() {
    this.data = this.cardlist.map((item) => ({
      key: item.id,
      label: item.name,
    }));
  },
  methods: {
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
      this.teamList = this.cardlist.filter((item) => {
        const { id } = item;
        return value.includes(id);
      });
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
}
</style>
