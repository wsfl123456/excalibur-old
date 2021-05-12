<!--筛选组建-->
<template>
  <div class="list-filter">
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultProject" @on-change="stateFilter">
        <Radio v-for="(item, index) in taskStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultMy" @on-change="fnTypeFilter">
        <Radio v-for="(item, index) in myStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Loading from './popup/Loading'

  export default {
    name: 'general-list-filter',
    components: {
      Loading
    },
    props: {

    },
    data () {
      return {
        isLoading: false,
        taskStatus: [
          {name: '项目状态'},
          {name: '全部', id: 0},
          {name: '待PAR审核', id: 1},
          {name: 'PAR不通过', id: 2},
          {name: 'PAR通过', id: 3},
          {name: '待PIB审核', id: 4},
          {name: 'PIB不通过', id: 5},
          {name: '执行中', id: 6}
        ],
        myStatus: [
          {name: '我的项目'},
          {name: '全部', id: 0},
          {name: '我创建的', id: 1},
          {name: '我审核的', id: 2},
          {name: '我参与的', id: 3}
        ]
      }
    },
    computed: {
      defaultMy () {
        return this.$store.state.projects.filter.functionType
      },
      defaultProject () {
        return this.$store.state.projects.filter.state
      },
      listParams () {
        return this.$store.state.projects.filter
      }
    },
    methods: {
      stateFilter (id) {
        this.isLoading = true
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.state = id
        data.page = 1

        let _cb = (data, code) => {
          this.isLoading = false
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setProjectsList', {data, cb: _cb})
      },
      fnTypeFilter (id) {
        this.isLoading = true

        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.functionType = id
        let _cb = (data, code) => {
          this.isLoading = false
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setProjectsList', {data, cb: _cb})
      }
    }
  }
</script>

<style scoped lang="less">
  .list-filter {
    margin-bottom: 16px;
  }
  .filter-box {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding-left: 108px;
    position: relative;
    margin-bottom: -1px;
    .ivu-radio-group {
      margin-bottom: -1px;
    }
    .ivu-radio-wrapper {
      font-size: 14px;
      color: #343a40;
      background-color: #f8f9fa;
      height: 40px;
      line-height: 40px;
      width: 108px;
      text-align: center;
      padding: 0;
      border: 0 none;
      border-right: 1px solid #e9ecef;
      transition: none;
      border-radius: 0;
      border-bottom: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      margin-left: -1px;
      &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
        color: #2d8ef8;
        background-color: #fff;
      }
      &:first-child {
        position: absolute;
        left: 0;
        top: 0;
        border-right: 0 none;
      }
    }

    .ivu-radio-wrapper-disabled {
      background-color: #fff;
    }
    .ivu-radio-wrapper-checked {
      background-color: #107cd9;
      box-shadow: 0 0 0;
      border-color: #107cd9;
      color: #fff;
    }
  }
</style>
