<template>
  <div class="staff-overhead">
    <div class="form">
      <el-date-picker
        v-if="curTab === 2"
        v-model="month"
        type="month"
        placeholder="请选择月份"
      >
      </el-date-picker>

      <el-select
        v-model="searchParams.teamId"
        filterable
        clearable
        placeholder="请选择事业部"
        class="item"
        @change="getStaffList"
      >
        <el-option
          v-for="team in teamlist"
          :key="team.teamId"
          :value="team.teamId"
          :label="team.teamName"
        ></el-option>
      </el-select>

      <el-select
        v-model="searchParams.research"
        filterable
        clearable
        placeholder="请选择员工"
        class="item"
      >
        <template v-if="searchParams.teamId">
          <el-option
            v-for="item in staffList"
            :key="item.name"
            :value="item.name"
            :label="item.name"
          ></el-option>
        </template>
        <template v-else>
          <el-option
            value="9999999"
            label="请先选择事业部"
            disabled
          ></el-option>
        </template>
      </el-select>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchList"
        class="item"
        >搜索</el-button
      >
    </div>

    <div class="tabs">
      <div
        v-for="i in tabs"
        :key="i.id"
        :class="{ 'tab--cur': i.id === curTab }"
      >
        <span @click="changeTab(i.id)">{{ i.value }}</span>
      </div>
    </div>

    <div v-loading="isLoading">
      <table class="table" cellspacing="0">
        <thead>
          <tr>
            <th
              v-for="title in curTab === 1 ? table1Title : table2Title"
              :key="title.key"
              :width="title.width"
            >
              {{ title.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body" id="overheadTbody">
          <div
            v-show="(curTab === 1 ? list1 : list2).length"
            id="overheadTbodyContent"
          >
            <tr v-for="item in curTab === 1 ? list1 : list2" :key="item.id">
              <td
                v-for="i in curTab === 1 ? table1Title : table2Title"
                :key="i.key"
                :width="i.width"
              >
                <template
                  v-if="
                    i.key === 'userCode' ||
                    i.key === 'userName' ||
                    i.key === 'teamName' ||
                    i.key === 'month'
                  "
                  >{{ item[i.key] }}</template
                >
                <template v-else>{{ formatMoney(item[i.key]) }}</template>
              </td>
            </tr>
          </div>
          <tr v-show="!(curTab === 1 ? list1 : list2).length">
            <td :colspan="curTab === 1 ? 7 : 11" style="text-align: center">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { Task, Hr, Index } from "../../API/api";
import { dateToYM, thousandSplit } from "../../util/util";
import MemberHeader from "../../components/popup/MemberHeader";

export default {
  name: "fcStaff",
  components: { MemberHeader },
  data() {
    return {
      month: "",
      searchParams: {
        teamId: "",
        research: "",
        page: 1,
        pageSize: 25,
      },
      tabs: [
        {
          id: 1,
          value: "基本薪资信息",
        },
        {
          id: 2,
          value: "工资单",
        },
      ],
      curTab: 1,
      teamlist: [],
      staffList: [],
      table1Title: [
        {
          label: "员工编号",
          key: "userCode",
        },
        {
          label: "员工姓名",
          key: "userName",
          width: 130,
        },
        {
          label: "事业部",
          key: "teamName",
        },
        {
          label: "基本薪资",
          key: "baseSalary",
        },
        {
          label: "公积金基数",
          key: "fundBase",
        },
        {
          label: "社保基数",
          key: "socialBase",
        },
        {
          label: "补贴",
          key: "allowance",
        },
      ],
      table2Title: [
        {
          label: "员工编号",
          key: "userCode",
        },
        {
          label: "员工姓名",
          key: "userName",
          width: 130,
        },
        {
          label: "事业部",
          key: "teamName",
        },
        {
          label: "基本薪资",
          key: "totalSalary",
        },
        {
          label: "个人社保合计",
          key: "socialTotal",
        },
        {
          label: "个人公积金合计",
          key: "fundTotal",
        },
        {
          label: "公司社保合计",
          key: "companyTotal",
        },
        {
          label: "公司公积金合计",
          key: "companyFund",
        },
        {
          label: "报销",
          key: "reimbursement",
        },
        {
          label: "共计",
          key: "actSalary",
        },
        {
          label: "月份",
          key: "month",
        },
      ],
      list1: [],
      list2: [],
      dom: null,
      domContent: null,
      canLoad: true,
      isLoading: true,
    };
  },
  methods: {
    formatMoney(money) {
      if (money.indexOf("*") !== -1) {
        return money;
      } else {
        /* 先转数字固定小数，再转字符加千分位分隔符 */
        const m = parseFloat(money);
        return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
      }
    },
    changeTab(id) {
      this.curTab = id;
      this.month = "";
      this.searchList();
    },
    async getTeamList() {
      const res = await this.$http.post(
        Task.userteamlist,
        this.qs.stringify({ page: 1, pageSize: 1000, powerType: 1 }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      this.teamlist = [...this.teamlist, ...res.data.retData.data];
    },

    async getStaffList(id) {
      this.searchParams.research = "";
      this.staffList = [];

      const teamName = !!this.teamlist.find(e => e.teamId === id) ? this.teamlist.find(e => e.teamId === id).teamName : '';

      const res = await this.$http.post(
        Index.allUsers,
        this.qs.stringify({
           teamName
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
       this.staffList = res.data.retData.data;
    },

    async getList() {
      this.isLoading = true;

      const api = this.curTab === 1 ? Hr.salaryList : Hr.payrollList;

      const params =
        this.curTab === 1
          ? { ...this.searchParams }
          : {
              ...this.searchParams,
              ...{ month: this.month ? dateToYM(this.month) : "" },
            };
      const res = await this.$http.post(api, this.qs.stringify(params), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });

      if (this.curTab === 1) {
        this.list1 = [...this.list1, ...res.data.retData.data];
      } else {
        this.list2 = [...this.list2, ...res.data.retData.data];
      }

      res.data.retData.data.length < 25 && (this.canLoad = false);

      this.isLoading = false;
    },
    searchList() {
      this.searchParams.page = 1;
      this.canLoad = true;
      this.list1 = [];
      this.list2 = [];
      this.getList();
    },
    scrollHandler() {
      if (
        this.dom.scrollTop + this.dom.offsetHeight >=
          this.domContent.offsetHeight &&
        this.canLoad
      ) {
        this.searchParams.page++;
        this.getList();
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    },
  },
  created() {
    this.getTeamList();
    this.getList();
  },
  mounted() {
    this.dom = document.getElementById("overheadTbody");
    this.domContent = document.getElementById("overheadTbodyContent");
    this.loadMore();
  },
};
</script>
<style lang="less">
.staff-overhead {
  overflow: hidden;
  .form {
    display: flex;
    align-items: center;
    .item {
      margin-left: 10px;
    }
    .el-date-editor {
      .el-range-separator {
        width: unset;
      }
    }
  }

  .tabs {
    margin-top: 24px;
    display: flex;
    > div {
      flex: 1;
      padding-bottom: 10px;
      text-align: center;
      border-bottom: 2px solid #ced4da;
      font-size: 16px;
      color: #303030;
      > span {
        cursor: pointer;
      }
    }

    .tab--cur {
      color: #2d8ef8;
      border-bottom: 2px solid #2d8ef8;
    }
  }

  .table {
    margin-top: 24px;
    width: 100%;
    border: 1px solid #ced4da;
    border-collapse: collapse;
    text-align: left;
    tbody {
      display: block;
      max-height: calc(100vh - 300px);
      overflow-y: auto;
    }
    tbody,
    thead {
      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
    }
    th {
      border-right: 1px solid #ced4da;
      background: #f8f9fa;
      font-size: 14px;
      color: #868e96;
      padding: 6px 20px;
      &:last-child {
        border: none;
      }
    }

    td {
      border: 1px solid #ced4da;
      border-bottom-width: 0;
      font-size: 14px;
      color: #495057;
      padding: 14px 20px;
      word-break: break-all;
      vertical-align: middle;
      &:first-child {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }
  }

  .total {
    border: 1px solid #ced4da;
    display: flex;
    background: #f8f9fa;
    font-size: 14px;
    div {
      height: 48px;
      line-height: 48px;

      &:first-child {
        flex: 1;
        text-align: center;
        color: #2d8ef8;
      }
      &:nth-child(2) {
        width: 100px;
        border-left: 1px solid #ced4da;
        background-color: #fff;
        padding-left: 20px;
      }
      &:last-child {
        width: 200px;
        border-left: 1px solid #ced4da;
      }
    }
  }
}
</style>