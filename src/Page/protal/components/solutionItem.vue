<template>
<div :class="['solution-item',{'borderBottom':borderBottom}]">
  <div class="itemBg" v-if="type == 'left'">
    <div class="item-left" :style="data.imageUrl"></div>
    <div class="item-right">
      <p class="title">{{data.title}}</p>
      <p class="content">{{data.content}}</p>
      <div class="btn" @click="detail">查看详情</div>
      <div class="point"></div>
    </div>
  </div>
  <div class="itemBg" v-else>
    <div class="item-right">
      <p class="title">{{data.title}}</p>
      <p class="content">{{data.content}}</p>
      <div class="btn" @click="detail">查看详情</div>
      <div class="point"></div>
    </div>
    <div class="item-left" :style="data.imageUrl"></div>
  </div>
</div>
</template>
  
<script>
 
export default {
  name: "solution",
  data(){
    return {
    
    }
  },
  props:{
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'left',
    },
    borderBottom: {
      type: Boolean,
      default: true,
    }
  },
  mounted(){

  },
  methods:{
    detail(){
      window.open(this.data.url)
    }
  }
};
</script>

<style lang="scss" scoped>
.borderBottom{
  border-bottom: 1px solid #DBDEEA;
}
.solution-item{
  margin: 0 12%;
  width: 76%;
  display: flex;
  align-items: center;
  .itemBg{
    display: flex;
    justify-content: space-between;
    height: 300px;
    width: 100%;
    margin: 37px 0;
  }
  .item-left{
    width: 47%;
  }
  .item-right{
    width: 47%;
    height: 100%;
    text-align: left;
    position: relative;
    .title{
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #212A40;
      line-height: 40px;
    }
    .content{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #212A40;
      line-height: 30px;
    }
    .btn{
      background: #3369FF;
      border-radius: 1px;
      width: 104px;
      height: 32px;
      color: #fff;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      margin-top: 50px;
      cursor: pointer;
    }
    .btn:hover{
      background: #74A0FA;
    }

    .point{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      background: url(@/assets/images/portal/solution_point.svg);
    }
  }
}
</style>
  