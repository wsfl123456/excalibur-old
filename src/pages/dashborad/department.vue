<template>
  <div class="dashborad dashboradProject">
    <Tabs value="overview" class="tabs" :animated="animatedTab" @on-click="tabClick">
      <TabPane class="tabpane" label="人员概况" ref="overview" name="overview">
        <div id="overviews">
          <Row :gutter="16">
            <i-col span="24">
              <div class="overview-left">
                <h2 class="overview-left-title">部门人员分配</h2>
                <div class="overview-left-body">
                  <div class="overview-left-head">当前部门人员在不同事业部的人员占比</div>
                  <div class="overview-left-content">
                    <div id="departpersonteam" style="height : 390px"></div>
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
      <TabPane class="tabpane" label="执行力" ref="execution" name="execution">
        <div id="executions">
          <div class="taskNumber">
            <h2 class="taskNumber-title">任务数量</h2>
            <div class="taskNumber-content dashboradTab">
              <span style="font-size:14px">任务创建时间</span>
              <DatePicker
                v-model="departmonthtasknumberData.fromtime"
                @on-change="departmonthtasknumberDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="departmonthtasknumberData.totime"
                @on-change="departmonthtasknumberDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="departmonthtasknumber" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
          <div class="timeConsuming">
            <h2 class="timeConsuming-title">任务耗时</h2>
            <div class="timeConsuming-content dashboradTab">
              <span style="font-size:14px">任务创建时间</span>
              <DatePicker
                v-model="departmonthdurtimeData.fromtime"
                @on-change="departmonthdurtimeDataFromtime"
                type="month"
                placeholder="选择开始时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <span>—</span>
              <DatePicker
                v-model="departmonthdurtimeData.totime"
                @on-change="departmonthdurtimeDataTotime"
                type="month"
                placeholder="选择结束时间"
                format="yyyy-MM"
                style="width:130px"
              ></DatePicker>
              <div id="departmonthdurtime" style="height : 400px;margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
    <toast :is-toast="isToast" :msg="msg"></toast>
  </div>
</template>
<script>
import { Dashborad } from "../../API/api";
import Toast from "../../components/popup/Toast";
import {dashboradColor, maxValue} from "../../util/util";
var echarts = require("echarts");

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



let defaultStartTime = new Date().getFullYear() + "-01"
  
let defaultEndTime =
  new Date().getFullYear() +
  "-" +
  (new Date().getMonth() + 1 > 9
    ? new Date().getMonth() + 1
    : "0" + (new Date().getMonth() + 1));


var departpersonteamChart = ''
var departmonthtasknumberChart = ''
var departmonthdurtimeChart = ''

window.addEventListener("resize", () => { 
   departpersonteamChart.resize();
   departmonthtasknumberChart.resize();
   departmonthdurtimeChart.resize();
});

