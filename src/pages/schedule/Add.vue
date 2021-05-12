<template>
  <div class="edit-form meeting-default">
    <Card class="form-card">
      <h2 slot="title">发起会议</h2>
      <div>
        <i-form label-position="left" :label-width="120" class="default-form">
          <div class="form-group">
            <div>
              <FormItem label="会议名称" class="default-form-item" required>
                <i-input v-model="meetingValues.name" placeholder="填写会议名称（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="重复类型" class="default-form-item" required>
                <RadioGroup
                  v-model="repeatType"
                  size="large"
                  class="default-form-radio-group"
                  @on-change="repeatTypeChange"
                >
                  <Radio label="0" class="default-form-radio" style="width: 50%">单次会议</Radio>
                  <Radio label="1" class="default-form-radio" style="width: 50%">固定会议</Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <div>
              <Row>
                <i-col span="16" class="default-form-member-col">
                  <FormItem label="会议开始时间" class="default-form-item default-member-form" required>
                    <DatePicker
                      :value="meetingDate"
                      :multiple="timeMultiple"
                      type="date"
                      class="deadline no-need-confirm-datepicker"
                      format="yyyy-MM-dd HH:mm"
                      :placeholder="repeatType == '0' ? '选择会议时间（必填）': '选择会议时间（固定会议单次最多可预定四次）'"
                      :options="DateOpt['default']"
                      :clearable="false"
                      @on-change="selectDate"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="8" class="default-form-member-col">
                  <FormItem label="会议时长" class="default-form-item default-member-form" required>
                    <InputNumber
                      :min="0.5"
                      :step="0.5"
                      v-model="meetingValues.hour"
                      :formatter="value => `${value}h`"
                      :parser="value => value.replace('h', '')"
                      placeholder="单位为小时，最少0.5"
                      :precision="1"
                    ></InputNumber>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="会议方式" class="default-form-item" required>
                    <i-select
                      v-model="meetingValues.roomType"
                      placeholder="请选择会议方式"
                      @on-change="roomTypeChange"
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
            <div v-if="meetingValues.roomType === 2 || meetingValues.roomType === 3">
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="会议地点" class="default-form-item" required>
                    <i-input v-model="meetingValues.roomDetail" placeholder="填写会议地点（必填）"></i-input>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div v-else>
              <Row>
                <i-col span="18" class="default-form-member-col">
                  <FormItem label="会议地点" class="default-form-item" required>
                    <i-select v-model="meetingValues.room" placeholder="选择会议地点（必填）">
                      <i-option v-for="item in rooms" :value="item.id" :key="item.id">{{item.name}}</i-option>
                    </i-select>
                  </FormItem>
                </i-col>
                <i-col span="6" class="default-form-member-col">
                  <div class="default-form-member-selection">
                    <router-link
                      :to="`/schedule/manage/${meetingValues.room}`"
                      target="_blank"
                    >查看会议室时间安排</router-link>
                  </div>
                </i-col>
              </Row>
            </div>
            <div>
              <Row>
                <i-col span="24" class="default-form-member-col">
                  <FormItem label="项目信息" class="default-form-item" required>
                    <Row>
                      <i-col span="12">
                        <i-select
                          v-model="meetingValues.customerId"
                          placeholder="品牌选择"
                          @on-change="changeCustomer"
                          filterable
                        >
                          <i-option
                            v-for="item in allCustomer"
                            :value="item.id"
                            :key="item.id"
                          >{{item.customerName}}</i-option>
                        </i-select>
                      </i-col>
                      <i-col span="12" class="default-form-member-col">
                        <i-select v-model="meetingValues.projectId" placeholder="项目选择" filterable>
                          <template v-if="meetingValues.customerId && allProject.length > 0">
                            <i-option
                              v-for="item in allProject"
                              :value="item.id"
                              :key="item.id"
                            >{{item.name}}</i-option>
                          </template>
                          <template v-else-if="!meetingValues.customerId">
                            <i-option disabled value="0">请选择品牌</i-option>
                          </template>
                          <template v-else>
                            <i-option disabled value="0">当前品牌没有项目</i-option>
                          </template>
                        </i-select>
                      </i-col>
                    </Row>
                  </FormItem>
                </i-col>
              </Row>
            </div>
            <div>
              <FormItem label="会议分类" class="default-form-item" required>
                <RadioGroup
                  v-model="meetingValues.type"
                  size="large"
                  class="default-form-radio-group"
                  @on-change="changeType"
                >
                  <Radio
                    v-for="(radioItem, radioIndex) in meetingTypeConf"
                    :key="radioIndex"
                    :label="radioItem.name"
                    class="default-form-radio"
                    style="width: 33.333%"
                  >{{radioItem.name}}</Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <div v-if="meetingValues.type === '其他'">
              <FormItem label="其他会议分类" class="default-form-item" required>
                <i-input v-model="meetingValues.oterTypeIpt" placeholder="填写其他会议分类（必填）"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="会议发起人" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <common-member :users="[userInfo]" :is-edit="false"></common-member>
                </div>
              </FormItem>
            </div>
            <div>
              <FormItem label="是否为全体会议" class="default-form-item" required>
                <RadioGroup
                  v-model="meetingValues.userRange"
                  size="large"
                  class="default-form-radio-group"
                  @on-change="userRangeChange"
                >
                  <Radio :label="998" class="default-form-radio" style="width: 50%">是</Radio>
                  <Radio :label="0" class="default-form-radio" style="width: 50%">否</Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <div v-if="meetingValues.userRange === 998">
              <FormItem label="群组邮箱" class="default-form-item" required>
                <i-input v-model="meetingValues.groupEmail" placeholder="填写群组邮箱 (多个邮箱使用;分割)"></i-input>
              </FormItem>
            </div>
            <div v-if="meetingValues.userRange === 0">
              <FormItem label="与会人员" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <!-- <common-member content="选择与会人员" multi @on-change="selectMember"></common-member> -->
                  <el-cascader
                    v-model="meetingValues.teamUserList"
                    placeholder="输入员工姓名或员工所在事业部搜索"
                    :options="userOptionList"
                    :props="{ multiple: true, expandTrigger: 'hover'  }"
                    :filter-method="filterMethod"
                    :show-all-levels="false"
                    filterable
                  ></el-cascader>
                </div>
              </FormItem>
            </div>
            <div>
              <FormItem label="外部用户" class="default-form-item">
                <i-input v-model="meetingValues.contactInfo" placeholder="填写外部用户邮箱 (多个邮箱使用;分割)"></i-input>
              </FormItem>
            </div>
            <div>
              <FormItem label="会议记录人员" class="default-form-item" required>
                <div class="default-form-member-selection">
                  <el-cascader
                    v-model="meetingValues.teamRecorder"
                    placeholder="输入员工姓名或员工所在事业部搜索"
                    :options="userOptionList"
                    :props="{ multiple: true, expandTrigger: 'hover'  }"
                    :filter-method="filterMethod"
                    :show-all-levels="false"
                    filterable
                  ></el-cascader>
                </div>
              </FormItem>
            </div>
          </div>
        </i-form>
      </div>
      <div>
        <i-form label-position="left" :label-width="100" class="default-form">
          <div class="form-group">
            <div v-if="meetingMate && meetingMate.length > 0">
              <FormItem label="资料清单" class="default-form-item">
                <RadioGroup
                  v-model="meetingValues.fileType"
                  size="large"
                  class="default-form-radio-group"
                >
                  <Radio
                    v-for="(radioItem, radioIndex) in meetingMate"
                    :key="radioIndex"
                    :label="radioItem.name"
                    class="default-form-radio"
                    style="width: 33.333%"
                  >{{radioItem.name}}</Radio>
                </RadioGroup>
              </FormItem>
            </div>
            <div>
              <FormItem label="Agenda" class="default-form-item" required>
                <i-input
                  v-model="meetingValues.agenda"
                  type="textarea"
                  :rows="10"
                  placeholder="填写会议议程"
                ></i-input>
              </FormItem>
            </div>
          </div>
        </i-form>
      </div>

      <div class="g-ta-r">
        <Button
          type="primary"
          class="submit-btn form-default-btn"
          size="large"
          @click.native="submit"
        >发起会议</Button>
      </div>
    </Card>
    <toast :msg="toastMsg" :status="toastStatus" :is-toast="isToast"></toast>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import BCrumb from "../../components/BCrumb";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
