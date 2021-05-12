<!--开票-->
<template>
  <div class="financeToolkit">
    <i-form ref="form" label-position="left" :label-width="120" class="default-form">
      <div style="margin-bottom:20px">
        <Row :gutter="30">
          <i-col span="12">
            <div class="form-require">选择合同</div>
            <div>
              <Select
                v-model="formValue.billingInfo[0].basicInfo.contractId.value"
                :disabled="$route.query.id ? true : false"
                style="width:100%"
                placeholder="请选择合同"
              >
                <Option
                  v-for="(item, index) in relateContractList"
                  :key="index"
                  :value="String(item.hetongId)"
                >{{item.taskName}}</Option>
              </Select>
            </div>
          </i-col>
          <i-col span="12">
            <div class="form-require">选择项目结算单</div>
            <div>
              <Select
                v-if="formValue.billingInfo[0].basicInfo.contractId.value"
                v-model="formValue.billingInfo[0].basicInfo.quotationId.value"
                @on-change="changeQuotation"
                multiple
                style="width:100%"
                placeholder="请选择项目结算单"
              >
                <Option
                  v-for="(item, index) in quotationList"
                  :key="index"
                  :value="String(item.baojiadanId)"
                >{{item.taskName}}</Option>
              </Select>
              <Select
                v-else
                v-model="formValue.billingInfo[0].basicInfo.quotationId.value"
                style="width:100%"
                placeholder="请选择项目结算单"
              >
                <Option disabled value="none">请先选择合同</Option>
              </Select>
            </div>
          </i-col>
        </Row>
      </div>
      <div class="contract-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="总金额" class="default-form-item" required>
                <i-input
                  :value="formatMoney(formValue.billingInfo[0].basicInfo.totalMoney.value)"
                  placeholder="请输入总金额"
                  @input="moneyChange"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税前金额" class="default-form-item">
                <i-input
                  :value="nofaxMoney"
                  readonly
                  placeholder="请输入税前金额"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税率" class="default-form-item">
                <i-input
                  v-model="formValue.billingInfo[0].basicInfo.taxRate.value"
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
                  v-model="JSON.parse(contractsPartyA.name.value).accountName"
                  readonly
                  placeholder="请输入公司名称"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="联系人" class="default-form-item">
                <i-input
                  v-model="contractsPartyA.contactPerson.value"
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
                <i-input v-model="contractsPartyA.accountName.value" readonly placeholder="请输入账户名称"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税号" class="default-form-item">
                <i-input v-model="contractsPartyA.accountTaxNum.value" readonly placeholder="请输入税号"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input v-model="contractsPartyA.openBank.value" readonly placeholder="请输入开户银行"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input v-model="contractsPartyA.openAccount.value" readonly placeholder="请输入开户账号"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司电话" class="default-form-item">
                <i-input
                  v-model="contractsPartyA.companyMobile.value"
                  readonly
                  placeholder="请输入公司电话"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input
                  v-model="contractsPartyA.companyAddress.value"
                  readonly
                  placeholder="请输入公司地址"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <div style="text-align:center">
      <Button
        type="primary"
        class="submit-btn form-default-btn"
        size="large"
        @click.native="financeSubmit"
      >提交</Button>
    </div>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../MemberAdd";
import { Task } from "../../../API/api";
import Toast from "../../popup/Toast";
import { thousandSplit } from "../../../util/util.js"

