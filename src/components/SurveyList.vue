<template>
  <div>
    <template v-if="!isCreate">
      <div class="g-ta-r g-mb-20" v-if="canAdd">
        <Button type="primary" size="large" @click="createSurvey">创建问卷</Button>
      </div>
      <div class="loading" v-if="isLoading">
        <loading></loading>
      </div>
      <template v-else>
        <table class="main-list" >
          <thead>
          <tr>
            <th v-for="(item, index) in surveyTitle" :key="index" :style="{width: item.width + 'px'}">
              <div class="table-cell">
                {{item.title}}
              </div>
            </th>
          </tr>
          </thead>
          <tbody v-if="list && list.length > 0">
          <!--<template v-for="(item, index) in data" :key="'data-' + index" >-->
          <template v-for="(item, index) in list"  >
            <tr>
              <td v-for="(_item, _index) in surveyTitle" :key="'td-' + index + '-' + _index">
                <template v-if="_item.key === 'operate'">
                  <div class="table-cell">
                    <a @click="toDetailPreview(item.paperId, item.projectId)">预览</a>
                    <a class="g-ml-16" @click="toDetail(item.paperId, item.projectId)">查看详情</a>
                    <a class="g-ml-16" @click="delConfirm(item.paperId, item.title)">删除</a>
                  </div>
                </template>
                <template v-else>
                  <div class="table-cell">
                    {{item[_item.key]}}
                  </div>
                </template>
              </td>
            </tr>
            <tr v-if="detailIdx === item.id">
              <td :colspan="surveyTitle.length"></td>
            </tr>
          </template>
          </tbody>
          <tbody v-else>
          <tr>
            <td :colspan="surveyTitle.length" class="empty-data">
              很抱歉，暂无调查问卷，可点击右上方创建问卷～
              <template v-if="!canAdd">
                <br>（只有项目PM才能创建调查问卷）
              </template>
            </td>
          </tr>
          </tbody>
        </table>
      </template>
    </template>
    <template v-else>
      <template v-if="isDetail">
        <survey-detail
          @on-back="cancelDetail"
          :id="previewId"
          :project-id="projectId"
        ></survey-detail>
      </template>
      <template v-else>
        <survey-create
          v-if="!isPreview"
          class="g-mt-30"
          @on-cancel="cancelCreate"
          :data="surveyData"
          @on-switch="handleSwitch"
          @on-create="toPreview"
        ></survey-create>
        <survey-preview
          v-else
          :id="previewId"
          :project-id="projectId"
          @on-cancel="cancelPreview"
          is-display
        ></survey-preview>
      </template>
    </template>
    <Modal v-model="isModal" ok-text="确定" cancel-text="取消" title="删除确认" @on-ok="delSurvey" :closable="false">
      <p>确定删除问卷 "<span class="required-tag">{{delTitle}}</span>" ？</p>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import SurveyCreate from './SurveyCreate'
import SurveyPreview from './SurveyPreview'
import {ajax} from '../util/util'
import {Project} from '../API/api'
import Toast from './popup/Toast'
import Loading from './popup/Loading'
import SurveyDetail from './SurveyDetail'

export default {
  name: 'SurveyList',
  components: {SurveyDetail, Loading, Toast, SurveyPreview, SurveyCreate},
  props: {
    projectName: {
      type: String
    },
    customerName: {
      type: String
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    canAdd: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    projectId: {
      type: [Number, String]
    }
  },
  watch: {
    projectId: {
      handler (data) {
        // alert(data)
        this.surveyData.projectId = data
        this.surveyData.title = `NORMCORE X ${this.customerName}品牌共同成长计划`
      }
    }
  },
  data () {
    return {
      isToast: false,
      toastMsg: '',
      toastState: null,
      isModal: false,
      isPreview: false,
      isDetail: false,
      isCreate: false,
      delId: null,
      delTitle: null,
      surveyData: {
        projectId: '',
        title: '',
        summary: `感谢您进入到NORMCORE X ${this.customerName}品牌共同成长计划之项目回访问卷页面，我们期待您对项目的反馈以便我们优化和提升服务，也期待在未来与您共振前行。我们将严格保护这份问卷的隐私安全，感谢您的不吝赐教！`,
        optionInfo: []
      },
      surveyTitle: [
        {
          title: '问卷名称',
          key: 'title',
          asc: 'desc'
        },
        {
          title: '发送数量',
          key: 'sendNumber',
          asc: 'desc'
        },
        {
          title: '回收数量',
          key: 'recieveNumber',
          asc: 'desc'
        },
        {
          title: '创建人',
          key: 'creatorName',
          asc: 'desc'
        },
        {
          title: '操作',
          key: 'operate',
          asc: 'desc'
        }
      ],
      detailIdx: null,
      previewId: null
    }
  },
  methods: {
    init () {
      this.isCreate = false
      this.isDetail = false
      this.isPreview = false
      this.surveyData.projectId = this.projectId
      this.surveyData.title = `NORMCORE X ${this.customerName}品牌共同成长计划`
    },
    toDetail (id, pid) {
      this.isCreate = true
      this.isDetail = true
      this.previewId = id
    },
    delConfirm (id, title) {
      this.delId = id
      this.delTitle = title
      this.isModal = true
    },
    delSurvey () {
      const params = {
        projectId: this.surveyData.projectId,
        paperId: this.delId,
        title: this.delTitle,
        state: 2
      }
      ajax.post(Project.surveyEdit, params)
        .then(res => {
          this.isToast = true
          this.toastMsg = '删除成功'
          setTimeout(() => {
            this.isToast = false
            this.$emit('on-load')
          }, 1500)
        })
        .catch()
        .finally()
    },
    toPreview (previewId) {
      this.isPreview = true
      this.previewId = previewId
    },
    toDetailPreview (id, pid) {
      console.log('preview id', id)
      this.createSurvey()
      this.toPreview(id)
    },
    cancelPreview () {
      this.isPreview = false
      this.cancelCreate()
    },
    handleSwitch (e) {
      let existIdx = null
      // const idx = this.surveyData.optionInfo.indexOf(e)
      this.surveyData.optionInfo.forEach((item, idx) => {
        if (item.parentId === e.parentId) {
          existIdx = idx
        }
      })
      if (!existIdx) {
        this.surveyData.optionInfo.push(e)
      } else {
        this.surveyData.optionInfo.splice(existIdx, 1)
      }
    },
    createSurvey () {
      this.isCreate = true
    },
    cancelDetail () {
      this.isDetail = false
      this.cancelCreate()
    },
    cancelCreate () {
      this.isCreate = false
      this.surveyData = {
        projectId: this.projectId,
        title: '',
        summary: '',
        optionInfo: []
      }
      this.$emit('on-load')
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="less">
  .empty-data {
    height: 246px;
    text-align: center;
  }
  .loading {
    min-height: 300px;
    position: relative;
  }
</style>
