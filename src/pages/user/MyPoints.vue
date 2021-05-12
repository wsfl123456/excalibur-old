<template>
  <div>
    <div class="my-points-bar">
      <div class="my-points-bar__left">
        <div class="my-points-bar__title">我的积分：</div>
        <div class="my-points-bar__left__point-area">
          <img
            class="my-points-bar__left__point-area__icon"
            src="../../assets/svg/ic_jifen.svg"
            alt
          />
          <span class="my-points-bar__left__point-area__point">{{ showPoint }}</span>
        </div>
      </div>
      <!--      <div class="point-btn">-->
      <!--        <router-link to="/schedule/add">-->
      <!--          积分兑换-->
      <!--        </router-link>-->
      <!--      </div>-->
    </div>
    <div class="academy-point-area">
      <div class="academy-point-area__title">
        <img src="../../assets/svg/ic_xyjf.svg" alt />
        <span>学院积分排行榜</span>
      </div>

      <div class="academy-point-area__academies">
        <template v-for="(item, index) in collegeRank">
          <div class="academy-point-area__academies__item" v-bind:key="index">
            <div class="academy-point-area__academies__item__left">
              <template v-if="index === 0">
                <img
                  class="academy-point-area__academies__item__left__hat"
                  src="../../assets/svg/crown_gold.svg"
                  alt
                />
              </template>
              <template v-if="index === 1">
                <img
                  class="academy-point-area__academies__item__left__hat"
                  src="../../assets/svg/crown_silver.svg"
                  alt
                />
              </template>
              <template v-if="index === 2">
                <img
                  class="academy-point-area__academies__item__left__hat"
                  src="../../assets/svg/crown_bronze.svg"
                  alt
                />
              </template>
              <template v-if="item.collegeId === '1'">
                <div
                  class="academy-point-area__academies__item__left__logo"
                  style="background-color: #f6ae0d;"
                >
                  <img src="../../assets/images/1.png" alt />
                </div>
              </template>
              <template v-else-if="item.collegeId === '2'">
                <div
                  class="academy-point-area__academies__item__left__logo"
                  style="background-color: #e5e8f8;"
                >
                  <img src="../../assets/images/2.png" alt />
                </div>
              </template>
              <template v-else-if="item.collegeId === '3'">
                <div
                  class="academy-point-area__academies__item__left__logo"
                  style="background-color: #ca9561;"
                >
                  <img src="../../assets/images/3.png" alt />
                </div>
              </template>
            </div>
            <div class="academy-point-area__academies__item__right">
              <div>{{ item.title }}</div>
              <div>
                <img src="../../assets/svg/ic_jifen.svg" alt />
                <span>{{ item.total_integral }}</span>
              </div>
            </div>
            <div class="vertical-line" />
          </div>
        </template>
      </div>
    </div>
    <div class="table-area">
      <div class="table-area__container">
        <div class="table-area__table-head">
          <img class="table-area__table-head__icon" src="../../assets/svg/ic_mine_jfrz.svg" alt />
          <span class="table-area__table-head__title">我的积分日志</span>
        </div>

        <table class="table-area__content">
          <thead class="table-area__content__thead no-left-right-border">
            <tr>
              <th class="table-area__content__th" width="20%">来源</th>
              <th class="table-area__content__th" width="14.6%">积分数量</th>
              <th class="table-area__content__th" width="28.2%">时间</th>
            </tr>
          </thead>
        </table>

        <div
          id="my-point-area"
          :class="{ 'scrollable-area': true, 'scrollable-flex': !(personPoint.length > 0) }"
        >
          <table class="table-area__content">
            <tbody class="table-area__content__tbody" v-if="personPoint.length > 0">
              <template v-for="(item, index) in personPoint">
                <tr v-bind:key="index" class="no-left-right-border">
                  <td style="width: 20%;">
                    <div class="table-area__content__cell">{{ item['reason'] }}</div>
                  </td>
                  <td style="width: 14.6%;">
                    <div
                      class="table-area__content__cell"
                    >{{ item['change'] > 0 ? '+' + item['change'] : item['change'] }}</div>
                  </td>
                  <td style="width: 27%;">
                    <div class="table-area__content__cell">{{ item['lastModifyTime'] }}</div>
                  </td>
                </tr>
              </template>
            </tbody>
            <tbody v-else>
              <tr>
                <td :colspan="0" class="empty-data">没有数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="table-area__container">
        <div class="table-area__table-head">
          <img class="table-area__table-head__icon" src="../../assets/svg/ic_jfph.svg" alt />
          <span class="table-area__table-head__title">个人积分排行榜</span>
          <div class="table-area__container__head__search">
            <Input
              type="text"
              v-model="userListData.keyword"
              placeholder="输入姓名 回车 查找"
              clearable
              @on-keydown="searchUserList"
              @on-change="keywordChange"
            >
              <span slot="prepend">
                <Icon type="ios-search-strong" size="20"></Icon>
              </span>
            </Input>
          </div>
          <div
            class="table-area__container__head__export"
            v-if="!!btnRole.scoreExport"
          >
            <Upload class="btn" name="excelFile"  :action="attendApi" accept=".xlsx, .xls" :headers="{'Authorization': 'Bearer ' + $cookie.get('token')}" :on-success="uploadSuccess"   :show-upload-list="false">
              <img class="table-area__container__head__export__rotate" src="../../assets/svg/ic_derive.svg" alt="导出" />
              <span>导入</span>
            </Upload>

            <img @click="derive" src="../../assets/svg/ic_derive.svg" alt="导出" />
            <span @click="derive">导出</span>
          </div>
        </div>
        <table class="table-area__content">
          <thead class="table-area__content__thead no-left-right-border">
            <tr>
              <th class="table-area__content__th" width="7.6%">排名</th>
              <th class="table-area__content__th" width="15%">姓名</th>
              <th class="table-area__content__th" width="19.7%">学院</th>
              <th class="table-area__content__th" width="14.4%">专业</th>
              <th class="table-area__content__th" width="12.4%">事业部</th>
              <th class="table-area__content__th" width="14.4%">当前积分</th>
              <th class="table-area__content__th" width="14.4%">累计积分</th>
              <template v-if="!!btnRole.scoreView || !!btnRole.scoreEdit">
                <th class="table-area__content__th" width="19.5%">日志操作</th>
              </template>
            </tr>
          </thead>
        </table>
        <div
          id="list-point-area"
          :class="{ 'scrollable-area': true, 'scrollable-flex': !(userRank.length > 0) }"
        >
          <table class="table-area__content">
            <tbody class="table-area__content__tbody" v-if="userRank.length > 0">
              <template v-for="(item, index) in userRank">
                <tr v-bind:key="index" class="no-left-right-border">
                  <td style="width: 7.6%; padding-left: 0;" v-if="item['paiming'] === 1">
                    <div class="table-area__content__cell">
                      <img src="../../assets/svg/ic_champion.svg" alt />
                    </div>
                  </td>
                  <td style="width: 7.6%; padding-left: 0;" v-else-if="item['paiming'] === 2">
                    <div class="table-area__content__cell">
                      <img src="../../assets/svg/ic_runner_up.svg" alt />
                    </div>
                  </td>
                  <td style="width: 7.6%; padding-left: 0;" v-else-if="item['paiming'] === 3">
                    <div class="table-area__content__cell">
                      <img src="../../assets/svg/ic_third_place.svg" alt />
                    </div>
                  </td>
                  <td style="width: 7.6%;" v-else>
                    <div class="table-area__content__cell">{{ item['paiming'] }}</div>
                  </td>
                  <td style="width: 15%;">
                    <div class="table-area__content__cell">{{item['name']}}</div>
                  </td>
                  <td style="width: 19.7%;">
                    <div class="table-area__content__cell">{{item['collegeName']}}</div>
                  </td>
                  <td style="width: 14.4%;">
                    <div class="table-area__content__cell">{{item['studyName']}}</div>
                  </td>
                  <td style="width: 12.4%;">
                    <div class="table-area__content__cell">{{item['teamName']}}</div>
                  </td>
                  <td style="width: 14.4%;">
                    <div class="table-area__content__cell">{{item['integral']}}</div>
                  </td>
                  <td style="width: 14.4%;">
                    <div class="table-area__content__cell">{{item['scoreAll']}}</div>
                  </td>

                  <template v-if="!!btnRole.scoreView || !!btnRole.scoreEdit">
                    <td style="width: 18.6%;">
                      <div class="table-area__content__cell">
                        <a class="check" @click="check(item)" v-if="!!btnRole.scoreView">查看</a>
                        <a class="edit" @click="edit(item)" v-if="!!btnRole.scoreEdit">编辑</a>
                      </div>
                    </td>
                  </template>
                </tr>
              </template>
            </tbody>
            <tbody v-else>
              <tr>
                <td :colspan="0" class="empty-data">没有数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Modal class="point-modal" v-model="showEdit" :mask-closable="false" width="540">
      <p slot="header" class="point-header">{{ currentUser.name.replace(/\s[a-zA-Z]*/g, '') }} 的积分编辑</p>
      <div class="point-edit-area">
        <label for="point-number" class="point-edit-area__label">
          <span>本次增减积分数量</span>
          <input
            class="point-edit-area__input"
            id="point-number"
            type="text"
            v-model="pointNum"
            placeholder="请输入积分数量"
          />
        </label>

        <label for="point-source" class="point-edit-area__label">
          <span>积分来源</span>
          <input
            class="point-edit-area__input"
            type="text"
            id="point-source"
            v-model="reasonStr"
            placeholder="请输入积分来源"
          />
        </label>
      </div>

      <div slot="footer" class="point-edit-area__footer">
        <button class="point-edit-area__footer__cancel" @click="hideModal">取消</button>
        <button class="point-edit-area__footer__confirm" @click="changePoint">确定</button>
      </div>
    </Modal>

    <Modal
      footer-hide
      class="point-modal"
      v-model="showCheck"
      :mask-closable="false"
      @on-cancel="hideModal"
      width="540"
    >
      <p slot="header" class="point-header">{{ currentUser.name.replace(/\s[a-zA-Z]*/g, '') }} 的积分日志</p>
      <div class="point-log-area">
        <div class="table-area__container no-bottom-border">
          <div class="table-area__title">积分总和：{{ currentUser.integral }}</div>
          <table class="table-area__content">
            <thead class="table-area__content__thead no-left-right-border">
              <tr>
                <th class="table-area__content__th" width="21.8%">来源</th>
                <th class="table-area__content__th" width="14.6%">积分数量</th>
                <th class="table-area__content__th" width="28.2%">时间</th>
                <th class="table-area__content__th" width="12.6%" v-if="!!btnRole.scoreDel">操作</th>
              </tr>
            </thead>
          </table>
          <div
            :class="{ 'scrollable-area': true, 'scrollable-flex': !(showContent.length > 0) }"
            style="height: 272px;"
          >
            <table class="table-area__content">
              <tbody class="table-area__content__tbody" v-if="showContent.length > 0">
                <template v-for="(item, index) in showContent">
                  <tr v-bind:key="index" class="no-left-right-border">
                    <td style="width: 21.8%;">
                      <div class="table-area__content__cell">{{ item['reason'] }}</div>
                    </td>
                    <td style="width: 14.6%;">
                      <div
                        class="table-area__content__cell"
                      >{{ item['change'] > 0 ? '+' + item['change'] : item['change'] }}</div>
                    </td>
                    <td style="width: 28.2%;">
                      <div class="table-area__content__cell">{{ item['lastModifyTime'] }}</div>
                    </td>
                    <td style="width: 12.6%;" v-if="!!btnRole.scoreDel">
                      <div class="table-area__content__cell">
                        <a class="check" @click="cancel(item)" v-if="item['bindLogId'] === 0">删除</a>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
              <tbody v-else>
                <tr>
                  <td :colspan="0" class="empty-data">没有数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
