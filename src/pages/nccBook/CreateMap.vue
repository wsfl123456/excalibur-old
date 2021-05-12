<template>
  <div class="ncc-book__create">
    <div class="area">
      <div class="card">
        <h3>创建活点地图</h3>
        <el-form
          :model="formParams"
          :rules="rules"
          label-position="top"
          ref="ruleForm"
        >
          <div class="form-item">
            <el-form-item label="类别" prop="typeId">
              <el-radio-group v-model="formParams.typeId">
                <el-radio :label="112">专业线</el-radio>
                <el-radio :label="111">员工日常</el-radio>
              </el-radio-group>
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
          </div>
          <div class="form-item">
            <el-form-item label="工具包" prop="toolkitId">
              <el-cascader
                v-model="formParams.toolkitId"
                :options="toolkitbyproductList"
                :props="{ expandTrigger: 'hover' }"
                placeholder="请选择工具包"
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="标题名称" prop="title">
              <el-input
                v-model="formParams.title"
                placeholder="请输入标题名称"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="内容" prop="content">
              <quill-editor
                ref="mapEditor"
                v-model="formParams.content"
                class="editor"
                :options="editOpt"
              >
              </quill-editor>
            </el-form-item>
            <!-- 用于将图片base64转url -->
            <el-upload
              :show-file-list="false"
              :on-success="handleEditSuccess"
              :max-size="2048"
              multiple
              action="/api/ueditor/index?action=uploadfile&encode=utf-8"
            >
              <el-button icon="el-icon-upload2" type="text">上传文件</el-button>
            </el-upload>
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
import { Message } from "element-ui";
import merge from "deepmerge";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "MapCreate",
  components: { quillEditor },
  data() {
    return {
      isEditMode: false,
      formParams: {
        typeId: 112,
        collegeId: null,
        studyId: null,
        viewScope: 1,
        toolkitId: [], //只用于存工具包的数据，对接口并有什么影响
        productId: null,
        task_toolkit_id: null,
        title: "",
        content: "",
        opType: null,
      },
      rules: {
        typeId: [{ required: true, message: "请选择类别", trigger: "blur" }],
        collegeId: [{ required: true, message: "请选择学院", trigger: "blur" }],
        studyId: [{ required: true, message: "请选择专业", trigger: "blur" }],
        viewScope: [{ required: true, message: "请选择分组", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        toolkitId: [
          // {
          //   type: "array",
          //   required: true,
          //   message: "请选择工具包",
          //   trigger: "change",
          // },
        ],
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
      },
      collegeList: [],
      collegestudylist: [],
      toolkitbyproductList: [],
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
                      .querySelector(".ncc-book__create .el-upload .el-button")
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
    tipsId() {
      return this.$route.query.tipsId;
    },
  },
  async created() {
    if (this.$route.query.tipsId) this.isEditMode = true; // 进入编辑模式

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
        const mapDetailRes = await this.getMapDetail();
        this.formParams = {
          ...this.formParams,
          ...mapDetailRes.data.retData.tipsInfo,
        };
        this.formParams.toolkitId[0] = this.formParams.productId;
        this.formParams.toolkitId[1] = this.formParams.task_toolkit_id;

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
        const toolkitbyproductRes = await this.getToolkitbyproduct();
        const toolkitbyproductList = JSON.parse(
          JSON.stringify(toolkitbyproductRes.data.retData.toolkit)
        );
        this.toolkitbyproductList = toolkitbyproductRes.data.retData.toolkit;
        toolkitbyproductList.forEach((ele, ind) => {
          // 将后台返回的格式转换成element-UI识别的格式
          this.toolkitbyproductList[ind].value = ele.productId;
          this.toolkitbyproductList[ind].label = ele.productName;
          this.toolkitbyproductList[ind].children = [];
          ele.child.forEach((i, k) => {
            this.toolkitbyproductList[ind].children.push({
              value: i.toolkitId,
              label: i.toolkitName,
            });
          });
        });
      })(),
    ]);
  },
  methods: {
    handleEditSuccess(res) {
      // 获取富文本组件实例
      const mapEditor = this.$refs.mapEditor;
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
    /* map详情 */
    getMapDetail() {
      return this.$http.post(
        NccBook.mapdetailfront,
        this.qs.stringify({ tipsId: this.tipsId }),
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
    /* 获取工具包列表 */
    getToolkitbyproduct() {
      return this.$http.post(NccBook.toolkitbyproduct, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 表单校验 */
    judgeForm(opType) {
      this.$refs["ruleForm"].validate((vaild, obj) => {
        if (vaild) {
          this.saveMap(opType);
        } else {
          for (const prop in obj) {
            if (
              !this.formParams[prop] ||
              (Array.isArray(this.formParams[prop]) &&
                !this.formParams[prop].length)
            ) {
              Message.warning({
                message: obj[prop][0].message,
              });
              break;
            }
          }
        }
      });
    },
    async saveMap(opType) {
      const [productId, taskToolkitId] = this.formParams.toolkitId;
      const url = this.isEditMode ? NccBook.mapedit : NccBook.mapadd;
      this.formParams.productId = productId;
      this.formParams.task_toolkit_id = taskToolkitId;
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
        this.$router.push({ name: "nccBookMap" });
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
