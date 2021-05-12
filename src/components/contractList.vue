<!--列表-->
<template>
  <div class="main-list-box">
    <table class="main-list">
      <thead>
      <tr>
        <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" @click="sortData(index)">
          <div class="table-cell">
            {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
          </div>
        </th>
      </tr>
      </thead>
     
    </table>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import BrandDetail from './BrandDetail'
  export default {
    name: 'contract-list',
    components: {
      BrandDetail,
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
        return this.$store.state.brands.filter
      }
    },
    data () {
      return {
        detailIdx: null,
        sortTh: null,
        isLoading: false,
        tableTitles: [
          {
            title: '合同ID',
            key: 'contractID',
            asc: 'desc'
          },
          {
            title: '合同名称',
            key: 'contractName',
            asc: 'desc'
          },
          {
            title: '任务状态',
            key: 'taskStatus',
            asc: 'desc'
          }, {
            title: '流程状态',
            key: 'proStatus',
            asc: 'desc'
          },
          {
            title: '创建人',
            key: 'createdName',
            asc: 'desc'
          },
          {
            title: '创建时间',
            key: 'createdTime',
            asc: 'desc'
          },
          {
            title: '截止时间',
            key: 'endTime',
            asc: 'desc'
          },
          {
            title: '当前节点',
            key: 'currNode',
            asc: 'desc'
          },
          {
            title: '下一节点',
            key: 'nextNode',
            asc: 'desc'
          }
        ]
      }
    },
    methods: {
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
          this.$store.dispatch('setBrandsList', {data, cb: _cb})
        }
      },
      toggleRow (data, idx) {
        if (this.detailIdx === idx) {
          this.detailIdx = null
          this.$store.dispatch('changeBrandDetailStatus', false)
        } else {
          this.detailIdx = idx
          this.$store.dispatch('changeBrandDetail', data)
          this.$store.dispatch('changeBrandDetailStatus', true)
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