export default {
  name: "billing-edit",
  components: {
    MemberAdd,
    Toast
  },
  computed: {
    // totalMoney () {
    //   var total = 0;
    //   this.quotationList.forEach(element => {
    //     if (this.formValue.billingInfo[0].basicInfo.quotationId.value.indexOf(String(element.baojiadanId)) != -1) {
    //       total += Number(element.priceMeal)
    //     }
    //   })
    //   return total
    // },
    contract() {
      if (this.$route.query.id) {
        this.formValue.billingInfo[0].basicInfo.contractId.value = String(
          this.$route.query.id
        );
      }
      return this.formValue.billingInfo[0].basicInfo.contractId.value;
    }
  },
  props: {
    formValue: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },
    projectInfo: {
      type: [Object, Array]
    },
    operationInfo: {
      type: [Object]
    },
    isAdd: {
      type: [Boolean],
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      toastMsg: "",
      isToast: false,
      canSubmit: true,
      relateContractList: [],
      quotationList: [],
      contractsPartyA: {
        name: {
          value: "{}"
        },
        contactPerson: {
          value: ""
        },
        accountName: {
          value: ""
        },
        accountTaxNum: {
          value: ""
        },
        openBank: {
          value: ""
        },
        openAccount: {
          value: ""
        },
        companyMobile: {
          value: ""
        },
        companyAddress: {
          value: ""
        }
      },
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      nofaxMoney : 0,
      financeValue: {
        projectId: this.$route.params.projectId,
        productId: this.$route.params.productId,
        toolkitId: this.$route.params.toolkitId,
        taskName: null,
        hetongId: null,
        baojiadanId: [],
        taskForm: [],
        operationInfo: [],
        priceMeal: null
      }
    };
  },
  methods: {
    changeActualTotal(val) {
      const filterVal = val.replace(/[^\-?\d.]/g,'')     //只保留数字和.
      const twoDigitsVal = Math.round(filterVal * 100) / 100     //保留两位小数
      this.actualTotal = twoDigitsVal
    },
    formatMoney(m) {
      return isNaN(m) ? '' : thousandSplit(Math.round(m * 100) / 100 + '');
    },
    moneyChange(val) {
      const filterVal = val.replace(/[^\-?\d.]/g,'')     //只保留数字和.
      const twoDigitsVal = Math.round(filterVal * 100) / 100     //保留两位小数
      this.formValue.billingInfo[0].basicInfo.totalMoney.value = twoDigitsVal
    },
    changeQuotation(val) {
      let total = 0;
      let noFax = 0;
      this.quotationList.forEach(element => {
        if (val.indexOf(String(element.baojiadanId)) != -1) {
          total += Number(element.priceMeal);
          noFax += Number(element.priceNoTax);
        }
      });
      this.formValue.billingInfo[0].basicInfo.totalMoney.value = total;
      this.nofaxMoney = noFax;
    },
    getContractInfo(id) {
      let formData = {
        taskId: id
      };
      this.$http
        .post(Task.detail, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.contractsPartyA =
            res.data.retData.data.formInfo[0].formContent.contractsInfo.partyA;
        });
    },
    getQuotationList(id) {
      let formData = {
        hetongId: id,
        flowState: 2
      };
      this.$http
        .post(Task.contactbaojiadanlist, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.quotationList = res.data.retData.data;
        });
    },
    getContractList() {
      let formData = {
        projectId:
          this.$route.params.projectId ||
          this.projectInfo.projectInfo.projectId,
        toolkitId: 16,
        forUserId: 1,
        flowState: 2
      };
      this.$http
        .post(Task.contactlistnew, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.relateContractList = res.data.retData.data;
          if (this.$route.query.id) {
            this.formValue.billingInfo[0].basicInfo.relateContractId = String(
              this.$route.query.id
            );
          }
        });
    },
    financeSubmit() {
      this.formValue.operationInfo[0].operationId = this.userInfo.id;
      this.financeValue.hetongId = this.formValue.billingInfo[0].basicInfo.contractId.value;
      this.financeValue.baojiadanId = this.formValue.billingInfo[0].basicInfo.quotationId.value;
      this.financeValue.priceMeal = this.formValue.billingInfo[0].basicInfo.totalMoney.value;
      this.financeValue.taskForm = JSON.parse(JSON.stringify(this.formValue));
      this.financeValue.taskForm.billingInfo[0].basicInfo.company = this.contractsPartyA.name;
      this.financeValue.taskForm.billingInfo[0].basicInfo.contactPerson = this.contractsPartyA.contactPerson;
      this.financeValue.taskForm.billingInfo[0].basicInfo.accountName = this.contractsPartyA.accountName;
      this.financeValue.taskForm.billingInfo[0].basicInfo.taxNumber = this.contractsPartyA.accountTaxNum;
      this.financeValue.taskForm.billingInfo[0].basicInfo.openBank = this.contractsPartyA.openBank;
      this.financeValue.taskForm.billingInfo[0].basicInfo.openAccount = this.contractsPartyA.openAccount;
      this.financeValue.taskForm.billingInfo[0].basicInfo.companyMobile = this.contractsPartyA.companyMobile;
      this.financeValue.taskForm.billingInfo[0].basicInfo.companyAddress = this.contractsPartyA.companyAddress;
      this.relateContractList.forEach(element => {
        if (this.financeValue.hetongId == element.hetongId) {
          this.financeValue.taskName = element.taskName;
        }
      });

      this.financeValue.operationInfo.push({
        operationId: this.userInfo.id
      });
      let post = this.isAdd ? Task.add : Task.edit;
      let formData = JSON.parse(JSON.stringify(this.financeValue));
      formData.taskId = this.$route.params.taskId;
      delete formData.productId;
      delete formData.projectId;
      delete formData.toolkitId;
      /* 校验基本信息 */
      if (!this.financeValue.taskName) {
        this.canSubmit = false;
        this.isToast = true;
        this.toastMsg = "请选择合同";
      } else if (!this.financeValue.baojiadanId) {
        this.canSubmit = false;
        this.isToast = true;
        this.toastMsg = "请选择项目结算单";
      } else if (!this.financeValue.priceMeal) {
        this.canSubmit = false;
        this.isToast = true;
        this.toastMsg = "请输入金额";
      }
      setTimeout(() => {
        this.isToast = false;
        this.canSubmit = true;
      }, 1500);
      if (this.canSubmit) {
        this.$http
          .post(
            post,
            this.qs.stringify(this.isAdd ? this.financeValue : formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            let _data = res.data;
            if (_data.retCode !== 0) {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            } else if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            } else {
              this.isToast = true;
              this.toastMsg = "提交成功";
              this.$emit("changeIsSaved");
              setTimeout(() => {
                this.isToast = false;
                this.canSubmit = true;
                if (_data.retCode === 0) {
                  this.$store.dispatch("setExtraData", []);
                  this.$router.push("/tasks/list/");
                }
              }, 1500);
            }
          });
      }
    }
  },
  created() {
    this.getContractList();
  },
  watch: {
    contract: {
      handler(id) {
        id && this.getQuotationList(id);
        id && this.getContractInfo(id);
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.border-radius {
  border: 1px solid #ced4da;
  border-radius: 3px;
}
</style>


