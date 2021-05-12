<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">创建供应商</h2>
      <Row>
        <i-col span="17" class="task-form">
          <div>
            <i-form label-position="left" :label-width="88" class="default-form" >
              <div class="form-group">
                <div >
                  <FormItem label="供应商名称" class="default-form-item" required>
                    <i-input v-model="supplierValues.name" placeholder="填写供应商名称（必填）"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="供应商分类" class="default-form-item" required>
                    <RadioGroup v-model="supplierValues.serviceType" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in supplier.cates" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                        {{radioItem.label}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div v-if="+supplierValues.serviceType === 15">
                  <FormItem label="Others备注" class="default-form-item">
                    <i-input v-model="supplierValues.serviceTypeOtherText" type="textarea" :autosize="{minRows: 1, maxRows: 7}" placeholder="备注内容"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="供应商状态" class="default-form-item" required>
                    <RadioGroup v-model="supplierValues.workState"  size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in supplier.workState" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                        {{radioItem.label}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>
          <div>
            <i-form label-position="left" :label-width="88" class="default-form" >
              <div class="form-group">
                <div>
                  <FormItem label="账户名称" class="default-form-item" required>
                    <i-input v-model="supplierValues.accountName" placeholder="填写供应商公司全称（必填）"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="账户税号" class="default-form-item" required>
                    <i-input v-model="supplierValues.dutyParagraph" placeholder="填写供应商账户识别号（必填）"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="银行账号" class="default-form-item" required>
                    <i-input v-model="supplierValues.accountId" placeholder="填写开户行银行账号（必填）"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="开户行" class="default-form-item" required>
                    <i-input v-model="supplierValues.bankName" placeholder="填写开户行名称（必填）"></i-input>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>

          <div>
            <template v-for="item in supplierValues.contactInfo">
              <i-form label-position="left" :label-width="88" class="default-form" >
                <div class="form-group">
                  <div>
                    <FormItem label="联系人" class="default-form-item" required>
                      <i-input v-model="item.contactName" placeholder="填写联系人姓名（必填）" ></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <FormItem label="联系地址" class="default-form-item" required>
                      <i-input v-model="item.contactAddress" placeholder="填写联系地址（必填）"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <Row>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系方式" class="default-form-item default-member-form" required>
                          <i-input v-model="item.mobile" placeholder="填写联系方式（必填）" ></i-input>
                        </FormItem>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系邮箱" class="default-form-item default-member-form" required>
                          <i-input v-model="item.email" placeholder="填写联系邮箱（必填）" ></i-input>
                        </FormItem>
                      </i-col>
                    </Row>
                  </div>
                </div>
              </i-form>
            </template>

            <div class="form-add g-ta-r g-mb-16">
              <a href="javascript:;" @click="addContact">
                <Icon type="plus"></Icon>
                添加联系人
              </a>
            </div>
          </div>


          <div>
            <i-form label-position="left" :label-width="88" class="default-form" >
              <div class="form-group">
                <div>
                  <FormItem label="我司对接人" class="default-form-item " required>
                    <div class="default-form-member-selection">
                      <supplier-member content="选择对接人" multi @on-change="selectSupplierUsers" :users="supplierValues.normcoreContactsInfo"></supplier-member>
                    </div>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="对方组织" class="default-form-item " required>
                    <RadioGroup v-model="supplierValues.organizationType"  size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in supplier.organization" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                        {{radioItem.label}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="签约公司" class="default-form-item " required>
                    <RadioGroup v-model="supplierValues.signCompanyId" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in supplier.companys" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 50%">
                        {{radioItem.customerName}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>

              </div>
            </i-form>
          </div>
          <div class="submit-btn-box">
            <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submitSupplier">提交供应商</Button>
          </div>
        </i-col>
      </Row>



    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>
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
  import BCrumb from '../../components/BCrumb'
  import {Supply, Index} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import SupplierMember from '../../components/SupplierMember'
  import SubHeader from '../../components/SubHeader'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  import LeaveModal from '../../components/popup/LeaveModal'
  export default {
    components: {
      LeaveModal,
      LoadDraftModal,
      SubHeader,
      SupplierMember,
      Toast,
      BCrumb
    },
    name: 'add',
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
            label: '新建供应商'
          }
        ],
        toastMsg: null,
        toastStatus: null,
        isToast: false,
        allUsers: [],
        contactTpl: {
          contactAddress: null, // 联系地址
          contactName: null, // 联系人名
          mobile: null, // 联系方式
          email: null // 邮箱
        },
        supplierValues: {
          name: null, // 供应商名字
          serviceType: null, // 服务类型
          accountName: null, // 账户名
          bankName: null, // 开户行名
          serviceTypeOtherText: null,
          accountId: null, // 供应商账户号
          contactInfo: [
            {
              contactAddress: null, // 联系地址
              contactName: null, // 联系人名
              mobile: null, // 联系方式
              email: null // 邮箱
            }
          ],
          normcoreContactsInfo: [], // 对接人
          signCompanyId: null, // 我方签约公司
          workState: null, // 合作状态
          dutyParagraph: null, // 税号
          organizationType: null // 组织
        },
        supplier: {
          cates: [
            {
              id: '1',
              label: 'Proposal'
            },
            {
              id: '2',
              label: 'KOL Purchasing'
            },
            {
              id: '3',
              label: 'Media Purchasing'
            },
            {
              id: '4',
              label: 'Copy Writing'
            },
            {
              id: '5',
              label: 'Layout'
            },
            {
              id: '6',
              label: 'lllustration'
            },
            {
              id: '7',
              label: 'Shooting'
            },
            {
              id: '8',
              label: 'Video Production'
            },
            {
              id: '9',
              label: 'Talent Fee'
            },
            {
              id: '10',
              label: 'Server'
            },
            {
              id: '11',
              label: 'Technical Production'
            },
            {
              id: '12',
              label: 'Tracking and Reporting'
            },
            {
              id: '13',
              label: 'Print'
            },
            {
              id: '14',
              label: 'Administration'
            },
            {
              id: '15',
              label: 'Others'
            }
          ],
          workState: [
            {
              id: '1',
              label: '沟通中'
            },
            {
              id: '2',
              label: '合作中'
            },
            {
              id: '3',
              label: '已解约'
            }
          ],
          organization: [
            {
              id: '1',
              label: '公司'
            },
            {
              id: '2',
              label: '个人'
            },
            {
              id: '3',
              label: '工作室'
            }
          ],
          companys: []
        }
      }
    },
    computed: {
      currMenu () {
        return this.$store.state.index.currMenu
      }
    },
    methods: {
      addContact () {
        let tpl = this.contactTpl
        this.supplierValues.contactInfo.push(tpl)
      },
      submitSupplier () {
        let _isToast = false
        let _toastMsg = ''
        let mailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
        if (this.supplierValues.name === '' || !this.supplierValues.name) {
          _isToast = true
          _toastMsg = '请填写供应商名称'
        } else if (!this.supplierValues.serviceType) {
          _isToast = true
          _toastMsg = '请选择分类'
        } else if (!this.supplierValues.workState) {
          _isToast = true
          _toastMsg = '请选择状态'
        } else if (this.supplierValues.normcoreContactsInfo.length === 0) {
          _isToast = true
          _toastMsg = '请选择对接人'
        } else if (!this.supplierValues.accountName || this.supplierValues.accountName === '') {
          _isToast = true
          _toastMsg = '请填写账户名'
        } else if (!this.supplierValues.accountId || this.supplierValues.accountId === '') {
          _isToast = true
          _toastMsg = '请填写银行账号'
        } else if (!/^\d+$/.test(this.supplierValues.accountId)) {
          _isToast = true
          _toastMsg = '银行卡号只能是数字'
        } else if (!this.supplierValues.bankName || this.supplierValues.bankName === '') {
          _isToast = true
          _toastMsg = '请填写开户行'
        } else if (!/^[\u4E00-\u9FA5\uFF00-\uFFEF]{1,}$/.test(this.supplierValues.bankName)) {
          _isToast = true
          _toastMsg = '开户行名称只能是中文'
        } else if (!this.supplierValues.dutyParagraph || this.supplierValues.dutyParagraph === '') {
          _isToast = true
          _toastMsg = '请填写税号'
        } if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.supplierValues.dutyParagraph)) {
          _isToast = true
          _toastMsg = '税号由15或者17或者18或者20位字母、数字组成'
        } else if (!this.supplierValues.signCompanyId) {
          _isToast = true
          _toastMsg = '请选择签约公司'
        } else if (!this.supplierValues.organizationType) {
          _isToast = true
          _toastMsg = '请选择组织'
        }

        for (let i = 0; i < this.supplierValues.contactInfo.length; i++) {
          let value = this.supplierValues.contactInfo[i]
          if (i === this.supplierValues.contactInfo.length - 1 && i !== 0) {
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

        this.$http.post(Supply.add, this.qs.stringify(this.supplierValues), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '提交成功'
            this.toastStatus = 'success'
            this.isSaved = true
            localStorage.removeItem('addSupplier')
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

      selectSupplierUsers (value) {
        this.supplierValues.normcoreContactsInfo = value
      },
      getNcCompany () {
        this.$http.post(Supply.innerCustomer, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.supplier.companys = _data.retData.data
          }
        })
      },
      getAllEmployee () {
        this.$http.post(Index.allUsers, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.allUsers = _data.retData.data
          }
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
        this.isLeaveConfirm = false
        this.$store.dispatch('setCurrMenu', '8')
        sessionStorage.setItem('currMenu', '8')
      },
      parserDraft () {
        this.isDraft = localStorage.hasOwnProperty('addSupplier')
      },
      loadDraft () {
        const _draft = localStorage.getItem('addSupplier')
        const draft = JSON.parse(_draft)
        this.supplierValues = draft
        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      saveLeavePage () {
        const supplierData = JSON.stringify(this.supplierValues)
        localStorage.setItem('addSupplier', supplierData)
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
      this.getNcCompany()
      this.getAllEmployee()
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
  .submit-btn-box {
    position: absolute;
    left: 100%;
    bottom: 16px;
    margin-left: 32px;
  }
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
