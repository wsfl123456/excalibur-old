<template>
  <div class="dri-create-reach">
    <div class="area">
      <div class="title">Q{{ QName }}_DRI达成情况</div>
      <div class="tips">
        <i class="el-icon-warning"></i
        >仅需填写带<span>*</span>的类目，其他类目的达成结果为系统读取值。
      </div>
      <!-- 业务成长 -->
      <div class="card">
        <div class="type">业务成长</div>
        <div class="item">
          <h4>业务增长</h4>
          <div>
            <div>
              <div class="label">营收（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.incomea
                      ? '¥' + bussnissData.incomea
                      : bussnissData.incomea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.incomeb
                      ? '¥' + bussnissData.incomeb
                      : bussnissData.incomeb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">净利润（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.profita
                      ? '¥' + bussnissData.profita
                      : bussnissData.profita
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.profitb
                      ? '¥' + bussnissData.profitb
                      : bussnissData.profitb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <h4>业务情况</h4>
          <div>
            <!-- <div>
              <div class="label">服务客户数（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.customerNuma
                      ? bussnissData.customerNuma + '个'
                      : bussnissData.customerNuma
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.customerNumb
                      ? bussnissData.customerNumb + '个'
                      : bussnissData.customerNumb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">项目准时率（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.projectPunctualitya
                      ? bussnissData.projectPunctualitya + '%'
                      : bussnissData.projectPunctualitya
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.projectPunctualityb
                      ? bussnissData.projectPunctualityb + '%'
                      : bussnissData.projectPunctualityb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div> -->
            <div>
              <div class="label">任务数量（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.projectPunctualitya
                      ? bussnissData.projectPunctualitya + '个'
                      : bussnissData.projectPunctualitya
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.taskNumb
                      ? bussnissData.taskNumb + '个'
                      : bussnissData.taskNumb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <h4>合规检查</h4>
          <div>
            <div>
              <div class="label">系统使用合规（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.holdSystemScorea
                      ? bussnissData.holdSystemScorea + '分'
                      : bussnissData.holdSystemScorea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.holdSystemScoreb
                      ? bussnissData.holdSystemScoreb + '分'
                      : bussnissData.holdSystemScoreb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">流程制度使用合规（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.holdFlowScorea
                      ? bussnissData.holdFlowScorea + '分'
                      : bussnissData.holdFlowScorea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.holdFlowScoreb
                      ? bussnissData.holdFlowScoreb + '分'
                      : bussnissData.holdFlowScoreb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <h4>财务考核</h4>
          <div>
            <div>
              <div class="label">回款率（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.incomeRatea
                      ? bussnissData.incomeRatea + '分'
                      : bussnissData.incomeRatea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.incomeRateb
                      ? bussnissData.incomeRateb + '分'
                      : bussnissData.incomeRateb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <!-- 占位 -->
            <div></div>
            <div>
              <div class="label">AR金额差值（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.ArMovea
                      ? bussnissData.ArMovea + '分'
                      : bussnissData.ArMovea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.ArMoveb
                      ? bussnissData.ArMoveb + '分'
                      : bussnissData.ArMoveb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">AR金额比例（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.ArPercenta
                      ? bussnissData.ArPercenta + '分'
                      : bussnissData.ArPercenta
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.ArPercentb
                      ? bussnissData.ArPercentb + '分'
                      : bussnissData.ArPercentb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">AP金额差值（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.ApMovea
                      ? bussnissData.ApMovea + '分'
                      : bussnissData.ApMovea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.ApMoveb
                      ? bussnissData.ApMoveb + '分'
                      : bussnissData.ApMoveb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">AP金额比例（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.ApPercenta
                      ? bussnissData.ApPercenta + '分'
                      : bussnissData.ApPercenta
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.ApPercentb
                      ? bussnissData.ApPercentb + '分'
                      : bussnissData.ApPercentb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <h4>与客户共赢</h4>
          <div>
            <div>
              <div class="label">客户满意度（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.surveyScorea
                      ? bussnissData.surveyScorea + '分'
                      : bussnissData.surveyScorea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.surveyScoreb
                      ? bussnissData.surveyScoreb + '分'
                      : bussnissData.surveyScoreb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label">无重大事故（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    bussnissData.BigBugScorea
                      ? bussnissData.BigBugScorea + '分'
                      : bussnissData.BigBugScorea
                  "
                  :disabled="true"
                  placeholder="系统自动填充"
                ></el-input>
                <span>-</span>
                <el-input
                  :value="
                    bussnissData.BigBugScoreb
                      ? bussnissData.BigBugScoreb + '分'
                      : bussnissData.BigBugScoreb
                  "
                  :readonly="true"
                  placeholder="系统自动填充"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label"><span v-if="this.userInfo.id == 1 || this.userInfo.isCaptain">*</span>报奖计划（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    growData.gainPrizea
                      ? growData.gainPrizea + '个'
                      : growData.gainPrizea
                  "
                  :disabled="true"
                  placeholder="请输入实际奖项个数及奖项名称"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.gainPrizeb"
                  :disabled="this.userInfo.id !== 1 && !this.userInfo.isCaptain"
                  placeholder="实际奖项名称及奖项个数 (|分割)"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 人才成长 -->
      <div class="card">
        <div class="type">人才成长</div>
        <div class="item">
          <div>
            <div>
              <div class="label"><span v-if="!(QName == 2 || QName == 4)">*</span>TGT规划（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="growData.tgta"
                  :disabled="true"
                  placeholder="请输入TGT达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.tgtb"
                  :disabled="QName == 2 || QName == 4"
                  placeholder="请输入TGT达成情况"
                ></el-input>
              </div>
            </div>
            <!-- <div>
              <div class="label">收入提升（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    growData.salarya
                      ? growData.salarya + '元'
                      : growData.salarya
                  "
                  :disabled="true"
                  placeholder="请输入收入提升达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.salaryb"
                  :disabled="QName == 2 || QName == 4"
                  placeholder="请输入收入提升达成情况"
                ></el-input>
              </div>
            </div> -->
          </div>
          <div>
            <div>
              <div class="label"><span>*</span>硬核技能提升-硬核技能（目标-达成）</div>
              <div
                class="input"
                v-for="(i, k) in growData.skilla.split('|')"
                :key="k"
              >
                <el-input
                  :value="i"
                  :disabled="true"
                  placeholder="请输入硬核技能达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="skillReachArr[k]"
                  placeholder="请输入硬核技能达成情况"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label"><span>*</span>专业技能证书获取-技能证书（目标-达成）</div>
              <div
                class="input"
                v-for="(i, k) in growData.certa.split('|')"
                :key="k"
              >
                <el-input
                  :value="i"
                  :disabled="true"
                  placeholder="请输入技能证书达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="certReachArr[k]"
                  placeholder="请输入技能证书达成情况"
                ></el-input>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="label"><span>*</span>经验提炼与总结-经验文档（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="growData.expa ? growData.expa + '个' : growData.expa"
                  :disabled="true"
                  placeholder="请输入经验文档达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.expb"
                  placeholder="请输入经验文档达成情况"
                ></el-input>
              </div>
            </div>
            <div>
              <div class="label"><span>*</span>专业知识与方法论进阶-课程研发（目标-达成）</div>
              <div class="input">
                <el-input
                  :value="
                    growData.coursea
                      ? growData.coursea + '个'
                      : growData.coursea
                  "
                  :disabled="true"
                  placeholder="请输入课程研发达成情况"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.courseb"
                  placeholder="请输入课程研发达成情况"
                ></el-input>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div class="label">
                <span>*</span>做有数字化发展意识的人才-凌波创识（大宝剑）使用反馈建议（目标-达成）
              </div>
              <div class="input">
                <el-input
                  :value="growData.sopa ? growData.sopa + '个' : growData.sopa"
                  :disabled="true"
                  placeholder="请输入实际凌波创识（大宝剑）使用反馈建议"
                ></el-input>
                <span>-</span>
                <el-input
                  v-model="growData.sopb"
                  placeholder="实际意见个数及具体内意见 (|分割)"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- btn-group -->
      <div class="btn-group">
        <div class="dri__btn dri__btn--primary" @click="submitReach">
          提交达成
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { Dri, CreateDri } from "@/API/api";
import { Message } from "element-ui";

