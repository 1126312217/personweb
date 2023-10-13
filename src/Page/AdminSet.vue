<template>
  <div>
    <p>设置</p>
    <el-button size="mini" @click="goDetail">点击跳转到发布</el-button>
  </div>
</template>
<script>
import axios from "axios"; // 引入axios
export default {
   mounted() {
    axios.get("/mock/news").then((res) => {
      // url即在mock.js中定义的
      console.log(res.data); // 打印一下响应数据
    });
  },
  methods: {
     /* goDetail() {
      // this.$router.push("/publish");
      let arr = [{name:"admin",value:111},{name:"admin2",value:222}]
      this.$router.push({
        path: "/publish",
        query: {
          roleName: JSON.stringify(arr),
          id: 1,
        },
      });
    }, */
    goDetail() {
      this.$router.push({
        name: "publish",
        params: {
          roleName: [1,2,3],
          id: 1,
        },
      });
    },
  },
};
</script>

