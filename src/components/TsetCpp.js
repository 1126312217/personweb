const veriFiceCode = {
  getCode() {
    let that = this;
    if (that.flag) {
      that.flag = false;
      that.second = 60;
      let interval = window.setInterval(function () {
        that.setStorage(that.second);
        if (that.second-- <= 0) {
          that.second = 60;
          that.flag = true;
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
      that.flag = true;
      console.log("已过期");
    } else {
      that.flag = false;
      let _delay = localDelay.delay - secTime;
      that.second = _delay;
      that.timer = setInterval(function () {
        if (_delay > 1) {
          _delay--;
          that.setStorage(_delay);
          that.second = _delay;
          that.flag = false;
        } else {
          // 此处赋值时为了让浏览器打开的时候,直接就显示剩余的时间
          that.flag = true;
          window.clearInterval(that.timer);
        }
      }, 1000);
    }
  },
}
export default veriFiceCode;