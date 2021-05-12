<template>
  <div class="list-detail">
    <div>
      <hr-salary-form :form-value="formValue"></hr-salary-form>
      <div class="g-ta-r">
        <Button type="primary" @click.native="save" size="large">
          <template v-if="isSaving">
            <Icon type="load-a" color="#fff" size="18" class="saving"></Icon>
          </template>
          <template v-else>
            保存
          </template>
        </Button>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'
  import {Hr} from '../API/api'
  import HrSalaryForm from './HrSalaryForm'
  export default {
    components: {
      HrSalaryForm,
      Toast,
      Loading},
    name: 'hr-salary-detail',
    props: {
      formValue: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isToast: false,
        toastMsg: null,
        toastState: null,
        isSaving: false
      }
    },
    methods: {
      save () {
        if (!this.isSaving) {
          this.isSaving = true
          this.$http.post(Hr.editContract, this.qs.stringify(this.formValue), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
            this.isSaving = false
            let _data = res.data
            this.isToast = true
            if (_data.retCode === 0) {
              this.toastMsg = '保存成功'
              this.toastState = 'success'
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
              if (_data.retCode === 0) {
                this.$emit('on-save')
              }
            }, 1500)
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .list-detail {
    position: relative;
    padding: 16px;
    background-color: #ced4da;
  > div {
    padding: 32px;
    background-color: #fff;
    margin-bottom: 16px;
  }
  }
  .saving {
    animation: ani-demo-spin 1s linear infinite;
  }

</style>
