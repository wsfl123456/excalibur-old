<template>
  <div class="fianacial-score">
    <div class="fianacial-container">
      <!-- 头部 -->
      <div class="fianacial-header">Q{{ curQName }}_各事业部重大事故评分</div>

      <!-- 评分标准 -->
      <div class="fianacial-standard big-bug-score">
        <div class="standard-focus">
          <div>!</div>
          评分标准：
        </div>
        <p>重大事故：出现重大事故,该季度60%奖金不解锁</p>
      </div>

      <!-- 评分表单 -->
      <div v-for="(item, index) in formData" :key="index" class="team-score">
        <div class="team-name">{{ item.teamName }}</div>
        <div class="bigbug-label">重大事故</div>
        <el-form ref="scoreForm" :model="item.form">
          <el-form-item>
            <div class="item">
              <el-select
                v-model="item.form.BigBugScore"
                placeholder="选择有无重大事故 "
              >
                <el-option label="有重大事故" value="有"> </el-option>
                <el-option label="无重大事故" value="无"> </el-option>
              </el-select>

              <div class="line"></div>

              <el-input
                v-model="item.form.BigBugRemark"
                placeholder="请输入重大事故得分（如发生重大事故 ，请填写具体是什么）"
              />
            </div>
          </el-form-item>
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
          dateType: 2,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    // 获取事业部列表
    async getApartmentList() {
      const { data } = await this.$http.post(Hoshin.list, this.qs.stringify({orderBy: "name", asc: "asc", showStatus: 1}), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
      if (data.retCode === 0) {
        this.formData = data.retData.data;
        const res = await Promise.all(
          this.formData.map((i, k) => this.getTeamThreeScore(i.id))
        );
        this.formData = this.formData.map((item, index) => {
          let form;
          if (!Array.isArray(res[index].data.retData.threeJob)) {
            // 当前季度已评过分
            form = {
              BigBugRemark:
                res[index].data.retData.threeJob[this.curQName][2].BigBugRemark,
              BigBugScore:
                res[index].data.retData.threeJob[this.curQName][2].BigBugScore,
            };
          } else {
            // 当前季度已未评分
            form = {
              BigBugScore: "",
              BigBugRemark: "",
            };
          }
          item = {
            teamId: item.id,
            teamName: item.name,
            form: form,
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
        // this.formData = this.formData.map((item) => {
        //   if (item.form.BigBugRemark !== "") {
        //     item.form.BigBugScore = 0;
        //   } else {
        //     item.form.BigBugScore = 100;
        //   }
        //   return item;
        // });
        this.buttonFlag = false;
        // 循环调用评分接口
        this.formData.some((item, index) => {
          this.submitForm(item);
        });
      }
    },
    // 提交信息
    submitForm(item) {
      const params = {
        dateType: 2,
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
