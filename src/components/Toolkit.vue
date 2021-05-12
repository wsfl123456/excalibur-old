<!--工具包组件-->
<template>
  <div class="list-tab">
    <Tabs :animated="false" type="card" :value="currToolkit | toString" @input="changeToolkitPackages">
      <TabPane v-for="toolkit in toolkitPackages " :label="toolkit.name"  :name="toolkit.productId + ''">
        <ul class="f-clearfix">
          <li v-for="(task, index) in toolkit.toolkit" :key="index" v-show="![17, 19, 20].includes(task.toolkitId)">
            <span :class="{active: _toolkitID == task.toolkitId}" @click="selectToolkit(task.toolkitId)">{{task.toolkitName}}</span>
            <Tooltip transfer :content="'新建 ' + task.toolkitName + ' 任务'" placement="bottom" :disabled="addIconDisabled">
              <Icon v-if="addIconDisabled || fnInfo.indexOf(task.toolkitId) < 0" type="plus-circled" size="24" color="#adb5bd"></Icon>
              <Icon v-else type="plus-circled" size="24" @click="goToCreateTask(task.toolkitName, toolkit.productId, task.toolkitId)"></Icon>
            </Tooltip>
          </li>
        </ul>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from "vuex";

  export default {
    filters: {
      toString(s) {
        return String(s);
      }
    },
    name: 'toolkit',
    props: {
      addIconDisabled: {
        default: false,
        type: Boolean
      }
    },
    created() {
      this.updateToolkitPackages();
    },
    data () {
      return {
        toolkitPackages: [
          {
            name: "IMC策划工具包",
            productId: 9,
            toolkit: undefined
          },
          {
            name: "IP代理工具包",
            productId: 3,
            toolkit: undefined
          },
          {
            name: "创意工具包",
            productId: 1,
            toolkit: undefined
          },
          {
            name: "技术工具包",
            productId: 2,
            toolkit: undefined
          },
          {
            name: "媒介代理工具包",
            productId: 4,
            toolkit: undefined
          },
          {
            name: "数据工具包",
            productId: 5,
            toolkit: undefined
          },
          {
            name: "周边工具包",
            productId: 6,
            toolkit: undefined
          },
          {
            name: "财务工具包",
            productId: 7,
            toolkit: undefined
          },
          {
            name: "行政工具包",
            productId: 8,
            toolkit: undefined
          },
          {
            name: "结案工具包",
            productId: 10,
            toolkit: undefined
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        currToolkit: "getCurrentToolkitPackageId"
      }),
      selectedCustomer () {
        return this.$store.state.tasks.currCustomer
      },
      selectedProject () {
        return this.$store.state.tasks.currProject
      },
      _toolkitID () {
        return this.$store.state.taskFilter.toolkitId
      },
      toolkit () {
        return (!this.$store.state.taskToolkit || this.$store.state.taskToolkit.length === 0) ? JSON.parse(localStorage.getItem('toolkit')) || [] : this.$store.state.taskToolkit
      },
      fnInfo () {
        return this.$store.state.taskFunctionInfo
      },
      listParams () {
        return this.$store.state.taskFilter
      }
    },
    watch: {
      toolkit: {
        handler() {
          this.updateToolkitPackages();
        },
      }
    },
    methods: {
      ...mapMutations(['changeCurrentToolkitPackageId']),
      changeToolkitPackages(toolkitId) {
        
        this.changeCurrentToolkitPackageId(toolkitId);
        /* 修改选择工具包的同时，刷新相应工具包下的数据 */
        let data = JSON.parse(JSON.stringify(this.listParams));
        data.state = 0
        data.flowState = 0
        data.functionType = 0
        data.is_urgent = ''
        data.productId = toolkitId;
        data.page = 1;
        this.$store.dispatch('setTaskList', {data});
      },
      /* 匹配工具包权限 */
      updateToolkitPackages() {
        // console.log(this.toolkit)
        this.toolkitPackages.forEach(toolkit => {
          if (Array.isArray(this.toolkit)) {
            let matchedTookit = this.toolkit.find(item => {
              if (item.productId === toolkit.productId) {
                toolkit.toolkit = item.toolkit;
                return true;
              }
            });

            if (!matchedTookit) toolkit.toolkit = undefined;
          }
        });
      },
      goToCreateTask(name, productId, toolkitId) {
        localStorage.setItem('toolkitName', name);      // 设置 storage 缓存

        this.$router.push({
          name: 'tasks-addTask',
          params: {
            customerId: this.selectedCustomer,
            projectId: this.selectedProject,
            productId,
            toolkitId
          }
        });
      },
      selectToolkit: function (id) {
        let data = JSON.parse(JSON.stringify(this.listParams))
        data.toolkitId = data.toolkitId === id ? 0 : id
        data.page = 1
        this.$store.dispatch('setTaskList', {data})
      }
    }
  }
</script>

<style lang="less">
  .ivu-tooltip-popper[x-placement^=bottom] {
    .ivu-tooltip-content {
      .ivu-tooltip-arrow {
        border-bottom-color: #5ea9fa;

      }
      .ivu-tooltip-inner {
        background-color: #5ea9fa;
        font-size: 12px;
      }
    }
  }

  .list-tab {
    margin-bottom: 16px;
    .ivu-tooltip {
      width: auto;
      margin-right: 34px;
    }
    .ivu-tabs {
      border-radius: 5px;

      .ivu-tabs-bar {
        margin-bottom: 0;
        .ivu-tabs-nav-container {
          height: auto;
          background-color: #f8f9fa;
        }
        .ivu-tabs-tab {
          margin-right: -1px;
          text-align: center;
          width: 108px;
          height: 49px;
          padding: 0;
          line-height: 49px;
          background-color: #f8f9fa;
          border: solid 1px #e9ecef;
          border-radius: 0;
          color: #343a40;
          font-size: 14px;
          &:first-child {
            border-top-left-radius: 5px;
          }
          &:nth-child(2){
            border-top-left-radius: 5px;
          }
          &-active {
            background-color: #dde8f6;
            border-bottom-color: #dde8f6;
          }
        }
      }
    }
    .ivu-tabs-tabpane {
      background-color: #dde8f6;
      padding: 7px;
      ul {
        li {
          float: left;
          color: #343a40;
          font-size: 14px;
          span {
            display: inline-block;
            cursor: pointer;
            font-family: Abel;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: normal;
            padding: 7px 16px;
            border-radius: 4px;
            &.active {
              color: #2d8ef8;
            }
            &:hover {
              background-color: rgba(255, 255, 255, .4);
            }
          }
          i {
            color: #2d8ef8;
            line-height: 1;
            vertical-align: text-bottom;
            &:hover {

            }
          }
        }
      }
    }
  }

</style>
