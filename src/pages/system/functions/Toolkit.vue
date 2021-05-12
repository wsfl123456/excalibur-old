<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addToolkit"><Icon type="plus-circled" size="20"></Icon> 添加工具包</Button>
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
          <tr v-if="editId !== item.id" @click="toggleDetail(item.id, item)">
            <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click.stop="editTK(item.id, item)">编辑</Button>
                  <Button type="primary" @click="delTKConfirm(item.id)">删除</Button>
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
                <i-input placeholder="输入工具包名称" v-model="item.toolkitName"></i-input>
                <i-input placeholder="显示顺序" v-model="item.sort"></i-input>
                <Select transfer v-model="item.functionId">
                  <Option v-for="fnitem in allTKFn" :value="fnitem.id" :key="fnitem.id">{{ fnitem.name }}</Option>
                </Select>
                <Select transfer v-model="item.productId">
                  <Option v-for="proitem in allTKProduct" :value="proitem.id" :key="proitem.id">{{ proitem.name }}</Option>
                </Select>
                <span class="edit-opt-tit">状态：</span>
                <RadioGroup v-model="item.state">
                  <Radio :label="1">启动</Radio>
                  <Radio :label="2">停用</Radio>
                </RadioGroup>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <Button type="primary" @click="save(item)">保存</Button>
              </div>
            </td>
          </tr>
          <tr v-if="detailId === item.id">
            <td :colspan="tableConf.length">
              <div class="list-detail">
                <div>
                  <RadioGroup v-model="editType" v-if="editId === item.id" class="g-mb-16" @on-change="changeEditType">
                    <Radio label="1">关联辅助工具包</Radio>
                    <Radio label="0">无关联</Radio>
                  </RadioGroup>
                  <i-form label-position="left" :label-width="120" class="default-form">
                    <div class="form-group">
                      <div >
                        <FormItem label="关联工具包名称" class="default-form-item">
                          <i-input placeholder="关联工具包名称" :readonly="editId !== item.id" v-model="fileName"></i-input>
                        </FormItem>
                      </div>
                      <div >
                        <FormItem label="关联工具包内容" class="default-form-item">
                          <i-input type="textarea" placeholder="请输入相关的Tips、Template、指示说明等信息。" :readonly="editId !== item.id"  v-model="fileAddress"></i-input>
                        </FormItem>
                      </div>
                    </div>
                    <!--<div class="form-group" v-else-if="!item.content">-->
                      <!--<div >-->
                        <!--<FormItem label="关联工具包名称" class="default-form-item">-->
                          <!--<i-input placeholder="关联工具包名称" :readonly="editId !== item.id" value="无"></i-input>-->
                        <!--</FormItem>-->
                      <!--</div>-->
                      <!--<div >-->
                        <!--<FormItem label="关联工具包内容" class="default-form-item">-->
                          <!--<i-input type="textarea" placeholder="请输入相关的Tips、Template、指示说明等信息。" :readonly="editId !== item.id"  value="无"></i-input>-->
                        <!--</FormItem>-->
                      <!--</div>-->
                    <!--</div>-->
                  </i-form>
                </div>
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
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delToolkit" :closable="false">
      <p>确定删除工具包？</p>
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
          {label: '工具包管理'}
        ],
        sortTh: null,
        fileAddress: '无',
        fileName: '无',
        tableConf: [
          {
            title: '编号',
            key: 'id',
            asc: 'desc'
          },
          {
            title: '工具包名称',
            key: 'toolkitName',
            asc: 'desc'
          },
          {
            title: '关联职能',
            key: 'functionName',
            asc: 'desc'
          },
          {
            title: '关联产品',
            key: 'productName',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'stateName',
            asc: 'desc'
          },
          {
            title: '排序',
            key: 'sort',
            asc: 'desc'
          },
          {
            title: '创建人',
            key: 'creatorName',
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
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isModal: false,
        canLoadMore: true,
        pageConf: {
          page: 1,
          pageSize: 20
        },
        editType: '0',
        allTKProduct: [],
        allTKFn: [],
        detailId: null,
        editId: null,
        delId: null
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
      changeEditType () {
        if (this.editType === '0') {
          this.fileAddress = '无'
          this.fileName = '无'
        }
      },
      save (item) {
        if (this.editId === 'new_add') {
          let _data = {
            toolkitName: item.toolkitName,
            functionId: item.functionId,
            productId: item.productId,
            state: item.state,
            sort: item.sort,
            content: {
              fileName: this.fileName,
              fileAddress: this.fileAddress
            }
          }
          if (this.editType === '0') {
            _data.content = null
          }
          this.$http.post(Sys.addToolkit, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
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
              this.toastMsg = null
              if (_data.retCode === 100014) {
                this.$cookie.delete('token')
                this.$router.push('/')
              }
            }, 1500)
          })
        } else {
          let _data = {
            id: item.id,
            toolkitName: item.toolkitName,
            functionId: item.functionId,
            productId: item.productId,
            state: item.state,
            sort: item.sort,
            content: {
              fileName: this.fileName,
              fileAddress: this.fileAddress
            }
          }
          if (this.editType === '0') {
            _data.content = null
          }
          this.$http.post(Sys.editToolkit, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            if (_data.retCode === 0) {
              this.isToast = true
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.pageConf.page = 1
              this.editId = null
              this.getList()
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
        }
      },
      addToolkit () {
        const tpl = {
          id: 'new_add',
          content: {
            fileName: this.fileName = '无',
            fileAddress: this.fileAddress = '无'
          },
          productId: null,
          functionName: null,
          state: null,
          toolkitName: ''
        }
        if (this.list[0].id !== 'new_add') {
          this.list.unshift(tpl)
        }
        this.editId = tpl.id
        this.detailId = tpl.id
      },
      editTK (id, item) {
        if (this.editId === 'new_add') {
          this.list.shift()
        }
        this.editId = id
        this.detailId = id
        if (item.content) {
          this.fileAddress = item.content.fileAddress
          this.fileName = item.content.fileName
        } else {
          this.fileAddress = '无'
          this.fileName = '无'
        }
        this.editType = (!item.content || item.content === '') ? '0' : '1'
      },
      delTKConfirm (id) {
        this.isModal = true
        this.delId = id
      },
      toggleDetail (id, item) {
        this.detailId === id ? this.detailId = null : this.detailId = id
        if (item.content) {
          this.fileAddress = item.content.fileAddress
          this.fileName = item.content.fileName
        }
      },
      delToolkit () {
        this.$http.post(Sys.delToolkit, this.qs.stringify(this.delId), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '删除成功'
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
      getAllOpt () {
        const posts = [this.getTKFn(), this.getTKProduct()]
        this.$http.all(posts).then(this.$http.spread((TKFn, TKProduct) => {
          let fnData = TKFn.data
          let proData = TKProduct.data
          this.allTKFn = fnData
          this.allTKProduct = proData
        }))
      },
      getTKFn () {
        return this.$http.post(Sys.allToolkitFn, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
      },
      getTKProduct () {
        return this.$http.post(Sys.allProduct, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
      },
      getList () {
        this.isLoading = true
        this.$http.post(Sys.toolkitList, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            if (this.pageConf.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data || [])
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageConf.page--
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
      this.getAllOpt()
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
  .addBtn {
    button {
      padding-top: 0;
      padding-bottom: 0;
      display: inline-block;
      width: 120px;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      /*line-height: 40px;*/
      text-decoration: none;
      color: #fff;
      font-size: 14px;
    }
  }
  .result-list {
    position: relative;
  }
  .list-detail {
    position: relative;
    padding: 16px;
    background-color: #ced4da;
    > div:not(.nopass) {
      padding: 32px 32px 32px 64px;
      background-color: #fff;
      margin-bottom: 16px;
    }
  }
  .edit-tr {
    .table-cell {
      display: flex;
      align-items: center;
      .edit-opt-tit {
        white-space: nowrap;
      }
      .ivu-input-wrapper {
        width: 20%;
        margin-right: 16px;
      }
      .ivu-select {
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
