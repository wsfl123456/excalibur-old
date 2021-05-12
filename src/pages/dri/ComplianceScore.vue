<template>
  <div class="fianacial-score">
    <div class="fianacial-container">
      <!-- 头部 -->
      <div class="fianacial-header">Q{{ curQName }}_各事业部合规检查评分</div>

      <!-- 评分标准 -->
      <div class="fianacial-standard comliance-standard">
        <div class="standard-focus">
          <div>!</div>
          评分标准：取事业部该季度所有项目平均分。
        </div>
        <p>
          凌波创识使用合规指事业部内所有人员按公司要求使用公司系统的情况：<br />
          记录详实，内容清晰 -
          100分；（PIB/PAR是否记录详实清晰，根据PIB的内容及PAR的职能检查是否有相关任务列表，关键流程/任务/文档记录均完整记录）<br />
          关键流程/任务完整，但文档记录缺漏- 60分；<br />
          关键流程/任务/文档记录均缺漏 - 0分；<br />
          关键任务/流程：PIB/PAR/合同/报价单 （缺一即为0分）；<br />
          文档记录：按照报价单交付物对应的物料final版本的公盘地址是否上传完毕
          ；<br />
          取当季度内所有项目平均分。
        </p>
        <p>
          云舟使用合规：按PM book将所有内容存入云舟 ，项目结束后检查。<br />
          1. 完全符合要求 - 100分；<br />
          2. 缺少项目物料文件 - 60分；（项目物料文件：设计及文案物料等）<br />
          3. 缺少关键文件或完全没有完成 -
          0分；（关键文件：report、报价、时间表、方案文件、MP/SP、技术文档或完全没有完成
          ）<br />
        </p>
        <!-- <p>系统使用合规： 指事业部内所有人员按公司要求使用公司系统的情况。</p>
        <p>1、记录详实，内容清晰 - 100分； </p>
        <p>2、（PIB/PAR是否记录详实清晰，根据PIB的内容及PAR的职能检查是否有相关任务列表，关键流程/任务/文档记录均完整记录）关键流程/任务完整，但文档记录缺漏- 60分；</p>
        <p>系统使用合规：按PM book将所有内容存入公盘，项目结束后检查。</p>
        <p>1. 完全符合要求 - 100分；</p>
        <p>2. 缺少项目物料文件 - 60分；（项目物料文件：设计及文案物料等）</p>
        <p>3. 缺少关键文件或完全没有完成 - 0分；（关键文件：report、报价、时间表、方案文件、MP/SP、技术文档或完全没有完成 ）</p> -->
      </div>

      <!-- 评分表单 -->
      <div
        v-for="(item, index) in formData"
        :key="index"
        class="team-score compliance-score"
      >
        <div class="team-name">{{ item.teamName }}</div>
        <div class="compliance-table">
          <div class="table-title">
            <div class="table-header table-center">合规检查</div>
            <div class="column-border table-center">凌波创识使用</div>
            <div class="table-column table-center">云舟使用</div>
          </div>
          <div class="table-title border-left">
            <div class="table-header table-center">季度得分</div>
            <div class="column-border table-center">
              <el-input
                v-model="item.holdSystemScore"
                placeholder="请输入平均得分"
              />
            </div>
            <div class="table-column table-center">
              <el-input
                v-model="item.holdFlowScore"
                placeholder="请输入平均得分"
              />
            </div>
          </div>
          <div
            class="table-info"
            :class="item.tableColumns.length === 0 ? 'border-left' : ''"
          >
            <div
              v-for="(element, indexEle) in item.tableColumns"
              :key="indexEle"
              class="border-left table-score"
            >
              <div class="score-header table-center">
                {{ element.projectName }}
              </div>
              <div class="score-border score-center">
                <el-input
                  v-model="element.holdSystemDetailScore"
                  placeholder="请输入项目得分"
                />
                <el-input
                  v-model="element.holdSystemDetailRemark"
                  placeholder="是否有缺失内容，具体是什么？ "
                  class="top-border"
                />
              </div>
              <div class="score-column score-center">
                <el-input
                  v-model="element.holdFlowDetailScore"
                  placeholder="请输入项目得分"
                />
                <el-input
                  v-model="element.holdFlowDetailRemark"
                  placeholder="是否有缺失内容，具体是什么？ "
                  class="top-border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="submit-button">
        <el-button type="primary" @click="juedegForm" :disabled="!buttonFlag"
          >提交达成</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { CreateDri, Dri, Hoshin } from "@/API/api";

