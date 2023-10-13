<template>
<div class="float">
  <div class="float-inner">
    <message-board :visible.sync="messageVisible"></message-board>
    <qrcode-box :visible.sync="ewmVisible" :type.sync="showEWMType"></qrcode-box>
    <div class="float-box">
      <el-tooltip content="留言板" placement="right-start" :disabled="messageTipDisabled">
        <div class="btn" @click="messageDogo">
          <img class="img" src="@/assets/images/float-box/ic_message.png" alt="" />
        </div>
      </el-tooltip>
      <div class="line"></div>
      <el-tooltip content="分享" placement="right-start" :hide-after="1000" offset="-20">
        <div class="btn share-bg">
          <img class="img" src="@/assets/images/float-box/ic_share.png" alt="" />
          <Share class="share" :visible="true"></Share>
        </div>
      </el-tooltip>
      <div class="line"></div>
      <el-tooltip content="关注公众号" placement="right-start">
        <div class="btn" @click="ewmClick('1')">
          <img class="img" src="@/assets/images/float-box/ic_code.png" alt="" />
        </div>
      </el-tooltip>
    </div>
  </div>
</div>
</template>
<script>
import MessageBoard from "./components/MessageBoard.vue"
import QrcodeBox from "./components/QrcodeBox.vue"
import Share from "./components/share.vue"
export default {
  name: "FloatBox",
  components:{
    QrcodeBox,
    MessageBoard,
    Share
  },
  data() {
    return {
      messageVisible: false,
      ewmVisible:false,
      showEWMType:'',  //1:公众号   2:分享
      messageTipDisabled:false,
    };
  },
  methods: {
    messageDogo() {
      this.messageVisible = true;
      this.messageTipDisabled = true;
      setTimeout(() => {
        this.messageTipDisabled = false
      }, 1000);
    },
    ewmClick(type){
      this.showEWMType = type
      this.ewmVisible = true
    },  
  }
};
</script>
<style scoped lang="scss">
.float {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: transparent;
  pointer-events:none;

  .float-inner{
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.float-box {
  position: fixed;
  width: 40px;
  bottom: 120px;
  right: 45px;
  background: #fff;
  box-shadow: 4px 4px 10px 0px rgba(33, 76, 217, 0.2);
  -moz-box-shadow:4px 4px 10px 0px rgba(33, 76, 217, 0.2);
  -webkit-box-shadow:4px 4px 10px 0px rgba(33, 76, 217, 0.2);
  border-radius: 3px;
  pointer-events: auto;
  .line{
    background: #dbdeea;
    height: 1px;
  }
  .btn{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .img{
      width: 50%;
    }

    &:hover{
      background: #ECF3FF;
      cursor: pointer;
      border-radius: 3px;
    }
  }
}

.share{
  display: none;
}
.share-bg{
  &:hover{
    .share{
      display: block;
    }
  }
}

</style>
