<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addDevice"><Icon type="plus-circled" size="20"></Icon> 新增设备类型</Button>
    </div>

    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th v-for="(item, index) in tableConf" :key="index" :class="{active: sortTh === index}">
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr v-if="editId !== item.id">
            <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click="editDevice(item.id)">编辑</Button>
                  <Button type="primary" @click="delDeviceConfirm(item.id)">删除</Button>
                </div>
              </template>
              <template v-else-if="_item.key === 'right'">
                <div class="table-cell">
                  <template v-for="(rightItem, rightIdx) in item[_item.key]">
                    {{rightItem.name}}
                    <template v-if="rightIdx !== item[_item.key].length - 1">
                      ；
                    </template>
                  </template>
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  {{item[_item.key]}}
                </div>
              </template>
            </td>
          </tr>
          <tr v-else class="edit-tr">
            <td :colspan="tableConf.length - 1">
              <div class="table-cell">
                <i-input placeholder="设备类型名称" v-model="item.name"></i-input>

                <span class="edit-opt-tit">状态：</span>
                <RadioGroup v-model="item.state">
                  <Radio label="1">显示</Radio>
                  <Radio label="2">隐藏</Radio>
                </RadioGroup>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <Button type="primary" @click="save(item)">保存</Button>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td :colspan="tableConf.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delDevice" :closable="false">
      <p>确定删除设备？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import Toast from '../../../components/popup/Toast'
  import Loading from '../../../components/popup/Loading'
  import {Sys} from '../../../API/api'
  import SubHeader from '../../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, Loading, Toast, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '功能配置管理'},
          {label: '设备类型'}
        ],
        sortTh: null,
        tableConf: [
          {
            title: '编号',
            key: 'id',
            asc: 'desc'
          },
          {
            title: '设备类型',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'stateName',
            asc: 'desc'
          },
          {
            title: '创建人',
            key: 'createName',
            asc: 'desc'
          },
          {
            title: '创建时间',
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ],
        list: [],
        isToast: false,
        toastMsg: null,
        toastState: null,
        isLoading: false,
        dom: null,
        chDom: null,
        canLoadMore: true,
        delId: null,
        editId: null,
        isModal: false,
        pageConf: {
          page: 1,
          pageSize: 20
        }
      }
    },
    methods: {
      sortData (idx) {
        let key = this.tableConf[idx].key
        if (key === 'operate') {
          return
        }
        if (this.sortTh === idx) {
          const asc = this.tableConf[idx].asc
          if (asc === 'desc') {
            this.tableConf[idx].asc = 'asc'
          } else {
            this.tableConf[idx].asc = 'desc'
          }
        } else {
          this.sortTh = idx
        }
        let data = this.pageConf
        data.orderBy = key
        data.asc = this.tableConf[idx].asc
        data.page = 1
        this.pageConf = data
        this.getList()
      },
      addDevice () {
        const tpl = {
          name: '',
          id: 'new_add',
          state: ''
        }
        this.editId = tpl.id

        if (this.list[0].id !== 'new_add') {
          this.list.unshift(tpl)
        }
      },
      save (item) {
        if (this.editId === 'new_add') {
          let _data = {
            value: {
              name: item.name,
              state: item.state
            }
          }
          this.$http.post(Sys.addDevice, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            const _data = res.data
            if (_data.retCode === 0) {
              this.isToast = true
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.pageConf.page = 1
              this.getList()
            } else {
              this.isToast = true
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastState = null
              this.toastMsg = null
            }, 1500)
          })
        } else {
          let _data = {
            id: item.id,
            value: {
              name: item.name,
              state: item.state
            }
          }
          this.$http.post(Sys.editDevice, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            const _data = res.data
            if (_data.retCode === 0) {
              this.isToast = true
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.editId = null
              this.pageConf.page = 1
              this.getList()
            } else {
              this.isToast = true
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastState = null
              this.toastMsg = null
            }, 1500)
          })
        }
      },
      delDevice () {
        this.$http.post(Sys.delDevice, this.qs.stringify({id: this.delId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '删除成功'
            this.toastState = 'success'
            let listIdx
            for (let i = 0; i < this.list.length; i++) {
              let item = this.list[i]
              if (item.id === this.delId) {
                listIdx = i
                break
              }
            }
            this.list.splice(listIdx, 1)
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
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
      delDeviceConfirm (id) {
        this.delId = id
        this.isModal = true
      },
      editDevice (id) {
        if (this.editId === 'new_add') {
          this.list.shift()
        }
        this.editId = id
      },
      getList () {
        this.isLoading = true
        this.$http.post(Sys.deviceList, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.list = _data.retData.data
          }
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.pageConf.page++
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
  .result-list {
    position: relative;
  }
  .edit-tr {
    .table-cell {
      display: flex;
      align-items: center;
      .ivu-input-wrapper {
        width: 20%;
        margin-right: 32px;
      }
      .ivu-checkbox-group {
        .ivu-checkbox-group-item {
          margin-right: 16px;
        }
      }
    }
  }
</style>
