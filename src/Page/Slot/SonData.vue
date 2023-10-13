<template>
  <div>
    <p>我是子组件</p>
    <div>
      <h2>我是被复用的部分啊</h2>
    </div>
    <!-- 插槽 -->
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  color: red;
}
</style>
