<template>
  <div class="dri-detail-tabs">
    <div class="tabs">
      <div
        v-for="(i, k) in taskDetailList"
        :class="{ 'tabs--active': k + 1 === activeQName }"
        :key="k"
        @click="activeQName = k + 1"
      >
        <span>Q{{ k + 1 }}任务数量追踪</span>
      </div>
    </div>

    <template v-for="(i, k) in taskDetailList">
      <div :key="k" v-if="k + 1 === activeQName">
        <div v-if="i" class="task-detail-ontent">
          <div>
            Q{{ k + 1 }}任务数量{{ i.driCustomerTaskInfo.taskNum }}/{{
              i.driCustomerTaskInfo.taskCommenFinishNum
            }}（提交/完成）:
          </div>
          <p
            v-for="(i2, k2) in i.driCustomerTaskInfo.productInfo
              ? i.driCustomerTaskInfo.productInfo
              : []"
            :key="k2"
          >
            {{ i2.productName }}（{{ i2.taskNum }}/{{
              i2.taskCommenFinishNum
            }}）
          </p>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    taskDetailList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeQName: 1,
    };
  },
};
</script>
<style lang="less" scoped>
.dri-detail-tabs {
  margin-top: 10px;
  background: #f2f3f7;
  border-radius: 5px;
  padding: 0 24px 24px;
  .tabs {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    font-size: 16px;
    color: #343a40;
    line-height: 22px;

    &--active {
      color: #2d8ef8;
      font-weight: 500;
      font-family: PingFangSC-Medium, PingFang SC;
      border-bottom: 2px solid #2d8ef8 !important;
    }

    > div {
      width: 25%;
      padding: 23px 0;
      border-bottom: 1px solid #d9d9d9;
      &:hover {
        color: #2d8ef8;
        cursor: pointer;
      }
    }
  }

  .calculate {
    background: #ffffff;
    border-radius: 5px;
    margin-top: 10px;
    padding: 14px 0;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e02020;
    text-align: center;
  }

  .task-detail-ontent {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e02020;
    line-height: 20px;
    padding: 14px 21px;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 5px;
    p {
        margin-top: 4px;
    }
  }

  .no-data {
    background-color: #fff;
    margin-top: 10px;
    border-radius: 5px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>