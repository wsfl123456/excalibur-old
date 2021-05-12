<template>
  <div>
    <ButtonGroup class="type-change g-mb-16 " size="large">
      <Button @click.native="changeType(1)" :class="{'active': currentList === 1}">待我审批</Button>
      <Button @click.native="changeType(2)" :class="{'active': currentList === 2}">申请记录</Button>
    </ButtonGroup>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table" v-if="currentList === 1">
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
          <tr >
            <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click.native.stop="audit(item.id, 2)" class="g-mb-16">审批通过</Button>
                  <Button type="primary" @click.native.stop="audit(item.id, 3)" >审批不通过</Button>
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  <template >
                    {{item[_item.key]}}
                  </template>

                </div>
              </template>
            </td>
          </tr>
          <tr v-if="detailIdx === item.id">
            <td :colspan="tableTitles.length">
              <div class="list-detail">
                <div>
                  <i-form label-position="left" :label-width="100" class="default-form" >
                    <div class="form-group">
                      <div>
                        <FormItem label="问题描述" class="default-form-item" >
                          <i-input type="textarea" readonly v-model="item.detail" :autosize="{minRows: 1, maxRows: 5}" ></i-input>
                        </FormItem>
                      </div>
                      <div>
                        <FormItem label="期望结果" class="default-form-item" >
                          <i-input type="textarea" readonly v-model="item.expect" :autosize="{minRows: 1, maxRows: 5}" ></i-input>
                        </FormItem>
                      </div>
                      <div>
                        <FormItem label="期望完成时间" class="default-form-item" >
                          <DatePicker readonly :value="item.expectTime" transfer class="deadline" type="date"  :clearable="false"></DatePicker>
                        </FormItem>
                      </div>
                    </div>
                  </i-form>
                  <div class="g-ta-r">
                    <template v-if="item.allowCancel">
                      <Button type="primary" size="large" :loading="isSubmit" @click="cancelConfirm">撤销</Button>
                    </template>
                  </div>
                </div>

              </div>

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
          <th :class="{active: sortTh2 === index}" v-for="(item, index) in logTitles" :key="index" @click="sortData2(index)">
            <div class="table-cell">
              {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr @click="toggleRow(item, index)">
            <td v-for="(_item, _index) in logTitles" :key="'td-' + index + '-' + _index">
              <template>
                <div class="table-cell">
                  <template v-if="_item.key === 'lastModifyTime' || _item.key === 'createTime'">
                    {{item[_item.key] || 'null' | filterYear }}
                  </template>
                  <template v-else>
                    {{item[_item.key]}}
                  </template>
                </div>
              </template>
            </td>
          </tr>
          <tr v-if="detailIdx === item.id">
            <td :colspan="logTitles.length">
              <div class="list-detail">
                <div>
                  <i-form label-position="left" :label-width="100" class="default-form" >
                    <div class="form-group">
                      <div>
                        <FormItem label="问题描述" class="default-form-item" >
                          <i-input type="textarea" readonly v-model="item.detail" :autosize="{minRows: 1, maxRows: 5}" ></i-input>
                        </FormItem>
                      </div>
                      <div>
                        <FormItem label="期望结果" class="default-form-item" >
                          <i-input type="textarea" readonly v-model="item.expect" :autosize="{minRows: 1, maxRows: 5}" ></i-input>
                        </FormItem>
                      </div>
                      <div>
                        <FormItem label="期望完成时间" class="default-form-item" >
                          <DatePicker readonly :value="item.expectTime" transfer class="deadline" type="date"  :clearable="false"></DatePicker>

                        </FormItem>
                      </div>
                      <div>
                        <FormItem label="处理结果" class="default-form-item" >
                          <i-input type="textarea" readonly v-model="item.result" :autosize="{minRows: 1, maxRows: 5}" ></i-input>

                        </FormItem>
                      </div>
                    </div>
                  </i-form>
                  <div class="g-ta-r">
                    <template v-if="item.allowCancel">
                      <Button type="primary" size="large" :loading="isSubmit" @click="cancelConfirm">撤销</Button>
                    </template>
                  </div>
                </div>

              </div>

            </td>
          </tr>
        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td :colspan="logTitles.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="isUndo" class-name="" ok-text="确定撤销" :closable="false" @on-ok="cancelApply">
      <h2 slot="header">
        撤销申请
      </h2>
      <div>
        <p>确定撤销设备申请 ？</p>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import {Support} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import SubHeader from '../../components/SubHeader'
  import {ajax} from '../../util/util'
  export default {
    components: {
      SubHeader,
      Toast,
      Loading,
      BCrumb},
    name: 'my-apply',
    data () {
      return {
        crumb: [
          {label: '所需支持'},
          {label: '我的设备'},
          {label: '我的申请'}
        ],
        isUndo: false,
        detailIdx: null,
        sortTh1: null,
        sortTh2: null,
        currentList: 1,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        canLoadMore: true,
        dom: null,
        chDom: null,
        list: [],
        tableTitles: [
          {
            title: '员工编号',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '员工姓名',
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
            key: 'teamName ',
            // asc: 'desc'
          },
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
            title: '设备类型',
            key: 'assetType',
            asc: 'desc'
          },
          {
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
            title: '操作',
            key: 'operate',
            asc: 'desc'
          }
        ],
        logTitles: [
          {
            title: '申请类型',
            key: 'applyTypeName',
            asc: 'desc'
          },
          {
            title: '设备ID',
            key: 'assetNo',
            asc: 'desc'
          },
          {
            title: '设备类型',
            key: 'typeName',
            asc: 'desc'
          },
          {
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
            title: '当前状态',
            key: 'stateName',
            asc: 'desc'
          },
          {
            title: '更新时间',
            key: 'lastModifyTime',
            asc: 'desc'
          }
        ],
        needPageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc'
        }
      }
    },
    methods: {
      cancelConfirm () {
        this.isUndo = true
      },
      cancelApply () {
        this.isSubmit = true
        ajax.post(Support.cancelApply, {id: this.detailIdx})
          .then(res => {
            this.isToast = true
            this.toastMsg = '撤销申请成功'
            this.toastState = 'success'
            setTimeout(() => {
              this.isToast = false
              this.needPageData.page = 1
              this.getList()
            }, 1500)
          })
          .catch(err => {
            this.isToast = true
            this.toastState = null
            this.toastMsg = err.toString()
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .finally(() => {
            this.isSubmit = false
          })
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
        let data = this.needPageData
        data.orderBy = key
        data.asc = this.tableTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getList()
      },
      sortData2 (idx) {
        let key = this.logTitles[idx].key
        if (this.sortTh2 === idx) {
          const asc = this.logTitles[idx].asc
          if (asc === 'desc') {
            this.logTitles[idx].asc = 'asc'
          } else {
            this.logTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh2 = idx
        }
        let data = this.needPageData
        data.orderBy = key
        data.asc = this.logTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getList()
      },
      toggleRow (obj, idx) {
        if (this.detailIdx === obj.id) {
          this.detailIdx = null
        } else {
          this.detailIdx = obj.id
        }
      },
      audit (id, state) {
        this.$http.post(Support.audit, this.qs.stringify({id: id, state: state}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.toastState = 'success'
            this.toastMsg = '审批成功'
          } else {
            this.toastState = null
            this.toastMsg = _data.retMsg
          }
          this.isToast = true
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 0) {
              this.getList()
            }
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      changeType (n) {
        this.currentList = n
        this.needPageData.page = 1
        this.getList()
      },
      getList () {
        let api = Support.needAudit
        if (this.currentList === 2) {
          api = Support.myApply
        }
        this.isLoading = true
        this.$http.post(api, this.qs.stringify(this.needPageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.needPageData.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data || [])
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.needPageData.page--
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
          this.needPageData.page++
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
  .table-cell {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .list-detail {
    position: relative;
    padding: 16px;
    background-color: #ced4da;
    > div {
      padding: 32px 32px 32px 64px;
      background-color: #fff;
      margin-bottom: 16px;
    }
  }
</style>
