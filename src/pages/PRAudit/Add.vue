<template>
  <div class="edit-form">
    <Card class="form-card">
      <h2 slot="title">创建{{toolkitName}}任务</h2>
      <Row>
        <i-col span="17" class="task-form">
          <task-edit-form :form-value="basicValue" :form-label="basicInfo" :tips="tips"></task-edit-form>

          <div v-if="taskFormData.hasOwnProperty('showCase')">
            <task-p-r-content :id-params="formData" :project-id="formData.projectId" :customer-id="formData.customerId" is-from-menu  :toolkit-id="toolkitId" :form-value="taskFormData.showCase" @on-change="changeProject"></task-p-r-content>
            <!--<task-edit-form :toolkit-id="toolkitId" type="showCase" :form-value="taskFormData.showCase" :form-label="taskFormData.showCase" :tips="tips" :customer-id="customerId" :customer-name="customerName" :project-id="projectId"></task-edit-form>-->
          </div>

          <template v-if="taskFormData.hasOwnProperty('operationInfo') ">
            <div v-for="(value, key) in taskFormData.operationInfo" :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key ">
              <task-edit-form type="operation" :form-label="value" :form-value="value" @on-add="addOperation($event, key)" @on-remove="removeOperation($event, key)" :switch-val="isQC" :switch-key="key" @on-switch="switchChange($event, key)" :tips="tips" :project-id="projectId" :can-del-operater="taskFormData.operationInfo.length > 1"></task-edit-form>
              <template v-if="isQC[key]">
                <div>
                  <task-edit-form is-filter type="company" :form-label="taskFormData.contactsInfo[key].companyInfo" :form-value="taskFormData.contactsInfo[key].companyInfo" :all-part-a="allPartA" :all-part-b="allPartB"></task-edit-form>
                </div>
              </template>
            </div>
          </template>

          <!--审核人模块-->
          <task-edit-form type="auditor" v-if="isAuditor"></task-edit-form>
          <!--<form-box :form-data="basicInfo" :is-extra-options="true" :extra-options="extraInfoOptions" :extra-datas="extraDatas" :requirement="requirement" :value-data="formData"></form-box>-->
          <div class="form-btns">
            <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">提交任务</Button>

          </div>
        </i-col>
      </Row>
    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>

    <Modal v-model="feedModal" class-name="vertical-center-modal examine-modal" ok-text="提交意见" :closable="false" @on-ok="submitAdvice">
      <div class="advice-repo">
        <Row>
          <i-col span="24">
            <div class="g-mb-16">
              <h4 class="">意见反馈</h4>
              <i-input type="textarea" :autosize="{minRows: 5, maxRows: 10}" v-model="repo"></i-input>
            </div>
            <!--<div class="form-btns">-->
            <!--<Button type="primary" class="submit-repo form-default-btn" size="large" @click="submitAdvice">提交意见</Button>-->
            <!--</div>-->
          </i-col>
        </Row>
      </div>
    </Modal>
    <leave-modal :is-show="isLeaveConfirm"
                 @on-leave="leavePage"
                 @on-saveLeave="saveLeavePage"
                 @on-cancel="leaveCancel"
    ></leave-modal>
    <load-draft-modal :is-show="isDraft"
                      @on-load="loadDraft"
                      @on-cancel="cancelDraft"
    ></load-draft-modal>
  </div>
</template>

