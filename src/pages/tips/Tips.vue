<template>
  <div class="tips-list">
    <div class="list-tab" v-if="toolkit.length > 0">
      <Tabs :animated="false" type="card" :value="Number($route.params.productId)">
        <TabPane :label="value.productName" v-for="(value, key) in toolkit" :key="value.productId" :name="value.productId">
          <ul class="f-clearfix">
            <li v-for="(_item, _index) in value.child" :key="_index">
              <span :class="{active:Number($route.params.toolkitId)  === _item.toolkitId}" @click="selectToolkit(_item.toolkitId)">{{_item.toolkitName}}</span>
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </div>
    <div class="wrap">
      <loading v-if="isLoading"></loading>
      <div class="tips-wrap">
        <Row>
          <i-col span="24">
            <h1 class="tips-head">
              {{tips.title}}
            </h1>
            <div class="tips-info">
              <div class="tips-time">
                <img :src="tips.creatorHeadPic" alt="">
                <p>
                  {{tips.creatorName}}
                  <br>
                  <span>{{tips.createTime}}</span>
                </p>
              </div>
              <div class="tips-user" >
                {{tips.productName}} - {{tips.toolkitName}} - {{tips.name}}
              </div>

            </div>
            <div class="tips-body g-mb-32">
              <div v-html="tips.content"></div>
            </div>
            <div class="g-ta-r">
              <router-link to="/study/tips">查看更多Tips >></router-link>
            </div>
          </i-col>
          <!--<i-col span="7">-->

          <!--</i-col>-->
        </Row>
      </div>
    </div>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>

</template>

<script>
  import TopHeader from '../../components/Header'
  import {Sys} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import SideBox from '../../components/SideBox'
  import SysNotice from '../../components/SysNotice'

  export default {
    name: '',
    components: {SysNotice, SideBox, Toast, Loading, TopHeader},
    data () {
      return {
        isToast: false,
        toastMsg: '',
        isLoading: false,
        tips: {},
        toolkit: []
      }
    },
    methods: {
      getTips () {
        this.isLoading = true
        this.$http.post(Sys.tipDetail, this.qs.stringify({tipsId: this.$route.params.tipsId}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.tips = _data.retData
          } else {
            this.isToast = true
            this.toastState = null
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      },
      selectToolkit (id) {
        this.$router.push('/study/tipslist/' + id)
      },
      getAllToolkitNBrand () {
        this.$http.post(Sys.tipsBrands, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.toolkit = _data.retData.toolkit
          }
        })
      }
    },
    created () {
      this.getTips()
      this.getAllToolkitNBrand()
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
  .tips-list {
    /*max-width: 1280px;*/
    margin: 0 auto;
  }
  .tips-wrap {
    /*max-width: 1240px;*/
    margin: 0 auto;
    padding: 32px 0;
  }
  .ivu-layout {
    /*background-color: #fff;*/
  }
  .tips-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    margin-bottom: 32px;
    max-width: 400px;
  }
  .tips-user {

  }
  .tips-time {
    font-size: 14px;
    color: #343a40;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 100%;
      margin-right: 10px;
    }
    p {
      span {
        color: #adb5bd;
      }
    }
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
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        /*margin: 36px 40px 0;*/
        margin: 36px 0 0;
        /*width: 360px;*/
        /*height: 360px;*/
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
