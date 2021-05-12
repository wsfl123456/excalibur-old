<template>
  <div class="layout">
    <Layout>
      <top-header></top-header>
      <Layout class="main-layout">
        <side-box></side-box>
        <Layout class="main-pages" id="main-pages" ref="mainPage">
          <Content class="main-content" id="main-content">
            <!--<sys-notice></sys-notice>-->
            <router-view :key="$route.fullPath"></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <!-- <notice-modal :info="noticeInfo" @on-got="noticeGot"></notice-modal> -->
  </div>
</template>

<script>
  import TopHeader from '../components/Header'
  import SideBox from '../components/SideBox'
  import SysNotice from '../components/SysNotice'
  import NoticeModal from '../components/popup/NoticeModal'
  import {ajax} from '../util/util'
  import {Index} from '../API/api'
  export default {
    name: 'index',
    components: {
      NoticeModal,
      SysNotice,
      SideBox,
      TopHeader},
    data () {
      return {
        noticeInfo: {
          title: '',
          content: '',
          id: null,
          showNotice: false,
          type: ''
        },
        pageConf: {
          page: 1,
          pageSize: 1,
          state: 1,
          orderBy: 'lastModifyTime'
        }
      }
    },
    // methods: {
    //   init () {
    //     this.getNotice()
    //   },
    //   getNotice () {
    //     ajax.post(Index.sysNoticeList, this.pageConf).then(res => {
    //       const _data = res.data[0]
    //       this.noticeInfo.title = _data.title
    //       this.noticeInfo.content = _data.content
    //       this.noticeInfo.id = _data.id
    //       this.noticeInfo.type = _data.typeId
    //       this.noticeInfo.showNotice = +localStorage.getItem('noticeGot') !== +_data.id
    //     })
    //   },
    //   noticeGot () {
    //     localStorage.setItem('noticeGot', this.noticeInfo.id)
    //     this.noticeInfo.showNotice = false
    //   }
    // },
    // created () {
    //   this.init()
    // }
  }
</script>

<style scoped lang="less">
  .layout{
    background: #f5f7f9;
    position: relative;
    height: 100vh;
  }
  .main-layout {
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: unset;
  }
  .main-pages {
    background-color: #fff;
    overflow: auto;
    flex: 1;
    display: block;
    flex-direction: unset;
    .main-content {
      padding: 24px;
      position: relative;
    }
  }



</style>
