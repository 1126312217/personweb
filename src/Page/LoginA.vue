<template>
  <div class="login-box">
    <div class="owl" id="owl">
      <div class="hand"></div>
      <div class="hand hand-r"></div>
      <div class="arms">
        <div class="arm"></div>
        <div class="arm arm-r"></div>
      </div>
    </div>
    <div class="input-box">
      <el-input type="text" v-model="userName" placeholder="账号" clearable />
      <el-input
        type="password"
        show-password
        v-model="passWord"
        placeholder="密码"
        id="password"
        clearable
        @blur="checkPassWord"
        @focus="inputFocus"
      />
      <el-button type="success">登录</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  mounted() {
    //
  },
  methods: {
    //获取输入框焦点触发
    inputFocus() {
      document.getElementById("owl").classList.add("password");
    },
    // 失去焦点触发
    checkPassWord() {
      document.getElementById("owl").classList.remove("password");
    },
  },
};
</script>
<style scoped>
.login-box {
  /* 相对定位 */
  position: relative;
  top: 50%;
  left: 40%;
  width: 320px;
}
.el-input {
  margin-bottom: 10px;
}
.input-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
}
/* 接下来是猫头鹰的样式 */
.owl {
  width: 211px;
  height: 108px;
  /* 背景图片 */
  background: url("../assets/images/owl-login.png") no-repeat;
  /* 绝对定位 */
  position: absolute;
  top: -100px;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
}
.owl .hand {
  width: 34px;
  height: 34px;
  border-radius: 40px;
  background-color: #472d20;
  /* 绝对定位 */
  position: absolute;
  left: 12px;
  bottom: -8px;
  /* 沿Y轴缩放0.6倍（压扁） */
  transform: scaleY(0.6);
  /* 动画过渡 */
  transition: 0.3s ease-out;
}
.owl .hand.hand-r {
  left: 170px;
}
.owl .password .hand {
  transform: translateX(42px) translateY(-15px) scale(0.7);
}
.owl .password .hand.hand-r {
  transform: translateX(-42px) translateY(-15px) scale(0.7);
}
.owl .arms {
  position: absolute;
  top: 58px;
  width: 100%;
  height: 41px;
  overflow: hidden;
}
.owl .arms .arm {
  width: 40px;
  height: 65px;
  position: absolute;
  left: 20px;
  top: 40px;
  background: url("../assets/images/owl-login-arm.png") no-repeat;
  transform: rotate(-20deg);
  transition: 0.3s ease-out;
}
.owl .arms .arm.arm-r {
  transform: rotate(20deg) scaleX(-1);
  left: 158px;
}
.owl.password .arms .arm {
  transform: translateY(-40px) translateX(40px);
}
.owl.password .arms .arm.arm-r {
  transform: translateY(-40px) translateX(-40px) scaleX(-1);
}
</style>
