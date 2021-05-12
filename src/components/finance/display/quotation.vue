<!--项目结算单-展示-->
<template>
  <div class="quote financeToolkit">
    <i-form label-position="left" :label-width="120" class="default-form">
      <!-- 基本信息 -->
      <div class="quotation-form-group">
        <div class="title" style="background:white">
          <p class="en-title">ADVERTISING SOW & QUOTATION</p>
          <p class="zh-title">工作说明及项目结算单</p>
        </div>
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Quotation Name</div>
                  <div class="label">项目结算单名称</div>
                </span>
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.quoName"
                  placeholder="客户_项目名称_编号_金额_版本"
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
                  <div class="label">Belonging Date</div>
                  <div class="label">所属年季</div>
                </span>
                <i-input
                  v-model="formValue.info.kaipiaoDate"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="16" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">ID</div>
                  <div class="label">编号</div>
                </span>
                <i-input
                  v-model="formValue.info.taskCode"
                  placeholder="自动填充"
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
                  <div class="label">Banking</div>
                  <div class="label">银行</div>
                </span>
                <i-input
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.bank"
                  placeholder="请输入开户银行及支行"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client Name</div>
                  <div class="label">客户姓名</div>
                </span>
                <i-input v-model="projectInfo.customerName" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client ID</div>
                  <div class="label">客户编号</div>
                </span>
                <i-input v-model="projectInfo.customerCode" readonly></i-input>
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.bankAccount"
                  placeholder="请输入银行账户"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project Name</div>
                  <div class="label">项目名称</div>
                </span>
                <i-input v-model="projectInfo.projectName" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Client Owner</div>
                  <div class="label">客户负责人</div>
                </span>
                <Select
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.clientOwner"
                  style="width:100%"
                  filterable
                  placeholder="请选择客户负责人"
                  disabled
                >
                  <Option
                    v-for="(item, index) in customerPerson"
                    :key="index"
                    :value="item.name"
                  >{{item.name}}</Option>
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.bankID"
                  placeholder="请输入银行卡号"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project ID</div>
                  <div class="label">项目编号</div>
                </span>
                <i-input v-model="projectInfo.projectCode" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Project Owner</div>
                  <div class="label">项目负责人</div>
                </span>
                <Select
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.projectOwner"
                  style="width:100%"
                  filterable
                  placeholder="请选择项目负责人"
                  disabled
                >
                  <Option
                    v-for="(item, index) in projectPerson"
                    :key="index"
                    :value="item.userName"
                  >{{item.userName}}</Option>
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.contactPerson"
                  placeholder="请输入财务联系人"
                  readonly
                ></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Issue Date</div>
                  <div class="label">发送日期</div>
                </span>
                <DatePicker
                  transfer
                  class="deadline"
                  placeholder="设置发送日期"
                  format="yyyy-MM-dd"
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.issueDate"
                  @on-change="issueDate"
                  :clearable="false"
                  readonly
                ></DatePicker>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem class="default-form-item">
                <span slot="label">
                  <div class="label">Cost Center</div>
                  <div class="label">成本中心</div>
                </span>
                <i-input
                  :value="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.costCenter"
                  readonly
                ></i-input>
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.contactInfo"
                  placeholder="请输入联系方式"
                  readonly
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.validDate"
                  :clearable="false"
                  readonly
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
                  v-model="formValue.formInfo[activeVer].formContent.quotationInfo[0].basicInfo.cueemcy"
                  placeholder="请选择币种"
                  style="width:100%;font-size:14px"
                  disabled
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
        <div>
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
        <div>
          <div class="instruction-title" style="background:rgb(241, 243, 245)">
            <div class="border-right instruction-title-item">
              <p class="label">Items</p>
              <p class="label">细项</p>
            </div>
            <div class="instruction-title-quo">
              <Row>
                <i-col span="3" class="border-right">
                  <p class="label">Description</p>
                  <p class="label">描述</p>
                </i-col>
                 <i-col span="3" class="border-right">
                  <p class="label">NHU</p>
                  <p class="label">事业部</p>
                </i-col>
                <i-col span="3" class="border-right">
                  <p class="label">Principal</p>
                  <p class="label">负责人</p>
                </i-col>
               
                <i-col span="3" class="border-right">
                  <p class="label">Price</p>
                  <p class="label">单价</p>
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
                      <Icon type="information-circled" size="15" style="color:#f66"></Icon>
                    </Tooltip>
                  </p>
                </i-col>
                <i-col span="2" class="border-right">
                  <p class="label">TaxRate</p>
                  <p class="label">税率</p>
                </i-col>
                <i-col span="5" class="border-right">
                  <p class="label">Total</p>
                  <p class="label">
                    含税总价
                  </p>
                </i-col>
              </Row>
            </div>
          </div>
        </div>
        <!-- 工作说明书及报价--content -->
        <div class="instrcution-content no-label-input">
          <!-- 项目名称 -->
          <div class="instrcution-content-right">
            <!-- 自动添加 -->
            <div v-for="(item, index) in statement.itemsList" :key="index">
              <!-- 选择细项----开始 -->
              <div style="display:flex;overflow:hidden" class="borderBottom">
                <div style="width:200px; background:#f8f8f9" class="border-right flex-center">
                  <p>{{categoryNameList[index]}}</p>
                </div>
                <div style="flex:1">
                  <Row>
                    <i-col span="19" class="border-right"></i-col>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(categoryTotal[index])"
                      placement="bottom"
                      :open-delay="500"
                    >
                      <i-col span="5" style="height:56px" class="flex-center">
                        <p class="over-hidden">{{twoFixed(categoryTotal[index])}}</p>
                      </i-col>
                    </el-tooltip>
                  </Row>
                </div>
              </div>
              <!-- 选择细项----结束 -->

              <!-- 展示细项----开始 -->
              <div
                v-for="(_item, _index) in item.quotation"
                :key="_index"
                style="display:flex;overflow:hidden"
                class="borderBottom"
              >
                <div style="width:200px" class="border-right">
                  <p class="flex-center" style="height:56px">{{_item.name}}</p>
                </div>
                <div style="flex:1">
                  <Row>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="_item.description ? _item.description : '暂无描述'"
                      placement="bottom"
                      :open-delay='500'
                    >
                      <i-col span="3" class="border-right flex-center font-14">
                        <p class="over-hidden">{{_item.description}}</p>
                      </i-col>
                    </el-tooltip>

                    
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="_item.teamName ?  _item.teamName : teamNameSelected[index][_index]"
                      placement="bottom"
                      :open-delay='500'
                    >
                      <i-col span="3" class="border-right flex-center font-14">
                        <p class="over-hidden">{{_item.teamName ?  _item.teamName : teamNameSelected[index][_index]}}</p>
                      </i-col>
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="_item.principal"
                      placement="bottom"
                      :open-delay='500'

                    >
                      <i-col span="3" class="border-right flex-center font-14">
                        <p class="over-hidden">{{_item.principal}}</p>
                      </i-col>
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(_item.price)"
                      placement="bottom"
                      :open-delay='500'
                    >
                      <i-col span="3" class="border-right flex-center font-14">
                        <p class="over-hidden">{{twoFixed(_item.price)}}</p>
                      </i-col>
                    </el-tooltip>
                    <i-col span="2" class="border-right flex-center font-14">
                      <p class="over-hidden">{{_item.number}}</p>
                    </i-col>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(_item.price * _item.number)"
                      placement="bottom"
                      :open-delay='500'
                    >
                      <i-col span="3" class="border-right flex-center font-14">
                        <p class="over-hidden">{{twoFixed(_item.price * _item.number)}}</p>
                      </i-col>
                    </el-tooltip>
                    <i-col span="2" class="border-right flex-center font-14">
                      <p class="over-hidden">{{_item.taxRate}}%</p>
                    </i-col>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(_item.price * _item.number * ( 1 + (_item.taxRate/100)))"
                      placement="bottom"
                      :open-delay='500'
                    >
                      <i-col span="5" class="flex-center font-14" style="height:56px">
                        <p class="over-hidden">{{twoFixed(_item.price * _item.number * ( 1 + (_item.taxRate/100)))}}</p>
                      </i-col>
                    </el-tooltip>
                  </Row>
                </div>
              </div>
              <!-- 展示细项----结束 -->
            </div>

            <!-- 手动添加 -->
            <div v-for="(item, index) in statement.manuaItemList" :key="index + 'manul'">
              <div style="display:flex;overflow:hidden" class="borderBottom">
                <div style="width:200px; background:#f8f8f9" class="border-right flex-center">
                  <p>{{item.inputItem}}</p>
                </div>
                <div style="flex:1">
                  <Row>
                    <i-col span="6" class="border-right">
                      <i-input value readonly></i-input>
                    </i-col>
                    <i-col span="6" class="border-right">
                      <i-input value readonly></i-input>
                    </i-col>
                    <i-col span="4" class="border-right">
                      <i-input value readonly></i-input>
                    </i-col>
                    <i-col span="4" class="border-right">
                      <i-input value readonly></i-input>
                    </i-col>
                    <i-col span="4" class="flex-center" style="height:56px">
                      <p>{{Number(categoryManualTotal[index]).toFixed(2)}}</p>
                    </i-col>
                  </Row>
                </div>
              </div>
              <div
                v-for="(_item, _index) in item.quotation"
                :key="_index"
                style="display:flex;overflow:hidden"
                class="borderBottom"
              >
                <div style="width:200px" class="border-right flex-center">
                  <p>{{_item.name}}</p>
                </div>
                <div style="flex:1">
                  <Row>
                    <i-col span="6" class="border-right flex-center">
                      <p>{{_item.description}}</p>
                    </i-col>
                    <i-col span="6" class="border-right flex-center">
                      <p>{{_item.principal}}</p>
                    </i-col>
                    <i-col span="4" class="border-right flex-center">
                      <p>{{_item.price}}</p>
                    </i-col>
                    <i-col span="4" class="border-right flex-center">
                      <p>{{_item.number}}</p>
                    </i-col>
                    <i-col span="4" class="flex-center" style="height:56px">
                      <p>{{(_item.price * _item.number).toFixed(2)}}</p>
                    </i-col>
                  </Row>
                </div>
              </div>
            </div>
            <div style="display:flex" class="borderBottom">
              <div class="border-right" style="width:200px"></div>
              <div style="flex:1">
                <Row>
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="5" class="border-right" style="background:#f1f3f5">
                    <p class="label">Project Total</p>
                    <p class="label">项目总价</p>
                  </i-col>
                  <el-tooltip class="item" effect="light" :content="twoFixed(formValue.info.priceNoTax)" placement="bottom" :open-delay="500">
                    <i-col span="5" class="flex-center" style="height:56px">
                      <p class="over-hidden">{{twoFixed(formValue.info.priceNoTax)}}</p>
                    </i-col>
                  </el-tooltip>
                </Row>
              </div>
            </div>
            <div style="display:flex">
              <div style="width:200px"></div>
              <div style="flex:1">
                <!-- <Row type="flex" v-if="formValue.info.priceNoTax != formValue.info.priceTotal">
                  <i-col span="12" class="border-right"></i-col>
                  <i-col span="12" class="borderBottom">
                    <Row>
                      <i-col span="16" class="border-right" style="background:#f1f3f5">
                        <p class="label">VTA TAX</p>
                        <p class="label">增值税（6%）</p>
                      </i-col>
                      <el-tooltip
                        class="item"
                        effect="light"
                        :content="twoFixed(total * 0.06)"
                        placement="bottom"
                        :open-delay="500"
                      >
                        <i-col span="8" class="flex-center" style="height:56px">
                          <p class="over-hidden">{{twoFixed(total * 0.06)}}</p>
                        </i-col>
                      </el-tooltip>
                    </Row>
                  </i-col>
                </Row> -->
                <!-- <Row type="flex">
                  <i-col span="12" class="border-right"></i-col>
                  <i-col span="12" class="borderBottom">
                    <i-col span="16" class="border-right" style="background:#f1f3f5">
                      <p class="label">TOTAL</p>
                      <p class="label">总价</p>
                    </i-col>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(formValue.info.priceTotal)"
                      placement="bottom"
                      :open-delay="500"
                    >
                      <i-col span="8" class="flex-center" style="height:56px">
                        <p class="over-hidden">{{twoFixed(formValue.info.priceTotal)}}</p>
                      </i-col>
                    </el-tooltip>
                  </i-col>
                </Row> -->
                <!-- <Row type="flex">
                  <i-col span="12" class="border-right"></i-col>
                  <i-col span="12">
                    <i-col span="16" class="border-right" style="background:#f1f3f5">
                      <p class="label">ACTUAL TOTAL</p>
                      <p class="label">实际总价</p>
                    </i-col>
                    <el-tooltip
                      class="item"
                      effect="light"
                      :content="twoFixed(formValue.info.priceMeal)"
                      placement="bottom"
                      :open-delay="500"
                    >
                      <i-col span="8" class="flex-center" style="height:56px">
                        <p class="over-hidden">{{twoFixed(formValue.info.priceMeal)}}</p>
                      </i-col>
                    </el-tooltip>
                  </i-col>
                </Row> -->
                <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10" class="borderBottom">
                    <i-col span="12" class="border-right" style="background:#f1f3f5;position:relative">
                      <p class="label">VTA TAX</p>
                      <p class="label">增值税</p>
                    </i-col>
                    <el-tooltip class="item" effect="light" :content="twoFixed(total - noTaxtotal)" placement="bottom" :open-delay="500">
                    <i-col span="12" class="flex-center" style="height:56px">
                      <p class="over-hidden">{{twoFixed(total - noTaxtotal)}}</p>
                    </i-col>
                  </el-tooltip>
                  </i-col>
                </Row>
                <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10" class="borderBottom">
                    <i-col span="12" class="border-right" style="background:#f1f3f5">
                      <p class="label"> TOTAL</p>
                      <p class="label">含税总价</p>
                    </i-col>
                    <el-tooltip class="item" effect="light" :content="twoFixed(total)" placement="bottom" :open-delay="500">
                    <i-col span="12" class="flex-center" style="height:56px">
                      <p class="over-hidden">{{twoFixed(total)}}</p>
                    </i-col>
                  </el-tooltip>
                  </i-col>
                </Row>
                <!-- <Row type="flex">
                  <i-col span="14" class="border-right"></i-col>
                  <i-col span="10" class="borderBottom">
                    <i-col span="12" class="border-right" style="background:#f1f3f5">
                      <p class="label">ACTUAL TOTAL</p>
                      <p class="label">实际总价</p>
                    </i-col>
                      <el-tooltip class="item" effect="light" :content="twoFixed(formValue.info.priceMeal)" placement="bottom" :open-delay="500">
                    <i-col span="12" class="flex-center" style="height:56px">
                      <p class="over-hidden">{{twoFixed(formValue.info.priceMeal)}}</p>
                    </i-col>
                  </el-tooltip>
                  </i-col>
                </Row> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </i-form>
    <div style="text-align:center">
      <Button
        v-if="formValue.roleInfo.eidt == 'show' && canEdit == 'show'"
        type="primary"
        class="submit-btn form-default-btn"
        size="large"
        @click="edit"
      >编辑</Button>
    </div>
  </div>
