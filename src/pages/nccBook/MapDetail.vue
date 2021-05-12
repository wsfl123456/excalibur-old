<template>
  <div class="ncc-book__detail">
    <div class="area">
      <Crumb :crumb="crumb" />
      <div class="card">
        <div class="title">
          <div class="left">
            <h4>{{ mapDetail.title }}</h4>
            <div>
              <member-header
                :user="{
                  id: mapDetail.creatorId,
                  name: mapDetail.creatorName,
                  headPic: mapDetail.headPic,
                }"
                size="small"
              ></member-header>
              &nbsp;&nbsp;
              <span>{{ mapDetail.creatorName }}</span>
              <span>{{ mapDetail.lastModifyTime }}</span>
            </div>
          </div>
        </div>

        <div class="auditReason" v-if="Number(mapDetail.auditorStatus) === 3">
          <i class="el-icon-error"></i>
          <span>审核不通过：{{ mapDetail.auditorReason }}</span>
        </div>

        <div class="map-content" v-html="mapDetail.content"></div>
      </div>

      <div class="btn-group">
        <div
          v-if="mapDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--default"
          @click="showAuditModal = true"
        >
          审核不通过
        </div>
        <div
          v-if="mapDetail.btnAudit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="audit(4)"
        >
          审核通过
        </div>
        <div
          v-if="mapDetail.btnEdit_visible === 'show'"
          class="custom-btn custom-btn--primary"
          @click="$router.push({ name: 'nccBookMapCreate', query: { tipsId } })"
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
import Crumb from "@/components/Crumb";
import MemberHeader from "../../components/popup/MemberHeader";
import { Message } from "element-ui";

export default {
  name: "MapDetail",
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
          label: "活点地图",
          pathName: "nccBookMap",
        },
        {
          label: "详情页",
          pathName: "",
        },
      ],
      showAuditModal: false,
      auditReason: "",
      mapDetail: {},
    };
  },
  computed: {
    tipsId() {
      return this.$route.params.tipsId;
    },
  },
  async created() {
    const mapDetailRes = await this.getMapDetail();
    this.mapDetail = mapDetailRes.data.retData.tipsInfo;
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
          NccBook.mapreview,
          this.qs.stringify({
            tipsId: this.tipsId,
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
              name: "nccBookMap",
            });
          } else {
            Message.error({
              message: res.data.retMsg,
              type: "error",
            });
          }
        });
    },
    getMapDetail() {
      return this.$http.post(
        NccBook.mapdetailfront,
        this.qs.stringify({ tipsId: this.tipsId }),
        {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        }
      );
    },
  },
};
</script>