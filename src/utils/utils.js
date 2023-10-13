// 提供的公共方法
class Utils {
  // 日期判断
  isDate(obj) {
    return Object.prototype.toString.call(obj) === "[object Date]";
  }
  // 对象判断
  isObj(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  // 空对象判断
  isEmptyObject(obj) {
    return Object.keys(obj).length <= 0;
  }
  //判断是否是数字
  isNumber(val) {
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(Number(val))) {
      return true;
    }
    return false;
  }
  /**
    * 判断是否IE浏览器，为IE返回true
    * @returns {boolean}
  */
  isIE() {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    let isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE || isEdge || isIE11) {
      return true;
    }
    return false; //不是ie浏览器
  }
  // 拷贝
  cloneDeep = obj => {
    return JSON.parse(JSON.stringify(obj));
  }
  // 去除前后空格
  trim(source) {
    if (typeof source == 'string') {
      return source.trim();
    }
    return source;
  }
  // 对象中的value去除前后空格
  objTrim(obj) {
    if (!this.isObj(obj)) return obj;
    for (let i in obj) {
      obj[i] = this.trim(obj[i])
    }
    return obj;
  }
  // 处理cookie
  setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays * 24 * 60 * 60 * 1000);
    document.cookie =
      c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString() + "; path=/;");
  }
  clearCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + '; path=/;';
  }
  getCookie(name) {
    let arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return arr[2];
    else return null;
  }
  // 处理localStorage
  setItem(k, v) {
    localStorage.setItem(k, v);
  }
  getItem(item) {
    let val = localStorage.getItem(item);
    return val;
  }
  removeItem(item) {
    localStorage.removeItem(item);
  }
  clearItems() {
    localStorage.clear();
  }
  // 获取URL参数
  getUrlParams(queryName) {
    let reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substring(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }
  // 判断是否登录
  getIsLogin() {
    return this.getItem("token")
  }
}
const utils = new Utils();
export default utils;
