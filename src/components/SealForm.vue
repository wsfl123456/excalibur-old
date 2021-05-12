<template>
  <div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <FormItem label="合同类型" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '合同类型'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}

                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <RadioGroup size="large" class="default-form-radio-group" v-model="formValue.type" :class="{'display-radio': isDisplay}" @on-change="changeType">
            <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in sealConf.type" :key="radioIndex" :label="radioItem.label" class="default-form-radio" style="width: 33.333%">
              {{radioItem.label}}
            </Radio>
          </RadioGroup>
        </FormItem>
      </div>
    </i-form>

    <div class="g-mb-16" v-if="!isDisplay">
      是否人工输入以下信息：
      <i-switch v-model="isManually">
        <span slot="open">是</span>
        <span slot="close">否</span>
      </i-switch>
    </div>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group" v-if="!isManually">
        <FormItem label="合同名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '合同名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.name_show"></i-input>
          <Select transfer v-else size="large" v-model="contractObj" filterable placeholder="填写合同名称选择合同" >
            <template v-if="selectList.length > 0">
              <Option v-for="item in selectList" :value="JSON.stringify(item)" :key="item.contactsCode">{{ item.taskName }}</Option>
            </template>
            <template v-else>
              <Option value="0" disabled>{{'请先选择合同类型'}}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem v-if="isDisplay" label="合同编号" class="default-form-item">

          <i-input readonly :value="contactsCode"></i-input>
        </FormItem>
        <FormItem label="甲方名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '甲方名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.partyA_show"></i-input>
          <i-input v-else readonly v-model="formValue.partyA" placeholder="请选择合同"></i-input>
        </FormItem>
        <FormItem label="乙方名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '乙方名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.partyB_show"></i-input>
          <i-input v-else readonly v-model="formValue.partyB" placeholder="请选择合同"></i-input>
        </FormItem>
        <FormItem label="合同金额" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '合同金额'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input readonly v-model="formValue.price" placeholder="请选择合同"></i-input>
        </FormItem>
      </div>

      <div class="form-group" v-else>
        <FormItem label="合同名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '合同名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.name_show"></i-input>

          <i-input v-else v-model="formValue.name" placeholder="填写合同名称"></i-input>
        </FormItem>
        <FormItem v-if="isDisplay" label="合同编号" class="default-form-item">
          <i-input readonly :value="contactsCode"></i-input>
        </FormItem>
        <FormItem label="甲方名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '甲方名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.partyA_show"></i-input>
          <Select id="partyAOptSel" ref="partyAOptSel" transfer v-else size="large" v-model="formValue.partyA" filterable placeholder="请选择甲方" @on-change="changeParty('partyA_show', 'partyAOptSel')">
            <Option ref="partyAOpt" v-for="item in allPartA" :value="item.customerId" :key="item.customerId" :data-name="item.customerName" :data-id="item.idAuto">{{ item.customerName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="乙方名称" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '乙方名称'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-if="isDisplay" readonly :value="formValue.partyB_show"></i-input>

          <Select ref="partyBOptSel" transfer v-else size="large" v-model="formValue.partyB" filterable placeholder="请选择乙方" @on-change="changeParty('partyB_show', 'partyBOptSel')">
            <template v-if="partBOpts.length === 0">
              <Option ref="partyBOpt" disabled value="" >请先选择甲方</Option>
            </template>
            <template v-else>
              <Option ref="partyBOpt" v-for="item in partBOpts" :value="item.id" :key="item.id" :data-name="item.customerName" :data-id="item.idAuto">{{ item.customerName }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="合同金额" class="default-form-item" required>
          <template v-for="tipsItem in tips">
            <div class="group-tips" v-if="tipsItem.name === '合同金额'">
              <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
              <div class="tips-pop">
                <div class="tips-head">
                  {{tipsItem.name}}
                  <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                    <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                  </router-link>
                </div>
                <div class="tips-body">
                  <div v-html="tipsItem.content"></div>
                </div>
              </div>
            </div>
          </template>
          <i-input v-model="formValue.price" placeholder="请填写合同金额"></i-input>
        </FormItem>
      </div>
    </i-form>
  </div>

</template>

<script>
  import {Task} from '../API/api'

  export default {
    name: 'seal-form',
    props: {
      isDisplay: {
        type: Boolean,
        default: false
      },
      projectId: {
        type: [Number, String]
      },
      customerId: {
        type: [Number, String]
      },
      customerName: {
        type: String
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      tips: {
        type: Array,
        default () {
          return []
        }
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      contactsCode: {
        type: String
      },
      allContract: {
        type: Array,
        default: function () {
          return []
        }
      },
      allQuotation: {
        type: Array,
        default () {
          return []
        }
      },
      allPartA: {
        type: Array,
        default: function () {
          return []
        }
      },
      allPartB: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        isManually: false,
        contractObj: '',
        selectList: [],
        partBOpts: this.allPartB,
        sealConf: {
          type: [
            {id: '1', label: '客户合同'},
            {id: '2', label: '声明'},
            {id: '3', label: '报价单'},
            {id: '4', label: '外发合同'},
            {id: '5', label: '保密协议'},
            {id: '6', label: '其他'}
          ]
        }
      }
    },
    methods: {
      changeParty (field, ref, data) {
        if (field === 'partyA_show') {
          if (this.$refs[ref].query === this.customerName) {
            this.$http.post(Task.innerCustomerNC, this.qs.stringify({customerId: this.customerId, projectId: this.projectId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
              const _data = res.data
              if (_data.retCode === 0) {
                this.partBOpts = []
                this.partBOpts = _data.retData.data
              }
            })
          } else {
            this.partBOpts = []
            this.partBOpts = this.allPartB.map((item) => {
              return item
            })
          }
        }

        this.formValue[field] = this.$refs[ref].selectedSingle
        // this.formValue[field] = data
      },

      changeType (data) {
        if (data === '报价单') {
          this.selectList = this.allQuotation
        } else {
          this.selectList = this.allContract
        }
        this.formValue.name = ''
        this.formValue.partyA = ''
        this.formValue.partyB = ''
        this.formValue.price = ''
        this.formValue.contractObj = ''
        this.contractObj = ''
      },
      formatReset () {
        if (this.formValue.isManually === 'true') {
          this.isManually = true
          this.formValue.name_code = this.formValue.name
          this.formValue.name = this.formValue.name_show
          this.formValue.partyA = this.formValue.partyA || ''
          this.formValue.partyB = this.formValue.partyB || ''
          this.partBOpts = this.allPartB

          if (this.formValue.partyA_show === this.customerName) {
            this.$http.post(Task.innerCustomerNC, this.qs.stringify({customerId: this.customerId, projectId: this.projectId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
              const _data = res.data
              if (_data.retCode === 0) {
                this.partBOpts = _data.retData.data
              }
            })
          }
        } else {
          this.isManually = false
          this.formValue.partyA = this.formValue.partyA_show
          this.formValue.partyB = this.formValue.partyB_show
          this.contractObj = this.formValue.contractObj
        }
      }
    },
    watch: {
      allPartB: {
        handler (data) {
          if (this.formValue.partyA_show !== this.customerName) {
            this.partBOpts = data
          }
        }
      },
      contractObj: {
        handler (data) {
          let _data = JSON.parse(data)
          this.formValue.name = _data.contactsCode
          this.formValue.partyA = _data.customerName
          this.formValue.partyB = _data.companyName
          this.formValue.price = _data.contactsAccount
          this.formValue.contractObj = data
        }
      },
      isManually: {
        handler (data) {
          if (!this.isDisplay) {
            this.formValue.isManually = data
            // this.formValue.name = ''
            // this.formValue.partyA = ''
            // this.formValue.partyB = ''
            // this.formValue.price = ''
          }
        }
      }
    },
    created () {
      // this.formatReset()
    },
    mounted () {
      this.$nextTick(() => {
        this.formatReset()
      })
    }
  }
</script>

<style scoped lang="">

</style>
