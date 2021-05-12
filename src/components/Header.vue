<!--头部组建-->
<template>
  <Header class="oa-header">
    <div class="top-nav">
      <div class="layout-logo">
        <router-link to="/home" class="layout-logo-img"></router-link>
      </div>
      <div class="menu-plate">
        <top-menu></top-menu>
      </div>
      <div class="search-plate">
        <search-plate></search-plate>
      </div>
      <Menu
        mode="horizontal"
        theme="light"
        class="top-nav"
        @on-select="selectTopNav"
      >
        <div class="layout-nav f-clearfix">
          <Submenu name="newAdd">
            <template slot="title">
              <Icon type="plus-circled"></Icon>
            </template>
            <MenuItem
              v-for="(item, index) in addListPermission"
              :key="index"
              :name="item.name"
              @click.native="newAdd(item)"
              style="white-space: nowrap"
              >{{ item.name }}</MenuItem
            >
          </Submenu>
          <MenuItem name="2">
            <Icon type="ios-help"></Icon>
          </MenuItem>
          <MenuItem name="notice">
            <Tooltip :disabled="noticeCount == 0">
              <div slot="content">
                <span>
                  当前共有
                  <span style="color: #f56c6c">{{ noticeCount }}</span
                  >个任务等待处理，点击
                  <router-link :to="{ name: 'personal-userMsg' }">
                    <a style="font-size: 12px" @click="toMsgCenter" class="link"
                      >查看</a
                    >
                  </router-link>
                </span>
              </div>
              <Badge :count="noticeCount" @click.native="toMsgCenter">
                <Icon type="ios-bell"></Icon>
              </Badge>
            </Tooltip>
          </MenuItem>
          <Submenu name="4">
            <template slot="title">{{ userInfo.userName }}</template>
            <MenuItem name="profile">个人中心</MenuItem>
            <MenuItem name="logout">退出</MenuItem>
          </Submenu>
        </div>
      </Menu>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </Header>
</template>

<script>
import { Login, Index, Project, Brand } from "../API/api";
import Toast from "./popup/Toast";
import Loading from "./popup/Loading";
import TopMenu from "./TopMenu";
import SearchPlate from "./SearchPlate";

