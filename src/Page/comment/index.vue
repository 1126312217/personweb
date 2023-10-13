<template>
  <div id="comment">
    <!-- 评论 -->
    <div class="comment">
      <comment-component
        :articleSaidList="articleSaidList"
        :type="activity"
        @saveReply="saveReply"
      ></comment-component>
    </div>
  </div>
</template>

<script>
import CommentComponent from "./Comment";
export default {
  components: { CommentComponent },
  data() {
    return {
      articleSaidList: [],
      activity: "activity",
    };
  },

  created() {
    this.init();
  },

  mounted() {},

  methods: {
    //初始化
    init() {
      this.getArticleSaidList();
    },
    //获取评论列表
    getArticleSaidList() {
      this.articleSaidList = [
        {
          leaveSaid: "123",
          beSaidId: 0,
          children: [
            {
              leaveSaid: "写的真好",
              beSaidId: 116,
              children: null,
              articleId: 54,
              updateTime: "2023-02-20 10:10",
              id: 117,
              userName: "futinggang9839",
              userId: 1364149394456576,
              isDel: false,
            },
          ],
          articleId: 54,
          updateTime: "2023-01-29 10:22",
          id: 116,
          userName: "yuyang4484",
          userId: 1370428041289728,
          isDel: false,
        },
        {
          leaveSaid: "不错666",
          beSaidId: 0,
          children: [
            {
              leaveSaid: "写的真好",
              beSaidId: 116,
              children: null,
              articleId: 54,
              updateTime: "2023-02-20 10:10",
              id: 117,
              userName: "futinggang9839",
              userId: 1364149394456576,
              isDel: false,
            },
          ],
          articleId: 54,
          updateTime: "2023-01-29 10:22",
          id: 11,
          userName: "yuyang4484",
          userId: 1370428041289728,
          isDel: false,
        }
      ];
    },
    //评论成功的回调
    saveReply(res) {
      if (res == "success") {
        this.init();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
