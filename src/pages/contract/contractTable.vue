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

  export default {
    name: "contract-table",
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        detailIdx: undefined,
        sortTh: undefined,
        columns: [
          {
            title: "合同ID",
            width: 180,
            key: "contactsCode",
            asc: "desc"
          },
          {
            title: "合同名称",
            key: "taskName",
            asc: "desc"
          },
          {
            title: "任务状态",
            key: "stateNameMe",
            asc: "desc"
          },
          {
            title: "流程状态",
            key: "flowStateName",
            asc: "desc"
          },
          {
            title: "创建人",
            key: "creatorName",
            asc: "desc"
          },
          {
            title: "创建时间",
            key: "createTime",
            asc: "desc"
          },
          {
            title: "截止时间",
            key: "endTime",
            asc: "desc"
          },
          {
            title: "当前节点",
            key: "auditorName",
            asc: "desc"
          },
          {
            title: "下一节点",
            key: "nextNode",
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
        let key = this.columns[idx].key;
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
        data.orderBy = key;
        data.asc = this.tableTitles[idx].asc;
        data.page = 1;
        this.$store.dispatch("setTaskList", { data });
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
    components: {
      TaskFormDetail
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