export default {
  name: "top-header",
  components: { SearchPlate, TopMenu, Loading, Toast },
  data() {
    return {
      pageTotal: 0,
      noticeVisible: false,
      isPagination: false,
      isSearch: false,
      isToast: false,
      toastMsg: null,
      userInfo: {},
      msgList: [],
      noticeConf: {
        page: 1,
        pageSize: 5,
        noticeId: 0,
        state: 1,
      },
      noticeNotReadConf: {
        noticeId: 0,
        state: 1,
        page: 1,
        pageSize: 10,
      },
      isNotice: false,

      noticeCount: 0,
      noticeList: [],
      canAddProject: false,
      canAddBrand: false,
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
      allNotice: [],
    };
  },
  computed: {
    delCount() {
      return this.$store.state.index.delNoticeNum;
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
  },
  created() {
    this.$http
      .post(Project.role, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      })
      .then((res) => {
        let _data = res.data;
        this.canAddProject = _data.retData.add;
      });
    this.$http
      .post(Brand.role, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      })
      .then((res) => {
        let _data = res.data;
        this.canAddBrand = _data.retData.add;
      });
    this.$Notice.config({
      // top: 48
      top: 60,
      duration: 0,
    });
    this.getNotice();
    this.noticeConf.page = 1;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      this.userInfo = userInfo;
    } else {
      this.$http.post(Login.logout, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
      this.$cookie.delete("token");
      const noticeGot = localStorage.getItem("noticeGot");
      localStorage.clear();
      localStorage.setItem("noticeGot", noticeGot);
      sessionStorage.clear();
      this.$store.dispatch("setPrimaryMenu", "1");
      this.$router.push("/");
      sessionStorage.setItem("primaryMenu", "projects/list/");
      this.$Notice.destroy();
    }

    // this.getNoticeList()
  },
  methods: {
    newAdd(item) {
      // console.log(item);
      sessionStorage.setItem("subMenu", item.submenu);
      this.$store.dispatch("setCurrSubMenu", item.submenu);
      this.$store.dispatch("setOpenedSub", item.openedSub);
      sessionStorage.setItem("openedSub", item.openedSub);
      this.$router.push({
        path: item.value,
      });
    },
    toMsgPage() {
      this.$router.push("/msg/list");
      this.$Notice.destroy();
      this.isPagination = false;
      this.isNotice = false;

      this.$store.dispatch("setCurrMenu", "profile");
      sessionStorage.setItem("currMenu", "profile");
      sessionStorage.setItem("primaryMenu", "profile");
      sessionStorage.setItem("subMenu", "msg/list/");
      this.$store.dispatch("setCurrSubMenu", "msg/list/");
      this.$store.dispatch("setPrimaryMenu", "profile");
    },

    getNotice() {
      let vm = this;
      this.noticePost();
      setInterval(function () {
        vm.noticePost(true);
      }, 300000);
    },
    // clearNotice() {
    //   this.$Notice.destroy();
    //   sessionStorage.setItem("showNotice", "hide");
    //   this.isNotice = !this.isNotice;
    //   this.isPagination = !this.isPagination;
    //   if (this.isNotice) {
    //     // this.changeNoticeState()
    //     this.getNoticeList("init");
    //     this.isPagination = true;
    //   }
    // },
    toMsgCenter() {
      Promise.all(
        this.msgList.map((e) => {
          return this.$http.post(
            Index.noticeState,
            this.qs.stringify({ noticeId: e.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") },
            }
          );
        })
      );
      this.$router.push({ name: "personal-userMsg" });
      this.$Notice.destroy();
      // sessionStorage.setItem("showNotice", "hide");
      setTimeout(() => {
        this.noticeCount = 0;
        this.msgList = [];
      });
    },
    changeNoticeState(item, index) {
      this.$http
        .post(Index.noticeState, this.qs.stringify({ noticeId: item.id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.noticeCount--;
          this.msgList.splice(1, index);
        });
    },
    //弹出消息提醒
    getNoticeList(init) {
      const _self = this;
      // sessionStorage.setItem("showNotice", "show");
      if (init) {
        this.noticeConf.page = 1;
      }
      this.$http
        .post(
          Index.notice,
          this.qs.stringify({
            page: this.noticeConf.page,
            pageSize: this.noticeConf.pageSize,
            state: this.noticeConf.state,
            noticeId: 1,
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then((res) => {
          this.$Notice.config({
            // top: 48
            top: 96,
          });
          this.$Notice.destroy();
          let _data = res.data;
          if (_data.retCode === 0) {
            this.pageTotal = _data.retData.count;
            _data.retData.data.slice(0, 5).forEach((item) => {
              if (item.state === 1) {
                _self.$Notice.warning({
                  title: item.name,
                  name: item.id,
                  desc: `${item.userInfo.name}${item.name}${item.content.name}`,
                  duration: 0,
                  render: (h) => {
                    if (+item.type === 2) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        "启动了",
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/projects/list/${item.customerId}`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push(url);
                                _self.$store.dispatch(
                                  "setCurrSubMenu",
                                  "projects/list/"
                                );
                              },
                            },
                          },
                          item.content.name
                        ),
                        "项目",
                      ]);
                    } else if (+item.type === 12) {
                      return h(
                        "div",
                        {
                          class: "notice-body",
                        },
                        [
                          h("a", item.content.meetingName),
                          "会议已结束 ",
                          h(
                            "a",
                            {
                              on: {
                                click() {
                                  const url = `/schedule/meeting`;
                                  _self.changeNoticeState(item.id);
                                  _self.$Notice.close(item.id);
                                  _self.$router.push(url);
                                  _self.$store.dispatch("setCurrSubMenu", url);
                                },
                              },
                            },
                            item.name
                          ),
                        ]
                      );
                    } else if (+item.type === 9) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/myReimburse/list/`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push(url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 10) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/vacation/out/`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push(url);
                                _self.$store.dispatch(
                                  "setCurrSubMenu",
                                  "vacation/out"
                                );
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 11) {
                      if (item.content.qaType === "question") {
                        return h(
                          "div",
                          {
                            class: "notice-body",
                          },
                          [
                            "您在NCC小黄书的提问",
                            h(
                              "a",
                              {
                                on: {
                                  click() {
                                    const url = `/v2/growth/q&a/mySubmit`;
                                    _self.changeNoticeState(item.id);
                                    _self.$Notice.close(item.id);
                                    _self.$router.push({
                                      path: url,
                                      query: {
                                        type: "MyQuestion",
                                      },
                                    });
                                    _self.$store.dispatch(
                                      "setCurrSubMenu",
                                      url
                                    );
                                  },
                                },
                              },
                              item.content.questionContent
                            ),
                            h("a", item.name),
                            "，理由是：",
                            h("a", item.content.auditorReason),
                          ]
                        );
                      } else if (item.content.qaType === "answer") {
                        return h(
                          "div",
                          {
                            class: "notice-body",
                          },
                          [
                            "您在问题悬赏榜对于问题",
                            h(
                              "a",
                              {
                                on: {
                                  click() {
                                    const url = `/v2/growth/q&a/mySubmit`;
                                    _self.changeNoticeState(item.id);
                                    _self.$Notice.close(item.id);
                                    _self.$router.push({
                                      path: url,
                                      query: {
                                        type: "MyAnswer",
                                      },
                                    });
                                    _self.$store.dispatch(
                                      "setCurrSubMenu",
                                      url
                                    );
                                  },
                                },
                              },
                              item.content.questionContent
                            ),
                            "的回答",
                            h("a", item.name),
                            "，理由是：",
                            h("a", item.content.auditorReason),
                          ]
                        );
                      } else if (item.content.qaType === "solution") {
                        return h(
                          "div",
                          {
                            class: "notice-body",
                          },
                          [
                            "您在NCC小黄书发布的答案",
                            h(
                              "a",
                              {
                                on: {
                                  click() {
                                    const url = `/v2/growth/q&a/mySubmit`;
                                    _self.changeNoticeState(item.id);
                                    _self.$Notice.close(item.id);
                                    _self.$router.push({
                                      path: url,
                                      query: {
                                        type: "MySolution",
                                      },
                                    });
                                    _self.$store.dispatch(
                                      "setCurrSubMenu",
                                      url
                                    );
                                  },
                                },
                              },
                              item.content.solutionTitle
                            ),
                            h("a", item.name),
                            "，理由是：",
                            h("a", item.content.auditorReason),
                          ]
                        );
                      }
                    } else if (+item.type === 1) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/tasks/list/${item.customerId}/${item.content.projectId}`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push({
                                  path: url,
                                  query: {
                                    id: item.id,
                                    toolkitId:
                                      item.content.productId == 19 ||
                                      item.content.productId == 20
                                        ? 0
                                        : item.content.productId,
                                  },
                                });
                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 5) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/v2/resource/brand`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push(url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 7) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `vacation/audit`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push("/" + url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                                sessionStorage.setItem(
                                  "task_bcrumb",
                                  "日程审批"
                                );
                                sessionStorage.setItem(
                                  "task_bcrumb_url",
                                  `/${url}`
                                );
                                this.$store.dispatch("setBCrumb", {
                                  label: "日程审批",
                                  url: `/${url}`,
                                });
                              },
                            },
                          },
                          item.content.type
                        ),
                      ]);
                    } else if (+item.type === 6) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `myDevice/apply`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push("/" + url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                                sessionStorage.setItem(
                                  "task_bcrumb",
                                  "我的申请"
                                );
                                sessionStorage.setItem(
                                  "task_bcrumb_url",
                                  `/${url}`
                                );
                                this.$store.dispatch("setBCrumb", {
                                  label: "我的申请",
                                  url: `/${url}`,
                                });
                              },
                            },
                          },
                          item.content.assetNo
                        ),
                      ]);
                    } else if (+item.type === 8) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/v2/resource/supplier`;
                                _self.changeNoticeState(item.id);
                                _self.$Notice.close(item.id);
                                _self.$router.push(url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else {
                      return h(
                        "div",
                        {
                          class: "notice-body",
                        },
                        [
                          h("a", item.userInfo.name),
                          "创建了 ",
                          h("a", item.name),
                          " 并完成了审批，休假时间自：",
                          h("a", item.content.name),
                          h("a", item.content.time),
                        ]
                      );
                    }
                  },
                  onClose() {
                    if (+item.state === 1) {
                      _self.changeNoticeState(item.id);
                    }
                    if (
                      document.querySelectorAll(".ivu-notice-notice").length ===
                      1
                    ) {
                      _self.isNotice = false;
                    }
                  },
                });
              } else {
                _self.$Notice.open({
                  title: item.name,
                  desc: `${item.userInfo.name}${item.name}${item.content.name}`,
                  duration: 0,
                  render: (h) => {
                    if (+item.type === 2) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/projects/detail/${item.content.projectId}`;
                                _self.$router.push(url);
                                _self.$store.dispatch(
                                  "setCurrSubMenu",
                                  "projects/list/"
                                );
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 9) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/myReimburse/list/`;
                                _self.$router.push(url);
                                _self.$store.dispatch(
                                  "setCurrSubMenu",
                                  "myReimburse/list/"
                                );
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 10) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/vacation/out/`;
                                _self.$router.push(url);
                                _self.$store.dispatch(
                                  "setCurrSubMenu",
                                  "vacation/out"
                                );
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 1) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/tasks/list/${item.customerId}/${item.content.projectId}`;

                                _self.$router.push({
                                  path: url,
                                  query: {
                                    id: item.id,
                                    toolkitId:
                                      item.content.productId == 19 ||
                                      item.content.productId == 20
                                        ? 0
                                        : item.content.productId,
                                  },
                                });

                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 5) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/v2/resource/brand`;
                                _self.$router.push(url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else if (+item.type === 7) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `vacation/audit`;
                                _self.$router.push("/" + url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                                sessionStorage.setItem(
                                  "task_bcrumb",
                                  "日程审批"
                                );
                                sessionStorage.setItem(
                                  "task_bcrumb_url",
                                  `/${url}`
                                );
                                this.$store.dispatch("setBCrumb", {
                                  label: "日程审批",
                                  url: `/${url}`,
                                });
                              },
                            },
                          },
                          item.content.type
                        ),
                      ]);
                    } else if (+item.type === 6) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `myDevice/apply`;
                                _self.$router.push("/" + url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                                sessionStorage.setItem(
                                  "task_bcrumb",
                                  "我的申请"
                                );
                                sessionStorage.setItem(
                                  "task_bcrumb_url",
                                  `/${url}`
                                );
                                this.$store.dispatch("setBCrumb", {
                                  label: "我的申请",
                                  url: `/${url}`,
                                });
                              },
                            },
                          },
                          item.content.assetNo
                        ),
                      ]);
                    } else if (+item.type === 8) {
                      return h("div", [
                        h("a", item.userInfo.name),
                        item.name,
                        h(
                          "a",
                          {
                            on: {
                              click() {
                                const url = `/v2/resource/supplier`;
                                _self.$router.push(url);
                                _self.$store.dispatch("setCurrSubMenu", url);
                              },
                            },
                          },
                          item.content.name
                        ),
                      ]);
                    } else {
                      return h(
                        "div",
                        {
                          class: "notice-body",
                        },
                        [
                          h("a", item.userInfo.name),
                          "创建了 ",
                          h("a", item.name),
                          " 并完成了审批，休假时间自：",
                          h("a", item.content.name),
                          h("a", item.content.time),
                        ]
                      );
                    }
                  },
                  onClose() {
                    if (+item.state === 1) {
                      _self.changeNoticeState(item.id);
                    }
                    if (
                      document.querySelectorAll(".ivu-notice-notice").length ===
                      1
                    ) {
                      _self.isNotice = false;
                    }
                  },
                });
              }
            });
            // }
            // if (this.noticeConf.page === 1) {
            //   this.noticeList = _data.retData.data || []
            // } else {
            //   this.noticeList = this.noticeList.concat(_data.retData.data || [])
            // }
          }
        });
    },
    //初始消息提醒
    noticePost(showNewMsg) {
      const _self = this;
      this.$http
        .post(Index.noticeNum, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          let _data = res.data;
          if (_data.retCode === 0) {
            if (this.noticeCount != _data.retData.number) {
              if (sessionStorage.getItem("hideNotice") == "1") {
                this.noticeCount = 0;
              } else {
                this.noticeCount = _data.retData.number;
              }

              this.$http
                .post(
                  Index.notice,
                  this.qs.stringify({
                    page: 1,
                    pageSize: 1000,
                    noticeId: 1,
                    state: 1,
                  }),
                  {
                    headers: {
                      Authorization: "Bearer " + this.$cookie.get("token"),
                    },
                  }
                )
                .then((res) => {
                  let _data = res.data;
                  if (_data.retCode === 0) {
                    // const showNotice = sessionStorage.getItem("showNotice");
                    this.msgList = _data.retData.data;

                    //如果没有最新的消息不会刷新notice并且不会弹出

                    this.$Notice.destroy();

                    this.$Notice.config({
                      top: 96,
                      duration: 0,
                    });

                    if (_data.retData.data.length > 0) {
                      this.noticeConf.noticeId = _data.retData.noticeId;
                      this.pageTotal = _data.retData.count;
                      this.isNotice = true;
                      this.isPagination = true;
                    }

                    if (sessionStorage.getItem("hideNotice") == "1") {
                      Promise.all(
                        this.msgList.map((e) => {
                          return this.$http.post(
                            Index.noticeState,
                            this.qs.stringify({ noticeId: e.id }),
                            {
                              headers: {
                                Authorization:
                                  "Bearer " + this.$cookie.get("token"),
                              },
                            }
                          );
                        })
                      ).then(() => {
                        this.msgList = [];
                      });
                      sessionStorage.removeItem("hideNotice");
                    } else {
                      _data.retData.data.slice(0, 5).forEach((item, index) => {
                        _self.$Notice.warning({
                          title: item.name,
                          name: item.id,
                          desc: `${item.userInfo.name}${item.name}${item.content.name}`,
                          duration: 0,
                          render: (h) => {
                            if (+item.type === 2) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                "启动了",
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/projects/list/${item.customerId}`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push(url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          "projects/list/"
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                                "项目",
                              ]);
                            } else if (+item.type === 9) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/myReimburse/list/`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push(url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          "myReimburse/list/"
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                              ]);
                            } else if (+item.type === 10) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/vacation/out/`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push(url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          "vacation/out"
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                              ]);
                            } else if (+item.type === 11) {
                              if (item.content.qaType === "question") {
                                return h(
                                  "div",
                                  {
                                    class: "notice-body",
                                  },
                                  [
                                    "您在NCC小黄书的提问",
                                    h(
                                      "a",
                                      {
                                        on: {
                                          click() {
                                            const url = `/v2/growth/q&a/mySubmit`;
                                            _self.changeNoticeState(
                                              item,
                                              index
                                            );
                                            _self.$Notice.close(item.id);
                                            _self.$router.push({
                                              path: url,
                                              query: {
                                                type: "MyQuestion",
                                              },
                                            });
                                            _self.$store.dispatch(
                                              "setCurrSubMenu",
                                              url
                                            );
                                          },
                                        },
                                      },
                                      item.content.questionContent
                                    ),
                                    h("a", item.name),
                                    "，理由是：",
                                    h("a", item.content.auditorReason),
                                  ]
                                );
                              } else if (item.content.qaType === "answer") {
                                return h(
                                  "div",
                                  {
                                    class: "notice-body",
                                  },
                                  [
                                    "您在问题悬赏榜对于问题",
                                    h(
                                      "a",
                                      {
                                        on: {
                                          click() {
                                            const url = `/v2/growth/q&a/mySubmit`;
                                            _self.changeNoticeState(
                                              item,
                                              index
                                            );
                                            _self.$Notice.close(item.id);
                                            _self.$router.push({
                                              path: url,
                                              query: {
                                                type: "MyAnswer",
                                              },
                                            });
                                            _self.$store.dispatch(
                                              "setCurrSubMenu",
                                              url
                                            );
                                          },
                                        },
                                      },
                                      item.content.questionContent
                                    ),
                                    "的回答",
                                    h("a", item.name),
                                    "，理由是：",
                                    h("a", item.content.auditorReason),
                                  ]
                                );
                              } else if (item.content.qaType === "solution") {
                                return h(
                                  "div",
                                  {
                                    class: "notice-body",
                                  },
                                  [
                                    "您在NCC小黄书发布的答案",
                                    h(
                                      "a",
                                      {
                                        on: {
                                          click() {
                                            const url = `/v2/growth/q&a/mySubmit`;
                                            _self.changeNoticeState(
                                              item,
                                              index
                                            );
                                            _self.$Notice.close(item.id);
                                            _self.$router.push({
                                              path: url,
                                              query: {
                                                type: "MySolution",
                                              },
                                            });
                                            _self.$store.dispatch(
                                              "setCurrSubMenu",
                                              url
                                            );
                                          },
                                        },
                                      },
                                      item.content.solutionTitle
                                    ),
                                    h("a", item.name),
                                    "，理由是：",
                                    h("a", item.content.auditorReason),
                                  ]
                                );
                              }
                            } else if (+item.type === 1) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/tasks/list/${item.customerId}/${item.content.projectId}`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push({
                                          path: url,
                                          query: {
                                            id: item.id,
                                            toolkitId:
                                              item.content.productId == 19 ||
                                              item.content.productId == 20
                                                ? 0
                                                : item.content.productId,
                                          },
                                        });
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          url
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                              ]);
                            } else if (+item.type === 5) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/v2/resource/brand`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push(url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          url
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                              ]);
                            } else if (+item.type === 7) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `vacation/audit`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push("/" + url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          url
                                        );
                                        sessionStorage.setItem(
                                          "task_bcrumb",
                                          "日程审批"
                                        );
                                        sessionStorage.setItem(
                                          "task_bcrumb_url",
                                          `/${url}`
                                        );
                                        _self.$store.dispatch("setBCrumb", {
                                          label: "日程审批",
                                          url: `/${url}`,
                                        });
                                      },
                                    },
                                  },
                                  item.content.type
                                ),
                              ]);
                            } else if (+item.type === 6) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `myDevice/apply`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push("/" + url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          url
                                        );

                                        sessionStorage.setItem(
                                          "task_bcrumb",
                                          "我的申请"
                                        );
                                        sessionStorage.setItem(
                                          "task_bcrumb_url",
                                          `/${url}`
                                        );
                                        _self.$store.dispatch("setBCrumb", {
                                          label: "我的申请",
                                          url: `/${url}`,
                                        });
                                      },
                                    },
                                  },
                                  item.content.assetNo
                                ),
                              ]);
                            } else if (+item.type === 8) {
                              return h("div", [
                                h("a", item.userInfo.name),
                                item.name,
                                h(
                                  "a",
                                  {
                                    on: {
                                      click() {
                                        const url = `/v2/resource/supplier`;
                                        _self.changeNoticeState(item, index);
                                        _self.$Notice.close(item.id);
                                        _self.$router.push(url);
                                        _self.$store.dispatch(
                                          "setCurrSubMenu",
                                          url
                                        );
                                      },
                                    },
                                  },
                                  item.content.name
                                ),
                              ]);
                            } else if (+item.type === 12) {
                              return h(
                                "div",
                                {
                                  class: "notice-body",
                                },
                                [
                                  h("a", item.content.meetingName),
                                  "会议已结束 ",
                                  h(
                                    "a",
                                    {
                                      on: {
                                        click() {
                                          const url = `/schedule/meeting`;
                                          _self.changeNoticeState(item, index);
                                          _self.$Notice.close(item.id);
                                          _self.$router.push(url);
                                          _self.$store.dispatch(
                                            "setCurrSubMenu",
                                            url
                                          );
                                        },
                                      },
                                    },
                                    item.name
                                  ),
                                ]
                              );
                            } else if (+item.type === 13) {
                              return h(
                                "div",
                                {
                                  class: "notice-body",
                                },
                                [
                                  h("a", item.userInfo.name),
                                  item.uid == item.content.driUserId
                                    ? " 拒绝了 "
                                    : " 创建了 ",
                                  h(
                                    "a",
                                    {
                                      on: {
                                        click() {
                                          const url = `/dri/detail/${item.content.driUserId}`;
                                          _self.changeNoticeState(item, index);
                                          _self.$Notice.close(item.id);
                                          _self.$router.push(url);
                                        },
                                      },
                                    },
                                    "DRI"
                                  ),
                                  item.uid == item.content.driUserId
                                    ? " 审核 "
                                    : " 待审核 ",
                                ]
                              );
                            } else if (item.type === 14) {
                              return h(
                                "div",
                                {
                                  class: "notice-body",
                                },
                                [
                                  h("a", item.userInfo.name),
                                  item.name,
                                  h(
                                    "a",
                                    {
                                      on: {
                                        click() {
                                          const url = `new/nccBook/question/detail/${item.content.tiwenId}`;
                                          _self.changeNoticeState(item, index);
                                          _self.$Notice.close(item.id);
                                          _self.$router.push(url);
                                        },
                                      },
                                    },
                                    item.content.tiwenContent
                                  ),
                                ]
                              );
                            } else {
                              return h(
                                "div",
                                {
                                  class: "notice-body",
                                },
                                [
                                  h("a", item.userInfo.name),
                                  "创建了 ",
                                  h("a", item.name),
                                  " 并完成了审批，休假时间自：",
                                  h("a", item.content.name),
                                  h("a", item.content.time),
                                ]
                              );
                            }
                          },
                          onClose() {
                            if (+item.state === 1) {
                              _self.changeNoticeState(item, index);
                            }
                          },
                        });
                      });
                    }
                  }
                });
            }
          }
        });
    },
    closeSearch() {
      this.isSearch = false;
      this.searchData = {
        searchValue: "",
        type: null,
      };
    },
    changeNoticeList(state) {
      this.noticeConf.state = state;
      this.noticeConf.page = 1;
      this.getNoticeList();
    },
    selectTopNav(name) {
      if (name === "logout") {
        this.$http.post(Login.logout, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        });
        this.$cookie.delete("token");
        const noticeGot = localStorage.getItem("noticeGot");
        localStorage.clear();
        localStorage.setItem("noticeGot", noticeGot);
        sessionStorage.clear();
        this.$store.dispatch("setPrimaryMenu", "1");
        this.$router.push("/");
        sessionStorage.setItem("primaryMenu", "projects/list/");
        this.$Notice.destroy();
      } else if (name === "profile") {
        this.$store.dispatch("setCurrMenu", "profile");
        sessionStorage.setItem("currMenu", "profile");
        sessionStorage.setItem("primaryMenu", "profile");
        sessionStorage.setItem("subMenu", "profile/list/");
        this.$store.dispatch("setCurrSubMenu", "profile/list/");
        this.$store.dispatch("setPrimaryMenu", "profile");
        this.$router.push("/profile/list");
      } else if (name === "search") {
        this.isSearch = !this.isSearch;
        this.searchData = {
          searchValue: "",
          type: null,
        };
        // this.isNotice = !this.isNotice
        // this.$router.push('/notice')
      } else if (name === "notice") {
        this.noticeVisible = !this.noticeVisible;
      }
    },
  },
  watch: {
    delCount: {
      handler() {
        this.noticePost();
      },
    },
  },
};
</script>