export default {
  name: "dri-financial-score",
  data() {
    return {
      formData: [],
      formFlag: 0,
      buttonFlag: true,
      submitFlag: 0,
    };
  },
  computed: {
    curYear() {
      return this.$route.query.yearName;
    },
    curQName() {
      return this.$route.query.qName;
    },
  },
  created() {
    this.getApartmentList();
  },
  methods: {
    // 获取项目列表
    async getProjectList(item) {
      const params = {
        teamId: item.teamId,
        yearName: this.curYear,
        qName: this.curQName,
      };
      const result = await this.getTeamThreeScore(item);
      const { threeJob } = result.data.retData;

      if (!Array.isArray(threeJob)) {
        item.holdSystemScore = threeJob[this.curQName][3].holdSystemScore;
        item.holdFlowScore = threeJob[this.curQName][3].holdFlowScore;
        if (!!threeJob[this.curQName][3].holdSystemDetail) {
        console.log(threeJob[this.curQName][3].holdSystemDetail, item.teamId)

          threeJob[this.curQName][3].holdSystemDetail.forEach((system, i) => {
          item.tableColumns.push({
            projectId: system.projectId,
            projectName: system.projectName,
            holdSystemDetailScore:
              system.score,
            holdSystemDetailRemark:
              system.remark,
            holdFlowDetailScore:
              threeJob[this.curQName][3].holdFlowDetail[i].score,
            holdFlowDetailRemark:
              threeJob[this.curQName][3].holdFlowDetail[i].remark,
          })
        });
        }
      } else {
        this.$http
          .post(CreateDri.driProjectList, this.qs.stringify({ ...params }), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          })
          .then((res) => {
            const { data } = res;
            if (data.retCode === 0) {
              item.tableColumns = data.retData.project_list.map((element) => {
                element = {
                  projectId: element.id,
                  projectName: element.name,
                  holdSystemDetailScore: "",
                  holdSystemDetailRemark: "",
                  holdFlowDetailScore: "",
                  holdFlowDetailRemark: "",
                };
                return element;
              });
            } else if (data.retCode === 100014) {
              this.$cookie.delete("token");
              this.$router.push("/");
            }
          });
      }
    },
    /* 三大组织打分 */
    getTeamThreeScore(item) {
      return this.$http.post(
        Dri.drigetmyteamthreejobscore,
        this.qs.stringify({
          yearName: this.curYear,
          qName: this.curQName,
          teamId: item.teamId,
          dateType: 3,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    // 获取事业部列表
    getApartmentList() {
      this.$http
        .post(Hoshin.list, this.qs.stringify({orderBy: "name", asc: "asc", showStatus: 1}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            this.formData = data.retData.data;
            this.formData = this.formData.map((item) => {
              item = {
                teamId: item.id,
                teamName: item.name,
                holdSystemScore: "", // 系统使用合规_得分
                holdFlowScore: "", // 流程制度使用合规_得分
                holdSystemDetail: [], // 系统使用合规_项目得分明细
                holdFlowDetail: [], // 流程制度使用合规_项目得分明细
                tableColumns: [],
              };
              this.getProjectList(item);
              return item;
            });
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
    // 校验表单
    juedegForm() {
      if (this.buttonFlag) {
        const noSubmit = this.formData.some((item) => {
          // 组装系统合规数据结构
          item.holdSystemDetail = item.tableColumns.map((property) => {
            property = {
              projectId: property.projectId,
              projectName: property.projectName,
              score: property.holdSystemDetailScore,
              remark: property.holdSystemDetailRemark,
            };
            return property;
          });
          // 组装流程合规数据结构
          item.holdFlowDetail = item.tableColumns.map((property) => {
            property = {
              projectId: property.projectId,
              projectName: property.projectName,
              score: property.holdFlowDetailScore,
              remark: property.holdFlowDetailRemark,
            };
            return property;
          });

          const judgeFlag = item.tableColumns.some((element) => {
            return (
              item.holdSystemScore === "" ||
              item.holdFlowScore === "" ||
              element.holdSystemDetailScore === "" ||
              element.holdSystemDetailRemark === "" ||
              element.holdFlowDetailScore === "" ||
              element.holdFlowDetailRemark === ""
            );
          });

          if (judgeFlag) {
            this.$notify({
              title: "失败",
              message: `${item.teamName}部门有未完善的信息!`,
              type: "error",
              duration: 3000,
            });
            return true;
          }
        });

        if (!noSubmit) this.loopSubmit();
      }
    },
    // 循环调用评分接口
    loopSubmit() {
      this.formData.some((item) => {
        this.submitForm(item);
      });
    },
    // 提交信息
    submitForm(item) {
      const params = {
        yearName: this.curYear,
        qName: this.curQName,
        dateType: 3,
        toTeamId: item.teamId,
        holdSystemScore: item.holdSystemScore,
        holdFlowScore: item.holdFlowScore,
        holdSystemDetail: item.holdSystemDetail,
        holdFlowDetail: item.holdFlowDetail,
      };
      this.$http
        .post(CreateDri.driTeamScoreSet, this.qs.stringify({ ...params }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          const { data } = res;
          if (data.retCode === 0) {
            this.submitFlag++;
            this.$notify({
              title: "成功",
              message: `${item.teamName}部门打分成功！`,
              type: "success",
              duration: 2000,
            });
            if (this.submitFlag === this.formData.length - 1) {
              this.buttonFlag = true;
            }
            this.$router.push({ name: "driIndex" });
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          } else {
            this.buttonFlag = true;
            this.$notify({
              title: "失败",
              message: data.retMsg,
              type: "error",
              duration: 2000,
            });
          }
        });
    },
  },
};
</script>
