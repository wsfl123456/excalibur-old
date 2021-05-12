<!--项目结算单列表-->
<template>
  <div v-if="quotationList.length" class="quotation-list">
    <Row>
      <i-col span="18" style="font-size:14px;color:#303030;margin-bottom:4px">
        项目结算单列表
        <span
          class="billMoney"
          v-if="billMoneyShow && isClient"
        >（本次开票申请总金额（不含税）：￥{{twoFixed(billMoney)}}）</span>
      </i-col>
      <i-col v-if="multipleSelect && !disableControl && isClient && quotationList.length > 1" span="6" style="text-align:right">
        <Checkbox @on-change="multipleChange">申请多个开票</Checkbox>
      </i-col>
    </Row>
    <i-form>
      <div class="quotation-form-group" v-if="isClient">
        <div v-for="(item, index) in quotationList" :key="index">
          <Row class="row" type="flex">
            <i-col
              :span="showInvoice ? 12 : 24"
              class="default-form-member-col"
              style="height:53px"
            >
              <FormItem>
                <div class="flex">
                  <div v-if="showInvoice" style="width:88px" class="label">
                    <Tooltip>
                      <div slot="content" style="white-space:normal">
                        <p>名称：{{item.taskName}}</p>
                        <p>金额：¥{{twoFixed(item.priceNoTax)}}</p>
                      </div>
                      <p class="smBaojiadantitle">{{item.taskName}}</p>
                      <p class="smBaojiadantitle">(¥{{twoFixed(item.priceNoTax)}})</p>
                    </Tooltip>
                  </div>
                  <div v-else style="width:400px" class="label">
                    <p class="baojiadantitle">{{item.taskName}}</p>
                    <p class="baojiadantitle">(¥{{twoFixed(item.priceNoTax)}})</p>
                  </div>
                  <div style="flex:1">
                    <Row style="background:white">
                      <i-col :span="item.flowState  !== '0' ? 5 : 6" class="border-right">
                        <Button type="text" class="button" @click="viewQuotation(item.baojiadanId, item.new_baojiadan_edit)">
                          <Icon type="eye"></Icon>查看
                        </Button>
                      </i-col>
                      <i-col :span="item.flowState  !== '0' ? 5 : 6" class="border-right">
                        <Button
                          v-if="!disableControl"
                          type="text"
                          @click="edit(item.baojiadanId)"
                          :disabled="item.new_baojiadan_edit == 'show' ? false : true"
                          :class="item.new_baojiadan_edit == 'show' ? 'blue' : 'gray'"
                          class="button"
                        >
                          <Icon type="compose"></Icon>编辑
                        </Button>
                      </i-col>
                      <i-col :span="item.flowState  !== '0' ? 5 : 6" class="border-right">
                        <Button
                          v-if="!disableControl"
                          type="text"
                          @click="exportbaojiadan(item.baojiadanId)"
                          class="button"
                        >
                          <Icon type="archive"></Icon>导出
                        </Button>
                      </i-col>
                      <i-col :span="item.flowState  !== '0' ? 5 : 6" class="border-right">
                        <Poptip
                          confirm
                          transfer
                          title="确定作废该报价单？"
                          placement="bottom"
                          @on-ok="deleteQuotation(item.baojiadanId)"
                          ok-text="确定"
                          cancel-text="取消"
                          style="width:100%"
                        >
                         <Button
                          type="text"
                          class="button"
                          :disabled="item.new_baojiadan_delete == 'show' ? false : true"
                          :class="item.new_baojiadan_delete == 'show' ? 'blue' : 'gray'"
                        >
                          <Icon type="trash-a"></Icon>作废
                        </Button>
                        </Poptip>
                      </i-col>
                      <i-col span="4" v-if="item.flowState  !== '0' && !disableControl">
                        <Poptip
                          v-if="item.flowState == 3 && item.new_kaipiao_audit == 'show'"
                          confirm
                          transfer
                          title="是否通过审核？"
                          placement="bottom"
                          @on-ok="kaipiao(item.kfId)"
                          @on-cancel="changeModal(item.kfId)"
                          ok-text="通过"
                          cancel-text="不通过"
                          style="width:100%"
                        >
                          <Button type="text" class="button" style="color:#ed3f14">审核</Button>
                        </Poptip>
                        <Button
                          v-else
                          type="text"
                          :disabled="!billing[index].billingBtnDisable"
                          class="button"
                          :class="billing[index].billingBtnDisable ? 'blue' : 'gray'"
                          style="padding:0"
                          @click="billingApply(item.baojiadanId, item.priceMeal)"
                        >{{billing[index].billingBtnText}}</Button>
                      </i-col>
                    </Row>
                  </div>
                </div>
              </FormItem>
            </i-col>
            <i-col span="12" v-if="showInvoice" class="default-form-member-col">
              <FormItem
                v-if="item.flowState == 4 || item.flowState == 7"
                label-width="88"
                label="关联发票"
                class="default-form-item"
              >
                <Row>
                  <i-col
                    :span="((item.flowState == 4 && item.new_kaipiao_money =='show') ||(item.flowState == 4 && item.new_kaipiao_money =='hide') || item.flowState == 7) ? 18 : 24"
                    class="border-right"
                  >
                    <i-input readonly v-model="item.invoiceNo"></i-input>
                  </i-col>
                  <i-col span="6">
                    <Button type="text" class="button gray" disabled>{{item.fuStateName}}</Button>
                  </i-col>
                </Row>
              </FormItem>
              <div v-else style="background:white;height:53px"></div>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="quotation-form-group" v-else>
        <div v-for="(item, index) in quotationList" :key="index">
          <Row class="row" type="flex">
            <i-col span="24" class="default-form-member-col" style="height:53px">
              <FormItem>
                <div class="flex">
                  <div v-if="showInvoice" style="width:88px" class="label">
                    <Tooltip>
                      <div slot="content" style="white-space:normal">
                        <p>名称：{{item.taskName}}</p>
                        <p>金额：¥{{twoFixed(item.priceNoTax)}}</p>
                      </div>
                      <p class="smBaojiadantitle">{{item.taskName}}</p>
                      <p class="smBaojiadantitle">(¥{{twoFixed(item.priceNoTax)}})</p>
                    </Tooltip>
                  </div>
                  <div v-else style="width:400px" class="label">
                    <p class="baojiadantitle">{{item.taskName}}</p>
                    <p class="baojiadantitle">(¥{{twoFixed(item.priceNoTax)}})</p>
                  </div>
                  <div style="flex:1">
                    <Row style="background:white">
                      <i-col span="6" class="border-right">
                        <Button
                          v-if="!disableControl"
                          type="text"
                          class="button"
                          @click="viewQuotation(item.baojiadanId, item.new_baojiadan_edit)"
                        >
                          <Icon type="eye"></Icon>查看
                        </Button>
                      </i-col>
                      <i-col span="6" class="border-right">
                        <Button
                          v-if="!disableControl"
                          type="text"
                          @click="edit(item.baojiadanId)"
                          :disabled="item.new_baojiadan_edit == 'show' ? false : true"
                          :class="item.new_baojiadan_edit == 'show' ? 'blue' : 'gray'"
                          class="button"
                        >
                          <Icon type="compose"></Icon>编辑
                        </Button>
                      </i-col>
                      <i-col span="6" class="border-right">
                        <Button
                          v-if="!disableControl"
                          type="text"
                          @click="exportbaojiadan(item.baojiadanId)"
                          class="button"
                        >
                          <Icon type="archive"></Icon>导出
                        </Button>
                      </i-col>
                      <i-col span="6" class="border-right">
                        <Poptip
                          confirm
                          transfer
                          title="确定作废该报价单？"
                          placement="bottom"
                          @on-ok="deleteQuotation(item.baojiadanId)"
                          ok-text="确定"
                          cancel-text="取消"
                          style="width:100%"
                        >
                         <Button
                          type="text"
                          class="button"
                          :disabled="item.new_baojiadan_delete == 'show' ? false : true"
                          :class="item.new_baojiadan_delete == 'show' ? 'blue' : 'gray'"
                        >
                          <Icon type="trash-a"></Icon>作废
                        </Button>
                        </Poptip>
                      </i-col>
                    </Row>
                  </div>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <Modal
      v-model="showModal"
      class-name="vertical-center-modal examine-modal"
      ok-text="提交"
      width="480px"
      :closable="false"
    >
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
      <span
        class="words-count"
        :class="{'over-length': modalValue.length > 1000}"
      >{{ modalValue.length }}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button
          type="primary"
          size="large"
          class="ok"
          @click.native="noPassKaipiao()"
          :disabled="modalValue.length > 1000 || modalValue.length == 0"
        >提交</Button>
      </div>
    </Modal>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import { Task } from "../../../API/api";
