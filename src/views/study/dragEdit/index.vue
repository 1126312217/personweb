<template>
  <div>
    <div class="card mb10">
      <div class="create_kqjgtz_modal">
        <div class="kqjgtz">
          <div class="title">通知发送设置</div>
          <div class="kqjgtz-item">
            <div class="kqjgtz-item-label"><span class="required">*</span>触发条件</div>
            <el-radio-group v-model="formState.triggerType" class="kqjgtz-item-content">
              <el-radio label="1" size="large">同一教学班学生考勤全部录完成后发送考勤情况</el-radio>
              <el-radio label="2" size="large">上课时间结束后发送教学班学生考勤情况</el-radio>
            </el-radio-group>
          </div>
          <div class="kqjgtz-item">
            <div class="kqjgtz-item-labelZt"><span class="required">*</span>接收通知对象</div>
            <el-checkbox-group v-model="formState.noticeTarget" class="kqjgtz-item-content">
              <el-checkbox v-for="item in sendRole" :label="item.dictcode" :key="item.dictcode">{{ item.dictname }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="kqjgtz-item" style="align-items: center">
            <div class="kqjgtz-item-labelZt flex-a-i" style="line-height: 23px">
              <span class="required">*</span> 发送选中考勤状态对应的学生名单
            </div>
            <el-checkbox-group v-model="formState.yxbkkqzt" class="kqjgtz-item-content">
              <el-checkbox v-for="item in cqqkList" :label="item.dictcode" :key="item.dictcode">{{ item.dictname }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <el-divider :style="{ borderColor: '#F2F2F2' }" />
          <div class="title">通知内容设置</div>
          <div class="kqjgtz-set">
            <div style="font-weight: 600; line-height: 40px"><span class="required">*</span>通知标题</div>
            <el-input v-model="formState.tzTitle" placeholder="请输入" />
          </div>
          <div class="kqjgtz-set">
            <div style="font-weight: 600; line-height: 40px">通知内容</div>
            <div style="font-size: 12px; color: #7e828c">将可选字段区拖动到文案框内，也可自定义输入文案，组成所需通知</div>
          </div>

          <div class="kqjgtz-item">
            <div class="kqjgtz-item-labelKxzd">可选字段</div>
            <div class="box kqjgtz-item-boxKxzd" ref="kxzdBox">
              <div
                v-for="item in kxzdList"
                :key="item.id"
                class="item tzField"
                :id="item.id"
                draggable="true"
                @dragstart="drag($event, item.id)"
              >
                <span class="zdText"> {{ item.content }}</span>
                <span v-if="item.showRemoveBtn" class="remove-btn" @click="removeItem(item)">&times;</span>
              </div>
            </div>
          </div>
          <div class="kqjgtz-item">
            <div class="kqjgtz-item-labelKxzd"><span class="required">*</span>通知文案</div>
            <div
              class="editable"
              contenteditable="true"
              @dragover="allowDrop"
              @drop="drop"
              @keydown="handleKeydown"
              @focus="focusEditable"
            ></div>
          </div>
        </div>
        <div class="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="confirm" type="primary">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="dragEdit">
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
// import { getkqTzTemplate, saveKqTzTemplate } from "../apis/index";

const kxzdBox = ref(null);
const sendRole = ref([
  {
    dictcode: "1",
    dictname: "学生"
  },
  {
    dictcode: "2",
    dictname: "班主任"
  },
  {
    dictcode: "3",
    dictname: "辅导员"
  },
  {
    dictcode: "4",
    dictname: "任课教师"
  }
]);
const cqqkList = ref([
  {
    dictname: "正常",
    dictcode: "1"
  },
  {
    dictname: "迟到",
    dictcode: "2"
  },
  {
    dictname: "病假",
    dictcode: "3"
  },
  {
    dictname: "旷课",
    dictcode: "4"
  },
  {
    dictname: "缺勤",
    dictcode: "5"
  },
  {
    dictname: "事假",
    dictcode: "6"
  },
  {
    dictname: "集训",
    dictcode: "7"
  },
  {
    dictname: "公假",
    dictcode: "8"
  }
]);
const kxzdList = ref([
  { id: "recepXm", content: "接收人姓名", showRemoveBtn: false },
  { id: "xzbmc", content: "班级名称", showRemoveBtn: false },
  { id: "xsxm", content: "学生姓名", showRemoveBtn: false },
  { id: "kcrq", content: "课程日期", showRemoveBtn: false },
  { id: "kcxq", content: "课程星期", showRemoveBtn: false },
  { id: "kcjc", content: "课程节次", showRemoveBtn: false },
  { id: "kcsj", content: "课程时间", showRemoveBtn: false },
  { id: "rkjs", content: "任课教师", showRemoveBtn: false },
  { id: "kcmc", content: "课程名称", showRemoveBtn: false }
]);
const formState = reactive({
  triggerType: "1",
  noticeTarget: [],
  yxbkkqzt: [],
  tzTitle: ""
});
const originalParent = ref(null);
const fromEditable = ref(false);

onMounted(() => {
  getTemplateData();
});

const paramsContent = tzContent => {
  const editable = document.querySelector(".editable");
  // 使用正则表达式匹配 ${} 里面的值
  let regex = /\$\{(\w+)\}/g;
  // 替换模板变量为实际的变量值
  let replacedString = tzContent.replace(regex, function (match, p1) {
    // p1 是匹配到的变量名
    let value = eval(p1);
    kxzdBox.value.removeChild(value);
    return value.outerHTML; // 使用 eval 来获取变量的值
  });
  console.log(replacedString + "", "replacedString");
  editable.innerHTML = replacedString;
  let tzFields = document.querySelectorAll(".editable .tzField");
  console.log(tzFields);
  tzFields.forEach(function (element) {
    element.setAttribute("contenteditable", "false");
    // const spaceNode = document.createTextNode("\u00A0");
    // element.parentNode.insertBefore(spaceNode, element.nextSibling);
    const itemElement = document.getElementById(element.id);
    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.style.cursor = "pointer";
    removeBtn.onclick = () => {
      kxzdBox.value.appendChild(itemElement); // 添加回box
      itemElement.removeChild(removeBtn);
    };
    removeBtn.addEventListener("mouseenter", () => {
      removeBtn.style.color = "#2B67FF";
    });
    removeBtn.addEventListener("mouseleave", () => {
      removeBtn.style.color = "#A1A6B2"; // 或者设置为一个具体的颜色值
    });
    element.appendChild(removeBtn);
    element.addEventListener("dragstart", function (event) {
      drag(event, element.id);
    });
  });
};

const getTemplateData = async () => {
  // const res = await getkqTzTemplate()
  // 模拟的接口返回数据
  let res = {
    ret: 0,
    msg: "操作成功",
    data: {
      triggerType: "1",
      kqfw: "6,2,3,4,5",
      noticeTarget: "2,3",
      tzContent:
        "你好${recepXm}，在${kcxq}&nbsp;${kcsj}&nbsp;的${kcmc}&nbsp;&nbsp;在&nbsp;${rkjs}&nbsp;课上${kcjc}&nbsp;存在考勤异常&nbsp;信息，请及时查看。<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></div><div>学生姓名：${xsxm}&nbsp;&nbsp;&nbsp;&nbsp;</div><div>班级名称：${xzbmc}&nbsp;</div><div>课程日期：${kcrq}​</div>",
      tzTitle: "测试考勤通知发送"
    }
  };
  // 如果sessionStorage中有数据，则使用sessionStorage中的数据
  const kqTzTemplate = JSON.parse(sessionStorage.getItem("kqTzTemplate"));
  if (kqTzTemplate) {
    res.data = kqTzTemplate;
  }
  console.log(res, "res---详情数据");
  if (res.ret == 0) {
    formState.triggerType = res.data.triggerType;
    formState.noticeTarget = res.data.noticeTarget.split(/,\s*/);
    formState.yxbkkqzt = res.data.kqfw.split(/,\s*/);
    formState.tzTitle = res.data.tzTitle;
    paramsContent(res.data.tzContent);
  }
};

const drag = (event, id) => {
  const dragImage = event.target.cloneNode(true);
  dragImage.style.position = "absolute";
  dragImage.style.top = "-9999px"; // 确保它不在视图中
  dragImage.style.backgroundColor = window.getComputedStyle(event.target).backgroundColor; // 保持背景色一致
  dragImage.style.borderRadius = window.getComputedStyle(event.target).borderRadius; // 保持圆角
  document.body.appendChild(dragImage);
  event.dataTransfer.setDragImage(dragImage, 0, 0);
  event.dataTransfer.setData("text/plain", id);
  originalParent.value = event.target.parentNode;
  fromEditable.value = document.querySelector(".editable").contains(event.target);
};
const allowDrop = event => {
  event.preventDefault();
  event.stopPropagation();
  const range = getCaretRangeFromPoint(event.clientX, event.clientY);
  if (range) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
const drop = event => {
  event.preventDefault();
  event.stopPropagation();
  const id = event.dataTransfer.getData("text/plain");
  const item = kxzdList.value.find(i => i.id === id);
  if (!item) {
    return;
  }
  const itemElement = document.getElementById(id);
  // 移除原来的父元素
  if (originalParent.value.className === "box") {
    originalParent.value.removeChild(itemElement);
  }
  itemElement.setAttribute("contenteditable", "false");
  if (!itemElement.querySelector(".remove-btn")) {
    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.style.cursor = "pointer";
    removeBtn.onclick = () => {
      kxzdBox.value.appendChild(itemElement); // 添加回box
      itemElement.removeChild(removeBtn);
    };
    removeBtn.addEventListener("mouseenter", () => {
      removeBtn.style.color = "#2B67FF";
    });
    removeBtn.addEventListener("mouseleave", () => {
      removeBtn.style.color = "#A1A6B2"; // 或者设置为一个具体的颜色值
    });
    itemElement.appendChild(removeBtn);
  }

  const range = getCaretRangeFromPoint(event.clientX, event.clientY);
  // 打印要落下的地方的元素
  console.log(range, "range");
  // 打印拖拽過程中准备放下的位置的元素
  console.log(event.target, "event.target");
  console.log(event.target.className, "event.target.className");
  if (range && !event.target.classList.contains("zdText") && !event.target.classList.contains("remove-btn")) {
    // 检查 range 的起始容器是否是文本节点
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      console.log("range的起始容器是文本节点", range.startContainer);
      console.log("range的父节点是:", range.startContainer.parentNode);
      // 如果父节点的class名包含zdText，则不进行操作
      console.log("range的偏移量是:", range.startOffset);
      if (range.startContainer.parentNode.classList.contains("zdText")) {
        console.log("被拦截了");
        // 如果有removeBtn，则删除
        if (itemElement.querySelector(".remove-btn")) {
          itemElement.removeChild(itemElement.querySelector(".remove-btn"));
        }
        return;
      }
      // 将 range 的起始和结束位置设置为同一点，以便插入新内容
      range.setStart(range.startContainer, range.startOffset);
      range.setEnd(range.startContainer, range.startOffset);
    } else {
      // console.log('range的起始容器不是文本节点', range.startContainer);
      // console.log('range的节点类型是:', range.startContainer.nodeType);
      // console.log('range的节点名称是:', range.startContainer.nodeName);
      // // 如果不是文本节点,需要在容器内创建一个新的文本节点
      // const textNode = document.createTextNode('\u00A0');
      // range.startContainer.appendChild(textNode);
      // range.setStart(textNode, 0);
      // range.setEnd(textNode, 0);
    }
    // 删除 range 内的内容
    range.deleteContents();
    // 在 range 的当前位置插入拖动的元素
    range.insertNode(itemElement);

    // 插入一个零宽度空格字符，防止元素合并
    const zeroWidthSpace = document.createTextNode("\u200B");
    range.setStartAfter(itemElement);
    range.setEndAfter(itemElement);
    range.insertNode(zeroWidthSpace);

    // 使用 setTimeout 确保光标在正确位置
    setTimeout(() => {
      const selection = window.getSelection();
      selection.removeAllRanges();
      const newRange = document.createRange();
      // 将新 range 设置在零宽度空格之后
      newRange.setStartAfter(zeroWidthSpace);
      newRange.setEndAfter(zeroWidthSpace);
      selection.addRange(newRange);
    }, 0);
  } else {
    // 如果目标位置有其他元素，不允许放下
    console.log("目标位置已有其他元素，不允许放下");
    if (originalParent.value === document.querySelector(".editable")) {
      console.log("走到这里了0");
      // 如果是从输入框内拖拽的，不做任何操作
    } else {
      console.log("走到这里了1");
      // 如果存在removeBtn，且在框外则删除
      if (itemElement.querySelector(".remove-btn") && !fromEditable.value) {
        itemElement.removeChild(itemElement.querySelector(".remove-btn"));
      }
    }
  }
  // 聚焦到 editable 区域，确保光标可见
  document.querySelector(".editable").focus();
};
const getCaretRangeFromPoint = (x, y) => {
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  } else if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(x, y);
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.setEnd(pos.offsetNode, pos.offset);
    return range;
  }
  return null;
};
const focusEditable = event => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(event.target);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

