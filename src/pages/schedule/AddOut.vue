<template>
  <div class="add-out">
    <div>
      <i-form label-position="left" :label-width="88" class="default-form">
        <div class="form-group">
          <div v-for="(value, key) in basicInfo" :key="key">
            <FormItem  :label="value.label" class="default-form-item" required>
              <i-input v-if="value.type === 'input'" :autosize="{minRows: 1, maxRows: 7}" v-model="basicValue[key]" :placeholder="value.placeholder"></i-input>
              <DatePicker transfer :time-picker-options="timeOpts" format="yyyy-MM-dd HH:mm" :options="dateOpt" v-else-if="value.type === 'datetime'" class="deadline" :type="value.type" :placeholder="value.placeholder" :value="basicValue[key]" :clearable="false" @on-change="changeDate(key, $event)"></DatePicker>
            </FormItem>
          </div>
        </div>
      </i-form>
    </div>


    <div v-for="(value, key) in taskFormData.formData" :key="'taskFormData-' + key">
      <div>
        <i-form label-position="left" :label-width="88" class="default-form" >
          <div class="form-group">
            <template v-for="(value, key) in value">
              <div >
                <FormItem  :label="value.label" class="default-form-item" :required="value.required === 'true' || value.required">
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
                    <DatePicker transfer class="deadline" :options="dateOpt" type="datetimerange" :placeholder="value.placeholder" :value="value.value" :clearable="false" format="yyyy-MM-dd HH:mm" @on-change="changeDataDate($event, key, value)"> </DatePicker>
                  </template>

                  <CheckboxGroup  v-else-if="value.type === 'checkbox'" size="large" class="default-form-chkbox-group" v-model="value.value" >
                    <Checkbox v-for="(chkboxItem, chkBoxIndex) in value.items" :key="chkBoxIndex" :label="chkboxItem.label" class="default-form-chkbox" style="width: 33.333%">
                      {{chkboxItem.label}}
                    </Checkbox>
                  </CheckboxGroup>

                  <RadioGroup v-else-if="value.type === 'radio'" size="large" class="default-form-radio-group" v-model="value.value">
                    <Radio v-for="(radioItem, radioIndex) in value.items" :key="radioIndex" :label="radioItem.label" class="default-form-radio out-type" style="width: 50%">
                      {{radioItem.label}}
                    </Radio>
                  </RadioGroup>
                  <Cascader size="large" :render-format="cascaderFormat" :clearable="false" transfer v-if="value.type === 'cascader'" :data="value.items" v-model="value.value"></Cascader>

                  <div class="default-form-member-selection" v-if="value.type === 'member'">
                    <common-member multi content="选择同行人员" @on-change="selectOutMem($event, value, 'value')" :users="value.value"></common-member>
                    <!--<member-add multi content="选择同行人员" :project-id="projectId" @on-change="selectOutMem($event, value[key], 'value')" :users="value.value"></member-add>-->
                  </div>
                  <Cascader v-if="value.type === 'city'" :data="citys" v-model="value.value" :clearable="false" placeholder="选择省、市、区"></Cascader>

                </FormItem>
              </div>
            </template>
            <div>
              <FormItem  label="外出项目" class="default-form-item select" required>
                <Row>
                  <i-col span="12">
                    <el-select v-model="customerId" placeholder="品牌选择" @change="changeCustomer" :clearable="false" filterable>
                      <el-option v-for="item in allCustomer" :value="item.id" :label="item.customerName" :key="item.id"></el-option>
                    </el-select>
                  </i-col>
                  <i-col span="12" class="default-form-member-col">
                    <el-select v-model="projectId" placeholder="项目选择" :clearable="false" filterable>
                      <template v-if="customerId && allProject.length > 0">
                        <el-option v-for="item in allProject" :value="item.id" :label="item.name" :key="item.id"></el-option>
                      </template>
                      <template v-else-if="!customerId">
                        <el-option disabled value="">请选择品牌</el-option>
                      </template>
                      <template v-else>
                        <el-option disabled value="">当前品牌没有项目</el-option>
                      </template>
                    </el-select>
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
                  <member-add :is-edit="false" content="添加项目成员" :users="applier"></member-add>
                </div>
              </FormItem>
            </i-col>
          </Row>
        </div>
      </div>
    </i-form>

    <div class="g-ta-r">
      <Button type="primary" size="large" @click="submit" :loading="isSubmit">提交</Button>
    </div>

    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <loading v-if="isLoading"></loading>


  </div>
</template>

<script>
  import Loading from '../../components/popup/Loading'
  import {Task, Schedule} from '../../API/api'
  // import {defaultPlaceholder} from '../../assets/conf/taskDefaultIpt'
  import {formConf} from '../../assets/conf/formData.conf'
  import BCrumb from '../../components/BCrumb'
  import TaskEditForm from '../../components/TaskEditForm'
  import Toast from '../../components/popup/Toast'
  import MemberAdd from '../../components/MemberAdd'
  import {city} from '../../assets/conf/city.conf'
  import CommonMember from '../../components/CommonMember'
  import SubHeader from '../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, CommonMember, MemberAdd, TaskEditForm, Loading, Toast, BCrumb},
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
            label: '外出申请'
          }
        ],
        customerId: null,
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        allCustomer: [],
        allProject: [],
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
        }
      }
    },
    methods: {
      init () {
        this.getApplier()
        this.getCustomer()
      },
      changeDataDate (dateArr, key, obj) {
        let start = dateArr[0]
        let end = dateArr[1]
        if (start.indexOf('00:00') >= 0) {
          start = start.replace('00:00', '10:00')
        }
        if (end.indexOf('00:00') >= 0) {
          end = end.replace('00:00', '19:00')
        }
        obj.value = [start, end]
      },
      getApplier () {
        this.applier = [JSON.parse(localStorage.getItem('userInfo'))]
      },
      changeCustomer (id) {
        this.customerId = id
        this.projectConf.customerId = id
        this.projectId = null
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
      selectOutMem (value, obj, key) {
        obj[key] = value
      },
      getCustomer () {
        this.$http.post(Schedule.allCustomer, this.qs.stringify(this.customerConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allCustomer = _data.retData.customer_list.data
          }
        })
      },
      submit () {
        let noVali = false
        if (!this.basicValue.taskName || this.basicValue.taskName === '') {
          this.toastMsg = '请填写任务名'
          this.toastStatus = null
          noVali = true
        }

        if (this.projectId === null) {
          this.toastMsg = '请选择项目'
          this.toastStatus = null
          noVali = true
        }

        if (!this.customerId) {
          this.toastMsg = '请选择品牌'
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
          customerId: this.customerId,
          projectId: this.projectId
        }

        if (!this.isSubmit) {
          this.isSubmit = true
          this.$http.post(Task.add, this.qs.stringify(this.basicValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            this.isSubmit = false
            const _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '提交成功'
              this.toastState = 'success'
            } else {
              this.toastMsg = _data.retMsg
              this.toastState = null
            }
            setTimeout(() => {
              this.isToast = false
              if (_data.retCode === 0) {
                this.$router.push('/vacation/out')
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
</style>
<style lang="less">
.add-out {
  .out-type {
    &:last-child {
      border-right: none !important
    }
  }
  .select {
    .el-select {
      display: block;
       .el-input__inner {
         height: 53px;
         line-height: 53px;
         border: none
       }
    }
  }
}
</style>