import CommonMember from "../../components/CommonMember";
import { Schedule } from "../../API/api";
import SubHeader from "../../components/SubHeader";

export default {
  components: {
    SubHeader,
    CommonMember,
    Toast,
    Loading,
    BCrumb
  },
  name: "add",
  data() {
    return {
      repeatType: "0",
      timeMultiple: false,
      meetingTypeIdx: null,
      rooms: [],
      crumb: [
        {
          label: "日程计划"
        },
        {
          label: "我的日程"
        },
        {
          label: "日程管理",
          url: "/schedule/manage"
        },
        {
          label: "发起会议"
        }
      ],
      errorKey: null,
      userInfo: {
        name: JSON.parse(localStorage.getItem("userInfo")).userName,
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        headPic: JSON.parse(localStorage.getItem("userInfo")).headPic
      },
      isLoading: false,
      toastMsg: null,
      toastStatus: null,
      isToast: false,
      meetingDate: null,
      meetingValues: {
        name: null,
        type: null,
        agenda: null,
        teamUserList: [],
        userList: [],
        startTimeArr: [],
        endTime: null,
        room: null,
        fileType: null,
        teamRecorder: [],
        recorder: [],
        customerId: null,
        projectId: null,
        oterTypeIpt: "",
        hour: 0.5,
        roomType: "1",
        roomDetail: "",
        contactInfo: "",
        userRange: 0,
        groupEmail: ""
      },
      errorMsg: {
        name: "请填写会议名称",
        startTimeArr: "请选择会议时间",
        hour: "请填写会议时长",
        type: "请选择会议分类",
        agenda: "请填写Agenda",
        room: "请填写会议地点",
        teamUserList: "请选择与会人员",
        sameTime: "会议开始时间不能等于结束时间",
        other: "请填写其他会议分类",
        number: "固定会议单次只能选择四次",
        teamRecorder: "请选择会议记录人员",
        customerId: "请选择品牌",
        projectId: "请选择项目",
        userRange: "请选择员工范围",
        groupEmail: "请填写群组邮箱"
      },
      DateOpt: {
        default: {},
        shortcuts: [
          "",
          function() {
            return 1;
          }
        ]
      },
      timeOpts: {
        steps: [1, 5]
      },
      customerConf: {
        page: 1,
        pageSize: 1000
      },
      projectConf: {
        page: 1,
        pageSize: 1000,
        customerId: null
      },
      allCustomer: [],
      noProject: [{ name: "无项目", id: 0 }],
      allProject: [],
      meetingTypeConf: [],
      meetingMate: [],
      meetingConf: {
        cates: [
          {
            id: "1",
            label: "WIP Meeting"
          },
          {
            id: "2",
            label: "Brief Meeting"
          },
          {
            id: "3",
            label: "Ideation Meeting"
          },
          {
            id: "4",
            label: "Rehearsal Meeting"
          },
          {
            id: "5",
            label: "Kick Off Meeting"
          }
        ],
        datasList: [
          {
            id: "1",
            label: "Final Proposal"
          },
          {
            id: "2",
            label: "WIP"
          },
          {
            id: "3",
            label: "Client Reference"
          },
          {
            id: "4",
            label: "Kick Off Check List"
          }
        ]
      },
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
      ],
      userOptionList: []
    };
  },
  created() {
    this.init();
  },
  watch: {
    "meetingValues.agenda": {
      handler(data) {
        data = data.replace(/\n/g, "<br/>");
        this.meetingValues.agendaRender = data;
      }
    }
  },
  methods: {
    init() {
      this.getAllteamuser();
      this.getMeetingType();
      this.getRooms();
      this.getCustomer();
    },
    filterMethod(node, key) {
      const key_word = node.data.label;
      const parent_key_word = node.parent.data.label;
      let re = new RegExp(key, "i");
      return re.test(key_word) || re.test(parent_key_word);
    },
    getAllteamuser() {
      this.$http
        .post(Schedule.allteamuser, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            const teamUser = _data.retData.data;
            teamUser.forEach((element, index) => {
              element.value = element.teamId;
              element.label = element.title;
              element.children = element.item;
              element.children.forEach((ele, ind) => {
                ele.value = ele.id;
                ele.label = ele.englishName;
              });
            });
            this.userOptionList = teamUser;
          }
        });
    },
    roomTypeChange() {
      this.meetingValues.roomDetail = "";
      this.meetingValues.room = null;
    },
    selectDate(date) {
      let _date = date;
      let newDate = [];
      let noTimeDate = [];

      if (date.indexOf("00:00") >= 0) {
        _date = date.replace("00:00", "10:00");
      }

      _date.split(",").forEach(ele => {
        if (newDate.join(",").indexOf(ele.substring(0, 10)) < 0) {
          newDate.push(ele);
        } else {
          let index = newDate.join(",").indexOf(ele.substring(0, 10));
          newDate.splice(index / 17, 1);
        }
      });

      this.meetingDate = newDate.join(",");
      this.meetingValues.startTimeArr = newDate;

      newDate.forEach(ele => {
        noTimeDate.push(ele.split(" ")[0]);
      });
      if (noTimeDate.length > 3) {
        this.DateOpt["default"] = {
          disabledDate(date) {
            try {
              let _year = date.getFullYear();
              let _month = date.getMonth() + 1;
              if (_month < 10) {
                _month = `0${_month}`;
              }
              let _day = date.getDate();
              if (_day < 10) {
                _day = `0${_day}`;
              }
              let _d = `${_year}-${_month}-${_day}`;
              return noTimeDate.indexOf(_d) < 0;
              throw new Error("");
            } catch (err) {}
          }
        };
      } else {
        this.DateOpt["default"] = {
          disabledDate(date) {
            return false;
          }
        };
      }
    },
    repeatTypeChange(type) {
      this.meetingDate = ""; //修改类型清空所选时间
      this.DateOpt["default"] = {
        //初始化可选日期
        disabledDate(date) {
          return false;
        }
      };
      this.meetingValues.startTimeArr = [];
      if (type == "0") {
        this.timeMultiple = false;
      } else {
        this.timeMultiple = true;
      }
    },
    userRangeChange() {
      this.meetingValues.teamUserList = [];
      this.meetingValues.userList = [];
      this.meetingValues.groupEmail = ""
    },
    changeCustomer(id) {
      this.projectConf.customerId = id;
      this.getProject();
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
    getProject(id) {
      this.$http
        .post(Schedule.allProject, this.qs.stringify(this.projectConf), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.allProject = this.noProject.concat(_data.retData.project_list);
          }
        });
    },
    getCustomer() {
      this.$http
        .post(Schedule.allCustomer, this.qs.stringify(this.customerConf), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;
          if (_data.retCode === 0) {
            this.allCustomer = _data.retData.customer_list.data;
          }
        });
    },
    changeType(e) {
      this.meetingValues.fileType = "";
      this.meetingTypeConf.forEach(item => {
        if (item.name === e) {
          this.meetingMate = item.materials;
        }
      });
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
            this.meetingTypeConf = _data.retData.concat([{ name: "其他" }]);
          }
        });
    },
    submit() {
      let canSubmit = true;
      let emptyKey = null;
      for (let key in this.errorMsg) {
        if (
          key !== "sameTime" &&
          key !== "number" &&
          key !== "projectId" &&
          key !== "room" &&
          key !== "userRange" &&
          key !== "teamUserList" &&
          key !== "groupEmail"
        ) {
          if (
            key !== "other" &&
            (!this.meetingValues[key] ||
              this.meetingValues[key] === "" ||
              this.meetingValues[key].length === 0)
          ) {
            emptyKey = key;
            canSubmit = false;
            break;
          }
        }
      }
      if (this.meetingValues.startTimeArr === this.meetingValues.endTime) {
        canSubmit = false;
        emptyKey = "sameTime";
      }
      if (
        this.meetingValues.type === "其他" &&
        this.meetingValues.oterTypeIpt === ""
      ) {
        canSubmit = false;
        emptyKey = "other";
      }

      if (this.meetingValues.projectId === null) {
        canSubmit = false;
        emptyKey = "projectId";
      }

      if (this.meetingValues.startTimeArr.length > 4) {
        canSubmit = false;
        emptyKey = "number";
      }

      if (!this.meetingValues.room && !this.meetingValues.roomDetail) {
        canSubmit = false;
        emptyKey = "room";
      }

      if (
        this.meetingValues.userRange !== 0 &&
        this.meetingValues.userRange !== 998
      ) {
        canSubmit = false;
        emptyKey = "userRange";
      }

      if (this.meetingValues.userRange === 998) {
        if (!this.meetingValues.groupEmail) {
          canSubmit = false;
          emptyKey = "groupEmail";
        }
      }

      if (
        !this.meetingValues.teamUserList.length &&
        this.meetingValues.userRange === 0
      ) {
        canSubmit = false;
        emptyKey = "teamUserList";
      }

      if (!canSubmit) {
        this.isToast = true;
        this.toastMsg = this.errorMsg[emptyKey];
        setTimeout(() => {
          this.isToast = false;
          this.toastMsg = null;
        }, 1500);
        return;
      }

      this.isLoading = true;
      let data = JSON.parse(JSON.stringify(this.meetingValues));
      if (this.meetingValues.type === "其他") {
        data.type = this.meetingValues.oterTypeIpt;
      }

      data.contactInfo = data.contactInfo.split(";");
      data.groupEmail = data.groupEmail.split(";");
      data.userList = data.teamUserList.map(e => e[1]);
      data.recorder = data.teamRecorder.map(e => e[1]);

      // console.log(this.meetingValues)

      this.$http
        .post(Schedule.add, this.qs.stringify(data), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            this.isToast = true;
            this.toastMsg = "会议发起成功";
            this.toastStatus = "success";
          } else {
            this.isToast = true;
            this.toastMsg = _data.retMsg;
            this.toastStatus = null;
          }
          setTimeout(() => {
            this.isToast = false;
            this.toastStatus = null;
            this.toastMsg = null;
            if (_data.retCode === 0) {
              this.$router.push("/schedule/meeting");
            } else if (_data.retCode === 100014) {
              this.$cookie.delete("token");

              this.$router.push("/");
            }
          }, 1500);
        })
        .catch(() => {
          this.isLoading = false;
          this.isToast = true;
          this.toastMsg = "网络错误";
          this.toastStatus = null;
          setTimeout(() => {
            this.isToast = false;
            this.toastStatus = null;
            this.toastMsg = null;
          }, 1500);
        });
    },
    selectMember(users) {
      this.meetingValues.userList = users.map(item => {
        return item.id;
      });
    },
    selectRecoder(users) {
      this.meetingValues.recorder = users.map(item => {
        return item.id;
      });
    }
  }
};
</script>

<style scoped lang="less">
.edit-form {
  .form-card {
    &:hover {
      box-shadow: 0 0 0;
    }
    .ivu-card-head {
      background-color: #f8f9fa;
      padding-left: 24px;
      padding-right: 24px;
      h2 {
        font-size: 14px;
        color: #343a40;
      }
    }
    .ivu-card-body {
      padding: 32px;
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
}
</style>