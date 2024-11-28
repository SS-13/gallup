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
            成就
          </div>
          <div :style="{ fontSize: '14px', textAlign: 'left' }">
            才干主题突出的人大都兢兢业业，锲而不舍。他们乐于忙忙
          </div>
        </div>
      </template>
      <template slot="extra">
        <el-radio-group v-model="descStatus" size="mini">
          <el-radio-button label="simple">简</el-radio-button>
          <el-radio-button label="detail">繁</el-radio-button>
        </el-radio-group>
      </template>
      <el-descriptions-item label="我是（状态）"
        >一个努力工作的人</el-descriptions-item
      >
      <el-descriptions-item label="我会（行为）"
        >设定工作的节奏</el-descriptions-item
      >
      <el-descriptions-item label="我能带来（贡献）"
        >高强度而持久的努力</el-descriptions-item
      >
      <el-descriptions-item label="我需要（需求）"
        >以自己的节奏工作的自由；不断完成工作以获得充实感</el-descriptions-item
      >
      <el-descriptions-item label="我喜欢（价值观）">
        完成任务
        <!-- <el-tag size="small">学校</el-tag> -->
      </el-descriptions-item>
      <el-descriptions-item label="我讨厌（价值观）"
        >做事懒散</el-descriptions-item
      >
      <el-descriptions-item label="比喻/意象"
        >完成比赛，到达终点</el-descriptions-item
      >
      <el-descriptions-item label="障碍标签"
        >工作比人更重要</el-descriptions-item
      >
      <!-- <el-descriptions-item label="详细说明">
        “成就”才干突出的人总是渴望有所建树。他们体内有团烈火在熊熊燃烧，促使他们多做事情，多出成果。
        成就才干突出的人感到每一天似乎都是从零开始。一天结束时，他们必须完成一些有意义的事情，才能对自己感到满意。
        所谓的“每一天“就是指所有日子—工作日、周末、假期，甚至休假日。哪怕成就再小，如果这一天一无所获，他们就会缺乏“成就”感。
        他们很少需要以休息或是从事简单的任务来作为完成一项极富挑战项目的嘉奖。
        他们会感谢别人对过去成就的认可，但动力的驱动下，他们会努力向前，向着目所能及的下一个目标奋进。
      </el-descriptions-item>
      <el-descriptions-item label="核心解读">
        大都兢兢业业，锲而不舍。他们乐于忙忙碌碌并有所作为。
        追求持续进步和完成任务的内在驱动力
      </el-descriptions-item> -->
      <el-descriptions-item label="才干标签">
        <el-tag size="small">忙碌</el-tag>
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
        label="成就"
        :labelStyle="{ color: '#712F7C', fontWeight: 'bold' }"
        >我想完成它。</el-descriptions-item
      >
      <el-descriptions-item
        label="行动"
        :labelStyle="{ color: '#712F7C', fontWeight: 'bold' }"
        >我想开始做。</el-descriptions-item
      >
      <el-descriptions-item
        label="成就"
        :labelStyle="{ color: '#712F7C', fontWeight: 'bold' }"
        >精力充沛。</el-descriptions-item
      >
      <el-descriptions-item
        label="思维"
        :labelStyle="{ color: '#409261', fontWeight: 'bold' }"
        >勤于思考。</el-descriptions-item
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
            成就
          </div>
          <div :style="{ fontSize: '14px', textAlign: 'left' }">
            才干主题突出的人大都兢兢业业，锲而不舍。他们乐于忙忙
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
          src="/images/achiever.png"
          alt=""
          onerror="this.src='/images/placeholder.png';"
        />
        <!-- <img width="320" height="180" src="/images/placeholder.png" alt="" /> -->
      </el-descriptions-item>
      <el-descriptions-item label="视频描述">
        <!-- <video
          preload="auto"
          controls="controls"
          src="/videos/achiever.mp4"
          alt=""
        >
          您的浏览器不支持 video 标签。
        </video> -->

        <video controls>
          <source src="/videos/achiever.mp4" type="video/mp4" />
          <track src="" kind="captions" srclang="en" label="English" />
          您的浏览器不支持 video 标签。
        </video>
      </el-descriptions-item>
      <el-descriptions-item label="详细说明">
        “成就”才干突出的人总是渴望有所建树。他们体内有团烈火在熊熊燃烧，促使他们多做事情，多出成果。
        成就才干突出的人感到每一天似乎都是从零开始。一天结束时，他们必须完成一些有意义的事情，才能对自己感到满意。
        所谓的“每一天“就是指所有日子—工作日、周末、假期，甚至休假日。哪怕成就再小，如果这一天一无所获，他们就会缺乏“成就”感。
        他们很少需要以休息或是从事简单的任务来作为完成一项极富挑战项目的嘉奖。
        他们会感谢别人对过去成就的认可，但动力的驱动下，他们会努力向前，向着目所能及的下一个目标奋进。
      </el-descriptions-item>
      <el-descriptions-item label="核心解读">
        大都兢兢业业，锲而不舍。他们乐于忙忙碌碌并有所作为。
        追求持续进步和完成任务的内在驱动力
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style lang="scss" scoped>
.descripton-container {
  position: relative;
  box-sizing: border-box;
  width: 110vw;
  height: calc(100vh - 120px);
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
