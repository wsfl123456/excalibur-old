<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输入姓名、项目ID按回车进行查询" v-model="pageData.research" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
        <i-col span="9" offset="1">
          <Upload class="upload-btn"  name="excelFile" :action="uploadApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess" :show-upload-list="false">
            <Button type="primary">导入奖金分配表</Button>
          </Upload>
          <Button type="primary" @click.native="exportBonus">导出奖金分配表</Button>

        </i-col>
      </Row>
    </div>

    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <!--<div class="pwd-ipt" v-if="needPwd">-->
        <!--<div>-->
          <!--<i-input class="ipt" type="password" placeholder="请输入6位查询密码" v-model="pwd"></i-input>-->
          <!--<div>-->
            <!--<Button type="primary" class="submit-btn" size="large" @click="submitPwd">提交</Button>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <table class="main-list common-table">
        <thead>
        <tr>
          <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" >
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0">
        <template v-for="(item, index) in list">
          <tr>
            <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'departmentId'">
                <div class="table-cell">
                  {{item.departmentName}}
                </div>
              </template>
              <template v-else-if="_item.key === 'positionId'">
                <div class="table-cell">
                  {{item.positionName}}
                </div>
              </template>
              <template v-else-if="_item.key === 'month'">
                <div class="table-cell">
                  {{item[_item.key] | filterYear}}
                </div>
              </template>
              <template v-else>
                <div class="table-cell">
                  {{item[_item.key]}}
                </div>
              </template>

            </td>
          </tr>
        </template>
        </tbody>
        <tbody v-else>
        <tr>
          <td :colspan="tableTitles.length" class="empty-data">
            没有数据
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Hr} from '../../API/api'
  import SubHeader from '../../components/SubHeader'
  var host = location.href.split('/#/')[0]

  export default {
    components: {
      SubHeader,
      Toast,
      Loading,
      BCrumb},
    name: 'hr-bonus',
    data () {
      return {
        isToast: false,
        isLoading: false,
        toastMsg: null,
        needPwd: false,
        pwd: '',
        canLoadMore: true,
        dom: null,
        chDom: null,
        uploadFileName: null,
        uploadApi: host + '/' + Hr.hrBonusImport,
        crumb: [
          {label: '人事管理'},
          {label: '薪资与奖金'},
          {label: '奖金管理'}
        ],
        searchValue: '',
        list: [],
        sortTh: null,
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          research: ''
        },
        tableTitles: [
          {
            title: '员工编号',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '员工姓名',
            key: 'userName',
            asc: 'desc'
          },
          {
            title: '部门',
            key: 'departmentName',
            asc: 'desc'
          }, {
            title: '职位',
            key: 'positionName',
            asc: 'desc'
          },
          {
            title: '项目ID',
            key: 'projectCode',
            asc: 'desc'
          },
          {
            title: '项目名称',
            key: 'projectName',
            asc: 'desc'
          },
          {
            title: '项目职能',
            key: 'functionName',
            asc: 'desc'
          },
          {
            title: '项目状态',
            key: 'state',
            asc: 'desc'
          },
          {
            title: '奖金金额',
            key: 'bonus',
            asc: 'desc'
          },
          {
            title: '发放时间',
            key: 'month',
            asc: 'desc'
          }
        ]
      }
    },
    methods: {
      sortData (idx) {
        let key = this.tableTitles[idx].key
        if (this.sortTh === idx) {
          const asc = this.tableTitles[idx].asc
          if (asc === 'desc') {
            this.tableTitles[idx].asc = 'asc'
          } else {
            this.tableTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh = idx
        }
        let data = this.pageData
        data.orderBy = key
        data.asc = this.tableTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getList()
      },
      exportBonus () {
        window.open(host + Hr.hrBonusExport + '/?Authorization=Bearer ' + this.$cookie.get('token'))
      },
      search (e) {
        if (e.keyCode === 13) {
          this.pageData.page = 1
          this.getList()
        }
      },
      beforeUpload (file) {
        this.uploadFileName = file.name
      },
      submitPwd () {
        // this.$http.post(Hr.payrollPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
        this.$http.post(Hr.bounsPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.needPwd = false
            this.getList()
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      uploadSuccess (res) {
        let _data = res
        if (_data.retCode === 0) {
          this.toastMsg = '导入成功'
          this.toastState = 'success'
        } else {
          this.toastState = null
          this.toastMsg = _data.retMsg
        }
        this.isToast = true
        setTimeout(() => {
          this.isToast = false
          this.toastState = null
          this.toastMsg = null
          if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
          if (_data.retCode === 0) {
            this.pageData.page = 1
            this.getList()
          }
        }, 1500)
      },
      getList () {
        this.isLoading = true
        this.$http.post(Hr.hrBonus, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwd = true
            }
            if (this.pageData.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data)
            }

            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.pageData.page--
              this.isToast = true
              this.toastMsg = '没有更多'
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.pageData.page++
          this.getList()
        }
      },
      loadMore () {
        this.dom.addEventListener('scroll', this.scrollHandler)
      },
      unbindLoadMore () {
        this.dom.removeEventListener('scroll', this.scrollHandler)
      }
    },
    created () {
      this.getList()
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    }
  }
</script>

<style scoped lang="less">
  .upload-btn {
    display: inline-block;
  }
  .result-list {
    position: relative;
    min-height: 300px;
    .pwd-ipt {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      > div {
        text-align: center;
      }
      .ipt {
        width: 300px;
        margin-bottom: 16px;
      }
      .submit-btn {
        /*background-color: #2d8ef8;*/
        /*width: 120px;*/
        /*height: 40px;*/
        /*border-radius: 4px;*/
        /*text-align: center;*/
        /*text-decoration: none;*/
        /*color: #fff;*/
        /*font-size: 14px;*/
        /*border: 0 none;*/
        &:hover {
          /*opacity: .8;*/
        }
      }
    }
  }
</style>
