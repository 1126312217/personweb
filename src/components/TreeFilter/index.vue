<template>
  <div class="card filter">
    <h4 v-if="title" class="title sle">
      {{ title }}
    </h4>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
    <el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
      <el-tree
        ref="treeRef"
        default-expand-all
        :node-key="id"
        :data="multiple ? treeData : treeAllData"
        :show-checkbox="multiple"
        :check-strictly="false"
        :current-node-key="!multiple ? selected : ''"
        :highlight-current="!multiple"
        :expand-on-click-node="false"
        :check-on-click-node="multiple"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="multiple ? selected : []"
        @node-click="handleNodeClick"
        @check="handleCheckChange"
      >
        <template #default="scope">
          <span class="el-tree-node__label">
            <slot :row="scope">
              {{ scope.node.label }}
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts" name="TreeFilter">
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string; // treeFilter 标题 ==> 非必传
  id?: string; // 选择的id ==> 非必传，默认为 “id”
  label?: string; // 显示的label ==> 非必传，默认为 “label”
  multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: "id",
  label: "label",
  multiple: false
});

const defaultProps = {
  children: "children",
  label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
  else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
  setSelected();
  if (props.requestApi) {
    const { data } = await props.requestApi!();
    treeData.value = data;
    console.log(treeData.value);
    treeData.value = [
      {
        id: "1",
        name: "华东分部",
        children: [
          {
            id: "11",
            name: "研发部"
          },
          {
            id: "12",
            name: "市场部",
            children: [
              {
                id: "12-1",
                name: "研发部1"
              },
              {
                id: "12-2",
                name: "研发部2"
              }
            ]
          },
          {
            id: "13",
            name: "商务部"
          },
          {
            id: "14",
            name: "财务部"
          }
        ]
      },
      {
        id: "2",
        name: "华南分部",
        children: [
          {
            id: "21",
            name: "研发部"
          },
          {
            id: "22",
            name: "市场部"
          },
          {
            id: "23",
            name: "商务部"
          },
          {
            id: "24",
            name: "财务部"
          }
        ]
      },
      {
        id: "3",
        name: "西北分部",
        children: [
          {
            id: "31",
            name: "研发部"
          },
          {
            id: "32",
            name: "市场部"
          },
          {
            id: "33",
            name: "商务部"
          },
          {
            id: "34",
            name: "财务部"
          }
        ]
      }
    ];
    treeAllData.value = [{ id: "", [props.label]: "全部" }, ...treeData.value];
  }
});

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true }
);

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      treeData.value = props.data;
      treeAllData.value = [{ id: "", [props.label]: "全部" }, ...props.data];
    }
  },
  { deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
  treeRef.value!.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true;
  let parentNode = node.parent,
    labels = [node.label],
    level = 1;
  while (level < node.level) {
    labels = [...labels, parentNode.label];
    parentNode = parentNode.parent;
    level++;
  }
  return labels.some(label => label.indexOf(value) !== -1);
};

// emit
const emit = defineEmits<{
  change: [value: any];
}>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return;
  emit("change", data[props.id]);
};

// 多选
const handleCheckChange = () => {
  emit("change", treeRef.value?.getCheckedKeys());
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style lang="scss">
@import "./index.scss";

.card.filter {
  // 设置整体样式
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 16px;
  background-color: #f9f9f9;
}

.title.sle {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.el-tree-node__label {
  // 树节点样式
  font-size: 14px;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.el-tree-node__label:hover {
  // 鼠标悬停效果
  background-color: #e6f7ff;
}

.el-tree {
  // 树的整体样式
  margin-top: 10px;
}
</style>
