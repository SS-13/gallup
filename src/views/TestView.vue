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
      :before-upload="handleMembersUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        助教成员表请上传这里，只能上传xlsx/xls文件
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
        // console.log(workbook, 'workbook');
        const sheetName = workbook.SheetNames[workbook.SheetNames.length - 1];
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
        // console.log(JSON.stringify(members));
        localStorage.setItem('members', JSON.stringify(members));
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
  width: 100%;
}
</style>
