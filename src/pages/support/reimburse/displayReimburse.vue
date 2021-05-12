<template>
  <div>
    <div class="filter reimburse-list">
      <div class="status">
        <div>状态</div>
        <div>
          <RadioGroup class="radioGroup" :value="statusState" @on-change="statusChange">
            <Radio :label="0" class="radio">全部</Radio>
            <Radio :label="1" class="radio">我发起的</Radio>
            <Radio :label="2" class="radio">待审核</Radio>
            <Radio :label="3" class="radio">已审核</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="time">
        <div>时间</div>
        <div>
          <DatePicker
            class="deadline"
            style="height:40px"
            transfer
            type="month"
            placeholder="请选择月份"
            format="yyyy-MM"
            :value="selectMonth"
            @on-change="changeMonth"
          ></DatePicker>
        </div>
      </div>
      <div v-if="exportRole" class="btn" @click="exportbaoxiaostaff">
        <Button type="primary" class="button">
          <Icon type="archive"></Icon>&nbsp;&nbsp;导出
        </Button>
      </div>
      <div class="btn">
        <Tooltip content="当月3至9号不可新建报销" :disabled="!isInvalidDate">
          <Button type="primary" class="button" @click="addReimburse" :disabled="isInvalidDate">
            <Icon type="plus-circled"></Icon>&nbsp;&nbsp;新建报销
          </Button>
        </Tooltip>
      </div>
    </div>
    <div class="table result-list">
      <loading v-if="isLoading"></loading>
      <table class="main-list">
        <thead>
          <tr>
            <th
              v-for="(item, index) in tableTitle"
              :key="index"
              :style="{width : (item.width ? item.width + 'px' : 'auto')}"
            >
              <div class="table-cell">{{item.title}}</div>
            </th>
          </tr>
        </thead>
        <tbody v-if="list.length > 0">
          <template v-for="(item, index) in list">
            <tr @click="toggleRow(item, index)">
              <td
                v-for="(_item, _index) in tableTitle"
                :key="'td-' + index + '-' + _index"
                :class="{red : (_item.key == 'priceTotal' || _item.key == 'priceTax' || _item.key == 'priceMeal' || _item.key == 'priceNoTax') ? true : false}"
              >
                <template>
                  <div class="table-cell">{{item[_item.key]}}</div>
                </template>
              </td>
            </tr>
            <tr v-if="detailIdx === item.id">
              <td :colspan="tableTitle.length">
                <div class="list-detail" style="position:relative;min-height:300px">
                  <loading v-if="detailLoading"></loading>

                  <!-- content -->
                  <div>
                    <div>
                      <Row>
                        <i-col span="24" style="min-height: 300px;">
                          <div>
                            <div class="content">
                              <Alert
                                v-if="taskData.info.state == 7 && verSelect == 0"
                                type="error"
                                class="nopass"
                              >
                                <span class="alert-title">
                                  <Icon type="android-alert" size="20"></Icon>
                                  {{taskData.info.stateName}}
                                </span>
                                <span class="alert-detail">
                                  <i-input
                                    type="textarea"
                                    autosize
                                    :value="taskData.info.inspectedReason"
                                    disabled
                                  ></i-input>
                                </span>
                              </Alert>
                              <div
                                class="show"
                                v-if="taskData.formInfo[verSelect].formContent.reimburse"
                              >
                                <div class="ver-tabs">
                                  <ul>
                                    <li
                                      v-for="n in taskData.formInfo.length"
                                      :class="{active: n === verSelect + 1}"
                                      @click="changeVer(n - 1)"
                                    >{{'V' + (taskData.formInfo.length - n + 1)}}</li>
                                  </ul>
                                </div>
                                <show-reimburse
                                  :taskData="taskData"
                                  :taskFormData="taskData.formInfo[verSelect].formContent"
                                  :verSelect="verSelect"
                                  style="margin-left:32px"
                                ></show-reimburse>
                              </div>
                              <div v-else style="padding-left:30px">
                                <task-display-form
                                  :form-value="taskData.formInfo[verSelect].formContent.taskInfo"
                                  :ver-time="taskData.formInfo[verSelect].createTime"
                                  type="formData"
                                  :ver-count="taskData.formInfo.length"
                                  :active-ver="verSelect"
                                  @on-change="changeVer"
                                ></task-display-form>

                                <task-display-form
                                  v-if="taskData.formInfo[verSelect].formContent.hasOwnProperty('mediaKOL')"
                                  type="mediaKOL"
                                  :form-value="taskData.formInfo[verSelect].formContent.mediaKOL"
                                  :ver-time="taskData.formInfo[verSelect].createTime"
                                  :active-ver="verSelect"
                                ></task-display-form>

                                <!--报销-->
                                <task-display-form
                                  v-if="taskData.formInfo[verSelect].formContent.hasOwnProperty('reimbursement')"
                                  type="reimbursement"
                                  :form-value="taskData.formInfo[verSelect].formContent.reimbursement"
                                  :ver-time="taskData.formInfo[verSelect].createTime"
                                  :active-ver="verSelect"
                                  is-indie
                                ></task-display-form>

                                <i-form
                                  label-position="left"
                                  :label-width="88"
                                  class="default-form"
                                >
                                  <div class="form-group">
                                    <div>
                                      <Row>
                                        <i-col span="12" class="default-form-member-col">
                                          <FormItem
                                            :label="'申请人'"
                                            class="default-form-item default-member-form"
                                            required
                                          >
                                            <div class="default-form-member-selection">
                                              <common-member-ii
                                                :can-exit="false"
                                                :is-edit="false"
                                                :users="[{name: taskData.operationInfo[0].operationName, headPic: taskData.operationInfo[0].operationHeadPic, id: taskData.operationInfo[0].operationId}]"
                                              ></common-member-ii>
                                            </div>
                                          </FormItem>
                                        </i-col>
                                        <i-col span="12" class="default-form-member-col">
                                          <FormItem
                                            :label="'审批人'"
                                            class="default-form-item default-member-form"
                                            required
                                          >
                                            <div class="default-form-member-selection">
                                              <common-member-ii
                                                :can-exit="false"
                                                :is-edit="false"
                                                :users="[{name: taskData.info.auditorName, headPic: taskData.info.auditorHeadPic, id: taskData.info.auditorId}]"
                                              ></common-member-ii>
                                            </div>
                                          </FormItem>
                                        </i-col>
                                      </Row>
                                    </div>
                                  </div>
                                </i-form>
                              </div>
                              <div class="contract-btn">
                                <Button
                                  v-if="taskData.roleInfo.new_baoxiao_export == 'show'"
                                  type="primary"
                                  @click="exportbaoxiaoperson"
                                  class="btn"
                                >导出</Button>
                                <Button
                                  v-if="taskData.roleInfo.eidt == 'show' && taskData.formInfo[verSelect].formContent.reimburse"
                                  type="primary"
                                  @click="toEdit"
                                  class="btn"
                                >编辑</Button>
                                <Button
                                  v-if="taskData.roleInfo.delete == 'show'"
                                  type="ghost"
                                  @click="cancelConfirm"
                                  class="btn ghost-btn"
                                >撤销</Button>
                                <Button
                                  v-if="taskData.roleInfo.inspect == 'show'"
                                  type="primary"
                                  class="btn"
                                  @click="audit(6, '', [])"
                                >审核通过</Button>
                                <Button
                                  v-if="taskData.roleInfo.inspect == 'show'"
                                  type="ghost"
                                  class="btn ghost-btn"
                                  @click="showModal(7)"
                                >审核不通过</Button>
                              </div>
                            </div>
                          </div>
                        </i-col>
                      </Row>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="tableTitle.length" class="empty-data" style="text-align:center">没有报销数据</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="isUndo" class-name ok-text="确定撤销" :closable="false" @on-ok="cancelReim">
      <h2 slot="header">撤销报销</h2>
      <div>
        <p>
          确定撤销报销 "
          <span class="required-tag" v-if="taskData">{{taskData.info.taskName}}</span>" ？
        </p>
      </div>
    </Modal>
    <Modal
      v-model="isModal"
      class-name="vertical-center-modal examine-modal"
      ok-text="提交"
      width="480px"
      :closable="false"
    >
      <i-input type="textarea" v-model="modalValue" :autosize="{minRows: 5}" placeholder="填写不通过的理由"></i-input>
      <span
        class="words-count"
        :class="{'over-length': modalValue.length > 1000}"
      >{{modalValue.length}}/1000</span>
      <div slot="footer" class="custom-footer">
        <Button
          type="primary"
          size="large"
          class="ok"
          @click.native="audit(nopassState, modalValue, [])"
          :disabled="modalValue.length > 1000 || modalValue.length < 5"
        >提交</Button>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>
