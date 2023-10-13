<template>
  <div>
    <router-view></router-view>
    <p>userList</p>
    <p @click="run">1111</p>
    <el-button @click="go" size="mini">点击跳转</el-button>
    <el-button @click="deleteMsg">点击弹窗1</el-button>
    <el-button @click="tipMsg">点击弹窗2</el-button>
    <el-button @click="confirmMsg">点击弹窗3</el-button>
    <el-button @click="openDialg">点击弹窗4</el-button>

    <!-- clear点击清空的实现  ref属性注册，用于操作dom元素-->
    <el-select
      v-model="chooseName"
      placeholder="请选择"
      clearable
      @clear="handleClear"
      ref="selectUpResId"
    >
      <el-option hidden value="一级菜单" :label="chooseName"></el-option>
      <!-- data数据， props配置选项 expand-on-click-node是否在点击节点的时候展开或者收缩节点  check-on-click-node是否在点击节点的时候选中节点 node-click节点被点击时的回调-->
      <el-tree
        :data="data"
        :props="defaultProps"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </el-select>

    <!-- dialog -->
    <div v-if="dialogVisable">
      <cl-dialog
        :showDialog="show"
        :title="title"
        :mainBtnTxt="mainBtnTxt"
        :mainBtnDisabled="mainBtnDisabled"
        @close="close"
        @mainBtnClick="mainBtnClick"
        :size="'small'"
      >
        <div slot="content">
          <h3>自定义内容</h3>
        </div>
      </cl-dialog>
    </div>
  </div>
</template>
<script>
import { getData, getName, user } from "@/components/TestApp";

import test from "@/components/TestBpp";
import utils from "@/utils/common";
import ClDialog from "@/components/cl-dialog/ClDialog.vue";

export default {
  components: {
    ClDialog,
  },
  data() {
    return {
      user,
      data: [
        {
          id: 1,
          name: "一级 1",
          children: [
            {
              id: 11,
              name: "二级 1-1",
              children: [
                {
                  id: 111,
                  name: "三级 1-1-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 下拉框选中节点id与名称
      chooseName: "",
      fff: "李四",
      form: {
        name: "",
        path: "",
        pid: "0",
        type: "1",
        icon: "",
        status: "1",
      },
      //dialog
      dialogVisable: false,
      show: false, // 控制弹窗是否显示
      mainBtnDisabled: false, // 控制主按钮是否禁用
      title: "自定义title", // 弹窗标题
      mainBtnTxt: "自定义主按钮文字", // 主按钮文字
    };
  },
  mounted() {
    console.log(this.$appName, "全局变量");
    console.log(this.$appName1, "全局变量");
    this.getMessage();
    console.log(test.getGoods(), 11111111111111111111);
    test.setName(this.fff);
    console.log(test.setName(this.fff));
  },
  methods: {
    getMessage() {
      let a = getData();
      console.log(a);
      console.log(getName());
      console.log(user);
      let b = { ...user }; //用深拷贝或者JSON.parse()+JSON.stringify()可以解决{__ob__: Observer}
      console.log(b);
      //console.log(JSON.parse(JSON.stringify(b)));
      /*   console.log(ftg());
      console.log(wy); */
    },
    go() {
      //const a = Math.random() * 100;
      this.$router.push("/systemLibrary/userList/userInfo");
      //this.$router.push("/systemLibrary/explain/"+a);
    },
    handleNodeClick(data) {
      // 配置树形组件点击节点后，设置选择器的值，配置组件的数据
      this.chooseName = data.name;
      // 选择器执行完成后，使其失去焦点隐藏下拉框效果
      this.$refs.selectUpResId.blur();
      console.log(this.data);
    },
    // 选择器配置可以清空选项，用户点击清空按钮触发
    handleClear() {
      // 将选择器的值置空
      this.chooseName = "";
    },
    run() {
      this.$router.go(-1);
    },
    deleteMsg() {
      utils
        .deleteConfirm("Are you sure you want to delete the labelling rule?")
        .then(() => {
          // this.$api
          //   .deleteTermByTremGuid(trData.guid)
          //   .then((res) => {
          //     this.$message({
          //       type: "success",
          //       message: "Successful.",
          //     });
          //     this.ajaxTableList();
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        })
        .catch(() => {});
    },

    tipMsg() {
      utils
        .alertConfirm("Confirmation", "Are you sure you want to unsubscribe?")
        .then(() => {
          /* $api["orders"]("/unSubscributeAtlas", "put", "", item.id)
            .then(() => {
              $message({
                message: "Unsubscribe successfully",
                type: "success",
              });
              pageObj.pageNo = 1;
              pageObj.pageSize = 10;
              getAtlasSubscription();
            })
            .catch((error) => {
              console.log(error);
            }); */
        });
    },

    confirmMsg() {
      utils
        .alertMessage("Delete Tip", "Published datasets cannot be deleted.")
        .then(() => {
          //
        })
        .catch(() => {});
    },

    //dialog
    openDialg() {
      console.log("我被点击了");
      this.show = true;
      this.dialogVisable = true;
    },
    close() {
      this.show = false;
      this.dialogVisable = false;
    },
    mainBtnClick() {
      // 弹窗按钮确定点击事件
      console.log("确定");
      this.mainBtnDisabled = true;
      setTimeout(() => {
        this.mainBtnDisabled = false;
        this.close();
      }, 1000);
    },
  },
};
</script>
