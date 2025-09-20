<template>
  <div>
    <div class="card mb10">
      <div class="item">
        <span>a: {{ state.a }}</span>
        <span>b: {{ state.b }}</span>
        <span>c: {{ state.c }}</span>
      </div>
      <el-space>
        <el-button type="primary" @click="state.a++">a++</el-button>
        <el-button type="primary" @click="state.b++">b++</el-button>
        <el-button type="primary" @click="state.c.push(1)">c push</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts" name="resetSkill">
// complexDragAndDrop
// import { ref } from "vue";
// const state = ref({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3]
// });

// function reset() {
//   state.value = {
//     a: 1,
//     b: 2,
//     c: [1, 2, 3]
//   };
// }

// import { useResettableRefFn } from "@/hooks/useResettable";

// const { state, reset } = useResettableRefFn(() => ({
//   a: 1,
//   b: 2,
//   c: [1, 2, 3]
// }));
import { useResettableRef } from "@/hooks/useResettable";

const { state, reset } = useResettableRef({
  a: 1,
  b: 2,
  c: [1, 2, 3]
});
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
