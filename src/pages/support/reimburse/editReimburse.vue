<template>
  <div>
    <i-form label-position="left" :label-width="120" class="default-form">
      <div class="new-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="任务名称" class="new-default-form-item" required>
                <i-input
                  v-model="taskFormData.reimburse.taskName.value"
                  :placeholder="taskFormData.reimburse.taskName.placeholder"
                ></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="报销主体" class="new-default-form-item" required>
                <Select
                  v-model="taskFormData.reimburse.main.value"
                  :placeholder="taskFormData.reimburse.main.placeholder"
                >
                  <Option
                    v-for="item in mainList"
                    :key="item.id"
                    :value="String(item.id)"
                  >{{item.value}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="截止时间" class="new-default-form-item" required>
                <DatePicker
                  transfer
                  class="new-deadline deadline"
                  type="date"
                  :placeholder="taskFormData.reimburse.endTime.placeholder"
                  format="yyyy-MM-dd"
                  :value="taskFormData.reimburse.endTime.value"
                  @on-change="changeEndTime"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <i-form
      label-position="left"
      :label-width="120"
      class="default-form reimburse"
      style="margin-top:40px"
    >
      <div class="items new-form-group">
        <div>
          <div>实际类别</div>
          <div>发票类别</div>
          <div>发票类型</div>
          <div>总金额</div>
          <div>未税金额</div>
          <div>税率</div>
          <div>税额</div>
          <div>发生时间</div>
          <div>项目</div>
          <div>详细说明</div>
        </div>
        <div v-for="(item, index) in taskFormData.reimburse.items" :key="index">
           <div class="classification">
            <Tooltip
              :disabled="classificationState === true || item.classification.value.length === 0"
              :delay="800"
            >
              <div slot="content">{{transformClassification(item.classification.value)}}</div>
              <Cascader
                :data="newclassificationList"
                :value="transformNumber(item.classification.value)"
                @on-change="classificationChange($event, index)"
                @on-visible-change="classificationVisibleChange"
                trigger="hover"
                filterable
                :clearable="false"
                :placeholder="item.classification.placeholder"
              ></Cascader>
            </Tooltip>
          </div>
          <div>
            <Select
              v-model="item.category.value"
              :placeholder="item.category.placeholder"
              @on-change="changeCategory($event, index)"
            >
              <Option
                v-for="_item in categoryList"
                :key="_item.id"
                :value="String(_item.id)"
              >{{_item.value}}</Option>
            </Select>
          </div>
          <div>
            <Select
              v-model="item.type.value"
              :placeholder="item.type.placeholder"
              @on-change="changeType($event, index)"
            >
              <template v-if="item.category.value">
                <Option
                  v-for="_item in typeList"
                  :key="_item.id"
                  :value="String(_item.id)"
                >{{_item.value}}</Option>
              </template>
              <template v-else>
                <Option disabled value="0">先选择发票类别</Option>
              </template>
            </Select>
          </div>
          <div>
            <input-number
              v-model="item.totalMoney.value"
              :step="10"
              :min="0"
              :readonly="item.category.value == 14"
              :placeholder="item.totalMoney.placeholder"
              @on-blur="saveTwo(item.totalMoney.value, index)"
            ></input-number>
          </div>
          <div>
            <i-input
              :value="Math.round(item.totalMoney.value / (item.faxRate.value/100 + 1) * 100) / 100"
              readonly
            ></i-input>
          </div>
          <div>
            <template v-if="item.type.value != 1">
              <p class="no-fax">—</p>
            </template>
            <template v-else>
              <input-number
                v-model="item.faxRate.value"
                :placeholder="item.faxRate.placeholder"
                :min="0"
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')"
                :readonly="item.type.value != 1"
              ></input-number>
            </template>
          </div>
          <div>
            <template v-if="item.type.value != 1">
              <p class="no-fax">—</p>
            </template>
            <template v-else>
              <i-input
                :value="Math.round((item.totalMoney.value / (item.faxRate.value/100 + 1)) * item.faxRate.value / 100 * 100) / 100"
                readonly
              ></i-input>
            </template>
          </div>
          <div>
            <Tooltip :disabled="item.happenTime.value.indexOf(',') < 0">
              <div slot="content">
                <p v-for="(time, _index) in item.happenTime.value.split(',')" :key="_index">{{time}}</p>
              </div>
              <DatePicker
                :options="dateOpt[item.category.value || 'default']"
                transfer
                :readonly="!item.category.value"
                :multiple="item.category.value == 14"
                class="new-deadline deadline"
                type="date"
                :placeholder="item.happenTime.placeholder"
                format="yyyy-MM-dd"
                :value="item.happenTime.value"
                @on-change="happenDateChange($event, index)"
                :clearable="false"
              ></DatePicker>
            </Tooltip>
          </div>
          <div class="mohu-query">
            <el-select v-model="item.project.value" :placeholder="item.project.placeholder" :disabled="item.classification.value.includes(35) || item.classification.value.includes(36) || item.classification.value.includes(38) || item.classification.value.includes(39) || item.classification.value.includes('35') || item.classification.value.includes('36')|| item.classification.value.includes('38') || item.classification.value.includes('39')" filterable>
              <el-option v-show="item.classification.value.includes(35) || item.classification.value.includes(36)|| item.classification.value.includes(38)|| item.classification.value.includes(39)" value='1' label="Operation"></el-option>
              <el-option
                v-for="_item in projectList"
                :value="String(_item.id)"
                :label="_item.projectName"
                :key="_item.id"
              ></el-option>
            </el-select>
          </div>
          <div>
            <i-input v-model="item.detail.value" :placeholder="item.detail.placeholder"></i-input>
          </div>
        </div>
      </div>
      <div class="add-btn">
        <a
          v-show="taskFormData.reimburse.items.length > 1"
          href="javascript:;"
          @click="reduceItem()"
          style="color: #FF6666"
        >
          <Icon type="minus-circled"></Icon>删除报销任务
        </a>
        <a href="javascript:;" @click="addItem()">
          <Icon type="plus-circled"></Icon>添加报销任务
        </a>
      </div>
    </i-form>

    <i-form label-position="left" :label-width="120" class="default-form" style="margin-top:40px">
      <div class="new-form-group">
        <div>
          <Row>
            <i-col span="8" class="default-form-member-col">
              <FormItem label="报销总金额" class="new-default-form-item" required>
                <i-input :value="totalMoney" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem label="未税金额" class="new-default-form-item" required>
                <i-input :value="noFaxTotalMoney" readonly></i-input>
              </FormItem>
            </i-col>
            <i-col span="8" class="default-form-member-col">
              <FormItem label="税额" class="new-default-form-item" required>
                <i-input :value="faxMoney" readonly></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <i-form label-position="left" :label-width="120" class="default-form" style="margin-top:40px">
      <div class="new-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem :label="'申请人'" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <member-add :is-edit="false" content="添加项目成员" :users="applier"></member-add>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
    <div class="g-ta-r btn">
      <Button type="primary" size="large" :loading="isSubmit" @click="submit">提交</Button>
    </div>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
import MemberAdd from "../../../components/MemberAdd";
import Toast from "../../../components/popup/Toast";
import { Task } from "../../../API/api";
import { formConf } from "../../../assets/conf/formData.conf";

export default {
  name: "editReimburse",
  components: { Toast, MemberAdd },
  computed: {
    //报销总金额
    totalMoney() {
      var total = 0;
      this.taskFormData.reimburse.items.forEach((element, index) => {
        if (element.category.value != 14) {
          total += Number(element.totalMoney.value);
        }
      });
      return Math.round(total * 100) / 100;
    },
    // 餐补金额
    priceMeal() {
      let priceMeal = 0;
      this.taskFormData.reimburse.items.forEach((element, index) => {
        if (element.category.value == 14) {
          priceMeal += Number(element.totalMoney.value);
        }
      });
      return priceMeal;
    },
    //未税总金额
    noFaxTotalMoney() {
      var total = 0;
      this.taskFormData.reimburse.items.forEach((element, index) => {
        if (element.category.value != 14) {
          total +=
            Math.round(
              (element.totalMoney.value / (element.faxRate.value / 100 + 1)) *
                100
            ) / 100;
        }
      });
      return Math.round(total * 100) / 100;
    },
    //税额
    faxMoney() {
      var total = 0;
      this.taskFormData.reimburse.items.forEach((element, index) => {
        if (element.category.value != 14) {
          total +=
            Math.round(
              (((element.totalMoney.value / (element.faxRate.value / 100 + 1)) *
                element.faxRate.value) /
                100) *
                100
            ) / 100;
        }
      });
      return Math.round(total * 100) / 100;
    },
     newclassificationList() {
        var arr = []
        this.classificationList.forEach(ele => {
          ele.children.forEach(element => {
            arr.push(element)
          })
        })
        return arr
      }
  },
  data() {
    return {
      isToast: false,
      toastMsg: "",
      canSubmit: true,
      isSubmit: false,
      classificationState: false,
      formValue: {
        toolkitId: 18,
        productId: 7,
        endTime: null,
        taskName: null,
        taskForm: null,
        priceTotal: null,
        priceNoTax: null,
        priceTax: null,
        priceMeal: null,
        taskId: this.$route.params.id,
        operationInfo: [
          {
            operationId: null
          }
        ]
      },
      mainList: [
        //报销主体下拉列表
        {
          id: "1",
          value: "工匠"
        },
        {
          id: "2",
          value: "酷拓"
        },
        {
          id: "3",
          value: "盖雅"
        },
         {
          id: "4",
          value: "冀周"
        }
      ],
      classificationList: [
        {
          value: 1,
          label: "行政",
          children: [
            {
              value: 2,
              label: "交通费",
              children: [
                {
                  value: 3,
                  label: "出租车票"
                },
                {
                  value: 4,
                  label: "路桥费"
                },
                {
                  value: 5,
                  label: "机票"
                },
                {
                  value: 6,
                  label: "火车票"
                },
                {
                  value: 7,
                  label: "交通费其他"
                }
              ]
            },
            {
              value: 8,
              label: "住宿费",
              children: [
                {
                  value: 9,
                  label: "酒店住宿"
                },
                {
                  value: 10,
                  label: "住宿费其他"
                }
              ]
            },
            {
              value: 11,
              label: "办公环境",
              children: [
                {
                  value: 12,
                  label: "清洁器材及补给"
                },
                {
                  value: 13,
                  label: "保洁劳务费"
                },
                {
                  value: 14,
                  label: "办公环境其他"
                }
              ]
            },
            {
              value: 15,
              label: "办公室基础补给",
              children: [
                {
                  value: 16,
                  label: "办公文具"
                },
                {
                  value: 17,
                  label: "办公室基础补给其他"
                }
              ]
            },
            {
              value: 18,
              label: "杂志订购"
            },
            {
              value: 19,
              label: "项目开销",
              children: [
                {
                  value: 20,
                  label: "快递费"
                },
                {
                  value: 21,
                  label: "劳务费用"
                },
                {
                  value: 22,
                  label: "其他采购"
                },
                {
                  value: 23,
                  label: "其他费用"
                }
              ]
            },
            {
              value: 24,
              label: "行政其他",
              children: [
                {
                  value: 49,
                  label: "个人垫付"
                },
                {
                  value: 50,
                  label: "行政其他"
                },
              ]
            },
            {
              value: 51,
              label: "行政税费",
              children: [
                {
                  value: 52,
                  label: "工商等行政证件获取"
                },
                {
                  value: 53,
                  label: "行政税费其他"
                },
              ]
            },
            {
              value: 54,
              label: "公关",
              children: [
                {
                  value: 55,
                  label: "公关"
                },
                {
                  value: 56,
                  label: "意外金"
                },
                {
                  value: 57,
                  label: "公关其他"
                },
              ]
            },
            {
              value: 58,
              label: "无形资产",
              children: [
                {
                  value: 59,
                  label: "微信微博等注册认证费"
                },
                {
                  value: 60,
                  label: "其他"
                },
              ]
            },
          ]
        },
        {
          value: 25,
          label: "人事",
          children: [
            {
              value: 26,
              label: "招聘类",
              children: [
                {
                  value: 27,
                  label: "内推"
                },
                {
                  value: 28,
                  label: "招聘类其他"
                }
              ]
            },
            {
              value: 29,
              label: "教育类",
              children: [
                {
                  value: 30,
                  label: "讲师费用"
                },
                {
                  value: 31,
                  label: "教材培训"
                },
                {
                  value: 32,
                  label: "委外培训"
                },
                {
                  value: 33,
                  label: "教育类其他"
                }
              ]
            },
            {
              value: 34,
              label: "福利费",
              children: [
                {
                  value: 35,
                  label: "入职体检费"
                },
                {
                  value: 36,
                  label: "福利费其他"
                }
              ]
            },
            {
              value: 37,
              label: "公司文化建设类",
              children: [
                {
                  value: 38,
                  label: "生日会"
                },
                {
                  value: 39,
                  label: "公司文化建设类其他"
                }
              ]
            },
            {
              value: 40,
              label: "津贴类",
              children: [
                {
                  value: 41,
                  label: "餐补"
                },
                {
                  value: 42,
                  label: "津贴类其他"
                }
              ]
            },
            {
              value: 43,
              label: "人事其他"
            }
          ]
        },
        {
          value: 44,
          label: "财务",
          children: [
            {
              value: 45,
              label: "招待费",
              children: [
                {
                  value: 46,
                  label: "餐饮招待"
                },
                {
                  value: 47,
                  label: "其他招待"
                }
              ]
            },
            {
              value: 48,
              label: "",
              label: "财务其他"
            }
          ]
        }
      ],
      categoryList: [
        //报销类别
        {
          id: "1",
          value: "办公费"
        },
        {
          id: "2",
          value: "快递费"
        },
        {
          id: "3",
          value: "业务招待费"
        },
        {
          id: "4",
          value: "市内交通费"
        },
        {
          id: "5",
          value: "低值易耗品"
        },
        {
          id: "6",
          value: "服务费"
        },
        {
          id: "7",
          value: "差旅费"
        },
        {
          id: "8",
          value: "咨询费"
        },
        {
          id: "9",
          value: "员工福利"
        },
        {
          id: "10",
          value: "教育经费"
        },
        {
          id: "11",
          value: "会务费"
        },
        {
          id: "12",
          value: "培训费"
        },
        {
          id: "13",
          value: "固定资产"
        },
        {
          id: "14",
          value: "加班餐补"
        },
        {
          id: "15",
          value: "其他"
        }
      ],
      typeList: [
        //发表类型下拉列表
        {
          id: "1",
          value: "增值税专用发票"
        },
        {
          id: "2",
          value: "其他发票"
        },
        {
          id: "3",
          value: "无发票"
        }
      ],
      projectList: [],
      applier: [],
      dateOpt: {
        14: {},
        default: {
          disabledDate(date) {
            return date;
          }
        }
      },
      mealDate: [],
      taskFormData: null
    };
  },
  methods: {
    init() {
      this.getApplier();
    },
    saveTwo(val, index) {
      let num = val;
      this.taskFormData.reimburse.items[index].totalMoney.value =
        Math.round(val * 100) / 100;
    },
    classificationVisibleChange(state) {
      this.classificationState = state;
    },
    classificationChange(e, index) {
      this.taskFormData.reimburse.items[index].project.value = ''
      this.taskFormData.reimburse.items[index].classification.value = JSON.parse('[' + String(e) + ']')  // ["1"] => [1]
      if (e.includes(35) || e.includes(36) || e.includes(38) || e.includes(39)) {
        this.taskFormData.reimburse.items[index].project.value = '1'
      }
    },
    transformNumber(arr) {
      if (arr) {
        let newArr = [];
        arr.forEach(ele => {
          newArr.push(Number(ele));
        });
        return newArr;
      } else {
        return "";
      }
    },
    transformClassification(arr) {
      let vm = this;
      let str = "";
      let newArr = [];
      function func(arr) {
        for (let i of arr) {
          newArr.push(i);

          if (i.children) {
            func(i.children);
          }
        }
      }

      if (arr.length) {
        func(this.newclassificationList);
        return newArr.find(ele => ele.value == arr[arr.length - 1]).__label;
      }
    },
    getAllowanceDate() {
      this.$http
        .post(Task.availableDate, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;

          if (_data.retCode == 0) {
            this.mealDate = _data.retData;
            this.dateOpt[14] = {
              disabledDate(date) {
                let _year = date.getFullYear();
                let _month = date.getMonth() + 1;
                if (_month < 10) {
                  _month = "0" + _month;
                }
                let _day = date.getDate();
                if (_day < 10) {
                  _day = "0" + _day;
                }
                let _d = `${_year}-${_month}-${_day}`;
                return _data.retData.indexOf(_d) < 0;
              }
            };
          }
        });
    },
    getProject() {
      this.$http
        .post(Task.index, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode == 0) {
            this.projectList = _data.retData.projectInfo;
          }
        });
    },
    changeEndTime(date) {
      this.taskFormData.reimburse.endTime.value = date;
    },
    happenDateChange(date, index) {
      this.taskFormData.reimburse.items[index].happenTime.value = date;
      if (this.taskFormData.reimburse.items[index].category.value == 14) {
        this.taskFormData.reimburse.items[index].totalMoney.value =
          (date ? date.split(",").length : 0) * 20;
      }
    },
    changeCategory(id, index) {
      if (id == 14) {
        this.taskFormData.reimburse.items[index].type.value = "3";
        this.taskFormData.reimburse.items[
          index
        ].happenTime.value = this.mealDate.join(",");
        this.taskFormData.reimburse.items[index].totalMoney.value =
          this.mealDate.length * 20;
        this.taskFormData.reimburse.items[index].faxRate.value = null;
      } else {
        this.taskFormData.reimburse.items[index].type.value = null;
        this.taskFormData.reimburse.items[index].happenTime.value = "";
        this.taskFormData.reimburse.items[index].totalMoney.value = null;
        this.taskFormData.reimburse.items[index].faxRate.value = null;
      }
    },
    changeType(id, index) {
      if (id == 1) {
        this.taskFormData.reimburse.items[index].faxRate.value = "6";
      } else {
        this.taskFormData.reimburse.items[index].faxRate.value = null;
      }
    },
    getApplier() {
      this.applier = [JSON.parse(localStorage.getItem("userInfo"))];
    },
    addItem() {
      let formData = JSON.parse(JSON.stringify(formConf[18])).reimburse
        .items[0];
      this.taskFormData.reimburse.items.push(formData);
    },
    reduceItem() {
      this.taskFormData.reimburse.items.pop();
    },
    submit() {
      this.formValue.endTime = this.taskFormData.reimburse.endTime.value;
      this.formValue.taskName = this.taskFormData.reimburse.taskName.value;
      this.formValue.taskForm = JSON.parse(JSON.stringify(this.taskFormData));
      this.formValue.priceTotal = this.totalMoney;
      this.formValue.priceNoTax = this.noFaxTotalMoney;
      this.formValue.priceTax = this.faxMoney;
      this.formValue.priceMeal = this.priceMeal;
      this.formValue.operationInfo[0].operationId = this.applier[0].id;
      let reimburse = this.formValue.taskForm.reimburse;
      let items = this.formValue.taskForm.reimburse.items;
      /* 校验基本信息 */
      for (let prop in reimburse) {
        if (reimburse[prop].toastMsg) {
          if (!reimburse[prop].value) {
            this.canSubmit = false;
            this.toastMsg = reimburse[prop].toastMsg;
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = "";
              this.canSubmit = true;
            }, 1500);
          }
        }
      }
      /* 校验报销 */
      items.forEach(element => {
        for (let _prop_ in element) {
          if (_prop_ === "classification") {
            if (!element[_prop_].value.length) {
              this.canSubmit = false;
              this.toastMsg = element[_prop_].toastMsg;
              this.isToast = true;
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = "";
                this.canSubmit = true;
              }, 1500);
            }
          } else {
            if (!element[_prop_].value) {
              if (_prop_ == "faxRate") {
                if (element["type"].value == 1) {
                  this.canSubmit = false;
                  this.toastMsg = element[_prop_].toastMsg;
                  this.isToast = true;
                  setTimeout(() => {
                    this.isToast = false;
                    this.toastMsg = "";
                    this.canSubmit = true;
                  }, 1500);
                }
              } else {
                this.canSubmit = false;
                this.toastMsg = element[_prop_].toastMsg;
                this.isToast = true;
                setTimeout(() => {
                  this.isToast = false;
                  this.toastMsg = "";
                  this.canSubmit = true;
                }, 1500);
              }
            }
          }
        }
      });
      if (this.canSubmit) {
        this.isSubmit = true;
        this.$http
          .post(Task.edit, this.qs.stringify(this.formValue), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const _data = res.data;
            this.isToast = true;
            if (_data.retCode == 0) {
              this.toastMsg = "提交成功";
              this.toastState = "success";
            } else {
              this.toastMsg = _data.retMsg;
              this.toastState = null;
            }
            this.isSubmit = false;
            setTimeout(() => {
              this.isToast = false;
              if (_data.retCode == 0) {
                this.$router.push("/myReimburse/list");
              }
            }, 1500);
          });
      }
    },
    getDetail() {
      this.$http
        .post(
          Task.detail,
          this.qs.stringify({ taskId: this.$route.params.id }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;
          if (_data.retCode == 0) {
            this.taskFormData = _data.retData.data.formInfo[0].formContent;
            this.taskFormData.reimburse.items.forEach(element => {
              if (!element.classification) {
                element.classification = {
                  value: [],
                  toastMsg: "请选择实际类别",
                  placeholder: "选择实际类别"
                };
              }
            });
          }
        });
    }
  },
  created() {
    this.init();
    this.getAllowanceDate();
    this.getProject();
    this.getDetail();
  }
};
</script>

