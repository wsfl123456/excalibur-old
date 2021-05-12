<template>
  <div>
    <div class="g-mb-32">
      <i-input
        placeholder="请输入查询月份，如201710"
        v-model="searchValue"
        @on-keydown="search"
        name="month"
      >
        <span slot="prepend">
          <Icon type="ios-search-strong" size="20"></Icon>
        </span>
      </i-input>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>

      <div class="pwd-ipt" v-if="needPwd">
        <div>
          <i-input class="ipt" type="password" placeholder="请输入6位查询密码" v-model="pwd"></i-input>
          <div>
            <Button type="primary" class="submit-btn" size="large" @click="submitPwd">提交</Button>
          </div>
        </div>
      </div>
      <h4>查询结果：(默认显示最新月份薪资，历史薪资请输入月份查询)</h4>
      <table class>
        <tr>
          <th>
            <div class="table-cell">姓名</div>
          </th>
          <th>
            <div class="table-cell">部门</div>
          </th>
          <th>
            <div class="table-cell">职位</div>
          </th>
          <th>
            <div class="table-cell">基本工资</div>
          </th>
          <th>
            <div class="table-cell">旷事产假扣款</div>
          </th>
          <th>
            <div class="table-cell">病假扣款</div>
          </th>
           <th>
            <div class="table-cell">交通通讯补贴</div>
          </th>
        </tr>
        <tr v-if="isEmpty">
          <td colspan="7">
            <div class="table-cell empty">没有数据</div>
          </td>
        </tr>
        <tr v-for="(item, idx) in salaryList" :key="idx" v-else>
          <td>
            <div class="table-cell">{{item.userName}}</div>
          </td>
          <td>
            <div class="table-cell">{{item.departmentName}}</div>
          </td>
          <td>
            <div class="table-cell">{{item.positionName}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.totalSalary)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.absenceMoney)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.illMoney)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.trafficAllowance)}}</div>
          </td>
        </tr>
        <tr>
          <th>
            <div class="table-cell">误餐补贴</div>
          </th>
          <th>
            <div class="table-cell">报销</div>
          </th>
          <th>
            <div class="table-cell">个人社保合计</div>
          </th>
          <th>
            <div class="table-cell">个人公积金合计</div>
          </th>
          <th>
            <div class="table-cell">个人所得税</div>
          </th>
          <th>
            <div class="table-cell">基本工资实得</div>
          </th>
          <th>
            <el-tooltip class="item" effect="light" content="合计金额为当月实发工资加报销" placement="bottom">
              <div class="table-cell" style="width:100%">合计</div>
            </el-tooltip>
          </th>
        </tr>
        <tr v-if="isEmpty">
          <td colspan="7">
            <div class="table-cell empty">没有数据</div>
          </td>
        </tr>
        <tr v-for="(item, idx) in salaryList" :key="'sd-' + idx" v-else>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.telAllowance)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.reimbursement)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.socialTotal)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.fundTotal)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.incomeTax)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.baseTotal)}}</div>
          </td>
          <td>
            <div class="table-cell">{{keepTwoDigits(item.actSalary)}}</div>
          </td>
        </tr>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import { Growth } from "../../API/api";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";

let date = new Date();
let datetime = date.getFullYear() + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));
export default {
  components: {
    Toast,
    Loading,
    BCrumb
  },
  name: "salary",
  data() {
    return {
      crumb: [
        { label: "成长计划" },
        { label: "薪酬与福利" },
        { label: "薪资查询" }
      ],
      isToast: false,
      toastMsg: null,
      isLoading: false,
      searchValue : datetime,
      pwd: "",
      salaryList: [],
      needPwd: false,
      isEmpty: false
    };
  },
  methods: {
    keepTwoDigits (value) {
      if (value) {
        if (value.indexOf("*") > -1) {
          return value;
        } else {
          return Math.round(value * 100) / 100;
        }
      } else {
        return 0;
      }
    },
    search(e) {
      if (e.keyCode === 13 && !this.needPwd) {
        this.getSalary(this.searchValue);
      }
    },
    submitPwd() {
      this.$http
        .post(Growth.salaryPwd, this.qs.stringify({ password: this.pwd }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode === 0) {
            this.needPwd = false;
            this.getSalary(this.searchValue);
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        });
    },
    getSalary(date) {
      this.isLoading = true;
      this.$http
        .post(Growth.salary, this.qs.stringify({ month: date }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwd = true;
            } else {
              if (+_data.retData.count === 0) {
                this.isEmpty = true;
              } else {
                this.isEmpty = false;
                this.salaryList = _data.retData.data;
              }
            }
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        });
    }
  },
  created() {
    this.getSalary();
  }
};
</script>

<style scoped lang="less">
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #e9ecef;
}
th {
  text-align: left;
  background-color: #fff;
  font-size: 12px;
  color: #868e96;
  font-weight: normal;
  border: 1px solid #e9ecef;
  height: 32px;
  &:hover,
  &.active {
    background-color: #f8f9fa;
  }
  i {
    color: #2d8ef8;
  }
}
td {
  font-size: 14px;
  color: #343a40;
  height: 48px;
  border-bottom: 1px solid #e9ecef;
  &.empty-data {
    text-align: center;
  }
}
tbody {
  tr {
    &:hover {
      td {
        background-color: #f8f9fa;
      }
    }
  }
}
.table-cell {
  display: inline-block;
  vertical-align: middle;
  padding-left: 18px;
  padding-right: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: normal;
  box-sizing: border-box;
  text-align: left;
  &.empty {
    text-align: center;
    display: block;
  }
}
.result-list {
  position: relative;
  min-height: 300px;
  .pwd-ipt {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      text-align: center;
    }
    .ipt {
      width: 300px;
      margin-bottom: 16px;
    }
  }
}
</style>


