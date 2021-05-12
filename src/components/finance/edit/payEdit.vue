<!--打款-编辑-->
<template>
  <div>
    <i-form ref="form" label-position="left" :label-width="120" class="default-form">
      <div style="margin-bottom:20px">
        <Row :gutter="30">
          <i-col span="12">
            <div>选择合同</div>
            <div>
              <Select
                :disabled="disableContactSelect"
                :value="formValue.basicInfo.contractId"
                @on-change="updateContract"
                filterable
                style="width:100%"
                placeholder="请选择合同"
              >
                <Option
                  v-for="option in suppliers"
                  :key="option.hetongId"
                  :value="option.hetongId"
                >{{ option.taskName }}</Option>
              </Select>
            </div>
          </i-col>
          <i-col span="12">
            <div>获取发票</div>
            <div class="border-radius">
              <RadioGroup
                v-model="formValue.basicInfo.isGetInvoice"
                style="padding-left:24px;width:100%"
              >
                <Row type="flex">
                  <i-col span="8">
                    <Radio label="1" style="height:30px;line-height:30px">已获取</Radio>
                  </i-col>
                  <i-col span="8">
                    <Radio label="2" style="height:30px;line-height:30px">未获取</Radio>
                  </i-col>
                  <i-col span="8">
                    <Radio label="3" style="height:30px;line-height:30px">无发票</Radio>
                  </i-col>
                </Row>
              </RadioGroup>
            </div>
          </i-col>
        </Row>
      </div>
      <!-- 有发票 -->
      <div class="contract-form-group" v-if="formValue.basicInfo.isGetInvoice == '1'">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="选择发票" class="default-form-item" required>
                <Select
                  :value="formValue.basicInfo.invoiceId"
                  @on-change="autoFillInvoiceMsg"
                  placeholder="请选择发票"
                >
                  <Option
                    v-for="item in invoiceList"
                    :key="item.invoiceId"
                    :value="item.invoiceId"
                  >{{ item.invoiceTitle }}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="发票号" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.invoiceNo" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开票日期" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.invoiceDate" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="金额" class="default-form-item" required>
                <i-input
                  :value="formatMoney(formValue.basicInfo.money)"
                  @input="moneyChange"
                  placeholder="自动填充"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="帐期" class="default-form-item" required>
                <InputNumber
                  :min="0"
                  :step="1"
                  v-model="formValue.basicInfo.billingPeriod"
                  :formatter="value => `${value}（天）`"
                  :parser="value => value.replace('（天）', '')"
                  placeholder="自动填充"
                ></InputNumber>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款事由" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.payReason" placeholder="请输入付款事由"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="期望时间" class="default-form-item" required>
                <DatePicker
                  transfer
                  :options="disabledDate"
                  class="deadline"
                  type="datetime"
                  placeholder="请选择期望时间"
                  :value="formValue.basicInfo.expectTime"
                  @on-change="v => formValue.basicInfo.expectTime = v"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="备注" class="default-form-item">
                <i-input v-model="formValue.basicInfo.remark" placeholder="请输入备注"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="账户名称" class="default-form-item">
                <i-input v-if="!supplierIdAuto"  v-model="formValue.basicInfo.accountName" placeholder="自动填充"></i-input>
                <el-select v-else v-model="formValue.basicInfo.accountName" @change="accountChange">
                  <el-option
                    v-for="(i, k) in accountList"
                    :key="k"
                    :value="i.accountName"
                    :label="i.accountName"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税号" class="default-form-item">
                <i-input v-model="formValue.basicInfo.taxNumber" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input v-model="formValue.basicInfo.openAccount" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input v-model="formValue.basicInfo.openBank" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="申请人" class="default-form-item default-member-form">
                <div class="default-form-member-selection">
                  <template>
                    <member-add :users="[userInfo]" :is-edit="false" content="添加申请人"></member-add>
                  </template>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
      <!-- 无发票 -->
      <div class="contract-form-group" v-else>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="金额" class="default-form-item" required>
                <i-input
                  :value="formatMoney(formValue.basicInfo.money)"
                  @input="moneyChange"
                  placeholder="请输入金额"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="帐期" class="default-form-item" required>
                <InputNumber
                  :min="0"
                  :step="1"
                  v-model="formValue.basicInfo.billingPeriod"
                  :formatter="value => `${value}（天）`"
                  :parser="value => value.replace('（天）', '')"
                  placeholder="请输入账期"
                ></InputNumber>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款事由" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.payReason" placeholder="请输入付款事由"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="期望时间" class="default-form-item" required>
                <DatePicker
                  transfer
                  :options="disabledDate"
                  class="deadline"
                  type="datetime"
                  placeholder="请选择期望时间"
                  :value="formValue.basicInfo.expectTime"
                  @on-change="v => formValue.basicInfo.expectTime = v"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="备注" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.remark" placeholder="未获取发票请务必写备注"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="账户名称" class="default-form-item">
                <i-input v-if="!supplierIdAuto"  v-model="formValue.basicInfo.accountName" placeholder="自动填充"></i-input>
                <el-select v-else v-model="formValue.basicInfo.accountName" @change="accountChange">
                  <el-option
                    v-for="(i, k) in accountList"
                    :key="k"
                    :value="i.accountName"
                    :label="i.accountName"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税号" class="default-form-item">
                <i-input v-model="formValue.basicInfo.taxNumber" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input v-model="formValue.basicInfo.openAccount" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input v-model="formValue.basicInfo.openBank" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="申请人" class="default-form-item default-member-form">
                <div class="default-form-member-selection">
                  <template>
                    <member-add :users="[userInfo]" :is-edit="false" content="添加申请人"></member-add>
                  </template>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>

    <div class="contract-btn">
      <Button type="primary" class="submit-btn form-default-btn" @click="addPayTask">提交申请</Button>
    </div>

    <toast :msg="toastMsg" :is-toast="showToast"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../MemberAdd";
