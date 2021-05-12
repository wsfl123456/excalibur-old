<template>
  <div class="report-page">
    <div class="form-box-wrapper">
      <div class="form-box">
        <div class="input-item">
          <p class="name">品牌</p>
          <div class="input-inner">
            <el-select
              v-model="searchParams.brand"
              @change="getProjectList"
              filterable
              placeholder="请选择品牌"
            >
              <el-option
                v-for="item in brands"
                :key="item.id"
                :value="item.id"
                :label="item.customerName"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item">
          <p class="name">项目</p>
          <div class="input-inner">
            <el-select v-model="searchParams.project" filterable placeholder="请先选择品牌">
              <el-option
                v-for="item in projects"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item">
          <p class="name">事业部</p>
          <div class="input-inner">
            <el-select v-model="searchParams.department" filterable placeholder="请选择事业部">
              <el-option
                v-for="item in departments"
                :key="item.teamId"
                :value="item.teamId"
                :label="item.teamName"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item">
          <p class="name">时间</p>
          <div class="input-inner">
            <DatePicker
              v-model="searchParams.date"
              type="daterange"
              split-panels
              placeholder="请选择时间"
              style="width: 200px;height:40px"
            ></DatePicker>
          </div>
        </div>
        <div class="input-item">
          <p class="name">状态</p>
          <div class="input-inner status">
            <el-select v-model="searchParams.fuState" placeholder="请选择状态">
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="待付"></el-option>
              <el-option :value="2" label="已付"></el-option>
            </el-select>
            <!-- <span class="total-momey" v-if="searchParams.fuState === 0">({{formatMoney(1, 1, Number(fuState_1_total) + Number(fuState_2_total))}})</span>
            <span class="total-momey" v-if="searchParams.fuState === 1">({{formatMoney(1, 1, fuState_1_total)}})</span>
            <span class="total-momey" v-if="searchParams.fuState === 2">({{formatMoney(1, 1, fuState_2_total)}})</span>-->
            <span
              class="total-momey"
            >({{formatMoney(1, 1, Number(fuState_1_total) + Number(fuState_2_total))}})</span>
          </div>
        </div>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="searchTableData">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="queryTableData(true)">导出</el-button>
    </div>

    <!--    <ar-table class="data-table"  :scroll-width="1600" :data="tableData" border v-loading="tableLoading"></ar-table>-->
    <el-table class="data-table" :data="tableData" border v-loading="tableLoading">
      <el-table-column fixed="left" prop="taskName" label="合同名称" width="180"></el-table-column>
      <el-table-column fixed="left" prop="supplierName" label="供应商" width="180"></el-table-column>
      <el-table-column fixed="left" prop="projectName" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="contactsCode" label="合同ID" width="160"></el-table-column>
      <el-table-column prop="customerNameJiaFang" label="甲方账户名称" width="180"></el-table-column>
      <el-table-column prop="companyName" label="乙方账户名称" width="180"></el-table-column>
      <el-table-column prop="bjdNameStr" label="结算单名称" width="160"></el-table-column>
      <el-table-column prop="bjdCodeStr" label="结算单编号" width="160"></el-table-column>
      <el-table-column
        prop="getInvoice"
        label="是否收到发票"
        :formatter="(row, col, v) => v === '1' ? '是' : '否'"
        width="130"
      ></el-table-column>
      <el-table-column :formatter="formatMoney" prop="priceTotal" label="付款金额" width="140"></el-table-column>
      <el-table-column prop="invoiceNo" label="发票号" width="180"></el-table-column>
      <el-table-column :formatter="(row, col, v) => v + '天'" prop="zhangqi" label="账期" width="180"></el-table-column>
      <el-table-column prop="yujiFuDate" label="计划付款日期" width="140"></el-table-column>
      <el-table-column prop="fuTime_f" label="实际付款日期" width="140"></el-table-column>
      <el-table-column prop="creatorName" label="申请人" width="160"></el-table-column>
      <el-table-column prop="teamName" label="事业部" width="80"></el-table-column>
      <el-table-column prop="applyTime_f" label="申请时间" width="160"></el-table-column>
      <el-table-column prop="endTime" label="期望日期" width="160"></el-table-column>
      <el-table-column prop="remarkContent" label="备注" width="160"></el-table-column>
    </el-table>

    <div class="pagination-wrapper">
      <div class="record">
        <span
          class="font"
        >显示第 {{ pagination.size*(pagination.page - 1) + 1 }} 到 {{ pagination.size*pagination.page }} 条记录 , 总共{{ pagination.total }}条记录。每页显示</span>
        <el-input class="page-input" v-model="paginationSizeText" @blur="checkPageSize"></el-input>
        <span class="font">条记录</span>
      </div>
      <el-button @click="goToTablePage(1)">首页</el-button>
      <el-pagination
        class="table-pagination"
        :current-page="pagination.page"
        @current-change="changePage"
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pagination.size"
        :total="pagination.total"
      ></el-pagination>
      <el-button @click="goToTablePage(Math.ceil(pagination.total/pagination.size))">末页</el-button>
    </div>
  </div>
