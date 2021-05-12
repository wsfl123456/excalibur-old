<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">创建员工基本信息</h2>
      <div>
        <employee-form :form-value="formValue" is-add></employee-form>
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
  import EmployeeForm from '../../components/EmployeeForm'
  import {Hr} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  export default {
    components: {
      Toast,
      Loading,
      EmployeeForm,
      BCrumb
    },
    name: 'add-employee-basic',
    data () {
      return {
        crumb: [
          {label: '人事管理'},
          {label: '员工管理'},
          {label: '基本信息', url: '/employee/basic'},
          {label: '新增基本信息'}
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isSaving: false,
        formValue: {
          englistName: null,
          userCode: null,
          userName: null,
          email: null,
          companyEmail: null,
          departmentId: null,
          postitionId: null,
          rankId: null,
          N1Id: null,
          N2Id: null,
          mobile: null,
          cardType: null,
          identityCard: null,
          birthDay: '',
          permanentAddress: null,
          address: null,
          highestEducation: null,
          school: null,
          bankName: null,
          bankCardId: null,
          status: null,
          groupId: null,
          fundId: null,
          resume: null,
          linkmanInfo: [
            {
              name: null,
              mobile: null
            },
            {
              name: null,
              mobile: null
            }
          ],
          wechart: null,
          constellation: null
        }
      }
    },
    methods: {
      save () {
        if (!this.isSaving) {
          let notVeri = false
          this.isSaving = true
          if (!/^\d{11}$/.test(this.formValue.mobile)) {
            notVeri = true
            this.toastMsg = '手机号为11位数字'
          }
          if (!this.formValue.N1Id) {
            this.toastMsg = '请选择 N+1'
            notVeri = true
          }
          if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.formValue.email)) {
            this.toastMsg = '邮箱格式错误'
            notVeri = true
          }
          if (!/^[A-Za-z0-9]+$/.test(this.formValue.identityCard)) {
            this.toastMsg = '证件号只能包含数字和字母'
            notVeri = true
          }
          if (!/^\d+$/.test(this.formValue.bankCardId)) {
            this.toastMsg = '银行账号只能是数字'
            notVeri = true
          }
          if (!/^[A-Za-z0-9]+$/.test(this.formValue.fundId)) {
            this.toastMsg = '请填写正确的公积金账号'
            notVeri = true
          }
          if (!/^\d+$/.test(this.formValue.rankId)) {
            this.toastMsg = '职级只能是数字'
            notVeri = true
          }
          if (!/^\d+$/.test(this.formValue.holidayDay)) {
            this.toastMsg = '年假天数只能是数字'
            notVeri = true
          }
          if (!this.formValue.status) {
            this.toastMsg = '请选择状态'
            notVeri = true
          }
          if (notVeri) {
            this.isSaving = false

            this.isToast = true
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
            }, 1500)
            return
          }
          this.$http.post(Hr.addBasic, this.qs.stringify(this.formValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
                this.$router.push('./basic')
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
