<template>
  <el-select
    ref="elSelect"
    :clearable="clearable"
    :value="selectData.label"
    :disabled="disabled"
    :placeholder="placeholder"
    popper-class="popper-box"
    @clear="clearHandle"
  >
    <el-option style="display: none" value="0" />
    <div v-show="showSearch" class="filter-input" @click.stop>
      <el-input
        v-model.trim="filterText"
        clearable
        size="small"
        placeholder="输入关键字进行过滤"
      />
    </div>
    <el-tree
      ref="selectTree"
      :show-checkbox="multiple"
      :accordion="accordion"
      :check-strictly="checkStrictly"
      :data="dic"
      :lazy="lazy"
      :load="load || treeLoad"
      :props="defaultProps"
      :node-key="defaultProps.value"
      :default-expanded-keys="expandKeys"
      :default-checked-keys="defaultCheckNodes"
      :filter-node-method="filterNode"
      @check="checkHandle"
      @node-click="nodeClickHandle"
    />
  </el-select>
</template>

<script>
export default {
  name: 'ElTreeSelect',
  props: {
    dataCode: {
      type: String,
      default: ''
    },
    dic: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return []
      }
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    // 选项分隔符
    separator: {
      type: String,
      default: ' | '
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否显示多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },
    // 父子不关联
    checkStrictly: {
      type: Boolean,
      default: true
    },
    lazy: {
      type: Boolean,
      default: false
    },
    load: {
      type: Function,
      default: () => {}
    },
    accordion: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => {
        return {
          value: 'value', // ID字段名
          label: 'label', // 显示名称
          children: 'children' // 子级字段名
        }
      }
    },

    value: {
      type: [Number, String, Array],
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    defaultCheckNodes: {
      type: Array, // 已经分配的资源
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      filterText: '',
      selectData: {
        label: '', // 显示文本
        value: this.value, // 初始值
        node: '' // 选中的节点数据
      }
    }
  },
  computed: {
    expandKeys() {
      return Array.isArray(this.value) ? [...this.value] : [this.value]
    },
    defaultProps() {
      if (this.props) {
        const { children, label, value } = this.props
        return {
          children: children || 'children',
          label: label || 'label',
          value: value || 'value'
        }
      }
      return {
        children: 'children',
        label: 'label',
        value: 'value'
      }
    }
  },
  watch: {
    // 关闭弹框清除搜索
    show: {
      handler(n) {
        if (!n) {
          this.filterText = ''
        }
      }
    },
    dic(n) {
      this._setTreeStatus(this.value)
      const selectData = []
      // 获取选中的节点数据
      this._getSelectData(n, selectData)
      this._setLabel(selectData)
    },
    value: {
      handler(n) {
        if (n != this.selectData.value) {
          this.selectData.value = n
          this._initData(n)
        }
      }
    },
    filterText(val) {
      this.$refs.selectTree.filter(val)
    }
  },
  mounted() {
    this._initData(this.value)
  },
  methods: {
    treeLoad() {},
    // 初始化 回显状态和数据
    _initData(n) {
      this.$refs.selectTree.setCurrentKey(null)
      this.$refs.selectTree.setCheckedKeys([])
      this._setTreeStatus(n)
      const selectData = []
      // 获取选中的节点数据
      this._getSelectData(this.dic, selectData)
      this._setLabel(selectData)
    },
    // 根据父id和子id 生成唯一标识 用于id不唯一的数据
    _createUniqueKeyData(arr, parentKeyList = []) {
      const { value, children } = this.defaultProps
      arr.map((item) => {
        item._uniqueKey =
          parentKeyList.join(',') +
          (parentKeyList.length ? `,${item[value]}` : item[value])
        if (item[children] && item[children].length) {
          this._createUniqueKeyData(
            item[children],
            parentKeyList.concat(item[value])
          )
        }
      })
    },
    // 查找已选数据 用于回显label字段
    _getSelectData(data, selectData) {
      const key = this.defaultProps.value
      data.forEach((item) => {
        const isMultipleValue =
          Array.isArray(this.value) && this.value.includes(item[key])
        if (this.value == item[key] || isMultipleValue) {
          selectData.push(item)
        }
        if (item.children && item.children.length) {
          this._getSelectData(item.children, selectData)
        }
      })
    },
    // 设置回显文字
    _setLabel(data) {
      if (data && data.length && this.multiple) {
        this.selectData.label = data
          .map((item) => item[this.defaultProps.label])
          .join(this.separator)
      } else if (data.length && !this.multiple) {
        this.selectData.label = data[0][this.defaultProps.label]
      } else {
        this.selectData.label = ''
      }
    },
    _setTreeStatus(val) {
      this.$nextTick(() => {
        if (!val || (Array.isArray(val) && !val.length)) {
          this.$refs.selectTree.setCurrentKey(null)
          this.$refs.selectTree.setCheckedKeys([])
        } else if (val && !Array.isArray(val)) {
          this.$refs.selectTree.setCurrentKey(val)
        } else if (Array.isArray(val) && val.length) {
          this.$refs.selectTree.setCheckedKeys([...val])
        }
      })
    },
    // 筛选搜索
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    // 抛出input事件改变父组件绑定值
    modelChange() {
      this.$emit('input', this.selectData.value)
      this.$emit('change', this.selectData.value, this.selectData.node, this.dataCode)
    },
    // 复选框选中
    checkHandle(data, checked) {
      this._setLabel(checked.checkedNodes)
      this.selectData.value = checked.checkedKeys
      this.selectData.node = checked.checkedNodes
      this.modelChange()
      this.$emit('check', data, checked)
    },
    // 点击选中
    nodeClickHandle(data) {
      if (!this.multiple) {
        this.selectData.label = data[this.defaultProps.label]
        this.selectData.value = data[this.defaultProps.value]
        this.selectData.node = data
        this.$refs.elSelect.blur()
        this.modelChange()
        this.$emit('node-click', data)
      }
    },
    // 清除选中
    clearHandle() {
      this.selectData.label = ''
      this.selectData.node = null
      this.selectData.value = ''
      this.$refs.selectTree.setCurrentKey(null)
      if (this.multiple) {
        this.$refs.selectTree.setCheckedKeys([])
      }
      this.modelChange()
    }
  }
}
</script>