</template>

<script>
import "./index.less";
import { Task, Brand, Project } from "../../API/api";
import { thousandSplit } from "../../util/util";

export default {
  name: "ap",
  created() {
    if (this.$route.query.type) {
      this.searchParams.fuState = this.$route.query.type == 'nopay' ? 1 : 2;
    }
    this.getBranList();
    this.queryTableData();
    this.getDepartments();
  },
  data() {
    return {
      tableData: [],
      projects: [{ name: "全部" }],
      brands: [{ customerName: "全部" }],
      departments: [{ teamName: "全部" }],
      tableLoading: false,
      fuState_1_total: null,
      fuState_2_total: null,
      paginationSizeText: 6,
      pagination: {
        total: 0,
        page: 1,
        size: 6,
      },
      searchParams: {
        date: [],
        brand: "",
        project: "",
        department: "",
        fuState: 0,
      },
    };
  },
  methods: {
    formatMoney(row, col, money) {
      /* 很无语的先转数字固定小数，再转字符加千分位分隔符 */
      const m = parseFloat(money);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    async getBranList() {
      const res = await this.$http.post(
        Brand.listByProject,
        this.qs.stringify({ page: 1, pageSize: 1000, powerType: 1 }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      const brands = res.data.retData.customerList.data;

      if (Array.isArray(brands)) this.brands = [...this.brands, ...brands];
    },
    searchTableData() {
      this.pagination.page = 1;
      this.queryTableData();
    },
    async queryTableData(isExport) {
      this.tableLoading = true;

      const [fromtime, totime] = this.searchParams.date
        ? this.searchParams.date
        : [];
      const queryParams = {
        page: this.pagination.page,
        pageSize: this.pagination.size,
        customerId: this.searchParams.brand,
        projectId: this.searchParams.project,
        teamId: this.searchParams.department,
        fuState: this.searchParams.fuState,
        isExport: isExport === true ? 1 : 0,
        fromtime: fromtime
          ? `${fromtime.getFullYear()}-${
              Number(fromtime.getMonth()) > 8 ? "" : "0"
            }${fromtime.getMonth() + 1}-${fromtime.getDate()}`
          : "",
        totime: totime
          ? `${totime.getFullYear()}-${
              totime.getMonth() + 1
            }-${totime.getDate()}`
          : "",
      };
      const res = await this.$http.post(
        Task.cwaplist,
        this.qs.stringify(queryParams),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );

      /* 导出则打开窗口导出 */
      if (isExport === true) {
        const url = res.data.retData.download_url;
        window.open(url);
        return (this.tableLoading = false);
      }

      this.fuState_1_total = res.data.retData.fuState_1_total;
      this.fuState_2_total = res.data.retData.fuState_2_total;

      const tableData = res.data.retData.cwList;
      if (Array.isArray(tableData)) this.tableData = tableData;
      this.pagination.total = +res.data.retData.cwCount;
      this.tableLoading = false;
    },
    async getProjectList() {
      this.searchParams.project = "";

      const res = await this.$http.post(
        Project.list,
        this.qs.stringify({
          page: 1,
          pageSize: 1000,
          customerId: this.searchParams.brand,
          powerType: 1,
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      const projects = res.data.retData.data;

      if (Array.isArray(projects))
        this.projects = [{ name: "全部" }, ...projects];
    },
    async getDepartments() {
      const res = await this.$http.post(
        Task.userteamlist,
        this.qs.stringify({ page: 1, pageSize: 1000, powerType: 1 }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      const departments = res.data.retData.data;

      if (Array.isArray(departments))
        this.departments = [...this.departments, ...departments];
    },
    checkPageSize() {
      const size = parseInt(this.paginationSizeText);

      if (size > 0 && size <= this.pagination.total) {
        this.paginationSizeText = this.pagination.size = size;
        this.queryTableData(); // 修改成功刷新数据
      } else {
        this.paginationSizeText = this.pagination.size;
      }
    },
    changePage(page) {
      this.pagination.page = page;
      this.queryTableData();
    },
    goToTablePage(page) {
      this.pagination.page = page;
      this.queryTableData();
    },
  },
};
</script>