const handleKeydown = event => {
  if (
    event.ctrlKey &&
    (event.key === "y" ||
      event.key === "Y" ||
      event.key === "z" ||
      event.key === "Z" ||
      event.key === "x" ||
      event.key === "X" ||
      event.key === "c" ||
      event.key === "C" ||
      event.key === "v" ||
      event.key === "V" ||
      event.key === "a" ||
      event.key === "A")
  ) {
    event.preventDefault();
    return;
  }
  if (event.key === "Backspace" || event.key === "Delete") {
    // 等待删除键生效后再执行，否则 itemsInEditable 会包含被删除的项目
    setTimeout(() => {
      const itemsInEditable = Array.from(document.querySelectorAll(".editable .item"));
      console.log(itemsInEditable, "itemsInEditable");
      const itemsInBox = Array.from(kxzdBox.value.childNodes).map(node => node.id);
      console.log(itemsInBox, "itemsInBox");

      // 判断哪些item被删除了
      // 使用Set去重,避免重复的item
      const deletedItems = Array.from(
        new Set(
          kxzdList.value.filter(item => !itemsInEditable.some(node => node.id === item.id) && !itemsInBox.includes(item.id))
        )
      );
      console.log(deletedItems, "deletedItems");

      // 将被删除的项目重新添加到 box 中
      deletedItems.forEach(item => {
        let flag = kxzdList.value.findIndex(value => value.id == item.id);
        if (flag != -1) {
          kxzdList.value.push(item);
        }
      });
    }, 0);
  }
};

