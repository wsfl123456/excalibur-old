<template>
  <div style="position:relative">
    <div id="consume-depart-chart" style="height:400px"></div>
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

      this.info.forEach(element => {
        xAxisData.push(element.departmentName);
        series[0].data.push(element.operationAvgDurTime);
        series[1].data.push(element.taskAvgVersionNum);
      });

      /* 计算Y轴最大值 */
      var leftMaxY = Math.max.apply(null, series[0].data);
      var leftMaxCeilY = maxValue(leftMaxY ? leftMaxY : 1);
      var rightMaxY = Math.max.apply(null, series[1].data);
      var rightMaxCeilY = maxValue(rightMaxY ? rightMaxY : 1);

      const options = {
        ...merge(EchartsBasicOptions, {
          grid: {
            bottom: 130
          },
          tooltip: {
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
          legend: {
            data: ["任务平均耗时", "任务平均更新次数"]
          },
          xAxis: {
            type: "category",
            data: xAxisData
          },
          yAxis: [
            {
              type: "value",
              name: "任务耗时（天）",
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
              name: "更新次数",
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
      const chart = echarts.init(
        document.getElementById("consume-depart-chart")
      );
      chart.setOption(options);
    }
  }
};
</script>

