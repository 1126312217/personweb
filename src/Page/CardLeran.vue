<template>
  <div id="box">
    <div class="card">
      <div class="photo"><img src="../assets/images/asl/a.jpg" alt="" /></div>
      <h1>艾斯</h1>
      <h2>“火拳”艾斯</h2>
      <p>
        波特卡斯·D·艾斯，日本漫画《航海王》及其衍生作品中的角色。萨博与路飞的结义兄弟。
      </p>
      <a href="#">了解更多</a>
    </div>
    <div class="card">
      <div class="photo"><img src="../assets/images/asl/s.jpg" alt="" /></div>
      <h1>萨博</h1>
      <h2>革命军的二把手</h2>
      <p>
        萨博，日本漫画《航海王》及其衍生作品中的角色。是路飞与艾斯的结义兄弟。
      </p>
      <a href="#">了解更多</a>
    </div>
    <div class="card">
      <div class="photo"><img src="../assets/images/asl/l.jpg" alt="" /></div>
      <h1>路飞</h1>
      <h2>草帽小子</h2>
      <p>
        蒙奇·D·路飞，日本漫画《航海王》及其衍生作品中的男主角。是草帽海贼团的船长。
      </p>
      <a href="#">了解更多</a>
    </div>
    <div class="ftg">
      <div class="photo1"><img src="../assets/images/asl/l.jpg" alt="" /></div>
      <div class="text-cover">
        <h1>水泥</h1>
        <p>从企业安全管理现状出发，依据现行相关行业规范标准，适用于建筑施工行业、化工行业、矿山行业、冶金行业、装备制造行业以及物流仓储行业等诸多行业的企业安全管理需求。</p>
      </div>
      <div class="text">
        <h1>路飞</h1>
        <h2>草帽小子</h2>
        <p>
          蒙奇·D·路飞，日本漫画《航海王》及其衍生作品中的男主角。是草帽海贼团的船长。
        </p>
        <el-button>了解更多</el-button>
      </div>
    </div>
    <div v-html="list"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:`<table style="border: 1px solid rgb(0, 0, 0); border-collapse: collapse;" border="1"><tbody><tr class="firstRow"><td width="62.15pt" style="word-break: break-all;">路径</td><td width="354pt">具体措施</td><td width="191.25pt">重点产品（工序）能效标杆值</td><td width="132.75pt">总体实施目标</td></tr><tr><td width="62.15pt">产能控制</td><td width="354pt">1、退出低效产能，严禁违规新增产能，严格执行水泥、平板玻璃产能置换政策；</td><td rowspan="4" width="191.25pt" style="word-break: break-all;">水泥熟料：100千克标准煤/吨。&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 平板玻璃：平板玻璃（生产能力&gt;800吨/天）8千克标准煤/重量箱；平板玻璃（500≤生产能力≤800&nbsp;吨/天）9.5千克标准煤/重量箱。&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 建筑陶瓷：吸水率≤0.5%的陶瓷砖4千克标准煤/平方米：0.5%＜吸水率≤10%的陶瓷砖3.7千克标准煤/平方米：吸水率＞10%的陶瓷砖3.5千克标准煤/平方米。</td><td rowspan="4" width="132.75pt" style="word-break: break-all;"><p>2025年，吨水泥熟料综合能耗水平降至102千克标准煤/吨；&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p>2030年，原燃料替代水平显著提高；在水泥、玻璃等行业改造建设减污降碳协同增效的绿色低碳生产线。</p></td></tr><tr><td width="62.15pt">产品优化</td><td width="354pt" style="word-break: break-all;"><p>2、大力发展低碳建材产品，加强新型凝胶材料、低碳混凝土、木竹建材等低碳建材产品研发应用，推广使用节能、环保、安全、可回收、便利施工的建材产品；</p><p>3、提高建材产品深加工比例和产品附加值，加快向轻型化制品化高端化转型；</p></td></tr><tr><td width="62.15pt">技术创新</td><td width="354pt" style="word-break: break-all;"><p>4、加快全氧、富氧、电熔等工业窑炉节能降耗技术应用，推广水泥窑二氧化碳捕集纯化技术，加快碳捕集利用技术产业化；</p><p>5、推广高效烧成窑炉优化控制、高效篦冷机、高效节能粉磨、低阻旋风预热器、浮法玻璃一窑多线等节能降碳技术及装备；</p><p>6、提高原燃料替代比例，推广鼓励生物燃料、垃圾衍生燃料等替代能源在水泥行业的应用，增加矿渣、钢渣、粉煤灰等工业废渣掺入量；</p></td></tr><tr><td width="62.15pt">循环耦合</td><td width="354pt" style="word-break: break-all;"><p>7、推进粉煤灰、煤矸石、矿渣、尾矿、河（湖）淤（污）泥、脱硫石膏等在建材行业的综合利用；</p><p>8、推广应用无害化资源化利用固体废弃物相关技术和装备，推广水泥窑协同处置城市污泥、生活垃圾、建筑垃圾。</p></td></tr></tbody></table>`
     // list:`<table width="596" style="width: 547px;"><tbody style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;"><tr style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;" class="firstRow"><td width="NaN" style="margin: 0px; outline: 0px; word-break: break-all; max-width: 100%; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; overflow-wrap: break-word !important; box-sizing: border-box !important;"><strong style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;">专栏　绿色体系协同</strong></td></tr><tr style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;"><td width="565" style="margin: 0px; outline: 0px; word-break: break-all; max-width: 100%; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; overflow-wrap: break-word !important; box-sizing: border-box !important;"><p style="outline: 0px; max-width: 100%; clear: both; min-height: 1em; text-indent: 2em; box-sizing: border-box !important; overflow-wrap: break-word !important;"><strong style="margin: 0px; padding: 0px; outline: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important;">国家绿色制造名单创建工程。</strong>依据《绿色工厂评价要求》，创建厂房集约化、原料无害化、生产洁净化、废物资源化、能源低碳化等特征的绿色工厂；依据《绿色园区评价要求》，建设布局集聚化、结构绿色化、链接生态化等特色的绿色工业园区；依据《绿色供应链管理评价要求》，形成以资源利用高效化、环境影响最小化、链上企业绿色化为目标的绿色供应链管理企业。争取到2030年累计创建国家级绿色工厂200户以上，绿色供应链管理企业50个以上，绿色工业园区30个左右。</p></td></tr></tbody></table>`
    };
  },
}
</script>

