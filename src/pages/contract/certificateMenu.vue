<template>
  <div class="contract-menu-box">
    <div class="menu-row">
      <div class="prefix-item top-border">凭证类型</div>
      <RadioGroup type="button" v-model="curTaskStatus" @on-change="v => emitQuery('certificate', v)">
        <Radio
          v-for="(item, index) in taskStatus"
          :key="index"
          :label="item.id"
        >{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="menu-row">
      <div class="prefix-item">付款状态</div>
      <RadioGroup class="no-top-border" style="" type="button" v-model="curContractStatus" @on-change="v => emitQuery('status', v)">
        <Radio
          v-for="(item, index) in myContract"
          :key="index"
          :label="item.id"
        >{{item.name}}</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
  import "./index.less";

  export default {
    name: "certificate-menu",
    data() {
      return {
        curTaskStatus: 0,
        curContractStatus: 0,
        curProcessStatus: 0,
        taskStatus: [
          { name: "全部", id: 0 },
          { name: "客户发票", id: 1 },
          { name: "供应商发票", id: 2 },
          // { name: "报销", id: 3 }
        ],
        myContract: [
          { name: "全部", id: 0 },
          { name: "待付", id: 1 },
          { name: "已付", id: 2 }
        ]
      };
    },
    methods: {
      emitQuery(type, id) {
        this.$emit('query-contract', type, id);
      }
    }
  }
</script>
