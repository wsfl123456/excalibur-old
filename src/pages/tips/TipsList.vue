<template>
  <div class="tips-list">
    <div class="list-tab" v-if="toolkit.length > 0">
      <Tabs :animated="false" type="card" v-model="productId">
        <TabPane :label="value.productName" v-for="(value, key) in toolkit" :key="value.productId" :name="String(value.productId)">
          <ul class="f-clearfix">
            <li v-for="(_item, _index) in value.child" :key="_index">
              <span :class="{active: toolkitId == _item.toolkitId}" @click="selectToolkit(_item.toolkitId)">{{_item.toolkitName}}</span>
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </div>
    <ul class="tips-list-ul" v-if="list.length > 0">
      <template v-for="item in list">
        <li :key="item.id">
          <router-link :to="`/study/tips/${item.id}/${productId}/${toolkitId}`">
            <div class="m-thumb">
              <img :src="item.picture" alt="">
              <!--<img src="http://www.baidu.com/img/bd_logo1.png" alt="">-->
            </div>
            <div class="m-desc">
              <h2>{{item.title}}</h2>
              <div class="info">
              <span>
                {{item.toolkitName}} - {{item.name}}
              </span>
                <p>
                <span>
                  {{item.creatorName}}
                </span>
                  <span>
                  {{item.lastModifyTime | filterYear}}
                </span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </template>
    </ul>
    <div v-else class="empty-tips">
      此工具包下没有Tips
    </div>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>

</template>

<script>
  import TopHeader from '../../components/Header'
  import {Sys} from '../../API/api'
  import Toast from '../../components/popup/Toast'
  import SideBox from '../../components/SideBox'
  import SysNotice from '../../components/SysNotice'
  import SubHeader from '../../components/SubHeader'

  export default {
    name: '',
    components: {SubHeader, SysNotice, SideBox, Toast, TopHeader},
    data () {
      return {
        isToast: false,
        toastMsg: '',
        canLoadMore: true,
        dom: null,
        chDom: null,
        productId: '',
        toolkitId: 0,
        pageConf: {
          page: 1,
          pageSize: 25,
          task_toolkit_id: this.$route.params.toolkitId || null,
          state : 1
        },
        list: [],
        toolkit: [],
        crumb: [
          {
            label: '成长计划'
          },
          {
            label: '学习与成长'
          },
          {
            label: '知识库'
          }
        ]
      }
    },
    watch: {
      '$route': 'getTipsList'
    },
    methods: {
      init () {
        sessionStorage.setItem('subMenu', 'tips/list/')
        this.$store.dispatch('setCurrSubMenu', 'tips/list/')
        this.$store.dispatch('setOpenedSub', ['tips'])
        sessionStorage.setItem('openedSub', '["tips"]')
        this.getTipsList()
        this.getAllToolkitNBrand()
      },

      selectToolkit (id) {
        if (this.toolkitId == id) {
          this.toolkitId = 0
        } else {
          this.toolkitId = id
        }
        this.pageConf.page = 1
        if (this.pageConf.task_toolkit_id == id) {
          this.pageConf.task_toolkit_id = null
          this.$router.push('/study/tips')
        } else {
          this.pageConf.task_toolkit_id = id
          this.$router.push('/study/tipslist/' + id)
        }
        this.getTipsList()
      },
      getAllToolkitNBrand () {
        this.$http.post(Sys.tipsBrands, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.toolkit = _data.retData.toolkit
            if (this.$route.params.toolkitId) {
              let productId
              this.toolkitId = this.$route.params.toolkitId
              this.pageConf.task_toolkit_id = this.$route.params.toolkitId
              this.toolkit.forEach(element => {
                element.child.forEach(ele => {
                  if (ele.toolkitId == this.$route.params.toolkitId)  {
                    productId = element.productId
                  }
                })
              })
              this.productId = String(productId)
            } else {
            this.productId = String(this.toolkit[0].productId)
          }
          }
        })
      },
      getTipsList () {
        this.isLoading = true
        this.$http.post(Sys.tipsList, this.qs.stringify(this.pageConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            if (this.pageConf.page === 1) {
              this.list = _data.retData.data
            } else {
              if (_data.retData.data.length > 0) {
                this.list = this.list.concat(_data.retData.data)
              } else {
                this.isToast = true
                this.toastMsg = '没有更多'
                this.toastState = null
                this.pageConf.page--
                if (this.pageConf.page <= 0) {
                  this.pageConf.page = 1
                }
              }
            }
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      },
      scrollHandler () {
        if (this.canLoadMore && this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight && !this.isLoading) {
          // this.page = this.page + 1
          this.pageConf.page++
          this.getTipsList()
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
      this.init()
    },
    beforeDestroy () {
      this.canLoadMore = false
      this.unbindLoadMore()
      // this.$store.dispatch('changeTaskDetailStatus', false)
    },
    mounted () {
      this.dom = document.getElementById('main-pages')
      this.chDom = document.getElementById('main-content')
      this.loadMore()
    }
  }
</script>
<style scoped lang="less">
  #tips-page {
    /*max-width: 1280px;*/
    margin: 0 auto;
    width: 100%;
  }
  .main-layout {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: unset;
  }

  .filter-box {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    padding-left: 108px;
    position: relative;
    margin-bottom: -1px;
    .ivu-radio-group {
      margin-bottom: -1px;
    }
    .ivu-radio-wrapper {
      font-size: 14px;
      color: #343a40;
      background-color: #f8f9fa;
      height: 40px;
      line-height: 40px;
      width: 108px;
      text-align: center;
      padding: 0;
      border: 0 none;
      border-right: 1px solid #e9ecef;
      transition: none;
      border-radius: 0;
      border-bottom: 1px solid #e9ecef;
      border-left: 1px solid #e9ecef;
      margin-left: -1px;
      &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
        color: #2d8ef8;
        background-color: #fff;

      }
      &:first-child {
        position: absolute;
        left: 0;
        top: 0;
        border-right: 0 none;

      }
    }
    .ivu-radio-wrapper-disabled {
      background-color: #fff;
    }
    .ivu-radio-wrapper-checked {
      background-color: #107cd9;
      box-shadow: 0 0 0;
      border-color: #107cd9;
      color: #fff;
    }
  }
  #main-pages {

  }
  .ivu-tooltip-popper[x-placement^=bottom] {
    .ivu-tooltip-content {
      .ivu-tooltip-arrow {
        border-bottom-color: #5ea9fa;

      }
      .ivu-tooltip-inner {
        background-color: #5ea9fa;
        font-size: 12px;
      }
    }
  }
  .empty-tips {
    text-align: center;
    margin: 32px 0;
  }
  .main-pages {
    background-color: #fff;
    overflow: auto;
    flex: 1;
    display: block;
    flex-direction: unset;
    width: 100%;
    .main-content {
      padding: 18px;
      position: relative;
    }
    .tips-list-ul {
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: start;
      flex-wrap: wrap;
      li {
        margin: 36px 20px 0 0;
        max-width: 360px;
        width: 31%;
        border: 1px solid #e9ecef;
        transition: transform .3s linear;
        &:hover {
          box-shadow: 0 2px 10px 0 #adb5bd;
          transform: translateY(-10px);
        }
        .m-thumb {
          /*width: 360px;*/
          width: 100%;
          height: 240px;
          overflow: hidden;
          position: relative;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            width: 100%;
          }
        }
        .m-desc {
          /*width: 360px;*/
          width: 100%;
          height: 120px;
          position: relative;
          background-color: #fff;
          padding: 20px 16px;
          .info {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            align-items: center;
            color: #adb5bd;
            font-weight: bold;
          }
        }
      }
    }


  }
