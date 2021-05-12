<template>
  <div class="dri-index">
    <!-- <img src="../../assets/images/dri/banner.png" alt="" /> -->
    <!-- tabs - start -->
    <!-- <div class="tabs">
      <div class="first">
        <div>
          <div
            v-for="(i, k) in firstTabsList"
            :class="{ 'first--active': i.value === 2 }"
            :key="k"
          >
            <span @click="$router.push({ path: i.url })">{{ i.name }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <!-- tabs - end -->

    <div class="wrapper">
      <div class="left">
        <div class="title">
          <h3>DRI列表</h3>
          <div>
            <div
              class="add-btn"
              v-if="teamScoreData.needDateType"
              @click="createTeamScore"
            >
              <i class="el-icon-circle-plus"></i>
              <span>添加各事业部评分</span>
            </div>
            <!-- <div class="btn assess" @click="createTeamScore">
            <i class="el-icon-circle-plus"></i>
            <span>添加各事业部评分</span>
          </div> -->
            <div
              class="add-btn"
              @click="$router.push({ name: 'driCreate' })"
            >
              <i class="el-icon-circle-plus"></i>
              <span>创建我的DRI</span>
            </div>
          </div>
        </div>
        <div class="filter">
          <div>
            <div class="label">事业部：</div>
            <div class="value">
              <div
                class="item"
                :class="{ 'item--active': searchParams.teamId === i.teamId }"
                v-for="(i, k) in teamList"
                :key="k"
                @click="changeTeam(i.teamId)"
              >
                {{ i.teamName }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">状&nbsp;&nbsp;&nbsp;态：</div>
            <div class="value">
              <div
                class="item"
                :class="{ 'item--active': activeStatus === i.id }"
                v-for="(i, k) in statusList"
                :key="k"
                @click="changeStatus(i.id)"
              >
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- filter - end -->

        <div class="wrap-content">
          <!-- list - start -->
          <div
            class="list"
            :class="{ 'list--no__result': !driList || !driList.length }"
          >
            <template v-if="!!driList && !!driList.length">
              <div
                v-for="(i, k) in driList"
                :key="k"
                @click="
                  $router.push({
                    path: `/new/dri/detail/${i.driUserId}`,
                  })
                "
              >
                <img v-if="i.creatorHeadPic" :src="i.creatorHeadPic" alt="" />
                <img v-else src="../../assets/images/dri/user.jpg" alt="" />
                <p>{{ i.creatorNameEn }}</p>
                <p>
                  审核人：<span>{{ i.auditorNameEn }}</span>
                </p>
              </div>
            </template>
            <template v-else>
              <img src="../../assets/images/dri/noResult.png" alt="" />
              <p>暂无DRI可查看，快去<a href="javascript:;" @click="$router.push({ name: 'driCreate' })">创建DRI</a>吧</p>
            </template>
          </div>
          <!-- list - end -->
        </div>
      </div>
      <div class="right">
        <div class="title">
          <h3>硬核少年航海录 </h3>
        </div>
        <div class="brief-list">
            <div class="area">
              <div
                class="item"
                v-for="(i, k) in briefList"
                :key="k"
                @click="$router.push({ path: `/new/dri/brief/${i.id}` })"
              >
                <div class="left">
                  <img src="../../assets/images/dri/arrow-right.png" alt="" />
                  <span>{{ i.title }}</span>
                </div>
                <i class="el-icon-arrow-right right"></i>
              </div>
            </div>
          </div>
      </div>
      <!-- filter - start -->
    </div>
  </div>
</template>

<script type="text/jsx">
import "./Index.less";
import { Task, Dri } from "@/API/api";

export default {
  name: "dri-index",
  data() {
    return {
      activeStatus: "",
      firstTabsList: [
        {
          value: 1,
          name: "NCC小黄书",
          url: "/new/nccBook/map",
        },
        {
          value: 2,
          name: "DRI",
          url: "/dri/index",
        },
        {
          value: 3,
          name: "公司职级",
          url: "/OX/list",
        },
      ],
      teamList: [],
      statusList: [
        {
          id: "",
          name: "全部",
        },
        {
          id: 1,
          name: "我创建的",
        },
        {
          id: 2,
          name: "待我审核",
        },
        {
          id: 4,
          name: "审核通过",
        },
        {
          id: 3,
          name: "审核不通过",
        },
      ],
      searchParams: {
        page: 1,
        pageSize: 9999,
        yearName: null,
        driUserId: null,
        whoUserType: null,
        auditorStatus: null,
        teamId: null,
        groupBy: "driUserId",
      },
      driList: [],
      briefList: [
        {
          id: 1,
          title: "什么是HU?"
        },
        {
          id: 2,
          title: "为什么要使用DRI?"
        },
        {
          id: 3,
          title: "如何参与和制定DRI?"
        },
        {
          id: 4,
          title: "为什么要有TGT?"
        },
        {
          id: 5,
          title: "如何参与TGT？"
        },
        {
          id: 6,
          title: "怎么理解硬核少年？"
        },
        {
          id: 7,
          title: "怎么看待硬核少年和海洋文化的关系？"
        },
        {
          id: 8,
          title: "怎么看待硬核少年和内归因的关系？"
        },
        {
          id: 9,
          title: "我们的组织远景是什么？"
        },
        {
          id: 10,
          title: "什么是「翙羽计划」？"
        },
        {
          id: 11,
          title: "硬核少年要秉承的业务原则是什么？"
        },
        {
          id: 12,
          title: "我们的发展历程"
        },
      ],
      teamScoreData: {},
    };
  },
  computed: {
    getTeamList() {
      return this.$http.post(
        Task.userteamlist,
        this.qs.stringify({ powerType: 1, orderBy: "name", asc: "asc", showStatus: 1 }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    getDriList() {
      return this.$http.post(
        Dri.driobjectlist,
        this.qs.stringify(this.searchParams),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    // getBriefList() {
    //   return this.$http.post(
    //     Dri.dribrieflist,
    //     this.qs.stringify({ page: 1, pageSize: 999, status: 1 }),
    //     {
    //       headers: { Authorization: "Bearer " + this.$cookie.get("token") },
    //     }
    //   );
    // },
    getTeamscoreallowset() {
      return this.$http.post(Dri.driteamscoreallowset, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
  },
  methods: {
    createTeamScore() {
      let name = "";
      switch (+this.teamScoreData.needDateType) {
        case 1:
          name = "driFinancialScore";
          break;
        case 2:
          name = "driBigBugScore";
          break;
        case 3:
          name = "driComplianceScore";
          break;
        default:
          break;
      }
      this.$router.push({
        name,
        query: {
          yearName: this.teamScoreData.needYearName,
          qName: this.teamScoreData.needQName,
        },
      });
    },
    async changeTeam(teamId) {
      this.searchParams.teamId = teamId;
      const res = await this.getDriList;
      this.driList = res.data.retData.objectList;
    },
    async changeStatus(id) {
      switch (id) {
        case 1:
          this.searchParams.auditorStatus = null;
          this.searchParams.whoUserType = id;
          break;
        case 2:
          this.searchParams.auditorStatus = id;
          this.searchParams.whoUserType = id;
          break;
        default:
          this.searchParams.auditorStatus = id;
          this.searchParams.whoUserType = null;
          break;
      }
      this.activeStatus = id;
      const res = await this.getDriList;
      this.driList = res.data.retData.objectList;
    },
  },
  async created() {
    document.documentElement ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0;
    await Promise.all([
      this.getTeamList,
      this.getDriList,
      // this.getBriefList,
      this.getTeamscoreallowset,
    ]).then((res) => {
      this.teamList = [
        ...[{ teamId: null, teamName: "全部" }],
        ...res[0].data.retData.data,
      ];

      this.driList = res[1].data.retData.objectList;

      // this.briefList = res[2].data.retData.briefArr;

      this.teamScoreData = res[2].data.retData.needData;
    });
  },
};
</script>

<style scoped lang="">
</style>
