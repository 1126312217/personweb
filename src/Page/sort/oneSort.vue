<template>
  <div id="oneSort">
    <!-- 主体 -->
    <div class="list">
      <div draggable="true" class="list-item">1</div>
      <div draggable="true" class="list-item">2</div>
      <div draggable="true" class="list-item">3</div>
      <div draggable="true" class="list-item">4</div>
      <div draggable="true" class="list-item">5</div>
      <div draggable="true" class="list-item">6</div>
      <div draggable="true" class="list-item">7</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OneSort",
  data() {
    return {};
  },

  created() {},

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const list = document.querySelector(".list");
      let sourceNode; // 当前拖拽的是哪一个元素
      list.ondragstart = function (e) {
        setTimeout(() => {
          e.target.classList.add("moving");
        }, 0);
        sourceNode = e.target;
        console.log("开始拖拽", sourceNode);
        //禁掉默认的图像，否则会有一个默认的图像（残影）
        // e.dataTransfer.setDragImage(new Image(), 0, 0)
      };
      //用事件委托的方式监听
      list.ondragenter = function (e) {
        if (e.target === list || e.target === sourceNode) return; //如果是自己或者是父元素，就不做任何操作
        const children = Array.from(list.children); //把类数组转换成数组
        console.log("将要移到哪个元素", e.target);
        const sourceIndex = children.indexOf(sourceNode);
        const targetIndex = children.indexOf(e.target);
        if (sourceIndex < targetIndex) {
          console.log("下移");
          list.insertBefore(sourceNode, e.target.nextSibling);
        } else {
          console.log("上移");
          list.insertBefore(sourceNode, e.target);
        }
      };
      // 用事件委托的方式监听
      list.ondragend = function (e) {
        e.target.classList.remove("moving");
        //拿到最新的顺序
        const children = Array.from(list.children);
        const result = children.map((item) => item.innerText);
        console.log(result, "最后的顺序");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  width: 300px;
  background-color: #ffff;
  height: 30px;
  border-radius: 5px;
  margin: 5px;
}

.list-item.moving {
  background: transparent;
  color: transparent;
  border: 1px dashed #ccc;
}
</style>
