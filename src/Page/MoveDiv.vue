<template>
  <div class="data-assets">
    <banner-image :bannerList="bannerList"></banner-image>
    <div class="main-content">
      <div class="header-content">
        <h1>数据资产服务</h1>
        <a href="#/home/assets-detail">
          <p>总计{{ total }}个模型服务</p>
        </a>
      </div>
      <ul class="content-menu">
        <div class="ftg">
          <li class="text" v-for="item in modelList" :key="item.modelTypeName">
            <div
              class="title"
              :style="{ 'background-image': 'url(' + item.imgSrc + ')' }"
            >
              <h1>{{ item.modelTypeName }}</h1>
            </div>
            <div class="number">{{ item.modelCount }}个</div>
            <div class="description">{{ item.depictionInfo }}</div>
            <div class="learn"><span>了解详情</span></div>
          </li>
        </div>
      </ul>
      <div class="btn" style="text-align: center">
        <button class="leftBtn el-icon-arrow-left"></button>
        <button class="rightBtn el-icon-arrow-right"></button>
      </div>
    </div>
  </div>
</template>
<script>
import BannerImage from "@/components/BannerImage";
export default {
  components: { BannerImage },
  name: "dataAssets",
  data() {
    return {
      total: 219,
      bannerList: [
        {
          id: 1,
          imgSrc: require("@/assets/images/data-assets/banner.png"),
          title: "数据资产管理平台",
          desc: "平台通过对企业提供数据进行定制化处理，互联网赋能实体，实现互联网工业化",
        },
        {
          id: 2,
          imgSrc: require("@/assets/images//data-assets/banner2.png"),
          title: "数据资产管理平台",
          desc: "平台通过对企业提供数据进行定制化处理",
        },
      ],
      modelList: [
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u65.png",
          modelTypeName: "数据算法模型",
          modelCount: "137",
          depictionInfo:
            "根据项的相关信息、用户相关信息及用户对项的操作行为，来构建推荐算法模型，深入激发、满足用户的潜在需求，通过算法更好地满足需求侧多维度诉求。",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u45.png",
          modelTypeName: "行业机理模型",
          modelCount: "60",
          depictionInfo:
            "模型服务要解决的是要通过微服务构建一套高可用、高并发、高性能、高负载、高扩展的服务体系，通过建立不同的模型，支持平台服务者、使用者和管理者的多元化服务需求。",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u65.png",
          modelTypeName: "研发仿真模型",
          modelCount: "3",
          depictionInfo:
            "平台使用分析工具，对客观真实的数据进行科学分析，为管理者提供真实有效的科学决策依据，宜导与时俱进的充分利用信息技术资源，促进企业管理可持续发展。",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u45.png",
          modelTypeName: "业务流程模型",
          numbemodelCountr: "17",
          depictionInfo:
            "将大量的计算机资源统一的进行管理和调度，用户通过网络按照按需和易扩展的方式，在任何时间、任何地点实现数据存取和数据运算等所需服务。",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u65.png",
          modelTypeName: "其他",
          modelCount: "2",
          depictionInfo:
            "段工段工段给",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u65.png",
          modelTypeName: "其他1",
          modelCount: "2",
          depictionInfo:
            "哒哒哒哒哒",
        },
        {
          imgSrc:
            "http://127.0.0.1:32767/14.44.31/images/%E6%95%B0%E6%8D%AE%E8%B5%84%E4%BA%A7%E6%9C%8D%E5%8A%A1%E9%A6%96%E9%A1%B5/u65.png",
          modelTypeName: "其他2",
          modelCount: "2",
          depictionInfo:
            "哈哈哈哈哈",
        },
      ],
    };
  },
  created() {},
  mounted() {
    let leftBtn = document.querySelector(".leftBtn");
    let rightBtn = document.querySelector(".rightBtn");
    let ftg = document.querySelector(".ftg");
    let text = document.querySelectorAll(".text");
    let num = 0;
    leftBtn.onclick = function () {
      num += 241;
      ftg.style.transform = `translateX(-${num}px)`;
      if (num >= 241 * (text.length - 5)) {
        num = 241 * (text.length - 5);
        leftBtn.disabled = true;
      }
      rightBtn.disabled = false;
      console.log(num);
    };
    rightBtn.onclick = function () {
      num -= 241;
      ftg.style.transform = `translateX(-${num}px)`;
      if (num <= 0) {
        num = 0;
        rightBtn.disabled = true;
      }
      leftBtn.disabled = false;
      console.log(num);
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.btn {
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.main-content {
  min-width: 1200px;
  overflow: auto;
  margin: 0 auto 200px;
  .header-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 90px 0 35px 0;
    box-sizing: border-box;
    h1 {
      margin: 0;
    }
    p {
      font-weight: 241;
      font-style: normal;
      font-size: 22px;
      color: #3369ff;
      cursor: pointer;
    }
  }
  .content-menu {
    width: 1200px;
    margin: 0 auto;
    padding-top: 12px;
    overflow: hidden;
    background-color: pink;
    .ftg {
      display: flex;
      transition: all 0.5s;
    }
    li {
      float: left;
      min-width: 235px;
      margin: 0 3px;
      overflow: hidden;
      transition: all 0.5s ease 0s;
      background: url(@/assets/images/data-assets/list-bg.png) 0% 0% / 100% 100%;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.5s ease 0s;
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 10px #ccc;
      }
      .title {
        color: #fff;
        line-height: 70px;
        text-indent: 20px;
        width: 100%;
        height: 70px;
        background-size: 100% 100%;
        h1 {
          color: #fff;
          line-height: 70px;
          text-indent: 20px;
          margin: 0;
        }
      }
      .number {
        font-size: 42px;
        color: #212a40;
        padding: 20px 0 20px 15px;
      }
      .description {
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 30px;
        color: #6d7383;
        font-size: 12px;
        height: 150px;
        line-height: 2;
        letter-spacing: -1px;
      }
      .learn {
        text-align: center;
        margin: 0 15px 10px 15px;
        border: 1px solid rgba(51, 105, 255, 1);
        color: #3369ff;
        font-size: 12px;
        background-color: #fff;
        cursor: pointer;
        span {
          display: block;
          padding: 8px 0px;
        }
      }
    }
    li:first-child {
      margin-left: 0;
    }
  }
}
</style>
