<template>
  <div class="new-container">
    <!-- header -->
    <div
      class="header"
      :class="{ 'header--scroll': +scrollTop > 0, 'header--index': isIndex }"
      :style="{ 'background-image': `url(${bannerMap[curRouteName]})` }"
    >
      <div>
        <div>
          <div class="header__left">
            <router-link to="/v2/home" class="logo"></router-link>
            <div class="menu">
              <template v-for="(i, k) in businessList">
                <div
                  v-if="navArr.indexOf(+i.name) >= 0"
                  :class="{ 'item--active': !!i.curIndex }"
                  :key="k"
                  @click="$router.push({ path: i.url })"
                >
                  {{ i.title }}
                </div>
              </template>
            </div>
          </div>
          <div class="header__right">
            <!-- 搜索 -->
            <i
              class="el-icon-search"
              @click="$router.push({ path: '/v2/home' })"
            ></i>
            <!-- 新增 -->
            <el-dropdown placement="bottom">
              <i class="el-icon-circle-plus"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in addListPermission"
                  :key="index"
                  @click.native="newAdd(item)"
                  style="white-space: nowrap"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 消息 -->
            <i
              class="el-icon-message-solid"
              @click="$router.push({ name: 'personal-userMsg' })"
            ></i>
            <!-- 头像 -->
            <div class="user" @click="$router.push({ path: '/profile/list' })">
              <img v-if="userInfo.headPic" :src="userInfo.headPic" />
              <div v-else>{{ userInfo.userName.slice(0, 2) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="second-menu" v-if="isIndex">
      <div>
        <div v-for="(i, k) in secondArr" :key="k">
          <h3 @click="$router.push({ name: i.children[0].urlName })">
            <img :src="i.icon" alt="" />
            {{ i.name }}
          </h3>
          <div
            @click="$router.push({ name: i2.urlName })"
            v-for="(i2, k2) in i.children"
            :key="k2"
            :class="{ 'is--current': i2.urlName === curRouteName }"
          >
            {{ i2.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- body -->
    <router-view class="body"></router-view>

    <!-- footer -->
    <div class="footer">
      <div class="area">
        <div class="top">
          <div class="info">
            <h2>关于我们</h2>
            <p>盖雅科技简介</p>
            <p>Excalibur项目介绍</p>
            <p>Excalibur功能介绍</p>
          </div>
          <div class="info">
            <h2>联系我们</h2>
            <p>电话：021-5280-9679</p>
            <p>邮箱：business@normcore.com</p>
            <p>地址：上海市长宁区天山路1900号9层</p>
          </div>
          <div class="code">
            <!-- <p>扫码添加客服微信</p>
            <div>
              <img src="../../assets/images/dri/qrcode.png" alt="" />
            </div> -->
          </div>
        </div>
        <div class="bom">
          Copyright @2019 EXCALIBUR.WORK. 沪ICP备15006750号-4
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import { Index, Brand, Project } from "@/API/api";

export default {
  name: "new-container",
  data() {
    return {
      scrollTop: 0,
      navArr: [],
      bannerMap: {
        driIndex: require("@/assets/images/dri/banner.jpg"),
        nccBookMap: require("@/assets/images/dri/banner.jpg"),
        nccBookStore: require("@/assets/images/dri/banner.jpg"),
        nccBookHouse: require("@/assets/images/dri/banner.jpg"),
        nccBookQuestion: require("@/assets/images/dri/banner.jpg"),
      },
      businessList: [
        { name: "69", icon: "", title: "首页", url: "/v2/home" },
        { name: "1", icon: "", title: "我的项目", url: "/projects/list" },
        { name: "70", icon: "", title: "我的任务", url: "/tasks/list" },
        { name: "72", icon: "", title: "资源管理", url: "/v2/resource/brand" },
        {
          name: "9",
          icon: "",
          title: "成长计划",
          url: "/new/nccBook/map",
          curIndex: true,
        },
        { name: "10", icon: "", title: "日程计划", url: "/schedule/manage" },
        { name: "78", icon: "", title: "仪表盘", url: "/dashborad/staff" },
      ],
      addList: [
        {
          name: "品牌",
          value: "/v2/resource/brand/create",
          openedSub: ["brands"],
          submenu: "brands/list/",
        },
        {
          name: "供应商",
          value: "/v2/resource/supplier/create",
          openedSub: ["suppliers"],
          submenu: "suppliers/list/",
        },
        {
          name: "项目",
          value: "/projects/add",
          openedSub: [],
          submenu: "",
        },
        {
          name: "任务",
          value: "/tasks/list",
          openedSub: [],
          submenu: "",
        },
        {
          name: "会议",
          value: "/schedule/add",
          openedSub: ["schedule"],
          submenu: "schedule/meeting",
        },
        {
          name: "请假",
          value: "/vacation/apply",
          openedSub: ["vacation"],
          submenu: "vacation/apply",
        },
        {
          name: "报销",
          value: "/myReimburse/add",
          openedSub: ["myReimburse"],
          submenu: "myReimburse/list/",
        },
        {
          name: "报修",
          value: "/myDevice/add",
          openedSub: ["myDevice"],
          submenu: "myDevice/list",
        },
      ],
      canAddBrand: false,
      canAddProject: false,
      secondArr: [
        {
          icon: require("@/assets/images/dri/menu-book.png"),
          name: "小黄书",
          children: [
            {
              name: "活点地图",
              urlName: "nccBookMap",
            },
            {
              name: "皇家兵器库",
              urlName: "nccBookStore",
            },
            {
              name: "黄金屋",
              urlName: "nccBookHouse",
            },
            {
              name: "问题悬赏榜",
              urlName: "nccBookQuestion",
            },
          ],
        },
        {
          icon: require("@/assets/images/dri/menu-dri.png"),
          name: "DRI",
          children: [
            {
              name: `${new Date().getFullYear()}DRI`,
              urlName: "driIndex",
            },
          ],
        },
        {
          icon: require("@/assets/images/dri/menu-org.png"),
          name: "组织结构",
          children: [
            {
              name: "事业部",
              urlName: "growth-growthOX",
            },
            {
              name: "学院",
              urlName: "growth-growthOX",
            },
          ],
        },
      ],
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("userInfo"));
    },
    addListPermission() {
      let newList = [];
      this.addList.forEach((e) => {
        if (!this.canAddBrand && e.name === "品牌") {
        } else if (!this.canAddProject && e.name === "项目") {
        } else newList.push(e);
      });
      return newList;
    },
    isIndex() {
      console.log(this.$route.name);
      return (
        this.$route.name === "driIndex" || this.$route.name === "nccBookMap" || this.$route.name === "nccBookStore" || this.$route.name === "nccBookHouse" || this.$route.name === "nccBookQuestion"  
      );
    },
    curRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    newAdd(item) {
      sessionStorage.setItem("subMenu", item.submenu);
      this.$store.dispatch("setCurrSubMenu", item.submenu);
      this.$store.dispatch("setOpenedSub", item.openedSub);
      sessionStorage.setItem("openedSub", item.openedSub);
      this.$router.push({
        path: item.value,
      });
    },
    getNav() {
      this.$http
        .post(Index.nav, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          let _data = res.data;
          if (_data.retCode === 0) {
            this.navArr = _data.retData.menuInfo;
            let idx = this.navArr.indexOf(14);
            let _idx = this.navArr.indexOf(12);
            this.navArr.splice(idx, 1);
            this.navArr.splice(_idx - 1, 0, 14);
          } else if (_data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    getCanAddBrrand() {
      this.$http
        .post(Brand.role, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          let _data = res.data;
          this.canAddBrand = _data.retData.add;
        });
    },
    getCanAddProject() {
      this.$http
        .post(Project.role, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          let _data = res.data;
          this.canAddProject = _data.retData.add;
        });
    },
    getScrollTop() {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
  },
  created() {
    this.getNav();
    this.getCanAddBrrand();
    this.getCanAddProject();

    // 获取页面当前滚动高度
    this.getScrollTop();
    document.addEventListener("scroll", this.getScrollTop);
  },
  destroyed() {
    document.addEventListener("scroll", this.getScrollTop);
  },
};
</script>

<style lang="less">
.new-container {
  font-family: PingFangSC-Regular, PingFang SC;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  box-sizing: border-box;
  font-weight: 400;

  .bold {
    font-weight: bold;
  }

  .dri__btn {
    width: 340px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
    &--default {
      background: #ffffff;
      border: 1px solid #0091ff;
      color: #0091ff;
    }
    &--primary {
      background: linear-gradient(180deg, #59c1fc 0%, #2d8ef8 100%);
      color: #fff;
    }
    &--disabled {
      background: #b2b2b2;
      color: #fff;
      cursor: not-allowed;
    }
  }

  .header {
    z-index: 1;
    width: 100%;
    min-height: 80px;
    > div {
      height: 80px;
      width: 100%;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      > div {
        margin: 0 auto;
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header__left {
          display: flex;
          align-items: center;
          .logo {
            width: 123px;
            height: 48px;
            margin-right: 30px;
            background-image: url("../assets/images/dri/logo.jpg");
            background-size: cover;
            background-repeat: no-repeat;
          }
          .menu {
            display: flex;
            align-items: center;
            div {
              color: #666666;
              font-size: 16px;
              margin: 0 23px 0 10px;
              line-height: 80px;
              height: 80px;
              cursor: pointer;
              &:hover {
                color: #2d8ef8;
              }
            }
            .item--active {
              color: #2d8ef8;
              font-weight: 500;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              &::before {
                content: "";
              }
              &::after {
                content: "";
                width: calc(100% + 20px);
                height: 2px;
                background: #2d8ef8;
              }
            }
          }
        }
        .header__right {
          display: flex;
          align-items: center;

          i {
            font-size: 24px;
            color: #0091ff;
            margin-right: 15px;
            &:hover {
              color: #2d8ef8;
              cursor: pointer;
            }
          }
          .el-dropdown {
            display: inline-flex;
            align-items: center;
          }
          .user {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            img {
              width: 30px;
              height: 30px;
              object-fit: cover;
            }
            div {
              width: 30px;
              height: 30px;
              background-color: #ccc;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: #fff;
            }
          }
        }
      }
    }

    &--index {
      height: 400px;
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center center;
      > div {
        > div {
          .header__left {
            .logo {
              background-image: url("../assets/images/dri/logo--white.jpg");
            }
            .menu {
              div {
                color: #c6ddf7;
                &:hover {
                  color: #fff;
                  font-weight: 500;
                }
              }
              .item--active {
                color: #fff;
              }
            }
          }
          .header__right {
            i {
              color: #c6ddf7;
              &:hover {
                color: #fff;
              }
            }
          }
        }
      }
    }
    &--scroll {
      > div {
        background-color: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);

        > div {
          .header__left {
            .logo {
              background-image: url("../assets/images/dri/logo.jpg");
            }
            .menu {
              div {
                color: #666666;
                &:hover {
                  color: #2d8ef8;
                }
              }
              .item--active {
                color: #2d8ef8;
                font-weight: 500;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 80px;
                line-height: unset;
                &::before {
                  content: "";
                }
                &::after {
                  content: "";
                  width: calc(100% + 20px);
                  height: 2px;
                  background: #2d8ef8;
                }
              }
            }
          }
          .header__right {
            display: flex;
            align-items: center;

            i {
              color: #0091ff;
              &:hover {
                color: #2d8ef8;
              }
            }
          }
        }
      }
    }
  }

  .second-menu {
    padding: 20px 0;
    width: 100%;
    color: #343a40;
    font-size: 14px;
    border-bottom: 10px solid #f2f3f7;
    > div {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      > div {
        display: inline-flex;
        align-items: center;
        padding: 0 40px;
        border-right: 1px solid #d9d9d9;
        &:last-child {
          border: none;
        }
        h3 {
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #000000;
          // line-height: 25px;
          display: inline-flex;
          align-items: center;
          cursor: pointer;

          img {
            width: 40px;
            height: 40px;
            margin-right: 6px;
          }
        }
        > div {
          margin-left: 24px;
          line-height: 20px;
          cursor: pointer;
          &:hover {
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #2d8ef8;
          }
        }
        .is--current {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #2d8ef8;
        }
      }
    }
  }

  .body {
    flex: 1;
    line-height: 1;
    background: #f2f3f7;
  }

  .footer {
    flex: none;
    // height: 200px;
    background: #0a2753;
    color: #fff;
    overflow: hidden;
    .area {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #4c4c4c solid;
        padding: 23px 0 20px;
        .info {
          h2 {
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 15px;
          }
          p {
            margin-top: 10px;
            font-size: 14px;
          }
        }
        .code {
          display: inline-flex;
          align-items: center;
          p {
            font-size: 12px;
            width: 12px;
            line-height: 15px;
          }
          div {
            width: 120px;
            height: 120px;
            margin-left: 10px;
            background: rgba(256, 256, 256, 0.5);
            border-radius: 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            img {
              width: 108px;
              height: 108px;
            }
          }
        }
      }
      .bom {
        height: 40px;
        font-size: 14px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    &__area {
      position: absolute;
      overflow: hidden;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      max-height: 640px;
      min-height: 300px;
      z-index: 1;
      background-color: #fff;
      border-radius: 8px;
      &__header {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #d9d9d9;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #343a40;
        i {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 17px;
          right: 22px;
          cursor: pointer;
          &:hover {
            color: #2d8ef8;
          }
        }
      }
      &__body {
        max-height: 590px;
        padding: 18px 24px;
        color: #666666;
        line-height: 20px;
        overflow: auto;
        p {
          text-indent: 2em;
          margin-bottom: 10px;
        }
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: center;
    width: 1200px;
    margin: 0 auto;
    .custom-btn {
      width: 340px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      border-radius: 5px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      cursor: pointer;
      margin-left: 20px;
      &:first-child {
        margin-left: 0;
      }
      &:hover {
        opacity: 0.6;
      }
      &--default {
        background: #ffffff;
        border: 1px solid #0091ff;
        color: #0091ff;
      }
      &--primary {
        background: linear-gradient(180deg, #59c1fc 0%, #2d8ef8 100%);
        color: #fff;
      }
      &--disabled {
        background: #b2b2b2;
        color: #fff;
        cursor: not-allowed;
      }
    }
  }

  .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    background-color: #0091ff;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    i {
      width: 16px;
      height: 16px;
      line-height: 16px;
      margin-right: 5px;
    }
  }

  .new-modal {
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__footer {
      text-align: center;
    }
    &-content {
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      padding: 20px;
      .label {
        line-height: 20px;
        margin-bottom: 6px;
        span {
          color: #e02020;
        }
      }
    }
  }
  .top20 {
    margin-top: 20px;
  }
}
</style>
