<template>
    <div class="out-display">
      <div class="addBtn">
        <router-link to="/vacation/addOut" ><Icon type="plus-circled" size="20"></Icon> 新建外出</router-link>
      </div>
      <div class="list-filter">
        <div class="filter-box">
          <RadioGroup type="button" :value="filter.functionType" @on-change="changeFilter">
            <!--<Radio v-for="(item, index) in industry" :key="index" :label="item.id" :disabled="index===0">{{item.industryName}}</Radio>-->
            <Radio disabled>状态</Radio>
            <Radio :label="0" >全部</Radio>
            <Radio :label="1" >我发起的</Radio>
            <Radio :label="3" >待审核</Radio>
            <Radio :label="2" >已审核</Radio>
          </RadioGroup>
        </div>
      </div>

      <div class="result-list">
        <loading v-if="isLoading"></loading>
        <table class="main-list">
          <thead>
          <tr>
            <th  v-for="(item, index) in tableConf" :key="index"  :class="{active: sortTh === index} " :style="{width: item.width + 'px'}">
              <div class="table-cell" :style="{width: item.width + 'px'}">
                {{item.title}}
              </div>
            </th>
          </tr>
          </thead>
          <tbody v-if="list.length > 0">
          <!--<template v-for="(item, index) in data" :key="'data-' + index" >-->
          <template v-for="(item, index) in list"  >
            <tr @click="toggleRow(item, index)">
              <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
                <template v-if="_item.key === 'workState'">
                  <div class="table-cell">
                    {{item.compType}}
                  </div>
                </template>
                <template v-else-if="_item.key === 'type'">
                  <div class="table-cell">
                    {{item.waichu_info.type}}
                  </div>
                </template>
                <template v-else-if="_item.key === 'outTime'">
                  <div class="table-cell">
                    <template v-if="typeof item.waichu_info.time === 'object'">
                      <template v-for="(time, timeIdx) in item.waichu_info.time">
                        {{time | filterYear}} <template v-if="timeIdx === 0"> 至 </template>
                      </template>
                    </template>
                    <template v-else >
                      {{item.waichu_info.time | filterYear}}
                    </template>
                  </div>
                </template>
                <template v-else-if="_item.key === 'industry'">
                  <div class="table-cell">
                    {{item.industryName}}
                  </div>
                </template>
                <template v-else-if="_item.key === 'creatorId'">
                  <div class="table-cell">
                    <Avatar :icon="item.creatorName ? '' : 'person'" :src="item.creatorHeadPic">{{item.creatorName ? item.creatorName.substr(0, 2) : ''}}</Avatar>
                  </div>
                </template>
                <template v-else-if="_item.key === 'createTime'">
                  <div class="table-cell">
                    {{item[_item.key] | filterYear}}

                  </div>
                </template>
                <template v-else>
                  <div class="table-cell">
                    {{item[_item.key]}}
                  </div>
                </template>
              </td>
            </tr>
            <tr v-if="detailIdx === item.id">
              <td :colspan="tableConf.length">
                <div class="list-detail">
                  <loading v-if="isLoading2"></loading>

                  <Alert v-if=" taskData.info.state == 7 && taskData.formInfo && taskData.formInfo[verSelect].inspectedReason" type="error" class="nopass">
                    <span class="alert-title">
                      <Icon type="android-alert" size="20"></Icon>
                      {{taskData.info.stateName}}
                      <!--{{taskData.info.stateName}}-->
                    </span>
                    <span class="alert-detail">
                      <i-input type="textarea" autosize :value="taskData.formInfo[verSelect].inspectedReason" disabled></i-input>
                      <!--{{taskData.info.inspectedReason}}-->
                    </span>
                  </Alert>

                  <div class="container">
                    <div class="detail-box" v-if="taskData">
                      <Row >
                        <i-col span="24" class="g-relative" style="min-height: 300px;">
                          <div  >
                            <!--中心思想等-->
                            <!--<task-display-form :form-value="taskData.formInfo[verSelect].formContent.taskInfo" :ver-time="taskData.formInfo[verSelect].createTime" type="formData" :ver-count="taskData.formInfo.length" :active-ver="verSelect" @on-change="changeVer" ></task-display-form>-->

                            <div v-for="(value, key) in taskData.formInfo[verSelect].formContent.taskInfo" :key="'taskFormData-' + key">
                              <div>
                                <i-form label-position="left" :label-width="88" class="default-form display-form" >
                                  <div class="ver-tabs">
                                    <ul>
                                      <li v-for="n in taskData.formInfo.length" :class="{active: n === verSelect + 1}" @click="changeVer(n - 1)">{{'V' + (taskData.formInfo.length - n + 1)}}</li>
                                    </ul>
                                  </div>
                                  <div class="form-group">
                                    <template v-for="(value, key) in value">
                                      <div >
                                        <FormItem  :label="value.label" class="default-form-item" :required="value.required === 'true'">
                                          <!--<div slot="label" class="form-label ivu-form-item-label" >-->
                                          <!--<div>-->
                                          <!--{{value.label}}-->
                                          <!--</div>-->
                                          <!--</div>-->
                                          <template v-if="value.type === 'select'">
                                            <template v-if="value.from === 'supplier'">
                                              <Select transfer v-model="value.value">
                                                <Option v-for="(assetItem, key) in suppliers" :value="assetItem.id" :key="assetItem.id">{{ assetItem.customerName }}</Option>
                                              </Select>
                                            </template>
                                          </template>
                                          <i-input v-if="value.type === 'input'" type="textarea" :autosize="{minRows: 1, maxRows: 7}" :readonly="value.readonly === 'true' || value.readonly" v-model="value.value" :placeholder="value.placeholder"></i-input>

                                          <input-number v-if="value.type === 'number'" v-model="value.value" :placeholder="value.placeholder"></input-number>

                                          <i-input v-if="value.type === 'textarea'" type="textarea" :autosize="{minRows: 1, maxRows: 7}" v-model="value.value" :placeholder="value.placeholder"></i-input>

                                          <template v-else-if="value.type === 'datetimerange'" >
                                            <DatePicker readonly transfer class="deadline" :options="dateOpt" type="datetimerange" :placeholder="value.placeholder" v-model="value.value" :clearable="false" format="yyyy-MM-dd HH:mm"></DatePicker>
                                          </template>

                                          <RadioGroup v-else-if="value.type === 'radio'" size="large" class="default-form-radio-group" v-model="value.value">
                                            <Radio disabled v-for="(radioItem, radioIndex) in value.items" :key="radioIndex" :label="radioItem.label" class="default-form-radio out-type" style="width: 50%">
                                              {{radioItem.label}}
                                            </Radio>
                                          </RadioGroup>
                                          <Cascader size="large" :render-format="cascaderFormat" :clearable="false" transfer v-if="value.type === 'cascader'" :data="value.items" v-model="value.value"></Cascader>

                                          <div class="default-form-member-selection" v-if="value.type === 'member'">
                                            <!--<common-member  content="选择同行人员" :is-edit="false" :users="value.value"></common-member>-->
                                            <common-member-ii content="选择同行人员" :is-edit="false" :users="value.value"></common-member-ii>
                                            <!--<member-add multi content="选择同行人员" :project-id="projectId" @on-change="selectOutMem($event, value[key], 'value')" :users="value.value"></member-add>-->
                                          </div>
                                          <Cascader disabled v-if="value.type === 'city'" :data="citys" v-model="value.value" placeholder="选择省、市、区"></Cascader>

                                        </FormItem>
                                      </div>
                                    </template>

                                    <div>
                                      <FormItem label="外出项目" class="default-form-item" required>
                                        <Row>
                                          <i-col span="12">
                                            <i-select :value="taskData.formInfo[verSelect].formContent.customerId" placeholder="品牌选择" @on-change="changeCustomer" disabled class="default-form-select">
                                              <i-option v-for="item in allCustomer" :value="item.id.toString()" :key="item.id">{{item.customerName}}</i-option>
                                            </i-select>
                                          </i-col>
                                          <i-col span="12" class="default-form-member-col" v-if="allProject">

                                            <i-select :value="taskData.formInfo[verSelect].formContent.projectId" placeholder="项目选择" disabled class="default-form-select">
                                              <template v-if="taskData.formInfo[verSelect].formContent.customerId && allProject.length > 0">
                                                <i-option v-for="item in allProject" :value="String(item.id)" :key="item.id">{{item.name}}</i-option>
                                              </template>
                                              <template v-else>
                                                <i-option disabled value="">当前品牌没有项目</i-option>
                                              </template>
                                            </i-select>
                                          </i-col>
                                        </Row>
                                      </FormItem>
                                    </div>
                                  </div>
                                </i-form>
                              </div>
                              <!--<task-edit-form type="formData" :form-label="value" :form-value="value"></task-edit-form>-->
                            </div>

                            <i-form label-position="left" :label-width="88" class="default-form" >
                              <div class="form-group">
                                <div>
                                  <Row>
                                    
                                    <i-col span="12" class="default-form-member-col">
                                      <FormItem :label="'申请人'" class="default-form-item default-member-form" required>
                                        <div class="default-form-member-selection">
                                          <!--<member-add :is-edit="false" content="添加项目成员" :users="[{userName: taskData.operationInfo[0].operationName, headPic: taskData.operationInfo[0].operationHeadPic}]"></member-add>-->
                                          <common-member-ii :is-edit="false"
                                                            content="添加项目成员"
                                                            :users="[{name: taskData.operationInfo[0].operationName, headPic: taskData.operationInfo[0].operationHeadPic, id: taskData.operationInfo[0].operationId}]"
                                          ></common-member-ii>
                                        </div>
                                      </FormItem>
                                    </i-col>
                                  </Row>
                                </div>
                              </div>
                            </i-form>

                            <div class="g-ta-r">
                              <template v-if="taskData.roleInfo.eidt === 'show'">
                                <Button type="primary" size="large" :loading="isSubmit" @click="toEdit">编辑</Button>
                              </template>
                              <template v-if="taskData.roleInfo.delete === 'show'">
                                <Button type="primary" size="large" :loading="isSubmit" @click="cancelConfirm">撤销</Button>
                              </template>
                              <template v-if="taskData.roleInfo.inspect === 'show'">
                                <Button type="primary" size="large" :loading="isSubmit" @click="audit(6, '', [])">审核通过</Button>
                                <Button type="primary" size="large" :loading="isSubmit" @click="showModal(7)">审核不通过</Button>
                              </template>

                            </div>
                          </div>
                        </i-col>
                      </Row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
          <tbody v-else>
          <tr>
            <td :colspan="tableConf.length" class="empty-data">
              没有外出数据
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <Modal v-model="isUndo" class-name="" ok-text="确定撤销" :closable="false" @on-ok="cancelOut">
        <h2 slot="header">
          撤销外出
        </h2>
        <div>
          <p>确定撤销外出 "<span class="required-tag" v-if="taskData">{{taskData.info.taskName}}</span>" ？</p>
        </div>
      </Modal>
      <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
        <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
        <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
        <div slot="footer" class="custom-footer">
          <Button type="primary" size="large" class="ok" @click.native="audit(nopassState, modalValue, [])" :disabled="modalValue.length > 1000">提交</Button>
        </div>
      </Modal>

      <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
      <loading v-if="isLoading"></loading>


    </div>
