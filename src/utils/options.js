import accountSecurityApi from "@/api/accountSecurityApi";
import validator from "./validator";
// 全局参数
const options = {
  // 判断是登录用户是管理端还是用户端
  userType: {
    manager: 'MANAGER_USER',
    client: 'CLIENT_USER'
  },
  // 登录保护  双因子验证
  loginSecurity: [
    {
      value: 0,
      label: '手机'
    }, {
      value: 1,
      label: '邮箱'
    }, {
      value: 2,
      label: '关闭'
    }, {
      value: 3,
      label: '全部开启'
    },
  ],
  // 获取密码策略
  initPwdStrategy: () => {
    accountSecurityApi.queryStrategy().then((res) => {
      const resR = res[0];
      let fn = (value, callback) => {
        // 最少输入字符
        if (value.length < resR.pwdMinLength) {
          return callback(
            new Error("最少输入" + resR.pwdMinLength + "个字符")
          );
        }
        // 大写字母个数
        if (resR.upCharsLengthStatus) {
          let upCharsArr = value.match(/[A-Z]/g);

          if (!upCharsArr || upCharsArr.length < resR.upCharsLength) {
            return callback(
              new Error("最少包含" + resR.upCharsLength + "个大写字母")
            );
          }
        }
        // 小写字母个数
        if (resR.lowCharsLengthStatus) {
          let lowCharsArr = value.match(/[a-z]/g);

          if (!lowCharsArr || lowCharsArr.length < resR.lowCharsLength) {
            return callback(
              new Error("最少包含" + resR.lowCharsLength + "个小写字母")
            );
          }
        }
        // 数字个数
        if (resR.numCharsLengthStatus) {
          let numCharsArr = value.match(/[0-9]/g);

          if (!numCharsArr || numCharsArr.length < resR.numCharsLength) {
            return callback(
              new Error("最少包含" + resR.numCharsLength + "个数字")
            );
          }
        }
        // 特殊字符
        if (resR.specCharLengthStatus) {
          const reg = "!@#$%^&*()_+-=";
          let count = 0;
          for (let i = 0; i < value.length; i++) {
            if (!reg.includes(value[i])) {
              continue;
            }
            count++;
          }
          if (count < resR.specCharLength) {
            return callback(
              new Error(
                "最少包含" +
                resR.specCharLength +
                "个特殊字符,特殊字符包括 !@#$%^&*()_+-="
              )
            );
          }
        }
      };
      validator.password = (msg, pwd) => {
        return [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error(`请输入${msg ? msg : "密码"}`));
              }
              if (value.length > 32) {
                return callback(new Error("最多支持输入32个字符"));
              }
              fn(value, callback);
              if (pwd) {
                if (value === pwd) {
                  return callback(new Error("新密码与原密码不能一致"));
                }
              }
              callback();
            },
            trigger: "blur",
          },
        ];
      };
    });
  },
}
export default options;