<template>
  <div>
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输入姓名、电话、邮箱按回车进行查询" v-model="searchValue" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
        <i-col span="9" offset="1">
          <Upload class="upload-btn" name="excelFile" :action="uploadApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess" :show-upload-list="false">
            <Button type="primary">批量导入</Button>
          </Upload>
          <Button type="primary" @click.native="exportContract">批量导出</Button>
          <Button type="primary" @click.native="toAdd">单个新增</Button>
        </i-col>
      </Row>

    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <div class="pwd-ipt" v-if="needPwd">
        <div>
          <i-input class="ipt" type="password" placeholder="请输入6位查询密码" v-model="pwd"></i-input>
          <div>
            <Button type="primary" class="submit-btn" size="large" @click="submitPwd">提交</Button>
          </div>
        </div>
      </div>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" @click="sortData(index)" >
            <div class="table-cell">
              {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="infoList.length > 0">
        <template v-for="(item, index) in infoList">
          <tr @click="toggleRow(item.id, index)">
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
          <tr v-if="detailId === item.id">
            <td :colspan="tableTitles.length">
              <employee-detail :form-value="detail" :is-loading="detailLoading" type="contract" @on-save="getDetail"></employee-detail>
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
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Hr} from '../../API/api'
  import BCrumb from '../../components/BCrumb'
  import EmployeeDetail from '../../components/EmployeeDetail'
  import SubHeader from '../../components/SubHeader'
  var host = location.href.split('/#/')[0]

  export default {
    components: {
      SubHeader,
      EmployeeDetail,
      BCrumb,
      Loading,
      Toast},
    name: 'employee-contract',
    data () {
      return {
        crumb: [
          {label: '人事管理'},
          {label: '员工管理'},
          {label: '合同信息'}
        ],
        needPwd: false,
        pwed: '',
        uploadFileName: null,
        uploadApi: '/' + Hr.contractImport,
        isLoading: false,
        isToast: false,
        toastMsg: null,
        tableTitles: [
          {
            title: '员工编号',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '员工姓名',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '部门',
            key: 'departmentId',
            asc: 'desc'
          },
          {
            title: '职位',
            key: 'positionId',
            asc: 'desc'
          },
          {
            title: '合同ID',
            key: 'contractId',
            asc: 'desc'
          },
          {
            title: '签约时间',
            key: 'contractTime',
            asc: 'desc'
          }
        ],
        canLoadMore: true,
        dom: null,
        chDom: null,
        pageData: {
          page: 1,
          pageSize: 25,
          research: null
        },
        searchValue: '',
        detail: null,
        detailIdx: null,
        detailId: null,
        sortTh: null,
        detailLoading: false,
        isDetailToast: false,
        detailToastMsg: '',
        detailToastState: '',
        infoList: []
      }
    },
    methods: {
      sortData (idx) {
        let key = this.tableTitles[idx].key
        if (key === 'statusString') {
          key = 'status'
        } else if (key === 'rankName') {
          key = 'rankId'
        } else if (key === 'positionName') {
          key = 'positionId'
        } else if (key === 'name') {
          key = 'englishName'
        }
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
      toAdd () {
        this.$router.push('./addcontract')
      },
      beforeUpload (file) {
        this.uploadFileName = file.name
      },
      search (e) {
        if (e.keyCode === 13) {
          this.pageData.page = 1
          this.pageData.research = this.searchValue
          this.getList()
        }
      },
      exportContract () {
        window.open('/' + Hr.contractExport + '/?Authorization=Bearer ' + this.$cookie.get('token'))
      },
      getDetail () {
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
      toggleRow (data, idx) {
        if (this.detailId === data) {
          this.detailId = null
        } else {
          this.detailId = data
          this.getDetail()
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
        this.$http.post(Hr.contractPwd, this.qs.stringify({password: this.pwd}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
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
      getList (obj) {
        this.isLoading = true
        let _data = obj ? this._.merge(this.pageData, obj) : this.pageData
        this.$http.post(Hr.contractList, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            if (this._.isEmpty(_data.retData)) {
              this.needPwd = true
            }

            if (this.pageData.page === 1) {
              this.infoList = _data.retData.data || []
            } else {
              this.infoList = this.infoList.concat(_data.retData.data)
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
          this.getList({page: this.pageData.page})
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
