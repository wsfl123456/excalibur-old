<!--筛选组建-->
<template>
  <div class="list-filter">
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultIndustry" @on-change="industryFilter">
        <Radio v-for="(item, index) in serviceType" :key="index" :label="item.id" :disabled="index===0">
          <span class="table">
            <span class="table-cell">{{item.name}}</span>
          </span>
        </Radio>
      </RadioGroup>
    </div>
     <!-- <div class="filter-box">
      <RadioGroup type="button" :value="defaultState" @on-change="stateFilter">
        <Radio v-for="(item, index) in status" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div> -->
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultWorkState" @on-change="workStateFilter">
        <Radio v-for="(item, index) in workState" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultCompany" @on-change="companyFilter">
        <Radio v-for="(item, index) in signCompanyId" :key="index" :label="item.idAuto" :disabled="index===0">{{item.name || item.customerName}}</Radio>
      </RadioGroup>
    </div>
    <!--<loading v-if="isLoading"></loading>-->
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import { Supply } from '../API/api'
  export default {
    name: 'supplier-filter',
    components: {
      Loading
    },
    data () {
      return {
        isLoading: false,
        serviceType: [
          {name: '供应商行业'},
          {name: '全部', id: 0},
          // {name: '布景', id: 3},
          // {name: '视频', id: 4},
          // {name: 'KOL', id: 1},
          // {name: '摄影', id: 2},
          // {name: '场景', id: 5}
          {
            id: 1,
            name: 'Proposal'
          },
          {
            id: 2,
            name: 'KOL Purchasing'
          },
          {
            id: 3,
            name: 'Media Purchasing'
          },
          {
            id: 4,
            name: 'Copy Writing'
          },
          {
            id: 5,
            name: 'Layout'
          },
          {
            id: 6,
            name: 'lllustration'
          },
          {
            id: 7,
            name: 'Shooting'
          },
          {
            id: 8,
            name: 'Video Production'
          },
          {
            id: 9,
            name: 'Talent Fee'
          },
          {
            id: 10,
            name: 'Server'
          },
          {
            id: 11,
            name: 'Technical Production'
          },
          {
            id: 12,
            name: 'Tracking and Reporting'
          },
          {
            id: 13,
            name: 'Print'
          },
          {
            id: 14,
            name: 'Administration'
          },
          {
            id: 15,
            name: 'Others'
          }
        ],
        //  status: [
        //   {name: '审核状态'},
        //   {name: '全部', id: 0},
        //   {name: '待审核', id: 1},
        //   {name: '审核通过', id: 2},
        //   {name: '审核不通过', id: 3}
        // ],
        workState: [
          {name: '供应商状态'},
          {name: '全部', id: 0},
          {name: '沟通中', id: 1},
          {name: '合作中', id: 2},
          {name: '已解约', id: 3}
        ],
        signCompanyId: [
          {name: '签约公司'},
          {name: '全部', idAuto: 0}
        ]
      }
    },
    computed: {
      defaultState () {
        return this.$store.state.supply.filter.state
      },
      defaultWorkState () {
        return this.$store.state.supply.filter.workState
      },
      defaultIndustry () {
        return this.$store.state.supply.filter.serviceType
      },
      defaultCompany () {
        return this.$store.state.supply.filter.signCompanyId
      },
      listParams () {
        return this.$store.state.supply.filter
      }
    },
    created () {
      this.getAllInner()
    },
    methods: {
      getAllInner () {
        this.$http.post(Supply.innerCustomer, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.signCompanyId = this.signCompanyId.concat(_data.retData.data)
          }
        })
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
        this.$store.dispatch('setSuppliersList', {data, cb: _cb})
      },
      workStateFilter (id) {
        this.isLoading = true
        this.$emit('on-change', true)

        let data = JSON.parse(JSON.stringify(this.listParams))
        data.workState = id
        data.page = 1

        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setSuppliersList', {data, cb: _cb})
      },
      industryFilter (id) {
        this.isLoading = true
        this.$emit('on-change', true)
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.serviceType = id
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setSuppliersList', {data, cb: _cb})
      },
      companyFilter (id) {
        this.isLoading = true
        this.$emit('on-change', true)

        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.signCompanyId = id
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setSuppliersList', {data, cb: _cb})
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
