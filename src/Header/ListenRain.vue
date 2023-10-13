<template>
  <div class="box">
    <div ref="chartFtg" style="width: 1200px; height: 376px"></div>
    <el-button @click="handleClick">切换图标数据</el-button>
    <el-date-picker v-model="daySection" type="monthrange" range-separator="至" start-placeholder="开始日期"
      end-placeholder="结束日期" :clearable="false" :picker-options="pickerOptions" />

    <div ref="chart" style="width: 1200px; height: 376px"></div>
    <div class="list">111</div>
    <div class="list">222</div>
    <div class="list">333</div>
    <div class="list">444</div>
    <div class="list">555</div>
    <div class="list">666</div>
    <p>1111111</p>
    <div>
      <el-tooltip class="item" effect="light" placement="top" popper-class="tool-tip">
        <div slot="content">{{ text }}</div>
        <p>{{ text }}</p>
      </el-tooltip>
    </div>
    <p>{{ text }}</p>
    <div style="padding-bottom:50px;">
      <div style="display: flex">
        <h1>搜索：</h1>
        <el-input style="width: 400px" v-model="searchData" @input="search"></el-input>
      </div>
      <div class="item" v-for="(item, index) in dataList" :key="index">{{ item }}</div>
    </div>
  </div>
</template>
<script>
const echarts = require("echarts");
export default {
  data() {
    return {
      searchData: "",
      dataList: [],
      dataList1: ["金荣", "金丹", "王越", "徐金超", "肖彩", "扶炜", "蔡大屁"],
      // 用户搜索关键字
      daySection: [],
      // 日期选择器做选择限定
      startDate: "",
      pickerOptions: {
        // onPick：选中日期时的回调函数，在这里对选中的日期进行处理{maxDate：后选中日期；minDate：第一个选中的日期}
        onPick: ({ maxDate, minDate }) => {
          this.startDate = minDate && minDate.getTime();
          if (maxDate) {
            // 选中后一个时，要把第一个的赋值清空
            this.startDate = "";
          }
        },
        disabledDate: (time) => {
          //选中第一个后，后一个可以选择距离第一个的最大时间间隔为12个月,左侧的日期不能大于右侧的日期
          return (
            (this.startDate &&
              time.getTime() - this.startDate > 3600 * 1000 * 24 * 30 * 12) ||
            time.getTime() < this.startDate
          );
        },
      },
      raceData: ["街道1", "街道2", "街道3", "街道4", "街道5", "街道6", "街道7"],
      text: "我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示我是一个提示",
    };
  },
  mounted() {
    this.getEchartData();
    this.getChartsFtg();
    // 默认当前的前一个月
    this.daySection = [
      new Date(new Date().setMonth(new Date().getMonth() - 11)),
      new Date(Date.now()),
    ];
  },
  methods: {
    handleClick() {
      this.raceData = [
        "2022-01",
        "2022-02",
        "2022-03",
        "2022-04",
        "2022-05",
        "2022-06",
        "2022-07",
      ];
      this.getEchartData();
    },
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = echarts.init(chart);
        const option = {
          /* 左侧上面加一个标题：监测数据趋势 */
          title: {
            text: "监测数据趋势",
            textStyle: {
              color: "#212a40",
              fontWeight: "500",
              fontSize: 18,
              //字体  不起作用！！！！！！！！
              fontFamily:
                "'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC', sans-serif;",
            },
            left: 70,
            top: 20,
          },
          legend: {
            data: [
              "设备开工率",
              "设备稼动率",
              "企业用电量",
              "企业用气量",
              "采购订单额",
            ],
            //把图例放在底部
            bottom: 0,
          },
          xAxis: {
            type: "category",
            data: this.raceData,
            //把x轴的间隔的竖线去掉
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "",
              min: 0,
              max: 20000,
              interval: 5000,
              nameTextStyle: {
                color: "#A2A5AA",
                fontSize: 10,
              },
              splitLine: {
                show: true,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#6C6F79", //改轴颜色
                },
              },
              axisLabel: {
                formatter: "{value}",
                textStyle: {
                  color: "#A2A5AA", //改轴数值颜色
                  fontSize: 10,
                },
              },
            },
            {
              type: "value",
              name: "",
              min: 0,
              max: 100,
              interval: 25,
              nameTextStyle: {
                color: "#A2A5AA",
                fontSize: 10,
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.1)", //改轴颜色
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#6C6F79", //改轴颜色
                },
              },
              axisLabel: {
                formatter: "{value}%",
                textStyle: {
                  color: "#A2A5AA", //改轴数值颜色
                  fontSize: 10,
                },
              },
            },
          ],
          // tooltip: {
          //   trigger: 'axis',

          // },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              color: "#fff",
              align: "left",
              fontSize: 14,
            },
            axisLine: {
              //x坐标轴轴线
              show: true,
              lineStyle: {
                //x坐标轴轴线样式
                color: "#000", //'#ccc' | 'rgb(128, 128, 128)' | 'rgba(128, 128, 128, 0.5)'，设置标签颜色
              },
            },

            backgroundColor: "rgba(0,0,0,0.8)",
            formatter: function (params) {
              let str = params[0].name + "<br />";
              params.forEach((item) => {
                console.log(item.seriesName);
                if (item.value) {
                  if (
                    item.seriesName.indexOf("设备开工率") != -1 ||
                    item.seriesName.indexOf("设备稼动率") != -1
                  ) {
                    str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
                                    "></span>
                                        ${item.seriesName}
                                        :
                                      ${item.value}%
                                        <br/>`;
                  } else {
                    str += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color: ${item.color}
                                    "></span>
                                        ${item.seriesName}
                                        :
                                      ${item.value}
                                        <br/>`;
                  }
                }
              });
              return str;
            },
          },

          series: [
            {
              name: "设备开工率",
              data: [50, 35, 48, 40, 29, 47, 58],
              yAxisIndex: 1,
              type: "line",
              //去掉折线上的点
              symbol: "none",
              //折线的颜色
              itemStyle: {
                color: "#f54040",
              },
              //折线的宽度
              lineStyle: {
                width: 2,
              },
              //折线上的文字
              // label: {
              //   show: true,
              //   position: "top",
              //   color: "#F7B500",
              //   fontSize: 10,
              // },
            },
            {
              name: "设备稼动率",
              data: [null, null, 74, null, 55, 77, 62],
              yAxisIndex: 1,
              type: "line",
              //去掉折线上的点
              symbol: "none",
              //折线的颜色
              itemStyle: {
                color: " #fbc858",
              },
              //折线的宽度
              lineStyle: {
                width: 2,
              },
            },
            {
              name: "企业用电量",
              data: [4050, 2530, 6224, 7218, 9135, 5147, 7260],
              stack: "BB",
              type: "bar",
              //柱子的颜色
              itemStyle: {
                color: "#2f89cf",
              },
            },
            {
              name: "企业用气量",
              data: [8550, 6230, 4224, 7218, 6135, 5147, 9260],
              stack: "AA",
              type: "bar",
            },
            {
              name: "采购订单额",
              data: [6660, 3230, 8124, 5118, 4435, 1247, 9160],
              stack: "Ad",
              type: "bar",
            },
          ],
        };

        myChart.setOption(option);
        /* window.addEventListener("resize", function() {
            myChart.resize()
          }) */
      }
      /* this.$on('hook:destroyed',()=>{
          window.removeEventListener("resize", function() {
            this.myChart.resize();
          });
        }) */
    },

    getChartsFtg() {
      const chart = this.$refs.chartFtg;
      if (chart) {
        const myChart = echarts.init(chart);
        const dataArray = [18, 231, 156, 25, 400, 100, 200];
        const dataName = ['IDLE', 'RUN', 'PM', 'Repair', 'Scrap', 'Intial', 'Lend']
        const option = {
          // legend: {
          //   data: ['IDLE', 'RUN', 'PM', 'Repair', 'Scrap', 'Intial', 'Lend']
          // },
          //展示标题，居中，字体大小为18，颜色为#fff
          title: {
            text: "ProbeCardz状态汇总表",
            x: "center",
            textStyle: {
              fontSize: 24,
              color: "#000",
            },
          },
          legend: {
            data: ["IDLE", "RUN", "PM", "Repair", "Scrap", "Intial", "Lend"],
            //把图例放在底部
            bottom: 0,
          },
          xAxis: {
            data: ['IDLE', 'RUN', 'PM', 'Repair', 'Scrap', 'Intial', 'Lend'],
            // show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
            axisTick: {
              show: false // 不显示坐标轴刻度线
            },
            // axisLine: {
            //   show: false // 不显示坐标轴线
            // },
            // axisLabel: {
            //   show: false // 不显示坐标轴上的文字
            // },
            splitLine: {
              show: false // 不显示网格线
            },
            type: 'category'
          },
          yAxis: {
            show: false,
            type: 'value'
          },
          series: [
            //q:为什么legend没有生效，页面不显示图例
            //a:因为legend的data数据没有和series的name数据对应上
            {
              type: 'bar',
              //怎么正确赋值给series每项不同的name
              name: 'IDLE',
              //q:这里的name只有一个，怎么才能让每个柱子都有自己的name
              //a:在data里面设置name
              data: dataArray.map((item) => {
                console.log(item, "item")
                return {
                  value: item,
                  label: {
                    show: true,
                    position: 'top',
                    color: '#333',
                    fontSize: '12px'
                  }
                }
              }),
              itemStyle: {
                normal: {
                  color: function (params) {
                    //拿到name设置颜色
                    console.log(params, "params")
                    if (params.name === 'IDLE') {
                      return 'yellow'
                    } else if (params.name === 'RUN') {
                      return 'green'
                    } else if (params.name === 'PM') {
                      return 'blue'
                    } else if (params.name === 'Repair') {
                      return 'red'
                    } else if (params.name === 'Scrap') {
                      return 'gray'
                    } else {
                      return '#' + Math.floor(Math.random() * 16777215).toString(16)
                    }
                  }
                }
              }
            },
            
              /* data: dataArray.map((item) => {
                console.log(item, "item")
                return {
                  value: item,
                  label: {
                    show: true,
                    position: 'top',
                    color: '#333',
                    fontSize: '12px'
                  }
                }
              }),
              itemStyle: {
                normal: {
                  color: function (params) {
                    //拿到name设置颜色
                    console.log(params, "params")
                    if (params.name === 'IDLE') {
                      return 'yellow'
                    } else if (params.name === 'RUN') {
                      return 'green'
                    } else if (params.name === 'PM') {
                      return 'blue'
                    } else if (params.name === 'Repair') {
                      return 'red'
                    } else if (params.name === 'Scrap') {
                      return 'gray'
                    } else {
                      return '#' + Math.floor(Math.random() * 16777215).toString(16)
                    }
                  },
                },
              },
            } */
          ]
        };

        myChart.setOption(option);
        /* window.addEventListener("resize", function() {
            myChart.resize()
          }) */
      }
      /* this.$on('hook:destroyed',()=>{
          window.removeEventListener("resize", function() {
            this.myChart.resize();
          });
        }) */
    },
    search(val) {
      console.log(val);
      if (val == "") {
        this.dataList = [];
      } else {
        //使用filter方法过滤数据，如果dataList中的数据包含val，则返回这条数据
        this.dataList = this.dataList1.filter((item) =>
          item.indexOf(val) != -1
        );
      }
      // this.dataList.filter((item) => {
      //   return item.indexOf(val) != -1;
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
.item:hover {
  cursor: pointer;
  background-color: skyblue;
}
</style>
<style>
.tool-tip {
  width: 50%;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

p {
  /* 单行文本溢出显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box {
  margin-left: 50px;
  margin-top: 50px;
  margin-right: 50px;
}

.list {
  width: 100%;
  height: 65px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  transition: all 0.2s;
  padding-left: 15px;
  box-sizing: border-box;
}

/* 奇数的.list背景色为灰色 */
.list:nth-child(odd) {
  background-color: #fafafc;
}

/* 鼠标划到.list上出现阴影 */
.list:hover {
  box-shadow: 0 0 10px #ccc;
  color: blue;
  /* 放大一点点 */
  transform: scale(1.01);
}
</style>