import Toast from "../../popup/Toast";
import { thousandSplit } from "../../../util/util.js";

export default {
  name: "quotation-list",
  components: {
    Toast
  },
  props: {
    taskInfo: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    projectInfo: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    formValue: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    changeBaojiadan: {
      type: [Boolean]
    },
    isClient: {
      type: Boolean,
      default() {
        return false;
      }
    },
    formContent: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      toastMsg: "",
      isToast: false,
      showModal: false,
      nopassId: null,
      modalValue: "",
      billing: [],
      showInvoice: false,
      multipleSelect: false,
      billMoneyShow: false,
      billMoney: "",
      quotationList: []
    };
  },
  computed: {
    disableControl() {
      return this.$route.name === "clientContract";
    }
  },
  methods: {
    twoFixed(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    changeModal(id) {
      this.showModal = true;
      this.nopassId = id;
    },
    viewQuotation(baojiadanId, state) {
      let tax;
      if (this.isClient) {
        tax = this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value === '' ? 6 : this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value;
      } else {
        tax = this.formContent.secondModifyInfo.taxRate.value === '' ? 6 : this.formContent.secondModifyInfo.taxRate.value;
      }
      this.$router.push({
        path: "/tasks/info/" + baojiadanId,
        query: {
          state,
          tax,
        }
      });
    },
    multipleChange() {
      this.$router.push({
        path:
          "/tasks/add/" +
          this.projectInfo.customerId +
          "/" +
          this.projectInfo.projectId +
          "/" +
          7 +
          "/" +
          19,
        query: {
          id: this.formValue.info.id
        }
      });
    },
    deleteQuotation(id) {
      const params = {
        id,
        state: 12
      };

      this.$http
        .post(Task.financeAudit, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
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
            this.toastMsg = "作废成功";
            this.getQuotationList();
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    fukuan(id) {
      let formData = {
        kfId: id,
        flowState: 7
      };
      this.$http
        .post(Task.hetongkfmoney, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode !== 0) {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          } else {
            this.billing = [];
            this.isToast = true;
            this.toastMsg = "提交成功";
            this.$emit("refresh");
            this.getQuotationList();
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    billingApply(baojiadanId, priceMeal) {
      let formData = {
        projectId: this.formValue.info.projectId,
        productId: this.formValue.info.productId,
        toolkitId: 19,
        hetongId: this.formValue.info.id,
        baojiadanId: [baojiadanId],
        priceMeal: priceMeal,
        operationInfo: [
          {
            operationId: JSON.parse(localStorage.getItem("userInfo")).id
          }
        ],
        taskName: this.formValue.formInfo[0].formContent.contractsInfo.basicInfo
          .contractName.value,
        taskForm: {
          billingInfo: [
            {
              basicInfo: {
                contractId: {
                  value: String(this.formValue.info.id),
                  toastMsg: "请选择合同"
                },
                quotationId: {
                  value: String(baojiadanId),
                  toastMsg: "请选择项目结算单"
                },
                totalMoney: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .basicInfo.money.value,
                  toastMsg: "请输入金额"
                },
                // afterTaxMoney: {
                //   value : '',
                //   toastMsg : ''
                // },
                taxRate: {
                  value: "6%",
                  toastMsg: ""
                },
                company: {
                  value: JSON.parse(
                    this.formValue.formInfo[0].formContent.contractsInfo.partyA
                      .name.value
                  ).customerName,
                  toastMsg: ""
                },
                contactPerson: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.contactPerson.value,
                  toastMsg: ""
                },
                accountName: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.accountName.value,
                  toastMsg: ""
                },
                taxNumber: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.accountTaxNum.value,
                  toastMsg: ""
                },
                openBank: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.openBank.value,
                  toastMsg: ""
                },
                openAccount: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.openAccount.value,
                  toastMsg: ""
                },
                companyMobile: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.companyMobile.value,
                  toastMsg: ""
                },
                companyAddress: {
                  value: this.formValue.formInfo[0].formContent.contractsInfo
                    .partyA.companyAddress.value,
                  toastMsg: ""
                }
              }
            }
          ],
          operationInfo: [
            {
              operationId: null,
              // inspectorId: [],
              content: {
                isMulti: "true",
                canMore: false
              }
            }
          ]
        }
      };
      this.$http
        .post(Task.add, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode !== 0) {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          } else {
            this.billing = [];
            this.isToast = true;
            this.toastMsg = "提交成功";
            this.$emit("refresh");
            this.getQuotationList();
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    kaipiao(id) {
      let formData = {
        id: id,
        state: 6
      };
      this.$http
        .post(Task.financeAudit, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode !== 0) {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          } else {
            this.billing = [];
            this.isToast = true;
            this.toastMsg = "提交成功";
            this.$emit("refresh");
            this.getQuotationList();
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    noPassKaipiao() {
      let formData = {
        id: this.nopassId,
        state: 7,
        reason: this.modalValue
      };
      this.$http
        .post(Task.financeAudit, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode !== 0) {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          } else {
            this.billing = [];
            this.isToast = true;
            this.toastMsg = "提交成功";
            this.modalValue = "";
            this.showModal = false;
            this.$emit("refresh");
            this.getQuotationList();
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    exportbaojiadan(id) {
      let formData = {
        baojiadanId: id
      };
      this.$http
        .post(Task.exportbaojiadan, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let url = res.data.retData.download_url;
          window.open(url);
        });
    },
    edit(id) {
      let tax;
      if (this.isClient) {
        tax = this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value === '' ? 6 : this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value;
      } else {
        tax = this.formContent.secondModifyInfo.taxRate.value === '' ? 6 : this.formContent.secondModifyInfo.taxRate.value;
      }
      this.$router.push({
        path:
          "/tasks/edit/" +
          id +
          "/" +
          this.projectInfo.customerId +
          "/" +
          this.projectInfo.projectId,
          query: {
            tax,
          }
      });
    },
    audit(baojiadanId) {
      this.$router.push({
        path:
          "/tasks/add/" +
          this.projectInfo.customerId +
          "/" +
          this.projectInfo.projectId +
          "/" +
          this.taskInfo.productId +
          "/" +
          19,
        query: {
          contractId: this.taskInfo.id,
          quotationId: baojiadanId
        }
      });
    },
    getQuotationList() {
      let formData = {
        hetongId: this.taskInfo.id
      };
      this.$http
        .post(Task.contactbaojiadanlist, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          var billingBtnDisable, billingBtnText;
          this.quotationList = res.data.retData.data;
          this.billMoney = res.data.retData.kfPriceMealTotalFlowState3;
          let billMoneyLength = 0;
          this.billMoneyShow = false;
          this.quotationList.length &&
            this.quotationList.forEach(element => {
              if (element.invoiceNo) {
                //判断是否展示关联发票
                this.showInvoice = true;
              }
              if (
                element.flowState == 2 &&
                element.new_kaipiao_apply == "show"
              ) {
                this.multipleSelect = true;
              }
              if (element.flowState == 3) {
                billMoneyLength += 1;
              }

              switch (
                element.flowState //开票状态
              ) {
                case "0":
                  billingBtnText = "申请开票";
                  billingBtnDisable = false;
                  break;
                case "2":
                  if (element.new_kaipiao_apply == "show") {
                    billingBtnText = "申请开票";
                    billingBtnDisable = true;
                  } else {
                    billingBtnText = "申请开票";
                    billingBtnDisable = false;
                  }
                  break;
                case -4:
                  if (element.new_kaipiao_apply == "show") {
                    billingBtnText = "申请开票";
                    billingBtnDisable = true;
                  } else {
                    billingBtnText = "审批拒绝";
                    billingBtnDisable = false;
                  }
                  break;
                case 3:
                  billingBtnText = "开票中";
                  billingBtnDisable = false;
                  break;
                case 4:
                  billingBtnText = "已开票";
                  billingBtnDisable = false;
                  break;
                case 7:
                  billingBtnText = "已开票";
                  billingBtnDisable = false;
                  break;
              }
              this.billing.push({
                billingBtnText: billingBtnText,
                billingBtnDisable: billingBtnDisable
              });
            });
          if (billMoneyLength > 1) this.billMoneyShow = true;
        });
    }
  },
  created() {
    this.getQuotationList();
  }
};
</script>
<style lang="less" scoped>
.row {
  border-bottom: 1px solid #ced4da;
}
.row:last-child {
  border: none;
}
.border-right {
  border-right: 1px solid #ced4da;
}
.button {
  font-size: 14px;
  color: #2d8ef8;
  height: 53px;
  text-align: center;
  width: 100%;
}
.pay {
  font-size: 14px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  border-left: 1px solid #ced4da;
}
.gray {
  color: #adb5bd;
}
.blue {
  color: #2d8ef8;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #ced4da;
  height: 53px;
  // line-height: 53px;
}
.smBaojiadantitle,
.baojiadantitle {
  width: 88px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 26px;
  line-height: 26px;
  // padding: 0 5px;
}
.baojiadantitle {
  width: 400px !important;
}
.billMoney {
  color: #ed3f14;
  margin-left: 20px;
}
</style>




