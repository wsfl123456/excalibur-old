<template>
  <div class="top-menu">
    <Menu
      id="root_menu"
      ref="root_menu"
      width="100%"
      @on-select="selectMenu"
      :active-name="currMenu"
    >
      <template v-for="(item, index) in businessList" v-if="navArr.indexOf(+item.name) >= 0">
        <MenuItem :name="item.name">
          <span>{{item.title}}</span>
        </MenuItem>
      </template>
      <!--<MenuGroup class="top-right-menu">-->
      <!--<template v-for="(item, index) in adminList" v-if="navArr.indexOf(+item.name) >= 0">-->
      <!--<MenuItem :name="item.name">-->
      <!--<span>{{item.title}}</span>-->
      <!--</MenuItem>-->
      <!--</template>-->
      <!--</MenuGroup>-->
    </Menu>
  </div>
</template>

<script>
import { Index } from "../API/api";
import { setTimeout } from "timers";
export default {
  name: "TopMenu",
  data() {
    return {
      navArr: [],
      domClass: {
        business: "top-left-menu",
        admin: "top-right-menu"
      },
      menuObj: {
        69: { name: "69", icon: "", title: "首页" },
        1: { name: "1", icon: "Project", title: "我的项目" },
        70: { name: "70", icon: "Task", title: "我的任务" },
        4: { name: "4", icon: "Brand", title: "品牌管理" },
        8: { name: "8", icon: "Suppliers", title: "供应商管理" },
        7: { name: "7", icon: "finance", title: "财务管理", size: 14 },
        9: { name: "9", icon: "Growth", title: "成长计划" },
        10: { name: "10", icon: "schedule", title: "日程计划" },
        14: { name: "14", icon: "support", title: "所需支持" },
        12: { name: "12", icon: "personnel", title: "人事管理", size: 14 },
        13: { name: "13", icon: "device", title: "设备管理" },
        15: { name: "15", icon: "settings", title: "系统设置" }
      },
      businessList: [
        { name: "69", icon: "", title: "首页" },
        { name: "1", icon: "", title: "我的项目" },
        { name: "70", icon: "", title: "我的任务" },
        { name: "72", icon: "", title: "资源管理" },
        { name: "9", icon: "", title: "成长计划" },
        { name: "10", icon: "", title: "日程计划" },
        { name: "78", icon: "", title: "仪表盘" },
        // { name: "7", icon: "", title: "财务管理" },
        // {name: '4', icon: '', title: '品牌管理'},
        // {name: '8', icon: '', title: '供应商管理'},
        // {name: '7', icon: '', title: '财务管理'}
      ],
      adminList: [
        { name: "14", icon: "", title: "所需支持" },
        { name: "12", icon: "", title: "人事管理" },
        { name: "13", icon: "", title: "设备管理" },
        { name: "15", icon: "", title: "系统设置" }
      ]
    };
  },
  created() {
    this.getNav();
  },
  computed: {
    projectParams() {
      return this.$store.state.projects.filter;
    },
    currMenu() {
      return this.$store.state.index.currMenu;
    },
    selectedCustomer() {
      return this.$store.state.tasks.currCustomer;
    },
    canJump() {
      return this.$store.state.index.canJump;
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.root_menu.updateOpened();
      this.$refs.root_menu.updateActiveName();
    });
  },
  methods: {
    selectMenu(arg) {
      this.switchMenu(arg);
    },
    switchMenu(data) {
      // console.log(data)
      this.$store.dispatch("setCurrMenu", data);
      switch (+data) {
        case 69:
          this.$router.push("/v2/home");
          break;
        case 70:
          this.$router.push("/tasks/list");
          break;
        case 72:
          this.$router.push("/v2/resource/brand");
          // this.$router.push("/brands/list");
          break;
        case 1:
          this.$router.push("/projects/list");
          break;
        case 4:
          this.$router.push("/v2/resource/brand");
          break;
        case 8:
          this.$router.push("/v2/resource/supplier");
          break;
        case 9:
          this.$router.push("/new/nccBook/map");
          break;
        case 10:
          this.$router.push("/schedule/manage");
          break;
        case 14:
          this.$router.push("/myDevice/list");
          break;
        case 12:
          this.$router.push("/employee/basic");
          break;
        case 13:
          this.$router.push("/device/list");
          break;
        case 15:
          this.$router.push("/userManage/list");
          break;
        case 7:
          this.$router.push("/contract/clientContract");
          break;
        case 78:

          var vm = this;
          setTimeout(function() {
            vm.$router.push({
              path: "/dashborad/staff"
            });
          });
          break;
      }
    },
    getNav() {
      this.$http
        .post(Index.nav, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode === 0) {
            this.navArr = _data.retData.menuInfo;
            let idx = this.navArr.indexOf(14);
            let _idx = this.navArr.indexOf(12);
            this.navArr.splice(idx, 1);
            this.navArr.splice(_idx - 1, 0, 14);
            // this.$nextTick(() => {
            //   this.$refs.root_menu.updateOpened()
            //   this.$refs.root_menu.updateActiveName()
            // })
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.top-left-menu {
  margin-right: auto;
  .ivu-menu {
    justify-content: flex-start;
  }
}
.top-right-menu {
  margin-left: auto;
  .ivu-menu {
    justify-content: flex-end;
  }
}
.ivu-menu-item-group {
  max-width: 45%;
  height: 100%;
  flex: 1;
  line-height: inherit;
}
.top-menu {
  border: 0 none;
  flex: 1;
  height: 100%;
  .ivu-menu {
    display: flex;
    height: 100%;
    align-items: center;
    border: 0 none;
    background-color: transparent;
    &::after {
      background-color: transparent;
      width: 0;
    }
  }
  .ivu-menu-item {
    /*padding: 0 24px;*/
    padding: 0;
    height: 100%;
    border: 0 none;
    float: none;
    text-align: center;
    /*flex: 1;*/
    color: #fff;
    width: 76px;
    transition: all 0.3s 0s linear;
    font-size: 14px;
    &:hover {
      border: 0 none;
      color: #107cd9;
      background-color: #fff;
    }
  }
  .ivu-menu-item-active {
    border: 0 none !important;
    background-color: #fff;
    color: #2d8ef8;
    span {
      color: #2d8ef8;
    }
  }
}
</style>
