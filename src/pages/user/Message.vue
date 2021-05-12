<template>
  <div>
    <div>
      <h2>消息提醒：</h2>
      <hr class="g-mb-32">
      <div class="list-filter">
        <div class="filter-box">
          <RadioGroup type="button" :value="noticeConf.state" @on-change="changeFilter">
            <!--<Radio v-for="(item, index) in industry" :key="index" :label="item.id" :disabled="index===0">{{item.industryName}}</Radio>-->
            <Radio disabled>状态</Radio>
            <Radio :label="0">全部</Radio>
            <Radio :label="1">未读</Radio>
            <Radio :label="2">已读</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="notice-list">
        <loading v-if="isLoading"></loading>
        <ul>
          <template v-for="item in list">
            <li :key="item.id">
              <div>
                【{{typeConf[item.type]}}消息】
                <template v-if="+item.type === 2">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type, item.content.projectId, item.customerId)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 10">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 9">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 1">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type, item.content.projectId, item.customerId, item.content.productId)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 5">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 7">
                  <a>{{item.userInfo.name}}</a>
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.type}}</a> 邀请您审核
                </template>
                <template v-else-if="+item.type === 6">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.assetNo}}</a>
                </template>
                <template v-else-if="+item.type === 8">
                  <a>{{item.userInfo.name}}</a>
                  {{item.name}}
                  <a
                    href="javascript:;"
                    @click="toPage(item.state, item.id, item.type)"
                  >{{item.content.name}}</a>
                </template>
                <template v-else-if="+item.type === 11">
                  <template v-if="item.content.qaType === 'question'">
                     <a>{{item.creatorName}}</a>
                      在NCC小黄书的提问 
                      {{item.content.questionContent}}
                       <a
                      >{{item.name}}</a>
                      理由是：
                      {{item.content.auditorReason}}
                  </template>
                  <template v-if="item.content.qaType === 'answer'">
                     <a>{{item.creatorName}}</a>
                      在问题悬赏榜对于问题 
                      {{item.content.questionContent}}
                      的回答
                       <a
                      >{{item.name}}</a>
                      理由是：
                      {{item.content.auditorReason}}
                  </template>
                  <template v-if="item.content.qaType === 'solution'">
                     <a>{{item.creatorName}}</a>
                      在NCC小黄书发布的答案 
                      {{item.content.solutionTitle}}
                       <a
                      >{{item.name}}</a>
                      理由是：
                      {{item.content.auditorReason}}
                  </template>
                </template>
                <template v-else-if="+item.type === 13">
                  <a
                    href="javascript:;"
                  >
                  {{ item.userInfo.name }}
                  </a>
                  {{ item.uid == item.content.driUserId ? " 拒绝了 " : ' 创建了 ' }}
                  <a href="javascript:;"                     @click="$router.push({path: `/dri/detail/${item.content.driUserId}`})">DRI</a>
                  {{item.uid == item.content.driUserId ? " 审核 " : ' 待审核 ' }}
                  
                </template>
                <template v-else>
                  <a @click="changeNoticeState(item.id)">{{item.userInfo.name}}</a> 创建了
                  <a>{{item.name}}</a> 并完成了审批，休假时间自：
                  <a>{{item.content.name}}</a>
                  <a>{{item.content.time}}</a>
                </template>
              </div>
              <div>{{item.createTimeHis | filterDate('yyyy年MM月dd日')}}</div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import { Index } from "../../API/api";
import SubHeader from "../../components/SubHeader";

