<template>
  <div class="dashborad" id="dashborad">
    <Tabs value="incomeGeneration" class="tabs" :animated="animatedTab" @on-click="tabClick">
      <TabPane label="创收" ref="incomeGeneration" name="incomeGeneration">
        <div id="incomeGenerations">
          <div class="incomeGeneration">
            <h2 class="incomeGeneration-title">项目创收</h2>
            <div class="incomeGeneration-content">
              <span style="font-size:14px">时间段</span>
              <DatePicker
                v-model="incomeGenerationData.fromtime"
                @on-change="incomeGenerationDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="incomeGenerationData.totime"
                @on-change="incomeGenerationDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="incomeGeneration" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
          <div class="power">
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
              <div id="power" style="height:400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="项目执行" ref="proImplemente" name="proImplemente">
        <div id="proImplementes">
          <div class="proImplemente">
            <h2 class="proImplemente-title">项目执行</h2>
            <div class="proImplemente-content dashboradTab">
              <span style="font-size:14px">时间段</span>
              <DatePicker
                v-model="proImplementeData.fromtime"
                @on-change="proImplementeDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="proImplementeData.totime"
                @on-change="proImplementeDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="proImplemente" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务执行" ref="taskImplemente" name="taskImplemente">
        <div id="taskImplementes">
          <div class="taskImplemente">
            <h2 class="taskImplemente-title">任务数量</h2>
            <div class="taskImplemente-content dashboradTab">
              <Tabs>
                <TabPane label="按月份显示">
                  <div style="margin-left:20px">
                    <span style="font-size:14px">任务创建时间</span>
                    <DatePicker
                      v-model="userexecmonthtasknumberData.fromtime"
                      @on-change="userexecmonthtasknumberDataFromtime"
                      type="month"
                      placeholder="选择开始时间"
                      format="yyyy-MM"
                      style="width:130px"
                    ></DatePicker>
                    <span>—</span>
                    <DatePicker
                      v-model="userexecmonthtasknumberData.totime"
                      @on-change="userexecmonthtasknumberDataTotime"
                      type="month"
                      placeholder="选择结束时间"
                      format="yyyy-MM"
                      style="width:130px"
                    ></DatePicker>
                    <div id="userexecmonthtasknumber" style="height : 400px;margin-top: 30px"></div>
                  </div>
                </TabPane>
                <TabPane label="按客户显示">
                  <div style="margin-left:20px">
                    <span style="font-size:14px">任务创建时间</span>
                    <DatePicker
                      v-model="userexeccustomertasknumberData.fromtime"
                      @on-change="userexeccustomertasknumberDataFromtime"
                      type="month"
                      placeholder="选择开始时间"
                      format="yyyy-MM"
                      style="width:130px"
                    ></DatePicker>
                    <span>—</span>
                    <DatePicker
                      v-model="userexeccustomertasknumberData.totime"
                      @on-change="userexeccustomertasknumberDataTotime"
                      type="month"
                      placeholder="选择结束时间"
                      format="yyyy-MM"
                      style="width:130px"
                    ></DatePicker>
                    <div id="userexeccustomertasknumber" style="height : 430px;margin-top: 30px"></div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div class="taskTime">
            <h2 class="taskTime-title">任务耗时</h2>
            <div class="taskTime-content">
              <div style="margin-left:20px">
                <span style="font-size:14px">任务创建时间</span>
                <DatePicker
                  v-model="userexecmonthdurtimeData.fromtime"
                  @on-change="userexecmonthdurtimeDataFromtime"
                  type="month"
                  placeholder="选择开始时间"
                  format="yyyy-MM"
                  style="width:130px"
                ></DatePicker>
                <span>—</span>
                <DatePicker
                  v-model="userexecmonthdurtimeData.totime"
                  @on-change="userexecmonthdurtimeDataTotime"
                  type="month"
                  placeholder="选择结束时间"
                  format="yyyy-MM"
                  style="width:130px"
                ></DatePicker>
                <div id="userexecmonthdurtime" style="height : 400px;margin-top: 30px"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="overtime">
          <h2 class="overtime-title">加班时长</h2>
          <div class="overtime-content">
            <div style="margin-left:20px">
              <span style="font-size:14px">时间段</span>
              <DatePicker
                v-model="userexecmonthovertimeData.fromtime"
                @on-change="userexecmonthovertimeDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:200px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="userexecmonthovertimeData.totime"
                @on-change="userexecmonthovertimeDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:200px"
              ></DatePicker>
              <div id="userexecmonthovertime" style="height : 350px;margin-top: 30px"></div>
            </div>
          </div>
        </div>-->
      </TabPane>
    </Tabs>
    <toast :is-toast="isToast" :msg="msg"></toast>
  </div>