import Toast from "../../popup/Toast";
import { Task, Supply } from "../../../API/api";
import { dateToYMD } from "../../../util/util";
import { thousandSplit } from "../../../util/util.js";

export default {
  name: "pay-edit",
  components: {
    MemberAdd,
    Toast
  },
  props: {
    formValue: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },
    projectInfo: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    }
  },
  created() {
    /* 获取供应商合同信息 */
    const supplierParams = {
      projectId: this.$route.params.projectId,
      toolkitId: 15, // 写死 查询供应商合同信息
      forUserId: 1,
      flowState: 2
    };
    this.$http
      .post(Task.contactlistnew, this.qs.stringify(supplierParams), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") }
      })
      .then(res => {
        const _data = res.data;

        if (_data.retCode === 0) {
          this.suppliers = _data.retData.data;

          /* 如果有选择任务，则默认选中 */
          if (this.$route.query.task) {
            this.disableContactSelect = true;
            this.updateContract(+this.$route.query.task);
          }
        }
      });
  },
  data() {
    return {
      showToast: false,
      disableContactSelect: false,
      toastMsg: "",
      suppliers: [],
      invoiceList: [],
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      disabledDate: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      accountList: [],
      supplierIdAuto: ''
    };
  },
  methods: {
    formatMoney(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(Math.round(m * 100) / 100 + "");
    },
    moneyChange(val) {
      const filterVal = val.replace(/[^\-?\d.]/g, ""); //只保留数字和.
      const twoDigitsVal = Math.round(filterVal * 100) / 100; //保留两位小数
      this.formValue.basicInfo.money = twoDigitsVal;
    },
    addPayTask() {
      let taskName =
        this.suppliers.find(
          i => i.hetongId == this.formValue.basicInfo.contractId
        ).taskName + "合同打款申请";
      let formData = {
        projectId: this.$route.params.projectId,
        productId: this.$route.params.productId,
        toolkitId: this.$route.params.toolkitId,
        invoiceNo: this.formValue.basicInfo.invoiceNo,
        kaipiaoDate: this.formValue.basicInfo.invoiceDate.split(" ")[0],
        zhangqi: this.formValue.basicInfo.billingPeriod,
        hetongId: this.formValue.basicInfo.contractId,
        getInvoice: this.formValue.basicInfo.isGetInvoice,
        remarkContent: this.formValue.basicInfo.remark,
        priceTotal: this.formValue.basicInfo.money,
        endTime: this.formValue.basicInfo.expectTime.split(" ")[0],
        taskName: taskName,
        pmReason: this.formValue.basicInfo.payReason
      };

      if (!this.formValue.basicInfo.money) {
        return this.$message.error("金额不能为空");
      }
      if (!this.formValue.basicInfo.payReason) {
        return this.$message.error("付款事由未填写");
      }
      if (!this.formValue.basicInfo.billingPeriod) {
        return this.$message.error("请填写账期");
      }
      if (!this.formValue.basicInfo.expectTime) {
        return this.$message.error("期望时间不能为空");
      }

      formData.operationInfo = [];
      formData.taskForm = this.formValue;

      let isEdit = this.$route.query.type === "isEdit";

      if (isEdit) {
        formData.taskId = this.$route.params.taskId;
      }

      /* 告诉上层路由不需要保存表单状态 */
      this.$emit("changeIsSaved");
      this.$http
        .post(isEdit ? Task.edit : Task.add, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;

          if (_data.retCode !== 0) {
            this.showToast = true;
            this.toastMsg = _data.retMsg;
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          } else {
            this.showToast = true;
            this.toastStatus = "success";
            this.toastMsg = "提交成功";
            this.isSaved = true;
          }

          setTimeout(() => {
            this.showToast = false;
            this.canSubmit = true;
            if (_data.retCode === 0) {
              this.$store.dispatch("setExtraData", []);

              this.$router.push("/tasks/list/");
            }
          }, 1500);
        });
    },
    updateContract(id) {
      /* 切换选择合同时填充信息 */
      this.formValue.basicInfo.contractId = id;
      this.formValue.basicInfo.invoiceId = "";
      this.formValue.basicInfo.invoiceNo = "";
      this.formValue.basicInfo.invoiceDate = "";
      this.formValue.basicInfo.money = "";
      this.formValue.basicInfo.billingPeriod = "";

      this.updateRelatedInvoice();
      this.autoFillAccountData();
    },
    autoFillInvoiceMsg(v) {
      this.formValue.basicInfo.invoiceId = v;

      let currentInvoice = this.invoiceList.find(i => i.invoiceId === v);
      this.formValue.basicInfo.invoiceNo = currentInvoice.invoiceNo;
      this.formValue.basicInfo.invoiceDate = currentInvoice.kaipiaoDate;
      this.formValue.basicInfo.money = currentInvoice.price;
      this.formValue.basicInfo.billingPeriod = currentInvoice.zhangqi;
    },
    accountChange(i) {
      const item = this.accountList.find(e => {
        return e.accountName == i
      })
      this.formValue.basicInfo.taxNumber = item.dutyParagraph;
      this.formValue.basicInfo.openAccount = item.accountId;
      this.formValue.basicInfo.openBank = item.bankName;
    },
    /* 选择合同时自动填充 账户相关数据 */
    autoFillAccountData() {
      this.$http
        .post(
          Task.detail,
          this.qs.stringify({
            taskId: this.formValue.basicInfo.contractId || 0
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;

          if (_data.retCode === 0) {
            const verCount = _data.retData.data.formInfo.length;
            const formData = _data.retData.data.formInfo[0].formContent;

            this.formValue.basicInfo.accountName =
              formData.partyB.accountName.value;
            this.formValue.basicInfo.taxNumber =
              formData.partyB.accountTaxNum.value;
            this.formValue.basicInfo.openAccount =
              formData.partyB.openAccount.value;
            this.formValue.basicInfo.openBank = formData.partyB.openBank.value;

            this.supplierIdAuto = formData.basicInfo.supplierIdAuto ? formData.basicInfo.supplierIdAuto.value : ''

            this.$http
              .post(
                Supply.detail,
                this.qs.stringify({
                  id: this.supplierIdAuto
                  // id: 380
                }),
                {
                  headers: {
                    Authorization: "Bearer " + this.$cookie.get("token")
                  }
                }
              )
              .then(res => {
                if (res.data.retCode === 0) {
                  this.accountList = res.data.retData.accountInfo;
                }
              });
          }
        });
    },
    /* 获取发票信息 */
    updateRelatedInvoice() {
      const invoiceParams = {
        hetongId: this.formValue.basicInfo.contractId || 0,
        fuState: 1
      };
      this.$http
        .post(Task.getInvoice, this.qs.stringify(invoiceParams), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;

          if (_data.retCode === 0) {
            this.invoiceList = _data.retData.invoiceList;
          }
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
  .form-default-btn {
    border-radius: 4px;
    padding: 13px 41px;
    border: 1px solid #2d8ef8;
    color: #2d8ef8;
    background-color: #ffffff;
    font-size: 16px;

    &:hover {
      background-color: #2d8ef8;
      color: #ffffff;
    }
  }

  .submit-btn {
    background-color: #2d8ef8;
    color: #ffffff;
  }
}
</style>


