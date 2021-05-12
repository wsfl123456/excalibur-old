<template>
  <div class="window_print-content-payment">
    <div class="window_print-content-payment-logo">
      <img
        src="https://excalibur.gaiyadata.com/uploads/file/20200430/158821266322885185.png"
        alt
        width="300"
      />
    </div>

    <div class="window_print-content-payment-contract">
      <div>
        <div>
          <div>合同名称</div>
          <div>{{ printData.taskName }}</div>
        </div>
        <div>
          <div>合同ID</div>
          <div>{{ printData.contactsCode }}</div>
        </div>
      </div>
      <div>
        <div>
          <div>项目名称</div>
          <div>{{ printData.projectName }}</div>
        </div>
        <div>
          <div>客户名称</div>
          <div>{{ printData.customerName }}</div>
        </div>
      </div>
      <div>
        <div>
          <div>合同类型</div>
          <div>{{ printData.contractType }}</div>
        </div>
        <div>
          <div>合同期限</div>
          <div>{{ printData.contractDeadline }}</div>
        </div>
      </div>
      <div>
        <div>
          <div>合同金额</div>
          <div>{{ twoFixed(printData.hetongPriceTotal) }}</div>
        </div>
        <div>
          <div>是否代付</div>
          <div>{{ printData.insteadPay }}</div>
        </div>
      </div>
      <div>
        <div>
          <div>付款方式</div>
          <div>{{ printData.payType }}</div>
        </div>
        <div>
          <div>备注</div>
          <div>{{ printData.payTypeRemark }}</div>
        </div>
      </div>
    </div>

    <div class="window_print-content-payment-company">
      <div>
        <div>甲方名称</div>
        <div>{{ printData.partyA_Name }}</div>
        <div>账户名称</div>
        <div>{{ printData.partyA_accountName }}</div>
        <div>税号</div>
        <div>{{ printData.partyA_accountTaxNum }}</div>
        <div>开户行</div>
        <div>{{ printData.partyA_openBank }}</div>
        <div>开户账号</div>
        <div>{{ printData.partyA_openAccount }}</div>
      </div>
      <div>
        <div>乙方名称</div>
        <div>{{ printData.partyB_Name }}</div>
        <div>账户名称</div>
        <div>{{ printData.partyB_accountName }}</div>
        <div>税号</div>
        <div>{{ printData.partyB_accountTaxNum }}</div>
        <div>开户行</div>
        <div>{{ printData.partyB_openBank }}</div>
        <div>开户账号</div>
        <div>{{ printData.partyB_openAccount }}</div>
      </div>
    </div>

    <div class="window_print-content-payment-money">
      <div v-for="(item, index) in printData.moneyBody" :key="index" class="window_print-content-payment-money-list">
         <div class="window_print-content-payment-money-list-second">
          <!-- <div>收款名称</div>
          <div>{{ item.fk_partyB_Name }}</div> -->
          <div>账户名称</div>
          <div>{{ item.fk_partyB_accountName }}</div>
          <div>税号</div>
          <div>{{ item.fk_partyB_taxNumber }}</div>
          <div>开户行</div>
          <div>{{ item.fk_partyB_openBank }}</div>
          <div>开户账号</div>
          <div>{{ item.fk_partyB_openAccount }}</div>
        </div>
        <div class="window_print-content-payment-money-list-first">
          <div>付款金额</div>
          <div>{{ twoFixed(item.priceTotal) }}</div>
          <div>期望时间</div>
          <div>{{ typeof(item.endTime) === 'string' ? item.endTime.slice(0, 10) : item.endTime }}</div>
          <div>付款事由</div>
          <div>{{ item.pmReason }}</div>
          <div>发票号</div>
          <div>{{ item.invoiceNo }}</div>
          <div>付款状态</div>
          <div>{{ item.fuStateName }}</div>
          <div>申请时间</div>
          <div>{{ typeof(item.createTime) === 'string' ? item.createTime.slice(0, 10) : item.createTime }}</div>
        </div>
      </div>
      <div class="rest">
        <div>剩余待付金额</div>
        <div>{{ twoFixed(printData.priceNeedFu) }}</div>
      </div>
      <div class="rest" v-for="(item,index) in printData.proccessBody" :key="index">
        <div>{{ item.userTitle }}</div>
        <div>{{ item.userName }}</div>
        <div v-if="item.userTitle !== '申请人'">审核状态</div>
        <div v-if="item.userTitle !== '申请人'">{{ item.statusName }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Task } from "../../API/api.js";
import { thousandSplit } from "../../util/util";

export default {
  data() {
    return {
      printData: {}
    };
  },
  methods: {
    twoFixed(v) {
      let m = parseFloat(v);
      return isNaN(m) ? "" : thousandSplit(m.toFixed(2) + "");
    }
  },
  created() {
    this.$http
      .post(
        Task.exporthetongfukuanlist,
        this.qs.stringify({
          hetongId: this.$route.query.hetongId
        }),
        { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
      )
      .then(res => {
        if (res.data.retCode === 0) {
          this.printData = res.data.retData.printData;
        }
      });
  }
};
</script>
