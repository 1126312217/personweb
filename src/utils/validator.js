// 系统内的表单rules校验规则
const validator = {
  // 用户名
  userName: (msg = '用户名') => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg}`));
          }
          const re = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,32}$/;
          const isValid = /^[0-9]*$/;
          if (re.test(value) && !isValid.test(value)) {
            callback();
          } else {
            return callback(
              new Error("只允许输入2-32字符,中英文、数字、下划线,且不能为纯数字")
            );
          }
        },
        trigger: "blur",
      },
    ]
  },
  // 邮箱
  email: (msg = '邮箱') => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg}`));
          }
          const re = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (re.test(value)) {
            callback();
          } else {
            return callback(
              new Error("请检查邮箱格式是否正确,且最长只能输入255个字符")
            );
          }
        },
        trigger: "blur",
      },
    ]
  },
  // 手机号码
  mobile: (msg = '手机号') => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg}`));
          }
          const re = /^[0-9]{11}$/;
          if (re.test(value)) {
            callback();
          } else {
            return callback(new Error("只允许输入11位纯数字"));
          }
        },
        trigger: "blur",
      },
    ]
  },
  // 企业组织名称
  orgName: (msg = '主体名称') => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg}`));
          }
          const re = /^[\u4e00-\u9fa5a-zA-Z0-9()（）-]{2,32}$/;
          if (re.test(value)) {
            callback();
          } else {
            return callback(
              new Error(
                "只允许输入2-32字符,允许的字符包括：中英文、数字、()、-"
              )
            );
          }
        },
        trigger: "blur",
      },
    ]
  },
  // 角色名称
  roleName: (msg = '角色名称') => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg}`));
          }
          const re = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/;
          if (re.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入2-20个字符之间,允许输入中英文、数字"));
          }
        },
        trigger: "blur",
      },
    ]
  },
  // 密码
  password: (msg, pwd) => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error(`请输入${msg ? msg : '密码'}`));
          }
          if (value.length < 8 || value.length > 32) {
            return callback(new Error("请输入8~32个字符"));
          }
          if (pwd) {
            if (value === pwd) {
              return callback(new Error("新密码与原密码不能一致"));
            }
          }
          callback()
        },
        trigger: "blur",
      }
    ]
  },
  // 确认密码  pwd为未加密的密码内容
  againPwd: (pwd) => {
    return [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (!value) {
            return callback(new Error("请输入确认密码"));
          }
          if (value !== pwd) {
            return callback(new Error("两次输入密码不一致"));
          }
          callback()
        },
        trigger: "blur",
      }
    ]
  },
  // 普通的下拉框非空校验
  select: (msg) => {
    return [
      {
        required: true,
        message: `请选择${msg}`,
        trigger: ["blur", "change"],
      },
    ]
  },
  // 普通的输入框非空校验
  input: (msg) => {
    return [
      {
        required: true,
        message: `请输入${msg}`,
        trigger: "blur",
      },
    ]
  },
  // 普通的单选框非空校验
  radio: (msg) => {
    return [
      {
        required: true,
        message: `请选择${msg}`,
        trigger: "change"
      },
    ]
  },
  // 普通的复选框非空校验
  checkbox: (msg) => {
    return [
      {
        type: "array",
        required: true,
        message: `请选择${msg}`,
        trigger: ["change"],
      },
    ]
  }
}
export default validator;