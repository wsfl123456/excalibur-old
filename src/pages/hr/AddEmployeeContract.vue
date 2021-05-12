<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">创建员工合同信息</h2>
      <div>
        <employee-contract-form :form-value="formValue" is-add></employee-contract-form>
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
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import EmployeeContractForm from '../../components/EmployeeContractForm'
  import {Hr} from '../../API/api'
  export default {
    components: {
      EmployeeContractForm,
      Toast,
      Loading,
      BCrumb},
    name: 'add-employee-contract',
    data () {
      return {
        crumb: [
          {label: '人事管理'},
          {label: '员工管理'},
          {label: '合同信息', url: '/employee/contract'},
          {label: '新增合同'}
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isSaving: false,
        formValue: {
          uid: null,
          // trafficAllowance: null,
          // telAllowance: null,
          // baseSalary: null,
          // secondSalary: null,
          fundStartTime: null,
          fundBase: null,
          period: null,
          endTime: null,
          continueInfo: [
            {
              start: null,
              end: null
            }
          ],
          probationInfo: [
            {
              start: null,
              end: null
            }
          ],
          socialStartTime: null,
          socialBase: null
        }
      }
    },
    methods: {
      save () {
        if (!this.isSaving) {
          let notVeri = false
          this.isSaving = true
          if (!this.formValue.uid) {
            notVeri = true
            this.toastMsg = '请选择员工'
          }
          if (!this.formValue.contractTime) {
            notVeri = true
            this.toastMsg = '请选择签约日期'
          }
          if (!this.formValue.endTime) {
            notVeri = true
            this.toastMsg = '请选择到期日期'
          }
          if (!this.formValue.socialStartTime) {
            notVeri = true
            this.toastMsg = '请选择社保开始日期'
          }
          if (!this.formValue.state) {
            notVeri = true
            this.toastMsg = '请选择状态'
          }
          if (
            !/^\d+$/.test(this.formValue.period)
          ) {
            notVeri = true
            this.toastMsg = '所有有效期必填且只能是数字'
          }
          // if (
          //   // !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.trafficAllowance) ||
          //   // !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.telAllowance) ||
          //   // !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.baseSalary) ||
          //   // !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.secondSalary) ||
          //   !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.fundBase) ||
          //   !/^([1-9]\d*|0)(\.\d*)?$/.test(this.formValue.socialBase)
          // ) {
          //   notVeri = true
          //   this.toastMsg = '所有补贴、薪资、奖金、基数必填且必须是整数或小数'
          // }
          if (notVeri) {
            this.isSaving = false
            this.isToast = true
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          this.$http.post(Hr.addContract, this.qs.stringify(this.formValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            this.isSaving = false
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '保存成功'
              this.toastState = 'success'
            } else {
              if (_data.retMsg === '') {
                for (let key in _data.retData) {
                  let vKey = _data.retData[key]
                  this.toastMsg = vKey
                }
              } else {
                this.toastMsg = _data.retMsg
              }
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
              if (_data.retCode === 0) {
                this.$router.push('./contract')
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
</style>
