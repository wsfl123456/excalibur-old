<template>
  <div class="ncc-book__detail">
    <div class="area">
      <Crumb :crumb="crumb" />
      <div class="card">
        <div class="title">
          <div class="left">
            <h4>{{ houseDetail.title }}</h4>
            <div>
              <member-header
                :user="{
                  id: houseDetail.creatorId,
                  name: houseDetail.creatorName,
                  headPic: houseDetail.headPic,
                }"
                size="small"
              ></member-header>
              &nbsp;&nbsp;
              <span>{{ houseDetail.creatorName }}更新于{{ houseDetail.lastModifyTime && houseDetail.lastModifyTime.slice(0, 10) }}</span>
              <span>发布机构：{{ houseDetail.pubCompany }}</span>
            </div>
          </div>
          <div class="right">
            <el-button @click="downloadFile" type="primary"
              ><i class="el-icon-download el-icon--right"></i
              >下载资料</el-button
            >
          </div>
        </div>

        <div class="auditReason" v-if="Number(houseDetail.auditorStatus) === 3">
          <i class="el-icon-error"></i>
          <span>审核不通过：{{ houseDetail.auditorReason }}</span>
        </div>

        <div class="store-content">
          <div v-for="(file, k) in houseDetail.fileContent" :key="k">
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
            <div class="file-address">
                云舟地址：<span>{{ houseDetail.fileAddress }}</span>
            </div>
            <div class="summary summary-house">
              <h4>文件简介:</h4>
              <div v-html="file.summary"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-group">
        <div
          v-if="houseDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--default"
          @click="showAuditModal = true"
        >
          审核不通过
        </div>
        <div
          v-if="houseDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="audit(4)"
        >
          审核通过
        </div>
        <div
          v-if="houseDetail.btnEdit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="$router.push({ name: 'nccBookHouseCreate', query: { houseId } })"
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
  name: "HouseDetail",
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
          label: "黄金屋",
          pathName: "nccBookHouse",
        },
        {
          label: "详情页",
          pathName: "",
        },
      ],
      showAuditModal: false,
      auditReason: "",
      houseDetail: {},
    };
  },
  computed: {
    houseId() {
      return this.$route.params.houseId;
    },
  },
  async created() {
    const houseDetailRes = await this.getHouseDetail();
    this.houseDetail = houseDetailRes.data.retData.tipsInfo;
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
          NccBook.housereview,
          this.qs.stringify({
            houseId: this.houseId,
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
              name: "nccBookHouse",
            });
          } else {
            Message.error({
              message: res.data.retMsg,
              type: "error",
            });
          }
        });
    },
    getHouseDetail() {
      return this.$http.post(
        NccBook.housedetailfront,
        this.qs.stringify({ houseId: this.houseId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
    /* 下载文件 */
    downloadFile() {
      this.houseDetail.fileContent.forEach((e) => {
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