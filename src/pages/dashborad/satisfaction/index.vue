<template>
  <div class="satisfaction">
    <h3>客户满意度</h3>
    <div class="tabs dashboradTab">
      <Tabs :animated="false" v-model="curTab">
        <TabPane class="tab-pane" label="按月份显示" name="month">
          <month @monthTimeChange="monthTimeChange($event)" :info="monthInfo" :curTab="curTab"></month>
        </TabPane>
        <TabPane class="tab-pane" label="按客户显示" name="client">
          <client @clientTimeChange="clientTimeChange($event)" :info="clientInfo" :curTab="curTab"></client>
        </TabPane>

        <!-- 按项目显示的筛选条件有所不同，所以不在该组件调取满意度接口 -->
        <TabPane class="tab-pane" label="按项目显示" name="project">
          <project :curTab="curTab" :teamId="teamId"></project>
        </TabPane>
      </Tabs>
    </div>
    <div class="remark">(注：非常满意-5分；比较满意-4分；满意-3分；不满意-2分；非常不满意-1分；暂未评分-0)</div>
  </div>
</template>
<script>
import month from "./month";
import client from "./client"
import project from "./project"
import { Dashborad } from "../../../API/api.js";

export default {
  props: {
    teamId: {
      type: [Number, String]
    }
  },
  components: {
    month,
    client,
    project
  },
  data() {
    return {
      curTab: "month",
      monthInfo: [],
      clientInfo: [],
    };
  },
  methods: {
    monthTimeChange(date = {}) {
      const { teamId } = this;
      const formData = { ...date, teamId };
      this.$http.post(
        Dashborad.teamsatisfymonth,
        this.qs.stringify(formData),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        }
      ).then(res => {
          this.monthInfo = res.data.retData.chartResult
      })
    },
    clientTimeChange(date = {}) {
      const { teamId } = this;
      const formData = { ...date, teamId };
      this.$http.post(
        Dashborad.teamsatisfycustomer,
        this.qs.stringify(formData),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        }
      ).then(res => {
          this.clientInfo = res.data.retData.chartResult
      })
    },
  }
};
</script>
<style lang="less" scoped>
.satisfaction {
  border: 1px solid #e9ecef;
  padding-bottom: 40px;
  h3 {
    font-size: 16px;
    padding: 10px 20px;
    border-bottom: 1px solid #e9ecef;
  }
  .tab-pane {
    padding: 20px;
  }
  .remark {
    margin-top: 30px;
    text-align: center;
    font-size: 14px;
    color: #ff6666;
  }
}
</style>


