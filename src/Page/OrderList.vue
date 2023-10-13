<template>
  <div>
    <p>订单列表</p>
    <!-- 一个elementui form表单，包含名字，年龄，都是必填 -->
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>
    
  </div>
  <!-- OrderList -->
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        age: ''
      },
      rules: {
        name: [
          //自定义校验规则，name2-32个字符，允许输入中英文、数字、（）
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { required: true,
                        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,32}$/,
                        message: 'Only digits,letters,spaces,and underscores(_) are allowed.The first character must be letter.',
                        trigger: 'blur'}
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!');
          return false;
        }
      });
    }
  }
}
</script>