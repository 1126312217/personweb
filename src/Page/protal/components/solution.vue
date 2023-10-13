<template>
<div class="solution-content">
  <p class="title">海螺工业互联网解决方案</p>
  <p class="content">匹配企业转型升级全链条需求，提供一站式数智解决方案</p>
  <div class="tabBg">
    <el-tabs v-model="activeName">
      <el-tab-pane label="水泥行业" name="first">
        <solution-item :data="data[0]"></solution-item>
        <solution-item :data="data[1]" type="right" :borderBottom="false"></solution-item>
      </el-tab-pane>
      <el-tab-pane label="新材行业" name="second">
        <solution-item :data="data[2]"></solution-item>
        <solution-item :data="data[3]" type="right" :borderBottom="false"></solution-item>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
  
<script>
import SolutionItem from "./solutionItem";

export default {
  name: "solution",
  components: {
    SolutionItem
  },
  data(){
    return {
      activeName:'first',
      data:[{
        title:'在线质量检测解决方案',
        content:'基于检测所需获取相应底层数据,通过高清相机抓拍获取质量产品照片、通过MES获取在线品种及产品标准参数等基础数据。',
        url:'http://yungongplat.com/cbp/portal/industry/onlinequality',
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/solution1.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
      },{
        title:'智慧加油优化解决方案',
        content:'通过接入加油系统智慧进销存模块，实时管控矿山厂区的进销存管理，通过接入海康威视视频监控，来实现加油和卸油事件的视频联动功能。',
        url:'http://yungongplat.com/cbp/portal/industry/intelligentrefuelingsolution',
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/solution2.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
      },{
        title:'大规模定制解决方案',
        content:'大规模定制平台总体设计以垂直型平台为出发点，实现线上和线下应用为导向，根据每类用户子领域的服务对象与服务内容，进行抽取、综合，形成功能设计。构建型材行业新零售工业互联网电商服务平台。',
        url:'',
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/solution3.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
      },{
        title:'设备物联解决方案',
        content:'完善设备管理流程基础定义：通过对基础资料的维护，确定设备的故障类型、故障代码，以及设备的巡检、保养信息进行设定，是进行设备全生命管理的前提条件。',
        url:'',
        imageUrl: {
          backgroundImage:
          "url(" + require("@/assets/images/portal/solution4.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover'
        },
      }]
    }
  },
  mounted(){
    
  },
};
</script>

<style lang="scss" scoped>
.solution-content{
  padding-top: 88px;
  width: 100%;
  text-align: center;
  .title{
    font-family: PingFangSC-Medium;
    font-size: 48px;
    color: #212A40;
    font-weight: 500;
    margin-bottom: 25px;
  }
  .content{
    font-family: PingFangSC-Medium;
    font-size: 24px;
    color: #6D7383;
    font-weight: 500;
    margin-bottom: 50px;
  }
  .tabBg{
    background: #F7F9FA;
  }
  /deep/.el-tabs__header{
    padding: 0 12%;
    background: #fff;
  }
  /deep/.el-tabs__item{
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
    font-weight: 600;
  }
  /deep/.el-tabs__nav-wrap::after{
    display: none;
  }
}
</style>
  