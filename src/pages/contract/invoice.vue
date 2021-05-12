<template>
  <div class="contract-page">
    <p class="export-line">
      <Button style="margin-right: 10px;" class="export-btn" type="primary" @click="showUploadDialog = true">
        <Icon class="export-icon" type="android-upload"></Icon>
        <span>上传发票</span>
      </Button>
    </p>
    <table class="invoice-table">
      <thead>
        <tr>
          <td v-if="invoiceMsg.receiptAll.length" :colspan="invoiceMsg.receiptAll.length">目前可开票金额及张数</td>
          <td>目前可开票总金额</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="(i, k) in invoiceMsg.receiptAll" :key="k">{{ i.price }}(<span class="red">{{ i.count }}</span>张)</td>
          <td><span class="red">{{ formatMoney(invoiceMsg.receiptAmount) }}</span>元</td>
        </tr>
      </tbody>
    </table>

    <invoice-table border :data="tableData" style="margin-top: 20px;"></invoice-table>

    <el-dialog class="invoice-upload-dialog"  :visible.sync="showUploadDialog">
      <p class="title" slot="title">上传发票</p>
      <el-upload
        class="avatar-uploader"
        action="/api/ueditor/index?action=uploadfile&encode=utf-8"
        :on-success="handleAvatarSuccess"
        :before-upload="handleAvatarUpload"
        :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <p class="notice">选择要导入的文件</p>
        <p class="file-tip">文件最大5MB,仅支持Excel文件</p>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script type="text/jsx">
  import "./index.less";
  import { Create } from 'vuejs2-datatable';
  import { Task } from "../../API/api";
  import { thousandSplit } from "../../util/util.js"

  const InvoiceTable = Create([
    {
      label: '发票号',
      prop: 'invoiceNo'
    },
    {
      label: '金额',
      prop: 'price',
      formatter(v){
        return this.formatMoney(v)
      }
    },
    {
      label: '上传时间',
      prop: 'createTime'
    },
    {
      label: '状态',
      prop: 'kaipiaoState',
      render(h, i, v, receipt) {
        const vm = this.$parent;

        return (
          <el-checkbox-group value={[v]} onInput={s => vm.changeInvoiceState(s, receipt.receiptId)}>
            <el-checkbox label={1}>可开票</el-checkbox>
            <el-checkbox label={2}>已开票</el-checkbox>
            <el-checkbox label={3}>已支付</el-checkbox>
          </el-checkbox-group>
        );
      }
    }
  ]);

  export default {
    name: "invoice",
    created() {
      this.getInvoiceOverview();
      this.queryTableData();
    },
    data() {
      return {
        showUploadDialog: false,
        invoiceMsg: {
          receiptAll: []
        },
        tableData: []
      };
    },
    methods: {
      formatMoney(v) {
        let m = parseFloat(v)
        return isNaN(m) ? '' : thousandSplit(Math.round(m * 100) / 100 + '');
      },
      async changeInvoiceState(s, id) {
        const res = await this.$http.post(Task.receiptfu, this.qs.stringify({kaipiaoState: s[1], receiptId: id}), {headers: { Authorization: "Bearer " + this.$cookie.get("token") }});

        if (res.data.retCode ===0) {
          this.$message.success('更新成功了O(∩_∩)O~~');
          this.getInvoiceOverview();
          this.queryTableData();
        }else {
          this.$message.error('更新失败了o(╯□╰)o');
        }
      },
      async handleAvatarSuccess(url) {
        try {
          const res = await this.$http.post(Task.receiptimport, this.qs.stringify({filePath: url}), {headers: { Authorization: "Bearer " + this.$cookie.get("token") }});

          if (res.data.retCode === 0) {
            this.showUploadDialog = false;
            this.$message.success('上传成功了O(∩_∩)O~~');
            this.getInvoiceOverview();
            this.queryTableData();
          }else {
            this.$message.error('上传失败了o(╯□╰)o');
          }
        } catch (e) {
          this.$message.error('上传失败了o(╯□╰)o');
        }
      },
      handleAvatarUpload(file) {
        const fileNams = file.name.split('.');
        const fileSuffix = fileNams[fileNams.length-1];
        const isExcel = fileSuffix === 'xls' || fileSuffix === 'xlsx';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isExcel || !isLt5M) this.$message.error('文件最大5MB,仅支持Excel文件');

        return isExcel && isLt5M;
      },
      getInvoiceOverview() {
        this.$http.post(Task.receiptoverview, {}, {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.invoiceMsg = _data.retData;
            }
          });
      },
      queryTableData() {
        this.$http.post(Task.receiptlist, {}, {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            const data = res.data.retData.receiptList;
            if (Array.isArray(data)) this.tableData = data;
          });
      }
    },
    components: {
      InvoiceTable
    }
  }
</script>
