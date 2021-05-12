<!--筛选组建-->
<template>
  <div class="list-filter">
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultTaskStatus" @on-change="taskStateFilter">
        <Radio
          v-for="(item, index) in taskStatus"
          :key="index"
          :label="item.id"
          :disabled="index===0"
        >{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultMyContract" @on-change="myContractFilter">
        <Radio
          v-for="(item, index) in myContract"
          :key="index"
          :label="item.id"
          :disabled="index===0"
        >{{item.name}}</Radio>
      </RadioGroup>
    </div>
    <div class="filter-box">
      <RadioGroup type="button" :value="defaultMyContract" @on-change="myContractFilter">
        <Radio
          v-for="(item, index) in processStatus"
          :key="index"
          :label="item.id"
          :disabled="index===0"
        >{{item.name}}</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-filter",
  data() {
    return {
      taskStatus: [
        { name: "任务状态" },
        { name: "全部", id: 0 },
        { name: "待审核", id: 1 },
        { name: "审核不通过", id: 2 },
        // {name: '待启动', id: 3},
        { name: "执行中", id: 4 },
        { name: "待质检", id: 5 },
        { name: "质检通过", id: 6 },
        { name: "质检不通过", id: 7 },
        { name: "PM审核通过", id: 8 },
        { name: "PM审核不通过", id: 9 }
      ],
      myContract: [
        { name: "我的合同" },
        { name: "全部", id: 0 },
        { name: "我创建的", id: 1 },
        { name: "我审核的", id: 2 },
        { name: "我负责的", id: 3 },
        { name: "我质检的", id: 4 }
      ],
      processStatus: [
        { name: "流程状态" },
        { name: "全部", id: 0 },
        { name: "制作中", id: 1 },
        { name: "制作完成", id: 2 },
        { name: "盖章中", id: 3 },
        { name: "已盖章", id: 4 },
        { name: "开票中", id: 5 },
        { name: "已开票", id: 6 },
        { name: "已付", id: 7 }
      ]
    };
  },
  computed: {
    defaultMyContract() {
      return this.$store.state.taskFilter.functionType;
    },
    defaultTaskStatus() {
      return this.$store.state.taskFilter.state;
    },
    defaultProcessStatus() {},
    listParams() {
        console.log(this.$store.state.taskFilter)
      return this.$store.state.taskFilter;
    }
  },
  methods: {
    taskStateFilter(id) {
      let data = JSON.parse(JSON.stringify(this.listParams));
      data.state = id;
      data.page = 1;
      this.$emit("on-change", true);
      let _cb = (data, code) => {
        this.isLoading = false;
        this.$emit("on-change", false);
        if (code === 100014) {
          this.$cookie.delete("token");

          this.$router.push("/");
        }
      };
      this.$store.dispatch("setTaskList", { data, cb: _cb });
    },
    myContractFilter(id) {
      let data = JSON.parse(JSON.stringify(this.listParams));
      data.page = 1;
      data.functionType = id;
      this.$emit("on-change", true);
      let _cb = (data, code) => {
        this.isLoading = false;
        this.$emit("on-change", false);
        if (code === 100014) {
          this.$cookie.delete("token");

          this.$router.push("/");
        }
      };
      this.$store.dispatch("setTaskList", { data, cb: _cb });
    },
    processStatusFilter(id) {
      let data = JSON.parse(JSON.stringify(this.listParams));
      data.page = 1;
      data.functionType = id;
      this.$emit("on-change", true);
      let _cb = (data, code) => {
        this.isLoading = false;
        this.$emit("on-change", false);
        if (code === 100014) {
          this.$cookie.delete("token");

          this.$router.push("/");
        }
      };
      this.$store.dispatch("setTaskList", { data, cb: _cb });
    }
  }
};
</script>

<style scoped lang="less">
.list-filter {
  margin-bottom: 16px;
}
.filter-box {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  padding-left: 108px;
  position: relative;
  margin-bottom: -1px;
  .ivu-radio-group {
    margin-bottom: -1px;
  }
  .ivu-radio-wrapper {
    font-size: 14px;
    color: #343a40;
    background-color: #f8f9fa;
    height: 40px;
    line-height: 40px;
    width: 108px;
    text-align: center;
    padding: 0;
    border: 0 none;
    border-right: 1px solid #e9ecef;
    transition: none;
    border-radius: 0;
    border-bottom: 1px solid #e9ecef;
    border-left: 1px solid #e9ecef;
    margin-left: -1px;
    &:hover:not(.ivu-radio-wrapper-checked):not(:first-child) {
      color: #2d8ef8;
      background-color: #fff;
    }
    &:first-child {
      position: absolute;
      left: 0;
      top: 0;
      border-right: 0 none;
    }
  }
  .ivu-radio-wrapper-disabled {
    background-color: #fff;
  }
  .ivu-radio-wrapper-checked {
    background-color: #107cd9;
    box-shadow: 0 0 0;
    border-color: #107cd9;
    color: #fff;
  }
}
</style>
