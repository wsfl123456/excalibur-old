<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addRole"><Icon type="plus-circled" size="20"></Icon> 添加权限</Button>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th v-for="(item, index) in tableConf" :key="index" >
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
                  <Button type="primary" @click="editRole(item.id, item.right)">编辑</Button>
                  <Button type="primary" @click="delRoleConfirm(item.id)">删除</Button>
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
                <i-input placeholder="输入用户名称" v-model="item.name"></i-input>
                <!--<CheckboxGroup v-model="right">-->
                  <!--<Checkbox :label="String(checkItem.id)" v-for="checkItem in allRoles" :key="checkItem.id">{{checkItem.name}}</Checkbox>-->
                <!--</CheckboxGroup>-->
                <div class="role-selection">
                  <span class="edit-opt-tit">选择菜单权限：</span>
                  <div>
                    <template v-for="rightItem in rightList">
                      <div class="right-panel">
                        <i-select v-model="rightItem.mainId" placeholder="选择一级菜单" @on-change="changeRightItem(rightItem)">
                          <i-option v-for="checkItem in allRoles" :key="checkItem.id" :value="checkItem.id">{{checkItem.name}}</i-option>
                        </i-select>
                        <!--二级菜单-->
                        <template v-if="rightItem.mainId && allRoles[rightItem.mainId].children">
                          <CheckboxGroup v-model="rightItem.children" class="children-menu" >
                            <Checkbox v-for="(childRightItem, childRightItemIdx) in allRoles[rightItem.mainId].children" :label="childRightItem.id" :key="childRightItem.id">
                              <span :class="rightItem.currChildrenMenu - 1 === childRightItemIdx ? 'curr' : ''"
                                    @click.prevent="changeGrand(rightItem, childRightItemIdx + 1)"
                              >
                                {{childRightItem.name}}
                              </span>
                            </Checkbox>
                          </CheckboxGroup>
                        </template>
                        <!--三级菜单-->
                        <template
                          v-if="
                          (
                            rightItem.currChildrenMenu
                          ) &&
                          allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu - 1)] &&
                          allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu - 1)].children"
                        >
                          <CheckboxGroup
                            v-model="rightItem.grand"
                            class="subChildren-menu"
                            @on-change="checkSubChild({
                              parent: allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu-1)].id,
                              item: rightItem
                            })"
                          >
                            <Checkbox
                              v-for="(grandRightItem, grandRightItemIdx) in allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu-1)].children"
                              :label="grandRightItem.id"
                              :key="grandRightItem.id"
                            >
                              <span :class="rightItem.currGrandChildrenMenu - 1 === grandRightItemIdx ? 'curr' : ''"
                                    @click.prevent="changeGrand(rightItem, grandRightItemIdx + 1, 'GrandChildren')"
                              >
                                {{grandRightItem.name}}
                              </span>
                            </Checkbox>
                          </CheckboxGroup>
                        </template>
                        <!--四级菜单-->
                        <template
                          v-if="
                          (
                            rightItem.currGrandChildrenMenu
                          ) &&
                          allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu - 1)].children[(rightItem.currGrandChildrenMenu - 1)] &&
                          allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu - 1)].children[(rightItem.currGrandChildrenMenu - 1)].children"
                        >
                          <CheckboxGroup
                            v-model="rightItem.greatGrand"
                            class="subChildren-menu"
                            @on-change="checkSubChild({
                              root: allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu-1)].id,
                              parent: allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu-1)].children[(rightItem.currGrandChildrenMenu - 1)].id,
                              item: rightItem,
                              type: 'grandChild'
                            })"
                          >
                            <Checkbox
                              v-for="(grandRightItem, grandRightItemIdx) in allRoles[rightItem.mainId].children[(rightItem.currChildrenMenu-1)].children[(rightItem.currGrandChildrenMenu - 1)].children"
                              :label="grandRightItem.id"
                              :key="grandRightItem.id"
                            >
                              <span>
                                {{grandRightItem.name}}
                              </span>
                            </Checkbox>
                          </CheckboxGroup>
                        </template>
                      </div>
                    </template>

                    <div class="selection-btns">
                      <Button type="primary" @click="addMenu">增加一级菜单</Button>
                      <Button type="primary" @click="delMenu" v-if="rightList.length > 1">删除一级菜单</Button>
                    </div>
                  </div>
                </div>

                <span class="edit-opt-tit">状态：</span>
                <RadioGroup v-model="item.state">
                  <Radio :label="1">显示</Radio>
                  <Radio :label="2">隐藏</Radio>
                </RadioGroup>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <Button type="primary" @click="save(item)">保存</Button>
                <Button type="primary" @click="cancel">取消</Button>
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
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delRole" :closable="false">
      <p>确定删除角色？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import Loading from '../../../components/popup/Loading'
  import Toast from '../../../components/popup/Toast'
  import {Sys} from '../../../API/api'
  import SubHeader from '../../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '菜单配置管理'},
          {label: '菜单权限'}
        ],
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
        },
        list: [],
        allRoles: [],
        right: [],
        rightList: [
          {
            mainId: null,
            children: [],
            grandChildren: [],
            grand: [],
            greatGrand: [],
            currChildrenMenu: 0,
            currGrandChildrenMenu: 0
          }
        ],
        tableConf: [
          {
            title: '编号',
            key: 'id',
            asc: 'desc'
          },
          {
            title: '角色名称',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '菜单权限',
            key: 'right',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'stateName',
            asc: 'desc'
          },
          {
            title: '创建人',
            key: 'creatorName',
            asc: 'desc'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      changeRightItem (item) {
        item.children = []
        item.grand = []
        item.greatGrand = []
      },
      checkChild (e, {allChildren, item}) {
      },
      checkSubChild ({parent, item, type = 'child', root}) {
        if (type === 'child') {
          if (item.children.indexOf(parent) < 0) {
            item.children.push(parent)
          }
        } else if (type === 'grandChild') {
          if (item.children.indexOf(root) < 0) {
            item.children.push(root)
          }
          if (item.grand.indexOf(parent) < 0) {
            item.grand.push(parent)
          }
        }
      },
      changeGrand (item, idx, type = 'Children') {
        // item.currChildrenMenu = item.currChildrenMenu === idx ? null : idx
        if (item[`curr${type}Menu`] === idx) {
          item[`curr${type}Menu`] = null
        } else {
          item[`curr${type}Menu`] = null
          setTimeout(() => {
            item[`curr${type}Menu`] = idx
          }, 100)
        }
      },
      addMenu () {
        const tpl = {
          mainId: null,
          grandChildren: [],
          children: [],
          grand: [],
          greatGrand: [],
          currChildrenMenu: 0,
          currGrandChildrenMenu: 0
        }

        this.rightList.push(tpl)
      },
      delMenu () {
        this.rightList.pop()
      },
      cancel () {
        if (this.editId === 'new_add') {
          this.list.shift()
        }
        this.editId = null
      },
      save (item) {
        let right = []
        this.rightList.forEach((item) => {
          right.push(item.mainId)
          right = right.concat(item.children, item.grand, item.greatGrand)
        })
        if (this.editId === 'new_add') {
          if (!item.name || item.name === '') {
            this.isToast = true
            this.toastMsg = '请填写用户名称'
            this.toastState = null
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
            return
          }
          if (!item.state) {
            this.isToast = true
            this.toastMsg = '请选择状态'
            this.toastState = null
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastState = null
            }, 1500)
            return
          }
          let _data = {
            name: item.name,
            right,
            state: item.state
          }
          this.$http.post(Sys.addRole, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastState = 'success'
              this.toastMsg = '保存成功'
              this.pageConf.page = 1
              this.rightList = [
                {
                  mainId: null,
                  children: [],
                  grandChildren: [],
                  grand: [],
                  greatGrand: [],
                  currChildrenMenu: 0,
                  currGrandChildrenMenu: 0
                }
              ]
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
          let _data = {
            id: item.id,
            name: item.name,
            right,
            state: item.state
          }
          this.$http.post(Sys.editRole, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.editId = null
              this.toastState = 'success'
              this.toastMsg = '保存成功'
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
      editRole (id, rightArr) {
        if (this.list[0].id === 'new_add') {
          this.list.shift()
        }
        let rightList = []
        rightArr.forEach((item) => {
          if (this.allRoles[+item.id]) {
            let data = {
              mainId: +item.id,
              children: [],
              grandChildren: [],
              grand: [],
              greatGrand: [],
              currChildrenMenu: 0,
              currGrandChildrenMenu: 0
            }
            rightList.push(data)
          }
        })

        console.log('right', rightArr, rightList)
        rightArr.forEach((item) => {
          rightList.forEach((_item) => {
            if (+item.parentId === +_item.mainId) {
              _item.children.push(+item.id)
            }
          })
        })
        rightArr.forEach((item) => {
          rightList.forEach((_item) => {
            if (_item.children.indexOf(+item.parentId) >= 0) {
              _item.grand.push(+item.id)
            }
          })
        })
        rightArr.forEach((item) => {
          rightList.forEach((_item) => {
            if (_item.grand.indexOf(+item.parentId) >= 0) {
              _item.greatGrand.push(+item.id)
            }
          })
        })
        this.rightList = rightList
        this.editId = null
        setTimeout(() => {
          this.editId = id
        }, 0)
      },
      delRole () {
        this.$http.post(Sys.delRole, this.qs.stringify({id: this.delId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      delRoleConfirm (id) {
        this.isModal = true
        this.delId = id
      },
      addRole () {
        const tpl = {
          id: 'new_add',
          name: '',
          right: [],
          state: ''
        }
        this.rightList = [
          {
            mainId: null,
            children: [],
            grandChildren: [],
            grand: [],
            greatGrand: [],
            currChildrenMenu: 0,
            currGrandChildrenMenu: 0
          }
        ]
        this.editId = tpl.id
        if (this.list[0].id !== 'new_add') {
          this.list.unshift(tpl)
        }
      },
      getAllRight () {
        this.$http.post(Sys.allRight, this.qs.stringify({all: 1}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.allRoles = _data.retData.data
          }
        })
      },
      getList () {
        this.isLoading = true
        this.$http.post(Sys.roleList, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
  .edit-opt-tit {
    white-space: nowrap;
  }
  .edit-tr {
    td:last-child {
      .table-cell {
        display: inline-block;
      }
    }
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
    .ivu-select {
      display: block;
      margin-bottom: 8px;
    }
    .children-menu {
      margin-bottom: 8px;
    }
    .ivu-checkbox-group-item {
      span {
        &:last-child {
          &:hover, &.curr {
            color: #2d8ef8;
          }
        }
      }
    }
    .right-panel {
      margin-bottom: 16px;
    }
  }
  .role-selection {
    margin-right: 32px;
    display: flex;
    /*align-items: flex-start;*/
    align-items: center;
    padding: 10px 0;
    flex: 1;
    > div {
      .selection-btns {
        margin-top: 16px;
      }
    }
  }

</style>
