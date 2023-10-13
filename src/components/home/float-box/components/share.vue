<template>
<transition name="opacity">
  <div class="share-dialog" v-if="visible">
    <div class="share-header">
      <p class="title">分享到</p>
    </div>
    <div class="share-content">
      <el-popover
        v-model="popVisible"
        placement="left"
        width="400"
        :visible-arrow="false"
        trigger="click">
        <div class="pop">
          <el-input v-model="copyContent"></el-input>
          <el-button class="copyBtn" @click="copyClick">复制</el-button>
        </div>
        <p class="referenceBtn" slot="reference">
          <i class="el-icon-paperclip copyImg"></i>
          复制链接
        </p>
      </el-popover>
      <div class="hoverBg">
        <a class="link" :href="'http://service.weibo.com/share/share.php?url='+url" target="_blank">
          <img class="logo_weibo" src="@/assets/images/float-box/weibo.png" alt="" />  
          <p>新浪微博</p>
        </a> 
      </div>
      <div class="hoverBg">
        <a class="link" :href="'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title=海螺工业&desc='" target="_blank">
          <img class="logo" src="@/assets/images/float-box/qqzone.jpeg" alt="" />  
          <p>QQ空间</p>
        </a>
      </div>
      <!-- <div class="hoverBg">
        <a :href="'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&url='+url+'&title=海螺工业&desc='" target="_blank">朋友网</a>
      </div> -->
      <!-- <div class="hoverBg">
        <a :href="'https://connect.qq.com/widget/shareqq/index.html?url='+url+'&title=海螺工业&desc='" target="_blank">腾讯QQ</a>
      </div> -->
      <div class="hoverBg">
        <a class="link" :href="'http://tieba.baidu.com/f/commit/share/openShareApi?url='+url+'&title=海螺工业&desc='" target="_blank">
          <img class="logo" src="@/assets/images/float-box/tieba.jpeg" alt="" />  
          <p>百度贴吧</p>
        </a>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: "share",
  props:{
    visible:{
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      copyContent:window.location.href,
      popVisible:false,
      url:window.location.href
    };
  },
  methods: {
    closeClick() {
      this.$emit('update:visible',false)
    },
    copyClick(){
      // 创建输入框元素
      let oInput = document.createElement('input');
      // 将想要复制的值
      oInput.value = this.copyContent;
      // 页面底部追加输入框
      document.body.appendChild(oInput);
      // 选中输入框
      oInput.select();
      // 执行浏览器复制命令
      document.execCommand('Copy');
      // 弹出复制成功信息
      this.$message.success('复制成功');
      // 复制后移除输入框
      oInput.remove();

      this.popVisible = false
    }
  }
};
</script>

<style scoped lang="scss">
.share-dialog{
  pointer-events: auto;
  position: absolute;
  width: 150px;
  right: 40px;
  bottom: -50px;
  padding: 15px 0 25px 0;
  background-color: #fff;
  text-align: center;
  box-shadow: 0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -moz-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  -webkit-box-shadow:0px 0px 10px 5px rgba(33, 76, 217, 0.2);
  border-radius: 3px;
  z-index: 1002;
  .share-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    margin-left: 20px;
    border-bottom: 1px solid #d7d7d7;
    .title{
      font-size: 14px;
      color: #212A40;
    }
    .closeBtn{
      border: 0;
      font-size: 20px;
    }
  }
  .share-content{
    margin: auto;
    width: 100%;
    height: auto;
  }
}
.pop{
  display: flex;
  .copyBtn{
    margin-left: 10px;
  }
}
.referenceBtn{
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: #ecf3ff;
  }
  .copyImg{
    margin-right: 5px;
    font-size: 20px;
  }
}
.hoverBg:hover{
  background-color: #ecf3ff;
}
.link{
  display: flex;
  align-items: center;
  justify-content: center;
  .logo,.logo_weibo{
    width: 28px;
    height: auto;
    margin-right: 5px;
  }
  .logo_weibo{
    width: 22px;
    margin-right: 8px;
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
