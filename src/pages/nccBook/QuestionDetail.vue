<template>
  <div class="ncc-book ncc-book__detail">
    <div class="area">
      <Crumb :crumb="crumb" />
      <div class="card">
        <div class="title">
          <div class="question-header">
            <div class="top">
              <h4>{{ questionDetail.content }}</h4>
              <div>
                <span class="num">{{ questionDetail.huidaCount }}个回答</span>
              </div>
            </div>
            <div class="bom">
              <div class="left">
                <member-header
                  :user="{
                    id: questionDetail.creatorId,
                    name: questionDetail.creatorName,
                    headPic: questionDetail.creatorHeadPic,
                  }"
                  size="small"
                ></member-header>
                &nbsp;&nbsp;
                <span>{{ questionDetail.creatorName }}</span>
                <span>{{ questionDetail.lastModifyTime }}</span>
              </div>
              <div class="right" @click.stop>
                <div>
                  <img
                    v-if="Number(questionDetail.isZan) === 0"
                    src="../../assets/images/nccBook/praise.png"
                    alt=""
                    @click="
                      social({
                        opType: 2,
                        objectType: 'tiwen',
                        objectId: questionDetail.tiwenId,
                      })
                    "
                  />
                  <img
                    style="cursor: unset"
                    v-else
                    src="../../assets/images/nccBook/praised.png"
                    alt=""
                  />
                  <span>好问题({{ questionDetail.zanCount }})</span>
                </div>
                <div>
                  <img
                    v-if="Number(questionDetail.isFollow) === 0"
                    src="../../assets/images/nccBook/attention.png"
                    alt=""
                    @click="
                      social({
                        opType: 1,
                        objectType: 'tiwen',
                        objectId: questionDetail.tiwenId,
                      })
                    "
                  />
                  <img
                    style="cursor: unset"
                    v-else
                    src="../../assets/images/nccBook/attentiond.png"
                    alt=""
                  />
                  <span v-if="Number(questionDetail.isFollow) === 0"
                    >关注问题</span
                  >
                  <span v-else>已关注</span>
                </div>
                <div>
                  <img src="../../assets/images/nccBook/invite.png" alt="" />
                  <span class="link" @click="inviteQuestionId = questionDetail.tiwenId">邀请回答</span>
                </div>
                <div
                  @click="
                    $router.push({
                      path: `/new/nccBook/answer/create/${questionDetail.tiwenId}`,
                    })
                  "
                >
                  <img src="../../assets/images/nccBook/edit.png" alt="" />
                  <span class="link">写答案</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="question-content">
          <div class="item" v-for="(i, k) in questionDetail.huidaArr" :key="k">
            <div class="item-head">
              <div>
                <member-header
                  :user="{
                    id: i.creatorId,
                    name: i.creatorName,
                    headPic: i.creatorHeadPic,
                  }"
                  size="small"
                ></member-header>
                &nbsp;&nbsp;
                <span class="name">{{ i.creatorName }}</span>
              </div>
              <div class="right">
                <img
                  v-if="Number(i.isZan) === 0"
                  src="../../assets/images/nccBook/praise.png"
                  alt=""
                  @click="
                    social(
                      {
                        opType: 2,
                        objectType: 'huida',
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
                <span>赞同TA({{ i.zanCount }})</span>
              </div>
            </div>
            <div class="item-content">
              <div v-html="i.content"></div>
              <div>
                <div v-for="(file, fileK) in i.fileContent" :key="fileK">
                  <template v-if="file.fileName">
                    <div>
                      <div>
                        <p>{{ file.fileName }}</p>
                        <p class="size">{{ toSize(file.fileSize) }}</p>
                      </div>
                      <a :href="file.filePath" download>
                        <i class="el-icon-download"></i>
                        下载文件
                      </a>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <InviteAnswer v-show="inviteQuestionId" :inviteQuestionId.sync="inviteQuestionId" />
  </div>
</template>
<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import { bytesToSize } from "../../util/util";
import Crumb from "@/components/Crumb";
import MemberHeader from "../../components/popup/MemberHeader";
import { Message } from "element-ui";
import InviteAnswer from "./InviteAnswer"

export default {
  name: "QuestionDetail",
  components: { Crumb, MemberHeader, InviteAnswer },
  data() {
    return {
      crumb: [
        {
          label: "成长计划",
          pathName: "nccBookMap",
        },
        {
          label: "NCC小黄书",
          pathName: "nccBookMap",
        },
        {
          label: "问题悬赏榜",
          pathName: "nccBookQuestion",
        },
        {
          label: "详情页",
          pathName: "",
        },
      ],
      questionDetail: {},
      inviteQuestionId: null
    };
  },
  computed: {
    questionId() {
      return this.$route.params.questionId;
    },
  },
  async created() {
    const questionDetailRes = await this.getQuestionDetail();
    this.questionDetail = questionDetailRes.data.retData.tipsInfo;
  },
  methods: {
    getQuestionDetail() {
      return this.$http.post(
        NccBook.tiwendetailfront,
        this.qs.stringify({ tiwenId: this.questionId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* kb转mb */
    toSize(size) {
      return size ? bytesToSize(size) : "";
    },
    /* 关注点赞 */
    async social({ opType, objectType, objectId } = {}, huida) {
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
            this.questionDetail.isFollow = 1;
            this.questionDetail.followCount =  Number(this.questionDetail.followCount) + 1;
            break;
          case 2:
            if (objectType === "huida") {
              huida.isZan = 1;
              huida.zanCount = Number(huida.zanCount) + 1;
            } else {
              this.questionDetail.isZan = 1;
              this.questionDetail.zanCount =
                Number(this.questionDetail.zanCount) + 1;
            }
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
  },
};
</script>