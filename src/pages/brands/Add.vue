<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">创建新品牌</h2>
      <Row>
        <i-col span="17" class="task-form">
          <div>
            <i-form label-position="left" :label-width="88" class="default-form" >
              <div class="form-group">
                <div >
                  <FormItem label="品牌名称" class="default-form-item" required>
                    <i-input v-model="brandValues.customerName" placeholder="填写品牌名称（必填）"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="品牌分类" class="default-form-item" required>
                    <RadioGroup v-model="brandValues.industry" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in brand.cates" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                        {{radioItem.industryName}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="合作状态" class="default-form-item" required>
                    <RadioGroup v-model="brandValues.workState" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in brand.coop_status" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
                        {{radioItem.label}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>

          <div>
            <template v-for="(item, idx) in brandValues.accountInfo">
              <i-form label-position="left" :label-width="88" class="default-form" >
                <div class="form-group">
                  <div>
                    <FormItem label="账户名称" class="default-form-item" required>
                      <i-input v-model="item.accountName" placeholder="填写品牌公司全称（必填）"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <FormItem label="账户税号" class="default-form-item" required>
                      <i-input v-model="item.dutyParagraph" placeholder="填写品牌纳税人识别号（必填）"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <FormItem label="银行账号" class="default-form-item" required>
                      <i-input v-model="item.accountId" placeholder="填写开户行银行账号（必填）"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <FormItem label="开户行" class="default-form-item" required>
                      <i-input v-model="item.bankName" placeholder="填写开户行名称（必填）"></i-input>
                    </FormItem>
                  </div>
                </div>
              </i-form>
            </template>


            <div class="form-add g-ta-r">
              <a href="javascript:;" v-if="brandValues.accountInfo.length > 1" @click="delAccount">
                <Icon type="minus"></Icon>
                删除账户
              </a>
              <a href="javascript:;" @click="addAccount">
                <Icon type="plus"></Icon>
                添加账户
              </a>
            </div>
          </div>

          <div>
            <i-form label-position="left" :label-width="88" class="default-form" >
              <div class="form-group">
                <div>
                  <FormItem label="品牌微博" class="default-form-item">
                    <i-input v-model="brandValues.weibo" placeholder="填写品牌微博名称"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="品牌公众号" class="default-form-item">
                    <i-input v-model="brandValues.wechart" placeholder="填写品牌公众号"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="品牌官网" class="default-form-item">
                    <i-input v-model="brandValues.webSiteUrl" placeholder="填写品牌官网地址"></i-input>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="公司地址" class="default-form-item" required>
                    <i-input v-model="brandValues.address" placeholder="填写公司注册地址"></i-input>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>

          <div>
            <template v-for="item in brandValues.contactsInfo">
              <i-form label-position="left" :label-width="88" class="default-form" >
                <div class="form-group">
                  <div>
                    <Row>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系人姓名" class="default-form-item default-member-form" >
                          <i-input v-model="item.name" placeholder="填写联系人姓名" ></i-input>
                        </FormItem>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="性别" class="default-form-item default-member-form" >
                          <RadioGroup v-model="item.gender" size="large" class="default-form-radio-group" >
                            <Radio label="1" class="default-form-radio" style="width: 50%">
                              男
                            </Radio>
                            <Radio label="2" class="default-form-radio" style="width: 49%">
                              女
                            </Radio>
                          </RadioGroup>
                        </FormItem>
                      </i-col>
                    </Row>
                  </div>
                  <div>
                    <FormItem label="职务" class="default-form-item">
                      <i-input v-model="item.position" placeholder="填写联系人职务"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <Row>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系手机" class="default-form-item default-member-form" >
                          <i-input v-model="item.mobile" placeholder="填写联系人联系手机" ></i-input>
                        </FormItem>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系邮箱" class="default-form-item default-member-form" >
                          <i-input v-model="item.email" placeholder="填写联系人联系邮箱" ></i-input>
                        </FormItem>
                      </i-col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="联系固话" class="default-form-item default-member-form" >
                          <i-input v-model="item.phoneNo" placeholder="填写联系人联系固话" ></i-input>
                        </FormItem>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="补充说明" class="default-form-item default-member-form" >
                          <i-input v-model="item.addInfo" placeholder="若有补充填写在此" ></i-input>
                        </FormItem>
                      </i-col>
                    </Row>
                  </div>
                  <div>
                    <FormItem label="喜好" class="default-form-item">
                      <i-input v-model="item.hobby" placeholder="填写联系人喜好"></i-input>
                    </FormItem>
                  </div>
                  <div>
                    <Row>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="家乡" class="default-form-item default-member-form" >
                          <i-input v-model="item.hometown" placeholder="填写联系人家乡" ></i-input>
                        </FormItem>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <FormItem label="生日" class="default-form-item default-member-form" >
                          <DatePicker v-model="item.birthday" transfer class="deadline" type="date" placeholder="选择联系人生日" :clearable="false"></DatePicker>
                        </FormItem>
                      </i-col>
                    </Row>
                  </div>
                </div>
              </i-form>
            </template>

            <div class="form-add g-ta-r">
              <a href="javascript:;" @click="delContract" v-if="brandValues.contactsInfo.length > 1">
                <Icon type="minus"></Icon>
                删除联系人
              </a>
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
                  <FormItem label="签约公司" class="default-form-item" required>
                    <RadioGroup v-model="brandValues.ncCompanyId" size="large" class="default-form-radio-group" >
                      <Radio v-for="(radioItem, radioIndex) in brand.companys" :key="radioIndex" :label="radioItem.idAuto" class="default-form-radio" style="width: 50%">
                        {{radioItem.customerName}}
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </div>
                <div>
                  <FormItem label="品牌审核" class="default-form-item" required>
                    <div class="default-form-member-selection" >
                      <brand-audit-member :can-exit="allAudit.length > 1" content="选择审核人" :users="leaders" @on-change="changeAudit"></brand-audit-member>
                    </div>
                  </FormItem>
                </div>
              </div>
            </i-form>
          </div>
          <div class="submit-btn-box">
            <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">提交品牌</Button>
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
  import {Brand} from '../../API/api'
  import BrandAuditMember from '../../components/BrandAuditMember'
  import Toast from '../../components/popup/Toast'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  export default {
    components: {
      LoadDraftModal,
      LeaveModal,
      Toast,
      BrandAuditMember,
      BCrumb},
    name: 'add',
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
            label: '新建品牌'
          }
        ],
        toastMsg: null,
        toastStatus: null,
        isToast: false,
        allAudit: [],
        leaders: [],
        accountTpl: {
          accountName: null,
          accountId: null,
          bankName: null,
          dutyParagraph: null
        },
        contactTpl: {
          name: null, // 姓名
          position: null, // 职务
          gender: null, // 性别
          mobile: null, // 手机
          birthday: null, // 生日
          phoneNo: null, // 固话
          email: null, // 邮箱
          addInfo: null, // 补充
          hobby: null, // 喜好
          hometown: null // 家乡
        },
        brandValues: {
          customerName: null,
          industry: null,
          workState: null,
          accountInfo: [
            {
              accountName: null,
              accountId: null,
              bankName: null,
              dutyParagraph: null
            }
          ],
          weibo: null,
          wechart: null,
          webSiteUrl: null,
          address: null,
          contactsInfo: [
            {
              name: null, // 姓名
              position: null, // 职务
              gender: null, // 性别
              mobile: null, // 手机
              birthday: null, // 生日
              phoneNo: null, // 固话
              email: null, // 邮箱
              addInfo: null, // 补充
              hobby: null, // 喜好
              hometown: null // 家乡
            }
          ],
          ncCompanyId: null,
          auditId: null
        },
        brand: {
          cates: [
            // {
            //   id: '1',
            //   label: 'Food&Beverage'
            // },
            // {
            //   id: '2',
            //   label: 'Beauty&Fashion'
            // },
            // {
            //   id: '4',
            //   label: 'Auto Related'
            // },
            // {
            //   id: '3',
            //   // label: 'ACG（student）'
            //   label: 'NORMCORE Group'
            // },
            // {
            //   id: '5',
            //   label: 'Others'
            // }
          ],
          coop_status: [
            {
              id: '1',
              label: '接触中'
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
          companys: []
        }
      }
    },
    created () {
      this.getNcCompany()
      this.getIndustry()
      this.cacheMenu()
      this.getLeader()
      this.parserDraft()
    },
    computed: {
      currMenu () {
        return this.$store.state.index.currMenu
      }
    },
    methods: {
      cacheMenu () {
        this.menu = this.currMenu
      },
      getIndustry () {
        this.$http.post(Brand.type, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.brand.cates = _data.retData.data
          }
        })
      },
      submit () {
        let canPost = true
        if (!this.brandValues.ncCompanyId) {
          this.isToast = true
          this.toastMsg = '请选择签约公司'
          this.toastStatus = null
          canPost = false
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null
          }, 1500)
          return
        }
        if (!this.brandValues.workState) {
          this.isToast = true
          this.toastMsg = '请选择合作状态'
          this.toastStatus = null
          canPost = false
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null
          }, 1500)
          return
        }

        let contactsCount = 0
        for (let i = 0; i < this.brandValues.contactsInfo.length; i++) {
          let item = this.brandValues.contactsInfo[i]
          if (item.name && item.name.length > 0 && (item.phoneNo || item.mobile || item.email)) {
            contactsCount++
          }
        }

        if (contactsCount === 0) {
          this.isToast = true
          this.toastMsg = '请至少填写一位联系人的姓名和电话或固话或邮箱'
          this.toastStatus = null
          canPost = false
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null
          }, 1500)
        }

        this.brandValues.accountInfo.forEach((item) => {
          for (let key in item) {
            if (key === 'accountName' || key === 'accountId' || key === 'bankName' || key === 'dutyParagraph') {
              if (item[key] === '' || !item[key]) {
                this.isToast = true
                this.toastMsg = '请填写账户信息'
                this.toastStatus = null
                canPost = false
                setTimeout(() => {
                  this.isToast = false
                  this.toastStatus = null
                }, 1500)
                break
              }
            }

            if (!/^[\u4E00-\u9FA5\uFF00-\uFFEF]{1,}$/.test(item.bankName)) {
              this.isToast = true
              this.toastMsg = '开户行名称只能是中文'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
            if (item.dutyParagraph === item.accountId) {
              this.isToast = true
              this.toastMsg = '税号和银行卡号不能相同'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
            if (!/^\d+$/.test(item.accountId)) {
              this.isToast = true
              this.toastMsg = '银行卡号只能是数字'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
            if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(item.dutyParagraph)) {
              this.isToast = true
              this.toastMsg = '税号由15或者17或者18或者20位大写字母、数字组成'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
          }
        })

        this.brandValues.contactsInfo.forEach((item) => {
          let info = item
          for (let key in info) {
            if (key === 'mobile' && info[key] && info[key].length > 0 && !/^\d{11}$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '联系人手机为11位数字'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
            if (key === 'phoneNo' && info[key] && info[key].length > 0 && !/^(\d{7,8})(-(\d{3,}))?$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '联系人固话为7或8位数字（不包含区号）'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
            if (key === 'email' && info[key] && info[key].length > 0 && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(info[key])) {
              this.isToast = true
              this.toastMsg = '请输入正确的联系人邮箱'
              this.toastStatus = null
              canPost = false
              setTimeout(() => {
                this.isToast = false
                this.toastStatus = null
              }, 1500)
              break
            }
          }
        })

        if (!canPost) {
          return
        }
        this.$http.post(Brand.add, this.qs.stringify(this.brandValues), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '提交品牌成功'
            this.toastStatus = 'success'
            this.isSaved = true
            localStorage.removeItem('addBrand')
          } else {
            this.isToast = true
            let msg = ''
            for (let key in _data.retData) {
              msg = _data.retData[key][0]
            }
            if (!msg || msg === '') msg = _data.retMsg
            this.toastMsg = msg
            this.toastStatus = null
          }
          setTimeout(() => {
            this.isToast = false
            this.toastStatus = null
            if (_data.retCode === 0) {
              this.$router.push('/v2/resource/brand')
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.isSaved = true

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      changeAudit (v) {
        this.brandValues.auditId = v.id
      },
      getNcCompany () {
        this.$http.post(Brand.innerCustomer, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.brand.companys = _data.retData.data
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.isSaved = true
              this.$router.push('/')
            }
          }, 1500)
        })
      },
      getLeader () {
        this.$http.post(Brand.getLeader, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.leaders = [_data.retData.data[0]]
            this.allAudit = _data.retData.data
            this.brandValues.auditId = _data.retData.data[0].id
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.isSaved = true

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      addAccount () {
        let tpl = JSON.parse(JSON.stringify(this.accountTpl))
        this.brandValues.accountInfo.push(tpl)
      },
      delAccount () {
        this.brandValues.accountInfo.splice(this.brandValues.accountInfo.length - 1, 1)
      },
      addContact () {
        let tpl = JSON.parse(JSON.stringify(this.contactTpl))
        this.brandValues.contactsInfo.push(tpl)
      },
      delContract () {
        this.brandValues.contactsInfo.splice(this.brandValues.contactsInfo.length - 1, 1)
      },
      parserDraft () {
        this.isDraft = localStorage.hasOwnProperty('addBrand')
      },
      loadDraft () {
        const _draft = localStorage.getItem('addBrand')
        const draft = JSON.parse(_draft)
        this.brandValues = draft
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
        this.$store.dispatch('setCurrMenu', this.menu)
        sessionStorage.setItem('currMenu', this.menu)
        this.isLeaveConfirm = false

        // const rootMenu = document.getElementById('root_menu')

        // this.$nextTick(() => {
        //   rootMenu.__vue__.updateOpened()
        //   rootMenu.__vue__.updateActiveName()
        // })
      },
      saveLeavePage () {
        this.isSaved = true
        const brandData = JSON.stringify(this.brandValues)
        localStorage.setItem('addBrand', brandData)
        this.routerNext()
      },
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      }
    },
    beforeRouteLeave (to, from, next) {
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
    .form-add {
      margin-bottom: 16px;
      a {
        margin-left: 16px;
      }
    }
  }
</style>
