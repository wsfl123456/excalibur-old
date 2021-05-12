<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">编辑品牌</h2>

      <brand-form :brand-values="brandData"></brand-form>
      <div class="g-ta-r">
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">确认修改</Button>
      </div>
    </Card>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
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
  import BrandForm from '../../components/BrandForm'
  import {Brand} from '../../API/api'
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  export default {
    components: {
      LoadDraftModal,
      LeaveModal,
      Toast,
      Loading,
      BCrumb,
      BrandForm},
    name: 'edit',
    data () {
      return {
        isDraft: false,
        isSaved: false,
        isLeaveConfirm: false,
        crumb: [
          {
            label: '品牌管理',
            url: '/v2/resource/brand'
          },
          {
            label: '编辑品牌'
          }
        ],
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        brandData: {}
      }
    },
    computed: {
      currMenu () {
        return this.$store.state.index.currMenu
      }
    },
    methods: {
      submit () {
        this.brandData.id = this.$route.params.brandId
        delete this.brandData.auditInfo
        delete this.brandData.roleInfo
        delete this.brandData.customerCode
        delete this.brandData.companyName
        delete this.brandData.companyType
        delete this.brandData.province
        delete this.brandData.city
        delete this.brandData.registeredCapital
        delete this.brandData.accountName
        delete this.brandData.accountId
        delete this.brandData.bankName
        delete this.brandData.dutyParagraph
        let canPost = true

        let contactsCount = 0
        for (let i = 0; i < this.brandData.contactsInfo.length; i++) {
          let item = this.brandData.contactsInfo[i]
          if (item.name && item.name.length > 0 && (item.phoneNo || item.mobile || item.email)) {
            contactsCount++
          }
        }

        if (contactsCount === 0) {
          this.isToast = true
          this.toastMsg = '请至少填写一位联系人的姓名和电话或固话或邮箱'
          this.toastState = null
          canPost = false
          setTimeout(() => {
            this.isToast = false
            this.toastState = null
          }, 1500)
        }

        this.brandData.accountInfo.forEach((item) => {
          for (let key in item) {
            if (key === 'accountName' || key === 'accountId' || key === 'bankName' || key === 'dutyParagraph') {
              if (item[key] === '' || !item[key]) {
                this.isToast = true
                this.toastMsg = '请填写账户信息'
                this.toastState = null
                canPost = false
                setTimeout(() => {
                  this.isToast = false
                  this.toastState = null
                }, 1500)
                break
              }
            }
            if (!/^[\u4E00-\u9FA5\uFF00-\uFFEF]{1,}$/.test(item.bankName)) {
              this.isToast = true
              this.toastMsg = '开户行名称只能是中文'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
            if (item.dutyParagraph === item.accountId) {
              this.isToast = true
              this.toastMsg = '税号和银行卡号不能相同'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
            if (!/^\d+$/.test(item.accountId)) {
              this.isToast = true
              this.toastMsg = '银行卡号只能是数字'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
            if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(item.dutyParagraph)) {
              this.isToast = true
              this.toastMsg = '税号由15或者17或者18或者20位字母、数字组成'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
          }
        })

        this.brandData.contactsInfo.forEach((item) => {
          let info = item
          for (let key in info) {
            if (key === 'mobile' && info[key] && info[key].length > 0 && !/^\d{11}$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '联系人手机为11位数字'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
            if (key === 'phoneNo' && info[key] && info[key].length > 0 && !/^(\d{7,8})(-(\d{3,}))?$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '联系人固话为7或8位数字（不包含区号）'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
            if (key === 'email' && info[key] && info[key].length > 0 && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '请输入正确的联系人邮箱'
              this.toastState = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastState = null
              }, 1500)
              break
            }
          }
        })

        if (!canPost) {
          return
        }
        this.isLoading = true
        this.brandData.state = 1
        this.$http.post(Brand.edit, this.qs.stringify(this.brandData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '修改成功'
            this.toastState = 'success'
            this.isSaved = true
            localStorage.removeItem('editBrand')
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
              return
            }
            this.$router.push('/v2/resource/brand')
          }, 1500)
        })
      },
      getDetail () {
        this.isLoading = true
        this.$http.post(Brand.detail, this.qs.stringify({id: this.$route.params.brandId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.brandData = _data.retData
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

      parserDraft () {
        this.isDraft = localStorage.hasOwnProperty('editBrand')
      },
      loadDraft () {
        const _draft = localStorage.getItem('editBrand')
        this.brandData = JSON.parse(_draft)

        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      leaveConfirm (next) {
        if (!this.isSaved) {
          next(false)
          this.isLeaveConfirm = true
        } else {
          next()
        }
      },
      leaveCancel () {
        this.$store.dispatch('setCurrMenu', '4')
        sessionStorage.setItem('currMenu', '4')
        this.isLeaveConfirm = false
      },
      saveLeavePage () {
        this.isSaved = true
        const brandData = JSON.stringify(this.brandData)
        localStorage.setItem('editBrand', brandData)
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
    .form-add {
      margin-bottom: 16px;
    }
  }
</style>
