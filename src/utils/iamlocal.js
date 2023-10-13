import utils from "./utils";
// 系统缓存至localstorage的变量
const iamlocal = {
  // 管理端登录名、账号、手机号
  loginName: {
    setItem: (loginName) => {
      utils.setItem("loginName", loginName);
    },
    getItem: () => {
      return utils.getItem("loginName");
    },
    removeItem: () => {
      utils.removeItem("loginName");
    },
  },
  // 用户端 子账号登录记录主账号
  priLoginName: {
    setItem: (priLoginName) => {
      utils.setItem("priLoginName", priLoginName);
    },
    getItem: () => {
      return utils.getItem("priLoginName");
    },
    removeItem: () => {
      utils.removeItem("priLoginName");
    },
  },
  // 用户端 子账号登录记录子账号
  childLoginName: {
    setItem: (childLoginName) => {
      utils.setItem("childLoginName", childLoginName);
    },
    getItem: () => {
      return utils.getItem("childLoginName");
    },
    removeItem: () => {
      utils.removeItem("childLoginName");
    },
  },
  // 用户类型  管理端、用户端
  userType: {
    setItem: (userType) => {
      utils.setItem("userType", userType);
    },
    getItem: () => {
      return utils.getItem("userType");
    },
    removeItem: () => {
      utils.removeItem("userType");
    },
  },
  // token
  token: {
    setItem: (token) => {
      utils.setItem("token", token);
    },
    getItem: () => {
      return utils.getItem("token");
    },
    removeItem: () => {
      utils.removeItem("token");
    },
  },
  // 用户端登录方式  主账号、子账号
  accountType: {
    setItem: (type) => {
      utils.setItem("accountType", type);
    },
    getItem: () => {
      return utils.getItem("accountType");
    },
    removeItem: () => {
      utils.removeItem("accountType");
    },
  },
  // 登陆时清除三个验证码的计时器缓存
  clearTimer: {
    setCloseItem: (time) => {
      utils.setItem("endTimeClose", time);
    },
    setMobileItem: (time) => {
      utils.setItem("endTimeMobile", time);
    },
    setEmailItem: (time) => {
      utils.setItem("endTimeEmail", time);
    },
    getCloseItem: () => {
      return utils.getItem("endTimeClose");
    },
    getMobileItem: () => {
      return utils.getItem("endTimeMobile");
    },
    getEmailItem: () => {
      return utils.getItem("endTimeEmail");
    },
    removeCloseItem: () => {
      utils.removeItem("endTimeClose");
    },
    removeMobileItem: () => {
      utils.removeItem("endTimeMobile");
    },
    removeEmailItem: () => {
      utils.removeItem("endTimeEmail");
    }
  /*   removeItem: () => {
      utils.removeItem("endTimeClose");//注销验证码计时器
      utils.removeItem("endTimeMobile");//手机验证码计时器
      utils.removeItem("endTimeEmail");//邮箱验证码计时器
    } */
  },
};
export default iamlocal;
