<template>
  <div class="ncc-book__index">
    <div class="wrapper">
      <div class="left">
        <div class="title">
          <h3>皇家兵器库</h3>
          <div>
            <div
              class="add-btn"
              @click="$router.push({ name: 'nccBookStoreCreate' })"
            >
              <i class="el-icon-circle-plus"></i>
              <span>打造皇家兵器库</span>
            </div>
          </div>
        </div>
        <div class="filter">
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
            <div class="label">属性：</div>
            <div class="value">
              <div
                class="item"
                :class="{
                  'item--active': searchParams.shuxingId === i.val,
                }"
                v-for="(i, k) in shuxingList"
                :key="k"
                @click="
                  searchParams.shuxingId = i.val;
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
            class="store-list"
            :class="{ 'store--no__result': !storeList || !storeList.length }"
          >
            <template v-if="!!storeList && !!storeList.length">
              <div
                class="store-item"
                v-for="(i, k) in storeList"
                :key="k"
                @click="
                  $router.push({
                    path: `/new/nccBook/store/detail/${i.storeId}`,
                  })
                "
              >
                <div class="download">
                  <h4>{{ i.title }}</h4>
                  <a
                    href="javascript:;"
                    @click.stop="downloadFile(i)"
                    @mouseenter.stop
                  >
                    <img src="../../assets/images/nccBook/down.png" alt="" />
                    下载资料
                  </a>
                </div>
                <div
                  class="file"
                  v-for="(file, fileK) in i.fileContent"
                  :key="fileK"
                >
                  <p>{{ file.fileName }}</p>
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
  </div>
</template>
<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import MemberHeader from "../../components/popup/MemberHeader";

export default {
  name: "StoreIndex",
  components: { MemberHeader },
  data() {
    return {
      searchParams: {
        bangdan: 0,
        shuxingId: 0,
        collegeId: 0,
        whoUserType: 0,
        auditorStatus: 0,
        pageSize: 99999,
      },
      storeList: [],
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
      shuxingList: [],
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
    };
  },
  async created() {
    const defaultList = [
      {
        val: 0,
        label: "全部",
      },
    ];
    await Promise.all([
      (async () => {
        const collegeRes = await this.getCollegeList();
        const formatCollege = collegeRes.data.retData.data.map((e) => ({
          val: Number(e.collegeId),
          label: `${e.title}学院`,
        }));
        this.collegeList = [...defaultList, ...formatCollege];
      })(),
      (async () => {
        const shuxingRes = await this.getStoreshuxinglist();
        const formatShuxing = shuxingRes.data.retData.shuxingList.map((e) => ({
          val: Number(e.shuxingId),
          label: e.shuxingName,
        }));
        this.shuxingList = [...defaultList, ...formatShuxing];
      })(),
      (async () => {
        const storeListRes = await this.getStoreList();
        this.storeList = storeListRes.data.retData.tipsList;
      })(),
    ]);
  },
  methods: {
    replaceHtmlTag(htmlStr) {
      htmlStr = htmlStr || "";
      return htmlStr.replace(/<[^>]+>|&nbsp;|&amp;/g, "");
    },
    /* 获取兵器库列表 */
    getStoreList() {
      return this.$http.post(
        NccBook.storelistfront,
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
    /* 获取属性列表 */
    getStoreshuxinglist() {
      return this.$http.post(NccBook.storeshuxinglist, this.qs.stringify(), {
        headers: { Authorization: "Bearer " + this.$cookie.get("token") },
      });
    },
    /* 筛选条件改变回调 */
    async filterChange() {
      const storeListRes = await this.getStoreList();
      this.storeList = storeListRes.data.retData.tipsList;
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
    /* 下载文件 */
    downloadFile(i) {
      i.fileContent.forEach((e) => {
        const aDom = document.createElement("a"); // 创建标签
        const evt = document.createEvent("HTMLEvents"); // 创建事件
        evt.initEvent("click", false, false); // 初始化事件，绑定点击事件，不冒泡，不阻止浏览器默认行为
        aDom.download = e.fileName;
        aDom.href = encodeURI(e.filePath); // 对地址进行编码
        aDom.dispatchEvent(evt); // 触发事件
        aDom.click();
      });
    },
  },
};
</script>