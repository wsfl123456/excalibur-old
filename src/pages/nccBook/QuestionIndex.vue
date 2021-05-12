<template>
  <div class="ncc-book ncc-book__index">
    <div class="wrapper">
      <div class="left">
        <div class="title">
          <h3>问题悬赏榜</h3>
          <div>
            <div
              class="add-btn"
              @click="$router.push({ name: 'nccBookQuestionCreate' })"
            >
              <i class="el-icon-circle-plus"></i>
              <span>我要提问</span>
            </div>
          </div>
        </div>
        <div class="filter">
          <div>
            <div class="label">排序：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.bangdan === i.val,
                }"
                v-for="(i, k) in bangdanList"
                :key="k"
                @click="
                  searchParams.bangdan = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">属性：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.shuxingId === i.val,
                }"
                v-for="(i, k) in shuxingList"
                :key="k"
                @click="
                  searchParams.shuxingId = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">学院：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.collegeId === i.val,
                }"
                v-for="(i, k) in collegeList"
                :key="k"
                @click="
                  searchParams.collegeId = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">状态：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.actionType === i.val,
                }"
                v-for="(i, k) in actionTypeList"
                :key="k"
                @click="
                  searchParams.actionType = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
        </div>
        <!-- filter - end -->

        <div class="wrap-content">
          <!-- list - start -->
          <div
            class="question-list"
            :class="{
              'question--no__result': !questionList || !questionList.length,
            }"
          >
            <template v-if="!!questionList && !!questionList.length">
              <div
                class="question-item"
                v-for="(i, k) in questionList"
                :key="k"
              >
                <div class="question-header">
                  <div class="top">
                    <h4>{{ i.content }}</h4>
                    <div>
                      <span class="num">{{ i.huidaCount }}个回答</span>
                      <a @click="foldAnswer(k)" class="fold">
                        <template v-if="visibleAnswerList[k]">
                          收起<i class="el-icon-arrow-up"></i>
                        </template>
                        <template v-else>
                          展开<i class="el-icon-arrow-down"></i>
                        </template>
                      </a>
                    </div>
                  </div>
                  <div class="bom">
                    <div class="left">
                      <member-header
                        :user="{
                          id: i.creatorId,
                          name: i.creatorName,
                          headPic: i.creatorHeadPic,
                        }"
                        size="small"
                      ></member-header>
                      &nbsp;&nbsp;
                      <span>{{ i.creatorName }}</span>
                      <span>{{ i.lastModifyTime }}</span>
                    </div>
                    <div class="right" @click.stop>
                      <div>
                        <img
                          v-if="Number(i.isZan) === 0"
                          src="../../assets/images/nccBook/praise.png"
                          alt=""
                          @click="
                            social(
                              {
                                opType: 2,
                                objectType: 'tiwen',
                                objectId: i.tiwenId,
                              },
                              i
                            )
                          "
                        />
                        <img
                          style="cursor: unset"
                          v-else
                          src="../../assets/images/nccBook/praised.png"
                          alt=""
                        />
                        <span>好问题({{ i.zanCount }})</span>
                      </div>
                      <div>
                        <img
                          v-if="Number(i.isFollow) === 0"
                          src="../../assets/images/nccBook/attention.png"
                          alt=""
                          @click="
                            social(
                              {
                                opType: 1,
                                objectType: 'tiwen',
                                objectId: i.tiwenId,
                              },
                              i
                            )
                          "
                        />
                        <img
                          style="cursor: unset"
                          v-else
                          src="../../assets/images/nccBook/attentiond.png"
                          alt=""
                        />
                        <span v-if="Number(i.isFollow) === 0">关注问题</span>
                        <span v-else>已关注</span>
                      </div>
                      <div>
                        <img
                          src="../../assets/images/nccBook/invite.png"
                          alt=""
                        />
                        <span class="link" @click="inviteQuestionId = i.tiwenId">邀请回答</span>
                      </div>
                      <div
                        @click="
                          $router.push({
                            path: `/new/nccBook/answer/create/${i.tiwenId}`,
                          })
                        "
                      >
                        <img
                          src="../../assets/images/nccBook/edit.png"
                          alt=""
                        />
                        <span class="link">写答案</span>
                      </div>
                    </div>
                  </div>
                </div>

                <AnswerFold v-if="visibleAnswerList[k]" :questionInfo="i" />
              </div>
            </template>
            <template v-else>
              <div class="no-tips">
                <img src="../../assets/images/dri/noResult.png" alt="" />
                <p>暂无数据</p>
              </div>
            </template>
          </div>
          <!-- list - end -->
        </div>
      </div>
    </div>
    <InviteAnswer v-show="inviteQuestionId" :inviteQuestionId.sync="inviteQuestionId" />
  </div>
</template>
<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import MemberHeader from "../../components/popup/MemberHeader";
import { Message } from "element-ui";
import AnswerFold from "./AnswerFold";
import InviteAnswer from "./InviteAnswer"

