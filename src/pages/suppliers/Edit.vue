<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">编辑供应商</h2>

      <supplier-form :supplier-values="supplierData"></supplier-form>
      <div class="g-ta-r">
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submitSupplier">确认修改</Button>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>\
    <leave-modal :is-show="isLeaveConfirm"
                 @on-leave="leavePage"
                 @on-saveLeave="saveLeavePage"
                 @on-cancel="leaveCancel"
    ></leave-modal>
    <load-draft-modal :is-show="isDraft"
                      @on-load="loadDraft"
                      @on-cancel="cancelDraft"
    ></load-draft-modal>
  </div>
</template>

<script>
  import SupplierForm from '../../components/SupplierForm'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Supply} from '../../API/api'
  import BCrumb from '../../components/BCrumb'
  import SubHeader from '../../components/SubHeader'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  export default {
    components: {
      LoadDraftModal,
      LeaveModal,
      SubHeader,
      BCrumb,
      Toast,
      Loading,
      SupplierForm},
    name: 'edit',
    data () {
      return {
        isLeaveConfirm: false,
        isDraft: false,
        isSaved: false,
        crumb: [
          {
            label: '供应商管理',
            url: '/v2/resource/supplier'
          },
          {
            label: '编辑供应商'
          }
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        supplierData: {}
      }
    },
    computed: {
      currMenu () {
        return this.$store.state.index.currMenu
      }
    },
    methods: {
      submitSupplier () {
        let _isToast = false
        let _toastMsg = ''
        let mailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        this.supplierData.id = this.$route.params.supplierId

        if (this.supplierData.name === '' || !this.supplierData.name) {
          _isToast = true
          _toastMsg = '请填写供应商名称'
        } else if (!this.supplierData.serviceType) {
          _isToast = true
          _toastMsg = '请选择分类'
        } else if (!this.supplierData.workState) {
          _isToast = true
          _toastMsg = '请选择状态'
        } else if (this.supplierData.normcoreContactsInfo.length === 0) {
          _isToast = true
          _toastMsg = '请选择对接人'
        } else if (!this.supplierData.accountName || this.supplierData.accountName === '') {
          _isToast = true
          _toastMsg = '请填写账户名'
        } else if (!this.supplierData.accountId || this.supplierData.accountId === '') {
          _isToast = true
          _toastMsg = '请填写银行账号'
        } else if (!/^\d+$/.test(this.supplierData.accountId)) {
          _isToast = true
          _toastMsg = '银行卡号只能是数字'
        } else if (!this.supplierData.bankName || this.supplierData.bankName === '') {
          _isToast = true
          _toastMsg = '请填写开户行'
        } else if (!/^[\u4E00-\u9FA5\uFF00-\uFFEF]{1,}$/.test(this.supplierData.bankName)) {
          _isToast = true
          _toastMsg = '开户行名称只能是中文'
        } else if (!this.supplierData.dutyParagraph || this.supplierData.dutyParagraph === '') {
          _isToast = true
          _toastMsg = '请填写税号'
        } if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.supplierData.dutyParagraph)) {
          _isToast = true
          _toastMsg = '税号由15或者17或者18或者20位字母、数字组成'
        } else if (!this.supplierData.signCompanyId) {
          _isToast = true
          _toastMsg = '请选择签约公司'
        } else if (!this.supplierData.organizationType) {
          _isToast = true
          _toastMsg = '请选择组织'
        }

        for (let i = 0; i < this.supplierData.contactInfo.length; i++) {
          let value = this.supplierData.contactInfo[i]
          if (i === this.supplierData.contactInfo.length - 1 && i !== 0) {
            break
          }
          for (let key in value) {
            if (!value[key] || value[key] === '') {
              _isToast = true
              _toastMsg = '请完善联系人信息'
              break
            }
            if (key === 'email' && !mailReg.test(value[key])) {
              _isToast = true
              _toastMsg = '请填写正确的邮箱'
              break
            }
            if (key === 'mobile' && !/^\d+$/.test(value[key])) {
              _isToast = true
              _toastMsg = '联系方式只能填写数字'
              break
            }
          }
          if (_isToast) {
            break
          }
        }

        if (_isToast) {
          this.isToast = true
          this.toastMsg = _toastMsg
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastStatus = null
          }, 1500)
          return
        }

        this.$http.post(Supply.edit, this.qs.stringify(this.supplierData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '提交成功'
            this.toastStatus = 'success'
            this.isSaved = true
            localStorage.removeItem('editSupplier')
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastStatus = null
          }
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 0) {
              this.$router.push('/v2/resource/supplier')
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      getDetail () {
        this.isLoading = true
        this.$http.post(Supply.detail, this.qs.stringify({id: this.$route.params.supplierId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.supplierData = _data.retData
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      leaveConfirm (next) {
        if (!this.isSaved) {
          next(false)
          this.isLeaveConfirm = true
        } else {
          next()
        }
      },
      cacheMenu () {
        this.menu = this.currMenu
      },
      leaveCancel () {
        this.$store.dispatch('setCurrMenu', '8')
        sessionStorage.setItem('currMenu', '8')
        this.isLeaveConfirm = false
      },
      parserDraft () {
        this.isDraft = localStorage.hasOwnProperty('editSupplier')
      },
      loadDraft () {
        const _draft = localStorage.getItem('editSupplier')
        const draft = JSON.parse(_draft)
        this.supplierData = draft
        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      saveLeavePage () {
        delete this.supplierData.id
        const supplierData = JSON.stringify(this.supplierData)
        localStorage.setItem('editSupplier', supplierData)
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      },
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      }
    },
    created () {
      this.getDetail()
      this.parserDraft()
    },
    beforeRouteLeave (to, from, next) {
      // next()
      this.leaveConfirm(next)
      this.routerNext = next
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
  }
</style>
