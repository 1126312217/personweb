<template>
  <div class="component-banner">
    <el-carousel trigger="click" :height="imgHeight" :indicator-position="show" arrow="never">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <div class="inside">
          <img ref="imgH" :src="item.imgSrc" style="width: 100%" alt="" @load="imgLoad" />
          <div class="banner-text">
            <h1>{{item.title}}</h1>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "BannerImage",
  props: {
    bannerList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      imgHeight: "0",
      show: "",
    };
  },
  methods: {
    imgLoad () {
      this.$nextTick(() => {
        this.imgHeight = `${this.$refs.imgH[0].height}px`;
      });
    },
  },
  mounted () {
    //如果只有一张图片隐藏指示器
    if (this.bannerList.length == 1) {
      this.show = "none";
    } else {
      this.show = "";
    }
    this.imgLoad();
    window.addEventListener("resize", this.imgLoad, false);
  },
  destroyed () {
    window.removeEventListener("resize", this.imgLoad, false);
  },
};
</script>
<style lang="scss" scoped>
.inside {
  position: relative;
  .banner-text {
    position: absolute;
    left: 25%;
    top: 30%;
    h1 {
      color: #fff;
      font-size: 40px;
      font-weight: 400;
      padding-bottom: 20px px;
    }
    p {
      color: #fff;
    }
  }
}
.el-carousel {
  width: 100%;
  /deep/ .el-carousel__indicator--horizontal .el-carousel__button {
    width: 10px;
    height: 10px;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 50%;
    opacity: 0.5;
  }
  /deep/ .el-carousel__indicator--horizontal.is-active .el-carousel__button {
    width: 10px;
    height: 10px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 1;
  }
}
</style>
