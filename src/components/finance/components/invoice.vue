<!--发票-->
<template>
  <div>
    <i-form label-position="left" :label-width="88" class="default-form client-contract">
      <div class="contract-form-group">
        <div v-for="(item, index) in formValue" :key="index">
          <Row class="border-bottom">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="选择发票" class="default-form-item" required>
                <Select v-model="item.invoice" placeholder="请选择发票">
                  <Option value="1">3131232141414</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款金额" class="default-form-item" required>
                <i-input v-model="item.payMoney" placeholder="请输入付款金额"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row class="border-bottom">
            <i-col span="12" class="default-form-member-col">
              <FormItem label="付款时间" class="default-form-item" required>
                <i-input v-model="item.time" placeholder="请输入付款时间"></i-input>
              </FormItem>
            </i-col>
            <i-col span="12" class="default-form-member-col">
              <FormItem label="待付金额" class="default-form-item" required>
                <i-input v-model="item.waitMoney" placeholder="请输入待付金额"></i-input>
              </FormItem>
            </i-col>
          </Row>
          <Row>
            <i-col span="24" class="default-form-member-col">
              <FormItem label="备注" class="default-form-item" required>
                <i-input v-model="item.remark" placeholder="请输入备注"></i-input>
              </FormItem>
            </i-col>
          </Row>
        </div>
        <div class="addInvoice">
          <div @click="addInvoice">
            <Icon type="plus-circled"></Icon>添加发票信息
          </div>
        </div>
      </div>
    </i-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValue: [
        {
          invoice: "1",
          payMoney: "",
          time: "",
          waitMoney: "",
          remark: ""
        }
      ]
    };
  },
   methods: {
    addInvoice() {
      this.formValue.push(
          {
          invoice: "1",
          payMoney: "",
          time: "",
          waitMoney: "",
          remark: ""
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.addInvoice {
  height: 40px;
  background-color: white;
  color: #2d8ef8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-bottom {
  border-bottom: 1px solid #ced4da;
}
</style>


