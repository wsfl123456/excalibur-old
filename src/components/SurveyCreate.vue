<template>
  <div>
    <div>
      <i-form label-position="top" class="profile-form">
        <FormItem label="问卷标题">
          <Row>
            <i-col span="12">
              <i-input placeholder="请在此输入问卷标题，限制在15字内" class="form-ipt" v-model="data.title"></i-input>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="开头引语">
          <i-input type="textarea" placeholder="请在此输入该问卷的开头引语" class="form-ipt" :autosize="{minRows: 2, maxRows: 7}" v-model="data.summary"></i-input>
        </FormItem>
      </i-form>
      <div class="g-mb-16">
        <Icon type="ios-information-outline" color="#FA9493" size="16" style="line-height: 1;"></Icon> 评分标准：5分-非常满意；4分-比较满意；3分-满意；2分-不满意；1分-非常不满意。
      </div>
      <div class="g-mb-16">
        <table class="border-table ">
          <thead>
          <tr>
            <th><div class="table-cell">内容</div></th>
            <th style="width: 582px;"><div class="table-cell">具体细项</div></th>
            <th style="width: 120px;"><div class="table-cell">操作</div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in opts.parentOptionArr" :key="item.parentId">
            <td>
              <div class="table-cell">
                {{item.title}}
              </div>
            </td>
            <td>
              <div class="table-cell">
                <template v-for="(_item, _idx) in item.sonList">
                  {{_idx + 1}}、{{_item.optionTitle}}；
                </template>
              </div>
            </td>
            <td>
              <div class="table-cell">
                <i-switch size="large" :value="switchData[item.parentId]" @on-change="optToggle($event, item.parentId)">
                  <span slot="open">选用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="g-ta-c">
      <Button type="ghost" size="large" @click="cancelCreate">返回上一步</Button>
      <Button type="primary" size="large" class="g-ml-16" @click="create" :loading="isCreating">生成调查问卷</Button>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import {ajax} from '../util/util'
  import {Project} from '../API/api'
  import Toast from './popup/Toast'

  export default {
    name: 'SurveyCreate',
    components: {Toast},
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        opts: [],
        isToast: false,
        toastMsg: '',
        toastState: null,
        switchData: {},
        isCreating: false
      }
    },
    methods: {
      init () {
        this.getOpts()
      },
      initData () {
        let _data = {}
        this.data.optionInfo.forEach((item, idx) => {
          _data[item.parentId] = true
        })
        this.switchData = _data
      },
      optToggle (e, id) {
        this.$emit('on-switch', {parentId: id})
      },
      getOpts () {
        ajax.post(Project.surveyOpts)
          .then(res => {
            this.opts = res
          })
          .catch()
          .finally(() => {
            this.initData()
          })
      },
      create () {
        if (!this.data.title) {
          this.isToast = true
          this.toastMsg = '请填写标题'
          setTimeout(() => {
            this.isToast = false
          }, 1500)
          return
        }
        this.isCreating = true
        ajax.post(Project.surveyAdd, this.data)
          .then(res => {
            this.isToast = true
            this.toastMsg = '问卷已生成'
            setTimeout(() => {
              this.isToast = false
              this.$emit('on-create', res.paperId)
            }, 1500)
          })
          .catch(() => {
            this.isToast = true
            this.toastMsg = '问卷生成错误'
            setTimeout(() => {
              this.isToast = false
            }, 1500)
          })
          .finally(() => {
            this.isCreating = false
          })
      },
      cancelCreate () {
        this.$emit('on-cancel')
      }
    },
    created () {
      this.init()
    },
    mounted () {
      // this.init()
    }
  }
</script>

<style scoped lang="less">

</style>
