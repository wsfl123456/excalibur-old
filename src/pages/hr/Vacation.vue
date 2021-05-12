<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输入姓名、员工ID按回车进行查询" v-model="pageData.searchStr" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
        <template v-if="currTab !== 'month'">
          <i-col span="9" offset="1">
            <Upload class="upload-btn" name="excelFile" :action="vacationApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess"  :show-upload-list="false">
              <Button type="primary">导入假期表</Button>
            </Upload>
            <Button type="primary" @click.native="exportVaca">导出{{tabConf[currTab]}}</Button>

          </i-col>
        </template>
        <template v-else>
          <i-col span="3" offset="1" v-if="currTab === 'month'">
            <DatePicker type="month" :value="pageData.month" placeholder="请选择月份" format="yyyyMM" confirm :clearable="false" transfer class="datepicker" @on-change="changeSearchDate"></DatePicker>
          </i-col>
          <i-col span="5" offset="1">
            <Upload class="upload-btn" name="excelFile" :action="vacationApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess"  :show-upload-list="false">
              <Button type="primary">导入假期表</Button>
            </Upload>
            <Button type="primary" @click.native="exportVaca">导出假期表</Button>
          </i-col>
        </template>


      </Row>
    </div>
    <div>
      <Tabs type="card" :animated="false" v-model="currTab" @on-click="changeTabs">
        <TabPane label="假期明细" name="detail">
          <div>
            <div class="g-mb-16">
              <DatePicker type="date" :value="pageData.start_date" placeholder="请选择开始月份" format="yyyy-MM-dd" confirm :clearable="false" transfer class="datepicker" @on-change="changeDate('start', $event)"></DatePicker>
              <DatePicker type="date" :value="pageData.end_date" placeholder="请选择结束月份" format="yyyy-MM-dd" confirm :clearable="false" transfer class="datepicker" @on-change="changeDate('end', $event)"></DatePicker>
              <Button type="primary" @click="searchDetail">搜索</Button>
            </div>
            <div class="result-list">
              <loading v-if="isLoading"></loading>
              <table class="main-list common-table">
                <thead>
                <tr>
                  <th v-for="(item, index) in detailTitle" :key="index" :style="{'width': item.width + 'px'}" >
                    <div class="table-cell">
                      {{item.title}}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="detailData.length > 0">
                <template v-for="(item, index) in detailData">
                  <tr>
                    <td v-for="(_item, _index) in detailTitle" :key="'td-' + index + '-' + _index">
                      <template>
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
                  <td :colspan="detailTitle.length" class="empty-data">
                    没有数据
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabPane>
        <TabPane label="年请假记录" name="year">
          <div>
            <div class="result-list">
              <loading v-if="isLoading"></loading>
              <table class="main-list common-table">
                <thead>
                <tr>
                  <th :class="{active: sortTh1 === index}" v-for="(item, index) in tableTitles" :key="index" :style="{'width': item.width + 'px'}" >
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
          </div>
        </TabPane>
        <TabPane label="月请假记录" name="month">
          <div>
            <div class="result-list">
              <loading v-if="isLoading"></loading>
              <table class="main-list common-table">
                <thead>
                <tr>
                  <th :class="{active: sortTh2 === index}" v-for="(item, index) in tableTitles" :key="index" :style="{'width': item.width + 'px'}" >
                    <div class="table-cell">
                      {{item.title}}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="monthData.length > 0">
                <template v-for="(item, index) in monthData">
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
          </div>
        </TabPane>
        <TabPane label="剩余假期记录" name="remain">
          <div>
            <div class="result-list">
              <loading v-if="isLoading"></loading>
              <table class="main-list common-table">
                <thead>
                <tr>
                  <th :class="{active: sortTh3 === index}" v-for="(item, index) in remainTitle" :key="index" :style="{'width': item.width + 'px'}" >
                    <div class="table-cell">
                      {{item.title}}
                    </div>
                  </th>
                </tr>
                </thead>
                <tbody v-if="remainData.length > 0">
                <template v-for="(item, index) in remainData">
                  <tr>
                    <td v-for="(_item, _index) in remainTitle" :key="'td-' + index + '-' + _index">
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
                  <td :colspan="remainTitle.length" class="empty-data">
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
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Hr} from '../../API/api'
  import SubHeader from '../../components/SubHeader'

  export default {
    components: {
      SubHeader,
      Loading,
      Toast,
      BCrumb},
    name: 'vacation',
    data () {
      return {
        tabConf: {
          year: '年请假记录',
          month: '月请假记录',
          remain: '剩余假期记录',
          detail: '请假明细'
        },
        currTab: 'detail',
        needPwd: false,
        pwd: '',
        uploadFileName: null,
        canLoadMore: true,
        vacationApi: '/' + Hr.vacationImport,
        dom: null,
        chDom: null,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        list: [],
        sortTh1: null,
        sortTh2: null,
        sortTh3: null,
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          searchStr: '',
          month: '',
          start_date: null,
          end_date: null
        },
        monthData: [],
        remainData: [],
        detailData: [],
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
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '年假',
            key: 'yearsLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '病假(带薪)',
            key: 'sickLeaveE2',
            asc: 'desc',
            width: 100
          },
          {
            title: '病假(普通)',
            key: 'sick2LeaveE2',
            asc: 'desc',
            width: 100
          },
          {
            title: '婚假',
            key: 'marryLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '丧假',
            key: 'funeralLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '产假',
            key: 'maternityLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '陪产假',
            key: 'paternityLeaveE2',
            asc: 'desc',
            width: 75
          },
          {
            title: '调休',
            key: 'compensatedLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '事假',
            key: 'leaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '其他',
            key: 'othersLeaveE2',
            asc: 'desc',
            width: 65
          }
        ],
        remainTitle: [
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
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '年假',
            key: 'yearsLeaveE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '病假(带薪)',
            key: 'sickLeaveE2',
            asc: 'desc',
            width: 120
          },
          // {
          //   title: '婚假',
          //   key: 'marryLeaveE2',
          //   asc: 'desc',
          //   width: 65
          // },
          // {
          //   title: '丧假',
          //   key: 'funeralLeaveE2',
          //   asc: 'desc',
          //   width: 65
          // },
          // {
          //   title: '产假',
          //   key: 'maternityLeaveE2',
          //   asc: 'desc',
          //   width: 65
          // },
          // {
          //   title: '陪产假',
          //   key: 'paternityLeaveE2',
          //   asc: 'desc',
          //   width: 75
          // },
          {
            title: '调休',
            key: 'compensatedLeaveE2',
            asc: 'desc',
            width: 65
          }
        ],
        detailTitle: [
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
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '请假类型',
            key: 'vacationName',
            asc: 'desc',
            width: 100
          },
          {
            title: '天数',
            key: 'dayCountE2',
            asc: 'desc',
            width: 65
          },
          {
            title: '开始时间',
            key: 'startTime',
            asc: 'desc',
            width: 100
          },
          {
            title: '结束时间',
            key: 'endTime',
            asc: 'desc',
            width: 100
          },
          {
            title: '请假理由',
            key: 'reason',
            asc: 'desc',
            width: 100
          },
          {
            title: '审批意见',
            key: 'auditStatus',
            asc: 'desc',
            width: 100
          },
          {
            title: '创建时间',
            key: 'createTime',
            asc: 'desc',
            width: 100
          }
        ]
      }
    },
    methods: {
      sortData1 (idx) {
        let key = this.tableTitles[idx].key
        if (this.sortTh1 === idx) {
          const asc = this.tableTitles[idx].asc
          if (asc === 'desc') {
            this.tableTitles[idx].asc = 'asc'
          } else {
            this.tableTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh1 = idx
        }
        let data = this.pageData
        data.orderBy = key
        data.asc = this.tableTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getList()
      },
      sortData2 (idx) {
        let key = this.tableTitles[idx].key
        if (this.sortTh2 === idx) {
          const asc = this.tableTitles[idx].asc
          if (asc === 'desc') {
            this.tableTitles[idx].asc = 'asc'
          } else {
            this.tableTitles[idx].asc = 'desc'
          }
        } else {
          this.sortTh2 = idx
        }
        let data = this.pageData
        data.orderBy = key
        data.asc = this.tableTitles[idx].asc
        data.page = 1
        this.pageData = data
        this.getMonthData()
      },
      sortData3 (idx) {
        let key = this.remainTitle[idx].key
        if (this.sortTh2 === idx) {
          const asc = this.remainTitle[idx].asc
          if (asc === 'desc') {
            this.remainTitle[idx].asc = 'asc'
          } else {
            this.remainTitle[idx].asc = 'desc'
          }
        } else {
          this.sortTh2 = idx
        }
        let data = this.pageData
        data.orderBy = key
        data.asc = this.remainTitle[idx].asc
        data.page = 1
        this.pageData = data
        this.getRemainData()
      },
      searchDetail () {
        if (!this.pageData.start_date || !this.pageData.end_date) {
          this.isToast = true
          this.toastMsg = '请选择日期'
          setTimeout(() => {
            this.isToast = false
          }, 1500)
          return
        }
        this.getDetailList()
      },
      changeDate (type, v) {
        switch (type) {
          case 'start':
            this.pageData.start_date = v
            break
          case 'end':
            this.pageData.end_date = v
            break
        }
      },
      exportVaca () {
        let month = ''
        let api
        switch (this.currTab) {
          case 'month':
            month = this.pageData.month
            api = '/' + Hr.monthVacationExport + '/?Authorization=Bearer ' + this.$cookie.get('token') + '&month=' + month
            break
          case 'year':
            api = `/${Hr.allVacationExport}/?Authorization=Bearer ${this.$cookie.get('token')}&year=${new Date().getFullYear()}`
            break
          case 'remain':
            api = `/${Hr.remainVacationExport}/?Authorization=Bearer ${this.$cookie.get('token')}`
            break
          case 'detail':
            if (!this.pageData.start_date || !this.pageData.end_date) {
              this.isToast = true
              this.toastMsg = '请选择日期'
              setTimeout(() => {
                this.isToast = false
              }, 1500)
              return
            } else {
              api = `/${Hr.detailVacationExport}/?Authorization=Bearer ${this.$cookie.get('token')}&start_date=${this.pageData.start_date}&end_date=${this.pageData.end_date}`
            }
            break
        }
        window.open(api)
      },
      changeSearchDate (date) {
        this.pageData.page = 1
        this.pageData.orderBy = 'createTime'
        this.pageData.asc = 'desc'
        this.pageData.month = date
        this.getMonthData()
      },
      changeTabs (name) {
        this.pageData.page = 1
        this.pageData.orderBy = 'createTime'
        this.pageData.asc = 'desc'
        switch (name) {
          case 'month':
            let m = new Date().getMonth() + 1
            if (m < 10) {
              m = '0' + m
            }
            this.pageData.month = new Date().getFullYear() + '' + m
            this.getMonthData()
            break
          case 'year':
            this.getList()
            break
          case 'remain':
            this.getRemainData()
            break
          case 'detail':
            // this.getDetailList()
            break
        }
      },
      getDetailList () {
        this.isLoading = true
        this.$http.post(Hr.detailVacationList, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.pageData.page === 1) {
              this.detailData = _data.retData.data || []
            } else {
              this.detailData = this.detailData.concat(_data.retData.data)
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageData.page--
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
      getMonthData () {
        this.isLoading = true
        this.$http.post(Hr.monthVacation, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            if (this.pageData.page === 1) {
              this.monthData = _data.retData.data || []
            } else {
              this.monthData = this.monthData.concat(_data.retData.data)
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageData.page--
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
      getRemainData () {
        this.isLoading = true
        this.$http.post(Hr.remainVacation, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            if (this.pageData.page === 1) {
              this.remainData = _data.retData.data || []
            } else {
              this.remainData = this.remainData.concat(_data.retData.data)
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageData.page--
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
      search (e) {
        if (e.keyCode === 13) {
          this.pageData.page = 1
          switch (this.currTab) {
            case 'year':
              this.getList()
              break
            case 'month':
              this.getMonthData()
              break
            case 'remain':
              this.getRemainData()
              break
            case 'detail':
              // this.getDetailList()
              break
          }
        }
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
      submitPwd () {
        this.$http.post(Hr.vacationPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
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
      getList () {
        this.isLoading = true
        this.$http.post(Hr.allVacation, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
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
              this.isToast = true
              this.toastMsg = '没有更多'
              this.pageData.page--
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
      beforeUpload (file) {
        this.uploadFileName = file.name
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          this.pageData.page++
          switch (this.currTab) {
            case 'year':
              this.getList()
              break
            case 'month':
              this.getMonthData()
              break
            case 'remain':
              this.getRemainData()
              break
            case 'detail':
              this.getDetailList()
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
      // this.getDetailList()
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
  .result-list {
    position: relative;
    min-height: 300px;
  }
</style>
