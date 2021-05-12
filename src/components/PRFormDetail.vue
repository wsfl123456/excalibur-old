<template>
  <div class="list-detail">
    <!--<Alert v-if="taskData && taskData.info.state === 9" type="error" class="nopass">-->
    <Alert v-if="taskData.formInfo[verSelect].auditShenPiReason && +taskData.info.state === 7" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        审批不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="taskData.formInfo[verSelect].auditShenPiReason" disabled></i-input>
      </span>
    </Alert>
    <Alert v-if="taskData.formInfo[verSelect].auditReason" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        <!--{{taskData.info.stateName}}-->
        审核不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="taskData.formInfo[verSelect].auditReason" disabled></i-input>

        <!--{{taskData.info.auditReason}}-->
      </span>
    </Alert>
    <!--<Alert v-if="taskData && taskData.info.state === 7" type="error" class="nopass">-->
      <!--<span class="alert-title">-->
        <!--<Icon type="android-alert" size="20"></Icon>-->
        <!--&lt;!&ndash;质检不通过&ndash;&gt;-->
        <!--{{taskData.info.stateName}}-->

      <!--</span>-->
      <!--<span class="alert-detail">-->
        <!--<i-input type="textarea" autosize :value="taskData.info.inspectedReason" disabled></i-input>-->
        <!--&lt;!&ndash;{{taskData.info.inspectedReason}}&ndash;&gt;-->
      <!--</span>-->
    <!--</Alert>-->

    <Alert v-if="taskData && taskData.roleInfo.customer === 'show'" type="success" class="isCheckContract">
      <span class="alert-detail">
        <Checkbox size="large" class="default-form-chkbox-group" v-model="isCheckContract" @on-change="checkContract">
          <template v-if="+taskData.info.toolkitId === 16">
            双方已确认合同，开启盖章流程
          </template>
          <template v-else>
            双方已确认报价单，开启盖章流程
          </template>
        </Checkbox>
      </span>
    </Alert>


    <div class="container">
      <div class="detail-box">
        <Row v-if="isDetail && !isLoading">
          <i-col span="17" class="g-relative" style="min-height: 300px;">
            <div >
              <!--合同模板-->
              <contract-tpl v-if="contractTpl && contractTpl.length > 0" :tpls="contractTpl"></contract-tpl>

              <!--中心思想等-->
              <task-display-form :form-value="taskData.formInfo[verSelect].formContent.taskInfo" :ver-time="taskData.formInfo[verSelect].createTime" type="formData" :ver-count="taskData.formInfo.length" :active-ver="verSelect" @on-change="changeVer" :tips="tips"></task-display-form>

              <task-display-form v-if="taskData.formInfo[verSelect].formContent.hasOwnProperty('showCase')" type="showCase" :form-value="taskData.formInfo[verSelect].formContent.showCase" :ver-time="taskData.formInfo[verSelect].createTime" :active-ver="verSelect" :tips="tips"></task-display-form>

              <!--合同-->
              <template v-if="+$route.params.toolkitId === 16 || +$route.params.toolkitId === 17 || +taskData.info.toolkitId === 16 || +taskData.info.toolkitId === 17" v-for="(value, idx) in taskData.formInfo[verSelect].formContent.contactsInfo">
                <task-display-form v-if="value.hasOwnProperty('baseInfo')" :form-value="value.baseInfo"  type="contacts" :active-ver="verSelect" :ver-time="taskData.formInfo[verSelect].createTime" :tips="tips"></task-display-form>
                <task-display-form v-if="value.hasOwnProperty('customerInfo')" :form-value="value.customerInfo"  type="customer" :active-ver="verSelect" :ver-time="taskData.formInfo[verSelect].createTime" :tips="tips"></task-display-form>
                <task-display-form v-if="value.hasOwnProperty('companyInfo')" :form-value="value.companyInfo"  type="company" :active-ver="verSelect" :ver-time="taskData.formInfo[verSelect].createTime" :tips="tips"></task-display-form>
              </template>

              <!--任务审核-->
              <task-display-form v-if="taskData.info.hasOwnProperty('auditorId')" :form-value="taskData.info" type="auditor"></task-display-form>

            </div>
            <div class="form-btns">
              <div v-if="taskData.roleInfo.eidt !== 'hide'">
              <!--<div>-->
                <router-link :to="'/PREdit/' + taskData.info.id">
                  <Button type="primary" class="submit-btn form-default-btn" size="large">编辑任务</Button>
                </router-link>
              </div>
              <div v-if="taskData.info.state === 1 && taskData.roleInfo.audit !== 'hide'">
              <!--<div>-->
                <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(3, '', [])">审核通过</Button>
                <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(2)">审核不通过</Button>
              </div>
              <div v-if="(+taskData.info.toolkitId === 27 || +taskData.info.toolkitId === 19 || +taskData.info.toolkitId === 20 || +taskData.info.toolkitId === 18 || +taskData.info.toolkitId === 21 || +taskData.info.toolkitId === 22) && taskData.roleInfo.inspect !== 'hide'">
                <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(6, '', [])">审核通过</Button>
                <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(7)">审核不通过</Button>

              </div>
              <div v-if="taskData.roleInfo.audit === 'show' && taskData.info.state !== 1">
                <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(6, '', [])">审批通过</Button>
                <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(7)">审批不通过</Button>
              </div>
            </div>
          </i-col>
          <i-col span="6" offset="1">
            <Row class="g-mb-16">
              <i-col span="3" offset="1">
                <Tooltip  content="项目" placement="bottom">
                  <Icon type="home"></Icon>
                </Tooltip>
              </i-col>
              <i-col span="20">
                <router-link :to="`/projects/detail/${taskInfo.projectId}`">{{taskInfo.projectName}}</router-link>
              </i-col>
            </Row>
            <Row>
              <i-col span="3" offset="1">
                <Tooltip  content="品牌" placement="bottom">
                  <Icon type="card"></Icon>
                </Tooltip>
              </i-col>
              <i-col span="20">
                <router-link to="/v2/resource/brand">{{taskInfo.customerName}}</router-link>
              </i-col>
            </Row>
            <Row>
              <i-col span="3" offset="1">
                <div class="base-tips">
                  <template v-for="tipsItem in tips">
                    <div class="group-tips" v-if="tipsItem.name === '基础Tips'">
                      <Icon type="ios-information" size="24" color="rgb(16, 124, 217)"></Icon>
                      <div class="tips-pop">
                        <div class="tips-head">
                          {{tipsItem.name}}
                          <router-link :to="'/study/tips/' + tipsItem.tipsId" target="_blank">
                            <Icon type="android-expand" size="16" color="rgb(255, 255, 255)"></Icon>
                          </router-link>
                        </div>
                        <div class="tips-body">
                          <div v-html="tipsItem.content"></div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </i-col>
            </Row>
            <Row class="feed-back">
              <i-col offset="1" span="23">
                <Button type="primary" size="large" @click="openFeed">意见反馈</Button>
              </i-col>
            </Row>

          </i-col>
        </Row>

        <!--<pre>{{taskData}}</pre>-->
      </div>



      <template v-if="taskData.hasOwnProperty('operationInfo')" v-for="people in taskData.operationInfo">
        <Alert v-if="people.state === 9 && people.pmReason" type="error" class="nopass">
          <span class="alert-title">
            <Icon type="android-alert" size="20"></Icon>
            PM审核不通过
            <!--{{taskData.info.stateName}}-->
          </span>
            <span class="alert-detail">
            <i-input type="textarea" autosize :value="people.pmReason" disabled></i-input>

              <!--{{taskData.info.pmReason}}-->
          </span>
        </Alert>
        <Alert v-if="people.state === 7 && people.inspectedReason" type="error" class="nopass">
          <span class="alert-title">
            <Icon type="android-alert" size="20"></Icon>
            质检不通过
            <!--{{taskData.info.stateName}}-->
          </span>
            <span class="alert-detail">
            <i-input type="textarea" autosize :value="people.inspectedReason" disabled></i-input>
              <!--{{taskData.info.inspectedReason}}-->
          </span>
        </Alert>
        <div :key="people.taskPersonId" class="detail-submit-file" >
          <!--<div class="detail-submit-file" v-if="isDetail && !isLoading">-->
          <Row>
            <i-col span="17" class="g-relative">
              <!--执行人 申请人 etc 模块-->
              <template >
                <!--<div v-for="(value, key) in taskData.operationInfo" :key="'operation-' + value.content.hasOwnProperty('idxId') ? value.content.idxId : key ">-->
                <div >
                  <task-display-form type="operation" :form-value="people" :tips="tips"></task-display-form>
                  <!--<template v-if="+taskData.info.toolkitId === 2 && taskData.formInfo[verSelect].formContent.contactsInfo">-->
                  <template v-if="+taskData.info.toolkitId !== 16 && +taskData.info.toolkitId !== 17">
                    <template v-if="taskData.formInfo[verSelect].formContent.contactsInfo">
                      <task-display-form
                        v-if="taskData.formInfo[verSelect].formContent.contactsInfo[key]"
                        :form-value="taskData.formInfo[verSelect].formContent.contactsInfo[key].companyInfo"
                        type="company" :active-ver="verSelect"
                        :ver-time="taskData.formInfo[verSelect].createTime" ></task-display-form>
                    </template>
                  </template>
                </div>
              </template>
              <template
                v-if="
                isDetail &&
                !isLoading &&
                (
                  people.roleInfo.operation !== 'hide' ||
                  (
                    people.roleInfo.inspect !== 'hide' &&
                    (
                      +taskData.info.toolkitId !== 27 &&
                      +taskData.info.toolkitId !== 19 &&
                      +taskData.info.toolkitId !== 20 &&
                      +taskData.info.toolkitId !== 18 &&
                      +taskData.info.toolkitId !== 21 &&
                      +taskData.info.toolkitId !== 22
                    )
                  ) ||
                  people.roleInfo.pmAudit !== 'hide' ||
                  people.taskPersonFileList.length > 0
                )"
              >
                <template v-if="people.roleInfo.operation !== 'hide'">
                  <!--<template v-if="+taskData.info.state === 4">-->
                  <template>
                    <template v-if="+people.state === 7 || +people.state === 9" >
                      <task-edit-form
                        v-if="taskData.info.toolkitId === 16"
                        :toolkit-id="taskData.info.toolkitId"
                        type="contractFile"
                        :form-value="people.taskPersonFileList"
                        :form-label="filesForm"
                        @on-add="addFileForm(people.taskPersonFileList)"
                        @on-del="delFileForm(people.taskPersonFileList)"
                      ></task-edit-form>
                      <task-edit-form
                        v-else-if="taskData.info.toolkitId === 17"
                        :toolkit-id="taskData.info.toolkitId"
                        type="quotationFile"
                        :form-value="people.taskPersonFileList"
                        :form-label="filesForm"
                        @on-add="addFileForm(people.taskPersonFileList)"
                        @on-del="delFileForm(people.taskPersonFileList)"
                      ></task-edit-form>
                      <task-edit-form
                        v-else type="file"
                        :toolkit-id="taskData.info.toolkitId"
                        :form-value="people.taskPersonFileList"
                        :form-label="people.taskPersonFileList"
                        @on-add="addFileForm(people.taskPersonFileList)"
                        @on-del="delFileForm(people.taskPersonFileList)"
                      ></task-edit-form>
                    </template>
                    <template v-else>
                      <task-edit-form
                        v-if="taskData.info.toolkitId === 16"
                        :toolkit-id="taskData.info.toolkitId"
                        type="contractFile" :form-value="filesForm"
                        :form-label="filesForm"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                      <task-edit-form
                        v-else-if="taskData.info.toolkitId === 17"
                        :toolkit-id="taskData.info.toolkitId"
                        type="quotationFile"
                        :form-value="filesForm"
                        :form-label="filesForm"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                      <task-edit-form
                        v-else
                        type="file"
                        :toolkit-id="taskData.info.toolkitId"
                        :form-value="filesForm"
                        :form-label="filesForm"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                    </template>
                  </template>

                  <!--</template>-->

                  <!--<template v-else>-->
                  <!--<task-edit-form v-if="taskData.info.toolkitId === 16" :toolkit-id="taskData.info.toolkitId" type="contractFile" :form-value="taskData.inspectFiles" :form-label="filesForm" @on-add="addFileForm" @on-del="delFileForm"></task-edit-form>-->
                  <!--<task-edit-form v-else-if="taskData.info.toolkitId === 17" :toolkit-id="taskData.info.toolkitId" type="quotationFile" :form-value="taskData.inspectFiles" :form-label="filesForm" @on-add="addFileForm" @on-del="delFileForm"></task-edit-form>-->
                  <!--<task-edit-form v-else type="file" :toolkit-id="taskData.info.toolkitId" :form-value="taskData.inspectFiles" :form-label="filesForm" @on-add="addFileForm" @on-del="delFileForm"></task-edit-form>-->
                  <!--</template>-->
                </template>

                <template v-else>
                  <template v-if="people.roleInfo.editfile !== 'hide'">
                    <template v-if="!isEditFile">
                      <task-display-form
                        v-if="taskData.info.toolkitId === 16"
                        type="contractFile"
                        :form-value="people.taskPersonFileList"
                        :form-label="people.taskPersonFileList"
                      ></task-display-form>
                      <task-display-form
                        v-else-if="taskData.info.toolkitId === 17"
                        :form-value="people.taskPersonFileList"
                        type="quotationFile"
                      ></task-display-form>
                      <task-display-form
                        v-else
                        :form-value="people.taskPersonFileList"
                        type="file"
                      ></task-display-form>
                    </template>
                    <template v-else>
                      <task-edit-form
                        v-if="taskData.info.toolkitId === 16"
                        :toolkit-id="taskData.info.toolkitId"
                        type="contractFile"
                        :form-value="people.taskPersonFileList"
                        :form-label="filesForm"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                      <task-edit-form
                        v-else-if="taskData.info.toolkitId === 17"
                        :toolkit-id="taskData.info.toolkitId"
                        :form-value="people.taskPersonFileList"
                        type="quotationFile"
                        :form-label="filesForm"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                      <task-edit-form
                        v-else
                        :form-value="people.taskPersonFileList"
                        :toolkit-id="taskData.info.toolkitId"
                        type="file"
                        @on-add="addFileForm"
                        @on-del="delFileForm"
                      ></task-edit-form>
                    </template>
                  </template>

                  <template v-else>
                    <task-display-form
                      v-if="taskData.info.toolkitId === 16"
                      type="contractFile"
                      :form-value="people.taskPersonFileList"
                      :form-label="people.taskPersonFileList"
                    ></task-display-form>
                    <task-display-form
                      v-else-if="taskData.info.toolkitId === 17"
                      :form-value="people.taskPersonFileList"
                      type="quotationFile"
                    ></task-display-form>
                    <task-display-form
                      v-else
                      :form-value="people.taskPersonFileList"
                      type="file"
                    ></task-display-form>
                  </template>
                </template>
              </template>

              <!--<task-edit-form type="file" :form-value="filesForm" :form-label="filesForm" @on-add="addFileForm"></task-edit-form>-->
              <div class="form-btns">
                <div v-if="[3, 4, 7, 9].indexOf(people.state) >= 0 && people.roleInfo.operation !== 'hide'">
                  <!--<div >-->

                  <Button
                    v-if="(+taskData.info.toolkitId === 27 || +taskData.info.toolkitId === 20 || +taskData.info.toolkitId === 19) && +taskData.info.state === 4" type="primary" class="submit-btn form-default-btn" size="large" @click.native="submitFile"
                  >确认完成</Button>
                  <Button v-else type="primary" class="submit-btn form-default-btn" size="large" @click.native="submitFile(people.taskPersonId, people.taskPersonFileList)">任务提交</Button>
                </div>
                <div v-if="people.roleInfo.editfile !== 'hide' && people.state !== 7">
                  <Button v-if="!isEditFile" type="primary" class="submit-btn form-default-btn" size="large" @click.native="editFile">修改文件</Button>
                  <Button v-else type="primary" class="submit-btn form-default-btn" size="large" @click.native="saveEditFile(people.taskPersonId, people.taskPersonFileList)">确认修改</Button>
                </div>
                <div v-if="people.roleInfo.inspect !== 'hide' && (+taskData.info.toolkitId !== 27 && +taskData.info.toolkitId !== 19 && +taskData.info.toolkitId !== 20 && +taskData.info.toolkitId !== 18 && +taskData.info.toolkitId !== 21 && +taskData.info.toolkitId !== 22)">
                  <!--<div >-->
                  <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(6, '', [], people.taskPersonId)">质检通过</Button>
                  <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(7, people.taskPersonId)">质检不通过</Button>
                </div>
                <div v-if="people.roleInfo.pmAudit !== 'hide' && +taskData.info.toolkitId !== 27">
                  <!--<div >-->
                  <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(8, '', [], people.taskPersonId)">任务完成</Button>
                  <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(9, people.taskPersonId)">任务未完成</Button>
                </div>

              </div>
            </i-col>
          </Row>
        </div>
      </template>

      <div class="detail-files" v-if="isDetail && !isLoading">
        <Row>
          <i-col span="17">
            <Tabs>
              <TabPane :label="item.label" v-for="(item, index) in filesTabs" :key="index">
                <Table class="files-table" :columns="item.title" :data="item.data"></Table>
              </TabPane>
            </Tabs>
          </i-col>
        </Row>
      </div>
    </div>
    <Modal v-model="feedModal" class-name="vertical-center-modal examine-modal" ok-text="提交意见" :closable="false" @on-ok="submitAdvice">
      <div class="advice-repo" v-if="isDetail && !isLoading">
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
    <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
      <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click.native="audit(nopassState, modalValue, [])" :disabled="modalValue.length > 1000">提交</Button>
      </div>
    </Modal>
    <Modal  v-model="isSubmit" class-name="vertical-center-modal submit-modal" ok-text="提交" width="480px" :closable="false" :mask-closable="false">
      <!--{{taskData.info.toolkitId}}-->
      <template v-if="taskData && (+taskData.info.toolkitId === 27 || +taskData.info.toolkitId === 19 || +taskData.info.toolkitId === 20)">
        <p>请确认文件已经上传公盘圆满完成任务了。</p>
      </template>
      <template v-else>
        <p>是否提交任务给质检人进行质检？</p>
      </template>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="cancel bc-transparent hollow-default" @click.native="cancelAudit">取消</Button>
        <Button type="primary" size="large" class="ok" @click.native="audit(5, '', filesForm)" >提交</Button>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  // import FormBox from '../FormBox'

  import { Task } from '../API/api'
  import Loading from './popup/Loading'
  import TaskDisplayForm from './TaskDisplayForm'
  import TaskEditForm from './TaskEditForm'
  import Toast from './popup/Toast'
  import ContractTpl from './ContractTpl'
  import {defaultPlaceholder} from '../assets/conf/taskDefaultIpt'

  export default {
    components: {
      ContractTpl,
      Toast,
      TaskEditForm,
      TaskDisplayForm,
      Loading},
    name: 'p-r-form-detail',
    data () {
      return {
        feedModal: false,
        submitTaskPersonId: null,
        repo: '',
        repoFormat: '',
        contractTpl: [],
        tips: [],
        canAudit: true,
        isCheckContract: false,
        isSubmit: false,
        filesForm: [
          {
            fileName: '',
            url: '',
            contactsAccount: null,
            taxRate: null
          }
        ],
        filesTemp: {
          fileName: '',
          url: '',
          contactsAccount: null,
          taxRate: null
        },
        isToast: false,
        toastState: '',
        toastMsg: '',
        isEditFile: false,
        isModal: false,
        modalValue: '',
        nopassState: null,
        verSelect: 0,
        isLoading: false,
        taskData: null,
        taskInfo: {
          projectName: null,
          customerName: null,
          projectId: null
        },
        filesTabs: [
          {
            label: '文件',
            data: [],
            title: [
              {
                title: '文件名称',
                key: 'fileName',
                sortable: true,
                ellipsis: false,
                className: 'bc-transparent'
              },
              // {
              //   title: '文件地址',
              //   key: 'fileAddress',
              //   sortable: false,
              //   ellipsis: false,
              //   className: 'bc-transparent'
              // }
              // {title: '上传时间', key: 'date', sortable: true, width: 150, className: 'bc-transparent'},
              // {
              //   width: 100,
              //   title: '创建者',
              //   key: 'people',
              //   sortable: true,
              //   className: 'bc-transparent',
              //   render: (h, params) => {
              //     const row = params.row
              //     const avatar = row.people
              //     return h('Avatar', {
              //       props: {
              //         src: avatar,
              //         icon: 'person'
              //       }
              //     })
              //   }
              // },
              {
                // width: 80,
                title: '文件地址',
                key: 'fileAddress',
                sortable: false,
                className: 'bc-transparent',
                render: (h, params) => {
                  const row = params.row
                  const url = row.fileAddress
                  // const color = row.degree === 1 ? '#ff8685' : row.degree === 2 ? '#ffe15b' : '#89ea97'
                  return h('a', {
                    domProps: {
                      href: this._parseFileAddress(url),
                      target: '_blank'
                    }
                  }, url)
                }
              }
            ]
          },
          {
            label: '任务日志',
            data: [],
            title: [
              {
                title: '操作类型',
                key: 'content',
                sortable: true,
                ellipsis: false,
                className: 'bc-transparent'
              },
              {title: '操作时间', key: 'createTime', sortable: true, className: 'bc-transparent'},
              {
                width: 100,
                title: '创建者',
                key: 'creatorName',
                sortable: true,
                className: 'bc-transparent',
                render: (h, params) => {
                  const row = params.row
                  const avatar = row.people
                  return h('Avatar', {
                    props: {
                      src: avatar,
                      icon: row.creatorName ? '' : 'person'
                    }
                  }, row.creatorName ? row.creatorName.substr(0, 2) : '')
                }
              }
            ]
          }
        ]
      }
    },
    computed: {
      isDetail () {
        // return this.$store.state.taskDetailStatus
        return this.$store.state.taskDetail
      },
      selectedTask () {
        return this.$store.state.taskDetail
      }
    },
    watch: {
      isDetail: {
        handler (val) {
          if (val) {
            this.getDetail()
            this.getLog()
          } else {
            this.taskData = null
          }
        },
        immediate: true
      }
    },
    methods: {
      saveEditFile (id, file) {
        let taskData = file.map((item) => {
          const mapItem = {
            fileName: item.fileName,
            url: item.url,
            contactsAccount: item.contactsAccount,
            taxRate: item.taxRate
          }
          return mapItem
        })
        const data = {
          taskId: this.selectedTask.id,
          taskData,
          taskPersonId: id
        }
        this.$http.post(Task.editFile, this.qs.stringify({...data}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          this.isEditFile = false
          if (_data.retCode === 0) {
            this.toastMsg = '文件修改提交成功'
            this.toastState = 'success'
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      },
      editFile () {
        this.isEditFile = true
      },
      openFeed () {
        this.feedModal = true
      },
      submitAdvice () {
        // this.repoFormat = this.repo.replace(/\n/g, '<br/>')
        this.$http.post(Task.adviceRepo, this.qs.stringify({toolkitId: this.taskData.info.toolkitId, content: this.repo}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      cancelAudit () {
        this.isSubmit = false
      },
      checkContract (status) {
        if (status) {
          let data = {
            id: this.selectedTask.id,
            state: 8
          }
          this.$http.post(Task.financeAudit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
            let _data = res.data
            if (_data.retCode !== 0) {
              this.isToast = true
              this.toastMsg = _data.retMsg
              this.isCheckContract = false
            } else if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            } else {
              this.isToast = true
              this.toastStatus = 'success'
              this.toastMsg = '提交成功'
            }
            setTimeout(() => {
              this.isToast = false

              if (_data.retCode === 0) {
                // this.$router.push('/tasks/list/' + this.$route.params.id)
                this.getDetail()
              }
            }, 1500)
          })
        }
      },
      submitFile (taskPersonId, files) {
        this.isSubmit = true
        this.submitTaskPersonId = taskPersonId
        if (files && files.length > 0) {
          this.filesForm = files
        }
      },
      delFileForm (filesForm = this.filesForm) {
        filesForm.pop()
      },
      addFileForm (filesForm = this.filesForm) {
        console.log(filesForm)
        filesForm.push(JSON.parse(JSON.stringify(this.filesTemp)))
      },
      changeVer (n) {
        this.verSelect = n
      },
      showModal (state, id) {
        this.isModal = true
        this.nopassState = state
        this.submitTaskPersonId = id
        if (+state === 7) {
          this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId] ? defaultPlaceholder[this.taskData.info.toolkitId].quality : defaultPlaceholder['default'].quality
        } else if (+state === 9) {
          this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId] ? defaultPlaceholder[this.taskData.info.toolkitId].audit : defaultPlaceholder['default'].audit
        } else {
          this.modalValue = ''
        }
      },

      audit (state, reason, taskData, id) {
        if (this.canAudit) {
          this.canAudit = false
          let data = {
            id: this.selectedTask.id,
            state,
            reason,
            taskData,
            taskPersonId: id || this.submitTaskPersonId
          }

          if (this.taskData.info.hasOwnProperty('isFinance') && this.taskData.info.isFinance) {
            if (+this.taskData.info.toolkitId === 27 || +this.taskData.info.toolkitId === 18 || +this.taskData.info.toolkitId === 19 || +this.taskData.info.toolkitId === 20 || +this.taskData.info.toolkitId === 21 || +this.taskData.info.toolkitId === 22) {
              data.taskForm = {}
            } else {
              data.taskForm = {
                customerInfo: this.taskData.formInfo[0].formContent.contactsInfo[0].customerInfo,
                companyInfo: this.taskData.formInfo[0].formContent.contactsInfo[0].companyInfo,
                baseInfo: this.taskData.formInfo[0].formContent.contactsInfo[0].baseInfo
              }
            }

            this.$http.post(Task.financeAudit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
              let _data = res.data
              if (_data.retCode === 0) {
                this.filesForm = [
                  {
                    fileName: '',
                    url: '',
                    contactsAccount: null,
                    taxRate: null
                  }
                ]
                this.isToast = true
                this.toastMsg = '提交成功'
                this.toastState = 'success'
              } else {
                this.isToast = true
                this.toastMsg = _data.retMsg
                this.toastState = null
              }
              setTimeout(() => {
                this.isToast = false
                this.toastMsg = null
                this.toastState = null
                this.canAudit = true
                if (_data.retCode === 100014) {
                  this.$cookie.delete('token')

                  this.$router.push('/')
                } else if (_data.retCode === 0) {
                  this.getDetail()
                }
              }, 1500)
            })
            // th
          } else {
            this.$http.post(Task.audit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
              let _data = res.data

              if (_data.retCode === 0) {
                this.filesForm = [
                  {
                    fileName: '',
                    url: '',
                    contactsAccount: null,
                    taxRate: null
                  }
                ]
                this.isToast = true
                this.toastMsg = '提交成功'
                this.toastState = 'success'
              } else {
                this.isToast = true
                this.toastMsg = _data.retMsg
                this.toastState = null
              }
              setTimeout(() => {
                this.isToast = false
                this.toastMsg = null
                this.toastState = null
                this.canAudit = true
                if (_data.retCode === 100014) {
                  this.$cookie.delete('token')

                  this.$router.push('/')
                } else if (_data.retCode === 0) {
                  this.getDetail()
                }
              }, 1500)
            })
          }
          // this.$store.dispatch('changeTaskDetail', data)
          this.isModal = false
          this.isSubmit = false
        }
      },
      getDetail () {
        this.isLoading = true
        this.filesForm = [
          {
            fileName: '',
            url: '',
            contactsAccount: null,
            taxRate: null
          }
        ]
        this.$http.post(Task.detail, this.qs.stringify({taskId: this.selectedTask.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.taskData = _data.retData.data
            this.taskInfo.projectName = _data.retData.projectInfo.projectName
            this.taskInfo.projectId = _data.retData.projectInfo.projectId
            this.taskInfo.customerName = _data.retData.projectInfo.customerName
            this.filesTabs[0].data = _data.retData.data.fileList
            this.contractTpl = _data.retData.data.toolkitInfo
            this.tips = _data.retData.data.tipsInfo
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
      getLog () {
        this.$http.post(Task.logs, this.qs.stringify({id: this.selectedTask.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.filesTabs[1].data = _data.retData.data
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
      }
    }
  }
</script>

<style scoped lang="less">
  .form-btns {
    position: absolute;
    left: 100%;
    bottom: 16px;
    margin-left: 32px;
    .form-default-btn {
      margin-top: 16px;
      width: 120px;
      &.hollow-default {
        background-color: #fff;
        color: #2d8ef8;
      }
    }
  }

  .list-detail {
    padding: 16px;
    background-color: #ced4da;
    position: relative;
    .container {
      > div:not(.nopass) {
        padding: 32px 32px 32px 64px;
        background-color: #fff;
        margin-bottom: 16px;
      }
    }
    .detail-submit-file {
      position: relative;
      .nopass {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*width: 100%;*/
      }
    }

    .detail-box {
      padding: 32px 32px 32px 64px;
      background-color: #fff;
      margin-bottom: 16px;
    }
    .isCheckContract {
      margin-bottom: 0!important;
      background-color: #b2f2bb;
      border-radius: 6px 6px 0 0;
      border: 0 none;
      height: 48px;
      line-height: 48px;
      padding: 0;
      font-size: 14px;
      color: #fff;
      overflow: hidden;
      /*display: flex;*/
      .alert-title {
        background-color: #b2f2bb;
        display: inline-block;
        vertical-align: top;
        height: 48px;
        line-height: 48px;
        text-align: center;
        width: 150px;
        margin-right: 24px;
        i {
          line-height: 1;
        }
      }
      .alert-detail {
        color: #495057;
        font-size: 14px;
        padding: 0 32px;
        /*flex: 1;*/
      }
    }
  }
  .task-belong {
    a {
      text-decoration: underline;
    }
  }
</style>
