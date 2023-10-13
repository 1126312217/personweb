<template>
<div class="partner">
  <p class="title">合伙伙伴</p>
  <p class="content">开放的生态环境，引入多方合作伙伴支持，生态共生，价值共赢</p>
  <img src="@/assets/images/portal/partner.png" alt="">
</div>
</template>
  
<script>
 
export default {
  name: "partner",
  data(){
    return {
    
    }
  },
  mounted(){
    
  },
};
</script>

<style lang="scss" scoped>
.partner{
  padding-top: 88px;
  width: 76%;
  margin: 0 12%;
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
    margin-bottom: 30px;
  }
  img{
    width: 100%;
  }
}
</style>
  