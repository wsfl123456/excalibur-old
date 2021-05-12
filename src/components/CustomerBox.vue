<template>
  <i-form label-position="left" :label-width="88" class="default-form">
    <div class="form-group" v-if="type === 'customer'" >
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.customerName.label" class="default-form-item " required >
              <i-input v-if="isDisplay" disabled :value="formValue.customerName.value"></i-input>
              <Select size="large" v-model="customerObj" transfer filterable  v-else @on-change="changePartA">
                <Option v-for="item in customSelector" :value="JSON.stringify(item)" :key="item.id">{{ item.customerName }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.tel.label" class="default-form-item">
              <i-input v-model="formValue.tel.value"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.accountName.label" class="default-form-item ">
              <i-input v-model="formValue.accountName.value"></i-input>
            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.dutyParagraph.label" class="default-form-item">
              <i-input v-model="formValue.dutyParagraph.value"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.bankName.label" class="default-form-item ">
              <i-input v-model="formValue.bankName.value"></i-input>
            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.accountId.label" class="default-form-item">
              <i-input v-model="formValue.accountId.value" ></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="24" class="">
            <FormItem :label="formValue.address.label" class="default-form-item ">
              <i-input v-model="formValue.address.value" ></i-input>
            </FormItem>
          </i-col>

        </Row>
      </div>
    </div>

    <div class="form-group" v-if="type === 'company'" >
      <div v-if="!isDisplay && isFilter">
        <FormItem :label="'品类'" class="default-form-item " required>
          <Select size="large" v-model="customerType" transfer filterable @on-change="getPartB">
            <Option v-for="item in customerTypeList" :value="item.id" :key="item.idAuto">{{ item.label }}</Option>
          </Select>
        </FormItem>
      </div>
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.companyName.label" class="default-form-item " required>
              <i-input v-if="isDisplay" disabled :value="formValue.companyName.value"></i-input>
              <Select size="large" v-model="companyObj" transfer filterable v-else>
                <template v-if="isFilter">
                  <template v-if="allCustomSelector.length > 0" >
                    <Option v-for="item in allCustomSelector" :value="JSON.stringify(item)" :key="item.id">{{ item.customerName }}</Option>
                  </template>
                  <template v-else>
                    <Option value="none" disabled>没有供应商</Option>
                  </template>
                </template>
                <template v-else>
                  <template v-if="fromPartACustomSelector.length > 0" >
                    <Option v-for="item in fromPartACustomSelector" :value="JSON.stringify(item)" :key="item.id">{{ item.customerName }}</Option>
                  </template>
                  <template v-else>
                    <Option disabled value="none">请先选择甲方</Option>
                  </template>
                  <!--<Option v-for="item in customSelector" :value="JSON.stringify(item)" :key="item.id">{{ item.customerName }}</Option>-->
                </template>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.companyTel.label" class="default-form-item">
              <i-input v-model="formValue.companyTel.value"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.companyAccountName.label" class="default-form-item ">
              <i-input v-model="formValue.companyAccountName.value"></i-input>

            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.companyDutyParagraph.label" class="default-form-item">
              <i-input v-model="formValue.companyDutyParagraph.value"></i-input>

            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="12" class="default-form-member-col">
            <FormItem :label="formValue.companyBankName.label" class="default-form-item ">
              <i-input v-model="formValue.companyBankName.value"></i-input>

            </FormItem>
          </i-col>
          <i-col span="12" class="default-form-member-col" >
            <FormItem :label="formValue.companyAccountId.label" class="default-form-item">
              <i-input v-model="formValue.companyAccountId.value" ></i-input>

            </FormItem>
          </i-col>
        </Row>
      </div>
      <div>
        <Row>
          <i-col span="24" class="">
            <FormItem :label="formValue.companyAddress.label" class="default-form-item ">
              <i-input v-model="formValue.companyAddress.value"></i-input>

            </FormItem>
          </i-col>

        </Row>
      </div>
    </div>
  </i-form>

</template>

<script>
  import {Task} from '../API/api'

  export default {
    name: 'customer-box',
    props: {
      projectId: {
        type: [Number, String],
        default: 0
      },
      taskCustomer: {
        type: [Number, String],
        default: 0
      },
      isDisplay: {
        type: Boolean,
        default: false
      },
      isFilter: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: ''
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      customSelector: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      companySelector: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        allCustomSelector: [],
        customerType: this.formValue.serviceType || '',
        customerTypeList: [
          {
            id: '0',
            label: '全部'
          },
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
        selected: '',
        customerObj: this.formValue.customerObj || '',
        companyObj: this.formValue.companyObj || ''
      }
    },
    computed: {
      fromPartACustomSelector () {
        return this.$store.state.tasks.fromPartACustomSelector
      }
    },
    methods: {
      changePartA (data) {
        // console.log(data)
        const _data = JSON.parse(data)
        console.log('change part A', _data)
        this.formValue.customerName.value = _data.customerName
        this.formValue.customerId = _data.id
        this.formValue.tel.value = _data.tel
        this.formValue.accountName.value = _data.accountName
        this.formValue.dutyParagraph.value = _data.dutyParagraph
        this.formValue.bankName.value = _data.bankName
        this.formValue.accountId.value = _data.accountId
        this.formValue.address.value = _data.address
        this.formValue.customerObj = data
        this.switchCompany()
      },
      getPartB () {
        if (this.isFilter) {
          this.formValue.serviceType = this.customerType
          this.$http.post(Task.classPartB, this.qs.stringify({serviceType: this.customerType}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            const data = res.data
            if (data.retCode === 0) {
              this.allCustomSelector = data.retData.data
            }
          })
          console.log('class part b', this.formValue, this.customerType)
        } else {
          if (this.formValue.customerObj) {
            console.log('init companySelector', this.companySelector)
            this.changePartA(this.formValue.customerObj)
          }
        }
      },
      switchCompany () {
        console.log('switch company', this.formValue.customerId, this.taskCustomer, JSON.parse(this.formValue.customerObj).idAuto)
        if (JSON.parse(this.formValue.customerObj).idAuto === this.taskCustomer) {
          this.$http.post(Task.innerCustomerNC, this.qs.stringify({customerId: this.taskCustomer, projectId: this.projectId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            const _data = res.data
            if (_data.retCode === 0) {
              this.$store.dispatch('tasksSetCompany', _data.retData.data)
            }
          })
        } else {
          console.log('not equal', this.companySelector)
          this.$store.dispatch('tasksSetCompany', this.companySelector)
        }
      }
    },
    created () {
      this.getPartB()
    },
    watch: {
      // customerObj: {
      //   handler (data) {
      //     let _data
      //     if (data) _data = JSON.parse(data)
      //     console.log(_data)
      //     this.formValue.customerName.value = _data.customerName
      //     this.formValue.customerId = _data.idAuto
      //     this.formValue.tel.value = _data.tel
      //     this.formValue.accountName.value = _data.accountName
      //     this.formValue.dutyParagraph.value = _data.dutyParagraph
      //     this.formValue.bankName.value = _data.bankName
      //     this.formValue.accountId.value = _data.accountId
      //     this.formValue.address.value = _data.address
      //     this.formValue.customerObj = data
      //   }
      // },
      companySelector: {
        handler (data) {
          this.getPartB()
        }
      },
      companyObj: {
        handler (data) {
          let _data
          if (data) _data = JSON.parse(data)
          console.log(_data)
          this.formValue.companyName.value = _data.customerName
          this.formValue.companyId = _data.id
          this.formValue.companyTel.value = _data.tel
          this.formValue.companyAccountName.value = _data.accountName
          this.formValue.companyDutyParagraph.value = _data.dutyParagraph
          this.formValue.companyBankName.value = _data.bankName
          this.formValue.companyAccountId.value = _data.accountId
          this.formValue.companyAddress.value = _data.address
          this.formValue.companyObj = data
        }
      }
    }
  }
</script>

<style scoped lang="less">
</style>
