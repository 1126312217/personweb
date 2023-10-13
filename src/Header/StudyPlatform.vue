<template>
  <div class="box">
    <h2>深度监听对象属性改变触发视图更新{{ ftg.wy }}</h2>
    <!-- <button @click="changeValue">改变ftg对象里的wy的属性值</button> -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="ruleForm.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="开始日期"
      :picker-options="pickerOptions0"
    >
    </el-date-picker>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="结束日期"
      :picker-options="pickerOptions1"
    >
    </el-date-picker>
    <h3 style="color: red; font-size: 30px">
      passWord放在了白名单，做了持久化处理，其他的没做
    </h3>
    <h1>用户名：{{ userName }}</h1>
    <h1>密码：{{ passWord }}</h1>
    {{ newsList }}
    <p v-changeColor v-wordSpace>
      我是一段文字,我被全局自定义指令修改了颜色和字间距
    </p>
    <el-input v-model="copyText" placeholder=""></el-input>
    <el-button type="primary" v-copy="copyText">复制</el-button>
    <el-button type="primary" v-throttle="handleClick">自定义指令实现按钮节流</el-button>
    <el-button type="primary" v-debounce="handleClick">自定义指令实现按钮防抖</el-button>
    <h1 class="animate__animated animate__bounce">An animated element</h1>
    <div class="contact-box">
      <div class="contactuser">
        <div>111</div>
        <div
          ref="two"
          v-if="show"
          class="active animate__animated animate__bounce"
        >
          000
        </div>
        <div>222</div>
        <div class="one">333</div>
      </div>
    </div>
    <el-button @click="getData">点击</el-button>
    <!-- 一个el-table,第一列分为no park和park两个模块，其他正常 -->
    <el-table
      :data="contractList"
      style="width: 100%"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        prop="date"
        label=""
        width="180"
        align="center"
        fixed
      >
      <template slot-scope="scope">
        <div :class="{ftg:scope.row.date == '长安街'}">
          {{ scope.row.date }}
        </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        align="center"
        fixed
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180"
        align="center"
        fixed
      ></el-table-column>
      <el-table-column
        prop="no"
        label="区域"
        width="180"
        align="center"
        fixed
      ></el-table-column>
      <el-table-column
        prop="park"
        label="建筑"
        width="180"
        align="center"
        fixed
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      copyText: "我是一段文字",
      contractList: [
        {
          date: "长安街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          no: "no",
          park: "park1",
        },
        {
          date: "长安街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          no: "no",
          park: "park1",
        },
        {
          date: "长安街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          no: "no",
          park: "park1",
        },
        {
          date: "锦华街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          no: "no",
          park: "park",
        },
        {
          date: "锦华街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          no: "no",
          park: "park",
        },
        {
          date: "锦华街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          no: "no",
          park: "park",
        },
        {
          date: "锦华街",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          no: "no",
          park: "park",
        },
      ],
      ftg: {
        wy: 507,
      },
      show: true,
      value1: "",
      value2: "",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      //两个日期框,限制结束日期必须大于开始日期,且开始日期和结束日期不能小于当天日期

      pickerOptions0: {
        //结束时间不能大于开始时间
        disabledDate: (time) => {
          if (this.value2) {
            return (
              time.getTime() > new Date(this.value2).getTime() ||
              time.getTime() < Date.now() - 8.64e7
            );
          } else {
            //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.value1) {
            return time.getTime() < new Date(this.value1).getTime(); //可以选择同一天
          } else {
            //还没有选择开始时间的时候，让他只能选择今天之后的时间包括今天
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      /* pickerOptions0: {
        //结束时间不能大于开始时间
        disabledDate: (time) => {
          if (this.value2) {
            return (
              time.getTime() > new Date(this.value2).getTime()
            );
          } else {
            //还没有选择结束时间的时候，让他只能选择今天之后的时间包括今天
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.value1) {
            return (
              time.getTime() <
              new Date(this.value1).getTime() -
                1 * 24 * 60 * 60 * 1000
            ); //可以选择同一天
          }
        },
      }, */
    };
  },
  computed: {
    ...mapState(["userName"]),
    ...mapState(["newsList"]), //和下面的写法一样，只是简写
    // ...mapState({
    //   newsList: (state) => state.newsList,
    // }),
    ...mapState({
      passWord: (state) => state.passWord,
    }),
  },
  mounted() {
    this.getParmars();
    console.log(this.userName, "userName");
    //打印vvuex中的newsList数据
    console.log(this.newsList, "newsList1");
    //监听滚动条的滚动事件
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleClick() {
      console.log("我被点击了");
    },
    getParmars() {
      //用axios请求数据,调用免费的接口
      this.$axios
        .get("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20")
        .then((res) => {
          let str = this.ftg.wy;
          if (res.data.result[0].aid == str) {
            this.ftg.wy = res.data.result;
          }
        });
    },
    onSubmit() {
      console.log("submit!");
      //表单验证
      this.$refs["form"].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getData() {
      //触发vuex里的action的setnewsList方法
      this.$store.dispatch("setnewsList");
      console.log(this.newsList, "newsList2");
      //触发setPassWord方法，修改vuex中的passWord
      this.$store.dispatch("setPassWord", "我是修改后的密码");
      //用axios请求数据,调用免费的接口
      // this.$axios
      //   .get("http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20")
      //   .then((res) => {
      //     console.log(res);
      //   });
    },
    handleScroll() {
      /*  this.show = true;
      //获取class="active“的元素、
      const oDiv = document.querySelector(".active");
      //获取滚动条距离ye顶部的距离
      const top = document.documentElement.scrollTop;
      console.log(top);
      if (top < 50) {
        this.show = false;
      } else {
        this.show = true;
        this.$refs.two.style.color = "red";
      } */
    },
    /* 表格合并列和行 */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.flitterData(this.contractList).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    /**合并表格的第一列，处理表格数据 */
    flitterData(arr) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //注意这里的date是表格绑定的字段，根据自己的需求来改
          if (item.date === arr[index - 1].date) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0); //这里的0是为了保证数组长度和表格行数一致
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      console.log(spanOneArr, "spanOneArr");
      return {
        one: spanOneArr,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.park1 {
  background-color: skyblue;
}
.box {
  width: 100%;
  height: 1000px;
}
.move {
  //向上移动50px
  transform: translateY(-50px);
}
.contact-box {
  position: fixed;
  right: 12px;
  bottom: 78px;
  z-index: 99;
  .contactuser {
    padding: 15px 0;
    height: 120px;
    width: 50px;
    border-radius: 50px;
    background-color: #3369ff;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .active {
      border: none;
      width: 50px;
      height: 110px;
      border-radius: 50px 50px 0 0;
      background-color: #3369ff;
      text-align: center;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
      position: fixed;
      right: 12px;
      bottom: 148px;
      z-index: 1;
    }
  }
}
</style>
