<template>
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
</template>
<script>
import { StartMonth, EndMonth } from "../../../util/util.js";
import Toast from "../../../components/popup/Toast";

export default {
  components: { Toast },
  data() {
    return {
      isToast: false,
      msgToast: null,
      canSubmit: true,
      fromtime: StartMonth,
      totime: EndMonth
    };
  },
  computed: {
      teamId() {
          return this.$route.query.id
      }
  },
  watch: {
    teamId() {
         this.$emit("timeChange", { fromtime: this.fromtime, totime: this.totime });
    }
  },
  created() {
    this.$emit("timeChange", { fromtime: this.fromtime, totime: this.totime });
  },
  methods: {
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

      if (this.canSubmit)
        this.$emit("timeChange", {
          fromtime: this.fromtime,
          totime: this.totime
        });
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>


