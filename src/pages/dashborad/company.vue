<template>
  <div class="dashborad">
    <Tabs value="personOverview" class="tabs" :animated="animatedTab" @on-click="tabClick">
      <TabPane label="人员概况" ref="personOverview" name="personOverview">
        <div id="personOverviews">
          <div class="configuration">
            <h2 class="configuration-title">公司人员配置</h2>
            <div class="incomeGeneration-content">
              <Row>
                <i-col span="12">
                  <div class="incomeGeneration-left-head">各部门人员在公司总人数占比</div>
                  <div class="incomeGeneration-left-content">
                    <div id="companypersondepart" style="height : 480px"></div>
                  </div>
                </i-col>
                <i-col span="12">
                  <div class="incomeGeneration-right-head">各部门人员在各事业部中的人员分配</div>
                  <div class="incomeGeneration-right-content">
                    <div id="companydepartinteam" style="height : 490px"></div>
                  </div>
                </i-col>
              </Row>
            </div>
          </div>
        </div>

        <!-- <div class="power">
          <h2 class="power-title">创收能力</h2>
          <div class="power-content">
            <span style="font-size:14px">时间段</span>
            <DatePicker
              v-model="powerData.fromtime"
              @on-change="powerDataFromtime"
              type="month"
              placeholder="选择开始时间"
              format="yyyy-MM"
              style="width:130px"
            ></DatePicker>
            <span>—</span>
            <DatePicker
              v-model="powerData.totime"
              @on-change="powerDataTotime"
              type="month"
              placeholder="选择结束时间"
              format="yyyy-MM"
              style="width:130px"
            ></DatePicker>
            <div id="power" style="height : 350px;margin-top: 30px"></div>
          </div>
        </div>-->
      </TabPane>
      <TabPane class="tabpane" label="业务概况" ref="businessOverview" name="businessOverview">
        <div id="businessOverviews">
          <div class="yearIncome">
            <Row style="border : 1px solid #e9ecef" type="flex" align="middle">
              <i-col span="12">
                <h2 class="yearIncome-title" style="border : none">营收情况</h2>
              </i-col>
              <i-col span="12" v-show="isBusinessAdd && canManage" class="addOrigin">
                <Button @click="changeBusinessModal('添加')" style="background:white">
                  <img src="@/assets/images/ic_add.svg" alt style="vertical-align: middle">
                  <span style="color :#868E96;font-size:14px">添加本年度目标</span>
                </Button>
              </i-col>
              <i-col span="12" v-show="!isBusinessAdd && canManage" class="addOrigin">
                <Button @click="changeBusinessModal('修改')" style="background:white">
                  <img src="@/assets/images/ic_revise.svg" alt style="vertical-align: middle">
                  <span style="color :#868E96;font-size:14px">修改本年度目标</span>
                </Button>
              </i-col>
            </Row>
            <div class="yearIncome-content dashboradTab">
              <span style="font-size:14px">时间</span>
              <DatePicker
                v-model="year"
                @on-change="changeYear"
                type="year"
                placeholder="请选择年份"
                format="yyyy"
                style="width:130px"
              ></DatePicker>
            </div>
            <Row>
              <i-col span="24">
                <div class="yearProfit">
                  <div>年度营收和利润</div>
                  <ul>
                    <li v-for="(item, index) in yearIncomeList" :key="index">
                      <div>
                        <img
                          :src="item.icon"
                          alt
                          style="vertical-align: middle"
                          width="18px"
                          height="18px"
                        >
                        <span
                          v-html="item.name"
                          style="font-size: 14px; color: #868E96;margin-left:5px"
                        ></span>
                      </div>
                      <div
                        v-html="yearIncomeValueLIst[index]"
                        style="font-size: 24px; color: #303030;padding-left:23px;height:36px"
                      ></div>
                    </li>
                  </ul>
                </div>
              </i-col>
              <i-col span="24">
                <div class="quarterIncome">
                  <div style="margin-bottom: 30px;">季度营收和利润</div>
                  <div class="charts-wrapper">
                    <div id="teamsku"></div>
                    <div id="teamskuPercent"></div>
                  </div>
                </div>
              </i-col>
            </Row>
          </div>
          <div class="teamcustomermonth">
            <h2 class="teamcustomermonth-title">客户概况</h2>
            <div class="teamcustomermonth-content dashboradTab">
              <span style="font-size:14px">时间段</span>
              <DatePicker
                v-model="teamcustomermonthData.fromtime"
                @on-change="teamcustomermonthDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="teamcustomermonthData.totime"
                @on-change="teamcustomermonthDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="teamcustomermonth" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane class="tabpane" label="执行力" ref="execution" name="execution">
        <div id="executions">
          <div class="taskNumber">
            <h2 class="taskNumber-title">任务数量</h2>
            <div class="taskNumber-content dashboradTab">
              <span style="font-size:14px">任务创建时间</span>
              <DatePicker
                v-model="teammonthtasknumberData.fromtime"
                @on-change="teammonthtasknumberDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="teammonthtasknumberData.totime"
                @on-change="teammonthtasknumberDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="teammonthtasknumber" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
          <div class="timeConsuming">
            <h2 class="timeConsuming-title">任务耗时</h2>
            <div class="timeConsuming-content dashboradTab">
              <span style="font-size:14px">任务创建时间</span>
              <DatePicker
                v-model="teammonthdurtimeData.fromtime"
                @on-change="teammonthdurtimeDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="teammonthdurtimeData.totime"
                @on-change="teammonthdurtimeDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="teammonthdurtime" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane class="tabpane" label="行业情况" ref="industry" name="industry">
        <div id="industrys">
          <div class="industry">
            <Row style="border : 1px solid #e9ecef" type="flex" align="middle">
              <i-col span="12">
                <h2 class="yearIncome-title" style="border : none">行业概况</h2>
              </i-col>
              <!-- <i-col span="12" v-if="canManage" class="addOrigin">
                    <Button @click="industryModal = true" style="background:white">
                      <img src="@/assets/images/ic_add.svg" alt style="vertical-align: middle">
                      <span style="color :#868E96;font-size:14px">添加各行业公司的营业额</span>
                    </Button>
              </i-col>-->
              <i-col span="12" v-if="canManage" class="addOrigin">
                <Button @click="industryModal = true" style="background:white">
                  <img src="@/assets/images/ic_revise.svg" alt style="vertical-align: middle">
                  <span style="color :#868E96;font-size:14px">修改各行业公司的营业额</span>
                </Button>
              </i-col>
            </Row>
            <div class="industry-content dashboradTab">
              <span style="font-size:14px">时间段</span>
              <DatePicker
                v-model="industryData.fromtime"
                @on-change="industryDataFromtime"
                type="year"
                placeholder="选择开始时间"
                format="yyyy"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="industryData.totime"
                @on-change="industryDataTotime"
                type="year"
                placeholder="选择结束时间"
                format="yyyy"
                style="width:130px"
              ></DatePicker>
              <div id="industry" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <toast :is-toast="isToast" :msg="msg"></toast>
    <!-- 业务概况弹框 -->
    <Modal v-model="businessModal" width="540">
      <p slot="header" style="color:#343A40 ;text-align:center;font-size:18px">
        <span>{{titleText}}本年度目标</span>
      </p>
      <div class="businessRef">
        <Form
          ref="businessRef"
          :model="businessFormItem"
          :label-width="100"
          style="padding: 40px 30px 20px 30px;"
        >
          <FormItem prop="income" label="目标营收" style="font-size:14px">
            <Input
              type="text"
              size="large"
              v-model="businessFormItem.income"
              placeholder="请填写目标营收额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
          <FormItem prop="profit" label="目标利润">
            <Input
              type="text"
              size="large"
              v-model="businessFormItem.profit"
              placeholder="请填写目标利润额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
        </Form>
      </div>

      <div slot="footer">
        <div style="text-align:center">
          <!-- <button class="cancelButton">取消</button>
          <button class="saveButton">提交</button>-->
          <Button
            @click="businessModal = false"
            type="ghost"
            size="large"
            style="width:120px;height:48px;color:#2D8EF8 ;border : 1px solid #2D8EF8;font-size:16px "
          >取消</Button>
          <Button
            @click="companyAdd"
            type="primary"
            size="large"
            style="width:120px;height:48px;font-size:16px"
          >提交</Button>
        </div>
      </div>
    </Modal>
    <!-- 行业情况弹框 -->
    <Modal v-model="industryModal" @on-visible-change="onVisibleChange" width="540">
      <p slot="header" style="color:#343A40 ;text-align:center;font-size:18px">
        <span>修改各行业公司营业额</span>
      </p>
      <div class="industryRef">
        <Form
          ref="industryRef"
          :model="industryFormItem"
          :label-width="100"
          style="padding: 40px 30px 20px 30px;"
        >
          <FormItem prop="year" label="年份" style="font-size:14px">
            <DatePicker
              v-model="industryFormItem.year"
              @on-change="getYearInfo"
              size="large"
              type="year"
              placeholder="请选择年份"
              style="width:100%"
              format="yyyy"
            ></DatePicker>
          </FormItem>
          <FormItem prop="creativeIncome" label="创意公司" style="font-size:14px">
            <Input
              type="text"
              size="large"
              v-model="industryFormItem.creativeIncome"
              placeholder="请输入公司营业额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
          <FormItem prop="mediaIncome" label="媒介公司">
            <Input
              type="text"
              size="large"
              v-model="industryFormItem.mediaIncome"
              placeholder="请输入公司营业额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
          <FormItem prop="techIncome" label="技术公司">
            <Input
              type="text"
              size="large"
              v-model="industryFormItem.techIncome"
              placeholder="请输入公司营业额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
          <FormItem prop="copyIncome" label="内容公司">
            <Input
              type="text"
              size="large"
              v-model="industryFormItem.copyIncome"
              placeholder="请输入公司营业额"
            >
              <span slot="append">万元</span>
            </Input>
          </FormItem>
          <FormItem prop="growRate" label="增长率">
            <Input
              type="text"
              size="large"
              v-model="industryFormItem.growRate"
              placeholder="请输入增长率"
            >
              <span slot="append">%</span>
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <div style="text-align:center">
          <Button
            @click="industryModal = false"
            type="ghost"
            size="large"
            style="width:120px;height:48px;color:#2D8EF8 ;border : 1px solid #2D8EF8;font-size:16px "
          >取消</Button>
          <Button
            @click="industryAdd"
            type="primary"
            size="large"
            style="width:120px;height:48px;font-size:16px"
          >提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Dashborad, Index } from "../../API/api";
