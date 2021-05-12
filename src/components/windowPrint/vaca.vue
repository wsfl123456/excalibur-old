<template>
  <div class="window_print-content-vaca">
    <div class="window_print-content-vaca-name">
      <img
        src="https://excalibur.gaiyadata.com/uploads/file/20200430/158821266322885185.png"
        alt
        width="300"
      />
    </div>

    <div class="window_print-content-vaca-content">
      <div class="window_print-content-vaca-content-title">员工休假单</div>
      <div class="window_print-content-vaca-content-info">
        <div class="window_print-content-vaca-content-info-first">
          <div class="window_print-content-vaca-content-info-first-name">姓名</div>
          <div>{{ printData.userName }}</div>
        </div>
        <div class="window_print-content-vaca-content-info-second">
          <div class="window_print-content-vaca-content-info-first-name">事业部</div>
          <div>{{ printData.teamName }}</div>
        </div>
      </div>
      <div class="window_print-content-vaca-content-info">
        <div class="window_print-content-vaca-content-info-first">
          <div>职位</div>
          <div>{{ printData.positionName }}</div>
        </div>
        <div class="window_print-content-vaca-content-info-second">
          <div>填写时间</div>
          <div>{{ printData.nowDate }}</div>
        </div>
      </div>
      <div class="window_print-content-vaca-content-table">
        <div class="window_print-content-vaca-content-table-head">
          <div v-for="(item, index) in thData" :key="index" :width="item.width">{{ item.title }}</div>
        </div>
        <div
          class="window_print-content-vaca-content-table-body"
          v-if="printData.vacationBody && printData.vacationBody.length"
        >
          <div v-for="(item, index) in printData.vacationBody" :key="index">
            <div v-for="(i, k) in thData" :key="k" :width="item.width">{{ item[i.key] }}</div>
          </div>
        </div>
        <div class="window_print-content-vaca-content-table-nodata" v-else>暂无数据</div>
      </div>
      <div class="window_print-content-vaca-content-remark">
        <div style="border-bottom: 1px solid #CED4DA">说明</div>
        <div>1、请假一天由直线经理和部门负责人批准，请假两天由人力资源部同时批准，请假三天或以上由总经理同时批准。除特殊情况外，准假后才能离岗。（备注：病假，请附在背面，贴上开具的医生证明）</div>
      </div>
      <div class="window_print-content-vaca-content-node">
        <div>
          <div>审批</div>
          <div>节点</div>
          <div>/</div>
          <div>审批</div>
          <div>状态</div>
        </div>
        <div>
          <!-- <div v-for="(i, k) in printData.proccessBody" :key="k">
            <div>{{ i.userTitle }}：{{ i.userName }}</div>
            <div class="print-process">
              <div :class="{ noShow:  k === 0 }" class="print-process-dashed--left"></div>
              <div class="print-process-circle">
                <div></div>
              </div>
              <div :class="{ noShow: k === printData.proccessBody.length - 1 }" class="print-process-dashed--right"></div>
            </div>
            <div>
              {{ i.statusName }}
            </div>
          </div> -->
          <div v-for="(i, k) in printData.proccessBody" :key="k">
            <div>{{ i.userTitle }}：{{ i.userName }}</div>
            <div class="print-process">
              <div :class="{ noShow:  k === 0, 'print-process-dashed--left--gray': i.statusName !== '审批通过' && i.statusName !== '申请' }" class="print-process-dashed--left"></div>
              <div :class="{ 'print-process-circle--gray': i.statusName !== '审批通过' && i.statusName !== '申请' }" class="print-process-circle">
                <div></div>
              </div>
              <div
                :class="{ noShow: k === printData.proccessBody.length - 1, 'print-process-dashed--right--gray': (i.statusName !== '审批通过' && i.statusName !== '申请') || i.grayRight }"
                class="print-process-dashed--right"
              ></div>
            </div>
            <div>{{ i.statusName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Task } from "../../API/api.js";

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
          title: "请假开始时间",
          key: "startTime",
          width: 120
        },
        {
          title: "请假结束时间",
          key: "endTime",
          width: 120
        },
        {
          title: "请假天数",
          key: "dayCountE2",
          width: 60
        },
        {
          title: "请假事由",
          key: "reason"
        },
        {
          title: "请假类型",
          key: "vacationTypeName",
          width: 80
        },
        {
          title: "调休对应时间",
          key: "relationDateStr",
          width: 200
        }
      ]
    };
  },
  created() {
    this.$http
      .post(
        Task.exportvacation,
        this.qs.stringify({
          fromtime: this.$route.query.fromtime,
          totime: this.$route.query.totime
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      )
      .then(res => {
        if (res.data.retCode === 0) {
          this.printData = res.data.retData.printData;
          try {
            this.printData.proccessBody.forEach((i, k) => {
              if (i.statusName !== '审批通过' && i.statusName !== '申请') {
                this.printData.proccessBody[k -1].grayRight = true;
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
