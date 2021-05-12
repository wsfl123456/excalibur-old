<template>
  <div>
    <div class="addBtn g-ta-r">
      <router-link to="./add" >报修申请</router-link>
    </div>
    <h2>现有设备列表</h2>
    <div class="result-list">
      <loading v-if="isLoading"></loading>
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
              <template v-if="_item.key === 'buyDate'">
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
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>

</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import {Support} from '../../API/api'
  import SubHeader from '../../components/SubHeader'

  export default {
    components: {
      SubHeader,
      Toast,
      Loading,
      BCrumb},
    name: 'my-device',
    data () {
      return {
        crumb: [
          {label: '所需支持'},
          {label: '我的设备'},
          {label: '设备清单'}
        ],
        isLoading: false,
        isToast: false,
        dom: null,
        chDom: null,
        canLoadMore: true,
        toastMsg: null,
        toastState: null,
        sortTh: null,
        list: [],
        pageData: {
          page: 1,
          pageSize: 25,
          orderBy: 'createTime',
          asc: 'desc'
        },
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
            title: '开始日期',
            key: 'buyDate',
            asc: 'desc'
          },
          {
            title: '详情描述',
            key: 'detail',
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
        this.getMy()
      },
      getMy () {
        this.isLoading = true
        this.$http.post(Support.myDevice, this.qs.stringify(this.pageData), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          this.isLoading = false
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
          this.getMy()
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
      this.getMy()
      sessionStorage.setItem('subMenu', 'myDevice/list')
      this.$store.dispatch('setCurrSubMenu', 'myDevice/list')
      // this.$store.dispatch('setOpenedSub', 'myDevice')
      // sessionStorage.setItem('openedSub', 'myDevice')
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
  .addBtn {
    margin-bottom: 16px;
    a {
      background-color: #2d8ef8;
      display: inline-block;
      padding: 0 20px;
      height: 32px;
      border-radius: 4px;
      text-align: center;
      line-height: 32px;
      text-decoration: none;
      color: #fff;
      font-size: 14px;
      &:hover {
        background-color: lighten(#2d8ef8, 10%);
      }
    }
  }
  .result-list {
    position: relative;
  }
</style>
