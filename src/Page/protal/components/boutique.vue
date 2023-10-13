<template>
  <div id="page-boutique">
    <div class="top">
      <p class="title">海螺精品应用</p>
      <p class="desc">打造工业技术生态</p>
    </div>
    <div class="middle">
      <div class="card" v-for="(item, index) in cardList" :key="index">
        <div class="photo">
          <img :src="item.imgSrc" alt="" />
        </div>
        <div class="text-cover">
          <h1>{{ item.title }}</h1>
          <div class="line"></div>
          <p>
            {{ item.content }}
          </p>
          <div class="btn">
            <el-button @click="goGoodsDetail(item.url)">了解详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-boutique",
  data() {
    return {
      cardList: [
        {
          title: "新材自动排产APP",
          content:
            "通过产能预测功能，可根据日历、维护在系统中的设备信息以及需要生产的物料信息，精确的计算出工厂工序整体的产能分布情况以及产能负荷情况，同时系统能按照产能分布通过算法得到单工序所需求的人员数量。",
          imgSrc: require("@/assets/images/portal/app1.png"),
          url: "http://yungongplat.com/cbp/portal/market/detail?goodsCode=BM20221212FN7ZH0&goodsCodes=,1",
        },
        {
          title: "大规模定制服务APP",
          content:
            "产品越来越多，现有的管理体制无法有效地满足客户定制化需求。这两年市场发生了很大的变化，从规模化发展到了个性化发展，因此提升海螺管理的效率，是非常重要的。",
          imgSrc: require("@/assets/images/portal/app2.png"),
          url: "http://yungongplat.com/cbp/portal/market/detail?goodsCode=BM202212124KNVIP&goodsCodes=,1",
        },
        {
          title: "水泥生产监管APP",
          content:
            "中国水泥协会批准发布《水泥工业大气污染物超低排放标准》团体标准，将于2022年7月20日实施，标准规定了水泥制造企业（含独立粉磨站）、水泥原料矿山、散装水泥中转站、水泥制品企业及其生产设施的大气污染物超低排放限值、监测及监督管理要求。",
          imgSrc: require("@/assets/images/portal/app3.png"),
          url: "http://yungongplat.com/cbp/portal/market/detail?goodsCode=BM20221212SW1KJ8&goodsCodes=,1",
        },
        {
          title: "工业设备数据采集APP",
          content:
            "数据采集从传感器和其它待测设备等模拟和数字被测单元中自动采集非电量或者电量信号,送到上位机中进行分析，处理。工业生产设备数据采集是利用泛在感知技术对各种工业生产设备进行实时高效采集和云端汇聚。",
          imgSrc: require("@/assets/images/portal/app4.png"),
          url: "http://yungongplat.com/cbp/portal/market/detail?goodsCode=BM20221212G9I2XW&goodsCodes=,1",
        },
      ],
    };
  },

  created() {},

  mounted() {
    //监听窗口大小变化
    window.addEventListener("resize", this.handleResize, false);
  },

  methods: {
    handleResize() {
      this.$nextTick(() => {
        let cardWidth = document.getElementsByClassName("card")[0].offsetWidth;
        let cardHeight = cardWidth / 0.85;
      //   let cardList = document.getElementsByClassName("card");
      //   for (let i = 0; i < cardList.length; i++) {
      //     cardList[i].style.height = cardHeight + "px";
      //   }
      //css变量设置高度,在css中使用var(--myHeight)获取,这样可以在不同的地方使用同一个变量且不会相互影响，而且可以在js中动态设置
        document.querySelector(".card").style.setProperty("--myHeight", cardHeight + "px");
      });
    },
    goGoodsDetail(url) {
      // 在当前窗口打开url
      window.location.href = url;
    },
  },
  //销毁时移除监听
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize, false);
  },
};
</script>

<style lang="scss" scoped>
#page-boutique {
  width: 100%;
  .top {
    text-align: center;
    padding-top: 88px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 48px;
      color: #212a40;
      font-weight: 500;
      margin-bottom: 25px;
    }
    .desc {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #6d7383;
      font-weight: 500;
      margin-bottom: 70px;
    }
  }
  .middle {
    display: flex;
    .card {
      position: relative;
      min-width: 300px;
      width: 25%;
      height: var(--myHeight);
      overflow: hidden;
      .photo {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .photo::before {
        transition: all 0.5s;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
      }
      //最后一个photo的样式
      &:last-child .photo::before {
        background: rgba(0, 0, 0, 0.6);
      }
      .text-cover {
        position: absolute;
        top: 27%;
        width: 100%;
        color: #ffffff;
        opacity: 0.86;
        font-family: PingFangSC-Medium;
        text-align: center;
        h1 {
          font-size: 24px;
          line-height: 34px;
          font-weight: 500;
        }
        .line {
          margin: 0 auto;
          width: 40px;
          height: 2px;
          background: #ffffff;
          position: relative;
          top: -4px;
        }
        & > p {
          margin: 21px auto;
          width: 52%;
          line-height: 24px;
          font-weight: 400;
          //文字换行优化
          word-break: break-all;
          word-wrap: break-word;
          text-align: justify;
        }
        .btn {
          padding-top: 7px;
          display: none;
          ::v-deep .el-button {
            width: 240px;
            height: 34px;
            background-color: #74a0fa;
            border: none;
            color: #ffffff;
          }
        }
      }
    }
    .card:hover {
      .photo::before {
        /* 取消背景色 */
        background: none;
      }
      /*最后一个photo */
      &:nth-last-child(1) {
        .photo::before {
          background: rgba(0, 0, 0, 0.3);
        }
      }
      .btn {
        display: block;
      }
    }
  }
}
@media screen and (min-width: 1560px) and (max-width: 1700px) {
  .text-cover {
    & > p {
      width: 70% !important;
    }
  }
}
@media screen and (min-width: 1400px) and (max-width: 1560px) {
  .text-cover {
    & > p {
      width: 70% !important;
      //最多展示3行，超出隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
  }
}
@media screen and (min-width: 0px) and (max-width: 1400px) {
  .text-cover {
    & > p {
      width: 90% !important;
      //最多展示3行，超出隐藏
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
}
</style>
