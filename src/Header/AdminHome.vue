<template>
  <div id="box">
    <el-container style="height: 100vh">
      <el-aside width="" style="background-color: rgb(238, 241, 246)">
        <div class="ftg">
          <!-- 点击展开收起导航和切换对应图标 -->
          <p v-show="block">控制台中心</p>
          <div>
            <i class="el-icon-s-fold" @click="isC" v-show="block"></i>
            <i class="el-icon-s-unfold" @click="isC" v-show="toggle"></i>
          </div>
        </div>

        <div v-for="(item, i) in list" :key="i">
          <el-menu
            class="el-menu-vertical"
            :default-active="defaultActive"
            :unique-opened="true"
            :collapse="isCollapse"
            active-text-color="blue"
            style="min-height: 100%"
            theme="dark"
            router
            @open="handleOpen"
            @close="handleClose"
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
            <el-menu-item :index="item.path" v-else>
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{ this.$route.meta.title }}</span>
        </el-header>

        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: false,
      toggle: false, //第二个图标默认隐藏
      block: true, //默认显示第一个图标
      list: [
        {
          title: "数据资产管理",
          icon: "el-icon-document",
          index: "2",
          children: [
            {
              title: "模型分类管理",
              path: "/admin/model-classify",
            },
            {
              title: "模型数据管理",
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
    // 动态控制展开与收起和切换对应图标
    isC() {
      this.isCollapse = !this.isCollapse;
      this.toggle = !this.toggle;
      this.block = !this.block;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
#box {
  background: #f5f5f5;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
::v-deep .el-submenu .el-menu-item {
  padding-left: 50px !important;
}
.ftg {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  background-color: #fff !important;
}
/* .component-NavMenu {
  height: 100%;
  overflow: auto;
}
.el-container {
  height: 100vh
}
.el-aside {
  color: #333;
  line-height: 20px;
}
.el-main {
  background-color: skyblue;
  color: #333;
} */
</style>
