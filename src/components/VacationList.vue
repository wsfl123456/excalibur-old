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
      <tbody v-if="data.length > 0">
      <template v-for="(item, index) in data">
        <tr @click="toggleRow(item, index)">
          <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
            <template v-if="_item.key === 'startTime'">
              <div class="table-cell">
                {{item.startTime | filterYearNSecond}}
                <!--<p class="g-ta-c">至</p>-->
                至
                {{item.endTime | filterYearNSecond}}
              </div>
            </template>
            <template v-else-if="_item.key === 'userId'">
              <div class="table-cell">
                <!--<Avatar icon="person" :src="item.userName"></Avatar>-->
                {{item.userName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'vacationType'">
              <div class="table-cell">
                <!--<Avatar icon="person" :src="item.userName"></Avatar>-->
                {{item.vacationName}}
              </div>
            </template>
            <template v-else>
              <div class="table-cell">
                {{item[_item.key]}}
              </div>
            </template>
          </td>
        </tr>
        <tr v-if="detailIdx === index">
          <td :colspan="tableTitles.length">
            <vacation-detail @on-cancel="reloadData"></vacation-detail>
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
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import VacationDetail from './VacationDetail'
  export default {
    name: 'vacation-list',
    components: {
      VacationDetail,
      Loading
    },
    props: {
      canSort: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array
      }
    },
    computed: {
      listParams () {
        return this.$store.state.vacation.filter
      }
    },
    data () {
      return {
        detailIdx: null,
        sortTh: null,
        isLoading: false,
        tableTitles: [
          {
            title: '姓名',
            key: 'userId',
            asc: 'desc',
            width: 135
          },
          {
            title: '请假类型',
            key: 'vacationType',
            asc: 'desc',
            width: 110
          },
          {
            title: '请假时间',
            key: 'startTime',
            asc: 'desc',
            width: 220
          },
          {
            title: '请假天数',
            key: 'dayCountE2',
            asc: 'desc',
            width: 110
          },
          {
            title: '请假理由',
            key: 'reason',
            asc: 'desc'
          },
          {
            title: '事业部',
            key: 'teamName',
            width: 120
          },
          {
            title: '职能',
            key: 'functionId',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'auditStatus',
          },
          {
            title: '当前节点',
            key: 'currentUserName',
            width: 120
          }
        ]
      }
    },
    methods: {
      reloadData () {
        this.$emit('on-reload')
        this.detailIdx = null
      },
      handleReachBottom () {
        // alert(1)
      },
      sortData (idx) {
        if (this.canSort) {
          this.isLoading = true

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
          let data = JSON.parse(JSON.stringify(this.listParams))
          data.orderBy = key
          data.asc = this.tableTitles[idx].asc
          let _cb = (data, code) => {
            this.isLoading = false
            if (code === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }
          this.$store.dispatch('setVacationList', {data, cb: _cb})
        }
      },
      toggleRow (data, idx) {
        if (this.detailIdx === idx) {
          this.detailIdx = null
          this.$store.dispatch('changeVacationDetailStatus', false)
        } else {
          this.detailIdx = idx
          this.$store.dispatch('changeVacationDetail', data)
          this.$store.dispatch('changeVacationDetailStatus', true)
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
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
  }
  th {
    text-align: left;
    background-color: #fff;
    font-size: 12px;
    color: #868e96;
    font-weight: normal;
    border: 1px solid #e9ecef;
    height: 32px;
    &:hover, &.active {
      background-color: #f8f9fa;
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
    font-size: 14px;
    color: #343a40;
    height: 48px;
    border-bottom: 1px solid #e9ecef;
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
