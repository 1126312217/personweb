//自定义全局指令
import Vue from "vue";

Vue.directive("changeColor", {
  bind(el) {
    el.style.color = "red";
  },
});

Vue.directive("wordSpace", {
  bind(el) {
    //改变文字间距
    el.style.letterSpacing = "5px";
  },
});

// src/directive/modules/copy.js
// export default {
//   bind(el, { value }) {
//     el.$value = value;
//     el.handler = () => {
//       if (!el.$value) {
//         // 值为空的时候，给出提示
//         console.log("无复制内容");
//         return;
//       }
//       const textarea = document.createElement("textarea");
//       // 将该textarea设为readonly，防止iOS下自动唤起软键盘
//       textarea.readOnly = "readonly";
//       textarea.style.position = "absolute";
//       textarea.style.left = "-9999px";
//       // 将要copy的值赋给textarea标签的value属性
//       textarea.value = el.$value;
//       // 将textarea插入到body中
//       document.body.appendChild(textarea);
//       // 选中值并复制
//       textarea.select();
//       const result = document.execCommand("Copy");
//       if (result) {
//         console.log("复制成功");
//       }
//       // 赋值成功后，将textarea移除掉
//       document.body.removeChild(textarea);
//     };
//     // 绑定点击事件
//     el.addEventListener("click", el.handler);
//   },
//   componentUpdated(el, { value }) {
//     el.$value = value;
//   },
//   // 指令与元素解绑的时候，移除事件绑定
//   unbind(el) {
//     el.removeEventListener("click", el.handler);
//   },
// };
//自定义复制指令
Vue.directive("copy", {
  bind(el, binding) {
    el.$value = binding.value;
    el.handler = () => {
      if (!el.$value) {
        // 值为空的时候，给出提示
        console.log("无复制内容");
        return;
      }
      const textarea = document.createElement("textarea");
      // 将该textarea设为readonly，防止iOS下自动唤起软键盘
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将要copy的值赋给textarea标签的value属性
      textarea.value = el.$value;
      // 将textarea插入到body中
      document.body.appendChild(textarea);
      // 选中值并复制
      textarea.select();
      const result = document.execCommand("Copy");
      if (result) {
        console.log("复制成功");
      }
      // 赋值成功后，将textarea移除掉
      document.body.removeChild(textarea);
    };
    // 绑定点击事件
    el.addEventListener("click", el.handler);
  },
  componentUpdated(el, binding) {
    el.$value = binding.value;
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el) {
    el.removeEventListener("click", el.handler);
  },
});

// src/directives/modules/debounce.js
// export default {
//   inserted(el, { value }) {
//     if ("function" !== typeof value) {
//       throw "directive value must be function";
//     }
//     let timer;
//     el.addEventListener("keyup", () => {
//       timer && clearTimeout(timer);
//       timer = setTimeout(() => {
//         value && value();
//       }, 1000);
//     });
//   },
// };

//自定节流抖指令
Vue.directive("throttle", {
  inserted: function (el, binding) {
    let timer = null;
    el.addEventListener("click", () => {
      if (timer) return;
      timer = setTimeout(() => {
        binding.value();
        clearTimeout(timer);
        timer = null;
      }, 1000);
    });
  },
});

//自定义防抖指令
Vue.directive("debounce", {
  inserted: function (el, binding) {
    let timer = null;
    el.addEventListener("click", () => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        binding.value();
      }, 1000);
    });
  },
});