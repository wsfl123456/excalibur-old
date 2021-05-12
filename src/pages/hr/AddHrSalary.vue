<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">新建基本薪资信息</h2>
      <div>
        <hr-salary-form :form-value="formValue" is-add=""></hr-salary-form>
        <div class="g-ta-r">
          <Button type="primary" @click.native="save" size="large">
            <template v-if="isSaving">
              <Icon type="load-a" color="#fff" size="18" class="saving"></Icon>
            </template>
            <template v-else>
              保存
            </template>
          </Button>
        </div>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import {Hr} from '../../API/api'
  import HrSalaryForm from '../../components/HrSalaryForm'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  export default {
    components: {
      Toast,
      Loading,
      HrSalaryForm,
      BCrumb},
    name: 'add-hr-salary',
    data () {
      return {
        crumb: [
          {label: '人事管理'},
          {label: '薪资与奖金'},
          {label: '薪资管理', url: '/money/salaryManage'},
          {label: '新增基本薪资'}
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isSaving: false,
        formValue: {
          uid: null,
          baseSalary: null,
          secondSalary: null,
          trafficAllowance: null,
          telAllowance: null,
          fundBase: null,
          socialBase: null,
          otherAllowance: null,
          form: 'salary'
        }

      }
    },
    methods: {
      save () {
        if (!this.isSaving) {
          this.isSaving = true
          this.$http.post(Hr.addContract, this.qs.stringify(this.formValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            this.isSaving = false
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '保存成功'
              this.toastState = 'success'
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
              if (_data.retCode === 0) {
                this.$router.push('./salaryManage')
              }
              if (_data.retCode === 100014) {
                this.$cookie.delete('token')

                this.$router.push('/')
              }
            }, 1500)
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .edit-form {
    .form-card {
      &:hover {
        box-shadow: 0 0 0;
      }
      .ivu-card-head {
        background-color: #f8f9fa;
        padding-left: 24px;
        padding-right: 24px;
        h2 {
          font-size: 14px;
          color: #343a40;
        }
      }
      .ivu-card-body {
        padding: 32px;
      }
    }
    .form-add {
      margin-bottom: 16px;
    }
  }
  .saving {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
