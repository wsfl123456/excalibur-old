<template>
  <div class="vaca-audit">
    <div class="list-box" :class="{openDetail: taskDetailStatus}">
      <div class="list-box-list">
        <div class="export">
          <DatePicker
            :value="month"
            @on-change="monthChange"
            :clearable="false"
            type="month"
            placeholder="请选择月份"
          ></DatePicker>
          <Button class="export-btn" @click="exportVaca" type="primary">导出</Button>
        </div>
        <vacation-filter @on-change="changeFilter"></vacation-filter>
        <div class="list-box" id="asd">
          <loading v-if="isLoading"></loading>
          <vacation-list :data="data" @on-reload="getList"></vacation-list>
        </div>
      </div>
    </div>
    <toast :is-toast="isToast" msg="没有更多"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import VacationFilter from "../../components/VacationFilter";
import VacationList from "../../components/VacationList";
import SubHeader from "../../components/SubHeader";
import { Task } from "../../API/api.js";

const date = new Date();
const datetime =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));

export default {
  components: {
    SubHeader,
    VacationList,
    VacationFilter,
    Toast,
    Loading,
    BCrumb
  },
  name: "audit",
  data() {
    return {
      crumb: [
        {
          label: "日程计划"
        },
        {
          label: "我的日程"
        },
        {
          label: "日程审批"
        }
      ],
      isLoading: false,
      isToast: false,
      canLoadMore: true,
      dom: null,
      chDom: null,
      page: 1,
      page_size: 25,
      orderBy: "createTime",
      asc: "desc",
      month: datetime
    };
  },
  computed: {
    taskDetailStatus() {
      return this.$store.state.vacation.detailStatus;
    },
    data() {
      return this.$store.state.vacation.list;
    },
    listParams() {
      return this.$store.state.vacation.filter;
    }
  },
  methods: {
    monthChange(e) {
      this.month = e;
    },
    exportVaca() {
      const routeData = this.$router.resolve({
        name: "WindowPrint",
        query: {
          type: "vaca",
          fromtime: this.month,
          totime: this.month
        }
      });
      window.open(routeData.href, "_blank");
      // this.$router.push({
      //   name: 'WindowPrint',
      //   query: {
      //     type: 'vaca',
      //     fromtime: this.month,
      //     totime: this.month
      //   }
      // })
    },
    changeFilter(v) {
      this.isLoading = v;
    },
    getList(obj, cb) {
      this.isLoading = true;
      let _cb = (data, code) => {
        this.isLoading = false;
        // if (data.retCod)
        if (code === 100014) {
          this.$cookie.delete("token");

          this.$router.push("/");
          return;
        }
        if (!data) {
          this.isToast = true;
          this.page--;
          setTimeout(() => {
            this.isToast = false;
          }, 2000);
        }
      };
      if (cb) {
        _cb = cb;
      }
      let data = JSON.parse(JSON.stringify(this.listParams));
      let _data = obj ? this._.merge(data, obj) : data;

      this.$store.dispatch("setVacationList", { data: _data, cb: _cb });
    },
    scrollHandler() {
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading &&
        !this.taskDetailStatus
      ) {
        this.page++;
        this.getList({ page: this.page }, (data, code) => {
          this.isLoading = false;
          if (code === 100014) {
            this.$cookie.delete("token");

            this.$router.push("/");
            return;
          }
          if (!data || data.length === 0) {
            this.isToast = true;
            this.page--;
            setTimeout(() => {
              this.isToast = false;
            }, 2000);
          }
        });
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    }
  },
  created() {
    this.canLoadMore = true;
    const initList = {
      state: 0,
      applyType: 0,
      page: 1,
      pageSize: 25,
      orderBy: "createTime",
      asc: "desc"
    };
    this.getList(initList);

    sessionStorage.setItem("subMenu", "vacation/audit");
    this.$store.dispatch("setCurrSubMenu", "vacation/audit");
    this.$store.dispatch("setOpenedSub", ["vacation"]);
    sessionStorage.setItem("openedSub", '["vacation"]');
  },
  beforeDestroy() {
    this.canLoadMore = false;
    this.unbindLoadMore();
    // this.$store.dispatch('changeTaskDetailStatus', false)
  },
  mounted() {
    this.dom = document.getElementById("main-pages");
    this.chDom = document.getElementById("main-content");
    this.loadMore();
  }
};
</script>

<style scoped lang="less">
.list-box {
  position: relative;
}
.export {
  margin-bottom: 15px;
  text-align: right;
  .export-btn {
    margin-left: 20px;
  }
}
</style>
<style lang="less">
.vaca-audit {
  .ivu-input-icon {
    line-height: 32px;
  }
}
</style>

