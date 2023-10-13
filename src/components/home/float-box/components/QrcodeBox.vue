<template>
<transition name="opacity">
  <div class="qr-dialog" v-if="visible">
    <div class="qr-header">
      <p class="title">{{ewmTitle}}</p>
      <el-button class="closeBtn" size="small" @click="closeClick" icon="el-icon-close"></el-button>
    </div>
    <div class="qr-content" v-if="type === '1'">
      <div class="qr-content-div" v-if="wechatUrl.length>0">
        <img class="codeImg" :src="wechatUrl" alt="" />
      </div>
      <div v-else>
        <img class="codeImg" src="@/assets/images/float-box/qrcode.png" alt="" />
        <img class="logoImg" :src="logoImg" alt="" />
      </div>
    </div>
    <div class="qr-content share" v-if="type === '2'">
      <!-- :logoSrc="imageUrl" -->
      <vue-qr :text="ewmCode" :logoSrc="logoImg" :size="240"></vue-qr>
    </div>
    <div class="qr-footer">
      <p>打开微信，使用“扫一扫”</p>
      <p>{{ewmTipText}}</p>
    </div>
  </div>
</transition>
</template>

<script>
import vueQr from 'vue-qr';
import { getCodeUrl } from "@/api/home/messageApi";

export default {
  name: "QrcodeBox",
  components:{
    vueQr
  },
  props:{
    visible:{
      type: Boolean,
      default: false,
    },
    type:{  //1:公众号   2:分享
      type: String,  
      default: '',
    }
  },
  data() {
    return {
      ewmTitle:'',
      ewmTipText:'',
      ewmCode:'',
      wechatUrl:'',
      logoImg:require('@/assets/images/float-box/hailuo_logo.jpg'),
    };
  },
  watch:{
    type(v,ov){
      if(v === '1'){  //公众号
        this.ewmTitle = '关注我们'
        this.ewmTipText = '第一时间为您推送行业新鲜资讯'
        this.queryUrl()
      }else if(v === '2'){   //分享
        this.ewmTitle = '分享到微信'
        this.ewmTipText = '即可分享至微信的联系人/聊天群/朋友圈'
        this.ewmCode = window.location.href
      }
    }
  },
  methods: {
    closeClick() {
      this.$emit('update:type','')
      this.$emit('update:visible',false)
    },
    queryUrl(){
      getCodeUrl().then(res => {
        if (res.data.code == 200 && res.data.data) {
          this.wechatUrl = res.data.data || ''
        } else {
          this.wechatUrl = ''
        }
      }).catch(()=>{
        this.wechatUrl = ''
      });
    }
  }
};
</script>

<style scoped lang="scss">

.qr-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  margin-left: 20px;
  .title{
    font-size: 14px;
    color: #212A40;
  }
  .closeBtn{
    border: 0;
    font-size: 20px;
  }
}

.qr-dialog{
  pointer-events: auto;
  position: absolute;
  width: 300px;
  left: calc(100% - 500px);
  bottom: 100px;
  padding: 15px 0 25px 0;
  background-color: #fff;
  text-align: center;
  box-shadow: 0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -moz-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -webkit-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  border-radius: 3px;
  z-index: 1002;

  .qr-content{
    margin: auto;
    width: 240px;
    height: 240px;
    .qr-content-div{
      width: 100%;
      height: 100%;
      padding: 15px;
    }
    .codeImg{
      position: relative;
      width: 100%;
      height: 100%;
    }
    .logoImg{
      position: absolute;
      width: 40px;
      height: auto;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
    }
  }
  
  .qr-footer{
    font-size: 12px;
    color: #212A40;
    text-align: center;
    line-height: 18px;
  }
}

.opacity-enter,
.opacity-leave-to{
  opacity: 0;
}
.opacity-enter-active,
.opacity-leave-active{
  transition: all 0.2s linear;
  opacity: 0;
}
.opacity-enter-to,
.opacity-leave{
  opacity: 1;
}

</style>
