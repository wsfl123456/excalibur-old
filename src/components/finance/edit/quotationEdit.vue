<!--项目结算单-编辑-->
<template>
  <div class="quote financeToolkit">
    <i-form label-position="left" :label-width="120" class="default-form">
      <!-- 关联合同/项目结算单类型 -->
      <div style="margin-bottom: 20px">
        <Row :gutter="30">
          <i-col span="12">
            <div><span class="quotation-require">*</span>关联合同</div>
            <div>
              <Select
                v-model="formValue.quotationInfo[0].basicInfo.relateContractId"
                :disabled="
                  $route.query.id || $route.name == 'tasks-editTask'
                    ? true
                    : false
                "
                filterable
                style="width: 100%"
                placeholder="请选择关联合同"
              >
                <Option
                  v-for="(item, index) in relateContractList"
                  :key="index"
                  :value="String(item.hetongId)"
                  >{{ item.taskName }}</Option
                >
              </Select>
            </div>
          </i-col>
        </Row>
      </div>
      <!-- 基本信息 -->
      <div class="quotation-form-group">
        <div class="title" style="background: white">
          <p class="en-title">ADVERTISING SOW & QUOTATION</p>
          <p class="zh-title">工作说明及项目结算单</p>
        </div>
        <div v-if="isAdd">
          <Row>
            <i-col span="16" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Quotation Name</div>
                  <div class="label">
                    <span class="quotation-require">*</span>项目结算单名称
                  </div>
                </span>
                <i-input
                  v-model="formValue.quotationInfo[0].basicInfo.quoName"
                  :placeholder="relatePlaceholder"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item banking">
                <span slot="label">
                  <div class="label">Belonging Date</div>
                  <div class="label">
                    <span class="quotation-require">*</span>所属年季
                  </div>
                </span>
                <Select
                  v-model="kaipiaoDate"
                  style="width: 100%"
                  placeholder="请选择所属年季"
                >
                  <Option
                    v-for="(i, k) in kaipiaoDateList"
                    :value="i"
                    :key="k"
                    >{{ i }}</Option
                  >
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <template v-else>
          <div>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem class="default-form-item">
                  <span slot="label">
                    <div class="label">Quotation Name</div>
                    <div class="label">
                      <span class="quotation-require">*</span>项目结算单名称
                    </div>
                  </span>
                  <i-input
                    v-model="formValue.quotationInfo[0].basicInfo.quoName"
                    :placeholder="relatePlaceholder"
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
          <div>
            <Row>
              <i-col span="8" class="default-form-member-col">
                <FormItem class="default-form-item banking">
                  <span slot="label">
                    <div class="label">Belonging Date</div>
                    <div class="label">
                      <span class="quotation-require">*</span>所属年季
                    </div>
                  </span>
                  <Select
                    v-model="kaipiaoDate"
                    style="width: 100%"
                    placeholder="请选择所属年季"
                  >
                    <Option
                      v-for="(i, k) in kaipiaoDateList"
                      :value="i"
                      :key="k"
                      >{{ i }}</Option
                    >
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="16" class="default-form-member-col">
                <FormItem class="default-form-item">
                  <span slot="label">
                    <div class="label">ID</div>
                    <div class="label">编号</div>
                  </span>
                  <i-input
                    v-model="projectInfo.info.taskCode"
                    placeholder="自动填充"
                    readonly
                  ></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </template>

        <div>
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item banking">
                <span slot="label">
                  <div class="label">Banking</div>
                  <div class="label">银行</div>
                </span>
                <Select
                  v-model="formValue.quotationInfo[0].basicInfo.bank"
                  @on-change="bankChange"
                  style="width: 100%"
                  placeholder="请选择银行"
                >
                  <Option value="招商银行股份有限公司上海延西支行"
                    >招商银行股份有限公司上海延西支行</Option
                  >
                  <Option value="招商银行宜山支行">招商银行宜山支行</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client Name</div>
                  <div class="label">客户姓名</div>
                </span>
                <i-input
                  v-model="projectInfo.projectInfo.customerName"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client ID</div>
                  <div class="label">客户编号</div>
                </span>
                <i-input
                  v-model="projectInfo.projectInfo.customerCode"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">BankingAccount</div>
                  <div class="label">银行账户</div>
                </span>
                <i-input
                  v-model="formValue.quotationInfo[0].basicInfo.bankAccount"
                  placeholder="请输入银行账户"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project Name</div>
                  <div class="label">项目名称</div>
                </span>
                <i-input
                  v-model="projectInfo.projectInfo.projectName"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client Owner</div>
                  <div class="label">
                    <span class="quotation-require">*</span>客户负责人
                  </div>
                </span>
                <Select
                  v-model="formValue.quotationInfo[0].basicInfo.clientOwner"
                  style="width: 100%"
                  filterable
                  placeholder="请选择客户负责人"
                >
                  <Option
                    v-for="(item, index) in customerPerson"
                    :key="index"
                    :value="item.name"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Banking ID</div>
                  <div class="label">银行卡号</div>
                </span>
                <i-input
                  v-model="formValue.quotationInfo[0].basicInfo.bankID"
                  placeholder="请输入银行卡号"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project ID</div>
                  <div class="label">项目编号</div>
                </span>
                <i-input
                  v-model="projectInfo.projectInfo.projectCode"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project Owner</div>
                  <div class="label">
                    <span class="quotation-require">*</span>项目负责人
                  </div>
                </span>
                <Select
                  v-model="formValue.quotationInfo[0].basicInfo.projectOwner"
                  style="width: 100%"
                  filterable
                  placeholder="请选择项目负责人"
                >
                  <Option
                    v-for="(item, index) in projectPerson"
                    :key="index"
                    :value="item.userName"
                    >{{ item.userName }}</Option
                  >
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Contact Person</div>
                  <div class="label">财务联系人</div>
                </span>
                <i-input
                  v-model="formValue.quotationInfo[0].basicInfo.contactPerson"
                  placeholder="请输入财务联系人"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Issue Date</div>
                  <div class="label">
                    <span class="quotation-require">*</span>发送日期
                  </div>
                </span>
                <DatePicker
                  transfer
                  class="deadline"
                  placeholder="设置发送日期"
                  format="yyyy-MM-dd"
                  v-model="formValue.quotationInfo[0].basicInfo.issueDate"
                  @on-change="issueDate"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item quotation-cost-center">
                <span slot="label">
                  <div class="label">Cost Center</div>
                  <div class="label">成本中心</div>
                </span>
                <Select
                  v-model="formValue.quotationInfo[0].basicInfo.costCenter"
                  placeholder="请选择成本中心"
                >
                  <Option
                    v-for="(item, index) in teamList"
                    :value="item.name"
                    :key="index"
                  >
                    {{ item.name }}
                  </Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div class="quotation-select">
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Contact Information</div>
                  <div class="label">联系方式</div>
                </span>
                <i-input
                  v-model="formValue.quotationInfo[0].basicInfo.contactInfo"
                  placeholder="请输入联系方式"
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Valid Date</div>
                  <div class="label">有效日期</div>
                </span>
                <DatePicker
                  transfer
                  class="deadline"
                  placeholder="设置有效日期"
                  format="yyyy-MM-dd"
                  v-model="formValue.quotationInfo[0].basicInfo.validDate"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Cueerncy</div>
                  <div class="label">项目结算单币种</div>
                </span>
                <Select
                  v-model="formValue.quotationInfo[0].basicInfo.cueemcy"
                  placeholder="请选择币种"
                  style="width: 100%; font-size: 14px"
                >
                  <Option value="0">RMB</Option>
                  <Option value="1">USD</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
      <!-- 工作说明书及报价 -->
      <div class="third-form-group form-group">
        <!-- 工作说明书及报价--title -->
        <div v-show="formValue.quotationInfo[0].statement.hasStatement == '1'">
          <div class="instruction">
            <div class="title instruction-left borderRight">
              <p class="en-title">STATEMNT OF WORK</p>
              <p class="zh-title">工作说明书</p>
            </div>
            <div class="title instruction-right">
              <p class="en-title">QUOTATION</p>
              <p class="zh-title">报价</p>
            </div>
          </div>
        </div>
        <div v-show="formValue.quotationInfo[0].statement.hasStatement == '1'">
          <div class="instruction-title" style="background: rgb(241, 243, 245)">
            <div class="border-right instruction-title-item">
              <p class="label">Items</p>
              <p class="label"><span class="quotation-require">*</span>细项</p>
            </div>
            <div class="instruction-title-quo">
              <Row>
                <i-col span="3" class="border-right">
                  <p class="label">Description</p>
                  <p class="label">描述</p>
                </i-col>
                <i-col span="3" class="border-right">
                  <p class="label">NHU</p>
                  <p class="label">
                    <span class="quotation-require">*</span>事业部
                  </p>
                </i-col>
                <i-col span="3" class="border-right">
                  <p class="label">Principal</p>
                  <p class="label">
                    <span class="quotation-require">*</span>负责人
                  </p>
                </i-col>

                <i-col span="3" class="border-right">
                  <p class="label">Price</p>
                  <p class="label">
                    <span class="quotation-require">*</span>单价
                  </p>
                </i-col>
                <i-col span="2" class="border-right">
                  <p class="label">Quantity</p>
                  <p class="label">数量</p>
                </i-col>
                <i-col span="3" class="border-right">
                  <p class="label">NoTaxTotal</p>
                  <p class="label">
                    总价
                    <Tooltip content="项目结算单总价均为不含税价格">
                      <Icon
                        type="information-circled"
                        size="15"
                        style="color: #f66"
                      ></Icon>
                    </Tooltip>
                  </p>
                </i-col>
                <i-col span="2" class="border-right">
                  <p class="label">TaxRate</p>
                  <p class="label">税率</p>
                </i-col>
                <i-col span="5" class="border-right">
                  <p class="label">Total</p>
                  <p class="label">含税总价</p>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
        <!-- 工作说明书及报价--content -->
        <div
          v-show="formValue.quotationInfo[0].statement.hasStatement == '1'"
          class="instrcution-content no-label-input"
        >
          <!-- 项目名称 -->
          <div class="instrcution-content-right">
            <!-- 自动添加 -->
            <div
              v-for="(item, index) in formValue.quotationInfo[0].statement
                .itemsList"
              :key="index"
            >
              <!-- 选择细项----开始 -->
              <div style="display: flex; overflow: hidden" class="borderBottom">
                <div style="width: 200px" class="border-right">
                  <el-cascader
                    :value="item.selectItem"
                    :options="options[index]"
                    :props="itemsProp"
                    collapse-tags
                    filterable
                    @change="cascaderChange($event, index, item)"
                    @visible-change="visibleChange($event, index, item)"
                    style="width: 100%"
                    class="item-cascader init-hide"
                  ></el-cascader>
                  <div
                    class="item-display item-show init-show"
                    style="background: #f8f8f9"
                  >
                    {{ categoryShowText[index] }}
                    <span class="delete change" @click="chanegCategory(index)"
                      >修改</span
                    >
                    <span class="delete" @click="reduceCategory(index)"
                      >删除</span
                    >
                  </div>
                </div>
                <div style="flex: 1">
                  <Row>
                    <i-col span="19" class="border-right"> </i-col>
                    <i-col span="5">
                      <i-input
                        :value="twoFixed(categoryTotal[index])"
                        readonly
                      ></i-input>
                    </i-col>
                  </Row>
                </div>
              </div>
              <!-- 选择细项----结束 -->

              <!-- 展示细项----开始 -->
              <div
                v-for="(_item, _index) in item.quotation"
                :key="_index"
                style="display: flex; overflow: hidden"
                class="borderBottom"
              >
                <div style="width: 200px" class="border-right">
                  <p class="flex-center" style="height: 56px">
                    {{ _item.name }}
                  </p>
                </div>
                <div style="flex: 1">
                  <Row>
                    <i-col span="3" class="border-right">
                      <i-input
                        v-model="_item.description"
                        placeholder="输入描述"
                      ></i-input>
                    </i-col>
                    <i-col span="3" class="border-right">
                      <el-select
                        v-model="_item.teamId"
                        placeholder="选择事业部"
                        style="width: 100%"
                        @change="
                          (id) => {
                            getUserList(id, _item);
                          }
                        "
                        filterable
                      >
                        <el-option
                          v-for="item in teamList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </i-col>
                    <i-col span="3" class="border-right">
                      <el-select
                        v-model="_item.principal"
                        placeholder="选择负责人"
                        style="width: 100%"
                        @change="
                          (name) => {
                            userChange(name, _item);
                          }
                        "
                        filterable
                      >
                        <el-option
                          v-for="item in _item.userList"
                          :key="item.id"
                          :label="item.englishName"
                          :value="item.englishName"
                        ></el-option>
                      </el-select>
                    </i-col>
                    <i-col span="3" class="border-right">
                      <i-input
                        :value="formatMoney(_item.price)"
                        placeholder="输入单价"
                        @input="moneyChange($event, index, _index)"
                      ></i-input>
                    </i-col>
                    <i-col span="2" class="border-right">
                      <InputNumber
                        v-model="_item.number"
                        :min="0"
                        placeholder="输入数量"
                      ></InputNumber>
                    </i-col>
                    <i-col span="3" class="border-right">
                      <i-input
                        :value="twoFixed(_item.price * _item.number)"
                        readonly
                      ></i-input>
                    </i-col>
                    <i-col span="2" class="border-right">
                      <InputNumber
                        v-model="_item.taxRate"
                        :min="0"
                        :formatter="(value) => `${value}%`"
                        :parser="(value) => value.replace('%', '')"
                        placeholder="输入税率"
                      ></InputNumber>
                    </i-col>
                    <i-col span="5">
                      <i-input
                        :value="
                          twoFixed(
                            _item.price *
                              _item.number *
                              (1 + _item.taxRate / 100)
                          )
                        "
                        readonly
                      ></i-input>
                    </i-col>
                  </Row>
                </div>
              </div>
              <!-- 展示细项----结束 -->
            </div>

            <div style="display: flex" class="borderBottom">
              <div class="border-right" style="width: 200px"></div>
              <div style="flex: 1">
                <Row>
                  <i-col span="14" class="border-right">
                    <Button type="text" class="addBtn" @click="addCategory">
                      <Icon type="plus-circled"></Icon>添加类别
                    </Button>
                  </i-col>
                  <i-col
                    span="5"
                    class="border-right"
                    style="background: #f1f3f5"
                  >
                    <p class="label">Project Total</p>
                    <p class="label">项目总价</p>
                  </i-col>
                  <i-col span="5">
                    <i-input
                      :value="twoFixed(noTaxtotal)"
                      placeholder="项目总价"
                      readonly
                    ></i-input>
                  </i-col>
                </Row>
              </div>
            </div>
            <!-- 总价---开始 -->
            <div style="display: flex">
              <div style="width: 200px"></div>
              <div style="flex: 1">
                <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10" class="borderBottom">
                    <i-col
                      span="12"
                      class="border-right"
                      style="background: #f1f3f5; position: relative"
                    >
                      <p class="label">VTA TAX</p>
                      <p class="label">增值税</p>
                    </i-col>
                    <i-col span="12">
                      <i-input
                        :value="twoFixed(total - noTaxtotal)"
                        placeholder="增值税"
                        readonly
                      ></i-input>
                    </i-col>
                  </i-col>
                </Row>
                <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10">
                    <i-col
                      span="12"
                      class="border-right"
                      style="background: #f1f3f5"
                    >
                      <p class="label">TOTAL</p>
                      <p class="label">含税总价</p>
                    </i-col>
                    <i-col span="12">
                      <i-input
                        :value="twoFixed(total)"
                        placeholder="未税总价"
                        readonly
                      ></i-input>
                    </i-col>
                  </i-col>
                </Row>
                <!-- <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10">
                    <i-col span="12" class="border-right" style="background:#f1f3f5">
                      <p class="label">ACTUAL TOTAL</p>
                      <p class="label">实际总价</p>
                    </i-col>
                    <i-col span="12">
                       <div v-show="totalState === 'show'" style="height:57px;line-height:57px;padding-left:24px" @click="changeTotalState">{{ twoFixed(actualTotal) }}</div>
                       <i-input v-show="totalState === 'edit'" ref="totalEdit" :value="formatMoney(actualTotal)"  placeholder="实际总价" @input="changeActualTotal" @on-blur="totalState = 'show'"></i-input>
                    </i-col>
                  </i-col>
                </Row> -->
              </div>
            </div>
            <!-- 总价---结束 -->
          </div>
        </div>
      </div>
    </i-form>
    <div style="text-align: center">
      <Button
        type="primary"
        class="submit-btn form-default-btn"
        size="large"
        @click.native="financeSubmit"
        >提交</Button
      >
    </div>
    <toast :msg="toastMsg" :is-toast="isToast"></toast>
  </div>
