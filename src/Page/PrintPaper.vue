<template>
  <div>
    <h1>vue使用print打印时，会多出空白页，这多半是外边距导致的，将打印的dom对象的margin 设置为0</h1>
    <div id="printMe">
      <img src="../assets/login2.png" alt="">
      <div class="goodsStyle demo-flex">
        <!-- 一个element表格 -->
        <el-table :data="list" style="width: 100%" border size="mini">
          <el-table-column
            prop="id"
            label="ID"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            width="100"
            align="center"
            @click="handleClick(scope.row)"
          ></el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="100"
            align="center"
          >
            <!-- 插槽 -->
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">启用</span>
              <span v-else>禁用</span>
              <el-switch
                :value="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            min-width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="更新时间"
            width="100"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <div style="text-align: center; margin-top: 20px">
      <el-button
        size="small"
        ref="btn"
        type="primary"
        class="printObjDy"
        @click="handleprint(printObj)"
        v-print="printObj"
        >打 印</el-button
      >
    </div>
    <el-button @click="openApply">历史评价</el-button>
    <el-button @click="toScore">评价</el-button>
    <div class="apply">
      <div class="goods-rete">
        <el-dialog title="评价" :visible.sync="scoreVisible" width="30%">
          <el-form :model="form" label-position="left">
            <el-form-item label="商品评分" label-width="100px">
              <el-rate v-model="form.rate"></el-rate>
            </el-form-item>
            <el-form-item label="评价内容" label-width="100px">
              <el-input
                type="textarea"
                placeholder="多描述商品的使用感受，给对付款商品感兴趣的他们一些建议，评论内容会显示在商品详情的评论区~"
                v-model="form.content"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 8, maxRows: 10 }"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <el-drawer
        size="45%"
        custom-class="add-draw"
        ref="drawer"
        :destroy-on-close="true"
        title="历史评价"
        :visible.sync="visible"
      >
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in replyList"
              :key="index"
              :timestamp="item.time"
              placement="top"
            >
              <div class="card">
                <p>
                  {{ item.content }}
                </p>
                <div
                  class="reply"
                  v-for="(val, index) in item.replyData"
                  :key="index"
                >
                  <h5>管理员回复：</h5>
                  <p>{{ val }}</p>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      replyList: [
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },{
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },{
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },{
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },{
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐"],
        },
        {
          time: "2022/11/30 19:07:12",
          content:
            "致力于“细致高效”的管理方案和流程的逐步完善、升级，对企业经营业务的精细化、规范化、数字化的管理要求也越来越高，对组织效率、业务执行过程管控越来越重视，强烈推荐！",
          replyData: ["谢谢推荐!", "谢谢推荐!!!"],
        },
      ],
      form: {
        rate: null,
        content: "",
      },
      visible: false,
      scoreVisible: false,
      list: [
        {
          id: 1,
          name: "张三",
          age: 18,
          status: "0",
          address: "北京",
          phone: "123456789",
          email: "1126312217@q.com",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 2,
          name: "李四",
          age: 18,
          status: "1",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 3,
          name: "王五",
          age: 18,
          status: "0",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 4,
          name: "赵六",
          age: 18,
          status: "1",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 5,
          name: "钱七",
          age: 18,
          status: "0",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 6,
          name: "孙八",
          age: 18,
          status: "0",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 7,
          name: "周九",
          age: 18,
          status: "1",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
        {
          id: 8,
          name: "吴十",
          age: 18,
          status: "0",
          address: "北京",
          phone: "123456789",
          email: "dcs",
          create_time: "2019-01-01",
          update_time: "2019-01-01",
        },
      ],
      printObj: {
        id: "printMe",
        popTitle: "订单",
        extraCss: "",
        extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>',
      },
    };
  },
  mounted() {},
  methods: {
    handleprint(val) {
      console.log(val);
    },
    //打开历史评价
    openApply() {
      this.visible = true;
    },
    toScore() {
      this.scoreVisible = true;
    },
    cancel() {
      this.scoreVisible = false;
      this.form.rate = null;
      this.form.content = "";
    },
    submit() {
      console.log(this.form);
      this.scoreVisible = false;
      this.form.rate = null;
      this.form.content = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.goods-rete {
  ::v-deep .el-form-item__label {
    position: relative !important;
    top: -9px !important;
  }
}
.apply {
  ::v-deep .el-drawer__header {
    padding: 20px;
    border-bottom: 1px solid #000;
    font-weight: 700;
  }
  ::v-deep .el-timeline-item__wrapper {
    display: flex;
  }
  .block {
    padding-left: 20px;
    ::v-deep .el-timeline-item__tail {
      top: 8px;
    }
    ::v-deep .el-timeline-item__node {
      top: 8px;
    }
    ::v-deep .el-timeline-item__timestamp.is-top {
      width: 60px;
      line-height: 20px;
      color: #212a40;
      font-size: 12px;
    }
    ::v-deep .el-timeline-item__node--normal {
      left: 1px;
      width: 8px;
      height: 8px;
    }
    .card {
      padding-left: 30px;
      padding-bottom: 20px;
      margin-right: 30px;
      p {
        color: #212a40;
        font-size: 12px;
      }
      .reply {
        margin-top: 20px;
        padding: 10px 0 20px 20px;
        border-left: 4px solid #a2a9b7;
        background-color: #f5f7fa;
        h5 {
          font-size: 12px;
          color: #212a40;
          font-weight: 700;
        }
        p {
          font-size: 12px;
          margin-top: 5px;
          color: #212a40;
        }
      }
    }
  }
}
</style>
