<template>
  <!-- 设计思路：
        1.用户点击系统直接进到系统里的某个页面；
        2.但是，当用户手动删除了路由后面的路由，只留下systemLibrary时，页面会没有任何数据显示；
        3.所以，我们需要在systemLibrary里面添加一个页面，用来显示没有权限的页面；
        4.这样的话，我们需要隐藏左边导航栏，且在main里面添加一个组件，用来显示没有权限的页面；
 -->
  <div id="box">
    <el-button @click="handle" size="mini">收缩</el-button>

    <el-container>
      <!-- 当路由不为systemLibrary的时候才显示左侧菜单 -->
      <el-aside width="210px">
        <!-- <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
       
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
     
       
      </el-submenu>
    </el-menu> -->
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          theme="dark"
          :unique-opened="true"
          active-text-color="pink"
          router
          :collapse="isCollapse"
        >
          <div v-for="(item, i) in list" :key="i">
            <el-submenu :index="item.index">
              <template slot="title"
                ><i :class="item.icon"></i
                ><span slot="title">{{ item.title }}</span></template
              >
              <div v-for="(v, i) in item.children" :key="i">
                <el-menu-item :index="v.path">{{ v.title }}</el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <!-- 根据路由地址判断来显示首页内容 -->
      <!-- 不知道为什么删除systemLibrary/userList后面的userList前面的systemLibrary首字母会变成大写！！！ -->
      <!-- 路由首字母大写问题解决，缓存问题，清理缓存就好了 -->
      <!-- <el-main v-if="$route.path == '/systemLibrary'">
        {{ this.$route.path }}
        <no-permission></no-permission>
      </el-main> -->
      <el-main>
        {{ this.$route.path }}
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
//import NoPermission from "./NoPermission.vue";
export default {
  components: {
    //NoPermission,
  },
  data() {
    return {
      isCollapse: false,
      list: [
        {
          title: "数据管理",
          icon: "el-icon-document",
          index: "2",
          children: [
            { title: "用户列表", path: "/systemLibrary/userList",
              children: [
                { title: "详情页", path: "/systemLibrary/userList/userInfo"},
              ]
            },
            { title: "商家列表", path: "/systemLibrary/shopList"},
            { title: "食品列表", path: "/systemLibrary/foodList"},
            { title: "订单列表", path: "/systemLibrary/orderList"},
            { title: "管理员列表", path: "/systemLibrary/adminList"},
            {title: "菜单列表", path: "/systemLibrary/leftMenu"},
            {title: "权限设置", path: "/systemLibrary/SetPermission"},
            {title: "异步执行", path: "/systemLibrary/PormiseTset"},
           /*  { title: "用户列表", path: "/systemLibrary/userList" ,index: "2-6",},
            { title: "商家列表", path: "/systemLibrary/shopList" ,index: "2-7",},
            { title: "食品列表", path: "/systemLibrary/foodList",index: "2-8",},
            { title: "订单列表", path: "/systemLibrary/orderList" ,index: "2-9",},
            { title: "管理员列表", path: "/systemLibrary/adminList" ,index: "2-10",}, */
          ],
        },
        {
          title: "添加数据",
          index: "3",
          icon: "el-icon-plus",
          children: [
            { title: "添加商铺", path: "/systemLibrary/addShop" },
            { title: "添加商品", path: "/systemLibrary/addGoods" },
          ],
        },
        {
          title: "图表",
          index: "4",
          icon: "el-icon-star-on",
          children: [{ title: "用户分布", path: "/systemLibrary/UserVisitor" }],
        },
        {
          title: "编辑",
          index: "5",
          icon: "el-icon-edit",
          children: [{ title: "文本编辑", path: "/systemLibrary/vueEdit" }],
        },
        {
          title: "设置",
          index: "6",
          icon: "el-icon-setting",
          children: [{ title: "管理员设置", path: "/systemLibrary/adminSet" }],
        },
        {
          title: "说明",
          index: "7",
          icon: "el-icon-warning",
          children: [{ title: "说明", path: "/systemLibrary/explain" }],
        },
      ],
    };
  },
  computed: {
    defaultActive: function () {
      let a = this.$route.meta.parentPath;
      console.log(this.$route.meta.parentPath,2222222);
      /* return this.$route.path.replace("/", ""); */
      if(a){
        return a;
      }else{
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
