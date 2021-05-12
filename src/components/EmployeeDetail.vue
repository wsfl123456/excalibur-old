<template>
  <div class="list-detail">
    <div>
      <employee-form v-if="!isLoading && type === 'basic'" :form-value="formValue"></employee-form>
      <employee-contract-form v-if="!isLoading && type === 'contract'" :form-value="formValue"></employee-contract-form>
      <div class="g-ta-r">
        <template v-if="type === 'contract'">
          <Button type="primary" size="large" @click.native="addProbation">增加试用日期</Button>
          <Button type="primary" size="large" @click.native="addContinue">增加续签日期</Button>
        </template>
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
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import {Hr} from '../API/api'
  import CommonMember from './CommonMember'
  import EmployeeForm from './EmployeeForm'
  import EmployeeContractForm from './EmployeeContractForm'
  export default {
    components: {
      EmployeeContractForm,
      EmployeeForm,
      CommonMember,
      Toast,
      Loading},
    name: 'employee-detail',
    props: {
      currId: {
        type: [Number, String]
      },
      formValue: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'basic'
      }
    },
    data () {
      return {
        isToast: false,
        toastMsg: null,
        toastState: null,
        isSaving: false
      }
    },
    methods: {
      addProbation () {
        const probationTpl = {
          start: null,
          end: null
        }
        this.formValue.probationInfo.push(probationTpl)
      },
      addContinue () {
        const continueTpl = {
          start: null,
          end: null
        }
        this.formValue.continueInfo.push(continueTpl)
      },
      save () {
        let saveApi = Hr.editBasic
        let saveData = {}
        if (this.type === 'contract') {
          saveApi = Hr.editContract
          saveData = {
            // id: this.formValue.contract_id,
            id: this.formValue.id,
            // id: this.currId,
            state: this.formValue.state,
            contractTime: this.formValue.contractTime,
            period: this.formValue.period,
            endTime: this.formValue.endTime,
            // trafficAllowance: this.formValue.trafficAllowance,
            // telAllowance: this.formValue.telAllowance,
            // baseSalary: this.formValue.baseSalary,
            // secondSalary: this.formValue.secondSalary,
            fundStartTime: this.formValue.fundStartTime,
            fundBase: this.formValue.fundBase,
            socialStartTime: this.formValue.socialStartTime,
            socialBase: this.formValue.socialBase,
            continueInfo: this.formValue.continueInfo,
            probationInfo: this.formValue.probationInfo
          }
        } else {
          saveData = {
            id: this.currId,
            contractState: this.formValue.contractState,
            userName: this.formValue.userName,
            englishName: this.formValue.englishName,
            mobile: this.formValue.mobile,
            positionId: this.formValue.positionId,
            rankId: this.formValue.rankId,
            departmentId: this.formValue.departmentId,
            // groupId: this.formValue.groupId,
            collegeId: this.formValue.collegeId,
            studyId: this.formValue.studyId,
            status: this.formValue.status,
            N1Id: this.formValue.N1Id,
            N2Id: this.formValue.N2Id,
            birthDay: this.formValue.birthDay,
            constellation: this.formValue.constellation,
            wechart: this.formValue.wechart,
            highestEducation: this.formValue.highestEducation,
            school: this.formValue.school,
            major: this.formValue.major,
            email: this.formValue.email,
            // companyEmail: this.formValue.companyEmail,
            cardType: this.formValue.cardType,
            identityCard: this.formValue.identityCard,
            bankName: this.formValue.bankName,
            bankCardId: this.formValue.bankCardId,
            fundId: this.formValue.fundId,
            holidayDay: this.formValue.holidayDay,
            permanentAddress: this.formValue.permanentAddress,
            address: this.formValue.address,
            linkmanInfo: this.formValue.linkmanInfo,
            resume: this.formValue.resume,
            lastDay: this.formValue.lastDay
          }
        }
        if (!this.isSaving) {
          this.isSaving = true
          if (this.formValue.hasOwnProperty('continueInfo')) {
            let reformatContinueArr = this.formValue.continueInfo.filter((item) => {
              return item.start || item.end
            })
            this.formValue.continueInfo = reformatContinueArr
          }
          if (this.formValue.hasOwnProperty('probationInfo')) {
            let reformatProbationArr = this.formValue.probationInfo.filter((item) => {
              return item.start || item.end
            })
            this.formValue.probationInfo = reformatProbationArr
          }
          let notVeri = false

          if (this.type === 'basic') {
            if (!this.formValue.N1Id) {
              notVeri = true
              this.toastMsg = '请选择 N+1'
            }
            if (!/^\d{11}$/.test(this.formValue.mobile)) {
              notVeri = true
              this.toastMsg = '手机号为11位数字'
            }
            // if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.formValue.email)) {
            //   this.toastMsg = '邮箱格式错误'
            //   notVeri = true
            // }
            // if (!/^[A-Za-z0-9]+$/.test(this.formValue.identityCard)) {
            //   this.toastMsg = '证件号只能包含数字和字母'
            //   notVeri = true
            // }
            // if (!/^\d+$/.test(this.formValue.bankCardId)) {
            //   this.toastMsg = '银行账号只能是数字'
            //   notVeri = true
            // }
            // if (!/^[A-Za-z0-9]+$/.test(this.formValue.fundId)) {
            //   this.toastMsg = '请填写正确的公积金账号'
            //   notVeri = true
            // }
            // if (!/^\d+$/.test(this.formValue.rankId)) {
            //   this.toastMsg = '职级只能是数字'
            //   notVeri = true
            // }
            if (!this.formValue.rankId) {
              this.toastMsg = '请选择职级'
              notVeri = true
            }
            // if (!/^\d+$/.test(this.formValue.holidayDay)) {
            //   this.toastMsg = '年假天数只能是数字'
            //   notVeri = true
            // }
            if (!this.formValue.status) {
              this.toastMsg = '请选择状态'
              notVeri = true
            }
            if (this.formValue.status == 2 && !this.formValue.lastDay) {
              this.toastMsg = '请选择离职日期'
              notVeri = true
            }
            if (this.formValue.contractId && !this.formValue.contractState) {
              this.toastMsg = '请选择性质'
              notVeri = true
            }
            if (!this.formValue.userName) {
              this.toastMsg = '请填写姓名'
              notVeri = true
            }
            if (!this.formValue.englishName) {
              this.toastMsg = '请填写英文名'
              notVeri = true
            }
            if (!this.formValue.positionId) {
              this.toastMsg = '请选择职位'
              notVeri = true
            }
            if (!this.formValue.departmentId) {
              this.toastMsg = '请选择部门'
              notVeri = true
            }
            if (!this.formValue.collegeId) {
              this.toastMsg = '请选择学院'
              notVeri = true
            }
            if (!this.formValue.studyId) {
              this.toastMsg = '请选择专业'
              notVeri = true
            }
          }
          if (this.type === 'contract') {
            // if (!this.formValue.uid) {
            //   notVeri = true
            //   this.toastMsg = '请选择员工'
            // }
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
          this.$http.post(saveApi, this.qs.stringify(saveData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
              if (_data.retCode === 100014) {
                this.$cookie.delete('token')

                this.$router.push('/')
              }
              if (_data.retCode === 0) {
                this.$emit('on-save')
              }
            }, 1500)
          })
        }
      }
    },
    created () {
    }

  }
</script>

<style scoped lang="less">
  .list-detail {
    position: relative;
    padding: 16px;
    background-color: #ced4da;
    > div {
      padding: 32px;
      background-color: #fff;
      margin-bottom: 16px;
    }
  }
  .saving {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
