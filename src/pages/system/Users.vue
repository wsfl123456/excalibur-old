<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输入企业邮箱/角色名 按 回车 进行查询" v-model="pageConf.research" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
        <i-col span="9" offset="1">
          <Button type="primary" @click="addAccount">添加用户</Button>
        </i-col>
      </Row>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th v-for="(item, index) in titleConf" :key="index" :class="{active: sortTh === index}">
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr v-if="editId === item.id" class="edit-tr">
            <td :colspan="titleConf.length - 1">
              <div class="table-cell">
                <i-input placeholder="输入用户名" v-model="name" ></i-input>
                <i-input placeholder="输入用户邮箱" v-model="item.email" :disabled="editId !== 'new_add'"></i-input>
                <span>系统角色选择：</span>
                <CheckboxGroup v-model="editRoles">
                  <Checkbox :label="checkItem.id" v-for="checkItem in allRoles" :key="checkItem.id">{{checkItem.name}}</Checkbox>
                </CheckboxGroup>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <Button type="primary" @click="save">保存</Button>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td v-for="(_item, _index) in titleConf" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'role'">
                <div class="table-cell">
                  <template v-for="(role, roleIdx) in item[_item.key]">
                    {{role.name}}
                    <template v-if="roleIdx !== item[_item.key].length - 1">
                      ；
                    </template>
                  </template>
                </div>
              </template>
              <template v-else-if="_item.key === 'operate'">
                <div class="table-cell">
                  <Button type="primary" @click="editAccount(item.id, item.role, item.name)">编辑</Button>
                  <Button type="primary" @click="delAccountConfirm(item.id)">删除</Button>
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
          <td :colspan="titleConf.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delAccount" :closable="false">
      <p>确定删除用户？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import {Sys} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import SubHeader from '../../components/SubHeader'
  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '用户管理'}
        ],
        isModal: false,
        isToast: false,
        sortTh: null,
        toastMsg: null,
        isLoading: false,
        allRoles: [],
        dom: null,
        chDom: null,
        canLoadMore: true,
        list: [],
        name: null,
        toastState: null,
        pageConf: {
          page: 1,
          pageSize: 20,
          research: ''
        },
        delId: null,
        editId: null,
        editRoles: [],
        titleConf: [
          {
            title: '编号',
            key: 'id',
            asc: 'desc'
          },
          {
            title: '用户名',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '用户邮箱',
            key: 'email',
            asc: 'desc'
          },
          {
            title: '系统角色',
            key: 'role',
            asc: 'desc'
          }, {
            title: '创建人',
            key: 'creatorName',
            asc: 'desc'
          },
          {
            title: '更新时间',
            key: 'createTime',
            asc: 'desc'
          },
          {
            title: '',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      addAccount (type) {
        const tpl = {
          id: 'new_add',
          email: '',
          role: [],
          name: null
        }
        this.editRoles = []
        this.editId = tpl.id
        this.name = null
        if (this.list.length === 0 || this.list[0].id !== 'new_add') {
          this.list.unshift(tpl)
        }
      },
      sortData (idx) {
        let key = this.titleConf[idx].key
        if (key === 'operate') {
          return
        }
        if (this.sortTh === idx) {
          const asc = this.titleConf[idx].asc
          if (asc === 'desc') {
            this.titleConf[idx].asc = 'asc'
          } else {
            this.titleConf[idx].asc = 'desc'
          }
        } else {
          this.sortTh = idx
        }
        let data = this.pageConf
        data.orderBy = key
        data.asc = this.titleConf[idx].asc
        data.page = 1
        this.pageConf = data
        this.getList()
      },
      save () {
        if (this.editId === 'new_add') {
          if (!this.list[0].email || this.list[0].email === '') {
            this.isToast = true
            this.toastMsg = '请输入邮箱'
            setTimeout(() => {
              this.isToast = false
            }, 1500)
            return
          }
          if (!this.name || this.name === '') {
            this.isToast = true
            this.toastMsg = '请输入用户名'
            setTimeout(() => {
              this.isToast = false
            }, 1500)
            return
          }
          if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.list[0].email)) {
            this.isToast = true
            this.toastMsg = '邮箱格式错误'
            this.toastState = null
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
            return
          }
          this.$http.post(Sys.addAccount, this.qs.stringify({role: this.editRoles, email: this.list[0].email, name: this.name}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
          if (!this.name || this.name === '') {
            return
          }
          this.$http.post(Sys.editAccount, this.qs.stringify({id: this.editId, role: this.editRoles, name: this.name}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      editAccount (id, roleArr, name) {
        if (this.list[0].id === 'new_add') {
          this.list.shift()
        }
        this.editId = id
        this.name = name
        this.editRoles = roleArr.map(item => {
          return item.id
        })
      },
      delAccountConfirm (id) {
        this.isModal = true
        this.delId = id
      },
      delAccount () {
        this.$http.post(Sys.delAccount, this.qs.stringify({id: this.delId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      allRole () {
        this.$http.post(Sys.allRole, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.allRoles = _data.retData.data
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
        })
      },
      getList () {
        this.isLoading = true
        this.$http.post(Sys.accountlist, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      search (e) {
        if (e.keyCode === 13) {
          this.pageConf.page = 1
          this.getList()
        }
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
      this.allRole()

      sessionStorage.setItem('subMenu', 'userManage/list/')
      this.$store.dispatch('setCurrSubMenu', 'userManage/list/')
      // this.$store.dispatch('setOpenedSub', 'userManage')
      // sessionStorage.setItem('openedSub', 'userManage')
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
