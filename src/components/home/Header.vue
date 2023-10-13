<template>
  <div class="header-page" @mouseleave="navChildrenLeave">
    <div class="header-component" ref="headerRef">
      <!-- logo 部分 -->
      <div class="header-logo">
        <a href="#/gateway">
          <img
            src="https://portal-demo.obs.cn-north-4.myhuaweicloud.com:443/broker%2Fportal%2Ftest%2F67e986d009e343fe9c2cbd6ffeebce41.PNG"
          />
        </a>
      </div>
      <!-- 菜单部分 -->
      <div class="header-menu">
        <ul ref="menuRef">
          <!-- 左右箭头 -->
          <i ref="arrowLeftRef" class="arrow-left" @click="arrowLeftClick"></i>
          <i
            ref="arrowRightRef"
            class="arrow-right"
            @click="arrowRightClick"
          ></i>
          <li
            v-for="(item, key) in menuList"
            :key="key"
            v-bind:class="{ 'two-menu': item.childrenList.length > 0 }"
          >
            <template v-if="item.navigationUrl">
              <a
                @mouseenter="navChildrenEnter(item)"
                :href="item.navigationUrl"
                class="menu-icon"
              >
                <span
                  :class="{ 'menu-active': item.navigationUrl == routerStr }"
                  >{{ item.headNavigationName }}</span
                >
                <span
                  class="el-icon-arrow"
                  v-if="item.childrenList.length > 0"
                ></span>
                <!-- <span class="el-icon-arrow-up"></span> -->
              </a>
            </template>
            <!-- 存在子级菜单的一级菜单 -->
            <template v-else>
              <a
                @mouseenter="navChildrenEnter(item)"
                href="javascript:void(0)"
                class="menu-icon"
              >
                <span>{{ item.headNavigationName }}</span>
                <span
                  class="el-icon-arrow"
                  v-if="item.childrenList.length > 0"
                ></span>
                <!-- <span class="el-icon-arrow-up"></span> -->
              </a>
            </template>
          </li>
        </ul>
      </div>
      <!-- 登录注册部分 -->
      <div class="header-login-register">
        <div
          v-if="isLogin"
          class="user-info"
          @mouseenter="mouseEnterUserInfo"
          @mouseleave="mouseLeaveUserInfo"
        >
          <div class="info-box">
            <span style="cursor: default">{{ loginUserName }}</span>
          </div>
          <div class="controlShow" v-show="controlShow">
            <ul class="controlShowUl">
              <li
                :class="
                  localUserInfo.authStatus === 1
                    ? 'trueName unAuthState'
                    : 'trueName'
                "
              >
                <a
                  class="info-a"
                  href="http://yungongplat.com/#/user-info"
                  data-sensors-click
                  >基本信息
                  <span>{{
                    localUserInfo.authStatus == 1 ? "未实名认证" : "已实名认证"
                  }}</span>
                </a>
              </li>

              <li @click="exitLog">退出登录</li>
            </ul>
          </div>
        </div>
        <template v-else>
          <a href="http://yungongplat.com/#/client-login"
            ><div class="login-link hover">
              <span>登录</span>
            </div>
          </a>
          <a href="http://yungongplat.com/#/register"
            ><div class="reg-link">免费注册</div></a
          >
        </template>
      </div>
    </div>
    <!-- 子级菜单部分 -->
    <div class="twoMenu" :class="{ isShowChildren: isShowChildren }">
      <div class="twoMenuList">
        <div
          v-for="(twoItem, twoKey) in chidrenNavList"
          :key="twoKey"
          class="two-menu-item"
        >
          <div
            class="two-menu-title"
            :class="{ isBorder: twoItem.childrenList.length > 0 }"
          >
            <a :href="twoItem.navigationUrl" class="jumpUrl">
              <span :class="{ activeColor: twoItem.navigationUrl }">{{
                twoItem.headNavigationName
              }}</span>
            </a>
          </div>

          <div
            v-for="(item2, twoKey) in twoItem.childrenList"
            :key="twoKey"
            class="wy"
          >
            <a :href="item2.navigationUrl" class="jumpUrl third-menu">
              <span :class="{ activeColor: item2.navigationUrl }">{{
                item2.headNavigationName
              }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headApi from "@/api/home/headApi";
export default {
  name: "Header",
  data() {
    return {
      //判断是否登录
      isLogin: false,
      loginUserName: "",
      localUserInfo: {},
      controlShow: false,
      // 菜单列表
      menuList: [],
      isShowChildren: false,
      chidrenNavList: [],
      twoStr: "",
      routerStr: "",
    };
  },
  //监听当前路由地址
  watch: {
    $route(to) {
      if (process.env.NODE_ENV === "production") {
        this.routerStr = "http://yungongplat.com/cbp/conch#" + to.path;
      } else {
        this.routerStr = "#" + to.path;
      }
    },
  },
  mounted() {
     if (process.env.NODE_ENV === "production") {
        this.routerStr = "http://yungongplat.com/cbp/conch#" + this.$route.path;
      } else {
        this.routerStr = "#" + this.$route.path;
      }
    // 监听窗口改变
    window.addEventListener("resize", this.resizeWindowHandler);
    // 如果是生产环境从后台获取头部导航
    if (process.env.NODE_ENV === "production") {
      this.queryGetHeaderNav();
    } else {
      this.menuList = [
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "902ce605c2ab4c219925919982d3d237",
          headNavigationName: "门户网站",
          headNavigationType: "0",
          headNavigationCode: "902ce605c2ab4c219925919982d3d237",
          parentCode: "",
          navigationSort: 1,
          navigationUrl: "#/gateway",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "a50c9553fcf24498b940ff4867e6d555",
          headNavigationName: "新闻资讯",
          headNavigationType: "0",
          headNavigationCode: "a50c9553fcf24498b940ff4867e6d555",
          parentCode: "",
          navigationSort: 2,
          navigationUrl: "#/news",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "2d9cd8f01a724775b745b6cbeb18d414",
          headNavigationName: "行业监测",
          headNavigationType: "0",
          headNavigationCode: "2d9cd8f01a724775b745b6cbeb18d414",
          parentCode: "",
          navigationSort: 3,
          navigationUrl: "#/industry",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "388b6b19e2414314b8f80cbe90b6d1b8",
          headNavigationName: "解决方案",
          headNavigationType: "0",
          headNavigationCode: "388b6b19e2414314b8f80cbe90b6d1b8",
          parentCode: "",
          navigationSort: 4,
          navigationUrl: null,
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [
            {
              delStatus: null,
              createUserId: null,
              createUsername: null,
              createTime: null,
              updateUserId: null,
              updateUsername: null,
              updateTime: null,
              id: "a06df2415df94daf99b994fca74e872a",
              headNavigationName: "水泥",
              headNavigationType: "1",
              headNavigationCode: "a06df2415df94daf99b994fca74e872a",
              parentCode: "388b6b19e2414314b8f80cbe90b6d1b8",
              navigationSort: 1,
              navigationUrl: "/cbp/portal/industry/customer_cementpage",
              navigationBeforePictureUrl: null,
              navigationAfterPictureUrl: null,
              deployStatus: null,
              navigationAfterPictureUrlFlag: "0",
              parentName: "解决方案",
              childrenList: [
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "311e3367770b416a90937d43a097cb7a",
                  headNavigationName: "物料自动清堵解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "311e3367770b416a90937d43a097cb7a",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 1,
                  navigationUrl: "/cbp/portal/industry/materialautosolution",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "223025d48300407ab70ee3f239bf5fe7",
                  headNavigationName: "水泥汽运流向统一智能监控平台",
                  headNavigationType: "2",
                  headNavigationCode: "223025d48300407ab70ee3f239bf5fe7",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 2,
                  navigationUrl:
                    "/cbp/portal/industry/shuinimonitoringplatform",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "f8fb4402e2824c77bb56872c580d856e",
                  headNavigationName: "水泥专家自动操作系统解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "f8fb4402e2824c77bb56872c580d856e",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 3,
                  navigationUrl: "",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "8545981b0c2c4f41a4ab11c2bb9481af",
                  headNavigationName: "智慧加油优化解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "8545981b0c2c4f41a4ab11c2bb9481af",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 4,
                  navigationUrl:
                    "/cbp/portal/industry/intelligentrefuelingsolution",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "0d7b96ee807c450dba9494fcaea0ac11",
                  headNavigationName: "设备管理及辅助巡检系统解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "0d7b96ee807c450dba9494fcaea0ac11",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 5,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "02c33125d62442cca33f0b0bd842e09b",
                  headNavigationName: "智慧运营管理平台",
                  headNavigationType: "2",
                  headNavigationCode: "02c33125d62442cca33f0b0bd842e09b",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 6,
                  navigationUrl: "/cbp/portal/industry/intelligentoperation",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "bd4465094b0d4bf3a207efbb7f706584",
                  headNavigationName: "数字化矿山解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "bd4465094b0d4bf3a207efbb7f706584",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 7,
                  navigationUrl: "/cbp/portal/industry/digitalminesolutions",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "fbeaaec243ff42ba8854465255d02bc7",
                  headNavigationName: "智能化仓库解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "fbeaaec243ff42ba8854465255d02bc7",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 8,
                  navigationUrl: "/cbp/portal/industry/intelligentwarehouse",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "bba8f1e6172d48408380d0ddc1162abb",
                  headNavigationName: "车无人化解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "bba8f1e6172d48408380d0ddc1162abb",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 9,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "80c95881c4a44f62adb71c78e6a44ca5",
                  headNavigationName: "智能停送电解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "80c95881c4a44f62adb71c78e6a44ca5",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 10,
                  navigationUrl: "",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "df1d7d6934ee452f85d367643b4be850",
                  headNavigationName: "自动控制系统优化解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "df1d7d6934ee452f85d367643b4be850",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 11,
                  navigationUrl: "",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "469d60d2ea384d2290512e6e8ae94ede",
                  headNavigationName: "优化控制+人工智能解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "469d60d2ea384d2290512e6e8ae94ede",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 12,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "12b4798e5a1e447787f0b3eff74c1ad3",
                  headNavigationName: "能源管理优化解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "12b4798e5a1e447787f0b3eff74c1ad3",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 13,
                  navigationUrl: "",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "f1ded2433b574059b1f3131a94914b23",
                  headNavigationName: "智能质量控制系统解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "f1ded2433b574059b1f3131a94914b23",
                  parentCode: "a06df2415df94daf99b994fca74e872a",
                  navigationSort: 14,
                  navigationUrl: "/cbp/portal/industry/intelligentquality",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
              ],
              websiteHeaderCode: null,
              navigationStyle: "0",
              expandHref: null,
              supplierCode: null,
              iconUrl: null,
            },
            {
              delStatus: null,
              createUserId: null,
              createUsername: null,
              createTime: null,
              updateUserId: null,
              updateUsername: null,
              updateTime: null,
              id: "7e60d86aba9b4a75ab6d2c0d76e01e20",
              headNavigationName: "型材",
              headNavigationType: "1",
              headNavigationCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
              parentCode: "388b6b19e2414314b8f80cbe90b6d1b8",
              navigationSort: 2,
              navigationUrl: null,
              navigationBeforePictureUrl: null,
              navigationAfterPictureUrl: null,
              deployStatus: null,
              navigationAfterPictureUrlFlag: "0",
              childrenList: [
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "a4e0fddb35fa4358b20687823f3cc391",
                  headNavigationName: "型材大规模定制解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "a4e0fddb35fa4358b20687823f3cc391",
                  parentCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
                  navigationSort: 1,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "964507955e484054b689b0d866ab879b",
                  headNavigationName: "APS 排产解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "964507955e484054b689b0d866ab879b",
                  parentCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
                  navigationSort: 2,
                  navigationUrl: "/cbp/portal/industry/apssolution",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "2335873aa5d14028a79161fb84e392b6",
                  headNavigationName: "绿色环保解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "2335873aa5d14028a79161fb84e392b6",
                  parentCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
                  navigationSort: 3,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "ef4b5c97bbab4cd2a9f9ceecb4c20f49",
                  headNavigationName: "在线质量检测解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "ef4b5c97bbab4cd2a9f9ceecb4c20f49",
                  parentCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
                  navigationSort: 4,
                  navigationUrl: "/cbp/portal/industry/onlinequality",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "5e8c74088c684fc58da6012606f32cd2",
                  headNavigationName: "碳中和解决方案",
                  headNavigationType: "2",
                  headNavigationCode: "5e8c74088c684fc58da6012606f32cd2",
                  parentCode: "7e60d86aba9b4a75ab6d2c0d76e01e20",
                  navigationSort: 5,
                  navigationUrl: null,
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
              ],
              websiteHeaderCode: null,
              navigationStyle: "0",
              expandHref: null,
              supplierCode: null,
              iconUrl: null,
            },
          ],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "942ff23c0f4f453184e0e8c2befbbc6c",
          headNavigationName: "客户案例",
          headNavigationType: "0",
          headNavigationCode: "942ff23c0f4f453184e0e8c2befbbc6c",
          parentCode: "",
          navigationSort: 5,
          navigationUrl: null,
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [
            {
              delStatus: null,
              createUserId: null,
              createUsername: null,
              createTime: null,
              updateUserId: null,
              updateUsername: null,
              updateTime: null,
              id: "6b967990b79240d681fd086774b526aa",
              headNavigationName: "水泥行业",
              headNavigationType: "1",
              headNavigationCode: "6b967990b79240d681fd086774b526aa",
              parentCode: "942ff23c0f4f453184e0e8c2befbbc6c",
              navigationSort: 1,
              navigationUrl: "/cbp/portal/industry/cementindustry",
              navigationBeforePictureUrl: null,
              navigationAfterPictureUrl: null,
              deployStatus: null,
              navigationAfterPictureUrlFlag: "0",
              childrenList: [
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "19e866f766e54126b0a803070749a0ee",
                  headNavigationName: "智能质量控制系统标杆案例",
                  headNavigationType: "2",
                  headNavigationCode: "19e866f766e54126b0a803070749a0ee",
                  parentCode: "6b967990b79240d681fd086774b526aa",
                  navigationSort: 1,
                  navigationUrl: "/cbp/portal/industry/intelligentqcscase",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                  parentName: "客户案例",
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "6450241e7e9d48d197d74ded1987022f",
                  headNavigationName: "水泥专家自动操作系统+窑炉优化标杆案例",
                  headNavigationType: "2",
                  headNavigationCode: "6450241e7e9d48d197d74ded1987022f",
                  parentCode: "6b967990b79240d681fd086774b526aa",
                  navigationSort: 2,
                  navigationUrl: "/cbp/portal/industry/autooperationsystem",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "8a5b36d2ed034c37bd29ab5855fd27fb",
                  headNavigationName: "水泥行业设备管理及辅助巡检系统标杆案例",
                  headNavigationType: "2",
                  headNavigationCode: "8a5b36d2ed034c37bd29ab5855fd27fb",
                  parentCode: "6b967990b79240d681fd086774b526aa",
                  navigationSort: 3,
                  navigationUrl:
                    "/cbp/portal/industry/customer_cementdevicecheckcase",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
              ],
              websiteHeaderCode: null,
              navigationStyle: "0",
              expandHref: null,
              supplierCode: null,
              iconUrl: null,
            },
            {
              delStatus: null,
              createUserId: null,
              createUsername: null,
              createTime: null,
              updateUserId: null,
              updateUsername: null,
              updateTime: null,
              id: "a03839480227414e9a461859b2ca2ebb",
              headNavigationName: "其他行业",
              headNavigationType: "1",
              headNavigationCode: "a03839480227414e9a461859b2ca2ebb",
              parentCode: "942ff23c0f4f453184e0e8c2befbbc6c",
              navigationSort: 2,
              navigationUrl: "/cbp/portal/industry/otherindustries",
              navigationBeforePictureUrl: null,
              navigationAfterPictureUrl: null,
              deployStatus: null,
              navigationAfterPictureUrlFlag: "0",
              childrenList: [
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "bbe7f1a5897e40349a9f054344e8a258",
                  headNavigationName: "数字化矿山标杆案例",
                  headNavigationType: "2",
                  headNavigationCode: "bbe7f1a5897e40349a9f054344e8a258",
                  parentCode: "a03839480227414e9a461859b2ca2ebb",
                  navigationSort: 1,
                  navigationUrl: "",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
                {
                  delStatus: null,
                  createUserId: null,
                  createUsername: null,
                  createTime: null,
                  updateUserId: null,
                  updateUsername: null,
                  updateTime: null,
                  id: "ecdfd87dd73140619466ecc30e9e3cf7",
                  headNavigationName: "芜湖海螺能源管理系统标杆案例",
                  headNavigationType: "2",
                  headNavigationCode: "ecdfd87dd73140619466ecc30e9e3cf7",
                  parentCode: "a03839480227414e9a461859b2ca2ebb",
                  navigationSort: 2,
                  navigationUrl: "/cbp/portal/industry/energymanagesystemcase",
                  navigationBeforePictureUrl: null,
                  navigationAfterPictureUrl: null,
                  deployStatus: null,
                  navigationAfterPictureUrlFlag: "0",
                  childrenList: [],
                  websiteHeaderCode: null,
                  navigationStyle: "0",
                  expandHref: null,
                  supplierCode: null,
                  iconUrl: null,
                },
              ],
              websiteHeaderCode: null,
              navigationStyle: "0",
              expandHref: null,
              supplierCode: null,
              iconUrl: null,
            },
          ],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "15a60fbc98c344a5ad0d368256079c6a",
          headNavigationName: "应用商店",
          headNavigationType: "0",
          headNavigationCode: "15a60fbc98c344a5ad0d368256079c6a",
          parentCode: "",
          navigationSort: 6,
          navigationUrl: "#/app-store",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "e5859b22e1bc4816be7f8885baaf0904",
          headNavigationName: "开发者社区",
          headNavigationType: "0",
          headNavigationCode: "e5859b22e1bc4816be7f8885baaf0904",
          parentCode: "",
          navigationSort: 7,
          navigationUrl: "#/community",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "e4fa43f100c84e6bad2fcfd557dda736",
          headNavigationName: "数据资产服务",
          headNavigationType: "0",
          headNavigationCode: "e4fa43f100c84e6bad2fcfd557dda736",
          parentCode: "",
          navigationSort: 8,
          navigationUrl: "#/data-assets",
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "e2ab82a298f24a48aff95f1d682d9a42",
          headNavigationName: "合作生态",
          headNavigationType: "0",
          headNavigationCode: "e2ab82a298f24a48aff95f1d682d9a42",
          parentCode: "",
          navigationSort: 9,
          navigationUrl: null,
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
        {
          delStatus: null,
          createUserId: null,
          createUsername: null,
          createTime: null,
          updateUserId: null,
          updateUsername: null,
          updateTime: null,
          id: "6e4ddd8acf7e439ea783903bad30f020",
          headNavigationName: "关于我们",
          headNavigationType: "0",
          headNavigationCode: "6e4ddd8acf7e439ea783903bad30f020",
          parentCode: "",
          navigationSort: 11,
          navigationUrl: null,
          navigationBeforePictureUrl: null,
          navigationAfterPictureUrl: null,
          deployStatus: null,
          navigationAfterPictureUrlFlag: "0",
          childrenList: [],
          websiteHeaderCode: null,
          navigationStyle: "0",
          expandHref: null,
          supplierCode: null,
          iconUrl: null,
        },
      ];
    }
    // this.queryLogoNav();
    this.$nextTick(() => {
      //       && window.localStorage.getItem('userType')==='CLIENT_USER'
      if (
        window.localStorage &&
        window.localStorage.getItem("userInfo") &&
        window.localStorage.getItem("userType") === "CLIENT_USER"
      ) {
        this.isLogin = true;
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.localUserInfo = userInfo;
        this.loginUserName = userInfo.userName;
      }
      if (window.localStorage.getItem("userType") === "MANAGER_USER") {
        //清除localStorage
        window.localStorage.clear();
      }
    });
  },
  methods: {
    navChildrenEnter(item) {
      if (item.childrenList.length > 0) {
        this.isShowChildren = true;
        this.chidrenNavList = item.childrenList;
      } else {
        this.isShowChildren = false;
      }
    },
    navChildrenLeave() {
      this.isShowChildren = false;
    },
    mouseEnterUserInfo() {
      let te = setTimeout(() => {
        this.controlShow = true;
        clearTimeout(te);
      }, 70);
    },
    mouseLeaveUserInfo() {
      let t1 = setTimeout(() => {
        this.controlShow = false;
        clearTimeout(t1);
      }, 100);
    },
    // 查询顶部
    queryGetHeaderNav() {
      headApi.getHeaderNav().then((res) => {
        if (res && res.result) {
          this.menuList = res.obj || [];
        }
      });
    },

    // 查询logo
    // queryLogoNav() {
    //   headApi.queryportallogo().then((res) => {
    //     console.log(res, "logo");
    //   });
    // },
    resizeWindowHandler() {
      if (this.$refs.headerRef) {
        if (this.$refs.headerRef.offsetWidth > 1500) {
          this.$refs.arrowLeftRef.style.display = "none";
          this.$refs.menuRef.style.marginLeft = "0px";
          this.$refs.arrowRightRef.style.display = "none";
        } else {
          this.$refs.arrowRightRef.style.display = "block";
          this.$refs.arrowLeftRef.style.display = "none";
          this.$refs.menuRef.style.marginLeft = "0px";
        }
      }
    },
    // 右侧按钮点击 将右边最后一个展示出来
    arrowRightClick() {
      // 获取菜单ul的宽度
      let offsetWidth = this.$refs.menuRef.clientWidth;
      let scrollWidth = this.$refs.menuRef.scrollWidth;
      // 隐藏右边箭头 展示左边箭头
      if (scrollWidth > offsetWidth) {
        this.$refs.menuRef.style.marginLeft = offsetWidth - scrollWidth + "px";
        this.$refs.arrowRightRef.style.display = "none";
        this.$refs.arrowLeftRef.style.display = "block";
      }
    },
    // 左侧箭头点击 将左边第一个展示出来
    arrowLeftClick() {
      // 隐藏左侧箭头展示右侧箭头
      this.$refs.menuRef.style.marginLeft = "0px";
      this.$refs.arrowRightRef.style.display = "block";
      this.$refs.arrowLeftRef.style.display = "none";
    },
    exitLog() {
      // 清除状态保持
      window.localStorage.clear();
      this.isLogin = false;
      // 状态保持清除后刷新页面
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-active {
  color: #3369ff;
}
.twoMenu {
  display: none;
  position: absolute;
  left: 47%;
  background-color: #fff;
  min-width: 730px;
  width: calc(100% - 540px);
  max-width: 1280px;
  transform: translateX(-50%);
  border-top: 1px solid #3369ff;
  box-shadow: 0 0 1px #ccc;
  z-index: 9999;
  .twoMenuList {
    margin: 32px 48px;
    display: flex;
    max-height: 400px;
    overflow-y: auto;
    .two-menu-item {
      width: 224px;
      margin-right: 55px;
      .two-menu-title {
        font-size: 14px;
        color: #212a40;
        font-weight: 600;
        padding-bottom: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .isBorder {
        border-bottom: 1px solid #e5e5e5;
      }
    }
    .wy {
      line-height: 24px;
      margin: 10px 0;
      color: #212a40;
      font-weight: 400;
      width: 224px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .activeColor {
      color: #3369ff;
    }
    .jumpUrl {
      cursor: text;
    }
    .activeColor {
      color: #1e2b4d;
      cursor: pointer;
    }
    .jumpUrl:hover {
      .activeColor {
        color: #3369ff;
      }
    }
  }
}
.isShowChildren {
  display: block;
}
.header-component {
  display: flex;
  background: white;
  padding: 0 72px;
  // box-shadow: 0px 4px 10px rgba(33,76,217,0.2);

  .el-menu-item {
    font-size: 18px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0px;
  }

  .header-logo {
    display: flex;
    flex-flow: column;
    justify-content: center;
    img {
      height: 50px;
    }
  }
  .header-menu {
    overflow: hidden;
    width: calc(100% - 660px);
    flex: 1;
    margin: 0 32px 0 32px;
    position: relative;
    .displayNone {
      display: none;
    }
    .displayBlock {
      display: block;
    }
    ul {
      display: flex;
      font-size: 18px;
      i.arrow-left {
        background-image: linear-gradient(90deg, #fff, #fff 40%, transparent);
        position: absolute;
        width: 30px;
        height: 64px;
        left: 0;
        top: 50%;
        transform: translateY(-55%);
        cursor: pointer;
        z-index: 10;
        &:before {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          left: 6px;
          border-top: 1px solid #212a40;
          border-left: 1px solid #212a40;
          top: 50%;
          transform: rotate(-45deg);
        }
      }
      i.arrow-right {
        background-image: linear-gradient(270deg, #fff, #fff 40%, transparent);
        position: absolute;
        width: 30px;
        height: 64px;
        top: 50%;
        transform: translateY(-55%);
        right: 0;
        z-index: 10;
        cursor: pointer;
        &:after {
          position: absolute;
          content: "";
          width: 6px;
          height: 6px;
          border-bottom: 1px solid #212a40;
          border-right: 1px solid #212a40;
          top: 50%;
          right: 2px;
          transform: rotate(-45deg);
        }
      }
      li {
        height: 64px;
        line-height: 64px;
        display: inline-block;
        white-space: nowrap;
        font-size: 18px;
        margin-right: 16px;
        position: relative;
        a {
          display: inline-block;
        }
        &:hover {
          color: #3369ff;
          cursor: pointer;
          border-bottom: 2px solid #3369ff;
        }
      }
      :last-child {
        margin-right: 0px;
      }
    }
    .two-menu {
      font-family: -apple-system, BlinkMacSystemFont, SF Pro SC, SF Pro Text,
        Helvetica Neue, Helvetica, PingFang SC, Segoe UI, Roboto,
        Hiragino Sans GB, arial, microsoft yahei ui, Microsoft YaHei, SimSun,
        sans-serif;
      position: relative;
    }
  }
  .header-login-register {
    display: flex;
    align-items: center;
    line-height: 64px;
    font-size: 14px;
    background: #fff;
    z-index: 1000;
    .user-info {
      position: relative;
      display: flex;
      height: 50px;
      line-height: 50px;
      &::before {
        content: "";
        width: 28px;
        height: 28px;
        display: inline-block;
        margin-right: 12px;
        vertical-align: middle;
        background-image: url("@/assets/images/userLogo.png");
        background-size: 100%;
        margin-top: 10px;
      }

      .info-box {
        span {
          display: inline-block;
          max-width: 114px;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .login-link {
      margin-right: 16px;
    }
    .hover {
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .reg-link {
      width: 104px;
      height: 32px;
      line-height: 32px;
      background: #3369ff;
      border-radius: 1px;
      text-align: center;
      letter-spacing: 0;
      color: #fff;
      cursor: pointer;
    }
  }

  .hover:hover {
    color: #3369ff !important;
  }
  @media only screen and (max-width: 1500px) {
    .arrow-right {
      display: block;
    }
    .arrow-left {
      display: none;
    }
    .header-menu {
      margin: 0 32px 0 32px;
    }
  }
  @media only screen and (min-width: 1500px) {
    .arrow-right {
      display: none;
    }
    .arrow-left {
      display: none;
    }
  }
}
.controlShow {
  width: 182px;
  box-sizing: border-box;
  position: absolute;
  top: 46px;
  right: 0;
  z-index: 9999 !important;
  background: #fff;
  box-shadow: 0px 2px 8px 0px rgba(33, 76, 217, 0.2);
  animation: mydown1 0.5s linear;
  animation-fill-mode: both;

  .controlShowUl {
    list-style: none;
    padding-top: 6px;
    margin: 0;
    border-bottom: 1px solid rgba(219, 222, 234, 1);

    li {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      text-align: left;
      padding-left: 10px;
      border-left: 2px solid rgba(255, 255, 255, 0);
      position: relative;
      cursor: pointer;

      &:not(.nohover):hover {
        border-left: 2px solid rgba(51, 105, 255, 1);
        background: rgba(236, 243, 255, 1);
      }
      &.nohover {
        margin-top: 6px;
        cursor: default;

        div {
          height: 30px;
          line-height: 30px;
          width: 100%;

          *:last-child {
            position: absolute;
            left: 10px;
            top: 5px;
            color: rgb(163, 169, 183);
            font-size: 12px;
          }
        }
      }
      &:last-child {
        height: 34px;
        line-height: 34px;
        color: #a3a9b7;
        border-top: solid 1px #dbdeea;
      }

      .info-a {
        display: block;
      }

      a {
        font-size: 12px;
        font-weight: 400;
        color: rgba(33, 42, 64, 1);
        text-decoration: none;
      }

      &.trueName {
        position: relative;
      }
      &.trueName span {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #00b3b0;
      }

      &.trueName span::before {
        content: "";
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 2px;
        margin-top: -2px;
        background-image: url("@/assets/images/tip-ok.png");
        background-size: 100%;
        vertical-align: middle;
      }

      &.trueName.unAuthState span {
        color: #fd6845;
      }
      &.trueName.unAuthState span::before {
        background-image: url("@/assets/images/tip-error.png");
      }
    }
  }
}
@media screen and(max-width:768px) {
  .header-component {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1370px) {
  .two-menu-list {
    width: calc(100vw - 144px) !important;
  }
  .twoMenu {
    display: none;
    position: absolute;
    left: 50%;
    background-color: #fff;
    min-width: 730px;
    width: calc(100% - 540px);
    max-width: 1280px;
    transform: translateX(-50%);
    z-index: 9999;
  }
  .isShowChildren {
    display: block;
  }
}
.el-icon-arrow {
  // font-size: 14px;
  width: 20px;
  height: 20px;
  margin: -4px 2px;
  background-image: url("@/assets/images/xia.png");
  transform: scale(0.8);
}
.el-icon-arrow:hover {
  background-image: url("@/assets/images/lanshang.png");
  margin: -4px 2px;
  transform: rotate(180deg);
  transform: scale(0.8);
}
.menu-icon:hover {
  color: rgba(51, 105, 255, 1);
  .el-icon-arrow {
    /* 旋转360度 */
    background-image: url("@/assets/images/lanshang.png");
    transform: rotate(360deg);
    transition: all 0.2s;
    transform: scale(0.8);
  }
}
</style>
