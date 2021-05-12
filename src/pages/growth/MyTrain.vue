<template>
  <div>
    <div class="g-ta-c g-mb-16" v-if="bannerImg">
      <img :src="bannerImg" alt="">
    </div>
    <div class="result-list">
      <table class="main-list">
        <thead>
        <tr>
          <th :class="{active: sortTh === index}" v-for="(item, index) in tableTitles" :key="index" @click="sortData(index)">
            <div class="table-cell">
              {{item.title}} <i class="iconfont" :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"></i>
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-if="trainList.length > 0">
          <template v-for="(item, index) in trainList">
            <tr >
              <td v-for="(_item, _index) in tableTitles" :key="'td-' + index + '-' + _index">
                <template v-if="_item.key === 'state'">
                  <div class="table-cell">
                    {{item.stateName}}
                  </div>
                </template>
                <template v-else-if="_item.key === 'startTime'">
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
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'
  import {Growth} from '../../API/api'
  export default {
    components: {
      Loading,
      Toast,
      BCrumb},
    name: 'my-train',
    data () {
      return {
        crumb: [
          {label: '成长计划'},
          {label: '学习与成长'},
          {label: '我参加的培训'}
        ],
        sortTh: null,
        isToast: false,
        toastMsg: null,
        isLoading: false,
        bannerImg: null,
        trainList: [],
        searchValue: '',
        isEmpty: false,
        tableTitles: [
          {
            title: '培训名称',
            key: 'name',
            asc: 'desc'
          },
          {
            title: '培训时间',
            key: 'startTime',
            asc: 'desc'
          },
          {
            title: '主讲人',
            key: 'authorName',
            asc: 'desc'
          }, {
            title: '培训简介',
            key: 'desc',
            asc: 'desc'
          },
          {
            title: '培训地点',
            key: 'address',
            asc: 'desc'
          },
          {
            title: '状态',
            key: 'state',
            asc: 'desc'
          }
        ],
        canLoadMore: true,
        dom: null,
        chDom: null,
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc'
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
        let data = {
          page: 1,
          page_size: this.page_size,
          orderBy: key,
          asc: this.tableTitles[idx].asc
        }
        this.getTrain(data)
      },
      getTrain (obj) {
        let data = {
          page: this.page,
          page_size: this.page_size,
          orderBy: this.orderBy,
          asc: this.asc
        }

        let _data = obj ? this._.merge(data, obj) : data
        this.isLoading = true
        this.$http.post(Growth.trainList, this.qs.stringify(_data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          this.isLoading = false
          let _data = res.data
          if (_data.retCode === 0) {
            if (_data.retData.data.length > 0) {
              this.trainList = this.trainList.concat(_data.retData.data)
            } else {
              this.isToast = true
              this.toastMsg = '没有更多'
              this.page--
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
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading && !this.taskDetailStatus) {
          // this.page = this.page + 1
          this.page++
          this.getTrain({page: this.page})
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
      this.canLoadMore = true

      const initList = {
        page: 1,
        page_size: 25,
        orderBy: 'createTime',
        asc: 'desc'
      }
      this.getTrain(initList)

      this.$http.post(Growth.banner, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
        let _data = res.data
        if (_data.retCode === 0) {
          this.bannerImg = _data.retData.url
        }
      })
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
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #e9ecef;
  }
  th {
    text-align: left;
    background-color: #fff;
    font-size: 12px;
    color: #868e96;
    font-weight: normal;
    border: 1px solid #e9ecef;
    height: 32px;
    &:hover, &.active {
      background-color: #f8f9fa;
    }
    i {
      color: #2d8ef8;
    }
  }
  td {
    font-size: 14px;
    color: #343a40;
    height: 48px;
    border-bottom: 1px solid #e9ecef;
    &.empty-data {
      text-align: center;
    }
  }
  tbody {
    tr {
      &:hover {
        td {
          background-color: #f8f9fa;
        }
      }
    }
  }
  .table-cell {
    display: inline-block;
    vertical-align: middle;
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: normal;
    box-sizing: border-box;
    text-align: left;
  }
</style>
