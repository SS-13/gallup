<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <div v-if="textContent">
      <!-- 显示提取的文本内容 -->
      <pre>{{ textContent }}</pre>
    </div>
  </div>
</template>
  
  <script>
// 导入pdf.js的必要函数
import { getDocument } from 'pdfjs-dist/webpack';

export default {
  data() {
    return {
      textContent: null,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const typedArray = new Uint8Array(e.target.result);
          getDocument({ data: typedArray }).promise.then((pdfDoc) => {
            this.processPdfDoc(pdfDoc);
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    },
    async processPdfDoc(pdfDoc) {
      const numPages = pdfDoc.numPages;
      let textContent = '';
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const content = await page.getTextContent();
        textContent += content.items.map((item) => item.str).join(' ') + '\n';
      }
      this.textContent = textContent;
      // 在这里可以进行二次加工
      this.performDataProcessing(textContent);
    },
    performDataProcessing(textContent) {
      // 实现数据的二次加工逻辑
    },
  },
};
</script>
