<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addMenu"><Icon type="plus-circled" size="20"></Icon> 添加菜单</Button>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th v-for="(item, index) in tableConf" :key="index" :style='{width: item.width ? item.width + "px" : "auto"}'>
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
                  <Button type="primary" @click="editMenu(item.id)">编辑</Button>
                  <Button type="primary" @click="del(item.id)">删除</Button>
                </div>
              </template>
              <template v-else-if="_item.key === 'name'">
                <div class="table-cell name-cell">
                  {{item[_item.key]}}
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
                <i-input placeholder="输入菜单名称" v-model="item.name"></i-input>
                <i-input placeholder="输入菜单url" v-model="item.url"></i-input>
                <i-input placeholder="显示顺序" v-model="item.sort"></i-input>
                <Select transfer v-model="item.parentId">
                  <template v-for="paritem in allMenus">
                    <Option :value="paritem.id" :key="paritem.id">{{ paritem.name }}</Option>
                    <template v-for="childParItem in paritem.children">
                      <Option :value="childParItem.id" :key="childParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;' + childParItem.name }}</Option>
                      <template v-for="grandParItem in childParItem.children">
                        <Option :value="grandParItem.id" :key="grandParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + grandParItem.name }}</Option>
                        <template v-for="greatGrandParItem in grandParItem.children">
                          <Option :value="greatGrandParItem.id" :key="greatGrandParItem.id">
                            {{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + greatGrandParItem.name }}
                          </Option>
                        </template>
                      </template>
                    </template>
                  </template>
                </Select>
                <span>状态：</span>
                <RadioGroup v-model="item.state">
                  <Radio :label="1">显示</Radio>
                  <Radio :label="2">隐藏</Radio>
                </RadioGroup>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <Button type="primary" @click="save(item)">保存</Button>
              </div>
            </td>
          </tr>
          <template v-if="item.children.length > 0" v-for="childItem in item.children">
            <tr v-if="editId !== childItem.id">
              <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
                <template v-if="_item.key === 'operate'">
                  <div class="table-cell">
                    <Button type="primary" @click="editMenu(childItem.id)">编辑</Button>
                    <Button type="primary" @click="del(childItem.id)">删除</Button>
                  </div>
                </template>
                <template v-else-if="_item.key === 'name'">
                  <div class="table-cell name-cell">
                    {{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + childItem[_item.key]}}
                  </div>
                </template>
                <template v-else>
                  <div class="table-cell">
                    {{childItem[_item.key]}}
                  </div>
                </template>
              </td>
            </tr>
            <tr v-else class="edit-tr">
              <td :colspan="tableConf.length - 1">
                <div class="table-cell">
                  <i-input placeholder="输入菜单名称" v-model="childItem.name"></i-input>
                  <i-input placeholder="输入菜单url" v-model="childItem.url"></i-input>
                  <i-input placeholder="显示顺序" v-model="childItem.sort"></i-input>
                  <Select transfer v-model="childItem.parentId">
                    <template v-for="paritem in allMenus">
                      <Option :value="paritem.id" :key="paritem.id">{{ paritem.name }}</Option>
                      <template v-for="childParItem in paritem.children">
                        <Option :value="childParItem.id" :key="childParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;' + childParItem.name }}</Option>
                        <template v-for="grandParItem in childParItem.children">
                          <Option :value="grandParItem.id" :key="grandParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + grandParItem.name }}</Option>
                          <template v-for="greatGrandParItem in grandParItem.children">
                            <Option :value="greatGrandParItem.id" :key="greatGrandParItem.id">
                              {{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + greatGrandParItem.name }}
                            </Option>
                          </template>
                        </template>
                      </template>
                    </template>
                  </Select>
                  <span>状态：</span>
                  <RadioGroup v-model="childItem.state">
                    <Radio :label="1">显示</Radio>
                    <Radio :label="2">隐藏</Radio>
                  </RadioGroup>
                </div>
              </td>
              <td>
                <div class="table-cell">
                  <Button type="primary" @click="save(childItem)">保存</Button>
                </div>
              </td>
            </tr>
            <template v-if="childItem.children.length > 0" v-for="grandItem in childItem.children">
              <tr v-if="editId !== grandItem.id">
                <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
                  <template v-if="_item.key === 'operate'">
                    <div class="table-cell">
                      <Button type="primary" @click="editMenu(grandItem.id)">编辑</Button>
                      <Button type="primary" @click="del(grandItem.id)">删除</Button>
                    </div>
                  </template>
                  <template v-else-if="_item.key === 'name'">
                    <div class="table-cell name-cell">
                      {{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + grandItem[_item.key]}}
                    </div>
                  </template>
                  <template v-else>
                    <div class="table-cell">
                      {{grandItem[_item.key]}}
                    </div>
                  </template>
                </td>
              </tr>
              <tr v-else class="edit-tr">
                <td :colspan="tableConf.length - 1">
                  <div class="table-cell">
                    <i-input placeholder="输入菜单名称" v-model="grandItem.name"></i-input>
                    <i-input placeholder="输入菜单url" v-model="grandItem.url"></i-input>
                    <i-input placeholder="显示顺序" v-model="grandItem.sort"></i-input>
                    <Select transfer v-model="grandItem.parentId">
                      <template v-for="paritem in allMenus">
                        <Option :value="paritem.id" :key="paritem.id">{{ paritem.name }}</Option>
                        <template v-for="childParItem in paritem.children">
                          <Option :value="childParItem.id" :key="childParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;' + childParItem.name }}</Option>
                          <template v-for="grandParItem in childParItem.children">
                            <Option :value="grandParItem.id" :key="grandParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + grandParItem.name }}</Option>
                            <template v-for="greatGrandParItem in grandParItem.children">
                              <Option :value="greatGrandParItem.id" :key="greatGrandParItem.id">
                                {{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + greatGrandParItem.name }}
                              </Option>
                            </template>
                          </template>
                        </template>
                      </template>
                    </Select>
                    <span>状态：</span>
                    <RadioGroup v-model="grandItem.state">
                      <Radio :label="1">显示</Radio>
                      <Radio :label="2">隐藏</Radio>
                    </RadioGroup>
                  </div>
                </td>
                <td>
                  <div class="table-cell">
                    <Button type="primary" @click="save(grandItem)">保存</Button>
                  </div>
                </td>
              </tr>

              <template v-if="grandItem.children.length > 0" v-for="greatGrandItem in grandItem.children">
                <tr v-if="editId !== greatGrandItem.id">
                  <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
                    <template v-if="_item.key === 'operate'">
                      <div class="table-cell">
                        <Button type="primary" @click="editMenu(greatGrandItem.id)">编辑</Button>
                        <Button type="primary" @click="del(greatGrandItem.id)">删除</Button>
                      </div>
                    </template>
                    <template v-else-if="_item.key === 'name'">
                      <div class="table-cell name-cell">
                        {{'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + greatGrandItem[_item.key]}}
                      </div>
                    </template>
                    <template v-else>
                      <div class="table-cell">
                        {{greatGrandItem[_item.key]}}
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-else class="edit-tr">
                  <td :colspan="tableConf.length - 1">
                    <div class="table-cell">
                      <i-input placeholder="输入菜单名称" v-model="greatGrandItem.name"></i-input>
                      <i-input placeholder="输入菜单url" v-model="greatGrandItem.url"></i-input>
                      <i-input placeholder="显示顺序" v-model="greatGrandItem.sort"></i-input>
                      <Select transfer v-model="greatGrandItem.parentId">
                        <template v-for="paritem in allMenus">
                          <Option :value="paritem.id" :key="paritem.id">{{ paritem.name }}</Option>
                          <template v-for="childParItem in paritem.children">
                            <Option :value="childParItem.id" :key="childParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;' + childParItem.name }}</Option>
                            <template v-for="grandParItem in childParItem.children">
                              <Option :value="grandParItem.id" :key="grandParItem.id">{{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + grandParItem.name }}</Option>
                              <template v-for="greatGrandParItem in grandParItem.children">
                                <Option :value="greatGrandParItem.id" :key="greatGrandParItem.id">
                                  {{ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + greatGrandParItem.name }}
                                </Option>
                              </template>
                            </template>
                          </template>
                        </template>
                      </Select>
                      <span>状态：</span>
                      <RadioGroup v-model="greatGrandItem.state">
                        <Radio :label="1">显示</Radio>
                        <Radio :label="2">隐藏</Radio>
                      </RadioGroup>
                    </div>
                  </td>
                  <td>
                    <div class="table-cell">
                      <Button type="primary" @click="save(greatGrandItem)">保存</Button>
                    </div>
                  </td>
                </tr>
              </template>
            </template>

          </template>
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
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delMenu" :closable="false">
      <p>确定删除菜单？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import Loading from '../../../components/popup/Loading'
  import {Sys} from '../../../API/api'
  import Toast from '../../../components/popup/Toast'
  import SubHeader from '../../../components/SubHeader'
  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '菜单配置管理'},
          {label: '菜单设置'}
        ],
        isToast: false,
        toastMsg: null,
        toastState: null,
        dom: null,
        chDom: null,
        canLoadMore: true,
        delId: null,
        editId: null,
        isModal: false,
        pageConf: {
          page: 1,
          pageSize: 20
        },
        list: [],
        allMenus: [],
        isLoading: false,
        tableConf: [
          {
            title: '编号',
            key: 'id',
            asc: 'desc',
            width: 70
          },
          {
            title: '菜单名称',
            key: 'name',
            asc: 'desc'
          },
          {
            title: 'url',
            key: 'url',
            asc: 'desc'
          },
          {
            title: '显示顺序',
            key: 'sort',
            asc: 'desc',
            width: 85
          },
          {
            title: '父菜单名称',
            key: 'parentName',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'stateName',
            asc: 'desc',
            width: 80
          },
          {
            title: '创建人',
            key: 'creatorName',
            asc: 'desc',
            width: 80
          },
          {
            title: '创建时间',
            key: 'createTime',
            width: 110
          },
          {
            title: '操作',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      addMenu () {
        const tpl = {
          id: 'new_add',
          name: '',
          parentId: null,
          sort: '',
          state: '',
          url: ''
        }
        if (this.list[0].id !== 'new_add') {
          this.list.unshift(tpl)
        }
        this.editId = tpl.id
      },
      save (item) {
        if (this.editId === 'new_add') {
          let data = {
            name: this.list[0].name,
            parentId: this.list[0].parentId,
            sort: this.list[0].sort,
            state: this.list[0].state,
            url: this.list[0].url
          }
          this.$http.post(Sys.addMenu, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.pageConf.page = 1
              this.getList()
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
          })
        } else {
          let data = {
            id: this.editId,
            name: item.name,
            parentId: item.parentId,
            sort: item.sort,
            state: item.state,
            url: item.url
          }
          this.$http.post(Sys.editMenu, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.editId = null
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.pageConf.page = 1
              this.getList()
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
          })
        }
      },
      editMenu (id) {
        if (this.list[0].id === 'new_add') {
          this.list.shift()
        }
        this.editId = id
      },
      del (id) {
        this.delId = id
        this.isModal = true
      },
      delMenu () {
        this.$http.post(Sys.delMenu, this.qs.stringify({id: this.delId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '删除成功'
            // let listIdx
            // for (let i = 0; i < this.list.length; i++) {
            //   let item = this.list[i]
            //   if (item.id === this.delId) {
            //     listIdx = i
            //     break
            //   }
            // }
            // this.list.splice(listIdx, 1)
            this.getList()
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
      getAllRight () {
        this.$http.post(Sys.allRight, this.qs.stringify({all: 1}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.allMenus = _data.retData.data
          }
        })
      },
      getList () {
        this.isLoading = true
        this.$http.post(Sys.menusList, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
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
          // this.getList()
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
      this.getAllRight()
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
  .edit-tr {
    .table-cell {
      display: flex;
      align-items: center;
      .ivu-input-wrapper {
        width: 20%;
        margin-right: 32px;
      }
      .ivu-select {
        width: 20%;
        margin-right: 32px;
      }
      .ivu-radio-group {
        .ivu-radio-group-item {
          margin-right: 16px;
        }
      }
      .ivu-checkbox-group {
        .ivu-checkbox-group-item {
          margin-right: 16px;
        }
      }
    }
  }
  .name-cell {
    white-space: nowrap;
  }
</style>
