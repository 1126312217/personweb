<template>
  <div class="comment-item-component" v-if="item">
    <div class="head-img">
      <img src="@/assets/images/userLogo.png" alt="" />
    </div>
    <div class="item-right">
      <div class="user">
        <span>{{ item.userName }}</span>
        <span>{{ item.updateTime }}</span>
      </div>
      <div class="content">
        <span v-if="level == 2">回复@ {{ parentData.userName }}：</span>
        {{ item.leaveSaid }}
      </div>
      <div class="item-btn">
        <div v-if="level == 1" class="huifu" @click="showIpt = !showIpt">
          <img
            class="default_img"
            src="@/assets/images/community/huifu_defalut.svg"
            alt=""
          />
          <img
            class="active_img"
            src="@/assets/images/community/huifu_hover.svg"
            alt=""
          />
          <span>回复</span>
        </div>
        <div v-if="item.isDel" class="delete" @click="deleteFn(item)">
          <img
            class="default_img"
            src="@/assets/images/community/delete_default.svg"
            alt=""
          />
          <img
            class="active_img"
            src="@/assets/images/community/delete_hover.svg"
            alt=""
          />
          <span>删除</span>
        </div>
      </div>
      <div class="item-ipt-box" v-if="showIpt">
        <div class="item-ipt">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            :placeholder="'回复' + item.userName + '：'"
            v-model="value"
            maxlength="500"
            show-word-limit
          />
        </div>
        <div class="item-ipt-btn">
          <el-button size="small" @click="showIpt = false">取消</el-button>
          <el-button size="small" type="primary" @click="handleReply"
            >回复</el-button
          >
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import communityApi from "@/api/home/communityApi";
export default {
  name: "CommentItem",
  props: {
    item: null,
    level: {
      type: Number,
      default: 1,
    },
    parentData: null,
    type: {
      //activity:活动详情评论  默认帖子
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      showIpt: false,
      imgUrl:
        "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
    };
  },
  created() {},
  methods: {
    deleteFn(res) {
      this.$confirm("确认删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.type == "activity") {
            this.apiDelReview(res);
          } else {
            this.deleteArticleSaid(res);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //帖子删除回复
    deleteArticleSaid(res) {
      let params = {
        beSaidId: res.beSaidId,
        id: res.id,
      };
      console.log(params,"删除这条回复");
      // communityApi.deleteArticleSaid(params).then((res) => {
      //   if (res) {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     });
      //     this.$emit("levelTwoReply", "success");
      //   }
      // });
    },
    //活动删除回复
    apiDelReview(res) {
      console.log(res,"删除这条回复");
      // communityApi.apiDelReview(JSON.stringify(res.id)).then((res) => {
      //   if (res) {
      //     this.$message({
      //       type: "success",
      //       message: "删除成功!",
      //     });
      //     this.$emit("levelTwoReply", "success");
      //   }
      // });
    },
    handleReply() {
      if (!this.value) {
        this.$message.error("请输入回复内容");
        return;
      }
      if (this.type == "activity") {
        this.apiReview();
      } else {
        this.addArticleSaid();
      }
    },
    //帖子回复
    addArticleSaid() {
      let parmars = {
        articleId: this.item.articleId,
        beSaidId: this.item.id,
        leaveSaid: this.value,
        imgUrl: this.imgUrl,
      };
      console.log(parmars,"回复这条评论");
      // communityApi
      //   .addArticleSaid(parmars)
      //   .then((res) => {
      //     if(res.success) {
      //       this.$message.success("回复成功");
      //       this.$emit("levelTwoReply", "success");
      //       this.value = "";
      //       this.showIpt = false;
      //     } else {
      //       this.$message.error(res.message);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    //活动回复
    apiReview() {
      let parmars = {
        activityId: this.item.articleId,
        beSaidId: this.item.id,
        leaveSaid: this.value,
      };
      console.log(parmars,"回复这条评论");
      // communityApi
      //   .apiReview(parmars)
      //   .then((res) => {
      //     if (!res.success) {
      //       this.$message.error(res.message);
      //     } else {
      //       this.$message.success("回复成功");
      //       this.$emit("levelTwoReply", "success");
      //       this.value = "";
      //       this.showIpt = false;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-item-component {
  display: flex;
  margin-top: 24px;
  width: 100%;

  .item-right {
    flex: 1;
    .user {
      display: flex;
      align-items: center;
      height: 40px;
      span {
        color: #6d7383;
        font-size: 12px;
        margin-right: 24px;
      }
    }
    .content {
      line-height: 20px;
      font-size: 12px;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      line-break: anywhere;
    }
    .item-btn {
      display: flex;
      align-items: center;
      margin-top: 5px;
      & > div {
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
        &:hover {
          .default_img {
            display: none;
          }
          .active_img {
            display: inline-block;
          }
        }
        img {
          width: 18px;
          height: 18px;
          &.default_img {
            display: inline-block;
          }
          &.active_img {
            display: none;
          }
        }
        span {
          font-size: 12px;
          color: #6d7383;
          cursor: pointer;
          &:hover {
            color: #3369ff;
          }
        }
      }
    }
    .item-ipt-box {
      margin-top: 10px;
      .item-ipt-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
}
</style>