const removeItem = item => {
  kxzdList.value = kxzdList.value.filter(i => i.id !== item.id);
  item.showRemoveBtn = false;
  kxzdList.value.push(item);
};

const confirm = async () => {
  let textContent = document.querySelector(".editable").innerHTML;
  console.log(textContent, "textContent");
  // 使用正则表达式匹配类名为 tzField 的元素
  const regex = /<div[^>]*class="[^"]*tzField[^"]*"[^>]*>(.*?)<\/div>/gi;
  // 替换匹配到的元素为它们的id
  const replacedContent = textContent.replace(regex, function (match) {
    let id = match.match(/id="([^"]*)"/)[1];
    return "${" + id + "}";
  });
  // 只清理零宽字符，保留多个空格    ps：复制到控制台会发现每一个${xxx}后会有一个红色的圆点，这个红点实际上是零宽字符 (\u200B)，会被后端解析成？
  replacedContent = replacedContent
    .replace(/\u200B/g, "") // 删除所有零宽字符
    .trim(); // 移除首尾空格
  let params = {
    triggerType: formState.triggerType,
    kqfw: formState.yxbkkqzt.join(","),
    noticeTarget: formState.noticeTarget.join(","),
    tzContent: replacedContent,
    tzTitle: formState.tzTitle
  };
  if (!params.kqfw) {
    ElMessage.error("请选择考勤状态");
    return;
  }
  if (!params.noticeTarget) {
    ElMessage.error("请选择通知对象");
    return;
  }
  if (!params.tzTitle) {
    ElMessage.error("请填写通知标题");
    return;
  }
  if (!params.tzContent) {
    ElMessage.error("请填写通知内容");
    return;
  }

  // saveKqTzTemplate(params).then(res => {
  //   if (res.ret == 0) {
  //     ElMessage.success(res.msg);
  //   }
  // });

  // 模拟保存成功
  saveKqTzTemplate(params).then(res => {
    if (res.ret == 0) {
      ElMessage.success(res.msg);
    }
  });
};

