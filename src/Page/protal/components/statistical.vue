<template>
  <div id="page-statistical">
    <div class="msg">
      <div class="box" @click="goPage" style="cursor: pointer">
        <div class="box-left">
          <img src="@/assets/images/portal/num1.png" alt="" />
        </div>
        <div class="box-right">
          <p class="num">79863</p>
          <p class="title">接入设备数（台）</p>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <img src="@/assets/images/portal/num2.png" alt="" />
        </div>
        <div class="box-right">
          <p class="num">448</p>
          <p class="title">数据中心（T）</p>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <img src="@/assets/images/portal/num3.png" alt="" />
        </div>
        <div class="box-right">
          <p class="num">241</p>
          <p class="title">开发者（位）</p>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <img src="@/assets/images/portal/num4.png" alt="" />
        </div>
        <div class="box-right">
          <p class="num">22</p>
          <p class="title">协议（个）</p>
        </div>
      </div>
      <div class="box">
        <div class="box-left">
          <img src="@/assets/images/portal/num5.png" alt="" />
        </div>
        <div class="box-right">
          <p class="num">219</p>
          <p class="title">模型（个）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-statistical",
  data() {
    return {};
  },

  created() {},

  mounted() {},

  methods: {
    goPage() {
      //在新窗口打开https://10.107.84.6/iiot-edge-node
      window.open("https://10.107.84.6/iiot-edge-node");
    },
  },
};
</script>

<style lang="scss" scoped>
#page-statistical {
  width: 100%;
  padding-top: 37px;
  .msg {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    width: 68%;
    height: 200px !important;
    box-shadow: 0px 6px 12px 0px rgba(219, 225, 241, 0.7);
    border-radius: 4px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .box {
      display: flex;
      font-family: PingFangSC-Semibold;
      /* background-color: aquamarine; */
      .box-left {
        img {
          width: 70px;
          height: 70px;
        }
      }
      .box-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num {
          font-size: 42px;
          color: #0057fe;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 600;
        }
        .title {
          font-size: 20px;
          color: #212a40;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 400;
        }
      }
    }
  }
}
@media screen and (min-width: 0px) and (max-width: 1420px) {
  .msg {
    width: 82% !important;
  }
}
</style>
