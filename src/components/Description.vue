<template>
  <div class="descripton-container">
    <el-descriptions
      v-if="descStatus === 'simple'"
      :column="1"
      direction="horizontal"
      labelClassName="descripton-container__label"
      contentClassName="descripton-container__content"
      border
    >
      <template slot="title">
        <div>
          <div
            :style="{
              color: advantage.color,
              textAlign: 'left',
              fontSize: '20px',
              fontWeight: 'bold',
            }"
          >
            {{ detail.CName }}
          </div>
          <div :style="{ fontSize: '14px', textAlign: 'left' }">
            {{ detail.info }}
          </div>
        </div>
      </template>
      <template slot="extra">
        <el-radio-group v-model="descStatus" size="mini">
          <el-radio-button label="simple">简</el-radio-button>
          <el-radio-button label="detail">繁</el-radio-button>
        </el-radio-group>
      </template>
      <el-descriptions-item label="我是(状态)">{{
        detail.status
      }}</el-descriptions-item>
      <el-descriptions-item label="我会(行为)">{{
        detail.behavior
      }}</el-descriptions-item>
      <el-descriptions-item label="我能带来(贡献)">{{
        detail.contribution
      }}</el-descriptions-item>
      <el-descriptions-item label="我需要(需求)">{{
        detail.requirement
      }}</el-descriptions-item>
      <el-descriptions-item label="我喜欢(价值观)">
        {{ detail.value }}
        <!-- <el-tag size="small">学校</el-tag> -->
      </el-descriptions-item>
      <el-descriptions-item label="我讨厌(价值观)">{{
        detail.value2
      }}</el-descriptions-item>
      <el-descriptions-item label="比喻/意象">{{
        detail.metaphor
      }}</el-descriptions-item>
      <el-descriptions-item label="障碍标签">{{
        detail.obstacle
      }}</el-descriptions-item>
      <el-descriptions-item label="才干标签">
        <el-tag
          v-for="(tag, index) in detail.tags"
          :key="`tag_${index}`"
          size="small"
          color="#2c3e50"
          :style="{ color: '#fff' }"
          >{{ tag }}</el-tag
        >
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
      v-if="descStatus === 'simple'"
      title="才干主题对比"
      :style="{ color: '#2c3e50!important' }"
      :column="1"
      direction="horizontal"
      labelClassName="descripton-container__label"
      contentClassName="descripton-container__content"
      border
    >
      <el-descriptions-item
        v-for="(c, index) in detail.contrast"
        :key="`contrast_${index}`"
        :label="c.name"
        :labelStyle="{
          color: c.color,
          fontWeight: 'bold',
          filter: 'grayscale(0.2)',
        }"
        >{{ c.desc }}</el-descriptions-item
      >
    </el-descriptions>

    <el-descriptions
      v-if="descStatus === 'detail'"
      :column="1"
      direction="horizontal"
      labelClassName="descripton-container__label"
      contentClassName="descripton-container__content"
      border
    >
      <template slot="title">
        <div>
          <div
            :style="{
              color: advantage.color,
              textAlign: 'left',
              fontSize: '20px',
              fontWeight: 'bold',
            }"
          >
            {{ detail.CName }}
          </div>
          <div :style="{ fontSize: '14px', textAlign: 'left' }">
            {{ detail.info }}
          </div>
        </div>
      </template>
      <template slot="extra">
        <el-radio-group v-model="descStatus" size="mini">
          <el-radio-button label="simple">简</el-radio-button>
          <el-radio-button label="detail">繁</el-radio-button>
        </el-radio-group>
      </template>
      <el-descriptions-item label="画面描述">
        <img
          :src="detail.img"
          alt=""
          onerror="this.src='/images/placeholder.png';"
        />
        <!-- <img width="320" height="180" src="/images/placeholder.png" alt="" /> -->
      </el-descriptions-item>
      <el-descriptions-item label="视频描述">
        <video controls>
          <source :src="detail.video" type="video/mp4" />
          <track src="" kind="captions" srclang="en" label="English" />
          您的浏览器不支持 video 标签。
        </video>
      </el-descriptions-item>
      <el-descriptions-item label="详细说明">
        {{ detail.detailInfo }}
      </el-descriptions-item>
      <el-descriptions-item label="核心解读">
        {{ detail.coreReading }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import ADVANTAGES_DETAILS_JSON from '@/utils/data/ADVANTAGES_DETAILS.json';

export default {
  props: {
    advantage: {
      type: Object,
      default: () => {},
    },
  },
  name: 'DescriptionContainer',
  data() {
    return {
      descStatus: 'simple',
      detail: {},
    };
  },
  watch: {
    advantage: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal, oldVal, 'CName');
        if (newVal) {
          // eslint-disable-next-line operator-linebreak
          this.detail =
            ADVANTAGES_DETAILS_JSON.find(
              // eslint-disable-next-line comma-dangle
              (item) => item?.CName === newVal?.CName
            ) || {};
        }
      },
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.descripton-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - 120px);
  background-color: white;
  padding: 14px 20px 20px 20px;
  border-radius: 3px;
  box-shadow: 2px 10px 26px -3px rgba(0, 0, 0, 0.1);
}
</style>

<style lang="scss">
.descripton-container {
  &__label {
    width: 150px !important;
    font-weight: bold;
    margin-bottom: 0px !important;
    text-align: right !important;
  }

  &__content {
    text-align: justify;
    text-align-last: left;
    line-height: 1.5;
    margin-bottom: 0px !important;

    img {
      width: 50%;
    }

    video {
      width: 50%;
    }

    &--color {
      background-color: #f5f7fa;
    }
  }

  .el-descriptions-item__cell {
    margin-bottom: 0px !important;
  }

  .el-descriptions__title {
    font-size: 18px !important;
  }

  .el-descriptions__header {
    margin-bottom: 6px !important;
    margin-top: 6px !important;
  }
}
</style>
