<!--客户合同-新建/编辑-->
<template>
  <div class="financeToolkit">
    <i-form label-position="left" :label-width="120" class="default-form client-contract">
      <div class="contract-form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="合同名称" class="default-form-item" required>
                <i-input
                  v-model="formValue.contractsInfo.basicInfo.contractName.value"
                  placeholder="客户_项目名称_金额_版本"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="截止时间" class="default-form-item" required>
                <DatePicker
                  transfer
                  class="deadline"
                  type="datetime"
                  placeholder="设置截止时间"
                  format="yyyy-MM-dd HH:mm"
                  :value="formValue.contractsInfo.basicInfo.endTime.value"
                  @on-change="dateChange"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="项目名称" class="default-form-item" required>
                <i-input v-model="projectInfo.projectInfo.projectName" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="项目ID" class="default-form-item" required>
                <i-input v-model="projectInfo.projectInfo.projectCode" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="客户名称" class="default-form-item" required>
                <i-input v-model="projectInfo.projectInfo.customerName" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="客户ID" class="default-form-item" required>
                <i-input v-model="projectInfo.projectInfo.customerCode" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="合同类型" class="default-form-item" required>
                <el-select
                  v-model="formValue.contractsInfo.basicInfo.contractType.value"
                  @change="contractTypeChange"
                  placeholder="请选择合同类型 "
                >
                  <el-option
                    v-for="(item, index) in contractTypeList"
                    :value="item.id"
                    :key="index"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="合同期限" class="default-form-item" required>
                <DatePicker
                  class="deadline"
                  v-model="formValue.contractsInfo.modifyInfo.contractDeadline.value"
                  @on-change="contractDeadlineChange"
                  type="daterange"
                  split-panels
                  placeholder="请设置合同期限"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formValue.contractsInfo.basicInfo.contractType.value">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="模板文件名" class="default-form-item">
                <i-input
                  :value="contractModule[formValue.contractsInfo.basicInfo.contractType.value - 1].name"
                  readonly
                  placeholder="请选择合同类型"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col module-url">
              <FormItem label="模板公盘路径" class="default-form-item">
                <a
                  :href="contractModule[formValue.contractsInfo.basicInfo.contractType.value - 1].url"
                  target="_blank"
                >{{contractModule[formValue.contractsInfo.basicInfo.contractType.value - 1].url}}</a>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div
          v-if="formValue.contractsInfo.basicInfo.contractType.value == 5 && formValue.contractsInfo.basicInfo.remark"
        >
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="备注" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.basicInfo.remark.value"
                  placeholder="请输入备注"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row type="flex">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="组织单位" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.contractsInfo.basicInfo.organizeUnit.value"
                  style="padding-left:24px"
                >
                  <Row>
                    <i-col span="12">
                      <Radio label="1" style="height:53px;line-height:53px">公司</Radio>
                    </i-col>
                    <i-col span="12">
                      <Radio label="0" style="height:53px;line-height:53px">个人</Radio>
                    </i-col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </i-col>
            <i-col span="12" style="background:white"></i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="业务类型" class="default-form-item" required>
                <Cascader
                  :value="toNumberList"
                  @on-change="businessChaneg"
                  :data="businessTypeList"
                  :clearable="false"
                  trigger="hover"
                  placeholder="请选择业务类型"
                ></Cascader>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="业务概述" class="default-form-item" required>
                <i-input
                  v-model="formValue.contractsInfo.basicInfo.bussinessOverview.value"
                  placeholder="请输入业务概述"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row type="flex">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="是否涉及金额" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.contractsInfo.basicInfo.involveMoney.value"
                  @on-change="involveMoneyChange"
                  style="padding-left:24px"
                >
                  <Row>
                    <i-col span="12">
                      <Radio label="1" style="height:53px;line-height:53px">是</Radio>
                    </i-col>
                    <i-col span="12">
                      <Radio label="0" style="height:53px;line-height:53px">否</Radio>
                    </i-col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </i-col>
            <i-col
              v-if="formValue.contractsInfo.basicInfo.involveMoney.value == 1"
              span="12"
              class="default-form-member-col"
            >
              <FormItem label="是否为代付" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.contractsInfo.modifyInfo.insteadPay.value"
                  style="padding-left:24px"
                >
                  <Row>
                    <i-col span="12">
                      <Radio label="1" style="height:53px;line-height:53px">是</Radio>
                    </i-col>
                    <i-col span="12">
                      <Radio label="0" style="height:53px;line-height:53px">否</Radio>
                    </i-col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </i-col>
            <i-col v-else span="12" style="background:white"></i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row type="flex">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="金额" class="default-form-item" required>
                <i-input
                  :value="formatMoney(formValue.contractsInfo.basicInfo.money.value)"
                  placeholder="请输入金额"
                  @input="moneyChange"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款方式" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.contractsInfo.basicInfo.payType.value"
                  style="padding-left:24px"
                  @on-change="() => { formValue.contractsInfo.modifyInfo.remark.value = '' }"
                >
                  <Row>
                    <i-col span="12">
                      <Radio label="1" style="height:53px;line-height:53px">单次付款</Radio>
                    </i-col>
                    <i-col span="12">
                      <Radio label="0" style="height:53px;line-height:53px">分期付款</Radio>
                    </i-col>
                  </Row>
                </RadioGroup>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row type="flex">
            <i-col span="12" class="default-form-member-col default-el-form no-icon-form">
              <FormItem label="发票" class="default-form-item" required>
                <Select
                  :value="formValue.contractsInfo.secondModifyInfo.invoice.value"
                  placeholder="请选择发票"
                  @on-change="invoiceChange"
                >
                  <Option value="专票">专票</Option>
                  <Option value="普票">普票</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税率" class="default-form-item" required>
                <input-number
                  v-model="formValue.contractsInfo.secondModifyInfo.taxRate.value"
                  :formatter="value => `${value === '' ? '' : value + '%'}`"
                  :parser="value => value.replace('%', '')"
                  :min="0"
                  placeholder="请输入税率"
                ></input-number>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.payType.value === '0'">
          <Row>
            <i-col>
              <FormItem label="备注" class="default-form-item" required>
                <i-input
                  v-model="formValue.contractsInfo.modifyInfo.remark.value"
                  placeholder="请注明分几次付款，每次付款时间和金额"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <!-- 甲方 -->
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="甲方名称" class="default-form-item" required>
                <el-select
                  v-model="formValue.contractsInfo.partyA.name.value"
                  @change="changeParty($event, 'partyA')"
                  placeholder="请选择甲方名称"
                  no-data-text="无匹配数据，请添加品牌账户信息"
                  no-match-text="无匹配数据，请添加品牌账户信息"
                  filterable
                >
                  <el-option
                    v-for="item in filterAllPartA"
                    :value="JSON.stringify(item)"
                    :key="item.id"
                    :label="item.accountName"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="联系人" class="default-form-item">
                <!-- <i-input
                  v-model="formValue.contractsInfo.partyA.contactPerson.value"
                  placeholder="请输入联系人姓名"
                ></i-input>-->
                <el-select
                  v-model="formValue.contractsInfo.partyA.contactPerson.value"
                  placeholder="请选择联系人"
                  no-data-text="无匹配数据，请添加品牌联系人"
                  no-match-text="无匹配数据，请添加品牌联系人"
                  filterable
                >
                  <template v-if="formValue.contractsInfo.partyA.name.value">
                    <el-option
                      v-for="item in contactsList"
                      :value="item.contactsInfoName"
                      :key="item.contactsInfoName"
                      :label="item.contactsInfoName"
                    ></el-option>
                  </template>
                  <template v-else>
                    <el-option disabled value="none" label="请先选择甲方"></el-option>
                  </template>
                </el-select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyA.accountName.value"
                  placeholder="请输入账户名称"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户税号" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyA.accountTaxNum.value"
                  placeholder="请输入账户税号"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyA.openBank.value"
                  placeholder="请输入开户银行"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyA.openAccount.value"
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
                  v-model="formValue.contractsInfo.partyA.companyMobile.value"
                  placeholder="请输入公司电话"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyA.companyAddress.value"
                  placeholder="请输入公司地址"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <!-- 乙方 -->
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="乙方名称" class="default-form-item" required>
                <el-select
                  v-model="formValue.contractsInfo.partyB.name.value"
                  @change="changeParty($event, 'partyB')"
                  placeholder="请选择乙方名称"
                  no-data-text="无匹配数据，请添加品牌账户信息"
                  no-match-text="无匹配数据，请添加品牌账户信息"
                  filterable
                >
                  <template v-if="formValue.contractsInfo.partyA.name.value">
                    <el-option
                      v-for="item in filterAllPartB"
                      :value="JSON.stringify(item)"
                      :key="item.id"
                      :label="item.accountName"
                    ></el-option>
                  </template>
                  <template v-else>
                    <el-option disabled value="none" label="请先选择甲方"></el-option>
                  </template>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="联系人" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.contactPerson.value"
                  placeholder="请输入联系人姓名"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.accountName.value"
                  placeholder="请输入账户名称"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户税号" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.accountTaxNum.value"
                  placeholder="请输入账户税号"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.contractsInfo.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.openBank.value"
                  placeholder="请输入开户银行"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.openAccount.value"
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
                  v-model="formValue.contractsInfo.partyB.companyMobile.value"
                  placeholder="请输入公司电话"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input
                  v-model="formValue.contractsInfo.partyB.companyAddress.value"
                  placeholder="请输入公司地址"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="contract-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="文件名" class="default-form-item" required>
                <i-input
                  v-model="formValue.contractsInfo.modifyInfo.fileName.value"
                  placeholder="请输入文件名"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="云盘地址" class="default-form-item" required>
                <i-input
                  v-model="formValue.contractsInfo.modifyInfo.fileAddress.value"
                  placeholder="请输入云盘地址"
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
        style="margin-top:40px"
        @click="financeSubmit"
      >提交任务</Button>
    </div>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../MemberAdd";
