<template>
<transition name="fade">
  <div class="message-dialog" v-if="visible">
    <div class="message-header">
      <p class="title">留言板</p>
      <el-button class="closeBtn" size="small" @click="messageStop()" icon="el-icon-close"></el-button>
    </div>
    <el-form class="message-form" :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="content">
        <el-input
          size="medium"
          v-model="ruleForm.content"
          placeholder="请在此输入留言内容，我们会尽快与您联系。（必填）"
          type="textarea"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input
          size="medium"
          prefix-icon="el-icon-user-solid"
          v-model="ruleForm.userName"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userMobile">
        <el-input
          size="medium"
          prefix-icon="el-icon-phone"
          v-model="ruleForm.userMobile"
          placeholder="电话(必填)"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          size="medium"
          prefix-icon="el-icon-message"
          v-model="ruleForm.email"
          placeholder="邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item prop="address">
        <el-input
          size="medium"
          prefix-icon="el-icon-location-outline"
          v-model="ruleForm.address"
          placeholder="地址"
        ></el-input>
      </el-form-item>
      <el-form-item class="textRight">
        <el-button
          class="submitBtn"
          type="primary"
          size="small"
          @click="submitForm()"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</transition>
</template>

<script>
import { messageSubmit } from "@/api/home/messageApi";
export default {
  name: "MessageBoard",
  props:{
    visible:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      ruleForm: {
        content: "",
        userName: "",
        userMobile: "",
        email: "",
        address: ""
      },
      rules: {
        content: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
          { min: 3, max: 200, message: "长度在3-200位", trigger: "blur" }
        ],

        userMobile: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
          { min: 6, max: 11, message: "长度在6-11位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    messageStop() {
      this.$refs["ruleForm"].resetFields();
      this.$emit('update:visible',false)
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          messageSubmit(this.ruleForm).then(res => {
            if (res.data.code == 200) {
              this.$successMessages("提交成功");
              setTimeout(() => {
                this.messageStop()
              }, 1000);
            } else {
              this.$errorMessages(res.message || "操作失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">

.textRight{
  text-align: right;
}

.message-dialog {
  pointer-events: auto;
  position: absolute;
  width: 300px;
  left: calc(100% - 400px);
  bottom: 100px;
  padding: 20px 0 0 0;
  background-color: #fff;
  box-shadow: 0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -moz-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -webkit-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  border-radius: 3px;
  z-index: 1002;

  .message-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    margin-left: 20px;
    .title{
      font-size: 16px;
    }
    .closeBtn{
      border: 0;
      font-size: 20px;
    }
  }

  .message-form{
    margin: 0 20px;
    margin-top: 15px;
    .submitBtn{
      width: 68px;
    }
  }
  .el-form-item {
    margin-bottom: 16px;
  }
}


.fade-enter,
.fade-leave-to{
  transform: translateX(100%);
}
.fade-enter-active,
.fade-leave-active{
  transition: all 0.3s linear;
  transform: translateX(100%);
}
.fade-enter-to,
.fade-leave{
  transform: translateX(0);
}


</style>
