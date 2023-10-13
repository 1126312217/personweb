<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :page-sizes="optionalData"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 20,
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    optionalData: {
      type: Array,
      default: () => [10, 30 , 50 , 100],
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  mounted() {
    //在class名为el-pagination__total的标签后面添加一个span标签，内容为每页
    const total = document.querySelector(".pagination-container .el-pagination__total");
    const span = document.createElement("span");
    //给span标签添加class名
    span.className = "el-pagination__setSpan";
    span.innerHTML = "每页";
    total.appendChild(span);
    //在class名为el-pagination__sizes的标签后面添加一个span标签，内容为条
    const sizes = document.querySelector(".pagination-container .el-pagination__sizes");
    const span2 = document.createElement("span");
    //给span标签添加class名
    span2.className = "el-pagination__setSpan2";
    span2.innerHTML = "条";
    sizes.appendChild(span2);
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 2px 0;
}
.pagination-container {
  padding: 8px 0px;
  text-align: right;
  ::v-deep .el-pagination.is-background .el-pager li {
    background-color: transparent;
    min-width: 28px;
    color: #212A40;
  }
  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #3369ff;
    border-radius: 50%;
    color: #fff;
    transform: scale(0.8);
  }
  ::v-deep .el-pagination.is-background .btn-prev {
    background-color: transparent;
  }
  ::v-deep .el-pagination.is-background .btn-next {
    background-color: transparent;
  }
  ::v-deep .el-pagination .el-select .el-input {
    width: 50px;//每页X条下拉框的宽度
  }
  ::v-deep .el-input--mini .el-input__inner {
    color: #212A40;
  }
  ::v-deep .el-pagination__editor.el-input {
    width: 40px;//前往XX页的输入框宽度
  }
  ::v-deep .el-pagination__jump .el-input__inner{
    color: #212A40;
  }
  ::v-deep .el-pagination__setSpan {
    margin-left: 20px;
    margin-right: -8px;
    color: #212A40;
  }
  ::v-deep .el-pagination__setSpan2 {
    margin-left: -8px;
    margin-right: 2px;
    color: #212A40;
  }
  ::v-deep .el-pagination__jump {
    margin-left: 10px;
    color: #212A40;
  }
  ::v-deep .el-pagination span:not([class*="suffix"]) {
    color: #212A40;
  }
}
</style>
