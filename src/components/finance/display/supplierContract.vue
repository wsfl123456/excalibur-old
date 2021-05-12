<!--供应商合同-展示-->
<template>
  <div class="form-detail">
    <div class="container">
      <div class="ver-tabs">
        <ul>
          <li
            v-for="n in verCount"
            :class="{active: n === activeVer + 1}"
            @click="changeVer(n - 1)"
          >{{'V' + (verCount - n + 1)}}</li>
        </ul>
      </div>
      <i-form label-position="left" :label-width="88" class="default-form client-contract">
        <!-- 基础信息 -->
        <div class="contract-form-group">
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同名称" class="default-form-item" required>
                  <i-input :value="formContent.basicInfo.contractName.value" readonly></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同ID" class="default-form-item" required>
                  <i-input readonly :value="selectedTask.contactsCode"></i-input>
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
                    placeholder="设置截止时间"
                    :value="formContent.basicInfo.endTime.value"
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
                  <i-input v-model="projectInfo.projectName" readonly placeholder="项目名称"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="项目ID" class="default-form-item" required>
                  <i-input v-model="projectInfo.projectCode" readonly placeholder="自动填充"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="供应商名称" class="default-form-item" required>
                  <i-input v-model="taskData.info.supplierName" readonly placeholder="供应商名称"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="供应商ID" class="default-form-item" required>
                  <i-input
                    v-model="formContent.basicInfo.supplierName.value"
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
                  <i-input v-model="contractType" placeholder="合同类型" readonly></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="合同期限" class="default-form-item" required>
                  <DatePicker
                    class="deadline"
                    v-model="formContent.modifyInfo.contractDeadline.value"
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
          <div v-if="formContent.basicInfo.contractType.value === '6'">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="合同类型备注" class="default-form-item">
                  <i-input v-model="formContent.basicInfo.contractTypeRemark.value"></i-input>
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
                    v-model="formContent.basicInfo.organizeUnit.value"
                    style="padding-left:24px"
                  >
                    <Row>
                      <i-col span="12">
                        <Radio label="1" disabled style="height:53px;line-height:53px">公司</Radio>
                      </i-col>
                      <i-col span="12">
                        <Radio label="2" disabled style="height:53px;line-height:53px">个人</Radio>
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
                <FormItem label="业务类型" class="default-form-item financeToolkit" required>
                  <Cascader :value="toNumberList" :data="bussinessTypeList" disabled placeholder></Cascader>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.bussinessType.value === '21'">
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="业务类型备注" class="default-form-item">
                  <i-input v-model="formContent.basicInfo.bussinessTypeRemark.value"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="业务概述" class="default-form-item" required>
                  <i-input
                    v-model="formContent.basicInfo.bussinessOverview.value"
                    readonly
                    placeholder="请输入业务概述"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="是否为代付" class="default-form-item" required>
                  <RadioGroup
                    size="large"
                    v-model="formContent.modifyInfo.insteadPay.value"
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
          <div v-if="formContent.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="金额" class="default-form-item" required>
                  <i-input
                    :value="formatMoney(formContent.basicInfo.money.value)"
                    readonly
                    placeholder="请输入金额"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="付款方式" class="default-form-item" required>
                  <RadioGroup
                    size="large"
                    v-model="formContent.basicInfo.payType.value"
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
          <div v-if="formContent.basicInfo.money.value">
            <Row type="flex">
              <i-col span="12" class="default-form-member-col">
                <FormItem label="发票" class="default-form-item" required>
                  <i-input
                    :value="formContent.secondModifyInfo.invoice.value"
                    readonly
                    placeholder="请选择发票"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="税率" class="default-form-item" required>
                  <input-number
                  :value="formContent.secondModifyInfo.taxRate.value"
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
          <div v-show="formContent.basicInfo.payType.value === '0'">
            <Row>
              <i-col span="24">
                <FormItem label="备注" class="default-form-item" required>
                  <i-input
                    v-model="formContent.modifyInfo.remark.value"
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
                    v-model="formContent.partyA.accountName.value"
                    readonly
                    placeholder="甲方名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="联系人" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.contactPerson.value"
                    readonly
                    placeholder="请输入联系人姓名"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.involveMoney.value == 1">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户名称" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.accountName.value"
                    readonly
                    placeholder="请输入账户名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户税号" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.accountTaxNum.value"
                    readonly
                    placeholder="请输入账户税号"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.involveMoney.value == 1">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户银行" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.openBank.value"
                    readonly
                    placeholder="请输入开户银行"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户账号" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.openAccount.value"
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
                    v-model="formContent.partyA.companyMobile.value"
                    readonly
                    placeholder="请输入公司电话"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公司地址" class="default-form-item">
                  <i-input
                    v-model="formContent.partyA.companyAddress.value"
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
                  <i-input v-model="formContent.partyB.name.value" readonly placeholder="乙方名称"></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="联系人" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.contactPerson.value"
                    readonly
                    placeholder="请输入联系人姓名"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.involveMoney.value == 1">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户名称" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.accountName.value"
                    readonly
                    placeholder="请输入账户名称"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="账户税号" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.accountTaxNum.value"
                    readonly
                    placeholder="请输入账户税号"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div v-if="formContent.basicInfo.involveMoney.value == 1">
            <Row>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户银行" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.openBank.value"
                    readonly
                    placeholder="请输入开户银行"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="开户账号" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.openAccount.value"
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
                    v-model="formContent.partyB.companyMobile.value"
                    readonly
                    placeholder="请输入公司电话"
                  ></i-input>
                </FormItem>
              </i-col>
              <i-col span="12" class="default-form-member-col">
                <FormItem label="公司地址" class="default-form-item">
                  <i-input
                    v-model="formContent.partyB.companyAddress.value"
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
          :edit-file="editfile"
          :task-address="taskAddress"
          :operation="taskData.roleInfo.operation"
          :gaizhang-file="taskData.roleInfo.new_gaizhang_file">
        </file-address>-->
        <new-file-address
          :address="newTaskAddress"
          :edit="taskData.roleInfo.new_gaizhang_file == 'show'"
        ></new-file-address>

        <!-- 报价单列表 -->
        <quotation-list :task-info="taskData.info" :project-info="projectInfo" :form-content="formContent"></quotation-list>

        <!--    打款发票信息    -->
        <div
          v-if="contactPayFile && contactPayFile.length && newfukuanexport === 'show'"
          style="text-align:right;margin:30px 0 10px 0"
        >
          <Button type="primary" @click="exporthetongfukuanlist">导出付款</Button>
        </div>
        <div class="contract-form-group">
          <Row v-for="(file, key) in contactPayFile" :key="key">
            <i-col span="5" class="default-form-member-col">
              <FormItem label="付款金额" class="default-form-item">
                <i-input :value="twoFixed(file.priceTotal)" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="5" class="default-form-member-col">
              <FormItem label="期望时间" class="default-form-item">
                <DatePicker
                  readonly
                  transfer
                  class="deadline"
                  type="datetime"
                  :title="file.endTime"
                  :value="file.endTime"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col :span="file.invoiceNo ? 4 : 8" class="default-form-member-col">
              <FormItem label="付款事由" class="default-form-item">
                <i-input :value="file.pmReason" :title="file.pmReason" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col v-if="file.invoiceNo" span="4" class="default-form-member-col">
              <FormItem label="发票号" class="default-form-item no-padding">
                <i-input :value="file.invoiceNo" :title="file.invoiceNo" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col
              span="2"
              class="default-form-member-col"
              style="text-align: center;line-height: 53px;"
            >
              <Poptip
                confirm
                transfer
                title="确定作废该打款申请？"
                placement="bottom"
                @on-ok="deleteApply(file.kfId)"
                ok-text="确定"
                cancel-text="取消"
                style="width:100%"
              >
                <Button
                  :disabled="file.new_fukuan_delete === 'show' ? false : true"
                  :class="file.new_fukuan_delete === 'show' ? 'blue' : 'gray'"
                >作废</Button>
              </Poptip>
            </i-col>
            <i-col
              span="4"
              class="default-form-member-col"
              style="text-align: center;line-height: 53px;"
            >
              <div v-if="file.new_fukuan_audit === 'show'">
                <Button
                  style="background-color: #2d8ef8;color: #FFFFFF; margin-right: 5px;"
                  @click="() => reviewFukuan(file.kfId, 6)"
                >通过</Button>
                <Button
                  style="background-color: #2d8ef8;color: #FFFFFF;"
                  @click="() => showFeelModal(file.kfId, 7)"
                >不通过</Button>
              </div>
              <div
                v-if="file.new_fukuan_audit === 'hide'"
                style="color:#adb5bd;background:white"
              >{{ file.fuStateName }}</div>
            </i-col>
          </Row>
          <Row
            v-if="formContent.basicInfo.involveMoney.value == 1 && taskData.info.priceNeedFu !== 'hide'"
          >
            <i-col span="24" class="default-form-member-col">
              <FormItem label="剩余待付金额" class="default-form-item">
                <i-input :value="twoFixed(taskData.info.priceNeedFu) + ' (元)'" readonly></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>

        <!-- 任务日志 -->
        <file-log :log-list="logList" :inspect-files="inspectList"></file-log>

        <!-- 按钮 -->
        <div v-if="!disableControl" class="contract-btn">
          <router-link
            v-if="taskData.roleInfo.eidt !== 'hide'"
            :to="{name: 'tasks-editTask', params: {taskId: taskData.info.id,customerId:  this.projectInfo.customerId, projectId: this.projectInfo.projectId}, query: {type: 'supplierContract', toolkitId: 7}}"
          >
            <Button type="ghost" class="btn ghost-btn" size="large">编辑任务</Button>
          </router-link>

          <!-- <Button
              v-if="taskData.info.state === 1 && taskData.roleInfo.audit !== 'hide'"
              type="ghost"
              class="btn ghost-btn"
              size="large"
              @click="audit(3, '', [])"
            >审核通过</Button>
            <Button
              v-if="taskData.info.state === 1 && taskData.roleInfo.audit !== 'hide'"
              type="primary"
              class="btn"
              size="large"
              @click="showModal(2)"
          >审核不通过</Button>-->

          <Button
            v-if="taskData.roleInfo.new_baojiadan_add !== 'hide'"
            type="ghost"
            class="btn ghost-btn"
            size="large"
            @click="addQuotation()"
          >添加项目结算单</Button>
          <!-- <Button
            v-if="taskData.roleInfo.operation == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="audit(5, undefined, taskAddress)"
          >提交</Button>

          <Button
            v-if="editfile === false && taskData.roleInfo.new_gaizhang_file == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="editfile = true"
          >修改</Button>
          <Button
            v-if="editfile === true && taskData.roleInfo.new_gaizhang_file == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="audit(5, undefined, taskAddress)"
          >确认修改</Button>-->

          <!-- <Button
              v-if="taskData.roleInfo.inspect !== 'hide'"
              type="ghost"
              class="btn ghost-btn"
              size="large"
              @click.native="review(6)"
            >质检通过</Button>
            <Button
              v-if="taskData.roleInfo.inspect !== 'hide'"
              type="primary"
              class="btn"
              size="large"
              @click.native="showModal(7)"
          >质检不通过</Button>-->

          <!-- <Button
            v-if="taskData.roleInfo.new_gaizhang_apply === 'show'"
            type="primary"
            class="btn"
            size="large"
            @click="hetongseal(1)"
          >申请盖章</Button>-->
          <Button
            v-if="taskData.roleInfo.new_gaizhang_audit === 'show'"
            type="primary"
            class="btn"
            size="large"
            @click="hetongseal(2)"
          >审核通过</Button>
          <Button
            v-if="taskData.roleInfo.new_gaizhang_audit == 'show'"
            type="ghost"
            class="btn ghost-btn"
            @click="zhijianModal = true"
          >审核不通过</Button>

          <Button
            v-if="taskData.roleInfo.new_gaizhang_file == 'show'"
            type="primary"
            class="btn"
            @click="hetongsealfile()"
          >提交</Button>
          <router-link
            v-if="taskData.roleInfo.new_fukuan_apply == 'show'"
            :to="{
              name: 'tasks-addTask',
              params: { customerId: selectedTask.customerId, projectId: selectedTask.projectId, productId: 7, toolkitId: 20 },
              query: {task: selectedTask.id}
            }"
          >
            <Button type="primary" class="btn" style="margin-left:10px">申请打款</Button>
          </router-link>

          <Button
            v-if="taskData.roleInfo.new_fukuan_money == 'show'"
            type="primary"
            class="btn"
            @click="audit(8, undefined, taskAddress)"
          >确认已收款</Button>

          <Button
            v-if="taskData.roleInfo.new_pmAudit !== 'hide'"
            type="ghost"
            class="btn ghost-btn"
            size="large"
            @click.native="review(8)"
          >任务已完成</Button>
        </div>
      </i-form>
    </div>

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
    <Modal
      v-model="zhijianModal"
      class-name="vertical-center-modal examine-modal"
      ok-text="提交"
      :closable="false"
      @on-ok="hetongseal(-2)"
    >
      <i-input
        type="textarea"
        v-model="zhijianReason"
        :autosize="{minRows: 5}"
        placeholder="填写不通过的理由"
      ></i-input>
      <span
        class="words-count"
        :class="{'over-length': zhijianReason.length > 1000}"
      >{{ zhijianReason.length }}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button
          type="primary"
          size="large"
          class="ok"
          @click.native="hetongseal(-2)"
          :disabled="zhijianReason.length > 1000 || zhijianReason.length == 0"
        >提交</Button>
      </div>
    </Modal>
    <Modal
      v-model="isModal"
      class-name="vertical-center-modal examine-modal"
      ok-text="提交"
      width="480px"
      :closable="false"
    >
      <i-input
        type="textarea"
        v-model="modalValue"
        @on-focus.once="clearModalValue"
        :autosize="{minRows: 5}"
        placeholder="填写不通过的理由"
      ></i-input>
      <span
        class="words-count"
        :class="{'over-length': modalValue.length > 1000}"
      >{{ modalValue.length }}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button
          type="primary"
          size="large"
          class="ok"
          @click.native="audit(nopassState, modalValue, [])"
          :disabled="modalValue.length > 1000"
        >提交</Button>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../MemberAdd";
