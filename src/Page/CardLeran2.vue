<template>
  <div id="box">
     <countTo :startVal='0' :endVal='79863' :duration='5000'></countTo>
      <countTo :startVal='0' :endVal='448' :duration='5000'></countTo>
      <countTo :startVal='0' :endVal='241' :duration='5000'></countTo>
      <countTo :startVal='0' :endVal='22' :duration='5000'></countTo>
      <countTo :startVal='0' :endVal='219' :duration='5000'></countTo>

    <div class="container">
      <div class="box">
        <div class="img-box">
          <img src="../assets/images/op/4.jpg" alt="" />
        </div>
        <div class="text-box">
          <div>
            <h2>娜美</h2>
            <p>
              娜美，日本漫画《航海王》及衍生作品中的女主角，草帽一伙的航海士，人称“小贼猫”。
            </p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="../assets/images/op/5.jpg" alt="" />
        </div>
        <div class="text-box">
          <div>
            <h2>乌索普</h2>
            <p>
              乌索普，日本漫画《海贼王》及其衍生作品中的男性角色。草帽一伙狙击手，被称作“GOD·乌索普”。
            </p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="../assets/images/op/6.jpg" alt="" />
        </div>
        <div class="text-box">
          <div>
            <h2>乔巴</h2>
            <p>
              托尼托尼·乔巴，日本漫画《航海王》及其衍生作品中的角色。乔巴是草帽一伙的船医，吃了人人果实的驯鹿，可用蓝波球进行八段变形。
            </p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="img-box">
          <img src="../assets/images/op/7.jpg" alt="" />
        </div>
        <div class="text-box">
          <div>
            <h2>弗兰奇</h2>
            <p>
              弗兰奇（原名：卡特·弗兰姆）是日本漫画《航海王》及其衍生作品中的角色。草帽一伙船匠，性格豪放，喜欢唱歌，跳奇怪的舞，下身喜欢只穿一条短裤。身为改造人的弗兰奇，藏着各种兵器。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import countTo from 'vue-count-to';
export default {
components: {
    countTo
  },
  data() {
    return {
       //数字开始
        startVal: 0,
       //数字结束
        endVal: 50000
    };
  },
  methods: {
    countUp() {
      this.count++;
    }
  }
}
</script>
<style scoped>
#box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
* {
  /* 初始化 */
  margin: 0;
  padding: 0;
  /* 元素的总宽度和高度包含内边距和边框 */
  box-sizing: border-box;
}

.container {
  /* 相对定位 */
  position: relative;
  /* 弹性布局 横向排列 允许换行 */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.container .box {
  position: relative;
  width: 275px;
  height: 275px;
  /* 溢出隐藏 */
  overflow: hidden;
  /* 动画过渡 */
  transition: 0.5s;
}
/* 鼠标移入，盒子变大 */
.container .box:hover {
  transform: scale(1.25);
  box-shadow: 0 25px 40px rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.container .box .img-box {
  /* 绝对定位 */
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
/* 渐变遮罩（黑色——透明） 默认隐藏 */
.container .box .img-box::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #222, transparent);
  z-index: 1;
  opacity: 0;
  transition: 0.5s;
}
/* 鼠标移入，渐变遮罩显示 */
.container .box:hover .img-box::before {
  opacity: 1;
}
.container .box .img-box img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* 保持原有尺寸比例，裁切长边 */
  object-fit: cover;
}
.container .box .text-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  /* 弹性布局 元素位于容器的结尾 */
  display: flex;
  align-items: flex-end;
  color: #fff;
  z-index: 2;
}
.container .box .text-box h2 {
  font-size: 20px;
  margin-bottom: 10px;
  /* 默认移出可视范围 */
  transform: translateY(200px);
  transition: 0.5s;
}
.container .box:hover .text-box h2 {
  /* 鼠标移入，移入可视范围 */
  transform: translateY(0);
  /* 设置动画延迟时间 */
  transition-delay: 0.3s;
}
.container .box .text-box p {
  font-size: 13px;
  line-height: 20px;
  /* 默认移出可视范围 */
  transform: translateY(200px);
  transition: 0.5s;
}
.container .box:hover .text-box p {
  /* 鼠标移入，移入可视范围 */
  transform: translateY(0);
  /* 设置动画延迟时间 */
  transition-delay: 0.4s;
}
</style>
