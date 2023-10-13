<template>
  <div>
    Pormise练习
    <el-button @click="handle">点击执行</el-button>
  </div>
</template>
<script>
export default {
  name: "PormiseTset",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    // async test() {
    //   let promise1 = new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("成功");
    //     }, 1000);
    //   });
    //   let result = await promise1;
    //   console.log(result);
    // },
    async testA() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("我是第一步");
          this.count = 1;
        }, 1000);
      });
    },
    async testB() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("我是第二步");
          this.count = 2;
        }, 3000);
      });
    },
    testC() {
      this.count = 3;
      console.log("我是第三步");
      return "我是第三步";
    },
    
    /* async和await写异步链式调用 */
    // async handle() {
    //   //如果await后面的函数有一个没有执行成功，那么就不会继续往下执行了
    //   let a = await this.testA();
    //   console.log(this.count)
    //   let b = await this.testB();
    //   console.log(this.count)
    //   let c = this.testC();
    //   //两个都执行完成才会打印a和b
    //   console.log(this.count);
    //   console.log(a);
    //   console.log(b);
    //   console.log(c);
    // },

    /* .then写异步链式调用 */
    handle() {
      this.testA().then((res) => {
        console.log(res,this.count);
        this.testB().then((res) => {
          console.log(res,this.count);
          this.testC();
          console.log(this.count);
        });
      });
    },

    /* pormise.all并发请求 */
    // handle(){
    //   let promise1 = this.testA();
    //   let promise2 = this.testB();
    //   Promise.all([promise1,promise2,this.testC]).then(res => {
    //     //两个都执行完成才会打印
    //     console.log(res);//['我是第一步', '我是第二步']
    //   });
    // }
  },
};
</script>
