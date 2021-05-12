<template>
  <div>
    <div class="list-box">
      <div class="list-box-list">
        <div class="list-filter">
          <div class="filter-box">
            <RadioGroup type="button" :value="pageConf.state" @on-change="stateFilter">
              <Radio v-for="(item, index) in taskStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
            </RadioGroup>
          </div>
          <div class="filter-box">
            <RadioGroup type="button" :value="pageConf.functionType" @on-change="fnTypeFilter">
              <Radio v-for="(item, index) in myStatus" :key="index" :label="item.id" :disabled="index===0">{{item.name}}</Radio>
            </RadioGroup>
          </div>
        </div>

        <div class="list-box">
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
                    <template v-else-if="_item.key === 'operationId'">
                      <div class="table-cell">
                        <Avatar :icon="item.operationName ? '' : 'person'"  :src="item.operationHeadPic">{{item.operationName ? item.operationName.substr(0,2) : ''}}</Avatar>
                      </div>
                      <div class="table-cell">
                        <Tooltip :content="levelTip[item.level]" placement="top" v-if="item.state !== 8">
                          <Icon type="ios-flag" size="20" :color="parseInt(item.level) === 2 ? '#ff8685' : parseInt(item.level) === 1 ? '#ffe15b' : '#89ea97'"></Icon>
                        </Tooltip>                      </div>
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
          <loading v-if="isLoading"></loading>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import ListFilter from '../../components/ListFilter'
  import MainList from '../../components/MainList'
  import {Task} from '../../API/api'
  import BCrumb from '../../components/BCrumb'

  export default {
    name: '',
    components: {BCrumb, MainList, ListFilter, Loading, Toast},
    data () {
      return {
        levelTip: {
          2: '距离deadline不到一天',
          1: '距离deadline不到三天',
          0: '距离deadline大于三天'
        },
        isLoading: false,
        isToast: false,
        toastMsg: '',
        data: [],
        sortTh: null,
        crumb: [
          {
            label: '首页'
          },
          {
            label: '紧急任务'
          }
        ],
        taskStatus: [
          {name: '任务状态'},
          {name: '全部', id: 0},
          {name: '待审核', id: 1},
          {name: '审核不通过', id: 2},
          // {name: '待启动', id: 3},
          {name: '执行中', id: 4},
          {name: '待质检', id: 5},
          {name: '质检通过', id: 6},
          {name: '质检不通过', id: 7},
          {name: 'PM审核通过', id: 8},
          {name: 'PM审核不通过', id: 9}
        ],
        myStatus: [
          {name: '我的任务'},
          {name: '全部', id: 0},
          {name: '我发起的', id: 1},
          {name: '我审核的', id: 2},
          {name: '我负责的', id: 3},
          {name: '我质检的', id: 4}
        ],
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
            title: '任务状态',
            width: 150,
            key: 'state',
            asc: 'desc'
          },
          {
            title: '创建时间',
            width: 150,
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '截止时间',
            width: 150,
            key: 'endTime',
            asc: 'desc'
          },
          {
            title: '执行者',
            width: 150,
            key: 'operationId',
            asc: 'desc'
          }
        ],
        pageConf: {
          page: 1,
          page_size: 25,
          orderBy: 'createTime',
          asc: 'desc',
          state: 0,
          functionType: 0,
          toolkitId: null,
          projectId: null
        },
        canLoadMore: true,
        dom: null,
        chDom: null
      }
    },
    methods: {
      sortData (idx) {
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
        this.pageConf.orderBy = key
        this.pageConf.asc = this.tableTitles[idx].asc
        this.pageConf.page = 1
        this.getTodayTask()
      },
      fnTypeFilter (id) {
        this.pageConf.page = 1
        this.pageConf.functionType = id
        this.getTodayTask()
      },
      stateFilter (id) {
        this.pageConf.page = 1
        this.pageConf.state = id
        this.getTodayTask()
      },
      changeFilter (v) {
        this.isLoading = v
      },
      clearNav () {
        this.$store.dispatch('setCurrSubMenu', null)
      },
      toggleRow (item, id) {
        const url = `tasks/list/${item.projectId}`
        this.$router.push(url)
        this.$store.dispatch('setCurrSubMenu', url)
      },
      getTodayTask () {
        this.isLoading = true
        this.$http.post(Task.todayTask, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            if (this.pageConf.page === 1) {
              this.data = _data.retData.taskInfo.data
            } else {
              if (_data.retData.taskInfo.data.length > 0) {
                this.data = this.data.concat(_data.retData.taskInfo.data)
              } else {
                this.pageConf.page--
                this.isToast = true
                this.toastMsg = '没有更多'
              }
            }
          } else if (_data.retCode === 100023) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else if (_data.retCode === 100014) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      init () {
        this.clearNav()
        this.getTodayTask()
        this.canLoadMore = true
        this.getTodayTask()
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          // this.page = this.page + 1
          this.pageConf.page++
          this.getTodayTask()
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    },
    created () {
      this.init()
    },
    beforeUpdate () {
    },
    updated () {
    },
    beforeDestroy () {
      // this.canLoadMore = false
      this.unbindLoadMore()
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
  .list-filter {
    margin-bottom: 16px;
  }
  .filter-box {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding-left: 108px;
    position: relative;
    margin-bottom: -1px;
    .ivu-radio-group {
      margin-bottom: -1px;
    }
    .ivu-radio-wrapper {
      font-size: 14px;
      color: #343a40;
      background-color: #f8f9fa;
      height: 40px;
      line-height: 40px;
      width: 108px;
      text-align: center;
      padding: 0;
      border: 0 none;
      border-right: 1px solid #e9ecef;
      transition: none;
      border-radius: 0;
      border-bottom: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      margin-left: -1px;
      &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
        color: #2d8ef8;
        background-color: #fff;

      }
      &:first-child {
        position: absolute;
        left: 0;
        top: 0;
        border-right: 0 none;

      }
    }
    .ivu-radio-wrapper-disabled {
      background-color: #fff;
    }
    .ivu-radio-wrapper-checked {
      background-color: #107cd9;
      box-shadow: 0 0 0;
      border-color: #107cd9;
      color: #fff;
    }
  }
</style>
