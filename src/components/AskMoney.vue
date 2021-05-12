<template>
  <div :class="{'display-form': isDisplay}">
    <i-form label-position="left" :label-width="88" class="default-form" >
      <div class="form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="合同名称" class="default-form-item default-member-form" required>
                <i-input v-if="isDisplay" disabled :value="formValue.taskName || formValue.id"></i-input>

                <Select v-else size="large" v-model="formValue.contractObj" transfer filterable placeholder="填写合同名称以供选择合同">
                  <Option v-for="item in allContract" :value="JSON.stringify(item)" :key="item.contactsCode">{{ item.taskName }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="期望时间" class="default-form-item default-member-form" required>
                <DatePicker :disabled="isDisplay" :options="dateOpt" format="yyyy-MM-dd HH:mm" transfer class="deadline" type="datetime" placeholder="设置期望时间" v-model="formValue.date" :clearable="false" @on-change="changeDate"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <FormItem label="付款事由" class="default-form-item" required>
          <i-input :disabled="isDisplay" type="textarea" :autosize="{minRows: 1, maxRows: 7}" v-model="formValue.reason" placeholder="填写付款原因"></i-input>
        </FormItem>
        <FormItem label="供应商名称" class="default-form-item">
          <i-input :disabled="isDisplay" readonly v-model="formValue.supplierName" placeholder="请选择合同"></i-input>
        </FormItem>
      </div>
    </i-form>
    <i-form label-position="left" :label-width="88" class="default-form" >
      <div class="form-group">
        <FormItem label="账户名称" class="default-form-item">
          <i-input readonly v-model="formValue.accountName" placeholder="请选择合同"></i-input>

        </FormItem>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户行信息" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.bankInfo" placeholder="请选择合同"></i-input>

              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item default-member-form">
                <i-input readonly v-model="formValue.bankAccount" placeholder="请选择合同"></i-input>

              </FormItem>
            </i-col>
          </Row>
        </div>
        <FormItem label="付款金额" class="default-form-item">
          <i-input v-model="formValue.price" placeholder="选择合同" readonly></i-input>
        </FormItem>
        <FormItem label="获取发票" class="default-form-item" required>
          <RadioGroup size="large" class="default-form-radio-group" v-model="formValue.invoice">
            <Radio :disabled="isDisplay" v-for="(radioItem, radioIndex) in invoiceConf" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 33.333%">
              {{radioItem.name}}
            </Radio>
          </RadioGroup>
        </FormItem>
      </div>
    </i-form>
  </div>

</template>

<script>
  export default {
    name: 'ask-money',
    props: {
      isDisplay: {
        type: Boolean,
        default: false
      },
      formLabel: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      formValue: {
        type: [Array, Object],
        default: function () {
          return {}
        }
      },
      allContract: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        contractObj: null,
        invoiceConf: [
          {
            id: '1',
            name: '已获取'
          },
          {
            id: '2',
            name: '未获取'
          },
          {
            id: '3',
            name: '无发票'
          }
        ]
      }
    },
    watch: {
      'formValue.contractObj': {
        handler (data) {
          this.formValue.id = JSON.parse(data).id
          this.formValue.supplierName = JSON.parse(data).companyName
          this.formValue.accountName = JSON.parse(data).companyAccountName
          this.formValue.bankInfo = JSON.parse(data).companyBankName
          this.formValue.bankAccount = JSON.parse(data).companyAccountId
          this.formValue.price = JSON.parse(data).contactsAccount
          this.formValue.taskName = JSON.parse(data).taskName
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
    }
  }
</script>

<style scoped lang="">

</style>
