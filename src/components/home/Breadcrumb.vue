<template>
  <div class="breadcrumb-component">
    <div class="flex-start">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="item.path">
          {{item.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  props: {
    breadList:Array
  },
}
</script>

<style lang="scss" scoped>
.flex-start {
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/deep/.is-link{
  font-weight: normal;
  color: #6D7383;
}
</style>