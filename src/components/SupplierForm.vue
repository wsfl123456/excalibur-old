<template>
  <div>
    <div>
      <i-form label-position="left" :label-width="88" class="default-form" >
        <div class="form-group">
          <div >
            <FormItem label="供应商名称" class="default-form-item" required>
              <i-input :readonly="isDisplay"  v-model="supplierValues.name" placeholder="填写供应商名称（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="供应商分类" class="default-form-item" required>
              <RadioGroup v-model="supplierValues.serviceType" size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in supplier.cates" :key="radioIndex" :label="+radioItem.id" class="default-form-radio" style="width: 33.333%">
                  {{radioItem.label}}
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <div v-if="+supplierValues.serviceType === 15">
            <FormItem label="Others备注" class="default-form-item">
              <i-input :readonly="isDisplay" v-model="supplierValues.serviceTypeOtherText" type="textarea" :autosize="{minRows: 1, maxRows: 7}" placeholder="备注内容"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="供应商状态" class="default-form-item" required>
              <RadioGroup v-model="supplierValues.workState"  size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in supplier.workState" :key="radioIndex" :label="+radioItem.id" class="default-form-radio" style="width: 33.333%">
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
              <i-input :readonly="isDisplay" v-model="supplierValues.accountName" placeholder="填写供应商公司全称（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="账户税号" class="default-form-item" required>
              <i-input :readonly="isDisplay" v-model="supplierValues.dutyParagraph" placeholder="填写供应商账户15位识别号（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="银行账号" class="default-form-item" required>
              <i-input :readonly="isDisplay" v-model="supplierValues.accountId" placeholder="填写开户行银行账号（必填）"></i-input>
            </FormItem>
          </div>
          <div>
            <FormItem label="开户行" class="default-form-item" required>
              <i-input :readonly="isDisplay" v-model="supplierValues.bankName" placeholder="填写开户行名称（必填）"></i-input>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>

    <div>
      <template v-for="item in supplierValues.contactInfo" >
        <i-form label-position="left" :label-width="88" class="default-form" >
          <div class="form-group">
            <div>
              <FormItem label="联系人" class="default-form-item" required>
                <i-input :readonly="isDisplay" v-model="item.contactName" placeholder="填写联系人姓名（必填）" ></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="联系地址" class="default-form-item" required>
                <i-input :readonly="isDisplay" v-model="item.contactAddress" placeholder="填写联系地址（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <Row>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="联系方式" class="default-form-item default-member-form" required>
                    <i-input :readonly="isDisplay" v-model="item.mobile" placeholder="填写联系方式（必填）" ></i-input>
                  </FormItem>
                </i-col>
                <i-col span="12" class="default-form-member-col">
                  <FormItem label="联系邮箱" class="default-form-item default-member-form" required>
                    <i-input :readonly="isDisplay" v-model="item.email" placeholder="填写联系邮箱（必填）" ></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
          </div>
        </i-form>
      </template>

      <div class="form-add g-ta-r g-mb-16" v-if="!isDisplay">
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
                <supplier-member :is-edit="!isDisplay" content="选择对接人" multi @on-change="selectSupplierUsers" :users="supplierValues.normcoreContactsInfo"></supplier-member>
              </div>
            </FormItem>
          </div>
          <div>
            <FormItem label="对方组织" class="default-form-item " required>
              <RadioGroup  v-model="supplierValues.organizationType"  size="large" class="default-form-radio-group" :class="{'display-radio': isDisplay}">
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in supplier.organization" :key="radioIndex" :label="+radioItem.id" class="default-form-radio" style="width: 33.333%">
                  {{radioItem.label}}
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <div>

            <FormItem label="签约公司" class="default-form-item " :class="{'display-radio': isDisplay}" required>
              <RadioGroup v-model="supplierValues.signCompanyId" size="large" class="default-form-radio-group" >
                <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in supplier.companys" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 50%">
                  {{radioItem.customerName}}
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>

        </div>
      </i-form>
    </div>

  </div>
</template>

<script>
  import {Supply, Index} from '../API/api'
  import SupplierMember from './SupplierMember'
  export default {
    components: {SupplierMember},
    name: 'supplier-form',
    props: {
      supplierValues: {
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
    methods: {
      addContact () {
        let tpl = this.contactTpl
        this.supplierValues.contactInfo.push(tpl)
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
      }
    },
    created () {
      this.getNcCompany()
      this.getAllEmployee()
    }

  }
</script>

<style scoped lang="less">

</style>
