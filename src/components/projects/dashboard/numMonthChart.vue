<template>
  <div style="position:relative">
    <div id="num-month-chart" style="height:330px"></div>
    <Spin fix v-if="!info.length">
      <Icon type="load-c" size="40" class="position-chart-load"></Icon>
    </Spin>
  </div>
</template>
<script>
import echarts from "echarts";
import merge from "deepmerge";
import { EchartsBasicOptions, maxValue } from "../../../util/util.js";

export default {
  props: {
    info: {
      type: [Array]
    }
  },
  watch: {
    info: {
      handler(val) {
        val.length && this.init();
      }
    }
  },
  methods: {
    init() {
      let xAxisData = [];
      let series = [
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

      this.info.forEach(element => {
        xAxisData.push(element.monthName);
        series[0].data.push(element.taskCreateNum);
        series[1].data.push(element.taskOperationNum);
        series[2].data.push(element.taskCommenFinishCreatePercent);
        series[3].data.push(element.taskCommenFinishOperationPercent);
      });

      /* 计算Y轴最大值 */
      let leftMaxY = Math.max(
        Math.max.apply(null, series[0].data),
        Math.max.apply(null, series[1].data)
      );
      let leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);

      const options = {
        ...merge(EchartsBasicOptions, {
          grid: {
            bottom: 60
          },
          tooltip: {
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
          legend: {
            data: ["发布任务数", "接受任务数", "任务被完成率", "任务完成率"]
          },
          xAxis: {
            type: "category",
            data: xAxisData
          },
          yAxis: [
            {
              type: "value",
              name: "任务数量（个）",
              nameTextStyle: {
                color: "#999",
                fontSize: 14
              }, 
              min: 0,
              max: leftMaxCeilY,
              interval: leftMaxCeilY / 10,
              axisLabel: {
                formatter: "{value}",
                textStyle: {
                  color: "#999", 
                  fontSize: 14
                }
              },
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#e9ecef", 
                  width: "1" 
                }
              }
            },
            {
              type: "value",
              name: "任务完成率（%）",
              nameTextStyle: {
                color: "#999",
                fontSize: 14
              }, 
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                formatter: "{value} %",
                textStyle: {
                  color: "#999", 
                  fontSize: 14
                }
              },
              axisLine: {
                lineStyle: {
                  type: "solid",
                  color: "#e9ecef", 
                  width: "1" 
                }
              }
            }
          ],
          series: series
        })
      };
      const chart = echarts.init(document.getElementById("num-month-chart"));
      chart.setOption(options);
    }
  }
};
</script>