<style scoped lang="less">
.oa-header {
  background-color: #2d8ef8;
  /*border: solid 1px #107cd9;*/
  height: 48px;
  line-height: 48px;
  padding: 0 10px 0 0;
  position: relative;
  z-index: 10;
  border-radius: 0;
}

.layout-logo {
  width: 164px;
  height: 100%;
  /*background: #5b6270;*/
  /*border-radius: 3px;*/
  float: left;
  padding: 10px 0;
  position: relative;
  top: 0;
  left: 0;
  /*background: url("../assets/svg/logo3.svg");*/
  .layout-logo-img {
    background: url("../assets/svg/logo3.svg") no-repeat scroll center / contain
      transparent;
    height: 100%;
    display: block;
  }
}

.top-nav {
  height: 48px;
  line-height: 48px;
  /*overflow: hidden;*/
  border: 0 none;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  &:after {
    content: unset;
  }
}

.layout-nav {
  /*width: 420px;*/
  /*margin: 0 auto;*/
  margin-right: 30px;
  > .ivu-menu-item,
  > .ivu-menu-submenu {
    padding: 0 15px/2;
    /*float: right;*/
    color: #343a40;
  }
  > .ivu-menu-submenu {
    .ivu-menu-submenu-title {
      color: #343a40;
      .ivu-menu-submenu-title-icon {
        display: none;
      }
    }
  }
  .ivu-icon {
    margin-right: 0;
    font-size: 23px;
  }
}