import { Point, Hr } from "../../API/api";
import Toast from "../../components/popup/Toast";
import Loading from "../../components/popup/Loading";

export default {
  name: "",
  components: { Toast, Loading },
  computed: {},
  beforeDestroy() {
    this.canLoadMore = false;
    this.rightTableDOM.removeEventListener("scroll");
  },
  mounted() {
    this.rightTableDOM = document.getElementById("list-point-area");
    this.chDOM = document.getElementById("main-content");
    this.loadMore();
  },
  created() {
    this.getRole();
    this.collegeList();
    this.myPoint();
    this.userList();
  },
  methods: {
    uploadSuccess (res) {
        let _data = res
        if (_data.retCode === 0) {
          this.toastMsg = '导入成功'
        } else {
          this.toastMsg = _data.retMsg
        }
        this.isToast = true
        setTimeout(() => {
          this.isToast = false
          this.toastMsg = null
          if (_data.retCode === 100014) {
            this.$cookie.delete('token')

            this.$router.push('/')
          }
          if (_data.retCode === 0) {
            this.collegeList();
            this.myPoint();
            this.userList();
          }
        }, 1500)
      },
    loadMore() {
      this.rightTableDOM &&
        this.rightTableDOM.addEventListener("scroll", this.rightScroll);
    },
    rightScroll() {
      // if (this.canLoadMore && this.rightTableDOM.scrollTop + this.rightTableDOM.offsetHeight >= this.chDOM.offsetHeight && !this.isLoading) {
      //   this.userListData.page++;
      //   this.userList();
      // }
    },
    searchUserList(e) {
      if (e.keyCode === 13) {
        this.userList();
      }
    },
    keywordChange() {
      if (this.userListData.keyword === "") {
        this.userList();
      }
    },
    cancel(item) {
      this.isLoading = true;
      this.$http
        .post(Point.cancel, this.qs.stringify({ logId: item.id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data } = res;
          if (data.retCode === 0) {
            this.collegeList();
            this.myPoint();
            this.userList();

            this.$http
              .post(Point.view, this.qs.stringify({ userId: item.userId }), {
                headers: {
                  Authorization: "Bearer " + this.$cookie.get("token")
                }
              })
              .then(res => {
                this.isLoading = false;
                let { data: _data } = res;
                if (_data.retCode === 0) {
                  this.currentUser.integral = data.retData.integral;
                  this.showContent = _data.retData.data;
                }
              });
          }
        });
    },
    check(item) {
      this.currentUser = item;
      this.$http
        .post(
          Point.view,
          this.qs.stringify({ userId: item.id, pageSize: 10000 }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            this.count = _data.retData.count;
            this.showContent = _data.retData.data;
          }
        });
      this.showCheck = true;
    },
    edit(item) {
      this.showEdit = true;
      this.currentUser = item;
    },
    hideModal() {
      this.showEdit = false;
      this.pointNum = "";
      this.reasonStr = "";
    },
    changePoint() {
      this.isLoading = true;
      const { id: userId } = this.currentUser;
      const { reasonStr: reason, pointNum: integral } = this;
      this.$http
        .post(
          Point.changePoint,
          this.qs.stringify({
            userId,
            integral,
            reason
          }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            this.collegeList();
            this.userList();
            this.hideModal();
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.isToast = false;
            this.myPoint();
          }, 2000);
        });
    },
    userList() {
      this.$http
        .post(Point.userList, this.qs.stringify(this.userListData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            this.userRank = _data.retData.user_integral_list.data;
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");
              this.$router.push("/");
            }
          }, 1500);
        });
    },
    collegeList() {
      this.$http
        .post(Point.collegeList, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            this.collegeRank = _data.retData.college.slice(0, 3);
          }
        });
    },
    myPoint() {
      this.$http
        .post(Point.viewMy, this.qs.stringify({ pageSize: 1000 }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            const { integral, my_integral_logs } = _data.retData;
            const { data } = my_integral_logs;
            this.showPoint = integral;
            this.personPoint = data;
          }
        });
    },
    getRole() {
      this.$http
        .post(Point.role, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            this.role = _data.retData.isNccAdmin;
            this.btnRole = _data.retData;
          }
        });
    },
    derive() {
      this.$http
        .post(Point.expo, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let { data: _data } = res;
          if (_data.retCode === 0) {
            const { download_url } = _data.retData;
            const aDom = document.createElement("a"); // 创建标签
            const evt = document.createEvent("HTMLEvents"); // 创建事件
            evt.initEvent("click", false, false); // 初始化事件，绑定点击事件，不冒泡，不阻止浏览器默认行为
            // aDom.download = e.fileName;
            aDom.href = encodeURI(download_url); // 对地址进行编码
            aDom.dispatchEvent(evt); // 触发事件
            aDom.click();
            // !!download_url && window.open(download_url);
          }
        });
    }
  },
  data() {
    return {
      role: false,
      btnRole: {},
      showPoint: 0,
      myPointData: {
        page: 1,
        pageSize: 16
      },
      userListData: {
        pageSize: 10000,
        keyword: ""
      },
      isLoadMore: true,
      canLoadMore: true,
      rightTableDOM: null,
      chDOM: null,
      isLoading: false,
      isToast: false,
      toastMsg: "",
      pointNum: "",
      reasonStr: "",
      personPoint: [],
      userRank: [],
      collegeRank: [],
      showContent: [],
      currentUser: { name: "" },
      showEdit: false,
      showCheck: false,
      attendApi: '/' + Hr.importscore,
    };
  }
};
</script>

