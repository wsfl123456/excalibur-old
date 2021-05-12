<template>
  <div>
    <div class="index-wrap">
      <div class="index-main">
        <h2 class="">我的工作</h2>
        <div>
          <div class="task-num">
            <ul class="f-clearfix">
              <li v-for="(item, idx) in taskNumArr">
                <div @click="selectTab(idx)" :class="{'act': taskTypeIdx === idx}">{{item.label}}({{item.num}})</div>
              </li>
            </ul>
          </div>
          <div class="task-list">
            <div v-for="(item, idx) in taskResult" v-if="taskTypeIdx === idx">
              <table class="main-list">
                <thead>
                <tr>
                  <th
                    :class="{active: sortTh === titIndex}"
                    v-for="(titItem, titIndex) in resultTitle" :key="titIndex"
                    @click="sortData(titIndex, titItem)"
                    :style="{width: titItem.width + 'px'}">
                    <div class="table-cell">
                      {{titItem.title}}
                      <i class="iconfont"
                         :class="{'icon-sort_down': titItem.asc === 'desc', 'icon-sort_up': titItem.asc === 'asc'}"
                      ></i>
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="item.length > 0">
                <template v-for="_item in item">
                  <tr @click="toPage(_item)">
                    <td v-for="(titItem, titIdx) in resultTitle" :key="titIdx">
                      <template v-if="titItem.key === 'stateMe'">
                        <div class="table-cell">
                          {{_item.stateNameMe}}
                        </div>
                      </template>
                      <template v-else-if="titItem.key === 'timeStamp'">
                        <div class="table-cell">
                          {{_item.time}}
                        </div>
                      </template>
                      <template v-else>
                        <div class="table-cell">
                          {{_item[titItem.key]}}
                        </div>
                      </template>
                    </td>
                  </tr>
                </template>
                <!--<tr v-for="_item in item" @click="toPage(_item)">-->
                  <!--<td>-->
                    <!--<div class="table-cell">-->
                      <!--{{iconConf[_item.workType]}}-->
                    <!--</div>-->
                  <!--</td>-->
                  <!--<td>-->
                    <!--<div class="table-cell">{{_item.name}}</div>-->
                  <!--</td>-->
                  <!--<td>-->
                    <!--<div class="table-cell">-->
                      <!--{{_item.stateNameMe}}-->
                    <!--</div>-->
                  <!--</td>-->
                  <!--<td>-->
                    <!--<div class="table-cell">-->
                      <!--{{_item.time}}-->
                    <!--</div>-->
                  <!--</td>-->
                <!--</tr>-->
                </tbody>
                <tbody v-else >
                <tr>
                  <td colspan="4" class="g-ta-c">
                    没有相应工作
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="index-sub">
        <div class="index-schedule g-mb-20">
          <div class="index-sub-title">
            <h2>今日日程</h2>
            <router-link to="/schedule/manage">更多》</router-link>
          </div>
          <div class="schedule-list">
            <ul v-if="scheduleResult.length > 0">
              <template v-for="item in scheduleResult">
                <li :key="item.id">
                  <router-link :to="`/schedule/manage`" class="inner">
                    <span>
                      {{item.name}}
                    </span>
                    <span>
                      {{item.time_range}}
                    </span>
                  </router-link>
                </li>
              </template>
            </ul>
            <div v-else>
              今日暂无日程安排~~
            </div>
          </div>
        </div>
        <div class="index-notice g-mb-20">
          <div class="index-sub-title">
            <h2>系统公告</h2>
            <!--<router-link to="/sysNotice/list/">更多系统通知</router-link>-->
            <a href="javascript:;" @click="toSysNotice">更多》</a>
          </div>
          <div class="notice-list">
            <ul v-if="noticeResult.length > 0">
              <template v-for="item in noticeResult">
                <li :key="item.id">
                  <router-link :to="`/sysNotice/detail/${item.id}`" target="_blank" class="inner">
                    <span>
                      【{{typeConf[item.typeId]}}】{{item.title}}
                      <span class="new-notice-tag" v-if="item.isNew"></span>
                    </span>
                    <span>
                      {{item.lastModifyTime | filterDate('yyyy/MM/dd')}}
                    </span>
                  </router-link>
                </li>
              </template>
            </ul>
            <div v-else>
              暂无通知~~
            </div>
          </div>
        </div>
        <div class="index-knowledge">
          <div class="index-sub-title">
            <h2>知识库</h2>
            <!--<router-link to="/sysNotice/list/">更多系统通知</router-link>-->
            <a href="javascript:;" @click="toKnowledge">更多》</a>
          </div>
          <div class="notice-list">
            <ul v-if="tipsResult.length > 0">
              <template v-for="item in tipsResult">
                <li :key="item.id">
                  <router-link :to="`/study/tips/${item.id}`" target="_blank" class="inner">
                    <span>
                      {{item.title}}
                    </span>
                    <span>
                      {{item.creatorName}}
                      {{item.lastModifyTime | filterDate('yyyy/MM/dd')}}
                    </span>
                  </router-link>
                </li>
              </template>
            </ul>
            <div v-else>
              没有内容~~
            </div>
          </div>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Index, Schedule, Sys} from '../../API/api'
  import {ajax} from '../../util/util'

  export default {
    name: '',
    components: {Loading, Toast},
    data () {
      return {
        crumb: [
          {
            label: '首页'
          }
        ],
        iconConf: {
          task: '任务',
          project: '项目',
          taskBaoxiao: '报销',
          taskWaichu: '外出',
          vacation: '请假',
          equipment: '设备',
          customer: '品牌',
          supply: '供应商'
        },
        isToast: false,
        toastMsg: '',
        isLoading: false,
        taskNumArr: [],
        taskResult: [],
        sortTh: null,
        resultTitle: [
          {
            title: '类型',
            asc: 'desc',
            key: 'workTypeName',
            width: 100
          },
          {
            title: '名称',
            asc: 'desc',
            key: 'name'
          },
          {
            title: '状态',
            asc: 'desc',
            key: 'stateMe',
            width: 150
          },
          {
            title: '时间',
            asc: 'desc',
            key: 'timeStamp',
            width: 150
          }
        ],
        noticeResult: [],
        scheduleResult: [],
        tipsResult: [],
        taskTypeIdx: 0,
        scheduleConf: {
          search_type: '2',
          date: '',
          id: null,
          date_type: 'day'
        },
        noticeConf: {
          page: 1,
          pageSize: 25,
          state: 1,
          orderBy: 'lastModifyTime'
        },
        tipsConf: {
          page: 1,
          pageSize: 5,
          state : 1
        },
        typeConf: {
          1: 'EXCALIBUR',
          2: '人事部通知',
          3: '行政部通知',
          4: 'SDC通知',
          5 : 'NCC通知',
          6: 'NHU通知'
        }
      }
    },
    methods: {
      init () {
        this.setMenu()
        this.getAllAPI()
      },
      sortData (idx, item) {
        this.sortTh = idx
        const asc = item.asc = item.asc === 'desc' ? 'asc' : 'desc'
        this.taskResult[this.taskTypeIdx].sort((a, b) => {
          if (asc === 'desc') {
            return (b[item.key] + '').localeCompare(a[item.key] + '')
          } else {
            return (a[item.key] + '').localeCompare(b[item.key] + '')
          }
        })
      },
      toKnowledge () {
        this.$router.push('/study/tips')
      },
      toSysNotice () {
        this.$router.push('/sysNotice/list/')
        this.$store.dispatch('setCurrMenu', 'profile')
        sessionStorage.setItem('currMenu', 'profile')
        sessionStorage.setItem('primaryMenu', 'profile')
        this.$store.dispatch('setPrimaryMenu', 'profile')

        sessionStorage.setItem('subMenu', 'sysNotice/list/')
        this.$store.dispatch('setCurrSubMenu', 'sysNotice/list/')
        this.$store.dispatch('setPrimaryMenu', 'profile')
      },
      toPage (item) {
        const {customerId, projectId, workType, taskId, toolkitId, productId, dataVersion} = item
        switch (workType) {
          case 'task':
          case 'hetong':
            /* 乱七八糟的规则，反正就是这样的 */
            if (dataVersion === 0 && (toolkitId === 19 || toolkitId === 20)) {
              this.$router.push(`/tasks/list/${customerId}/${projectId}?id=${taskId}&toolkitId=${0}`);
            }else {
              this.$router.push(`/tasks/list/${customerId}/${projectId}?id=${taskId}&toolkitId=${productId}`);
            }
            break;
          case 'project':
            this.$router.push(`/projects/list/${customerId}?id=${projectId}`)
            break
          case 'taskBaoxiao':
            this.$router.push('/myReimburse/list')
            break
          case 'taskWaichu':
            this.$router.push('/vacation/out')
            break
          case 'vacation':
            this.$router.push('/vacation/audit')
            break
          case 'equipment':
            this.$router.push('/myDevice/apply')
            break
          case 'customer':
            this.$router.push('/v2/resource/brand')
            break
          case 'supply':
            this.$router.push('/v2/resource/supplier')
            break
        }
      },
      setMenu () {
        this.$store.dispatch('setCurrMenu', '69')
        // sessionStorage.setItem('currMenu', '69')
      },
      selectTab (idx) {
        this.taskTypeIdx = idx
        this.sortTh = null
      },
      getTask () {
        return ajax.post(Index.worknumber, {})
      },
      getNotice () {
        return ajax.post(Index.sysNoticeList, this.noticeConf)
      },
      getTips () {
        return ajax.post(Sys.tipsList, this.tipsConf)
      },
      getSchedule () {
        this.scheduleConf.id = JSON.parse(localStorage.userInfo).id
        this.scheduleConf.date = new Date().getFullYear().toString() + '/' + ((new Date().getMonth()) + 1).toString() + '/' + new Date().getDate().toString();

        return ajax.post(Schedule.allSchedule, this.scheduleConf)
      },
      getAllAPI () {
        const allPost = [this.getTask(), this.getSchedule(), this.getNotice(), this.getTips()]
        this.isLoading = true
        Promise.all(allPost).then(([taskResult, schedule, notice, tips]) => {
          this.isLoading = false
          this.taskNumArr = [
            {
              num: taskResult.workNumber2,
              label: '待我审核'
            },
            {
              num: taskResult.workNumber3,
              label: '待我执行'
            },
            {
              num: taskResult.workNumber4,
              label: '待我质检'
            },
            {
              num: taskResult.workNumber1,
              label: '我创建的'
            }
          ]
          this.taskResult = [taskResult.workList2, taskResult.workList3, taskResult.workList4, taskResult.workList1]

          this.noticeResult = notice.data.slice(0, 5)

          this.scheduleResult = schedule.data
          this.tipsResult = tips.data
        }).catch((err) => {
          this.isToast = true
          this.toastMsg = err.toString()
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .index-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .index-main {
      flex: 2;
      border: 1px solid #dddee1;
      margin-right: 16px;
      border-radius: 4px;
      /*padding: 10px 0;*/
      h2 {
        padding: 10px 22px;
        font-size: 16px;
      }
    }
    .index-sub {
      flex: 1;
      .index-schedule {
        border: 1px solid #dddee1;
        border-radius: 4px;
        /*padding: 16px;*/
        .index-sub-title {
          padding: 10px 20px;
          h2 {
            font-size: 16px;
            line-height: normal;
          }
          a {
            font-size: 14px;
          }
        }
        .schedule-list {
          padding: 0 0 0;
          min-height: 78px;
          ul {
            max-height: 135px;
            padding: 0 20px;
            overflow: auto;
          }
          > div {
            height: 78px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .notice-list {
          padding: 0 20px 0;
          min-height: 78px;
          > div {
            height: 78px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .index-notice, .index-knowledge {
        .index-schedule
      }
    }
  }
  .task-num {
    background-color: #f1f3f5;
    border-top: 1px solid #CED4DA;
    border-bottom: 1px solid #CED4DA;
    ul {
      margin-bottom: -1px;
      li {
        float: left;
        text-align: center;
        div {
          display: inline-block;
          width: 140px;
          line-height: 40px;
          cursor: pointer;
          transition: all .3s 0s linear;
          font-size: 16px;
          border-bottom: 1px solid #CED4DA;
          height: 40px;
          &.act, &:hover {
            background-color: #fff;
            color: #2d8ef8;
            font-size: 16px;
          }
          &:hover {
            border-bottom: 1px solid #CED4DA;
          }
          &.act {
            border-bottom-color: #fff;
          }
          span {
            font-size: 30px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .main-list {
    cursor: default;
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #CED4DA;
  }
  th {
    text-align: left;
    background-color: #F8F9FA;
    color: #868e96;
    font-weight: normal;
    border: 1px solid #CED4DA;
    height: 32px;
    font-size: 14px;
    &:hover {
      background-color: #fff;
    }
    &.active {
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
    font-size: 14px;
    color: #495057;
    height: 40px;
    border-bottom: 1px solid #CED4DA;
    &.empty-data {
      text-align: center;
    }
  }
  tbody {
    tr {
      &:hover {
        td {
          background-color: #f8f9fa;
        }
      }
    }
  }
  .table-cell {
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: normal;
    box-sizing: border-box;
    text-align: left;
  }
  .index-sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #CED4DA;
  }
  .notice-list, .schedule-list {
    font-size: 14px;
    li {
      font-size: 14px;
      margin: 10px 0;
      .inner {
        color: #495057;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        &:hover {
          color: #2d8cf0;
        }
        span {
          &:first-child {
            flex: 1;
            max-width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:last-child {
            /*flex: 1;*/
          }
        }
      }
    }
  }
  .task-list {
    padding: 20px;
  }
</style>
