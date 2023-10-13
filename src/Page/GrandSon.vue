<template>
  <div>
    <p>我是子组件</p>
     <grand-son2 v-bind="$attrs" v-on="$listeners"></grand-son2>
  </div>
</template>
<script>
import GrandSon2 from "./GrandSon2.vue";
export default {
  components: {
    GrandSon2,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.list,"子组件");
  },
}
</script>