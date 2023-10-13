const reverseCommunityRouter = {
  path: "/reverseCommunity",
  component: () => import("../Header/ReverseCommunity"),
  //重定向到子路由
  redirect: "/reverseCommunity/loginA",
  children: [
    {
      path: "/reverseCommunity/reverseCommunityList",
      component: () => import("../Page/ReverseCommunityList"),
      meta: {
        keepAlive: true,
        title: "反向社区",
      },
    },
    {
      path: "/reverseCommunity/reverseCommunityInfo",
      component: () => import("../Page/ReverseCommunityInfo"),
    },
    {
      path: "/reverseCommunity/reverseCommunityMsg",
      component: () => import("../Page/ReverseCommunityMsg"),
    },
    {
      path: "/reverseCommunity/loginA",
      component: () => import("../Page/LoginA"),
      meta: {
        title: "登录A",
      },
    },
    {
      path: "/reverseCommunity/loginB",
      component: () => import("../Page/LoginB"),
      meta: {
        title: "登录B",
      },
    },
    {
      path: "/reverseCommunity/loginC",
      component: () => import("../Page/LoginC"),
    },
    {
      //富文本编辑器
      path: "/alternate",
      component: () => import("../Page/AlternateA"),
      meta: {
        title: "富文本编辑器",
      },
    },
    {
      //原生js实现截图显示
      path: "/screenshot",
      component: () => import("../Page/ScreenShot"),
      meta: {
        title: "原生js实现截图",
      },
    },
    {
      //冻结对象FreezeObjects
      path: "/freeze-objects",
      component: () => import("../Page/FreezeObjects"),
      meta: {
        title: "冻结对象",
      }
    },
    {
      //input输入框联动
      path: "/linkageInput",
      component: () => import("../Page/LinkageInput"),
      meta: {
        title: "联动input框",
      }
    },
    {
      //我是父组件
      path: "/father",
      component: () => import("../Page/Parentpage"),
      meta: {
        title: "我是父组件",
      }
    },
    {
      //我是子组件
      path: "/child",
      component: () => import("../Page/ParentSon"),
      meta: {
        title: "我是子组件",
      }
    },
    {
      //富文本编辑器展示
      path: "/alternateShow",
      name: "alternateShow",
      component: () => import("../Page/AlternateShow"),
      meta: {
        title: "富文本编辑器展示",
      },
    },
    {
      //3D分层按钮悬停
      path: "/3D",

      component: () => import("../Page/Button3D"),
    },
    {
      //卡片
      path: "/card",
      component: () => import("../Page/CardLeran"),
    },
    {
      //卡片2
      path: "/card2",
      component: () => import("../Page/CardLeran2"),
    },
    {
      //聚焦图
      path: "/focusImg",
      component: () => import("../Page/FocusImg"),
    },
    {
      //打印
      path: "/print",
      component: () => import("../Page/PrintPaper"),
    },
    {
      //插槽
      path: "/slot",
      component: () => import("../Page/Slot/NewCatalog.vue"),
    },
    {
      //鼠标悬停动画效果
      path: "/mouse",
      component: () => import("../Page/MouseHover"),
    },
    {
      //点击左右移动
      path: "/move",
      component: () => import("../Page/MoveDiv"),
    },
    {
      //组件通信
      path: "/communication",
      component: () => import("../Page/GrandPage"),
    },
    {
      //门户网站
      path: "/protal",
      component: () => import("../Page/protal"),
    },
    {
      //评论组件
      path: "/comment",
      component: () => import("../Page/comment/index.vue"),
    },
    {
      //两种排序
      path: "/sort",
      component: () => import("../Page/sort/index.vue"),
    },
    {
      //echarts练习
      path: "/echarts",
      component: () => import("../Page/echarts/index.vue"),
    }
  ],
};


export default reverseCommunityRouter;
