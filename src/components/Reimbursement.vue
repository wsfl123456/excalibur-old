<template>
  <div>
    <table class="reimbursement-table">
      <thead>
        <tr>
          <th>类别</th>
          <th>金额</th>
          <th>
            <span class="required-tag">*</span> 发生时间
          </th>
          <th v-if="isIndie">
            <span class="required-tag">*</span> 项目
          </th>
          <th>
            <span class="required-tag">*</span> 详细说明
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, idx) in formValue" :key="idx">
          <td>
            <!--<i-input v-if="isDisplay"  readonly :value="reimbursementConf.type.items[value.type - 1].name"></i-input>-->
            <i-select
              :class="isDisplay ? 'display-select' : ''"
              :disabled="isDisplay"
              v-model="value.type"
              placeholder="报销类别"
              @on-change="changeType($event, idx, value)"
            >
              <i-option
                v-for="(item, idx) in reimbursementConf.type.items"
                :value="item.id"
                :key="idx"
              >{{item.name}}</i-option>
            </i-select>
          </td>
          <td>
            <input-number
              :readonly="isDisplay"
              v-model="value.AmountE6"
              :step=".1"
              :min="0"
              @on-change="reCountTotal"
            ></input-number>
          </td>
          <td>
            <template v-if="isDisplay">
              <i-input :readonly="isDisplay" :value="value.openDate"></i-input>
            </template>
            <template v-else>
              <DatePicker
                :options="dateOpt[value.type || 'default']"
                transfer
                class="deadline"
                type="date"
                placeholder="发生时间"
                :value="value.openDate"
                :clearable="false"
                format="yyyy-MM-dd"
                @on-change="changeDate($event, value)"
              ></DatePicker>
              <!--<DatePicker :options="dateOpt[value.type || 'default']"  transfer class="deadline" type="date" placeholder="发生时间" v-model="value.openDate" :clearable="false" format="yyyy-MM-dd"></DatePicker>-->
            </template>
          </td>
          <td v-if="isIndie">
            <i-select
              :class="isDisplay ? 'display-select' : ''"
              :disabled="isDisplay"
              v-model="value.projectId"
              placeholder="所在项目"
            >
              <i-option
                v-for="(item, idx) in projects"
                :value="item.id.toString()"
                :key="idx"
              >{{item.projectName}}</i-option>
            </i-select>
          </td>
          <td>
            <i-input :readonly="isDisplay" v-model="value.mark" placeholder="填写详细说明"></i-input>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="add-btn" v-if="!isDisplay ">
      <a href="javascript:;" @click="delReimbursement(formLabel)" v-if="formLabel.length > 1">
        <Icon type="minus"></Icon>删除报销任务
      </a>
      <a href="javascript:;" @click="addReimbursement(formLabel)">
        <Icon type="plus"></Icon>添加报销任务
      </a>
    </div>
  </div>
</template>

<script>
import { Task } from "../API/api";

export default {
  name: "reimbursement",
  props: {
    isIndie: {
      type: Boolean,
      default: false
    },
    isDisplay: {
      type: Boolean,
      default: false
    },
    fullValue: {
      type: Object,
      default: function() {
        return {};
      }
    },
    formValue: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    },
    formLabel: {
      type: [Array, Object],
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      dateOpt: {
        16: {},
        default: {
          disabledDate(date) {
            return date;
          }
        }
      },
      projects: [],
      reimbursementConf: {
        type: {
          type: "select",
          items: [
            {
              id: "16",
              name: "加班餐补"
            },
            {
              id: "13",
              name: "差旅费"
            },
            {
              id: "14",
              name: "固定资产"
            },
            {
              id: "1",
              name: "办公费"
            },
            {
              id: "2",
              name: "业务招待费"
            },
            {
              id: "3",
              name: "市内交通费"
            },
            {
              id: "4",
              name: "通讯费"
            },
            {
              id: "5",
              name: "水电费"
            },
            {
              id: "6",
              name: "房屋租赁费"
            },
            {
              id: "7",
              name: "物业费"
            },
            // {
            //   id: '8',
            //   name: '员工福利费'
            // },
            {
              id: "9",
              name: "运杂费"
            },
            {
              id: "10",
              name: "耗材"
            },
            {
              id: "11",
              name: "咨询服务费"
            },
            {
              id: "12",
              name: "会务费"
            },
            {
              id: "17",
              name: "快递费"
            },
            {
              id: "15",
              name: "其他"
            }
          ],
          value: ""
        }
      }
    };
  },
  created() {
    this.getAllowanceDate();
    if (this.isIndie) {
      this.getProject();
    }
  },
  methods: {
    changeDate(e, obj) {
      // console.log('date', e, obj)
      // if (obj.type == 16) {
      //   var openDateArr = e.split(",");
      //   var total = 0;
      //   obj.AmountE6 = openDateArr[0] ? 20 * openDateArr.length : 0;
      //   if (this.formValue) {
      //     this.formValue.forEach(item => {
      //       total += +item.AmountE6;
      //     });
      //     this.fullValue.formData[0][0].value = total.toFixed(2);
      //   }
      // }
      obj.openDate = e;
    },
    changeType(e, idx, target) {
      // if (+e === 16) {
      target.openDate = "";
      // }
    },
    changeProject() {},
    getProject() {
      this.$http
        .post(Task.index, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.projects = _data.retData.projectInfo;
          }
        });
    },
    getAllowanceDate() {
      this.$http
        .post(Task.availableDate, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.dateOpt[16] = {
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
    reCountTotal() {
      var total = 0;
      if (this.formValue) {
        this.formValue.forEach(item => {
          total += +item.AmountE6;
        });
        this.fullValue.formData[0][0].value = total.toFixed(2);
      }
    },
    delReimbursement(data) {
      data.splice(data.length - 1, 1);
      this.reCountTotal();
    },
    addReimbursement(data) {
      const _data = {
        type: "",
        AmountE6: 0,
        openDate: "",
        mark: ""
      };
      data.push(_data);
    }
  }
};
</script>

<style scoped lang="less">
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  th {
    border: 1px solid #ced4da;
    background-color: #fff9db;
    font-size: 12px;
    padding: 5px 20px;
    /*text-align: left;*/
    color: #868e96;
  }
  td {
    border: 1px solid #ced4da;
    text-align: center;
    > div {
      width: 100%;
      .ivu-icon {
        line-height: normal;
      }
    }
  }
}
.add-btn {
  text-align: right;
  margin-bottom: 16px;
  a {
    margin-left: 16px;
  }
}
</style>
