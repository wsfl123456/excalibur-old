<template>
  <div>
    <div class="g-ta-r g-mb-20">
      <Button type="primary" size="large" @click="back">返回上一步</Button>
    </div>
    <div>
      <div class="survey-info g-mb-16">
        <h2 class="g-ta-c g-mb-32">{{paperInfo.title}}</h2>
        <p >您的调查问卷<span class="note">发送数量{{paperInfo.sendNumber}}份，回收数量{{paperInfo.recieveNumber}}份</span>，详细结果如下：</p>
      </div>
      <div class="receive-list g-mb-32">
        <table class="main-list">
          <thead>
          <tr>
            <th  v-for="(item, index) in receiveTitle" :key="index" >
              <div class="table-cell">
                {{item.title}}
              </div>
            </th>
          </tr>
          </thead>
          <tbody v-if="receiveInfo.length > 0">
          <template v-for="(item, index) in receiveInfo"  >
            <tr>
              <td v-for="(_item, _index) in receiveTitle" :key="'td-' + index + '-' + _index">
                <div class="table-cell">
                  <template v-if="_item.key === 'index'">
                    {{_index + 1}}
                  </template>
                  <template v-else-if="_item.key === 'operate'">
                    <a @click="showDetail(item.recieveId)">
                      查看详情
                      <Icon v-if="detailIdx === item.recieveId" type="arrow-up-b"></Icon>
                      <Icon v-else type="arrow-down-b"></Icon>
                    </a>
                  </template>
                  <template v-else-if="_item.key === 'contactInfoName'">
                    {{item.contactInfoName || item.contactInfoEmail}}
                  </template>
                  <template v-else>
                    {{item[_item.key]}}
                  </template>
                </div>
              </td>
            </tr>
            <tr v-if="detailIdx === item.recieveId">
              <td :colspan="receiveTitle.length">
                <div class="receive-detail">
                  <div v-for="(_item, _idx) in item.content" :key="_item.parentId" class="g-mb-16">
                    <h3 class="g-mb-16">{{_idx + 1 | zhNum}}、{{_item.title}}</h3>
                    <div class="body-opts">
                      <div v-for="(__item, __idx) in _item.sonList" :key="__item.optionId" class="g-mb-16">
                        <h4 slot="label" class="g-mb-10">{{__idx + 1}}、{{__item.optionTitle}}</h4>
                        <p>
                          {{scoreConf[__item.score]}}
                          <span>（{{__item.score}}分）</span>
                          <template v-if="__item.remark">
                            --  {{__item.remark}}
                          </template>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
          <tbody v-else>
          <tr>
            <td :colspan="receiveTitle.length" class="empty-data g-ta-c">
              没有数据
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <p class="g-mb-16">问卷结果平均分：</p>
      <div class="avg-table">
        <table class="border-table ">
          <thead>
          <tr>
            <th><div class="table-cell">内容</div></th>
            <th style="width: 582px;"><div class="table-cell">具体细项</div></th>
            <th style="width: 120px;"><div class="table-cell">平均分</div></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in avgInfo" :key="item.parentId">
            <td>
              <div class="table-cell">
                {{item.title}}
              </div>
            </td>
            <td>
              <table class="inner-table border-table">
                <tr v-for="(_item, _idx) in item.sonList">
                  <td>
                    <div class="table-cell">{{_idx + 1}}、{{_item.optionTitle}}；</div>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <table class="inner-table border-table">
                <tr v-for="(_item, _idx) in item.sonList">
                  <td>
                    <div class="table-cell">
                      {{_item.avgScore}}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import {ajax} from '../util/util'
  import {Project} from '../API/api'
  import Toast from './popup/Toast'

  export default {
    name: 'SurveyDetail',
    components: {Toast},
    props: {
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
        scoreConf: {
          1: '非常不满意',
          2: '不满意',
          3: '满意',
          4: '比较满意',
          5: '非常满意'
        },
        isToast: false,
        toastMsg: '',
        detailIdx: null,
        paperInfo: {},
        receiveInfo: [],
        avgInfo: [],
        receiveTitle: [
          {
            title: '序列号',
            key: 'index',
            asc: 'desc'
          },
          {
            title: '提交人',
            key: 'contactInfoName',
            asc: 'desc'
          },
          {
            title: '提交时间',
            key: 'postTime',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate',
            asc: 'desc'
          }
        ]
      }
    },
    methods: {
      init () {
        this.getDetail()
      },
      showDetail (id) {
        this.detailIdx = this.detailIdx === id ? null : id
      },
      back () {
        this.$emit('on-back')
      },
      getDetail (id) {
        const params = {
          paperId: id || this.id
        }
        ajax.post(Project.surveyInfo, params)
          .then(res => {
            this.paperInfo = res.paperInfo
            this.receiveInfo = res.revieveInfo
            this.avgInfo = res.avgList
          })
          .catch(err => {
            this.isToast = true
            this.toastMsg = String(err).replace('Error:', '')
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
  h2 {
    font-size: 24px;
    color: #2c3e50;
  }
  .note {
    font-size: 15px;
    color: #2D8EF8;
  }
  .survey-info {
    p {
      font-size: 15px;
      color: #495057;
    }
  }
  .receive-detail {
    padding: 20px;
  }
  h3 {
    font-size: 14px;
    color: #495057;
  }
  h4 {
    font-size: 13px;
    color: #868e96;
    font-weight: normal;
  }
  .body-opts {
    padding-left: 2.5em;
    p {
      padding-left: 1.5em;
      font-size: 13px;
      color: #495057;
      span {
        color: #2D8EF8;
      }
    }
  }
</style>
