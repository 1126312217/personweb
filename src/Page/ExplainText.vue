<template>
  <div @click="getCode">
    <el-button v-if="flag1">获取短信</el-button>
    <el-button v-if="!flag1" disabled>剩余{{ second1 }}s</el-button>
    <el-button :disabled='flag1 == false'>{{ flag1 == true?'获取短信':second1}}</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      second1: 60,
      flag1: true,
      timer1: null, // 该变量是用来记录定时器的,防止点击的时候触发多个setInterval
    };
  },
  mounted() {
    this.judgeCode();
  },
  methods: {
    getCode() {
      let that = this;
      if (that.flag1) {
        that.flag1 = false;
        that.second1 = 60;
        let interval = window.setInterval(function () {
          that.setStorage(that.second1);
          if (that.second1-- <= 0) {
            that.second1 = 60;
            that.flag1 = true;
            window.clearInterval(interval);
          }
        }, 1000);
      }
    },
    setStorage(parm) {
      localStorage.setItem("dalay", parm);
      localStorage.setItem("_time", new Date().getTime());
    },
    getStorage() {
      let localDelay = {};
      localDelay.delay = localStorage.getItem("dalay");
      localDelay.sec = localStorage.getItem("_time");
      return localDelay;
    },
    judgeCode() {
      let that = this;
      let localDelay = that.getStorage();
      let secTime = parseInt((new Date().getTime() - localDelay.sec) / 1000);
      console.log(localDelay);
      if (secTime > localDelay.delay) {
        that.flag1 = true;
        console.log("已过期");
      } else {
        that.flag1 = false;
        let _delay = localDelay.delay - secTime;
        that.second1 = _delay;
        that.timer1 = setInterval(function () {
          if (_delay > 1) {
            _delay--;
            that.setStorage(_delay);
            that.second1 = _delay;
            that.flag1 = false;
          } else {
            // 此处赋值时为了让浏览器打开的时候,直接就显示剩余的时间
            that.flag1 = true;
            window.clearInterval(that.timer1);
          }
        }, 1000);
      }
    },
  },
};
</script>
