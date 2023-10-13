<template>
  <div class="search-box-component">
    <div class="width-1800" style="position: relative">
      <div class="nowrap-row">
        <div v-if="isOnlyRead" ref="expandableWrapper" :class="['expandable-wrapper', 'expanded']">
          <slot />
        </div>
        <div v-else ref="expandableWrapper" :class="['expandable-wrapper', isExpanded ? 'expanded' : null]">
          <slot />
          <div v-if="innerSearch" class="right-side-button search-button inner-search" @click="handleSearch">
            <em class="el-icon-search" />
          </div>
        </div>
        <div v-if="!isOnlyRead && onReset" class="right-side-button reset-button" @click="onReset">
          {{ $t("general_label_reset") }}
        </div>
        <div v-if="!isOnlyRead && onSearch && !innerSearch && !isRefresh" class="right-side-button search-button"
          @click="handleSearch">
          <em class="el-icon-search" />
        </div>
        <img v-if="!isOnlyRead && onSearch && !innerSearch && isRefresh" class="refresh-img"
          src="#" alt="" @click="handleSearch">
        <div v-if="searchSlot" class="">
          <slot :name="searchSlot" />
        </div>
      </div>

      <div v-if="!isOnlyRead && !isExpanded && shouldFold" class="search-bottom">
        <div v-if="!isAllShow" class="hyperlink" style=" margin-top: 15px;" @click="expand">
          <em class="el-icon-arrow-down" />
          {{ $t("general_label_more_options") }}
        </div>
        <div v-else />
      </div>
      <div v-if="!isOnlyRead && isExpanded" class="search-bottom">
        <div v-if="!isAllShow" class="hyperlink" @click="hide">
          <em class="el-icon-arrow-up" />
          {{ $t("general_button_hide") }}
        </div>
        <div v-else />
        <div v-if="isShowClear" class="hyperlink-clear flex" @click="onClear">
          <!-- <img v-if="isClearIcon" style="marginRight: 10px" src="@/assets/common/brushBlueIcon.svg" alt=""> -->
          {{ $t("general_button_clear_all_options") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    onSearch: Function,
    onReset: Function,
    onClear: Function,
    isShowClear: {
      type: Boolean,
      default: false
    },
    isOnlyRead: {
      type: Boolean,
      default: false
    },
    isClearIcon: {
      type: Boolean,
      default: false
    },
    innerSearch: {
      type: Boolean,
      default: false
    },
    isAllShow: {
      type: Boolean,
      default: false
    },
    isRefresh: {
      type: Boolean,
      default: false
    },
    searchSlot: {
      type: String
    }
  },
  data() {
    return {
      isExpanded: false,
      shouldFold: true
    }
  },
  watch: {},
  mounted() {
    const $slot = this.$refs.expandableWrapper.children[0]
    this.$nextTick(function () {
      // console.log($slot.offsetHeight)
      if ($slot && $slot.offsetHeight < 108) {
        this.shouldFold = false
      }
      if (this.isAllShow) {
        this.isExpanded = true
      }
    })
  },
  methods: {
    handleSearch() {
      if (this.onSearch) {
        this.onSearch()
      }
      //q:这里为什么可以直接调用父组件的方法
      //a:因为父组件的方法是通过props传递过来的，所以可以直接调用
      //q:为什么不用emit，父组件可以接收到吗
      //a:因为父组件的方法是通过props传递过来的，所以可以直接调用
    },
    expand() {
      this.isExpanded = true
    },
    hide() {
      this.isExpanded = false
    }
  }
}
</script>

<style lang="scss">
.search-box-component {
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 20px 0 0 0;
  background-color: #1A288D0F; //$grey-4;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);

  .more-button {
    float: left;
  }

  .search-bottom {
    display: flex;
    justify-content: space-between;
  }

  .right-side-button {
    color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 5px rgba($color: #000000, $alpha: 0.2);
    background-color: red;
    padding: 9px 12px;
    height: 48px;
    cursor: pointer;
    margin-top: 34px;
    margin-left: 20px;
    flex-shrink: 0;

    &:hover {
      background-color: red;
      opacity: 0.8;
    }

    &:active {
      color: #deaca2;
      background-color: pink;
      transform: translateY(1px);
      box-shadow: 0px 3px rgba($color: #000000, $alpha: 0.2);
    }
  }

  .reset-button {
    padding: 9px 75px;
  }

  .expandable-wrapper {
    max-height: 100px;
    overflow: hidden;
    transition: all 0.3s ease;

    //flex-grow: 1;
    &.expanded {
      max-height: 999px;
    }
  }

  .el-form--inline {
    .el-form-item {
      width: 420px;
    }

    .el-form-item__label {
      padding: 0;
      line-height: 26px;
      margin-bottom: 10px;
    }
  }
}

.inner-search {
  display: flex;
  align-items: center;
  margin-top: 10px !important;
}

.refresh-img {
  margin-top: 20px;
  height: 40px;
  width: 40px;
}
</style>