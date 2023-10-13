<template>
  <div>
    <el-select
      v-model="userForm.roleIdList"
      v-disableSel="[roleTypeList, userForm.roleIdList]"
      multiple
    >
      <el-option
        v-for="item in roleTypeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
    <el-button @click="handle">点击</el-button>
    <div class="box" v-setBox=[list]>
      <p>1111</p>
      <p>2222</p>
      <input v-model="list" type="text">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [4,5,6],
      userForm: { roleIdList: [2] },
      roleTypeList: [
        {
          id: 1,
          name: "data1",
          disabled: false,
        },
        {
          id: 2,
          name: "data2",
          disabled: true,
        },
        {
          id: 3,
          name: "data3",
          disabled: false,
        },
      ],
    };
  },
  directives: {
    setBox: {
      inserted(el, binding) {
        console.log(el, binding.value[0], binding);
        //拿到p标签
         const p = el.querySelector("p");
       if(binding.value[0].includes(5)){
         p.innerHTML = "1111";
        console.log(p);
        //给p标签添加一个类名
        p.classList.add("box-p");
       }
        
        // console.log(binding.value);
        // el.innerHTML = binding.value;
      },
    },
    disableSel: {
      bind(el, bindings) {
        //console.log(el, bindings);
        const [mapData, selData] = bindings.value;
        // console.log(mapData, selData,11111111111);
        const disableIndex = [];
        //find直接返回第一个匹配的元素，所以可以用find方法来判断是否存在，返回的是一个对象，如果不存在，返回undefined
        selData.forEach((selItem, index) => {
          //console.log(selItem, index);
          const selObj = mapData.find((mapItem) => mapItem.id === selItem);
          if (selObj.disabled) disableIndex.push(index);
        });

        setTimeout(() => {
          // bind时，找不到 tags，所以放个延时定时器
          const tags = el.querySelectorAll(".el-tag__close");
          //console.log(tags);
          tags.forEach((tag, index) => {
            if (disableIndex.includes(index)) {
              tag.classList.add("none");
            }
          });
          //console.log(tags,222222222222);
        });
        //console.log(disableIndex,333333333333);
      },
    },
  },

  // classList 属性返回元素类名.
  // 该属性用于在元素中添加, 移除及切换 CSS 类
  // . classList 是只读属性.
  // 语法：element.classList
  // 添加:element.classList.add("class")
  // 移除:element.classList.remove("class")

  methods: {
    handle() {
      console.log(this.roleTypeList);
      console.log(this.userForm.roleIdList);
    },
  },
};
</script>
<style>
.none {
  display: none !important;
}
.is-disabled {
  display: none;
}
.box-p {
  color: red;
}
</style>
