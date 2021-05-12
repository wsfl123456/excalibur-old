<template>
  <div>
    <div>
      <sys-notice-form ref="noticeForm" :form-data="saveData"></sys-notice-form>
      <div class="g-ta-r">
        <Button type="primary" size="large" @click="save" :loading="isSaving">保存</Button>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import 'vueditor/dist/style/vueditor.min.css'
  import {Index} from '../../API/api'
  import SysNoticeForm from '../../components/SysNoticeForm'
  import SubHeader from '../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, SysNoticeForm, BCrumb, Loading, Toast},
    data () {
      return {
        crumb: [
          {
            label: '系统公告'
          },
          {
            label: '公告列表',
            url: '/sysNotice/list'
          },
          {
            label: '新增系统公告'
          }
        ],
        name: '',
        isLoading: false,
        isToast: false,
        toastMsg: '',
        toastState: null,
        isSaving: false,

        saveData: {
          typeId: null,
          title: '',
          content: '',
          task_toolkit_id: null,
          picture: '',
          state: 2
        }
      }
    },
    methods: {
      init () {
      },
      save () {
        this.isSaving = true
        // this.saveData.content = this.$refs.noticeForm.$refs.editor.getContent()
        this.$http.post(Index.addSysNotice, this.qs.stringify(this.saveData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isToast = true
          if (_data.retCode === 0) {
            this.toastState = 'success'
            this.toastMsg = '新建成功'
          } else {
            this.toastState = null
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.isSaving = false

            if (_data.retCode === 0) {
              this.$router.push('/sysNotice/list')
            }
          }, 1500)
        }).catch(() => {
          this.isSaving = false
          this.isToast = true
          this.toastMsg = '网络错误'
          this.toastState = null
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    created () {
      this.init()
    },
    mounted () {
      // this.uploadList = this.$refs.upload.fileList
    }
  }
</script>

<style scoped lang="less">

</style>
