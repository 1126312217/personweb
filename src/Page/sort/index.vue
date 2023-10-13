<template>
  <div id='sort'>
    <one-sort></one-sort>
    <second-sort></second-sort>
  </div>
</template>

<script>
import OneSort from './oneSort.vue';
import SecondSort from './secondSort.vue';
export default {
  name: 'Sort',
  components: {
    OneSort,
    SecondSort
  },
  data () {
    return {
    };
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
};

</script>

<style lang='scss' scoped>
</style>
