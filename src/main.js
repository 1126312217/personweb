import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/index.scss";
import ElSelectTree from "el-select-tree";
import Print from "vue-print-nb";
import "@/components/cl-dialog/dialog";
//引入自定义全局指令
import "@/directives/index";
//main.js中
import animated from "animate.css";
// 注册mavon-editor组件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.use(mavonEditor);
Vue.use(animated);
Vue.use(ElSelectTree);
Vue.use(ElementUI);
Vue.use(Print);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$appName = "My App";
// this.$appName取到这个全局变量
Vue.prototype.$appName1 = { name: "My App" };
// 如果要实现全局变量的功能，需要把属性变为引用类型,但是刷新后，数据还是会恢复到原来的值

Vue.directive('drag', (el) => {
  const oDiv = el // 当前元素
  const minTop = oDiv.getAttribute('drag-min-top')
  const ifMoveSizeArea = 20
  // 拖拽超出20px会加一个dragged的class名
  oDiv.onmousedown = e => {
    let target = oDiv
    while (window.getComputedStyle(target).position !== 'absolute' && target !== document.body) {
      target = target.parentElement
    }

    document.onselectstart = () => {
      return false
    }
    if (!target.getAttribute('init_x')) {
      target.setAttribute('init_x', target.offsetLeft)
      target.setAttribute('init_y', target.offsetTop)
    }

    const initX = parseInt(target.getAttribute('init_x'))
    const initY = parseInt(target.getAttribute('init_y'))

    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - target.offsetLeft
    const disY = e.clientY - target.offsetTop
    document.onmousemove = e => {
      // 通过事件委托，计算移动的距离
      // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
      const l = e.clientX - disX
      const t = e.clientY - disY
      // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
      target.style.left = l + 'px'
      target.style.top = (t < minTop ? minTop : t) + 'px'
      //元素不可以超出左右边界和上下边界
      if (l < 0) {
        target.style.left = 0
      } else if (l > document.documentElement.clientWidth - target.offsetWidth) {
        target.style.left = document.documentElement.clientWidth - target.offsetWidth + 'px'
      }
      if (t < 0) {
        target.style.top = 0
      } else if (t > document.documentElement.clientHeight - target.offsetHeight) {
        target.style.top = document.documentElement.clientHeight - target.offsetHeight + 'px'
      }
      // 当移动的距离大于20px时，给该元素添加一个dragged的class名
      if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
        target.setAttribute('dragged', '')
      } else {
        target.removeAttribute('dragged')
      }
    }
    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null
      document.onselectstart = null
      if (Math.abs(e.clientX - disX - initX) < ifMoveSizeArea && Math.abs(e.clientY - disY - initY) < ifMoveSizeArea) {
        target.removeAttribute('dragged')
      }

    }
    // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    return false
  }
})



new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
