<template>
  <div>
    <div>
      <i-form label-position="left" :label-width="88" class="default-form" >
        <div class="form-group">
          <div >
            <FormItem label="品牌名称" class="default-form-item" required>
              <i-input :readonly="isDisplay" v-model="brandValues.customerName" placeholder="填写品牌名称（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="品牌分类" class="default-form-item" required>
              <RadioGroup  v-model="brandValues.industry" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in brand.cates" :key="radioIndex" :label="+radioItem.id" class="default-form-radio" style="width: 33.333%">
                  {{radioItem.industryName}}
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <div>
            <FormItem label="合作状态" class="default-form-item" required>
              <RadioGroup v-model="brandValues.workState" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in brand.coop_status" :key="radioIndex" :label="+radioItem.id" class="default-form-radio" style="width: 33.333%">
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
                <i-input :readonly="isDisplay" v-model="item.accountName" placeholder="填写品牌公司全称（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="账户税号" class="default-form-item" required>
                <i-input :readonly="isDisplay" v-model="item.dutyParagraph" placeholder="填写品牌纳税人15位识别号（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="银行账号" class="default-form-item" required>
                <i-input :readonly="isDisplay" v-model="item.accountId" placeholder="填写开户行银行账号（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="开户行" class="default-form-item" required>
                <i-input :readonly="isDisplay" v-model="item.bankName" placeholder="填写开户行名称（必填）"></i-input>
              </FormItem>
            </div>
          </div>
        </i-form>
      </template>

      <div class="form-add g-ta-r" v-if="!isDisplay">
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
              <i-input :readonly="isDisplay" v-model="brandValues.weibo" placeholder="填写品牌微博名称"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="品牌公众号" class="default-form-item">
              <i-input :readonly="isDisplay" v-model="brandValues.wechart" placeholder="填写品牌公众号"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="品牌官网" class="default-form-item">
              <i-input :readonly="isDisplay" v-model="brandValues.webSiteUrl" placeholder="填写品牌官网地址"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="公司地址" class="default-form-item" required>
              <i-input :readonly="isDisplay" v-model="brandValues.address" placeholder="填写公司注册地址"></i-input>
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
                    <i-input :readonly="isDisplay" v-model="item.name" placeholder="填写联系人姓名" ></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="性别" class="default-form-item default-member-form" >
                    <RadioGroup  v-model="item.gender" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                      <Radio :disabled="isDisplay" label="1" class="default-form-radio" style="width: 50%">
                        男
                      </Radio>
                      <Radio :disabled="isDisplay" label="2" class="default-form-radio" style="width: 49%">
                        女
                      </Radio>
                    </RadioGroup>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <FormItem label="职务" class="default-form-item">
                <i-input :readonly="isDisplay" v-model="item.position" placeholder="填写联系人职务"></i-input>
              </FormItem>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="联系手机" class="default-form-item default-member-form" >
                    <i-input :readonly="isDisplay" v-model="item.mobile" placeholder="填写联系人联系手机" ></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="联系邮箱" class="default-form-item default-member-form" >
                    <i-input :readonly="isDisplay" v-model="item.email" placeholder="填写联系人联系邮箱" ></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="联系固话" class="default-form-item default-member-form" >
                    <i-input :readonly="isDisplay" v-model="item.phoneNo" placeholder="填写联系人联系固话" ></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="补充说明" class="default-form-item default-member-form" >
                    <i-input :readonly="isDisplay" v-model="item.addInfo" placeholder="若有补充填写在此" ></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <FormItem label="喜好" class="default-form-item">
                <i-input :readonly="isDisplay" v-model="item.hobby" placeholder="填写联系人喜好"></i-input>
              </FormItem>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="家乡" class="default-form-item default-member-form" >
                    <i-input :readonly="isDisplay" v-model="item.hometown" placeholder="填写联系人家乡" ></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="生日" class="default-form-item default-member-form" >
                    <DatePicker :readonly="isDisplay" v-model="item.birthday" transfer class="deadline" type="date" placeholder="选择联系人生日" :clearable="false"></DatePicker>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </div>
        </i-form>
      </template>

      <div class="form-add g-ta-r" v-if="!isDisplay">
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
            <FormItem v-if="!brandValues.type || brandValues.type !== 2" label="签约公司" class="default-form-item" required>
              <template v-if="isDisplay">
                <i-input :value="brandValues.ncCompanyName" readonly></i-input>
              </template>
              <template v-else>
                <RadioGroup v-model="brandValues.ncCompanyId" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                  <Radio v-for="(radioItem, radioIndex) in brand.companys" :key="radioIndex" :label="radioItem.idAuto" class="default-form-radio" style="width: 50%">
                    {{radioItem.customerName}}
                  </Radio>
                </RadioGroup>
              </template>

            </FormItem>
          </div>
          <div>
            <FormItem label="品牌审核" class="default-form-item" required>
              <div class="default-form-member-selection" >
                <brand-audit-member :is-edit="!isDisplay" :can-exit="allAudit.length > 1" content="选择审核人" :users="leaders" @on-change="changeAudit" ></brand-audit-member>
              </div>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>

  </div>
</template>

<script>
  import BrandAuditMember from './BrandAuditMember'
  import {Brand} from '../API/api'
  export default {
    components: {BrandAuditMember},
    name: 'brand-form',
    props: {
      brandValues: {
        type: [Object, Array],
        default: function () {
          return {}
        }
      },
      isDisplay: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        leaders: [],
        allAudit: [],
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
    methods: {
      getIndustry () {
        this.$http.post(Brand.type, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.brand.cates = _data.retData.data
          }
        })
      },
      changeAudit (v) {
        this.brandValues.auditId = v.id
      },
      delAccount () {
        this.brandValues.accountInfo.splice(this.brandValues.accountInfo.length - 1, 1)
      },
      addAccount () {
        let tpl = JSON.parse(JSON.stringify(this.accountTpl))
        this.brandValues.accountInfo.push(tpl)
      },
      delContract () {
        this.brandValues.contactsInfo.splice(this.brandValues.contactsInfo.length - 1, 1)
      },
      addContact () {
        let tpl = JSON.parse(JSON.stringify(this.contactTpl))
        this.brandValues.contactsInfo.push(tpl)
      },
      getNcCompany () {
        this.$http.post(Brand.innerCustomer, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.brand.companys = _data.retData.data
          }
        })
      },
      getLeader () {
        this.$http.post(Brand.getLeader, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.brandValues.hasOwnProperty('auditInfo')) {
              this.leaders = [this.brandValues.auditInfo]
            } else {
              this.leaders = [_data.retData.data[0]]
            }
            console.log('leaders', this.leaders)
            this.allAudit = _data.retData.data
            this.brandValues.auditId = _data.retData.data[0].id
          }
        })
      }
    },
    watch: {
      brandValues: {
        handler (data) {
          this.getNcCompany()
          this.getLeader()
          this.getIndustry()
        }
      }
    },
    updated () {
      // this.getNcCompany()
      // this.getLeader()
    },
    mounted () {
      // this.getNcCompany()
      // this.getLeader()
    },
    created () {
      // this.getNcCompany()
      // this.getLeader()
    }

  }
</script>

<style scoped lang="less">

</style>