</template>
<script>
import Toast from "../../popup/Toast";
import { Task, Brand, Index } from "../../../API/api";
import { dateToYMD } from "../../../util/util.js";
import { OptList } from "../../../assets/conf/businessType.conf.js"
import { thousandSplit } from "../../../util/util.js"

export default {
  components: {
    Toast
  },
  props: {
    activeVer: {
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
    }
  },
  computed: {
    /* 所选负责人所在事业部 */
    teamNameSelected() {
      let teamArr = [];
      this.statement.itemsList.forEach((element, index) => {
        teamArr.push([]);
        element.quotation.forEach((ele, ind) => {
          this.allUser.forEach(user => {
            if (user.name == ele.principal) teamArr[index].push(user.teamName);
          });
        });
      });
      return teamArr;
    },
    categoryNameList() {
      let nameArr = [];
      this.statement.itemsList.forEach(element => {
        this.options[0].forEach(ele => {
          if (ele.value == element.selectItem[0][0]) {
            nameArr.push(ele.label);
          }
        });
      });
      return nameArr;
    },
    statement() {
      return JSON.parse(
        this.formValue.formInfo[this.activeVer].formContent.quotationInfo[0]
          .statement
      );
    },
    teamName() {
      return JSON.parse(localStorage.getItem("userInfo")).teamName;
    },
    /* 单个类别总价 */
    categoryTotal() {
      let totalArr = [];
      this.statement.itemsList.forEach((element, index) => {
        totalArr[index] = element.quotation.length ? 0 : "";
        element.quotation.forEach((ele, ind) => {
          totalArr[index] += Number(
            (Number(ele.price) * Number(ele.number) * ( 1 + Number(ele.taxRate/100))).toFixed(2)
          );
        });
      });
      return totalArr;
    },
    /* 单个手动添加的类别总价 */
    categoryManualTotal() {
      let totalArr = [];
      this.statement.manuaItemList.forEach((element, index) => {
        totalArr[index] = element.quotation.length ? 0 : "";
        element.quotation.forEach((ele, ind) => {
          totalArr[index] += Number(
            (Number(ele.price) * Number(ele.number)).toFixed(2)
          );
        });
      });
      return totalArr;
    },
     /* 总价 */
    total() {
      let total = 0;
      this.statement.itemsList.forEach(
        (element, index) => {
          element.quotation.forEach((ele, ind) => {
            total += Number(
              (Number(ele.price) * Number(ele.number) * (1 + (Number(ele.taxRate)/100))).toFixed(2)
            );
          });
        }
      );
      return total;
    },
    /* 未税总价 */
    noTaxtotal() {
      let total = 0;
      this.statement.itemsList.forEach(
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
  },
  data() {
    return {
      toastMsg: "",
      isToast: false,
      relateContractList: [],
      thirdFreeDelete: null,
      itemsProp: { multiple: true },
      // actualTotal: !this.isAdd ? this.projectInfo.info.priceMeal : "0.00",
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
        priceNoTax: null
      },
      customerPerson: [],
      projectPerson: [],
      quotaPerson: [],
      allUser: [],
      options: [JSON.parse(JSON.stringify(OptList))],
      categoryShowText: [""],
      categoryManualShowText: [],
      canEdit: 'hide'
    };
  },
  methods: {
    twoFixed(v) {
      let m = parseFloat(v)
      return isNaN(m) ? '' : thousandSplit(m.toFixed(2) + '');
    },
    edit() {
      this.$router.push({
        path: "/tasks/edit/" + this.formValue.info.id + '/' + this.projectInfo.customerId + '/' + this.projectInfo.projectId,
        query: {
          tax: this.$route.query.tax,
        }
      });
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
        projectId: this.$route.params.projectId,
        toolkitId: 0
      };
      this.$http
        .post(Task.contactlistnew, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
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
        id: this.projectInfo.customerId
      };
      this.$http
        .post(Brand.detail, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.customerPerson = res.data.retData.contactsInfo;
        });
    },
    /* 获取项目负责人列表 */
    getProjectPerson() {
      let formData = {
        projectId: this.projectInfo.projectId
      };
      this.$http
        .post(Task.user, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.projectPerson = res.data.retData.ManagementData;
          this.quotaPerson = res.data.retData.data;
        });
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
    /* 添加类别 */
    addCategory() {
      let addOpt = JSON.parse(JSON.stringify(OptList));
      this.formValue.quotationInfo[0].statement.itemsList.push({
        selectItem: [],
        quotation: []
      });
      this.options.push(addOpt);
      this.categoryShowText.push("");
    },
    manuaAddCategory() {
      this.formValue.quotationInfo[0].statement.manuaItemList.push({
        inputItem: "",
        quotation: []
      });
      this.categoryManualShowText.push("请输入类别");
    },
    deleteManualCagetory(index) {
      this.formValue.quotationInfo[0].statement.manuaItemList.splice(index, 1);
      this.categoryManualShowText.push("请输入类别");
    },
    /* 删除类别 */
    reduceCategory(index) {
      let reduceOpt = JSON.parse(JSON.stringify(OptList));
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
        price: 0,
        number: 0
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
      if (list.length == 0) {
        let cascaderOpt = JSON.parse(JSON.stringify(OptList));
        this.options[index] = cascaderOpt; //清除禁用选项
        item.selectItem = [];
        item.quotation = [];
        this.categoryShowText[index] = "";
      } else {
        let activeVal = list[0][0]; //当前选择的类别
        this.options[index].forEach(element => {
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
              this.options[index].forEach(ele_opt => {
                ele_opt.children.forEach(ele_opt_item => {
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
            price: 0,
            number: 0
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
    }
  },
  created() {
    this.canEdit = this.$route.query.state
    this.getContract();
    this.getCustomerPerson();
    this.getProjectPerson();
    this.getAllUser();
  }
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
.font-14 {
  font-size: 14px;
}
.over-hidden {
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


