<template>
  <div id="box">
    <el-container>
      <el-aside width="210px">
        <div class="component-NavMenu">
          <div v-for="(item, i) in list" :key="i">
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="defaultActive"
              :unique-opened="true"
              :collapse="isCollapse"
              active-text-color="blue"
              style="min-height: 100%"
              theme="dark"
              router
            >
              <el-submenu :index="item.index" v-if="item.children">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.title }}</span>
                </template>
                <el-menu-item-group v-for="(v, i) in item.children" :key="i">
                  <el-menu-item :index="v.path">{{ v.title }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                :index="item.path"
                v-else
                style="padding-left: 10px"
              >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isCollapse: false,
      list: [
        {
          title: "登录",
          icon: "el-icon-document",
          index: "2",
          children: [
            {
              title: "登录捂眼睛",
              path: "/reverseCommunity/loginA",
            },
            {
              title: "登录和注册",
              path: "/reverseCommunity/loginB",
            },
            {
              title: "异步执行",
              path: "/reverseCommunity/loginC",
            },
          ],
        },
        {
          title: "富文本编辑器",
          index: "3",
          icon: "el-icon-plus",
          path: "/alternate",
        },
        {
          title: "富文本展示",
          index: "22",
          icon: "el-icon-plus",
          path: "/alternateShow",
        },
        {
          title: "冻结对象-前端优化",
          index: "23",
          icon: "el-icon-plus",
          path: "/freeze-objects",
        },
        {
          title: "按钮3D",
          index: "4",
          icon: "el-icon-s-opportunity",
          path: "/3D",
        },
        {
          title: "人物卡片1",
          index: "5",
          icon: "el-icon-plus",
          path: "/card",
        },
        {
          title: "人物卡片2",
          index: "6",
          icon: "el-icon-plus",
          path: "/card2",
        },
        {
          title: "聚焦图片",
          index: "7",
          icon: "el-icon-postcard",
          path: "/focusImg",
        },
        {
          title: "打印",
          index: "8",
          icon: "el-icon-s-open",
          path: "/print",
        },
        {
          title: "插槽",
          index: "9",
          icon: "el-icon-s-ticket",
          path: "/slot",
        },
        {
          title: "毛玻璃炫光按钮",
          index: "10",
          icon: "el-icon-star-off",
          path: "/mouse",
        },
        {
          title: "原生js实现截图",
          index: "11",
          icon: "el-icon-s-promotion",
          path: "/screenShot",
        },
        {
          title: "联动input框",
          index: "12",
          icon: "el-icon-s-promotion",
          path: "/linkageInput",
        },
        {
          title: "我是父组件",
          index: "15",
          icon: "el-icon-s-promotion",
          path: "/father",
        },
        {
          title: "我是子组件",
          index: "16",
          icon: "el-icon-s-promotion",
          path: "/child",
        },
        {
          title: "点击左右移动",
          index: "13",
          icon: "el-icon-s-promotion",
          path: "/move",
        },
        {
          title: "子集",
          icon: "el-icon-document",
          index: "2",
          children: [
            {
              title: "子集1",
              path: "/reverseCommunity/reverseCommunityList",
            },
            {
              title: "子集2",
              path: "/reverseCommunity/reverseCommunityInfo",
            },
            {
              title: "子集3",
              path: "/reverseCommunity/reverseCommunityMsg",
            },
          ],
        },
        {
          title: "组件通信",
          index: "14",
          icon: "el-icon-s-promotion",
          path: "/communication",
        },
         {
          title: "门户首页",
          index: "852",
          icon: "el-icon-s-promotion",
          path: "/protal",
        },
        {
          title: "评论组件",
          index: "17",
          icon: "el-icon-s-promotion",
          path: "/comment",
        },
        {
          //两种排序
          title: "两种排序",
          index: "18",
          icon: "el-icon-s-promotion",
          path: "/sort",
        },
        {
          //echarts练习
          title: "echarts练习",
          index: "19",
          icon: "el-icon-s-promotion",
          path: "/echarts",
        }
      ],
    };
  },
  computed: {
    defaultActive: function () {
      let a = this.$route.meta.parentPath;
      console.log(this.$route.meta.parentPath, 2222222);
      /* return this.$route.path.replace("/", ""); */
      if (a) {
        return a;
      } else {
        return this.$route.path;
      }
    },
  },
  methods: {
    handle() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style scoped>
#box {
  /* min-width: 1200px;
  overflow: auto; */
  background: #f5f5f5;
}
.el-container {
  height: calc(100vh - 60px);
}
/* main部分没有左右两边的话直接在el-container大盒子里写这个就行了 */
.el-aside {
  color: #333;
  line-height: 20px;
  /* max-height: calc(100vh - 60px);
  overflow-y: auto; */
}

.el-main {
  background-color: skyblue;
  color: #333;
  /* max-height: calc(100vh - 60px);
  overflow-y: auto; */
}
</style>
