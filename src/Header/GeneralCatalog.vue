<template>
  <div>
    <el-select v-model="value" filterable remote :remote-method="handleInput">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    console.log('args', args);
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export default {
  data() {
    return {
      value: '',
      options: []
    }
  },
  created(){
    //time为当前时间，格式为yyyy-MM-dd：HH:mm:ss，且一直在变化
    // setInterval(() => {
    //   this.time = new Date().toLocaleString();
    // }, 1000);

  },
  methods: {
    handleInput: debounce(function (value) {
      console.log(value);
      // 调用接口搜索数据
      // ...
      // 将搜索结果更新到 options 中
      this.options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ];
    }, 600)
  }
}
</script>