</template>

<script>
  import Loading from '../../components/popup/Loading'
  import {Task, Schedule} from '../../API/api'
  import {ajax} from '../../util/util'
  // import {defaultPlaceholder} from '../../assets/conf/taskDefaultIpt'
  import {formConf} from '../../assets/conf/formData.conf'
  import BCrumb from '../../components/BCrumb'
  import TaskEditForm from '../../components/TaskEditForm'
  import Toast from '../../components/popup/Toast'
  import MemberAdd from '../../components/MemberAdd'
  import {city} from '../../assets/conf/city.conf'
  import CommonMember from '../../components/CommonMember'

  import TaskDisplayForm from '../../components/TaskDisplayForm'
  import {defaultPlaceholder} from '../../assets/conf/taskDefaultIpt'
  import SubHeader from '../../components/SubHeader'
  import CommonMemberIi from '../../components/CommonMemberii'

  export default {
    name: 'Out',
    components: {CommonMemberIi, SubHeader, TaskDisplayForm, CommonMember, MemberAdd, TaskEditForm, Loading, Toast, BCrumb},
    data () {
      return {
        crumb: [
          {
            label: '日程计划'
          },
          {
            label: '我的日程'
          },
          {
            label: '外出'
          }
        ],
        customerId: null,
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        allCustomer: [],
        allProject: null,
        citys: city,
        projectId: null,
        isToast: false,
        toastMsg: '',
        toastState: null,
        isLoading: false,
        taskFormData: JSON.parse(JSON.stringify(formConf[21])),
        noProject: [{ name: "无项目", id: 0 }],
        basicValue: {
          'toolkitId': 21,
          'productId': 7,
          'startTime': null,
          'endTime': null,
          'taskData': [],
          'auditorId': null,
          'level': null,
          'taskName': '',
          'taskForm': '',
          'operationInfo': []
        },
        basicInfo: {
          taskName: {
            label: '外出名称',
            placeholder: '填写外出名称（必填）',
            type: 'input'
          }
        },
        applier: [],
        isSubmit: false,
        customerConf: {
          page: 1,
          pageSize: 1000
        },
        projectConf: {
          page: 1,
          pageSize: 1000,
          customerId: null
        },
        isLoading2: false,
        detailIdx: null,
        list: [],
        taskData: null,
        verSelect: 0,
        canLoadMore: true,
        dom: null,
        sortTh: null,
        chDom: null,
        tableConf: [
          {
            title: '外出名称',
            asc: 'desc',
            key: 'taskName'
          },
          {
            title: '外出时间',
            asc: 'desc',
            key: 'outTime',
            width: 200
          },
          {
            title: '外出类型',
            asc: 'desc',
            key: 'type',
            width: 125
          },
          {
            title: '状态',
            asc: 'desc',
            key: 'stateName',
            width: 130
          },
          {
            title: '发起人',
            key: 'creatorName',
            width: 125
          },
          {
            title: '事业部',
            key: 'creatorTeamName',
            width: 125
          },
          {
            title: '审核人',
            key: 'currentUserName',
            width: 125
          }
        ],
        filter: {
          functionType: 0,
          is_urgent: 0,
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          toolkitId: 21
        },
        isModal: false,
        nopassState: null,
        submitTaskPersonId: null,
        modalValue: '',
        isUndo: false
      }
    },
    methods: {
      init () {
        this.getCustomer()
        this.getList()
        this.canLoadMore = true
      },
      cancelConfirm () {
        this.isUndo = true
      },
      cancelOut () {
        this.isSubmit = true
        ajax.post(Task.reimbursementDel, {id: this.detailIdx, state: 12})
          .then(res => {
            this.isToast = true
            this.toastMsg = '撤销外出成功'
            this.toastState = 'success'
            setTimeout(() => {
              this.isToast = false
              this.filter.page = 1
              this.getList()
            }, 1500)
          })
          .catch(err => {
            this.isToast = true
            this.toastState = null
            this.toastMsg = err.toString()
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .finally(() => {
            this.isSubmit = false
          })
      },
      sortData (idx) {
        let key = this.tableConf[idx].key
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
        let data = this.filter
        data.orderBy = key
        data.asc = this.tableConf[idx].asc
        data.page = 1
        this.filter = data
        this.getList()
      },
      toggleRow (item, idx) {
        if (this.detailIdx === item.id) {
          this.detailIdx = null
        } else {
          this.detailIdx = item.id
          this.getDetail(item.id)
        }
      },
      toEdit () {
        this.$router.push(`/vacation/editOut/${this.detailIdx}`)
      },
      getCustomer () {
        this.$http.post(Schedule.allCustomer, this.qs.stringify(this.customerConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allCustomer = _data.retData.customer_list.data
          }
        })
      },
      getDetail (id) {
        this.isLoading2 = true
        this.$http.post(Task.detail, this.qs.stringify({taskId: id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          const _data = res.data
          this.isLoading2 = false
          if (_data.retCode === 0) {
            this.taskData = _data.retData.data
            this.taskData.formInfo.forEach(item => {
              item.formContent.taskInfo[0][0].value.forEach((date, idx) => {
                if (date.indexOf('T') >= 0) {
                  const _target = item.formContent.taskInfo[0][0].value
                  const vDate = new Date(date)
                  _target[idx] = `${vDate.getFullYear()}-${vDate.getMonth() + 1 < 10 ? '0' + (vDate.getMonth() + 1) : vDate.getMonth() + 1}-${vDate.getDate() < 10 ? '0' + vDate.getDate() : vDate.getDate()} ${vDate.getHours() < 10 ? '0' + vDate.getHours() : vDate.getHours()}:${vDate.getMinutes() < 10 ? '0' + vDate.getMinutes() : vDate.getMinutes()}`
                }
              })
            })
            this.projectConf.customerId = this.taskData.formInfo[0].formContent.customerId
            this.getProject()
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          this.changeVer(0)
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
      getList () {
        var formData = Object.assign({},this.filter);
        if (formData.functionType == 3) {
          formData.functionType = 2
        }
        this.isLoading = true
        this.$http.post(Task.list, this.qs.stringify(formData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            if (this.filter.page === 1) {
              this.list = _data.retData.taskInfo.data
            } else {
              this.list = this.list.concat(_data.retData.taskInfo.data)
            }
          }
          this.isLoading = false
        })
      },
      changeCustomer (id) {
        this.projectConf.customerId = id
        this.getProject()
      },
      getProject (id) {
        this.$http.post(Schedule.allProject, this.qs.stringify(this.projectConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allProject = this.noProject.concat(_data.retData.project_list);
          }
        })
      },
      audit (state, reason, taskData, id) {
        if (!this.isSubmit) {
          this.isSubmit = true
          let data = {
            id: this.detailIdx,
            state,
            reason,
            taskData
            // taskPersonId: id || this.submitTaskPersonId
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
              this.isSubmit = false
              if (_data.retCode === 0) {
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
                  this.getDetail(this.detailIdx)
                }
              }, 1500)
            })
          }
          // this.$store.dispatch('changeTaskDetail', data)
          this.isModal = false
          this.isSubmit = false
        }
      },
      showModal (state, id) {
        this.isModal = true
        this.nopassState = state
        this.submitTaskPersonId = id
        
      },
      changeVer (n) {
        this.verSelect = n
        this.projectConf.customerId = this.taskData.formInfo[n].formContent.customerId
        this.getProject()
      },
      changeFilter (id) {
        this.filter.page = 1
        // this.filter.industry = id
        this.filter.functionType = id
        if (+id === 3) {
          this.filter.is_urgent = 1
        } else if (+id === 2) {
          this.filter.is_urgent = 2
        } else {
          this.filter.is_urgent = 0
        }
        this.getList()
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading && !this.taskDetailStatus) {
          // this.page = this.page + 1
          this.filter.page++
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
      this.init()
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    },
    beforeDestroy () {
      // this.canLoadMore = false
      this.unbindLoadMore()
    }
  }
</script>

<style scoped lang="less">
  .main-list {
    cursor: default;
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
  }
  th {
    text-align: left;
    background-color: #fff;
    font-size: 12px;
    color: #868e96;
    font-weight: normal;
    border: 1px solid #e9ecef;
    height: 32px;
    &:hover, &.active {
      background-color: #f8f9fa;
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
    font-size: 14px;
    color: #343a40;
    height: 48px;
    border-bottom: 1px solid #e9ecef;
    &.empty-data {
      text-align: center;
    }
  }
  tbody {
    tr {
      &:hover {
        td {
          background-color: #f8f9fa;
        }
      }
    }
  }
  .table-cell {
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: normal;
    box-sizing: border-box;
    text-align: left;
  }
  .addBtn {
    text-align: right;
    margin-bottom: 16px;
    a {
      background-color: #2d8ef8;
      display: inline-block;
      width: 120px;
      height: 40px;
      border-radius: 4px;
      text-align: center;
      line-height: 40px;
      text-decoration: none;
      color: #fff;
      font-size: 14px;
    }
  }
  .list-filter {
    margin-bottom: 16px;
  }
  .filter-box {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding-left: 108px;
    position: relative;
    margin-bottom: -1px;
    .ivu-radio-group {
      margin-bottom: -1px;
    }
    .ivu-radio-wrapper {
      font-size: 14px;
      color: #343a40;
      background-color: #f8f9fa;
      height: 40px;
      line-height: 40px;
      width: 108px;
      text-align: center;
      padding: 0;
      border: 0 none;
      border-right: 1px solid #e9ecef;
      transition: none;
      border-radius: 0;
      border-bottom: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      margin-left: -1px;
      &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
        color: #2d8ef8;
        background-color: #fff;

      }
      &:first-child {
        position: absolute;
        left: 0;
        top: 0;
        border-right: 0 none;

      }
    }
    .ivu-radio-wrapper-disabled {
      background-color: #fff;
    }
    .ivu-radio-wrapper-checked {
      background-color: #107cd9;
      box-shadow: 0 0 0;
      border-color: #107cd9;
      color: #fff;
    }
  }
  .list-detail {
    padding: 16px;
    background-color: #ced4da;
    position: relative;
    .container {
      > div {
        padding: 32px 32px 32px 64px;
        background-color: #fff;
        margin-bottom: 16px;
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
  .result-list {
    position: relative;
  }
</style>
<style lang="less">
.out-display {
  .ivu-select-selected-value {
    font-size:14px !important
  }
  .out-type {
    &:last-child {
      border-right: none !important
    }
  }
}
</style>

