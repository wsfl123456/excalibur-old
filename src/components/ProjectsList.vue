<!--列表-->
<template>
  <div class="main-list-box">
    <table class="main-list">
      <thead>
      <tr>
        <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" @click="sortData(index)" :style="{'width': item.width + 'px'}">
          <div class="table-cell">
            {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-if="data.length > 0">
      <!--<template v-for="(item, index) in data" :key="'data-' + index" >-->
      <template v-for="(item, index) in data">
        <tr @click="toggleRow(item, item.id)">
          <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
            <template v-if="_item.key === 'state'">
              <div class="table-cell">
                {{item.stateName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'customerId'">
              <div class="table-cell">
                {{item.customerName}}
              </div>
            </template>
            <template v-else-if="_item.key === 'creatorId'">
              <div class="table-cell">
                <member-header :user="{id: item.creatorId, name: item.creatorName, headPic: item.headPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'auditorId'">
              <div class="table-cell">
                <member-header v-if="[1, 2, 3, 4, 5].indexOf(item.state) != -1" :user="{id: item.auditId, name: item.auditorName, headPic: item.auditorHeadPic}"></member-header>
              </div>
            </template>
            <template v-else-if="_item.key === 'createTime'">
              <div class="table-cell">
                {{item[_item.key] | filterYear}}
              </div>
            </template>
            <template v-else-if="_item.key === 'endTime'">
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
            <project-detail></project-detail>
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
  import ProjectDetail from './ProjectDetail'
  import Loading from './popup/Loading'
  import MemberHeader from './popup/MemberHeader.vue'
  export default {
    name: 'projects-list',
    components: {
      Loading,
      ProjectDetail,
      MemberHeader},
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
        return this.$store.state.projects.filter
      }
    },
    data () {
      return {
        detailIdx: null,
        sortTh: null,
        isLoading: false,
        tableTitles: [
          {
            title: '项目ID',
            key: 'projectCode',
            asc: 'desc',
            width: 140
          },
          {
            title: '品牌名称',
            key: 'customerId',
            asc: 'desc',
            width: 120
          },
          {
            title: '项目名称',
            key: 'name',
            asc: 'desc'
          },

          {
            title: '项目状态',
            key: 'state',
            asc: 'desc',
            width: 135
          },
          {
            title: '审核人',
            key: 'auditorId',
            // asc: 'desc',
            width: 100
          },
          {
            title: '创建时间',
            key: 'createTime',
            asc: 'desc',
            width: 130
          },
          {
            title: '截止时间',
            key: 'endTime',
            asc: 'desc',
            width: 130
          },
          {
            title: '创建者',
            key: 'creatorId',
            asc: 'desc',
            width: 100
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
          data.page = 1
          let _cb = (data, code) => {
            this.isLoading = false
            if (code === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }
          this.$store.dispatch('setProjectsList', {data, cb: _cb})
        }
      },
      toggleRow (data, id) {
        if (this.detailIdx === id) {
          this.detailIdx = null
          this.$store.dispatch('changeProjectDetailStatus', false)
        } else {
            const vm = this
            vm.detailIdx = null
            vm.$store.dispatch('changeProjectDetailStatus', false)
            setTimeout(function() {
              vm.detailIdx = id
              vm.$store.dispatch('changeProjectDetail', data)
              vm.$store.dispatch('changeProjectDetailStatus', true)
            })
          
        }
      }
    },
    mounted() {
          this.detailIdx = +this.$route.query.id;
          this.$store.dispatch('changeProjectDetail', this.$route.query)
          this.$store.dispatch('changeProjectDetailStatus', false)
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
  }
  th {
    text-align: left;
    /*background-color: #fff;*/
    /*font-size: 12px;*/
    color: #868e96;
    font-weight: normal;
    /*border: 1px solid #e9ecef;*/
    height: 32px;
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