<script>
  import TaskEditForm from '../../components/TaskEditForm'
  import Toast from '../../components/popup/Toast'
  import LeaveModal from '../../components/popup/LeaveModal'
  import LoadDraftModal from '../../components/popup/LoadDraftModal'
  import { Task, cacheData } from '../../API/api'
  import {formConf} from '../../assets/conf/formData.conf'
  import {ajax} from '../../util/util'
  import TaskPRContent from '../../components/TaskPRContent'

  export default {
    name: 'Add',
    components: {TaskPRContent, LoadDraftModal, LeaveModal, Toast, TaskEditForm},
    data () {
      return {
        toolkitId: null,
        tips: null,
        isSaved: false,
        isDraft: false,
        isLeaveConfirm: false,
        repo: '',
        feedModal: false,
        contractTpl: [],
        isQC: [],
        qcTpl: {
          companyInfo: { // 供应商合同信息，字段同上，除id外，其他可以为空
            companyId: '',
            companyName: {
              label: '供应商名称',
              type: 'auto',
              customType: 'inner',
              name: 'part_b_name',
              value: '',
              placeholder: '输入供应商名称以供选择供应商'
            },
            companyTel: {
              label: '公司电话',
              type: 'input',
              name: 'part_b_tel',
              value: '',
              placeholder: '输入供应商名称以供选择供应商'
            },
            companyAccountName: {
              label: '账户名称',
              type: 'input',
              name: 'part_b_account',
              value: '',
              placeholder: '输入供应商名称以供选择供应商'
            },
            companyDutyParagraph: {
              label: '账户税号',
              type: 'input',
              name: 'part_b_duty',
              value: '',
              placeholder: '输入供应商名称以供选择供应商'
            },
            companyBankName: {
              label: '开户银行',
              type: 'input',
              name: 'part_b_bank',
              value: ''
            },
            companyAccountId: {
              label: '开户账号',
              type: 'input',
              name: 'part_b_bank_account',
              value: ''
            },
            companyAddress: {
              label: '公司地址',
              type: 'input',
              name: 'part_b_addr',
              value: ''
            }
          }
        },
        maxMemberNo: 0,
        canSubmit: true,
        allInvoice: [],
        allPartA: [],
        allPartB: [],
        allContract: [],
        customerId: null,
        customerName: null,
        toastMsg: '',
        toastStatus: '',
        isToast: false,
        projectName: null,
        projectId: null,
        brand: null,
        isAuditor: false,
        toolkitName: '长图视频',
        formData: {
          projectId: null,
          productId: 10,
          toolkitId: null,
          startTime: null,
          endTime: null,
          taskData: [],
          auditorId: null,
          level: null,
          taskName: null,
          formData: {},
          operationInfo: []
        },
        basicInfo: {
          taskName: {
            label: '任务名称',
            placeholder: '填写任务名称（必填）',
            type: 'input'
          },
          endTime: {
            label: '截止时间',
            placeholder: '设置截止时间',
            type: 'datetime'
          }
        },
        basicValue: {
          'projectId': null,
          'productId': 10,
          'toolkitId': null,
          'startTime': null,
          'endTime': null,
          'taskData': [],
          'auditorId': null,
          'level': null,
          'taskName': '',
          'taskForm': '',
          'operationInfo': []
        },
        taskFormData: JSON.parse(JSON.stringify(formConf[452]))
      }
    },
    methods: {
      init () {
        this.setToolkit()
      },
      changeProject (e) {
        this.basicValue.projectId = e
        this.formData.productId = e
        this.getTaskLoading(e)
      },
      switchChange (v, key) {
        if (v) {
          if (!this.taskFormData.contactsInfo[key]) {
            const contactTpl = JSON.parse(JSON.stringify(this.qcTpl))
            // this.taskFormData.contactsInfo[key] = contactTpl
            this.$set(this.taskFormData.contactsInfo, key, contactTpl)
          }
        }
      },
      getTaskLoading (projectId) {
        this.$http.post(Task.addIndex, this.qs.stringify({projectId, toolkitId: 452}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data

          if (_data.retCode === 0) {
            this.projectName = _data.retData.projectInfo.projectName
            this.projectId = _data.retData.projectInfo.projectId
            this.brand = _data.retData.projectInfo.customerName
            this.customerId = _data.retData.projectInfo.customerId
            this.customerName = _data.retData.projectInfo.customerName

            this.tips = _data.retData.tipsInfo
            this.contractTpl = _data.retData.toolkitInfo
            if (_data.retData.auditorId) {
              this.isAuditor = true
            } else {
              this.isAuditor = false
            }
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        })
      },
      setToolkit () {
        this.toolkitId = 452
        this.basicValue.toolkitId = 452
        this.formData.toolkitId = 452
      },
      saveLeavePage () {
        delete this.basicValue.productId
        delete this.basicValue.projectId
        let data = {
          isQC: this.isQC,
          basicValue: this.basicValue,
          taskFormData: this.taskFormData
        }
        const Data = JSON.stringify(data)

        const uploadData = {
          funcType: 'task',
          funcSubType: 452,
          act: 'add',
          formContent: Data
        }

        ajax.post(cacheData.setInfo, uploadData).then(() => {
          this.isSaved = true
          this.$store.dispatch('toggleMenuJump', true)
          this.routerNext()
        }).catch(() => {
          this.isToast = true
          this.toastMsg = '草稿箱保存失败，请重试'
        })
        setTimeout(() => {
          this.isToast = false
        }, 1500)
      },
      leaveCancel () {
        this.$store.dispatch('setCurrMenu', this.menu)
        sessionStorage.setItem('currMenu', this.menu)
        this.isLeaveConfirm = false
      },
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      },
      loadDraft () {
        const _draft = this.draftInfo.formContent
        const draft = JSON.parse(_draft)
        this.isQC = draft.isQC
        this.basicValue = draft.basicValue
        this.taskFormData = draft.taskFormData

        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      submitAdvice () {
        // this.repoFormat = this.repo.replace(/\n/g, '<br/>')
        this.$http.post(Task.adviceRepo, this.qs.stringify({toolkitId: 452, content: this.repo}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          if (res.data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '提交成功'
            this.toastState = 'success'
            setTimeout(() => {
              this.isToast = false
              this.repo = ''
            }, 1500)
          }
        })
      },
      submit () {
        if (this.canSubmit) {
          this.canSubmit = false

          let noVali = false

          // 通用验证
          if (!this.basicValue.taskName || this.basicValue.taskName === '') {
            this.toastMsg = '请填写任务名'
            this.toastStatus = null
            noVali = true
          } else if (!this.basicValue.endTime || this.basicValue.endTime === '') {
            this.toastMsg = '请选择截止时间'
            this.toastStatus = null
            noVali = true
          } else if (new Date(this.basicValue.endTime.replace(/-/g, '/')) < new Date()) {
            this.toastMsg = '截止日期/时间不能小于当前日期/时间'
            this.toastStatus = null
            noVali = true
          }
          if (this.taskFormData.hasOwnProperty('formData')) {
            for (let i = 0; i < this.taskFormData.formData.length; i++) {
              let item = this.taskFormData.formData[i]
              for (let j = 0; j < item.length; j++) {
                let _item = item[j]
                if ((_item.hasOwnProperty('required') && _item.required) && (_item.value.length === 0 || !_item.value)) {
                  this.toastMsg = `请填写${_item.label}`
                  this.toastStatus = null
                  noVali = true
                  break
                }
                if (_item.hasOwnProperty('requiredOpt')) {
                  let v = _item.value
                  let keyV
                  if (_item.requiredOpt[0].key) {
                    keyV = item[_item.requiredOpt[0].key].value
                  }

                  if (_item.requiredOpt[0].type === '>') {
                    if (_item.requiredOpt[0].valueType === 'date') {
                      let _v = new Date(v.replace(/-/g, '/'))
                      if (_item.requiredOpt[0].key) {
                        let _keyV = new Date(keyV.replace(/-/g, '/'))
                        if (_v < _keyV) {
                          this.toastMsg = `${_item.label} 必须 大于 ${item[_item.requiredOpt[0].key].label}`
                          this.toastStatus = null
                          noVali = true
                          break
                        }
                      } else if (_item.requiredOpt[0].target && _item.requiredOpt[0].target === 'now') {
                        if (_v < new Date()) {
                          this.toastMsg = `${_item.label} 不得小于 当前时间`
                          this.toastStatus = null
                          noVali = true
                          break
                        }
                      }
                    }
                  } else if (_item.requiredOpt[0].type === '<') {
                    if (_item.requiredOpt[0].valueType === 'date') {
                      let _v = new Date(v.replace(/-/g, '/'))
                      if (_item.requiredOpt[0].key) {
                        let _keyV = new Date(keyV.replace(/-/g, '/'))
                        if (_v > _keyV) {
                          this.toastMsg = `${_item.label} 必须 小于 ${item[_item.requiredOpt[0].key].label}`
                          this.toastStatus = null
                          noVali = true
                          break
                        }
                      } else if (_item.requiredOpt[0].target && _item.requiredOpt[0].target === 'now') {
                        if (_v > new Date()) {
                          this.toastMsg = `${_item.label} 不得大于 当前时间`
                          this.toastStatus = null
                          noVali = true
                          break
                        }
                      }
                    }
                  }
                }
              }
              if (noVali) {
                break
              }
            }
          }

          // 执行人 & 质检人验证
          if (this.taskFormData.hasOwnProperty('operationInfo')) {
            let operationCount = 0
            for (let i = 0; i < this.taskFormData.operationInfo.length; i++) {
              let item = this.taskFormData.operationInfo[i]
              if (
                item.hasOwnProperty('content') &&
                item.content.txt &&
                item.content.txt.length !== 0 &&
                item.content.txt !== ''
              ) {
                if (+this.$route.params.toolkitId !== 27 && +this.$route.params.toolkitId !== 20 && +this.$route.params.toolkitId !== 19 && +this.$route.params.toolkitId !== 18 && +this.$route.params.toolkitId !== 21 && +this.$route.params.toolkitId !== 22) {
                  if (!item.operationId || item.operationId === '' || !item.inspectorId || item.inspectorId === '') {
                    this.toastMsg = '请选择执行 / 申请 / 质检 / 审核人'
                    this.toastStatus = null
                    noVali = true
                    break
                  }
                } else {
                  if (!item.operationId || item.operationId === '') {
                    this.toastMsg = '请选择执行 / 申请人'
                    this.toastStatus = null
                    noVali = true
                    break
                  }
                }
              }

              if (item.hasOwnProperty('content') && item.content.hasOwnProperty('endTime') && item.content.endTime && this.basicValue.endTime) {
                let deadLine = new Date(item.content.endTime.replace(/-/g, '/'))
                let totalDate = new Date(this.basicValue.endTime.replace(/-/g, '/'))
                if (item.content.endTime.length === 0 || item.content.endTime === '') {
                  this.toastMsg = '请选择截止时间'
                  this.toastStatus = null
                  noVali = true
                  break
                }
                if (deadLine > totalDate) {
                  this.toastMsg = '执行截止时间必须早于任务截止时间'
                  this.toastStatus = null
                  noVali = true
                }
              }
              if (+this.$route.params.toolkitId !== 27 && +this.$route.params.toolkitId !== 20 && +this.$route.params.toolkitId !== 19 && +this.$route.params.toolkitId !== 18 && +this.$route.params.toolkitId !== 21 && +this.$route.params.toolkitId !== 22) {
                if (
                  item.operationId &&
                  item.operationId !== '' &&
                  item.inspectorId &&
                  item.inspectorId !== ''
                ) {
                  operationCount++
                }
              } else {
                if (
                  item.operationId &&
                  item.operationId !== ''
                ) {
                  operationCount++
                }
              }

              if (operationCount > 1) {
                break
              }
            }
            if (operationCount === 0) {
              this.toastMsg = '请选择执行 / 申请 / 质检 / 审核人'
              this.toastStatus = null
              noVali = true
            }
          }
          if (this.taskFormData.hasOwnProperty('contactsInfo')) {
            this.taskFormData.contactsInfo.forEach((item) => {
              if (item && item.hasOwnProperty('customerInfo') && (item.customerInfo.customerId === '' || !item.customerInfo.customerId)) {
                this.toastMsg = '请选择甲方'
                this.toastStatus = null
                noVali = true
              }
              if (item && item.hasOwnProperty('companyInfo') && (item.companyInfo.companyId === '' || !item.companyInfo.companyId)) {
                this.toastMsg = '请选择乙方'
                this.toastStatus = null
                noVali = true
              }
              if (item && item.hasOwnProperty('baseInfo')) {
                if (!item.baseInfo.contactsType || item.baseInfo.contactsType === '') {
                  this.toastMsg = '请选择文件类型'
                  this.toastStatus = null
                  noVali = true
                } else if (!item.baseInfo.organization) {
                  this.toastMsg = '请选择组织单位'
                  this.toastStatus = null
                  // } else if (!item.baseInfo.platform) {
                  //   this.toastMsg = '请选择合作平台'
                  //   this.toastStatus = null
                } else if (!item.baseInfo.portrait) {
                  this.toastMsg = '请选择肖像授权主体'
                  this.toastStatus = null
                }
              }
            })
          }
          if (noVali) {
            this.isToast = true
            setTimeout(() => {
              this.isToast = false
              this.toastMsg = null
              this.toastStatus = null
              this.canSubmit = true
            }, 1500)
            return
          }

          this.basicValue.operationInfo = this.taskFormData.operationInfo
          this.basicValue.taskForm = {
            taskInfo: this.taskFormData.formData,
            showCase: this.taskFormData.showCase,
            contactsInfo: this.taskFormData.contactsInfo
          }
          let postUrl = Task.add
          this.$http.post(postUrl, this.qs.stringify(this.basicValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
            let _data = res.data
            if (_data.retCode !== 0) {
              this.isToast = true
              this.toastMsg = _data.retMsg
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            } else {
              this.isToast = true
              this.toastStatus = 'success'
              this.toastMsg = '提交成功'
              this.isSaved = true
              localStorage.removeItem('addTask')
            }
            setTimeout(() => {
              this.isToast = false
              this.canSubmit = true
              if (_data.retCode === 0) {
                this.$router.push('/PRAudit/452')
              }
            }, 1500)
          })
        }
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .form-btns {
    position: absolute;
    left: 100%;
    bottom: 16px;
    margin-left: 32px;
  }
</style>
