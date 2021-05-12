<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输设备号或者用户姓名按回车进行查询" v-model="listParams.research" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
      </Row>
    </div>
    <ButtonGroup class="type-change g-mb-16 " size="large">
      <Button @click.native="changeType(1)" :class="{'active': listParams.state === 1}">待处理</Button>
      <Button @click.native="changeType(2)" :class="{'active': listParams.state === 2}">处理中</Button>
      <Button @click.native="changeType(3)" :class="{'active': listParams.state === 3}">已结束</Button>
    </ButtonGroup>
    <div class="result-list">

      <loading v-if="isLoading"></loading>
      <table class="main-list common-table" v-if="listParams.state !== 3">
        <thead>
        <tr>
          <th :class="{active: sortTh1 === index}" v-for="(item, index) in tableTitles" :key="index" >
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr>
            <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click.native="changeState(item.id, 2)" v-if="item['state'] === 1">受理中</Button>
                  <Button type="primary" @click.native="openResult(item.id, 3)" v-else-if="item['state'] === 2">处理完成</Button>
                  <Button type="primary" @click.native="changeState(item.id, 1)" v-else-if="item['state'] === 3">Re-Open</Button>
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  <template v-if="editNo !== item.id">
                    <template v-if="_item.key === 'createTime'">
                      {{item[_item.key] | filterYear}}
                    </template>
                    <template v-else-if="_item.key === 'expectTime'">
                      {{item[_item.key] | filterYear}}
                    </template>
                    <template v-else>
                      {{item[_item.key]}}
                    </template>

                  </template>
                  <template v-else>
                    <i-input v-model="item[_item.key]" type="textarea" v-if="_item.key === 'detail'"></i-input>
                    <i-input v-model="item[_item.key]" v-else></i-input>
                  </template>
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
      <table class="main-list common-table" v-else>
        <thead>
        <tr>
          <th :class="{active: sortTh2 === index}" v-for="(item, index) in resultTitles" :key="index"  @click="sortData2(index)">
            <div class="table-cell">
              {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr>
            <td v-for="(_item, _index) in resultTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click.native="changeState(item.id, 2)" v-if="item['state'] === 1">受理中</Button>
                  <Button type="primary" @click.native="openResult(item.id, 3)" v-else-if="item['state'] === 2">处理完成</Button>
                  <Button type="primary" @click.native="changeState(item.id, 1)" v-else-if="item['state'] === 3">Re-Open</Button>
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  <template v-if="editNo !== item.id">
                    <template v-if="_item.key === 'createTime'">
                      {{item[_item.key] | filterYear}}
                    </template>
                    <template v-else-if="_item.key === 'expectTime'">
                      {{item[_item.key] | filterYear}}
                    </template>
                    <template v-else>
                      {{item[_item.key]}}
                    </template>

                  </template>
                  <template v-else>
                    <i-input v-model="item[_item.key]" type="textarea" v-if="_item.key === 'detail'"></i-input>
                    <i-input v-model="item[_item.key]" v-else></i-input>
                  </template>
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
    <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="处理结果"></i-input>
      <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click.native="changeState(finishId, finishState, modalValue)" :disabled="modalValue.length > 1000">提交</Button>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import BCrumb from '../../components/BCrumb'
  import {Device} from '../../API/api'
  export default {
    components: {
      BCrumb,
      Toast,
      Loading},
    name: 'repair',
    data () {
      return {
        crumb: [
          {label: '设备管理'},
          {label: '报修管理'}
        ],
        modalValue: '',
        isModal: false,
        editNo: null,
        canLoadMore: true,
        searchValue: '',
        dom: null,
        chDom: null,
        isLoading: false,
        finishId: null,
        finishState: null,
        isToast: false,
        toastState: null,
        toastMsg: null,
        nopassState: null,
        list: [],
        pageData: {
          page: 1,
          perPage: 25,
          orderBy: 'createTime',
          asc: 'desc'
        },
        sortTh1: null,
        sortTh2: null,
        listParams: {
          // applyType: 1,
          pageSize: 25,
          page: 1,
          orderBy: 'createTime',
          asc: 'desc',
          state: 1,
          research: ''
        },
        resultTitles: [
          {
            title: '申请类型',
            key: 'applyTypeName',
            asc: 'desc'
          },
          {
            title: '资产编号',
            key: 'assetNo',
            asc: 'desc'
          },
          {
            title: '报修种类',
            key: 'typeName',
            asc: 'desc'
          }, {
            title: '问题描述',
            key: 'detail',
            asc: 'desc'
          },
          {
            title: '申请时间',
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '报修人',
            key: 'userName',
            asc: 'desc'
          },
          {
            title: '部门',
            key: 'departmentName',
            asc: 'desc'
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '处理结果',
            key: 'result',
            asc: 'desc'
          },
          {
            title: '受理人',
            key: 'adminName',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ],
        tableTitles: [
          {
            title: '申请类型',
            key: 'applyTypeName',
            asc: 'desc'
          },
          {
            title: '资产编号',
            key: 'assetNo',
            asc: 'desc'
          },
          {
            title: '报修种类',
            key: 'typeName',
            asc: 'desc'
          }, {
            title: '问题描述',
            key: 'detail',
            asc: 'desc'
          },
          {
            title: '申请时间',
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '期望完成时间',
            key: 'expectTime',
            asc: 'desc'
          },
          {
            title: '报修人',
            key: 'userName',
            asc: 'desc'
          },
          {
            title: '部门',
            key: 'departmentName',
            asc: 'desc'
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '当前状态',
            key: 'stateName',
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
      search (e) {
        if (e.keyCode === 13) {
          this.listParams.page = 1
          this.getList()
        }
      },
      sortData1 (idx) {
        let key = this.tableTitles[idx].key
        if (this.sortTh1 === idx) {
          const asc = this.tableTitles[idx].asc
          if (asc === 'desc') {
            this.tableTitles[idx].asc = 'asc'
          } else {
            this.tableTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh1 = idx
        }
        let data = this.listParams
        data.orderBy = key
        data.asc = this.tableTitles[idx].asc
        data.page = 1
        this.listParams = data
        this.getList()
      },
      sortData2 (idx) {
        let key = this.resultTitles[idx].key
        if (this.sortTh2 === idx) {
          const asc = this.resultTitles[idx].asc
          if (asc === 'desc') {
            this.resultTitles[idx].asc = 'asc'
          } else {
            this.resultTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh2 = idx
        }
        let data = this.listParams
        data.orderBy = key
        data.asc = this.resultTitles[idx].asc
        data.page = 1
        this.listParams = data
        this.getList()
      },
      openResult (id, state) {
        this.finishId = id
        this.finishState = state
        this.isModal = true
      },
      changeState (id, state, result) {
        let data = {
          id: id,
          state: state,
          result: result
        }
        this.isModal = false
        this.$http.post(Device.repairState, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '受理成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
            if (_data.retCode === 0) {
              this.getList()
            }
          }, 1500)
        })
      },
      getList () {
        this.isLoading = true
        this.$http.post(Device.applyList, this.qs.stringify(this.listParams), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.listParams.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data || [])
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.listParams.page--
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
      changeType (n) {
        this.listParams.state = n
        this.listParams.page = 1
        this.getList()
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.listParams.page++
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
  .type-change {
    .active {
      background-color: #2d8ef8;
      color: #fff;
    }
  }
  .result-list {
    position: relative;
  }

</style>
