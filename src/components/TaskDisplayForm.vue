<template>
  <div v-if="type =='clientContract'">
      <client-contract :form-value="formValue" :log-list='logList' :project-info='projectInfo' :verCount='verCount' :activeVer='activeVer' :file-list='fileList' @refresh='refresh' @changeVer='changeVer'></client-contract>
  </div>
  <div v-else-if="type =='quotation'">
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
      <quotation :form-value="formValue" :log-list='logList' :project-info='projectInfo' :activeVer='activeVer' @refresh='refresh'  style="margin-left:32px"></quotation>
    </div>
  </div>
  <div v-else-if="type =='billing'">
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
      <billing :form-value="formValue" :log-list='logList' :project-info='projectInfo' :activeVer='activeVer'  style="margin-left:32px"></billing>
    </div>
  </div>
  <div v-else>
    <div class="display-form" v-if="type === 'formData'">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group" v-for="(value, key) in datas" :key="'group-' + key">
          <div>
            <FormItem label="编辑时间" class="default-form-item">
              <i-input disabled :value="verTime"></i-input>
            </FormItem>
          </div>
          <div v-for="(_value, _key) in value" :key="'form-' + _key" v-if="_value.value !== ''">
            <FormItem :label="_value.label" class="default-form-item">
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="_value.label === tipsItem.name">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{_value.label}}
                      <router-link :to="`/new/nccBook/map`" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="_value.type === 'input'">
                <i-input v-if="_value.name !== 'addr'" disabled :value="_value.value"></i-input>
                <div v-else class="default-form-member-selection">
                  <a
                    :href="_value.value | parseFileAddress"
                    target="_blank"
                    style="word-break: break-all; word-wrap: break-word;"
                  >{{_value.value}}</a>
                </div>
                <!--<i-input v-else type="url" disabled :value="_value.value"></i-input>-->
              </template>

              <template v-if="_value.type === 'select'">
                <template v-if="_value.from === 'supplier'">
                  <Select
                    transfer
                    :value="_value.value"
                    v-if="suppliers.length > 0"
                    disabled
                    class="default-form-select"
                  >
                    <Option
                      v-for="(assetItem, key) in suppliers"
                      :value="assetItem.id"
                      :key="assetItem.id"
                    >{{ assetItem.customerName }}</Option>
                  </Select>
                </template>
              </template>

              <i-input
                v-else-if="_value.type === 'textarea'"
                type="textarea"
                readonly
                :autosize="{minRows: 1, maxRows: 5}"
                v-model="_value.value"
                :placeholder="_value.placeholder"
              ></i-input>

              <DatePicker
                readonly
                transfer
                v-else-if="_value.type === 'datetime'"
                class="deadline"
                :type="_value.type"
                :placeholder="_value.placeholder"
                :value="_value.value"
                :clearable="false"
                format="yyyy-MM-dd HH:mm"
              ></DatePicker>
              <DatePicker
                readonly
                transfer
                v-else-if="_value.type === 'date'"
                class="deadline"
                :type="_value.type"
                :placeholder="_value.placeholder"
                :value="_value.value"
                :clearable="false"
              ></DatePicker>
              <DatePicker
                readonly
                transfer
                v-else-if="_value.type === 'datetimerange'"
                class="deadline"
                :type="_value.type"
                :placeholder="_value.placeholder"
                :value="_value.value"
                :clearable="false"
              ></DatePicker>

              <CheckboxGroup
                v-else-if="_value.type === 'checkbox'"
                size="large"
                class="default-form-chkbox-group"
                :value="_value.value"
              >
                <Checkbox
                  disabled
                  v-for="(chkboxItem, chkBoxIndex) in _value.items"
                  :key="chkBoxIndex"
                  :label="chkboxItem.label"
                  class="default-form-chkbox"
                  style="width: 33.333%"
                >{{chkboxItem.label}}</Checkbox>
              </CheckboxGroup>

              <RadioGroup
                v-else-if="_value.type === 'radio'"
                size="large"
                class="default-form-radio-group"
                :value="_value.value"
              >
                <Radio
                  disabled
                  v-for="(radioItem, radioIndex) in _value.items"
                  :key="radioIndex"
                  :label="radioItem.label"
                  class="default-form-radio"
                  style="width: 33.333%"
                >{{radioItem.label}}</Radio>
              </RadioGroup>
               <RadioGroup
                v-else-if="_value.type === 'requireType'"
                size="large"
                class="default-form-radio-group"
                :value="_value.value"
              >
                <Radio
                  disabled
                  v-for="(radioItem, radioIndex) in _value.items"
                  :key="radioIndex"
                  :label="radioItem.label"
                  class="default-form-radio"
                  style="width: 33.333%"
                >{{radioItem.label}}</Radio>
              </RadioGroup>

              <div class="default-form-member-selection" v-else-if="_value.type === 'member'">
                <member-add multi :is-edit="false" content="选择同行人员" :users="_value.value"></member-add>
              </div>
              <Cascader
                v-else-if="_value.type === 'city'"
                disabled
                :data="citys"
                :value="_value.value"
                placeholder="选择省、市、区"
              ></Cascader>
            </FormItem>
          </div>
        </div>
        <div class="ver-tabs">
          <ul>
            <li
              v-for="n in verCount"
              :class="{active: n === activeVer + 1}"
              @click="changeVer(n - 1)"
            >{{'V' + (verCount - n + 1)}}</li>
          </ul>
        </div>
      </i-form>
    </div>
    <div class="display-form" v-else-if="type === 'dashboard'">
      <task-dashboard :form-value="formValue" :is-display="true"></task-dashboard>
    </div>
    <div class="display-form" v-else-if="type === 'contacts'">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div>
            <FormItem label="编辑时间" class="default-form-item">
              <i-input disabled :value="verTime"></i-input>
            </FormItem>·
          </div>
          <div v-for="(_value, key) in contactsConf">
            <div>
              <FormItem :label="_value.label" class="default-form-item">
                <RadioGroup
                  v-if="_value.type === 'radio'"
                  size="large"
                  class="default-form-radio-group"
                  :value="datas[key]"
                >
                  <Radio
                    v-for="(radioItem, radioIndex) in _value.items"
                    :key="radioIndex"
                    :label="radioItem.id"
                    class="default-form-radio"
                    style="width: 33.333%"
                  >{{radioItem.label}}</Radio>
                </RadioGroup>
                <i-input
                  disabled
                  v-if="_value.type === 'cascader'"
                  :value="_value.items[datas.contactsType]"
                ></i-input>
                <i-input
                  disabled
                  v-if="_value.type === 'textarea'"
                  type="textarea"
                  :autosize="{minRows: 1, maxRows: 7}"
                  :value="datas[key]"
                ></i-input>
                <InputNumber readonly :value="datas[key]" v-if="_value.type === 'number'"></InputNumber>
              </FormItem>
            </div>
          </div>
        </div>
      </i-form>
    </div>

    <div class="display-form" v-else-if="type === 'techProject'">
      <task-tech-app-form is-display :form-value="datas" :form-label="datas" :tips="tips"></task-tech-app-form>
    </div>

    <div class="display-form" v-else-if="type === 'customer'">
      <customer-box :is-display="true" type="customer" :form-label="datas" :form-value="datas"></customer-box>
    </div>

    <div class="display-form" v-else-if="type === 'company'">
      <customer-box type="company" :is-display="true" :form-label="datas" :form-value="datas"></customer-box>
    </div>

    <div class="display-form" v-else-if="type === 'operation'">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem
                  :label="formValue.content.hasOwnProperty('title') ? formValue.content.title + '执行' : '申请人'"
                  class="default-form-item default-member-form"
                >
                  <div class="default-form-member-selection">
                    <member-add
                      :is-edit="false"
                      content="添加项目成员"
                      :users="[{headPic: formValue.operationHeadPic, userName: formValue.operationName, id: formValue.operationId, postitionName: ''}]"
                    ></member-add>
                  </div>
                </FormItem>
              </i-col>
              <i-col
                span="12"
                class="default-form-member-col"
                v-if="formValue.hasOwnProperty('inspectorId')"
              >
                <FormItem
                  :label="formValue.content.hasOwnProperty('title') ? formValue.content.title + '质检' : '审核人'"
                  class="default-form-item default-member-form"
                >
                  <div class="default-form-member-selection">
                    <member-add :is-edit="false" content="添加项目成员" :users="inspectorUsersArr"></member-add>
                  </div>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.content.hasOwnProperty('txt')">
            <FormItem label="制作内容" class="default-form-item">
              <i-input
                type="textarea"
                disabled
                :autosize="{minRows: 1, maxRows: 5}"
                v-model="formValue.content.txt"
                placeholder="填写任务需求的制作内容"
              ></i-input>
            </FormItem>
          </div>
          <div v-if="formValue.content.hasOwnProperty('endTime')">
            <FormItem label="截止时间" class="default-form-item">
              <DatePicker
                transfer
                disabled
                readonly
                class="deadline"
                type="datetime"
                placeholder="设置截止时间"
                v-model="formValue.content.endTime"
                :clearable="false"
              ></DatePicker>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>

    <div class="display-form" v-else-if="type === 'auditor'">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div>
            <FormItem label="任务审核" class="default-form-item">
              <div class="default-form-member-selection">
                <member-add
                  :is-edit="false"
                  content="添加项目成员"
                  :users="[{userName: datas.auditorName, id: datas.auditorId, positionName: '', headPic: datas.auditorHeadPic}]"
                ></member-add>
              </div>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>

    <div class="display-form" v-else-if="type === 'extra'">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <template v-for="(value, key) in datas">
            <div>
              <FormItem :label="extraTypes[value.dataType]" class="default-form-item">
                <div class="default-form-member-selection">
                  <i-input
                    :value="value.fileName"
                    :placeholder="'填写' + extraTypes[value.dataType] + '资料名称'"
                    disabled
                  ></i-input>
                </div>
              </FormItem>
            </div>
            <div>
              <FormItem label="公盘地址" class="default-form-item">
                <!--<div class="default-form-member-selection">-->
                <!--<a :href="value.fileAddress" target="_blank">{{value.fileAddress}}</a>-->
                <!--</div>-->
                <div class="default-form-member-selection">
                  <a :href="value.url | parseFileAddress" target="_blank">{{value.url}}</a>
                </div>
                <!--<i-input :value="value.fileAddress" :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'" disabled></i-input>-->
              </FormItem>
            </div>
          </template>
        </div>
      </i-form>
    </div>

    <div v-else-if="type === 'askMoney'">
      <ask-money :form-value="formValue" is-display></ask-money>
    </div>

    <div v-else-if="type === 'seal'">
      <administrative-seal :form-value="formValue" :ver-time='verTime' :is-display='true' :tips="tips"></administrative-seal>
    </div>

    <div v-else-if="type === 'invoice'">
      <invoice-form is-display :form-value="formValue"></invoice-form>
    </div>

    <div v-else-if="type === 'reimbursement'">
      <reimbursement :is-indie="isIndie" is-display :form-value="formValue"></reimbursement>
    </div>

    <div v-else-if="type === 'file'" class="display-form">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div
          class="form-group file-form"
          v-for="(value, key) in formValue"
          :key="key"
          v-if="value.fileName || value.url"
        >
          <FormItem label="提交文件" class="default-form-item">
            <i-input disabled :value="value.fileName" placeholder="填写提交文件名称"></i-input>
          </FormItem>
          <FormItem label="公盘地址" class="default-form-item">
            <div class="default-form-member-selection">
              <a :href="value.url | parseFileAddress" target="_blank">{{value.url}}</a>
            </div>
            <!--<i-input disabled :value="value.url" :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'" ></i-input>-->
          </FormItem>
        </div>
      </i-form>
    </div>
    <div v-else-if="type === 'mediaKOL'" class="display-form">
      <task-media-kol-form is-display :form-value="formValue"></task-media-kol-form>
    </div>
    <div v-else-if="type === 'contractFile'" class="display-form">
      <i-form label-position="left" :label-width="88" class="default-form">
        <div
          class="form-group file-form"
          v-for="(value, key) in formValue"
          :key="key"
          v-if="value.fileName || value.url || value.contactsAccount"
        >
          <FormItem label="合同名称" class="default-form-item">
            <i-input disabled :value="value.fileName" placeholder="填写提交文件名称"></i-input>
          </FormItem>
          <FormItem label="合同地址" class="default-form-item">
            <!--<i-input disabled :value="value.url" :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'" ></i-input>-->
            <div class="default-form-member-selection">
              <a :href="value.url | parseFileAddress" target="_blank">{{value.url}}</a>
            </div>
          </FormItem>
          <FormItem label="合同金额" class="default-form-item">
            <i-input disabled :value="value.contactsAccount" :placeholder="'填写合同金额，例如17890'"></i-input>
          </FormItem>
        </div>
      </i-form>
    </div>

    <div v-else-if="type === 'quotationFile'" class="display-form">
      <i-form label-position="left" :label-width="100" class="default-form">
        <div
          class="form-group file-form"
          v-for="(value, key) in formValue"
          :key="key"
          v-if="value.fileName || value.url || value.contactsAccount || value.taxRate"
        >
          <FormItem label="项目结算单名称" class="default-form-item">
            <i-input disabled v-model="value.fileName" placeholder="填写提交文件名称"></i-input>
          </FormItem>
          <FormItem label="项目结算单地址" class="default-form-item">
            <!--<i-input disabled v-model="value.url" :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'" ></i-input>-->
            <div class="default-form-member-selection">
              <a :href="value.url | parseFileAddress" target="_blank">{{value.url}}</a>
            </div>
          </FormItem>
          <FormItem label="项目结算单金额" class="default-form-item">
            <i-input disabled v-model="value.contactsAccount" :placeholder="'填写项目结算单金额，例如17890'"></i-input>
          </FormItem>
          <!--<FormItem  label="项目结算单税率%" class="default-form-item">-->
          <!--<i-input disabled  v-model="value.taxRate" :placeholder="'填写项目结算单税率'"></i-input>-->
          <!--</FormItem>-->
        </div>
      </i-form>
    </div>
    <div v-else-if="type === 'express'" class="display-form">
      <!--<pre>{{formValue}}</pre>-->
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div>
            <Row>
              <i-col
                span="12"
                class="default-form-member-col"
                v-for="(value, idx) in formValue.sender"
                :key="'sender-' + idx"
              >
                <FormItem :label="value.label" class="default-form-item default-member-form">
                  <div class="default-form-member-selection" v-if="value.type === 'member'">
                    <member-add :is-edit="false" content="选择寄件人" :users="[value.value || me]"></member-add>
                  </div>
                  <i-input
                    disabled
                    v-if="value.type === 'input'"
                    v-model="value.value"
                    :placeholder="value.placeholder"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
        <div v-if="formValue.brand" class="currUserBrand">
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem :label="formValue.brand[0].label" class="default-form-item" required>
                <!-- <Select v-model="formValue.brand[0].value" :placeholder="formValue.brand[0].placeholder" @on-change="currUserBrandChange">
                  <Option v-for="(item, index) in currUserBrand" :value="item.customerName" :key="index">{{ item.customerName }}</Option>
                </Select> -->
                <i-input
                    disabled
                    v-model="formValue.brand[0].value"
                    :placeholder="formValue.brand[0].placeholder"
                  ></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem :label="formValue.brand[1].label" class="default-form-item" required>
                <!-- <Select v-model="formValue.brand[1].value" :placeholder="formValue.brand[1].placeholder">
                  <Option :value="0">全部</Option>
                  <Option v-for="(item, index) in currUserProjrct" :value="item.name" :key="index">{{ item.name }}</Option>
                </Select> -->
                <i-input
                    disabled
                    v-model="formValue.brand[1].value"
                    :placeholder="formValue.brand[1].placeholder"
                  ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
          <div v-if="formValue.receiver">
            <Row>
              <i-col
                span="12"
                class="default-form-member-col"
                v-for="(value, idx) in formValue.receiver"
                :key="'receiver-' + idx"
              >
                <FormItem :label="value.label" class="default-form-item">
                  <i-input
                    disabled
                    v-if="value.type === 'input'"
                    v-model="value.value"
                    :placeholder="value.placeholder"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formValue.addr">
            <FormItem :label="formValue.addr.label" class="default-form-item">
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="formValue.addr.label === tipsItem.name">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{tipsItem.name}}
                      <router-link :to="`/new/nccBook/map`" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <Cascader
                  disabled
                  :data="citys"
                  v-model="formValue.addr.cityValue"
                  placeholder="选择省、市、区"
                ></Cascader>
              </div>
              <div class="g-bt">
                <i-input
                  disabled
                  v-model="formValue.addr.detailValue"
                  :placeholder="formValue.addr.placeholder"
                ></i-input>
              </div>
            </FormItem>
          </div>
          <div v-if="formValue.orderNo">
            <FormItem :label="formValue.orderNo.label" class="default-form-item" required>
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="formValue.orderNo.label === tipsItem.name">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{tipsItem.name}}
                      <router-link :to="`/new/nccBook/map`" target="_blank">
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>

              <i-input
                v-model="formValue.orderNo.value"
                :placeholder="formValue.orderNo.placeholder"
              ></i-input>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>

    <div v-else-if="type === 'showCase'">
      <task-p-r-content :form-value="formValue" is-display :toolkit-id="toolkitId"></task-p-r-content>
    </div>
  </div>
