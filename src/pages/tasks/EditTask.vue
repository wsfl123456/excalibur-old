<template>
  <div class="edit-form" >
    <!--<toolkit :add-icon-disabled="true"></toolkit>-->
    <Card class="form-card">
      <h2 slot="title">修改{{toolkitName}}任务</h2>
       <!-- 财务工具包tips -->
        <div v-if="contractsInfo || quotationInfo || $route.query.type === 'supplierContract' || billingInfo"  style="margin-bottom:15px">
          <div style="float:left">
            <Tooltip content="项目" placement="bottom">
              <Icon type="home" size="25" style="vertical-align: middle"></Icon>
            </Tooltip>
            <span style="margin-left:20px">
              <router-link :to="`/projects/detail/${projectId}`">{{ projectName }}</router-link>
            </span>
          </div>
          <div style="float:left;margin-left:100px">
            <Tooltip content="品牌" placement="bottom">
              <Icon type="card" size="25" style="vertical-align: middle"></Icon>
            </Tooltip>
            <span style="margin-left:20px">
              <router-link to="/v2/resource/brand">{{ brand }}</router-link>
            </span>
          </div>
          <div style="float:left;margin-left:100px">
            <div class="base-tips">
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="tipsItem.name === '基础Tips'">
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
            </div>
          </div>
          <div style="text-align:right;">
            <Button type="primary" size="large" @click="openFeed" style="vertical-align:middle">意见反馈</Button>
          </div>
        </div>

      <Row v-if="!isLoading">
        <!-- 客户合同 -->
        <i-col v-if="contractsInfo" span="24" class="task-form">
          <div>
            <task-edit-form
              v-if="hasAllPartA && hasLoadData"
              type="clientContract"
              :form-value="loadedData.formInfo[0].formContent"
              :project-info="loadedData"
              :operation-info="loadedData.operationInfo"
              :all-part-a="customerPartyA"
              :all-part-b="customerPartyB"
              :is-add="false"
              :tips="tips"
              @changeIsSaved="changeIsSaved"
            ></task-edit-form>
          </div>
        </i-col>
        <!-- 报价单 -->
        <i-col v-else-if="quotationInfo" span="24" class="task-form">
          <div>
            <task-edit-form
              type="quotation"
              :form-value="quotationFormValue"
              :project-info="loadedData"
              :operation-info="loadedData.operationInfo"
              :all-part-a="allPartA"
              :all-part-b="allPartB"
              :is-add="false"
              :tips="tips"
              @changeIsSaved="changeIsSaved"
            ></task-edit-form>
          </div>
        </i-col>

        <!--   供应商合同     -->
        <i-col v-else-if="$route.query.type === 'supplierContract'" span="24" class="task-form">
          <div>
            <task-edit-form
              type="supplierContract"
              @changeIsSaved = 'changeIsSaved'
              :form-value="loadedData.formInfo[0].formContent"
              :project-info="loadedData"
              :operation-info='loadedData.operationInfo'
              :all-part-a="allPartA"
              :all-part-b="allPartB"
              :is-add='false'
              :tips="tips"
            ></task-edit-form>
          </div>
        </i-col>
        <!-- 开票 -->
        <i-col v-else-if="billingInfo" span="24" class="task-form">
          <div>
            <task-edit-form
              type="billing"
              :form-value="loadedData.formInfo[0].formContent"
              :project-info="loadedData"
              :operation-info="loadedData.operationInfo"
              :all-part-a="allPartA"
              :all-part-b="allPartB"
              :is-add="false"
              :tips="tips"
              @changeIsSaved="changeIsSaved"
            ></task-edit-form>
          </div>
        </i-col>
        <Row v-else>
          <i-col span="17" class="task-form">
            <contract-tpl v-if="contractTpl && contractTpl.length > 0" :tpls="contractTpl"></contract-tpl>

            <!--基础通用模块-->
            <task-edit-form :form-value="basicValue" :form-label="basicInfo"></task-edit-form>

            <div v-if="showCase">
              <task-edit-form
                type="showCase"
                :form-value="showCase"
                :form-label="showCase"
                :tips="tips"
              ></task-edit-form>
            </div>
            <!--dashboard -->
            <div v-if="dashboard">
              <task-edit-form
                type="dashboard"
                :form-value="dashboard"
                :form-label="dashboard"
                :tips="tips"
                @on-select-type="changeDashBoard"
              ></task-edit-form>
            </div>

            <extra-options
              :extra-options="extraInfoOptions"
              v-if="+loadedData.info.toolkitId === 2"
            ></extra-options>

            <task-edit-form
              :form-value="extraDatas"
              type="extra"
              :form-label="extraTypes"
              :tips="tips"
            ></task-edit-form>

            <!--&lt;!&ndash;报销模块&ndash;&gt;-->
            <!--<div v-if="taskFormData.hasOwnProperty('reimbursement')">-->
            <!--<task-edit-form type="reimbursement" :form-label="taskFormData.reimbursement" :form-value="taskFormData.reimbursement" :full-value="taskFormData"></task-edit-form>-->
            <!--</div>-->

            <!--&lt;!&ndash;快递&ndash;&gt;-->
            <!--<div v-if="taskFormData.hasOwnProperty('express')">-->
            <!--&lt;!&ndash;<div v-for="(value, idx) in taskFormData.express" :key="'express-' + idx">&ndash;&gt;-->
            <!--<task-edit-form type="express" :form-label="taskFormData.express" :form-value="taskFormData.express"></task-edit-form>-->
            <!--</div>-->

            <!--技术-应用需求模块-->
            <div v-if="techProject">
              <task-edit-form
                type="techProject"
                :form-value="techProject"
                :form-label="techProject"
                :tips="tips"
              ></task-edit-form>
            </div>

            <!--报销模块-->
            <div v-if="reimbursement">
              <task-edit-form
                type="reimbursement"
                :form-label="reimbursement"
                :form-value="reimbursement"
                :full-value="{reimbursement, formData: formInfoData,operationInfo}"
                :tips="tips"
              ></task-edit-form>
            </div>

            <!--快递-->
            <div v-if="express">
              <task-edit-form
                type="express"
                :form-label="express"
                :form-value="express"
                :project-id="projectId"
                :tips="tips"
                :currUserBrand="currUserBrand"
                v-if="currUserBrand.length"
              ></task-edit-form>
            </div>

            <p v-if="parseInt(loadedData.info.toolkitId) === 22">
              若收件人为批量，请在下方添加收件人信息的公盘地址
              <br>格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\
            </p>
            <!--常规模块-->
            <div v-for="(item, index) in formInfoData" :key="'formInfo-' + index">
              <task-edit-form
                type="formData"
                :form-label="item"
                :form-value="item"
                :project-id="projectId"
                :tips="tips"
                :operation-info="operationInfo"
              ></task-edit-form>
            </div>

            <!--媒介-kol-->
            <div v-if="mediaKOL">
              <task-edit-form
                type="mediaKOL"
                :form-label="mediaKOL"
                :form-value="mediaKOL"
                :tips="tips"
              ></task-edit-form>
            </div>
            <!--<div v-for="(value, key) in taskFormData.formData" :key="'taskFormData-' + key">-->
            <!--<task-edit-form type="formData" :form-label="value" :form-value="value" :all-part-a="allPartA" :all-part-b="allPartB"></task-edit-form>-->
            <!--</div>-->

            <!--合同模块-->
            <template v-if="+loadedData.info.toolkitId === 16 || +loadedData.info.toolkitId === 17">
              <div v-for="(value, idx) in contactsInfo" :key="'contacts-' + idx">
                <div v-if="value.hasOwnProperty('baseInfo')">
                  <task-edit-form
                    type="contacts"
                    :form-label="value.baseInfo"
                    :form-value="value.baseInfo"
                    :tips="tips"
                  ></task-edit-form>
                </div>

                <div v-if="value.hasOwnProperty('customerInfo')">
                  <task-edit-form
                    type="customer"
                    :form-label="value.customerInfo"
                    :form-value="value.customerInfo"
                    :all-part-a="allPartA"
                    :all-part-b="allPartB"
                    :tips="tips"
                    :project-id="projectId"
                    :customer-id="customerId"
                  ></task-edit-form>
                </div>
                <div v-if="value.hasOwnProperty('companyInfo')">
                  <task-edit-form
                    type="company"
                    :form-label="value.companyInfo"
                    :form-value="value.companyInfo"
                    :all-part-a="allPartA"
                    :all-part-b="allPartB"
                    :tips="tips"
                  ></task-edit-form>
                </div>
              </div>
            </template>

            <!--发票-->
            <div v-if="invoice">
              <div>
                <task-edit-form
                  type="invoice"
                  :form-value="invoice"
                  :form-label="invoice"
                  :all-invoice="allInvoice"
                  :tips="tips"
                ></task-edit-form>
              </div>
            </div>

            <!--请款模块-->
            <div v-if="askMoney">
              <div>
                <task-edit-form
                  type="askMoney"
                  :form-label="askMoney"
                  :form-value="askMoney"
                  :all-contract="allContract"
                  :tips="tips"
                ></task-edit-form>
              </div>
            </div>

            <!--盖章-->
            <div v-if="seal">
            <administrative-seal :formValue='loadedData.formInfo[0].formContent.seal' :tips='tips'></administrative-seal>
            </div>
            <!--执行人 申请人 etc 模块-->
            <div
              v-for="(value, key) in operationInfo"
              :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key "
            >
              <task-edit-form
                type="operationLoad"
                :form-label="value"
                :form-value="value"
                @on-add="addOperation($event, key)"
                @on-remove="removeOperation($event, key)"
                :switch-val="isQC"
                :switch-key="key"
                @on-switch="switchChange($event, key)"
                :toolkitId="loadedData.info.toolkitId"
                :tips="tips"
                :project-id="projectId"
                :task-id="taskId"
                :can-del-operater="operationInfo.length > 1"
              ></task-edit-form>
              <template v-if="isQC[key]">
                <div>
                  <task-edit-form
                    is-filter
                    type="company"
                    :form-label="contactsInfo[key].companyInfo"
                    :form-value="contactsInfo[key].companyInfo"
                    :all-part-a="allPartA"
                    :all-part-b="allPartB"
                  ></task-edit-form>
                </div>
              </template>
            </div>
            <!--<div v-for="(value, key) in operationInfo" :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key ">-->
            <!--<task-edit-form type="operationLoad" :project-id="loadedData.info.projectId" :form-label="value" :form-value="value" @on-add="addOperation($event, key)" :toolkitId="loadedData.info.toolkitId"></task-edit-form>-->
            <!--</div>-->

            <!--审核人模块-->

            <task-edit-form type="auditor" v-if="isAuditor"></task-edit-form>
            <div class="form-btns">
              <Button
                type="primary"
                class="submit-btn form-default-btn"
                size="large"
                @click.native="submit"
              >提交任务</Button>
            </div>
          </i-col>
          <i-col span="6" offset="1" class="task-belong">
            <Row class="g-mb-16">
              <i-col span="3" offset="1">
                <Tooltip content="项目" placement="bottom">
                  <Icon type="home"></Icon>
                </Tooltip>
              </i-col>
              <i-col span="20">
                <router-link :to="`/projects/detail/${projectId}`">{{projectName}}</router-link>
              </i-col>
            </Row>
            <Row>
              <i-col span="3" offset="1">
                <Tooltip content="品牌" placement="bottom">
                  <Icon type="card"></Icon>
                </Tooltip>
              </i-col>
              <i-col span="20">
                <router-link to="/v2/resource/brand">{{brand}}</router-link>
              </i-col>
            </Row>
            <Row>
              <i-col span="3" offset="1">
                <div class="base-tips">
                  <template v-for="tipsItem in tips">
                    <div class="group-tips" v-if="tipsItem.name === '基础Tips'">
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
                </div>
              </i-col>
            </Row>
            <Row class="feed-back">
              <i-col offset="1" span="23">
                <Button type="primary" size="large" @click="openFeed">意见反馈</Button>
              </i-col>
            </Row>
          </i-col>
        </Row>
      </Row>
    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>
    <loading v-if="isLoading"></loading>
    <Modal
      v-model="feedModal"
      class-name="vertical-center-modal examine-modal"
      ok-text="提交意见"
      :closable="false"
      @on-ok="submitAdvice"
    >
      <div class="advice-repo">
        <Row>
          <i-col span="24">
            <div class="g-mb-16">
              <h4 class>意见反馈</h4>
              <i-input type="textarea" :autosize="{minRows: 5, maxRows: 10}" v-model="repo"></i-input>
            </div>
            <!--<div class="form-btns">-->
            <!--<Button type="primary" class="submit-repo form-default-btn" size="large" @click="submitAdvice">提交意见</Button>-->
            <!--</div>-->
          </i-col>
        </Row>
      </div>
    </Modal>
    <leave-modal
      :is-show="isLeaveConfirm"
      @on-leave="leavePage"
      @on-saveLeave="saveLeavePage"
      @on-cancel="leaveCancel"
    ></leave-modal>
    <load-draft-modal :is-show="isDraft" @on-load="loadDraft" @on-cancel="cancelDraft"></load-draft-modal>
  </div>
