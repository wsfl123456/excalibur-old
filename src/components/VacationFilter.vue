<!--筛选组建-->
<template>
  <div class="list-filter">
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultState" @on-change="stateFilter">
        <Radio v-for="(item, index) in state" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaulType" @on-change="typeFilter">
        <Radio v-for="(item, index) in applyType" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <!--<loading v-if="isLoading"></loading>-->
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  export default {
    name: 'vacation-filter',
    components: {
      Loading
    },
    data () {
      return {
        isLoading: false,
        state: [
          {name: '申请状态'},
          {name: '全部', id: 0},
          {name: '待审批', id: 1},
          {name: '审批通过', id: 4},
          {name: '审批不通过', id: 3}
          // {name: '撤回', id: 4}
        ],
        applyType: [
          {name: '我的申请'},
          {name: '全部', id: 0},
          {name: '待我审批的', id: 2},
          {name: '我申请的', id: 1}
        ]
      }
    },
    computed: {
      defaultState () {
        return this.$store.state.vacation.filter.state
      },
      defaulType () {
        return this.$store.state.vacation.filter.applyType
      },
      listParams () {
        return this.$store.state.vacation.filter
      }
    },
    created () {
    },
    methods: {
      typeFilter (id) {
        this.isLoading = true
        this.$emit('on-change', true)
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.applyType = id
        data.page = 1

        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setVacationList', {data, cb: _cb})
      },
      stateFilter (id) {
        this.isLoading = true
        this.$emit('on-change', true)

        let data = JSON.parse(JSON.stringify(this.listParams))
        data.state = id
        data.page = 1

        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setVacationList', {data, cb: _cb})
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