<style lang="less">
.reimburse {
  .classification {
    .ivu-cascader {
      width: 147px;
      .ivu-cascader-label {
        line-height: 60px;
        padding: 0 14px;
      }
    }
    .ivu-input {
      text-overflow: ellipsis;
    }
  }
}
</style>

<style lang="less" scoped>
.reimburse-form-item {
  height: 40px !important;
  line-height: 40px !important;
}
.items {
  border: 1px solid #ced4da;
  margin-bottom: 20px;
  & > div {
    border-bottom: 1px solid #ced4da;
    display: flex;
    height: 60px;
    font-size: 14px;
    color: #66707a;
    & > div {
      height: 60px;
      // line-height: 60px;
      text-align: center;
      border-right: 1px solid #ced4da;
      &:nth-child(1) {
        width: 150px;
      }
      &:nth-child(2) {
        width: 110px;
      }
      &:nth-child(3) {
        width: 110px;
      }
      &:nth-child(4) {
        width: 90px;
      }
      &:nth-child(5) {
        width: 90px;
      }
      &:nth-child(6) {
        width: 80px;
      }
      &:nth-child(7) {
        width: 80px;
      }
      &:nth-child(8) {
        width: 150px;
      }
      &:nth-child(9) {
        flex: 1;
      }
      &:last-child {
        border: none;
        flex: 1;
      }
    }
    &:first-child {
      height: 36px;
      background: #f8f9fa;
      & > div {
        height: 36px;
        line-height: 36px;
        &::before {
          content: "*";
          display: inline-block;
          margin-right: 4px;
          line-height: 1;
          font-family: SimSun;
          font-size: 12px;
          color: #ed3f14;
        }
      }
    }
    &:last-child {
      border: none;
    }
  }
}
.add-btn {
  text-align: right;
  margin-bottom: 16px;
  a {
    margin-left: 16px;
    font-size: 14px;
  }
}
.btn {
  margin-top: 40px;
}
.no-fax {
  background-color: white;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ced4da;
}
</style>

