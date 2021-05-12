<template>
  <div class="list-detail">
    <Alert v-if="+supplierData.state === 3" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        <!--质检不通过-->
        {{supplierData.stateName}}

      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="supplierData.auditReason" disabled></i-input>
      </span>
    </Alert>

    <div class="detail-wrap">
      <supplier-form is-display :supplier-values="supplierData"></supplier-form>
      <div class="g-ta-r">
        <!--<template v-if="brandData.hasOwnProperty('roleInfo') && brandData.roleInfo.audit === 'show'">-->
          <!--<Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(3)">审核不通过</Button>-->
          <!--<Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(2)">审核通过</Button>-->
        <!--</template>-->
        <template v-if="supplierData.canAudit">
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(2)">审核通过</Button>
          <Button type="ghost" class="submit-btn form-default-btn" size="large" @click.native="toNoPass">审核不通过</Button>
        </template>
        <template v-if="supplierData.canEdit">
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="toEdit">编辑供应商</Button>
        </template>
      </div>
    </div>
    <Modal v-model="isModal" class-name="vertical-center-modal examine-modal" ok-text="提交" width="480px" :closable="false">
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
      <span class="words-count" :class="{'over-length': modalValue.length > 1000}">{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button type="primary" size="large" class="ok" @click.native="audit(3)" :disabled="modalValue.length > 1000">提交</Button>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import { Supply, Project } from '../API/api'
  import SupplierForm from './SupplierForm'

  // 1待PAR审核，2PAR审核不通过 3 PAR审核通过 4待PIB审核，5PIB审核不通过 6审核通过执行中
  export default {
    name: 'supplier-detail',
    components: {
      SupplierForm,
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
        supplierData: {}
      }
    },
    computed: {
      isDetail () {
        return this.$store.state.supply.detail
      },
      selectedProject () {
        return this.$store.state.supply.detail
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
      toNoPass () {
        this.isModal = true
      },
      audit (state) {
        const data = {
          id: this.selectedProject.id,
          state, // 2 => 通过 3 => 不通过
          auditReason: this.modalValue
        }
        this.$http.post(Supply.audit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastMsg = '提交成功'
            this.toastState = 'success'
            this.isModal = false
            this.getDetail()
          } else {
            this.toastMsg = _data.retMsg
            this.toastState = null
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
      toEdit () {
        this.$router.push(`/suppliers/edit/${this.selectedProject.id}`)
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
        this.$http.post(Supply.detail, this.qs.stringify({id: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.supplierData = _data.retData
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
    > .detail-wrap {
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
