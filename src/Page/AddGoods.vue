<template>
  <div>
    添加商品
    <el-form v-model="userForm"  ref="userForm">
      <el-form-item label="企业组织" v-model="userForm.orgIdList">
        <el-select
          v-model="userForm.orgIdList"
          placeholder="请选择企业组织"
          multiple
          clearable
          collapse-tags
          @change="selectChange"
        >
          <el-option :value="currentName" style="height: auto">
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              ref="myTree"
              highlight-current
              :props="defaultProps"
              @check-change="handleCheckChange"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userForm: {
        orgIdList: "",
      },
      currentName: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //select框值改变时候触发的事件
    selectChange(e) {
      var arrNew = [];
      var dataLength = this.currentName.length;
      var eleng = e.length;
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.currentName[i].label) {
            arrNew.push(this.currentName[i]);
          }
        }
      }
      this.$refs.myTree.setCheckedNodes(arrNew); //设置勾选的值
      console.log(arrNew, e);
    },
    handleCheckChange() {
      let res = this.$refs.myTree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      res.forEach((item) => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.currentName = arr;
      this.userForm.orgIdList = arrLabel;
      console.log("arr:" + JSON.stringify(arr));
      console.log("arrLabel:" + arrLabel);
    },
    submit() {
      console.log(this.userForm)
    },
  },
};
</script>
>
