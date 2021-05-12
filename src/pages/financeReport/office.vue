<template>
  <div class="fc-office">
    <div class="form">
      <el-date-picker
        v-model="searchDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDate"
      >
      </el-date-picker>

      <el-select
        v-model="searchParams.customerId"
        @change="getProjectList"
        filterable
        placeholder="请选择品牌"
        class="item"
      >
        <el-option
          v-for="item in brands"
          :key="item.id"
          :value="item.id"
          :label="item.customerName"
        ></el-option>
      </el-select>

      <el-select
        v-model="searchParams.projectId"
        filterable
        placeholder="请选择项目"
        class="item"
      >
        <template v-if="searchParams.customerId">
          <el-option
            v-for="item in projects"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </template>
        <template v-else>
          <el-option value="9999999" label="请先选择品牌" disabled></el-option>
        </template>
      </el-select>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="searchList(0)"
        class="item"
        >搜索</el-button
      >

      <el-button
        type="primary"
        icon="el-icon-download"
        @click="searchList(1)"
        >导出</el-button
      >
    </div>

    <div v-loading="isLoading">
      <table class="table" cellspacing="0">
        <thead>
          <tr>
            <th
              v-for="title in tableTitle"
              :key="title.key"
              :width="title.width"
            >
              {{ title.label }}
            </th>
          </tr>
        </thead>
        <tbody class="body" id="officeTbody">
          <div v-show="list.length" id="officeTbodyContent">
            <tr v-for="item in list" :key="item.id">
              <td v-for="i in tableTitle" :key="i.key" :width="i.width">
                <template v-if="i.key === 'creatorName'">
                  <member-header
                    :user="{
                      name: item.creatorName,
                      headPic: item.creatorHeadPic,
                      id: item.creatorId,
                    }"
                  ></member-header>
                </template>
                <template v-else-if="i.key === 'bussinessType'">
                    {{ item.bussinessType_0_label }}/{{ item.bussinessType_1_label }}
                </template>
                <template v-else>{{ item[i.key] }}</template>
              </td>
            </tr>
          </div>
          <tr v-show="!list.length">
            <td colspan="7" style="text-align: center">暂无数据</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <div>合计支出</div>
        <div>{{ formatMoney(totalMoney) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Task, Brand, Project } from "../../API/api";
import { dateToYMD, thousandSplit } from "../../util/util";
import MemberHeader from "../../components/popup/MemberHeader";

export default {
  name: "fcOffice",
  components: { MemberHeader },
  data() {
    return {
      searchDate: "",
      searchParams: {
        fromtime: "",
        totime: "",
        customerId: null,
        projectId: null,
        page: 1,
      },
      projects: [{ name: "全部" }],
      brands: [{ customerName: "全部" }],
      categoryList: [
        //报销类别
        {
          id: "1",
          value: "办公费",
        },
        {
          id: "2",
          value: "快递费",
        },
        {
          id: "3",
          value: "业务招待费",
        },
        {
          id: "4",
          value: "市内交通费",
        },
        {
          id: "5",
          value: "低值易耗品",
        },
        {
          id: "6",
          value: "服务费",
        },
        {
          id: "7",
          value: "差旅费",
        },
        {
          id: "8",
          value: "咨询费",
        },
        {
          id: "9",
          value: "员工福利",
        },
        {
          id: "10",
          value: "教育经费",
        },
        {
          id: "11",
          value: "会务费",
        },
        {
          id: "12",
          value: "培训费",
        },
        {
          id: "13",
          value: "固定资产",
        },
        {
          id: "14",
          value: "加班餐补",
        },
        {
          id: "15",
          value: "其他",
        },
      ],
      tableTitle: [
        {
          key: "customerName",
          label: "品牌",
          width: 150
        },
        {
          key: "projectName",
          label: "项目",
        },
        {
          key: "teamName",
          label: "事业部",
        },
        {
          key: "taskName",
          label: "合同名称",
        },
        {
          key: "contactsCode",
          label: "合同ID",
        },
        {
          key: "bussinessType",
          label: "业务类型",
        },
        {
          key: "creatorName",
          label: "申请人",
        },
      ],
      list: [],
      totalMoney: "",
      dom: null,
      domContent: null,
      canLoad: true,
      isLoading: true,
    };
  },
  methods: {
    formatMoney(money) {
      /* 先转数字固定小数，再转字符加千分位分隔符 */
      const m = parseFloat(money);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    },
    changeDate(date) {
      this.searchParams.fromtime =
        date && date.length ? dateToYMD(date[0]) : "";
      this.searchParams.totime = date && date.length ? dateToYMD(date[1]) : "";
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
    async getProjectList() {
      this.searchParams.projectId = "";

      const res = await this.$http.post(
        Project.list,
        this.qs.stringify({
          page: 1,
          pageSize: 1000,
          customerId: this.searchParams.customerId,
          powerType: 1,
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      );
      const projects = res.data.retData.data;

      if (Array.isArray(projects))
        this.projects = [{ name: "全部" }, ...projects];
    },
    async getOfficeList(isExport) {
      this.isLoading = true;
      // this.list = [];

      const params = {
        ...this.searchParams,
        isExport,
        pageSize: isExport === 1 ? 999999 : 50,
      };
      const res = await this.$http.post(
        Task.cwfcbangongyunyingzhichu,
        this.qs.stringify(params),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );

      if (isExport === 0) {
        res.data.retData.outputData.showList.length < 50 && (this.canLoad = false);
        this.list = [...this.list, ...res.data.retData.outputData.showList];
        this.totalMoney = res.data.retData.outputData.xiaoji.price;
        
      } else {
        window.open(res.data.retData.download_url)
      }

      this.isLoading = false;
    },
    searchList(isExport) {
      this.searchParams.page = 1;
      this.canLoad = true;
      this.list = [];
      this.totalMoney = '';
      this.getOfficeList(isExport);
    },
    scrollHandler() {
      if (
        this.dom.scrollTop + this.dom.offsetHeight >=
        this.domContent.offsetHeight && this.canLoad
      ) {
        this.searchParams.page++;
        this.getOfficeList(0);
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    },
  },
  created() {
    this.getBranList();
    this.getOfficeList(0);
  },
  mounted() {
    this.dom = document.getElementById("officeTbody");
    this.domContent = document.getElementById("officeTbodyContent");
    this.loadMore();
  },
};
</script>
<style lang="less">
.fc-office {
  overflow: hidden;
  .form {
    display: flex;
    align-items: center;
    .item {
      margin-left: 10px;
    }
    .el-date-editor {
      .el-range-separator {
        width: unset;
      }
    }
  }

  .table {
    margin-top: 24px;
    width: 100%;
    border: 1px solid #ced4da;
    border-collapse: collapse;
    text-align: left;
    tbody {
      display: block;
      max-height: calc(100vh - 300px);
      overflow-y: auto;
    }
    tbody,
    thead {
      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
    }
    th {
      border-right: 1px solid #ced4da;
      background: #f8f9fa;
      font-size: 14px;
      color: #868e96;
      padding: 6px 20px;
      &:last-child {
        border: none;
      }
    }

    td {
      border: 1px solid #ced4da;
      border-bottom-width: 0;
      font-size: 14px;
      color: #495057;
      padding: 14px 20px;
      word-break: break-all;
      vertical-align: middle;
      &:first-child {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }
  }

  .total {
    border: 1px solid #ced4da;
    display: flex;
    background: #f8f9fa;
    font-size: 14px;
    div {
      height: 48px;
      line-height: 48px;

      &:first-child {
          width: 150px;
        text-align: center;
        color: #2d8ef8;
      }
      &:last-child {
          flex: 1;
        width: 200px;
        border-left: 1px solid #ced4da;
        padding-left: 20px;
        background-color: #fff;
      }
    }
  }
}
</style>