<template>
  <div class="editmd">
    <div class="div1">
      <el-input
        v-model="titleinput"
        placeholder="请输入文章标题（5~100个字）"
        class="titleinput"
        size="medium"
        minlength="5"
        maxlength="100"
        show-word-limit
      >
      </el-input>
      <el-button
        @click="getData"
        type="primary"
        round
        class="push-editmd"
        size="small"
        >发布文章</el-button
      >
    </div>
    <div class="div2">
      <mavon-editor
        style="height: 100%"
        v-model="editorContent"
        :ishljs="true"
        ref="md"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
      ></mavon-editor>
    </div>
    <!-- <div class="div3">
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
    </div> -->
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      titleinput: "",
      editorContent: "",
    };
  },

  components: {
    mavonEditor,
  },

  mounted() {
    window.addEventListener("beforeunload", this.beforeUnloadHandler, false);
  },

  destroyed() {
    window.removeEventListener("beforeunload", this.beforeUnloadHandler, false);
  },

  methods: {
    // 此处返回任意字符串，不返回null即可，不能修改默认提示内容
    beforeUnloadHandler(e) {
      e.returnValue = "离开此页面？";
    },
    // 图片上传
    imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("file", $file);
      this.$axios({
        url: "/file/upload",
        method: "post",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
          aaa: "aaa",
        },
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //    this.$vm.$img2Url(pos, url.data);
        this.$refs.md.$img2Url(pos, url.data);
      });
    },
    // 图片删除
    imgDel(pos) {
      delete this.imgFile[pos];
    },

    // 发布文章
    getData() {
      //路由跳转
      this.$router.push({
        name: "alternateShow",
        query: {
          content: this.editorContent,
        },
      });
      /* let oPre = document.querySelectorAll(".div3 pre");
      console.log(oPre);
      //给每个pre后面添加一个span，内容为复制
      for (let i = 0; i < oPre.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = "复制";
        oPre[i].appendChild(span);
      }
      let oSpans = document.querySelectorAll(".div3 span");
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
      } */
    },
  },
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
