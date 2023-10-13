<template>
  <div id="demo">
    我是计算器属性
    <h2>{{ fullName }}</h2>
    <p>First name: <el-input v-model="firstName"></el-input></p>
    <p>Last name: {{ lastName }}</p>
    <h1>{{change(value)}}</h1>
    <el-input v-model="value"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "Foo",
      lastName: "Bar",
      value: "1000",
    };
  },
  computed: {
    fullName: {
      get() {
        return this.firstName + " " + this.lastName;
      },
      set(value) {
        const names = value.split(" ");
        this.firstName = names[0];
        this.lastName = names[1];
      },
    },
  },
  methods: {
    change(value) {
      return value * 2;
    },
  },
};
</script>
