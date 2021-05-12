<template>
  <div class="ncc-book__detail">
    <div class="area">
      <Crumb :crumb="crumb" />
      <div class="card">
        <div class="title">
          <div class="left">
            <h4>{{ storeDetail.title }}</h4>
            <div>
              <member-header
                :user="{
                  id: storeDetail.creatorId,
                  name: storeDetail.creatorName,
                  headPic: storeDetail.headPic,
                }"
                size="small"
              ></member-header>
              &nbsp;&nbsp;
              <span>{{ storeDetail.creatorName }}</span>
              <span>{{ storeDetail.lastModifyTime }}</span>
            </div>
          </div>
          <div class="right">
            <el-button @click="downloadFile" type="primary"
              ><i class="el-icon-download el-icon--right"></i
              >下载资料</el-button
            >
          </div>
        </div>

        <div class="auditReason" v-if="Number(storeDetail.auditorStatus) === 3">
          <i class="el-icon-error"></i>
          <span>审核不通过：{{ storeDetail.auditorReason }}</span>
        </div>

        <div class="store-content">
          <div v-for="(file, k) in storeDetail.fileContent" :key="k">
            <div class="review">
              <div >
                <p>{{ file.fileName }}</p>
                <p class="size">{{ toSize(file.fileSize) }}</p>
              </div>
              <div >
                <a href="javascript:;" @click="review(file.filePath)">
                  <i class="el-icon-view"></i>
                  预览
                </a>
              </div>
            </div>
            <div class="summary">
              <h4>文件简介:</h4>
              <div v-html="file.summary"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-group">
        <div
          v-if="storeDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--default"
          @click="showAuditModal = true"
        >
          审核不通过
        </div>
        <div
          v-if="storeDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="audit(4)"
        >
          审核通过
        </div>
        <div
          v-if="storeDetail.btnEdit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="$router.push({ name: 'nccBookStoreCreate', query: { storeId } })"
        >
          编辑修改
        </div>
      </div>
    </div>
    <el-dialog
      title="审核不通过"
      :visible.sync="showAuditModal"
      class="new-modal"
      @close="closeAuditModal"
    >
      <div class="new-modal-content">
        <div class="label"><span>*</span>审核不通过原因</div>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="填写具体原因"
          v-model="auditReason"
        >
        </el-input>
      </div>
      <div slot="footer">
        <el-button @click="closeAuditModal()">取 消</el-button>
        <el-button type="primary" @click="audit(3)">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/jsx">
import "./Index.less";
import { NccBook } from "@/API/api";
import { bytesToSize } from "../../util/util";
import Crumb from "@/components/Crumb";
import MemberHeader from "../../components/popup/MemberHeader";
import { Message } from "element-ui";

export default {
  name: "StoreDetail",
  components: { Crumb, MemberHeader },
  data() {
    return {
      crumb: [
        {
          label: "成长计划",
          pathName: "nccBookMap",
        },
        {
          label: "NCC小黄书",
          pathName: "nccBookMap",
        },
        {
          label: "皇家兵器库",
          pathName: "nccBookStore",
        },
        {
          label: "详情页",
          pathName: "",
        },
      ],
      showAuditModal: false,
      auditReason: "",
      storeDetail: {},
    };
  },
  computed: {
    storeId() {
      return this.$route.params.storeId;
    },
  },
  async created() {
    const storeDetailRes = await this.getStoreDetail();
    this.storeDetail = storeDetailRes.data.retData.tipsInfo;
  },
  methods: {
    closeAuditModal() {
      this.showAuditModal = false;
      this.auditReason = "";
    },
    audit(auditorStatus) {
      if (auditorStatus === 3) {
        if (!this.auditReason) {
          Message.warning({
            message: "请输入具体原因",
            type: "warning",
          });
          return;
        }
      }
      this.$http
        .post(
          NccBook.storereview,
          this.qs.stringify({
            storeId: this.storeId,
            auditorStatus,
            auditorReason: this.auditReason,
          }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") },
          }
        )
        .then((res) => {
          if (res.data.retCode === 0) {
            Message.success({
              message: "提交成功",
              type: "success",
            });
            this.closeAuditModal();
            this.$router.push({
              name: "nccBookStore",
            });
          } else {
            Message.error({
              message: res.data.retMsg,
              type: "error",
            });
          }
        });
    },
    getStoreDetail() {
      return this.$http.post(
        NccBook.storedetailfront,
        this.qs.stringify({ storeId: this.storeId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 下载文件 */
    downloadFile() {
      this.storeDetail.fileContent.forEach((e) => {
        const aDom = document.createElement("a"); // 创建标签
        const evt = document.createEvent("HTMLEvents"); // 创建事件
        evt.initEvent("click", false, false); // 初始化事件，绑定点击事件，不冒泡，不阻止浏览器默认行为
        aDom.download = e.fileName;
        aDom.href = encodeURI(e.filePath); // 对地址进行编码
        aDom.dispatchEvent(evt); // 触发事件
        aDom.click();
      });
    },
    /* kb转mb */
    toSize(size) {
      return size ? bytesToSize(size) : "";
    },
    /* 预览文件 */
    review(filePath) {
        window.open(filePath, "_blank")
    }
  },
};
</script>