const saveKqTzTemplate = params => {
  return new Promise(resolve => {
    // 模拟保存数据到 sessionStorage
    sessionStorage.setItem("kqTzTemplate", JSON.stringify(params));

    // 模拟接口返回结果
    const res = {
      ret: 0,
      msg: "保存成功"
    };

    // 解析并返回结果
    resolve(res);
  });
};
const cancel = () => {
  console.log("取消");
};
</script>
<style lang="scss" scoped>
.required {
  color: red;
}

.kxzdBox {
  display: flex;
  gap: 20px;
}

.kxzdBox-item {
  background: #f2f4f7;
  padding: 2px 6px;
  border-radius: 4px;
  width: 90px;
}

.box {
  display: flex;
  gap: 10px;
  font-size: 14px;
}

.zdText {
  cursor: move;
}

.item {
  background-color: #f2f4f7;
  padding: 2px 6px;
  border-radius: 6px;
  display: inline-block;
  position: relative;
  font-size: 14px;
  color: #474c59;
  // margin-bottom: 5px;
  // margin-right: 5px;
  // margin-left: 5px;
  margin: 0px 2px 5px 2px;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-weight: bold;
  cursor: pointer;
}

.item:hover {
  background-color: #e5f0ff;
}

.editable {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  outline: none;
  border-radius: 4px;
  flex: 1;
}

