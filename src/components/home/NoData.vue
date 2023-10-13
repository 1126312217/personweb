<template>
  <div class="no-data-component">
    <img src="@/assets/images/community/noData.png" alt="" />
    <div class="txt">暂无数据</div>
  </div>
</template>
<script>
export default {
  name: "NoDataComponent",
  data() {
    return {};
  },
  created() {},
  destroyed() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.no-data-component {
  display: flex;
  min-height: 210px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-direction: column;
  margin: 0 auto;
  img {
    width: 215px;
    height: 154px;
  }
  .txt {
    width: 100%;
    line-height: 40px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
}
</style>
