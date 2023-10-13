<template>
  <div>
    <p>我是父组件</p>
    <son-data>
      <h2>1111</h2>
      <son-data></son-data>
      <!-- 用了插槽子组件套子组件才会显示！！！！ -->
    </son-data>

    <!-- 手写开关练习 -->
    <div class="container">
      <label>
        <input type="checkbox" />
        <span></span>
        <i class="indicator"></i>
      </label>
      <label>
        <input type="checkbox" checked />
        <span></span>
        <i class="indicator"></i>
      </label>
    </div>
    <!-- CSS变量练习 -->
    <div class="content">
      <div class="1">想让我失控也并非易事</div>
      <div class="2">青铜与火之王</div>
      <div class="3">诺玛：路明非,你终于回来了</div>
      <div class="4">舞步危险重重 我们所吸取的教训能让我们改变观念吗</div>
      <div class="5">别再犹豫 摧毁桎梏的高墙</div>
    </div>
    <!-- 按钮节流防抖 -->
    <div class="btn">
      <button @click="handleClick">点击</button>
    </div>
  </div>
</template>
<script>
import SonData from "./SonData.vue";
export default {
  components: {
    SonData,
  },
  methods: {
    handleClick() {
      console.log("点击了");
    },
    //按钮节流
    _debounce(fn, delay = 1000) {
      let timer;
      return function () {
        let th = this;
        let args = arguments;
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          timer = null;
          fn.apply(th, args);
        }, delay);
      };
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  color: green;
  //在父组件和子组件里都可以修改在父组件里给插槽添加的标签样式，父组件优先级大于子组件
}
//开关样式
.container {
  /* 弹性布局 纵向排列 */
  display: flex;
  flex-direction: column;
}
.container label {
  /* 相对定位 */
  position: relative;
  margin: 5px 0;
  cursor: pointer;
}
.container label span {
  position: relative;
  display: block;
  width: 80px;
  height: 40px;
  background-color: #222;
  border-radius: 40px;
  /* 内阴影 */
  box-shadow: inset 0 2px 15px rgba(0, 0, 0, 0.2),
    inset 0 2px 2px rgba(0, 0, 0, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.2);
}
/* 滑块 */
.container label .indicator {
  /* 绝对定位 */
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  /* 渐变背景 */
  background: linear-gradient(to bottom, #444, #222);
  border-radius: 50%;
  /* 阴影 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  /* 缩小 */
  transform: scale(0.9);
  /* 动画过渡 */
  transition: 0.5s;
}
/* 滑块中心的发光点 */
.container label .indicator::before {
  content: "";
  width: 5px;
  height: 5px;
  /* 绝对定位 居中 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f00;
  border-radius: 50%;
  /* 阴影制造发光效果 */
  box-shadow: 0 0 2px #f00, 0 0 5px #f00, 0 0 10px #f00, 0 0 15px #f00,
    0 0 20px #f00, 0 0 25px #f00, 0 0 30px #f00, 0 0 35px #f00;
  transition: 0.5s;
}
/* 勾选复选框后滑块的变化 */
.container label input:checked ~ .indicator {
  left: 40px;
}
.container label input:checked ~ .indicator::before {
  background-color: #0f0;
  box-shadow: 0 0 2px #0f0, 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0,
    0 0 20px #0f0, 0 0 25px #0f0, 0 0 30px #0f0, 0 0 35px #0f0;
}
//css里写变量
:root {
  --color: #f00;
}
</style>
