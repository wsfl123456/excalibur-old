<template>
  <div class="task-time-consum">
    <h3>任务耗时</h3>
    <div class="filter">
      <div>
        <RadioGroup v-model="taskTimeConsumStatus" type="button" size="large">
          <Radio label="按月份显示" class="radio"></Radio>
          <Radio label="按职能部门显示" class="radio"></Radio>
        </RadioGroup>
      </div>
      <div class="time">
        <span>任务创建时间</span>
        <DatePicker
          type="month"
          :value="startTime"
          :clearable="false"
          @on-change="timeChange($event, 'startTime')"
        ></DatePicker>
        <span>—</span>
        <DatePicker
          type="month"
          :value="endTime"
          :clearable="false"
          @on-change="timeChange($event, 'endTime')"
        ></DatePicker>
      </div>
    </div>
    <div class="chart">
      <month-chart v-if="taskTimeConsumStatus == '按月份显示'" :info='monthData'></month-chart>
      <depart-chart v-else :info='departData'></depart-chart>
    </div>
    <toast :is-toast="isToast" :msg="msgToast"></toast>
  </div>
</template>
<script>
import MonthChart from "./consumMonthChart";
import DepartChart from "./consumDepartChart";
import { Dashborad } from "../../../API/api.js";
import { StartMonth, EndMonth } from "../../../util/util.js";
import Toast from "../../../components/popup/Toast";

export default {
  components: { MonthChart, DepartChart, Toast },
  data() {
    return {
      canSubmit: true,
      isToast: false,
      msgToast: null,
      taskTimeConsumStatus: "按月份显示",
      startTime: StartMonth,
      endTime: EndMonth,
      monthData: [],
      departData: []
    };
  },
  computed: {
    selectedProject() {
      return this.$store.state.projects.detail;
    },
    filter() {
      const { startTime, endTime, taskTimeConsumStatus } = this
      return { startTime, endTime, taskTimeConsumStatus }
    }
  },
  watch: {
    filter: {
      handler(val) {
        this.getMonthData();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    timeChange(date, type) {
      this[type] = date;
      const startYear = Number(this.startTime.substring(0, 4))
      const endYear = Number(this.endTime.substring(0, 4))
      const startMonth = Number(this.startTime.substring(5, 7))
      const endMonth = Number(this.endTime.substring(5, 7))

      /* 起始时间需小于截止时间 */
      if (new Date(this.startTime).getTime() > new Date(this.endTime).getTime()) {
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
        } else if (endYear - startYear == 1 && 12 - startMonth + endMonth <= 11) {
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

     
    },
    getMonthData() {
      if (this.canSubmit) {
        this.monthData = [] //重置数据
        this.departData = [] //重置数据

        const formData = {
          fromtime: this.startTime,
          totime: this.endTime,
          projectId: this.selectedProject.id
        };
        const api = this.taskTimeConsumStatus == '按月份显示' ? Dashborad.projectexecmonthdurtime : Dashborad.projectexecdepartmentdurtime
        this.$http
          .post(
            api,
            this.qs.stringify(formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            if (this.taskTimeConsumStatus == '按月份显示') this.monthData = res.data.retData.chartResult;
            else this.departData = res.data.retData.chartResult
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.task-time-consum {
  margin: 20px;
  border: 1px solid #ced4da;
  h3 {
    border-bottom: 1px solid #ced4da;
    padding: 8px 20px;
  }
  .filter {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .radio {
      width: 150px;
      text-align: center;
    }
    .time {
      display: flex;
      align-items: center;
      & > * {
        margin-left: 10px;
      }
    }
  }
  .chart {
    margin-top: 10px;
    padding-bottom: 30px
  }
}
</style>