import Toast from "../../components/popup/Toast";
import { ajax, dashboradColor, maxValue, maxPercent } from "../../util/util";
var echarts = require("echarts");

var color = dashboradColor;

function toTime1(time) {
  var d = new Date(time);
  var datetime = d.getFullYear() + "年" + (d.getMonth() + 1) + "月";
  return datetime;
}
function toTime2(time) {
  if (typeof time !== "string") {
    var d = new Date(time);
    var datetime =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1));
    return datetime;
  } else {
    return time;
  }
}

var defaultStartYear = (new Date().getFullYear() - 4).toString();
var defaultEndYear = new Date().getFullYear().toString();

var defaultStartTime = new Date().getFullYear() + "-01"
var defaultEndTime =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));

var companypersondepartChart = "";
var configurationChart = "";
var teamskuChart = "";
var teamcustomermonthChart = "";
var teammonthtasknumberChart = "";
var teammonthdurtimeChart = "";
var industryChart = "";

window.addEventListener("resize", () => {
  companypersondepartChart.resize();
  configurationChart.resize();
  teamskuChart.resize();
  teamcustomermonthChart.resize();
  teammonthtasknumberChart.resize();
  teammonthdurtimeChart.resize();
  industryChart.resize();
});
export default {
  components: {
    Toast
  },
  data() {
    return {
      tabsHeightList: [],
      refList: ["personOverview", "businessOverview", "execution", "industry"],
      /* 业务概况 */
      titleText: "新增",
      isBusinessAdd: true,
      targetIncome: "",
      targetProfit: "",
      businessModal: false,
      businessFormItem: {
        income: "",
        profit: ""
      },
      /* 行业情况 */
      industryModal: false,
      industryFormItem: {
        year: "",
        creativeIncome: "",
        mediaIncome: "",
        techIncome: "",
        copyIncome: "",
        growRate: ""
      },

      canManage: false,
      year: defaultEndYear,
      yearIncomeList: [
        {
          name: "本年度目标营收",
          icon: require("@/assets/images/ic_target income_blue.svg")
        },
        {
          name: "实际总营收额",
          icon: require("@/assets/images/ic_actual revenue_blue.svg")
        },
        {
          name: "营收完成率",
          icon: require("@/assets/images/ic_completion rate_blue.svg")
        },
        {
          name: "本年度目标利润",
          icon: require("@/assets/images/ic_target income_yellow.svg")
        },
        {
          name: "实际总利润额",
          icon: require("@/assets/images/ic_actual revenue_yellow.svg")
        },
        {
          name: "利润完成率",
          icon: require("@/assets/images/ic_completion rate_yellow.svg")
        }
      ],
      yearIncomeValueLIst: [],
      msg: "",
      animatedTab: true,
      isToast: false,
      allTeamList: [],
      teamcustomermonthData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      teammonthtasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      teammonthdurtimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      industryData: {
        fromtime: defaultStartYear,
        totime: defaultEndYear
      }
    };
  },
  methods: {
    refreshEcharts() {
      companypersondepartChart.resize();
      configurationChart.resize();
      teamskuChart.resize();
      teamcustomermonthChart.resize();
      teammonthtasknumberChart.resize();
      teammonthdurtimeChart.resize();
      industryChart.resize();
    },
    tabClick(name) {
      this.refList.forEach((element, index) => {
        if (name != element) {
          this.$refs[element].$el.style.height = 0;
        } else {
          this.$refs[element].$el.style.height =
            this.tabsHeightList[index] + "px";
        }
      });
    },
    getTabsHeight() {
      var tab1 = document.getElementById("personOverviews").clientHeight;
      var tab2 = document.getElementById("businessOverviews").clientHeight;
      var tab3 = document.getElementById("executions").clientHeight;
      var tab4 = document.getElementById("industrys").clientHeight;
      this.tabsHeightList.push(tab1);
      this.tabsHeightList.push(tab2);
      this.tabsHeightList.push(tab3);
      this.tabsHeightList.push(tab4);
    },
    getYearInfo(e) {
      var year = e;
      this.$http
        .post(
          Dashborad.companyindustry,
          this.qs.stringify({
            fromtime: year,
            totime: year
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          var _data = res.data.retData.chartResult[0];
          this.industryFormItem = _data;
        });
    },
    onVisibleChange(bool) {
      if (bool == false) {
        this.$refs["industryRef"].resetFields();
      }
    },
    industryAdd() {
      var formData = Object.assign(this.industryFormItem);
      this.$http
        .post(Dashborad.industryadd, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          if (res.data.retCode == 0) {
            this.industryModal = false;
            this.industry();
            this.msg = "修改成功";
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          } else {
            this.msg = res.data.retMsg;
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          }
        });
    },
    changeBusinessModal(text) {
      this.businessModal = true;
      this.titleText = text;
    },
    companyAdd() {
      var year = new Date(this.year).getFullYear().toString();
      this.$http
        .post(
          Dashborad.companyadd,
          this.qs.stringify({
            year: year,
            income: this.businessFormItem.income,
            margin: this.businessFormItem.profit
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          if (res.data.retCode == 0) {
            this.businessModal = false;
            this.isBusinessAdd = false;
            this.teamsku();
            this.msg = this.titleText + "成功";
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          } else {
            this.msg = res.data.retMsg;
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          }
        });
    },
    getRole() {
      ajax.post(Index.sysNoticeRole).then(res => {
        this.canManage = res.add;
      });
    },
    timeChange(start, end, type) {
      var startYear = +new Date(start).getFullYear();
      var startMonth = +new Date(start).getMonth();
      var endYear = +new Date(end).getFullYear();
      var endMonth = +new Date(end).getMonth();
      var timeGap = false;
      if (endYear == startYear) {
        timeGap = true;
      } else if (endYear - startYear == 1 && 12 - startMonth + endMonth <= 11) {
        timeGap = true;
      }
      if (start && end) {
        if (start < end) {
          if (timeGap) {
            switch (type) {
              case 1:
                this.teamcustomermonth();
                break;
              case 2:
                this.teammonthtasknumber();
                break;
              case 3:
                this.teammonthdurtime();
                break;
            }
          } else {
            this.msg = "起止时间段最长为12个月";
            this.isToast = true;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          }
        } else {
          this.msg = "起始时间需小于截止时间";
          this.isToast = true;
          setTimeout(() => {
            this.isToast = false;
          }, 2000);
        }
      }
    },
    changeYear(e) {
      this.year = e;
      this.teamsku();
    },
    teamcustomermonthDataFromtime(e) {
      this.teamcustomermonthData.fromtime = e;
      var startTime = new Date(this.teamcustomermonthData.fromtime).getTime();
      var endTime = new Date(this.teamcustomermonthData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    teamcustomermonthDataTotime(e) {
      this.teamcustomermonthData.totime = e;
      var startTime = new Date(this.teamcustomermonthData.fromtime).getTime();
      var endTime = new Date(this.teamcustomermonthData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    teammonthtasknumberDataFromtime(e) {
      this.teammonthtasknumberData.fromtime = e;
      var startTime = new Date(this.teammonthtasknumberData.fromtime).getTime();
      var endTime = new Date(this.teammonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    teammonthtasknumberDataTotime(e) {
      this.teammonthtasknumberData.totime = e;
      var startTime = new Date(this.teammonthtasknumberData.fromtime).getTime();
      var endTime = new Date(this.teammonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    teammonthdurtimeDataFromtime(e) {
      this.teammonthdurtimeData.fromtime = e;
      var startTime = new Date(this.teammonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.teammonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    teammonthdurtimeDataTotime(e) {
      this.teammonthdurtimeData.totime = e;
      var startTime = new Date(this.teammonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.teammonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    industryDataFromtime(e) {
      this.teammonthdurtimeData.fromtime = e;
      if (
        this.industryData.totime.getFullYear() >
        this.industryData.fromtime.getFullYear()
      ) {
        this.industry();
      } else {
        this.msg = "起始时间需小于截止时间";
        this.isToast = true;
        setTimeout(() => {
          this.isToast = false;
        }, 2000);
      }
    },
    industryDataTotime(e) {
      this.teammonthdurtimeData.totime = e;
      if (
        this.industryData.totime.getFullYear() >
        this.industryData.fromtime.getFullYear()
      ) {
        this.industry();
      } else {
        this.msg = "起始时间需小于截止时间";
        this.isToast = true;
        setTimeout(() => {
          this.isToast = false;
        }, 2000);
      }
    },

    configuration() {
      var allPost = [
        this.$http.post(Dashborad.companypersondepart, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        }),
        this.$http.post(Dashborad.companydepartinteam, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
      ];
      Promise.all(allPost).then(
        ([companypersondepart, companydepartinteam]) => {
          var vm = this;
          //公司
          var companypersondepartRes = companypersondepart.data.retData;
          var companypersondepartData = companypersondepartRes.chartResult;
          var newData = [];
          var legendName = [];
          for (var i = 0; i < companypersondepartData.length; i++) {
            var newObj = {};
            var str = "";
            Object.keys(companypersondepartData[i]).forEach(function(key) {
              if (key == "userNum") {
                newObj["value"] = companypersondepartData[i][key];
              } else if (key == "departmentName") {
                newObj["name"] = companypersondepartData[i][key];
                str = companypersondepartData[i][key];
              }
            });
            newData.push(newObj);
            legendName.push(str);
          }
          companypersondepartChart = echarts.init(
            document.getElementById("companypersondepart")
          );
          companypersondepartChart.clear();
          companypersondepartChart.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              x: "left",
              data: legendName,
              type: "scroll"
            },

            color: color,
            graphic: {
              type: "text",
              left: "center",
              top: "center",
              style: {
                text: "总计\n\n" + companypersondepartRes.userNumber + "人",
                textAlign: "center",
                fill: "#000",
                width: 30,
                height: 30,
                font: ' 1em "STHeiti", sans-serif'
              }
            },

            series: [
              {
                name: "人员数量占比",
                type: "pie",
                radius: ["25%", "50%"],
                label: {
                  //饼图图形上的文本标签
                  normal: {
                    show: true,
                    position: "outside", //标签的位置
                    textStyle: {
                      fontWeight: 300,
                      fontSize: 16 //文字的字体大小
                    },
                    formatter: "{d}%"
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: newData
              }
            ]
          });

          //事业部
          var companydepartinteamRes = companydepartinteam.data.retData;
          var companydepartinteamData = companydepartinteamRes.chartResult;
          var teamLengedData = legendName;
          var teamxAxisData = [];
          var teamSeries = [];
          this.allTeamList = [];
          teamLengedData.forEach((element, index) => {
            teamSeries.push({
              name: element,
              type: "bar",
              stack: "team",
              data: []
            });
          });

          companydepartinteamData.forEach((element, index) => {
            teamxAxisData.push(element.teamName);
            this.allTeamList.push(element.userNum);
            element.inDepart.forEach((ele, ind) => {
              teamSeries[ind].data.push(ele.userNum);
            });
          });
          configurationChart = echarts.init(
            document.getElementById("companydepartinteam")
          );
          configurationChart.clear();
          configurationChart.setOption({
            grid: {
              bottom: 240
            },
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                var result =
                  params[0].name +
                  "</br>" +
                  "总计：" +
                  vm.allTeamList[params[0].dataIndex] +
                  "人" +
                  "</br>";

                params.forEach(function(item, index) {
                  if (item.value) {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      "：" +
                      item.value +
                      "人" +
                      "</br>";
                  }
                });

                return result;
              },
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black"
                }
              }
            },
            color: color,
            legend: {
              data: teamLengedData,
              show: false
            },

            xAxis: [
              {
                type: "category",
                data: teamxAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  interval: 0,
                  rotate: "-45",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "人数",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                // min: 0,
                // max: 20,
                // interval:  2,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: teamSeries
          });
        }
      );
    },
    teamsku() {
      var year = new Date(this.year).getFullYear().toString();
      this.$http
        .post(
          Dashborad.companysku,
          this.qs.stringify({
            year: year
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          var _data = res.data.retData;
          this.yearIncomeValueLIst = [];
          this.yearIncomeValueLIst.push(_data.baojiadanAmountTarget + "万元");
          this.yearIncomeValueLIst.push(_data.baojiadanAmount + "万元");
          this.yearIncomeValueLIst.push(_data.baojiadanFinishPercent + "%");
          this.yearIncomeValueLIst.push(_data.marginAmountTarget + "万元");
          this.yearIncomeValueLIst.push(_data.marginAmount + "万元");
          this.yearIncomeValueLIst.push(_data.marginFinishPercent + "%");
          //添加或修改
          if (_data.baojiadanAmountTarget || _data.marginAmountTarget) {
            this.isBusinessAdd = false;
          } else {
            this.isBusinessAdd = true;
          }

          this.businessFormItem.income = _data.baojiadanAmountTarget;
          this.businessFormItem.profit = _data.marginAmountTarget;

          var xAxisData = ["Q1", "Q2", "Q3", "Q4"];
          var series = [
            {
              name: "实际营收",
              type: "bar",
              data: [],
              barCateGoryGap: 0,
              barGap: 0
            },
            {
              name: "实际利润",
              type: "bar",
              data: [],
              barCateGoryGap: 0,
              barGap: 0
            },
          ];
          let percentSerires = [
            {
              name: "营收完成率",
              type: "line",
              data: []
            },
            {
              name: "利润完成率",
              type: "line",
              data: []
            }
          ];

          _data.chartResult.forEach(element => {
            series[0].data.push(element.baojiadanAmount);
            series[1].data.push(element.marginAmount);
            percentSerires[0].data.push(element.baojiadanFinishPercent);
            percentSerires[1].data.push(element.marginFinishPercent);
          });

          teamskuChart = echarts.init(document.getElementById("teamsku"));
          teamskuChart.clear();
          teamskuChart.setOption({
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black",
                  backgroundColor : '#dee2e6'
                }
              },
              formatter: function(params) {
                var result = params[0].axisValue + "</br>";

                params.forEach(function(item, index) {
                  result +=  `${item.marker} ${item.seriesName} : ${item.value}万元</br>`;
                });
                return result;
              }
            },
            color: color,
            legend: {
              data: [
                "实际营收",
                "实际利润"
              ]
            },
            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "收入值（万）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                },
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: series
          });

          let teamskuPercentChart = echarts.init(document.getElementById("teamskuPercent"));
          teamskuPercentChart.setOption({
            legend: {
              data: [
                "营收完成率",
                "利润完成率"
              ]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black",
                  backgroundColor : '#dee2e6'
                }
              },
              formatter(series) {
                let tooltip = series[0].axisValue + "</br>";
                series.forEach(function(item) {
                  tooltip +=  `${item.marker} ${item.seriesName} : ${item.value}%</br>`;
                });
                return tooltip;
              },
            },
            color: color,
            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "完成率（%）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                },
                axisLabel: {
                  formatter: "{value} %",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: percentSerires
          });
        });
    },
    teamcustomermonth() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: "",
        teamId: ""
      };
      var newData = Object.assign({}, this.teamcustomermonthData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      formdata.teamId = this.$route.query.id;
      this.$http
        .post(Dashborad.companycustomermonth, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          var _data = res.data.retData.chartResult;

          var xAxisData = [];
          var series = [
            {
              name: "总持有客户",
              type: "bar",
              stack: "customer",
              data: []
            },
            {
              name: "新增客户",
              type: "bar",
              stack: "customer",
              data: []
            },
            {
              name: "客户保持率",
              type: "line",
              yAxisIndex: 1,
              data: []
            }
          ];
          var lengedData = ["总持有客户", "新增客户", "客户保持率"];
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.oldEndNum);
            series[1].data.push(element.newNum);
            series[2].data.push(element.activePercent);
          });

          var leftMaxY =
            Math.max.apply(null, series[0].data) +
            Math.max.apply(null, series[1].data);

          var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
          var rightMaxY = Math.max(Math.max.apply(null, series[2].data));
          var rightMaxCeilY = maxPercent(rightMaxY);
          teamcustomermonthChart = echarts.init(
            document.getElementById("teamcustomermonth")
          );
          teamcustomermonthChart.clear();
          teamcustomermonthChart.setOption({
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                var newList = _data[params[0].dataIndex].newList;
                var oldEndList = _data[params[0].dataIndex].oldEndList;
                var result = params[0].axisValue + "</br>";
                params.forEach(function(item, index) {
                  if (item.componentSubType == "bar") {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "</br>";

                    if (item.seriesIndex == 1) {
                      for (var i = 0; i < newList.length; i++) {
                        result += `<div><span style='margin-left:20px;color:#FFE15B'>${
                          newList[i].customerName
                        }</span></div>`;
                      }
                    } else if (item.seriesIndex == 0) {
                      for (var i = 0; i < oldEndList.length; i++) {
                        result += `<div><span style='margin-left:20px;color:#57A5F9'>${
                          oldEndList[i].customerName
                        }</span></div>`;
                      }
                    }
                  } else {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "%" +
                      "</br>";
                  }
                });
                return result;
              },
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black"
                }
              }
            },
            color: color,
            legend: {
              data: lengedData
            },

            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "客户数量（个）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: leftMaxCeilY,
                interval: leftMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              },
              {
                type: "value",
                name: "客户保持率（%）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: rightMaxCeilY,
                interval: rightMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value} %",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: series
          });
        });
    },
    teammonthtasknumber() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.teammonthtasknumberData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.companymonthtasknumber, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data.retData.chartResult;
          var xAxisData = [];
          var series = [
            {
              name: "发布任务数",
              type: "bar",
              barCateGoryGap: 0,
              barGap: 0,
              data: []
            },
            {
              name: "接受任务数",
              type: "bar",
              barCateGoryGap: 0,
              barGap: 0,
              data: []
            },
            {
              name: "任务被完成率",
              type: "line",
              yAxisIndex: 1,
              data: []
            },
            {
              name: "任务完成率",
              type: "line",
              yAxisIndex: 1,
              data: []
            },
            {
              name: "单次任务质检通过率",
              type: "line",
              yAxisIndex: 1,
              data: []
            }
          ];
          var lengedData = [
            "发布任务数",
            "接受任务数",
            "任务被完成率",
            "任务完成率",
            "单次任务质检通过率"
          ];
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.taskCreateNum);
            series[1].data.push(element.taskOperationNum);
            series[2].data.push(element.taskCommenFinishCreatePercent);
            series[3].data.push(element.taskCommenFinishOperationPercent);
            series[4].data.push(element.inspectYesNumOncePercent);
          });
          var leftMaxY = Math.max(
            Math.max.apply(null, series[0].data),
            Math.max.apply(null, series[1].data)
          );
          var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
          var rightMaxY = Math.max(
            Math.max(
              Math.max.apply(null, series[2].data),
              Math.max.apply(null, series[3].data)
            ),
            Math.max.apply(null, series[4].data)
          );
          var rightMaxCeilY = maxPercent(rightMaxY);
          teammonthtasknumberChart = echarts.init(
            document.getElementById("teammonthtasknumber")
          );
          teammonthtasknumberChart.clear();
          teammonthtasknumberChart.setOption({
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black"
                }
              },
              formatter: function(params) {
                var result = params[0].axisValue + "</br>";
                params.forEach(function(item, index) {
                  if (item.componentSubType == "bar") {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      // "个" +
                      "</br>";
                  } else {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "%" +
                      "</br>";
                  }
                });
                return result;
              }
            },
            legend: {
              data: lengedData
            },
            color: color,

            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "任务数量（个）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: leftMaxCeilY,
                interval: leftMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              },
              {
                type: "value",
                name: "任务完成率（%）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: rightMaxCeilY,
                interval: rightMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}%",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: series
          });
        })
        .catch(() => {})
        .finally(() => {});
    },
    teammonthdurtime() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.teammonthdurtimeData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.companymonthdurtime, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data.retData.chartResult;
          var xAxisData = [];
          var series = [
            {
              name: "任务平均耗时",
              type: "bar",
              barCateGoryGap: 0,
              barGap: 0,
              data: []
            },
            {
              name: "任务平均更新次数",
              type: "bar",
              barCateGoryGap: 0,
              barGap: 0,
              yAxisIndex: 1,
              data: []
            }
          ];
          var lengedData = ["任务平均耗时", "任务平均更新次数"];
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.operationAvgDurTime);
            series[1].data.push(element.taskAvgVersionNum);
          });

          var leftMaxY = Math.max.apply(null, series[0].data);
          var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
          var rightMaxY = Math.max.apply(null, series[1].data);
          var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);

          teammonthdurtimeChart = echarts.init(
            document.getElementById("teammonthdurtime")
          );
          teammonthdurtimeChart.clear();
          teammonthdurtimeChart.setOption({
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                var result = params[0].axisValue + "</br>";
                params.forEach(function(item, index) {
                  if (item.seriesIndex == 0) {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "天" +
                      "</br>";
                  } else {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "</br>";
                  }
                });
                return result;
              },
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black"
                }
              }
            },
            legend: {
              data: lengedData
            },
            color: color,

            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "任务耗时（天）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: leftMaxCeilY,
                interval: leftMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              },
              {
                type: "value",
                name: "更新次数",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: rightMaxCeilY,
                interval: rightMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: series
          });
        })
        .catch(() => {})
        .finally(() => {});
    },
    industry() {
      this.$http
        .post(
          Dashborad.companyindustry,
          this.qs.stringify({
            fromtime: this.industryData.fromtime.getFullYear(),
            totime: this.industryData.totime.getFullYear()
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          var _data = res.data.retData.chartResult;
          var allData = [];
          var sumArr = [];
          var lengedData = [
            "创意公司",
            "媒介公司",
            "技术公司",
            "内容公司",
            "增长率"
          ];
          var xAxisData = [];
          var series = [
            {
              name: "创意公司",
              type: "bar",
              stack: "company",
              data: []
            },
            {
              name: "媒介公司",
              type: "bar",
              stack: "company",
              data: []
            },
            {
              name: "技术公司",
              type: "bar",
              stack: "company",
              data: []
            },
            {
              name: "内容公司",
              type: "bar",
              stack: "company",
              data: []
            },
            {
              name: "增长率",
              type: "line",
              yAxisIndex: 1,
              data: []
            }
          ];
          _data.forEach((element, index) => {
            xAxisData.push(element.year);
            series[0].data.push(element.creativeIncome);
            series[1].data.push(element.mediaIncome);
            series[2].data.push(element.techIncome);
            series[3].data.push(element.copyIncome);
            series[4].data.push(element.growRate);
          });

          if (_data.length) {
            series.forEach((element, index) => {
              if (index < series.length - 1) {
                allData.push(element.data);
              }
            });
            allData.forEach(element => {
              element.forEach((ele, index) => {
                sumArr[index] =
                  (sumArr[index] ? sumArr[index] : 0) + Number(ele);
              });
            });
          } else {
            sumArr = [10];
          }

          var leftMaxY = Math.max.apply(null, sumArr);
          var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);

          var rightMaxY = Math.max.apply(null, series[4].data);
          var rightMaxCeilY = maxPercent(rightMaxY);

          industryChart = echarts.init(document.getElementById("industry"));
          industryChart.clear();
          industryChart.setOption({
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                var result = params[0].axisValue + "年" + "</br>";
                params.forEach(function(item, index) {
                  if (item.componentSubType == "bar") {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      "营收额: " +
                      item.value +
                      "万元" +
                      "</br>";
                  } else {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
                      "%" +
                      "</br>";
                  }
                });
                return result;
              },
              axisPointer: {
                type: "cross",
                crossStyle: {
                  color: "#999"
                },
                label: {
                  color: "black"
                }
              }
            },
            color: color,
            legend: {
              data: lengedData
            },

            xAxis: [
              {
                type: "category",
                data: xAxisData,
                axisPointer: {
                  type: "shadow"
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "营收额（万元）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: leftMaxCeilY,
                interval: leftMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value}",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              },
              {
                type: "value",
                name: "增长率（%）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: rightMaxCeilY,
                interval: rightMaxCeilY / 10,
                axisLabel: {
                  formatter: "{value} %",
                  textStyle: {
                    color: "#999", //坐标值得具体的颜色
                    fontSize: 14
                  }
                },
                axisLine: {
                  lineStyle: {
                    type: "solid",
                    color: "#e9ecef", //左边线的颜色
                    width: "1" //坐标线的宽度
                  }
                }
              }
            ],
            series: series
          });
        });
    }
  },
  created() {
    this.getRole();
  },
  computed: {
    dashboradNum() {
      return this.$store.state.index.dashboradNum;
    }
  },
  mounted() {
    this.getTabsHeight();
    this.tabClick("personOverview");
    this.configuration();
    this.teamsku();
    this.teamcustomermonth();
    this.teammonthtasknumber();
    this.teammonthdurtime();
    this.industry();
  },
  watch: {
    dashboradNum(newVal, oldVAl) {
      this.refreshEcharts();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  font-size: 16px;
}

.configuration,
.yearIncome,
.teamcustomermonth,
.taskNumber,
.timeConsuming,
.industry {
  border: 1px solid #e9ecef;
  padding-bottom: 50px;
}

.overtime,
.teamcustomermonth,
.timeConsuming {
  margin-top: 30px;
}

.configuration-title,
.yearIncome-title,
.teamcustomermonth-title,
.taskNumber-title,
.timeConsuming-title {
  /* font-family: PingFangSC-mediaIncome; */
  font-size: 16px;
  /* color: #303030; */
  letter-spacing: 0;
  border-bottom: 1px solid #e9ecef;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.incomeGeneration-copyIncome,
.incomeGeneration-left-content,
.yearIncome-content,
.yearProfit,
.quarterIncome,
.teamcustomermonth-content,
.taskNumber-content,
.timeConsuming-content,
.industry-content,
.incomeGeneration-content {
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
}

.quarterIncome {
  .charts-wrapper {
    display: flex;
    justify-content: space-between;

    > div {
      flex-basis: 45%;
      height: 350px;
    }
  }
}

.incomeGeneration-right-content {
  border-left: 1px dashed #e9ecef;
  margin-top: 100px;
}

.yearProfit {
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    border-bottom: 1px dashed #e9ecef;

    > li {
      margin-top: 10px;
      flex-basis: 33%;
    }
  }
}

.addOrigin {
  text-align: right;
  padding-right: 20px;

  button {
    border: none;
    cursor: pointer;
  }
}

// .cancelButton {
//   cursor: pointer;
//   // outline: none;
//   display: inline-block;
//   width: 120px;
//   background: white;
//   border: 1px #2d8ef8 solid;
//   border-radius: 3px;
//   height: 40px;
//   color: #2d8ef8;
//   font-size: 16px;
// }
// .saveButton {
//   cursor: pointer;
//   // outline: none;
//   display: inline-block;
//   width: 120px;
//   background: #2d8ef8;
//   border: none;
//   border-radius: 3px;
//   height: 40px;
//   color: white;
//   font-size: 16px;
// }
.businessRef .ivu-form .ivu-form-item-label {
  // text-align: left;
  font-size: 16px !important;
}
</style>
