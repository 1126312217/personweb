<template>
  <div class="page-box">
    <el-tabs v-model="activeName" @tab-click="handleClickTab">
      <el-tab-pane label="云运营" name="first"></el-tab-pane>
      <el-tab-pane label="云运维" name="second"></el-tab-pane>
      <el-tab-pane label="云原生" name="third"></el-tab-pane>
      <el-tab-pane label="公共服务" name="fourth"></el-tab-pane>
    </el-tabs>
    <div class="ly-content">
      <div class="role-name">
        <div class="name-left">主体名称</div>
        <div class="name-right">{{ tenantName }}</div>
      </div>
      <div class="role-menu">
        <div class="menu-left">选择菜单</div>
        <div class="menu-right">
          <div class="menu-right-top">
            <span class="title" v-for="(item, index) in menuArr" :key="index">
              <span
                class="title-name"
                @click="handleAcitve(index, item.menuCode)"
                :class="menuIndex == index ? 'titleActive' : ''"
                >{{ item.menuName }}</span
              >
              <span
                class="btn"
                :class="{ btnActive: item.selected }"
                @click="handleClick(item)"
                >全选</span
              >
            </span>
          </div>
          <div class="menu-right-bottom">
            <el-tree
              :data="treeData"
              :props="defaultProps"
              node-key="id"
              :default-expand-all="true"
              :expand-on-click-node="false"
              :render-content="renderContent"
            ></el-tree>
          </div>
        </div>
      </div>
      <div class="ly-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//import mgrApi from "@/api/mgrApi";
import utils from "@/utils/utils";

