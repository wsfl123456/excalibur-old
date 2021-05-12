<template>
  <div class="project-margin">
    <el-table
      :data="marginsheetList"
      border
      v-loading="loading"
      :row-class-name="tableRowClassName"
    >
      >
      <el-table-column prop="itemName" label="名称"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="inTotalHaveTax" label="收入"></el-table-column>
      <el-table-column prop="inTotalTax" label="税率"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="inTotal" label="未税金额"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="outTotalHaveTax" label="成本"></el-table-column>
      <el-table-column prop="outTotalTax" label="税率"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="outTotal" label="未税金额"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="margin" label="毛利"></el-table-column>
      <el-table-column :formatter="percentMoney" prop="marginPercent" label="毛利率"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Task } from "../../../API/api.js";
import { thousandSplit } from "../../../util/util.js";

export default {
  computed: {
    selectedProject() {
      return this.$store.state.projects.detail;
    }
  },
  data() {
    return {
      loading: true,
      marginsheetList: []
    };
  },
  methods: {
     percentMoney(row, col, money) {
      return money ? money + '%' : ''
    },
    formatMoney(row, col, money) {
      /* 先转数字固定小数，再转字符加千分位分隔符 */
      const m = parseFloat(money);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.level === "1") {
        return "primary-color";
      } else if (row.level === "2") {
        return "warning-color";
      } else {
        return "";
      }
    }
  },
  created() {
    const params = {
      isExport: 0,
      projectId: this.selectedProject.id
    };
    this.$http
      .post(Task.marginsheet, this.qs.stringify(params), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") }
      })
      .then(res => {
        let data = res.data.retData;
        this.marginsheetList = data.showList;
        this.loading = false;
      })
      .catch(res => {
        this.loading = false;
      });
  }
};
</script>

<style lang="less">
.project-margin {
  margin: 20px;
  .primary-color {
    background-color: rgba(45, 142, 248, 0.1);
    color: #2d8ef8;
  }

  .warning-color {
    background-color: rgba(255, 102, 102, 0.1);
  }
  .el-table__header > thead > tr > th {
    background-color: #f5f7fa;
    color: #606256;
  }
  .cell {
    text-align: center;
  }
  th {
    border: none;
    border-right: 1px solid #EBEEF5
  }
}
</style>


