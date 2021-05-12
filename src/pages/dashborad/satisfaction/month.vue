<template>
  <div class="month">
    <date-filter @timeChange="timeChange($event)"></date-filter>

    <!-- 当前Tab为月份并且有数据，才会渲染图表 -->
    <month-chart v-if="curTab == 'month' && info.length" :info="info" class="month-chart"></month-chart>
    <div v-else class="no-questionnaire">该时间段暂无问卷～～</div>
  </div>
</template>
<script>
import dateFilter from "./dateFilter";
import monthChart from "./monthChart";

export default {
  props: {
    info: {
      type: [Array]
    },
    curTab: {
        type: [String]
    }
  },
  components: {
    dateFilter,
    monthChart
  },

  methods: {
    timeChange(e = {}) {
      this.$emit("monthTimeChange", e);
    }
  }
};
</script>
<style lang="less" scoped>
.month {
  .month-chart {
    margin-top: 30px;
  }
  .no-questionnaire {
    height: 340px;
    line-height: 400px;
    text-align: center;
  }
}
</style>


