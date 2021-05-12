<template>
  <div class="edit-form" >
    <!--<toolkit :add-icon-disabled="true"></toolkit>-->
    <Card class="form-card">
      <h2 slot="title">创建{{toolkitName}}任务</h2>
      <Row>
        <i-col
          span="17"
          class="task-form"
          v-if="+$route.params.toolkitId !== 16 && +$route.params.toolkitId !== 17  && +$route.params.toolkitId !== 20 && +$route.params.toolkitId !== 19 && +$route.params.toolkitId !== 15"
        >
          <!--合同模板-->
          <contract-tpl v-if="contractTpl && contractTpl.length > 0" :tpls="contractTpl"></contract-tpl>

          <!--基础通用模块-->
          <task-edit-form :form-value="basicValue" :form-label="basicInfo" :tips="tips"></task-edit-form>

          <div v-if="taskFormData.hasOwnProperty('showCase')">
            <task-edit-form
              :toolkit-id="$route.params.toolkitId"
              type="showCase"
              :form-value="taskFormData.showCase"
              :form-label="taskFormData.showCase"
              :tips="tips"
              :customer-id="customerId"
              :customer-name="customerName"
              :project-id="projectId"
            ></task-edit-form>
          </div>
          <!--dashboard -->
          <div v-if="taskFormData.hasOwnProperty('dashboard')">
            <task-edit-form
              type="dashboard"
              :form-value="taskFormData.dashboard"
              :form-label="taskFormData.dashboard"
              :tips="tips"
              @on-select-type="changeDashBoard"
            ></task-edit-form>
          </div>

          <extra-options
            :extra-options="extraInfoOptions"
            v-if="parseInt($route.params.toolkitId) === 2"
          ></extra-options>

          <task-edit-form
            :form-value="extraDatas"
            type="extra"
            :form-label="extraTypes"
            v-if="parseInt($route.params.toolkitId) === 2"
            :tips="tips"
          ></task-edit-form>

          <!--报销模块-->
          <div v-if="taskFormData.hasOwnProperty('reimbursement')">
            <task-edit-form
              type="reimbursement"
              :form-label="taskFormData.reimbursement"
              :form-value="taskFormData.reimbursement"
              :full-value="taskFormData"
              :tips="tips"
            ></task-edit-form>
          </div>

          <!--快递-->
          <div v-if="taskFormData.hasOwnProperty('express')">
            <task-edit-form
              type="express"
              :form-label="taskFormData.express"
              :form-value="taskFormData.express"
              :tips="tips"
              :currUserBrand="currUserBrand"
            ></task-edit-form>
          </div>

          <p v-if="parseInt($route.params.toolkitId) === 22">
            若收件人为批量，请在下方添加收件人信息的公盘地址
            <br>格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\
          </p>

          <!--常规模块-->
          <div v-for="(value, key) in taskFormData.formData" :key="'taskFormData-' + key">
            <task-edit-form
              @showOperate="showOperate"
              type="formData"
              :form-label="value"
              :form-value="value"
              :all-part-a="allPartA"
              :all-part-b="allPartB"
              :tips="tips"
              :operation-info="taskFormData.operationInfo"
            ></task-edit-form>
          </div>

          <!--媒介-kol-->
          <div v-if="taskFormData.hasOwnProperty('mediaKOL')">
            <task-edit-form
              type="mediaKOL"
              :form-label="taskFormData.mediaKOL"
              :form-value="taskFormData.mediaKOL"
              :tips="tips"
            ></task-edit-form>
          </div>
          <!--技术-应用需求模块-->
          <div v-if="taskFormData.hasOwnProperty('techProject')">
            <task-edit-form
              type="techProject"
              :form-value="taskFormData.techProject"
              :form-label="taskFormData.techProject"
              :tips="tips"
            ></task-edit-form>
          </div>

          <!--合同模块-->
          <!--<div v-if="+$route.params.toolkitId !== 2" v-for="(value, idx) in taskFormData.contactsInfo" :key="'contacts-' + idx">-->
          <div
            v-if="+$route.params.toolkitId === 16 || +$route.params.toolkitId === 17"
            v-for="(value, idx) in taskFormData.contactsInfo"
            :key="'contacts-' + idx"
          >
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
                :customer-id="customerId"
                :project-id="projectId"
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

          <!--发票-->
          <div v-if="taskFormData.hasOwnProperty('invoice')">
            <div>
              <task-edit-form
                type="invoice"
                :form-value="taskFormData.invoice"
                :form-label="taskFormData.invoice"
                :all-invoice="allInvoice"
                :tips="tips"
              ></task-edit-form>
            </div>
          </div>
          <!--请款模块-->
          <div v-if="taskFormData.hasOwnProperty('askMoney')">
            <div>
              <task-edit-form
                type="askMoney"
                :form-label="taskFormData.askMoney"
                :form-value="taskFormData.askMoney"
                :all-contract="allContract"
                :tips="tips"
              ></task-edit-form>
            </div>
          </div>

          <!--盖章-->
          <div v-if="taskFormData.hasOwnProperty('seal')">
            <div>
              <administrative-seal :form-value="taskFormData.seal" :tips="tips"></administrative-seal>
            </div>
          </div>

          <!--执行人 申请人 etc 模块-->
          <template v-if="taskFormData.hasOwnProperty('operationInfo') ">
            <div
              v-for="(value, key) in taskFormData.operationInfo"
              :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key "
            >
              <task-edit-form
                v-if="operate"
                type="operation"
                :form-label="value"
                :form-value="value"
                @on-add="addOperation($event, key)"
                @on-remove="removeOperation($event, key)"
                :switch-val="isQC"
                :switch-key="key"
                @on-switch="switchChange($event, key)"
                :tips="tips"
                :can-del-operater="taskFormData.operationInfo.length > 1"
              ></task-edit-form>
              <template v-if="isQC[key]">
                <div>
                  <task-edit-form
                    is-filter
                    type="company"
                    :form-label="taskFormData.contactsInfo[key].companyInfo"
                    :form-value="taskFormData.contactsInfo[key].companyInfo"
                    :all-part-a="allPartA"
                    :all-part-b="allPartB"
                  ></task-edit-form>
                </div>
              </template>
            </div>
          </template>

          <!--审核人模块-->
          <task-edit-form type="auditor" v-if="isAuditor"></task-edit-form>
          <!--<form-box :form-data="basicInfo" :is-extra-options="true" :extra-options="extraInfoOptions" :extra-datas="extraDatas" :requirement="requirement" :value-data="formData"></form-box>-->
          <div class="form-btns">
            <Button type="primary" class="submit-btn" size="large" @click.native="submit">提交任务</Button>
          </div>
        </i-col>
        <!-- 财务工具包tips -->
        <div
          v-if="+$route.params.toolkitId === 15 || +$route.params.toolkitId === 16 || +$route.params.toolkitId === 17 || +$route.params.toolkitId === 19 || +$route.params.toolkitId === 20"
          style="margin-bottom:15px"
        >
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
                      <router-link  :to="`/new/nccBook/map`" target="_blank">
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

          <div style="float:left;margin-left:100px">
             <div class="base-tips">
                  <div class="group-tips" v-if="tips.length > 0 && tips[tips.length -1].name === '' && tips[tips.length -1].title">
                    <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                    <div class="tips-pop">
                      <div class="tips-head">
                        {{tips[tips.length -1].title}}
                        <!--<Icon type="ios-browsers-outline" size="16" color="rgb(255, 255, 255)"/>-->
                        <!--<Icon type="arrow-expand" size="16" color="rgb(255, 255, 255)"></Icon>-->
                        <router-link :to="`/new/nccBook/map`" target="_blank">
                          <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                        </router-link>
                      </div>
                      <div class="tips-body">
                        <div v-html="tips[tips.length -1].content"></div>
                        <!--<i-input type="textarea" :value="tipsItem.content" readonly :autosize="{minRows: 2, maxRows: 10}"></i-input>-->
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          
          <div style="text-align:right;">
            <Button type="primary" size="large" @click="openFeed" style="vertical-align:middle">意见反馈</Button>
          </div>
        </div>

        <!-- 客户合同 -->
        <i-col v-if="+$route.params.toolkitId === 16" span="24" class="task-form">
          <div>
            <task-edit-form
              type="clientContract"
              :form-value="taskFormData"
              :project-info="financeProjectInfo"
              :all-part-a="customerPartyA"
              :all-part-b="customerPartyB"
              :is-saved="isSaved"
              :tips="tips"
              @changeIsSaved="changeIsSaved"
            ></task-edit-form>
          </div>
        </i-col>
        <!-- 供应商合同 -->
        <i-col v-if="+$route.params.toolkitId === 15" span="24" class="task-form">
          <div>
            <task-edit-form
              type="supplierContract"
              @changeIsSaved="changeIsSaved"
              :form-value="taskFormData.supplierInfo[0]"
              :project-info="financeProjectInfo"
              :tips="tips"
            ></task-edit-form>
          </div>
        </i-col>
        <!-- 报价单 -->
        <i-col v-if="+$route.params.toolkitId === 17" span="24" class="task-form">
          <div>
            <task-edit-form
              type="quotation"
              :form-value="taskFormData"
              :project-info="financeProjectInfo"
              :tips="tips"
              @changeIsSaved="changeIsSaved"
            ></task-edit-form>
          </div>
        </i-col>
        <!-- 打款 -->
        <i-col v-if="+$route.params.toolkitId === 20" span="24" class="task-form">
          <div>
            <task-edit-form @changeIsSaved = 'changeIsSaved' type="pay" :form-value="taskFormData.payInfo[0]" :tips="tips"></task-edit-form>
            <div style="text-align:center">
            </div>
          </div>
        </i-col>
        <!-- 开票 -->
        <i-col v-if="+$route.params.toolkitId === 19" span="24" class="task-form">
          <task-edit-form
            type="billing"
            :form-value="taskFormData"
            :project-info="financeProjectInfo"
            :tips="tips"
            @changeIsSaved="changeIsSaved"
          ></task-edit-form>
        </i-col>
        <!-- 其他任务 -->
        <i-col
          v-if="+$route.params.toolkitId !== 16 && +$route.params.toolkitId !== 17  && +$route.params.toolkitId !== 20 && +$route.params.toolkitId !== 19 && +$route.params.toolkitId !== 15"
          span="6"
          offset="1"
          class="task-belong"
        >
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
                  <div class="group-tips" v-if="tips.length > 0 && tips[tips.length -1].name === '' && tips[tips.length -1].title">
                    <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                    <div class="tips-pop">
                      <div class="tips-head">
                        {{tips[tips.length -1].title}}
                        <!--<Icon type="ios-browsers-outline" size="16" color="rgb(255, 255, 255)"/>-->
                        <!--<Icon type="arrow-expand" size="16" color="rgb(255, 255, 255)"></Icon>-->
                        <router-link :to="`/new/nccBook/map`" target="_blank">
                          <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                        </router-link>
                      </div>
                      <div class="tips-body">
                        <div v-html="tips[tips.length -1].content"></div>
                        <!--<i-input type="textarea" :value="tipsItem.content" readonly :autosize="{minRows: 2, maxRows: 10}"></i-input>-->
                      </div>
                    </div>
                  </div>
              </div>
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
                        <!--<Icon type="ios-browsers-outline" size="16" color="rgb(255, 255, 255)"/>-->
                        <!--<Icon type="arrow-expand" size="16" color="rgb(255, 255, 255)"></Icon>-->
                        <router-link :to="`/new/nccBook/map`" target="_blank">
                          <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                        </router-link>
                      </div>
                      <div class="tips-body">
                        <div v-html="tipsItem.content"></div>
                        <!--<i-input type="textarea" :value="tipsItem.content" readonly :autosize="{minRows: 2, maxRows: 10}"></i-input>-->
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
    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>

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
import { formConf } from "../../assets/conf/formData.conf";
import Toast from "../../components/popup/Toast";
import ContractTpl from "../../components/ContractTpl";
import LeaveModal from "../../components/popup/LeaveModal";
import LoadDraftModal from "../../components/popup/LoadDraftModal";
import { ajax } from "../../util/util";
import administrativeSeal from "../../components/AdministrativeSeal.vue";

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
    administrativeSeal
  },
  name: "add-task",
  data() {
    return {
      menu: null,
      isSaved: false,
      isDraft: false,
      isLeaveConfirm: false,
      repo: "",
      feedModal: false,
      contractTpl: [],
      isQC: [],
      tips: [],
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
      currUserBrand: [],
      canSubmit: true,
      allInvoice: [],
      allPartA: [],
      allPartB: [],
      customerPartyA: [],
      customerPartyB: [],
      allContract: [],
      customerId: null,
      customerName: null,
      toastMsg: "",
      toastStatus: "",
      isToast: false,
      projectName: null,
      projectId: this.$route.params.projectId,
      brand: null,
      isAuditor: false,
      toolkitName: localStorage.getItem("toolkitName"),
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
      formData: {
        projectId: this.$route.params.projectId,
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
          label:
            +this.$route.params.toolkitId === 17
              ? "项目结算单名称"
              : +this.$route.params.toolkitId === 16
              ? "合同名称"
              : "任务名称",
          placeholder:
            +this.$route.params.toolkitId === 17
              ? "填写项目结算单名称（必填）"
              : +this.$route.params.toolkitId === 16
              ? "填写合同名称（必填）"
              : "填写任务名称（必填）",
          type: "input"
        },
        endTime: {
          label: "截止时间",
          placeholder: "设置截止时间",
          type: "datetime"
        }
      },
      basicValue: {
        projectId: this.$route.params.projectId,
        productId: this.$route.params.productId,
        toolkitId: this.$route.params.toolkitId,
        startTime: null,
        endTime: null,
        taskData: [],
        auditorId: null,
        level: null,
        taskName: "",
        taskForm: "",
        operationInfo: []
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
      taskFormData: JSON.parse(
        JSON.stringify(
          formConf[this.$route.params.toolkitId] || formConf["default"]
        )
      ),
      dashboardOperate: {
        1: "SM",
        2: "Video",
        3: "PBM",
        4: "Site"
      },
      /* 财务工具包 */

      financeProjectInfo: null,

      operate: true
    };
  },
  computed: {
    addedExtra() {
      return this.$store.state.selectedExtraOption;
    },
    extraDatas() {
      return this.$store.state.extraDatas;
    },
    requirement() {
      return this.$store.state.requirement[this.$route.params.toolkitId];
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
      arr.push({ label: `创建${this.toolkitName}任务` });

      return arr;
    },
    currMenu() {
      return this.$store.state.index.currMenu;
    }
  },
  methods: {
    showOperate() {
      this.operate = false;
      this.$nextTick(() => {
        this.operate = true
      })
    },
    init() {
      this.getCurrUserBrand()
      this.setCurrPage();
      this.parserDraft();
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
    setCurrPage() {
      this.$store.dispatch("setCurrPage", "新建任务");
    },
    changeDashBoard(v) {
      // this.taskFormData.operationInfo = []
      // v.forEach(item => {
      //   const tpl = {
      //     operationId: null,
      //     inspectorId: null,
      //     content: {
      //       canMore: true,
      //       title: this.dashboardOperate[item]
      //     }
      //   }
      //   this.taskFormData.operationInfo.push(tpl)
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
            toolkitId: this.$route.params.toolkitId,
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
        if (!this.taskFormData.contactsInfo[key]) {
          const contactTpl = JSON.parse(JSON.stringify(this.qcTpl));
          // this.taskFormData.contactsInfo[key] = contactTpl
          this.$set(this.taskFormData.contactsInfo, key, contactTpl);
        }
      }
    },
    changeIsSaved() {
      this.isSaved = true;
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
          if (+this.$route.params.toolkitId === 2) {
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
          this.qs.stringify({ customerId: this.$route.params.customerId, need_nc: 2 }),
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
      if (this.canSubmit) {
        this.canSubmit = false;

        if (
          +this.$route.params.toolkitId !== 27 &&
          +this.$route.params.toolkitId !== 19 &&
          +this.$route.params.toolkitId !== 20 &&
          +this.$route.params.toolkitId !== 18 &&
          +this.$route.params.toolkitId !== 21 &&
          +this.$route.params.toolkitId !== 22 &&
          +this.$route.params.toolkitId !== 16 &&
          +this.$route.params.toolkitId !== 17
        ) {
          this.isQC.forEach((item, idx) => {
            if (!item) {
              this.taskFormData.contactsInfo[idx] = null;
            }
          });
        }

        let noVali = false;

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
        if (this.taskFormData.hasOwnProperty("formData")) {
          for (let i = 0; i < this.taskFormData.formData.length; i++) {
            let item = this.taskFormData.formData[i];
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

        // 报价单 验证
        if (this.taskFormData.hasOwnProperty("invoice")) {
          if (!this.taskFormData.invoice.id) {
            this.toastMsg = "请选择项目结算单";
            this.toastStatus = null;
            noVali = true;
          }
          if (!this.taskFormData.invoice.date) {
            this.toastMsg = "请选择期望时间";
            this.toastStatus = null;
            noVali = true;
          }
          if (!this.taskFormData.invoice.info) {
            this.toastMsg = "请选择开票内容";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 快递验证
        if (this.taskFormData.hasOwnProperty("express")) {
          if (
            !/^(\d{7,8})(-(\d{3,}))?$/.test(
              this.taskFormData.express.sender[1].value
            ) &&
            !/^\d{11}$/.test(this.taskFormData.express.sender[1].value)
          ) {
            this.toastMsg = "联系方式为7～8位固话或11位手机号码";
            this.toastStatus = null;
            noVali = true;
          }
          if (this.taskFormData.express.sender[0].value.length === 0) {
            this.toastMsg = "请选择寄件人";
            this.toastStatus = null;
            noVali = true;
          }
          // if (this.taskFormData.express.receiver[0].value.length === 0) {
          //   this.toastMsg = '请填写收件人'
          //   this.toastStatus = null
          //   noVali = true
          // }
          // if (this.taskFormData.express.addr.cityValue.length === 0 || this.taskFormData.express.addr.detailValue.length === 0) {
          //   this.toastMsg = '请填写收件地址'
          //   this.toastStatus = null
          //   noVali = true
          // }
          if (this.taskFormData.express.orderNo.value.length === 0) {
            this.toastMsg = "请填写快递单号";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 打款 验证
        if (this.taskFormData.hasOwnProperty("askMoney")) {
          if (!this.taskFormData.askMoney.id) {
            this.toastMsg = "请选择合同";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.taskFormData.askMoney.reason) {
            this.toastMsg = "请填写付款事由";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.taskFormData.askMoney.date) {
            this.toastMsg = "请选择期望时间";
            this.toastStatus = null;
            noVali = true;
          } else if (!this.taskFormData.askMoney.invoice) {
            this.toastMsg = "请选择获取发票";
            this.toastStatus = null;
            noVali = true;
          }
        }

        // 报销验证
        if (this.taskFormData.hasOwnProperty("reimbursement")) {
          this.taskFormData.reimbursement.forEach(item => {
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
        if (this.taskFormData.hasOwnProperty("operationInfo")) {
          let operationCount = 0;
          for (let i = 0; i < this.taskFormData.operationInfo.length; i++) {
            let item = this.taskFormData.operationInfo[i];
            if (
              item.hasOwnProperty("content") &&
              item.content.txt &&
              item.content.txt.length !== 0 &&
              item.content.txt !== ""
            ) {
              if (
                +this.$route.params.toolkitId !== 27 &&
                +this.$route.params.toolkitId !== 20 &&
                +this.$route.params.toolkitId !== 19 &&
                +this.$route.params.toolkitId !== 18 &&
                +this.$route.params.toolkitId !== 21 &&
                +this.$route.params.toolkitId !== 22
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
              item.content.hasOwnProperty("endTime") &&
              item.content.endTime &&
              this.basicValue.endTime
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
              +this.$route.params.toolkitId !== 27 &&
              +this.$route.params.toolkitId !== 20 &&
              +this.$route.params.toolkitId !== 19 &&
              +this.$route.params.toolkitId !== 18 &&
              +this.$route.params.toolkitId !== 21 &&
              +this.$route.params.toolkitId !== 22
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
        if (this.taskFormData.hasOwnProperty("seal")) {
          let seal = this.taskFormData.seal;
          if (!seal.type || seal.type === "") {
            this.toastMsg = "请输入需求类型";
            noVali = true;
          }
        }

        // 合同验证
        if (this.taskFormData.hasOwnProperty("contactsInfo")) {
          this.taskFormData.contactsInfo.forEach(item => {
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

        for (let key in this.taskFormData.mediaKOL) {
          let _key = this.taskFormData.mediaKOL[key];
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

        this.basicValue.operationInfo = this.taskFormData.operationInfo;
        this.basicValue.taskForm = {
          taskInfo: this.taskFormData.formData,
          contactsInfo: this.taskFormData.contactsInfo,
          reimbursement: this.taskFormData.reimbursement,
          askMoney: this.taskFormData.askMoney,
          invoice: this.taskFormData.invoice,
          express: this.taskFormData.express,
          techProject: this.taskFormData.techProject,
          mediaKOL: this.taskFormData.mediaKOL,
          seal: this.taskFormData.seal,
          dashboard: this.taskFormData.dashboard,
          showCase: this.taskFormData.showCase
        };
        if (+this.$route.params.toolkitId === 2)
          this.basicValue.taskData = this.extraDatas;
        let postUrl = Task.add;
        if (+this.$route.params.toolkitId === 27) postUrl = Task.addSeal;

        if (
          this.$route.params.toolkitId == 451 &&
          this.taskFormData.showCase.mediaRelease
        ) {
          this.basicValue.operationInfo = [
            ...this.basicValue.operationInfo,
            ...this.taskFormData.showCase.spotplan
          ];
        }

        this.$http
          .post(postUrl, this.qs.stringify(this.basicValue), {
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
              localStorage.removeItem("addTask");
            }
            setTimeout(() => {
              this.isToast = false;
              this.canSubmit = true;
              if (_data.retCode === 0) {
                this.$store.dispatch("setExtraData", []);
                // this.$router.push('/tasks/list/' + this.$route.params.projectId)
                this.$router.push("/tasks/list/");
              }
            }, 1500);
          });
      }
    },
    addOperation(obj, key) {
      let arrMaxNo = 0;
      this.taskFormData.operationInfo.forEach(item => {
        if (+item.content.idxId > arrMaxNo) {
          arrMaxNo = +item.content.idxId;
        }
      });
      this.maxMemberNo =
        this.maxMemberNo > arrMaxNo ? this.maxMemberNo + 1 : arrMaxNo + 1;

      obj.content.idxId = this.maxMemberNo;

      this.taskFormData.operationInfo.splice(key + 1, 0, obj);

      console.log(obj);
      // if (this.taskFormData.hasOwnProperty('contactsInfo') && +this.$route.params.toolkitId === 2) {
      //   let tpl = JSON.parse(JSON.stringify(this.qcTpl))
      //   this.taskFormData.contactsInfo.splice(key + 1, 0, tpl)
      // }
    },
    removeOperation(obj, key) {
      this.taskFormData.operationInfo.splice(key, 1);

      // this.taskFormData.operationInfo.splice(this.taskFormData.operationInfo.length - 1, 1)
    },
    getTaskLoading() {
      if (this.taskFormData.hasOwnProperty("express")) {
        this.taskFormData.express.sender[0].value = JSON.parse(
          localStorage.getItem("userInfo")
        );
        this.taskFormData.express.sender[1].value = JSON.parse(
          localStorage.getItem("userInfo")
        ).mobile;
      }

      this.$http
        .post(
          Task.addIndex,
          this.qs.stringify({
            projectId: this.$route.params.projectId,
            toolkitId: this.$route.params.toolkitId
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          let _data = res.data;
          this.financeProjectInfo = res.data.retData;
          if (_data.retCode === 0) {
            this.projectName = _data.retData.projectInfo.projectName;
            this.projectId = _data.retData.projectInfo.projectId;
            this.brand = _data.retData.projectInfo.customerName;
            this.customerId = _data.retData.projectInfo.customerId;
            this.customerName = _data.retData.projectInfo.customerName;
            this.tips = _data.retData.tipsInfo;
            this.contractTpl = _data.retData.toolkitInfo;
            if (_data.retData.auditorId) {
              this.isAuditor = true;
            } else {
              this.isAuditor = false;
            }

            this.getAllCustomer("outer");
            this.getAllCustomer("inner");
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
        funcSubType: this.$route.params.toolkitId,
        act: "add"
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
      this.isQC = draft.isQC;
      this.basicValue = draft.basicValue;
      this.taskFormData = draft.taskFormData;

      this.basicValue.projectId = this.$route.params.projectId;
      this.basicValue.productId = this.$route.params.productId;
      this.cancelDraft();
    },
    cancelDraft() {
      this.isDraft = false;
    },
    saveLeavePage() {
      delete this.basicValue.productId;
      delete this.basicValue.projectId;
      let data = {
        isQC: this.isQC,
        basicValue: this.basicValue,
        taskFormData: this.taskFormData
      };
      const Data = JSON.stringify(data);

      const uploadData = {
        funcType: "task",
        funcSubType: this.$route.params.toolkitId,
        act: "add",
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
    }
  },
  created() {
    this.getTaskLoading();
    this.getAllContract();
    this.getCustomerPartyA();
    this.getCustomerPartyB();
    this.getAllInvoice();
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
  .submit-btn {
    padding: 13px 41px;
    border: 1px solid #2d8ef8;
    color: #2d8ef8;
    background-color: #fff;
    font-size: 16px;

    &:hover {
      color: #ffffff;
      background-color: #2d8ef8;
    }
  }

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
