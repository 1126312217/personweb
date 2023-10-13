import Vue from "vue";
import VueRouter from "vue-router";

import PublishApp from "../components/PublishApp";
import IndexA from "../Home/IndexA";
import reverseCommunityRouter from "./management.js";
import listenRainRouter from "./freedom.js";

Vue.use(VueRouter);
//设置组件映射规则
const routes = [
  {
    path: "/",
    component: () => import("../Login/LoginBpp"),
  },
  {
    path: "/ftg",
    component: () => import("../Login/RedictBaidu"),
  },
  {
    path: "/wy",
    beforeEnter: () => {
      window.location.href = 'https://www.baidu.com'
    }
  },
  {
    path: "/home",
    component: IndexA,
    children: [
      {
        path: "/GeneralCatalog",
        component: () => import("../Header/GeneralCatalog"),
      },
      {
        path: "/systemLibrary",
        component: () => import("../Header/SystemLibrary"),
        //重定向到子路由
        redirect: "/systemLibrary/userList",
        //可以用重定向的方式跳转到子路由，就不用再在这里写v-if啥的了
        children: [
          {
            path: "/systemLibrary/userList",
            name: "userList",
            component: () => import("../Page/UserList"),
            children: [
              {
                path: "/systemLibrary/userList/userInfo",
                meta: {
                  parentPath: "/systemLibrary/userList",
                },
                name: "userInfo",
                component: () => import("../Page/UserInfo"),
              },
            ],
          },
          {
            path: "/systemLibrary/shopList",
            component: () => import("../Page/AddShop"),
          },
          {
            path: "/systemLibrary/foodList",
            component: () => import("../Page/FoodList"),
          },
          {
            path: "/systemLibrary/orderList",
            component: () => import("../Page/OrderList"),
          },
          {
            path: "/systemLibrary/adminList",
            component: () => import("../Page/AdministratorList"),
          },
          {
            path: "/systemLibrary/addShop",
            component: () => import("../Page/AddShop"),
          },
          {
            path: "/systemLibrary/addGoods",
            component: () => import("../Page/AddGoods"),
          },
          {
            path: "/systemLibrary/userVisitor",
            component: () => import("../Page/UserVisitor"),
          },
          {
            path: "/systemLibrary/vueEdit",
            component: () => import("../Page/VueEdit"),
          },
          {
            path: "/systemLibrary/adminSet",
            component: () => import("../Page/AdminSet"),
          },
          {
            path: "/systemLibrary/explain",
            component: () => import("../Page/ExplainText"),
          },
          {
            path: "/systemLibrary/leftMenu",
            component: () => import("../Page/LeftMenu"),
          },
          {
            path: "/systemLibrary/SetPermission",
            component: () => import("../Page/SetPermission"),
          },
          {
            path: "/systemLibrary/PormiseTset",
            component: () => import("../Page/PormiseTset"),
          },
        ],
      },
      /* NoPermission */
      {
        path: "/noPermission",
        component: () => import("../Header/NoPermission"),
      },
      reverseCommunityRouter,
      listenRainRouter,
      /* {
        path: "/reverseCommunity",
        component: () => import("../Header/ReverseCommunity"),
        //重定向到子路由
        redirect: "/reverseCommunity/reverseCommunityList",
        children: [{
          path: "/reverseCommunity/reverseCommunityList",
          component: () => import("../Page/ReverseCommunityList"),
        },{
          path: "/reverseCommunity/reverseCommunityInfo",
          component: () => import("../Page/ReverseCommunityInfo"),
        }],
      }, */
      {
        path: "/studyPlatform",
        component: () => import("../Header/StudyPlatform"),
      },
      {
        path: "/Publish",
        name: "publish",
        component: PublishApp,
      },
      {
        path: "/admin",
        component: () => import("../Header/AdminHome"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
// 路由拦截
router.beforeEach((to, from, next) => {
  console.log("to:", to);
  console.log("from:", from);
  // if (from.path == "/reverseCommunity/reverseCommunityMsg" && to.path == "/reverseCommunity/reverseCommunityList") {
  //   console.log("from.path:", from.path);
  //   to.meta.keepAlive = true;
  // } else {
  //   to.meta.keepAlive = false;
  // }
  if (
    from.path == "/reverseCommunity/reverseCommunityList" &&
    to.path == "/reverseCommunity/reverseCommunityMsg"
  ) {
    from.meta.keepAlive = true;
  } else {
    from.meta.keepAlive = false;
  }
  if (to.meta.title) {
    window.document.title = to.meta.title;
  }else{
    window.document.title = "app-ui";
  }
  next();
});
//导出
export default router;
