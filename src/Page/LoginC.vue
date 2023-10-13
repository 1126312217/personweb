<template>
  <div id="Loginc"></div>
</template>
<script>
//定义假数据
const resultJson = {
  Equipment: 4,
  Timeliness: 3.8,
  Completeness: 4.9,
  Conformity: 4,
  Consistency: 4.4,
  lntegrity: 4.8,
};
export default {
  name: "LoginC",
  mounted() {
    this.init();
    this.Test().then(() => {
      console.log("我在Tset执行之后执行");
    });
  },
  methods: {
    init() {
      this.getData().then((res) => {
        console.log(res);
        this.Test();
      });
    },
    getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(resultJson);
        }, 1000);
      });
    },
    getTsetData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(resultJson);
        }, 1000);
      });
    },
    async Test() {
      console.log("00000000");
      const res = await this.getTsetData();
      console.log(res);
      console.log("11111111");
    },
  },
};
</script>