<script>
import MemberAdd from "../../../components/MemberAdd";
import Toast from "../../../components/popup/Toast";
import Loading from "../../../components/popup/Loading";
import showReimburse from "./showReimburse";
import { Task, Hr } from "../../../API/api";
import CommonMemberIi from "../../../components/CommonMemberii";
import TaskDisplayForm from "../../../components/TaskDisplayForm";

export default {
  components: {
    Toast,
    Loading,
    showReimburse,
    CommonMemberIi,
    TaskDisplayForm
  },
  data() {
    return {
      isToast: false,
      toastMsg: "",
      isLoading: false,
      isModal: false,
      isUndo: false,
      modalValue: "",
      nopassState: null,
      submitTaskPersonId: null,
      detailLoading: false,
      detailIdx: null,
      taskData: null,
      verSelect: 0,
      selectMonth: "",
      exportRole: null,
      statusState: 0,
      tableTitle: [
        {
          title: "报销单名称",
          asc: "desc",
          key: "taskName",
          width: 200
        },
        {
          title: "报销总金额",
          asc: "desc",
          key: "priceTotal"
        },
        {
          title: "未税金额",
          asc: "desc",
          key: "priceNoTax"
        },
        {
          title: "税额",
          asc: "desc",
          key: "priceTax"
        },
        {
          title: "餐补金额",
          asc: "desc",
          key: "priceMeal"
        },
        {
          title: "创建时间",
          asc: "desc",
          key: "createTime",
          width: 160
        },
        {
          title: "状态",
          asc: "desc",
          key: "stateName"
        },
        {
          title: "申请人",
          asc: "desc",
          key: "creatorName"
        },
        {
          title: "审批人",
          asc: "desc",
          key: "auditorName"
        }
      ],
      filter: {
        fromtime: "",
        totime: "",
        functionType: 0,
        page: 1,
        pageSize: 25,
        orderBy: "createTime",
        asc: "desc",
        toolkitId: 18,
        is_urgent: 0
      },
      list: []
    };
  },
  methods: {
    getExportRole() {
      this.$http
        .post(Hr.role, this.qs.stringify({ id: this.detailIdx, state: 12 }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.exportRole = res.data.retData.exportbaoxiaostaffrole;
        });
    },
    addReimburse() {
      this.$router.push("/myReimburse/add");
    },
    toEdit() {
      this.$router.push(`/myReimburse/edit/${this.detailIdx}`);
    },
    cancelConfirm() {
      this.isUndo = true;
    },
    changeVer(n) {
      this.verSelect = n;
    },
    changeMonth(date) {
      this.selectMonth = date;
      this.filter.fromtime = date ? date + "-01" : "";
      this.filter.totime = date ? date + "-31" : "";
      this.filter.page = 1;
      this.getList("search");
    },
    showModal(state, id) {
      this.isModal = true;
      this.nopassState = state;
      this.submitTaskPersonId = id;
      if (+state === 7) {
        this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId]
          ? defaultPlaceholder[this.taskData.info.toolkitId].quality
          : defaultPlaceholder["default"].quality;
      } else if (+state === 9) {
        this.modalValue = defaultPlaceholder[this.taskData.info.toolkitId]
          ? defaultPlaceholder[this.taskData.info.toolkitId].audit
          : defaultPlaceholder["default"].audit;
      } else {
        this.modalValue = "";
      }
    },
    cancelReim() {
      this.isSubmit = true;
      this.$http
        .post(
          Task.reimbursementDel,
          this.qs.stringify({ id: this.detailIdx, state: 12 }),
          {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          }
        )
        .then(res => {
          this.isToast = true;
          this.toastMsg = "撤销报销成功";
          setTimeout(() => {
            this.isToast = false;
            this.filter.page = 1;
            this.getList();
          }, 1500);
        })
        .catch(err => {
          this.isToast = true;
          this.toastMsg = err.toString();
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        })
        .finally(() => {
          this.isSubmit = false;
        });
    },
    statusChange(label) {
      switch (label) {
        case 0:
          this.filter.functionType = 0;
          this.filter.is_urgent = 0;
          break;
        case 1:
          this.filter.functionType = 1;
          this.filter.is_urgent = 0;
          break;
        case 2:
          this.filter.functionType = 2;
          this.filter.is_urgent = 1;
          break;
        case 3:
          this.filter.functionType = 2;
          this.filter.is_urgent = 2;
          break;
      }
      this.filter.page = 1;
      this.getList("search");
    },
    toggleRow(item, idx) {
      if (this.detailIdx === item.id) {
        this.detailIdx = null;
      } else {
        this.detailIdx = null;
        this.detailIdx = item.id;
        this.getDetail(item.id);
        // this.changeVer(0)
      }
    },
    getDetail(id) {
      this.detailLoading = true;
      this.$http
        .post(Task.detail, this.qs.stringify({ taskId: id }), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          this.detailLoading = false;
          if (_data.retCode === 0) {
            this.taskData = _data.retData.data;
            this.taskData.formInfo.forEach(ele => {
              if (ele.formContent.reimburse) {
                ele.formContent.reimburse.items.forEach(element => {
                  if (!element.classification) {
                    element.classification = {
                      value: [],
                      toastMsg: "请选择实际类别",
                      placeholder: "选择实际类别"
                    };
                  }
                });

              }
            });
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
            if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        });
    },
    getList(type) {
      this.isLoading = true;
      if (type === "search") {
        this.list = [];
        this.filter.page === 1;
      }
      this.$http
        .post(Task.list, this.qs.stringify(this.filter), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            if (this.filter.page === 1) {
              this.list = _data.retData.taskInfo.data;
            } else {
              this.list = this.list.concat(_data.retData.taskInfo.data);
            }
            if (!_data.retData.taskInfo.data.length) {
              this.isToast = true;
              this.toastMsg = "没有更多";
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = "";
                this.isLoading = false;
              }, 1500);
            }
            this.isLoading = false;
          }
        });
    },
    audit(state, reason, taskData, id) {
      if (!this.isSubmit) {
        this.isSubmit = true;
        let data = {
          id: this.detailIdx,
          state,
          reason,
          taskData
          // taskPersonId: id || this.submitTaskPersonId
        };

        if (
          this.taskData.info.hasOwnProperty("isFinance") &&
          this.taskData.info.isFinance
        ) {
          if (
            +this.taskData.info.toolkitId === 27 ||
            +this.taskData.info.toolkitId === 18 ||
            +this.taskData.info.toolkitId === 19 ||
            +this.taskData.info.toolkitId === 20 ||
            +this.taskData.info.toolkitId === 21 ||
            +this.taskData.info.toolkitId === 22
          ) {
            data.taskForm = {};
          } else {
            data.taskForm = {
              customerInfo: this.taskData.formInfo[0].formContent
                .contactsInfo[0].customerInfo,
              companyInfo: this.taskData.formInfo[0].formContent.contactsInfo[0]
                .companyInfo,
              baseInfo: this.taskData.formInfo[0].formContent.contactsInfo[0]
                .baseInfo
            };
          }

          this.$http
            .post(Task.financeAudit, this.qs.stringify(data), {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            })
            .then(res => {
              let _data = res.data;
              this.isSubmit = false;
              if (_data.retCode === 0) {
                this.isToast = true;
                this.toastMsg = "提交成功";
                this.toastState = "success";
                this.detailIdx = null
                this.getList('search')
              } else {
                this.isToast = true;
                this.toastMsg = _data.retMsg;
                this.toastState = null;
              }
              setTimeout(() => {
                this.isToast = false;
                this.toastMsg = null;
                this.toastState = null;
                this.canAudit = true;
                if (_data.retCode === 100014) {
                  this.$cookie.delete("token");

                  this.$router.push("/");
                } else if (_data.retCode === 0) {
                  // this.getDetail(this.detailIdx);
                }
              }, 1500);
            });
        }
        this.isModal = false;
        this.isSubmit = false;
      }
    },
    exportbaoxiaoperson() {

      const routeData = this.$router.resolve({
       name: 'WindowPrint',
        query: {
          type: 'remiburse',
          taskId: this.taskData.info.id
        }
      });
      window.open(routeData.href, "_blank");
    },
    exportbaoxiaostaff() {
      let formData = {
        fromtime: this.filter.fromtime,
        totime: this.filter.totime,
        functionType: this.filter.functionType,
        is_urgent: this.filter.is_urgent
      };
      if (!formData.fromtime) {
        this.isToast = true;
        this.toastMsg = "请选择导出月份";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
        }, 1500);
      } else {
        this.$http
          .post(Hr.exportbaoxiaostaff, this.qs.stringify(formData), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            let url = res.data.retData.download_url;
            window.open(url);
          });
      }
    },
    scrollHandler() {
      if (
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
        this.filter.page++;
        this.getList();
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
    this.getExportRole();
    this.getList();
  },
  computed: {
    isInvalidDate() {
      const invalidDateRegex = /^[3-9]$/; // 当月3号至9号不可用
      const day = new Date().getDate();

      // return invalidDateRegex.test(day);
      return false;
    }
  },
  mounted() {
    this.dom = document.getElementById("main-pages");
    this.chDom = document.getElementById("main-content");
    this.loadMore();
  },
  beforeDestroy() {
    this.unbindLoadMore();
  }
};
</script>
<style lang="less" scoped>
.filter {
  overflow: hidden;
  font-size: 14px;
  & > div {
    float: left;
    margin-left: 20px;
    &:first-child {
      margin-left: 0px;
    }
  }
  .status {
    width: 400px;
    .radioGroup {
      display: flex;
      border: 1px solid #ced4da;
      border-radius: 4px;
      padding-left: 20px;
      margin-top: 10px;
      .radio {
        flex: 1;
        height: 38px;
        font-size: 14px;
        line-height: 38px;
      }
    }
  }
  .btn {
    height: 71px;
    .button {
      height: 40px;
      margin-top: 31px;
      font-size: 14px;
    }
  }
}
.table {
  margin-top: 30px;
  position: relative;
  min-height: 400px;
}
.red {
  color: #ff6767;
}
.content {
  border: 20px solid #ced4da;
  padding: 20px;
  .show {
    position: relative;
    background-color: white;
    .ver-tabs {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 32px;
      ul {
        li {
          background-color: #f8f9fa;
          color: #343a40;
          font-size: 14px;
          border: solid 1px #e9ecef;
          border-right: 0 none;
          border-radius: 4px 0 0 4px;
          line-height: 40px;
          text-align: center;
          margin-bottom: -1px;
          cursor: pointer;
          &.active,
          &:hover {
            color: #fff;
            background-color: #107cd9;
          }
        }
      }
    }
  }
}
.contract-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .btn {
    margin-left: 10px;
    width: 140px;
    height: 48px;
    font-size: 14px;
    &:first-child {
      margin-left: 0;
    }
  }
  .ghost-btn {
    border: 1px solid #2d8ef8;
    color: #2d8ef8;
  }
}
</style>



