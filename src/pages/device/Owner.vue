<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输设备号或者用户姓名按回车进行查询" v-model="pageData.research" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
      </Row>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th :class="{active: sortTh === index}" v-for="(item, index) in deviceTableTitles" :key="index" >
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr>
            <td v-for="(_item, _index) in deviceTableTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click.native="edit(item.id)" v-if="editNo !== item.id">编辑</Button>
                  <Button type="primary" @click.native="save" v-else>保存</Button>
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  <template v-if="editNo !== item.id">
                    <template v-if="_item.key === 'changeTime'">
                      {{item[_item.key] | filterYear}}
                    </template>
                    <template v-else-if="_item.key === 'changeLog'" >
                      <div v-html="$options.filters.newLine(item[_item.key], ';')" style="word-break: normal; word-wrap: normal;"></div>
                    </template>
                    <template v-else>
                      {{item[_item.key]}}
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="_item.key === 'userName'">
                      <common-member content="选择所有者" :users="[{name: item.userName, id: item.userId}]" @on-change="changeOwer($event, index)" exit-txt="变更所有者"></common-member>
                    </template>
                    <template v-else>
                      <Tooltip transfer content="不可编辑">
                        <i-input v-model="item[_item.key]" readonly></i-input>
                      </Tooltip>
                    </template>
                  </template>
                </div>
              </template>

            </td>
          </tr>
        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td :colspan="deviceTableTitles.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Device} from '../../API/api'
  import CommonMember from '../../components/CommonMember'
  export default {
    components: {
      CommonMember,
      Loading,
      Toast,
      BCrumb},
    name: 'owner',
    data () {
      return {
        crumb: [
          {label: '设备管理'},
          {label: '设备管理'},
          {label: '所有者管理'}
        ],
        editNo: null,
        canLoadMore: true,
        searchValue: '',
        dom: null,
        chDom: null,
        isLoading: false,
        isToast: false,
        toastState: null,
        toastMsg: null,
        list: [],
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          research: ''
        },
        changeedOwner: {
          eid: null,
          userId: null
        },
        sortTh: null,
        deviceTableTitles: [
          {
            title: '设备ID',
            key: 'assetNo',
            asc: 'desc'
          },
          {
            title: '部门',
            key: 'department',
            asc: 'desc'
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '所有者',
            key: 'userName',
            asc: 'desc'
          }, {
            title: '变更时间',
            key: 'changeTime',
            asc: 'desc'
          },
          {
            title: '变更日志',
            key: 'changeLog',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      sortData (idx) {
        let key = this.deviceTableTitles[idx].key
        if (this.sortTh === idx) {
          const asc = this.deviceTableTitles[idx].asc
          if (asc === 'desc') {
            this.deviceTableTitles[idx].asc = 'asc'
          } else {
            this.deviceTableTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh = idx
        }
        let data = this.pageData
        data.orderBy = key
        data.asc = this.deviceTableTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getList()
      },
      search (e) {
        if (e.keyCode === 13) {
          this.pageData.page = 1
          this.getList()
        }
      },
      edit (id) {
        if (this.editNo === 'new_add') {
          this.list.shift()
        }
        this.editNo = id
      },
      changeOwer (data, idx) {
        if (!this._.isEmpty(data)) {
          this.list[idx].userCode = data.userCode
          this.list[idx].userId = data.id
          this.list[idx].userName = data.userName
          this.list[idx].department = data.departmentName
          this.changeedOwner.eid = this.editNo
          this.changeedOwner.userId = data.id
        }
      },
      save () {
        let saveApi = Device.ownerChange
        this.editNo = null
        if (!this.changeedOwner.eid && !this.changeedOwner.userId) {
          return
        }
        this.$http.post(saveApi, this.qs.stringify(this.changeedOwner), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.changeedOwner.eid = null
          this.changeedOwner.userId = null
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '保存成功'
            this.toastState = 'success'
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
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
      getList () {
        this.isLoading = true
        this.$http.post(Device.all, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.pageData.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data || [])
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageData.page--
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.pageData.page++
          this.getList()
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    created () {
      this.getList()
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    }
  }
</script>

<style scoped lang="less">
  .common-table {
    .table-cell {
      overflow: visible;
    }
  }
  .result-list {
    position: relative;
  }
</style>
