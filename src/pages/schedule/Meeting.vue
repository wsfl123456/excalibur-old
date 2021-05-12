<template>
  <div class="meeting meeting-default">
    <div class="addBtn">
      <router-link to="/schedule/add">
        <Icon type="plus-circled" size="20"></Icon>发起会议
      </router-link>
    </div>
    <div class="meeting-filter g-mb-32">
      <div>
        <label>会议类型</label>
        <Select
          v-model="pageConf.meeting_type"
          placeholder="请选择会分类"
          @on-change="changeCate"
          clearable
        >
          <Option v-for="(item, idx) in meetingTypes" :value="item.name" :key="idx">{{ item.name }}</Option>
        </Select>
      </div>
      <div>
        <label>会议室</label>
        <Select v-model="pageConf.room" placeholder="选择会议地点" @on-change="changeRoom" clearable>
          <Option v-for="item in rooms" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </div>
      <div>
        <label>会议时间</label>
        <DatePicker
          transfer
          class="datepicker"
          type="datetimerange"
          format="yyyy/MM/dd HH:mm"
          placeholder="选择会议时间"
          :clearable="false"
          @on-change="selectDate"
        ></DatePicker>
      </div>
    </div>
    <div class="meeting-type">
      <ButtonGroup size="large">
        <Button
          v-for="(item, idx) in meetingTypeConf"
          :key="item.id"
          :class="{active: pageConf.type === item.id}"
          @click="changeType(item.id)"
        >{{item.label}}</Button>
      </ButtonGroup>
    </div>
    <div class="result-list">
      <loading v-if="isLoading"></loading>

      <table class="main-list common-table">
        <thead>
          <tr>
            <th
              v-for="(item, index) in tableConf"
              :key="index"
              :style="{width: item.width + 'px'}"
              @click="sortData(index)"
              :class="{active: sortTh === index}"
            >
              <div class="table-cell">
                {{item.title}}
                <i
                  class="iconfont"
                  :class="{'icon-sort_down': item.asc === 'desc', 'icon-sort_up': item.asc === 'asc'}"
                ></i>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="events.length > 0">
          <template v-for="(item, index) in events">
            <tr @click="toggleRow(item.id)">
              <td v-for="(_item, _index) in tableConf" :key="'td-' + index + '-' + _index">
                <template v-if="_item.key === 'startTime'">
                  <div
                    class="table-cell"
                  >{{item['startTime'] | filterYear}} - {{item['endTime'] | filterYear}}</div>
                </template>
                <template v-else>
                  <div class="table-cell">{{item[_item.key]}}</div>
                </template>
              </td>
            </tr>
            <tr v-if="detailId === item.id">
              <td :colspan="tableConf.length">
                <div class="list-detail">
                  <div>
                    <Row>
                      <i-col span="24">
                        <i-form label-position="left" :label-width="100" class="default-form">
                          <div class="form-group">
                            <div>
                              <Row>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="会议名称"
                                    class="default-form-item default-member-form"
                                  >
                                    <i-input readonly v-model="meeting.name"></i-input>
                                  </FormItem>
                                </i-col>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="会议类型"
                                    class="default-form-item default-member-form"
                                  >
                                    <i-input readonly v-model="meeting.type"></i-input>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="会议时间"
                                    class="default-form-item default-member-form"
                                  >
                                    <div
                                      class="default-form-member-selection"
                                      style="font-size:14px"
                                    >{{meeting['startTime'] | filterYear}} - {{meeting['endTime'] | filterYear}}</div>
                                  </FormItem>
                                </i-col>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="会议地点"
                                    class="default-form-item default-member-form"
                                  >
                                    <i-input readonly v-model="meeting.roomName"></i-input>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="与会人员"
                                    class="default-form-item default-member-form"
                                  >
                                    <div class="default-form-member-selection">
                                      <!--<common-member :users="meeting.userItems" :can-exit="false" :is-edit="false"></common-member>-->
                                      <common-member-ii
                                        :users="meeting.userItems"
                                        :can-exit="false"
                                        :is-edit="false"
                                      ></common-member-ii>
                                    </div>
                                  </FormItem>
                                </i-col>
                                <i-col span="12" class="default-form-member-col">
                                  <FormItem
                                    label="发起人"
                                    class="default-form-item default-member-form"
                                  >
                                    <div class="default-form-member-selection">
                                      <!--<common-member :users="meeting.userItems" :can-exit="false" :is-edit="false"></common-member>-->
                                      <common-member-ii
                                        :users="[meeting.createUser]"
                                        :can-exit="false"
                                        :is-edit="false"
                                      ></common-member-ii>
                                    </div>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem label="会议方式" class="default-form-item" required>
                                    <i-select
                                      v-model="meeting.roomType"
                                      placeholder="请选择会议方式"
                                      disabled
                                    >
                                      <i-option
                                        v-for="item in roomTypeList"
                                        :value="item.value"
                                        :key="item.value"
                                      >{{item.label}}</i-option>
                                    </i-select>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem
                                    label="外部用户"
                                    class="default-form-item default-member-form"
                                  >
                                    <i-input
                                      readonly
                                      :value="meeting.contactInfo ? JSON.parse(meeting.contactInfo).join(';') : ''"
                                    ></i-input>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem
                                    label="会议Agenda"
                                    class="default-form-item default-member-form"
                                  >
                                    <i-input
                                      readonly
                                      type="textarea"
                                      :autosize="{minRows: 1, maxRows: 7}"
                                      v-model="meeting.agenda"
                                    ></i-input>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem
                                    label="会议记录人员"
                                    class="default-form-item default-member-form"
                                  >
                                    <div class="default-form-member-selection">
                                      <!--<common-member :users="meeting.recorderUserItems" :can-exit="false" :is-edit="false"></common-member>-->
                                      <common-member-ii
                                        :users="meeting.recorderUserItems"
                                        :can-exit="false"
                                        :is-edit="false"
                                      ></common-member-ii>
                                    </div>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem
                                    label="会议记录"
                                    class="default-form-item default-member-form"
                                  >
                                    <div class="default-form-member-selection">
                                      <div class="meeting-memo-area" v-html="meeting.memo"></div>
                                    </div>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                            <div>
                              <Row>
                                <i-col span="24" class="default-form-member-col">
                                  <FormItem
                                    label="会议记录附件"
                                    class="default-form-item default-member-form"
                                  >
                                    <div class="default-form-member-selection">
                                      <!-- <a
                                        :href="meeting.filePath"
                                        :download="meeting.fileName"
                                      >{{ meeting.fileName }}</a>-->
                                      <a
                                        href="javascript:;"
                                        @click="download(meeting.filePath, meeting.fileName)"
                                      >{{ meeting.fileName }}</a>
                                    </div>
                                  </FormItem>
                                </i-col>
                              </Row>
                            </div>
                          </div>
                        </i-form>
                        <div class="meeting-btns" v-if="meeting.allowUpdateMemo">
                          <div>
                            <Button
                              type="primary"
                              size="large"
                              v-if="meeting.isEdit"
                              @click="toMemo(meeting)"
                            >更新会议记录</Button>
                            <Button
                              type="primary"
                              size="large"
                              v-else
                              @click="toMemo(meeting)"
                            >添加会议记录</Button>
                            <Button
                              type="primary"
                              size="large"
                              @click="sendMemoConfirm(meeting.id)"
                            >发送会议记录给与会人员</Button>
                          </div>
                          <div>
                            <Button
                              type="primary"
                              size="large"
                              @click="toCopy(meeting.id)"
                            >复制</Button>
                            <Button
                              type="primary"
                              size="large"
                              v-if="meeting.allowUpdate"
                              @click="toEdit(meeting.id)"
                            >编辑</Button>
                            <Button
                              type="primary"
                              size="large"
                              v-if="meeting.allowDelete"
                              @click="cancelModal(meeting.id, meeting.name)"
                            >撤销</Button>
                          </div>
                        </div>
                      </i-col>
                    </Row>
                  </div>
                  <div v-show="isEdit">
                    <div cla>
                      <i-form
                        label-position="left"
                        :label-width="100"
                        class="default-form hide-upload"
                      >
                        <Upload
                          :show-upload-list="false"
                          :on-success="handleEditSuccess"
                          :format="['jpg','jpeg','png','gif']"
                          :max-size="2048"
                          multiple
                          action="/api/ueditor/index?action=uploadfile&encode=utf-8"
                        >
                          <Button icon="ios-cloud-upload-outline"></Button>
                        </Upload>
                        <div class="form-group">
                          <FormItem label="会议记录" class="default-form-item default-member-form">
                            <quillEditor
                              :options="editorOptions"
                              v-model="editorValue"
                              ref="QuillEditors"
                            ></quillEditor>
                          </FormItem>
                        </div>
                        <!-- <div class="form-group">
                          <FormItem label="附件" class="default-form-item default-member-form">
                            <Upload action="ueditor/index?action=uploadfile&encode=utf-8">
                              <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
                            </Upload>
                          </FormItem>
                        </div>-->
                      </i-form>
                      <div style="display:flex;justify-content:space-between">
                        <div style="display:flex">
                          <Upload
                            action="/api/ueditor/index?action=uploadfile&encode=utf-8"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :before-upload="beforeUpload"
                            :show-upload-list="false"
                          >
                            <Button icon="ios-cloud-upload-outline">上传附件</Button>
                          </Upload>
                          <div class="up_text">
                            <a href="javascript:;">{{ fileName }}</a>
                            <Icon type="close-circled" class="del_icon" @click="deleteFile"></Icon>
                            <!-- <Icon type="close-circled"></Icon> -->
                          </div>
                        </div>

                        <div class="g-ta-r">
                          <Button
                            type="ghost"
                            size="large"
                            @click="cancel"
                            :loading="saveLoading"
                          >取消</Button>
                          <Button
                            type="primary"
                            size="large"
                            @click="save"
                            :loading="saveLoading"
                          >保存</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="tableConf.length" class="empty-data">没有会议</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal v-model="isUndo" class-name ok-text="确定撤销" :closable="false" @on-ok="cancelMeeting">
      <h2 slot="header">撤销会议</h2>
      <div>
        <p>
          确定撤销会议 "
          <span class="required-tag">{{waitUndoTit}}</span>"？
        </p>
      </div>
    </Modal>
    <Modal
      v-model="isModal"
      class-name
      ok-text="确定发送"
      :closable="false"
      @on-ok="sendMemo"
      :transfer="false"
      width="700"
    >
      <div>
        <i-form label-position="left" :label-width="100" class="default-form">
          <div class="form-group">
            <div>
              <FormItem label="会议人员" class="default-form-item default-member-form">
                <div class="default-form-member-selection">
                  <!--<common-member :users="meeting.userItems" :can-exit="false" :is-edit="false"></common-member>-->
                  <common-member-ii
                    :users="meeting.allUserItems"
                    :can-exit="false"
                    :is-edit="false"
                  ></common-member-ii>
                </div>
              </FormItem>
            </div>
            <div>
              <FormItem label="会议记录接收者" class="default-form-item default-member-form">
                <div class="default-form-member-selection">
                  <!--<common-member :users="meeting.userItems" :can-exit="false" :is-edit="false"></common-member>-->
                  <common-member-ii content="选择会议接收人员" :users="memoReceivers" multi></common-member-ii>
                </div>
              </FormItem>
            </div>
            <div>
              <FormItem label="会议记录接收者" class="default-form-item default-member-form">
                <div class="default-form-member-selection" style="padding:0">
                  <i-input v-model="outMember"></i-input>
                </div>
              </FormItem>
            </div>
          </div>
        </i-form>
      </div>
    </Modal>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import { Schedule, Task } from "../../API/api";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import "vueditor/dist/style/vueditor.min.css";
