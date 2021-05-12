<template>
  <div class="dri-detail-tabs">
    <div class="tabs">
      <div
        v-for="(i, k) in holdCheckList"
        :class="{ 'tabs--active': k + 1 === activeQName }"
        :key="k"
        @click="activeQName = k + 1"
      >
        <span>Q{{ k + 1 }}{{ checkName }}</span>
      </div>
    </div>

    <template v-for="(i, k) in holdCheckList">
      <div :key="k" v-if="k + 1 === activeQName">
        <div v-if="i && i.holdSystemDetail && i.holdSystemDetail.length">
          <div class="calculate">
            Q{{ k + 1 }}{{ checkName
            }}{{ removeZero(i.holdSystemScore) }}分=（<span
              v-for="(project, index) in i.holdSystemDetail"
              :key="index"
              >{{ project.projectName }} {{ removeZero(project.score) }}分<span
                v-if="index < i.holdSystemDetail.length - 1"
              >
                +
              </span> </span
            >）/{{ i.holdSystemDetail.length }}
          </div>

          <div class="list">
            <div v-for="(item, index) in i.holdSystemDetail" :key="index">
              <div class="pro-name">
                {{ item.projectName }}_{{ removeZero(item.score) }}分
              </div>
              <div class="pro-remark">1、{{ item.remark }}</div>
            </div>
          </div>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    holdCheckList: {
      type: Array,
      default() {
        return [];
      },
    },
    checkName: {
      type: String,
    },
  },
  data() {
    return {
      activeQName: 1,
    };
  },
  methods: {
    removeZero(num) {
      return (Number(num) * 100) / 100;
    },
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
    padding: 14px 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e02020;
    text-align: center;
  }

  .list {
    margin-top: 10px;
    overflow: hidden;
    > div {
      margin-top: 10px;
      .pro-name {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4c4c4c;
      }
      .pro-remark {
        margin-top: 6px;
        font-weight: 400;
      }
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