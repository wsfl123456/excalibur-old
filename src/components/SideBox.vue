<!--侧边菜单整体封装-->
<template>
  <div class="side-box f-clearfix" v-show="isSide">
    <!--<main-sider :nav-arr="navArr" @on-change="changeMenu"></main-sider>-->
    <!--<sub-sider :nav-arr="navArr" :primary-menu="primaryMenu"></sub-sider>-->
    <sub-sider :nav-arr="navArr" :primary-menu="primaryMenu" :type="menuType"></sub-sider>
    <!--<loading v-if="isLoading"></loading>-->
  </div>
</template>

<script>
  import SubSider from './SubSider'
  // import Loading from './popup/Loading'
  import {Index} from '../API/api'

  export default {
    components: {
      // Loading,
      SubSider
    },
    name: 'side-box',
    data () {
      return {
        navArr: []
      }
    },
    computed: {
      primaryMenu () {
        // console.log(this.$store.state.primaryMenu + 'hahaha')
        return this.$store.state.primaryMenu
      },
      isSide () {
        return this.$store.state.index.isSideMenu
      },
      menuType () {
        // console.log(this.$store.state.index.menuType + 'hahaha')
        return this.$store.state.index.menuType
      },
      isLoading () {
        return this.$store.state.index.subMenuLoading
      }
    },
    created () {
      this.getNav()
      // this.init()
    },
    methods: {
      getNav () {
        this.$http.post(Index.nav, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.navArr = _data.retData.menuInfo

            let idx = this.navArr.indexOf(14)
            let _idx = this.navArr.indexOf(12)
            this.navArr.splice(idx, 1)
            this.navArr.splice(_idx - 1, 0, 14)
            // this.$nextTick(() => {
            //   this.$refs.root_menu.updateOpened()
            //   this.$refs.root_menu.updateActiveName()
            // })
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        })
      },
      changeMenu (primaryMenu) {
        this.$store.dispatch('setPrimaryMenu', primaryMenu)
        // this.primaryMenu = primaryMenu
      }
    }
  }
</script>

<style scoped lang="less">
  .side-box {
    /*position: fixed;*/
    left: 0;
    top: 0;
    /*height: 100vh;*/
    height: 100%;
    /*padding-top: 48px;*/
    // display: flex;
    z-index: 9;
    position: relative;
    .sub-nav {
      // flex: 1;
      /*width: 236px;*/
      width: 164px;
    }
  }
</style>
