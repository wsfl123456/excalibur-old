<template>
  <div>
    <div class="g-ta-r" v-if="canManage">
      <Button type="primary" size="large" @click="addSysNotice">新建公告</Button>
    </div>
    <div>
      <h2>系统公告：</h2>
      <hr />
      <div class="notice-list">
        <template v-if="!canManage">
          <ul v-if="list.length > 0">
            <template v-for="item in list">
              <li :key="item.id">
                <router-link :to="`/sysNotice/detail/${item.id}`" target="_blank" class="inner">
                  <span>
                    【{{typeConf[item.typeId]}}】{{item.title}}
                    <span
                      class="new-notice-tag"
                      v-if="item.isNew"
                    ></span>
                  </span>
                  <span>{{item.lastModifyTime | filterDate('yyyy年MM月dd日')}}</span>
                </router-link>
              </li>
            </template>
          </ul>
        </template>
        <template v-else>
          <table class="main-list">
            <thead>
              <tr>
                <th
                  v-for="(item, index) in thConf"
                  :key="index"
                  :style="{'width': item.width + 'px'}"
                >
                  <div class="table-cell">{{item.title}}</div>
                </th>
              </tr>
            </thead>
            <tbody v-if="list.length > 0">
              <template v-for="(item, idx) in list">
                <tr :key="item.id">
                  <td v-for="(_item, _idx) in thConf" :key="_idx">
                    <template v-if="_item.key === 'state'">
                      <div class="table-cell">{{item.stateName}}</div>
                    </template>
                    <template v-else-if="_item.key === 'creatorId'">
                      <div class="table-cell">
                        <common-member
                          :can-exit="false"
                          :is-edit="false"
                          transfer
                          :users="[{name: item.creatorName, headPic: item.creatorHeadPic, id: item.creatorId}]"
                        ></common-member>
                      </div>
                    </template>
                    <template v-else-if="_item.key === 'operate'">
                      <div class="table-cell">
                        <Button type="primary" @click="toEdit(item.id)" style="margin-right:10px">编辑</Button>
                        <Button
                          type="primary"
                          @click="showModal = true; shareParams.declareId = item.id"
                        >分享</Button>
                      </div>
                    </template>
                    <template v-else-if="_item.key === 'title'">
                      <div class="table-cell">
                        <router-link
                          :to="`/sysNotice/detail/${item.id}`"
                          target="_blank"
                          class="inner"
                        >
                          【{{typeConf[item.typeId]}}】{{item[_item.key]}}
                          <span
                            class="new-notice-tag"
                            v-if="item.isNew"
                          ></span>
                        </router-link>
                      </div>
                    </template>
                    <template v-else>
                      <div class="table-cell">{{item[_item.key]}}</div>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </template>
      </div>
    </div>
    <Modal v-model="showModal" title="分享系统公告" @on-ok="shareNotice" @on-cancel="cancelShare">
      <Form label-position="left" :label-width="120" class="sys-notice__share__form">
        <FormItem label="是否全体分享" >
          <RadioGroup
            v-model="shareParams.userRange"
            size="large"
            @on-change="userRangeChange"
          >
            <Radio :label="998">是</Radio>
            <Radio :label="0" style="margin-left: 40px">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          v-show="shareParams.userRange === 998"
          label="群组邮箱"
          class="default-form-item"
          
        >
          <i-input v-model="shareParams.groupEmail" placeholder="填写群组邮箱 (多个邮箱使用;分割)"></i-input>
        </FormItem>
        <FormItem
          v-show="shareParams.userRange === 0"
          label="分享人员"
          class="default-form-item"
          
        >
          <div class="default-form-member-selection">
            <!-- <common-member content="选择与会人员" multi @on-change="selectMember"></common-member> -->
            <el-cascader
              v-model="shareParams.teamUserList"
              placeholder="输入员工姓名或员工所在事业部搜索"
              :options="userOptionList"
              :props="{ multiple: true, expandTrigger: 'hover'  }"
              :filter-method="filterMethod"
              :show-all-levels="false"
              filterable
            ></el-cascader>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import { Index, Schedule } from "../../API/api";
import SubHeader from "../../components/SubHeader";
import { ajax } from "../../util/util";
import CommonMember from "../../components/CommonMember";

