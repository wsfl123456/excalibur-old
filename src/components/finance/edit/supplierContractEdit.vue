<!--供应商合同-编辑-->
<template>
  <div>
    <i-form label-position="left" :label-width="120" class="default-form client-contract">
      <div class="contract-form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="合同名称" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.contractName.value" placeholder="供应商_项目名称_金额_版本"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="截止时间" class="default-form-item" required>
                <DatePicker
                  transfer
                  class="deadline"
                  type="datetime"
                  placeholder="设置截止时间"
                  v-model="formValue.basicInfo.endTime.value"
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
                <i-input :value="projectInfo.projectInfo.projectName" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="项目ID" class="default-form-item" required>
                <i-input :value="projectInfo.projectInfo.projectCode" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="供应商名称" class="default-form-item" required>
                <el-select v-model="formValue.basicInfo.supplierName.value" @change="id => changeContactPart('partB', id)"
                   filterable placeholder="请搜索选择供应商"
                   no-data-text="无匹配数据，请添加供应商账户信息"
                  no-match-text="无匹配数据，请添加供应商账户信息">
                  <el-option
                    v-for="item in suppliers"
                    :value="item.id"
                    :key="item.id"
                    :label="item.customerName"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="供应商ID" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.supplierId.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="合同类型" class="default-form-item" required>
                <el-select v-model="formValue.basicInfo.contractType.value" placeholder="请选择合同类型">
                  <el-option
                    v-for="(item, index) in sealConf"
                    :value="item.id"
                    :key="index"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="合同期限" class="default-form-item" required>
                <DatePicker class="deadline" v-model="formValue.modifyInfo.contractDeadline.value" @on-change="contractDeadlineChange" type="daterange" split-panels placeholder="请设置合同期限" :clearable="false"></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formValue.basicInfo.contractType.value">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="模板文件名" class="default-form-item">
                <i-input :value="contractModule[formValue.basicInfo.contractType.value].name" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col module-url">
              <FormItem label="模板公盘路径" class="default-form-item">
                <a :href="contractModule[formValue.basicInfo.contractType.value].url" target="_blank" >{{contractModule[formValue.basicInfo.contractType.value].url}}</a>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formValue.basicInfo.contractType.value === '6'">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="合同类型备注" class="default-form-item">
                <i-input v-model="formValue.basicInfo.contractTypeRemark.value"></i-input>
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
                  v-model="formValue.basicInfo.organizeUnit.value"
                  style="padding-left:24px"
                >
                  <Row>
                    <i-col span="12">
                      <Radio label="1" style="height:53px;line-height:53px">公司</Radio>
                    </i-col>
                    <i-col span="12">
                      <Radio label="2" style="height:53px;line-height:53px">个人</Radio>
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
                <Cascader :value="toNumberList" @on-change='businessChaneg' :data="businessTypeList"  :clearable='false' trigger="hover" placeholder='请选择业务类型'></Cascader>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formValue.basicInfo.bussinessType.value === '21'">
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="业务类型备注" class="default-form-item">
                <i-input v-model="formValue.basicInfo.bussinessTypeRemark.value"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="业务概述" class="default-form-item" required>
                <i-input v-model="formValue.basicInfo.bussinessOverview.value" placeholder="请输入业务概述"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row type='flex'>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="是否涉及金额" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.basicInfo.involveMoney.value"
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
            <i-col v-if="formValue.basicInfo.involveMoney.value == 1" span="12" class="default-form-member-col">
              <FormItem label="是否为代付" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.modifyInfo.insteadPay.value"
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
        <div  v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row type="flex">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="金额" class="default-form-item" required>
                <i-input 
                  :value="formatMoney(formValue.basicInfo.money.value)"
                  placeholder="请输入金额"
                  @input="moneyChange" >
                </i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款方式" class="default-form-item" required>
                <RadioGroup
                  size="large"
                  v-model="formValue.basicInfo.payType.value"
                  style="padding-left:24px"
                  @on-change="() => { formValue.modifyInfo.remark.value = '' }"

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
         <div v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row type="flex">
            <i-col span="12" class="default-form-member-col default-el-form no-icon-form">
              <FormItem label="发票" class="default-form-item" required>
                <Select
                  :value="formValue.secondModifyInfo.invoice.value"
                  placeholder="请选择发票"
                  @on-change="invoiceChange"
                >
                  <Option
                    value="专票"
                  >专票</Option>
                  <Option
                    value="普票"
                  >普票</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="税率" class="default-form-item" required>
                <input-number
                  v-model="formValue.secondModifyInfo.taxRate.value"
                  :formatter="value => `${value === '' ? '' : value + '%'}`"
                  :parser="value => value.replace('%', '')"
                  :min="0"
                  placeholder="请输入税率"
                ></input-number>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div  v-show="formValue.basicInfo.payType.value === '0'">
          <Row>
            <i-col>
              <FormItem label="备注" class="default-form-item" required>
                <i-input
                  v-model="formValue.modifyInfo.remark.value"
                  placeholder="请注明分几次付款，每次付款时间和金额"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col default-el-form">
              <FormItem label="甲方名称" class="default-form-item" required>
                <el-select v-model="formValue.partyA.name.value" @change="optionId => changeContactPart('partA', optionId)" 
                  filterable placeholder="请选择甲方名称"
                  no-data-text="无匹配数据，请添加供应商账户信息"
                  no-match-text="无匹配数据，请添加供应商账户信息">
                  <el-option v-for="item in filternormcoreData" :value="item.id" :label="item.accountName"></el-option>
                </el-select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="联系人" class="default-form-item">
                <i-input v-model="formValue.partyA.contactPerson.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item">
                <i-input v-model="formValue.partyA.accountName.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户税号" class="default-form-item">
                <i-input v-model="formValue.partyA.accountTaxNum.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input v-model="formValue.partyA.openBank.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input v-model="formValue.partyA.openAccount.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司电话" class="default-form-item">
                <i-input v-model="formValue.partyA.companyMobile.value" type="number" :maxLength="11" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input v-model="formValue.partyA.companyAddress.value" placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="乙方名称" class="default-form-item" required>
                <i-input :value="formValue.partyB.name.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="联系人" class="default-form-item">
                <i-input v-model="formValue.partyB.contactPerson.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户名称" class="default-form-item">
                <i-input v-model="formValue.partyB.accountName.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="账户税号" class="default-form-item">
                <i-input v-model="formValue.partyB.accountTaxNum.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-show="formValue.basicInfo.involveMoney.value == 1">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户银行" class="default-form-item">
                <i-input v-model="formValue.partyB.openBank.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="开户账号" class="default-form-item">
                <i-input v-model="formValue.partyB.openAccount.value" readonly placeholder="自动填充"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司电话" class="default-form-item">
                <i-input v-model="formValue.partyB.companyMobile.value" readonly placeholder="自动填充" type="number"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="公司地址" class="default-form-item">
                <i-input v-model="formValue.partyB.companyAddress.value" readonly placeholder="自动填充"></i-input>
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
                  v-model="formValue.modifyInfo.fileName.value"
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
                  v-model="formValue.modifyInfo.fileAddress.value"
                  placeholder="请输入云盘地址"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>

      <div style="text-align:center">
        <Button
          type="primary"
          class="submit-btn form-default-btn"
          size="large"
          @click="addSuppliertask"
          style="margin-top:40px"
        >提交任务</Button>
      </div>
    </i-form>

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
          </i-col>
        </Row>
      </div>
    </Modal>
    <toast :msg="toastMsg"  :is-toast="showToast"></toast>
  </div>
