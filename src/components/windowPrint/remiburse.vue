<template>
  <div class="window_print-content-remiburse">
    <div class="window_print-content-remiburse-name">
      <img
        src="https://excalibur.gaiyadata.com/uploads/file/20200430/158821266322885185.png"
        alt
        width="300"
      />
    </div>

    <div class="window_print-content-remiburse-content">
      <div class="window_print-content-remiburse-content-title">员工报销单</div>
      <div class="window_print-content-remiburse-content-info">
        <div class="window_print-content-remiburse-content-info-first">
          <div class="window_print-content-remiburse-content-info-first-name">报销单名称</div>
          <div>{{ printData.taskName }}</div>
        </div>
        <div class="window_print-content-remiburse-content-info-second">
          <div class="window_print-content-remiburse-content-info-first-name">报销人</div>
          <div>{{ printData.creatorCnName }}</div>
        </div>
      </div>
      <div class="window_print-content-remiburse-content-info">
        <div class="window_print-content-remiburse-content-info-first">
          <div>事业部/部门</div>
          <div>{{ printData.teamName }}</div>
        </div>
        <div class="window_print-content-remiburse-content-info-second">
          <div>报销时间</div>
          <div>{{ time }}</div>
        </div>
      </div>
      <div class="window_print-content-remiburse-content-table">
        <div class="window_print-content-remiburse-content-table-head">
          <div v-for="(item, index) in thData" :key="index" :width="item.width">{{ item.title }}</div>
        </div>
        <div
          class="window_print-content-remiburse-content-table-body"
          v-if="dataList && dataList.length"
        >
          <div v-for="(item, index) in dataList" :key="index">
            <div v-for="(i, k) in thData" :key="k" :width="item.width">
              <span v-if="i.key === 'bianhao'">{{ index + 1 }}</span>
              <span v-else-if="i.key == 'totalMoney' || i.key == 'weishuiMoney' ||i.key == 'shuiErMoney' ">{{ twoDigitsVal(item[i.key]) }}</span>
              <span v-else>{{ item[i.key] }}</span>
              </div>
          </div>
        </div>
        <div class="window_print-content-remiburse-content-table-nodata" v-else>暂无数据</div>
      </div>
      <div class="window_print-content-remiburse-content-total" v-if="total">
        <div>{{ total.categoryName }}</div>
        <div>{{ twoDigitsVal(total.totalMoney) }}</div>
        <div>{{ twoDigitsVal(total.weishuiMoney) }}</div>
        <div>{{ twoDigitsVal(total.shuiErMoney) }}</div>
      </div>
      <div class="window_print-content-remiburse-content-node">
        <div>
          <div>审批</div>
          <div>节点</div>
          <div>/</div>
          <div>审批</div>
          <div>状态</div>
        </div>
        <div>
          <div v-for="(i, k) in printData.processBody" :key="k">
            <div>{{ i.userTitle }}：{{ i.userCnName }}</div>
            <div class="print-process">
              <div :class="{ noShow:  k === 0, 'print-process-dashed--left--gray': i.statusValue !== '审批通过' }" class="print-process-dashed--left"></div>
              <div :class="{ 'print-process-circle--gray': i.statusValue !== '审批通过' }" class="print-process-circle">
                <div></div>
              </div>
              <div
                :class="{ noShow: k === printData.processBody.length - 1, 'print-process-dashed--right--gray': i.statusValue !== '审批通过' || i.grayRight }"
                class="print-process-dashed--right"
              ></div>
            </div>
            <div>{{ i.statusValue }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Hr } from "../../API/api.js";
import { dateToYMD } from "../../util/util";

export default {
  data() {
    return {
      printData: {},

      thData: [
        {
          title: "编号",
          key: "bianhao",
          width: 60
        },
        {
          title: "发票类别",
          key: "categoryName",
          width: 120
        },
        {
          title: "总金额",
          key: "totalMoney",
          width: 120
        },
        {
          title: "未税金额",
          key: "weishuiMoney",
          width: 80
        },
        {
          title: "税额",
          key: "shuiErMoney",
          width: 80
        },
        {
          title: "发生时间",
          key: "happenTime"
        },
        {
          title: "项目",
          key: "projectName",
          width: 200
        }
      ]
    };
  },
  computed: {
    time() {
      return dateToYMD(new Date());
    },
    dataList() {
      let dataArr = [];
      if (Array.isArray(this.printData.moneyBody)) {
        dataArr = this.printData.moneyBody.slice(0, this.printData.moneyBody.length - 1)
      }
      return dataArr;
    },
    total() {
      let dataArr = [];
      if (Array.isArray(this.printData.moneyBody)) {
        dataArr = this.printData.moneyBody[this.printData.moneyBody.length - 1]
      }
      return dataArr;
    },
  },
  methods: {
    twoDigitsVal(num) {
      return Math.round(num * 100) / 100
    } 
  },
  created() {
    this.$http
      .post(
        Hr.exportbaoxiaoperson,
        this.qs.stringify({
          taskId: this.$route.query.taskId
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      )
      .then(res => {
        if (res.data.retCode === 0) {
          this.printData = res.data.retData.printData;
          this.printData.processBody.shift()
          try {
            this.printData.processBody.forEach((i, k) => {
              if (i.statusValue !== '审批通过') {
                this.printData.processBody[k -1].grayRight = true;
                throw new Error()
              }
            })
          } catch(err) {
            console.log(err)
          }
        }
      });
  }
};
</script>
