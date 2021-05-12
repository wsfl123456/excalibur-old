<template>
  <div class="dri-brief__detail">
    <div>
      <div class="crumb__list">
        <Crumb :crumb="crumb" />
      </div>

      <div class="filter">
        <div
          v-for="(i, k) in new Array(12)"
          :key="k"
          :class="{ 'filter--active': k + 1 === +activeFilter }"
        >
          <div @click="activeFilter = k + 1">
            <div>{{ k > 8 ? k + 1 : `0${k + 1}` }}</div>
          </div>
        </div>
      </div>

      <div class="info">
        <BriefCommon :activeFilter="activeFilter" />
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { Dri } from "@/API/api";
import Crumb from "@/components/Crumb";
import BriefCommon from "./BriefCommon";

export default {
  name: "brief-detail",
  components: { Crumb, BriefCommon },
  data() {
    return {
      crumb: [
        {
          label: "成长计划",
          pathName: "nccBookMap",
        },
        {
          label: "DRI",
          pathName: "driIndex",
        },
        {
          label: "硬核少年航海录",
          pathName: "",
        },
      ],
      briefInfo: {},
      activeFilter: null,
    };
  },
  methods: {
    getDriList() {
      this.$http
        .post(
          Dri.dribriefdetail,
          this.qs.stringify({ briefId: this.$route.params.briefId }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          this.briefInfo = res.data.retData.briefInfo;
          // this.crumb.push(this.briefInfo.title);
        });
    },
  },
  created() {
    document.documentElement
      ? (document.documentElement.scrollTop = 0)
      : (document.body.scrollTop = 0);

    this.activeFilter = +this.$route.params.briefId;
    this.getDriList();
  },
};
</script>

<style scoped lang="">
</style>
