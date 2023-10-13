<template>
  <div class="component-calendar">
    <div class="calendar-container">
      <div class="calendar-title">
        <template v-for="(item, index) in weeks">
          <span :key="index">{{ item }}</span>
        </template>
      </div>
      <div class="calendar-box">
        <template v-for="(item, index) in showList">
          <input :class="{'disabled':item.disabled}"" :disabled="item.disabled"
          type="text" :placeholder="item.label" v-model="item.value"
          @blur="changeData($event)" @input="testValue(index)" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Calendar",
  props: {
    index: null,
    // 年eg: 2022
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    // 月份eg: 11
    mouth: {
      type: Number,
      required: true,
      default: new Date().getMonth() + 1,
    },
    // 日期eg: 12
    day: {
      type: Number,
      default: 1,
    },
    // eg: ['','','80%']  数组长度对应当前月的天数
    listData: {
      type: Array,
      default: () => [],
    },
    // 开始日期或结束日期eg: 'start'  'end'  ''  null false;
    // 接收值为'start',则 小于传入的day值的日期不可编辑
    // 接收值为'end',则 大于传入的day值的日期不可编辑
    // 不传该值或传入为null/''/false,则 整月可编辑
    startOrEnd: null,
  },
  data() {
    return {
      weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      showList: [],
      returnList: [],
    };
  },
  created() {
    this.initDateNum();
  },
  methods: {
    initDateNum() {
      this.returnList = [];
      // 接收年月的拼接
      const ym = this.year + "-" + this.mouth;
      // 接收月份的1号
      const ymd = ym + "-01";
      // 当前月共多少天
      let days = this.getCountDays(ym);
      // 上个年月
      let prevYear;
      let prevMouth;
      //跨年
      if (this.mouth < 2) {
        prevYear = this.year - 1;
        prevMouth = 12;
      } else {
        prevYear = this.year;
        prevMouth = this.mouth - 1;
      }
      // 上个年月共多少天
      let prevYM = prevYear + "-" + prevMouth;
      let prevDays = this.getCountDays(prevYM);
      // 当月1号星期几
      let week = this.getWeekDate(ymd);
      // 共需要展示多少单元格
      let total = days + week - 1;
      // 数组添加上个月的数据
      for (let i = 0; i < total - days; i++) {
        this.showList.unshift({
          label: `${prevMouth}月${prevDays - i}日`,
          value: "",
          currentMouth: false,
          disabled: true,
        });
      }
      // 数组添加本月的数据
      for (let i = 0; i < days; i++) {
        let value = "";
        if (this.listData.length) {
          value = this.listData[i].indexData;
        }
        let disabled = false;
        // 接收到了startOrEnd
        if (this.startOrEnd) {
          // 该月为开始月份
          if (this.startOrEnd == "start") {
            if (i + 1 < this.day) {
              disabled = true;
            }
          }
          // 该月为结束月份
          if (this.startOrEnd == "end") {
            if (i + 1 > this.day) {
              disabled = true;
            }
          }
        }
        this.showList.push({
          label: `${this.mouth}月${i + 1}日`,
          value,
          currentMouth: true,
          disabled,
        });
        this.returnList.push({
          date: `${this.year}-${this.mouth}-${i + 1}`,
          indexData: value,
        });
      }
      setTimeout(() => {
        this.$emit("getListData", this.returnList,this.index);
      });
    },
    // 计算某月有多少天
    getCountDays(date) {
      // 获取当前月份 date='2022-08-01'
      let curDate = new Date(date);
      // 将日期设置为32，表示自动计算为下个月的第几天（这取决于当前月份有多少天）
      curDate.setDate(32);
      // 返回当前月份的天数
      let days = 32 - curDate.getDate();
      return days;
    },
    // 计算某天星期几
    getWeekDate(date) {
      let now = new Date(date);
      let week = now.getDay();
      return week;
    },
    // 只允许输入数字、3位小数
    testValue(i) {
      let value = this.showList[i].value;
      //最多可数入3位小数
      let reg = /^\d+(\.\d{0,3})?$/;
      if (!reg.test(value)) {
        value = value.substring(0, value.length - 1);
      }
      //不可输入汉字和字母
      let reg2 = /[\u4e00-\u9fa5]|[a-zA-Z]/;
      if (reg2.test(value)) {
        value = value.substring(0, value.length - 1);
      }
      this.showList[i].value = value;
    },
    // 修改输入框的值，需要把修改后的数组数据抛出
    changeData(e) {
      this.returnList = [];
      let i = 0;
      this.showList.forEach((item) => {
        if (item.currentMouth) {
          i++;
          this.returnList.push({
            date: `${this.year}-${this.mouth}-${i}`,
            indexData: item.value,
          });
        }
      });
      setTimeout(() => {
        this.$emit("getListData", this.returnList,this.index);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar-container {
  width: 100%;
  background-color: #fff;
  .calendar-title {
    display: flex;
    align-items: center;
    border: 1px solid rgba(215, 215, 215, 1);
    border-left: 0;
    border-right: 0;
    span {
      width: 14.28%;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #212a40;
      font-weight: 700;
      box-sizing: border-box;
    }
  }
  .calendar-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-left: 1px solid rgba(215, 215, 215, 1);
    input {
      width: 14.28%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      box-sizing: border-box;
      background-color: #fff;
      border-right: 1px solid rgba(215, 215, 215, 1);
      border-bottom: 1px solid rgba(215, 215, 215, 1);
      &.disabled {
        background-color: rgba(242, 242, 242, 1);
      }
    }
  }
}
</style>