export default {
  name: "dri-create-reach",
  data() {
    return {
      curYear: String(new Date().getFullYear()),
      bussnissData: {
        incomea: "",
        incomeb: "",
        profita: "",
        profitb: "",
        // customerNuma: "",
        // customerNumb: "",
        // projectPunctualitya: "",
        // projectPunctualityb: "",
        /* 任务数量 */
        taskNumb: "",
        holdSystemScorea: "",
        holdSystemScoreb: "",
        holdFlowScorea: "",
        holdFlowScoreb: "",
        incomeRatea: "",
        incomeRateb: "",
        ArMovea: "",
        ArMoveb: "",
        ArPercenta: "",
        ArPercentb: "",
        ApMovea: "",
        ApMoveb: "",
        ApPercenta: "",
        ApPercentb: "",
        surveyScorea: "",
        surveyScoreb: "",
        BigBugScorea: "",
        BigBugScoreb: "",
      },
      growData: {
        /* 转成数组处理 */
        gainPrizea: "",
        gainPrizeb: "",
        skilla: "",
        skillb: "",
        certa: "",
        certb: "",
        /*  */
        expa: "",
        expb: "",
        // sopa: "",
        // sopb: "",
        coursea: "",
        courseb: "",
        tgta: "",
        tgtb: "",
        salarya: "",
        salaryb: "",
        sopa: "",
        sopb: "",
      },
      skillReachArr: [],
      certReachArr: [],
      QName: "",
      reachYear: "",
      userInfo: {},
    };
  },
  computed: {
    driObjectId() {
      return this.$route.params.driObjectId;
    },
    yearName() {
      return this.$route.params.year;
    },
  },
  methods: {
    /* 提交达成 */
    submitReach() {
      if (
        !this.growData.expb ||
        // !this.growData.sopb ||
        !this.growData.courseb ||
        ((this.userInfo.id == 1 || this.userInfo.isCaptain) && !this.growData.gainPrizeb) ||
        (this.QName != 2 && this.QName != 4 && !this.growData.gainPrizeb) ||
        !this.growData.sopb ||
        !this.skillReachArr.every((i) => i) ||
        !this.certReachArr.every((i) => i)
      ) {
        Message.warning({
          message: "请输入完整内容",
          type: "warning",
        });
        return;
      }
      const params = {
        driObjectId: this.driObjectId,
        yearName: this.reachYear,
        [`gainPrizeQ${this.QName}b`]: this.growData.gainPrizeb,
        [`skillQ${this.QName}b`]: this.skillReachArr.join("|"),
        [`certQ${this.QName}b`]: this.certReachArr.join("|"),
        [`expQ${this.QName}b`]: this.growData.expb,
        // [`sopQ${this.QName}b`]: this.growData.sopb,
        [`courseQ${this.QName}b`]: this.growData.courseb,
        [`tgtQ${this.QName}b`]: this.growData.tgtb,
        [`salaryQ${this.QName}b`]: this.growData.salaryb,
        [`sopQ${this.QName}b`]: this.growData.sopb,
      };
      this.$http
        .post(Dri.driobjectset, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          if (res.data.retCode === 0) {
            Message.success({
              message: "提交成功",
              type: "success",
            });
            this.$router.back(-1);
          } else {
            Message.error({
              message: res.data.retMsg,
              type: "error",
            });
          }
        });
    },
    /* dri详情 */
    getDriDetail() {
      return this.$http.post(
        Dri.driobjectgetuser,
        this.qs.stringify({
          yearName: this.yearName,
          driObjectId: this.driObjectId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 业务情况达成情况 */
    getBussinessScore(qName) {
      return this.$http.post(
        Dri.dashboarduserexecmonthtasknumber,
        this.qs.stringify({
          yearName: this.reachYear,
          qName,
          userId: this.driUserId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 三大组织打分 */
    getTeamThreeScore() {
      return this.$http.post(
        Dri.drigetmyteamthreejobscore,
        this.qs.stringify({
          yearName: this.reachYear,
          qName: "",
          teamId: this.driTeamId,
          dateType: "",
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 问卷调查分数 */
    getSurveyscorelistproject(qName) {
      return this.$http.post(
        Dri.surveyscorelistproject,
        this.qs.stringify({
          yearName: this.reachYear,
          qName,
          teamId: this.driTeamId,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    getUserInfo() {
      this.$http
        .post(CreateDri.userInfo, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then(async (res) => {
          const { data } = res;
          if (data.retCode === 0) {
            this.userInfo = { ...data.retData };
            /* 判断是否为必填项 */
            if (this.userInfo.id !== 1 && !this.userInfo.isCaptain) {
              this.$http.post(
                Dri.driobjectgetuser,
                this.qs.stringify({
                  driUserId: this.userInfo.teamCaptainUserId,
                }),
                {
                  headers: {
                    Authorization: "Bearer " + this.$cookie.get("token"),
                  },
                }
              ).then((res) => {
                const { data } = res;
                this.growData.gainPrizea = data.retData.objectInfo[`gainPrizeQ${this.QName}a`]
                this.growData.gainPrizeb = data.retData.objectInfo[`gainPrizeQ${this.QName}b`]
              })
            }
          } else if (data.retCode === 100014) {
            this.$cookie.delete("token");
            this.$router.push("/");
          }
        });
    },
  },
  async created() {
    document.documentElement ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
    await Promise.all([this.getDriDetail()]).then((res) => {
      const objectInfo = res[0].data.retData.objectInfo;
      this.QName = objectInfo.btnReach_q;
      this.reachYear = objectInfo.btnReach_year;
      for (let prop in this.bussnissData) {
        this.bussnissData[prop] =
          objectInfo[
            prop.substr(0, prop.length - 1) +
              "Q" +
              this.QName +
              prop[prop.length - 1]
          ];
      }
      for (let prop in this.growData) {
        this.growData[prop] =
          objectInfo[
            prop.substr(0, prop.length - 1) +
              "Q" +
              this.QName +
              prop[prop.length - 1]
          ];
      }

      if (objectInfo[`skillQ${this.QName}b`]) {
        this.skillReachArr = objectInfo[`skillQ${this.QName}b`].split("|");
      } else {
        this.skillReachArr = new Array(
          objectInfo[`skillQ${this.QName}a`].split("|").length
        );
      }
      if (objectInfo[`certQ${this.QName}b`]) {
        this.certReachArr = objectInfo[`certQ${this.QName}b`].split("|");
      } else {
        this.certReachArr = new Array(
          objectInfo[`certQ${this.QName}a`].split("|").length
        );
      }
    });

    this.getUserInfo();

    /* 业务情况 -> 达成 */
    const bussinessRes = await this.getBussinessScore(this.QName);
    this.bussnissData.customerNumb =
      bussinessRes.data.retData.driCustomerTaskInfo.taskCustomerNum;
    this.bussnissData.projectPunctualityb =
      bussinessRes.data.retData.driCustomerTaskInfo.taskCommenFinishPercent;
    this.bussnissData.taskNumb =
      bussinessRes.data.retData.driCustomerTaskInfo.taskNum;

    const threeScore = await this.getTeamThreeScore(this.QName);
    /* 合规检查 -> 达成 */
    this.bussnissData.holdSystemScoreb =
      threeScore.data.retData.threeJob[this.Qname]["3"].holdSystemScore;
    this.bussnissData.holdFlowScoreb =
      threeScore.data.retData.threeJob[this.Qname]["3"].holdFlowScore;
    /* 财务考核 -> 达成 */
    this.bussnissData.incomeRateb =
      threeScore.data.retData.threeJob[this.Qname]["1"].incomeRate;
    this.bussnissData.ArMoveb =
      threeScore.data.retData.threeJob[this.Qname]["1"].ArMove;
    this.bussnissData.ArPercentb =
      threeScore.data.retData.threeJob[this.Qname]["1"].ArPercentScore;
    this.bussnissData.ApMoveb =
      threeScore.data.retData.threeJob[this.Qname]["1"].ApMove;
    this.bussnissData.ApPercentb =
      threeScore.data.retData.threeJob[this.Qname]["1"].ApPercentScore;
    /* 与客户共赢 -> 达成 */
    this.bussnissData.BigBugScoreb =
      threeScore.data.retData.threeJob[this.Qname]["2"].BigBugScore;
  },
};
</script>

<style scoped lang="">
</style>
