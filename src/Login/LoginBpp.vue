<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-button @click="getCode" :disabled="!BtnStatus">
        {{ BtnStatus ? "获取验证码" : `${countDownTime}s` }}</el-button
      >

      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #505458; border: none"
          v-on:click="login"
          :disabled="!canSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: "LoginBapp",
  data() {
    return {
      countDownTime: 60,
      BtnStatus: true,
      loginForm: {
        username: "",
        password: "",
      },
      responseResult: [],
    };
  },
  computed: {
    //如果两个输入框有一个没有填写按钮就不能被点击
    canSubmit() {
      // return this.loginForm.username && this.loginForm.password;
      const { username, password } = this.loginForm;
      return username && password;
    },
  },
  mounted() {
    let myEndTime = localStorage.getItem("yourEndTime");
    //计算myEndTime与当前时间的时间差
    let myTime = new Date().getTime();
    let timeDiff = myEndTime - myTime;
    //如果时间差大于0小于60s，则执行倒计时
    if (timeDiff > 0 && timeDiff < 60 * 1000) {
      this.codeCountDown(myEndTime);
    }
  },
  methods: {
    //获取验证码
    getCode() {
      let endMsRes = new Date().getTime() + 60000;
      //Setitem 为封装 localStoryge 方法
      localStorage.setItem("yourEndTime", JSON.stringify(endMsRes));
      this.codeCountDown(endMsRes);
    },
    codeCountDown(endMsRes) {
      this.BtnStatus = false;
      this.countDownTime = Math.ceil((endMsRes - new Date().getTime()) / 1000);
      console.log(this.countDownTime);
      let time = setTimeout(() => {
        this.countDownTime--;
        if (this.countDownTime < 1) {
          this.BtnStatus = true;
          this.countDownTime = 60;
          console.log("倒计时结束", this.countDownTime);
          //清除计时器
          clearTimeout(time);
        } else {
          this.codeCountDown(endMsRes);
        }
      }, 1000);
    },
    login() {
      this.$router.push("/home");
      //清除浏览器定时器缓存
      localStorage.removeItem("yourEndTime");
      /* this.$axios
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            this.$router.replace({path: '/index'})
                        }
                    })
                    .catch(failResponse => {
                    }) */
    },
  },
};
</script>

<style>
#poster {
  background: url("../assets/login2.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body {
  margin: 0px;
  padding: 0;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
