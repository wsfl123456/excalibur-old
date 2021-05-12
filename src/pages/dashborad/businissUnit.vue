<template>
  <div class="dashborad dashboradProject">
    <Tabs value="numberOverview" class="tabs" :animated="animatedTab" @on-click="tabClick">
      <TabPane class="tabpane" label="人员概况" ref="numberOverview" name="numberOverview">
        <div id="numberOverviews">
          <Row :gutter="16">
            <i-col span="24">
              <div class="numberOverview-left">
                <h2 class="numberOverview-left-title">事业部人员配置</h2>
                <div class="numberOverview-left-body">
                  <div class="numberOverview-left-head">各专业人员在该事业部中的占比</div>
                  <div class="numberOverview-left-content">
                    <div id="teampersondepart" style="height : 390px"></div>
                  </div>
                </div>
              </div>
            </i-col>
            <!-- <i-col span="14">
            <div class="overview-left">
              <h2 class="overview-left-title">部门人员分配</h2>
              <div class="overview-left-body">
                <div class="overview-left-head">当前部门人员在不同事业部的人员占比</div>
                <div class="overview-left-content">
                  <div id="departpersonteam" style="height : 350px"></div>
                </div>
              </div>
            </div>
            </i-col>-->
          </Row>
        </div>
      </TabPane>

      <TabPane class="tabpane" label="业务概况" ref="businessOverview" name="businessOverview">
        <div id="businessOverviews">
          <div class="yearIncome">
            <h2 class="yearIncome-title">营收情况</h2>
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
      <TabPane class="tabpane" label="客户满意度" ref="satisfaction" name="satisfaction">
       <satisfaction :teamId='$route.query.id'></satisfaction>
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
    </Tabs>
    <toast :is-toast="isToast" :msg="msg"></toast>
  </div>
</template>
<script>
import echarts from "echarts"
import { Dashborad } from "../../API/api";
import Toast from "../../components/popup/Toast";
import {dashboradColor, maxValue, maxPercent} from "../../util/util";
import Satisfaction from "./satisfaction/index"

var color = dashboradColor
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

let defaultYear = new Date().getFullYear().toString();

let defaultStartTime =new Date().getFullYear() + "-01"
  
let defaultEndTime =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));


 var teampersondepartChart = ''
var teamskuChart = ''
var teamcustomermonthChart = ''
var teammonthtasknumberChart = ''
var teammonthdurtimeChart = ''

window.addEventListener("resize", () => {
   teampersondepartChart.resize();
   teamskuChart.resize();
   teamcustomermonthChart.resize();
   teammonthtasknumberChart.resize();
   teammonthdurtimeChart.resize();
});

