<template>
  <div class="fianacial-score">
    <div class="fianacial-container">
      <!-- 头部 -->
      <div class="fianacial-header">Q{{ curQName }}_各事业部财务考核评分</div>

      <!-- 评分标准 -->
      <div class="fianacial-standard">
        <div class="standard-focus">
          <div>!</div>
          评分标准：
        </div>
        <p>回款率： 指客户按期回款金额占总回款金额的比例，按比例折算评分。</p>
        <p>
          AR/AP金额差值分：
          指填写的AR/AP信息与实际信息金额差值（适用于PO高于100W的项目）大于50W-0分，
          小于50W大于10W-60分，低于10W-100分；
        </p>
        <p>
          AR/AP金额比例分：
          指填写的AP信息与实际信息金额比例（适用于PO低于100W的项目）大于20%-0分，介于10%-20%中间-60分，小于10%-100分；
        </p>
      </div>

      <!-- 评分表单 -->
      <div
        v-for="(item, index) in formData"
        :key="index"
        class="team-score financial-score"
      >
        <div class="team-name">{{ item.teamName }}</div>
        <el-form ref="scoreForm" :model="item.form" :rules="item.rules">
          <div class="team-info financial-info">
            <el-form-item label="净利润" prop="profitClean">
              <el-input
                v-model="item.form.profitClean"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="AR金额比例" prop="ArPercent">
              <el-input
                v-model="item.form.ArPercent"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="AP金额比例" prop="ApPercent">
              <el-input
                v-model="item.form.ApPercent"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
          </div>
          <div class="team-info financial-info">
            <el-form-item label="回款率" prop="incomeRate">
              <el-input
                v-model="item.form.incomeRate"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="AR金额差值" prop="ArMove">
              <el-input
                v-model="item.form.ArMove"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
            <el-form-item label="AP金额差值" prop="ApMove">
              <el-input
                v-model="item.form.ApMove"
                oninput="value=value.replace(/[^\d^\.]/g,'')"
              />
            </el-form-item>
          </div>
        </el-form>
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
    /* 三大组织打分 */
    getTeamThreeScore(driTeamId) {
      return this.$http.post(
        Dri.drigetmyteamthreejobscore,
        this.qs.stringify({
          yearName: this.curYear,
          qName: this.curQName,
          teamId: driTeamId,
          dateType: 1,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    // 获取事业部列表
    async getApartmentList() {
      const { data } = await this.$http.post(
        Hoshin.list,
        this.qs.stringify({ orderBy: "name", asc: "asc", showStatus: 1 }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
      if (data.retCode === 0) {
        this.formData = data.retData.data;
        const res = await Promise.all(
          this.formData.map((i, k) => this.getTeamThreeScore(i.id))
        );
        this.formData = this.formData.map((item, index) => {
          const rules = {
            profitClean: [
              { required: true, message: "请输入净利润", trigger: "blur" },
            ],
            incomeRate: [
              { required: true, message: "请输入回款率得分", trigger: "blur" },
            ],
            ArMove: [
              {
                required: true,
                message: "请输入AR与实际金额差值得分",
                trigger: "blur",
              },
            ],
            ApMove: [
              {
                required: true,
                message: "请输入AP与实际金额差值得分",
                trigger: "blur",
              },
            ],
            ArPercent: [
              {
                required: true,
                message: "请输入AR与实际金额比例得分",
                trigger: "blur",
              },
            ],
            ApPercent: [
              {
                required: true,
                message: "请输入AP与实际金额比例得分",
                trigger: "blur",
              },
            ],
          };

          let form;
          if (!Array.isArray(res[index].data.retData.threeJob)) {
            // 当前季度已评过分
            form = {
              profitClean:
                res[index].data.retData.threeJob[this.curQName][1].profitClean,
              incomeRate:
                res[index].data.retData.threeJob[this.curQName][1].incomeRate,
              ArMove: res[index].data.retData.threeJob[this.curQName][1].ArMove,
              ApMove: res[index].data.retData.threeJob[this.curQName][1].ApMove,
              ArPercent:
                res[index].data.retData.threeJob[this.curQName][1].ArPercent,
              ApPercent:
                res[index].data.retData.threeJob[this.curQName][1].ApPercent,
            };
          } else {
            // 当前季度已未评分
            form = {
              profitClean: "",
              incomeRate: "",
              ArMove: "",
              ApMove: "",
              ArPercent: "",
              ApPercent: "",
            };
          }

          item = {
            teamId: item.id,
            teamName: item.name,
            form: form,
            rules: rules,
          };
          return item;
        });
      } else if (data.retCode === 100014) {
        this.$cookie.delete("token");
        this.$router.push("/");
      }
    },
    // 校验表单
    juedegForm() {
      if (this.buttonFlag) {
        this.formData.some((item, index) => {
          this.$refs.scoreForm[index].validate((vaild) => {
            if (vaild) {
              this.formFlag++;
              if (this.formFlag === this.formData.length - 1) {
                this.buttonFlag = false;
                this.loopSubmit();
                return true;
              }
            }
          });
        });
      }
    },
    // 循环调用评分接口
    loopSubmit() {
      this.formData.some((item, index) => {
        this.submitForm(item);
      });
    },
    // 提交信息
    submitForm(item) {
      const params = {
        dateType: 1,
        toTeamId: item.teamId,
        yearName: this.curYear,
        qName: this.curQName,
        ...item.form,
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
