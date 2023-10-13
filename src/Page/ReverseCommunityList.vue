<template>
  <div>
    <el-input v-model="value"></el-input
    ><el-button @click="submit">提交</el-button>
    <div style="background: pink">{{arr}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:"",
      arr:[]
    };
  },
  mounted () {

  },
  methods: {
    submit() {
      let obj = {
        name:this.value,
        time:new Date().getTime()
      }
      this.arr.push(obj)
      this.$emit("input", this.value);
    }
  }
};
</script>
