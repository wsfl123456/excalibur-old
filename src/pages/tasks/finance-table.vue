<template>
  <div class="main-list-box">
    <table class="main-list">
      <thead>
      <tr>
        <th
          v-for="(item, index) in columns"
          :class="{active: sortTh === index}"
          :key="index"
          @click="sortData(index)"
          :style="{width: item.width + 'px'}">
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
      <template v-for="(item, index) in data">
        <tr @click="toggleRow(item, item.id)" :key="index">
          <td v-for="(_item, _index) in columns" :key="_index">
            <template v-if="_item.key === 'createTime' || _item.key === 'endTime'">
              <div class="table-cell">{{item[_item.key] | filterYear}}</div>
            </template>
            <template v-else-if="_item.key === 'creatorName'">
              <div class="table-cell">
                <member-header :user="{id: item.creatorId, name: item.creatorName, headPic: item.creatorHeadPic}"></member-header>
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
            <template v-else>
              <div class="table-cell">{{item[_item.key]}}</div>
            </template>
          </td>
        </tr>
        <tr v-if="detailIdx === item.id">
          <td :colspan="columns.length">
            <task-form-detail></task-form-detail>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TaskFormDetail from "../../components/TaskFormDetail";
  import MemberHeader from "../../components/popup/MemberHeader.vue"


  export default {
    name: "finance-table",
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    components: {
      TaskFormDetail,
      MemberHeader
    },
    data() {
      return {
        detailIdx: undefined,
        sortTh: undefined,
        columns: [
          {
            title: "合同ID",
            width: 170,
            key: "contactsCode",
            orderBy: "contactsCode",
            asc: "desc"
          },
          {
            title: "合同名称",
            key: "taskName",
            orderBy: "taskName",
            asc: "desc"
          },
          {
            title: "流程状态",
            key: "flowStateName",
            orderBy: "flowState",
            width: 100,
            asc: "desc"
          },
          {
            title: "创建时间",
            key: "createTime",
            orderBy: "createTime",
            width: 110,
            asc: "desc"
          },
          {
            title: "截止时间",
            key: "endTime",
            orderBy: "endTime",
            width: 100,
            asc: "desc"
          },
           {
            title: "创建人",
            key: "creatorName",
            orderBy: "creatorId",
            width: 100,
            asc: "desc"
          },
          {
            title: "当前节点",
            key: "currentUserName",
            orderBy: "currentUserId",
            width: 100,
            asc: "desc"
          },
          {
            title: "下一节点",
            key: "nextUserName",
            orderBy: "nextUserId",
            width: 100,
            asc: "desc"
          }
        ]
      };
    },
    computed: {
      listParams() {
        return this.$store.state.taskFilter;
      },
      toolkitId () {
        return this.$store.state.tasks.toolkitId
      },
      financeFilter () {
        return this.$store.state.tasks.financeFilter
      }
    },
    methods: {
      sortData(idx) {
        let orderBy = this.columns[idx].orderBy;
        if (this.sortTh === idx) {
          const asc = this.columns[idx].asc;
          if (asc === "desc") {
            this.columns[idx].asc = "asc";
          } else {
            this.columns[idx].asc = "desc";
          }
        } else {
          this.sortTh = idx;
        }

        let data = JSON.parse(JSON.stringify(this.listParams));
        data.orderBy = orderBy;
        data.asc = this.columns[idx].asc;
        data.page = 1;
        this.$store.dispatch("setTaskList", { data });
      },
      toggleRow(data, idx) {
        if (this.detailIdx === idx) {
          this.detailIdx = null;
          this.$store.dispatch("changeTaskDetailStatus", false);
        } else {
          this.detailIdx = null;
          setTimeout(() => {
            this.detailIdx = idx;
            this.$store.dispatch("changeTaskDetail", data);
            this.$store.dispatch("changeTaskDetailStatus", true);
          })
        }
      },
      init() {
        this.sortData(3)       // 渲染列表时初始化
      }
    },
    created() {
      this.init()
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
    padding-left: 8px;
    padding-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: normal;
    box-sizing: border-box;
    text-align: left;
  }
</style>
