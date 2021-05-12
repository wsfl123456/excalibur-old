<!--开票-->
<template>
  <div>
    <i-form ref="form" label-position="left" :label-width="120" class="default-form">
      <div class="contract-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="总金额" class="default-form-item" required>
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.totalMoney.value"
                  readonly
                  placeholder="请输入总金额"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税后工资" class="default-form-item">
                <i-input
                  :value="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.totalMoney.value * 1.06"
                  readonly
                  placeholder="请输入税后工资"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税率" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.taxRate.value"
                  readonly
                  placeholder="请输入税率"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司名称" class="default-form-item">
                <i-input
                  v-model="JSON.parse(formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.company.value).customerName"
                  readonly
                  placeholder="请输入公司名称"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="联系人" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.contactPerson.value"
                  readonly
                  placeholder="请输入联系人"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.accountName.value"
                  readonly
                  placeholder="请输入账户名称"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税号" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.taxNumber.value"
                  readonly
                  placeholder="请输入税号"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.openBank.value"
                  readonly
                  placeholder="请输入开户银行"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.openAccount.value"
                  readonly
                  placeholder="请输入开户账号"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司电话" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.companyMobile.value"
                  readonly
                  placeholder="请输入公司电话"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.billingInfo[0].basicInfo.companyAddress.value"
                  readonly
                  placeholder="请输入公司地址"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="申请人" class="default-form-item default-member-form" required>
                <div class="default-form-member-selection">
                  <template>
                    <member-add
                      :is-edit="false"
                      content="添加项目成员"
                      :users="[{headPic: formValue.operationInfo[0].operationHeadPic, userName: formValue.operationInfo[0].operationName}]"
                    ></member-add>
                  </template>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <div class="contract-btn">
      <Button type="ghost" class="btn ghost-btn" @click="edit()">编辑任务</Button>
    </div>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../MemberAdd";
import { Task } from "../../../API/api";
import Toast from "../../popup/Toast";

export default {
  name: "billing-edit",
  components: {
    MemberAdd,
    Toast
  },
  props: {
    activeVer: {
      type: [Number, String]
    },
    formValue: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    logList: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    projectInfo: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },

    isDisplay: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      toastMsg: "",
      isToast: false
    };
  },
  methods: {
    edit() {
      this.$router.push({
        path: "/tasks/edit/" + this.formValue.info.id
      });
    }
  }
};
</script>
<style lang="less" scoped>
.border-radius {
  border: 1px solid #ced4da;
  border-radius: 3px;
}
.contract-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .btn {
    margin-left: 10px;
    width: 140px;
    height: 48px;
    font-size: 14px;
    &:first-child {
      margin-left: 0;
    }
  }
  .ghost-btn {
    border: 1px solid #2d8ef8;
    color: #2d8ef8;
  }
}
</style>



