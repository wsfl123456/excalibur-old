<template>
  <div class="list-detail">
    <Alert v-if="brandData.state === 3" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        审核不通过
      </span>
      <span class="alert-detail">
        <i-input type="textarea" autosize :value="brandData.auditReason" disabled></i-input>

        <!--{{brandData.auditReason}}-->
      </span>
    </Alert>
    <div>
      <brand-form is-display :brand-values="brandData"></brand-form>
      <div class="g-ta-r">
        <template v-if="brandData.hasOwnProperty('roleInfo') && brandData.roleInfo.audit === 'show'">
          <Button type="primary" class="submit-btn form-default-btn hollow-default" size="large" @click.native="showModal(3)">审核不通过</Button>
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="audit(2)">审核通过</Button>
        </template>
        <template v-if="brandData.hasOwnProperty('roleInfo') && brandData.roleInfo.edit === 'show'">
          <Button type="primary" class="submit-btn form-default-btn" size="large" @click.native="toEdit">编辑品牌</Button>
        </template>
      </div>

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
  import { Brand } from '../API/api'
  import BrandForm from './BrandForm'

  // 1待PAR审核，2PAR审核不通过 3 PAR审核通过 4待PIB审核，5PIB审核不通过 6审核通过执行中
  export default {
    name: 'brand-detail',
    components: {
      BrandForm,
      Loading,
      Toast
    },
    data () {
      return {
        modalValue: '',
        isLoading: false,
        isToast: false,
        toastMsg: null,
        toastState: null,
        brandData: {},
        isModal: false,
        nopassState: null
      }
    },
    computed: {
      isDetail () {
        return this.$store.state.brands.detail
      },
      selectedProject () {
        return this.$store.state.brands.detail
      }
    },
    watch: {
      isDetail: {
        handler (val) {
          if (val) {
            this.getDetail()
          } else {
            this.projectData = null
          }
        },
        immediate: true
      }
    },
    methods: {
      audit (state, reason) {
        let data = {
          id: this.selectedProject.id,
          state: state,
          reason: reason
        }
        this.isModal = false
        this.$http.post(Brand.audit, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
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
        this.$router.push(`/brands/edit/${this.selectedProject.id}`)
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
        this.$http.post(Brand.detail, this.qs.stringify({id: this.selectedProject.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.brandData = _data.retData
          } else if (_data.retCode === 100014) {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.$cookie.delete('token')
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
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
