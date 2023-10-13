<template>
  <div>
    <fl-input @click="handleMy">自定义！！！！</fl-input>
    <el-button @click="handleFtg">按钮防抖</el-button>
    <el-button @click="handleWy">按钮节流</el-button>
    <el-button @click="openApply">历史评价</el-button>
    <el-drawer
      size="30%"
      custom-class="add-draw"
      ref="drawer"
      :destroy-on-close="true"
      title="历史评价"
      :visible.sync="visible"
    >
      <p>1111</p>
    </el-drawer>
    <el-button @click="goAnchor('#vue')">跳到vue</el-button>
    <el-button @click="goAnchor('#js')">跳到js</el-button>
    <p>子级3</p>
    <div class="box">A fklds.</div>
    <div class="item">
      <p id="vue">vue</p>
      <h3>
        <div class="block">
          <el-timeline>
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <div class="card">
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/12 20:46</p>
                <p>收到回复大家撒部分</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <div class="card">
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/3 20:46</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <div class="card">
                <h4>更新 Github 模板</h4>
                <p>王小虎 提交于 2018/4/2 20:46</p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </h3>
    </div>
    <div class="item">
      <p id="js">js</p>
      <h3>内容</h3>
    </div>
  </div>
</template>
<script>
import flInput from "./input.vue" //引入组件
import testApi from "@/api/testApi"; //引入接口
//在这里定义函数，下面直接拿就行

function myDebounce(fn, duration = 100) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args);
    }, duration)
 
  }
}

function throttle(fn,duration=100){
    let target=true;
    return (...arg)=>{
        if(!target){
            return false;
        }
        target =false;
        setTimeout(()=>{
            fn(...arg);
            target=true
        },duration)
    }
}

export default {
  components: {
    flInput,
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    testApi.getNewsList().then((res) => {
      console.log(res,"我是接口数据");
    });
  },
  methods: {
    handleMy(){
      console.log('我是引用复制源码的组件呀')
    },
    openApply() {
      this.visible = true;
    },
    goAnchor(selector) {
      this.$el.querySelector(selector).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    // 节流防抖
    handleFtg:myDebounce(function(){
      console.log('我是防抖')
    },1000),
    handleWy:throttle(function(){
      console.log('我是节流')
    },1000)
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-timeline-item__wrapper {
  display: flex;
}
.box {
  height: 200px;
  width: 200px;
  border-radius: 50px;
  background: #f4f0f0;
  box-shadow: 20px 20px 60px #cfcccc, -20px -20px 60px #ffffff;
  text-align: center;
  line-height: 200px;
}
.item {
  width: 100%;
  p {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
    background-color: aquamarine;
  }
  h3 {
    height: 500px;
    width: 100%;
    background-color: pink;
  }
}
</style>