</template>
<script>
import { Dashborad } from "../../API/api";
import Toast from "../../components/popup/Toast";
import {
  maxValue,
  gradientColor,
  dashboradColor,
  dashboradCustomerColor
} from "../../util/util";

var echarts = require("echarts");
var color = dashboradColor;
var customColor = dashboradCustomerColor;
Number.prototype.addFloat = function(arg) {
  var r1, r2, m;
  try {
    r1 = this.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (this * m + arg * m) / m;
};

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

let defaultStartTime = new Date().getFullYear() + "-01"
let defaultEndTime =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));

var incomeGenerationChart = "";
var powerChart = "";
var proImplementeChart = "";
var userexecmonthtasknumberChart = "";
var userexeccustomertasknumberChart = "";
var userexecmonthdurtimeChart = "";
// var userexecmonthovertimeChart = ''
// window.addEventListener("resize", () => {
//    incomeGenerationChart.resize();
//    powerChart.resize();
//    proImplementeChart.resize();
//    userexecmonthtasknumberChart.resize();
//    userexeccustomertasknumberChart.resize();
//    userexecmonthdurtimeChart.resize();
// });
export default {
  components: {
    Toast
  },
  data() {
    return {
      dashboradWidth: "",
      customColorList: [],
      tabsHeightList: [],
      refList: ["incomeGeneration", "proImplemente", "taskImplemente"],
      msg: "",
      animatedTab: true,
      isToast: false,
      allIncomeList: [],
      allCustomer: [],
      incomeGenerationData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      powerData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      proImplementeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      userexecmonthtasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      userexeccustomertasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      userexecmonthdurtimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      userexecmonthovertimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      }
    };
  },
  methods: {
    refreshEcharts() {
      incomeGenerationChart.resize();
      powerChart.resize();
      proImplementeChart.resize();
      userexecmonthtasknumberChart.resize();
      userexeccustomertasknumberChart.resize();
      userexecmonthdurtimeChart.resize();
      //  userexecmonthovertimeChart.resize()
    },
    setCustomerColor() {
      customColor.forEach(element => {
        this.customColorList.push(new gradientColor(element, "#ffffff", 10));
      });
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
      var tab1 = document.getElementById("incomeGenerations").clientHeight;
      var tab2 = document.getElementById("proImplementes").clientHeight;
      var tab3 = document.getElementById("taskImplementes").clientHeight;
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
                this.incomeGeneration();
                break;
              case 2:
                this.power();
                break;
              case 3:
                this.proImplemente();
                break;
              case 5:
                this.userexecmonthtasknumber();
                break;
              case 6:
                this.userexeccustomertasknumber();
                break;
              case 7:
                this.userexecmonthdurtime();
                break;
              case 8:
                this.userexecmonthovertime();
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
    incomeGenerationDataFromtime(e) {
      this.incomeGenerationData.fromtime = e;
      var startTime = new Date(this.incomeGenerationData.fromtime).getTime();
      var endTime = new Date(this.incomeGenerationData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    incomeGenerationDataTotime(e) {
      this.incomeGenerationData.totime = e;
      var startTime = new Date(this.incomeGenerationData.fromtime).getTime();
      var endTime = new Date(this.incomeGenerationData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    powerDataFromtime(e) {
      this.powerData.fromtime = e;
      var startTime = new Date(this.powerData.fromtime).getTime();
      var endTime = new Date(this.powerData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    powerDataTotime(e) {
      this.powerData.totime = e;
      var startTime = new Date(this.powerData.fromtime).getTime();
      var endTime = new Date(this.powerData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    proImplementeDataFromtime(e) {
      this.proImplementeData.fromtime = e;
      var startTime = new Date(this.proImplementeData.fromtime).getTime();
      var endTime = new Date(this.proImplementeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    proImplementeDataTotime(e) {
      this.proImplementeData.totime = e;
      var startTime = new Date(this.proImplementeData.fromtime).getTime();
      var endTime = new Date(this.proImplementeData.totime).getTime();
      this.timeChange(startTime, endTime, 3);
    },
    userexecmonthtasknumberDataFromtime(e) {
      this.userexecmonthtasknumberData.fromtime = e;
      var startTime = new Date(
        this.userexecmonthtasknumberData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 5);
    },
    userexecmonthtasknumberDataTotime(e) {
      this.userexecmonthtasknumberData.totime = e;
      var startTime = new Date(
        this.userexecmonthtasknumberData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 5);
    },
    userexeccustomertasknumberDataFromtime(e) {
      this.userexeccustomertasknumberData.fromtime = e;
      var startTime = new Date(
        this.userexeccustomertasknumberData.fromtime
      ).getTime();
      var endTime = new Date(
        this.userexeccustomertasknumberData.totime
      ).getTime();
      this.timeChange(startTime, endTime, 6);
    },
    userexeccustomertasknumberDataTotime(e) {
      this.userexeccustomertasknumberData.totime = e;
      var startTime = new Date(
        this.userexeccustomertasknumberData.fromtime
      ).getTime();
      var endTime = new Date(
        this.userexeccustomertasknumberData.totime
      ).getTime();
      this.timeChange(startTime, endTime, 6);
    },
    userexecmonthdurtimeDataFromtime(e) {
      this.userexecmonthdurtimeData.fromtime = e;
      var startTime = new Date(
        this.userexecmonthdurtimeData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 7);
    },
    userexecmonthdurtimeDataTotime(e) {
      this.userexecmonthdurtimeData.totime = e;
      var startTime = new Date(
        this.userexecmonthdurtimeData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 7);
    },
    userexecmonthovertimeDataFromtime(e) {
      this.userexecmonthovertimeData.fromtime = e;
      var startTime = new Date(
        this.userexecmonthovertimeData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthovertimeData.totime).getTime();
      this.timeChange(startTime, endTime, 8);
    },
    userexecmonthovertimeDataTotime(e) {
      this.userexecmonthovertimeData.totime = e;
      var startTime = new Date(
        this.userexecmonthovertimeData.fromtime
      ).getTime();
      var endTime = new Date(this.userexecmonthovertimeData.totime).getTime();
      this.timeChange(startTime, endTime, 8);
    },

    incomeGeneration() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.incomeGenerationData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.userincomeproject, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data.retData.chartResult;
          const proList = res.data.retData.chartResultProject;
          // console.log(_data)
          var fromtime = toTime1(vm.incomeGenerationData.fromtime);
          var totime = toTime1(vm.incomeGenerationData.totime);
          var xAxisData = [];
          var series = [];
          var lengedData = [];
          var customColor = [];
          proList.forEach(element => {
            lengedData.push(element.projectName);
            series.push({
              name: element.projectName,
              type: "bar",
              stack: "project",
              data: []
            });
          });

          _data.forEach(element => {
            xAxisData.push(element.customerName);

            series.forEach((ele, index) => {
              // ele.data.push(+element.projectList[index].income)
              element.projectList.forEach(el => {
                if (el.projectName == ele.name) {
                  ele.data.push(el.income);
                }
              });
            });
          });

          incomeGenerationChart = echarts.init(
            document.getElementById("incomeGeneration")
          );
          // incomeGenerationChart.refresh()
          incomeGenerationChart.clear();
          incomeGenerationChart.setOption({
            grid: {
              right: 250
            },
            tooltip: {
              trigger: "axis",
              // position: [0, '10%'],
              enterable: true,
              // enterable: true,
              position: function(pos, params, dom, rect, size) {
                let yPos = 0;
                let xPos = 0;
                if (pos[0] < size.viewSize[0] / 2) {
                  xPos = pos[0] + 5;
                } else {
                  xPos = pos[0] - dom.offsetWidth - 5;
                }
                if (pos[1] < size.viewSize[1] / 2) {
                  yPos = pos[1] + 10;
                } else {
                  yPos = pos[1] - dom.offsetHeight - 5;
                }
                return [xPos, yPos];
              },
              // triggerOn: "click",
              // confine: true, //将 tooltip 框限制在图表的区域内
              extraCssText: "overflow: auto;max-height:400px", //额外附加到浮层的 css 样式
              formatter: function(params) {
                var result = `
                     <div>
                        <span>${fromtime}-${totime}项目创收：</span>
                        <div style='float:right'>单位(万元)</div>
                     </div>
                `;

                params.forEach(function(item, index) {
                  if (item.data != 0) {
                    result += `<div>
                        <span>${item.marker} ${item.seriesName} ：<span>
                        <span style='float:right'>${item.value}</span>
                       </div>
                      `;
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
              tooltip: {
                show: true
                // triggerOn: 'mousemove'
              },
              formatter(name) {
                let periodic = 18;
                let splitCount = Math.ceil(name.length / periodic);
                let str = Array.apply(null, Array(splitCount))
                  .map((i, index) =>
                    name.slice(periodic * index++, index * periodic)
                  )
                  .join("\n ");
                return `{a| ${str}}`;
              },
              data: lengedData,
              type: "scroll",
              orient: "vertical",
              right: 0,
              top: 0,
              textStyle: {
                rich: {
                  a: {
                    width: 140,
                    align: "left",
                    lineHeight: 15,
                    fontSize: 12,
                     verticalAlign : 'middle'
                  }
                }
              }
              // type: "scroll"
            },
            xAxis: [
              {
                show: true,
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
                },
                axisTick: {
                  show: true
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                name: "项目创收（万元）",
                // min: 0,
                // max: 200,
                // interval: 20,
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
          // incomeGenerationChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    },
    power() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.powerData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.userincomeprojectme, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          vm.allIncomeList = [];
          var _data = res.data.retData.chartResult;
          var projectList = res.data.retData.projectList;
          var fromtime = toTime1(vm.powerData.fromtime);
          var totime = toTime1(vm.powerData.totime);
          var xAxisData = [];
          var series = [];
          var lengedData = [];
          var allData = [];
          var sumArr = [];
          if (projectList.length > 0) {
            projectList.forEach(element => {
              series.push({
                name: element.projectName,
                type: "bar",
                stack: "project",
                data: []
              });
              lengedData.push(element.projectName);
            });
            series.push({
              name: "人均创收",
              type: "line",
              yAxisIndex: 1,
              data: []
            });
          } else {
            for (var i = 0; i < 50; i++) {
              series.push({
                name: "没有数据",
                type: "bar",
                data: []
              });
            }
            series.push({
              name: "人均创收",
              type: "line",
              yAxisIndex: 1,
              data: []
            });
          }

          lengedData.push("人均创收");
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series.forEach((ele, index) => {
              if (index < series.length - 1) {
                ele.data.push(
                  element.monthProject[index]
                    ? element.monthProject[index].income
                    : 0
                );
              }
            });
            series[series.length - 1].data.push(element.incomeMeAvg);
            projectList.length
              ? vm.allIncomeList.push(element.incomeMe)
              : vm.allIncomeList.push(0);
          });
          if (projectList.length) {
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

          var rightMaxArr = series[series.length - 1].data;

          var rightMaxY = Math.max.apply(null, rightMaxArr);
          var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);
          // var boxWidth = document.getElementById('power').clientWidth; //获取容器宽度
          // var charLength = lengedData.join().length//lenged字符长度
          // var rowNum = '' //lenged行数
          powerChart = echarts.init(document.getElementById("power")); //初始化echart
          // rowNum = Math.ceil((charLength * 10) / boxWidth)
          // document.getElementById('power').style.height = 400 +'px'//设置容器高度
          // console.log((30 * rowNum + 30))
          powerChart.clear();
          // powerChart.resize();
          powerChart.setOption({
            grid: {
              right: 250
            },
            tooltip: {
              trigger: "axis",
              // position: [0, '10%'],
              enterable: true,
              // enterable: true,
              position: function(pos, params, dom, rect, size) {
                let yPos = 0;
                let xPos = 0;
                if (pos[0] < size.viewSize[0] / 2) {
                  xPos = pos[0] + 5;
                } else {
                  xPos = pos[0] - dom.offsetWidth - 5;
                }
                if (pos[1] < size.viewSize[1] / 2) {
                  yPos = pos[1] + 10;
                } else {
                  yPos = pos[1] - dom.offsetHeight - 5;
                }
                return [xPos, yPos];
              },
              // triggerOn: "click",
              // confine: true, //将 tooltip 框限制在图表的区域内
              extraCssText: "overflow: auto;max-height:400px", //额外附加到浮层的 css 样式
              formatter: function(params) {
                var result = `
                  <div>
                    <span>${params[0].name}</span>
                    <span style='float:right'>单位(万元)</span>
                  </div>
                  <div>
                    <span>全部项目总创收：<span>
                    <span style='float:right'>${
                      vm.allIncomeList[params[0].dataIndex]
                    }</span>
                  </div>

                `;
                if (projectList.length) {
                  params.forEach(function(item, index) {
                    if (item.value != 0) {
                      result += `
                         <div>
                          <span>${item.marker} ${item.seriesName}：<span>
                          <span style='float:right'>${item.value}</span>
                         </div>
                        `;
                    }
                  });
                }
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
              tooltip: {
                show: true
                // triggerOn: 'mousemove'
              },
              formatter(name) {
                let periodic = 18;
                let splitCount = Math.ceil(name.length / periodic);
                let str = Array.apply(null, Array(splitCount))
                  .map((i, index) =>
                    name.slice(periodic * index++, index * periodic)
                  )
                  .join("\n ");
                return `{a| ${str}}`;
              },
              data: lengedData,
              type: "scroll",
              orient: "vertical",
              right: 0,
              top: 0,
              textStyle: {
                rich: {
                  a: {
                    width: 140,
                    align: "left",
                    lineHeight: 15,
                    fontSize: 12,
                    verticalAlign : 'middle'
                  }
                }
              }
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
                name: "项目创收（万元）",
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
                name: "人均创收（万元）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                },
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
    proImplemente() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.proImplementeData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      var allPost = [
        this.$http.post(
          Dashborad.userexecmonthprojectnumberallcustomer,
          this.qs.stringify(formdata),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        ),
        this.$http.post(
          Dashborad.userexecmonthprojectnumbereachcustomer,
          this.qs.stringify(formdata),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
      ];
      Promise.all(allPost).then(([allCustomer, eachCustomer]) => {
        // vm.allCustomer = [];
        var allList = [];
        var _data = eachCustomer.data.retData.chartResult;
        var customerList = eachCustomer.data.retData.customerList;
        var fromtime = toTime1(vm.proImplementeData.fromtime);
        var totime = toTime1(vm.proImplementeData.totime);
        var xAxisData = [];
        var series = [];
        var lengedData = [];
        var allData = [];
        var sumArr = [];
        var projectNumList = [];
        var projectName = "";

        function getArrIndex(param) {
          return param.customerName == projectName;
        }
        allCustomer.data.retData.chartResult.forEach((element, index) => {
          allList.push(Number(element.projectNumAllCustomer));
        });
        if (customerList.length > 0) {
          customerList.forEach(element => {
            series.push({
              name: element.customerName,
              type: "bar",
              stack: "customer",
              data: []
            });
            lengedData.push(element.customerName);
          });
        } else {
          for (var i = 0; i < 50; i++) {
            series.push({
              name: "没有数据",
              type: "bar",
              data: []
            });
          }
        }

        _data.forEach(element => {
          xAxisData.push(element.monthName);
          series.forEach((ele, index) => {
            projectName = ele.name;
            var ind = element.projectNumEachCustomer.findIndex(getArrIndex);
            ele.data.push(
              element.projectNumEachCustomer[ind].projectNum
              // element.projectNumEachCustomer[index]
              //   ? element.projectNumEachCustomer[index].projectNum
              //   : 0
            );
          });
        });
        var leftMaxY = Math.max.apply(null, allList.length ? allList : [1]);
        var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);

        proImplementeChart = echarts.init(
          document.getElementById("proImplemente")
        );
        proImplementeChart.clear();
        proImplementeChart.setOption({
          grid: {
            right: 250
          },
          tooltip: {
            trigger: "axis",
            // position: [0, '10%'],
            enterable: true,
            // enterable: true,
            position: function(pos, params, dom, rect, size) {
              let yPos = 0;
              let xPos = 0;
              if (pos[0] < size.viewSize[0] / 2) {
                xPos = pos[0] + 5;
              } else {
                xPos = pos[0] - dom.offsetWidth - 5;
              }
              if (pos[1] < size.viewSize[1] / 2) {
                yPos = pos[1] + 10;
              } else {
                yPos = pos[1] - dom.offsetHeight - 5;
              }
              return [xPos, yPos];
            },
            // triggerOn: "click",
            // confine: true, //将 tooltip 框限制在图表的区域内
            extraCssText: "overflow: auto;max-height:400px", //额外附加到浮层的 css 样式
            formatter: function(params) {
              var result = `
                  <div>${params[0].name}</div>
                  <div>
                    <span>全部客户项目数量：<span>
                    <span style='float:right'>${
                      allList[params[0].dataIndex]
                    }</span>
                  </div>

                `;
              if (customerList.length) {
                params.forEach(function(item, index) {
                  if (index < params.length) {
                    if (item.value != 0) {
                      result += `<div>
                        <span>${item.marker} ${item.seriesName} ：<span>
                        <span style='float:right'>${item.value}</span>
                       </div>
                      `;
                    }
                  }
                });
              }
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
            tooltip: {
              show: true
              // triggerOn: 'mousemove'
            },
            formatter(name) {
              let periodic = 18;
              let splitCount = Math.ceil(name.length / periodic);
              let str = Array.apply(null, Array(splitCount))
                .map((i, index) =>
                  name.slice(periodic * index++, index * periodic)
                )
                .join("\n ");
              return `{a| ${str}}`;
            },
            data: lengedData,
            type: "scroll",
            orient: "vertical",
            right: 0,
            top: 0,
            textStyle: {
              rich: {
                a: {
                  width: 140,
                  align: "left",
                  lineHeight: 15,
                  fontSize: 12,
                  verticalAlign : 'middle'
                }
              }
            }
            // type: "scroll"
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
              name: "项目数量（个）",
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
            }
          ],
          series: series
        });
        // proImplementeChart.resize();
      });
    },

    userexecmonthtasknumber() {
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.userexecmonthtasknumberData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.userexecmonthtasknumber, this.qs.stringify(formdata), {
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
            }
          ];
          var lengedData = [
            "发布任务数",
            "接受任务数",
            "任务被完成率",
            "任务完成率"
          ];
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.taskCreateNum);
            series[1].data.push(element.taskOperationNum);
            series[2].data.push(element.taskCommenFinishCreatePercent);
            series[3].data.push(element.taskCommenFinishOperationPercent);
          });
          var yMax = Math.max(
            Math.max.apply(null, series[0].data),
            Math.max.apply(null, series[1].data)
          );
          var yCeilMax = maxValue(yMax ? yMax : 1);
          userexecmonthtasknumberChart = echarts.init(
            document.getElementById("userexecmonthtasknumber")
          );
          userexecmonthtasknumberChart.clear();
          userexecmonthtasknumberChart.setOption({
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
                name: "任务数量（个）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                min: 0,
                max: yCeilMax,
                interval: yCeilMax / 10,
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
          // userexecmonthtasknumberChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    },
    userexeccustomertasknumber() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.userexeccustomertasknumberData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(
          Dashborad.userexeccustomertasknumber,
          this.qs.stringify(formdata),
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
            }
          ];
          var lengedData = [
            "发布任务数",
            "接受任务数",
            "任务被完成率",
            "任务完成率"
          ];
          _data.forEach(element => {
            xAxisData.push(element.customerName);
            series[0].data.push(element.taskCreateNum);
            series[1].data.push(element.taskOperationNum);
            series[2].data.push(element.taskCommenFinishCreatePercent);
            series[3].data.push(element.taskCommenFinishOperationPercent);
          });

          var yMax = Math.max(
            Math.max.apply(null, series[0].data),
            Math.max.apply(null, series[1].data)
          );
          var yCeilMax = maxValue(yMax ? yMax : 1);

          var fromtime = toTime1(vm.userexeccustomertasknumberData.fromtime);
          var totime = toTime1(vm.userexeccustomertasknumberData.totime);
          userexeccustomertasknumberChart = echarts.init(
            document.getElementById("userexeccustomertasknumber")
          );
          userexeccustomertasknumberChart.clear();
          userexeccustomertasknumberChart.setOption({
            grid: {
              bottom: 130
            },
            tooltip: {
              trigger: "axis",
              // formatter:
              //   fromtime +
              //   "—" +
              //   totime +
              //   "<br />" +
              //   "发布的{b0}的任务数： {c0}" +
              //   "<br />" +
              //   "接受的{b1}的任务数：{c1}",
              formatter: function(params) {
                var result = fromtime + "-" + totime + "</br>";
                params.forEach(function(item, index) {
                  if (item.componentSubType == "bar") {
                    result +=
                      item.marker +
                      " " +
                      item.seriesName +
                      " : " +
                      item.value +
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
                max: yCeilMax,
                interval: yCeilMax / 10,
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
          // userexeccustomertasknumber.resize();
        })
        .catch(() => {})
        .finally(() => {});
    },
    userexecmonthdurtime() {
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.userexecmonthdurtimeData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.userexecmonthdurtime, this.qs.stringify(formdata), {
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
          var legend = ["任务平均耗时", "任务平均更新次数"];
          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.operationAvgDurTime);
            series[1].data.push(element.taskAvgVersionNum);
          });

          var leftMaxY = Math.max.apply(null, series[0].data);
          var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
          var rightMaxY = Math.max.apply(null, series[1].data);
          var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);

          userexecmonthdurtimeChart = echarts.init(
            document.getElementById("userexecmonthdurtime")
          );
          userexecmonthdurtimeChart.clear();
          userexecmonthdurtimeChart.setOption({
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
              data: legend
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
          // userexecmonthdurtime.resize();
        })
        .catch(() => {})
        .finally(() => {});
    },
    userexecmonthovertime() {
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.userexecmonthovertimeData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      this.$http
        .post(Dashborad.userexecmonthovertime, this.qs.stringify(formdata), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data.retData.chartResult;
          var xAxisData = [];
          var series = [
            {
              name: "加班时长",
              type: "bar",
              barCateGoryGap: 0,
              barGap: 0,
              data: []
            }
          ];

          _data.forEach(element => {
            xAxisData.push(element.monthName);
            series[0].data.push(element.overtimeMinute);
          });

          userexecmonthovertimeChart = echarts.init(
            document.getElementById("userexecmonthovertime")
          );
          userexecmonthovertimeChart.clear();
          userexecmonthovertimeChart.setOption({
            tooltip: {
              trigger: "axis",
              formatter: "{b}" + "<br />" + "{a0}：{c0}小时",
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
                name: "加班时长（小时）",
                nameTextStyle: {
                  color: "#999",
                  fontSize: 14
                }, //坐标轴名字样式
                // min: 0,
                // max: 20,
                // interval: 2,
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
          // userexecmonthovertimeChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    }
  },
  computed: {
    dashboradNum() {
      return this.$store.state.index.dashboradNum;
    }
  },
  created() {
    this.incomeGeneration();
    this.power();
    this.proImplemente();
    this.userexecmonthtasknumber();
    this.userexeccustomertasknumber();
    this.userexecmonthdurtime();
    // this.userexecmonthovertime();
  },
  mounted() {
    this.setCustomerColor();
    this.getTabsHeight();
  },
  watch: {
    dashboradNum: {
      handler(newVal, oldVal) {
        this.refreshEcharts();
      }
    }
  }
};
</script>
<style scoped>
.tabs {
  font-size: 16px;
}
.incomeGeneration,
.power,
.proImplemente,
.taskImplemente,
.taskTime,
.overtime {
  border: 1px solid #e9ecef;
  padding-bottom: 50px;
}
#taskImplementes {
  padding-bottom: 50px;
}
.power,
.taskTime,
.overtime {
  margin-top: 30px;
}

.incomeGeneration-title,
.power-title,
.proImplemente-title,
.taskImplemente-title,
.taskTime-title,
.overtime-title {
  /* font-family: PingFangSC-Medium; */
  font-size: 16px;
  /* color: #303030; */
  letter-spacing: 0;
  border-bottom: 1px solid #e9ecef;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.incomeGeneration-content,
.power-content,
.taskTime-content,
.overtime-content,
.proImplemente-content {
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>


