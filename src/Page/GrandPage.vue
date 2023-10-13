<template>
  <div>
    <p>我是父组件</p>
    <div style="display: flex">
      <el-input style="width: 20%" v-model="value" clearable></el-input>
      <el-button @click="handleClick">提交</el-button>
    </div>
    <grand-son
      :message="message"
      :list="list"
      :arr="arr"
      :obj="obj"
      @father="toGrand"
    ></grand-son>
  </div>
</template>
<script>
import GrandSon from "./GrandSon.vue";

export default {
  components: {
    GrandSon,
  },

  provide() {
    return {
      getApp: this.getApp,
    };
  },
  data() {
    return {
      value: "我是父组件的数据",
      message: "我是父组件的数据",
      list: [
        { name: "张三", id: 1 },
        { name: "李四", id: 2 },
        { name: "王五", id: 3 },
      ],
      arr: [1, 2, 3],
      obj: {
        name: "张三",
        age: 18,
      },
      month: "2022-10-08",
      articleList: [
        {
          id: 1,
          title: "标题1",
          content: "内容1",
        },
        {
          id: 2,
          title: "标题2",
          content: "内容2",
        },
        {
          id: 3,
          title: "标题3",
          content: "内容3",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    handleClick() {
      this.message = this.value;
      this.obj.name = this.value;
      this.month = this.month == "2022-10-08" ? "2022-10-09" : "2022-10-08";
      this.init();
    },
    toGrand(total) {
      console.log(total, "孙子传过来的值");
    },
    getApp() {
      return {
        month: this.month,
        articleList: this.articleList,
        // 其他需要暴露的属性
      };
    },
  },
};
</script>
