<template>
  <div class="ncc-book__create">
    <div class="area">
      <div class="card">
        <h3>建设皇家屋</h3>
        <el-form
          :model="formParams"
          :rules="rules"
          label-position="top"
          ref="ruleForm"
        >
          <!-- 裁剪图片 -->
          <div v-if="previewImg" id="cropper">
            <div class="crop-box g-mb-16">
              <vueCropper
                ref="cropper"
                :img="previewImg"
                :outputSize="1"
                outputType="png"
                info
                canScale
                autoCrop
                :fixedNumber="[95, 57]"
                fixed
                full
                mode="380px 228px"
                @realTime="realTime"
              ></vueCropper>
            </div>
            <div class="g-ta-r">
              <el-button type="ghost" @click.native="cancelAvatar"
                >取消</el-button
              >
              <el-button
                type="primary"
                :loading="isUploadAvatar"
                @click.native="uploadAvatar"
                >
                {{ isUploadAvatar ? "上传中" : "确定" }}
                </el-button
              >
            </div>
          </div>
          <div class="house-layout">
            <div class="left">
              <div>
                <img
                  v-if="formParams.picture"
                  class="cover"
                  :src="formParams.picture"
                  alt=""
                />
                <img
                  v-else
                  class="cover"
                  src="../../assets/images/nccBook/upload-cover.jpg"
                  alt=""
                />
                <input
                  type="file"
                  id="selectImg"
                  accept="image/jpg, image/png, image/jpeg"
                  @change="selectImg"
                />
              </div>
              <p>
                <span>注：</span>建议图片尺寸为 （380px*228px）或宽高比为5:3的图
              </p>
            </div>
            <div class="right">
              <div class="form-item">
                <el-form-item label="标题名称" prop="title">
                  <el-input
                    v-model="formParams.title"
                    placeholder="请输入标题名称"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="form-item">
                <el-form-item label="属性" prop="postType">
                  <el-radio-group v-model="formParams.postType">
                    <el-radio
                      :label="i.val"
                      v-for="(i, k) in postTypeList"
                      :key="k"
                      >{{ i.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="form-item">
                <el-form-item label="标签" prop="tagText">
                  <el-input
                    v-model="formParams.tagText"
                    placeholder="请输入标签（如有多个以；分割开）"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
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
            <el-form-item label="是否为原创" prop="isYuanChuang">
              <el-radio-group v-model="formParams.isYuanChuang">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <span class="split-line"></span>
            <el-form-item label="内容来源" prop="pubCompany">
              <el-input
                v-model="formParams.pubCompany"
                placeholder=""
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="参与人员" prop="userAttendDesc">
              <el-cascader
                v-model="formParams.userAttendDesc"
                placeholder="请输入参与人员"
                :options="userOptionList"
                :props="{ multiple: true, expandTrigger: 'hover' }"
                :filter-method="filterMethod"
                :show-all-levels="false"
                filterable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="发布时间" prop="pubTime">
              <el-date-picker
                v-model="formParams.pubTime"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择发布时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="form-item">
            <el-form-item label="云舟地址" prop="fileAddress">
              <el-input
                v-model="formParams.fileAddress"
                placeholder="请输入文件存放的云舟地址"
              ></el-input>
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
                  :ref="`storeEditor`"
                  v-model="i.summary"
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
import { NccBook, Schedule } from "@/API/api";
import { editorOptions } from "../../util/util";
import { Message, MessageBox } from "element-ui";
import merge from "deepmerge";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import VueCropper from "vue-cropper";

export default {
  name: "HouseCreate",
  components: { quillEditor, VueCropper },
  data() {
    return {
      avatar: "",
      isUploadAvatar: false,
      previewImg: "",
      isEditMode: false,
      userOptionList: [], // 所有参与人员
      postTypeList: [
        {
          val: 1,
          label: "案例分享",
        },
        {
          val: 6,
          label: "课程输出",
        },
        {
          val: 5,
          label: "行业报告",
        },
      ],
      formParams: {
        picture: "",
        collegeId: null,
        studyId: null,
        viewScope: 1,
        postType: 1,
        tagText: "",
        isYuanChuang: 1,
        pubCompany: "",
        userAttend: "",
        userAttendDesc: [], //用来存选择器需要的格式
        pubTime: "",
        fileAddress: "",
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
        postType: [{ required: true, message: "请选择属性", trigger: "change" }],
        tagText: [{ required: true, message: "请输入标签", trigger: "blur" }],
        collegeId: [{ required: true, message: "请选择学院", trigger: "change" }],
        studyId: [{ required: true, message: "请选择专业", trigger: "change" }],
        isYuanChuang: [
          { required: true, message: "请选择是否为原创", trigger: "change" },
        ],
        userAttendDesc: [
          { required: true, message: "请输入参与人员", trigger: "change" },
        ],
        fileAddress: [
          { required: true, message: "请输入云舟地址", trigger: "blur" },
        ],
      },
      collegeList: [],
      collegestudylist: [],
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
                      .querySelector(
                        `.ncc-book__create .el-upload .quillUpload`
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
  },
  computed: {
    houseId() {
      return this.$route.query.houseId;
    },
  },
  async created() {
    if (this.$route.query.houseId) this.isEditMode = true; // 进入编辑模式

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
        const storeDetailRes = await this.gethouseDetail();
        this.formParams = {
          ...this.formParams,
          ...storeDetailRes.data.retData.tipsInfo,
        };

        if (this.isEditMode) this.formParams.userAttendDesc = JSON.parse(this.formParams.userAttendDesc);

        const allTeamUserRes = await this.getAllteamuser();
        const teamUser = allTeamUserRes.data.retData.data;
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
    /* 参与人员筛选方式 */
    filterMethod(node, key) {
      const key_word = node.data.label;
      const parent_key_word = node.parent.data.label;
      let re = new RegExp(key, "i");
      return re.test(key_word) || re.test(parent_key_word);
    },
    /* 上传封面头像 */
    async uploadAvatar() {
      this.isUploadAvatar = true;
      const avatar = {
        myPic: this.avatar,
      };
      const avatarRes = await (() => {
        return this.$http.post(NccBook.changepicup, this.qs.stringify(avatar), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        });
      })();
      this.isUploadAvatar = false;
      const { retCode, retData } = avatarRes.data;
      if (retCode === 0) {
        this.cancelAvatar();
        this.formParams.picture = retData.url;
      }
    },
    cancelAvatar() {
      this.previewImg = null;
      this.avatar = null;
    },
    selectImg(e) {
      let file = e.target.files[0];
      if (this.checkOverSize(file.size)) {
        return;
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.previewImg = data;
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    checkOverSize(size) {
      let isOver = false;
      if (size / 1024 / 1024 > 5) {
        Message.warning({
          message: "图片不能大于5MB",
        });
        return true;
      }
      return isOver;
    },
    realTime(data) {
      this.$refs.cropper.getCropData((data) => {
        this.avatar = data;
      });
    },
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
      const mapEditor = this.$refs[`storeEditor`][0];
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
    /* house详情 */
    gethouseDetail() {
      return this.$http.post(
        NccBook.housedetailfront,
        this.qs.stringify({ houseId: this.houseId }),
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
    /* 获取员工列表 */
    getAllteamuser() {
      return this.$http.post(Schedule.allteamuser, this.qs.stringify({}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 表单校验 */
    judgeForm(opType) {
      let formVaild = true;
      /* 校验封面 */
      if (!this.formParams.picture) {
        Message.warning({
          message: "请上传封面",
        });
        return;
      }
      /* 校验表单 */
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
        if (vaild) this.saveHouse(opType);
      }
    },
    async saveHouse(opType) {
        const url = this.isEditMode ? NccBook.houseedit : NccBook.houseadd;
        this.formParams.opType = opType;
        this.formParams.userAttend = this.formParams.userAttendDesc.map(e => e[1]).join(",");
        this.formParams.userAttendDesc = JSON.stringify(this.formParams.userAttendDesc);
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
          this.$router.push({ name: "nccBookHouse" });
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
