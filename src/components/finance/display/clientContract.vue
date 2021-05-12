<!--客户合同-展示-->
<template>
  <div class="financeToolkit">
    <Alert v-show="formValue.info.state == 7 && activeVer == 0" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>质检不通过
      </span>
      <span class="alert-detail">
        <i-input
          type="textarea"
          autosize
          :value="formValue.formInfo[activeVer].inspectedReason"
          disabled
        ></i-input>
      </span>
    </Alert>
    <Alert v-show="formValue.info.flowState == -2 && activeVer == 0" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>盖章审批不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="formValue.info.auditShenPiReason" disabled></i-input>
      </span>
    </Alert>
    <Alert v-show="formValue.info.flowState == -4 && activeVer == 0" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>开票审批不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="formValue.roleInfo.reason" disabled></i-input>
      </span>
    </Alert>
    <Alert v-show="formValue.info.state == 9 && activeVer == 0" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>PM验收不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="formValue.formInfo[activeVer].pmReason" disabled></i-input>
      </span>
    </Alert>
    <div class="finance">
      <div class="ver-tabs">
        <ul>
          <li
            v-for="n in verCount"
            :class="{active: n === activeVer + 1}"
            @click="changeVer(n - 1)"
          >{{'V' + (verCount - n + 1)}}</li>
        </ul>
      </div>
      <i-form
        label-position="left"
        :label-width="88"
        class="default-form client-contract"
        style="margin-left:32px"
      >
        <!-- 基础信息 -->
        <div class="contract-form-group">
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同名称" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.contractName.value"
                    readonly
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同ID" class="default-form-item" required>
                  <i-input v-model="formValue.info.contactsCode" readonly></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="截止时间" class="default-form-item" required>
                  <DatePicker
                    readonly
                    transfer
                    class="deadline"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="设置截止时间"
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.endTime.value"
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
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.projectName.value"
                    readonly
                    placeholder="项目名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="项目ID" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.projectId.value"
                    readonly
                    placeholder="自动填充"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="客户名称" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.clientName.value"
                    readonly
                    placeholder="客户名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="客户ID" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.clientId.value"
                    readonly
                    placeholder="自动填充"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同类型" class="default-form-item" required>
                  <i-input
                    v-model="contractTypeList[formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.contractType.value - 1]"
                    readonly
                    placeholder="合同类型"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同期限" class="default-form-item" required>
                  <DatePicker
                    class="deadline"
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.modifyInfo.contractDeadline.value"
                    readonly
                    type="daterange"
                    split-panels
                    placeholder="请设置合同期限"
                    :clearable="false"
                  ></DatePicker>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div
            v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.contractType.value == 5 && formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.remark"
          >
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="备注" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.remark.value"
                    readonly
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
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.organizeUnit.value"
                    style="padding-left:24px"
                  >
                    <Row>
                      <i-col span="12">
                        <Radio label="1" disabled style="height:53px;line-height:53px">公司</Radio>
                      </i-col>
                      <i-col span="12">
                        <Radio label="0" disabled style="height:53px;line-height:53px">个人</Radio>
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
                  <Cascader v-model="toNumberList" :data="bussinessTypeList" disabled placeholder></Cascader>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="业务概述" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.bussinessOverview.value"
                    readonly
                    placeholder="请输入业务概述"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="是否为代付" class="default-form-item" required>
                  <RadioGroup
                    size="large"
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.modifyInfo.insteadPay.value"
                    style="padding-left:24px"
                  >
                    <Row>
                      <i-col span="12">
                        <Radio disabled label="1" style="height:53px;line-height:53px">是</Radio>
                      </i-col>
                      <i-col span="12">
                        <Radio disabled label="0" style="height:53px;line-height:53px">否</Radio>
                      </i-col>
                    </Row>
                  </RadioGroup>
                </FormItem>
              </i-col>
              <i-col span="12" style="background:white"></i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="金额" class="default-form-item" required>
                  <i-input
                    :value="formatMoney(formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value)"
                    readonly
                    placeholder="请输入金额"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="付款方式" class="default-form-item" required>
                  <RadioGroup
                    size="large"
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.payType.value"
                    style="padding-left:24px"
                  >
                    <Row>
                      <i-col span="12">
                        <Radio label="1" disabled style="height:53px;line-height:53px">单次付款</Radio>
                      </i-col>
                      <i-col span="12">
                        <Radio label="0" disabled style="height:53px;line-height:53px">分期付款</Radio>
                      </i-col>
                    </Row>
                  </RadioGroup>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="发票" class="default-form-item" required>
                  <i-input
                    :value="formValue.formInfo[activeVer].formContent.contractsInfo.secondModifyInfo.invoice.value"
                    readonly
                    placeholder="请选择发票"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="税率" class="default-form-item" required>
                  <input-number
                  :value="formValue.formInfo[activeVer].formContent.contractsInfo.secondModifyInfo.taxRate.value"
                  :formatter="value => `${value === '' ? '' : value + '%'}`"
                  :parser="value => value.replace('%', '')"
                  :min="0"
                  readonly
                  placeholder="请输入税率"
                ></input-number>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div
            v-show="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.payType.value === '0'"
          >
            <Row>
              <i-col span="24">
                <FormItem label="备注" class="default-form-item" required>
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.modifyInfo.remark.value"
                    readonly
                    placeholder="请注明分几次付款，每次付款时间和金额"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="甲方名称" class="default-form-item" required>
                  <i-input
                    v-model="JSON.parse(formValue.formInfo[activeVer].formContent.contractsInfo.partyA.name.value).accountName"
                    readonly
                    placeholder="甲方名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="联系人" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.contactPerson.value"
                    readonly
                    placeholder="请输入联系人姓名"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户名称" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.accountName.value"
                    readonly
                    placeholder="请输入账户名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户税号" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.accountTaxNum.value"
                    readonly
                    placeholder="请输入账户税号"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户银行" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.openBank.value"
                    readonly
                    placeholder="请输入开户银行"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户账号" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.openAccount.value"
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
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.companyMobile.value"
                    readonly
                    placeholder="请输入公司电话"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公司地址" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyA.companyAddress.value"
                    readonly
                    placeholder="请输入公司地址"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="乙方名称" class="default-form-item" required>
                  <i-input
                    v-model="JSON.parse(formValue.formInfo[activeVer].formContent.contractsInfo.partyB.name.value).accountName"
                    readonly
                    placeholder="乙方名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="联系人" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.contactPerson.value"
                    readonly
                    placeholder="请输入联系人姓名"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户名称" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.accountName.value"
                    readonly
                    placeholder="请输入账户名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户税号" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.accountTaxNum.value"
                    readonly
                    placeholder="请输入账户税号"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.formInfo[activeVer].formContent.contractsInfo.basicInfo.money.value">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户银行" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.openBank.value"
                    readonly
                    placeholder="请输入开户银行"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户账号" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.openAccount.value"
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
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.companyMobile.value"
                    readonly
                    placeholder="请输入公司电话"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公司地址" class="default-form-item">
                  <i-input
                    v-model="formValue.formInfo[activeVer].formContent.contractsInfo.partyB.companyAddress.value"
                    readonly
                    placeholder="请输入公司地址"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </div>

        <!-- 公盘地址 -->
        <!-- <file-address
          :operation="formValue.roleInfo.operation"
          :gaizhang-file="formValue.roleInfo.new_gaizhang_file"
          :edit-file="editfile"
          :task-address="taskAddress"
        ></file-address> -->
        <new-file-address :address="newTaskAddress" :edit="formValue.roleInfo.new_gaizhang_file == 'show'"></new-file-address>
        <!-- 报价单 -->
        <quotation-list
          ref="quotationList"
          :task-info="formValue.info"
          :project-info="projectInfo"
          :form-value="formValue"
          :change-baojiadan="changeBaojiadan"
          :is-client="true"
          @nopass-kaipiao="changeModal()"
          @refresh="resfresh()"
        ></quotation-list>
        <!-- 任务日志 -->
        <file-log :log-list="logList" :inspect-files="inspectList"></file-log>
        <!-- 按钮  资源管理下不显示 -->
        <div v-if="!disableControl" class="contract-btn">
          <Button
            v-if="formValue.roleInfo.eidt == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="edit()"
          >编辑任务</Button>
          <!-- <Button
            v-if="formValue.roleInfo.audit == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="audit(3)"
          >审核通过</Button>
          <Button
            v-if="formValue.roleInfo.audit == 'show'"
            type="primary"
            class="btn"
            @click="changeModal(2)"
          >审核不通过</Button> -->
          <Button
            v-if="formValue.roleInfo.new_baojiadan_add == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="addQuotation()"
          >添加项目结算单</Button>
          <!-- <Button
            v-if="formValue.roleInfo.operation == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="audit(5)"
          >提交</Button>
          <Button
            v-if="editfile === false && formValue.roleInfo.new_gaizhang_file == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="editfile = true"
          >修改</Button>
          <Button
            v-if="editfile === true && formValue.roleInfo.new_gaizhang_file == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="audit(5)"
          >确认修改</Button> -->
          <!-- <Button
            v-if="formValue.roleInfo.inspect == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="review(6)"
          >质检通过</Button>
          <Button
            v-if="formValue.roleInfo.inspect == 'show'"
            type="primary"
            class="btn"
            @click="changeModal(7)"
          >质检不通过</Button>
          <Button
            v-if="formValue.roleInfo.new_gaizhang_apply == 'show'"
            type="primary"
            class="btn"
            @click="hetongseal(1)"
          >申请盖章</Button> -->
          <Button
            v-if="formValue.roleInfo.new_gaizhang_audit == 'show'"
            type="primary"
            class="btn"
            @click="hetongseal(2)"
          >审核通过</Button>
          <Button
            v-if="formValue.roleInfo.new_gaizhang_audit == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="changeModal(-2)"
          >审核不通过</Button>
          <Button
            v-if="formValue.roleInfo.new_gaizhang_file == 'show'"
            type="primary"
            class="btn"
            @click="hetongsealfile()"
          >提交</Button>
          <Button
            v-if="formValue.roleInfo.new_kaipiao_apply == 'show'"
            type="primary"
            class="btn"
            @click="kaipiaoApply()"
          >申请开票</Button>
          <Button
            v-if="formValue.roleInfo.new_kaipiao_audit == 'show'"
            type="primary"
            class="btn"
            @click="kaipiao(6)"
          >审核通过</Button>
          <Button
            v-if="formValue.roleInfo.new_kaipiao_audit == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="changeModal(7,'kaipiao')"
          >审核不通过</Button>
          <Button
            v-if="formValue.roleInfo.new_kaipiao_money == 'show'"
            type="primary"
            class="btn"
            @click="fukuan()"
          >已支付</Button>
          <Button
            v-if="formValue.roleInfo.new_pmAudit == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="review(8)"
          >任务已完成</Button>
          <!--          <Button-->
          <!--            v-if="formValue.roleInfo.pmAudit == 'show'"-->
          <!--            type="primary"-->
          <!--            class="btn"-->
          <!--            @click="changeModal(9)"-->
          <!--          >任务未完成</Button>-->
          <!-- <Button type="primary" class="btn">添加补充协议</Button> -->
        </div>
      </i-form>
    </div>
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
          @click.native="audit(state)"
          :disabled="modalValue.length > 1000 || modalValue.length == 0"
        >提交</Button>
      </div>
    </Modal>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import Toast from "../../popup/Toast";
