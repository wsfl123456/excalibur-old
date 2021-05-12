<!--筛选组建-->
<template>
  <div class="list-filter">
    <div v-if="toolkitPackageId != 7">
      <div class="filter-box">
      <RadioGroup type="button" :value="defaultTask" @on-change="stateFilter">
        <Radio v-for="(item, index) in taskStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
      </div>
      <div class="filter-box">
        <RadioGroup type="button" :value="defaultMy" @on-change="fnTypeFilter">
          <Radio v-for="(item, index) in myStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
        </RadioGroup>
      </div>
      </div>

    <!--  仅当是财务工具包时显示流程状态栏  -->
    <div v-else>
       <div class="filter-box">
        <RadioGroup type="button" :value="defaultFinanceMy" @on-change="financeTypeFilter">
          <Radio v-for="(item, index) in financeMyStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
        </RadioGroup>
      </div>
       <div class="filter-box">
         <RadioGroup type="button" :value="flowState" @on-change="flowFilter">
           <Radio v-for="(item, index) in proStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
         </RadioGroup>
       </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'list-filter',
    data () {
      return {
        taskStatus: [
          {name: '任务状态'},
          {name: '全部', id: 0},
          {name: '待审核', id: 1},
          {name: '审核不通过', id: 2},
          {name: '执行中', id: 4},
          {name: '待质检', id: 5},
          {name: '质检通过', id: 6},
          {name: '质检不通过', id: 7},
          {name: 'PM审核通过', id: 8},
          {name: 'PM审核不通过', id: 9}
        ],
        myStatus: [
          {name: '我的任务'},
          {name: '全部', id: 0},
          {name: '我发起的', id: 1},
          {name: '我审核的', id: 2},
          {name: '我负责的', id: 3},
          {name: '我质检的', id: 4}
        ],

        financeMyStatus: [
          {name: '我的任务'},
          {name: '全部', id: 0},
          {name: '我发起的', id: 1},
          {name: '待我审核', id: '2-1',},
          {name: '我已审核', id: '2-2',},
        ],
        proStatus : [
          {name : '流程状态'},
          {name : '全部', id : 0},
          {name : '盖章中', id : 1},
          {name : '已盖章', id : 2},
          {name : '开票中', id : 3},
          {name : '已开票', id : 4},
          {name : '打款中', id : 5},
          {name : '已付款', id : 6},
          {name : 'PM审核通过', id : 8},
        ]
      }
    },
    computed: {
      ...mapGetters({
        toolkitPackageId: "getCurrentToolkitPackageId"
      }),
      flowState() {
        return this.$store.state.taskFilter.flowState;
      },
      defaultMy () {
        return this.$store.state.taskFilter.functionType
      },
      defaultFinanceMy() {
        if (this.$store.state.taskFilter.functionType === 2 && this.$store.state.taskFilter.is_urgent === 1) {
          return "2-1"
        }else if (this.$store.state.taskFilter.functionType === 2 && this.$store.state.taskFilter.is_urgent === 2) {
          return "2-2"
        } else {
          return this.$store.state.taskFilter.functionType
        }
      },
      defaultTask () {
        return this.$store.state.taskFilter.state
      },
      listParams () {
        return this.$store.state.taskFilter
      }
    },
    methods: {
      stateFilter (id) {
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.state = id
        data.page = 1
        this.$emit('on-change', true)
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setTaskList', {data, cb: _cb})
      },
      fnTypeFilter (id) {
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.functionType = id
        this.$emit('on-change', true)
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setTaskList', {data, cb: _cb})
      },
      financeTypeFilter(id) {
        let data = JSON.parse(JSON.stringify(this.listParams))
        if (id === '2-1') {
          data.is_urgent = 1;
          data.functionType = 2
        }else if (id === '2-2') {
          data.is_urgent = 2;
          data.functionType = 2
        }else {
          data.is_urgent = '';
          data.functionType = id
        }
        data.page = 1

        this.$emit('on-change', true)
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setTaskList', {data, cb: _cb})
      },
      flowFilter(state) {
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.flowState = state
        this.$emit('on-change', true)
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)
          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setTaskList', {data, cb: _cb})
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
