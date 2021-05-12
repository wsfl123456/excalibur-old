<template>
  <div class="list-detail project-detail">
    <div>
      <div class="g-ta-r g-mb-32">
        <template v-if="roleInfo.btnExec === 'show'">
          <Button type="primary" size="large" @click="changeState(6)" class="g-ml-16">项目执行中</Button>
        </template>
        <template v-if="roleInfo.btnReview === 'show'">
          <Button type="primary" size="large" @click="changeState(7)" class="g-ml-16">项目已完成</Button>
        </template>
        <template v-if="roleInfo.btnClose === 'show'">
          <Button type="primary" size="large" @click="changeState(8)" class="g-ml-16">项目已关闭</Button>
        </template>
        <Button type="primary" size="large" @click="openFeed" class="g-ml-16">意见反馈</Button>
      </div>
      <Tabs v-model="currTab" :animated="false" @on-click="selectTabs">
        <TabPane label="项目详情" name="detail">
          <project-detail-display v-if="currTab == 'detail'" :info="info" :par="par" :parStruct="parStruct" :projectMember="projectMember" :pib="pib" :role="roleInfo" @on-audit="getDetail"></project-detail-display>
        </TabPane>
        <TabPane label="仪表盘" name="dashboard">
          <project-dashboard v-if="Object.keys(roleInfo).length && currTab === 'dashboard'" :projectMember='projectMember' :roleInfo='roleInfo' :tab='currTab'></project-dashboard>
        </TabPane>
        <TabPane label="任务列表" name="tasks">
          <main-list :data="tasks"></main-list>
        </TabPane>
        <TabPane label="文件列表" name="files">
          <Table class="files-table" :columns="filesTabs.title" :data="files"></Table>
        </TabPane>
        <TabPane label="调查问卷" name="questionnaire">
          <survey-list :customer-name="info.customerName" :project-name="info.name" v-if="currTab === 'questionnaire'" :is-loading="isSurveyLoading" :project-id="selectedProject.id" :can-add="surveyRole" :list="surveyList" @on-load="getASQList"></survey-list>
        </TabPane>
      </Tabs>
    </div>

    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
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
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import { Project, Dashborad } from '../API/api'
  import ProjectDetailDisplay from './ProjectDetailDisplay'
  import MainList from './MainList'
  import SurveyList from './SurveyList'
  import ProjectDashboard from './projects/dashboard/index.vue'

  // 1待PAR审核，2PAR审核不通过 3 PAR审核通过 4待PIB审核，5PIB审核不通过 6审核通过执行中
  export default {
    name: 'project-detail',
    components: {
      SurveyList,
      MainList,
      ProjectDetailDisplay,
      Loading,
      Toast,
      ProjectDashboard
    },
    data () {
      return {
        repo: '',
        isSurveyLoading: false,
        feedModal: false,
        currTab: '',
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        projectData: null,
        roleInfo: {},
        info: {},
        par: {},
        parStruct: [],
        projectMember: {},
        surveyRole: false,
        pib: '',
        tasks: [],
        files: [],
        surveyList: [],
        ASQConf: {
          projectId: null,
          page: 1,
          pageSize: 1000
        },
        filesTabs: {
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
        }
      }
    },
    computed: {
      isDetail () {
        return this.$store.state.projects.detail
      },
      selectedProject () {
        return this.$store.state.projects.detail
      }
    },
    watch: {
      isDetail: {
        handler (val) {
          if (val) {
            this.currTab = 'detail'
            this.getDetail()
            this.getFile()
            this.getTasks()
            this.getSurveyRole()
            this.getParstruct()
            this.getProMember()
          } else {
            this.projectData = null
          }
        },
        immediate: true
      }
    },
    methods: {
      getProMember() {
         this.$http
          .post(
            Dashborad.projectsku,
            this.qs.stringify({ projectId: this.selectedProject.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            this.projectMember = res.data.retData;
          })
      },
      getParstruct() {
         this.$http.post(Project.parstruct, this.qs.stringify({projectId: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
          .then(res => {
            this.parStruct = res.data.retData.data
          })
      },
      getSurveyRole () {
        this.$http.post(Project.surveyRole, this.qs.stringify({projectId: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
          .then(res => {
            let _data = res.data
            if (_data.retCode === 0) {
              this.surveyRole = _data.retData.add
            }
          })
          .catch(() => {})
          .finally(() => {})
      },
      selectTabs (name) {
        if (name === 'questionnaire') {
          this.getASQList()
        }
      },
      getASQList () {
        this.isSurveyLoading = true
        this.ASQConf.projectId = this.info.id
        this.$http.post(Project.surveyList, this.qs.stringify(this.ASQConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
          .then(res => {
            const _data = res.data
            if (_data.retCode === 0) {
              if (this.ASQConf.page === 1) {
                this.surveyList = _data.retData.paperList
              } else {
                this.surveyList = this.surveyList.concat(_data.retData.paperList)
              }
            }
          })
          .catch(() => {})
          .finally(() => {
            this.isSurveyLoading = false
          })
      },
      changeState (state) {
        this.$http.post(Project.state, this.qs.stringify({projectId: this.info.id, state}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}})
          .then(res => {
            console.log('res', res)
            const _data = res.data
            this.isToast = true
            this.toastMsg = _data.retMsg
            if (_data.retCode === 0) {
              this.toastMsg = '项目状态已更改'
              this.getDetail()
            }
          })
          .catch(err => {
            console.log('err', err)
          })
          .finally(() => {
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
      },
      openFeed () {
        this.feedModal = true
      },
      submitAdvice () {
        this.$http.post(Project.adviceRepo, this.qs.stringify({projectId: this.info.id, content: this.repo}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
      getTasks () {
        let data = {
          page: 1,
          page_size: 50,
          orderBy: 'createTime',
          asc: 'desc',
          projectId: this.selectedProject.id
        }
        this.$http.post(Project.tasklist, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.tasks = _data.retData.data
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

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
      getFile () {
        let data = {
          page: 1,
          page_size: 50,
          orderBy: 'createTime',
          asc: 'desc',
          projectId: this.selectedProject.id
        }
        this.$http.post(Project.filelist, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.files = _data.retData.data
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

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
        this.$http.post(Project.detail, this.qs.stringify({projectId: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.info = _data.retData.data.projectInfo
            this.par = _data.retData.data.projectPar
            this.roleInfo = _data.retData.data.roleInfo

            this.pib = _data.retData.data.projectPib
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

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

  .list-detail {
    position: relative;
    padding: 16px;
    background-color: #ced4da;
    > div:not(.nopass) {
      /*padding: 32px 32px 32px 64px;*/
      padding: 32px;
      background-color: #fff;
      margin-bottom: 16px;
    }
    /*.nopass {*/
      /*margin-bottom: 0!important;*/
      /*background-color: #ff8685;*/
      /*border-radius: 6px 6px 0 0;*/
      /*border: 0 none;*/
      /*height: 48px;*/
      /*line-height: 48px;*/
      /*padding: 0;*/
      /*font-size: 14px;*/
      /*color: #fff;*/
      /*overflow: hidden;*/
      /*!*display: flex;*!*/
      /*.alert-title {*/
        /*background-color: #fa5252;*/
        /*display: inline-block;*/
        /*vertical-align: top;*/
        /*height: 48px;*/
        /*line-height: 48px;*/
        /*text-align: center;*/
        /*width: 150px;*/
        /*margin-right: 24px;*/
        /*i {*/
          /*line-height: 1;*/
        /*}*/
      /*}*/
      /*.alert-detail {*/
        /*!*flex: 1;*!*/
      /*}*/
    /*}*/
  }
  .task-belong {
    a {
      text-decoration: underline;
    }
  }


</style>
