<template>
  <div class="fc-log">
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
      <el-button
        type="primary"
        icon="el-icon-search"
        class="search"
        @click="getLogList(0)"
        >搜索</el-button
      >
      <el-button type="primary" icon="el-icon-download" @click="getLogList(1)"
        >导出</el-button
      >
    </div>

    <table class="table" cellspacing="0">
      <thead>
        <tr>
          <th v-for="title in tableTitle" :key="title.key" :width='title.width'>
            
            {{ title.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td v-for="i in tableTitle" :key="i.key" :width="i.width">
            <template v-if="i.key === 'creatorName'">
              <member-header :user='{ name: item.creatorName, headPic: item.creatorHeadPic, id: item.creatorId}'></member-header>
            </template>
            <template v-else>{{ item[i.key] }}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { Task } from "../../API/api";
import { dateToYMD } from "../../util/util";
import MemberHeader from '../../components/popup/MemberHeader'

export default {
  name: "fcLog",
  components: { MemberHeader },
  data() {
    return {
      searchDate: "",
      searchParams: {
        fromtime: "",
        totime: "",
        page: 1,
        pageSize: 99999,
      },
      tableTitle: [
        {
          key: "createTime",
          label: "时间",
          width: 200
        },
        {
          key: "creatorName",
          label: "操作人",
          width: 100
        },
        {
          key: "opertWord",
          label: "操作",
        },
        {
          key: "remark",
          label: "备注",
        },
      ],
      list: [],
    };
  },
  methods: {
    changeDate(date) {
      this.searchParams.fromtime =
        date && date.length ? dateToYMD(date[0]) : "";
      this.searchParams.totime = date && date.length ? dateToYMD(date[1]) : "";
    },
    async getLogList(isExport) {
      const params = {
        ...this.searchParams,
        isExport,
      };
      const res = await this.$http.post(
        Task.cwfclog,
        this.qs.stringify(params),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );

      if (isExport === 0) this.list = res.data.retData.cwfclogArr;
      else window.open(res.data.retData.download_url);
    },
  },
  created() {
    this.getLogList(0);
  },
};
</script>
<style lang="less">
.fc-log {
  overflow: hidden;
  .form {
    display: flex;
    align-items: center;
    .search {
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
    th {
      border: 1px solid #ced4da;
      background: #f8f9fa;
      font-size: 14px;
      color: #868e96;
      padding: 6px 20px;
    }

    td {
      border: 1px solid #ced4da;
      font-size: 14px;
      color: #495057;
      padding: 14px 20px;
    }
  }
}
</style>