import Toast from "../../popup/Toast";
import { Task } from "../../../API/api";
import { OptList } from "../../../assets/conf/businessType.conf.js";
import { thousandSplit } from "../../../util/util.js";
import { isArray } from "util";

export default {
  name: "client-contract-edit",
  components: {
    MemberAdd,
    Toast
  },
  props: {
    isAdd: {
      type: [Boolean],
      default() {
        return true;
      }
    },
    projectInfo: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },
    formValue: {
      type: [Array, Object],
      default: function() {
        return {};
      }
    },
    operationInfo: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    allPartA: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    allPartB: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    isSaved: {
      type: Boolean
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
      canSubmit: true,
      toastMsg: "",
      isToast: false,
      contractTypeList: [
        { id: "1", label: "项目合同" },
        { id: "2", label: "框架合同" },
        { id: "3", label: "报价单/结算单" },
        { id: "4", label: "保密协议" },
        { id: "5", label: "其他" }
      ],
      contractModule: [
        {
          name: "各项目合同模板附件",
          url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/项目合同"
        },
        {
          name: "各框架合同模板附件",
          url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/框架合同"
        },
        {
          name: "各报价单/结算单模板附件",
          url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/报价单（结算单）"
        },
        {
          name: "各保密协议模板附件",
          url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/保密协议"
        },
        {
          name: "其他模板附件",
          url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/其它"
        }
      ],
      businessTypeList: JSON.parse(JSON.stringify(OptList)),
      financeValue: {
        projectId:
          this.$route.params.projectId || this.projectInfo.info.projectId,
        productId:
          this.$route.params.productId || this.projectInfo.info.productId,
        toolkitId:
          this.$route.params.toolkitId || this.projectInfo.info.toolkitId,
        taskName: null,
        endTime: null,
        taskForm: [],
        operationInfo: [],
        priceTotal: null
      },
      contactsList: []
    };
  },
  computed: {
    toNumberList() {
      let businessType = [];
      if (
        typeof this.formValue.contractsInfo.basicInfo.bussinessType.value ==
        "object"
      ) {
        this.formValue.contractsInfo.basicInfo.bussinessType.value.forEach(
          ele => {
            businessType.push(Number(ele));
          }
        );
      }
      return businessType;
    },
    filterAllPartA() {
      return this.allPartA.filter(e => e.accountName);
    },
    filterAllPartB() {
      return this.allPartB.filter(e => e.accountName);
    }
  },
  methods: {
    invoiceChange(val) {
      this.formValue.contractsInfo.secondModifyInfo.invoice.value = val;
    },
    queryChangeParty(query) {
      this.formValue.contractsInfo.partyA.name.value = "";
    },
    contractDeadlineChange(val) {
      this.formValue.contractsInfo.modifyInfo.contractDeadline.value = val;
    },
    formatMoney(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(Math.round(m * 100) / 100 + "");
    },
    moneyChange(val) {
      const filterVal = val.replace(/[^\-?\d.]/g, ""); //只保留数字和.
      const twoDigitsVal = Math.round(filterVal * 100) / 100; //保留两位小数
      this.formValue.contractsInfo.basicInfo.money.value = twoDigitsVal;
    },
    businessChaneg(type) {
      this.formValue.contractsInfo.basicInfo.bussinessType.value = type;
    },
    contractTypeChange(type) {
      this.formValue.contractsInfo.basicInfo.remark.value = "";
    },
    dateChange(value) {
      let date = value.replace("00:00", "10:00");
      this.formValue.contractsInfo.basicInfo.endTime.value = date;
    },
    involveMoneyChange() {
      if (this.formValue.contractsInfo.basicInfo.involveMoney.value == "1") {
        this.formValue.contractsInfo.basicInfo.money.toastMsg = "请输入金额";
      } else {
        this.formValue.contractsInfo.basicInfo.money.toastMsg = "";
      }
      this.formValue.contractsInfo.basicInfo.money.value = "";
      this.formValue.contractsInfo.basicInfo.payType.value = "1";
      this.formValue.contractsInfo.modifyInfo.insteadPay.value = "1";
    },
    changeParty(data, name) {
      const _data = JSON.parse(data);

      if (name === "partyA") {
        this.contactsList = _data.contactsList;
      }

      this.formValue.contractsInfo[name].contactPerson.value =
        _data.contactsInfoName;
      this.formValue.contractsInfo[name].accountName.value = _data.accountName;
      this.formValue.contractsInfo[name].accountTaxNum.value = _data.dutyParagraph;
      this.formValue.contractsInfo[name].openBank.value = _data.bankName;
      this.formValue.contractsInfo[name].openAccount.value =
        _data.accountId;
      this.formValue.contractsInfo[name].companyMobile.value = _data.tel;
      this.formValue.contractsInfo[name].companyAddress.value = _data.address;
    },
    selectUser($event, name) {
      this.formValue.operationInfo[0][name] = $event.id;
    },
    financeSubmit() {
      this.financeValue.taskForm = JSON.parse(JSON.stringify(this.formValue));
      this.financeValue.taskForm.contractsInfo.basicInfo.projectName.value = this.projectInfo.projectInfo.projectName;
      this.financeValue.taskForm.contractsInfo.basicInfo.projectId.value = this.projectInfo.projectInfo.projectCode;
      this.financeValue.taskForm.contractsInfo.basicInfo.clientName.value = this.projectInfo.projectInfo.customerName;
      this.financeValue.taskForm.contractsInfo.basicInfo.clientId.value = this.projectInfo.projectInfo.customerCode;
      this.financeValue.operationInfo = JSON.parse(
        JSON.stringify(this.formValue.operationInfo)
      );
      this.financeValue.taskName = this.formValue.contractsInfo.basicInfo.contractName.value;
      this.financeValue.endTime = this.formValue.contractsInfo.basicInfo.endTime.value;
      this.financeValue.priceTotal = this.formValue.contractsInfo.basicInfo.money.value;
      /* 校验基本信息 */
      for (let prop in this.financeValue.taskForm.contractsInfo) {
        for (let _prop in this.financeValue.taskForm.contractsInfo[prop]) {
          if (
            !this.financeValue.taskForm.contractsInfo[prop][_prop].value &&
            this.financeValue.taskForm.contractsInfo[prop][_prop].toastMsg
          ) {
            this.isToast = true;
            this.canSubmit = false;
            this.toastMsg = this.financeValue.taskForm.contractsInfo[prop][
              _prop
            ].toastMsg;
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
              this.canSubmit = true;
            }, 1500);
            break;
          }
        }
      }

      /* 校验合同期限 */

      if (
        isArray(
          this.formValue.contractsInfo.modifyInfo.contractDeadline.value
        ) &&
        !this.formValue.contractsInfo.modifyInfo.contractDeadline.value[0]
      ) {
        this.isToast = true;
        this.canSubmit = false;
        this.toastMsg = "请选择合同期限";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
          this.canSubmit = true;
        }, 1500);
      }

      if (this.formValue.contractsInfo.basicInfo.payType.value === "0") {
        if (!this.formValue.contractsInfo.modifyInfo.remark.value) {
          this.isToast = true;
          this.canSubmit = false;
          this.toastMsg = "请输入备注";
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            this.canSubmit = true;
          }, 1500);
        }
      }
      /* 提交 */
      let post = this.isAdd ? Task.add : Task.edit;
      let formData = JSON.parse(JSON.stringify(this.financeValue));
      formData.taskId = this.$route.params.taskId;
      delete formData.productId;
      delete formData.projectId;
      delete formData.toolkitId;
      // console.log(this.financeValue)
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
              this.toastStatus = "success";
              if (this.isAdd) {
                this.toastMsg = "合同创建成功，即将跳转至项目结算单页面!";
              } else {
                this.toastMsg = "合同编辑成功";
              }
              this.$emit("changeIsSaved");
            }
            setTimeout(() => {
              this.isToast = false;
              this.canSubmit = true;
              if (_data.retCode === 0) {
                if (this.isAdd) {
                   this.$store.dispatch("setExtraData", []);
                this.$router.push({
                  path: `/tasks/add/${this.projectInfo.projectInfo.customerId}/${this.projectInfo.projectInfo.projectId}/7/17`,
                  query: {
                    id: _data.retData.id,
                    tax: 6
                  }
                });
                } else {
                  this.$store.dispatch("setExtraData", []);
                this.$router.push({
                  path: `/tasks/list/${this.projectInfo.projectInfo.customerId}/${this.projectInfo.projectInfo.projectId}`,
                  query: {
                    toolkitId: 7
                  }
                });
                }
                
              }
            }, 2000);
          });
      }
    }
  },
  created() {
    if (!this.isAdd) {
        this.contactsList = this.allPartA.find(e => {
        return JSON.parse(this.formValue.contractsInfo.partyA.name.value).accountName == e.accountName
      }).contactsList
    }
  }
};
</script>
 


