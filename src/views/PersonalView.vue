import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
<template>
  <div class="personal-view">
    <el-upload
      class="upload-pdf"
      action=""
      accept=".pdf"
      :before-upload="handleFileUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传pdf文件</div>
    </el-upload>
    <div class="personal-view__list">
      <personal-card
        v-for="(item, index) in cardlist"
        :key="index"
        :person-info="item"
        @delete="handleDeleteCard"
        @edit="handleEditName"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions, import/no-unresolved
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import { getPersonalStrengthByPDFStrArray, generateUUID } from '@/utils/tool';
import { getCardList, setCardList } from '@/utils/cache';
import PersonalCard from '@/components/PersonalCard/index.vue';

// eslint-disable-next-line import/extensions, import/no-unresolved
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/pdfjs/pdf.worker.mjs';

export default {
  name: 'PersonalView',
  components: {
    PersonalCard,
  },
  data() {
    return {
      cardlist: [],
    };
  },
  methods: {
    handleEditName({ id, name }) {
      console.log(id, 'edit name');
      this.cardlist = this.cardlist.map((item) => {
        if (item.id === id) {
          // eslint-disable-next-line no-param-reassign
          item.name = name;
        }
        return item;
      });
      setCardList(this.cardlist);
    },
    handleDeleteCard(id) {
      this.cardlist = this.cardlist.filter((item) => item.id !== id);
      setCardList(this.cardlist);
    },
    async handleFileUpload(file) {
      console.log(file);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(data).promise;

        // console.log(pdf, 'pdfPage');
        this.extractTextFromPdf(pdf);
      };

      reader.readAsArrayBuffer(file);
    },
    async extractTextFromPdf(pdf) {
      // 从PDF中提取文本内容的逻辑
      console.log(pdf.numPages, 'pdf');

      const waterfall = [];

      for (let i = 1; i <= pdf.numPages; i += 1) {
        waterfall.push(this.generatePagePromise(pdf, i));
      }
      const pdfStrArray = await Promise.all(waterfall);
      const talentOrders = getPersonalStrengthByPDFStrArray(pdfStrArray);

      const cardlist = getCardList();
      cardlist.push({
        id: generateUUID(),
        name: `用户${cardlist.length + 1}`,
        talentOrders,
      });

      setCardList(cardlist);
      this.cardlist = cardlist;
    },
    generatePagePromise(pdf, pageNum) {
      return new Promise((resolve, reject) => {
        pdf
          .getPage(pageNum)
          .then((page) => page.getTextContent())
          .then((textContent) => {
            // console.log(textContent, 'textContent');
            const pageText = textContent.items
              .map((item) => item.str)
              .join('')
              .replaceAll(' ', '');
            resolve(pageText);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  async mounted() {
    this.cardlist = getCardList();
  },
};
</script>

<style lang="scss" scoped>
.personal-view {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-height: 300px;
  // height: 100%;
  //   padding: 20px;
  background-color: #f5f7fa;
  overflow: hidden;

  .upload-pdf {
    position: absolute;
    top: 4px;
    right: 20px;
    width: 100px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    padding: 10px;
    z-index: 10;
  }
  .personal-view__list {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0px 20px 20px 0px;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
