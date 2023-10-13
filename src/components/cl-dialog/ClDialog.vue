<template>
  <div class="component-el-dialog" v-if="dialogControl">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      append-to-body
      custom-class="el-dialog"
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogControl"
      :width="calcWidth"
      :modal="false"
      @close="close"
      center
    >
      <div class="el-dialog-title" slot="title">
        <span v-if="$attrs.title">
          <span class="el-dialog-title-icon" v-if="showTitleIcon">
            <slot name="titleIcon"></slot>
          </span>
          <span>{{ $attrs.title }}</span>
        </span>
        <span v-else>
          <slot name="title">默认标题</slot>
        </span>
      </div>
      <slot name="content"></slot>
      <div slot="footer" class="el-dialog-footer">
        <div v-if="footerBtnNum === 1">
          <el-button type="primary" @click="close">知道了</el-button>
        </div>
        <div v-else-if="footerBtnNum === 2">
          <el-button @click="close">
            {{ minorBtnTxt }}
          </el-button>
          <el-button
            type="primary"
            @click="mainBtnClick"
            :loading="mainBtnDisabled"
            :disabled="mainBtnDisabled"
          >
            {{ mainBtnDisabled ? "" : mainBtnTxt }}
          </el-button>
        </div>
        <div v-else>
          <slot name="footer"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyClDialog",
  inheritAttrs: false,
  props: {
    // 控制模态框显示 true显示/false关闭
    showDialog: {
      type: Boolean,
      default: false,
      required: true,
    },
    // 根据UI规范设置模态框4个尺寸 {mini:'400px',small:'600px',medium:'960px',large:'1200px'}
    size: {
      type: String,
      default: () => "mini",
    },
    // 是否展示标题图标，配合titleIcon插槽使用
    showTitleIcon: {
      type: Boolean,
      default: () => false,
    },
    // footer区域展示按钮数量；
    // footerBtnNum = 1,只存在一个按钮的情况，文案为“知道了”
    // 默认footerBtnNum = 2,展示一个主操作按钮和一个次操作按钮；
    // footerBtnNum大于2的情况，需使用者自己插槽footer
    footerBtnNum: {
      type: Number,
      default: () => 2,
    },
    // 主要操作按钮文案
    mainBtnTxt: {
      type: String,
      default: () => "确定",
    },
    // 次要操作按钮文案
    minorBtnTxt: {
      type: String,
      default: () => "取消",
    },
    //主要按钮是否可点击, 异步提交操作时，需将主要操作按钮设为不可点击状态，增加loading
    mainBtnDisabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      dialogControl: false,
      calcWidth: "480px",
      sizeArr: [
        {
          size: "mini",
          width: "480px",
        },
        {
          size: "small",
          width: "600px",
        },
        {
          size: "medium",
          width: "960px",
        },
        {
          size: "large",
          width: "1200px",
        },
      ],
    };
  },
  created() {
    console.log("created", this.$attrs, this.$listeners);
    this.dialogControl = this.showDialog;
    this.initEscKeyUp();
    this.initWidth();
  },
  methods: {
    initEscKeyUp() {
      document.onkeyup = function (event) {
        console.log(event);
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 27) {
          this.close();
        }
      }.bind(this);
    },
    initWidth() {
      const size = this.size;
      if (size) {
        this.sizeArr.forEach((item) => {
          if (item.size == size) {
            this.calcWidth = item.width;
          }
        });
      }
    },
    initMaxHeight() {},
    close() {
      this.$emit("close");
    },
    mainBtnClick() {
      this.$emit("mainBtnClick");
    },
  },
};
</script>

<style lang="scss">
.el-dialog__wrapper {
  display: flex !important;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background-color: rgba(33, 42, 64, 0.38);
  .el-dialog {
    min-height: 208px;
    // 弹窗距离浏览器上下最小24px
    max-height: calc(100vh - 48px);
    margin: 0 !important;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    .el-dialog__header {
      text-align: left;
      display: flex;
      align-items: center;
      padding: 24px;
      box-sizing: border-box;
      .el-dialog-title {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
        font-weight: bold;
        .el-dialog-title-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 8px;
          font-weight: normal;
          font-size: 16px;
        }
      }
      .el-dialog__headerbtn:hover .el-dialog__close {
        color: #3369ff;
      }
    }
    .el-dialog__body {
      min-height: 80px;
      box-sizing: border-box;
      padding: 0 24px;
      flex: 1;
      overflow-y: auto;
    }
    .el-dialog__footer {
      padding: 24px;
      box-sizing: border-box;
      button {
        margin-left: 12px;
      }
    }
  }
}
</style>