<style lang="scss" scoped>
#box {
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(200deg, #517fa4, #243949);
}
.ftg {
  position: relative;
  width: 300px;
  height: 450px;
  overflow: hidden;
  .photo1 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .photo1::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, #222);
  }
  .text {
    position: absolute;
    top: 450px;
    color: #fff;
    transition: 0.5s;
  }
  .text-cover {
    position: absolute;
    top: 150px;
    width: 100%;
    height: 100%;
    color: #fff;
    transition: 0.5s;
  }
}
.ftg:hover {
  .photo1::before {
    /* 取消背景色 */
    background: none;
  }
  .text {
    /* 向上移动 */
    top: 150px;
  }
  .text-cover {
    /* 向下移动 */
    top: -450px;
  }
}
.card {
  /* 相对定位 */
  position: relative;
  width: 300px;
  height: 450px;
  margin: 20px;
  background-color: #758a99;
  border-radius: 20px;
  /* 溢出隐藏 */
  overflow: hidden;
  /* 弹性布局 */
  display: flex;
  /* 元素纵向排列 */
  flex-direction: column;
  /* 居中 */
  align-items: center;
  color: #fff;
  /* 阴影 */
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  /* 不让其被挤压 */
  flex-shrink: 0;
}
.card .photo img {
  width: 100%;
  height: 100%;
  /* 保持原有尺寸比例，裁切长边 */
  object-fit: cover;
}
/* 默认大图 */
.card .photo {
  /* 绝对定位 */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0%;
  overflow: hidden;
  /* 动画过渡 */
  transition: 0.5s;
}
/* 鼠标移入变小图 */
.card:hover .photo {
  top: 30px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
}
/* 缩小的时候取消图片下方阴影，这时候图片上没名字，所以去掉阴影 ,但是会闪一下！！！ */
/* .card:hover .photo::before {
  background: linear-gradient(to bottom, transparent 100%, #222);
} */
/* 这里加个黑色到透明的渐变背景，可以更好的看清楚名字 */
.card .photo::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 50%, #222);
}
.card h1 {
  position: absolute;
  top: 370px;
  transition: 0.5s;
}
.card:hover h1 {
  top: 170px;
}
.card h2 {
  margin-top: 220px;
  width: 80%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.card p {
  width: 90%;
  text-indent: 32px;
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 30px;
}
.card a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 32px;
  border-radius: 8px;
}
.card a:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