export default {
  name: "Message",
  components: { SubHeader, Toast, Loading, BCrumb },
  data() {
    return {
      crumb: [{ label: "个人中心" }, { label: "消息提醒" }],
      isLoading: false,
      isToast: false,
      toastMsg: "",
      toastState: null,
      list: [],
      canLoadMore: true,
      dom: null,
      chDom: null,
      noticeConf: {
        page: 1,
        pageSize: 50,
        noticeId: 0,
        state: 0
      },
      typeConf: {
        1: "任务",
        2: "项目",
        3: "人事",
        4: "日程",
        5: "品牌",
        6: "设备",
        7: "请假",
        8: "供应商"
      }
    };
  },
  methods: {
    init() {
      this.getList();
      sessionStorage.setItem("primaryMenu", "profile");
      sessionStorage.setItem("subMenu", "msg/list/");
      this.$store.dispatch("setPrimaryMenu", "profile");
      this.$store.dispatch("setCurrSubMenu", "msg/list/");
    },
    changeNoticeState(id) {
      return this.$http
        .post(Index.noticeState, this.qs.stringify({ noticeId: id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
            this.$store.commit("reduceNoticeNum");
        });
    },
    async toPage(state, noticeId, type, project, customer, product) {
      if (state === 1) await this.changeNoticeState(noticeId);
      let url;
      switch (type) {
        case 2:
          url = `/projects/list/${customer}?id=${project}`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", "projects/list/");
          this.$store.dispatch("setPrimaryMenu", 1);
          break;
        case 9:
          url = `/myReimburse/list/`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", "myReimburse/list/");
          this.$store.dispatch("setPrimaryMenu", 14);
          break;
        case 10:
          url = `/vacation/out/`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", "vacation/out");
          this.$store.dispatch("setPrimaryMenu", 10);
          break;
        case 1:
          url = `/tasks/list/${customer}/${project}`;
          this.$router.push({
            path: url,
            query: {
              toolkitId: product == 19 || product == 20 ? 0 : product
            }
          });
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 1);

          break;
        case 5:
          url = `/v2/resource/brand`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 4);

          break;
        case 7:
          url = `vacation/audit`;
          this.$router.push("/" + url);
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 10);
          sessionStorage.setItem("task_bcrumb", "日程审批");
          sessionStorage.setItem("task_bcrumb_url", `/${url}`);
          this.$store.dispatch("setBCrumb", {
            label: "日程审批",
            url: `/${url}`
          });
          break;
        case 6:
          url = `myDevice/apply`;
          this.$router.push("/" + url);
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 14);
          sessionStorage.setItem("task_bcrumb", "我的申请");
          sessionStorage.setItem("task_bcrumb_url", `/${url}`);
          this.$store.dispatch("setBCrumb", {
            label: "我的申请",
            url: `/${url}`
          });
          break;
        case 8:
          url = `/v2/resource/supplier`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 8);
          break;
        case 13:
          url = `/v2/resource/supplier`;
          this.$router.push(url);
          this.$store.dispatch("setCurrSubMenu", url);
          this.$store.dispatch("setPrimaryMenu", 8);
          break;
        default:
          break;
      }
    },
    changeFilter(n) {
      this.noticeConf.state = n;
      this.noticeConf.page = 1;
      this.getList();
    },
    getList() {
      this.isLoading = true;
      this.$http
        .post(
          Index.notice,
          this.qs.stringify({
            page: this.noticeConf.page,
            pageSize: this.noticeConf.pageSize,
            state: this.noticeConf.state
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          this.isLoading = false;
          const _data = res.data;
          if (_data.retCode === 0) {
            if (this.noticeConf.page === 1) {
              this.list = _data.retData.data;
            } else {
              if (_data.retData.data.length > 0) {
                this.list = this.list.concat(_data.retData.data);
              } else {
                this.noticeConf.page--;
                this.isToast = true;
                this.toastMsg = "没有更多";
              }
            }
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    scrollHandler() {
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
        this.noticeConf.page++;
        this.getList();
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    }
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    this.canLoadMore = false;
    this.unbindLoadMore();
    // this.$store.dispatch('changeTaskDetailStatus', false)
  },
  mounted() {
    this.dom = document.getElementById("main-pages");
    this.chDom = document.getElementById("main-content");
    this.loadMore();
  }
};
</script>

<style scoped lang="less">
.notice-list {
  margin-top: 32px;
  min-height: 300px;
  position: relative;
  li {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.list-filter {
  margin-bottom: 16px;
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
</style>
