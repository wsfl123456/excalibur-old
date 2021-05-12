<!--列表-->
<template>
  <div class="main-list-box">
    <table class="main-list">
      <thead>
      <tr>
        <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" @click="sortData(index)" :style="{width: item.width + 'px'}">
          <div class="table-cell">
            {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="data && data.length > 0">
      <!--<template v-for="(item, index) in data" :key="'data-' + index" >-->
      <template v-for="(item, index) in data"  >
        <tr @click="toggleRow(item, item.id)">
          <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
            <template v-if="_item.key === 'state'">
              <div class="table-cell">
                {{item.stateName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'creatorId'">
              <div class="table-cell">
                {{item.creatorName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'auditorId'">
              <div class="table-cell">
                {{item.auditorName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'customerId'">
              <div class="table-cell">
                {{item.customerName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'projectId'">
              <div class="table-cell">
                {{item.projectName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'createTime' || _item.key === 'endTime'">
              <div class="table-cell">
                {{item[_item.key] | filterYear}}

              </div>
            </template>
            <template v-else>
              <div class="table-cell">
                {{item[_item.key]}}
              </div>
            </template>
          </td>
        </tr>
        <tr v-if="detailIdx === item.id">
          <td :colspan="tableTitles.length">
            <p-r-form-detail></p-r-form-detail>
          </td>
        </tr>
      </template>
      </tbody>
      <tbody v-else>
      <tr>
        <td :colspan="tableTitles.length" class="empty-data">
          没有数据
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import TaskFormDetail from './TaskFormDetail'
  import PRFormDetail from './PRFormDetail'
  export default {
    name: 'p-r-main-list',
    components: {
      PRFormDetail,
      TaskFormDetail
    },
    props: {
      canSort: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      listParams () {
        return this.$store.state.taskFilter
      }
    },
    data () {
      return {
        levelTip: {
          2: '距离deadline不到一天',
          1: '距离deadline不到三天',
          0: '距离deadline大于三天'
        },
        detailIdx: null,
        sortTh: null,
        loading: false,
        tableTitles: [
          {
            title: '任务ID',
            width: 180,
            key: 'taskCode',
            asc: 'desc'
          },
          {
            title: '任务名称',
            key: 'taskName',
            asc: 'desc'
          },
          {
            title: '品牌',
            key: 'customerId'
          },
          {
            title: '项目名称',
            width: 150,
            key: 'projectId',
            asc: 'desc'
          },
          {
            title: '任务状态',
            key: 'stateNameMe'
          },
          {
            title: '创建时间',
            width: 150,
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '申请人',
            width: 150,
            key: 'creatorId',
            asc: 'desc'
          },
          {
            title: '当前审核节点',
            width: 150,
            key: 'auditorId',
            asc: 'desc'
          }
        ]
      }
    },
    methods: {
      sortData (idx) {
        if (this.canSort && this.tableTitles[idx].hasOwnProperty('asc')) {
          let key = this.tableTitles[idx].key
          if (this.sortTh === idx) {
            const asc = this.tableTitles[idx].asc
            if (asc === 'desc') {
              this.tableTitles[idx].asc = 'asc'
            } else {
              this.tableTitles[idx].asc = 'desc'
            }
          } else {
            this.sortTh = idx
          }
          let _asc = this.tableTitles[idx].asc
          this.$emit('on-sort', {key, asc: _asc})
        }
      },
      toggleRow (data, idx) {
        if (this.detailIdx === idx) {
          this.detailIdx = null
          this.$store.dispatch('changeTaskDetailStatus', false)
        } else {
          this.detailIdx = idx
          this.$store.dispatch('changeTaskDetail', data)
          this.$store.dispatch('changeTaskDetailStatus', true)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .main-list {
    cursor: default;
  }
  table {

  }
  th {
    &:hover, &.active {
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