</template>
<script>
import Toast from "../../popup/Toast";
import { Task, Brand, User, Index, Hoshin } from "../../../API/api";
import { dateToYMD } from "../../../util/util.js";
import { OptList } from "../../../assets/conf/businessType.conf.js";
import { thousandSplit } from "../../../util/util.js";

export default {
  components: {
    Toast,
  },
  props: {
    formValue: {
      type: [Object, Array],
      default: function () {
        return {};
      },
    },
    projectInfo: {
      type: [Object, Array],
      default: function () {
        return {};
      },
    },
    isAdd: {
      type: [Boolean],
      default() {
        return true;
      },
    },
  },
  computed: {
    defaultTax() {
      return this.$route.query.tax;
    },
    /* 所选负责人所在事业部 */
    teamNameSelected() {
      let teamArr = [];
      this.formValue.quotationInfo[0].statement.itemsList.forEach(
        (element, index) => {
          teamArr.push([]);
          element.quotation.forEach((ele, ind) => {
            this.allUser.forEach((user) => {
              if (user.name == ele.principal)
                teamArr[index].push(user.teamName);
            });
          });
        }
      );
      return teamArr;
    },
    /* 单个类别总价 */
    categoryTotal() {
      let totalArr = [];
      this.formValue.quotationInfo[0].statement.itemsList.forEach(
        (element, index) => {
          totalArr[index] = element.quotation.length ? 0 : "";
          element.quotation.forEach((ele, ind) => {
            totalArr[index] += Number(
              (
                Number(ele.price) *
                Number(ele.number) *
                (1 + Number(ele.taxRate / 100))
              ).toFixed(2)
            );
          });
        }
      );
      return totalArr;
    },
    /* 单个手动添加的类别总价 */
    categoryManualTotal() {
      let totalArr = [];
      this.formValue.quotationInfo[0].statement.manuaItemList.forEach(
        (element, index) => {
          totalArr[index] = element.quotation.length ? 0 : "";
          element.quotation.forEach((ele, ind) => {
            totalArr[index] += Number(
              (Number(ele.price) * Number(ele.number)).toFixed(2)
            );
          });
        }
      );
      return totalArr;
    },
    /* 总价 */
    total() {
      let total = 0;
      this.formValue.quotationInfo[0].statement.itemsList.forEach(
        (element, index) => {
          element.quotation.forEach((ele, ind) => {
            total += Number(
              (
                Number(ele.price) *
                Number(ele.number) *
                (1 + Number(ele.taxRate) / 100)
              ).toFixed(2)
            );
          });
        }
      );
      return total;
    },
    /* 未税总价 */
    noTaxtotal() {
      let total = 0;
      this.formValue.quotationInfo[0].statement.itemsList.forEach(
        (element, index) => {
          element.quotation.forEach((ele, ind) => {
            total += Number(
              (Number(ele.price) * Number(ele.number)).toFixed(2)
            );
          });
        }
      );
      return total;
    },
    /* 监听对象 */
    relateId() {
      return this.formValue.quotationInfo[0].basicInfo.relateContractId;
    },
  },
  data() {
    return {
      canSubmit: true,
      toastMsg: "",
      isToast: false,
      relateContractList: [],
      thirdFreeDelete: null,
      relatePlaceholder: "",
      itemsProp: { multiple: true, expandTrigger: "hover" },
      actualTotal: !this.isAdd ? this.projectInfo.info.priceMeal : "0.00",
      teamList: [],
      // hasTax: this.isAdd ? true : (this.projectInfo.info.priceNoTax != this.projectInfo.info.priceTotal ? true : false),
      hasTax: false,
      financeValue: {
        projectId: this.$route.params.projectId,
        productId: this.$route.params.productId,
        toolkitId: this.$route.params.toolkitId,
        taskName: null,
        hetongId: null,
        baojiadanId: null,
        taskForm: [],
        operationInfo: [],
        priceMeal: null,
        priceNoTax: null,
      },
      customerPerson: [],
      projectPerson: [],
      quotaPerson: [],
      allUser: [],
      options: [],
      itemList: OptList,
      categoryShowText: [""],
      categoryManualShowText: [],
      totalState: "show",
      kaipiaoDate: !this.isAdd ? this.projectInfo.info.kaipiaoDate : "",
      kaipiaoDateList: [
        "2020Q1",
        "2020Q2",
        "2020Q3",
        "2020Q4",
        "2021Q1",
        "2021Q2",
        "2021Q3",
        "2021Q4",
        "2022Q1",
        "2022Q2",
        "2022Q3",
        "2022Q4",
      ],
    };
  },
  methods: {
    /* 编辑项目结算单页面初始化 */
    initEdit() {
      if (!this.isAdd) {
        this.options = [];
        this.categoryShowText = [];
        this.formValue.quotationInfo[0].statement.itemsList.forEach(
          (element) => {
            this.options.push(JSON.parse(JSON.stringify(this.itemList)));
            this.categoryShowText.push("");
          }
        );
        this.formValue.quotationInfo[0].statement.itemsList.forEach(
          (element, index) => {
            let activeVal = element.selectItem[0][0]; //当前选择的类别
            this.options[index].forEach((element) => {
              if (activeVal != element.value) {
                element.disabled = true;
              } else {
                this.categoryShowText[index] = element.label; //类别名称
              }
            });
          }
        );
      }
    },
    getUserList(id, _item) {
      _item.principal = "";
      const name = this.teamList.find((e) => e.id == id).name;

      _item.teamName = name;

      this.$http
        .post(Index.allUsers, this.qs.stringify({ teamName: name }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          _item.userList = res.data.retData.data;
        });
    },
    userChange(name, _item) {
      const userId = _item.userList.find((e) => e.name == name).id;
      _item.userId = userId;
    },
    getQuoItem() {
      //给类别添加权限
      this.$http
        .post(Task.baojiadanitemlist, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          const _data = res.data.retData.data;
          const newItem = [];
          this.itemList.forEach((e) => {
            let hasItem = false;
            _data.forEach((ele) => {
              if (ele.frontId == e.value) {
                hasItem = true;
              }
            });
            if (hasItem) {
              newItem.push(e);
            }
          });
          this.itemList = newItem;
          this.options = [JSON.parse(JSON.stringify(this.itemList))];
          this.initEdit();
        });
    },
    changeTotalState() {
      this.totalState = "edit";
      this.$nextTick(() => {
        this.$refs.totalEdit.focus();
      });
    },
    changeActualTotal(val) {
      const filterVal = val.replace(/[^\-?\d.]/g, ""); //只保留数字和
      const twoDigitsVal = Math.round(filterVal * 100) / 100; //保留两位小数
      this.actualTotal = twoDigitsVal;
    },
    formatMoney(m) {
      return isNaN(m) ? "" : thousandSplit(Math.round(m * 100) / 100 + "");
    },
    twoFixed(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    moneyChange(val, index, _index) {
      const filterVal = val.replace(/[^\-?\d.]/g, ""); //只保留数字和.
      const twoDigitsVal = Math.round(filterVal * 100) / 100; //保留两位小数
      this.formValue.quotationInfo[0].statement.itemsList[index].quotation[
        _index
      ].price = twoDigitsVal;
    },
    bankChange(val) {
      if (val == "招商银行股份有限公司上海延西支行")
        this.formValue.quotationInfo[0].basicInfo.bankID = "1219 1504 5310 301";
      else if (val == "招商银行宜山支行")
        this.formValue.quotationInfo[0].basicInfo.bankID = "1219 1504 5310 102";
    },
    /* 计算报价发送日期后14天的日期 */
    issueDate(val) {
      let date = new Date(val);
      let newDate = date.getTime() + 14 * 24 * 3600 * 1000;
      this.formValue.quotationInfo[0].basicInfo.validDate = dateToYMD(
        new Date(newDate)
      );
    },
    /* 获取关联合同 */
    getContract() {
      let formData = {
        projectId:
          this.$route.params.projectId ||
          this.projectInfo.projectInfo.projectId,
        toolkitId: 0,
      };
      this.$http
        .post(Task.contactlistnew, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.relateContractList = res.data.retData.data;
          if (this.$route.query.id) {
            this.formValue.quotationInfo[0].basicInfo.relateContractId = String(
              this.$route.query.id
            );
          }
        });
    },
    /* 获取客户负责人列表 */
    getCustomerPerson() {
      let formData = {
        id:
          this.$route.params.customerId ||
          this.projectInfo.projectInfo.customerId,
      };
      this.$http
        .post(Brand.detail, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.customerPerson = res.data.retData.contactsInfoNoaccess;
        });
    },
    /* 获取项目负责人列表 */
    getProjectPerson() {
      let formData = {
        projectId:
          this.$route.params.projectId ||
          this.projectInfo.projectInfo.projectId,
      };
      this.$http
        .post(Task.user, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.projectPerson = res.data.retData.ManagementData;
          this.quotaPerson = res.data.retData.data;
        });
    },
    /* 获取所有员工信息 */
    getAllUser() {
      this.$http
        .post(Index.allUsers, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.allUser = res.data.retData.data;
        });
    },
    /* 添加类别 */
    addCategory() {
      let addOpt = JSON.parse(JSON.stringify(this.itemList));
      this.formValue.quotationInfo[0].statement.itemsList.push({
        selectItem: [],
        quotation: [],
      });
      this.options.push(addOpt);
      this.categoryShowText.push("");
    },
    manuaAddCategory() {
      this.formValue.quotationInfo[0].statement.manuaItemList.push({
        inputItem: "",
        quotation: [],
      });
      this.categoryManualShowText.push("请输入类别");
    },
    deleteManualCagetory(index) {
      this.formValue.quotationInfo[0].statement.manuaItemList.splice(index, 1);
      this.categoryManualShowText.push("请输入类别");
    },
    /* 删除类别 */
    reduceCategory(index) {
      let reduceOpt = JSON.parse(JSON.stringify(this.itemList));
      this.formValue.quotationInfo[0].statement.itemsList.splice(index, 1);
      this.options.splice(index, 1);
      this.categoryShowText.splice(index, 1);
    },
    reduceMunalCategory(index) {
      this.formValue.quotationInfo[0].statement.manuaItemList.splice(index, 1);
      this.categoryManualShowText.splice(index, 1);
    },
    /* 修改类别 */
    chanegCategory(index) {
      let itemCascsder = document.getElementsByClassName("item-cascader")[
        index
      ];
      let itemDiv = document.getElementsByClassName("item-display")[index];
      itemCascsder.style.display = "block";
      itemDiv.style.display = "none";
    },
    chanegManulCategory(index) {
      let manulItem = document.getElementsByClassName("manul-item-input")[
        index
      ];
      let manulDiv = document.getElementsByClassName("manul-item-show")[index];
      manulItem.style.display = "block";
      manulDiv.style.display = "none";
    },
    addItem(index) {
      this.formValue.quotationInfo[0].statement.manuaItemList[
        index
      ].quotation.push({
        name: "",
        description: "",
        principal: "",
        userId: "",
        userList: [],
        teamId: "",
        teamName: "",
        price: 0,
        number: 1,
        taxRate: this.defaultTax,
      });
    },
    deleteItem(index, _index) {
      this.formValue.quotationInfo[0].statement.manuaItemList[
        index
      ].quotation.splice(_index, 1);
    },
    /* 类别下拉框收起显示自定义类别样式 */
    visibleChange(event, index, item) {
      if (!event) {
        let itemCascsder = document.getElementsByClassName("item-cascader")[
          index
        ];
        let itemDiv = document.getElementsByClassName("item-show")[index];
        itemCascsder.style.display = "none";
        itemDiv.style.display = "block";
      }
    },
    manulBlur(index, item) {
      this.categoryManualShowText[index] = item.inputItem;
      let manulItemInput = document.getElementsByClassName("manul-item-input")[
        index
      ];
      let manulItemShow = document.getElementsByClassName("manul-item-show")[
        index
      ];
      manulItemInput.style.display = "none";
      manulItemShow.style.display = "block";
    },
    itemBlur(index, _index) {
      let itemInputChange = document.getElementById(
        String(index) + String(_index)
      );
      let manulItemDisplay = document.getElementById(
        "manul" + String(index) + String(_index)
      );
      itemInputChange.style.display = "none";
      manulItemDisplay.style.display = "block";
    },
    chanegManulItem(index, _index) {
      let itemInputChange = document.getElementById(
        String(index) + String(_index)
      );
      let manulItemDisplay = document.getElementById(
        "manul" + String(index) + String(_index)
      );
      itemInputChange.style.display = "block";
      manulItemDisplay.style.display = "none";
    },
    /* 改变细项回调 */
    cascaderChange(list, index, item) {
      console.log(list);
      console.log(index);
      console.log(item);

      if (list.length == 0) {
        let cascaderOpt = JSON.parse(JSON.stringify(this.itemList));
        this.options[index] = cascaderOpt; //清除禁用选项
        item.selectItem = [];
        item.quotation = [];
        this.categoryShowText[index] = "";
      } else {
        let activeVal = list[0][0]; //当前选择的类别
        this.options[index].forEach((element) => {
          if (activeVal != element.value) {
            element.disabled = true;
          } else {
            this.categoryShowText[index] = element.label; //类别名称
          }
        });
        if (list.length > item.selectItem.length) {
          //添加细项
          let itemName = "";
          let itemArr = [];
          let listArr = [];
          let addIndex = 0;
          item.selectItem.forEach((ele, ind) => {
            itemArr.push(ele[1]);
          });
          list.forEach((ele, ind) => {
            listArr.push(ele[1]);
          });
          listArr.forEach((ele, ind) => {
            if (itemArr.indexOf(ele) == -1) {
              addIndex = listArr.indexOf(ele); //获取当前添加细项的索引
              this.options[index].forEach((ele_opt) => {
                ele_opt.children.forEach((ele_opt_item) => {
                  if (ele_opt_item.value == ele) {
                    itemName = ele_opt_item.label;
                  }
                });
              });
            }
          });
          item.selectItem = list;
          this.formValue.quotationInfo[0].statement.itemsList[
            index
          ].quotation.splice(addIndex, 0, {
            name: itemName,
            description: "",
            principal: "",
            userId: "",
            userList: [],
            teamId: "",
            teamName: "",
            price: 0,
            number: 1,
            taxRate: this.defaultTax,
          });
        } else if (list.length < item.selectItem.length) {
          //减少细项
          let itemArr = [];
          let listArr = [];
          item.selectItem.forEach((ele, ind) => {
            itemArr.push(ele[1]);
          });
          list.forEach((ele, ind) => {
            listArr.push(ele[1]);
          });
          itemArr.forEach((ele, ind) => {
            if (listArr.indexOf(ele) == -1) {
              item.quotation.splice(ind, 1);
            }
          });
          item.selectItem = list;
        } else {
          item.selectItem = [];
          item.quotation = [];
        }
      }
    },
    financeSubmit() {
      if (!this.formValue.quotationInfo[0].basicInfo.relateContractId) {
        this.isToast = true;
        this.toastMsg = "请选择关联合同";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      if (!this.formValue.quotationInfo[0].basicInfo.quoName) {
        this.isToast = true;
        this.toastMsg = "请输入项目结算单名称";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      if (!this.kaipiaoDate) {
        this.isToast = true;
        this.toastMsg = "请选择所属年季";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      if (!this.formValue.quotationInfo[0].basicInfo.clientOwner) {
        this.isToast = true;
        this.toastMsg = "请选择客户负责人";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      if (!this.formValue.quotationInfo[0].basicInfo.projectOwner) {
        this.isToast = true;
        this.toastMsg = "请选择项目负责人";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      if (!this.formValue.quotationInfo[0].basicInfo.issueDate) {
        this.isToast = true;
        this.toastMsg = "请设置报价发送日期";
        this.canSubmit = false;
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
          this.canSubmit = true;
        }, 1500);
      }
      try {
        this.formValue.quotationInfo[0].statement.itemsList.forEach(
          (element, index) => {
            if (!element.quotation.length) {
              this.isToast = true;
              this.toastMsg = "请选择细项";
              this.canSubmit = false;
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = "";
                this.canSubmit = true;
              }, 1500);
              throw new Error("选择负责人");
            } else {
              element.quotation.forEach((ele, ind) => {
                if (!ele.teamId) {
                  this.isToast = true;
                  this.toastMsg = "请选择事业部";
                  this.canSubmit = false;
                  setTimeout(() => {
                    this.isToast = false;
                    this.toastMsg = "";
                    this.canSubmit = true;
                  }, 1500);
                  throw new Error("选择事业部");
                }
                if (!ele.principal) {
                  this.isToast = true;
                  this.toastMsg = "请选择细项负责人";
                  this.canSubmit = false;
                  setTimeout(() => {
                    this.isToast = false;
                    this.toastMsg = "";
                    this.canSubmit = true;
                  }, 1500);
                  throw new Error("选择负责人");
                }
                if (!ele.price) {
                  this.isToast = true;
                  this.toastMsg = "请选择细项单价";
                  this.canSubmit = false;
                  setTimeout(() => {
                    this.isToast = false;
                    this.toastMsg = "";
                    this.canSubmit = true;
                  }, 1500);
                  throw new Error("选择单价");
                }
              });
            }
          }
        );
      } catch (err) {}

      if (this.canSubmit) {
        this.financeValue.priceNoTax = this.noTaxtotal; //税前金额
        this.financeValue.priceTotal = this.total; //税后金额
        this.financeValue.priceMeal = String(this.actualTotal).replace(
          /[^\-?\d.]/g,
          ""
        ); //实际总金额
        this.financeValue.hetongId = this.formValue.quotationInfo[0].basicInfo.relateContractId;
        this.financeValue.taskForm = JSON.parse(JSON.stringify(this.formValue));
        this.financeValue.taskForm.quotationInfo[0].basicInfo.projectName = this.projectInfo.projectInfo.projectName;
        this.financeValue.taskForm.quotationInfo[0].basicInfo.projectID = this.projectInfo.projectInfo.projectCode;
        this.financeValue.taskForm.quotationInfo[0].basicInfo.clientName = this.projectInfo.projectInfo.customerName;
        this.financeValue.taskForm.quotationInfo[0].basicInfo.clientID = this.projectInfo.projectInfo.customerCode;
        this.financeValue.taskName = this.formValue.quotationInfo[0].basicInfo.quoName;
        this.financeValue.kaipiaoDate = this.kaipiaoDate;
        let post = this.isAdd ? Task.add : Task.edit;
        let formData = JSON.parse(JSON.stringify(this.financeValue));
        formData.taskId = this.$route.params.taskId;
        delete formData.productId;
        delete formData.projectId;
        delete formData.toolkitId;
        this.formValue.quotationInfo[0].statement.itemsList = this.formValue.quotationInfo[0].statement.itemsList.filter(
          (n) => n.selectItem.length
        );
        this.financeValue.taskForm.quotationInfo[0].statement = JSON.stringify(
          this.formValue.quotationInfo[0].statement
        );
        formData.taskForm.quotationInfo[0].statement = JSON.stringify(
          this.formValue.quotationInfo[0].statement
        );
        this.$http
          .post(
            post,
            this.qs.stringify(this.isAdd ? this.financeValue : formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") },
            }
          )
          .then((res) => {
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
              this.$emit("changeIsSaved");
            }
            setTimeout(() => {
              this.isToast = false;
              this.canSubmit = true;
              if (_data.retCode === 0) {
                this.$store.dispatch("setExtraData", []);
                this.$router.push({
                  path: `/tasks/list/${this.projectInfo.projectInfo.customerId}/${this.projectInfo.projectInfo.projectId}`,
                  query: {
                    toolkitId: 7,
                    finance: 1,
                  },
                });
              }
            }, 1500);
          });
      }
    },
    getTeamName() {
      if (this.isAdd) {
        this.$http
          .post(User.myInfo, this.qs.stringify(), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          })
          .then((res) => {
            this.formValue.quotationInfo[0].basicInfo.costCenter =
              res.data.retData.teamName;
          });
      } else {
      }
    },
    getTeamList() {
      this.$http
        .post(Hoshin.list, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.teamList = res.data.retData.data;
        });
    },
  },
  created() {
    this.getQuoItem();
    // this.initEdit();
    this.getContract();
    this.getCustomerPerson();
    this.getProjectPerson();
    this.getTeamList();
    this.getTeamName();
    this.getAllUser();
  },
  mounted() {
    //编辑页面展示
    let initHide = document.getElementsByClassName("init-hide");
    let initShow = document.getElementsByClassName("init-show");
    for (let i = 0; i < initHide.length; i++) {
      initHide[i].style.display = "none";
    }
    for (let j = 0; j < initShow.length; j++) {
      initShow[j].style.display = "block";
    }
  },
  watch: {
    total: {
      handler(val) {
        this.actualTotal = this.hasTax
          ? (Number(val) + Number(val) * 0.06).toFixed(2)
          : Number(val).toFixed(2);
      },
    },
    hasTax: {
      handler(val) {
        this.actualTotal = val
          ? (Number(this.total) + Number(this.total) * 0.06).toFixed(2)
          : Number(this.total).toFixed(2);
      },
    },
    relateId: {
      handler(val) {
        this.relateContractList.forEach((ele) => {
          if (ele.hetongId == val) {
            if (ele.toolkitId == 16) {
              this.relatePlaceholder = "客户_项目名称_金额_版本";
            } else {
              this.relatePlaceholder = "供应商_项目名称_金额_版本";
            }
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  height: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.label {
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  color: #868e96;
}
p {
  text-align: center;
}
.border-radius {
  border: 1px solid #ced4da;
  border-radius: 3px;
}
.border-right {
  border-right: 1px solid #ced4da;
  height: 57px;
}
.borderRight {
  border-right: 1px solid #ced4da;
}

.border-bottom {
  border-bottom: 1px solid #ced4da;
}
.borderBottom {
  border-bottom: 1px solid #ced4da;
}
.border-top {
  border-top: 1px solid #ced4da;
}

.instruction,
.instruction-title,
.instrcution-content,
.instrcution-content-right-count,
.instrcution-content-right-select,
.add {
  display: flex;
  font-size: 14px;
}
.instruction-left {
  width: 200px;
}
.instruction-right,
.instrcution-content-right,
.instruction-title-quo,
.instrcution-content-right-count-data,
.instrcution-content-right-select-right {
  flex: 1;
}

.instruction-title-project,
.instrcution-content-left {
  width: 150px;
}
.instruction-title-item,
.instrcution-content-right-select-item,
.instrcution-content-right-count-name,
.add-name {
  width: 200px;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-color {
  background-color: #f1f3f5;
}
.last-child {
  border-bottom: 1px solid #ced4da;
}
.en-title {
  text-align: center;
  font-size: 14px;
  color: #868e96;
}
.zh-title {
  text-align: center;
  font-size: 16px;
  color: #1f2027;
}
.radio-height {
  height: 30px;
  line-height: 30px;
}
.add-item {
  line-height: 56px;
  color: #2d8ef8;
  font-size: 14px;
  span {
    cursor: pointer;
  }
}
.third-name {
  border-right: 1px solid #ced4da;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  p {
    color: #495057;
    font-size: 14px;
    padding: 20px;
  }
}
.third-total {
  div {
    border-bottom: 1px solid #ced4da;
    height: 58px;
    background: #f1f3f5;
    &:last-child {
      border-bottom: none;
    }
  }
}
.disabled {
  pointer-events: none;
}
.item-display {
  height: 56px;
  position: relative;
  line-height: 56px;
  text-align: center;
  font-size: 14px;
  display: none;
  .delete {
    position: absolute;
    height: 25px;
    line-height: 25px;
    top: 29px;
    right: 0px;
    background-color: rgb(255, 102, 102);
    border: 1px solid rgb(255, 102, 102);
    border-radius: 3px;
    color: white;
    font-size: 13px;
    display: none;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
  }
  .change {
    top: 3px;
    background: #19be6b;
    border: 1px solid #19be6b;
  }
}
.manul-display,
.manul-item-display {
  position: relative;
  .delete {
    position: absolute;
    height: 25px;
    line-height: 25px;
    top: 29px;
    right: 0px;
    background-color: rgb(255, 102, 102);
    border: 1px solid rgb(255, 102, 102);
    border-radius: 3px;
    color: white;
    font-size: 13px;
    display: none;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
  }
  .change {
    top: 3px;
    background: #19be6b;
    border: 1px solid #19be6b;
  }
}
.item-display:hover {
  .delete {
    display: inline-block;
  }
}
.manul-display:hover {
  .delete {
    display: inline-block;
  }
}
.manul-item-display:hover {
  .delete {
    display: inline-block;
  }
}
.addBtn {
  width: 100%;
  height: 56px;
  color: #2d8ef8;
  font-size: 15px;
}
.reduceBtn {
  width: 100%;
  height: 56px;
  color: rgb(255, 102, 102);
  font-size: 15px;
}
.quotation-require {
  color: #ed3f14;
  vertical-align: middle;
}
.rate-checkbox {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<style lang="less">
.quotation-cost-center .ivu-select-selected-value {
  font-size: 14px !important;
}

.quote {
  .banking {
    .ivu-select-selected-value {
      font-size: 14px;
    }
    .ivu-select-placeholder {
      font-size: 14px;
    }
  }
}
</style>



