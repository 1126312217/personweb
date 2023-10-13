<template>
  <div id="box">
    <div ref="container" class="container" @mousemove="mousemove1">
      <div><img src="../assets/images/jujiao/1.png" alt="" /></div>
      <div><img src="../assets/images/jujiao/2.png" alt="" /></div>
      <div><img src="../assets/images/jujiao/3.png" alt="" /></div>
      <div><img src="../assets/images/jujiao/4.png" alt="" /></div>
      <div><img src="../assets/images/jujiao/5.png" alt="" /></div>
      <div><img src="../assets/images/jujiao/6.png" alt="" /></div>
    </div>
    <h3 ref="op">请在图片上左右移动鼠标查看效果</h3>
    <SearchBox style="z-index: 9;" :on-search="handleGetList" :is-all-show="true">
      <el-form label-position="top" :model="searchForm" inline>
        <el-input v-model.trim="searchForm.operator" :placeholder="plesae_select_operator" />
        <el-select v-model="searchForm.venue" :class="{ oneSelect: tableType == 1 }"
          :placeholder='general_label_select_venue' clearable>
          <el-option v-for="i in venuesList" :key="i.code" :label="i.name" :value="i.code" />
        </el-select>
        <el-select v-model="searchForm.venue" :class="{ oneSelect: tableType == 1 }"
          :placeholder='general_label_select_venue' clearable>
          <el-option v-for="i in venuesList" :key="i.id" :label="i.name" :value="i.id" />
        </el-select>
        <el-select v-model="searchForm.sports" :placeholder="general_label_select_cch_sports" clearable>
          <el-option v-for="i in activityList" :key="i.code" :label="i.name" :value="i.code" />
        </el-select>
        <el-select v-model="searchForm.proSports" :placeholder="general_label_select_programme_sports" clearable>
          <el-option v-for="i in proSportsList" :key="i.code" :label="i.name" :value="i.code" />
        </el-select>
        <el-select :placeholder='general_label_select_status' clearable>
          <el-option v-for="i in statusList" :key="i.code" :label="i.name" :value="i.code" />
        </el-select>
        <el-date-picker v-model="searchForm.effStartDate" type="date" :placeholder='general_label_start_date'
          :format='date_format' value-format="yyyy-MM-dd" :picker-options="pickerOptions0" />
        <el-date-picker v-model="searchForm.effEndDate" type="date" :format="date_format" value-format="yyyy-MM-dd"
          :placeholder='general_label_end_date' :picker-options="pickerOptions1" />
      </el-form>
    </SearchBox>
  </div>
</template>
<script>
import SearchBox from "@/components/search/index.vue";
export default {
  name: "FocusImg",
  components: {
    SearchBox,
  },
  data() {
    return {
      searchForm: {
        operator: "",
        venue: "",
        sports: "",
        proSports: "",
        status: "",
        effStartDate: "",
        effEndDate: "",
      },
      venuesList: [],
      activityList: [],
      proSportsList: [],
      statusList: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  mounted() { },
  methods: {
    handleGetList() {
      console.log("handleGetList");
    },
    // 为容器绑定鼠标移动事件
    mousemove1(e) {
      this.$refs.op.style.color = "red";//通过ref操作DOM改变文字颜色
      // 要操作的元素
      const imgs = document.querySelectorAll(".container img");
      // e.clientX 鼠标指针相对于窗口的水平坐标
      // window.outerWidth 窗口的外部宽度
      let percent = e.clientX / window.outerWidth;
      // 计算水平偏移量
      let offset = 10 * percent;
      let blur = 20;

      // 遍历图片
      imgs.forEach((img, index) => {
        offset *= 1.3;
        // 计算模糊度
        let blurValue = Math.pow(index / imgs.length - percent, 2) * blur;
        // 将计算好的值赋给CSS的自定义属性
        img.style.setProperty("--offset", offset + "px");
        img.style.setProperty("--blur", blurValue + "px");
      });
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 160px;
  /* 相对定位 */
  position: relative;
  /* 溢出隐藏 */
  overflow: hidden;
}

.container div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 绝对定位 */
  position: absolute;
  left: 0;
  top: 0;
}

.container div img {
  width: 110%;
  height: 100%;
  /* 对图片进行剪切，保留原始比例 */
  object-fit: cover;
  /* --offset（水平偏移量）、--blur（模糊度 数值越大越模糊）是CSS的自定义属性，可通过var函数进行调用 */
  --offset: 0px;
  --blur: 2px;
  /* 设置水平偏移量 */
  transform: translateX(var(--offset));
  /* 设置模糊度 */
  filter: blur(var(--blur));
}

h3 {
  margin-top: 25px;
}
</style>
