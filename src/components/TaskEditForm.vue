<template>
  <div v-if="type === 'extra'" style="margin-bottom: 32px;">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group extra-form" v-for="(value, key) in formValue" :key="key">
        <FormItem :label="formLabel[value.dataType]" class="default-form-item">
          <i-input
            type="textarea"
            :autosize="{minRows: 1, maxRows: 7}"
            :value="value.fileName"
            :placeholder="'填写' + formLabel[value.dataType] + '资料名称'"
            @on-change="changeExtraValue($event, key, 'fileName')"
          ></i-input>
        </FormItem>
        <FormItem label="公盘地址" class="default-form-item">
          <i-input
            :value="value.fileAddress"
            :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'"
            @on-change="changeExtraValue($event, key, 'fileAddress')"
          ></i-input>
        </FormItem>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'file'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group file-form" v-for="(value, key) in formValue" :key="key">
        <FormItem label="提交文件" class="default-form-item" required>
          <i-input
            v-model="value.fileName"
            :placeholder="+toolkitId === 27 || +toolkitId === 19 || +toolkitId === 20 ? '填写扫描件名称' : '填写提交文件名称'"
          ></i-input>
        </FormItem>
        <FormItem label="公盘地址" class="default-form-item" required>
          <i-input
            v-model="value.url"
            :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'"
          ></i-input>
        </FormItem>
      </div>
      <div class="form-add">
        <a href="javascript:;" @click="delFileForm" v-if="formValue.length > 1">
          <Icon type="minus"></Icon>删除提交文件
        </a>
        <a href="javascript:;" @click="addFileForm">
          <Icon type="plus"></Icon>添加提交文件
        </a>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'contractFile'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group file-form" v-for="(value, key) in formValue" :key="key">
        <FormItem label="合同名称" class="default-form-item" required>
          <i-input v-model="value.fileName" placeholder="填写提交文件名称"></i-input>
        </FormItem>
        <FormItem label="合同地址" class="default-form-item" required>
          <i-input
            v-model="value.url"
            :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'"
          ></i-input>
        </FormItem>
        <FormItem label="合同金额" class="default-form-item" required>
          <input-number
            :step=".1"
            :min="0"
            v-model="value.contactsAccount"
            :placeholder="'填写合同金额，例如17890'"
          ></input-number>
        </FormItem>
      </div>
      <div class="form-add">
        <a href="javascript:;" @click="delFileForm" v-if="formValue.length > 1">
          <Icon type="minus"></Icon>删除提交文件
        </a>
        <a href="javascript:;" @click="addFileForm">
          <Icon type="plus"></Icon>添加提交文件
        </a>
      </div>
    </i-form>
  </div>
  <div v-else-if="type === 'quotationFile'">
    <i-form label-position="left" :label-width="100" class="default-form">
      <div class="form-group file-form" v-for="(value, key) in formValue" :key="key">
        <FormItem label="项目结算单名称" class="default-form-item" required>
          <i-input v-model="value.fileName" placeholder="填写提交文件名称"></i-input>
        </FormItem>
        <FormItem label="项目结算单地址" class="default-form-item" required>
          <i-input
            v-model="value.url"
            :placeholder="'上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\'"
          ></i-input>
        </FormItem>
        <FormItem label="项目结算单金额" class="default-form-item" required>
          <input-number
            :step=".1"
            :min="0"
            v-model="value.contactsAccount"
            :placeholder="'填写项目结算单金额，例如17890'"
          ></input-number>
        </FormItem>
        <!--<FormItem  label="项目结算单税率%" class="default-form-item" required>-->
        <!--<input-number :step=".1" :min="0" v-model="value.taxRate" :placeholder="'填写项目结算单税率'"></input-number>-->
        <!--</FormItem>-->
      </div>
      <div class="form-add">
        <a href="javascript:;" @click="delFileForm" v-if="formValue.length > 1">
          <Icon type="minus"></Icon>删除提交文件
        </a>
        <a href="javascript:;" @click="addFileForm">
          <Icon type="plus"></Icon>添加提交文件
        </a>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'auditor'">
    <i-form label-position="left" :label-width="88" class="default-form auditor-form">
      <div class="form-group">
        <div>
          <FormItem label="任务审核" class="default-form-item">
            <div class="default-form-member-selection">
              <member-add content="添加项目成员"></member-add>
            </div>
          </FormItem>
        </div>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'formData'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <template v-for="(value, key) in formLabel">
          <div>
            <FormItem
              :label="value.label"
              class="default-form-item"
              :required="value.required === 'true' || value.required"
            >
              <!--<FormItem  :label="value.label" class="default-form-item" :required="true" >-->
              <!--<div slot="label" class=" " >-->
              <!--<div>-->
              <!--{{value.label}}-->
              <!--</div>-->
              <!--</div>-->
              <template v-for="tipsItem in tips">
                <div class="group-tips" v-if="value.label === tipsItem.name">
                  <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                  <div class="tips-pop">
                    <div class="tips-head">
                      {{value.label}}
                      <router-link
                        :to="`/new/nccBook/map`"
                        target="_blank"
                      >
                        <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                      </router-link>
                    </div>
                    <div class="tips-body">
                      <div v-html="tipsItem.content"></div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="value.type === 'select'">
                <template v-if="value.from === 'supplier'">
                  <Select transfer v-model="value.value">
                    <Option
                      v-for="(assetItem, key) in suppliers"
                      :value="assetItem.id"
                      :key="assetItem.id"
                    >{{ assetItem.customerName }}</Option>
                  </Select>
                </template>
              </template>
              <i-input
                v-if="value.type === 'input'"
                type="textarea"
                :autosize="{minRows: 1, maxRows: 7}"
                :readonly="value.readonly === 'true' || value.readonly"
                v-model="value.value"
                :placeholder="value.placeholder"
              ></i-input>

              <input-number
                v-if="value.type === 'number'"
                v-model="value.value"
                :placeholder="value.placeholder"
              ></input-number>

              <i-input
                v-if="value.type === 'textarea'"
                type="textarea"
                :autosize="{minRows: 1, maxRows: 7}"
                v-model="value.value"
                :placeholder="value.placeholder"
              ></i-input>

              <DatePicker
                transfer
                v-else-if="value.type === 'datetime'"
                :time-picker-options="value.workTime ? timeOpts : null"
                format="yyyy-MM-dd HH:mm"
                :options="dateOpt"
                class="deadline"
                :type="value.type"
                :placeholder="value.placeholder"
                :value="value.value"
                :clearable="false"
                @on-change="changeDataDate($event, key)"
              ></DatePicker>
              <DatePicker
                transfer
                v-else-if="value.type === 'date'"
                :options="dateOpt"
                class="deadline"
                :type="value.type"
                :placeholder="value.placeholder"
                :value="value.value"
                :clearable="false"
                @on-change="changeDataDate($event, key)"
              ></DatePicker>
              <template v-else-if="value.type === 'datetimerange'">
                <!--{{value.value}}-->
                <DatePicker
                  transfer
                  class="deadline"
                  :options="dateOpt"
                  type="datetimerange"
                  :placeholder="value.placeholder"
                  v-model="value.value"
                  :clearable="false"
                  format="yyyy-MM-dd HH:mm"
                ></DatePicker>
              </template>

              <CheckboxGroup
                v-else-if="value.type === 'checkbox'"
                size="large"
                class="default-form-chkbox-group"
                v-model="value.value"
              >
                <Checkbox
                  v-for="(chkboxItem, chkBoxIndex) in value.items"
                  :key="chkBoxIndex"
                  :label="chkboxItem.label"
                  class="default-form-chkbox"
                  style="width: 33.333%"
                >{{chkboxItem.label}}</Checkbox>
              </CheckboxGroup>

              <RadioGroup
                v-else-if="value.type === 'radio'"
                size="large"
                class="default-form-radio-group"
                v-model="value.value"
              >
                <Radio
                  v-for="(radioItem, radioIndex) in value.items"
                  :key="radioIndex"
                  :label="radioItem.label"
                  class="default-form-radio"
                  style="width: 33.333%"
                >{{radioItem.label}}</Radio>
              </RadioGroup>
              <RadioGroup
                v-else-if="value.type === 'requireType'"
                size="large"
                class="default-form-radio-group"
                v-model="value.value"
                @on-change="requireTypeChange"
              >
                <Radio
                  v-for="(radioItem, radioIndex) in value.items"
                  :key="radioIndex"
                  :label="radioItem.label"
                  class="default-form-radio"
                  style="width: 33.333%"
                >{{radioItem.label}}</Radio>
              </RadioGroup>
              <Cascader
                size="large"
                :render-format="cascaderFormat"
                :clearable="false"
                transfer
                v-if="value.type === 'cascader'"
                :data="value.items"
                v-model="value.value"
              ></Cascader>

              <div class="default-form-member-selection" v-if="value.type === 'member'">
                <member-add
                  multi
                  content="选择同行人员"
                  :project-id="projectId"
                  @on-change="selectOutMem($event, formLabel[key], 'value')"
                  :users="value.value"
                ></member-add>
              </div>
              <Cascader
                v-if="value.type === 'city'"
                :data="citys"
                v-model="value.value"
                placeholder="选择省、市、区"
              ></Cascader>
            </FormItem>
          </div>
        </template>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'techProject'">
    <task-tech-app-form :form-label="formLabel" :form-value="formValue" :tips="tips"></task-tech-app-form>
  </div>

  <div v-else-if="type === 'invoice'">
    <invoice-form :all-invoice="allInvoice" :form-label="formLabel" :form-value="formValue"></invoice-form>
  </div>

  <div v-else-if="type === 'customer'">
    <customer-box
      type="customer"
      :form-label="formLabel"
      :form-value="formValue"
      :custom-selector="allPartA"
      :company-selector="allPartB"
      :task-customer="customerId"
      :project-id="projectId"
    ></customer-box>
  </div>
  <div v-else-if="type === 'company'">
    <customer-box
      :is-filter="isFilter"
      type="company"
      :form-label="formLabel"
      :form-value="formValue"
      :custom-selector="allPartB"
      :company-selector="allPartB"
    ></customer-box>
  </div>

  <div v-else-if="type === 'reimbursement'">
    <reimbursement
      :is-indie="isIndie"
      :form-value="formValue"
      :form-label="formLabel"
      :full-value="fullValue"
    ></reimbursement>
  </div>

  <div v-else-if="type === 'askMoney'">
    <ask-money :form-label="formLabel" :form-value="formValue" :all-contract="allContract"></ask-money>
  </div>

  <div v-else-if="type === 'contacts'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <template v-for="(value, key) in contactsConf">
          <div>
            <FormItem :label="value.label" class="default-form-item" required>
              <RadioGroup
                v-if="value.type === 'radio'"
                size="large"
                class="default-form-radio-group"
                v-model="formValue[key]"
              >
                <Radio
                  v-for="(radioItem, radioIndex) in value.items"
                  :key="radioIndex"
                  :label="radioItem.id"
                  class="default-form-radio"
                  style="width: 33.333%"
                >{{radioItem.label}}</Radio>
              </RadioGroup>
              <Cascader
                size="large"
                :render-format="cascaderFormat"
                :clearable="false"
                transfer
                v-if="value.type === 'cascader'"
                :data="value.items"
                v-model="formValue[key]"
                @on-change="getRealValue(value.key, $event)"
              ></Cascader>
              <i-input
                v-if="value.type === 'textarea'"
                type="textarea"
                :autosize="{minRows: 1, maxRows: 7}"
                v-model="formValue[key]"
              ></i-input>
              <InputNumber v-model="formValue[key]" v-if="value.type === 'number'"></InputNumber>
            </FormItem>
          </div>
        </template>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'express'">
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
              <FormItem :label="value.label" class="default-form-item default-member-form" required>
                <div class="default-form-member-selection" v-if="value.type === 'member'">
                  <member-add
                    :project-id="projectId"
                    content="选择寄件人"
                    @on-change="selectOutMem($event, formValue.sender[idx], 'value')"
                    :users="[value.value]"
                  ></member-add>
                </div>
                <i-input
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
                <Select
                  v-model="formValue.brand[0].value"
                  :placeholder="formValue.brand[0].placeholder"
                >
                  <Option
                    v-for="(item, index) in currUserBrand"
                    :value="item.customerName"
                    :key="index"
                  >{{ item.customerName }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem :label="formValue.brand[1].label" class="default-form-item" required>
                <Select
                  v-model="formValue.brand[1].value"
                  :placeholder="formValue.brand[1].placeholder"
                >
                  <Option value="全部">全部</Option>
                  <Option
                    v-for="(item, index) in currUserProjrct"
                    :value="item.name"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
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
              <FormItem :label="value.label" class="default-form-item" required>
                <i-input
                  v-if="value.type === 'input'"
                  v-model="value.value"
                  :placeholder="value.placeholder"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formValue.addr">
          <FormItem :label="formValue.addr.label" class="default-form-item" required>
            <template v-for="tipsItem in tips">
              <div class="group-tips" v-if="formValue.addr.label === tipsItem.name">
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
            <div>
              <Cascader :data="citys" v-model="formValue.addr.cityValue" placeholder="选择省、市、区"></Cascader>
            </div>
            <div class="g-bt">
              <i-input
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

            <i-input v-model="formValue.orderNo.value" :placeholder="formValue.orderNo.placeholder"></i-input>
          </FormItem>
        </div>
      </div>
    </i-form>
  </div>

  <div v-else-if="type === 'mediaKOL'">
    <task-media-kol-form :form-value="formValue" :form-label="formLabel"></task-media-kol-form>
  </div>

  <div v-else-if="type === 'dashboard'">
    <task-dashboard :form-value="formValue" :form-label="formLabel" @on-select-type="changeType"></task-dashboard>
  </div>

  <div v-else-if="type === 'operation'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem
                :label="formLabel.content.hasOwnProperty('title') ? formLabel.content.title + '执行' : '申请人'"
                class="default-form-item default-member-form"
                required
              >
                <div class="default-form-member-selection">
                  <template
                    v-if="+$route.params.toolkitId === 20 || +$route.params.toolkitId === 27 || +$route.params.toolkitId === 19 || +$route.params.toolkitId === 18 || +$route.params.toolkitId === 21 || +$route.params.toolkitId === 22"
                  >
                    <member-add
                      content="添加项目成员"
                      :users="applier"
                      @on-change="selectUser($event, formLabel, 'operationId')"
                      :project-id="projectId"
                    ></member-add>
                  </template>
                  <template v-else>
                    <member-add
                      content="添加项目成员"
                      @on-change="selectUser($event, formLabel, 'operationId')"
                      :project-id="projectId"
                    ></member-add>
                  </template>
                </div>
              </FormItem>
            </i-col>
            <i-col
              span="12"
              class="default-form-member-col"
              v-if="formLabel.hasOwnProperty('inspectorId')"
            >
              <FormItem
                :label="formLabel.content.hasOwnProperty('title') ? formLabel.content.title + '质检' : '审核人'"
                class="default-form-item default-member-form"
                required
              >
                <div class="default-form-member-selection">
                  <member-add
                    is-n1
                    :multi="formLabel.content.hasOwnProperty('isMulti') && formLabel.content.isMulti === 'true'"
                    content="添加项目成员"
                    @on-change="selectUser($event, formLabel, 'inspectorId')"
                    :project-id="projectId"
                  ></member-add>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formLabel.content.hasOwnProperty('txt')">
          <FormItem label="制作内容" class="default-form-item" required>
            <i-input
              type="textarea"
              :autosize="{minRows: 1, maxRows: 7}"
              v-model="formLabel.content.txt"
              placeholder="填写任务需求的制作内容"
            ></i-input>
          </FormItem>
        </div>
        <div v-if="formLabel.content.hasOwnProperty('endTime')">
          <FormItem label="截止时间" class="default-form-item" required>
            <DatePicker
              transfer
              :options="dateOpt"
              class="deadline"
              type="datetime"
              placeholder="设置截止时间"
              :value="formLabel.content.endTime"
              :clearable="false"
              @on-change="changeOperDate"
            ></DatePicker>
          </FormItem>
        </div>
      </div>
      <!--<Row class="form-fn" v-if="formLabel.content.canMore">-->
      <Row class="form-fn">
        <!--<i-col span="12" v-if="+$route.params.toolkitId === 2">-->
        <i-col
          span="12"
          v-if="+$route.params.toolkitId !== 27 && +$route.params.toolkitId !== 19 && +$route.params.toolkitId !== 20 && +$route.params.toolkitId !== 18 && +$route.params.toolkitId !== 21 && +$route.params.toolkitId !== 22 && +$route.params.toolkitId !== 16 && +$route.params.toolkitId !== 17"
        >
          是否外发：
          <i-switch v-model="switchVal[switchKey]" @on-change="changeSwitch">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </i-col>
        <!--<i-col :span="+$route.params.toolkitId === 2 ? 12 : 24">-->
        <!--<i-col span="12" v-if="formLabel.content.canMore || formLabel.content.canDel" class="operation-fn">-->
        <i-col span="12" class="operation-fn">
          <!--<i-col span="12" >-->
          <div class="form-del">
            <a href="javascript:;" @click="removeFormItem(formLabel)" v-if="canDelOperater">
              <Icon type="minus"></Icon>
              删除{{formLabel.content.title + '执行'}}
            </a>
          </div>
          <div class="form-add">
            <!--<a href="javascript:;" @click="removeFormItem(formLabel)">-->
            <!--<Icon type="minus"></Icon>-->
            <!--删除{{formLabel.content.title + '执行'}}-->
            <!--</a>-->
            <a href="javascript:;" @click="addFormItem(formLabel)" v-if="formLabel.content.canMore">
              <Icon type="plus"></Icon>
              添加{{formLabel.content.title + '执行'}}
            </a>
          </div>
        </i-col>
      </Row>
    </i-form>
  </div>

  <div v-else-if="type === 'operationLoad'">
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem
                :label="formLabel.content.hasOwnProperty('title') ? formLabel.content.title + '执行' : '申请人'"
                class="default-form-item default-member-form"
                required
              >
                <div class="default-form-member-selection">
                  <!--<member-add :project-id="projectId" :users="[{userName: formValue.operationName, id: formValue.operationId, positionName: ''}]" content="添加项目成员" @on-change="selectUser($event, formLabel, 'operationId')"></member-add>-->
                  <member-add
                    :project-id="projectId"
                    :users="formValue.operationId ? [{userName: formValue.operationName, id: formValue.operationId, positionName: ''}] : []"
                    content="添加项目成员"
                    @on-change="selectUser($event, formLabel, 'operationId')"
                  ></member-add>
                </div>
              </FormItem>
            </i-col>
            <i-col
              span="12"
              class="default-form-member-col"
              v-if="+toolkitId !== 27 && +toolkitId !== 20 && +toolkitId !== 19 && +toolkitId !== 18 && +toolkitId !== 21 && +toolkitId !== 22"
            >
              <FormItem
                :label="formLabel.content.hasOwnProperty('title') ? formLabel.content.title + '质检' : '审核人'"
                class="default-form-item default-member-form"
                required
              >
                <div class="default-form-member-selection">
                  <member-add
                    is-n1
                    :multi="formValue.content.hasOwnProperty('isMulti') && formValue.content.isMulti === 'true'"
                    :project-id="projectId"
                    :users="inspectorUsersArr"
                    content="添加项目成员"
                    @on-change="selectUser($event, formValue, 'inspectorId')"
                  ></member-add>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div v-if="formLabel.content.hasOwnProperty('txt')">
          <FormItem label="制作内容" class="default-form-item" required>
            <i-input
              type="textarea"
              :autosize="{minRows: 1, maxRows: 7}"
              v-model="formLabel.content.txt"
              placeholder="填写任务需求的制作内容"
            ></i-input>
          </FormItem>
        </div>
        <div v-if="formLabel.content.hasOwnProperty('endTime')">
          <FormItem label="截止时间" class="default-form-item" required>
            <DatePicker
              transfer
              :options="dateOpt"
              class="deadline"
              type="datetime"
              placeholder="设置截止时间"
              :value="formLabel.content.endTime"
              :clearable="false"
              @on-change="changeOperDate"
            ></DatePicker>
          </FormItem>
        </div>
      </div>

      <!--<Row class="form-fn" v-if="formLabel.content.canMore || formLabel.content.canDel">-->
      <Row class="form-fn">
        <!--<i-col span="12" v-if="+toolkitId === 2">-->
        <i-col span="12" v-if="formLabel.content.title == 'spotplan'">
          <div style="visibility: hidden;">
            是否外发：
            <i-switch v-model="switchVal[switchKey]" @on-change="changeSwitch">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </div>
        </i-col>
        <i-col span="12" v-else-if="toolkit == 27">
          <div style="visibility: hidden;">
            是否外发：
            <i-switch v-model="switchVal[switchKey]" @on-change="changeSwitch">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </div>
        </i-col>
        <i-col span="12" v-else>
          是否外发：
          <i-switch v-model="switchVal[switchKey]" @on-change="changeSwitch">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </i-col>
        <!--<i-col :span="+toolkitId === 2 ? 12 : 24">-->
        <i-col v-if="taskId != 831 && toolkitId != 27" span="12" class="operation-fn">
          <div class="form-del">
            <a href="javascript:;" @click="removeFormItem(formLabel)" v-if="canDelOperater">
              <Icon type="minus"></Icon>
              删除{{formLabel.content.title + '执行'}}
            </a>
          </div>
          <!--<div class="form-add" v-if="formLabel.content.canMore && (formLabel.content.canMore === 'true' || formLabel.content.canMore === true )">-->
          <div class="form-add">
            <!--<a href="javascript:;" @click="removeFormItem(formLabel)" v-if="formLabel.content.canDel">-->
            <!--<Icon type="minus"></Icon>-->
            <!--删除{{formLabel.content.title + '执行'}}-->
            <!--</a>-->
            <a href="javascript:;" @click="addFormItem(formLabel)" v-if="formLabel.content.canMore">
              <Icon type="plus"></Icon>
              添加{{formLabel.content.title + '执行'}}
            </a>
          </div>
        </i-col>
      </Row>
    </i-form>
  </div>

  <div v-else-if="type === 'seal'">
    <div>
      <administrative-seal :form-value="taskFormData.seal" :tips="tips"></administrative-seal>
    </div>
  </div>

  <div v-else-if="type === 'showCase'">
    <task-p-r-content :toolkit-id="toolkitId" :form-value="formValue"></task-p-r-content>
  </div>
  <!-- 客户合同 -->
  <div v-else-if="type === 'clientContract'">
    <client-contract-edit
      :formValue="formValue"
      :project-info="projectInfo"
      :operationInfo="operationInfo"
      :all-part-a="allPartA"
      :all-part-b="allPartB"
      :is-saved="isSaved"
      :is-add="isAdd"
      @changeIsSaved="changeIsSaved"
    ></client-contract-edit>
  </div>
  <!-- 供应商合同 -->
  <div v-else-if="type === 'supplierContract'">
    <supplier-contract-edit
      :formValue="formValue"
      :project-info="projectInfo"
      :suppliers="newSuppliers"
      @changeIsSaved="changeIsSaved"
    ></supplier-contract-edit>
  </div>
  <!-- 打款 -->
  <div v-else-if="type === 'pay'">
    <pay-edit :formValue="formValue" @changeIsSaved="changeIsSaved"></pay-edit>
  </div>
  <!-- 报价单 -->
  <div v-else-if="type === 'quotation'">
    <quotation-edit
      :formValue="formValue"
      :project-info="projectInfo"
      @changeIsSaved="changeIsSaved"
      :is-add="isAdd"
    ></quotation-edit>
  </div>
  <!-- 开票 -->
  <div v-else-if="type === 'billing'">
    <billing-edit
      :formValue="formValue"
      :project-info="projectInfo"
      :all-part-a="allPartA"
      :all-part-b="allPartB"
      @changeIsSaved="changeIsSaved"
      :is-add="isAdd"
    ></billing-edit>
  </div>

  <div v-else>
    <i-form label-position="left" :label-width="88" class="default-form">
      <div class="form-group">
        <div v-for="(value, key) in formLabel" :key="key">
          <FormItem :label="value.label" class="default-form-item" required>
            <i-input
              v-if="value.type === 'input'"
              :autosize="{minRows: 1, maxRows: 7}"
              v-model="formValue[key]"
              :placeholder="value.placeholder"
            ></i-input>
            <DatePicker
              transfer
              :time-picker-options="timeOpts"
              format="yyyy-MM-dd HH:mm"
              :options="dateOpt"
              v-else-if="value.type === 'datetime'"
              class="deadline"
              :type="value.type"
              :placeholder="value.placeholder"
              :value="formValue[key]"
              :clearable="false"
              @on-change="changeDate(key, $event)"
            ></DatePicker>
          </FormItem>
        </div>
      </div>
    </i-form>
  </div>
</template>

<script>
// import ExtraOptions from './ExtraOptions'
import MemberAdd from "./MemberAdd";
import CustomerBox from "./CustomerBox";
import Reimbursement from "./Reimbursement";
import { city } from "../assets/conf/city.conf";
import AskMoney from "./AskMoney";
import InvoiceForm from "./InvoiceForm";
import TaskTechAppForm from "./taskTechAppForm";
import TaskMediaKolForm from "./TaskMediaKOLForm";
import SealForm from "./SealForm";
import { defaultPlaceholder } from "../assets/conf/taskDefaultIpt";

// import Toast from './popup/Toast'
import { Task, Project } from "../API/api";
import TaskDashboard from "./taskDashboard";
import TaskPRContent from "./TaskPRContent";

import ClientContractEdit from "./finance/edit/ClientContractEdit";
import quotationEdit from "./finance/edit/quotationEdit";
import supplierContractEdit from "./finance/edit/supplierContractEdit";
import payEdit from "./finance/edit/payEdit.vue";
import billingEdit from "./finance/edit/billingEdit.vue";
import administrativeSeal from "./AdministrativeSeal.vue";

export default {
  name: "task-edit-form",
  components: {
    TaskPRContent,
    TaskDashboard,
    SealForm,
    TaskMediaKolForm,
    TaskTechAppForm,
    InvoiceForm,
    AskMoney,
    Reimbursement,
    CustomerBox,
    MemberAdd,
    ClientContractEdit,
    quotationEdit,
    supplierContractEdit,
    payEdit,
    billingEdit,
    administrativeSeal
  },
  props: {
    projectInfo: {
      type: [Object, Array],
      default: function() {
        return {};
      }
    },
    taskId: {
      type: [Number, String],
      default: ""
    },
    canDelOperater: {
      type: Boolean,
      default: false
    },
    namePlaceholder: {
      type: String,
      default: ""
    },
    isIndie: {
      type: Boolean,
      default: false
    },
    customerId: {
      type: [Number, String]
    },
    customerName: {
      type: String
    },
    tips: {
      type: Array,
      default: function() {
        return [];
      }
    },
    isFilter: {
      type: Boolean,
      default: false
    },
    switchKey: {
      type: [String, Number],
      default: 0
    },
    switchVal: {
      type: [String, Boolean, Array],
      default: function() {
        return [];
      }
    },
    isDisplay: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: [Number, String]
    },
    type: {
      type: String, // ''=>默认  'auditor'=>审核人  'extra'=>任务资料  'formData'=>需求单 'operation'=>制作人员
      default: ""
    },
    fullValue: {
      type: Object,
      default: function() {
        return {};
      }
    },
    formLabel: {
      type: [Array, Object],
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
    allPartA: {
      type: Array,
      default: function() {
        return [];
      }
    },
    allPartB: {
      type: Array,
      default: function() {
        return [];
      }
    },
    allContract: {
      type: Array,
      default: function() {
        return [];
      }
    },
    allInvoice: {
      type: Array,
      default: function() {
        return [];
      }
    },
    toolkitId: {
      type: [String, Number]
    },
    isSaved: {
      type: Boolean
    },
    operationInfo: {
      type: [Array, Object]
    },
    isAdd: {
      type: [Boolean],
      default() {
        return true;
      }
    },
    currUserBrand: {
      type: [Array],
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // switchBtn: this.switchVal,
      timeOpts: {
        // hideDisabledOptions: true,
        // disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 21, 22, 23]
      },
      dateOpt: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      datas: null,
      inspectorUsersArr: [],
      suppliers: [],
      newSuppliers: [],
      queryPartA: this.allPartA || [],
      queryPartB: this.allPartB || [],
      needGetPartA: true,
      needGetPartB: true,
      citys: city,
      currUserProjrct: [],
      contactsConf: {
        contactsTypeArr: {
          label: "文件类型",
          type: "cascader",
          name: "fileType",
          key: "contactsType",
          items: [
            {
              value: "secret",
              label: "保密协议",
              children: [
                { value: "1", label: "与客户签约" },
                { value: "7", label: "与供应商签约" }
              ]
            },
            {
              value: "contract",
              label: "合同",
              children: [
                { value: "2", label: "与客户合同" },
                {
                  value: "",
                  label: "与供应商合同",
                  children: [
                    { value: "3", label: "业务制作" },
                    {
                      value: "",
                      label: "媒体制作",
                      children: [
                        { value: "4", label: "KOL" },
                        { value: "5", label: "艺人" },
                        { value: "6", label: "模特" }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          value: ""
        },
        organization: {
          label: "组织单位",
          type: "radio",
          name: "unit",
          items: [
            { id: "1", label: "公司" },
            { id: "2", label: "个人" }
          ],
          value: ""
        },
        // platform: {
        //   label: '合作平台',
        //   type: 'radio',
        //   name: 'platform',
        //   items: [
        //     {id: '1', label: '微博'},
        //     {id: '2', label: '微信'},
        //     {id: '3', label: '其他平台'}
        //   ],
        //   value: ''
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
  // computed: {
  //   switchBtn () {
  //     return this.switchVal
  //   }
  // },
  computed: {
    brandName() {
      return this.formValue.brand ? this.formValue.brand[0].value : "";
    }
  },
  created() {
    // console.log(this.taskId)
    // this.formLabel
    this.initAdd();
    if (this.type === 'clientContract') {
      this.formValue.contractsInfo.partyA.name.value = JSON.stringify(this.allPartA.find(e => {
        return e.accountName === this.formValue.contractsInfo.partyA.accountName.value
      }))
      this.formValue.contractsInfo.partyB.name.value = JSON.stringify(this.allPartB.find(e => {
        return e.accountName === this.formValue.contractsInfo.partyB.accountName.value
      }))
    }
  },
  mounted() {
    // this.initAdd()
  },
  methods: {
    // currUserBrandChange(brandName) {
    //   let brandId = this.currUserBrand.find(e => e.customerName === brandName).id

    //   this.formValue.brand[1].value = ''
    //   this.currUserProjrct = []

    //   this.$http
    //   .post(
    //     Project.list,
    //     this.qs.stringify({
    //       page: 1,
    //       pageSize: 1000,
    //       customerId: brandId,
    //       powerType: 1
    //     }),
    //     { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
    //   )
    //   .then(res => {
    //     if (res.data.retCode === 0) {
    //       this.currUserProjrct = res.data.retData.data
    //     }
    //   });

    // },
    initAdd() {
      if (this.type === "operationLoad") {
        this.formatData(this.formValue);
      }

      if (
        +this.$route.params.toolkitId === 27 ||
        +this.$route.params.toolkitId === 19 ||
        +this.$route.params.toolkitId === 20 ||
        +this.$route.params.toolkitId === 18 ||
        +this.$route.params.toolkitId === 21 ||
        +this.$route.params.toolkitId === 22
      ) {
        this.applier = [JSON.parse(localStorage.getItem("userInfo"))];
        if (this.formValue.hasOwnProperty("operationId"))
          this.formValue.operationId = this.applier[0].id;
      }
      this.me = JSON.parse(localStorage.getItem("userInfo"));
      // if (+this.$route.params.toolkitId === 313 || +this.toolkitId === 313) {
      this.getSupplier();
      this.getNewSupplier();

      if (this.formValue.taskName === "") {
        this.formValue.taskName = defaultPlaceholder[
          this.$route.params.toolkitId
        ]
          ? defaultPlaceholder[this.$route.params.toolkitId].name
          : this.namePlaceholder
          ? this.namePlaceholder
          : "";
      }
      // this.formLabel.taskName.placeholder = this.formLabel.taskName.placeholder + ' ' + (defaultPlaceholder[this.$route.params.toolkitId] ? defaultPlaceholder[this.$route.params.toolkitId].name : '')

      if (this.type === "formData") {
        if (this.formLabel instanceof Array) {
          this.formLabel.forEach(item => {
            switch (item.name) {
              case "task_desc":
                if (!item.value || item.value === "") {
                  item.value = defaultPlaceholder[this.$route.params.toolkitId]
                    ? defaultPlaceholder[this.$route.params.toolkitId].desc
                    : "";
                }
                break;
            }
          });
        }
      }
      if (
        this.type === "file" ||
        this.type === "contractFile" ||
        this.type === "quotationFile"
      ) {
        if (this.formValue instanceof Array) {
          this.formValue.forEach(item => {
            if (!item.fileName || item.fileName === "") {
              item.fileName = defaultPlaceholder[this.toolkitId]
                ? defaultPlaceholder[this.toolkitId].file
                : "";
            }
          });
        }
      }
    },
    getSupplier() {
      const data = {
        customerId: this.customerId
      };
      this.$http
        .post(Task.classPartB, this.qs.stringify(data), {
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
    getNewSupplier() {
      const data = {
        customerId: this.customerId,
        itemRange: 1,
      };
      this.$http
        .post(Task.classPartB, this.qs.stringify(data), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            // this.needGetPartB = false
            this.newSuppliers = _data.retData.data;
          }
        });
    },
    changeType(v) {
      this.$emit("on-select-type", v);
    },
    changeOperDate(date) {
      this.formLabel.content.endTime = date;
    },
    changeIsSaved() {
      this.$emit("changeIsSaved");
    },
    changeSwitch(status) {
      this.$emit("on-switch", status);
    },
    selectOutMem(value, obj, key) {
      obj[key] = value;
    },
    getRealValue(key, value) {
      this.formValue[key] = value[value.length - 1];
    },
    customerSelect() {},
    filterCustomer(type, value) {
      switch (type) {
        case "outer":
          this.queryPartA = this.allPartA.filter((item, idx) => {
            return item.customerName.indexOf(value) !== -1;
          });
          break;
        case "inner":
          this.queryPartB = this.allPartB.filter((item, idx) => {
            return item.customerName.indexOf(value) !== -1;
          });
          break;
      }

      // return option.customerName.indexOf(value) !== -1
    },
    cascaderFormat(labels, selectedData) {
      const last = labels.length - 1;
      return labels[last];
    },
    delFileForm() {
      this.$emit("on-del");
    },
    addFileForm() {
      this.$emit("on-add");
    },
    changeExtraValue(e, index, key) {
      let params = {
        index,
        key,
        value: e.target.value
      };
      this.$store.dispatch("updateExtraDataParam", params);
    },
    resetObj(obj) {
      for (let key in obj) {
        // if (key !== 'title' && key !== 'canMore') {
        if (key !== "title") {
          if (obj[key] instanceof Object) {
            this.resetObj(obj[key]);
          } else {
            obj[key] = null;
          }
        }
      }
      return obj;
    },
    addFormItem(arg) {
      console.log("arg", arg);
      let obj = JSON.parse(JSON.stringify(arg));
      this.resetObj(obj);
      obj.content.canDel = true;
      obj.content.canMore = true;
      this.$emit("on-add", obj);
    },
    removeFormItem(arg) {
      this.$emit("on-remove", arg);
    },
    selectUser(value, targetObj, key) {
      if (value instanceof Array) {
        let idArr = value.map(item => {
          return item.id;
        });
        targetObj[key] = value ? idArr : null;
      } else {
        targetObj[key] = value ? value.id : null;
      }
    },
    changeDataDate(value, key) {
      if (this.formValue[key].workTime && value.indexOf("00:00") >= 0) {
        value = value.replace("00:00", "10:00");
      }
      this.formValue[key].value = value;
    },
    changeDate(key, value) {
      if (value.indexOf("00:00") >= 0) {
        value = value.replace("00:00", "10:00");
      }
      this.formValue[key] = value;
    },
    formatData(data) {
      if (typeof data === "string") {
        this.datas = JSON.parse(data);
      } else {
        this.datas = data;
      }
      if (this.type === "operationLoad") {
        if (this.datas.inspectorId instanceof Array) {
          this.inspectorUsersArr = this.datas.inspectorId.map((item, idx) => {
            return { userName: this.datas.inspectorName[idx], id: item };
          });
        } else {
          if (this.datas.inspectorName || this.datas.inspectorId) {
            this.inspectorUsersArr = [
              { userName: this.datas.inspectorName, id: this.datas.inspectorId }
            ];
          }
        }
      }
    },
    requireTypeChange(val) {
      this.$emit("showOperate");
      this.operationInfo.length = 0;
      this.operationInfo.push({
        operationId: null,
        inspectorId: null,
        content: {
          txt: null,
          endTime: null,
          title: "",
          canMore: true,
          idxId: 1
        }
      });
      switch (val) {
        case "文案需求":
          this.operationInfo[0].content.title = "文案";
          break;
        case "设计需求":
          this.operationInfo[0].content.title = "设计";
          break;
        case "图文需求":
          this.operationInfo[0].content.title = "文案";
          this.operationInfo.push({
            operationId: null,
            inspectorId: null,
            content: {
              txt: null,
              endTime: null,
              title: "设计",
              canMore: true,
              idxId: 1
            }
          });
          break;
        case "视频需求":
          this.operationInfo[0].content.title = "视频";
      }
    }
  },
  watch: {
    brandName: {
      handler(val) {
        if (val) {
          console.log(222)
          const brandId = this.currUserBrand.find(e => (e.customerName == val)).id;
          this.$http
            .post(
              Project.list,
              this.qs.stringify({
                page: 1,
                pageSize: 1000,
                customerId: brandId,
                powerType: 1
              }),
              {
                headers: {
                  Authorization: "Bearer " + this.$cookie.get("token")
                }
              }
            )
            .then(res => {
              if (res.data.retCode === 0) {
                this.currUserProjrct = res.data.retData.data;
              }
            });
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="less">
.form-add {
  > a {
    margin-left: 16px;
  }
}
.form-fn {
  margin-bottom: 16px;
}
.operation-fn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
<style lang="less">
.currUserBrand {
  .ivu-select-selected-value {
    font-size: 14px !important;
  }
  .ivu-select-placeholder {
    font-size: 14px !important;
  }
}
</style>

