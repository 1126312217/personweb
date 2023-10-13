<template>
  <div id="box1">
    <p>用户分布</p>
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
            @change="handleStatusChange(scope.row)"
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
    <p style="height: 500px; background: pink"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: true,
      close: false,
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
    };
  },
  methods: {
    handleStatusChange(row) {
      console.log(row);
      row.status = row.status === "0" ? "1" : "0";
    },
    handleClick(row) {
      this.$router.push({
        path: "/userList",
        query: {
          msg: row,
        },
      });
    },
  },
};
</script>
<style scoped>
#box1 {
  overflow-y: auto;
  height: calc(100vh - 160px);
  /* 因为在SystemLibrary.vue里给每个页面上面加了导航路径显示，所以高度会有变化，这里就得做出相应的改变，不然就会出现两个滚动条 */
  /* 这种情况滚动条在里面，可以与说明页面对比看一下区别；如果想要滚动条在外面，直接注释掉这行代码就可以了。 */
  background: #fff;
  padding: 20px;
}
</style>
