<template>
  <div class="report-page">
    <div class="form-box-wrapper">
      <div class="form-box">
        <div class="input-item">
          <p class="name">请选择</p>
          <div class="input-inner">
            <el-select v-model="searchParams.type">
              <el-option
                v-for="item in serachList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="input-item">
          <p class="name">品牌</p>
          <div class="input-inner">
            <el-select v-model="searchParams.brand" @change="getProjectList" filterable placeholder="请选择品牌">
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
            <!-- <el-date-picker
              v-model="searchParams.date"
              type="daterange"
              style="width:300px"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker> -->
            <DatePicker v-model="searchParams.date" type="daterange" split-panels placeholder="请选择时间" style="width: 200px;height:40px"></DatePicker>

          </div>
        </div>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="serachSheet">搜索</el-button>
      <el-button type="primary" icon="el-icon-download" @click="exportSheet">导出</el-button>
    </div>

    <el-table
      v-if="searchParams.type === 1"
      class="data-table"
      :data="marginsheetList"
      border
      v-loading="loading"
      :row-class-name="tableRowClassName"
    >
      >
      <el-table-column prop="itemName" label="名称"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="inTotalHaveTax" label="收入"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="outTotalHaveTax" label="成本"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="margin" label="毛利"></el-table-column>
      <el-table-column :formatter="percentMoney" prop="marginPercent" label="毛利率"></el-table-column>
    </el-table>
    <el-table
      v-else
      class="data-table"
      :data="marginProjectList"
      border
      v-loading="loading"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="itemName" label="名称"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="inTotalHaveTax" label="收入"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="outTotalHaveTax" label="成本"></el-table-column>
      <el-table-column :formatter="formatMoney" prop="margin" label="毛利"></el-table-column>
      <el-table-column :formatter="percentMoney" prop="marginPercent" label="毛利率"></el-table-column>
    </el-table>

    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>
<script>
import "./index.less";
import { Task, Brand, Project } from "../../API/api"; 
import { thousandSplit } from "../../util/util";
import Toast from "../../components/popup/Toast";

export default {
  components: {
    Toast
  },
  data() {
    return {
      isToast: false,
      toastMsg: "",
      loading: false,
      canLoad: true,
      searchParams: {
        type: 1,
        brand: "",
        project: "",
        department: "",
        date: []
      },
      brands: [],
      projects: [],
      departments: [
        {
          teamId: 0,
          teamName: '全部'
          
        }
      ],
      marginsheetList: [],
      marginProjectList: [],
      serachList: [
        {
          id: 1,
          name: "总表"
        },
        {
          id: 2,
          name: "项目单体表"
        }
      ],
      projectParam: {
        page: 1,
        pageSize: 52
      }
    };
  },
  methods: {
    formatMoney(row, col, money) {
      /* 先转数字固定小数，再转字符加千分位分隔符 */
      const m = parseFloat(money);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    percentMoney(row, col, money) {
      return money ? money + '%' : ''
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.level === "1") {
        return "primary-color";
      } else if (row.level === "2") {
        return "warning-color";
      } else {
        return "";
      }
    },
    refresh() {
      this.canLoad = true;
      this.marginsheetList = [];
      this.marginProjectList = [];
      this.projectParam = {
        page: 1,
        pageSize: 52
      };
    },
    async getBranList() {
      const res = await this.$http.post(
        Brand.listByProject,
        this.qs.stringify({ page: 1, pageSize: 1000, powerType: 1 }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      const brands = res.data.retData.customerList.data;

      if (Array.isArray(brands))
        this.brands = [{ customerName: "全部" }, ...brands];
    },

    async getProjectList() {
      this.searchParams.project = "";

      const res = await this.$http.post(
        Project.list,
        this.qs.stringify({
          page: 1,
          pageSize: 1000,
          customerId: this.searchParams.brand,
          powerType: 1
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

      if (Array.isArray(departments)) this.departments = [...this.departments, ...departments];
    },
    exportSheet() {
      if (this.searchParams.type === 1) this.MarginSheet(1);
      else this.MarginSheetProject(1);
    },
    serachSheet() {
      this.refresh();

      if (this.searchParams.type === 1) this.MarginSheet(0);
      else this.MarginSheetProject(0);
    },
    MarginSheet(type) {
      const [fromtime, totime] = this.searchParams.date ? this.searchParams.date : []
      this.loading = true;
      const params = {
        itemRange: 0,
        isExport: type,
        customerId: this.searchParams.brand,
        projectId: this.searchParams.project,
        teamId: this.searchParams.department,
        fromtime: fromtime
            ? `${fromtime.getFullYear()}-${Number(fromtime.getMonth()) > 8 ? '' : '0'}${fromtime.getMonth() + 1}-${fromtime.getDate()}`
            : "",
        totime: totime
            ? `${totime.getFullYear()}-${totime.getMonth() + 1}-${totime.getDate()}`
            : "",
        // totime: totime ? totime.substr(0, 10) : "",
      };
      this.$http
        .post(Task.marginsheet, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let data = res.data.retData;
          if (type === 0) {
            this.marginsheetList = data.showList;
          } else {
            window.open(data.download_url);
          }
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    MarginSheetProject(type) {
      const [fromtime, totime] = this.searchParams.date ? this.searchParams.date : []
      this.loading = true;
      const params = Object.assign(
        {
          itemRange: 0,
          isExport: type,
          customerId: this.searchParams.brand,
          projectId: this.searchParams.project,
          teamId: this.searchParams.department,
          fromtime: fromtime
            ? `${fromtime.getFullYear()}-${Number(fromtime.getMonth()) > 8 ? '' : '0'}${fromtime.getMonth() + 1}-${fromtime.getDate()}`
            : "",
        totime: totime
            ? `${totime.getFullYear()}-${totime.getMonth() + 1}-${totime.getDate()}`
            : "",
        },
        this.projectParam
      );
      this.$http
        .post(Task.marginsheetproject, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let data = res.data.retData;
          this.loading = false;

          if (type === 0) {
            this.dom.scrollTop -= 30; //   防止无限触发滚动事件

            if (res.data.retCode === 0) {
              if (this.projectParam.page === 1) {
                this.marginProjectList = data.showList || [];
              } else {
                this.marginProjectList = this.marginProjectList.concat(
                  data.showList
                );
              }
              if (!data.showList || data.showList.length === 0) {
                this.isToast = true;
                this.toastMsg = "没有更多";
                this.projectParam.page--;
                this.canLoad = false
              }
            } else {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            }

            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = "";
            }, 1500);
          } else {
            window.open(data.download_url);
          }
        })
        .catch(res => {
          this.loading = false;
        });
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    },
    scrollHandler() {
      if (
        this.canLoad &&
        this.searchParams.type === 2 &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.loading
      ) {
        this.projectParam.page++;
        this.MarginSheetProject(0);
      }
    }
  },
  beforeDestroy() {
    this.unbindLoadMore();
  },
  created() {
    this.getBranList();
    this.getDepartments();
    this.MarginSheet(0);
  },
  mounted() {
    this.dom = document.getElementById("main-pages");
    this.chDom = document.getElementById("main-content");
    this.loadMore();
  }
};
</script>