export default {
  components: {
    Toast
  },
  data() {
    return {
      tabsHeightList: [],
      refList: ["overview", "execution"],
      animatedTab: true,
      msg: "",
      isToast: false,
      departmonthtasknumberData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      },
      departmonthdurtimeData: {
        fromtime: defaultStartTime,
        totime: defaultEndTime
      }
    };
  },
  computed: {
     dashboradNum() {
       return this.$store.state.index.dashboradNum
     },
    id() {
      return this.$route.query.id;
    }
  },

  methods: {
    refreshEcharts() {
       departpersonteamChart.resize()
       departmonthtasknumberChart.resize()
       departmonthdurtimeChart.resize()
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
      var tab2 = document.getElementById("executions").clientHeight;
      this.tabsHeightList.push(tab1);
      this.tabsHeightList.push(tab2);
      console.log(this.tabsHeightList);
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
                this.departmonthtasknumber();
                break;
              case 2:
                this.departmonthdurtime();
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
    departmonthtasknumberDataFromtime(e) {
      this.departmonthtasknumberData.fromtime = e;
      var startTime = new Date(
        this.departmonthtasknumberData.fromtime
      ).getTime();
      var endTime = new Date(this.departmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    departmonthtasknumberDataTotime(e) {
      this.departmonthtasknumberData.totime = e;
      var startTime = new Date(
        this.departmonthtasknumberData.fromtime
      ).getTime();
      var endTime = new Date(this.departmonthtasknumberData.totime).getTime();
      this.timeChange(startTime, endTime, 1);
    },
    departmonthdurtimeDataFromtime(e) {
      this.departmonthdurtimeData.fromtime = e;
      var startTime = new Date(this.departmonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.departmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },
    departmonthdurtimeDataTotime(e) {
      this.departmonthdurtimeData.totime = e;
      var startTime = new Date(this.departmonthdurtimeData.fromtime).getTime();
      var endTime = new Date(this.departmonthdurtimeData.totime).getTime();
      this.timeChange(startTime, endTime, 2);
    },

    departpersonteam() {
      if (this.$route.query.id) {
        this.$http
          .post(
            Dashborad.departpersonteam,
            this.qs.stringify({ departmentId: this.$route.query.id }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            var _data = res.data.retData;
            var chartResult = _data.chartResult;
            var departmentName = _data.departmentName;
            var newData = [];
            var legendName = [];
            for (var i = 0; i < chartResult.length; i++) {
              var newObj = {};
              var str = "";
              Object.keys(chartResult[i]).forEach(function(key) {
                if (key == "userNum") {
                  newObj["value"] = chartResult[i][key];
                } else if (key == "teamName") {
                  newObj["name"] = chartResult[i][key];
                  str = chartResult[i][key];
                }
              });
              newData.push(newObj);
              legendName.push(str);
            }
            departpersonteamChart = echarts.init(
              document.getElementById("departpersonteam")
            );
            departpersonteamChart.clear();
            departpersonteamChart.setOption({
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
            // departpersonteamChart.resize();
          })
          .catch(() => {})
          .finally(() => {});
      }
    },
    departmonthtasknumber() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.departmonthtasknumberData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      var formData = Object.assign(formdata, {
        departmentId: this.$route.query.id
      });
      this.$http
        .post(Dashborad.departmonthtasknumber, this.qs.stringify(formData), {
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

          var yMax = Math.max(
            Math.max.apply(null, series[0].data),
            Math.max.apply(null, series[1].data)
          );
          var yCeilMax = maxValue(yMax ? yMax : 1);

          var fromtime = toTime1(vm.departmonthtasknumberData.fromtime);
          var totime = toTime1(vm.departmonthtasknumberData.totime);
          departmonthtasknumberChart = echarts.init(
            document.getElementById("departmonthtasknumber")
          );
          departmonthtasknumberChart.clear();
          departmonthtasknumberChart.setOption({
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
          // departmonthtasknumberChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    },
    departmonthdurtime() {
      var vm = this;
      var formdata = {
        fromtime: "",
        totime: ""
      };
      var newData = Object.assign({}, this.departmonthdurtimeData);
      formdata.fromtime = toTime2(newData.fromtime);
      formdata.totime = toTime2(newData.totime);
      var formData = Object.assign(formdata, {
        departmentId: this.$route.query.id
      });
      this.$http
        .post(Dashborad.departmonthdurtime, this.qs.stringify(formData), {
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

         departmonthdurtimeChart = echarts.init(
            document.getElementById("departmonthdurtime")
          );
          departmonthdurtimeChart.clear();
          departmonthdurtimeChart.setOption({
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
          // departmonthdurtimeChart.resize();
        })
        .catch(() => {})
        .finally(() => {});
    }
  },
  created() {
    this.departpersonteam();
    this.departmonthtasknumber();
    this.departmonthdurtime();
  },
  mounted(){
      this.getTabsHeight()
      this.tabClick('overview')
  },
  watch: {
     dashboradNum(newVal, oldVAl) {
         this.refreshEcharts()
    },
    id() {
      this.departpersonteam();
      this.departmonthtasknumber();
      this.departmonthdurtime();
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  font-size: 16px;
}
.overview-left,
.taskNumber,
.timeConsuming {
  border: 1px solid #e9ecef;
  padding-bottom: 50px;
}
.timeConsuming {
  margin-top: 30px;
}
.overview-left-title,
.taskNumber-title,
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
.overview-left-head,
.overview-left-content,
.taskNumber-content,
.timeConsuming-content {
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  overflow: hidden;
}
</style>



