<template>
  <div id="app">
    <router-view></router-view>
    <!--  <div class="nav">
      <router-link to="/">App1</router-link>
      <router-link to="/router2">App2</router-link>
    </div>
    <div style="margin-top: 100px">
      <router-view></router-view>
    </div> -->
  </div>
</template>

<script>
//import axios from "axios"; // 引入axios
export default {
  name: "App",
  // 挂载的时候获取新闻列表
  // mounted() {
  //   axios.get("/mock/news").then((res) => {
  //     // url即在mock.js中定义的
  //     console.log(res.data); // 打印一下响应数据
  //   });
  // },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
