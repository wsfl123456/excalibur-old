<template>
  <div class="ncc-book ncc-book__create">
    <div class="area">
      <Crumb :crumb="crumb" />

      <div class="card answer-card" style="">
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
                    social(
                      {
                        opType: 2,
                        objectType: 'tiwen',
                        objectId: questionDetail.tiwenId,
                      },
                      questionDetail
                    )
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
                    social(
                      {
                        opType: 1,
                        objectType: 'tiwen',
                        objectId: questionDetail.tiwenId,
                      },
                      questionDetail
                    )
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
                <span class="link" @click="inviteQuestionId = tiwenId">邀请回答</span>
              </div>
            </div>
          </div>
        </div>
        <el-form
          :model="formParams"
          :rules="rules"
          label-position="top"
          ref="ruleForm"
        >
          <div
            class="form-file"
            v-for="(i, k) in formParams.fileContent"
            :key="k"
          >
            <div class="operate">
              <div class="upload">
                <div style="display: flex">
                  <el-upload
                    action="/api/ueditor/index?action=uploadfile&encode=utf-8"
                    :show-file-list="false"
                    :before-upload="handleBeforeUpload"
                    :on-success="
                      (response, file, fileList) => handleSuccess(file, k)
                    "
                    :on-error="handleError"
                    class="left15"
                  >
                    <div v-if="!i.filePath">
                      <el-button icon="el-icon-upload2" type="text"
                        >上传文件</el-button
                      >
                      <span
                        style="
                          color: #b2b2b2;
                          line-height: 20px;
                          font-size: 14px;
                        "
                        >（文件最大50MB，支持ppt、pdf、word、excel等格式）</span
                      >
                    </div>
                  </el-upload>

                  <el-button
                    v-if="i.filePath"
                    icon="el-icon-delete-solid"
                    type="text"
                    class="red-important"
                    @click="clearFile(k)"
                    >清空文件</el-button
                  >
                  <el-input v-if="i.filePath" v-model="i.fileName"></el-input>
                </div>
              </div>
              <div class="summary">
                <quill-editor
                  :ref="`answerEditor`"
                  v-model="formParams.content"
                  class="editor"
                  :options="editOpt"
                ></quill-editor>

                <!-- 用于将图片base64转url -->
                <el-upload
                  :show-file-list="false"
                  :on-success="
                    (res) => {
                      handleEditSuccess(res, k);
                    }
                  "
                  :max-size="2048"
                  multiple
                  action="/api/ueditor/index?action=uploadfile&encode=utf-8"
                >
                  <el-button
                    :class="{ [`quillUpload`]: true }"
                    icon="el-icon-upload2"
                    type="text"
                  ></el-button>
                </el-upload>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="btn-group">
        <div class="custom-btn custom-btn--primary" @click="judgeForm">
          提交审核
        </div>
      </div>
    </div>

    <InviteAnswer v-show="inviteQuestionId" :inviteQuestionId.sync="inviteQuestionId" />

  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import Crumb from "@/components/Crumb";
import { Message } from "element-ui";
import merge from "deepmerge";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { editorOptions } from "../../util/util";
import MemberHeader from "../../components/popup/MemberHeader";
import InviteAnswer from "./InviteAnswer"

export default {
  name: "AnswerCreate",
  components: { Crumb, quillEditor, MemberHeader, InviteAnswer },

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
          label: "我有答案",
          pathName: "",
        },
      ],
      questionDetail: {},
      formParams: {
        fileContent: [
          {
            fileName: "",
            filePath: "",
            fileSize: "",
          },
        ],
        content: "",
      },
      inviteQuestionId: null,
      rules: {
        // studyId: [{ required: true, message: "请选择专业", trigger: "blur" }],
        // viewScope: [{ required: true, message: "请选择分组", trigger: "blur" }],
        // shuxingId: [
        //   { required: true, message: "请选择问题属性", trigger: "blur" },
        // ],
        // content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      /* 富文本配置项 */
      editOpt: {
        ...merge(editorOptions, {
          modules: {
            toolbar: {
              handlers: {
                image(value) {
                  if (value) {
                    // 调用图片上传
                    const document = window.document;
                    document
                      .querySelector(".ncc-book__create .summary .el-upload .el-button")
                      .click();
                  } else {
                  }
                },
              },
            },
          },
        }),
      },
    };
  },
  computed: {
    tiwenId() {
      return this.$route.params.tiwenId;
    },
  },
  async created() {
    const questionDetailRes = await this.getQuestionDetail();
    this.questionDetail = questionDetailRes.data.retData.tipsInfo;
  },
  methods: {
    handleBeforeUpload(file) {
      if (file.size > 1024 * 1000 * 50) {
        MessageBox.confirm(
          `<div class="upload-error-wrapper">
        <span class="upload-fail-img"></span>
        <p class="error-msg">很抱歉，文件超过50MB</p>
        <p class="error-msg">您可以重新上传</p>
      </div>`,
          {
            dangerouslyUseHTMLString: true,
          }
        );

        return false;
      }
      return true;
    },
    handleSuccess(file, k) {
      this.formParams.fileContent[k].fileName = file.name;
      this.formParams.fileContent[k].filePath = file.response;
      this.formParams.fileContent[k].fileSize = file.size;
      Message.success("上传成功");
    },
    handleError() {
      Message.error("上传失败");
    },
    clearFile(k) {
      this.formParams.fileContent[k].fileName = "";
      this.formParams.fileContent[k].filePath = "";
      this.formParams.fileContent[k].summary = "";
      this.formParams.fileContent[k].fileSize = "";
    },
    handleEditSuccess(res, k) {
      // 获取富文本组件实例
      const mapEditor = this.$refs[`answerEditor`][0];
      const { quill } = mapEditor;

      this.$nextTick(() => {
        // 如果上传成功
        if (res) {
          // 获取光标所在位置
          const length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, "image", res);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          // 提示信息，需引入Message
          Message.error("图片插入失败");
        }
      });
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
            break;
          case 2:
            curItem.isZan = 1;
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
    /* 表单校验 */
    judgeForm() {
      if (this.formParams.content) this.saveQuestion();
      else Message.warning({
          message: "请输入回答内容"
      })
    },
    async saveQuestion() {
      const res = await this.$http.post(
        NccBook.huidaadd,
        this.qs.stringify({ ...this.formParams, ...{ tiwenId: this.tiwenId } }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
      if (res.data.retCode === 0) {
        Message.success({
          message: "提交成功",
        });
        this.$router.push({ name: "nccBookQuestion" });
      } else {
        Message.success({
          message: res.data.retMsg,
        });
      }
    },
    getQuestionDetail() {
      return this.$http.post(
        NccBook.tiwendetailfront,
        this.qs.stringify({ tiwenId: this.tiwenId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
  },
};
</script>

<style scoped lang="less">
</style>
