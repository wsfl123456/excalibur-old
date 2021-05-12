<template>
  <div class="list-detail">
    <Alert v-if="+vacationData.status === 3" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        审批不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="vacationData.auditReason" disabled></i-input>

        <!--{{vacationData.auditReason}}-->
      </span>
    </Alert>
    <div>
      <vacation-form is-display :vaca-values="vacationData" v-if="!isLoading"></vacation-form>
      <div class="g-ta-r">
        <template v-if="vacationData.canReview">
        <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(3)">审核不通过</Button>
        <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(2)">审核通过</Button>
      </template>
        <template v-if="vacationData.canEdit">
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="toEdit">编辑申请</Button>
        </template>
        <template v-if="vacationData.canCancel">
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="cancelConfirm">撤销申请</Button>
        </template>
      </div>

      <Modal v-model="isUndo" class-name="" ok-text="确定撤销" :closable="false" @on-ok="cancelVaca">
        <h2 slot="header">
          撤销请假
        </h2>
        <div>
          <p>确定撤销请假？</p>
        </div>
      </Modal>
      <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
        <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
        <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
        <div slot="footer" class="custom-footer">
          <Button type="primary" size="large" class="ok" @click.native="audit(nopassState, modalValue)" :disabled="modalValue.length > 1000">提交</Button>
        </div>
      </Modal>
    </div>

    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import { Schedule } from '../API/api'
  import VacationForm from './VacationForm'
  import {ajax} from '../util/util'

  // 1待PAR审核，2PAR审核不通过 3 PAR审核通过 4待PIB审核，5PIB审核不通过 6审核通过执行中
  export default {
    name: 'vacation-detail',
    components: {
      VacationForm,
      Loading,
      Toast
    },
    data () {
      return {
        modalValue: '',
        isModal: false,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        vacationData: {},
        nopassState: null,
        isUndo: false
      }
    },
    computed: {
      isDetail () {
        return this.$store.state.vacation.detail
      },
      selectedProject () {
        return this.$store.state.vacation.detail
      }
    },
    watch: {
      isDetail: {
        handler (val) {
          if (val) {
            this.getDetail()
          } else {
          }
        },
        immediate: true
      }
    },
    methods: {
      cancelConfirm () {
        this.isUndo = true
      },
      cancelVaca () {
        ajax.post(Schedule.cancelVaca, {id: this.selectedProject.id}).then(() => {
          this.isToast = true
          this.toastMsg = '撤销请假成功'
          this.toastState = 'success'
          setTimeout(() => {
            this.isToast = false
            this.$emit('on-cancel')
          }, 1500)
        })
          .catch((err) => {
            this.isToast = true
            this.toastState = null
            this.toastMsg = err.toString()
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .finally()
      },
      audit (state, reason) {
        let data = {
          id: this.selectedProject.id,
          state: state,
          reason: reason
        }
        this.isModal = false
        this.$http.post(Schedule.vacaAudit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode !== 0) {
            this.isToast = true
            this.toastMsg = _data.retMsg
          } else {
            this.isToast = true
            this.toastMsg = '提交成功'
            this.toastState = 'success'
          }
          setTimeout(() => {
            this.isToast = false
            this.toastState = null
            this.toastMsg = null
            this.modalValue = ''
            this.$emit('on-cancel')
            this.getDetail()
          }, 1500)
        })
      },
      showModal (state) {
        // 1 待审核 2 审核通过 3 审核不通过 4 删除
        this.isModal = true
        this.nopassState = state
      },
      toEdit () {
        this.$router.push(`/vacation/edit-apply/${this.selectedProject.id}`)
      },
      getDetail () {
        this.isLoading = true

        this.$http.post(Schedule.vacaDetail, this.qs.stringify({id: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.vacationData = _data.retData
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
      padding: 32px 32px 32px 64px;
      background-color: #fff;
      margin-bottom: 16px;
    }
  }
  .task-belong {
    a {
      text-decoration: underline;
    }
  }
</style>
