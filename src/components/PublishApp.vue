<template>
  <div>
    <p class="el-icon-back back-go" @click="go"></p>
    <p>发布</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
  },
  created() {
    console.log(this.$route.params);
  },
};
</script>