import { Task, Index } from "../../../API/api";
import MemberAdd from "../../MemberAdd";
import fileAddress from "../components/fileAddress.vue";
import newFileAddress from "../components/newFileAddress.vue";
import quotationList from "../components/quotationList.vue";
import fileLog from "../components/fileLog.vue";
import { OptList } from "../../../assets/conf/businessType.conf.js";
import { thousandSplit } from "../../../util/util.js";

export default {
  name: "client-contract",
  components: {
    MemberAdd,
    fileAddress,
    newFileAddress,
    quotationList,
    fileLog,
    Toast
  },
  props: {
    activeVer: {
      type: [Number, String]
    },
    verCount: {
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
    },
    fileList: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      isToast: false,
      toastMsg: "",
      editfile: false,
      showModal: false,
      modalValue: "",
      auditState: null,
      iskaipiao: null,
      changeBaojiadan: false,
      allUser: [],
      contractTypeList: [
        "项目合同",
        "框架合同",
        "报价单/结算单",
        "保密协议",
        "其他"
      ],
      bussinessTypeList: JSON.parse(JSON.stringify(OptList))
    };
  },
  computed: {
    toNumberList() {
      let businessType = [];
      if (
        typeof this.formValue.formInfo[this.activeVer].formContent.contractsInfo
          .basicInfo.bussinessType.value == "object"
      ) {
        this.formValue.formInfo[
          this.activeVer
        ].formContent.contractsInfo.basicInfo.bussinessType.value.forEach(
          ele => {
            businessType.push(Number(ele));
          }
        );
      }
      return businessType;
    },
    disableControl() {
      return this.$route.name === "clientContract";
    },
    inspectList() {
      return this.formValue.inspectFiles;
    },
    taskAddress() {
      if (this.formValue.gaizhangFile.length) {
        return this.formValue.gaizhangFile;
      } else {
        return [
          {
            fileName: "",
            url: ""
          }
        ];
      }
    },
    newTaskAddress() {
     return this.formValue.gaizhangFile[0]
    },
    listParams() {
      return this.$store.state.taskFilter;
    },
    operationPosName() {
      let posName = "";
      this.allUser.forEach(user => {
        if (this.formValue.operationInfo[0].operationName == user.englishName) {
          posName = user.positionName;
        }
      });
      return posName;
    },
    inspectPosName() {
      let posName = "";
      this.allUser.forEach(user => {
        if (this.formValue.operationInfo[0].inspectorName == user.englishName) {
          posName = user.positionName;
        }
      });
      return posName;
    }
  },
  created() {
    this.getAllUser();
  },
  methods: {
    formatMoney(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(Math.round(m * 100) / 100 + "");
    },
    /* 获取所有员工信息 */
    getAllUser() {
      this.$http
        .post(Index.allUsers, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.allUser = res.data.retData.data;
        });
    },
    changeVer(num) {
      this.$emit("changeVer", num);
    },
    changeModal(state, kaipiao) {
      this.showModal = true;
      this.state = state;
      this.iskaipiao = kaipiao;
    },
    resfresh() {
      this.$emit("setRefresh");
    },
    edit() {
      this.$router.push({
        path: `/tasks/edit/${this.formValue.info.id}/${
          this.projectInfo.customerId
        }/${this.projectInfo.projectId}`,
        query: {
          toolkitId: 7
        }
      });
    },
    fukuan() {
      let formData = {
        kfId: this.formValue.roleInfo.kfId,
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
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    kaipiao(state) {
      let formData = {
        id: this.formValue.roleInfo.kfId,
        state: state
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
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    kaipiaoApply() {
      let formData = {
        projectId: this.formValue.info.projectId,
        productId: this.formValue.info.productId,
        toolkitId: 19,
        hetongId: this.formValue.info.id,
        // baojiadanId: [baojiadanId],
        operationInfo: [
          {
            operationId: JSON.parse(localStorage.getItem("userInfo")).id
          }
        ],
        taskName: this.formValue.formInfo[0].formContent.contractsInfo.basicInfo
          .contractName.value
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
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    hetongseal(state) {
      let formData = {
        hetongId: this.formValue.info.id,
        flowState: state
      };
      this.$http
        .post(Task.hetongseal, this.qs.stringify(formData), {
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
            this.toastMsg = "提交成功";
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    hetongsealfile() {
      if (!this.newTaskAddress.fileName) {
        this.isToast = true;
        this.toastMsg = "请输入文件";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
        }, 1500);
        return;
      }

      if (!this.newTaskAddress.url) {
        this.isToast = true;
        this.toastMsg = "请输入公盘地址";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
        }, 1500);
        return;
      }

      let formData = {
        hetongId: this.formValue.info.id,
        fileName: this.newTaskAddress.fileName,
        fileAddress: this.newTaskAddress.url
      };


      this.$http
        .post(Task.hetongsealfile, this.qs.stringify(formData), {
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
            this.toastMsg = "提交成功，请等待合同盖章文件审批";
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    review(state) {
      let formData = {
        id: this.formValue.info.id,
        state: state,
        // reason: "名字太短"
        taskData: this.taskAddress,
        taskForm: this.formValue.formInfo[this.activeVer].formContent
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
            this.isToast = true;
            this.toastMsg = "提交成功";
          }
          setTimeout(() => {
            this.isToast = false;
            if (_data.retCode === 0) {
              this.$store.dispatch("setRefresh");
            }
          }, 1500);
        });
    },
    audit(state) {
      if (this.iskaipiao == "kaipiao") {
        let formData = {
          id: this.formValue.roleInfo.kfId,
          state: state,
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
              this.modalValue = "";
              this.showModal = false;
              this.isToast = true;
              this.toastMsg = "提交成功";
            }
            setTimeout(() => {
              this.isToast = false;
              if (_data.retCode === 0) {
                this.$store.dispatch("setRefresh");
              }
            }, 1500);
          });
      } else {
        if (state == -2) {
          let formData = {
            hetongId: this.formValue.info.id,
            flowState: -2,
            reason: this.modalValue
          };
          this.$http
            .post(Task.hetongseal, this.qs.stringify(formData), {
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
                this.modalValue = "";
                this.showModal = false;
                this.isToast = true;
                this.toastMsg = "提交成功";
                this.editfile = false;
              }
              setTimeout(() => {
                this.isToast = false;
                if (_data.retCode === 0) {
                  this.$store.dispatch("setRefresh");
                }
              }, 1500);
            });
        } else {
          let formData = {
            id: this.formValue.info.id,
            state: state
          };
          if (state == 2 || state == 7 || state == 9) {
            if (!this.modalValue) {
              this.canSubmit = false;
            } else {
              formData.reason = this.modalValue;
            }
          } else if (state == 5) {
            formData.taskData = this.taskAddress;
            formData.taskForm = this.formValue.formInfo[
              this.activeVer
            ].formContent;
          }
          this.$http
            .post(Task.audit, this.qs.stringify(formData), {
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
                this.modalValue = "";
                this.showModal = false;
                this.isToast = true;
                this.toastMsg = "提交成功";
                this.editfile = false;
              }
              setTimeout(() => {
                this.isToast = false;
                if (_data.retCode === 0) {
                  this.$store.dispatch("setRefresh");
                }
              }, 1500);
            });
        }
      }
    },
    addQuotation() {
      const tax = this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value === '' ? 6 : this.formValue.formInfo[0].formContent.contractsInfo.secondModifyInfo.taxRate.value;
      this.$router.push({
        path:
          "/tasks/add/" +
          this.projectInfo.customerId +
          "/" +
          this.projectInfo.projectId +
          "/" +
          7 +
          "/" +
          17,
        query: {
          id: this.formValue.info.id,
          tax,
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  background: white;
  border: 30px solid white;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addFile {
  height: 40px;
  background-color: white;
  color: #2d8ef8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.finance {
  position: relative;
  padding: 30px 20px;
  background-color: white;
  .ver-tabs {
    position: absolute;
    top: 20;
    left: 20px;
    width: 32px;
    ul {
      li {
        background-color: #f8f9fa;
        color: #343a40;
        font-size: 14px;
        border: solid 1px #e9ecef;
        border-right: 0 none;
        border-radius: 4px 0 0 4px;
        line-height: 48px;
        text-align: center;
        margin-bottom: -1px;
        cursor: pointer;
        &.active,
        &:hover {
          color: #fff;
          background-color: #107cd9;
        }
      }
    }
  }
}

.border {
  border: 1px solid #ced4da;
}
.border-bottom {
  border-bottom: 1px solid #ced4da;
}
.file {
  border-bottom: 1px solid #ced4da;
  .text-center {
    text-align: center;
    height: 30px;
    line-height: 30px;
    &:nth-child(2n-1) {
      border-right: 1px solid #ced4da;
    }
  }
  &:first-child {
    background: #f1f3f5;
  }
  &:last-child {
    border-bottom: 0;
  }
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
