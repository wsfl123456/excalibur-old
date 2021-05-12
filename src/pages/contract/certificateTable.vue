<template>
  <div class="contract-table-wrapper">
    <table class="content-table">
      <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">
          <span>{{ column.label }}</span>
          <i class="iconfont" :class="['icon-sort_down']"></i>
        </th>
      </tr>
      </thead>
      <tbody>
        <template v-if="tableData && tableData.length">
          <template v-for="(item, index) in tableData">
            <tr :key="index" @click="toggleSubPanel(index)">
              <td v-for="(column, key) in columns" :key="key"  @click="getContractInfo(item.hetongId, item.baojiadanId, item.fukuanId)">
                {{ item[column.prop] }}
              </td>
            </tr>
            <tr :key="`panel-${index}`" v-if="index === openingPanel" ref="panelContent">
              <td :colspan="columns.length">
                <div class="panel-wrapper">
                  <div class="panel-content">
                    <div class="client-contract-wrapper">
                      <table>
                        <colgroup>
                          <col style="width: 120px;" />
                        </colgroup>
                        <tr>
                            <td class="intro">
                              <span class="pink">*</span>
                              <span>凭证类型</span>
                            </td>
                            <td colspan="3">
                              <RadioGroup :value="item.pinzhengType" class="certificate-radio-group">
                                <Radio :label="1" disabled>客户发票</Radio>
                                <Radio :label="2" disabled>供应商发票</Radio>
                              </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>凭证名称</span>
                          </td>
                          <td colspan="3">{{ item.invoiceTitle }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span>凭证ID</span>
                          </td>
                          <td colspan="3">{{ item.invoiceId }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>关联合同</span>
                          </td>
                          <td colspan="3">{{ item.hetongTaskName }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink"></span>
                            <span>关联付款</span>
                          </td>
                          <td colspan="3" :title="fukuanNames.join(', ')">
                            {{ fukuanNames.join(', ') }}
                          </td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>关联项目结算单</span>
                          </td>
                          <td colspan="3">
                            {{ quotationNames.join(', ') }}
                          </td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>品牌信息</span>
                          </td>
                          <td colspan="3">{{ contractInfo.customerName }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>项目信息</span>
                          </td>
                          <td colspan="3">{{ contractInfo.projectName }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>发票号</span>
                          </td>
                          <td colspan="3">{{ item.invoiceNo }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>金额</span>
                          </td>
                          <td colspan="3">{{ formatMoney(item.price) }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>开票日期</span>
                          </td>
                          <td colspan="3"> {{ item.kaipiaoDate }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>账期</span>
                          </td>
                          <td colspan="3">{{ item.zhangqi }} 天</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>文件名</span>
                          </td>
                          <td colspan="3">{{ item.fileName }}</td>
                        </tr>
                        <tr>
                          <td class="intro">
                            <span class="pink">*</span>
                            <span>公盘地址</span>
                          </td>
                          <td colspan="3">{{ item.fileAddress }}</td>
                        </tr>
                        <tr>
                        <tr>
                          <td class="intro">
                            <span>发票详情</span>
                          </td>
                          <td colspan="3" class="action">
                            <button>
                              <span class="bill"></span>
                              <a class="font" :href="item.filePath" target="_blank">查看发票</a>
                            </button>
                          </td>
                        </tr>
                      </table>

                      <div class="contract-btn-wrapper">
                        <router-link v-if="item.creatorId === userId" :to="{name: 'editFinanceCertificate', params: {id: item.invoiceId}}" class="export-quotation-btn">编辑凭证信息</router-link>
                        <Button
                          v-if="item.fuState === 1 && invoicefurole && item.pinzhengType == 1"
                          class="submit-btn form-default-btn"
                          @click="() => audit(item.invoiceId)"
                        >确认已收款</Button>
                        <Button
                          v-if="item.fuState === 1 && item.creatorId === userId"
                          class="submit-btn form-default-btn"
                          @click="invoicedelete(item.invoiceId)"
                        >作废凭证</Button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length" class="no-certificate">暂无凭证</td>
          </tr>
        </template>
       
      </tbody>
    </table>

    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
  import Toast from "../../components/popup/Toast";
  import { dateToYMD, thousandSplit } from '../../util/util';
  import { Task } from "../../API/api";
  import "./index.less";

  function formatStatus(status) {
    let name = '';
    switch (status) {
      case 1:
        name = '待付';
        break;
      case 2:
        name = '已付';
        break;
    }

    return name;
  }

  function formatCertificateType(n) {
    let name = '';
    switch (n) {
      case 1:
        name = '客户发票';
        break;
      case 2:
        name = '供应商发票';
        break;
    }

    return name;
  }

  export default {
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        required: true
      },
      invoicefurole: {
        type: Boolean
      }
    },
    data() {
      return {
        currentTab: "file",
        contractInfo: {},
        radio: true,
        toastState: '',
        quotationNames: [],
        fukuanNames: [],
        isToast: false,
        toastMsg: '',
        openingPanel: -1,                 // 默认不打开子表格面板
        columns: [
          {
            label: "凭证ID",
            prop: "invoiceId"
          },
          {
            label: "凭证名称",
            prop: "invoiceTitle"
          },
          {
            label: "凭证类型",
            prop: "certificateTypeName"
          },
          {
            label: "关联合同",
            prop: "hetongTaskName"
          },
          {
            label: "状态",
            prop: "fuStateName"
          },
          {
            label: "上传时间",
            prop: "createTime"
          },
          {
            label: "开票时间",
            prop: "kaipiaoDate"
          },
          {
            label: "截止时间",
            prop: "yujiFuDate"
          },
          {
            label: "创建者",
            prop: "creatorName"
          }
        ]
      };
    },
    computed: {
      /* 数据格式化 */
      tableData() {
        this.data.forEach(i => {
          i.fuStateName = formatStatus(i.fuState);
          i.certificateTypeName = formatCertificateType(i.pinzhengType);
          i.createTime = i.createTime.split(' ')[0];
          i.kaipiaoDate = dateToYMD(i.kaipiaoDate);

          const date = new Date(i.createTime);
          i.endtime = dateToYMD(date.setDate(date.getDate() + +i.zhangqi));
        });

        return this.data;
      },
      userId() {
        return JSON.parse(localStorage.getItem('userInfo')).id
      }
    },
    methods: {
      formatMoney(v) {
        let m = parseFloat(v)
        return isNaN(m) ? '' : thousandSplit(Math.round(m * 100) / 100 + '');
      },
      invoicedelete(invoiceId) {
        const params = {
          invoiceId
        }
        this.$http
          .post(Task.invoicedelete, this.qs.stringify(params), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            let _data = res.data;
            if (_data.retCode !== 0) {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            } else if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            } else {
              this.isToast = true;
              this.toastMsg = "作废成功";
              this.openingPanel = -1;
              this.$emit("refresh");
            }
            setTimeout(() => {
              this.isToast = false;
            }, 1500);
          });
      },
      audit(invoiceId) {
        this.$http
          .post(Task.auditCertificate, this.qs.stringify({
            invoiceId,
            fuState: 2
          }), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            let _data = res.data;
            if (_data.retCode !== 0) {
              this.isToast = true;
              this.toastMsg = _data.retMsg;
            } else if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            } else {
              this.isToast = true;
              this.toastMsg = "提交成功";
              this.$emit("refresh");
            }
            setTimeout(() => {
              this.isToast = false;
            }, 1500);
          });
      },
      toggleSubPanel(index) {
        this.openingPanel = this.openingPanel !== index ? index : -1;
      },
      getContractInfo(taskId, quotationIds, fukuanId) {
        this.$http.post(Task.detail, this.qs.stringify({taskId}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
          .then(res => {
            let _data = res.data;

            if (_data.retCode === 0) {
              this.contractInfo = _data.retData.projectInfo;
            }
          });

        this.$http
          .post(Task.contactbaojiadanlist, this.qs.stringify({ hetongId: taskId }), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const quotationList = res.data.retData.data;
            const ids = JSON.parse(quotationIds);

            this.quotationNames = [];
            if (Array.isArray(ids)) {
              ids.forEach(id => {
                const quotation = quotationList.find(i => i.baojiadanId == id);
                if (quotation) this.quotationNames.push(quotation.taskName);
              });
            }
          });
        this.$http
          .post(Task.getContactPayFile, this.qs.stringify({ hetongId: taskId, flowState: 0 }), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            const fukuanList = res.data.retData.data;
            const ids = JSON.parse(fukuanId);

            this.fukuanNames = [];
            if (Array.isArray(ids)) {
              ids.forEach(id => {
                const fukuan = fukuanList.find(i => i.kfId == id);
                if (fukuan) this.fukuanNames.push(`${fukuan.pmReason} - ${fukuan.priceTotal}`);
              });
            }
          });
      }
    },
    components: {
      Toast
    }
  }
</script>
