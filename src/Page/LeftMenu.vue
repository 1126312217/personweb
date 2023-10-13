<template>
  <div class="component-NavMenu">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <div class="ly-title"><p>系统设置</p></div>
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
        <el-menu-item :index="item.path" v-else style="padding-left: 10px">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "LeftNavMenu",
  data() {
    return {
      isCollapse: false,
      list: [
        {
          title: "账号中心",
          icon: "el-icon-s-check",
          index: "1",
          children: [{ title: "基本信息", path: "/user-info/index" }],
        },
        {
          title: "权限管理",
          icon: "el-icon-menu",
          index: "2",
          children: [
            { title: "组织管理", path: "/org/index" },
            { title: "用户管理", path: "/user/index" },
            { title: "角色管理", path: "/role/index" },
          ],
        },
        {
          title: "租户管理",
          icon: "el-icon-s-shop",
          index: "3",
          path: "/tenant/index",
        },
      ],
    };
  },
  computed: {
    defaultActive: function () {
      let str = this.$route.meta.parentPath;
      /* let str = this.$route.path;
      let str1 = str.substring(0, str.indexOf("/", 1)) + "/";
      if (str.startsWith(str1)) {
        str = str1 + "index";
      } */
      if (str) {
        return str;
      } else {
        return this.$route.path;
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    //初始化获取用户信息
    init() {
      //
    },
  },
};
</script>
<style scoped>
.component-NavMenu {
  background-color: #ffff;
  width: 200px;
}
.ly-title {
  height: 60px;
}
.el-menu--collapse {
  width: 50px;
}
::v-deep .el-submenu__title {
  padding: 0 0 0 10px !important;
}
p {
  width: 200px;
  mix-blend-mode: normal;
  color: rgba(109, 115, 131, 1);
  font-size: 16px;
  line-height: 24px;
  padding: 18px 0 18px 20px;
}
::v-deep .el-tooltip {
  padding: 0 10px !important;
}
</style>
