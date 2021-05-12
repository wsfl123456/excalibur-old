<!--列表-->
<template>
  <div class="main-list-box">
    <table class="main-list">
      <thead>
      <tr>
        <th
          :class="{active: sortTh === index}"
          v-for="(item, index) in tableTitles"
          :key="index"
          @click="sortData(index)"
          :style="{width: item.width + 'px'}"
        >
          <div class="table-cell">
            {{item.title}}
            <i
              class="iconfont"
              :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"
            ></i>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="data && data.length > 0">
      <!--<template v-for="(item, index) in data" :key="'data-' + index" >-->
      <template v-for="(item, index) in data">
        <tr @click="toggleRow(item, item.id)">
          <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
            <template v-if="_item.key === 'state'">
              <div class="table-cell">{{item.stateName}}</div>
            </template>
            <template v-else-if="_item.key === 'creatorName'">
              <div class="table-cell">
                  <member-header :user="{id: item.creatorId, name: item.creatorName, headPic: item.creatorHeadPic}"></member-header>
                <!--<Avatar :src="item.operationHeadPic">JE</Avatar>-->
              </div>
              <div class="table-cell">
                <Tooltip :content="levelTip[item.level]" placement="top" v-if="item.level !== 99">
                  <Icon
                    type="ios-flag"
                    size="20"
                    :color="parseInt(item.level) === 2 ? '#ff8685' : parseInt(item.level) === 1 ? '#ffe15b' : '#89ea97'"
                  ></Icon>
                </Tooltip>
              </div>
            </template>
            <template v-else-if="_item.key === 'currentUserName'">
              <div class="table-cell">
                <member-header :user="{id: item.currentUserId, name: item.currentUserName, headPic: item.currentUserHeadPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'nextUserName'">
              <div class="table-cell">
                <member-header :user="{id: item.nextUserId, name: item.nextUserName, headPic: item.nextUserHeadPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'createTime' || _item.key === 'endTime'">
              <div class="table-cell">{{item[_item.key] | filterYear}}</div>
            </template>
            <template v-else>
              <div class="table-cell">{{item[_item.key]}}</div>
            </template>
          </td>
        </tr>
        <tr v-if="detailIdx === item.id">
          <td :colspan="tableTitles.length">
            <task-form-detail></task-form-detail>
          </td>
        </tr>
      </template>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="tableTitles.length" class="empty-data">没有数据</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TaskFormDetail from "./TaskFormDetail";
  import MemberHeader from "./popup/MemberHeader.vue"

  export default {
    name: "main-list",
    components: {
      TaskFormDetail,
      MemberHeader
    },
    props: {
      canSort: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    computed: {
      listParams() {
        return this.$store.state.taskFilter;
      }
    },
    data() {
      return {
        levelTip: {
          2: "距离deadline不到一天",
          1: "距离deadline不到三天",
          0: "距离deadline大于三天"
        },
        detailIdx: null,
        sortTh: null,
        loading: false,
        tableTitles: [
          {
            title: "任务ID",
            width: 180,
            key: "taskCode",
            orderBy: "taskCode",
            asc: "desc"
          },
          {
            title: "任务名称",
            key: "taskName",
            orderBy: "taskName",
            asc: "desc"
          },
          {
            title: "任务状态",
            width: 120,
            key: "stateNameMe",
            orderBy: "state",
            asc: "desc"
          },
          {
            title: "创建时间",
            width: 120,
            key: "createTime",
            orderBy: "createTime",
            asc: "desc"
          },
          {
            title: "截止时间",
            width: 120,
            key: "endTime",
            orderBy: "endTime",
            asc: "desc"
          },
          {
            title: "创建人",
            width: 120,
            key: "creatorName",
            orderBy: "creatorId",
            asc: "desc"
          },
          {
            title: "当前节点",
            width: 115,
            key: "currentUserName",
            orderBy: "currentUserId",
            asc: "desc"
          },
          {
            title: "下一节点",
            width: 115,
            key: "nextUserName",
            orderBy: "nextUserId",
            asc: "desc"
           }
        ]
      };
    },
    methods: {
      handleReachBottom() {
        alert(1);
      },
      sortData(idx) {
        if (this.canSort) {
          let orderBy = this.tableTitles[idx].orderBy;
          if (this.sortTh === idx) {
            const asc = this.tableTitles[idx].asc;
            if (asc === "desc") {
              this.tableTitles[idx].asc = "asc";
            } else {
              this.tableTitles[idx].asc = "desc";
            }
          } else {
            this.sortTh = idx;
          }
          let data = JSON.parse(JSON.stringify(this.listParams));
          data.orderBy = orderBy;
          data.asc = this.tableTitles[idx].asc;
          data.page = 1;
          this.$store.dispatch("setTaskList", { data });
        }
      },
      toggleRow(data, idx) {
        if (this.detailIdx === idx) {
          this.detailIdx = null;
          this.$store.dispatch("changeTaskDetailStatus", false);
        } else {
          this.detailIdx = idx;
          this.$store.dispatch("changeTaskDetail", data);
          this.$store.dispatch("changeTaskDetailStatus", true);
        }
      }
    },
    mounted() {
      this.sortData(3)
      this.$store.dispatch("changeTaskDetail", this.$route.query);
      this.$store.dispatch("changeTaskDetailStatus", true);
    }
  };
</script>

<style scoped lang="less">
  .main-list {
    cursor: default;
  }
  table {
  }
  th {
    &:hover,
    &.active {
      background-color: #f8f9fa;
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
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
</style>
