<template>
  <div class="big-body">
    <img src="https://developer.normcore.com/static/images/survey_1.png" alt="" class="top-img">
    <div class="preview-plate">
      <div>
        <div class="survey-info g-mb-32">
          <h2 class="g-ta-c g-mb-16">{{data.title}}</h2>
          <div class="summary g-mb-16">
            <pre>{{data.summary}}</pre>
          </div>
          <p class="note">评分标准：5分-非常满意；4分-比较满意；3分-满意；2分-不满意；1分-非常不满意。</p>
        </div>
        <div class="project-info g-mb-32">
          <ul>
            <li><span>项目名称：</span> {{projectInfo.projectName}}</li>
            <li><span>项目周期：</span> {{projectInfo.projectStartTime}} - {{projectInfo.projectEndTime}}</li>
            <li><span>项目负责人：</span> {{projectInfo.leadingPmNames}}</li>
            <li><span>项目执行人：</span> {{projectInfo.otherMemberNames}}</li>
          </ul>
        </div>
        <div class="survey-body">
          <div v-for="(item, idx) in opts" :key="item.parentId" class="g-mb-32">
            <h3 class="g-mb-16">{{idx + 1 | zhNum}}、{{item.title}}</h3>
            <div class="body-opts">
              <i-form label-position="top" class="profile-form">
                <FormItem v-for="(_item, _idx) in item.sonList" :key="_item.optionId">
                  <h4 slot="label">{{_idx + 1}}、{{_item.optionTitle}}</h4>
                  <div class="fill-area">
                    <RadioGroup size="large" class="g-mb-10" v-model="optionRadios[_item.optionId].score">
                      <Radio label="5" :disabled="+receiveInfo.state === 2">5分</Radio>
                      <Radio label="4" :disabled="+receiveInfo.state === 2">4分</Radio>
                      <Radio label="3" :disabled="+receiveInfo.state === 2">3分</Radio>
                      <Radio label="2" :disabled="+receiveInfo.state === 2">2分</Radio>
                      <Radio label="1" :disabled="+receiveInfo.state === 2">1分</Radio>
                    </RadioGroup>
                    <i-input :disabled="+receiveInfo.state === 2" placeholder="请在此输入具体评价或补充意见（可不填）" class="form-ipt"
                             v-model="optionRadios[_item.optionId].remark"></i-input>
                  </div>
                </FormItem>
              </i-form>
            </div>
          </div>
        </div>
        <div class="g-ta-c" v-if="+receiveInfo.state === 1">
          <Button type="primary" size="large" class="g-ml-16" @click="submit">提交调查问卷</Button>
        </div>
      </div>
      <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    </div>
  </div>
</template>

<script>
  import {ajax} from '../../util/util'
  import {Survey} from '../../API/api'
  import Toast from '../../components/popup/Toast'

  export default {
    name: 'Customer',
    components: {Toast},
    data () {
      return {
        isToast: false,
        toastMsg: '',
        toastState: null,
        isSending: false,
        opts: [],
        data: {},
        isSelCustomer: false,
        projectInfo: {},
        receiveInfo: {},
        optionRadios: {},
        submitData: {
          code: '',
          content: []
        }
      }
    },
    methods: {
      init () {
        this.getPreLoad()
      },
      submit () {
        this.submitData.content = []
        for (let key in this.optionRadios) {
          const v = this.optionRadios[key]
          this.submitData.content.push(
            {
              optionId: key,
              score: v.score,
              remark: v.remark
            }
          )
        }
        ajax.post(Survey.submit, this.submitData)
          .then(() => {
            this.isToast = true
            this.toastMsg = '提交成功'
            setTimeout(() => {
              this.isToast = false
              window.close()
            }, 1500)
          })
          .catch(err => {
            this.isToast = true
            this.toastMsg = String(err).replace('Error:', '')
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .finally(() => {

          })
      },
      getPreLoad () {
        const code = this.$route.params.code
        this.submitData.code = code
        ajax.post(Survey.preLoad, {code})
          .then(res => {
            console.log('res', res)
            this.data = res.paperInfo
            this.projectInfo = res.projectInfo
            this.receiveInfo = res.revieveInfo
            if (+res.revieveInfo.state === 2) {
              this.opts = res.revieveInfo.content
            } else {
              this.opts = res.parentOptionSelect
            }
            let radios = {}
            this.opts.forEach((item) => {
              console.log('item', item)
              item.sonList.forEach((_item) => {
                console.log('_item', _item)
                radios[_item.optionId] = {score: _item.score, remark: _item.remark || ''}
              })
            })
            this.optionRadios = radios
            if (+res.revieveInfo.state === 2) {
              this.isToast = true
              this.toastMsg = '您已提交过此问卷'
            }
          })
          .catch((err) => {
            console.log('catch', err)
            this.isToast = true
            this.toastMsg = String(err).replace('Error:', '')
          })
          .finally(() => {
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .top-img {
  }

  .big-body {
    width: 100%;
    background-color: #f1f3f5;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  .preview-plate {
    max-width: 640px;
    /*max-width: 1140px;*/
    margin: -110px auto 0;
    /*box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .3);*/
    border-radius: 0 0 2px 2px;
    border: solid 1px #000;
    border-top: none;
    position: relative;
    z-index: 1;
    padding-top: 110px;
    background-color: transparent;

    > div {
      background-color: #fff;
      padding: 40px 40px;
    }
  }

  .survey-info {
    border-bottom: 1px dashed #ced4da;
    padding-bottom: 16px;
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

  .project-info {
    background: #F8F9FA;
    border: 1px solid #E9ECEF;
    padding: 16px 28px;
    font-size: 14px;

    li {
      color: #495057;

      span {
        color: #868e96;
        display: inline-block;
        width: 90px;
        text-align: right;
      }
    }
  }
</style>
