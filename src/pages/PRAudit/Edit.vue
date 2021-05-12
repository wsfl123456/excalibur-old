<template>
  <div class="edit-form">
    <!--<toolkit :add-icon-disabled="true"></toolkit>-->
    <Card class="form-card">
      <h2 slot="title">修改{{toolkitName}}任务</h2>
      <Row v-if="!isLoading">
        <i-col span="17" class="task-form">
          <contract-tpl v-if="contractTpl && contractTpl.length > 0" :tpls="contractTpl"></contract-tpl>

          <!--基础通用模块-->
          <task-edit-form :form-value="basicValue" :form-label="basicInfo"></task-edit-form>

          <div v-if="showCase">
            <task-p-r-content :id-params="formData" :project-id="formData.projectId" :customer-id="formData.customerId" is-from-menu  :toolkit-id="toolkitId" :form-value="showCase" @on-change="changeProject"></task-p-r-content>
          </div>

          <!--常规模块-->
          <div v-for="(item, index) in formInfoData" :key="'formInfo-' + index">
            <task-edit-form type="formData" :form-label="item" :form-value="item" :project-id="projectId"
                            :tips="tips"></task-edit-form>
          </div>


          <!--合同模块-->
          <template v-if="+loadedData.info.toolkitId === 16 || +loadedData.info.toolkitId === 17">
            <div v-for="(value, idx) in contactsInfo" :key="'contacts-' + idx">
              <div v-if="value.hasOwnProperty('baseInfo')">
                <task-edit-form type="contacts" :form-label="value.baseInfo" :form-value="value.baseInfo"
                                :tips="tips"></task-edit-form>
              </div>

              <div v-if="value.hasOwnProperty('customerInfo')">
                <task-edit-form type="customer" :form-label="value.customerInfo" :form-value="value.customerInfo"
                                :all-part-a="allPartA" :all-part-b="allPartB" :tips="tips" :project-id="projectId"
                                :customer-id="customerId"></task-edit-form>
              </div>
              <div v-if="value.hasOwnProperty('companyInfo')">
                <task-edit-form type="company" :form-label="value.companyInfo" :form-value="value.companyInfo"
                                :all-part-a="allPartA" :all-part-b="allPartB" :tips="tips"></task-edit-form>
              </div>
            </div>
          </template>

          <!--执行人 申请人 etc 模块-->
          <div v-for="(value, key) in operationInfo"
               :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key ">
            <task-edit-form type="operationLoad" :form-label="value" :form-value="value"
                            @on-add="addOperation($event, key)" @on-remove="removeOperation($event, key)"
                            :switch-val="isQC" :switch-key="key" @on-switch="switchChange($event, key)"
                            :toolkitId="loadedData.info.toolkitId" :tips="tips"
                            :project-id="projectId"
                            :can-del-operater="operationInfo.length > 1"
            ></task-edit-form>
            <template v-if="isQC[key]">
              <div>
                <task-edit-form is-filter type="company" :form-label="contactsInfo[key].companyInfo"
                                :form-value="contactsInfo[key].companyInfo" :all-part-a="allPartA"
                                :all-part-b="allPartB"></task-edit-form>
              </div>
            </template>
          </div>
          <!--<div v-for="(value, key) in operationInfo" :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key ">-->
          <!--<task-edit-form type="operationLoad" :project-id="loadedData.info.projectId" :form-label="value" :form-value="value" @on-add="addOperation($event, key)" :toolkitId="loadedData.info.toolkitId"></task-edit-form>-->
          <!--</div>-->

          <!--审核人模块-->

          <task-edit-form type="auditor" v-if="isAuditor"></task-edit-form>
          <div class="form-btns">
            <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">提交任务</Button>
          </div>
        </i-col>

      </Row>

    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>
    <loading v-if="isLoading"></loading>
    <Modal v-model="feedModal" class-name="vertical-center-modal examine-modal" ok-text="提交意见" :closable="false"
           @on-ok="submitAdvice">
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
  import {Task, cacheData} from '../../API/api'
  import TaskPRContent from '../../components/TaskPRContent'
  import {ajax} from '../../util/util'
  import Loading from '../../components/popup/Loading'

  export default {
    name: 'Edit',
    components: {Loading, TaskPRContent, LoadDraftModal, LeaveModal, Toast, TaskEditForm},
    data () {
      return {
        menu: null,
        isSaved: false,
        isDraft: false,
        isLeaveConfirm: false,
        canSubmit: true,
        repo: '',
        feedModal: false,
        isQC: [],
        tips: [],
        allInvoice: [],
        allContract: [],
        allPartA: [],
        allPartB: [],
        contractTpl: [],
        customerId: null,
        customerName: null,
        isLoading: false,
        toastMsg: '',
        toolkitId: 452,
        toastStatus: '',
        operationInfo: [],
        mediaKOL: {},
        seal: {},
        isToast: false,
        projectName: null,
        projectId: '',
        brand: null,
        isAuditor: false,
        toolkitName: '长图视频',
        loadedData: {},
        formInfoData: [],
        reimbursement: [],
        invoice: {},
        express: {},
        askMoney: {},
        techProject: {},
        dashboard: {},
        showCase: {},
        contactsInfo: [],
        formData: {
          projectId: null,
          customerId: null,
          productId: null,
          toolkitId: 452,
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
        basicValue: {},
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
        maxMemberNo: 0
      }
    },
    methods: {
      init () {
        this.cacheMenu()
      },
      changeProject (e) {
        this.basicValue.projectId = e
        this.formData.productId = e
        this.getTaskLoading(e)
      },
      openFeed () {
        this.feedModal = true
      },
      submitAdvice () {
        // this.repoFormat = this.repo.replace(/\n/g, '<br/>')
        this.$http.post(Task.adviceRepo, this.qs.stringify({
          toolkitId: this.loadedData.info.toolkitId,
          content: this.repo
        }), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      switchChange (v, key) {
        console.log(v, key)
        console.log(this.contactsInfo)
        if (v) {
          if (!this.contactsInfo[key]) {
            const contactTpl = JSON.parse(JSON.stringify(this.qcTpl))
            // this.taskFormData.contactsInfo[key] = contactTpl
            this.$set(this.contactsInfo, key, contactTpl)
          }
        }
      },
      submit () {
        let noVali = false
        if (this.canSubmit) {
          this.canSubmit = false
          if (+this.loadedData.info.toolkitId === 2) {
            this.isQC.forEach((item, idx) => {
              if (!item) {
                this.contactsInfo[idx] = null
              }
            })
            if (this.isQC.length === 0) {
              this.contactsInfo = []
            }
          }

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

          if (this.hasOwnProperty('formInfoData') && this.formInfoData) {
            for (let i = 0; i < this.formInfoData.length; i++) {
              let item = this.formInfoData[i]
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
          if (this.hasOwnProperty('operationInfo') && this.operationInfo) {
            let operationCount = 0
            for (let i = 0; i < this.operationInfo.length; i++) {
              let item = this.operationInfo[i]
              if (
                item.hasOwnProperty('content') &&
                item.content.txt &&
                item.content.txt.length !== 0 &&
                item.content.txt !== ''
              ) {
                if (+this.loadedData.info.toolkitId !== 27 && +this.loadedData.info.toolkitId !== 20 && +this.loadedData.info.toolkitId !== 19 && +this.loadedData.info.toolkitId !== 18 && +this.loadedData.info.toolkitId !== 21 && +this.loadedData.info.toolkitId !== 22) {
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
              if (item.hasOwnProperty('content') && item.content.hasOwnProperty('endTime')) {
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
              if (+this.loadedData.info.toolkitId !== 27 && +this.loadedData.info.toolkitId !== 20 && +this.loadedData.info.toolkitId !== 19 && +this.loadedData.info.toolkitId !== 18 && +this.loadedData.info.toolkitId !== 21 && +this.loadedData.info.toolkitId !== 22) {
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

          // 合同验证
          if (this.hasOwnProperty('contactsInfo') && this.contactsInfo) {
            this.contactsInfo.forEach((item) => {
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

          this.basicValue.operationInfo = []

          this.operationInfo.forEach((item) => {
            this.basicValue.operationInfo.push({
              operationId: item.operationId,
              inspectorId: item.inspectorId,
              content: item.content,
              taskPersonId: item.taskPersonId
            })
          })

          this.basicValue.taskForm = {
            taskInfo: this.formInfoData,
            contactsInfo: this.contactsInfo,
            reimbursement: this.reimbursement,
            askMoney: this.askMoney,
            invoice: this.invoice,
            express: this.express,
            techProject: this.techProject,
            dashboard: this.dashboard,
            showCase: this.showCase,
            mediaKOL: this.mediaKOL,
            seal: this.seal
          }

          this.basicValue.taskData = this.taskData.map((item) => {
            delete item.fileId
            return item
          })
          this.$http.post(Task.edit, this.qs.stringify(this.basicValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
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
            }
            setTimeout(() => {
              this.isToast = false
              this.canSubmit = true

              if (_data.retCode === 0) {
                // this.$router.push('/tasks/list/' + this.loadedData.info.projectId)
                this.$router.push('/PRAudit/452')
              }
            }, 1500)
          })
        }
      },
      getTaskLoading () {
        this.isLoading = true
        this.$http.post(
          Task.editIndex,
          this.qs.stringify({taskId: this.$route.params.id}),
          {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}
        )
          .then((res) => {
            let _data = res.data
            this.isLoading = false
            if (_data.retCode === 0) {
              this.loadedData = _data.retData.data
              this.toolkitName = _data.retData.data.info.taskName
              this.tips = _data.retData.data.tipsInfo
              this.basicValue = {
                'taskId': this.$route.params.id,
                'startTime': null,
                'endTime': _data.retData.data.info.endTime,
                'taskData': [],
                'auditorId': _data.retData.data.info.auditorId,
                'level': _data.retData.data.info.level,
                'taskName': _data.retData.data.info.taskName
              }

              this.operationInfo = _data.retData.data.operationInfo
              this.taskData = _data.retData.data.taskData
              this.formInfoData = _data.retData.data.formInfo[0].formContent.taskInfo
              this.contactsInfo = _data.retData.data.formInfo[0].formContent.contactsInfo || []
              this.showCase = _data.retData.data.formInfo[0].formContent.showCase

              this.projectName = _data.retData.data.projectInfo.projectName
              this.formData.projectId = _data.retData.data.info.projectId
              this.brand = _data.retData.data.projectInfo.customerName
              this.formData.customerId = _data.retData.data.projectInfo.customerId
              this.customerName = _data.retData.data.projectInfo.customerName
              this.contractTpl = _data.retData.data.toolkitInfo

              if (+_data.retData.data.info.toolkitId === 2) {

              }
              if (+this.loadedData.info.toolkitId === 2 && this.contactsInfo && this.contactsInfo.length > 0) {
                this.contactsInfo.forEach((item) => {
                  if (item) {
                    this.isQC.push(true)
                  }
                })
              }
              // _data.retData.data
              if (_data.retData.auditorId) {
                this.isAuditor = true
              } else {
                this.isAuditor = false
              }

              this.parserDraft()
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          })
      },

      leaveConfirm (next) {
        if (!this.isSaved) {
          next(false)
          this.isLeaveConfirm = true
        } else {
          next()
        }
      },
      leaveCancel () {
        this.$store.dispatch('setCurrMenu', this.menu)
        sessionStorage.setItem('currMenu', this.menu)
        this.isLeaveConfirm = false
      },
      parserDraft () {
        const loadData = {
          funcType: 'task',
          funcSubType: +this.loadedData.info.toolkitId,
          act: 'edit',
          objectId: this.$route.params.id
        }
        ajax.post(cacheData.getInfo, loadData).then(res => {
          this.isDraft = !!res.draftInfo
          this.draftInfo = res.draftInfo
        }).catch(() => {})
      },
      loadDraft () {
        const _draft = this.draftInfo.formContent
        const draft = JSON.parse(_draft)
        console.log(draft)
        this.isQC = draft.isQC
        this.loadedData = draft.loadedData
        this.toolkitName = draft.toolkitName
        this.basicValue = draft.basicValue
        this.operationInfo = draft.operationInfo
        this.taskData = draft.taskData
        this.formInfoData = draft.formInfoData
        this.contactsInfo = draft.contactsInfo
        this.reimbursement = draft.reimbursement
        this.askMoney = draft.askMoney
        this.invoice = draft.invoice
        this.express = draft.express
        this.techProject = draft.techProject
        this.dashboard = draft.dashboard
        this.showCase = draft.showCase
        this.mediaKOL = draft.mediaKOL
        this.seal = draft.seal
        this.cancelDraft()
      },
      cancelDraft () {
        this.isDraft = false
      },
      saveLeavePage () {
        let data = {
          isQC: this.isQC,
          loadedData: this.loadedData,
          toolkitName: this.toolkitName,
          basicValue: this.basicValue,
          operationInfo: this.operationInfo,
          taskData: this.taskData,
          formInfoData: this.formInfoData,
          contactsInfo: this.contactsInfo,
          reimbursement: this.reimbursement,
          askMoney: this.askMoney,
          invoice: this.invoice,
          express: this.express,
          techProject: this.techProject,
          dashboard: this.dashboard,
          showCase: this.showCase,
          mediaKOL: this.mediaKOL,
          seal: this.seal
        }
        const Data = JSON.stringify(data)

        const uploadData = {
          funcType: 'task',
          funcSubType: +this.loadedData.info.toolkitId,
          act: 'edit',
          objectId: this.$route.params.id,
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
      leavePage () {
        this.isSaved = true
        this.$store.dispatch('toggleMenuJump', true)
        this.routerNext()
      }
    },
    created () {
      this.getTaskLoading()
      this.init()
    },
    beforeRouteLeave (to, from, next) {
      // next()
      this.leaveConfirm(next)
      this.routerNext = next
    }
  }
</script>

<style scoped lang="less">
  .edit-form {
    .form-btns {
      position: absolute;
      left: 100%;
      bottom: 16px;
      margin-left: 32px;
    }
    .form-default-btn {
      margin-top: 16px;
      width: 120px;
    }
    .primary-hole {
      background-color: #fff;
      color: #2d8cf0;
    }
    .task-belong {
      a {
        text-decoration: underline;
      }
    }
    .task-form {
      position: relative;
    }
    .form-card {
      &:hover {
        box-shadow: 0 0 0;
      }
      .ivu-card-head {
        background-color: #f8f9fa;
        padding-left: 24px;
        padding-right: 24px;
        h2 {
          font-size: 14px;
          color: #343a40;
        }
      }
      .ivu-card-body {
        padding: 32px;
      }
    }

  }
</style>
