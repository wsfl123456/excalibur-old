<template>
  <div class="list-detail">
    {{taskId}}
    <Alert v-if="status === 3" type="error" class="nopass">
      <span class="alert-title">
        <Icon type="android-alert" size="20"></Icon>
        审核不通过
      </span>
      <span class="alert-detail">
        审核不通过的原因审核不通过的原因审核不通过的原因审核不通过的原因审核不通过的原因审核不通过的原因
      </span>
    </Alert>
    <div>
      <Row>
        <i-col span="18">
          <form-box :status="status" :form-data="detailData.basic" :extra-datas="detailData.extra" :requirement="detailData.requirement" :is-edit="false"></form-box>
        </i-col>
        <i-col span="5" offset="1"  class="task-belong">
          <Row class="g-mb-16">
            <i-col span="3" offset="1">
              <Tooltip  content="项目" placement="bottom">
                <Icon type="home"></Icon>
              </Tooltip>
            </i-col>
            <i-col span="20">
              <router-link to="">KFC Breakfast Soymilk</router-link>
            </i-col>
          </Row>
          <Row>
            <i-col span="3" offset="1">
              <Tooltip  content="品牌" placement="bottom">
                <Icon type="card"></Icon>
              </Tooltip>
            </i-col>
            <i-col span="20">
              <router-link to="">KFC</router-link>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
    <div v-if="status === 4">
      <Row>
        <i-col span="18">
          <form-box :requirement="filesForm"></form-box>
        </i-col>
      </Row>
    </div>
    <div>
      <Row>
        <i-col span="18">
          <Tabs>
            <TabPane :label="item.label" v-for="(item, index) in filesTabs" :key="index">
              <Table class="files-table" :columns="item.title" :data="item.data"></Table>
            </TabPane>
          </Tabs>
        </i-col>
      </Row>
    </div>
  </div>
</template>

<script>
  import FormBox from '../FormBox'
  import { Task } from '../../API/api'
  export default {
    components: {FormBox},
    name: 'main-detail',
    props: {
      detailData: {
        type: Object
      },
      status: {
        type: Number, // 1 通过 | 2 审核中 | 3 审核不通过 | 4 审核通过 | 5 质检中 | 6 质检不通过 | 7 质检通过
        default: 1
      }
    },
    data () {
      return {
        filesForm: [{
          items: [
            [
              {label: '提交文件', type: 'input', placeholder: '填写提交文件名称', value: ''},
              {label: '公盘地址', type: 'input', placeholder: '上传到公盘后粘贴地址 格式：mac: smb://192.168.100.3/NORMCORE/ windows: Y:\\', value: ''}
            ]
          ],
          title: '提交文件',
          canMore: true
        }],
        filesTabs: [
          {
            label: '文件',
            data: [
              {name: 'PHDI_Black_H5_Userflow_v1.0', date: '2017-12-31 14:55', people: '', url: '//baidu.com'},
              {name: 'PHDI_Black_H5_Userflow_v1.0', date: '2017-12-31 14:55', people: '', url: '//bing.com'},
              {name: 'PHDI_Black_H5_Userflow_v1.0', date: '2017-12-31 14:55', people: '', url: ''}
            ],
            title: [
              {title: '文件名称', key: 'name', sortable: true, ellipsis: false},
              {title: '上传时间', key: 'date', sortable: true, width: 150},
              {
                width: 100,
                title: '创建者',
                key: 'people',
                sortable: true,
                render: (h, params) => {
                  const row = params.row
                  const avatar = row.people
                  return h('Avatar', {
                    props: {
                      src: avatar,
                      icon: 'person'
                    }
                  })
                }
              },
              {
                width: 80,
                title: '',
                key: 'url',
                sortable: false,
                renderHeader: (h, obj) => {
                  return ''
                },
                render: (h, params) => {
                  // const row = params.row
                  // const color = row.degree === 1 ? '#ff8685' : row.degree === 2 ? '#ffe15b' : '#89ea97'
                  // return h('a', {
                  //   domProps: {
                  //     href: row.url
                  //   }
                  // }, '下载')
                  return h('span', {
                    domProps: {
                    }
                  }, '下载')
                }
              }
            ]
          },
          {
            label: '任务日志'
          }
        ]
      }
    },
    computed: {
      taskId () {
        return this.$store.state.taskDetail.id
      }
    },
    updated () {
      this.$http.post(Task.detail, this.qs.stringify({taskId: this.taskId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
      })
    }
  }
</script>

<style scoped lang="less">

  .list-detail {
    padding: 16px;
    background-color: #ced4da;
    > div {
      padding: 32px 32px 32px 64px;
      background-color: #fff;
      margin-bottom: 16px;
    }
    /*.nopass {*/
      /*margin-bottom: 0!important;*/
      /*background-color: #ff8685;*/
      /*border-radius: 6px 6px 0 0;*/
      /*border: 0 none;*/
      /*height: 48px;*/
      /*line-height: 48px;*/
      /*padding: 0;*/
      /*font-size: 14px;*/
      /*color: #fff;*/
      /*overflow: hidden;*/
      /*!*display: flex;*!*/
      /*.alert-title {*/
        /*background-color: #fa5252;*/
        /*display: inline-block;*/
        /*vertical-align: top;*/
        /*height: 48px;*/
        /*line-height: 48px;*/
        /*text-align: center;*/
        /*width: 150px;*/
        /*margin-right: 24px;*/
        /*i {*/
          /*line-height: 1;*/
        /*}*/
      /*}*/
      /*.alert-detail {*/
        /*!*flex: 1;*!*/
      /*}*/
    /*}*/
  }
  .task-belong {
    a {
      text-decoration: underline;
    }
  }
</style>
