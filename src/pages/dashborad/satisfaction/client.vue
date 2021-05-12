<template>
  <div class="client">
    <date-filter @timeChange="timeChange($event)"></date-filter>

    <!-- 当前Tab为客户并且有数据，才会渲染图表 -->
    <client-chart v-if="curTab == 'client' && info.length" :info="info" class="client-chart"></client-chart>
    <div v-else class="no-questionnaire">该时间段暂无问卷～～</div>
  </div>
</template>
<script>
import dateFilter from "./dateFilter";
import clientChart from "./clientChart";

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
    clientChart
  },

  methods: {
    timeChange(e = {}) {
      this.$emit("clientTimeChange", e);
    }
  }
};
</script>
<style lang="less" scoped>
.client {
  .client-chart {
    margin-top: 30px;
  }
  .no-questionnaire {
    height: 400px;
    line-height: 400px;
    margin-top: 30px;
    text-align: center;
  }
}
</style>


