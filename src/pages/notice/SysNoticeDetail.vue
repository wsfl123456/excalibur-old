<template>
  <div>
    <Layout>
      <top-header></top-header>
      <Layout class="main-layout">
        <side-box></side-box>

        <Layout id="tips-page" class="tips-list main-pages">
          <Content class="main-content" id="main-content">
            <div class="wrap">
              <loading v-if="isLoading"></loading>
              <div class="tips-wrap">
                <Row>
                  <i-col span="24">
                    <h1 class="tips-head">
                      {{detail.title}}
                    </h1>
                    <div class="tips-info">
                      <div class="tips-time">
                        <img :src="detail.creatorHeadPic" alt="">
                        <p>
                          {{detail.creatorName}}
                          <br>
                          <span>{{detail.createTime | filterYear}}</span>
                        </p>

                      </div>
                      <div class="tips-user">
                        {{detail.productName}} - {{detail.toolkitName}} - {{detail.name}}
                      </div>

                    </div>
                    <div class="tips-body g-mb-32">
                      <div v-html="detail.content"></div>
                    </div>
                    <div class="g-ta-r">
                      <router-link to="/sysNotice/list">查看更多公告 >></router-link>
                    </div>
                  </i-col>
                  <!--<i-col span="7">-->

                  <!--</i-col>-->
                </Row>
              </div>
            </div>
          </Content>


        </Layout>
      </Layout>
    </Layout>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
  import BCrumb from '../../components/BCrumb'
  import SysNoticeForm from '../../components/SysNoticeForm'
  import {Index} from '../../API/api'
  import Loading from '../../components/popup/Loading'
  import Toast from '../../components/popup/Toast'
  import TopHeader from '../../components/Header'
  import SideBox from '../../components/SideBox'

  export default {
    name: '',
    components: {SideBox, Toast, Loading, SysNoticeForm, BCrumb, TopHeader},
    data () {
      return {
        crumb: [
          {
            label: '系统公告',
            url: '/sysNotice/list'
          },
          {
            label: '公告详情'
          }
        ],
        isLoading: false,
        isToast: false,
        toastMsg: '',
        toastState: null,
        detail: {}
      }
    },
    watch: {
      '$route': 'getDetail'
    },
    methods: {
      init () {
        this.getDetail()
        sessionStorage.setItem('primaryMenu', 'profile')
        sessionStorage.setItem('subMenu', 'sysNotice/list/')
        this.$store.dispatch('setPrimaryMenu', 'profile')
      },

      getDetail () {
        this.isLoading = true
        this.$http.post(Index.sysNoticeDetail, this.qs.stringify({declareId: this.$route.params.id}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          this.isLoading = false
          const _data = res.data
          if (_data.retCode === 0) {
            this.detail = _data.retData
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        }).catch(() => {
          this.isLoading = false
          this.isToast = true
          this.toastMsg = '网络错误'
          this.toastState = null
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .main-layout {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: unset;
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
</style>
