<template>
  <div>
    <div class="result-list">
      <div class="process-type">
        <ButtonGroup size="large">
          <Button v-for="(item, idx) in processList" :key="item.id" :class="{active: currProcess === item.id}" @click="selectProcess(item.id)">{{item.name}}</Button>
        </ButtonGroup>
      </div>
      <div class="detail">
        <loading v-if="isLoading"></loading>
        <div v-if="processResult">
          <div class="g-ta-r g-mb-16">
            <Button type="primary" size="large" @click="toggleEditProcess">{{isEdit ? '保存' : '编辑审批节点'}}</Button>
          </div>
          <Button v-if="isEdit" type="primary" @click="addAuditorNode(0)">增加节点</Button>
          <ol >
            <li class="process-detail-item" v-for="(item, idx) in processResult.value" :key="idx + '-' + JSON.stringify(item)">
              <span>
                第{{idx + 1}}节点审批人
              </span>
              <div v-if="!isEdit">
                <common-member :isEdit="false" content="添加审批人" :users="item"></common-member>
              </div>
              <div v-else>
                <common-member :isEdit="true" exitTxt="退出审核人" content="添加审批人" :users="item" multi></common-member>
                <Button type="primary" class="add-auditor-node" @click="addAuditorNode(idx + 1)">增加节点</Button>
                <Button type="primary" class="del-auditor-node" @click="delAuditorNode(idx)">删除节点</Button>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../../components/BCrumb'
  import { Sys } from '../../../API/api'
  import Loading from '../../../components/popup/Loading'
  import CommonMember from '../../../components/CommonMember'
  import Toast from '../../../components/popup/Toast'
  import SubHeader from '../../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, Toast, CommonMember, Loading, BCrumb},
    data () {
      return {
        crumb: [
          {label: '系统设置 '},
          {label: '功能配置管理'},
          {label: '业务审批人'}
        ],
        isToast: false,
        toastMsg: null,
        toastState: null,
        isLoading: false,
        processList: [],
        processResult: null,
        currProcess: null,
        isEdit: false
      }
    },
    methods: {
      addAuditorNode (idx) {
        this.processResult.value.splice(idx, 0, [])
      },
      delAuditorNode (idx) {
        this.processResult.value.splice(idx, 1)
      },
      toggleEditProcess () {
        this.isEdit = !this.isEdit
        if (!this.isEdit) {
          let _data = {
            id: this.currProcess,
            configValue: this.processResult.value
          }
          this.$http.post(Sys.editProcess, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '保存成功'
              this.toastState = 'success'
              this.getProcessDetail(this.currProcess)
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              this.toastState = null
              this.toastMsg = null
              if (_data.retCode === 100014) {
                this.$cookie.delete('token')
                this.$router.push('/')
              }
            }, 1500)
          })
        }
      },
      selectProcess (id) {
        this.currProcess = id
        this.isEdit = false
        this.getProcessDetail(id)
      },
      getProcess (init) {
        this.$http.post(Sys.processList, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.processList = _data.retData.data
            // if (init) {
            //   let firstId = this.processList[0].id
            //   this.getProcessDetail(firstId)
            //   // this.getProcessDetail(3)
            // }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.$router.push('/')
            }
          }, 1500)
        })
      },
      getProcessDetail (id) {
        this.isLoading = true
        this.$http.post(Sys.processAuditor, this.qs.stringify({id: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            this.processResult = _data.retData.data
            if (this.processResult) {
              this.processResult.value.forEach(item => {
                item.forEach(_item => {
                  _item.userName = _item.name
                })
              })
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            this.toastState = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')
              this.$router.push('/')
            }
          }, 1500)
        })
      }
    },
    created () {
      this.getProcess(true)
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
</style>
