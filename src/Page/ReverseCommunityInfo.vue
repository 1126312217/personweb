<template>
  <div>
    子级2
    <el-button type="warning" @click="downloadExcel">下载Excel模板</el-button>
    <div @click="changeBtn">按钮一</div>
    <div v-for="(item, index) in list" :key="index">
      <el-input @change="change(index)" v-model="item.value"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "1", value: "我是" },
        { name: "2", value: "说的很对" },
      ],
      value: "",
      res_date: [
        { date: "2021-11-10", content: "查询成绩" },
        { date: "2021-11-21", content: "报名考试" },
        { date: "2021-11-26", content: "生日" },
      ],
      timeValue: "",
    };
  },
  created() {
    this.$appName = "test1";
    //只是在当前页面改变了this.$appName的值，不会影响其他页面
    this.$appName1.name = "test2";
    //这样修改后，其他页面的this.$appName1.name也会改变，但是只要刷新就会恢复main.js里定义的值
    console.log(this.$appName);
    console.log(this.$appName1);
  },
  methods: {
    downloadExcel() {
      // const link = document.createElement("a");
      // link.download = "ceshi";
      // link.target = "_black";
      // link.href = window.URL.createObjectURL(
      //   new Blob([
      //     "https://static.maogepingbeauty.com/test/1661420148063527437424.jpg",
      //   ])
      // );
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      //下载本地文件
      /* let a = document.createElement("a");
      a.href = "../../static/测试.xlsx";
      a.download = "文件模板.xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove(); */
     // 下载网上的图片 
      const link = document.createElement("a");
      link.download = "ceshi";
      link.target = "_black";
      link.href = window.URL.createObjectURL(
        new Blob([
          "https://static.maogepingbeauty.com/test/1661420148063527437424.jpg",
        ])
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

    },
    changeBtn() {
      this.list = [
        { name: "1", value: "我af是" },
        { name: "2", value: "sdfa" },
        { name: "3", value: "说的很对qq" },
      ];
    },
    change(val) {
      console.log(this.list, val);
    },
  },
};
</script>
<style scoped>
.is-selected {
  color: #1989fa;
}
</style>
