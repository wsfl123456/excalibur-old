<template>
  <div class="ncc-book__create">
    <div class="area">
      <div class="card">
        <h3>打造皇家兵器</h3>
        <el-form
          :model="formParams"
          :rules="rules"
          label-position="top"
          ref="ruleForm"
        >
          <div class="form-item">
            <el-form-item label="标题名称" prop="title">
              <el-input
                v-model="formParams.title"
                placeholder="请输入标题名称"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="学院" prop="collegeId">
              <el-select
                v-model="formParams.collegeId"
                placeholder="请选择学院"
                @change="handleCollgeChange"
              >
                <el-option
                  v-for="(i, k) in collegeList"
                  :label="i.title"
                  :value="Number(i.collegeId)"
                  :key="k"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="studyId">
              <el-select v-model="formParams.studyId" placeholder="请选择专业">
                <el-option
                  v-for="(i, k) in collegestudylist"
                  :label="i.title"
                  :value="Number(i.studyId)"
                  :key="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="分组" prop="viewScope">
              <el-radio-group v-model="formParams.viewScope">
                <el-radio :label="1">全员可见</el-radio>
                <el-radio :label="2">队长可见</el-radio>
                <el-radio :label="3">队长/副队长</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="属性" prop="shuxingId">
              <el-radio-group v-model="formParams.shuxingId">
                <el-radio
                  :label="i.shuxingId"
                  v-for="(i, k) in shuxingList"
                  :key="k"
                  >{{ i.shuxingName }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </div>

          <div class="label"><span>*</span>上传文件</div>
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
                  :ref="`storeEditor${k}`"
                  v-model="i.summary"
                  class="editor"
                  :options="editOptList[k].editOpt"
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
                    :class="{ [`quillUpload${k}`]: true }"
                    icon="el-icon-upload2"
                    type="text"
                  ></el-button>
                </el-upload>
              </div>
            </div>

            <div class="text-right">
              <el-button
                icon="el-icon-remove"
                type="text"
                class="red-important"
                @click="removeFile(k)"
                v-if="formParams.fileContent.length > 1"
                >删除文件</el-button
              >
              <el-button
                icon="el-icon-circle-plus"
                type="text"
                @click="addFile"
                v-if="formParams.fileContent.length === k + 1"
                >添加文件</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
      <div class="btn-group">
        <div
          v-if="!isEditMode || formParams.btnSave_visible === 'show'"
          class="custom-btn custom-btn--default"
          @click="judgeForm(1)"
        >
          保存
        </div>
        <div
          v-if="!isEditMode || formParams.btnApply_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="judgeForm(2)"
        >
          提交审核
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import { editorOptions } from "../../util/util";
import { Message, MessageBox } from "element-ui";
import merge from "deepmerge";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const editOptItem = (k) => {
  return {
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
                    .querySelector(
                      `.ncc-book__create .el-upload .quillUpload${k}`
                    )
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
};

export default {
  name: "StoreCreate",
  components: { quillEditor },
  data() {
    return {
      isEditMode: false,
      shuxingList: [],
      formParams: {
        collegeId: null,
        studyId: null,
        viewScope: 1,
        shuxingId: 3,
        title: "",
        opType: null,
        fileContent: [
          {
            fileName: "",
            filePath: "",
            summary: "",
            fileSize: "",
          },
        ],
      },
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        collegeId: [{ required: true, message: "请选择学院", trigger: "blur" }],
        studyId: [{ required: true, message: "请选择专业", trigger: "blur" }],
        viewScope: [{ required: true, message: "请选择分组", trigger: "blur" }],
        shuxingId: [{ required: true, message: "请选择属性", trigger: "blur" }],
      },
      collegeList: [],
      collegestudylist: [],
      /* 富文本配置项 */
      editOptList: [],
    };
  },
  computed: {
    storeId() {
      return this.$route.query.storeId;
    },
  },
  async created() {
    if (this.$route.query.storeId) this.isEditMode = true; // 进入编辑模式

    await Promise.all([
      (async () => {
        const collegeRes = await this.getCollegeList();
        const defaultCollege = [
          {
            collegeId: "0",
            title: "全部",
            item: [],
          },
        ];
        this.collegeList = [...defaultCollege, ...collegeRes.data.retData.data];
      })(),
      (async () => {
        const storeDetailRes = await this.getStoreDetail();
        this.formParams = {
          ...this.formParams,
          ...storeDetailRes.data.retData.tipsInfo,
        };

        this.formParams.fileContent.map((i, k) => {
          this.editOptList.push(editOptItem(k));
        });

        const storeshuxinglistRes = await this.getStoreshuxinglist();
        this.shuxingList = storeshuxinglistRes.data.retData.shuxingList;

        if (this.formParams.collegeId) {
          const collegestudylistRes = await this.getCollegeStudyList(
            this.formParams.collegeId
          );
          const defaultStudy = [
            {
              studyId: "0",
              title: "全部",
            },
          ];
          this.collegestudylist = [
            ...defaultStudy,
            ...collegestudylistRes.data.retData.data,
          ];
        } else if (this.formParams.collegeId === 0) {
          this.collegestudylist = [
            {
              studyId: "0",
              title: "全部",
            },
          ];
        }
      })(),
    ]);
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
    removeFile(k) {
      this.formParams.fileContent.splice(k, 1);
      this.fileList.splice(k, 1);
      this.editOptList = []; // 每次删除文件都要清空配置列表
      this.formParams.fileContent.map((i, k) => {
        this.editOptList.push(editOptItem(k));
      });
    },
    addFile() {
      this.formParams.fileContent.push({
        fileName: "",
        filePath: "",
        summary: "",
        fileSize: "",
      });
      this.editOptList.push(
        editOptItem(this.formParams.fileContent.length - 1)
      );
    },
    handleEditSuccess(res, k) {
      // 获取富文本组件实例
      const mapEditor = this.$refs[`storeEditor${k}`][0];
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
    async handleCollgeChange(collegeId) {
      this.formParams.studyId = null;
      const defaultStudy = [
        {
          studyId: "0",
          title: "全部",
        },
      ];

      if (collegeId !== 0) {
        const collegestudylistRes = await this.getCollegeStudyList(collegeId);

        this.collegestudylist = [
          ...defaultStudy,
          ...collegestudylistRes.data.retData.data,
        ];
      } else {
        this.collegestudylist = defaultStudy;
      }
    },
    /* 属性列表 */
    getStoreshuxinglist() {
      return this.$http.post(NccBook.storeshuxinglist, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* store详情 */
    getStoreDetail() {
      return this.$http.post(
        NccBook.storedetailfront,
        this.qs.stringify({ storeId: this.storeId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 获取学院列表 */
    getCollegeList() {
      return this.$http.post(NccBook.collegelist, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 获取专业列表 */
    getCollegeStudyList(collegeId) {
      return this.$http.post(
        NccBook.collegestudylist,
        this.qs.stringify({ collegeId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 表单校验 */
    judgeForm(opType) {
      let formVaild = true;
      this.$refs["ruleForm"].validate((vaild, obj) => {
        if (!vaild) {
          for (const prop in obj) {
            if (
              !this.formParams[prop] ||
              (Array.isArray(this.formParams[prop]) &&
                !this.formParams[prop].length)
            ) {
              Message.warning({
                message: obj[prop][0].message,
              });
              formVaild = false;
              break;
            }
          }
        }
      });
      /* 校验上传文件 */
      if (formVaild) {
        const vaild = !this.formParams.fileContent.some((e) => {
          if (!e.filePath) {
            Message.warning({
              message: "请上传文件",
            });
            return true;
          }
          if (!e.summary) {
            Message.warning({
              message: "请输入文件内容",
            });
            return true;
          }
        });
        if (vaild) this.saveStore(opType);
      }
    },
    async saveStore(opType) {
      const url = this.isEditMode ? NccBook.storeedit : NccBook.storeadd;
      this.formParams.opType = opType;

      const res = await this.$http.post(
        url,
        this.qs.stringify(this.formParams),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
      if (res.data.retCode === 0) {
        Message.success({
          message: "提交成功",
        });
        this.$router.push({ name: "nccBookStore" });
      } else {
        Message.success({
          message: res.data.retMsg,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
