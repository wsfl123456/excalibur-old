<template>
  <div class="project-chart" id="project-chart"></div>
</template>
<script>
import echarts from "echarts";
import merge from "deepmerge";
import { EchartsBasicOptions } from "../../../util/util.js";

export default {
  props: {
    info: {
      type: [Array]
    }
  },
  watch: {
    info: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let xAxisData = [];
      let series = [];
      let seriesData = [];
      let legendData = [];

      this.info.forEach((element, index) => {
        seriesData = Array(this.info.length)
          .fill(0)
          .fill(element.paperAvgScore, index, index + 1);
        series.push({
          name: element.projectName,
          type: "bar",
          stack: "project",
          data: seriesData
        });
        legendData.push(element.projectName);
        xAxisData.push(element.projectName);
      });

      const options = {
        ...merge(EchartsBasicOptions, {
          grid: {
            bottom: 120,
            right: 240,
            left: 100
          },
          tooltip: {
            formatter: function(params) {
              let result = ``;

              params.forEach(function(item, index) {
                if (item.value) {
                  result += `<div>
                        <span>${item.marker} ${item.seriesName} ：<span>
                        <span style='float:right'>${item.value}</span>
                       </div>
                      `;
                }
              });

              return result;
            }
          },
          legend: {
            data: legendData,
            type: "scroll",
            orient: "vertical",
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
            right: 0,
            top: 0,
            textStyle: {
              rich: {
                a: {
                  width: 140,
                  align: "left",
                  lineHeight: 15,
                  fontSize: 12,
                  verticalAlign: "middle"
                }
              }
            }
          },
          xAxis: {
            type: "category",
            data: xAxisData,
            show: false
          },
          yAxis: [
            {
              type: "value",
              name: "满意度",
              nameTextStyle: {
                color: "#999",
                fontSize: 14
              },
              min: 0,
              max: 5,
              interval: 1,
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
          // color: "#FEA39E"
        })
      };
      const chart = echarts.init(document.getElementById("project-chart"));
      chart.clear();
      chart.setOption(options);
    }
  }
};
</script>

<style lang="less" scoped>
.project-chart {
  height: 400px;
}
</style>

