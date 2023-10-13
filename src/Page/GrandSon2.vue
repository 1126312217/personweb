<template>
  <div>
    <p>我是孙组件</p>
    <p>{{ message }}</p>
    {{ list }}---{{ arr }}---{{ obj }}
    <h2 @click="toGrand">点击孙传爷</h2>
    <div>孙组件app:{{ getApp().month }}----{{ getApp().articleList }}</div>
  </div>
</template>
<script>
export default {
  inject: ["getApp"],
  props: {
    message: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    arr: {
      type: Array,
      default: () => [],
    },
    obj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      total: 0,
    };
  },
  mounted() {
    console.log(this.message, this.list, this.arr, this.obj, this.getApp().articleList,"孙组件");
  },
  methods: {
    toGrand() {
      this.$emit("father", this.total);
    },
  },
};
</script>
