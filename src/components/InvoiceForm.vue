<template>
  <div :class="{'display-form': isDisplay}">
    <i-form label-position="left" :label-width="88" class="default-form" >
      <div class="form-group">
        <FormItem label="开票内容" class="default-form-item" required>
          <RadioGroup size="large" class="default-form-radio-group" v-model="formValue.info">
            <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in invoiceConf" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
              {{radioItem.label}}
            </Radio>
          </RadioGroup>
        </FormItem>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="报价单名" class="default-form-item default-member-form" required>
                <!--<i-input v-if="isDisplay" type="textarea" :rows="1" disabled :value="JSON.parse(formValue.invoiceObj).taskName"></i-input>-->
                <i-input v-if="isDisplay" disabled :value="JSON.parse(formValue.invoiceObj).taskName"></i-input>

                <Select transfer v-else size="large" v-model="invoiceObj" filterable placeholder="填写报价单名以供选择报价单">
                  <Option v-for="item in allInvoice" :value="JSON.stringify(item)" :key="item.contactsCode">{{ item.taskName }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="期望时间" class="default-form-item default-member-form" required>
                <DatePicker :options="dateOpt" :disabled="isDisplay" format="yyyy-MM-dd HH:mm" transfer class="deadline" type="datetime" placeholder="设置期望时间" v-model="formValue.date" :clearable="false" @on-change="changeDate"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税后金额" class="default-form-item default-member-form">
                <i-input readonly :disabled="isDisplay" v-model="formValue.price" placeholder="请选择报价单"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税率%" class="default-form-item default-member-form">
                <i-input readonly :disabled="isDisplay" v-model="formValue.rate" placeholder="请选择报价单"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <i-form label-position="left" :label-width="88" class="default-form" >
      <div class="form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司名称" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.name" placeholder="请选择报价单"></i-input>

              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司电话" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.tel" placeholder="请选择报价单"></i-input>

              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.accountName" placeholder="请选择报价单"></i-input>

              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户税号" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.duty" placeholder="请选择报价单"></i-input>

              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.bank" placeholder="请选择报价单"></i-input>

              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.bankAccount" placeholder="请选择报价单"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <FormItem label="公司地址" class="default-form-item">
          <i-input v-model="formValue.addr" placeholder="选择报价单" readonly></i-input>
        </FormItem>
      </div>
    </i-form>
  </div>
</template>

<script>
  export default {
    name: 'invoice-form',
    props: {
      allInvoice: {
        type: Array,
        default: function () {
          return []
        }
      },
      isDisplay: {
        type: Boolean,
        default: false
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return []
        }
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return []
        }
      }
    },
    methods: {
      changeDate (value) {
        if (value.indexOf('00:00') >= 0) {
          value = value.replace('00:00', '10:00')
        }
        this.formValue.date = value
      }
    },
    data () {
      return {
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        invoiceObj: this.formValue.invoiceObj || '',
        invoiceConf: [
          {
            label: '服务费',
            id: '1'
          },
          {
            label: '广告费',
            id: '2'
          },
          {
            label: '设计费',
            id: '3'
          }
        ]
      }
    },

    watch: {

      invoiceObj: {
        handler (data) {
          let _data = JSON.parse(data)
          // this.formValue.
          this.formValue.id = _data.contactsCode
          this.formValue.price = _data.contactsAccount
          // this.formValue.rate = _data.taxRate
          this.formValue.rate = `6`
          this.formValue.name = _data.customerName
          this.formValue.tel = _data.tel
          this.formValue.accountName = _data.accountName
          this.formValue.duty = _data.dutyParagraph
          this.formValue.bank = _data.bankName
          this.formValue.bankAccount = _data.accountId
          this.formValue.addr = _data.address
          this.formValue.invoiceObj = data
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