</template>

<script>
import MemberAdd from "./MemberAdd";
import CustomerBox from "./CustomerBox";
import AskMoney from "./AskMoney";
import InvoiceForm from "./InvoiceForm";
import Reimbursement from "./Reimbursement";
import { city } from "../assets/conf/city.conf";
import TaskTechAppForm from "./taskTechAppForm";
import TaskMediaKolForm from "./TaskMediaKOLForm";
import SealForm from "./SealForm";
import { Task } from "../API/api";
import TaskDashboard from "./taskDashboard";
import TaskPRContent from "./TaskPRContent";


import clientContract from './finance/display/clientContract'
import quotation from './finance/display/quotation'
import billing from './finance/display/billing'

import administrativeSeal from "./AdministrativeSeal";

export default {
  components: {
    TaskPRContent,
    TaskDashboard,
    SealForm,
    TaskMediaKolForm,
    TaskTechAppForm,
    MemberAdd,
    CustomerBox,
    AskMoney,
    InvoiceForm,
    Reimbursement,
    clientContract,
    quotation,
    billing,
    administrativeSeal
  },
  name: "task-display-form",
  props: {

    toolkitId: {
      type: [String, Number]
    },
    isIndie: {
      type: Boolean,
      default: false
    },
    switchKey: {
      type: [String, Number],
      default: 0
    },
    tips: {
      type: Array,
      default: function() {
        return [];
      }
    },
    contactsCode: {
      type: String
    },
    switchVal: {
      type: [String, Boolean, Array],
      default: function() {
        return [];
      }
    },
    contractsArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    formValue: {
      type: [Array, Object]
    },
    verTime: {},
    verCount: {
      // 总版本数
      type: Number,
      default: 1
    },
    activeVer: {
      // 当前版本
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "base"
    },
    logList : {
      type : [Array, Object],
      default () {
        return []
      }
    },
    fileList : {
      type : [Array, Object],
      default () {
        return []
      }
    },
    projectInfo : {
      type : [Object]
    }
  },
  data() {
    return {
      datas: null,
      citys: city,
      members: {
        operationArr: [],
        inspectorArr: []
      },
      suppliers: [],
      inspectorUsersArr: [],
      extraTypes: {
        1: "项目Brief",
        2: "方案",
        3: "参考",
        4: "客户资料",
        5: "线框",
        6: "layout",
        7: "时间表",
        8: "排期表"
      },
      contactsConf: {
        contactsTypeArr: {
          label: "文件类型",
          type: "cascader",
          name: "fileType",
          key: "contactsType",
          items: {
            1: "保密协议-与客户签约",
            2: "与客户合同",
            3: "业务制作",
            4: "KOL",
            5: "艺人",
            6: "模特",
            7: "保密协议-与供应商签约"
          }
        },
        organization: {
          label: "组织单位",
          type: "radio",
          name: "unit",
          items: [{ id: "1", label: "公司" }, { id: "2", label: "个人" }]
        },
        // platform: {
        //   label: '合作平台',
        //   type: 'radio',
        //   name: 'platform',
        //   items: [
        //     {id: '1', label: '微博'},
        //     {id: '2', label: '微信'},
        //     {id: '3', label: '其他平台'}
        //   ]
        // },
        portrait: {
          label: "肖像授权主体",
          type: "radio",
          name: "authorization",
          items: [
            { id: "1", label: "有经纪公司" },
            { id: "2", label: "无经纪公司" },
            { id: "3", label: "无授权" }
          ],
          value: ""
        },
        price: {
          label: "金额",
          type: "number",
          name: "price",
          value: 0
        },
        intro: {
          label: "业务概述",
          type: "textarea",
          value: ""
        }
      }
    };
  },
  watch: {
    formValue: {
      immediate: true,
      handler(data) {
        this.formatData(data);
      }
    }
  },
  mounted() {},
  methods: {
    refresh() {
      this.$emit('refresh')
    },
    getSupplier() {
      this.$http
        .post(Task.classPartB, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            // this.needGetPartB = false
            this.suppliers = _data.retData.data;
          }
        });
    },
    changeVer(num) {
      this.$emit("on-change", num);
    },
    formatData(data) {
      if (typeof data === "string") {
        this.datas = JSON.parse(data);
      } else {
        this.datas = data;
      }
      if (this.type === "operation") {
        if (this.datas.inspectorId instanceof Array) {
          this.inspectorUsersArr = this.datas.inspectorId.map((item, idx) => {
            return {
              userName: this.datas.inspectorName[idx],
              id: item,
              headPic: this.datas.inspectorHeadPic[idx]
            };
          });
        } else {
          this.inspectorUsersArr = [
            {
              userName: this.datas.inspectorName,
              id: this.datas.inspectorId,
              headPic: this.datas.inspectorHeadPic
            }
          ];
        }
      }
    }
  },
  created() {
    this.me = JSON.parse(localStorage.getItem("userInfo"));
    this.getSupplier();
  }
};
</script>

<style scoped lang="less">
.finance {
  position: relative;
  padding: 30px 20px;
  background-color: white;
  .ver-tabs {
  position: absolute;
  top: 30px;
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
</style>
