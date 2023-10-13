<template>
  <div id="freezise">
    <button @click="loadData">load data</button>
    <h1>data count: {{ data.length }}</h1>
  </div>
</template>

<script>
export default {
  name: "freezise",
  data() {
    return {
      data: [],
    };
  },
 
  created() {},

  mounted() {},

  methods: {
    loadData() {
      // this.data = this.getDatas();
      //时间90%以上都消耗在了双向绑定上，而不是循环上，所以这里可以使用Object.freeze()来冻结对象，这样就不会触发双向绑定了
      this.data = Object.freeze(this.getDatas());
    },
    getDatas() {
      const result = [];
      for (let i = 0; i < 1000000; i++) {
        result.push({
          id: i,
          // name: "name" + i,
          name: `name${i}`,
          age: 18 + i,
          address: {
            city: `city${i}`,
            provnce: `provnce${i}`,
          },
        });
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
