<template>
  <div class="ncc-book__create">
    <div class="area">
      <div class="card">
        <h3>我要提问</h3>
        <el-form
          :model="formParams"
          :rules="rules"
          label-position="top"
          ref="ruleForm"
        >
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
            <el-form-item label="问题属性" prop="shuxingId">
              <el-select
                v-model="formParams.shuxingId"
                placeholder="请选择问题属性"
              >
                <el-option
                  v-for="(i, k) in shuxingList"
                  :label="i.shuxingName"
                  :value="Number(i.shuxingId)"
                  :key="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-item">
            <el-form-item label="内容" prop="content">
              <el-input
                type="textarea"
                :rows="5"
                v-model="formParams.content"
                placeholder="请在次输入问题"
              ></el-input>
            </el-form-item>
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
import { Message } from "element-ui";

export default {
  name: "QuestionCreate",
  data() {
    return {
      isEditMode: false,
      formParams: {
        collegeId: null,
        studyId: null,
        viewScope: 1,
        shuxingId: null,
        content: "",
        opType: null,
      },
      rules: {
        collegeId: [{ required: true, message: "请选择学院", trigger: "blur" }],
        studyId: [{ required: true, message: "请选择专业", trigger: "blur" }],
        viewScope: [{ required: true, message: "请选择分组", trigger: "blur" }],
        shuxingId: [
          { required: true, message: "请选择问题属性", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      collegeList: [],
      collegestudylist: [],
      shuxingList: [],
    };
  },
  async created() {
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
        const shuxingListRes = await this.getShuxinglist();
        this.shuxingList = shuxingListRes.data.retData.shuxingList;
      })(),
      (async () => {
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
    /* 获取属性列表 */
    getShuxinglist() {
      return this.$http.post(NccBook.tiwenshuxinglist, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 表单校验 */
    judgeForm(opType) {
      this.$refs["ruleForm"].validate((vaild, obj) => {
        if (vaild) {
          this.saveQuestion(opType);
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
    async saveQuestion(opType) {
      //   const url = this.isEditMode ? NccBook.mapedit : NccBook.mapadd;
      const url = NccBook.tiwenadd;
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
        this.$router.push({ name: "nccBookQuestion" });
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