.notice-page {
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.notice-list {
  max-height: 80vh;
  overflow: auto;
}

.notice-txt {
  width: 224px;
  margin-left: 13px;
  p {
    font-size: 14px;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    white-space: normal;
    line-height: normal;
    span {
      color: #2d8ef8;
    }
  }
  .notice-time {
    font-size: 12px;
    color: #adb5bd;
  }
}

.notRead {
  background-color: #fff9db;
}

.load-more-notice {
  text-align: center;
  line-height: normal;
}

.notice-list-item {
  color: #6b7177;
  cursor: default;
  a {
    cursor: pointer;
  }
  &:hover {
    background-color: #f8f9fa;
  }
}

.notice-pagination {
  position: fixed;
  right: 0;
  top: 48 + 36px;
  margin-right: 24px;
  background-color: #fff;
  width: 335px;
  text-align: right;
}
.notice-tab {
  position: fixed;
  right: 0;
  top: 48px;
  margin-right: 24px;
  background-color: #fff;
  width: 335px;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  text-align: right;
  button {
    flex: 1;
  }
}
.fadeInRight-enter {
}
.fadeInRight-enter-active {
  animation: fadeInRgiht 0.3s;
}
.fadeInRight-enter-to {
}
.fadeInRight-leave {
}
.fadeInRight-leave-active {
  animation: fadeInRight 0.3s reverse;
}
.fadeInRight-leave-to {
}
@keyframes fadeInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.menu-plate {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}
.search-plate {
  display: flex;
  align-items: center;
}
</style>

<style lang="less">
.top-nav {
  .ivu-tooltip-inner {
    background: black !important;
  }
}
</style>

