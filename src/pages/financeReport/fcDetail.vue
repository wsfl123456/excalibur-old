<template>
  <div class="fc-detail" v-if="showDetail" @click="closeDetail">
    <div class="area" @click.stop>
      <div class="top">
        <i class="el-icon-close" @click="closeDetail"></i>
      </div>
      <template v-if="detail.detailArr.length">
        <template
          v-if="
            detail.modalType === '回款' || detail.modalType === '主营业务收入'
          "
        >
          <el-table class="data-table" max-height="600" :data="detail.detailArr" border>
            <el-table-column
              fixed="left"
              prop="taskName"
              label="合同名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="customerName"
              label="品牌名称"
              width="160"
            >
            </el-table-column>
            <el-table-column
              fixed="left"
              prop="projectName"
              label="项目名称"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="contactsCode" label="合同ID" width="160">
            </el-table-column>
            <el-table-column
              prop="customerNameJiaFang"
              label="甲方账户名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="乙方账户名称"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="baojiadanStr" label="项目结算单" width="180">
            </el-table-column>
            <el-table-column
              :formatter="formatMoney"
              prop="price"
              label="税后金额"
              width="140"
            >
            </el-table-column>
            <el-table-column prop="faxRateShow" label="税率" width="80">
            </el-table-column>
            <el-table-column prop="invoiceNo" label="发票号" width="140">
            </el-table-column>
            <el-table-column
              sortable
              prop="kaipiaoDate"
              label="实际开票日期"
              width="160"
            >
            </el-table-column>
            <el-table-column
              :formatter="(row, col, v) => v + '天'"
              prop="zhangqi"
              label="账期"
              width="80"
            >
            </el-table-column>
            <el-table-column prop="yujiFuDate" label="预计收款日期" width="160">
            </el-table-column>
            <el-table-column prop="fuTime_f" label="实际收款日期" width="160">
            </el-table-column>
            <el-table-column prop="creatorName" label="申请人" width="120">
            </el-table-column>
            <el-table-column prop="applyTime_f" label="申请时间" width="160">
            </el-table-column>
            <el-table-column prop="remarkContent" label="备注" width="160">
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="detail.modalType === '员工支出'">
           <el-table class="data-table" max-height="600" :data="detail.detailArr" border>
            <el-table-column
              fixed="left"
              prop="userCode"
              label="员工编号"
              width="180"
            ></el-table-column>
            <el-table-column
              fixed="left"
              prop="userName"
              label="员工姓名"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="teamName"
              label="事业部"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="totalSalary"
              label="基本薪资"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="socialTotal"
              label="个人社保合计"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="fundTotal"
              label="个人公积金合计"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="companyTotal"
              label="公司社保合计"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="companyFund"
              label="公司公积金合计"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="reimbursement"
              label="报销"
              width="160"
            ></el-table-column>
            <el-table-column
              fixed="right"
              prop="actSalary"
              label="共计"
              width="160"
            ></el-table-column>
          </el-table>
        </template>
        <template v-else-if="detail.modalType === '项目开销'">
            <el-table class="data-table" max-height="600" :data="detail.detailArr" border>
            <el-table-column
              fixed="left"
              prop="taskCode"
              label="报销ID"
              width="180"
            ></el-table-column>
            <el-table-column
              fixed="left"
              prop="taskName"
              label="报销单名称"
              width="160"
            ></el-table-column>
            <el-table-column
              :formatter="formatMoney"
              fixed="left"
              prop="price"
              label="报销金额"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="baoxiaoZhuti"
              label="报销主体"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="categoryName"
              label="发票类别"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="projectName"
              label="项目"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="creatorEnglishName"
              label="创建人"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="taskCreateDate"
              label="创建日期"
              width="160"
            ></el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-table class="data-table" max-height="600" :data="detail.detailArr" border>
            <el-table-column
              fixed="left"
              prop="taskName"
              label="合同名称"
              width="180"
            ></el-table-column>
            <el-table-column
              fixed="left"
              prop="supplierName"
              label="供应商"
              width="180"
            ></el-table-column>
            <el-table-column
              fixed="left"
              prop="projectName"
              label="项目名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="contactsCode"
              label="合同ID"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="customerNameJiaFang"
              label="甲方账户名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="companyName"
              label="乙方账户名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="bjdNameStr"
              label="结算单名称"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="bjdCodeStr"
              label="结算单编号"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="getInvoice"
              label="是否收到发票"
              :formatter="(row, col, v) => (v === '1' ? '是' : '否')"
              width="130"
            ></el-table-column>
            <el-table-column
              :formatter="formatMoney"
              prop="priceTotal"
              label="付款金额"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="invoiceNo"
              label="发票号"
              width="180"
            ></el-table-column>
            <el-table-column
              :formatter="(row, col, v) => v + '天'"
              prop="zhangqi"
              label="账期"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="yujiFuDate"
              label="计划付款日期"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="fuTime_f"
              label="实际付款日期"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="creatorName"
              label="申请人"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="teamName"
              label="事业部"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="applyTime_f"
              label="申请时间"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="期望日期"
              width="160"
            ></el-table-column>
            <el-table-column
              prop="remarkContent"
              label="备注"
              width="160"
            ></el-table-column>
          </el-table>
        </template>
      </template>
      <template v-else><span class="no-data">暂无数据</span></template>
    </div>
  </div>
</template>
<script>
import { thousandSplit } from "../../util/util";
import clickoutside from "@/directives/clickoutside";

export default {
  name: "fcDetail",
  directives: { clickoutside },

  props: {
    detail: {
      type: [Object],
      default: function () {
        return {};
      },
    },
    showDetail: {
      type: [Boolean],
    },
  },
  data() {
    return {};
  },
  methods: {
    formatMoney(row, col, money) {
      const m = parseFloat(money);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    closeDetail() {
      console.log(333);
      this.$emit("update:showDetail", false);
    },
  },
};
</script>
<style lang="less">
.fc-detail {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  .area {
    width: 80%;
    max-width: 1200px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.06rem;
    padding: 30px 20px 50px;
    text-align: center;
    .top {
      text-align: right;
      font-size: 25px;
      i {
        cursor: pointer;
      }
    }

    .data-table {
    }

    .no-data {
      font-size: 16px;
    }
  }
}
</style>