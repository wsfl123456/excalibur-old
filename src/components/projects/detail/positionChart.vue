<template>
  <div style="position:relative">
    <div id="position-member" style="height:350px"></div>
    <Spin fix v-if="!Object.keys(this.projectMember).length">
      <Icon type="load-c" size="40" class="position-chart-load"></Icon>
    </Spin>
  </div>
</template>
<script>
import echarts from "echarts";
import { dashboradColor } from "../../../util/util.js";

export default {
  props: {
    projectMember: {
      type: [Object]
    }
  },
  watch: {
    projectMember: {
      handler(val) {
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
      if (Object.keys(this.projectMember).length) {
        let legendName = [];
        let seriesData = [];
        this.projectMember.projectMemberList.forEach(ele => {
          seriesData.push({
            value: ele.memberNumber,
            name: ele.positionName
          });
          legendName.push(ele.positionName);
        });
        const chart = echarts.init(document.getElementById("position-member"));
        const options = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            x: "center",
            data: legendName,
            type: "scroll"
          },
          graphic: {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text:
                "该项目总人数\n\n" + "" + this.projectMember.projectMemberNum,
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
              label: {
                normal: {
                  show: true,
                  position: "outside",
                  textStyle: {
                    fontWeight: 300,
                    fontSize: 16
                  },
                  formatter: "{d}%"
                }
              },
              labelLine: {
                normal: {
                  show: true
                }
              },
              data: seriesData
            }
          ],
          color: dashboradColor
        };
        chart.clear();
        chart.setOption(options);
      }
    }
  }
};
</script>
<style lang="less">
.position-chart-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>


