<template>
  <div class="project">
    <div class="filter">
      <div class="date-filter">
        <span>问卷调查时间</span>
        <DatePicker
          type="month"
          :value="fromtime"
          :clearable="false"
          @on-change="timeChange($event, 'fromtime')"
          style="width:130px"
        ></DatePicker>
        <span>—</span>
        <DatePicker
          type="month"
          :value="totime"
          :clearable="false"
          @on-change="timeChange($event, 'totime')"
          style="width:130px"
        ></DatePicker>
        <toast :is-toast="isToast" :msg="msgToast"></toast>
      </div>

      <!-- 品牌筛选 -->
      <div class="customer-filter">
        <span>品牌</span>
        <el-select
          v-model="customerId"
          class="customer-filter-select"
          placeholder="输入关键字选择品牌"
          filterable
          @change="customerChanege"
        >
          <el-option value="0" label="全部"></el-option>
          <el-option
            v-for="(item, index) in customerList"
            :value="item.id"
            :label="item.customerName"
            :key="index"
          ></el-option>
        </el-select>
      </div>

      <!-- 项目筛选 -->
      <div class="customer-filter">
        <span>项目</span>
        <el-select
          v-model="projectId"
          class="customer-filter-select"
          placeholder="输入关键字选择项目"
          filterable
          @change="getInfo"
        >
          <el-option value="0" label="全部"></el-option>
          <el-option
            v-for="(item, index) in projectList"
            :value="item.id"
            :label="item.name"
            :key="index"
          ></el-option>
        </el-select>
      </div>
    </div>

    <!-- 当前Tab为项目并且有数据，才会渲染图表 -->
    <project-chart v-if="curTab == 'project' && info.length" :info="info" class="project-chart"></project-chart>
    <div v-else class="no-questionnaire">暂无问卷～～</div>

    <toast :is-toast="isToast" :msg="msgToast"></toast>
  </div>
</template>
<script>
import dateFilter from "./dateFilter";
import projectChart from "./projectChart";
import { Brand, Dashborad, Project } from "../../../API/api.js";
import { StartMonth, EndMonth } from "../../../util/util.js";
import Toast from "../../../components/popup/Toast";

export default {
  props: {
    curTab: {
      type: [String]
    },
    teamId: {
      type: [Number, String]
    }
  },
  components: {
    dateFilter,
    projectChart,
    Toast
  },
  data() {
    return {
      customerId: "0",
      projectId: "0",
      customerList: [],
      projectList: [],
      info: [],
      isToast: false,
      msgToast: null,
      canSubmit: true,
      fromtime: StartMonth,
      totime: EndMonth
    };
  },
  watch: {
    teamId: {
      handler() {
        this.customerId = "0";
        this.getCustomerList();
        this.customerChanege();
      }
    }
  },
  created() {
    this.getCustomerList();
    this.customerChanege();
  },
  methods: {
    customerChanege() {
      this.projectId = "0";
      this.getProjectList();
      this.getInfo();
    },
    timeChange(date, type) {
      this[type] = date;
      const startYear = Number(this.fromtime.substring(0, 4));
      const endYear = Number(this.totime.substring(0, 4));
      const startMonth = Number(this.fromtime.substring(5, 7));
      const endMonth = Number(this.totime.substring(5, 7));

      /* 起始时间需小于截止时间 */
      if (new Date(this.fromtime).getTime() > new Date(this.totime).getTime()) {
        this.canSubmit = false;
        this.msgToast = "起始时间需小于截止时间";
        this.isToast = true;
        setTimeout(() => {
          this.canSubmit = true;
          this.isToast = false;
          this.msgToast = null;
        }, 2000);
      } else {
        /* 起止时间段不能超过12个月 */
        if (endYear == startYear) {
          this.canSubmit = true;
        } else if (
          endYear - startYear == 1 &&
          12 - startMonth + endMonth <= 11
        ) {
          this.canSubmit = true;
        } else {
          this.canSubmit = false;
          this.msgToast = "起止时间段最长为12个月";
          this.isToast = true;
          setTimeout(() => {
            this.canSubmit = true;
            this.isToast = false;
            this.msgToast = null;
          }, 2000);
        }
      }

      if (this.canSubmit) this.getInfo();
    },
    getCustomerList() {
      return this.$http
        .post(
          Brand.listByProject,
          this.qs.stringify({
            page: 1,
            pageSize: 1000,
            powerType: 1,
            teamId: this.teamId
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          this.customerList = res.data.retData.customerList.data;
        });
    },
    getProjectList() {
      const formData = {
        customerId: this.customerId,
        page: 1,
        pageSize: 1000,
        powerType: 1,
        orderBy: 'name',
        asc: 'asc'
      };
      return this.$http
        .post(Project.list, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.projectList = res.data.retData.data;
        });
    },
    getInfo() {
      const { fromtime, totime, teamId } = this;
      const customerId =
        this.customerId == "0" ? [] : Array.of(this.customerId);
      const projectId = this.projectId == "0" ? [] : Array.of(this.projectId);
      const formData = { fromtime, totime, teamId, customerId, projectId };

      this.$http
        .post(Dashborad.teamsatisfyproject, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.info = res.data.retData.chartResult;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.project {
  .filter {
    display: flex;
    .date-filter {
      display: flex;
      align-items: center;
      font-size: 14px;
      & > * {
        margin-left: 5px;
      }
      & > span {
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .customer-filter {
      margin-left: 50px;
      span {
        font-size: 14px;
        vertical-align: middle;
      }
      .customer-filter-select {
        margin-left: 8px;
        width: 150px;
      }
    }
  }
  .project-chart {
    margin-top: 30px;
  }
  .no-questionnaire {
    height: 400px;
    line-height: 400px;
    text-align: center;
  }
}
</style>
<style lang="less">
.customer-filter {
  .customer-filter-select {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      padding-top: 4px;
      padding-bottom: 4px;
    }
    .el-input__icon {
      line-height: 32px;
    }
  }
}
</style>