<style scoped lang="less">
.my-points-bar {
  border-radius: 0 4px 4px 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  margin-bottom: 24px;

  .my-points-bar__left {
    display: flex;
    flex-direction: row;
    align-items: center;

    .my-points-bar__left__point-area__icon {
      margin-right: 4px;
    }

    .my-points-bar__left__point-area__point {
      font-weight: bold;
      font-size: 24px;
      color: #343a40;
    }

    .my-points-bar__title {
      font-size: 14px;
      color: #868e96;
    }
  }
}

.academy-point-area {
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 24px;

  .academy-point-area__title {
    border-bottom: 1px solid #ced4da;
    padding-top: 9px;
    padding-left: 22px;
    padding-bottom: 9px;
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
    }

    span {
      margin-left: 8px;
      color: #303030;
      font-size: 16px;
    }
  }

  .academy-point-area__academies {
    display: flex;
    flex-direction: row;
    width: 100%;

    .academy-point-area__academies__item {
      position: relative;
      width: 33.3%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 24px;
      margin-left: 20px;
      padding-bottom: 20px;

      .vertical-line {
        width: 1px;
        height: 84px;
        background-color: #ced4da;
        position: absolute;
        right: 0;
      }

      .academy-point-area__academies__item__left {
        position: relative;
        width: 80px;
        height: 80px;

        .academy-point-area__academies__item__left__hat {
          position: absolute;
          width: 40px;
          height: 40px;
          transform: translate(-50%, -50%);
          left: 50%;
          top: -14%;
        }

        .academy-point-area__academies__item__left__logo {
          position: absolute;
          width: 84px;
          height: 84px;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 80px;
            height: 80px;
          }
        }
      }

      .academy-point-area__academies__item__right {
        margin-left: 24px;

        div:first-child {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.85);
        }

        div:last-child {
          display: flex;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
          }

          span {
            font-size: 20px;
            color: #343a40;
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.table-area {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.table-area__container {
  border: 1px solid #ced4da;
  border-radius: 4px 4px 0 0;

  .table-area__title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 9px;
    padding-top: 9px;
    font-weight: bold;
    font-size: 16px;
    color: #0091ff;
  }

  &:first-child {
    width: 65%;
    margin-right: 12px;
  }

  &:last-child {
    width: 100%;
    margin-left: 12px;
  }

  .table-area__table-head {
    position: relative;
    font-size: 16px;
    color: #303030;
    font-weight: bold;
    padding-bottom: 9px;
    padding-top: 9px;
    display: flex;
    align-items: center;

    .table-area__table-head__icon {
      margin-left: 21px;
      width: 16px;
      height: 16px;
    }

    .table-area__table-head__title {
      margin-left: 7px;
      height: 32px;
      line-height: 32px;
    }

    .table-area__container__head__search {
      margin-left: 15px;
    }

    .table-area__container__head__export {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 14px;
      color: #868e96;
      display: flex;
      align-items: center;
      height: 32px;
      line-height: 32px;
      cursor: pointer;

      img {
        width: 12px;
        height: 12px;
        margin-left: 10px;
      }

      span {
        margin-left: 4px;
      }
      span:hover {
        color: #2d8cf0;
      }

      &__rotate {
        transform: rotate(180deg);
      }
    }
  }

  .scrollable-flex {
    display: flex;
    align-items: center;
  }

  .scrollable-area {
    overflow-y: scroll;
    height: 310px;
    border-bottom: 1px solid #ced4da;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #2d8ef8;
    }

    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: #d8d8d8;
    }
  }

  .table-area__content {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;

    .table-area__content__thead {
      background-color: #f8f9fa;
      border: 1px solid #ced4da;
    }

    .table-area__content__th {
      border-right: 1px solid #ced4da;

      &:last-child {
        border-right: none;
      }

      font-size: 14px;
      color: #868e96;
      text-align: left;
      padding: 6px 0 6px 10px;
    }

    .table-area__content__tbody {
      tr {
        border: 1px solid #ced4da;
        border-top: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;

        td {
          &:first-child {
            padding-left: 8px;
          }
        }
      }

      .table-area__content__cell {
        font-size: 14px;
        color: #495057;
        padding: 12px 0 12px 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        a {
          &:first-child {
            margin-right: 10px;
          }

          &:last-child {
            margin-left: 10px;
          }
        }
      }
    }
  }
}