</style>
<style lang="less">
  .tips-list {

    .list-tab {
      .ivu-tooltip {
        width: auto;
        margin-right: 34px;
      }
      .ivu-tabs {
        border-radius: 5px;

        .ivu-tabs-bar {
          margin-bottom: 0!important;
          .ivu-tabs-nav-container {
            height: auto;
            background-color: #f8f9fa;
          }
          .ivu-tabs-tab {
            margin-right: -1px;
            text-align: center;
            width: 108px;
            height: 49px;
            padding: 0;
            line-height: 49px;
            background-color: #f8f9fa;
            border: solid 1px #e9ecef;
            border-radius: 0;
            color: #343a40;
            font-size: 14px;
            &:first-child {
              border-top-left-radius: 5px;
            }
            &:nth-child(2){
              border-top-left-radius: 5px;
            }
            &-active {
              background-color: #dde8f6;
              border-bottom-color: #dde8f6;
            }
          }
        }
      }
      .ivu-tabs-tabpane {
        background-color: #dde8f6;
        padding: 7px;
        ul {
          li {
            float: left;
            color: #343a40;
            font-size: 14px;
            span {
              display: inline-block;
              cursor: pointer;
              font-family: Abel;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              letter-spacing: normal;
              padding: 7px 16px;
              border-radius: 4px;
              &.active {
                color: #2d8ef8;
              }
              &:hover {
                background-color: rgba(255, 255, 255, .4);
              }
            }
            i {
              color: #2d8ef8;
              line-height: 1;
              vertical-align: text-bottom;
              &:hover {

              }
            }
          }
        }
      }
    }
  }
</style>
