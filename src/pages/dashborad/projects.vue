<template>
  <div class="dashborad dashboradProject" :style="{width : dashboradWidth}">
    <Tabs value="overview" class="tabs" @on-click="tabClick">
      <TabPane class="tabpane" label="概况" ref="overview" name="overview">
        <div id="overviews">
          <div class="overview">
            <h2 class="overview-title">项目概况</h2>
            <div class="overview-content">
              <div class="overview-left">
                <div class="overview-left-head">项目各项指标完成情况</div>
                <div class="overview-left-content">
                  <ul>
                    <li v-for="(item, index) in quotaList" :key="index">
                      <template v-if="item.name == '总任务个数'">
                        <el-tooltip effect="dark" placement="right" :disabled="!taskNumList.length">
                          <div slot="content">
                            <ul v-for="(product, productInd) in taskNumList" :key="productInd">
                              <div style="font-size:15px">{{product.productName}}</div>
                              <li v-for="(toolkit, toolkitInd) in product.toolkitList" :key="toolkitInd" style="margin:10px;font-size:14px">
                                {{toolkit.toolkitName}} - {{toolkit.number}}
                              </li>
                            </ul>
                          </div>
                          <div style="display:inline-block">
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
                              v-html="quotaListValue[index]"
                              style="font-size: 24px; color: #303030;padding-left:23px"
                            ></div>
                          </div>
                        </el-tooltip>
                      </template>
                      <template v-else>
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
                          v-html="quotaListValue[index]"
                          style="font-size: 24px; color: #303030;padding-left:23px"
                        ></div>
                      </template>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="overview-right">
                <div style="padding-bottom :30px">当前项目中不同职能人员数量占比</div>
                <div id="numberScale" style="height : 390px"></div>
                <!-- <ve-ring :data="chartData" :settings="chartSettings" width='100%'></ve-ring> -->
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane class="tabpane" label="任务执行" ref="taskExecution" name="taskExecution">
        <div id="taskExecutions">
          <div class="taskExecution">
            <h2 class="taskExecution-title">任务数量</h2>
            <div class="taskExecution-content dashboradTab">
              <Tabs label="按月份显示" :animated="true">
                <TabPane class="tabpane" label="按月份显示" style="padding-left:20px;padding-right:20px">
                  <span style="font-size:14px">任务创建时间</span>
                  <DatePicker
                    v-model="execmonthtasknumberData.fromtime"
                    @on-change="execmonthtasknumberDataFromtime"
                    type="month"
                    placeholder="选择开始时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <span>—</span>
                  <DatePicker
                    v-model="execmonthtasknumberData.totime"
                    @on-change="execmonthtasknumberDataTotime"
                    type="month"
                    placeholder="选择结束时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <div id="execmonthtasknumber" style="height : 400px;margin-top: 30px"></div>
                </TabPane>
                <TabPane
                  class="tabpane"
                  label="按职能部门显示"
                  style="padding-left:20px;padding-right:20px"
                >
                  <span style="font-size:14px">任务创建时间</span>
                  <DatePicker
                    v-model="execdepartmenttasknumberData.fromtime"
                    @on-change="execdepartmenttasknumberDataFromtime"
                    type="month"
                    placeholder="选择开始时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <span>—</span>
                  <DatePicker
                    v-model="execdepartmenttasknumberData.totime"
                    @on-change="execdepartmenttasknumberDataTotime"
                    type="month"
                    placeholder="选择结束时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <div id="execdepartmenttasknumber" style="height : 470px;margin-top: 30px"></div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div class="timeConsuming">
            <h2 class="timeConsuming-title">任务耗时</h2>
            <div class="timeConsuming-content dashboradTab">
              <Tabs label="按月份显示" :animated="true">
                <TabPane class="tabpane" label="按月份显示" style="padding-left:20px;padding-right:20px">
                  <span style="font-size:14px">任务创建时间</span>
                  <DatePicker
                    v-model="execmonthdurtimeData.fromtime"
                    @on-change="execmonthdurtimeDataFromtime"
                    type="month"
                    placeholder="选择开始时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <span>—</span>
                  <DatePicker
                    v-model="execmonthdurtimeData.totime"
                    @on-change="execmonthdurtimeDataTotime"
                    type="month"
                    placeholder="选择结束时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <div id="execmonthdurtime" style="height : 400px;margin-top: 30px"></div>
                </TabPane>
                <TabPane
                  class="tabpane"
                  label="按职能部门显示"
                  style="padding-left:20px;padding-right:20px"
                >
                  <span style="font-size:14px">任务创建时间</span>
                  <DatePicker
                    v-model="execdepartmentdurtimeData.fromtime"
                    @on-change="execdepartmentdurtimeDataFromtime"
                    type="month"
                    placeholder="选择开始时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <span>—</span>
                  <DatePicker
                    v-model="execdepartmentdurtimeData.totime"
                    @on-change="execdepartmentdurtimeDataTotime"
                    type="month"
                    placeholder="选择结束时间"
                    format="yyyy-MM"
                    style="width:130px"
                  ></DatePicker>
                  <div id="execdepartmentdurtime" style="height : 470px;margin-top: 30px"></div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <toast :is-toast="isToast" :msg="msg"></toast>
  </div>
