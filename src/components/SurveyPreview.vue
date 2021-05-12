<template>
  <div class="preview-plate">
    <!--{{data}}-->
    <div class="survey-info g-mb-32">
      <h2 class="g-ta-c g-mb-16">{{data.title}}</h2>
      <div class="summary g-mb-16">
        <pre>{{data.summary}}</pre>
      </div>
      <p class="note">评分标准：5分-非常满意；4分-比较满意；3分-满意；2分-不满意；1分-非常不满意。</p>
    </div>
    <div class="survey-body">
      <!--<div v-if="opts.length === 0" class="empty-body">-->
        <!--<loading></loading>-->
      <!--</div>-->
      <div v-for="(item, idx) in opts" :key="item.parentId" class="g-mb-32">
        <h3 class="g-mb-16">{{idx + 1 | zhNum}}、{{item.title}}</h3>
        <div class="body-opts">
          <i-form label-position="top" class="profile-form">
            <FormItem v-for="(_item, _idx) in item.sonList" :key="_item.optionId">
              <h4 slot="label">{{_idx + 1}}、{{_item.optionTitle}}</h4>
              <div class="fill-area">
                <RadioGroup size="large" class="g-mb-10" >
                  <Radio label="5分" :disabled="isDisplay"></Radio>
                  <Radio label="4分" :disabled="isDisplay"></Radio>
                  <Radio label="3分" :disabled="isDisplay"></Radio>
                  <Radio label="2分" :disabled="isDisplay"></Radio>
                  <Radio label="1分" :disabled="isDisplay"></Radio>
                </RadioGroup>
                <i-input :readonly="isDisplay" placeholder="请在此输入具体评价或补充意见（可不填）" class="form-ipt"></i-input>
              </div>
            </FormItem>
          </i-form>
        </div>
      </div>
    </div>
    <div class="g-ta-c">
      <Button type="ghost" size="large" @click="back">返回上一步</Button>
      <Button type="primary" size="large" class="g-ml-16" @click="send">发送调查问卷</Button>
    </div>
    <Modal
      class-name="common-modal"
      width="540"
      v-model="isSelCustomer"
      :mask-closable="false"
      ok-text="确认发送"
      @on-ok="emailSend"
    >
      <h4 slot="header" class="g-ta-c">添加接收调查问卷的客户</h4>
      <div class="email-body">
        <div class="ipt-list g-mb-10" v-for="(item, idx) in emailList" :key="idx">
          <Row>
            <i-col span="17">
              <i-input placeholder="请在此输入接收问卷的客户邮箱" class="common-ipt" v-model="item.email"></i-input>
            </i-col>
            <i-col span="6" offset="1">
              <Button size="large" class="common-btn" @click="addEmail" v-if="idx === emailList.length - 1">
                <Icon type="plus-circled" size="16" ></Icon> 继续添加
              </Button>
              <div v-else style="line-height: 40px;">
                <a href="javascript:;" class="del-email" @click="delEmail(idx)">
                  <Icon type="close-circled" size="20" color="#FA9493"></Icon>
                </a>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import {ajax} from '../util/util'
  import {Project} from '../API/api'
  import Loading from './popup/Loading'
  import Toast from './popup/Toast'

  export default {
    name: 'SurveyPreview',
    components: {Toast, Loading},
    props: {
      isDisplay: {
        type: Boolean,
        default: false
      },
      id: {
        type: [Number, String]
      },
      projectId: {
        type: [Number, String]
      }
    },
    watch: {
      id: {
        handler (data) {
          this.getDetail(data)
        }
      }
    },
    data () {
      return {
        isSending: false,
        opts: [],
        data: {},
        isSelCustomer: false,
        isToast: false,
        toastMsg: '',
        toastState: null,
        emailList: [
          {
            email: ''
          }
        ]
      }
    },
    methods: {
      init () {
        // this.getOpts()
        this.getDetail()
      },
      getDetail (id, pid) {
        const params = {
          projectId: pid || this.projectId,
          paperId: id || this.id
        }
        ajax.post(Project.surveyDetail, params)
          .then(res => {
            this.opts = res.parentOptionSelect
            this.data = res.paperInfo
          })
          .catch(() => {})
          .finally(() => {})
      },
      delEmail (idx) {
        this.emailList.splice(idx, 1)
      },
      addEmail () {
        let canAdd = true
        this.emailList.forEach((item) => {
          if (!item.email) {
            canAdd = false
          }
        })
        if (!canAdd) {
          return
        }
        const tpl = {
          email: ''
        }
        this.emailList.push(tpl)
      },
      back () {
        this.$emit('on-cancel')
      },
      send () {
        this.isSelCustomer = true
      },
      formatData (data) {
        return data.parentOptionArr.filter((ele, idx) => {
          return this.data.optionInfo.indexOf(ele.parentId) >= 0
        })
      },
      emailSend () {
        const params = {
          projectId: this.projectId,
          paperId: this.id,
          contactInfo: this.emailList
        }
        ajax.post(Project.surveySend, params)
          .then(res => {
            this.isToast = true
            this.toastMsg = '发送成功'
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .catch(() => {})
          .finally(() => {})
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .survey-info {
    border-bottom: 1px dashed #ced4da;
    padding-bottom: 16px;
  }
  .preview-plate {
    border: 1px solid #CED4DA;
    border-radius: 4px;
    padding: 20px 32px;
  }
  h2 {
    font-size: 24px;
    color: #2c3e50;
  }
  .summary {
    font-size: 14px;
    color: #868E96;
    text-indent: 2em;
    pre {
      font-family: inherit;
      white-space: pre-wrap;
    }
  }
  .note {
    font-size: 14px;
    color: #2D8EF8;
    text-indent: 2em;
    font-weight: bold;
  }
  h3 {
    font-size: 18px;
    color: #343a40;
  }
  h4 {
    font-size: 16px;
    color: #495057;
    font-weight: normal;
  }
  .body-opts {
    padding-left: 2.5em;
  }
  .fill-area {
    padding-left: 2em;
  }
  .empty-body {
    min-height: 300px;
    position: relative;
  }
  .common-modal {
    h4 {
      font-size: 18px;
      color: #343A40;
      font-weight: bold;
    }
  }
  .ipt-list {
    padding: 0 24px;
  }
  .del-email {

  }
  .email-body {
    max-height: 360px;
    overflow: auto;
  }
</style>
