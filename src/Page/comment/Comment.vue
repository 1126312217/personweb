<template>
  <div class="comment-component page-content">
    <div class="ipt-container">
      <div class="ipt-box">
        <div class="head-img">
          <img src="@/assets/images/userLogo.png" alt="" />
        </div>

        <div class="ipt">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3 }"
            placeholder="请输入评论"
            maxlength="500"
            show-word-limit
            v-model="value"
          />
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="submitReply"
          >提交评论</el-button
        >
      </div>
    </div>
    <div class="comment-content" v-if="replyList.length">
      <div class="title">评论 ({{ replyList.length }})</div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in replyList" :key="item.id">
          <comment-item
            :item="item"
            :type="type"
            @levelTwoReply="levelTwoReply"
          >
            <template v-for="res in item.children">
              <comment-item
                :key="res.id"
                @levelTwoReply="levelTwoReply"
                :parentData="item"
                :item="res"
                :level="2"
                :type="type"
              ></comment-item>
            </template>
          </comment-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CommentItem from "./CommentItem";
// import communityApi from "@/api/home/communityApi";
export default {
  components: { CommentItem },
  name: "CommentComponent",
  props: {
    articleSaidList: {
      type: Array,
      default: () => [],
    },
    type: {
      //activity:活动详情评论  默认帖子
      type: String,
      default: "",
    },
  },
  watch: {
    articleSaidList() {
      this.init();
    },
  },
  data() {
    return {
      value: "",
      replyList: [],
      articleId: "",
      imgUrl:
        "https://ae01.alicdn.com/kf/Hdd856ae4c81545d2b51fa0c209f7aa28Z.jpg",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.replyList = this.articleSaidList;
      if (this.articleSaidList.length && this.type != "activity") {
        this.articleId = this.articleSaidList[0].articleId;
      } else {
        this.articleId = this.$route.query.id;
      }
    },
    //提交一级评论
    submitReply() {
      if (!this.value) {
        this.$message.error("请输入评论内容");
        return;
      }
      if (this.type == "activity") {
        this.apiReview();
      } else {
        this.addArticleSaid();
      }
    },
    //帖子评论
    addArticleSaid() {
      // communityApi
      //   .addArticleSaid({
      //     articleId: this.articleId,
      //     beSaidId: 0,
      //     leaveSaid: this.value,
      //     imgUrl: this.imgUrl,
      //   })
      //   .then((res) => {
      //     if (!res.success) {
      //       this.$message.error(res.message);
      //     } else {
      //       this.$message.success("评论成功");
      //       this.$emit("saveReply", "success");
      //       this.value = "";
      //       this.init();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    //活动评论
    apiReview() {
      // communityApi
      //   .apiReview({
      //     activityId: this.articleId,
      //     beSaidId: 0,
      //     leaveSaid: this.value,
      //   })
      //   .then((res) => {
      //     if (!res.success) {
      //       this.$message.error(res.message);
      //     } else {
      //       this.$message.success("评论成功");
      //       this.$emit("saveReply", "success");
      //       this.value = "";
      //       this.init();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    //回复成功、删除评论的回调
    levelTwoReply(res) {
      if (res == "success") {
        this.$emit("saveReply", "success");
        this.init();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-component {
  .ipt-container {
    border-bottom: 1px solid #f2f2f2;
    .ipt-box {
      padding: 24px;
      display: flex;
      box-sizing: border-box;
      .ipt {
        flex: 1;
      }
    }
    .btn-box {
      display: flex;
      justify-content: flex-end;
      padding-right: 24px;
      box-sizing: border-box;
      margin-bottom: 24px;
    }
  }
  .comment-content {
    padding: 24px;
    box-sizing: border-box;
    .title {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }
}
</style>
