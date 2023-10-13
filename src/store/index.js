import Vue from "vue";
import Vuex from "vuex"; //引入vuex
import createPersistedState from "vuex-persistedstate";
//引入axios
import axios from "axios";
Vue.use(Vuex); //使用vuex

export default new Vuex.Store({
  state: {
    newsList: [1, 2, 3],
    userName: "admin",
    passWord: "123456",
  },
  //1.默认所有数据都通过vuex-persistedstate插件存储到本地  //默认所有数据都通过vuex-persistedstate插件存储到本地
  //plugins: [createPersistedState()],
  //2.白名单，只有在白名单中的数据才会通过vuex-persistedstate插件存储到本地
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的passWord
          passWord: val.passWord,
        };
      },
    }),
  ],
  mutations: {
    setnewsList(state, data) {
      state.newsList = data;
    },
    setPassWord(state, data) {
      state.passWord = data;
    },
  },
  actions: {
    setnewsList({ commit }) {
      return new Promise((resolve) => {
        //这里用this.$axios.get()会报错，因为这里的this指向的是store,而不是vue实例
        // this.$axios.get("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20").then((res) => {
        //   resolve();
        // });
        //这里用axios.get()就不会报错,因为这里的this指向的是axios,记得在此之前引入axios
        axios
          .get("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20")
          .then((res) => {
            commit("setnewsList", res.data.result);
            resolve();
          });
      });
    },
    setPassWord({ commit }, data) {
      commit("setPassWord", data);
    },
  },
  modules: {},
});