import fileAddress from "../components/fileAddress.vue";
import newFileAddress from "../components/newFileAddress.vue";
import fileLog from "../components/fileLog.vue";
import { Task } from "../../../API/api";
import Toast from "../../popup/Toast";
import { defaultPlaceholder } from "../../../assets/conf/taskDefaultIpt";
import quotationList from "../components/quotationList.vue";
import { OptList } from "../../../assets/conf/businessType.conf.js";
import { thousandSplit } from "../../../util/util.js";

export default {
  name: "supplier-contract",
  components: {
    MemberAdd,
    Toast,
    fileAddress,
    newFileAddress,
    fileLog,
    quotationList
  },
  props: {
    taskData: Object,
    formContent: Object,
    taskInfo: Object,
    verCount: Number,
    activeVer: Number,
    projectInfo: Object,
    logList: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    }
  },
  created() {
    this.getSupplier();
  },
  data() {
    return {
      zhijianModal: false,
      isModal: false,
      editfile: false,
      zhijianReason: "",
      repo: "",
      fukuanId: undefined,
      toastState: "",
      toastMsg: "",
      modalValue: "",
      isToast: false,
      nopassState: null,
      canAudit: true,
      feedModal: false,
      suppliers: [],
      contactPayFile: [],
      newfukuanexport: "hide",
      businessTypeConf: [
        { value: "3", label: "业务制作" },
        {
          value: "",
          label: "媒体制作",
          children: [
            { value: "4", label: "KOL" },
            { value: "5", label: "艺人" },
            { value: "6", label: "模特" }
          ]
        },
        { value: "7", label: "KOL采购" },
        { value: "8", label: "媒体采购" },
        { value: "9", label: "文案" },
        { value: "10", label: "技术研发" },
        { value: "11", label: "排版" },
        { value: "12", label: "插画" },
        { value: "13", label: "线框图" },
        { value: "14", label: "方案" },
        { value: "15", label: "租赁服务器" },
        { value: "16", label: "视频制作" },
        { value: "17", label: "摄像" },
        { value: "18", label: "摄影" },
        { value: "19", label: "艺人费用" },
        { value: "20", label: "监测与报告" },
        { value: "21", label: "其他" }
      ],
      sealConf: [
        { id: "1", label: "客户合同" },
        { id: "2", label: "声明" },
        { id: "3", label: "报价单" },
        { id: "4", label: "外发合同" },
        { id: "5", label: "保密协议" },
        { id: "6", label: "其他" },
        { id: "7", label: "项目合同" },
        { id: "8", label: "框架合同 " },
        { id: "9", label: "报价单/结算单" }
      ],
      bussinessTypeList: JSON.parse(JSON.stringify(OptList)),
    };
  },
  computed: {
    disableControl() {
      return this.$route.name === "supplierContract";
    },
    inspectList() {
      return this.taskData.inspectFiles;
    },
    taskAddress() {
      if (this.taskData.gaizhangFile.length) {
        return this.taskData.gaizhangFile;
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
      return this.taskData.gaizhangFile[0];
    },
    supplierName() {
      let supplier = this.suppliers.find(
        item => item.id === this.formContent.basicInfo.supplierId.value
      );
      return supplier && supplier.customerName;
    },
    contractType() {
      let contractType = this.sealConf.find(
        item => item.id === this.formContent.basicInfo.contractType.value
      );
      return contractType && contractType.label;
    },
    bussinessType() {
      const v = this.formContent.basicInfo.bussinessType.value;
      const result = this.businessTypeConf.find(i => i.value === v);
      return result ? result.label : "";
    },
    selectedTask() {
      return this.$store.state.taskDetail;
    },
    toNumberList() {
      let businessType = [];
      if (typeof this.formContent.basicInfo.bussinessType.value == "object") {
        this.formContent.basicInfo.bussinessType.value.forEach(ele => {
          businessType.push(Number(ele));
        });
      }
      return businessType;
    }
  },
  watch: {
    /* 切换查看文件时重新查询打款数据 */
    selectedTask: {
      immediate: true,
      handler() {
        this.getContactPayFile();
      }
    }
  },
  methods: {
    formatMoney(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(Math.round(m * 100) / 100 + "");
    },
    twoFixed(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    showFeelModal(id) {
      this.fukuanId = id;
      this.feedModal = true;
    },
    deleteApply(id) {
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
            this.getContactPayFile();
            this.$emit("refresh-task-data");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    exporthetongfukuanlist() {
      const routeData = this.$router.resolve({
        name: "WindowPrint",
        query: {
          type: "payment",
          hetongId: this.taskData.info.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    getContactPayFile() {
      this.$http
        .post(
          Task.getContactPayFile,
          this.qs.stringify({ hetongId: this.selectedTask.id }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;

          if (_data.retCode === 0) {
            this.contactPayFile = _data.retData.data;
            this.newfukuanexport = _data.retData.new_fukuan_export;
          }
        });
    },
    hetongseal(state) {
      let formData = {
        hetongId: this.taskData.info.id,
        flowState: state,
        reason: this.zhijianReason
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
            this.$emit("refresh");
            this.$store.dispatch("setRefresh");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    hetongsealfile(state) {
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
        hetongId: this.taskData.info.id,
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
            this.$store.dispatch("setRefresh");
          }, 1500);
        });
    },
    showModal(state) {
      this.isModal = true;
      this.nopassState = state;

      if (+state === 7) {
        this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId]
          ? defaultPlaceholder[this.taskData.info.toolkitId].quality
          : defaultPlaceholder["default"].quality;
      } else if (+state === 9) {
        this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId]
          ? defaultPlaceholder[this.taskData.info.toolkitId].audit
          : defaultPlaceholder["default"].audit;
      } else {
        this.modalValue = "";
      }
    },
    clearModalValue() {
      this.modalValue = "";
    },
    confirmPay(id, state) {
      this.$http
        .post(
          Task.hetongkfmoney,
          this.qs.stringify({ kfId: id, flowState: state }),
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

            this.getContactPayFile();
            this.$emit("refresh");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    reviewFukuan(id, state) {
      let formData = {
        id,
        state
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

            this.getContactPayFile();
            this.$emit("refresh");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    review(state) {
      let formData = {
        id: this.taskData.info.id,
        state: state,
        // reason: "名字太短"
        taskData: this.taskAddress,
        taskForm: this.taskData.formInfo[this.activeVer].formContent
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
            this.$emit("refresh");
            this.$store.dispatch("setRefresh");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    addQuotation() {
      const tax = this.formContent.secondModifyInfo.taxRate.value === '' ? 6 : this.formContent.secondModifyInfo.taxRate.value;
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
          id: this.taskData.info.id,
          tax,
        }
      });
    },
    audit(state, reason, taskData, id) {
      if (this.canAudit) {
        this.canAudit = false;
        let data = {
          id: this.selectedTask.id,
          state,
          reason,
          taskData,
          taskPersonId: id
        };

        this.$http
          .post(Task.audit, this.qs.stringify(data), {
            headers: {
              Authorization: "Bearer " + this.$cookie.get("token")
            }
          })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.filesForm = [
                {
                  fileName: "",
                  url: "",
                  contactsAccount: null,
                  taxRate: null
                }
              ];
              this.isToast = true;
              this.toastMsg = "提交成功";
              this.toastState = "success";
              this.$emit("refresh");
              this.$store.dispatch("setRefresh");
            } else {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
              this.toastState = null;
            }
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
              this.toastState = null;
              this.canAudit = true;
              if (_data.retCode === 100014) {
                this.$cookie.delete("token");

                this.$router.push("/");
              } else if (_data.retCode === 0) {
                this.$emit("refreshTaskData");
              }
            }, 1500);
          });

        this.isModal = false;
        this.isSubmit = false;
      }
    },
    changeVer(num) {
      this.$emit("on-change", num);
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
            this.suppliers = _data.retData.data;
          }
        });
    },
    submitAdvice() {
      this.$http
        .post(
          Task.financeAudit,
          this.qs.stringify({ id: this.fukuanId, state: 7, reason: this.repo }),
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

            this.getContactPayFile();
            this.$emit("refresh");
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    }
  }
};
</script>

<style lang="less">
.no-padding {
  input {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}
</style>


<style lang="less" scoped>
.form-detail {
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
}

.container {
  position: relative;
  background: white;
  padding-left: 30px;
  border: 30px solid white;

  .ver-tabs {
    position: absolute;
    top: 0px;
    left: 0px;
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
.ver-tabs {
  position: absolute;
  top: 0;
  left: 0;
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
.gray {
  color: #adb5bd;
}
.blue {
  color: #2d8ef8;
}
</style>

