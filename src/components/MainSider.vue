<!--一级导航-->
<template>
  <Sider class="main-nav" v-model="isCollapse" width="144" collapsible :collapsed-width="48" hide-trigger ref="mainNav">
    <!--<p style="color: #fff;">{{currMenu}} {{typeof currMenu}}</p>-->
    <div class="side-bar-toggle" @click="toggleMainNav"><Icon type="navicon" :class="rotateIcon"></Icon></div>
    <Menu ref="root_menu" :class="mainMenuClass" theme="dark" width="100%" @on-select="selectMenu" :active-name="currMenu">
      <template v-for="(item, index) in navArr" v-if="menuObj[item]">
        <MenuItem :name="menuObj[item].name">
          <Icon type="person-stalker" v-if="!menuObj[item].icon"></Icon>
          <img :src="deviceIcon" v-else-if="menuObj[item].icon === 'device'" alt="" style="vertical-align: middle;">
          <e-icon class="main-menu-icon" :icon="menuObj[item].icon" v-else :size="menuObj[item].size || 22"></e-icon>
          <span>{{menuObj[item].title}}</span>
        </MenuItem>
      </template>
    </Menu>
  </Sider>
</template>

<script>
  import {Task, Index} from '../API/api'
  import EIcon from './EIcon'
  import deviceIcon from '../assets/images/device.png'
  export default {
    components: {EIcon},
    name: 'main-sider',
    props: {
      navArr: {
        type: Array
      }
    },
    data () {
      return {
        deviceIcon,
        isCollapse: true,
        // currMenu: sessionStorage.getItem('primaryMenu') || '1',
        menuObj: {
          69: {name: '69', icon: '', title: '首页'},
          1: {name: '1', icon: 'Project', title: '我的项目'},
          4: {name: '4', icon: 'Brand', title: '品牌管理'},
          8: {name: '8', icon: 'Suppliers', title: '供应商管理'},
          7: {name: '7', icon: 'finance', title: '财务管理', size: 14},
          9: {name: '9', icon: 'Growth', title: '成长计划'},
          10: {name: '10', icon: 'schedule', title: '日程计划'},
          14: {name: '14', icon: 'support', title: '所需支持'},
          12: {name: '12', icon: 'personnel', title: '人事管理', size: 14},
          13: {name: '13', icon: 'device', title: '设备管理'},
          15: {name: '15', icon: 'settings', title: '系统设置'}
        },
        menuList: [
          {name: '69', icon: '', title: '首页'},
          {name: '1', icon: '', title: '我的项目'},
          {name: '4', icon: '', title: '品牌管理'},
          {name: '8', icon: '', title: '供应商管理'},
          {name: '7', icon: '', title: '财务管理'},
          {name: '9', icon: '', title: '成长计划'},
          {name: '10', icon: '', title: '日程计划'},
          {name: '14', icon: '', title: '所需支持'},
          {name: '12', icon: '', title: '人事管理'},
          {name: '13', icon: '', title: '设备管理'}
        ]
        // navArr: []
      }
    },
    computed: {
      currMenu () {
        return this.$store.state.primaryMenu || '1'
      },
      rotateIcon () {
        return ['menu-icon', this.isCollapse ? '' : 'rotate-icon']
      },
      mainMenuClass () {
        return ['side-main-menu', this.isCollapse ? 'collapsed-menu' : '']
      }
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.root_menu.updateOpened()
        this.$refs.root_menu.updateActiveName()
      })
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.root_menu.updateOpened()
        this.$refs.root_menu.updateActiveName()
      })
    },
    activated () {
    },
    methods: {
      getNav () {
        this.$http.post(Index.nav, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.navArr = _data.retData.menuInfo
            this.$nextTick(() => {
              this.$refs.root_menu.updateOpened()
              this.$refs.root_menu.updateActiveName()
            })
          } else if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
        })
      },
      selectMenu (arg) {
        switch (+arg) {
          case 8:
            this.$router.push('/v2/resource/supplier')
            break
          case 4:
            this.$router.push('/v2/resource/brand')
            break
          case 1:
            this.$router.push('/home')
            break
          case 9:
            this.$router.push('/OX/list')
            sessionStorage.setItem('subMenu', 'OX/list/')
            this.$store.dispatch('setCurrSubMenu', 'OX/list/')
            this.$store.dispatch('setOpenedSub', 'OX')
            sessionStorage.setItem('openedSub', 'OX')
            break
          case 10:
            this.$router.push('/schedule/manage')
            sessionStorage.setItem('subMenu', 'schedule/manage')
            this.$store.dispatch('setCurrSubMenu', 'schedule/manage')
            this.$store.dispatch('setOpenedSub', 'schedule')
            sessionStorage.setItem('openedSub', 'schedule')
            break
          case 14:
            this.$router.push('/myDevice/list')
            sessionStorage.setItem('subMenu', 'myDevice/list')
            this.$store.dispatch('setCurrSubMenu', 'myDevice/list')
            this.$store.dispatch('setOpenedSub', 'myDevice')
            sessionStorage.setItem('openedSub', 'myDevice')
            break
        }
        if (arg === this.currMenu) {
          return
        }

        this.$store.dispatch('setPrimaryMenu', arg)
        // this.currMenu = arg
        sessionStorage.setItem('primaryMenu', arg)
        switch (arg) {
          case '1':
            this.$http.post(Task.index, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
              const _data = res.data
              if (_data.retCode === 0) {
                const _data_ = {
                  submenus: _data.retData.projectInfo,
                  toolkit: _data.retData.productInfo,
                  menuKey: 1
                }
                this.$store.dispatch('taskIndex', _data_)
              } else if (_data.retCode === 100014) {
                this.$cookie.delete('token')

                this.$router.push('/')
              } else if (_data.retCode === 100023) {

              }
            })
            break
        }
        this.$emit('on-change', arg)
      },
      toggleMainNav () {
        this.$refs.mainNav.toggleCollapse()
      }
    },
    created () {
      // this.getNav()
    }
  }
</script>

<style scoped lang="less">
  .main-nav {
    background-color: #495057;
    overflow: hidden;
    .main-menu-icon {
      margin-right: 0;
    }
    .side-bar-toggle {
      background-color: #2d8ef8;
      height: 48px;
      line-height: 48px;
      font-size: 25px;
      cursor: pointer;
      text-align: center;
      color: #fff;
    }
    .side-main-menu {
      background-color: #495057;
      overflow: auto;
      position: absolute;
      top: 48px;
      bottom: 0;
      width: 100%;
      &.collapsed-menu {
        .ivu-menu-item {
          i {
            margin-right: 0;
          }
          span {
            margin: 0;
            max-width: 0;
            transition: max-width .2s ease;
          }
        }
      }
      .ivu-menu-item {
        color: #fff;
        padding: 0 13px;
        height: 48px;
        line-height: 48px;
        text-align: left;
        i {
        }
        span {
          margin-left: 16px;
          font-size: 12px;
          display: inline-block;
          vertical-align: top;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          transition: max-width .2s ease .2s;
          max-width: 70px;
        }
        &:hover {
          background-color: #66707a;
        }
        &:active {
          background-color: #343a40;
        }
        &.ivu-menu-item-active {
          border-right: 0 none;
          background-color: #2d8ef8;
        }
        .ivu-icon {
          margin-right: 0;
          font-size: 27px;
        }
      }
    }
  }
  .menu-icon {
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(90deg);
  }

</style>
