<template>
  <div>
    <i-form label-position="left" :label-width="120" class="default-form">
      <div class="new-form-group">
        <div>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="编辑时间" class="new-default-form-item" required>
                <i-input :value="taskData.formInfo[verSelect].createTime" readonly></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div>
          <Row>
             <i-col span="24" class="default-form-member-col">
              <FormItem label="报销主体" class="new-default-form-item" required>
                <Select
                  :value="Number(taskFormData.reimburse.main.value)"
                  disabled
                >
                  <Option v-for="item in mainList" :key="item.id" :value="item.id">{{item.value}}</Option>
                </Select>
              </FormItem>
            </i-col>
          </Row>
        </div>
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
    <i-form
      label-position="left"
      :label-width="120"
      class="reimburse-show"
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
              :disabled="item.classification.value.length === 0"
              :delay="800"
            >
              <div slot="content">{{transformClassification(item.classification.value)}}</div>
              <Cascader
                :data="newclassificationList"
                :value="transformNumber(item.classification.value)"
                :clearable="false"
                disabled
                :placeholder="item.classification.placeholder"
              ></Cascader>
            </Tooltip>
          </div>
          <div>
            <Select v-model="item.category.value" disabled>
              <Option
                v-for="_item in categoryList"
                :key="_item.id"
                :value="String(_item.id)"
              >{{_item.value}}</Option>
            </Select>
          </div>
          <div>
            <Select v-model="item.type.value" disabled>
              <template v-if="item.category.value">
                <Option
                  v-for="_item in typeList"
                  :key="_item.id"
                  :value="String(_item.id)"
                >{{_item.value}}</Option>
              </template>
            </Select>
          </div>
          <div>
            <input-number :value="Math.round(item.totalMoney.value * 100) / 100" readonly></input-number>
          </div>
          <div>
            <i-input
              :value="Math.round(item.totalMoney.value / (item.faxRate.value/100 + 1) * 100) / 100"
              readonly
            ></i-input>
          </div>
          <div>
            <template v-if="item.type.value != 1">
              <div class="no-fax">—</div>
            </template>
            <template v-else>
              <input-number :value="`${item.faxRate.value}%`" readonly></input-number>
            </template>
          </div>
          <div>
            <template v-if="item.type.value != 1">
              <div class="no-fax">—</div>
            </template>
            <template v-else>
              <i-input
                :value="Math.round((item.totalMoney.value / (item.faxRate.value/100 + 1)) * item.faxRate.value / 100 * 100) / 100"
                readonly
              ></i-input>
            </template>
          </div>
          <div class="happenTime"> 
           <Tooltip :disabled='item.happenTime.value.indexOf(",") < 0'>
             <div slot="content">
               <p v-for="(time, _index) in item.happenTime.value.split(',')" :key='_index'>
                 {{time}}
               </p>
             </div>
              <i-input :value="item.happenTime.value" readonly></i-input>
           </Tooltip>
          </div>
          <div class="mohu-query">
            <Select v-model="item.project.value" disabled>
              <!-- <Option value='1'>Operation</Option> -->
              <Option
                v-for="_item in projectList"
                :value="String(_item.id)"
                :key="_item.id"
              >{{ _item.projectName }}</Option>
            </Select>
          </div>
          <div>
            <i-input v-model="item.detail.value" readonly :placeholder="item.detail.placeholder"></i-input>
          </div>
        </div>
      </div>
    </i-form>
    <i-form label-position="left" :label-width="120" class="default-form" style="margin-top:40px">
      <div class="new-form-group">
        <div>
          <Row>
            <i-col span="12" class="default-form-member-col">
              <FormItem :label="'申请人'" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <common-member-ii
                    :can-exit="false"
                    :is-edit="false"
                    :users="[{name : taskData.operationInfo[0].operationName,headPic:taskData.operationInfo[0].operationHeadPic,id:taskData.operationInfo[0].operationId}]"
                  ></common-member-ii>
                </div>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem :label="'审批人'" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <common-member-ii
                    :can-exit="false"
                    :is-edit="false"
                    :users="[{name : taskData.info.auditorName,headPic:taskData.info.auditorHeadPic,id :taskData.info.auditorId}]"
                  ></common-member-ii>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>
  </div>
</template>

<script>
import CommonMemberIi from '../../../components/CommonMemberii'
import Toast from "../../../components/popup/Toast";
import { Task } from "../../../API/api";
import { formConf } from "../../../assets/conf/formData.conf";
import { type } from "os";

