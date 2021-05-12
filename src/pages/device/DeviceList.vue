<template>
  <div >
    <div class="g-mb-32">
      <Row>
        <i-col span="14">
          <i-input placeholder="请输设备号或者用户姓名按 回车 进行查询" v-model="pageData.research" @on-keydown="search">
            <span slot="prepend"><Icon type="ios-search-strong" size="20"></Icon></span>
          </i-input>
        </i-col>
        <i-col span="9" offset="1">
          <Upload class="btn" name="excelFile" :action="uploadApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess" :show-upload-list="false">
            <Button type="primary">批量导入</Button>
          </Upload>
          <Button type="primary" @click.native="exportExcel">批量导出</Button>
          <Button type="primary" @click.native.stop="add">单个新增</Button>
        </i-col>
      </Row>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list common-table">
        <thead>
        <tr>
          <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index"  >
            <div class="table-cell">
              {{item.title}}
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="list.length > 0" >
        <template v-for="(item, index) in list">
          <tr>
            <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
              <template v-if="_item.key === 'operate'">
                <div class="table-cell" >
                  <Button type="primary" @click.native="edit(item)" v-if="editNo !== item.id">编辑</Button>
                  <template v-else>
                    <Button type="primary" @click.native="save(item)"  >保存</Button>
                    <Button type="ghost" @click.native="cancel(item)" >取消</Button>
                  </template>

                </div>
              </template>
              <template v-else>
                <div class="table-cell device-edit">
                  <template v-if="editNo !== item.id">
                    <template v-if="_item.key === 'buyDate'">
                      <DatePicker class="display-date" type="date" placeholder="选择日期" disabled v-model="item['buyDate']"></DatePicker>

                    </template>
                    <template v-else-if="_item.key === 'assetType'">
                      {{assetsType[item[_item.key]]}}
                    </template>
                    <template v-else-if="_item.key === 'useState'">
                      {{deivceState[item[_item.key]]}}
                    </template>
                    <template v-else>
                      {{item[_item.key]}}
                    </template>
                  </template>
                  <template v-else>
                    <Select transfer v-model="item['assetType']" v-if="_item.key === 'typeName'">
                      <Option v-for="(assetItem, key) in assetsType" :value="assetItem.id" :key="key + assetItem">{{ assetItem.name }}</Option>
                    </Select>
                    <template v-else-if="_item.key === 'userCode'" >
                      {{item[_item.key]}}
                    </template>
                    <template v-else-if="_item.key === 'buyDate'" >
                      <DatePicker type="date" placeholder="选择日期" v-model="item['buyDate']"></DatePicker>
                    </template>
                    <template v-else-if="_item.key === 'department'" >
                      {{item[_item.key]}}
                    </template>
                    <template v-else-if="_item.key === 'useState'" >
                      <Select transfer v-model="item['useState']">
                        <Option v-for="(deviceItem, key) in deivceState" :value="+key" :key="key">{{ deviceItem }}</Option>
                      </Select>
                    </template>
                    <i-input v-model="item[_item.key]" type="textarea" v-else-if="_item.key === 'detail'" ></i-input>
                    <common-member content="选择所有者" v-else-if="_item.key === 'userName' && editNo === 'new_add'" @on-change="changeOwer($event, index)" exit-txt="变更所有者"></common-member>
                    <common-member content="选择所有者" v-else-if="_item.key === 'userName' && editNo !== 'new_add'" :users="[{name: item.userName, id: item.userId}]" @on-change="changeOwer($event, index)" exit-txt="变更所有者"></common-member>
                    <i-input v-model="item[_item.key]" v-else :readonly="_item.key === 'userCode' || _item.key === 'department'"></i-input>
                  </template>
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
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Device} from '../../API/api'
  import CommonMember from '../../components/CommonMember'
  import clickoutside from '../../directives/clickoutside'

  const host = location.href.split('/#/')[0]
  export default {
    components: {
      CommonMember,
      Loading,
      Toast,
      BCrumb},
    directives: {clickoutside},
    name: 'device-list',
    data () {
      return {
        crumb: [
          {label: '设备管理'},
          {label: '设备管理'},
          {label: '设备清单'}
        ],
        deivceState: {
          1: '使用中',
          2: '备用',
          3: '报废'
        },
        uploadApi: '/' + Device.import,
        assetsType: [],
        editNo: null,
        canLoadMore: true,
        searchValue: '',
        dom: null,
        chDom: null,
        isLoading: false,
        isToast: false,
        toastState: null,
        toastMsg: null,
        list: [],
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc',
          research: ''
        },
        oldOwner: {},
        sortTh: null,
        editBtnActive: true,
        uploadFileName: null,
        tableTitles: [
          {
            title: '资产编号',
            key: 'assetNo',
            asc: 'desc'
          },
          {
            title: '资产分类',
            key: 'typeName',
            asc: 'desc'
          },
          {
            title: '资产型号',
            key: 'model',
            asc: 'desc'
          }, {
            title: '资产序列号',
            key: 'serialNo',
            asc: 'desc'
          },
          {
            title: '采购日期',
            key: 'buyDate',
            asc: 'desc'
          },
          {
            title: '详情描述',
            key: 'detail',
            asc: 'desc'
          },
          {
            title: '所有者ID',
            key: 'userCode',
            asc: 'desc'
          },
          {
            title: '所有者姓名',
            key: 'userName',
            asc: 'desc'
          },
          {
            title: '所属部门',
            key: 'department',
            asc: 'desc'
          },
          {
            title: '事业部',
            key: 'teamName',
            asc: 'desc'
          },
          {
            title: '采购价格',
            key: 'price',
            asc: 'desc'
          },
          {
            title: '当前状态',
            key: 'useState',
            asc: 'desc'
          },
          {
            title: '操作',
            key: 'operate'
          }
        ]
      }
    },
    methods: {
      search (e) {
        if (e.keyCode === 13) {
          this.pageData.page = 1
          this.getList()
        }
      },
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
      add () {
        if (!this.editNo) {
          this.editBtnActive = false
          const tpl = {
            id: 'new_add',
            assetNo: '',
            assetType: null,
            model: null,
            serialNo: null,
            buyDate: null,
            detail: null,
            userCode: null,
            userName: null,
            department: null,
            price: null,
            useState: null
          }
          this.list.unshift(tpl)
          this.editNo = tpl.id
        }
      },
      changeOwer (data, idx) {
        if (!this._.isEmpty(data)) {
          this.list[idx].userCode = data.userCode
          this.list[idx].userId = data.id
          this.list[idx].userName = data.userName
          this.list[idx].department = data.departmentName
        }
      },
      cancel (item) {
        item.userName = this.oldOwner.userName
        item.userId = this.oldOwner.userId
        item.userCode = this.oldOwner.userCode
        item.department = this.oldOwner.department
        if (this.editNo === 'new_add') {
          this.list.shift()
        }
        this.editNo = null
        this.editBtnActive = true
      },
      save (item) {
        let saveApi = Device.edit
        if (
          !item.assetNo || item.assetNo === '' ||
          !item.assetType || item.assetType === '' ||
          !item.buyDate ||
          !item.detail || !item.price ||
          !item.model || !item.serialNo ||
          !item.useState ||
          !item.userId
        ) {
          this.isToast = true
          this.toastMsg = '请填写所有内容'
          setTimeout(() => {
            this.isToast = false
            this.toastMsg = null
          }, 1500)
          return
        }
        if (this.editNo === 'new_add') {
          saveApi = Device.add
          delete item.id
        }

        this.editNo = null
        this.$http.post(saveApi, this.qs.stringify(item), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastMsg = '保存成功'
            this.toastState = 'success'
            this.editBtnActive = true
            this.pageData.page = 1
            this.getList()
          } else {
            this.isToast = true
            if (_data.retMsg === '') {
              for (let key in _data.retData) {
                let vKey = _data.retData[key]
                this.toastMsg = vKey
              }
            } else {
              this.toastMsg = _data.retMsg
            }
            this.toastState = null
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
      exportExcel () {
        window.open('/' + Device.export + '/?Authorization=Bearer ' + this.$cookie.get('token'))
        // this.$http.post(Device.export, {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {})
      },
      edit (item) {
        if (this.editBtnActive) {
          this.editBtnActive = false
          if (this.editNo === 'new_add') {
            this.list.shift()
          }
          this.editNo = item.id
          if (this.editNo !== 'new_add') {
            this.oldOwner = {
              userName: item.userName,
              userId: item.userId,
              userCode: item.userCode,
              department: item.department
            }
          }
        }
      },
      beforeUpload (file) {
        this.uploadFileName = file.name
      },
      getAssetsType () {
        this.$http.post(Device.editIndex, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.assetsType = _data.retData.type
          }
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
        this.$http.post(Device.all, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (this.pageData.page === 1) {
              this.list = _data.retData.data || []
            } else {
              this.list = this.list.concat(_data.retData.data || [])
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
      this.getAssetsType()

      sessionStorage.setItem('subMenu', 'device/list')
      this.$store.dispatch('setCurrSubMenu', 'device/list')
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
  .common-table {
    .table-cell {
      overflow: visible;
    }
  }

  .btn {
    display: inline-block;
  }
  .result-list {
    position: relative;
  }
  .device-edit {
    .ivu-date-picker-editor {
      i {
        display: none!important;
      }
    }
  }
  .display-date {
    border: 0 none;
    background-color: transparent;
    input {
      border: 0 none;
      background-color: transparent;
    }
  }

</style>
