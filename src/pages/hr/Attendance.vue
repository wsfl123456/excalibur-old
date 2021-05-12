<template>
  <div class="attendance">
    <a :href="downloadUrl" download style="display: none" ref="downloadFile"
      >导出</a
    >
    <div v-if="status === '考勤记录'" class="filter">
      <div class="date">
        <div>时间</div>
        <div>
          <DatePicker
            class="datePicker-icon"
            :value="staffFormValue.start_date"
            type="date"
            format="yyyy-MM-dd"
            split-panels
            @on-change="changeDate($event, 'staffFormValue', 'start_date')"
            placeholder="请选择开始时间"
            style="width: 180px"
          ></DatePicker>
          <span>—</span>
          <DatePicker
            class="datePicker-icon"
            :value="staffFormValue.end_date"
            type="date"
            format="yyyy-MM-dd"
            split-panels
            @on-change="changeDate($event, 'staffFormValue', 'end_date')"
            placeholder="请选择结束时间"
            style="width: 180px"
          ></DatePicker>
        </div>
      </div>
      <div>
        <div>事业部</div>
        <div>
          <el-select
            v-model="staffFormValue.team_id"
            style="width: 180px"
            placeholder="请选择事业部"
            :clearable="false"
            @change="teamChange"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, index) in teamList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div>员工</div>
        <div>
          <el-select
            v-model="staffFormValue.user_id"
            style="width: 180px"
            placeholder="搜索选择员工"
            filterable
            :clearable="false"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, index) in staffList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="btn">
        <Button type="primary" icon="archive" @click="exportExecl('staff')"
          >导出</Button
        >

        <!-- <a
          v-download="downloadUrl"
          :href="downloadUrl"
          download
          style="display: none"
          >导出</a
        > -->
      </div>
      <Upload
        class="btn"
        name="excelFile"
        :action="attendApi"
        accept=".xlsx, .xls"
        :headers="{ Authorization: 'Bearer ' + $cookie.get('token') }"
        :on-success="uploadSuccess"
        :show-upload-list="false"
      >
        <Button type="primary" icon="upload">导入</Button>
      </Upload>
      <div class="btn">
        <Button
          type="primary"
          icon="search"
          @click="getStaffTableList('search')"
          >搜索</Button
        >
      </div>
    </div>
    <div v-else-if="status === '月度考勤'" class="filter">
      <div>
        <div>月份</div>
        <div class="date">
          <DatePicker
            class="datePicker-icon"
            v-model="teamFormValue.start_month"
            type="month"
            split-panels
            placeholder="请选择开始月份"
            style="width: 180px"
            @on-change="changeDate($event, 'teamFormValue', 'start_month')"
          ></DatePicker>
          <span>—</span>
          <DatePicker
            class="datePicker-icon"
            v-model="teamFormValue.end_month"
            type="month"
            split-panels
            placeholder="请选择结束月份"
            style="width: 180px"
            @on-change="changeDate($event, 'teamFormValue', 'end_month')"
          ></DatePicker>
        </div>
      </div>
      <div>
        <div>事业部</div>
        <div>
          <el-select
            v-model="teamFormValue.team_id"
            style="width: 180px"
            placeholder="请选择事业部"
            :clearable="false"
            @change="teamChange"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, index) in teamList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div>员工</div>
        <div>
          <el-select
            v-model="teamFormValue.user_id"
            style="width: 180px"
            placeholder="搜索选择员工"
            filterable
            :clearable="false"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, index) in staffList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="btn">
        <Button type="primary" icon="archive" @click="exportExecl('team')"
          >导出</Button
        >
      </div>
      <Upload
        class="btn"
        name="excelFile"
        :action="attendApi"
        accept=".xlsx, .xls"
        :headers="{ Authorization: 'Bearer ' + $cookie.get('token') }"
        :on-success="uploadSuccess"
        :show-upload-list="false"
      >
        <Button type="primary" icon="upload">导入</Button>
      </Upload>
      <div class="btn">
        <Button type="primary" icon="search" @click="getTeamTableList('search')"
          >搜索</Button
        >
      </div>
    </div>
    <div class="tabs">
      <RadioGroup
        v-model="status"
        type="button"
        @on-change="changeStatus()"
        size="large"
      >
        <Radio label="考勤记录"></Radio>
        <Radio label="月度考勤"></Radio>
      </RadioGroup>
    </div>
    <div style="position: relative; min-height: 300px">
      <loading v-if="isLoading"></loading>
      <div v-show="status === '考勤记录'" style="margin-top: 30px">
        <table class="main-list common-table">
          <thead>
            <tr>
              <th
                v-for="(item, index) in staffTableTile"
                :key="index"
                :style="item.width && { width: item.width + 'px' }"
                @click="sortStaffData(item, index)"
              >
                <div class="table-cell">
                  {{ item.title }}
                  <i
                    class="iconfont"
                    :class="{
                      'icon-sort_down': item.asc === 'desc',
                      'icon-sort_up': item.asc === 'asc',
                    }"
                  ></i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="staffTableList.length > 0">
            <template v-for="(item, index) in staffTableList">
              <tr>
                <td
                  v-for="(_item, _index) in staffTableTile"
                  :key="'td-' + index + '-' + _index"
                >
                  <template v-if="_item.key === 'taxi'">
                    <div class="table-cell td-cell">
                      {{ item.taxi ? "有" : "无" }}
                    </div>
                  </template>
                  <template v-else-if="_item.key === 'compensatedLeaveE2'">
                    <div
                      v-if="_item.dayType === item.dayType"
                      class="table-cell td-cell"
                    >
                      {{
                        Number(item.compensatedLeaveE2)
                          ? item.compensatedLeaveE2 + "天"
                          : Number(item.compensatedHour)
                          ? item.compensatedHour + "小时"
                          : "0.0"
                      }}
                    </div>
                    <div v-else class="table-cell td-cell">0.0</div>
                  </template>
                  <template v-else>
                    <div class="table-cell td-cell">{{ item[_item.key] }}</div>
                  </template>
                </td>
              </tr>
            </template>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="staffTableTile.length" class="empty-data">
                没有数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="status === '月度考勤'" style="margin-top: 30px">
        <table class="main-list common-table">
          <thead>
            <tr>
              <th
                v-for="(item, index) in teamTableTile"
                :key="index"
                :style="item.width && { width: item.width + 'px' }"
                @click="sortTeamData(item, index)"
              >
                <div class="table-cell">
                  {{ item.title }}
                  <i
                    class="iconfont"
                    :class="{
                      'icon-sort_down': item.asc === 'desc',
                      'icon-sort_up': item.asc === 'asc',
                    }"
                  ></i>
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="teamTableList.length > 0">
            <template
              v-for="(item, index) in teamTableList"
              style="position: relative"
            >
              <template v-for="(_item, _index) in item.result">
                <tr @click="toggleRow(item, _item, _index)">
                  <td
                    v-for="(_item_, _index) in teamTableTile"
                    :key="'td-' + index + '-' + _index"
                  >
                    <template
                      v-if="
                        _item_.key === 'userCode' ||
                        _item_.key === 'englishName' ||
                        _item_.key === 'teamName'
                      "
                    >
                      <div class="table-cell td-cell">
                        {{ item[_item_.key] }}
                      </div>
                    </template>
                    <template v-else-if="_item_.key === 'month'">
                      <div class="table-cell td-cell">
                        {{ _item[_item_.key] }}
                      </div>
                    </template>
                    <template v-else-if="_item_.belong === 'vacation'">
                      <div class="table-cell td-cell">
                        {{ _item.vacation[_item_.key] }}
                      </div>
                    </template>
                    <template v-else-if="_item_.belong === 'attendance'">
                      <div class="table-cell td-cell">
                        {{ _item.attendance[_item_.key] }}
                      </div>
                    </template>
                  </td>
                </tr>
                <tr v-if="detailIndex === _index && detailId === item.id">
                  <td :colspan="teamTableTile.length">
                    <div class="month-detail">
                      <div class="box">
                        <div class="title">
                          {{ monthDetailInfo.userName }}_{{
                            monthDetailInfo.month
                          }}_考勤详情
                        </div>
                        <div class="content">
                          <div>
                            <div class="label">日期</div>
                            <div class="list">
                              <div
                                v-for="(_item_, _index) in monthDetailList"
                                :key="_index"
                                :style="{ width: itemWidth }"
                              >
                                {{ _index + 1 }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="label">星期</div>
                            <div class="list">
                              <div
                                v-for="(_item_, _index) in monthDetailList"
                                :key="_index"
                                :style="{ width: itemWidth }"
                                :class="{
                                  gray:
                                    _item_.week == '六' || _item_.week == '日',
                                }"
                              >
                                {{ _item_.week }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="label">上午</div>
                            <div class="list">
                              <div
                                v-for="(_item_, _index) in monthDetailList"
                                :key="_index"
                                :style="{ width: itemWidth }"
                                :class="{ red: _item_.item[0] != '正常' }"
                              >
                                {{
                                  _item_.week == "六" || _item_.week == "日"
                                    ? _item_.item[0] == "正常"
                                      ? "/"
                                      : _item_.item[0]
                                    : _item_.item[0]
                                }}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="label">下午</div>
                            <div class="list">
                              <div
                                v-for="(_item_, _index) in monthDetailList"
                                :key="_index"
                                :style="{ width: itemWidth }"
                                :class="{ red: _item_.item[1] != '正常' }"
                              >
                                {{
                                  _item_.week == "六" || _item_.week == "日"
                                    ? _item_.item[1] == "正常"
                                      ? "/"
                                      : _item_.item[1]
                                    : _item_.item[1]
                                }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <loading
                        v-if="
                          detailLoading &&
                          detailIndex === _index &&
                          detailId === item.id
                        "
                      ></loading>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="teamTableTile.length" class="empty-data">
                没有数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>
<script>
import { Hoshin, Hr, Index, Task } from "../../API/api.js";
import Toast from "../../components/popup/Toast";
import Loading from "../../components/popup/Loading";
let staffTitle = [
  {
    title: "员工编号",
    key: "userCode",
    // asc: "desc",
    // orderBy: "userCode"
  },
  {
    title: "姓名",
    key: "userName",
    // asc: "desc",
    // orderBy: "userName"
  },
  {
    title: "事业部",
    key: "teamName",
    // asc: "desc",
    // orderBy: "teamId"
  },
  {
    title: "日期",
    key: "attendanceDate",
    // asc: "desc",
    // orderBy: "attendanceDate"
  },
  {
    title: "星期",
    key: "week",
    // asc: "desc",
    // orderBy: "attendanceDate"
  },
  {
    title: "上班",
    key: "startTime",
    width: 60,
  },
  {
    title: "下班",
    key: "endTime",
    width: 60,
  },
  {
    title: "迟到\n(分)",
    key: "lateMinute",
    width: 60,
  },
  {
    title: "早退\n(分)",
    key: "earlyMinute",
    width: 60,
  },
  {
    title: "加班\n(时)",
    key: "overtimeHour",
    width: 60,
  },
  {
    title: "外出",
    key: "outMinute",
  },
  {
    title: "餐补",
    key: "mealMoney",
    width: 60,
  },
  {
    title: "工作调休\n(天)",
    key: "compensatedLeaveE2",
    dayType: "work",
    width: 60,
  },
  {
    title: "周末调休",
    key: "compensatedLeaveE2",
    dayType: "week",
    width: 60,
  },
  {
    title: "打车",
    key: "taxi",
  },
];
let teamTitle = [
  {
    title: "员工编号",
    key: "userCode",
    // asc: "desc",
    // orderBy: "userCode"
  },
  {
    title: "姓名",
    key: "englishName",
    // asc: "desc",
    // orderBy: "userName"
  },
  {
    title: "事业部",
    key: "teamName",
    // asc: "desc",
    // orderBy: "teamId"
  },
  {
    title: "月份",
    key: "month",
    // asc: "desc",
    // orderBy: "month"
  },
  {
    title: "带薪病假(天)",
    key: "sickLeaveE2",
    belong: "vacation",
    width: 60,
  },
  {
    title: "普通病假(天)",
    key: "sick2LeaveE2",
    belong: "vacation",
    width: 60,
  },
  {
    title: "事假(天)",
    key: "leaveE2",
    belong: "vacation",
    width: 60,
  },
  {
    title: "婚丧假(天)",
    key: "otherLeaveE2",
    belong: "vacation",
    width: 60,
  },
  {
    title: "调休(天)",
    key: "compensatedLeaveE2",
    belong: "vacation",
  },
  {
    title: "旷工(天)",
    key: "absence",
    belong: "attendance",
    width: 60,
  },
  {
    title: "加班(时)",
    key: "overtimeHour",
    belong: "attendance",
    width: 60,
  },
  {
    title: "餐补",
    key: "mealMoney",
    belong: "attendance",
    width: 60,
  },
  {
    title: "可用调休(天)",
    key: "compensatedLeaveE2",
    belong: "attendance",
  },
  {
    title: "出勤合计(天)",
    key: "day",
    belong: "attendance",
  },
];
export default {
  components: {
    Toast,
    Loading,
  },
  // directives: {
  //   download: {
  //     update(el, bind) {
  //       if (bind.value) {
  //         el.click();
  //       }
  //     },
  //   },
  // },
  data() {
    return {
      isToast: false,
      isLoading: false,
      detailLoading: false,
      toastMsg: null,
      canLoadMore: true,
      detailIndex: null,
      detailId: null,
      attendApi: "/" + Hr.attendImport,
      pageData: {
        page: 1,
        pageSize: 25,
        orderBy: "createTime",
        asc: "desc",
      },
      status: "考勤记录",
      staffFormValue: {
        start_date: null,
        end_date: null,
        team_id: 0,
        user_id: 0,
      },
      teamFormValue: {
        start_month: null,
        end_month: null,
        team_id: 0,
        user_id: 0,
      },
      teamList: [],
      staffList: [],
      staffTableList: [],
      staffTableTile: JSON.parse(JSON.stringify(staffTitle)),
      teamTableList: [],
      teamTableTile: JSON.parse(JSON.stringify(teamTitle)),
      monthDetailList: [],
      monthDetailInfo: {
        userName: null,
        month: null,
      },
      itemWidth: null,
      downloadUrl: "",
    };
  },
  methods: {
    teamChange(e) {
      const teamName = this.teamList.find((v) => v.id === e).name;
      this.staffFormValue.user_id = 0;
      this.teamFormValue.user_id = 0;
      this.staffList = [];
      this.getStaffList(teamName);
    },
    removeEmpty(type, val) {
      return this[type][val] ? `&${val}=${this[type][val]}` : ``;
    },
    uploadSuccess(res) {
      let _data = res;
      if (_data.retCode === 0) {
        this.toastMsg = "导入成功";
        this.toastState = "success";
      } else {
        this.toastState = null;
        this.toastMsg = _data.retMsg;
      }
      this.isToast = true;
      setTimeout(() => {
        this.isToast = false;
        this.toastState = null;
        this.toastMsg = null;
        if (_data.retCode === 100014) {
          this.$cookie.delete("token");

          this.$router.push("/");
        }
        if (_data.retCode === 0) {
          this.pageData.page = 1;
          this.getStaffTableList();
          this.getTeamTableList();
        }
      }, 1500);
    },
    toggleRow(item, _item, index) {
      if (this.detailIndex === null) {
        this.detailIndex = index;
        this.detailId = item.id;
        this.monthDetailInfo.userName = item.userName;
        this.monthDetailInfo.month = _item.month;
        this.getMonthDetail(item.id);
      } else if (this.detailIndex !== null && this.detailIndex === index) {
        this.detailIndex = null;
        this.detailId = null;
      } else {
        this.detailIndex = index;
        this.detailId = item.id;
        this.monthDetailInfo.userName = item.userName;
        this.monthDetailInfo.month = _item.month;
        this.getMonthDetail(item.id);
      }
    },
    changeStatus() {
      this.detailIndex = null;
      this.pageData = {
        page: 1,
        pageSize: 25,
        orderBy: "createTime",
        asc: "desc",
      };
      this.staffFormValue = {
        start_date: null,
        end_date: null,
        team_id: 0,
        user_id: 0,
      };
      this.teamFormValue = {
        start_month: null,
        end_month: null,
        team_id: 0,
        user_id: 0,
      };
      this.staffTableTile = JSON.parse(JSON.stringify(staffTitle));
      this.teamTableTile = JSON.parse(JSON.stringify(teamTitle));
    },
    changeDate(e, data, prop) {
      if (data === "staffFormValue") {
        this[data][prop] = e;
      } else {
        this[data][prop] = e.split("-").join("");
      }
    },
    exportExecl(type) {
      this.downloadUrl = "";
      if (type == "staff") {
        if (this.staffFormValue.start_date && this.staffFormValue.end_date) {
          const newParams = {
            start_date: this.staffFormValue.start_date,
            end_date: this.staffFormValue.end_date,
            teamId: this.staffFormValue.team_id,
            userId: this.staffFormValue.user_id,
          };
          this.$http
            .post(Task.exportattendancenew, this.qs.stringify(newParams), {
              headers: { Authorization: "Bearer " + this.$cookie.get("token") },
            })
            .then((res) => {
              if (res.data.retCode === 0) {
                this.downloadUrl = res.data.retData.download_url;
              } else {
                this.isToast = true;
                this.toastMsg = res.data.retMsg;
                setTimeout(() => {
                  this.isToast = false;
                  this.toastMsg = null;
                }, 1500);
              }
            });
        } else {
          this.isToast = true;
          this.toastMsg = "请选择时间段";
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
          }, 1500);
        }
      } else {
        /* 只能导出一个月的数据 */
        if (!this.teamFormValue.start_month || !this.teamFormValue.end_month) {
          this.isToast = true;
          this.toastMsg = "请选择月份";
          setTimeout(() => {
            this.isToast = false;
            this.toastMsg = null;
          }, 1500);
        } else {
          if (this.teamFormValue.start_month === this.teamFormValue.end_month) {
            const monthParams = {
              pageSize: 1000, //固定传1000
              year_month: this.teamFormValue.start_month,
              teamId: this.teamFormValue.team_id,
              userId: this.teamFormValue.user_id,
            };
            this.$http
              .post(
                Task.exportattendancemonth,
                this.qs.stringify(monthParams),
                {
                  headers: {
                    Authorization: "Bearer " + this.$cookie.get("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.retCode === 0) {
                  this.downloadUrl = res.data.retData.download_url;
                } else {
                  this.isToast = true;
                  this.toastMsg = res.data.retMsg;
                  setTimeout(() => {
                    this.isToast = false;
                    this.toastMsg = null;
                  }, 1500);
                }
              });
          } else {
            this.isToast = true;
            this.toastMsg = "只能导出一个月的数据";
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
            }, 1500);
          }
        }
      }
    },
    sortStaffData(item, index) {
      if (item.asc === "desc") {
        this.staffTableTile.forEach((element) => {
          if (element.asc) {
            element.asc = "desc";
          }
        });
        item.asc = "asc";
        this.pageData = {
          page: 1,
          pageSize: 25,
          orderBy: item.orderBy,
          asc: "asc",
        };
        this.getStaffTableList();
      } else if (item.asc === "asc") {
        this.staffTableTile.forEach((element) => {
          if (element.asc) {
            element.asc = "desc";
          }
        });
        item.asc = "desc";
        this.pageData = {
          page: 1,
          pageSize: 25,
          orderBy: item.orderBy,
          asc: "desc",
        };
        this.getStaffTableList();
      }
    },
    sortTeamData(item, index) {
      if (item.asc === "desc") {
        this.teamTableTile.forEach((element) => {
          if (element.asc) {
            element.asc = "desc";
          }
        });
        item.asc = "asc";
        this.pageData = {
          page: 1,
          pageSize: 25,
          orderBy: item.orderBy,
          asc: "asc",
        };
        this.getTeamTableList();
      } else if (item.asc === "asc") {
        this.teamTableTile.forEach((element) => {
          if (element.asc) {
            element.asc = "desc";
          }
        });
        item.asc = "desc";
        this.pageData = {
          page: 1,
          pageSize: 25,
          orderBy: item.orderBy,
          asc: "desc",
        };
        this.getTeamTableList();
      }
    },
    getStaffTableList(type) {
      type === "search" && (this.pageData.page = 1);
      this.isLoading = true;
      let formData = Object.assign(
        JSON.parse(JSON.stringify(this.pageData)),
        JSON.parse(JSON.stringify(this.staffFormValue))
      );
      this.$http
        .post(Hr.attend, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            // if (this._.isEmpty(_data.retData)) {
            //   this.needPwd = true;
            // }
            if (this.pageData.page === 1) {
              this.staffTableList = _data.retData.data || [];
            } else {
              this.staffTableList = this.staffTableList.concat(
                _data.retData.data
              );
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true;
              this.toastMsg = "没有更多";
              this.pageData.page--;
            }
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
    getTeamTableList(type) {
      type === "search" && (this.pageData.page = 1);
      this.isLoading = true;
      this.detailIndex = null;
      let formData = Object.assign(
        JSON.parse(JSON.stringify(this.pageData)),
        JSON.parse(JSON.stringify(this.teamFormValue))
      );
      this.$http
        .post(Hr.monthlist, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.isLoading = false;
          let _data = res.data;
          if (_data.retCode === 0) {
            // if (this._.isEmpty(_data.retData)) {
            //   this.needPwd = true;
            // }
            if (this.pageData.page === 1) {
              this.teamTableList = _data.retData.data || [];
            } else {
              this.teamTableList = this.teamTableList.concat(
                _data.retData.data
              );
            }
            if (!_data.retData.data || _data.retData.data.length === 0) {
              this.isToast = true;
              this.toastMsg = "没有更多";
              this.pageData.page--;
            }
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
    getMonthDetail(user_id) {
      this.detailLoading = true;
      let formData = {
        user_id: user_id,
        month: this.monthDetailInfo.month.split("-").join(""),
      };
      this.$http
        .post(Hr.monthdetail, this.qs.stringify(formData), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.monthDetailList = res.data.retData;
          this.itemWidth = 100 / this.monthDetailList.length + "%";
          this.detailLoading = false;
        });
    },
    getTeamList() {
      this.$http
        .post(Hoshin.list, this.qs.stringify(), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.teamList = res.data.retData.data;
        });
    },
    getStaffList(teamName) {
      const params = teamName ? { teamName } : {};
      this.$http
        .post(Index.allUsers, this.qs.stringify(params), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") },
        })
        .then((res) => {
          this.staffList = res.data.retData.data;
        });
    },
    scrollHandler() {
      if (
        this.canLoadMore &&
        this.dom.scrollTop + this.dom.offsetHeight >= this.chDom.offsetHeight &&
        !this.isLoading
      ) {
        this.pageData.page++;
        if (this.status === "考勤记录") {
          this.getStaffTableList({ page: this.pageData.page });
        } else if (this.status === "月度考勤") {
          this.getTeamTableList({ page: this.pageData.page });
        }
      }
    },
    loadMore() {
      this.dom.addEventListener("scroll", this.scrollHandler);
    },
    unbindLoadMore() {
      this.dom.removeEventListener("scroll", this.scrollHandler);
    },
  },
  created() {
    this.getTeamList();
    this.getStaffTableList();
    this.getStaffList();
  },
  beforeDestroy() {
    this.canLoadMore = false;
    this.unbindLoadMore();
  },
  mounted() {
    this.dom = document.getElementById("main-pages");
    this.chDom = document.getElementById("main-content");
    this.loadMore();
  },
  watch: {
    status: {
      handler(status) {
        if (status === "月度考勤") {
          this.getTeamTableList();
        } else if (status === "考勤记录") {
          this.getStaffTableList();
        }
      },
      // immediate: true
    },
    downloadUrl: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.downloadFile.click();
            // this.downloadUrl = '';
          });
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
.attendance {
  .filter {
    overflow: hidden;
    font-size: 14px;
    & > div {
      float: left;
      margin-left: 10px;
      height: 53px;
    }
    & > div:first-child {
      margin-left: 0;
    }
    .btn {
      display: flex;
      align-items: flex-end;
      float: right;
    }
    .date {
      span {
        color: #ced4da;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }
  .tabs {
    margin-top: 30px;
    font-size: 15px;
  }
  .table-cell {
    padding-left: 5px !important;
    padding-right: 0 !important;
  }
  .month-detail {
    position: relative;
    border: 20px solid #f8f9fa;
    padding: 20px;
    background-color: white;
    .box {
      border: 1px solid #ced4da;
      border-radius: 4px;
      width: 100%;
      .title {
        font-size: 16px;
        color: #343a40;
        letter-spacing: 0;
        text-align: center;
        background-color: #f8f9fa;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ced4da;
      }
      .content > div {
        display: flex;
        border-bottom: 1px solid #ced4da;
        &:last-child {
          border-bottom: none;
        }
        .label {
          height: 36px;
          line-height: 36px;
          background-color: #f8f9fa;
          width: 58px;
          text-align: center;
          font-size: 12px;
          color: #868e96;
          border-right: 1px solid #ced4da;
        }
        .list {
          flex: 1;
          display: flex;
          .gray {
            background-color: #f8f9fa;
          }
          .red {
            color: #ff6666;
          }
          div {
            height: 36px;
            line-height: 36px;
            text-align: center;
            border-right: 1px solid #ced4da;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.attendance {
  .filter {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    .el-input__icon {
      line-height: 32px;
    }

    .ivu-select-dropdown {
      z-index: 2008;
    }
  }
}
</style>