export default {
  name: "role-permissions",
  data() {
    return {
      tenantName: "运维管理员", //主体名称
      activeName: "first",
      tabIndex: "0",
      tenantId: "",
      systemCode: "cap", //区分cap,cbp,cmp,common
      status: "",
      unselect: true,
      menuIndex: 0,
      menuArr: [],
      treeData: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      diyTitle: "",
    };
  },
  created() {
    // this.tenantName = this.$route.params.tenantName;
    // this.tenantId = parseInt(this.$route.params.tenantId);
    this.getTreeData();
  },
  methods: {
    menuAllChecked(menu) {
      return menu.selected;
    },
    handleClickTab(tab) {
      this.tabIndex = tab.index;
      if (this.tabIndex == 0) {
        this.systemCode = "cbp";
      } else if (this.tabIndex == 1) {
        this.systemCode = "cmp";
      } else if (this.tabIndex == 2) {
        this.systemCode = "cap";
      } else {
        this.systemCode = "common";
      }
      this.getTreeData();
    },
    //一级菜单激活
    handleClick(menu) {
      let tree = null;
      this.menuArr.find((item) => {
        if (item.menuCode == menu.menuCode) {
          tree = item;
        }
      });
      if (tree.selected == true) {
        this.unselectChildrenRecursive(tree);
      } else {
        this.allChildrenRecursive(tree);
      }
      this.editTree();
      let arr = utils.cloneDeep(this.menuArr);
      this.menuArr = [];
      this.menuArr = arr;
      this.treeData = this.menuArr[this.menuIndex].children;
    },
    //遍历tree，把所有menuPermissionList里的每一项的selected置为true
    allChildrenRecursive(tree) {
      let that = this;
      if (tree.menuPermissionList) {
        tree.menuPermissionList.forEach(function (item) {
          item.selected = true;
        });
      }
      if (tree.children) {
        tree.children.forEach(function (item) {
          that.allChildrenRecursive(item);
        });
      }
    },
    unselectChildrenRecursive(tree) {
      let that = this;
      if (tree.menuPermissionList) {
        tree.menuPermissionList.forEach(function (item) {
          item.selected = false;
        });
      }
      if (tree.children) {
        tree.children.forEach(function (item) {
          that.unselectChildrenRecursive(item);
        });
      }
    },

    //遍历菜单树，如果下面子集的selected都为true，则最外层的selected置为true
    editTree() {
      for (let i = 0; i < this.menuArr.length; i++) {
        if (this.menuArr[i].children.length > 0) {
          for (let j = 0; j < this.menuArr[i].children.length; j++) {
            if (this.menuArr[i].children[j].menuPermissionList.length > 0) {
              let a = true;
              for (
                let k = 0;
                k < this.menuArr[i].children[j].menuPermissionList.length;
                k++
              ) {
                if (
                  this.menuArr[i].children[j].menuPermissionList[k].selected ==
                  false
                ) {
                  a = false;
                  break;
                }
              }
              this.menuArr[i].children[j].selected = a;
            }
          }
        }
      }
      //
      for (let val of this.menuArr) {
        //如果val.children的每一个对象的selected属性都为true,则给外层对象添加一个selected属性,并且将外层对象的selected属性设置为true
        if (val.children.length > 0) {
          let a = true;
          for (let i = 0; i < val.children.length; i++) {
            if (val.children[i].selected == false) {
              a = false;
              break;
            }
          }
          val.selected = a;
        }
      }
    },

    handleAcitve(index, menuCode) {
      this.menuIndex = index;
      this.treeData = this.menuArr.find((item) => {
        return menuCode == item.menuCode;
      }).children;
      this.systemCode = this.menuArr[index].appCode;
      this.diyTitle = this.menuArr[index].menuName;
    },
    renderContent(h, { node, data }) {
      const str = data.menuPermissionList.map((item) => (
        <span
          class={{ unselected: true, selected: item.selected }}
          on-click={() => this.handleselected(item)}
        >
          {item.operationScope}
        </span>
      ));
      return (
        <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{data.menuName}</span>
          </span>
          <span>
            <span
              class={{
                "is-all-unchecked": true,
                "is-all-checked": this.rowAllChecked(data),
              }}
              on-click={() => this.handleSelectRow(node, data)}
              style="margin: 0 5px;"
            >
              全选
            </span>
            {str}
          </span>
        </span>
      );
    },
    //点击操作
    handleselected(node) {
      node.selected = !node.selected;
      let arr = this.menuArr[this.menuIndex].children;
      let getParentList = [];
      //获取当前node父级数组
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].menuPermissionList.length; j++) {
          if (arr[i].menuPermissionList[j].id == node.id) {
            getParentList = arr[i].menuPermissionList;
          }
        }
      }
      if (getParentList[0].pid == 0) {
        //有一个选中就选中数组里的第一个
        if (getParentList.some((item) => item.selected)) {
          getParentList[0].selected = true;
        } else {
          getParentList[0].selected = false;
        }
      }
      this.editTree();
      let arr1 = utils.cloneDeep(this.menuArr);
      this.menuArr = [];
      this.menuArr = arr1;
      this.treeData = this.menuArr[this.menuIndex].children;
    },
    // 单项全选
    handleSelectRow(node, data) {
      let curAllFlag = true;
      for (let i = 0; i < data.menuPermissionList.length; i++) {
        let node = data.menuPermissionList[i];
        if (!node.selected) {
          curAllFlag = false;
        }
      }
      if (curAllFlag) {
        this.menuArr[this.menuIndex].selected = false;
      }
      for (let i = 0; i < data.menuPermissionList.length; i++) {
        let node = data.menuPermissionList[i];
        node.selected = !curAllFlag;
      }
      this.editTree();
      let arr = utils.cloneDeep(this.menuArr);
      this.menuArr = [];
      this.menuArr = arr;
      this.treeData = this.menuArr[this.menuIndex].children;
    },
    rowAllChecked(data) {
      let allFlag = true;
      if (data.menuPermissionList.length === 0) {
        return false;
      }
      for (let i = 0; i < data.menuPermissionList.length; i++) {
        if (!data.menuPermissionList[i].selected) {
          allFlag = false;
          break;
        }
      }
      return allFlag;
    },
    async getTreeData() {
      this.menuArr = [
        {
          appCode: "common",
          available: null,
          children: [
            {
              appCode: "common",
              available: null,
              children: [],
              id: 11,
              menuCode: "ZUZHI_GUANLI",
              menuName: "组织管理",
              menuPermissionList: [
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 10,
                  menuId: 11,
                  operationScope: "组织列表",
                  perCode: "commonIamOrgQueryTreeListApi",
                  perId: 10,
                  perName: "公共服务用户中心组织管理查询组织树组织直属下级列表",
                  pid: 0,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 13,
                  menuId: 11,
                  operationScope: "编辑",
                  perCode: "commonIamOrgModifyDetailApi",
                  perId: 13,
                  perName: "公共服务用户中心组织管理修改组织信息",
                  pid: 10,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 11,
                  menuId: 11,
                  operationScope: "删除",
                  perCode: "commonIamOrgDeleteDetailApi",
                  perId: 11,
                  perName: "公共服务用户中心组织管理删除组织信息",
                  pid: 10,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 12,
                  menuId: 11,
                  operationScope: "用户列表",
                  perCode: "commonIamOrgQueryUserListApi",
                  perId: 12,
                  perName: "公共服务用户中心组织管理查询组织下用户列表",
                  pid: 10,
                  selected: true,
                },
              ],
              menuType: 1,
              openType: null,
              pid: 10,
              sort: 1,
            },
            {
              appCode: "common",
              available: null,
              children: [],
              id: 12,
              menuCode: "YONGHU_GUANLI",
              menuName: "用户管理",
              menuPermissionList: [
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 20,
                  menuId: 12,
                  operationScope: "用户列表",
                  perCode: "commonIamUserQueryOrgTreeListApi",
                  perId: 20,
                  perName: "公共服务用户中心用户管理查询用户列表以及组织树",
                  pid: 0,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 26,
                  menuId: 12,
                  operationScope: "用户详情",
                  perCode: "commonIamUserQueryDetailApi",
                  perId: 26,
                  perName: "公共服务用户中心用户管理查询用户信息",
                  pid: 20,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 21,
                  menuId: 12,
                  operationScope: "重置密码",
                  perCode: "commonIamUserRenamePasswordApi",
                  perId: 21,
                  perName: "公共服务用户中心用户管理重置用户密码",
                  pid: 20,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 22,
                  menuId: 12,
                  operationScope: "编辑",
                  perCode: "commonIamUserModifyDetailApi",
                  perId: 22,
                  perName: "公共服务用户中心用户管理编辑用户信息",
                  pid: 20,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 23,
                  menuId: 12,
                  operationScope: "删除",
                  perCode: "commonIamUserDeleteDetailApi",
                  perId: 23,
                  perName: "公共服务用户中心用户管理删除用户信息",
                  pid: 20,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 25,
                  menuId: 12,
                  operationScope: "关联角色",
                  perCode: "commonIamUserModifyUserRoleApi",
                  perId: 25,
                  perName: "公共服务用户中心用户管理用户批量分配取消角色",
                  pid: 20,
                  selected: true,
                },
              ],
              menuType: 1,
              openType: null,
              pid: 10,
              sort: 2,
            },
            {
              appCode: "common",
              available: null,
              children: [],
              id: 13,
              menuCode: "JUESE_GUANLI",
              menuName: "角色管理",
              menuPermissionList: [
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 40,
                  menuId: 13,
                  operationScope: "角色列表",
                  perCode: "commonIamRoleQueryRoleListApi",
                  perId: 40,
                  perName: "公共服务用户中心角色管理查询角色列表",
                  pid: 0,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 43,
                  menuId: 13,
                  operationScope: "编辑",
                  perCode: "commonIamRoleModifyDetailApi",
                  perId: 43,
                  perName: "公共服务用户中心角色管理查询编辑角色",
                  pid: 40,
                  selected: true,
                },
                {
                  appCode: "common",
                  available: 0,
                  hidden: 1,
                  id: 42,
                  menuId: 13,
                  operationScope: "关联用户",
                  perCode: "commonIamRoleModifyUserRelApi",
                  perId: 42,
                  perName: "公共服务用户中心角色管理角色下批量分配取消用户",
                  pid: 40,
                  selected: true,
                },
              ],
              menuType: 1,
              openType: null,
              pid: 10,
              sort: 3,
            },
          ],
          id: 10,
          menuCode: "QUANXIAN_GUANLI",
          menuName: "权限管理",
          menuPermissionList: [],
          menuType: 0,
          openType: null,
          pid: 0,
          sort: 1,
        },
        {
          appCode: "common",
          available: null,
          children: [],
          id: 30,
          menuCode: "COMMON_IAM_TENANT_MANAGER",
          menuName: "租户管理",
          menuPermissionList: [
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 30,
              menuId: 30,
              operationScope: "租户列表",
              perCode: "commonIamTenantQueryTenantListApi",
              perId: 30,
              perName: "公共服务用户中心租户管理查询租户列表",
              pid: 0,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 35,
              menuId: 30,
              operationScope: "编辑",
              perCode: "commonIamTenantModifyDetailApi",
              perId: 35,
              perName: "公共服务用户中心租户管理修改租户详情",
              pid: 30,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 31,
              menuId: 30,
              operationScope: "权限设置",
              perCode: "commonIamTenantModifyPermissionApi",
              perId: 31,
              perName: "公共服务用户中心租户管理批量分配取消租户权限",
              pid: 30,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 33,
              menuId: 30,
              operationScope: "启用/禁用",
              perCode: "commonIamTenantModifyTenantStatusApi",
              perId: 33,
              perName: "公共服务用户中心租户管理修改租户状态",
              pid: 30,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 34,
              menuId: 30,
              operationScope: "租户详情",
              perCode: "commonIamTenantQueryDetailApi",
              perId: 34,
              perName: "公共服务用户中心租户管理查询租户详情",
              pid: 30,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 32,
              menuId: 30,
              operationScope: "权限列表",
              perCode: "commonIamTenantQueryPermissionListApi",
              perId: 32,
              perName: "公共服务用户中心租户管理查询指定租户下权限列表",
              pid: 30,
              selected: true,
            },
          ],
          menuType: 0,
          openType: null,
          pid: 0,
          sort: 2,
        },
        {
          appCode: "common",
          available: null,
          children: [],
          id: 60,
          menuCode: "COMMON_IAM_ACCOUNT_SECURITY",
          menuName: "账号安全管理",
          menuPermissionList: [
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 60,
              menuId: 60,
              operationScope: "修改密码策略",
              perCode: "commonIamSetModifyPasswordPolicyApi",
              perId: 60,
              perName: "公共服务用户中心账号安全管理修改密码策略",
              pid: 0,
              selected: true,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 61,
              menuId: 60,
              operationScope: "修改会话时长",
              perCode: "commonIamSetModifySessionDurationApi",
              perId: 61,
              perName: "公共服务用户中心账号安全管理修改会话时长",
              pid: 0,
              selected: false,
            },
            {
              appCode: "common",
              available: 0,
              hidden: 1,
              id: 62,
              menuId: 60,
              operationScope: "修改登录设置",
              perCode: "commonIamSetModifyLoginSecurityApi",
              perId: 62,
              perName: "公共服务用户中心账号安全管理修改登录安全设置",
              pid: 0,
              selected: true,
            },
          ],
          menuType: 0,
          openType: null,
          pid: 0,
          sort: 3,
        },
      ];
      for (let i of this.menuArr) {
        if (i.children.length == 0 && i.menuPermissionList.length > 0) {
          i.children = [];
          let obj = {};
          obj.menuPermissionList = i.menuPermissionList;
          i.children.push(obj);
          i.children[0].appCode = i.appCode;
          i.children[0].menuCode = i.menuCode;
          i.children[0].menuName = i.menuName;
          i.children[0].menuType = i.menuType;
          i.children[0].openType = i.openType;
          i.children[0].pid = i.pid;
          i.children[0].sort = i.sort;
          i.menuPermissionList = [];
        }
      }
      this.editTree();
      //第一次进入页面显示第一个菜单的子菜单
      this.treeData = this.menuArr[this.menuIndex].children;
      this.systemCode = this.menuArr[0].appCode || ""; //判断是那个端的菜单
      //   .getMenuTree({ appCode: this.systemCode, tenantId: this.tenantId })
      //   .then((res) => {
      //     this.menuArr = []; //先置空以防另一个系统的菜单数据覆盖
      //     if (res.length > 0) {
      //       for (let i of res) {
      //         if (i.children.length == 0 && i.menuPermissionList.length > 0) {
      //           i.children = [];
      //           let obj = {};
      //           obj.menuPermissionList = i.menuPermissionList;
      //           i.children.push(obj);
      //           i.children[0].appCode = i.appCode;
      //           i.children[0].menuCode = i.menuCode;
      //           i.children[0].menuName = i.menuName;
      //           i.children[0].menuType = i.menuType;
      //           i.children[0].openType = i.openType;
      //           i.children[0].pid = i.pid;
      //           i.children[0].sort = i.sort;
      //           i.menuPermissionList = [];
      //         }
      //       }

      //       this.menuArr = res;
      //       this.editTree();
      //       //第一次进入页面显示第一个菜单的子菜单
      //       this.treeData = this.menuArr[this.menuIndex].children;
      //       this.systemCode = this.menuArr[0].appCode || ""; //判断是那个端的菜单
      //     } else {
      //       this.treeData = [];
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    myTreeData() {},
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      // const perList = [];
      // (this.menuArr || []).forEach((menu) => {
      //   (menu.children || []).forEach((cMenu) => {
      //     (cMenu.menuPermissionList || []).forEach((per) => {
      //       if (per.selected) {
      //         perList.push(per.perId);
      //       }
      //     });
      //   });
      // });
      // mgrApi
      //   .saveMenuTree({
      //     appCode: this.systemCode,
      //     perList,
      //     tenantId: this.tenantId,
      //   })
      //   .then((res) => {
      //     if (res === true) {
      //       this.$message.success("保存成功");
      //     }
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.ly-content {
  .role-name {
    display: flex;
    .name-left {
      color: #6d7383;
      margin-right: 20px;
    }
    .name-right {
      color: #212a40;
    }
  }
  .role-menu {
    display: flex;
    .menu-left {
      color: #6d7383;
      padding-top: 20px;
      margin-right: 20px;
    }
    .menu-right {
      width: 94%;
      .menu-right-top {
        display: flex;
        flex-wrap: wrap;
        padding-top: 16px;
        border-bottom: 1px solid #dbdeea;
        .title {
          margin-right: 36px;
          margin-bottom: 10px;
          display: inline-block;
          height: 30px;
          .title-name {
            color: #212a40;
            margin-right: 8px;
            display: inline-block;
            height: 26px;
            font-size: 12px;
            cursor: pointer;
          }
          .titleActive {
            border-bottom: 3px solid #3369ff;
            color: #212a40;
            font-weight: bold;
          }
          .btn {
            display: inline-block;
            width: 38px;
            height: 18px;
            line-height: 18px;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            border: 1px solid #dbdeea;
            background: #ffffff;
            color: #212a40;
          }
          .btnActive {
            border: 1px solid #3369ff;
            background: #3369ff;
            color: #ffffff;
          }
        }
      }
      .menu-right-bottom {
        /deep/ .el-tree > div > div:nth-child(1) {
          background: rgba(244, 247, 252, 1);
          font-weight: bold;
        }
        /deep/ .el-tree-node__content {
          height: 44px;
          border-bottom: 1px solid #dbdeea;
        }
        // /deep/ .el-tree-node__expand-icon {
        //   color: #606266;
        // }
        /deep/ .el-tree .unselected,
        /deep/ .el-tree .is-all-unchecked {
          font-size: 12px;
          display: inline-block;
          padding: 0 5px;
          height: 18px;
          line-height: 18px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
          margin-left: 4px;
          border: 1px solid #dbdeea;
          background: #ffffff;
          color: #212a40;
        }
        /deep/ .el-tree .selected,
        /deep/ .el-tree .is-all-checked {
          border: 1px solid #3369ff;
          background: #3369ff;
          color: #ffffff;
        }
      }
    }
  }
  .role-data {
    display: flex;
    margin: 30px 0 50px 0;
    position: relative;
    .name-left {
      color: #6d7383;
      margin-right: 20px;
      line-height: 23px;
    }
    .name-right {
      color: #212a40;
    }
  }
  .ly-footer {
    text-align: center;
    margin-top: 40px;
    .el-button:nth-child(1) {
      margin-right: 40px;
    }
  }
}
</style>
