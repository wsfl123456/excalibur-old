<template>
  <div>
    <div class="g-mb-32">
      <div class="salary-fn-box">
        <div class="search-fn">
          <template v-if="currTab === 'base'">
            <i-input placeholder="请输入姓名、电话、邮箱按回车进行查询" v-model="basePageData.research" @on-keydown="search">
              <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
            </i-input>
          </template>
          <template v-else>
            <Row>
              <i-col span="19">
                <i-input placeholder="请输入姓名、电话、邮箱进行查询" v-model="payrollPageData.research" @on-keydown="search">
                  <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
                </i-input>
              </i-col>
              <i-col span="4" offset="1">
                <DatePicker type="month" :value="payrollPageData.month" placeholder="请选择月份" format="yyyyMM" confirm :clearable="false" transfer class="datepicker" @on-change="changeSearchDate"></DatePicker>
              </i-col>
            </Row>
          </template>
        </div>
        <div>
          <template v-if="currTab !== 'base'">
            <Upload class="upload-btn" name="excelFile" :action="uploadSalaryApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess" :show-upload-list="false">
              <Button type="primary">导入工资表</Button>
            </Upload>
            <Button type="primary" @click.native="exportSalaryTable">导出工资表</Button>
          </template>
          <template v-if="currTab === 'base'">
            <Upload class="upload-btn" name="excelFile"  :action="uploadBaseApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess" :show-upload-list="false">
              <Button type="primary">导入基本工资信息</Button>
            </Upload>
            <Button type="primary" @click.native="exportBase">导出基本工资信息</Button>
            <Button type="primary" @click.native="toAdd">单个新增</Button>
          </template>
        </div>
      </div>
    </div>

    <div>
      <Tabs type="card" :animated="false" v-model="currTab" @on-click="changeTabs">
        <TabPane label="基本薪资信息" name="base">
          <div>
            <div class="result-list">
              <loading v-if="isLoading"></loading>
              <!--<div class="pwd-ipt" v-if="needPwdS">-->
                <!--<div>-->
                  <!--<i-input class="ipt" type="password" placeholder="请输入6位查询密码" v-model="pwdS"></i-input>-->
                  <!--<div>-->
                    <!--<Button type="primary" class="submit-btn" size="large" @click="submitPwdS">提交</Button>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
              <table class="main-list common-table">
                <thead>
                <tr>
                  <th :class="{active: sortTh1 === index}" v-for="(item, index) in baseTitles" :key="index" :style="{'width': item.width + 'px'}" >
                    <div class="table-cell">
                      {{item.title}}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="baseList.length > 0">
                <template v-for="(item, index) in baseList">
                  <tr @click="toggleRow(item.uid, index)">
                    <td v-for="(_item, _index) in baseTitles" :key="'td-' + index + '-' + _index">
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
                      <template v-else-if="_item.key === 'userName'">
                        <div class="table-cell">
                          {{item.userName}}
                        </div>
                      </template>
                      <template v-else>
                        <div class="table-cell">
                          {{keepTwoDigits(item[_item.key])}}
                        </div>
                      </template>
                    </td>
                  </tr>
                  <tr v-if="detailId === item.uid">
                    <td :colspan="baseTitles.length">
                      <hr-salary-detail :form-value="detail" :is-loading="detailLoading" @on-save="getBaseDetail"></hr-salary-detail>
                      <!--<employee-detail :form-value="detail" :is-loading="detailLoading" @on-save="getDetail"></employee-detail>-->
                    </td>
                  </tr>
                </template>
                </tbody>
                <tbody v-else>
                <tr>
                  <td :colspan="baseTitles.length" class="empty-data">
                    没有数据
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPane>
        <TabPane label="工资单" name="payroll">
          <div>
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
                  <th :class="{active: sortTh2 === index}" v-for="(item, index) in payrollTitles" :key="index" :style="{'width': item.width + 'px'}" >
                    <div class="table-cell">
                      {{item.title}}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="payrollList.length > 0">
                <template v-for="(item, index) in payrollList">
                  <tr>
                    <td v-for="(_item, _index) in payrollTitles" :key="'td-' + index + '-' + _index">
                      <template v-if="_item.key === 'departmentName'">
                        <div class="table-cell">
                          {{item.departmentName}}
                        </div>
                      </template>
                      <template v-else-if="_item.key === 'userCode'">
                        <div class="table-cell">
                          {{item.userCode}}
                        </div>
                      </template>
                      <template v-else-if="_item.key === 'userName'">
                        <div class="table-cell">
                          {{item.userName}}
                        </div>
                      </template>
                      <template v-else-if="_item.key === 'month'">
                        <div class="table-cell">
                          {{item.month}}
                        </div>
                      </template>
                      <template v-else-if="_item.key === 'teamName'">
                        <div class="table-cell">
                          {{item.teamName}}
                        </div>
                      </template>
                      <template v-else>
                        <div class="table-cell">
                          {{keepTwoDigits(item[_item.key])}}
                        </div>
                      </template>

                    </td>
                  </tr>
                </template>
                </tbody>
                <tbody v-else>
                <tr>
                  <td :colspan="payrollTitles.length" class="empty-data">
                    没有数据
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import {Hr} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import HrSalaryDetail from '../../components/HrSalaryDetail'
  import SubHeader from '../../components/SubHeader'
  var host = location.href.split('/#/')[0]
  console.log(Hr.payrollImport, 1111)
  export default {
    components: {
      SubHeader,
      HrSalaryDetail,
      Loading,
      Toast,
      BCrumb},
    name: 'hr-salary',
    data () {
      return {
        crumb: [
          {label: '人事管理'},
          {label: '薪资与奖金'},
          {label: '薪资管理'}
        ],
        uploadSalaryApi:' /' + Hr.payrollImport,
        uploadBaseApi: '/' + Hr.salaryImport,
        uploadFileName: null,
        needPwd: false,
        needPwdS: false,
        infoList: [],
        detailLoading: false,
        currTab: 'base',
        isToast: false,
        toastMsg: null,
        detailId: null,
        detail: {},
        pwd: '',
        pwdS: '',
        searchValue: '',
        isLoading: false,
        sortTh1: null,
        sortTh2: null,
        canLoadMore: true,
        dom: null,
        chDom: null,
        baseTitles: [
          {
            title: '员工编号',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '员工姓名',
            key: 'userName',
            asc: 'desc',
            width: 130
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '基本薪资',
            key: 'baseSalary',
            asc: 'desc'
          },
          {
            title: '公积金基数',
            key: 'fundBase',
            asc: 'desc'
          },
          {
            title: '社保基数',
            key: 'socialBase',
            asc: 'desc'
          },
          {
            title: '补贴',
            key: 'allowance',
            asc: 'desc'
          }
        ],
        payrollTitles: [
          {
            title: '员工编号',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '员工姓名',
            key: 'userName',
            asc: 'desc',
            width: 130
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '基本薪资',
            key: 'totalSalary',
            asc: 'desc'
          },
          {
            title: '个人社保合计',
            key: 'socialTotal',
            asc: 'desc'
          },
          {
            title: '个人公积金合计',
            key: 'fundTotal',
            asc: 'desc'
          },
          {
            title: '公司社保合计',
            key: 'companyTotal',
            asc: 'desc'
          },
          {
            title: '公司公积金合计',
            key: 'companyFund',
            asc: 'desc'
          },
          {
            title: '报销',
            key: 'reimbursement',
            asc: 'desc'
          },
          {
            title: '共计',
            key: 'actSalary',
            asc: 'desc'
          },
          {
            title: '月份',
            key: 'month',
            asc: 'desc'
          }
        ],
        basePageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          research: ''
        },
        payrollPageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          research: '',
          month: ''
        },
        baseList: [],
        payrollList: []
      }
    },
    methods: {
      keepTwoDigits (value) {
        if (value) {
          if (value.indexOf("*") > -1) {
            return value;
          } else {
            return Math.round(value * 100) / 100;
          }
        } else {
          return 0;
        }
      },
      sortData1 (idx) {
        let key = this.baseTitles[idx].key
        if (key === 'statusString') {
          key = 'status'
        } else if (key === 'rankName') {
          key = 'rankId'
        } else if (key === 'positionName') {
          key = 'positionId'
        } else if (key === 'name') {
          key = 'englishName'
        }
        if (this.sortTh1 === idx) {
          const asc = this.baseTitles[idx].asc
          if (asc === 'desc') {
            this.baseTitles[idx].asc = 'asc'
          } else {
            this.baseTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh1 = idx
        }
        let data = this.basePageData
        data.orderBy = key
        data.asc = this.baseTitles[idx].asc
        data.page = 1
        this.basePageData = data
        this.getBase()
      },
      sortData2 (idx) {
        let key = this.payrollTitles[idx].key
        if (key === 'statusString') {
          key = 'status'
        } else if (key === 'rankName') {
          key = 'rankId'
        } else if (key === 'positionName') {
          key = 'positionId'
        } else if (key === 'name') {
          key = 'englishName'
        }
        if (this.sortTh2 === idx) {
          const asc = this.payrollTitles[idx].asc
          if (asc === 'desc') {
            this.payrollTitles[idx].asc = 'asc'
          } else {
            this.payrollTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh2 = idx
        }
        let data = this.payrollPageData
        data.orderBy = key
        data.asc = this.payrollTitles[idx].asc
        data.page = 1
        this.payrollPageData = data
        this.getPayroll()
      },
      exportSalaryTable () {
        window.open('/api/user/exportmonthsalary/?Authorization=Bearer ' + this.$cookie.get('token') + '&month=' + this.payrollPageData.month)
      },
      exportBase () {
        window.open('/api/user/exportsalary/?Authorization=Bearer ' + this.$cookie.get('token'))
      },
      search (e) {
        if (e.keyCode === 13) {
          switch (this.currTab) {
            case 'base':
              this.basePageData.page = 1
              this.getBase()
              break
            case 'payroll':
              this.payrollPageData.page = 1
              this.getPayroll()
              break
          }
        }
      },
      toAdd () {
        this.$router.push('./addSalary')
      },
      changeSearchDate (date) {
        this.payrollPageData.page = 1
        this.payrollPageData.month = date
        this.getPayroll()
      },
      toggleRow (data, idx) {
        if (this.detailId === data) {
          this.detailId = null
        } else {
          this.detailId = data
          this.getBaseDetail()
        }
      },
      changeTabs (name) {
        if (name === 'payroll' && this.payrollList.length === 0) {
          this.getPayroll()
        }
        if (name === 'base' && this.baseList.length === 0) {
          this.getBase()
        }
      },
      getBaseDetail () {
        this.detailLoading = true
        this.$http.post(Hr.detailContract, this.qs.stringify({id: this.detailId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.detailLoading = false
          if (_data.retCode === 0) {
            this.detail = _data.retData
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
      beforeUpload (file) {
        this.uploadFileName = file.name
      },
      getBase () {
        this.isLoading = true
        this.$http.post(Hr.salaryList, this.qs.stringify(this.basePageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwdS = true
            }
            if (this.basePageData.page === 1) {
              this.baseList = _data.retData.data || []
            } else {
              this.baseList = this.baseList.concat(_data.retData.data)
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.basePageData.page--
              this.isToast = true
              this.toastMsg = '没有更多'
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      submitPwd () {
        this.$http.post(Hr.payrollPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
        // this.$http.post(Hr.salaryPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.needPwd = false
            this.getPayroll()
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
      submitPwdS () {
        this.$http.post(Hr.salaryPwd, this.qs.stringify({password: this.pwdS}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.needPwdS = false
            this.getBase()
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
            this.payrollPageData.page = 1
            if (this.currTab === 'base') {
              this.getBase()
            } else {
              this.getPayroll()
            }
          }
        }, 1500)
      },
      getPayroll () {
        this.isLoading = true
        this.$http.post(Hr.payrollList, this.qs.stringify(this.payrollPageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwd = true
            }
            if (this.payrollPageData.page === 1) {
              this.payrollList = _data.retData.data || []
            } else {
              this.payrollList = this.payrollList.concat(_data.retData.data)
            }
            if (_data.retData.data.length === 0 || !_data.retData.data) {
              this.payrollPageData.page--
              this.isToast = true
              this.toastMsg = '没有更多'
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            if (_data.retCode === 100014) {
              this.$cookie.delete('token')

              this.$router.push('/')
            }
          }, 1500)
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          switch (this.currTab) {
            case 'base':
              this.basePageData.page++
              this.getBase()
              break
            case 'payroll':
              this.payrollPageData.page++
              this.getPayroll()
              break
          }
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
      this.getBase()
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
  .salary-fn-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-fn {
      flex: 1;
      margin-right: 20px;
    }
  }
</style>


