<template>
  <div class="answer-fold">
    <template v-if="questionInfo.huidaArr && questionInfo.huidaArr.length">
      <div
        class="item"
        v-for="(i, k) in questionInfo.huidaArr.slice(0, 5)"
        :key="k"
      >
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
              @click="social(i)"
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
        <div class="item-body" @click="$router.push({ path: `/new/nccBook/question/detail/${questionInfo.tiwenId}` })">
          {{ replaceHtmlTag(i.content) }}
        </div>
      </div>
      <div class="to-more" v-if="questionInfo.huidaArr.length > 5" @click="$router.push({ path: `/new/nccBook/question/detail/${questionInfo.tiwenId}` })">
        <span>点击查看更多<i class="el-icon-arrow-right"></i></span>
      </div>
    </template>
    <template v-else>
      <div class="no-tips">
        <img src="../../assets/images/dri/noResult.png" alt="" />
        <p>暂无答案</p>
      </div>
    </template>
  </div>
</template>
<script>
import MemberHeader from "../../components/popup/MemberHeader";
import { NccBook } from "@/API/api";

export default {
  name: "AnswerFold",
  components: { MemberHeader },
  props: {
    questionInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    replaceHtmlTag(htmlStr) {
      htmlStr = htmlStr || "";
      return htmlStr.replace(/<[^>]+>|&nbsp;|&amp;/g, "");
    },
    /* 点赞 */
    async social(i) {
      const {
        data: { retCode, retMsg },
      } = await (() => {
        return this.$http.post(
          NccBook.tiwensocial,
          this.qs.stringify({
            opType: 2,
            objectType: "huida",
            objectId: i.tiwenId,
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        );
      })();

      if (retCode === 0) {
        i.isZan = 1;
        i.zanCount = Number(i.zanCount) + 1;
      } else {
        Message.error({
          message: retMsg,
        });
      }
    },
  },
};
</script>
<style lang="less">
.answer-fold {
  background-color: #f4f9ff;
  margin-top: 12px;
  padding: 24px 20px;
  .item {
    padding: 15px 0;
    border-top: 1px dashed #d9d9d9;
    &:first-child {
      padding-top: 0;
      border: none;
    }
    &-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: inline-flex;
        align-items: center;
        .name {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #343a40;
          line-height: 22px;
        }
      }
      > .right {
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        span {
          font-size: 14px;
          color: #4c4f54;
          line-height: 20px;
          margin-left: 3px;
        }
      }
    }
    &-body {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-indent: 24px;
      cursor: pointer;
      &:hover {
        color: #2D8EF8;
      }
      @media screen and (-webkit-min-device-pixel-ratio: 0) {
        & {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; /*截取第三行*/
          white-space: normal;
        }
      }
    }
  }
  .to-more {
    text-align: center;
    margin-top: 10px;

    span {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #2d8ef8;
      line-height: 22px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      i {
        margin-left: 6px;
      }
    }
  }
}
</style>