export default {
  components: {
    Toast,
    Satisfaction
  },
  data() {
    return {
      tabsHeightList: [],
      refList: ["numberOverview", "businessOverview", "execution"],
      year: defaultYear,
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
      animatedTab: true,
      msg: "",
      isToast: false,
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
      }
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    dashboradNum() {
       return this.$store.state.index.dashboradNum
     }
  },

  methods: {
    refreshEcharts() {
          teampersondepartChart.resize()
          teamskuChart.resize()
          teamcustomermonthChart.resize()
          teammonthtasknumberChart.resize()
          teammonthdurtimeChart.resize()
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
      var tab1 = document.getElementById("numberOverviews").clientHeight;
      var tab2 = document.getElementById("businessOverviews").clientHeight;
      var tab3 = document.getElementById("executions").clientHeight;
      this.tabsHeightList.push(tab1);
      this.tabsHeightList.push(tab2);
      this.tabsHeightList.push(tab3);
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

    teampersondepart() {
      if (this.$route.query.id) {
        this.$http
          .post(
            Dashborad.teampersondepart,
            this.qs.stringify({ teamId: this.$route.query.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            var _data = res.data.retData;
            var chartResult = _data.chartResult;
            var teamName = _data.teamName;
            var newData = [];
            var legendName = [];
            for (var i = 0; i < chartResult.length; i++) {
              var newObj = {};
              var str = "";
              Object.keys(chartResult[i]).forEach(function(key) {
                if (key == "userNum") {
                  newObj["value"] = chartResult[i][key];
                } else if (key == "departmentName") {
                  newObj["name"] = chartResult[i][key];
                  str = chartResult[i][key];
                }
              });
              newData.push(newObj);
              legendName.push(str);
            }
            teampersondepartChart = echarts.init(
              document.getElementById("teampersondepart")
            );
            teampersondepartChart.clear();
            teampersondepartChart.setOption({
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
              },
              legend: {
                x: "left",
                data: legendName,
                type : 'scroll'
              },
              color: color,
              graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                  text: "总计\n\n" + _data.userNumber + "人",
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
                  radius: ["35%", "70%"],
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
            // teampersondepartChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    teamsku() {
      if (this.id) {
        var year = new Date(this.year).getFullYear().toString();
        this.$http
          .post(
            Dashborad.teamsku,
            this.qs.stringify({
              teamId: this.$route.query.id,
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
      }
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
        .post(Dashborad.teamcustomermonth, this.qs.stringify(formdata), {
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

          // var leftMaxY = Math.max(
          //   Math.max.apply(null, series[0].data),
          //   Math.max.apply(null, series[1].data)
          // );
            var leftMaxY = Math.max.apply(null, series[0].data) + Math.max.apply(null, series[1].data)

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
                var newList = _data[params[0].dataIndex].newList
                  var oldEndList = _data[params[0].dataIndex].oldEndList
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
                        for (var i =0; i < newList.length; i ++) {
                          result += `<div><span style='margin-left:20px;color:#FFE15B'>${newList[i].customerName}</span></div>`
                        }
                      } else if (item.seriesIndex == 0) {
                         for (var i =0; i < oldEndList.length; i ++) {
                          result += `<div><span style='margin-left:20px;color:#57A5F9'>${oldEndList[i].customerName}</span></div>`
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
          // teamcustomermonthChart.resize();
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
      var formData = Object.assign(formdata, {
        teamId: this.$route.query.id
      });
      this.$http
        .post(Dashborad.teammonthtasknumber, this.qs.stringify(formData), {
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
          // teammonthtasknumber.resize();
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
      var formData = Object.assign(formdata, {
        teamId: this.$route.query.id
      });
      this.$http
        .post(Dashborad.teammonthdurtime, this.qs.stringify(formData), {
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
          // teammonthdurtimeChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    }
  },
  created() {
    this.teampersondepart();
    this.teamsku();
    this.teamcustomermonth();
    this.teammonthtasknumber();
    this.teammonthdurtime();
  },
  mounted() {
      this.getTabsHeight()
      this.tabClick('numberOverview')
  },
  watch: {
    dashboradNum(newVal, oldVAl) {
         this.refreshEcharts()
    },
    id() {
      this.yearIncomeValueLIst = [];
      this.teampersondepart();
      this.teamsku();
      this.teamcustomermonth();
      this.teammonthtasknumber();
      this.teammonthdurtime();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  font-size: 16px;
}
.numberOverview-left,
.yearIncome,
.teamcustomermonth,
.taskNumber,
.timeConsuming {
  border: 1px solid #e9ecef;
  padding-bottom: 50px;
}
.timeConsuming,
.teamcustomermonth,
.timeConsuming {
  margin-top: 30px;
}
.numberOverview-left-title,
.yearIncome-title,
.teamcustomermonth-title,
.taskNumber-title,
.timeConsuming-title {
  font-size: 16px;
  letter-spacing: 0;
  border-bottom: 1px solid #e9ecef;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.numberOverview-left-head,
.numberOverview-left-content,
.yearIncome-content,
.yearProfit,
.quarterIncome,
.teamcustomermonth-content,
.taskNumber-content,
.timeConsuming-content {
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  overflow: hidden;
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
</style>

