<template>
  <div id="box">
    <div class="icon-box">
      <a href="#">
        <div class="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="fa el-icon-s-help" aria-hidden="true"></i>
        </div>
        <div class="text">QQ</div>
      </a>
      <a href="#">
        <div class="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="fa el-icon-s-opportunity" aria-hidden="true"></i>
        </div>
        <div class="text">微信</div>
      </a>
      <a href="#">
        <div class="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="fa el-icon-chat-line-round" aria-hidden="true"></i>
        </div>
        <div class="text">微博</div>
      </a>
      <a href="#">
        <div class="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="fa el-icon-trophy" aria-hidden="true"></i>
        </div>
        <div class="text">人人网</div>
      </a>
      <a href="#">
        <div class="layer">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i class="fa el-icon-ice-drink" aria-hidden="true"></i>
        </div>
        <div class="text">推特</div>
      </a>
    </div>
    <div class="container">
      <h2 contenteditable="true">hello</h2>
    </div>
  </div>
</template>
<style scoped>
#box {
  width: 100%;
  height: 100%;
  background: linear-gradient(200deg, #29323c, #485563);
  padding: 50px;
}
.icon-box {
  /* 弹性布局 水平排列 */
  display: flex;
  flex-direction: row;
}
.icon-box a {
  color: #fff;
  margin: 0 30px;
  text-decoration: none;
  display: block;
  /* 相对定位 */
  position: relative;
}
.icon-box a .layer {
  width: 70px;
  height: 70px;
  /* 动画过渡 */
  transition: 0.3s;
}
.icon-box a .layer i {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 通过var函数调用自定义属性--c */
  border: 1px solid var(--c);
  border-radius: 6px;
  transition: 0.3s;
}
.icon-box a .layer i.fa {
  font-size: 35px;
  text-align: center;
  line-height: 70px;
  color: var(--c);
}
.icon-box a .text {
  /* 绝对定位 */
  position: absolute;
  bottom: 0;
  opacity: 0;
  width: 100%;
  text-align: center;
  color: var(--c);
  /* 动画过渡 */
  transition: 0.3s;
}
.icon-box a:hover .text {
  /* 鼠标移入文本出现 */
  bottom: -35px;
  opacity: 1;
}
.icon-box a:hover .layer {
  /* 鼠标移入，该元素旋转-35度并倾斜20度 */
  transform: rotate(-35deg) skew(20deg);
}
/* 鼠标移入，设置图标外的每一层边框的样式（不透明度+位置偏移） */
.icon-box a:hover .layer i:nth-child(1) {
  opacity: 0.2;
  transform: translate(0, 0);
}
.icon-box a:hover .layer i:nth-child(2) {
  opacity: 0.4;
  transform: translate(5px, -5px);
}
.icon-box a:hover .layer i:nth-child(3) {
  opacity: 0.6;
  transform: translate(10px, -10px);
}
.icon-box a:hover .layer i:nth-child(4) {
  opacity: 0.8;
  transform: translate(15px, -15px);
}
.icon-box a:hover .layer i:nth-child(5) {
  opacity: 1;
  transform: translate(20px, -20px);
}
/* 鼠标移入，设置每一层边框的阴影样式 */
.icon-box a:hover .layer i {
  box-shadow: -1px 1px 3px var(--c);
}
/* 接下来为每一个按钮设置不同颜色 */
.icon-box a:nth-child(1) .layer i,
.icon-box a:nth-child(1) .text {
  /* --c是自定义属性，这里为颜色值，可通过var函数进行调用 */
  --c: #12b7f5;
}
.icon-box a:nth-child(2) .layer i,
.icon-box a:nth-child(2) .text {
  --c: #2aae67;
}
.icon-box a:nth-child(3) .layer i,
.icon-box a:nth-child(3) .text {
  --c: #e79115;
}
.icon-box a:nth-child(4) .layer i,
.icon-box a:nth-child(4) .text {
  --c: #2075fd;
}
.icon-box a:nth-child(5) .layer i,
.icon-box a:nth-child(5) .text {
  --c: #2d8dc5;
}


/* 炫彩的发光字特效 */
.container{
    /* 投影效果 */
    -webkit-box-reflect: below 1px linear-gradient(transparent,rgba(0,0,0,0.2));
}
h2{
    color: #fff;
    font-size: 96px;
    /* 字间距 */
    letter-spacing: 15px;
    /* 转大写 */
    text-transform: uppercase;
    text-align: center;
    line-height: 76px;
    outline: none;
    /* 自定义属性--c，可通过var函数对其调用 */
    --c:lightseagreen;
    /* 调用自定义属性--c，设置文字阴影（发光效果） */
    text-shadow: 0 0 10px var(--c),
    0 0 20px var(--c),
    0 0 40px var(--c),
    0 0 80px var(--c),
    0 0 160px var(--c);
    /* 执行动画：动画名 时长 线性的 无限次播放 */
    animation: animate 5s linear infinite;
}

/* 定义动画 */
@keyframes animate {
    to{
        /* 色相旋转滤镜（设置度数可改变颜色） */
        filter: hue-rotate(360deg);
    }
}
</style>
