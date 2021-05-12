<template>
    <div class="layout-search" :class="{'ipt-focus': isFocus}">
      <div class="">
        <template>
          <div class="search-filter">
            <Select transfer size="large" class="search-sel" v-model="searchData.type" filterable placeholder="选择类别">
              <Option :value="1">项目</Option>
              <Option :value="2">任务</Option>
              <Option :value="5">合同</Option>
              <Option :value="4">供应商</Option>
              <Option :value="3">品牌</Option>
            </Select>
          </div>
        </template>
        <!--<input class="search-ipt" placeholder="搜索……" v-model="searchData.searchValue" @keydown="getResult" @focus="focusIpt"/>-->
        <Input class="search-ipt" placeholder="搜索……" v-model="searchData.searchValue" clearable @keydown.native="getResult"></Input>
        <div class="search-btn" @click="search">
          <Icon type="search" :size="16" class="search-icon" color="#2d8ef8"></Icon>
        </div>
      </div>
      <toast :is-toast="isToast" :msg="toastMsg"></toast>
    </div>
</template>

<script>
  import Toast from './popup/Toast'
import { type } from 'os';
  export default {
    name: 'SearchPlate',
    components: {Toast},
    data () {
      return {
        isToast: false,
        toastMsg: '',
        searchData: {
          type: null,
          searchValue: ''
        },
        isFocus: false
      }
    },
    methods: {
      search () {
        if (this.searchData.searchValue && this.searchData.searchValue.length > 0) {
          this.getResult({keyCode: 13})
          this.$store.dispatch('toggleSide', false)
        }
      },
      getResult (e) {
        if (e.keyCode === 13) {
          if (!this.searchData.type) {
            this.isToast = true
            this.toastMsg = '请选择搜索类别'
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          if (!this.searchData.searchValue) {
            this.isToast = true
            this.toastMsg = '请确输入搜索关键字'
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          this.searchData.searchValue = this.searchData.searchValue.trim()
          this.$store.dispatch('setSearchData', this.searchData)
          this.$router.push({
            name: 'searchResult',
            query: {
              type: this.searchData.type,
              searchValue: this.searchData.searchValue
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .fadeRight-enter-active, .fadeRight-leave-active {
    transition: max-width .5s;
    overflow: hidden;
    white-space: nowrap;
  }
  .fadeRight-enter, .fadeRight-leave-to {
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .fadeRight-enter-to, .fadeRight-leave {
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
  }
  .layout-search {
    width: 280px;
    height: 36px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    // margin-right: 15px;
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: normal;
      position: relative;
    }
    &.ipt-focus {
      max-width: 100%;
    }
    .ivu-icon-close {
      cursor: default;
    }
  }
  .search-btn {
    width: 36px;
    height: 16px;
    right: 0;
    text-align: center;
    border-left: 1px solid #ced4da;
  }
  .search-ipt {
    border: 0 none;
    outline: none;
    font-size: 14px;
    height: 36px;
    border-left: 1px solid #ced4da;
    color: #343a40;
    flex: 1;
  }
  .search-icon {
    cursor: pointer;
    line-height: normal;
  }
  .search-type {
    vertical-align: top;
    margin-right: 32px;
    .search-type-item {
      vertical-align: top;
    }
  }
  .search-filter {
    width: 100px;
  }
  .search-sel {
    > div {
      border: 0 none!important;
      border-radius: 0;
    }
    .ivu-select-selection {
      border: 0 none;
      border-radius: 0;
    }
  }
</style>