</template>
<script>
import { Dashborad, Task } from "../../API/api";
import Toast from "../../components/popup/Toast";
import { dashboradColor, maxValue } from "../../util/util";
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

let defaultStartTime = new Date().getFullYear() + "-01";

let defaultEndTime =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));

var projectChart = "";
var execmonthtasknumberChart = "";
var execdepartmenttasknumberChart = "";
var execmonthdurtimeChart = "";
var execdepartmentdurtimeChart = "";

// window.addEventListener("resize", () => {
//    projectChart.resize();
//    execmonthtasknumberChart.resize();
//    execdepartmenttasknumberChart.resize();
//    execmonthdurtimeChart.resize();
//    execdepartmentdurtimeChart.resize();
// });
export default {
  components: {
    Toast
  },
  data() {
    return {
      dashboradWidth: "100%",
      tabsHeightList: [],
      refList: ["overview", "taskExecution"],
      msg: "",
      isToast: false,
      taskNumList: [],
      quotaList: [
        {
          name: "项目营收额",
          icon: require("@/assets/images/ic_actual revenue_blue.svg")
        },
        {
          name: "项目利润额",
          icon: require("@/assets/images/ic_money.svg")
        },
        {
          name: "项目利润率",
          icon: require("@/assets/images/ic_completion rate_blue.svg")
        },
        {
          name: "项目周期",
          icon: require("@/assets/images/ic_date.svg")
        },
        {
          name: "总任务个数",
          icon: require("@/assets/images/ic_task management.svg")
        }
      ],
      quotaListValue: [],
      execmonthtasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      execdepartmenttasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      execmonthdurtimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      execdepartmentdurtimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      }
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    dashboradNum() {
      return this.$store.state.index.dashboradNum;
    }
  },

  methods: {
    refreshEcharts() {
      projectChart.resize();
      execmonthtasknumberChart.resize();
      execdepartmenttasknumberChart.resize();
      execmonthdurtimeChart.resize();
      execdepartmentdurtimeChart.resize();
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
      var tab1 = document.getElementById("overviews").clientHeight;
      var tab2 = document.getElementById("taskExecutions").clientHeight;
      this.tabsHeightList.push(tab1);
      this.tabsHeightList.push(tab2);
      // console.log(this.tabsHeightList);
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
                this.execmonthtasknumber();
                break;
              case 2:
                this.execdepartmenttasknumber();
                break;
              case 3:
                this.execmonthdurtime();
                break;
              case 4:
                this.execdepartmentdurtime();
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
    execmonthtasknumberDataFromtime(e) {
      this.execmonthtasknumberData.fromtime = e;
      var startTime = new Date(this.execmonthtasknumberData.fromtime).getTime();
      var endTime = new Date(this.execmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },

    execmonthtasknumberDataTotime(e) {
      this.execmonthtasknumberData.totime = e;
      var startTime = new Date(this.execmonthtasknumberData.fromtime).getTime();
      var endTime = new Date(this.execmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    execdepartmenttasknumberDataFromtime(e) {
      this.execdepartmenttasknumberData.fromtime = e;
      var startTime = new Date(
        this.execdepartmenttasknumberData.fromtime
      ).getTime();
      var endTime = new Date(
        this.execdepartmenttasknumberData.totime
      ).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    execdepartmenttasknumberDataTotime(e) {
      this.execdepartmenttasknumberData.totime = e;
      var startTime = new Date(
        this.execdepartmenttasknumberData.fromtime
      ).getTime();
      var endTime = new Date(
        this.execdepartmenttasknumberData.totime
      ).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    execmonthdurtimeDataFromtime(e) {
      this.execmonthdurtimeData.fromtime = e;
      var startTime = new Date(this.execmonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.execmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    execmonthdurtimeDataTotime(e) {
      this.execmonthdurtimeData.totime = e;
      var startTime = new Date(this.execmonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.execmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    execdepartmentdurtimeDataFromtime(e) {
      this.execdepartmentdurtimeData.fromtime = e;
      var startTime = new Date(
        this.execdepartmentdurtimeData.fromtime
      ).getTime();
      var endTime = new Date(this.execdepartmentdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 4);
    },
    execdepartmentdurtimeDataTotime(e) {
      this.execdepartmentdurtimeData.totime = e;
      var startTime = new Date(
        this.execdepartmentdurtimeData.fromtime
      ).getTime();
      var endTime = new Date(this.execdepartmentdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 4);
    },
    getTaskNumber() {
      this.taskNumList = [];
      if (this.$route.query.id)
        this.$http
          .post(
            Task.toolkitnumbertask,
            this.qs.stringify({ projectId: this.$route.query.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            this.taskNumList = res.data.retData.data;
          });
    },
    initProject() {
      if (this.$route.query.id) {
        this.$http
          .post(
            Dashborad.projectsku,
            this.qs.stringify({ projectId: this.$route.query.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            var _data = res.data.retData;
            var projectMember = res.data.retData.projectMemberList;

            this.quotaListValue.push(_data.baojiadanAmount + "万元");
            this.quotaListValue.push(_data.marginAmount + "万元");
            this.quotaListValue.push(_data.marginPercent + "%");
            this.quotaListValue.push(_data.dayNum + "天");
            this.quotaListValue.push(_data.taskNum);
            projectChart = echarts.init(document.getElementById("numberScale"));
            projectChart.clear();
            // 绘制图表
            var newData = [];
            var legendName = [];
            for (var i = 0; i < projectMember.length; i++) {
              var newObj = {};
              var str = "";
              Object.keys(projectMember[i]).forEach(function(key) {
                if (key == "memberNumber") {
                  newObj["value"] = projectMember[i][key];
                } else if (key == "positionName") {
                  newObj["name"] = projectMember[i][key];
                  str = projectMember[i][key];
                }
              });
              newData.push(newObj);
              legendName.push(str);
            }

            projectChart.setOption({
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
                  text:
                    "该项目总人数\n\n" +
                    res.data.retData.projectMemberNum +
                    "人",
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
                  radius: ["30%", "60%"],
                  //   avoidLabelOverlap: false,
                  // label: {
                  //   emphasis: {
                  //     show: true,
                  //     textStyle: {
                  //       fontSize: "30",
                  //       fontWeight: "bold"
                  //     },
                  //     formatter:'{d}%'
                  //   }
                  // },
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
            // projectChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    execmonthtasknumber() {
      if (this.$route.query.id) {
        var formdata = {
          fromtime: "",
          totime: ""
        };
        var newData = Object.assign({}, this.execmonthtasknumberData);
        formdata.fromtime = toTime2(newData.fromtime);
        formdata.totime = toTime2(newData.totime);
        var formData = Object.assign(formdata, {
          projectId: this.$route.query.id
        });
        this.$http
          .post(
            Dashborad.projectexecmonthtasknumber,
            this.qs.stringify(formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            const _data = res.data.retData.chartResult;
            var xAxisData = [];
            var series = [
              {
                name: "发布任务数",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
              },
              {
                name: "接受任务数",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
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
              }
              // {
              //   name: "单次任务质检通过率",
              //   type: "line",
              //   yAxisIndex: 1,
              //   data: []
              // }
            ];
            _data.forEach(element => {
              xAxisData.push(element.monthName);
              series[0].data.push(element.taskCreateNum);
              series[1].data.push(element.taskOperationNum);
              series[2].data.push(element.taskCommenFinishCreatePercent);
              series[3].data.push(element.taskCommenFinishOperationPercent);
              // series[4].data.push(element.inspectYesNumOncePercent);
            });

            var leftMaxY = Math.max(
              Math.max.apply(null, series[0].data),
              Math.max.apply(null, series[1].data)
            );
            var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);

            // var rightMaxArr = series[series.length - 1].data
            // var rightMaxY = Math.max.apply(null,rightMaxArr)
            // var rightMaxCeilY = maxValue(rightMaxY)

            //  var yMax = Math.max.apply(null,series[0].data)
            execmonthtasknumberChart = echarts.init(
              document.getElementById("execmonthtasknumber")
            );
            execmonthtasknumberChart.clear();
            execmonthtasknumberChart.setOption({
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
                        "个" +
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
              color: color,
              legend: {
                data: [
                  "发布任务数",
                  "接受任务数",
                  "任务被完成率",
                  "任务完成率"
                  // "单次任务质检通过率"
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
                  max: 100,
                  interval: 10,
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
            // execmonthtasknumberChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    execdepartmenttasknumber() {
      if (this.$route.query.id) {
        var formdata = {
          fromtime: "",
          totime: ""
        };
        var newData = Object.assign({}, this.execdepartmenttasknumberData);
        formdata.fromtime = toTime2(newData.fromtime);
        formdata.totime = toTime2(newData.totime);
        var formData = Object.assign(formdata, {
          projectId: this.$route.query.id
        });
        this.$http
          .post(
            Dashborad.projectexecdepartmenttasknumber,
            this.qs.stringify(formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            const _data = res.data.retData.chartResult;
            var xAxisData = [];
            var series = [
              {
                name: "发布任务数",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
              },
              {
                name: "接受任务数",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
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
              }
            ];
            _data.forEach(element => {
              xAxisData.push(element.departmentName);
              series[0].data.push(element.taskCreateNum);
              series[1].data.push(element.taskOperationNum);
              series[2].data.push(element.taskCommenFinishCreatePercent);
              series[3].data.push(element.taskCommenFinishOperationPercent);
            });
            var leftMaxY = Math.max(
              Math.max.apply(null, series[0].data),
              Math.max.apply(null, series[1].data)
            );
            var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);

            execdepartmenttasknumberChart = echarts.init(
              document.getElementById("execdepartmenttasknumber")
            );
            execdepartmenttasknumberChart.clear();
            execdepartmenttasknumberChart.setOption({
              grid: {
                bottom: 130
              },
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
                        "个" +
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
              color: color,
              legend: {
                data: ["发布任务数", "接受任务数", "任务被完成率", "任务完成率"]
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
                  max: 100,
                  interval: 10,
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
            // execdepartmenttasknumberChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    execmonthdurtime() {
      if (this.$route.query.id) {
        var formdata = {
          fromtime: "",
          totime: ""
        };
        var newData = Object.assign({}, this.execmonthdurtimeData);
        formdata.fromtime = toTime2(newData.fromtime);
        formdata.totime = toTime2(newData.totime);
        var formData = Object.assign(formdata, {
          projectId: this.$route.query.id
        });
        this.$http
          .post(
            Dashborad.projectexecmonthdurtime,
            this.qs.stringify(formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            const _data = res.data.retData.chartResult;
            var xAxisData = [];
            var series = [
              {
                name: "任务平均耗时",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
              },
              {
                name: "任务平均更新次数",
                type: "bar",
                data: [],
                yAxisIndex: 1,
                barCateGoryGap: 0,
                barGap: 0
              }
            ];
            _data.forEach(element => {
              xAxisData.push(element.monthName);
              series[0].data.push(element.operationAvgDurTime);
              series[1].data.push(element.taskAvgVersionNum);
            });
            var leftMaxY = Math.max.apply(null, series[0].data);
            var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
            var rightMaxY = Math.max.apply(null, series[1].data);
            var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);
            execmonthdurtimeChart = echarts.init(
              document.getElementById("execmonthdurtime")
            );
            execmonthdurtimeChart.clear();
            execmonthdurtimeChart.setOption({
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
                }
              },
              color: color,
              legend: {
                data: ["任务平均耗时", "任务平均更新次数"]
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
            // execmonthdurtimeChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    execdepartmentdurtime() {
      var vm = this;
      if (this.$route.query.id) {
        var formdata = {
          fromtime: "",
          totime: ""
        };
        var newData = Object.assign({}, this.execdepartmentdurtimeData);
        formdata.fromtime = toTime2(newData.fromtime);
        formdata.totime = toTime2(newData.totime);
        var formData = Object.assign(formdata, {
          projectId: this.$route.query.id
        });
        this.$http
          .post(
            Dashborad.projectexecdepartmentdurtime,
            this.qs.stringify(formData),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            var fromtime = toTime1(vm.execdepartmentdurtimeData.fromtime);
            var totime = toTime1(vm.execdepartmentdurtimeData.totime);
            const _data = res.data.retData.chartResult;
            var xAxisData = [];
            var series = [
              {
                name: "任务平均耗时",
                type: "bar",
                data: [],
                barCateGoryGap: 0,
                barGap: 0
              },
              {
                name: "任务平均更新次数",
                type: "bar",
                data: [],
                yAxisIndex: 1,
                barCateGoryGap: 0,
                barGap: 0
              }
            ];
            _data.forEach(element => {
              xAxisData.push(element.departmentName);
              series[0].data.push(element.operationAvgDurTime);
              series[1].data.push(element.taskAvgVersionNum);
            });
            var leftMaxY = Math.max.apply(null, series[0].data);
            var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
            var rightMaxY = Math.max.apply(null, series[1].data);
            var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);
            execdepartmentdurtimeChart = echarts.init(
              document.getElementById("execdepartmentdurtime")
            );
            execdepartmentdurtimeChart.clear();
            execdepartmentdurtimeChart.setOption({
              grid: {
                bottom: 130
              },
              tooltip: {
                trigger: "axis",
                formatter: function(params) {
                  var result = fromtime + "-" + totime + "</br>";
                  params.forEach(function(item, index) {
                    if (item.seriesIndex == 0) {
                      result +=
                        item.marker +
                        item.name +
                        " " +
                        item.seriesName +
                        " : " +
                        item.value +
                        "天" +
                        "</br>";
                    } else {
                      result +=
                        item.marker +
                        item.name +
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
              color: color,
              legend: {
                data: ["任务平均耗时", "任务平均更新次数"]
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
            // execdepartmentdurtimeChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    }
  },

  created() {
    this.initProject();
    this.getTaskNumber();
    this.execmonthtasknumber();
    this.execdepartmenttasknumber();
    this.execmonthdurtime();
    this.execdepartmentdurtime();
  },
  mounted() {
    this.getTabsHeight();
    this.tabClick("overview");
  },
  watch: {
    dashboradNum(newVal, oldVAl) {
      this.refreshEcharts();
    },
    id() {
      this.quotaListValue = [];
      this.initProject();
      this.getTaskNumber();
      this.execmonthtasknumber();
      this.execdepartmenttasknumber();
      this.execmonthdurtime();
      this.execdepartmentdurtime();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  font-size: 16px;
}
.overview,
.taskExecution,
.timeConsuming {
  border: 1px solid #e9ecef;
  padding-bottom: 50px;
}
#taskExecutions {
  padding-bottom: 50px;
}
.timeConsuming {
  margin-top: 30px;
  margin-bottom: 30px;
}
.overview-title,
.taskExecution-title,
.timeConsuming-title {
  // font-family: PingFangSC-Medium;
  font-size: 16px;
  // color: #303030;
  letter-spacing: 0;
  border-bottom: 1px solid #e9ecef;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.overview-content {
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  overflow: hidden;
  .overview-left,
  .overview-right {
    float: left;
    width: 50%;
  }
  .overview-right {
    padding-left: 30px;
  }
}
.overview-left-content {
  border-right: 1px dashed #e9ecef;
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      margin-top: 40px;
    }
  }
}
</style>


