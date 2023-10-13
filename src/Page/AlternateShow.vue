<template>
  <div id="AlternateShow" class="codeCopy">
    <mavon-editor
      class="markdown"
      :value="editorContent"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      style="min-height: 20px; margin-top: 20px"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: "AlternateShow",
  data() {
    return {
      editorContent: "",
    };
  },

  created() {},

  mounted() {
    this.editorContent = this.$route.query.content;
    this.$nextTick(() => {
      let oPre = document.querySelectorAll(".codeCopy pre");
      console.log(oPre);
      //给每个pre后面添加一个span，内容为复制
      for (let i = 0; i < oPre.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = "复制";
        oPre[i].appendChild(span);
      }
      let oSpans = document.querySelectorAll(".codeCopy span");
      for (let i = 0; i < oSpans.length; i++) {
        oSpans[i].onclick = function () {
          //获取当前点击的是哪一个li的内容，但是去掉span标签
          let oLi = this.parentNode;
          let oLiText = oLi.innerHTML.replace(/<span>.*<\/span>/g, "");
          //复制oLiText的code标签的内容到剪贴板
          let oCode = oLi.querySelector("code");
          let oCodeText = oCode.innerHTML;
          console.log(oLiText, "复制的内容");
          //点击后复制当前li的内容
          let oInput = document.createElement("textarea");
          oInput.value = oCodeText;
          document.body.appendChild(oInput);
          oInput.select();
          document.execCommand("copy");
          document.body.removeChild(oInput);
        };
      }
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
//修改代码块样式
::v-deep .markdown-body pre {
  background-color: skyblue;
  color: #fff;
  position: relative;
  span {
    display: block;
    float: right;
    position: absolute;
    top: 0px;
    right: 0;
  }
  span:hover {
    cursor: pointer;
  }
}
</style>
