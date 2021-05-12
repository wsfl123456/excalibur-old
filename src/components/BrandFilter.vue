<!--筛选组建-->
<template>
  <div class="list-filter">
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultIndustry" @on-change="industryFilter">
        <Radio v-for="(item, index) in industry" :key="index" :label="item.id" :disabled="index===0">{{item.industryName}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultState" @on-change="stateFilter">
        <Radio v-for="(item, index) in status" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <!-- <div class="filter-box">
      <RadioGroup type="button" :value="defaultWorkState" @on-change="workStateFilter">
        <Radio v-for="(item, index) in workState" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
      </RadioGroup>
    </div> -->
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultCompany" @on-change="companyFilter">
        <Radio v-for="(item, index) in company" :key="index" :label="item.idAuto" :disabled="index===0">{{item.name || item.customerName}}</Radio>
      </RadioGroup>
    </div>
    <!--<loading v-if="isLoading"></loading>-->
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import { Brand } from '../API/api'
  export default {
    name: 'brand-filter',
    components: {
      Loading
    },
    data () {
      return {
        isLoading: false,
        industry: [
          {industryName: '品牌行业'},
          {industryName: '全部', id: 0}
          // {name: 'Food&Beverage', id: 1},
          // {name: 'Beauty&Fashion', id: 2},
          // // {name: 'ACG（student）', id: 3},
          // {name: 'Auto Related', id: 4},
          // {name: 'NORMCORE Group', id: 3},
          // {name: 'Others', id: 5}
        ],
        status: [
          {name: '品牌状态'},
          {name: '全部', id: 0},
          {name: '待审核', id: 1},
          {name: '审核通过', id: 2},
          {name: '审核不通过', id: 3}
        ],
        //  workState: [
        //   {name: '合作状态'},
        //   {name: '全部', id: 0},
        //   {name: '沟通中', id: 1},
        //   {name: '合作中', id: 2},
        //   {name: '已解约', id: 3}
        // ],
        company: [
          {name: '签约公司'},
          {name: '全部', idAuto: 0}
        ]
      }
    },
    computed: {
      defaultState () {
        return this.$store.state.brands.filter.state
      },
      defaultWorkState () {
        return this.$store.state.brands.filter.workState
      },
      defaultIndustry () {
        return this.$store.state.brands.filter.industry
      },
      defaultCompany () {
        return this.$store.state.brands.filter.ncCompanyId
      },
      listParams () {
        return this.$store.state.brands.filter
      }
    },
    created () {
      this.getAllInner()
      this.getIndustry()
    },
    methods: {
      getAllInner () {
        this.$http.post(Brand.innerCustomer, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.company = this.company.concat(_data.retData.data)
          }
        })
      },
      getIndustry () {
        this.$http.post(Brand.type, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.industry = this.industry.concat(_data.retData.data)
          }
        })
      },
      stateFilter (id) {
        this.isLoading = true
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
        this.$store.dispatch('setBrandsList', {data, cb: _cb})
        this.$emit('on-change', true)
      },
      workStateFilter (id) {
        this.isLoading = true
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
        this.$store.dispatch('setBrandsList', {data, cb: _cb})
        this.$emit('on-change', true)
      },
      industryFilter (id) {
        this.isLoading = true
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.industry = id
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)
          if (code === 100014) {
            this.$cookie.delete('token')
            this.$router.push('/')
          }
        }
        this.$store.dispatch('setBrandsList', {data, cb: _cb})
        this.$emit('on-change', true)
      },
      companyFilter (id) {
        this.isLoading = true

        let data = JSON.parse(JSON.stringify(this.listParams))
        data.page = 1
        data.ncCompanyId = id
        let _cb = (data, code) => {
          this.isLoading = false
          this.$emit('on-change', false)

          if (code === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        }
        this.$store.dispatch('setBrandsList', {data, cb: _cb})
        this.$emit('on-change', true)
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

