<template>
  <div>
    <div>
      <i-form label-position="left" :label-width="100" class="default-form" >
        <div class="form-group">
          <FormItem label="会议名称" class="default-form-item default-member-form">
            <i-input readonly v-model="meeting.name"></i-input>
          </FormItem>
          <FormItem label="会议记录" class="default-form-item default-member-form">
            <Vueditor id="editor" ref="vueditor" ></Vueditor>

          </FormItem>
        </div>
      </i-form>
      <div class="g-ta-r">
        <Button type="primary" size="large" @click="save" :loading="saveLoading">保存</Button>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import {Schedule} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import 'vueditor/dist/style/vueditor.min.css'
  import SubHeader from '../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, Toast, Loading, BCrumb},
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
            label: '日程管理',
            url: '/schedule/manage'
          },
          {
            label: '添加会议记录'
          }
        ],
        isLoading: false,
        meeting: {},
        isToast: false,
        toastMsg: '',
        toastState: null,
        memo: '',
        saveLoading: false
      }
    },
    methods: {
      init () {
        this.getDetail()
      },
      getDetail () {
        this.isLoading = true
        this.$http.post(Schedule.meetingDetail, this.qs.stringify({id: this.$route.params.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.meeting = _data.retData
            this.memo = _data.retData.memo
            this.$refs.vueditor.setContent(_data.retData.memo)
          }
        }).catch(() => {
          this.isLoading = false
        })
      },
      save () {
        this.saveLoading = true
        const memo = this.$refs.vueditor.getContent()
        this.$http.post(Schedule.updatememo, this.qs.stringify({id: this.$route.params.id, memo}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
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
            this.saveLoading = false
            if (_data.retCode === 0) {
              this.$router.back()
            }
          }, 1500)
        }).catch(() => {
          this.saveLoading = true
          this.isToast = true
          this.toastMsg = '网络错误'
          this.toastState = null
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    mounted () {
      // this.init()
      // this.$refs.vueditor.setContent(this.memo)
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  #editor {
    height: 300px;

  }
</style>
