<!--表单模块-->
<template>
  <Form label-position="left" :label-width="88" class="default-form" :class="{'show-detail': !isEdit}">
    <div class="form-group" v-if="formData.length !== 0">
      <div v-for="(item, index) in formData" :key="index">
        <FormItem  :label="item.label" class="default-form-item">
          <i-input :disabled="!isEdit" v-if="item.type === 'input'" v-model="valueData.taskName" :placeholder="item.placeholder"></i-input>
          <DatePicker :options="dateOpt" :disabled="!isEdit"  v-else-if="item.type === 'datetime'" class="deadline" :type="item.type" :placeholder="item.placeholder" :value="valueData.endTime" :clearable="false" @on-change="changeDate(valueData, 'endTime', $event)"></DatePicker>
        </FormItem>
      </div>
    </div>
    <extra-options v-if="isExtraOptions" :extra-options="extraOptions"></extra-options>

    <div class="extra-form" :style="{marginBottom: isEdit ? '32px' : '0'}">
      <div class="form-group" v-for="(extraItem, extraIndex) in extraDatas" :key="extraIndex">
        <div>
          <FormItem :label="extraTypes[extraItem.dataType]" class="default-form-item">
            <i-input :disabled="!isEdit"  :placeholder="'填写'+ extraTypes[extraItem.dataType] +'资料名称'" :value="extraItem.fileName" @input.native="updateExtra(extraIndex, 'fileName', $event)"></i-input>
          </FormItem>
        </div>
        <div>
          <FormItem label="公盘地址" class="default-form-item">
            <i-input :disabled="!isEdit"  placeholder="上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\" :value="extraItem.fileAddress" @input.native="updateExtra(extraIndex, 'fileAddress', $event)"></i-input>
          </FormItem>
        </div>
      </div>
    </div>
    <div class="requirement-form">
      <div class="g-relative" v-for="(requireItem, requireIndex) in requirement" :key="requireIndex">
        <div class="toggle-form-version" v-if="requireItem.type !== 'audit' && !isEdit">
          <ul>
            <li class="active">V3</li>
            <li>V2</li>
            <li>V1</li>
          </ul>
        </div>
        <div class="form-group" v-for="(_requireItem, _requireIndex) in requireItem.items" :key="_requireIndex">
          <div v-for="(item, index) in _requireItem" :key="index">
            <Row v-if="item.hasOwnProperty('subItems')">
              <i-col span="12" v-for="(subItem, subIndex) in item.subItems" :key="subIndex" class="default-form-member-col">
                <FormItem :label="subItem.label" class="default-form-item default-member-form">
                  <div class="default-form-member-selection">
                    <member-add  :is-edit="isEdit" :users="users[subItem.value]" content="添加项目成员" @on-change="getMember(index, _requireIndex, requireIndex, $route.params.toolkitId, subIndex, $event)"></member-add>
                  </div>
                </FormItem>
              </i-col>
            </Row>
            <FormItem v-else :label="item.label" class="default-form-item">
              <i-input :disabled="!isEdit"  v-if="item.type === 'input'" :value="item.value" :placeholder="item.placeholder" @on-change="updateRequirement(index, _requireIndex, requireIndex, $route.params.toolkitId, $event)"></i-input>

              <DatePicker :disabled="!isEdit" :options="dateOpt"  v-else-if="item.type === 'datetime'" class="deadline" :type="item.type" :placeholder="item.placeholder" :value="item.value" :clearable="false" @on-change="_changeDate(index, _requireIndex, requireIndex, $route.params.toolkitId, $event)"></DatePicker>

              <CheckboxGroup  v-else-if="item.type === 'checkbox'" size="large" class="default-form-chkbox-group" :value="item.value" @on-change="handleChkNRadio('checkbox', index, _requireIndex, requireIndex , $event, $route.params.toolkitId)">
                <Checkbox :disabled="!isEdit"  v-for="(chkboxItem, chkBoxIndex) in item.items" :key="chkBoxIndex" :label="chkboxItem.label" class="default-form-chkbox" >
                  {{chkboxItem.label}}
                </Checkbox>
              </CheckboxGroup>

              <RadioGroup v-else-if="item.type === 'radio'" size="large" class="default-form-radio-group" :value="item.value" @on-change="handleChkNRadio('radio', index, _requireIndex, requireIndex, $event, $route.params.toolkitId)">
                <Radio :disabled="!isEdit"  v-for="(radioItem, radioIndex) in item.items" :key="radioIndex" :label="radioItem.label" class="default-form-radio">
                  {{radioItem.label}}
                </Radio>
              </RadioGroup>

              <div v-else-if="item.type === 'user'" class="default-form-member-selection">
                <member-add :is-edit="isEdit" :users="users[item.value]" content="添加项目成员"></member-add>
              </div>
            </FormItem>
          </div>
        </div>
        <div v-if="isEdit && requireItem.canMore" class="form-add">
          <a href="javascript:;" @click="addFormItem(requireIndex, $route.params.toolkitId)">
            <Icon type="plus"></Icon>
            添加{{requireItem.title}}
          </a>
        </div>
      </div>

    </div>
    <div class="auditor-form">
      <div class="form-group" >
        <div>
          <FormItem  label="任务审核" class="default-form-item">
            <div class="default-form-member-selection">
              <member-add  content="添加项目成员" @on-change="getAuditor"></member-add>
            </div>
          </FormItem>
        </div>
      </div>
    </div>
    <div class="form-btns">
      <Button v-if="status===1" type="primary" class="submit-btn form-default-btn" size="large" @click.native="submit">提交任务</Button>
      <!--<Button v-if="status===3" type="primary" class="back-edit-btn form-default-btn" size="large">编辑任务</Button>-->
      <Button v-if="status===2" type="primary" class="audit-ok form-default-btn" size="large" @click="auditOK">审核通过</Button>
      <Button v-if="status===2" type="primary" class="primary-hole audit-cancel form-default-btn" size="large" @click.native="showModal">审核不通过</Button>
      <Button v-if="status===5" type="primary" class="quality-ok form-default-btn" size="large">质检通过</Button>
      <Button v-if="status===5" type="primary" class="primary-hole quality-cancel form-default-btn" size="large">质检不通过</Button>
    </div>
    <Modal v-model="isModal" class-name="vertical-center-modal" ok-text="提交" width="480px" :closable="false">
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写审核不通过的理由"></i-input>
      <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click.native="submitModal" :disabled="modalValue.length > 1000">提交</Button>
      </div>
    </Modal>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>

  </Form>
