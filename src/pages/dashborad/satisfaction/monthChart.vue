<template>
  <div class="month-chart" id="month-chart"></div>
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
      let legendData = []

      this.info[0].customerList.forEach(element => {
        legendData.push(element.customerName)
        series.push({
          name: element.customerName,
          type: "line",
          data: []
        });
      });

      this.info.forEach((element, index) => {
        element.customerList.forEach((ele, ind) => {
          series[ind].data.push(ele.paperAvgScore)
        });
        xAxisData.push(element.monthName);
      });

      const options = {
        ...merge(EchartsBasicOptions, {
          grid: {
            bottom: 60,
            right: 240,
            left: 100
          },
          tooltip: {
            enterable: true,
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
            extraCssText: "overflow: auto;max-height:400px",
            formatter: function(params) {
              let result = `
                     <div>
                        <span>${params[0].name}</span>
                     </div>
                `;

              params.forEach(function(item, index) {
                result += `<div>
                        <span>${item.marker} ${item.seriesName} ：<span>
                        <span style='float:right'>${item.value}</span>
                       </div>
                      `;
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
            data: xAxisData
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
        })
      };
      const chart = echarts.init(document.getElementById("month-chart"));
      chart.clear()
      chart.setOption(options);
    }
  }
};
</script>

<style lang="less" scoped>
.month-chart {
  height: 340px;
}
</style>