import CommonMemberIi from "../../components/CommonMemberii";
import SubHeader from "../../components/SubHeader";
import { ajax, downloadFile } from "../../util/util";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
  ["clean"] // remove formatting button
];
export default {
  components: {
    SubHeader,
    CommonMemberIi,
    Toast,
    // CommonMember,
    Loading,
    BCrumb,
    quillEditor
  },
  name: "meeting",
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
          label: "会议管理"
        }
      ],
      editorOptions: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 调用iview图片上传
                  document
                    .querySelector(".hide-upload .ivu-upload .ivu-btn")
                    .click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      editorValue: "",
      fileName: "",
      filePath: "",
      isUndo: false,
      meetingTypes: [],
      sortTh: null,
      memoId: null,
      isModal: false,
      memoReceivers: [],
      outMember: "",
      saveLoading: false,
      isEdit: false,
      editId: null,
      isToast: false,
      toastMsg: "",
      toastState: null,
      isLoading: false,
      waitUndoId: null,
      waitUndoTit: null,
      currType: 1,
      meetingTypeConf: [
        { id: 1, label: "我发起的会议" },
        { id: 4, label: "我参加的会议" }
        // {id: 2, label: '待参加会议'},
        // {id: 3, label: '往期会议'}
      ],
      pageConf: {
        type: 1,
        page: 1,
        pageSize: 25,
        orderBy: "startTime",
        asc: "desc",
        room: null,
        start_date: "",
        end_date: "",
        meeting_type: "",
        meeting_id: null
      },
      canSend: true,
      detailId: null,
      tableConf: [
        {
          title: "会议名称",
          asc: "desc",
          key: "name"
        },
        {
          title: "会议时间",
          asc: "desc",
          key: "startTime"
        },
        {
          title: "会议地点",
          asc: "desc",
          key: "roomName"
        },
        {
          title: "会议类型",
          asc: "desc",
          key: "type"
        },
        {
          title: "状态",
          asc: "desc",
          key: "statusString"
        }
      ],
      rooms: [],
      canLoadMore: true,
      dom: null,
      chDom: null,
      events: [],
      meeting: {},
      roomTypeList: [
        {
          value: 1,
          label: "内部会议"
        },
        {
          value: 2,
          label: "外出开会"
        },
        // {
        //   value: 3,
        //   label: "Concall"
        // }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$refs.vueditor) {
        vm.$refs.vueditor[0].setContent("");
      }
    });
  },
  methods: {
    init() {
      this.canLoadMore = true;
      this.getMeetingId();
      // this.getSchedule()
      this.setSideBar();
      this.getMeetingType();
      this.getRooms();
    },
    download(filePath, fileName) {
      window.open(`/api/task/filedownload?fileName=${encodeURIComponent(fileName)}&filePath=${filePath}`)
    },
    handleEditSuccess(res) {
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditors[0].quill;
      console.log(window.location.origin + res);

      this.$nextTick(() => {
        // 如果上传成功
        if (res) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片，res为服务器返回的图片链接地址
          quill.insertEmbed(length, "image", window.location.origin + res);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          // 提示信息，需引入Message
          Message.error("图片插入失败");
        }
      });
    },
    beforeUpload() {
      if (this.filePath) {
        this.isToast = true;
        this.toastMsg = "不能重复上传附件";
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = "";
        }, 1500);
        return false;
      } else {
        return true;
      }
    },

    handleSuccess(res, file, fileList) {
      this.filePath = file.response;
      this.fileName = file.name;
      this.isToast = true;
      this.toastMsg = "上传成功";
      setTimeout(() => {
        this.isToast = false;
        this.toastMsg = "";
      }, 1500);
    },
    handleError() {
      this.isToast = true;
      this.toastMsg = "上传失败";
      setTimeout(() => {
        this.isToast = false;
        this.toastMsg = "";
      }, 1500);
    },
    deleteFile() {
      this.filePath = "";
      this.fileName = "";
    },
    toEdit(id, type) {
      this.$router.push({
        path: "/schedule/edit/" + id,
      });
    },
    toCopy(id, type) {
      this.$router.push({
        path: "/schedule/copy/" + id,
      });
    },
    cancelModal(id, name) {
      this.isUndo = true;
      this.waitUndoId = id;
      this.waitUndoTit = name;
    },
    cancelMeeting() {
      ajax
        .post(Schedule.cancel, { id: this.waitUndoId })
        .then(res => {
          console.log(res);
          this.isToast = true;
          this.toastMsg = "取消会议成功";
          this.toastState = "success";
          setTimeout(() => {
            this.isToast = false;
            this.pageConf.page = 1;
            this.getSchedule();
          }, 1500);
        })
        .catch(err => {
          this.isToast = true;
          this.toastState = null;
          this.toastMsg = err.toString();
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        })
        .finally(() => {});
    },
    changeCate() {
      this.getSchedule();
      this.pageConf.meeting_id = null;
    },
    changeRoom() {
      this.getSchedule();
      this.pageConf.meeting_id = null;
    },
    selectDate(arr) {
      this.pageConf.meeting_id = null;
      this.pageConf.start_date = new Date(arr[0]).getTime() / 1000;
      this.pageConf.end_date = new Date(arr[1]).getTime() / 1000;
      this.getSchedule();
    },
    setSideBar() {
      sessionStorage.setItem("subMenu", "schedule/meeting");
      this.$store.dispatch("setCurrSubMenu", "schedule/meeting");
      // this.$store.dispatch('setOpenedSub', 'schedule')
      // sessionStorage.setItem('openedSub', 'schedule')
    },
    getMeetingType() {
      this.meetingMate = [];
      this.$http
        .post(Schedule.meetingType, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          if (_data.retCode === 0) {
            this.meetingTypes = _data.retData.concat([{ name: "其他" }]);
          }
        });
    },
    getRooms() {
      this.$http
        .post(Schedule.meetingRooms, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.rooms = _data.retData;
          }
        });
    },
    getMeetingId() {
      this.pageConf.meeting_id = this.$route.params.meetingId;
      if (this.pageConf.meeting_id) {
        this.pageConf.type = null;
      }
      this.getSchedule();
    },
    sortData(idx) {
      let key = this.tableConf[idx].key;
      this.sortTh = idx;
      const asc = this.tableConf[idx].asc;
      if (asc === "desc") {
        this.tableConf[idx].asc = "asc";
      } else {
        this.tableConf[idx].asc = "desc";
      }
      // if (this.sortTh === idx) {
      //   const asc = this.tableConf[idx].asc
      //   if (asc === 'desc') {
      //     this.tableConf[idx].asc = 'asc'
      //   } else {
      //     this.tableConf[idx].asc = 'desc'
      //   }
      // } else {
      //   this.sortTh = idx
      // }
      let data = this.pageConf;
      if (key === "roomName") {
        data.orderBy = "room";
      } else if (key === "statusString") {
        data.orderBy = "status";
      } else {
        data.orderBy = key;
      }
      data.asc = this.tableConf[idx].asc;
      data.page = 1;
      this.pageConf = data;
      this.getSchedule();
    },
    save() {
      this.saveLoading = true;
      const memo = this.editorValue;
      const filePath = this.filePath;
      const fileName = this.fileName;
      this.$http
        .post(
          Schedule.updatememo,
          this.qs.stringify({ id: this.editId, memo, filePath, fileName }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          const _data = res.data;
          this.isToast = true;
          if (_data.retCode === 0) {
            this.toastMsg = "保存成功";
            this.toastState = "success";
          } else {
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.isToast = false;
            this.saveLoading = false;
            if (_data.retCode === 0) {
              // this.$router.back()
              this.isEdit = false;
              this.getDetail();
            }
          }, 1500);
        })
        .catch(() => {
          this.saveLoading = true;
          this.isToast = true;
          this.toastMsg = "网络错误";
          this.toastState = null;
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    cancel() {
      this.isEdit = false;
      this.editId = null;
      this.editorValue = this.memo;
      this.fileName = "";
      this.filePath = "";
    },
    getDetail() {
      this.editorValue = "";
      this.filePath = "";
      this.fileName = "";
      this.meeting = {};
      this.memo = "";

      const memoTpl = `
<div>
  <p>工作项目分拆 Work Breakdown：</p>
  <p>任务 Task：</p>
  <p>直接负责人 Directly Responsible Individual：</p>
  <p>上线日期 Launch Day：</p>
  <p>结论及下一步 Alignment & Follow ups：</p>
  <p>反馈及进一步优化 Comments & Follow ups：</p>
  <p>问题及帮助 Highlight & Support Needed：</p>
  <p>其他备注 Remark：</p>
</div>
`;
      const _self = this;
      this.isLoading = true;
      this.$http
        .post(
          Schedule.meetingDetail,
          this.qs.stringify({ id: this.detailId }),
          { headers: { Authorization: "Bearer " + this.$cookie.get("token") } }
        )
        .then(res => {
          this.isLoading = false;
          const _data = res.data;
          if (_data.retCode === 0) {
            this.meeting = _data.retData;
            this.memo = _data.retData.memo;
            setTimeout(() => {
              this.editorValue = _data.retData.memo || memoTpl;
              this.fileName = _data.retData.fileName || "";
              this.filePath = _data.retData.filePath || "";
              // _self.$refs.vueditor[0].setContent(memoContent)
            }, 0);
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    toMemo(item) {
      // this.$router.push('memo/' + id)
      this.isEdit = true;
      this.editId = item.id;
    },
    toggleRow(id) {
      this.isEdit = false;
      if (this.detailId === id) {
        this.detailId = null;
      } else {
        this.detailId = null;
        setTimeout(() => {
          this.detailId = id;
          this.getDetail();
        }, 0);
      }
    },
    changeType(id) {
      this.$router.replace("/schedule/meeting");
      this.currType = id;
      this.pageConf.type = id;
      this.pageConf.page = 1;
      this.pageConf.meeting_id = null;
      this.getSchedule();
    },
    getSchedule() {
      this.isLoading = true;
      this.$http
        .post(Schedule.manage, this.qs.stringify(this.pageConf), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            if (this.pageConf.page === 1) {
              this.events = _data.retData.data;
            } else {
              if (_data.retData.data.length > 0) {
                this.events = this.events.concat(_data.retData.data);
              } else {
                this.pageConf.page--;
                if (this.pageConf.page <= 0) {
                  this.pageConf.page = 1;
                }
              }
            }
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
            this.toastState = null;
          }
          setTimeout(() => {
            this.isToast = false;
          }, 1500);
        });
    },
    sendMemo() {
      const userList = this.memoReceivers.map(item => {
        return item.id;
      });
      const contactInfo = this.outMember.split(";");
      if (this.canSend) {
        this.canSend = false;
        this.$http
          .post(
            Schedule.sendMemo,
            this.qs.stringify({ id: this.memoId, userList, contactInfo }),
            {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") }
            }
          )
          .then(res => {
            this.canSend = true;
            const _data = res.data;
            this.isToast = true;
            if (_data.retCode === 0) {
              this.toastMsg = "发送成功";
              this.toastState = "success";
            } else {
              this.toastMsg = _data.retMsg;
              this.toastState = null;
            }
            setTimeout(() => {
              this.isToast = false;
            }, 1500);
          })
          .catch(() => {
            this.canSend = true;
            this.isToast = true;
            this.toastMsg = "网络错误";
            this.toastState = null;
            setTimeout(() => {
              this.isToast = false;
            }, 1500);
          });
      }
    },
    sendMemoConfirm(id) {
      this.isModal = true;
      this.memoId = id;
      // this.memoReceivers = JSON.parse(JSON.stringify(this.meeting.allUserItems))
      this.memoReceivers = this.meeting.allUserItems.map(item => {
        return item;
      });
      this.outMember = this.meeting.contactInfo
        ? JSON.parse(this.meeting.contactInfo).join(";")
        : "";
    },
    scrollHandler() {
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
        this.pageConf.page++;
        this.getSchedule();
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
    this.init();
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
<style lang="less">
.meeting {
  .ql-editor {
    height: 300px;
  }
  .hide-upload {
    .ivu-upload {
      display: none;
    }
  }
  .meeting-memo-area {
    max-height: 400px;
    line-height: normal;
    padding-top: 16px;
    padding-bottom: 16px;
    overflow: auto;
    img {
      max-width: 100%;
    }
  }
}
</style>
<style scoped lang="less">
.up_text {
  display: flex;
  margin-left: 10px;
  .del_icon {
    display: none;
    margin-left: 5px;
  }
  &:hover {
    .del_icon {
      display: inline-block;
    }
  }
}
.addBtn {
  text-align: right;
  margin-bottom: 16px;
  a {
    background-color: #2d8ef8;
    display: inline-block;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
  }
}
.result-list {
  position: relative;
}
.list-detail {
  position: relative;
  padding: 16px;
  background-color: #ced4da;
  > div {
    padding: 32px;
    background-color: #fff;
    margin-bottom: 16px;
  }
}
.meeting-btns {
  /*text-align: right;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editor {
  height: 300px;
}
.meeting-filter {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > div {
    flex: 1;
    margin-right: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > label {
      margin-right: 16px;
    }
    > div {
      flex: 1;
    }
  }
}
</style>
<style lang="less">
.meeting-default {
  .ivu-select-input {
    font-size: 14px !important;
  }
  .ivu-select-selected-value {
    font-size: 14px !important;
  }
  .ivu-select-placeholder {
    font-size: 14px !important;
  }

  .el-cascader {
    display: block;
    line-height: 53px;
  }

  .el-input__inner {
    border: none;
  }

  .el-cascader__search-input {
    margin: 0;
  }

  .ivu-select-disabled .ivu-select-selection {
    background-color: #fff !important;
  }
  .ivu-select-selected-value {
    color: #66707a !important;
  }
}
</style>

