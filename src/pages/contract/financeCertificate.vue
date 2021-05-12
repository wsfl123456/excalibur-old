<template>
  <div class="contract-page">
    <p class="export-line">
      <Button style="margin-right: 10px;" class="export-btn" type="primary" @click="goToUpload">
        <Icon class="export-icon" type="android-upload"></Icon>
        <span>上传财务凭证</span>
      </Button>
    </p>
    <certificate-menu @query-contract="queryContractData"></certificate-menu>
    <certificate-table :loading="loading" :data="tableData" :invoicefurole="invoicefurole" @refresh="queryContractData"></certificate-table>
  </div>
</template>

<script>
  import CertificateMenu from "./certificateMenu";
  import CertificateTable from "./certificateTable";
  import { Task, Hr } from "../../API/api";
  import "./index.less";

  export default {
    name: "finance-certificate",
    created() {
      this.queryContractData();
      this.getRole()
    },
    data() {
      return {
        loading: false,
        currentTab: "file",
        tableData: [],
        invoicefurole: false,
        params: {
          pinzhengType: 0,
          fuState: 0,
          powerType: 1,
          pageSize: 10000
        }
      };
    },
    methods: {
      queryContractData(type, id) {
        /* 有状态情况下查询 */
        if (type === 'certificate') {
          this.params.pinzhengType = id;
        }else if (type === 'status') {
          this.params.fuState = id;
        }

        this.$http.post(Task.getInvoice, this.qs.stringify(this.params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.tableData = _data.retData.invoiceList;
            }
          });
      },
      goToUpload() {
        this.$router.push({name: "addFinanceCertificate"});
      },
      getRole() {
        this.$http.post(Hr.role, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.invoicefurole = _data.retData.invoicefurole;
            }
          });
      }
    },
    components: {
      CertificateMenu,
      CertificateTable
    }
  }
</script>

