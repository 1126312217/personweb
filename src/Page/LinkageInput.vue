<template>
  <div>
    <el-input v-model="ftg" placeholder=""></el-input>
  </div>
</template>
<script>
import mixin from './list.js' // 引入
export default {
  name: 'mixins-demo',
  mixins: [mixin], // 使用mixins
  data () {
    return {
      ftg: '1111',
       pageParam: {
        pageNum: 1, // 页码
        pageSize: 20, // 页长
        total: 100 ,// 总记录数数  //以当前组件数据为准混入
        ftg:"1111"
      },
    }
  },
  methods: {
    // 加载列表
    getList () {
      const params = { ...this.searchForm, ...this.pageParam }
      console.log(params)
    },
  },
  created() {
    console.log(this.pageParam,"minxin的数据啊")
  }
}
</script>