</template>

<script>
  import ExtraOptions from './ExtraOptions'
  import MemberAdd from './MemberAdd'
  import Toast from './popup/Toast'
  import {Task} from '../API/api'
  export default {
    components: {
      Toast,
      MemberAdd,
      ExtraOptions
    },
    name: 'form-box',
    data () {
      return {
        dateOpt: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        extraTypes: {
          1: 'Brief',
          2: '方案',
          3: '参考',
          4: '客户资料',
          5: '线框',
          6: 'layout',
          7: '时间表',
          8: '排期表'
        },
        isToast: false,
        toastMsg: '',
        toastStatus: '',
        isModal: false,
        modalValue: '',
        users: {
          1: [{id: 1, name: 'name', src: '', department: 'Creative', title: 'Copy'}],
          2: [{id: 2, name: 'name2', src: '', department: 'Tech', title: 'FontEnd'}],
          3: [{id: 3, name: 'name3', src: '', department: 'Creative', title: 'Copy'}],
          4: [{id: 4, name: 'name4', src: '', department: 'Art', title: 'UI'}],
          5: [{id: 4, name: 'name5', src: '', department: 'Art', title: 'UI'}]
        }
      }
    },
    props: {

      valueData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      status: {
        type: Number, // 1 通过 | 2 审核中 | 3 审核不通过 | 4 审核通过 | 5 质检中 | 6 质检不通过 | 7 质检通过
        default: 1
      },
      requirement: {
        type: Array,
        default: function () {
          return []
        }
      },
      isEdit: {
        type: Boolean, //  展示状态 or 编辑状态 默认为 编辑
        default: true
      },
      formData: {
        type: Array,
        default: function () {
          return []
        }
      },
      isExtraOptions: {
        type: Boolean,
        default: false
      },
      extraOptions: {
        type: Array
      },
      extraDatas: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {},
    methods: {
      getAuditor (arr) {
        this.valueData.auditorId = arr[0].id
      },
      getMember (idx, parentIdx, rootIdx, toolkitId, subIdx, arr) {
        let params = {
          idx,
          parentIdx,
          rootIdx,
          toolkitId,
          value: arr[0].id,
          isSub: subIdx
        }
        this.$store.dispatch('setRequirementItemValue', params)
      },
      changeDate (obj, key, val) {
        obj[key] = val
      },
      _changeDate (idx, parentIdx, rootIdx, toolkitId, value) {
        let params = {
          idx,
          parentIdx,
          rootIdx,
          toolkitId,
          value
        }
        this.$store.dispatch('setRequirementItemValue', params)
      },
      submit () {
        // const requireDatas = this.$store.state.requirement[this.$route.params.toolkitId]
        const requireDatas = this.requirement
        const extraDatas = this.$store.state.extraDatas
        this.valueData.taskData = extraDatas
        this.valueData.formData = JSON.stringify(requireDatas)
        this.valueData.operationInfo = []
        this.$http.post(Task.add, this.qs.stringify(this.valueData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
        })
      },
      closeToast (duration) {
        clearTimeout(this.toastTimeout)
        this.toastTimeout = setTimeout(() => {
          this.isToast = false
        }, duration ? duration * 1000 : 1500)
      },
      auditOK () {
        this.isToast = true
        this.toastMsg = '恭喜 审核通过成功'
        this.toastStatus = 'success'
        this.closeToast(2)
      },
      submitModal () {
        this.isModal = false
        this.toastMsg = '恭喜 提交成功'
        this.toastStatus = 'success'
        this.isToast = true
        this.closeToast()
      },
      showModal () {
        this.isModal = true
      },
      addFormItem (idx, toolkitId) {
        let params = {
          idx,
          toolkitId
        }
        this.$store.dispatch('addRequirementItem', params)
      },
      updateRequirement (idx, parentIdx, rootIdx, toolkitId, e) {
        let params = {
          idx,
          parentIdx,
          rootIdx,
          toolkitId,
          value: e.target.value
        }
        this.$store.dispatch('setRequirementItemValue', params)
      },
      /**
       * 更新任务资料
       * @param {Number} index - array 下标
       * @param {Number} key
       * @param e
       */
      updateExtra (index, key, e) {
        var params = {
          index,
          key,
          value: e.target.value
        }

        this.$store.dispatch('updateExtraDataParam', params)
      },
      /**
       * 修改checkbox / radio 的取值
       * @param type {String} - 类型 [ checkbox / radio]
       * @param idx {Number} - 序号（下标）
       * @param parentIdx { String } - 父 序号（下标）
       * @param value { String | Array} - 值
       */
      handleChkNRadio (type, idx, parentIdx, rootIdx, value, toolkitId) {
        let params = {
          idx,
          parentIdx,
          rootIdx,
          value,
          toolkitId
        }
        this.$store.dispatch('changeRequirementSelectedRadioNChk', params)
      }
    },
    beforeDestroy () {
      clearTimeout(this.toastTimeout)
    }
  }
</script>

<style scoped lang="less">
  .form-btns {
    position: absolute;
    left: 100%;
    bottom: 0;
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
</style>