.create_kqjgtz_modal {
  width: 100%;
  /* padding: 10px; */
  background-color: #f6f6f7;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .kqjgtz {
    margin: 10px 10px 0;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    flex: 1;
    font-size: 14px;
    height: calc(100vh - 90px);
    overflow: auto;

    .kqjgtz-item {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .kqjgtz-set {
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      gap: 6px;
    }

    .kqjgtz-item-label {
      width: 128px;
      line-height: 40px;
    }

    .kqjgtz-item-labelKxzd {
      width: 120px;
    }

    .kqjgtz-item-boxKxzd {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .tzField {
        width: 90px;
        text-align: center;
      }
    }

    .kqjgtz-item-labelZt {
      width: 128px;
      line-height: 32px;
    }

    .kqjgtz-item-content {
      flex: 1;
    }

    .title {
      font-weight: 600;
      color: #131b26;
      font-size: 14px;
    }

    .bktime_setting {
      height: 32px;
      line-height: 32px;
      font-size: 14px;

      .input_time {
        width: 80px;
        height: 32px;
        margin: 0 10px;
      }
    }
  }

  .footer {
    border-top: 1px solid #f2f2f2;
    background-color: #fff;
    margin-top: 10px;
    display: flex;
    height: 70px;
    align-items: center;
    padding: 20px;
    justify-content: flex-end;
    gap: 30px;

    .textBtn,
    .primaryBtn {
      width: 92px;
    }
  }
}
</style>