export default {
  name: "QuestionIndex",
  components: { MemberHeader, AnswerFold, InviteAnswer },
  data() {
    return {
      searchParams: {
        bangdan: 0,
        shuxingId: 0,
        collegeId: 0,
        actionType: 0,
        pageSize: 99999,
      },
      questionList: [],
      visibleAnswerList: [], //用于控制展开回答
      bangdanList: [
        {
          val: 0,
          label: "全部",
        },
        {
          val: "new",
          label: "最新问题",
        },
        {
          val: "hot",
          label: "人气问题",
        },
      ],
      collegeList: [],
      shuxingList: [],
      statusList: [
        {
          val: 0,
          label: "全部",
        },
        {
          val: 1,
          label: "我创建的",
        },
        {
          val: 2,
          label: "待我审核",
        },
        {
          val: 4,
          label: "审核通过",
        },
        {
          val: 3,
          label: "审核不通过",
        },
      ],
      actionTypeList: [
        {
          val: 0,
          label: "全部",
        },
        {
          val: 1,
          label: "我提问的",
        },
        {
          val: 2,
          label: "我回答的",
        },
        {
          val: 3,
          label: "我关注的",
        },
      ],
      activeStatus: 0, //不合理的需求只能单独处理该筛选条件
      inviteQuestionId: null
    };
  },
  async created() {
    const defaultList = [
      {
        val: 0,
        label: "全部",
      },
    ];
    await Promise.all([
      (async () => {
        const collegeRes = await this.getCollegeList();
        const formatCollege = collegeRes.data.retData.data.map((e) => ({
          val: Number(e.collegeId),
          label: `${e.title}学院`,
        }));
        this.collegeList = [...defaultList, ...formatCollege];
      })(),
      (async () => {
        const shuxingRes = await this.getStoreshuxinglist();
        const formatShuxing = shuxingRes.data.retData.shuxingList.map((e) => ({
          val: Number(e.shuxingId),
          label: e.shuxingName,
        }));
        this.shuxingList = [...defaultList, ...formatShuxing];
      })(),
      (async () => {
        const questionListRes = await this.getQuestionList();
        this.questionList = questionListRes.data.retData.tipsList;
        this.visibleAnswerList = new Array(this.questionList.length).fill(
          false
        );
        /* 获取每个问题的答案，插入到questionList */
        this.questionList.forEach(async (i, k) => {
          const {
            data: {
              retData: {
                tipsInfo: { huidaArr },
              },
            },
          } = await this.getQuestionDetail(i.tiwenId);
          this.$set(i, "huidaArr", huidaArr);
        });
      })(),
    ]);
  },
  methods: {
    async foldAnswer(index) {
      this.visibleAnswerList.splice(index, 1, !this.visibleAnswerList[index]);
    },
    getQuestionDetail(tiwenId) {
      return this.$http.post(
        NccBook.tiwendetailfront,
        this.qs.stringify({ tiwenId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 关注点赞 */
    async social({ opType, objectType, objectId } = {}, curItem) {
      const {
        data: { retCode, retMsg },
      } = await (() => {
        return this.$http.post(
          NccBook.tiwensocial,
          this.qs.stringify({ opType, objectType, objectId }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        );
      })();

      if (retCode === 0) {
        switch (opType) {
          case 1:
            curItem.isFollow = 1;
            curItem.followCount = Number(curItem.followCount) + 1;
            break;
          case 2:
            curItem.isZan = 1;
            curItem.zanCount = Number(curItem.zanCount) + 1;
            break;
          default:
            break;
        }
      } else {
        Message.error({
          message: retMsg,
        });
      }
    },
    /* 获取提问列表 */
    getQuestionList() {
      return this.$http.post(
        NccBook.tiwenlistfront,
        this.qs.stringify(this.searchParams),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 获取学院列表 */
    getCollegeList() {
      return this.$http.post(
        NccBook.collegelist,
        this.qs.stringify({ collegeId: "1,2,3" }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 获取属性列表 */
    getStoreshuxinglist() {
      return this.$http.post(NccBook.tiwenshuxinglist, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 筛选条件改变回调 */
    async filterChange() {
      const questionListRes = await this.getQuestionList();
      this.questionList = questionListRes.data.retData.tipsList;
      this.visibleAnswerList = new Array(this.questionList.length).fill(false);
    },
    /* 对于状态改变单独处理 */
    changeStatus(val) {
      switch (val) {
        case 1:
          this.searchParams.auditorStatus = 0;
          this.searchParams.whoUserType = val;
          break;
        case 2:
          this.searchParams.auditorStatus = val;
          this.searchParams.whoUserType = val;
          break;
        default:
          this.searchParams.auditorStatus = val;
          this.searchParams.whoUserType = 0;
          break;
      }
      this.activeStatus = val;
      this.filterChange();
    },
    /* 下载文件 */
    downloadFile(i) {
      i.fileContent.forEach((e) => {
        const aDom = document.createElement("a"); // 创建标签
        const evt = document.createEvent("HTMLEvents"); // 创建事件
        evt.initEvent("click", false, false); // 初始化事件，绑定点击事件，不冒泡，不阻止浏览器默认行为
        aDom.download = e.fileName;
        aDom.href = encodeURI(e.filePath); // 对地址进行编码
        aDom.dispatchEvent(evt); // 触发事件
        aDom.click();
      });
    },
  },
};
</script>