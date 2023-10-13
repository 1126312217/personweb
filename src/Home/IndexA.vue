<template>
  <!-- 
  写首页思路：
      1.写首页的时候，main页面一定要写两个mani用v-if和v-else,不然首页会有一个空白。
 -->
  <div class="box">
    <el-container>
      <el-header style="display: flex">
        <p>听风叙雨</p>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="horizontal"
          router
          background-color="#e9eef3"
          text-color="#333"
          active-text-color="#0084ff"
          style="flex: 1"
        >
          <el-menu-item
            v-for="(item, i) in navList"
            :key="i"
            :index="item.path"
          >
            <template slot="title">
              <span> {{ item.title }}</span>
            </template>
          </el-menu-item>
        </el-menu>
        <div class="atom-spinner">
          <div class="spinner-inner">
            <div class="spinner-line"></div>
            <div class="spinner-line"></div>
            <div class="spinner-line"></div>
            <!--Chrome renders little circles malformed :(-->
            <div class="spinner-circle">&#9679;</div>
          </div>
        </div>
        <!--  -->
      </el-header>
      <el-main v-if="$route.path == '/' || $route.path == '/home'"
        >我是首页</el-main
      >
      <el-main v-else>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        { path: "/home", title: "首页" },
        { path: "/generalCatalog", title: "客户" },
        { path: "/systemLibrary", title: "系统" },
        /*{ path: "/systemLibrary", title: "系统" },
        刚开始这种写法用来调试看效果，后来就可以用userList替换了，
        但是SystemLibrary.vue是一个必不可少的中间件，因为后面是
        直接跳到系统里面的一个页面，所以才在这里修改了！！！
        */
        /* 换成路由重定向之后，就不需要写/systemLibrary、userList了！！！！ */
        { path: "/reverseCommunity", title: "反卷社区" },
        { path: "/studyPlatform", title: "学习平台" },
        { path: "/listenRain", title: "听风叙雨" },
         { path: "/admin", title: "后台管理" },
      ],
    };
  },
  computed: {
    defaultActive: function () {
      /* return this.$route.path.replace("/", ""); */
      return this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
.atom-spinner,
.atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #ff1d5e;
  font-size: calc(60px * 0.24);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation-duration: 1s;
  border-left-width: calc(60px / 25);
  border-top-width: calc(60px / 25);
  border-left-color: #ff1d5e;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}
.el-header {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
  padding: 0;
  p {
    background: palevioletred;
    color: white;
    margin: auto;
    margin-left: 10px;
    padding: 0.3em 1em 0.5em;
    border-radius: 3px;
    box-shadow: 0 0 0.5em #b4a078;
    animation: shake-baidu 2s ease 0s infinite;
    animation-play-state: paused;
  }
  p:hover {
    animation-play-state: running;
  }
  @keyframes shake-baidu {
    from {
      transform: rotate(0deg);
    }
    4% {
      transform: rotate(5deg);
    }
    12.5% {
      transform: rotate(-5deg);
    }
    21% {
      transform: rotate(5deg);
    }
    29% {
      transform: rotate(-5deg);
    }
    37.5% {
      transform: rotate(5deg);
    }
    46% {
      transform: rotate(-5deg);
    }
    50%,
    to {
      transform: rotate(0deg);
    }
  }
}
.el-header ul {
  margin-left: 100px;
}
.el-main {
  background-color: azure;
  color: #333;
  min-height: calc(100vh - 60px);
  overflow: auto;
  padding: 0;
}
</style>