</template>

<script>
import Toolkit from "../../components/Toolkit";
import BCrumb from "../../components/BCrumb";
import FormBox from "../../components/FormBox";
import { Task, cacheData, Brand } from "../../API/api";
import TaskEditForm from "../../components/TaskEditForm";
import ExtraOptions from "../../components/ExtraOptions";
// import {formConf} from '../../assets/conf/formData.conf'
import Toast from "../../components/popup/Toast";
import Loading from "../../components/popup/Loading";
import ContractTpl from "../../components/ContractTpl";
import _ from "lodash";
import { formConf } from "../../assets/conf/formData.conf";
import LeaveModal from "../../components/popup/LeaveModal";
import LoadDraftModal from "../../components/popup/LoadDraftModal";
import { ajax } from "../../util/util";
import administrativeSeal from "../../components/AdministrativeSeal";
import { mapMutations, mapGetters } from "vuex";


export default {
  components: {
    LoadDraftModal,
    LeaveModal,
    ContractTpl,
    TaskEditForm,
    FormBox,
    BCrumb,
    Toolkit,
    ExtraOptions,
    Toast,
    Loading,
    administrativeSeal
  },
  name: "edit-task",
  data() {
    return {
      menu: null,
      isSaved: false,
      isDraft: false,
      isLeaveConfirm: false,
      canSubmit: true,
      repo: "",
      feedModal: false,
      isQC: [],
      tips: [],
      allInvoice: [],
      allContract: [],
      allPartA: [],
      hasAllPartA: false,
      hasLoadData: false,
      allPartB: [],
      customerPartyA: [],
      customerPartyB: [],
      contractTpl: [],
      customerId: null,
      customerName: null,
      isLoading: false,
      toastMsg: "",
      toastStatus: "",
      operationInfo: [],
      mediaKOL: {},
      seal: {},
      isToast: false,
      projectName: null,
      projectId: "",
      brand: null,
      isAuditor: false,
      toolkitName: null,
      extraTypes: {
        1: "Brief",
        2: "方案",
        3: "参考",
        4: "客户资料",
        5: "线框",
        6: "layout",
        7: "时间表",
        8: "排期表"
      },
      loadedData: {},
      formInfoData: [],
      reimbursement: [],
      currUserBrand: [],
      invoice: {},
      express: {},
      contractsInfo: {},
      askMoney: {},
      techProject: {},
      dashboard: {},
      showCase: {},
      contactsInfo: [],
      financeProjectInfo: null,
      formData: {
        projectId: this.$route.params.id,
        productId: this.$route.params.productId,
        toolkitId: this.$route.params.toolkitId,
        startTime: null,
        endTime: null,
        taskData: [],
        auditorId: null,
        level: null,
        taskName: null,
        formData: {},
        operationInfo: []
      },
      basicInfo: {
        taskName: {
          label: "任务名称",
          placeholder: "填写任务名称（必填）",
          type: "input"
        },
        endTime: {
          label: "截止时间",
          placeholder: "设置截止时间",
          type: "datetime"
        }
      },
      basicValue: {
        // 'taskId': this.$route.params.taskId,
        // 'startTime': null,
        // 'endTime': null,
        // 'taskData': [],
        // 'auditorId': null,
        // 'level': null,
        // 'taskName': '',
        // 'taskForm': '',
        // 'operationInfo': []
      },
      extraInfoOptions: [
        { label: "Brief", id: 1 },
        { label: "方案", id: 2 },
        { label: "参考", id: 3 },
        { label: "客户资料", id: 4 },
        { label: "线框", id: 5 },
        { label: "layout", id: 6 },
        { label: "时间表", id: 7 },
        { label: "排期表", id: 8 }
      ],
      qcTpl: {
        companyInfo: {
          // 供应商合同信息，字段同上，除id外，其他可以为空
          companyId: "",
          companyName: {
            label: "供应商名称",
            type: "auto",
            customType: "inner",
            name: "part_b_name",
            value: "",
            placeholder: "输入供应商名称以供选择供应商"
          },
          companyTel: {
            label: "公司电话",
            type: "input",
            name: "part_b_tel",
            value: "",
            placeholder: "输入供应商名称以供选择供应商"
          },
          companyAccountName: {
            label: "账户名称",
            type: "input",
            name: "part_b_account",
            value: "",
            placeholder: "输入供应商名称以供选择供应商"
          },
          companyDutyParagraph: {
            label: "账户税号",
            type: "input",
            name: "part_b_duty",
            value: "",
            placeholder: "输入供应商名称以供选择供应商"
          },
          companyBankName: {
            label: "开户银行",
            type: "input",
            name: "part_b_bank",
            value: ""
          },
          companyAccountId: {
            label: "开户账号",
            type: "input",
            name: "part_b_bank_account",
            value: ""
          },
          companyAddress: {
            label: "公司地址",
            type: "input",
            name: "part_b_addr",
            value: ""
          }
        }
      },
      maxMemberNo: 0,
      dashboardOperate: {
        1: "SM",
        2: "Video",
        3: "PBM",
        4: "Site"
      },
      quotationFormValue : null
      // taskFormData: JSON.parse(JSON.stringify(formConf[this.$route.params.taskId]))
    };
  },
  computed: {
    taskId() {
      return this.$route.params.taskId;
    },
    crumb() {
      let arr = [
        {
          label: "项目管理"
        },
        {
          label: "我的任务"
        }
      ];
      let currPage = {
        label:
          this.$store.state.bcrumb.label ||
          sessionStorage.getItem("task_bcrumb"),
        url:
          this.$store.state.bcrumb.url ||
          sessionStorage.getItem("task_bcrumb_url")
      };
      arr.push(currPage);
      arr.push({ label: `修改${this.toolkitName}任务` });

      return arr;
    },
    addedExtra() {
      return this.$store.state.selectedExtraOption;
    },
    extraDatas() {
      return this.$store.state.extraDatas;
    },
    currMenu() {
      return this.$store.state.index.currMenu;
    }
    // requirement () {
    //   return this.$store.state.requirement[this.$route.params.toolkitId]
    // }
  },
  methods: {
    init() {
      this.setCurrPage();
      this.cacheMenu();
    },
     getCurrUserBrand() {
      this.$http
        .post(
          Brand.listByProject,
          this.qs.stringify({
            page: 1,
            pageSize: 1000,
            powerType: 1
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          if (res.data.retCode === 0) {
            this.currUserBrand = res.data.retData.customerList.data
          }
        });
    },
    changeIsSaved() {
      this.isSaved = true;
    },
    setCurrPage() {
      this.$store.dispatch("setCurrPage", "编辑任务");
    },
    changeDashBoard(v) {
      // this.operationInfo = []
      // v.forEach(item => {
      //   const tpl = {
      //     operationId: null,
      //     inspectorId: null,
      //     content: {
      //       canMore: true,
      //       title: this.dashboardOperate[item]
      //     }
      //   }
      //   this.operationInfo.push(tpl)
      // })
    },
    openFeed() {
      this.feedModal = true;
    },
    submitAdvice() {
      // this.repoFormat = this.repo.replace(/\n/g, '<br/>')
      this.$http
        .post(
          Task.adviceRepo,
          this.qs.stringify({
            toolkitId: this.loadedData.info.toolkitId,
            content: this.repo
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          if (res.data.retCode === 0) {
            this.isToast = true;
            this.toastMsg = "提交成功";
            this.toastState = "success";
            setTimeout(() => {
              this.isToast = false;
              this.repo = "";
            }, 1500);
          }
        });
    },
    switchChange(v, key) {
      if (v) {
        if (!this.contactsInfo[key]) {
          const contactTpl = JSON.parse(JSON.stringify(this.qcTpl));
          // this.taskFormData.contactsInfo[key] = contactTpl
          this.$set(this.contactsInfo, key, contactTpl);
        }
      }
    },
    getAllInvoice() {
      this.$http
        .post(
          Task.allQuotation,
          this.qs.stringify({ projectId: this.projectId }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.allInvoice = _data.retData.data;
          }
        });
    },
    getAllContract() {
      this.$http
        .post(
          Task.allContract,
          this.qs.stringify({ projectId: this.projectId }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.allContract = _data.retData.data;
          }
        });
    },
    getAllCustomer(type) {
      switch (type) {
        case "outer":
          // if (this.needGetPartA) {
          this.$http
            .post(
              Task.allPartA,
              this.qs.stringify({ customerId: this.customerId }),
              {
                headers: {
                  Authorization: "Bearer " + this.$cookie.get("token")
                }
              }
            )
            .then(res => {
              const _data = res.data;
              if (_data.retCode === 0) {
                // this.needGetPartA = false
                this.allPartA = _data.retData.data;
                this.hasAllPartA = true;
              }
            });
          // }
          // if (e === '') {
          //   this.needGetPartA = true
          //   this.allPartA = []
          // }
          break;
        case "inner":
          // if (this.needGetPartB) {
          let data = {
            customerId: this.customerId,
            projectId: this.projectId
          };
          if (+this.loadedData.info.toolkitId === 2) {
            data.need_nc = 2;
          }
          this.$http
            .post(Task.allPartB, this.qs.stringify(data), {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            })
            .then(res => {
              const _data = res.data;
              if (_data.retCode === 0) {
                // this.needGetPartB = false
                this.allPartB = _data.retData.data;
              }
              // if (e === '') {
              //   this.needGetPartB = true
              //   this.allPartB = []
              // }
            });
          // }
          break;
      }
    },
      /* 获取客户合同甲方 */
    getCustomerPartyA() {
      this.$http
        .post(
          Task.allPartA,
          this.qs.stringify({ customerId: this.customerId, need_nc: 2 }),
          {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("token")
            }
          }
        )
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.customerPartyA = _data.retData.data;
          }
        });
    },
    /* 获取客户合同乙方 */
    getCustomerPartyB() {
      this.$http
        .post(Task.innerCustomerNC, this.qs.stringify(), {
          headers: {
            Authorization: "Bearer " + this.$cookie.get("token")
          }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.customerPartyB = _data.retData.data;
          }
        });
    },
    submit() {
      let noVali = false;
      if (this.canSubmit) {
        this.canSubmit = false;
        if (+this.loadedData.info.toolkitId === 2) {
          this.isQC.forEach((item, idx) => {
            if (!item) {
              this.contactsInfo[idx] = null;
            }
          });
          if (this.isQC.length === 0) {
            this.contactsInfo = [];
          }
        }

        // 通用验证
        if (!this.basicValue.taskName || this.basicValue.taskName === "") {
          this.toastMsg = "请填写任务名";
          this.toastStatus = null;
          noVali = true;
        } else if (!this.basicValue.endTime || this.basicValue.endTime === "") {
          this.toastMsg = "请选择截止时间";
          this.toastStatus = null;
          noVali = true;
        } else if (
          new Date(this.basicValue.endTime.replace(/-/g, "/")) < new Date()
        ) {
          this.toastMsg = "截止日期/时间不能小于当前日期/时间";
          this.toastStatus = null;
          noVali = true;
        }

        if (this.hasOwnProperty("formInfoData") && this.formInfoData) {
          for (let i = 0; i < this.formInfoData.length; i++) {
            let item = this.formInfoData[i];
            for (let j = 0; j < item.length; j++) {
              let _item = item[j];
              if (
                _item.hasOwnProperty("required") &&
                _item.required &&
                (_item.value.length === 0 || !_item.value)
              ) {
                this.toastMsg = `请填写${_item.label}`;
                this.toastStatus = null;
                noVali = true;
                break;
              }
              if (_item.hasOwnProperty("requiredOpt")) {
                let v = _item.value;
                let keyV;
                if (_item.requiredOpt[0].key) {
                  keyV = item[_item.requiredOpt[0].key].value;
                }

                if (_item.requiredOpt[0].type === ">") {
                  if (_item.requiredOpt[0].valueType === "date") {
                    let _v = new Date(v.replace(/-/g, "/"));
                    if (_item.requiredOpt[0].key) {
                      let _keyV = new Date(keyV.replace(/-/g, "/"));
                      if (_v < _keyV) {
                        this.toastMsg = `${_item.label} 必须 大于 ${
                          item[_item.requiredOpt[0].key].label
                        }`;
                        this.toastStatus = null;
                        noVali = true;
                        break;
                      }
                    } else if (
                      _item.requiredOpt[0].target &&
                      _item.requiredOpt[0].target === "now"
                    ) {
                      if (_v < new Date()) {
                        this.toastMsg = `${_item.label} 不得小于 当前时间`;
                        this.toastStatus = null;
                        noVali = true;
                        break;
                      }
                    }
                  }
                } else if (_item.requiredOpt[0].type === "<") {
                  if (_item.requiredOpt[0].valueType === "date") {
                    let _v = new Date(v.replace(/-/g, "/"));
                    if (_item.requiredOpt[0].key) {
                      let _keyV = new Date(keyV.replace(/-/g, "/"));
                      if (_v > _keyV) {
                        this.toastMsg = `${_item.label} 必须 小于 ${
                          item[_item.requiredOpt[0].key].label
                        }`;
                        this.toastStatus = null;
                        noVali = true;
                        break;
                      }
                    } else if (
                      _item.requiredOpt[0].target &&
                      _item.requiredOpt[0].target === "now"
                    ) {
                      if (_v > new Date()) {
                        this.toastMsg = `${_item.label} 不得大于 当前时间`;
                        this.toastStatus = null;
                        noVali = true;
                        break;
                      }
                    }
                  }
                }
              }
            }
            if (noVali) {
              break;
            }
          }
        }

        // 快递验证
        if (this.hasOwnProperty("express") && this.express) {
          if (
            !/^(\d{7,8})(-(\d{3,}))?$/.test(this.express.sender[1].value) &&
            !/^\d{11}$/.test(this.express.sender[1].value)
          ) {
            this.toastMsg = "联系方式为7～8位固话或11位手机号码";
            this.toastStatus = null;
            noVali = true;
          }
          if (this.express.sender[0].value.length === 0) {
            this.toastMsg = "请选择寄件人";
            this.toastStatus = null;
            noVali = true;
          }
          // if (this.express.receiver[0].value.length === 0) {
          //   this.toastMsg = '请填写收件人'
          //   this.toastStatus = null
          //   noVali = true
          // }
          // if (!this.express.addr.cityValue || this.express.addr.cityValue.length === 0 || this.express.addr.detailValue.length === 0) {
          //   this.toastMsg = '请填写收件地址'
          //   this.toastStatus = null
          //   noVali = true
          // }
          if (this.express.orderNo.value.length === 0) {
            this.toastMsg = "请填写快递单号";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 报价单 验证
        if (this.hasOwnProperty("invoice") && this.invoice) {
          if (!this.invoice.id) {
            this.toastMsg = "请选择项目结算单";
            this.toastStatus = null;
            noVali = true;
          }
          if (!this.invoice.date) {
            this.toastMsg = "请选择期望时间";
            this.toastStatus = null;
            noVali = true;
          }
          if (!this.invoice.info) {
            this.toastMsg = "请选择开票内容";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 打款 验证
        if (this.hasOwnProperty("askMoney") && this.askMoney) {
          if (!this.askMoney.id) {
            this.toastMsg = "请选择合同";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.askMoney.reason) {
            this.toastMsg = "请填写付款事由";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.askMoney.date) {
            this.toastMsg = "请选择期望时间";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.askMoney.invoice) {
            this.toastMsg = "请选择获取发票";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 报销验证
        if (this.hasOwnProperty("reimbursement") && this.reimbursement) {
          this.reimbursement.forEach(item => {
            if (item.openDate.length === 0) {
              this.toastMsg = "请选择发生时间";
              this.toastStatus = null;
              noVali = true;
            }
            if (item.mark.length === 0) {
              this.toastMsg = "请填写详细说明";
              this.toastStatus = null;
              noVali = true;
            }
          });
        }
        // 执行人 & 质检人验证
        if (this.hasOwnProperty("operationInfo") && this.operationInfo) {
          let operationCount = 0;
          for (let i = 0; i < this.operationInfo.length; i++) {
            let item = this.operationInfo[i];
            if (
              item.hasOwnProperty("content") &&
              item.content.txt &&
              item.content.txt.length !== 0 &&
              item.content.txt !== ""
            ) {
              if (
                +this.loadedData.info.toolkitId !== 27 &&
                +this.loadedData.info.toolkitId !== 20 &&
                +this.loadedData.info.toolkitId !== 19 &&
                +this.loadedData.info.toolkitId !== 18 &&
                +this.loadedData.info.toolkitId !== 21 &&
                +this.loadedData.info.toolkitId !== 22
              ) {
                if (
                  !item.operationId ||
                  item.operationId === "" ||
                  !item.inspectorId ||
                  item.inspectorId === ""
                ) {
                  this.toastMsg = "请选择执行 / 申请 / 质检 / 审核人";
                  this.toastStatus = null;
                  noVali = true;
                  break;
                }
              } else {
                if (!item.operationId || item.operationId === "") {
                  this.toastMsg = "请选择执行 / 申请人";
                  this.toastStatus = null;
                  noVali = true;
                  break;
                }
              }
            }
            if (
              item.hasOwnProperty("content") &&
              item.content.hasOwnProperty("endTime")
            ) {
              let deadLine = new Date(item.content.endTime.replace(/-/g, "/"));
              let totalDate = new Date(
                this.basicValue.endTime.replace(/-/g, "/")
              );

              if (
                item.content.endTime.length === 0 ||
                item.content.endTime === ""
              ) {
                this.toastMsg = "请选择截止时间";
                this.toastStatus = null;
                noVali = true;
                break;
              }

              if (deadLine > totalDate) {
                this.toastMsg = "执行截止时间必须早于任务截止时间";
                this.toastStatus = null;
                noVali = true;
              }
            }
            if (
              +this.loadedData.info.toolkitId !== 27 &&
              +this.loadedData.info.toolkitId !== 20 &&
              +this.loadedData.info.toolkitId !== 19 &&
              +this.loadedData.info.toolkitId !== 18 &&
              +this.loadedData.info.toolkitId !== 21 &&
              +this.loadedData.info.toolkitId !== 22
            ) {
              if (
                item.operationId &&
                item.operationId !== "" &&
                item.inspectorId &&
                item.inspectorId !== ""
              ) {
                operationCount++;
              }
            } else {
              if (item.operationId && item.operationId !== "") {
                operationCount++;
              }
            }
            if (operationCount > 1) {
              break;
            }
          }
          if (operationCount === 0) {
            this.toastMsg = "请选择执行 / 申请 / 质检 / 审核人";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 盖章验证
        if (this.hasOwnProperty("seal") && this.seal) {
          let seal = this.seal;
          if (!seal.type || seal.type === "") {
            this.toastMsg = "请输入需求类型";
            noVali = true;
          }
        }

        // 合同验证
        if (this.hasOwnProperty("contactsInfo") && this.contactsInfo) {
          this.contactsInfo.forEach(item => {
            if (
              item &&
              item.hasOwnProperty("customerInfo") &&
              (item.customerInfo.customerId === "" ||
                !item.customerInfo.customerId)
            ) {
              this.toastMsg = "请选择甲方";
              this.toastStatus = null;
              noVali = true;
            }
            if (
              item &&
              item.hasOwnProperty("companyInfo") &&
              (item.companyInfo.companyId === "" || !item.companyInfo.companyId)
            ) {
              this.toastMsg = "请选择乙方";
              this.toastStatus = null;
              noVali = true;
            }
            if (item && item.hasOwnProperty("baseInfo")) {
              if (
                !item.baseInfo.contactsType ||
                item.baseInfo.contactsType === ""
              ) {
                this.toastMsg = "请选择文件类型";
                this.toastStatus = null;
                noVali = true;
              } else if (!item.baseInfo.organization) {
                this.toastMsg = "请选择组织单位";
                this.toastStatus = null;
                // } else if (!item.baseInfo.platform) {
                //   this.toastMsg = '请选择合作平台'
                //   this.toastStatus = null
              } else if (!item.baseInfo.portrait) {
                this.toastMsg = "请选择肖像授权主体";
                this.toastStatus = null;
              }
            }
          });
        }

        if (noVali) {
          this.isToast = true;
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            this.toastStatus = null;
            this.canSubmit = true;
          }, 1500);
          return;
        }

        this.basicValue.operationInfo = [];

        this.operationInfo.forEach(item => {
          this.basicValue.operationInfo.push({
            operationId: item.operationId,
            inspectorId: item.inspectorId,
            content: item.content,
            taskPersonId: item.taskPersonId
          });
        });

        if (this.mediaKOL) {
          for (let key in this.mediaKOL) {
            let _key = this.mediaKOL[key];
            let rootChecked = false;
            for (let i = 0; i < _key.sub.length; i++) {
              let subItem = _key.sub[i];
              let subChecked = false;
              for (let subKey in subItem.opts.items) {
                let _subKey = subItem.opts.items[subKey];
                if (_subKey.length !== 0) {
                  subChecked = true;
                  rootChecked = true;
                  break;
                }
              }
              subItem.opts.isChecked = subChecked;
            }
            _key.isChecked = rootChecked;
          }
        }
        this.basicValue.taskForm = {
          taskInfo: this.formInfoData,
          contactsInfo: this.contactsInfo,
          reimbursement: this.reimbursement,
          askMoney: this.askMoney,
          invoice: this.invoice,
          express: this.express,
          techProject: this.techProject,
          dashboard: this.dashboard,
          showCase: this.showCase,
          mediaKOL: this.mediaKOL,
          seal: this.seal
        };

        this.basicValue.taskData = this.taskData.map(item => {
          delete item.fileId;
          return item;
        });
        this.$http
          .post(Task.edit, this.qs.stringify(this.basicValue), {
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
              this.toastStatus = "success";
              this.toastMsg = "提交成功";
              this.isSaved = true;
            }
            setTimeout(() => {
              this.isToast = false;
              this.canSubmit = true;

              if (_data.retCode === 0) {
                // this.$router.push('/tasks/list/' + this.loadedData.info.projectId)
                this.$router.push("/tasks/list");
              }
            }, 1500);
          });
      }
    },
    removeOperation(obj, key) {
      this.operationInfo.splice(key, 1);
    },
    addOperation(obj, key) {
      let arrMaxNo = 0;
      this.operationInfo.forEach(item => {
        if (+item.content.idxId > arrMaxNo) {
          arrMaxNo = +item.content.idxId;
        }
      });
      this.maxMemberNo =
        this.maxMemberNo > arrMaxNo ? this.maxMemberNo + 1 : arrMaxNo + 1;
      obj.content.idxId = this.maxMemberNo;

      this.operationInfo.splice(key + 1, 0, obj);
    },
    getTaskLoading() {
      this.isLoading = true;
      this.$http
        .post(
          Task.editIndex,
          this.qs.stringify({ taskId: this.$route.params.taskId }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          let _data = res.data;
          this.isLoading = false;
          if (_data.retCode === 0) {
            this.loadedData = _data.retData.data;
            this.hasLoadData = true;

            
            if (this.loadedData.info.toolkitId === 22) {
              this.getCurrUserBrand()
            }
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 16 && !this.loadedData.formInfo[0].formContent.contractsInfo.modifyInfo) {
              this.loadedData.formInfo[0].formContent.contractsInfo.modifyInfo = {
                   contractDeadline: {
                     value : '',
                     toastMsg : '请设置合同期限'
                   },
                   insteadPay: {
                     value: '',
                     toastMsg: '请选择是否为代付'
                   },
                   remark: {
                     value: '',
                     toastMsg: ''
                   },
                   fileName: {
                     value: '',
                     toastMsg: '请输入文件名'
                   },
                   fileAddress: {
                     value: '',
                     toastMsg: '请输入公盘地址'
                   },
               }
            }
             /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 16 && !this.loadedData.formInfo[0].formContent.contractsInfo.secondModifyInfo) {
              this.loadedData.formInfo[0].formContent.contractsInfo.secondModifyInfo = {
                    invoice: {
                      value: '专票',
                      toastMsg: ""
                    },
                    taxRate: {
                      value: 6,
                      toastMsg: ""
                    },
               }
            }
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 15 && !this.loadedData.formInfo[0].formContent.modifyInfo) {
              this.loadedData.formInfo[0].formContent.modifyInfo = {
                   contractDeadline: {
                     value : '',
                     toastMsg : '请设置合同期限'
                   },
                   insteadPay: {
                     required: true,
                     value: '',
                     toastMsg: '请选择是否为代付'
                   },
                   remark: {
                     value: '',
                     toastMsg: ''
                   },
                   fileName: {
                     required: true,
                     value: '',
                     toastMsg: '请输入文件名'
                   },
                   fileAddress: {
                     required: true,
                     value: '',
                     toastMsg: '请输入公盘地址'
                   },
               }
            }
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 15 && !this.loadedData.formInfo[0].formContent.secondModifyInfo) {
              this.loadedData.formInfo[0].formContent.secondModifyInfo = {
                    invoice: {
                      value: '专票',
                      toastMsg: ""
                    },
                    taxRate: {
                      value: 6,
                      toastMsg: ""
                    },
               }
            }
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 15 && !this.loadedData.formInfo[0].formContent.basicInfo.supplierIdAuto) {
              this.loadedData.formInfo[0].formContent.basicInfo.supplierIdAuto = {
                    value: ''
               }
            }
           
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 17 && !JSON.parse(this.loadedData.formInfo[0].formContent.quotationInfo[0].statement).itemsList[0].quotation[0].teamName) {
               let list = JSON.parse(this.loadedData.formInfo[0].formContent.quotationInfo[0].statement)
               list.itemsList.forEach((i, k) => {
                 i.quotation.forEach(e => {
                   e.teamId = "";
                   e.teamName = "";
                   e.userList = [];
                   e.userId = "";
                 })
               })
               this.loadedData.formInfo[0].formContent.quotationInfo[0].statement = JSON.stringify(list)
               console.log(list)
            }
            /* 路越走越窄 */
            if (this.loadedData.info.toolkitId === 17 && !JSON.parse(this.loadedData.formInfo[0].formContent.quotationInfo[0].statement).itemsList[0].quotation[0].taxRate && JSON.parse(this.loadedData.formInfo[0].formContent.quotationInfo[0].statement).itemsList[0].quotation[0].taxRate != 0) {
               let list = JSON.parse(this.loadedData.formInfo[0].formContent.quotationInfo[0].statement)
               list.itemsList.forEach((i, k) => {
                 i.quotation.forEach(e => {
                   e.taxRate = 6;
                 })
               })
               this.loadedData.formInfo[0].formContent.quotationInfo[0].statement = JSON.stringify(list)
               console.log(list)
            }

            this.financeProjectInfo = _data.retData.data.projectInfo;
            this.toolkitName = _data.retData.data.info.taskName;
            this.tips = _data.retData.data.tipsInfo;
            this.basicValue = {
              taskId: this.$route.params.taskId,
              startTime: null,
              endTime: _data.retData.data.info.endTime,
              taskData: [],
              auditorId: _data.retData.data.info.auditorId,
              level: _data.retData.data.info.level,
              taskName: _data.retData.data.info.taskName
            };

            let extraOpts = _data.retData.data.taskData.map(item => {
              return item.dataType;
            });
            this.$store.dispatch("setExtraOptionns", extraOpts);

            this.operationInfo = _data.retData.data.operationInfo;
            this.taskData = _data.retData.data.taskData;
            this.formInfoData =
              _data.retData.data.formInfo[0].formContent.taskInfo;
            this.contactsInfo =
              _data.retData.data.formInfo[0].formContent.contactsInfo;
            this.reimbursement =
              _data.retData.data.formInfo[0].formContent.reimbursement;
            this.askMoney = _data.retData.data.formInfo[0].formContent.askMoney;
            this.invoice = _data.retData.data.formInfo[0].formContent.invoice;
            this.express = _data.retData.data.formInfo[0].formContent.express;
            this.contractsInfo =
              _data.retData.data.formInfo[0].formContent.contractsInfo;
            this.quotationInfo =
              _data.retData.data.formInfo[0].formContent.quotationInfo;
            this.billingInfo =
              _data.retData.data.formInfo[0].formContent.billingInfo;
            this.techProject =
              _data.retData.data.formInfo[0].formContent.techProject;
            this.showCase = _data.retData.data.formInfo[0].formContent.showCase;
            if (_data.retData.data.formInfo[0].formContent.dashboard) {
              this.dashboard = _.merge(
                JSON.parse(JSON.stringify(formConf[311])).dashboard,
                _data.retData.data.formInfo[0].formContent.dashboard
              );
            }

            this.mediaKOL = _data.retData.data.formInfo[0].formContent.mediaKOL;
            this.seal = _data.retData.data.formInfo[0].formContent.seal;

            this.projectName = _data.retData.data.projectInfo.projectName;
            this.projectId = _data.retData.data.info.projectId;
            this.brand = _data.retData.data.projectInfo.customerName;
            this.customerId = _data.retData.data.projectInfo.customerId;
            this.customerName = _data.retData.data.projectInfo.customerName;
            this.contractTpl = _data.retData.data.toolkitInfo;
            if (this.quotationInfo) {
               this.quotationFormValue = JSON.parse(JSON.stringify(_data.retData.data.formInfo[0].formContent))
               this.quotationFormValue.quotationInfo[0].statement = JSON.parse(this.quotationFormValue.quotationInfo[0].statement)
               this.quotationFormValue.quotationInfo[0].thirdFree = JSON.parse(this.quotationFormValue.quotationInfo[0].thirdFree)
            }


            if (+_data.retData.data.info.toolkitId === 2) {
            }
            if (
              +this.loadedData.info.toolkitId === 2 &&
              this.contactsInfo &&
              this.contactsInfo.length > 0
            ) {
              this.contactsInfo.forEach(item => {
                if (item) {
                  this.isQC.push(true);
                }
              });
            }
            // _data.retData.data
            if (_data.retData.auditorId) {
              this.isAuditor = true;
            } else {
              this.isAuditor = false;
            }
            this.getCustomerPartyA();
            this.getAllContract();
            this.getAllInvoice();
            this.getAllCustomer("outer");
            this.getAllCustomer("inner");
            this.parserDraft();
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
          }
        });
    },

    leaveConfirm(next) {
      if (!this.isSaved) {
        next(false);
        this.isLeaveConfirm = true;
      } else {
        next();
      }
    },
    cacheMenu() {
      this.menu = this.currMenu;
    },
    leaveCancel() {
      this.$store.dispatch("setCurrMenu", this.menu);
      sessionStorage.setItem("currMenu", this.menu);
      this.isLeaveConfirm = false;
    },
    parserDraft() {
      const loadData = {
        funcType: "task",
        funcSubType: +this.loadedData.info.toolkitId,
        act: "edit",
        objectId: this.$route.params.taskId
      };
      ajax
        .post(cacheData.getInfo, loadData)
        .then(res => {
          this.isDraft = !!res.draftInfo;
          this.draftInfo = res.draftInfo;
        })
        .catch(() => {});
    },
    loadDraft() {
      const _draft = this.draftInfo.formContent;
      const draft = JSON.parse(_draft);
      console.log(draft);
      this.isQC = draft.isQC;
      this.loadedData = draft.loadedData;
      this.toolkitName = draft.toolkitName;
      this.basicValue = draft.basicValue;
      this.operationInfo = draft.operationInfo;
      this.taskData = draft.taskData;
      this.formInfoData = draft.formInfoData;
      this.contactsInfo = draft.contactsInfo;
      this.reimbursement = draft.reimbursement;
      this.askMoney = draft.askMoney;
      this.invoice = draft.invoice;
      this.express = draft.express;
      this.techProject = draft.techProject;
      this.dashboard = draft.dashboard;
      this.showCase = draft.showCase;
      this.mediaKOL = draft.mediaKOL;
      this.seal = draft.seal;
      this.cancelDraft();
    },
    cancelDraft() {
      this.isDraft = false;
    },
    saveLeavePage() {
      let data = {
        isQC: this.isQC,
        loadedData: this.loadedData,
        toolkitName: this.toolkitName,
        basicValue: this.basicValue,
        operationInfo: this.operationInfo,
        taskData: this.taskData,
        formInfoData: this.formInfoData,
        contactsInfo: this.contactsInfo,
        reimbursement: this.reimbursement,
        askMoney: this.askMoney,
        invoice: this.invoice,
        express: this.express,
        techProject: this.techProject,
        dashboard: this.dashboard,
        showCase: this.showCase,
        mediaKOL: this.mediaKOL,
        seal: this.seal
      };
      const Data = JSON.stringify(data);

      const uploadData = {
        funcType: "task",
        funcSubType: +this.loadedData.info.toolkitId,
        act: "edit",
        objectId: this.$route.params.taskId,
        formContent: Data
      };

      ajax
        .post(cacheData.setInfo, uploadData)
        .then(() => {
          this.isSaved = true;
          this.$store.dispatch("toggleMenuJump", true);
          this.routerNext();
        })
        .catch(() => {
          this.isToast = true;
          this.toastMsg = "草稿箱保存失败，请重试";
        });
      setTimeout(() => {
        this.isToast = false;
      }, 1500);
    },
    leavePage() {
      this.isSaved = true;
      this.$store.dispatch("toggleMenuJump", true);
      this.routerNext();
    },
    ...mapMutations(['changeCurrentToolkitPackageId']),
    ...mapGetters({
        toolkitPackageId: "getCurrentToolkitPackageId",
      }),
  },
  created() {
    const toolkitId = this.$route.query.toolkitId ? +this.$route.query.toolkitId : this.toolkitPackageId;
    this.changeCurrentToolkitPackageId(toolkitId);
    // this.changeCurrentToolkitPackageId(0);
    this.getTaskLoading();
    this.getCustomerPartyB();
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    // next()
    this.leaveConfirm(next);
    this.routerNext = next;
  }
  // methods: {
  //   addExtraInfo: function (type) {
  //     this.$store.dispatch('addTaskDatas', type)
  //   }
  // }
};
</script>

<style lang="less">
.edit-form {
  .form-btns {
    position: absolute;
    left: 100%;
    bottom: 16px;
    margin-left: 32px;
  }
  .primary-hole {
    background-color: #fff;
    color: #2d8cf0;
  }
  .task-belong {
    a {
      text-decoration: underline;
    }
  }
  .task-form {
    position: relative;
  }
  .form-card {
    &:hover {
      box-shadow: 0 0 0;
    }
    .ivu-card-head {
      background-color: #f8f9fa;
      padding-left: 24px;
      padding-right: 24px;
      h2 {
        font-size: 14px;
        color: #343a40;
      }
    }
    .ivu-card-body {
      padding: 32px;
    }
  }
}
</style>
