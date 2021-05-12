<template>
  <div class="project-dashboard project-tab">
    <Tabs v-model="currTab" :animated="false">
      <TabPane v-if="roleInfo.dashboardProjectSku === 'show'" label="概况" name="overview">
        <div class="overview">
          <h3>项目各指标完成情况</h3>
          <div class="content">
            <div v-for="(item, index) in quotaList" :key="index">
              <div class="key">
                <img :src="item.icon" width="18px" height="18px">
                <span v-html="item.name"></span>
              </div>
              <div v-html="quotaListValue[index]" class="value"></div>
            </div>
            <Spin fix v-if="!Object.keys(projectMember).length">
              <Icon type="load-c" size="40" class="position-chart-load"></Icon>
            </Spin>
          </div>
        </div>
      </TabPane>
      <TabPane v-if="roleInfo.dashboardProjectSku === 'show'"  label="Margin" name="margin">
        <margin-sheet></margin-sheet>
      </TabPane>
      <TabPane label="任务执行" name="task-execute">
        <!-- 切换到当前tab才会渲染 -->
        <div v-if="currTab == 'task-execute'"> 
          <task-number></task-number>
          <task-time-consum></task-time-consum>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import TaskNumber from "./taskNumber";
import TaskTimeConsum from "./taskTimeConsum";
import MarginSheet from "./marginSheet"

export default {
  components: {
    TaskNumber,
    TaskTimeConsum,
    MarginSheet
  },
  props: {
    projectMember: {
      type: [Array, Object]
    },
    roleInfo: {
      type: [Array, Object]
    },
  },

  computed: {
    quotaListValue() {
      return Object.keys(this.projectMember).length
        ? [
            this.projectMember.baojiadanAmount + "万元",
            this.projectMember.marginAmount + "万元",
            this.projectMember.marginPercent + "%",
            this.projectMember.dayNum + "天",
            this.projectMember.taskNum
          ]
        : [];
    }
  },

  data() {
    return {
      currTab: (this.roleInfo.dashboardProjectSku === "show") ? "overview" : "task-execute",
      quotaList: [
        {
          name: "项目营收额",
          icon: require("@/assets/images/ic_actual revenue_blue.svg")
        },
        {
          name: "项目利润额",
          icon: require("@/assets/images/ic_money.svg")
        },
        {
          name: "项目利润率",
          icon: require("@/assets/images/ic_completion rate_blue.svg")
        },
        {
          name: "项目周期",
          icon: require("@/assets/images/ic_date.svg")
        },
        {
          name: "总任务个数",
          icon: require("@/assets/images/ic_task management.svg")
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.project-dashboard {
  border: 1px solid #ced4da;
  .overview {
    padding: 0 20px;
    .content {
      display: flex;
      position: relative;
      justify-content: space-between;
      margin-top: 30px;
      margin-bottom: 50px;
      .key {
        img {
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          color: #868e96;
          margin-left: 5px;
        }
      }
      .value {
        font-size: 24px;
        color: #303030;
        padding-left: 23px;
        margin-top: 20px;
      }
    }
  }
}
</style>