.point-header {
  text-align: center;
  font-size: 18px;
  color: #343a40;
}

.point-edit-area {
  display: flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    margin-bottom: 32px;
  }

  .point-edit-area__label {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-size: 14px;
    color: #495057;

    .point-edit-area__input {
      margin-top: 10px;
      font-size: 14px;
      color: #adb5bd;
      background: white;
      border: 1px solid #ced4da;
      border-radius: 4px;
      padding: 10px 0 10px 15px;
      width: 426px;
    }
  }
}

.point-edit-area__footer {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .point-edit-area__footer__confirm {
    border-radius: 4px;
    border: none;
    width: 120px;
    height: 48px;
    background-color: #2d8ef8;
    color: white;
    font-size: 16px;
  }

  .point-edit-area__footer__cancel {
    border-radius: 4px;
    font-size: 16px;
    border: 1px solid #2d8ef8;
    width: 120px;
    height: 48px;
    color: #2d8ef8;
    margin-right: 12px;
  }
}

.point-log-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.no-top-border {
  border-top: none !important;
}

.no-left-right-border {
  border-left: none !important;
  border-right: none !important;
}

.no-bottom-border {
  border-bottom: none !important;
}

.point-btn {
  text-align: right;

  a {
    background-color: #2d8ef8;
    display: inline-block;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
  }
}

.empty-data {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