export default {
  name: "showReimburse",
  components: { Toast, CommonMemberIi },
  props: {
    taskData: {
      type: [Object, Array]
    },
    taskFormData: {
      type: [Object, Array]
    },
    verSelect: {
      type: [Number, String]
    }
  },
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
    //未税总金额
    noFaxTotalMoney() {
      var total = 0;
      this.taskFormData.reimburse.items.forEach((element, index) => {
        if (element.category.value != 14) {
           total +=
          Math.round(
            (element.totalMoney.value / (element.faxRate.value / 100 + 1)) * 100
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
      operationUserInfo: {
        userName: "",
        headPic: ""
      },
      auditUserInfo: {
        userName: "",
        headPic: ""
      },
      isToast: false,
      toastMsg: "",
      canSubmit: false,
      isSubmit: false,
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
        operationInfo: [
          {
            operationId: null
          }
        ]
      },
      mainList: [
        //报销主体下拉列表
        {
          id: 1,
          value: "工匠"
        },
        {
          id: 2,
          value: "酷拓"
        },
        {
          id: 3,
          value: "盖雅"
        },
         {
          id: "4",
          value: "冀周"
        }
      ],
      categoryList: [
        //报销类别
        {
          id: 1,
          value: "办公费"
        },
        {
          id: 2,
          value: "快递费"
        },
        {
          id: 3,
          value: "业务招待费"
        },
        {
          id: 4,
          value: "市内交通费"
        },
        {
          id: 5,
          value: "低值易耗品"
        },
        {
          id: 6,
          value: "服务费"
        },
        {
          id: 7,
          value: "差旅费"
        },
        {
          id: 8,
          value: "咨询费"
        },
        {
          id: 9,
          value: "员工福利"
        },
        {
          id: 10,
          value: "教育经费"
        },
        {
          id: 11,
          value: "会务费"
        },
        {
          id: 12,
          value: "培训费"
        },
        {
          id: 13,
          value: "固定资产"
        },
        {
          id: 14,
          value: "加班餐补"
        },
        {
          id: 15,
          value: "其他"
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
      typeList: [
        //发表类型下拉列表
        {
          id: 1,
          value: "增值税专用发票"
        },
        {
          id: 2,
          value: "其他发票"
        },
        {
          id: 3,
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
      mealPrice: null
    };
  },
  methods: {
    init() {
      this.getApplier();
    },
    transformNumber(arr) {
      let newArr = []
      arr.forEach(ele => {
        newArr.push(Number(ele))
      })
      return newArr
    },
        transformClassification(arr) {
      let vm = this
      let str = "";
      let newArr = [];
      function func(arr) {
        for (let i of arr) {
          newArr.push(i)

          if (i.children) {
            func(i.children)
          } 
        }
      }

      if (arr.length) {
        func(this.newclassificationList)
        console.log(newArr)
        return (newArr.find(ele => ele.value == arr[arr.length - 1])).__label
      }

    },
    getAllowanceDate() {
      this.$http
        .post(Task.availableDate, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;

          if (_data.retCode === 0) {
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
          if (_data.retCode === 0) {
            this.projectList = _data.retData.projectInfo;
            this.projectList.unshift({
              id: 1,
              projectName: 'Operation'
            })
          }
        });
    },
    changeEndTime(date) {
      this.taskFormData.reimburse.endTime.value = date;
    },
    happenDateChange(date, index) {
      this.taskFormData.reimburse.items[index].happenTime.value = date;
      if (this.taskFormData.reimburse.items[index].category.value === 14) {
        this.taskFormData.reimburse.items[index].totalMoney.value =
          (date ? date.split(",").length : 0) * 20;
        this.mealPrice = (date ? date.split(",").length : 0) * 20;
      }
    },
    changeCategory(id, index) {
      if (id === 14) {
        this.taskFormData.reimburse.items[index].type.value = 3;
        this.taskFormData.reimburse.items[
          index
        ].happenTime.value = this.mealDate;
        this.taskFormData.reimburse.items[index].totalMoney.value =
          this.mealDate.length * 20;
        this.taskFormData.reimburse.items[index].faxRate.value = null;
        this.mealPrice = this.mealDate.length * 20;
      }
    },
    changeType(id, index) {
      if (id === 1) {
        this.taskFormData.reimburse.items[index].faxRate.value = 6;
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
      this.formValue.priceMeal = this.mealPrice;
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
          if (!element[_prop_].value) {
            if (_prop_ === "faxRate") {
              if (element["type"].value === 1) {
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
      });
      if (this.canSubmit) {
        this.isSubmit = true;
        this.$http
          .post(Task.add, this.qs.stringify(this.formValue), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const _data = res.data;
            this.isToast = true;
            if (_data.retCode === 0) {
              this.toastMsg = "提交成功";
              this.toastState = "success";
            } else {
              this.toastMsg = _data.retMsg;
              this.toastState = null;
            }
            this.isSubmit = false;
            setTimeout(() => {
              this.isToast = false;
              if (_data.retCode === 0) {
                this.$router.push("/myReimburse/list");
              }
            }, 1500);
          });
      }
    }
  },
  created() {
    this.init();
    this.getAllowanceDate();
    this.getProject();
  }
};
</script>

<style lang="less">
.reimburse-show {
  .classification {
    .ivu-cascader {
      width: 137px;
    }
    .ivu-cascader-arrow { 
      display: none
    }
    .ivu-input {
      text-overflow: ellipsis
    }
  }
  .happenTime {
    .ivu-tooltip-inner {
      background-color: #5ea9fa
    }
    .ivu-tooltip-arrow {
      background-color: #5ea9fa

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
        width: 140px;
      }
      &:nth-child(2) {
        width: 100px;
      }
      &:nth-child(3) {
        width: 100px;
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
        width: 120px;
        overflow: hidden;
      }
      &:nth-child(9) {
        flex: 1;
        overflow: hidden;
      }
      &:last-child {
        border: none;
        flex: 1;
        overflow: hidden;
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

