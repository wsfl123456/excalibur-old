<template>
  <div class="ncc-book__index">
    <div class="wrapper">
      <div class="left">
        <div class="title">
          <h3>活点地图</h3>
          <div>
            <div
              class="add-btn"
              @click="$router.push({ name: 'nccBookMapCreate' })"
            >
              <i class="el-icon-circle-plus"></i>
              <span>创建活点地图</span>
            </div>
          </div>
        </div>
        <div class="filter">
          <div>
            <div class="label">类型：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.typeId === i.val,
                }"
                v-for="(i, k) in typeList"
                :key="k"
                @click="
                  searchParams.typeId = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">排序：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.bangdan === i.val,
                }"
                v-for="(i, k) in bangdanList"
                :key="k"
                @click="
                  searchParams.bangdan = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">学院：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.collegeId === i.val,
                }"
                v-for="(i, k) in collegeList"
                :key="k"
                @click="
                  searchParams.collegeId = i.val;
                  filterChange();
                "
              >
                {{ i.label }}
              </div>
            </div>
          </div>
          <div>
            <div class="label">状态：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': activeStatus === i.val,
                }"
                v-for="(i, k) in statusList"
                :key="k"
                @click="changeStatus(i.val)"
              >
                {{ i.label }}
              </div>
            </div>
          </div>
        </div>
        <!-- filter - end -->

        <div class="wrap-content">
          <!-- list - start -->
          <div
            class="map-list"
            :class="{ 'map-list--no__result': !mapList || !mapList.length }"
          >
            <template v-if="!!mapList && !!mapList.length">
              <div
                class="map-item"
                v-for="(i, k) in mapList"
                :key="k"
                @click="
                  $router.push({ path: `/new/nccBook/map/detail/${i.tipsId}` })
                "
              >
                <h4>{{ i.title }}</h4>
                <div>
                  <member-header
                    :user="{
                      id: i.creatorId,
                      name: i.creatorName,
                      headPic: i.headPic,
                    }"
                    size="small"
                  ></member-header>
                  &nbsp;&nbsp;
                  <span>{{ i.creatorName }}</span>
                  <span>{{ i.lastModifyTime }}</span>
                </div>
                <p>{{ replaceHtmlTag(i.content) }}</p>
              </div>
            </template>
            <template v-else>
              <div class="no-tips">
                <img src="../../assets/images/dri/noResult.png" alt="" />
                <p>暂无数据</p>
              </div>
            </template>
          </div>
          <!-- list - end -->
        </div>
      </div>
      <div class="right">
        <div class="title">
          <h3>最新提问</h3>
        </div>
        <!-- list - start -->
        <div class="question-list">
          <template v-if="!!questionList && !!questionList.length">
            <div
              class="question-item"
              @click="
                $router.push({
                  path: `/new/nccBook/question/detail/${i.tiwenId}`,
                })
              "
              v-for="(i, k) in questionList"
              :key="k"
            >
              <h4>{{ i.content }}</h4>
              <div>
                <member-header
                  :user="{
                    id: i.creatorId,
                    name: i.creatorName,
                    headPic: i.creatorHeadPic,
                  }"
                  size="small"
                ></member-header>
                &nbsp;&nbsp;
                <span>{{ i.creatorName }}</span>
                <span>{{ i.lastModifyTime }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-tips">
              <img src="../../assets/images/dri/noResult.png" alt="" />
              <p>暂无数据</p>
            </div>
          </template>
        </div>
        <!-- list - end -->
      </div>
    </div>
  </div>
</template>
<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import MemberHeader from "../../components/popup/MemberHeader";

export default {
  name: "MapIndex",
  components: { MemberHeader },
  data() {
    return {
      canLoadMore: true,
      dom: null,
      searchParams: {
        typeId: 112,
        bangdan: 0,
        collegeId: 0,
        whoUserType: 0,
        auditorStatus: 0,
        pageSize: 99999,
      },
      mapList: [],
      typeList: [
        {
          val: 112,
          label: "专业线",
        },
        {
          val: 111,
          label: "员工日常",
        },
      ],
      bangdanList: [
        {
          val: 0,
          label: "全部",
        },
        {
          val: "hot",
          label: "最热榜单",
        },
        {
          val: "new",
          label: "最新榜单",
        },
      ],
      collegeList: [],
      statusList: [
        {
          val: 0,
          label: "全部",
        },
        {
          val: 1,
          label: "我创建的",
        },
        {
          val: 2,
          label: "待我审核",
        },
        {
          val: 4,
          label: "审核通过",
        },
        {
          val: 3,
          label: "审核不通过",
        },
      ],
      activeStatus: 0, //不合理的需求只能单独处理该筛选条件
      questionList: [],
    };
  },
  async created() {
    await Promise.all([
      (async () => {
        const collegeRes = await this.getCollegeList();
        const defaultCollege = [
          {
            val: 0,
            label: "全部",
          },
        ];
        const formatCollege = collegeRes.data.retData.data.map((e) => ({
          val: Number(e.collegeId),
          label: `${e.title}学院`,
        }));
        this.collegeList = [...defaultCollege, ...formatCollege];
      })(),
      (async () => {
        const MapListRes = await this.getMapList();
        this.mapList = MapListRes.data.retData.tipsList;
      })(),
      (async () => {
        const {
          data: {
            retData: { tipsList },
          },
        } = await this.getQuestionList();
        this.questionList = tipsList;
      })(),
    ]);
  },
  methods: {
    replaceHtmlTag(htmlStr) {
      htmlStr = htmlStr || "";
      return htmlStr.replace(/<[^>]+>|&nbsp;|&amp;/g, "");
    },
    /* 获取活点地图列表 */
    getMapList() {
      return this.$http.post(
        NccBook.maplistfront,
        this.qs.stringify(this.searchParams),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 获取学院列表 */
    getCollegeList() {
      return this.$http.post(
        NccBook.collegelist,
        this.qs.stringify({ collegeId: "1,2,3" }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 筛选条件改变回调 */
    async filterChange() {
      const MapListRes = await this.getMapList();
      this.mapList = MapListRes.data.retData.tipsList;
    },
    /* 对于状态改变单独处理 */
    changeStatus(val) {
      switch (val) {
        case 1:
          this.searchParams.auditorStatus = 0;
          this.searchParams.whoUserType = val;
          break;
        case 2:
          this.searchParams.auditorStatus = val;
          this.searchParams.whoUserType = val;
          break;
        default:
          this.searchParams.auditorStatus = val;
          this.searchParams.whoUserType = 0;
          break;
      }
      this.activeStatus = val;
      this.filterChange();
    },
    /* 获取最新提问列表 */
    getQuestionList() {
      return this.$http.post(
        NccBook.tiwenlistfront,
        this.qs.stringify({
          bangdan: "new",
          shuxingId: 0,
          collegeId: 0,
          actionType: 0,
          pageSize: 99999,
        }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    scrollHandler() {
      console.log(this.dom.scrollTop);
      console.log(this.dom.offsetHeight);
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    },
  },
  beforeDestroy() {
    this.canLoadMore = false;
    this.unbindLoadMore();
  },
  mounted() {
    this.dom = document.getElementsByClassName("body")[0];
    console.log(this.dom);
    // this.chDom = document.getElementById("main-content");
    this.loadMore();
  },
};
</script>