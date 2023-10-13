<template>
  <div id="echarts" style="height: 100%;">
    <div ref="chart" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script>
const echarts = require("echarts");
export default {
  name: "Echarts",
  data() {
    return {};
  },

  created() { },

  mounted() {
    this.initChart();
  },

  methods: {
    initChart() {
      let reportData = [
        { type: 'idle', quantity: 8 },
        { type: 'run', quantity: 31 },
        { type: 'pm', quantity: 456 },
        { type: 'repair', quantity: 25 },
        { type: 'scrap', quantity: 40 },
        { type: 'intial', quantity: 10 },
        { type: 'lend', quantity: 20 }
      ]
      reportData.forEach(item => {
        if (item.type === 'idle') {
          item.color = 'yellow'
        } else if (item.type === 'run') {
          item.color = 'green'
        } else if (item.type === 'pm') {
          item.color = 'blue'
        } else if (item.type === 'repair') {
          item.color = 'red'
        } else if (item.type === 'scrap') {
          item.color = 'gray'
        } else {
          //给其他的颜色随机生成，除了上面的颜色
          item.color = '#' + Math.floor(Math.random() * 0xffffff).toString(16)
        }
      })
      let colorArr = reportData.map(item => item.color)
      let dataArr = reportData.map(item => item.quantity)
      let nameArr = reportData.map(item => item.type)
      console.log(colorArr, dataArr, nameArr, 'colorArr, dataArr, nameArr')
      let _reportData = JSON.parse(JSON.stringify(reportData))
      //仿照series的数据格式,遍历reportData,生成一个新的数组
      _reportData.forEach((item, index) => {
        item.barWidth = '20%',
          item.barGap = '-100%',
          item.type = 'bar'
        item.name = nameArr[index]

        item.label = {
          show: true,
          position: 'top',
          color: '#000',
          fontSize: 10,
        }
        delete item.quantity
        delete item.color
        item.data = []
        let obj = {
          value: dataArr[index],
          itemStyle: {
            opacity: 0
          }
        }
        //循环几次就往data里push几个obj，index为几，对应的item.data里的那一项的opacity就为1
        for (let i = 0; i < _reportData.length; i++) {
          item.data.push(obj)
        }
      })
      let newSeries = JSON.parse(JSON.stringify(_reportData))
      newSeries.forEach((item, index) => {
        item.data.forEach((item1, index1) => {
          if (index1 == index) {
            item1.itemStyle.opacity = 1
          } else {
            item1.itemStyle.opacity = 0
          }
        })
      })
      console.log(newSeries, 'newSeries')


      console.log(_reportData, '_reportData')
      let myChart = echarts.init(this.$refs.chart);
      const option = {
        /* title: {
          text: "ProbeCard状态汇总表",
          x: "center",
          textStyle: {
            fontSize: 24,
            color: "#000",
          },
        }, */
        //设置标题
        title: {
          text: 'ProbeCard状态汇总表',
          left: 'center',
          top: '0%',
          textStyle: {
            color: '#000',
            fontSize: 24,
            fontWeight: 'normal'
          }
        },
        grid: {
          //调整图表位置
          show: false, //是否显示直角坐标系网格
          left: 'center',
          bottom: '3%',
          top: '20%',
        },
        xAxis: {
          type: 'category',
          data: nameArr,
        },
        yAxis: {
          type: 'value',
          show: false
        },
        legend: {
          data: nameArr,
          //位置
          top: '5%',
          //左右居中
          left: 'center',
          //与图表的距离
          itemGap: 20,
        },
        color: colorArr,
        series: newSeries,
        // series: [
        //   {
        //     //第一个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'idie',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 5,
        //         itemStyle: {
        //           opacity: 1,
        //         },
        //       },
        //       {
        //         value: 5,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 5,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 5,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 5,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //     ],

        //   },
        //   {
        //     //第二个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'run',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 8,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 8,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //       {
        //         value: 8,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 8,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 8,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //     ],

        //   },
        //   {
        //     //第三个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'pm',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 9,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 9,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 9,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //       {
        //         value: 9,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 9,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //     ],

        //   },
        //   {
        //     //第四个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'repair',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //     ],
        //   },
        //   {
        //     //第五个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'scrap',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //     ],
        //   },
        //   {
        //     //第六个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'intial',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //     ],
        //   },
        //   {
        //     //第七个
        //     barWidth: '20%',
        //     barGap: '-100%',
        //     name: 'lend',
        //     type: 'bar',
        //     data: [
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 0
        //         }
        //       },
        //       {
        //         value: 10,
        //         itemStyle: {
        //           opacity: 1
        //         }
        //       },
        //     ],
        //   }
        // ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang='scss' scoped></style>
