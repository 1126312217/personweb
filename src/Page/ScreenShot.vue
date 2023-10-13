<template>
  <div>
    <div id="past-contener"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const el = document.getElementById("past-contener");
      //此事件监听也可以添加在document上，该事件会有冒泡行为，则本页面上任何地方的粘贴操作都会触发
      el.addEventListener("paste", function (e) {
        let file = null;
        const items = (e.clipboardData || window.clipboardData).items;
        if (items && items.length) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].kind === "file") {
              file = items[i].getAsFile();
              break;
            }
          }
        }
        console.log(file);
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            let img = document.createElement("img");
            img.src = e.target.result;
            el.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
    },
  },
};
</script>
<style scoped>
#past-contener {
  width: auto;
  height: 100vh;
  max-width: 100%;
  border: 1px solid black;
  overflow: auto;
}
</style>
