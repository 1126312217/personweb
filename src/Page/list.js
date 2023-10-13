const list = {
  data () {
    return {
      loading: false,
      pageParam: {
        pageNum: 1, // 页码
        pageSize: 20, // 页长
        total: 0 // 总记录数数
      },
      pageSizes: [10, 20, 30, 50], // 页长数
      pageLayout: 'total, sizes, prev, pager, next, jumper', // 分页布局
      pageCount: 5, // 页码按钮的数量，当总页数超过该值时会折叠(大于等于 5 且小于等于 21 的奇数)
      list: []
    }
  },
  
}
export default list