</template>
<script>
  import MemberAdd from "../../MemberAdd";
  import { Task } from "../../../API/api";
  import Toast from "../../../components/popup/Toast";
  import { checkForm } from "../../../util/util";
  import { OptList } from "../../../assets/conf/businessType.conf.js"
  import { thousandSplit } from "../../../util/util.js"


  export default {
    name: "supplier-contract-edit",
    components: {
      MemberAdd,
      Toast
    },
    props: {
      formValue: Object,
      projectInfo: Object,
      suppliers: Array
    },
    created() {
      this.$http.post(Task.innerCustomerNC, {}, {headers: { Authorization: "Bearer " + this.$cookie.get("token")}}).then(res => {
        let data = res.data;

        if (data.retCode === 0) {
          this.normcoreData = data.retData.data;
        }
      });
    },
    computed: {
      toNumberList() {
        let businessType = []
        if (typeof this.formValue.basicInfo.bussinessType.value == 'object' ) {
          this.formValue.basicInfo.bussinessType.value.forEach(ele => {
            businessType.push(Number(ele))
          })
        }
        return businessType
      },
    //   filterSuppliers() {
    //   return this.suppliers.filter(e => e.customerName)
    // },
      filternormcoreData() {
      return this.normcoreData.filter(e => e.accountName)
    },
    },
    data() {
      return {
        showToast: false,
        feedModal: false,
        toastMsg: '',
        repo: '',
        businessType: [
          { value: '7', label: 'KOL采购'},
          { value: '8', label: '媒体采购'},
          { value: '9', label: '文案'},
          { value: '10', label: '技术研发'},
          { value: '11', label: '排版'},
          { value: '12', label: '插画'},
          { value: '13', label: '线框图'},
          { value: '14', label: '方案'},
          { value: '15', label: '租赁服务器'},
          { value: '16', label: '视频制作'},
          { value: '17', label: '摄像'},
          { value: '18', label: '摄影'},
          { value: '19', label: '艺人费用'},
          { value: '20', label: '监测与报告'},
          { value: '21', label: '其他'}
        ],
        businessTypeList: JSON.parse(JSON.stringify(OptList)),
        normcoreData: [],
        sealConf: [
          {id: '7', label: '项目合同'},
          {id: '8', label: '框架合同 '},
          {id: '9', label: '报价单/结算单'},
          {id: '5', label: '保密协议'},
          {id: '6', label: '其他'},
        ],
        contractModule: {
          7: {name: "各项目合同模板附件", url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/项目合同"},
          8: {name: "各框架合同模板附件", url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/框架合同"},
          9: {name: "各报价单/结算单模板附件", url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/报价单（结算单）"},
          5: {name: "各保密协议模板附件", url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/保密协议"},
          6: {name: "其他模板附件", url: "smb://192.168.100.3/normcore/NORMCORE/LEGAL/其它"}
        }
      }
    },
    methods: {
      invoiceChange(val) {
        this.formValue.secondModifyInfo.invoice.value = val;
      },
      formatMoney(v) {
        let m = parseFloat(v)
        return isNaN(m) ? '' : thousandSplit(Math.round(m * 100) / 100 + '');
      },
      moneyChange(val) {
        const filterVal = val.replace(/[^\-?\d.]/g,'')     //只保留数字和.
        const twoDigitsVal = Math.round(filterVal * 100) / 100     //保留两位小数
        this.formValue.basicInfo.money.value = twoDigitsVal;
      },
      contractDeadlineChange(val) {
        this.formValue.modifyInfo.contractDeadline.value = val
      },
      involveMoneyChange() {
      if (this.formValue.basicInfo.involveMoney.value == "1") {
        this.formValue.basicInfo.money.toastMsg = "请输入金额";
      } else {
        this.formValue.basicInfo.money.toastMsg = "";
      }
      this.formValue.basicInfo.money.value = "";
      this.formValue.basicInfo.payType.value = "1";
      this.formValue.modifyInfo.insteadPay.value = "1";
    },
      /* 选择相应甲乙方时自动填充相应数据 */
      changeContactPart(type, id) {
        if (type === "partA") {
          let partMsg = this.normcoreData.find(item => item.id === id);

          this.formValue.partyA.accountName.value = partMsg.accountName;
          this.formValue.partyA.accountTaxNum.value = partMsg.dutyParagraph;
          this.formValue.partyA.contactPerson.value = partMsg.contactsInfoName;
          this.formValue.partyA.openBank.value = partMsg.bankName;
          this.formValue.partyA.openAccount.value = partMsg.accountId;
          this.formValue.partyA.companyMobile.value = partMsg.tel;
          this.formValue.partyA.companyAddress.value = partMsg.address;
        }else {
          let partMsg = this.suppliers.find(item => item.id === id);

          this.formValue.basicInfo.supplierId.value = partMsg.id;
          this.formValue.basicInfo.supplierIdAuto.value = partMsg.idAuto;
          this.formValue.partyB.name.value = partMsg.customerName;
          this.formValue.partyB.contactPerson.value = partMsg.contactsInfoName;
          this.formValue.partyB.accountName.value = partMsg.accountName;
          this.formValue.partyB.accountTaxNum.value = partMsg.dutyParagraph;
          this.formValue.partyB.openBank.value = partMsg.bankName;
          this.formValue.partyB.openAccount.value = partMsg.accountId;
          this.formValue.partyB.companyMobile.value = partMsg.tel;
          this.formValue.partyB.companyAddress.value = partMsg.address;
        }
      },
      addTaskExecutor(taskExecutor) {
        this.formValue.taskExecutor = taskExecutor;
      },
      openFeed() {
        this.feedModal = true;
      },
      submitAdvice() {
        this.$http
          .post(
            Task.adviceRepo,
            this.qs.stringify({
              toolkitId: this.$route.params.toolkitId,
              content: this.repo
            }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            if (res.data.retCode === 0) {
              this.showToast = true;
              this.toastMsg = "提交成功";
              this.toastState = "success";
              setTimeout(() => {
                this.showToast = false;
                this.repo = "";
              }, 1500);
            }
          });
      },
      addExamer(examer) {
        this.formValue.taskExamer = examer;
      },
      businessChaneg(type) {
        this.formValue.basicInfo.bussinessType.value = type
      },
      addSuppliertask() {
        /* 校验表单数据 */
        let checkedResult = checkForm(this.formValue.basicInfo);
        if (checkedResult !== true) {
          this.toastMsg = checkedResult.toastMsg;
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
        }

        let modifyInfoCheckedResult = checkForm(this.formValue.modifyInfo);
        if (modifyInfoCheckedResult !== true) {
          this.toastMsg = modifyInfoCheckedResult.toastMsg;
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
        }

        let partyCheckedResult = checkForm(this.formValue.partyA);
        if (partyCheckedResult !== true) {
          this.toastMsg = partyCheckedResult.toastMsg;
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
        }


         if (Array.isArray(this.formValue.modifyInfo.contractDeadline.value) && !this.formValue.modifyInfo.contractDeadline.value[0]) {
          this.toastMsg = "请选择合同期限";
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
      }

       if (this.formValue.basicInfo.payType.value === '0') {
         if (!this.formValue.modifyInfo.remark.value) {
          this.toastMsg = "请输入备注"
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
         }
       }

       if (!this.formValue.basicInfo.money.value) {
         if (this.formValue.basicInfo.involveMoney.value == "1") {
          this.toastMsg = "请输入金额"
          this.showToast = true;
          return setTimeout(() => this.showToast = false, 1500);
         }
       }
        let formData = {
          projectId: this.$route.params.projectId,
          productId: this.$route.params.productId,
          toolkitId: this.$route.params.toolkitId,
          endTime: this.formValue.basicInfo.endTime.value,
          taskName: this.formValue.basicInfo.contractName.value,
          payNum: this.formValue.basicInfo.payType.value
        };

        formData.taskForm = this.formValue;
        formData.priceTotal = this.formValue.basicInfo.money.value;

        let isEdit = this.$route.query.type === 'supplierContract';

        if (isEdit) {
          formData.taskId = this.$route.params.taskId;
        }

        /* 告诉上层路由不需要保存表单状态 */
        this.$emit('changeIsSaved');


        this.$http.post(isEdit ? Task.edit : Task.add, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        }).then(res => {
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
            if (isEdit) {
                this.toastMsg = "合同编辑成功";
            } else {
                this.toastMsg = "合同创建成功，即将跳转至项目结算单页面!";
            }
            this.isSaved = true;
          }

          setTimeout(() => {
              this.showToast = false;
              this.canSubmit = true;
              if (_data.retCode === 0) {
                if (!isEdit) {
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
        })
      }
    }
  };
</script>


<style lang="less" scoped>
  .form-default-btn {
    padding: 13px 41px;
    border: 1px solid #2D8EF8;
    color: #2D8EF8;
    background-color: #ffffff;
    font-size: 16px;

    &:hover {
      background-color: #2D8EF8;
      color: #ffffff;
    }
  }

  .title-bar-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    .icon-bar {
      display: flex;

      .icon-item {
        margin-right: 30px;

        .ivu-tooltip {
          vertical-align: middle;
        }

        .name {
          margin-left: 6px;
          vertical-align: middle;
        }
      }
    }
  }
</style>

<style lang="less">
  .module-url .ivu-form-item-content {
    height: 53px;
    line-height: 53px;
    padding-left: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>


