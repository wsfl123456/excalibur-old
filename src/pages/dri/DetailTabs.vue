<template>
  <div class="dri-detail-tabs">
    <div class="tabs">
      <div
        v-for="(i, k) in surveyScoreList"
        :class="{ 'tabs--active': k + 1 === activeQName }"
        :key="k"
        @click="activeQName = k + 1;activeProject = 0"
      >
        <span>Q{{ k + 1 }}客户满意度</span>
      </div>
    </div>

    <template v-for="(i, k) in surveyScoreList">
      <div :key="k" v-if="k + 1 === activeQName">
        <div v-if="i && i.project_HaveScore_List && i.project_HaveScore_List.length">
          <div class="calculate">
            Q{{ k + 1 }}客户满意度{{
              removeZero(i.project_HaveScore_avg)
            }}分=（<span
              v-for="(project, index) in i.project_HaveScore_List"
              :key="index"
              >{{ project.projectInfo.projectName }}
              {{ removeZero(project.getSurveyScore.avgScore) }}分<span
                v-if="index < i.project_HaveScore_List.length - 1"
              >
                +
              </span> </span
            >）/{{ i.project_HaveScore_List.length }}
          </div>

          <div class="project">
            <span>项目:</span>
            <span
              v-for="(project, index) in i.project_HaveScore_List"
              @click="activeProject = index"
              :class="{ 'project--active': activeProject === index }"
              :key="index"
              >{{ project.projectInfo.projectName }}</span
            >
          </div>

          <div
            class="score"
            v-for="(project, index) in i.project_HaveScore_List"
            :key="index"
          >
            <div v-show="index === activeProject">
              <div class="name">
                {{ project.projectInfo.projectName }}客户满意度{{
                  removeZero(project.getSurveyScore.avgScore)
                }}分=（<span
                  v-for="(item, itemK) in project.getSurveyScore.avgList"
                  :key="item.parentId"
                  >{{ item.title }} {{ removeZero(item.parentAvgScore) }}分<span
                    v-if="itemK < project.getSurveyScore.avgList.length - 1"
                  >
                    +
                  </span> </span
                >）/{{ project.getSurveyScore.avgList.length }}
              </div>
              <div class="directory">
                <div
                  v-for="item in project.getSurveyScore.avgList"
                  :key="item.parentId"
                >
                  <div class="i">
                    <span>{{ item.title }}</span>
                    <span class="split"></span>
                    <span>{{ item.parentAvgScore }}分</span>
                  </div>
                  <div
                    class="i"
                    v-for="(son, sonK) in item.sonList"
                    :key="sonK"
                  >
                    <span>{{ sonK + 1 }}、{{ son.optionTitle }}</span>
                    <span class="split"></span>
                    <span>{{ son.sumScore }}分</span>
                  </div>
                </div>
              </div>
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
    surveyScoreList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeQName: 1,
      activeProject: 0,
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
    padding: 14px 0;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #e02020;
    text-align: center;
  }

  .project {
    padding: 14px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      color: #343a40;
      margin-right: 20px;
      cursor: pointer;
      &:first-child {
        color: #868e96;
      }
      &:hover {
        color: #2d8ef8;
      }
    }
    &--active {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #2d8ef8 !important;
    }
  }

  .score {
    background-color: #fff;
    border-radius: 5px;
    >div {
    padding: 26px 25px 29px;
    }
    .name {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #343a40;
      text-align: center;
    }
    .directory {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      padding-top: 23px;
      > div {
        width: 320px;
        flex: none;
        margin-left: 57px;
        margin-top: 10px;
        color: #868e96;
        &:nth-child(3n + 1) {
          margin-left: 0;
        }
        > .i {
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          .split {
            border-bottom: 1px dashed #d9d9d9;
            flex: 1;
            margin: 0 8px;
          }
          &:first-child {
            margin-top: 0;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #4c4c4c;
          }
        }
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