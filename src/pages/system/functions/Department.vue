<template>
  <div>
    <div class="addBtn g-ta-r g-mb-32">
      <Button type="primary" @click="addDepart"><Icon type="plus-circled" size="20"></Icon> 新增部门</Button>
    </div>


    <div class="result-list">
      <div class="process-type">
        <ButtonGroup size="large">
          <Button v-for="(item, idx) in departList" :key="item.id" :class="{active: currDepart === item.id}" @click="selectDepart(item.id)">
            <template v-if="isEdit && currDepart === item.id">
              <i-input v-model="departDetail.name" placeholder="部门名称"></i-input>
            </template>
            <template v-else>
              {{item.name}}
              <br>
              Department
            </template>

          </Button>
        </ButtonGroup>
      </div>
      <div class="detail" >
        <loading v-if="isLoading"></loading>
        <div v-if="departDetail">
          <div class="g-ta-r g-mb-16">
            <Button type="primary" size="large" @click="toggleEdit">{{isEdit ? '保存' : '编辑'}}</Button>
            <Button type="primary" size="large" @click="delDepartConfirm">删除</Button>
            <Button v-if="isEdit" type="primary" size="large" @click="cancelEdit">取消</Button>

          </div>
          <i-form label-position="left" :label-width="130" class="default-form" >
            <div class="form-group">
              <div >
                <FormItem label="部门介绍" class="default-form-item" >
                  <i-input type="textarea" v-model="departDetail.description" placeholder="填写部门介绍" :readonly="!isEdit"></i-input>
                </FormItem>
              </div>
              <div>
                <FormItem label="部门资料地址" class="default-form-item" >
                  <i-input v-model="departDetail.fileUrl" placeholder="填写部门资料地址"  :readonly="!isEdit"></i-input>
                </FormItem>
              </div>
              <div>
                <FormItem label="部门工作说明地址" class="default-form-item" >
                  <i-input v-model="departDetail.workUrl" placeholder="填写部门工作说明地址" :readonly="!isEdit"></i-input>

                </FormItem>
              </div>
              <div>
                <FormItem label="部门类型" class="default-form-item">
                  <RadioGroup v-model="departDetail.type" size="large" class="default-form-radio-group" :class="{'display-radio': !isEdit}" >
                    <Radio :disabled="!isEdit" v-for="(radioItem, radioIndex) in departType" :key="radioIndex" :label="radioItem.id" class="default-form-radio" style="width: 50%">
                      {{radioItem.name}}
                    </Radio>
                  </RadioGroup>
                </FormItem>
              </div>
              <!--{{departDetail.group}}-->
              <div v-if="departDetail.group">
                <FormItem label="部门分组" class="default-form-item">
                  <div class="default-form-member-selection default-form-tags" >
                    <template v-for="group in departDetail.group">
                      <span class="default-form-tag">
                        {{group.name}}
                        <span @click="delDepartGroup(group.id)" v-if="isEdit">
                          <Icon type="android-close" class="del-tag-icon"></Icon>
                        </span>
                      </span>
                    </template>
                    <Tooltip content="添加分组" placement="bottom" class="tags-add-tip" v-if="isEdit">
                      <Icon type="plus-circled"  size="24" color="#107cd9" class="tags-add" @click.native="addGroupConfirm(departDetail.id, 'group')"></Icon>
                    </Tooltip>
                  </div>
                </FormItem>
              </div>
              <div v-if="departDetail.position">
                <FormItem label="部门职位" class="default-form-item">
                  <div class="default-form-member-selection default-form-tags" >
                    <template v-for="pos in departDetail.position">
                      <span class="default-form-tag">
                        {{pos.name}}
                        <span @click="delDepartPosition(pos.id)" v-if="isEdit">
                          <Icon type="android-close" class="del-tag-icon"></Icon>
                        </span>
                      </span>
                    </template>
                    <Tooltip content="添加分组" placement="bottom" class="tags-add-tip" v-if="isEdit">
                      <Icon type="plus-circled"  size="24" color="#107cd9" class="tags-add" @click.native="addGroupConfirm(departDetail.id, 'position')"></Icon>
                    </Tooltip>
                  </div>
                </FormItem>
              </div>
            </div>
          </i-form>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" :title="'输入'+ modalType + '名称'" @on-ok="addDepartGroup" :closable="false">
      <div>
        <i-input v-model="groupName" :placeholder="'输入' + modalType + '名称'"></i-input>
      </div>
    </Modal>
    <Modal v-model="isModalDel" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delDepart" :closable="false">
      <p>确定删除部门？</p>
    </Modal>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import {Sys} from '../../../API/api'
  import Loading from '../../../components/popup/Loading'
  import Toast from '../../../components/popup/Toast'
  import SubHeader from '../../../components/SubHeader'
  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '功能配置管理'},
          {label: '公司部门设置'}
        ],
        departType: [
          {id: '1', name: '实体'},
          {id: '0', name: '虚拟'}
        ],
        groupName: '',
        departList: [],
        departDetail: null,
        currDepart: null,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        isEdit: false,
        isModal: false,
        editId: null,
        isModalDel: false,
        modalType: ''
      }
    },
    methods: {
      addGroupConfirm (id, type) {
        this.isModal = true
        switch (type) {
          case 'group':
            this.modalType = '分组'
            break
          case 'position':
            this.modalType = '职位'
            break
        }
      },
      cancelEdit () {
        this.isEdit = false
        if (this.currDepart === 'new_add') {
          this.departList.pop()
        }
        this.currDepart = null
        this.departDetail = null
      },
      toggleEdit () {
        if (this.isEdit) {
          if (this.currDepart === 'new_add') {
            let _data = {
              name: this.departDetail.name,
              description: this.departDetail.description,
              fileUrl: this.departDetail.fileUrl,
              workUrl: this.departDetail.workUrl,
              type: this.departDetail.type
            }
            if (!_data.name) {
              this.isToast = true
              this.toastMsg = '请填写部门名称'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            } else if (!_data.description) {
              this.isToast = true
              this.toastMsg = '请填写部门介绍'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            } else if (!_data.type) {
              this.isToast = true
              this.toastMsg = '请选择部门类型'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            }

            this.$http.post(Sys.addDepart, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
              const _data = res.data
              this.isToast = true
              if (_data.retCode === 0) {
                this.toastMsg = '保存成功'
                this.toastState = 'success'
                this.getAllDepart()
                this.currDepart = _data.retData.id
                this.getDepartDetail(_data.retData.id)
              } else {
                this.toastMsg = _data.retMsg
                this.toastState = null
              }
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
                if (_data.retCode === 100014) {
                  this.$cookie.delete('token')
                  this.$router.push('/')
                }
              }, 1500)
            })
          } else {
            let _data = {
              id: this.departDetail.id,
              name: this.departDetail.name,
              description: this.departDetail.description,
              fileUrl: this.departDetail.fileUrl,
              workUrl: this.departDetail.workUrl,
              type: this.departDetail.type
            }
            if (!_data.name) {
              this.isToast = true
              this.toastMsg = '请填写部门名称'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            } else if (!_data.description) {
              this.isToast = true
              this.toastMsg = '请填写部门介绍'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            } else if (!_data.type) {
              this.isToast = true
              this.toastMsg = '请选择部门类型'
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
              }, 1500)
              return
            }

            this.$http.post(Sys.editDepart, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
              const _data = res.data
              this.isToast = true
              if (_data.retCode === 0) {
                this.toastMsg = '保存成功'
                this.toastState = 'success'
                this.getAllDepart()
                this.getDepartDetail(this.currDepart)
              } else {
                this.toastMsg = _data.retMsg
                this.toastState = null
              }
              setTimeout(() => {
                this.toastMsg = null
                this.toastState = null
                this.isToast = false
                if (_data.retCode === 100014) {
                  this.$cookie.delete('token')
                  this.$router.push('/')
                }
              }, 1500)
            })
          }
        }
        this.isEdit = !this.isEdit
      },
      selectDepart (id) {
        if (this.currDepart === id) {
          return
        }
        this.isEdit = false
        this.currDepart = id
        this.getDepartDetail(id)
      },
      addDepart () {
        const titTpl = {
          id: 'new_add',
          name: '部门名称'
        }
        const newDetail = {
          name: '',
          description: '',
          fileUrl: '',
          workUrl: '',
          state: null
        }
        this.departList.push(titTpl)

        this.editId = titTpl.id
        this.currDepart = titTpl.id
        this.isEdit = true
        this.departDetail = newDetail
      },
      save () {},
      getAllDepart () {
        this.$http.post(Sys.departList, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.departList = _data.retData.data

            // this.getDepartDetail()
          }
        })
      },
      addDepartGroup (id) {
        let api
        switch (this.modalType) {
          case '分组':
            api = Sys.addDepartGroup
            break
          case '职位':
            api = Sys.addDepartPosition
            break
        }
        let _data = {
          name: this.groupName,
          departmentId: this.currDepart
        }
        this.$http.post(api, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '添加成功'
            this.toastState = 'success'
            switch (this.modalType) {
              case '分组':
                this.departDetail.group.push({name: this.groupName, id: _data.retData.id})
                break
              case '职位':
                this.departDetail.position.push({name: this.groupName, id: _data.retData.id})
                break
            }
            this.groupName = ''
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.toastMsg = null
            this.toastState = null
            this.isToast = false
          }, 1500)
        })
      },
      addDepartPosition (id) {
        let _data = {
          name: this.groupName,
          departmentId: this.currDepart
        }
        this.$http.post(Sys.addDepartGroup, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '添加成功'
            this.toastState = 'success'
            this.departDetail.group.push({name: this.groupName, id: _data.retData.id})
            this.groupName = ''
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.toastMsg = null
            this.toastState = null
            this.isToast = false
          }, 1500)
        })
      },
      delDepartGroup (id) {
        let listIdx
        for (let i = 0; i < this.departDetail.group.length; i++) {
          let item = this.departDetail.group[i]
          if (item.id === id) {
            listIdx = i
            break
          }
        }
        this.departDetail.group.splice(listIdx, 1)
        this.$http.post(Sys.delDepartGroup, this.qs.stringify({id: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '删除成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.toastMsg = null
            this.toastState = null
            this.isToast = false
          }, 1500)
        })
      },
      delDepartPosition (id) {
        let listIdx
        for (let i = 0; i < this.departDetail.position.length; i++) {
          let item = this.departDetail.position[i]
          if (item.id === id) {
            listIdx = i
            break
          }
        }
        this.departDetail.position.splice(listIdx, 1)
        this.$http.post(Sys.delDepartPosition, this.qs.stringify({id: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '删除成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.toastMsg = null
            this.toastState = null
            this.isToast = false
          }, 1500)
        })
      },
      getDepartDetail (id) {
        this.isLoading = true
        this.$http.post(Sys.departDetail, this.qs.stringify({id: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.departDetail = _data.retData
          }
        })
      },
      delDepart () {
        this.$http.post(Sys.delDepart, this.qs.stringify({id: this.currDepart}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true

          if (_data.retCode === 0) {
            this.toastMsg = '删除成功'
            this.toastState = 'success'
            this.getAllDepart()
            this.currDepart = null
            this.departDetail = null
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.toastMsg = null
            this.toastState = null
            this.isToast = false
          }, 1500)
        })
      },
      delDepartConfirm () {
        this.isModalDel = true
      }
    },
    created () {
      this.getAllDepart()
    }
  }
</script>

<style scoped lang="less">
  .process-type {
    /*border-bottom: 1px solid #cccccc;*/
  }
  .ivu-btn-group {
    .ivu-btn {
      &.active {
        background-color: #2d8ef8;
        color: #fff;
      }
    }
  }
  .detail {
    position: relative;
    min-height: 300px;
    margin-top: 32px;
  }
  .process-detail-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .select-member {
      display: inline-block;
    }
    .add-auditor-node {
      margin-left: 36px;
    }
    span {
      margin-right: 16px;
    }
  }
  .default-form-tags {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .tags-add-tip {
      line-height: 1;
      margin-left: 16px;
      cursor: pointer;
      .tags-add {
        line-height: 1;
      }
    }
    .default-form-tag {
      display: inline-block;
      padding: 0px 10px;
      background-color: #2d8ef8;
      color: #fff;
      margin: 5px;
      position: relative;
      span {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(30%, -30%);
        background-color: red;
        text-align: center;
        width: 12px;
        height: 12px;
        line-height: 12px;
        border-radius: 100%;
      }
      .del-tag-icon {
        line-height: 1;
      }
    }
  }

</style>
