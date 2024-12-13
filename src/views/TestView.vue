<template>
  <div class="test-container">
    <el-upload
      class="upload-demo"
      drag
      action=""
      ref="upload"
      accept=".xlsx,.xls"
      :before-upload="handleMembersUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        助教成员表请上传这里，只能上传xlsx/xls文件
      </div>
    </el-upload>

    <el-upload
      class="upload-demo"
      drag
      action=""
      ref="upload"
      accept=".xlsx,.xls"
      :before-upload="handleStrengthsUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        优势才干汇总数据，只能上传xlsx/xls文件
      </div>
    </el-upload>

    <el-upload
      class="upload-demo"
      drag
      action=""
      ref="upload"
      accept=".xlsx,.xls"
      :before-upload="handleClassUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        班级数据，只能上传xlsx/xls文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { FIELDS_4, ADVANTAGES_34 } from '@/utils/strengths';

export default {
  name: 'TestView',
  data() {
    return {};
  },
  methods: {
    findAdvantage(cname) {
      // eslint-disable-next-line operator-linebreak
      const advantage =
        ADVANTAGES_34.find((item) => item.CName === cname) || {};
      // eslint-disable-next-line operator-linebreak
      const field =
        FIELDS_4.find((item) => item.fieldEName === advantage.Field) || {};

      return {
        ...advantage,
        ...field,
      };
    },
    handleMembersUpload(file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        console.log(workbook, 'workbook');
        // eslint-disable-next-line operator-linebreak
        const sheetName =
          workbook.SheetNames[workbook.SheetNames.indexOf('助教前10才干分布')];
        console.log(sheetName, 'sheetName');
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);
        const members = [];
        jsonData.forEach((item) => {
          // console.log(item);
          if (item['才干1']) {
            members.push({
              name: item['姓名'],
              class: item['期数'],
              advantage1: this.findAdvantage(item['才干1']),
              advantage2: this.findAdvantage(item['才干2']),
              advantage3: this.findAdvantage(item['才干3']),
              advantage4: this.findAdvantage(item['才干4']),
              advantage5: this.findAdvantage(item['才干5']),
              advantage6: this.findAdvantage(item['才干6']),
              advantage7: this.findAdvantage(item['才干7']),
              advantage8: this.findAdvantage(item['才干8']),
              advantage9: this.findAdvantage(item['才干9']),
              advantage10: this.findAdvantage(item['才干10']),
            });
          }
        });
        console.log(members);
        localStorage.setItem('members', JSON.stringify(members));
      };
      reader.readAsBinaryString(file);
    },
    handleStrengthsUpload(file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        // console.log(workbook, 'workbook');
        const sheetName = workbook.SheetNames[0];
        // console.log(sheetName, 'sheetName');
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // console.log(jsonData);
        const advantages = [];
        jsonData.forEach((item) => {
          // console.log(item);
          if (item['才干']) {
            // 才干
            // 详细说明
            // 核心解读
            // 我是（状态）
            // 我会（行为）
            // 我能带来（贡献）
            // 我需要（需求）
            // 我喜欢（价值观）
            // 我讨厌（价值观）
            // 比喻/意象
            // 障碍标签
            // 才干主题对比

            const [CName, EName] = item['才干'].split('\n');
            // console.log(CName, EName);
            const contrast = [];
            const contrastStr = item['才干主题对比'];
            // console.log(contrastStr);

            const contrastArr = contrastStr.split('\n');
            // console.log(
            //   '%c [ contrastArr ]-131',
            //   'font-size:13px; background:pink; color:#bf2c9f;',
            //   contrastArr
            // );
            contrastArr.forEach((str) => {
              if (str) {
                const [cname, desc] = str.split('：');
                // console.log(cname, 'xxx', desc.trim(), 'xxx');
                const temp = this.findAdvantage(cname);
                contrast.push({
                  name: cname,
                  color: temp.color,
                  desc: desc.trim(),
                });
              }
            });

            // console.log(
            //   '%c [ contrast ]-149',
            //   'font-size:13px; background:pink; color:#bf2c9f;',
            //   contrast
            // );

            advantages.push({
              CName,
              EName,
              detailInfo: item['详细说明'],
              coreReading: item['核心解读'],
              status: item['我是（状态）'],
              behavior: item['我会（行为）'],
              contribution: item['我能带来（贡献）'],
              requirement: item['我需要（需求）'],
              value: item['我喜欢（价值观）'],
              value2: item['我讨厌（价值观）'],
              metaphor: item['比喻/意象'],
              obstacle: item['障碍标签'],
              contrastStr: item['才干主题对比'],
              contrast,
              img: '',
              video: '',
              tags: [],
            });
          }
        });
        // console.log(JSON.stringify(advantages));
        localStorage.setItem('advantages', JSON.stringify(advantages));
      };
      reader.readAsBinaryString(file);
    },
    handleClassUpload(file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        // console.log(workbook, 'workbook');
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName, 'sheetName');
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);

        const classmates = [];
        jsonData.forEach((item) => {
          // console.log(item);
          if (item['你的真实姓名']) {
            const advantages = {};
            // 6-10项优势才干: "思维, 理念, 体谅, 战略, 审慎"
            const advantages6to10Arr = item['第6-10项优势才干'].split(' ');
            const advantages1to5Arr = item['前5项优势才干'].split(' ');
            const advantages30to34 = item['后五才干'].split(' ');
            advantages6to10Arr.forEach((o, idx) => {
              advantages[`advantage${idx + 6}`] = this.findAdvantage(
                // eslint-disable-next-line comma-dangle
                o.trim(),
              );
            });
            advantages1to5Arr.forEach((o, idx) => {
              advantages[`advantage${idx + 1}`] = this.findAdvantage(
                // eslint-disable-next-line comma-dangle
                o.trim(),
              );
            });
            advantages30to34.forEach((o, idx) => {
              advantages[`advantage${idx + 30}`] = this.findAdvantage(
                // eslint-disable-next-line comma-dangle
                o.trim(),
              );
            });
            console.log(advantages, 'advantages');
            // 6-10项优势才干: "思维, 理念, 体谅, 战略, 审慎"
            // 你所在的岗位: "审计助理"
            // 你所在的行业: "审计"
            // 你的微信昵称: "nancytam55"
            // 你的真实姓名: "谭娜"
            // 前五项优势才干: "学习, 适应, 交往, 和谐, 成就"
            // 希望通过优势初级班课程，收获什么？: "了解自己。"
            // 目前在工作中想要解决的一个问题: "害怕与别人发生冲突"
            classmates.push({
              name: item['你的真实姓名'],
              class: 4,
              ...advantages,
              industry: item['你所在的行业'],
              position: item['你所在的岗位'],
              wxNickname: item['你的微信昵称'],
              problem: item['目前在工作中想要解决的一个问题'],
              want: item['希望通过优势初级班课程，收获什么？'],
            });
          }
        });
        console.log(JSON.stringify(classmates));
        localStorage.setItem('classmates', JSON.stringify(classmates));
      };
      reader.readAsBinaryString(file);
    },
  },
};
</script>

<style lang="scss" scoped>
.test-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;

  .upload-demo {
    margin: 10px;
  }
}
</style>
