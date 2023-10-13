<template>
<div class="case-content">
  <p class="title">标杆案例</p>
  <p class="desc">跨行业跨领域为客户提供全链路数字化服务</p>
  <div class="content">
    <div class="content-left">
      <p class="leftTitle">{{data[selectIndex].title}}</p>
      <div class="leftContent" v-for="(msgInfo,i) in data[selectIndex].content" :key="i">
        <p class="smallTitle">{{msgInfo.title || ''}}</p>
        <p :class="{'mb28':msgInfo.title}">{{msgInfo.content}}</p>
      </div>
      <div class="btn" @click="toDetail">查看详情</div>
    </div>
    <div class="content-right">
      <div class="itemli" v-for="(item,index) in data" :key="index" :style="item.imageUrl" @mouseover="mouseover(index)">
        <p :class="['caseTitle',{'fadeIn':selectIndex!=index},{'fadeOut':selectIndex==index}]">{{item.title}}</p>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
 
export default {
  name: "partner",
  data(){
    return {
      selectIndex:0,
      data:[{
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/case1.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
        title:'芜湖海螺能源管理系统标杆案例',
        content:[
          {title:'能源管理效能低',content:'公司没有完整的能源管理系统软硬件平台，不能对能源的外购、生产和消耗情况进行实时的监控调度与扁平化管理。'},
          {title:'能源数据共享性差',content:'能源相关的数据分散在销发系统、填报系统等各个分散的信息化系统中，无法实现统一管理，也不能实现生产、能源、计量、设备、质量、安全、环保全方位的信息共享和管理。'},
          {title:'人工抄表统计效率低',content:'芜湖海螺现场生产生产线设备多，已配备的计量仪表很多都不具备数据远传功能，计量数据需要人工采集。'}
        ],
        url:'http://yungongplat.com/cbp/portal/industry/energymanagesystemcase'
      },{
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/case2.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
        title:'水泥专家自动操作系统+窑炉优化',
        content:[{
          content:'专家自动操作系统将大数据、人工智能技术与海螺水泥工艺操作思想完美结合，对水泥生产过程风、煤、料等关键参数进行控制、寻优和卡边操作，摆脱人为因素干扰，始终以最佳参数自动完成熟料、水泥的连续稳定生产，保持最佳的工艺状况和生产水平，达到节能降耗的目的。截止目前专家自动操作系统已在海螺水泥25家公司50条生产线推广实施。'
        }],
        url:'http://yungongplat.com/cbp/portal/industry/autooperationsystem'
      },{
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/case3.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
        title:'水泥行业设备管理及辅助巡检系统',
        content:[{
          content:'围绕水泥行业设备管理痛点，基于海螺水泥互联平台，将先进的检测分析技术运用到设备的管理中，利用行业机理模型和微服务组件，打造水泥行业设备管理及辅助巡检系统解决方案。',
        },{ content:'该方案硬件部分主要在现场加装压力、振动、油位等检测监控装置，软件部分主要对设备运行信息处理和集成，实现设备运行状态的实时分析，并融合维修管理、润滑管理、点检管理、故障诊断等相关模块，能够随时随地掌控设备状态。'
        }],
        url:'http://yungongplat.com/cbp/portal/industry/customer_cementdevicecheckcase'
      },{
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/case4.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
        title:'智能质量控制系统',
        content:[{
          content:'以智能质量控制系统为核心产品，为安徽宣城海螺水泥有限公司提供智能数字化矿样把控、生产过程把控、成品配料把控监测等一系列质量控制解决方案。',
        },{content:'随着科学技术的进步和资金投入，水泥行业发展的同质化趋势不断增强，行业竞争形势日趋严峻，内部挖掘、降本增效成为企业提高自身竞争力的重要一环。作为水泥生产过程的重要关键性环节，中控操作员的培养、技能提升和统一操作思路，保障系统稳定、高效运行成为急需解决的痛点问题。'
        }],
        url:'http://yungongplat.com/cbp/portal/industry/intelligentqcscase'
      }]
    }
  },
  mounted(){
    
  },
  methods:{
    mouseover(index){
      this.selectIndex = index
    },
    toDetail(){
      window.open(this.data[this.selectIndex].url)
    },
  },
};
</script>

<style lang="scss" scoped>
.mb28{
  margin-bottom: 28px;
}
.case-content{
  width: 100%;
  text-align: center;
  margin-top: 80px;
  .title{
    font-family: PingFangSC-Medium;
    font-size: 48px;
    color: #212A40;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .desc{
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #6D7383;
    font-weight: 500;
    margin-bottom: 70px;
  }
  .content{
    width: 100%;
    height: 790px;
    background: url(@/assets/images/portal/case_background.png) no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .content-left{
      width: 720px;
      height: 540px;
      background-image: linear-gradient(270deg, #B3A9D8 0%, #6091CF 55%, #6E7AD3 100%);
      border-radius: 4px;
      margin-right: 120px;
      padding: 40px 75px 0 36px;
      text-align: left;
      color: #fff;

      .leftTitle{
        font-size: 26px;
        margin-bottom: 45px;
      }
      .leftContent{
        font-size: 16px;
        line-height: 25px;
      }
      .smallTitle{
        font-size: 22px;
        line-height: 30px;
      }
      .btn{
        background: #3369FF;
        border-radius: 1px;
        width: 104px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        margin-top: 35px;
        cursor: pointer;
      }
      .btn:hover{
        background: #74A0FA;
      }
    }
    .content-right{
      width: 370px;
      height: 540px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .itemli{
        width: 100%;
        height: 110px;
        line-height: 120px;
        border-radius: 2px;
      }

      .caseTitle{
        color: #fff;
        width: 100%;
        height: 100%;
        font-size: 22px;
        font-weight: 500;
        background-color: rgba(39,72,177,0.67)
      }
    }
  }
}

.fadeOut{
  transition: all 1s;
  opacity: 0;
}
.fadeIn{
  transition: all 1s;
  opacity: 1;
}

@media screen and (min-width: 0px) and (max-width: 1300px) {
  .content-left {
    margin-right: 50px !important;
  }
}

</style>
  