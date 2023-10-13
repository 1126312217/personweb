<template>
  <div>
    <parent-son v-bind:num="num" @father='father'></parent-son>
  </div>
</template>

<script>
import parentSon from "./ParentSon.vue";
export default {
  components: {
    parentSon,
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    father(val) {
      this.num = val;
    },
  },
};
</script>