export default {
  name: "",
  components: { CommonMember, SubHeader, Toast, Loading, BCrumb },
  data() {
    return {
      showModal: false,
      shareParams: {
        declareId: null,
        userRange: 0,
        groupEmail: "",
        teamUserList: [],
        userList: []
      },
      userOptionList: [],
      crumb: [
        {
          label: "系统公告"
        },
        {
          label: "公告列表"
        }
      ],
      thConf: [
        {
          title: "公告名称",
          key: "title",
          asc: "desc"
        },
        {
          title: "公告状态",
          key: "state",
          asc: "desc"
        },
        {
          title: "编辑时间",
          key: "lastModifyTime",
          asc: "desc"
        },
        {
          title: "编辑人",
          key: "creatorId",
          asc: "desc"
        },
        {
          title: "操作",
          key: "operate",
          asc: "desc"
        }
      ],
      typeConf: {
        1: "EXCALIBUR",
        2: "人事部通知",
        3: "行政部通知",
        4: "SDC通知",
        5: "NCC通知",
        6: "NHU通知"
      },
      list: [],
      isLoading: true,
      isToast: false,
      toastMsg: "",
      toastState: null,
      pageConf: {
        page: 1,
        pageSize: 25
      },
      canLoadMore: true,
      dom: null,
      chDom: null,
      canManage: false
    };
  },
  methods: {
    init() {
      sessionStorage.setItem("primaryMenu", "profile");
      sessionStorage.setItem("subMenu", "sysNotice/list/");
      this.$store.dispatch("setPrimaryMenu", "profile");
      this.$store.dispatch("setCurrSubMenu", "sysNotice/list/");
      this.getRole();
      this.getAllteamuser();
    },
    cancelShare() {
      this.shareParams.declareId = null;
      this.shareParams.userRange = 0;
      this.shareParams.groupEmail = "";
      this.shareParams.teamUserList = [];
      this.shareParams.userList = [];
    },
    shareNotice() {
      let params = JSON.parse(JSON.stringify(this.shareParams));
      params.groupEmail = params.groupEmail.split(";");
      params.userList = params.teamUserList.map(e => e[1]);
       this.$http
        .post(Index.sysSendmail, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        }).then(res => {
           this.cancelShare();
           this.isToast = true;
           this.toastMsg = "分享成功";
        }).catch(err => {
          this.cancelShare();
           this.isToast = true;
           this.toastMsg = err.retMsg
        })
         setTimeout(() => {
            this.isToast = false;
            this.toastMsg = '';
          }, 1500);
    },
    getAllteamuser() {
      this.$http
        .post(Schedule.allteamuser, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            const teamUser = _data.retData.data;
            teamUser.forEach((element, index) => {
              element.value = element.teamId;
              element.label = element.title;
              element.children = element.item;
              element.children.forEach((ele, ind) => {
                ele.value = ele.id;
                ele.label = ele.englishName;
              });
            });
            this.userOptionList = teamUser;
          }
        });
    },
    filterMethod(node, key) {
      const key_word = node.data.label;
      const parent_key_word = node.parent.data.label;
      let re = new RegExp(key, "i");
      return re.test(key_word) || re.test(parent_key_word);
    },
    userRangeChange() {
      this.shareParams.teamUserList = [];
      this.shareParams.userList = [];
      this.shareParams.groupEmail = "";
    },
    toEdit(id) {
      this.$router.push(`/sysNotice/edit/${id}`);
    },
    getRole() {
      ajax.post(Index.sysNoticeRole).then(res => {
        console.log("role", res);
        this.canManage = res.add;
        this.getList();
      });
    },
    addSysNotice() {
      this.$router.push("/sysNotice/add");
    },
    getList() {
      this.isLoading = true;
      this.$http
        .post(Index.sysNoticeList, this.qs.stringify(this.pageConf), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.isLoading = false;
          if (_data.retCode === 0) {
            if (this.pageConf === 1) {
              this.list = _data.retData.data;
            } else {
              if (_data.retData.data.length > 0) {
                this.list = this.list.concat(_data.retData.data);
              } else {
                this.pageConf.page--;
                if (this.pageConf.page <= 0) {
                  this.pageConf.page = 1;
                }
                this.isToast = true;
                this.toastMsg = "没有更多";
              }
            }
            this.list.forEach(item => {
              if (
                +item.state === 2 ||
                new Date().getTime() - new Date(item.createTime).getTime() >
                  518400000
              ) {
                item.isNew = false;
              } else {
                item.isNew = true;
              }
            });
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    scrollHandler() {
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
        this.pageConf.page++;
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
  li {
    font-size: 14px;
    .inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.main-list {
  cursor: default;
}
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #e9ecef;
}
th {
  text-align: left;
  background-color: #fff;
  font-size: 12px;
  color: #868e96;
  font-weight: normal;
  border: 1px solid #e9ecef;
  height: 32px;
  &:hover,
  &.active {
    background-color: #f8f9fa;
  }
  i {
    color: #2d8ef8;
  }
}
td {
  font-size: 14px;
  color: #343a40;
  height: 48px;
  border-bottom: 1px solid #e9ecef;
  &.empty-data {
    text-align: center;
  }
}
tbody {
  tr {
    &:hover {
      td {
        background-color: #f8f9fa;
      }
    }
  }
}
.table-cell {
  display: inline-block;
  vertical-align: middle;
  padding-left: 18px;
  padding-right: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: normal;
  box-sizing: border-box;
  text-align: left;
}
</style>
<style lang="less">
.sys-notice__share__form {
    .ivu-form-item-label {
      font-size: 14px;
    }
    .ivu-radio-group {
      display: flex;
    }
    
  .el-cascader {
      display: block;
    }
}
</style>
