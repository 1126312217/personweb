<template>
  <el-transfer
    v-model="value"
    :data="data"
    :titles="['选择角色', '已选角色']"
    :right-default-checked='value'
    :props="{
      key: 'id',
      label: 'roleName',
    }"
  ></el-transfer>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          roleName: "超级管理员",
        },
        {
          id: 2,
          roleName: "普通管理员",
        },
        {
          id: 3,
          roleName: "项目经理",
        },
        {
          id: 4,
          roleName: "运维经理",
        },
        {
          id: 5,
          roleName: "普通用户",
        },
      ],
      value: [1,5],
    };
  },
};
</script>
