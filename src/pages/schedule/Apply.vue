<template>
  <div class="vacation">
    <div class="vaca-statis">
      <div class="vaca-statis-title">
        <h3>假期统计</h3>
        <div class="tips">
          <div class="tips-hover" @mouseenter="showTips=true" @mouseleave="showTips=false">
            <Icon type="information" size="20"></Icon>
          </div>
          <div class="tips-content" v-show="showTips">
            <div>
              <div>a) &nbsp;&nbsp; 系统显示的年假包含法定年假和公司福利年假，优先使用法定年假；</div>
              <div>b) &nbsp;&nbsp; 本年度可使用年假按当自然年年实际服务天数折算，系统显示假期为预期数据；</div>
              <div>c) &nbsp;&nbsp; 上年度剩余假期为上年度结余假期，本年度4月30号清零；</div>
              <div>d) &nbsp;&nbsp; 本年度可使用病假（带薪）按当自然年年实际服务天数折算，系统显示假期为预期数据；</div>
              <div>e) &nbsp;&nbsp; 可用调休为3个月内周末加班结余，3个月后未使用清零；</div>
              <div>f) &nbsp;&nbsp; 详请洽询人力资源辅导员；</div>
            </div>
          </div>
        </div>
      </div>
      <table class="vaca-statis-table">
        <tr>
          <th style="width:120px">类型</th>
          <th>事假</th>
          <th>病假（带薪）</th>
          <th>病假（普通）</th>
          <th>调休</th>
          <th>上年度剩余年假</th>
          <th>本年度可用年假</th>
          <th>婚假</th>
          <th>丧假</th>
          <th>产假</th>
          <th>陪产假</th>
        </tr>
        <tr>
          <td style="width:120px">今年已休</td>
          <td v-for="item in allVaca" :key="item.name">{{Number(item.used).toFixed(1)}}</td>
        </tr>
        <tr>
          <td style="width:120px">剩余可用</td>
          <td
            v-for="item in allVaca"
            :key="item.name"
          >{{item.free ? Number(item.free).toFixed(1) : '/'}}</td>
        </tr>
      </table>
    </div>
    <div class="apply">
      <h3>请假/调休</h3>
      <div>
        <i-form label-position="left" :label-width="120" class="default-form">
          <div class="new-form-group">
            <FormItem label="请假类型" class="new-default-form-item" required>
              <Row>
                <i-col span="16">
                  <RadioGroup :value="formValue.vacationType" size="large" @on-change="changeType">
                    <Radio
                      v-for="n in 4"
                      :key="n"
                      :label="vacaConf.type[n - 1].id"
                      class="new-default-form-radio"
                      style="width: 25%;height:40px"
                      :disabled="probationInfoEndOk === '0' && vacaConf.type[n - 1].checkPermission"
                    >
                    <Tooltip :disabled="probationInfoEndOk === '1' || !vacaConf.type[n - 1].checkPermission" style="width:100%">
                      <div>{{vacaConf.type[n - 1].label}}</div>
                      <div slot="content">
                        该请假类型暂时不可用
                      </div>
                    </Tooltip>
                    </Radio>
                  </RadioGroup>
                </i-col>
                <i-col span="8">
                  <Select
                    transfer
                    size="large"
                    :value="formValue.vacationType"
                    placeholder="请选择其他类型假期"
                    @on-change="changeType"
                  >
                    <Option
                      v-for="n in 6"
                      :value="vacaConf.type[n + 3].id"
                      :key="n + 3"
                    >{{ vacaConf.type[n + 3].label }}</Option>
                  </Select>
                </i-col>
              </Row>
            </FormItem>
            <Row v-show="formValue.vacationType == 4">
              <i-col span="20" class="default-form-member-col">
                <FormItem label="可用调休时间" class="new-default-form-item happen-date" required>
                  <DatePicker
                    ref="datepick"
                    :options="happenDateOpt['default']"
                    multiple
                    class="new-deadline deadline"
                    type="datetime"
                    placeholder="请先选择可用调休时间（必填）"
                    format="yyyy-MM-dd"
                    :value="formValue.relationDateList"
                    @on-change="happenDateChange($event)"
                    :clearable="false"
                    :editable="false"
                  ></DatePicker>
                </FormItem>
              </i-col>
              <i-col span="4" class="view-happen-date">
                <Poptip class="poptip" transfer placement="bottom">
                  <Button type="text">查看可用调休时间</Button>
                  <div slot="content">
                    <div v-for="(item, index) in happenDateObj" :key="index">
                      <div v-if="item.hourNum < 4">
                        {{item.attendanceDate}} &nbsp; : &nbsp; <span style="color:#2d8cf0">{{item.hourNum}}</span> 小时
                      </div>
                      <div v-else>
                        {{item.attendanceDate}} &nbsp; : &nbsp;  <span style="color:#2d8cf0">{{item.dayNum}}</span> 天
                      </div>
                    </div>
                  </div>
                </Poptip>
              </i-col>
            </Row>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="请假时间" class="new-default-form-item" required>
                  <DatePicker
                    :options="vacaDateOpt['default']"
                    split-panels
                    :value="vacaDays"
                    transfer
                    class="new-deadline deadline"
                    type="datetimerange"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择请假时间（必填）"
                    :clearable="false"
                    :editable="false"
                    @on-change="selectDate"
                  ></DatePicker>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="请假天数" class="new-default-form-item" required>
                  <i-input :value="formValue.dayCountE2" readonly></i-input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="24" class="default-form-member-col">
                <FormItem label="请假理由" class="new-default-form-item" required>
                  <i-input type="textarea" v-model="formValue.reason" placeholder="请在此填写请假理由"></i-input>
                </FormItem>
              </i-col>
            </Row>
          </div>
        </i-form>
      </div>
    </div>
    <div class="g-ta-r">
      <Button
        type="primary"
        class="submit-btn form-default-btn"
        size="large"
        @click.native="submit"
      >发送申请</Button>
    </div>
    <loading v-if="isLoading"></loading>
    <toast :is-toast="isToast" :msg="toastMsg"></toast>
  </div>
</template>

<script>
import { Schedule } from "../../API/api";
import Loading from "../../components/popup/Loading";
import Toast from "../../components/popup/Toast";
export default {
  components: {
    Toast,
    Loading
  },
  name: "apply",
  data() {
    return {
      showTips: false,
      canSubmit: true,
      toastMsg: null,
      isToast: false,
      isLoading: false,
      allVaca: {},
      vacaDays: null,
      happenDateObj: {},
      selectHappenDays: 0,
      probationInfoEndOk: null,
      toastMsgConf: {
        vacationType: "请选择请假类型",
        startTime: "请选择请假开始时间",
        endTime: "请选择请假结束时间",
        dayCountE2: "请选择请假时间",
        reason: "请输入请假理由"
      },
      formValue: {
        vacationType: null,
        relationDateList: [],
        startTime: null,
        endTime: null,
        dayCountE2: null,
        reason: null
      },
      happenDateOpt: {
        default: {}
      },
      vacaDateOpt: {
        default: {}
      },
      vacaConf: {
        type: [
          {
            id: "1",
            label: "事假"
          },
          {
            id: "2",
            label: "病假(带薪)",
            checkPermission: true
          },
          {
            id: "10",
            label: "病假(普通)"
          },
          {
            id: "3",
            label: "年假",
            checkPermission: true
          },
          {
            id: "4",
            label: "调休"
          },
          {
            id: "6",
            label: "婚假"
          },
          {
            id: "7",
            label: "丧假"
          },
          {
            id: "8",
            label: "产假"
          },
          {
            id: "9",
            label: "陪产假"
          },
          {
            id: "5",
            label: "其他"
          }
        ]
      }
    };
  },
  methods: {
    /* 获取所选发生时间的第二天 */
    nextDay(startDate) {
      startDate = new Date(startDate.replace(/-/g, '/'));
      startDate = +startDate + 1000 * 60 * 60 * 24;
      startDate = new Date(startDate);
      let year = startDate.getFullYear();
      let month = startDate.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = startDate.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      var nextStartDate = `${year}-${month}-${day}`;
      return nextStartDate;
    },
    happenDateChange(date) {
      this.formValue.relationDateList = date.length ? date.split(",") : [];
      let dateArr = date.length ? date.split(",") : [];
      let selectDate;
      let nextDateArr = [];
      if (!dateArr.length) {
        //未选择发生时间，可选发生时间重置
        let happenDate = JSON.parse(JSON.stringify(this.happenDateObj));
        this.selectDate();
        this.happenDateOpt["default"] = {
          disabledDate(date) {
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
            let keyArr = happenDate.map(v => v.attendanceDate);
            return keyArr.indexOf(_d) < 0;
          }
        };
        //为选择发生时间，可选请假时间清零
        this.vacaDateOpt["default"] = {
          disabledDate(date) {
            return true;
          }
        };
      }
      dateArr.forEach(ele => {
        selectDate = new Date(ele.replace(/-/g, '/'));
        /* 真的是无语，瞎几把加东西 */
        if (selectDate.getDay() < 5 && selectDate.getDay() > 0 || (selectDate.getMonth() === 8 && selectDate.getDate() === 27)) {
          /* 当所选发生时间为周一到周四，发生时间为单选 */
          this.happenDateOpt["default"] = {
            disabledDate(date) {
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
              return ele !== _d;
            }
          };
          /* 当所选发生时间为周一到周四，请假时间只能选发生时间的第二天 */
          nextDateArr.push(this.nextDay(ele));
          this.vacaDateOpt["default"] = {
            disabledDate(date) {
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
              return nextDateArr.indexOf(_d) < 0;
            }
          };
        } else if (
          selectDate.getDay() === 0 ||
          selectDate.getDay() === 5 ||
          selectDate.getDay() === 6
        ) {
          /* 当所选时间为周五、六、日时，周一到周四不可选 */
          let happenDate = JSON.parse(JSON.stringify(this.happenDateObj));
          this.happenDateOpt["default"] = {
            disabledDate(date) {
              let disableOneToFour = false;
              if (0 < date.getDay() && date.getDay() < 5 || (date.getMonth() === 8 && date.getDate() === 27)) {
                disableOneToFour = true;
              }
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
              let keyArr = happenDate.map(v => v.attendanceDate);
              return keyArr.indexOf(_d) < 0 || disableOneToFour;
            }
          };
          this.vacaDateOpt["default"] = {
            disabledDate(date) {
              let start_time = new Date(selectDate);
              let timeObj = new Date(selectDate);
              timeObj.setDate(timeObj.getDate() + 90); //获取三个月后的日期
              let end_time = timeObj.toString();
              let disable = true;
              if (
                start_time.getTime() < date.getTime() &&
                date.getTime() < timeObj.getTime()
              ) {
                disable = false;
              }
              return disable;
            }
          };
        }
      });
    },
    changeType(e) {
      if (e) {
        this.formValue.vacationType = e;
        this.selectHappenDays = 0;
        if (e == 4) {
          let happenDate = JSON.parse(JSON.stringify(this.happenDateObj));
          this.selectDate();
          this.happenDateOpt["default"] = {
            disabledDate(date) {
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
              let keyArr = happenDate.map(v => v.attendanceDate);
              return keyArr.indexOf(_d) < 0;
            }
          };
          //未选择发生时间，可选请假时间清零
          this.vacaDateOpt["default"] = {
            disabledDate(date) {
              return true;
            }
          };
        } else {
          this.formValue.relationDateList = [];
          this.vacaDateOpt["default"] = {
            disabledDate(date) {
              return false;
            }
          };
        }
      }
    },
    submit() {
      for (let prop in this.formValue) {
        if (!this.formValue[prop]) {
          this.toastMsg = this.toastMsgConf[prop];
          this.isToast = true;
          this.canSubmit = false;
          setTimeout(() => {
            this.canSubmit = true;
            this.isToast = false;
            this.toastMsg = null;
          }, 1500);
        }
      }
      if (this.formValue.vacationType == "4") {
        if (!this.formValue.relationDateList.length) {
          this.canSubmit = false;
          this.toastMsg = "请选择调休发生时间";
          this.isToast = true;
          setTimeout(() => {
            this.canSubmit = true;
            this.isToast = false;
            this.toastMsg = null;
          }, 1500);
        } else {
          if (this.selectHappenDays < Number(this.formValue.dayCountE2)) {
            this.canSubmit = false;
            this.toastMsg = "请假天数不能大于调休天数";
            this.isToast = true;
            setTimeout(() => {
              this.canSubmit = true;
              this.isToast = false;
              this.toastMsg = null;
            }, 1500);
          }
        }
      } else {
        this.formValue.relationDateList = [];
      }
      if (this.canSubmit) {
        this.$http
          .post(Schedule.apply, this.qs.stringify(this.formValue), {
            headers: { Authorization: "Bearer " + this.$cookie.get("token") }
          })
          .then(res => {
            let _data = res.data;
            this.isLoading = false;
            this.isToast = true;
            if (_data.retCode === 0) {
              this.toastMsg = "申请成功";
            } else {
              this.toastMsg = _data.retMsg;
            }
            setTimeout(() => {
              this.isToast = false;
              this.toastMsg = null;
              if (_data.retCode === 0) {
                this.$router.push("/vacation/audit");
              } else if (_data.retCode === 100014) {
                this.$cookie.delete("token");

                this.$router.push("/");
              }
            }, 1500);
          });
      }
    },
    selectDate(dateArr) {
      if (dateArr && dateArr[0]) {
        let start = dateArr[0];
        let end = dateArr[1];
        if (start.indexOf("00:00") >= 0) {
          start = start.replace("00:00", "10:00");
        }
        if (end.indexOf("00:00") >= 0) {
          end = end.replace("00:00", "19:00");
        }
        let startHour = +start.split(" ")[1].split(":")[0];
        let endHour = +end.split(" ")[1].split(":")[0];
        this.formValue.startTime = start;
        this.formValue.endTime = end;
        let startStamp = new Date(start.replace(/-/g, '/')).valueOf();
        let endStamp = new Date(end.replace(/-/g, '/')).valueOf();
        let diffStamp = endStamp - startStamp;
        let diffDays = Math.floor(diffStamp / 86400000);
        let diffHalfDay = 0;
        if (startHour < 14) {
          if (endHour <= 10) {
            diffHalfDay = 0;
          } else if (endHour <= 14) {
            diffHalfDay = 0.5;
          } else {
            diffHalfDay = 1;
          }
        } else if (startHour >= 14) {
          if (endHour > 14) {
            diffHalfDay = 0.5;
          } else {
            diffHalfDay = 1;
          }
        }
        this.formValue.dayCountE2 = diffDays + diffHalfDay;
        this.vacaDays = [start, end];
      } else {
        this.formValue.dayCountE2 = null;
        this.vacaDays = null;
      }
    },
    getVaca() {
      this.isLoading = true;
      this.$http
        .post(Schedule.vacaDays, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          let _data = res.data;
          this.isLoading = false;
          if (_data.retCode === 0) {
            let originVaca = _data.retData.days;
            let vaca = [];
            originVaca.forEach(ele => {
              if (ele.name !== "其他") {
                vaca.push(ele);
              }
            });
            this.allVaca = vaca;
            this.probationInfoEndOk = _data.retData.probationInfoEndOk
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
    getHappenTime() {
      this.$http
        .post(Schedule.holidayHour, this.qs.stringify({}), {
          headers: { Authorization: "Bearer " + this.$cookie.get("token") }
        })
        .then(res => {
          const _data = res.data;

          if (_data.retCode === 0) {
            let happenDate = _data.retData;
            this.happenDateObj = _data.retData;
            this.happenDateOpt["default"] = {
              disabledDate(date) {
                let _year = date.getFullYear();
                let _month = date.getMonth() + 1;
                if (_month < 10) {
                  _month = "0" + _month;
                }
                let _day = date.getDate();
                if (_day < 10) {
                  _day = "0" + _day;
                }
                let _d = `${_year}-${_month}-${_day}`;
                let keyArr = happenDate.map(v => v.attendanceDate);
                return keyArr.indexOf(_d) < 0;
              },
            };
          }
        });
    }
  },
  created() {
    this.getHappenTime();
    this.getVaca();
  },
  mounted() {},
  watch: {
    "formValue.relationDateList": {
      handler(val) {
        const datepick = this.$refs.datepick.$el.getElementsByClassName(
          "ivu-picker-confirm-time"
        )[0];
        let days = 0;
        let hours = 0;
        let decimal = 0;
        if (val && val.length) {
          this.happenDateObj.forEach(i => {
            if (val.indexOf(i.attendanceDate) !== -1) {
              if (Number(i.dayNum)) days += Number(i.dayNum);
              else {
                hours += Number(i.hourNum);
                if (hours > 4 || hours == 4) {
                  decimal = 0.5;
                }
              }
            }
          });
          this.selectHappenDays = days + decimal;
          datepick.innerHTML = `当前可调休：<big style="color:#2d8cf0">${days +
            decimal}</big>天`;
        } else {
          datepick.innerHTML = "";
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.vacation {
  .vaca-statis-title {
    display: flex;
    h3 {
      line-height: 20px;
    }
  }
  .tips {
    color: #ff6666;
    margin-left: 10px;
    i {
      font-size: 15px !important;
    }
    .tips-hover {
      border-radius: 50%;
      background-color: #ff6666;
      color: white;
      width: 20px;
      height: 20px;
      text-align: center;
    }
    .tips-content {
      display: flex;
      margin-top: 15px;
      background: white;
      border: 1px solid #ff6666;
      border-radius: 4px;
      font-size: 14px;
      padding: 10px 30px;
      position: absolute;
      z-index: 999;
      & > div {
        & > div {
          line-height: 2;
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.apply {
  margin-top: 30px;
  h3 {
    padding-bottom: 10px;
  }
}
.submit-btn {
  margin-top: 30px;
}
.vaca-statis {
  margin-top: 30px;
  h3 {
    padding-bottom: 10px;
  }
}
.vaca-statis-table {
  width: 100%;
  border: 1px solid #ced4da;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid #ced4da;
    text-align: center;
    font-weight: normal;
    height: 40px;
  }
  tr {
    td {
      font-size: 16px;
      color: #495057;
      &:first-child {
        background-color: #f1f3f5;
        font-size: 14px;
        color: #868e96;
      }
    }
  }
  th {
    background-color: #f1f3f5;
    font-size: 14px;
    color: #868e96;
  }
}
</style>

<style lang="less">
.vacation {
  .happen-date {
    .ivu-picker-confirm-time {
      & > span {
        display: none;
      }
    }
  }
  .view-happen-date {
    height: 40px;
    line-height: 40px;
    background: white;
    border-left: 1px solid #dddee1;
    .ivu-poptip, .ivu-poptip-rel {
      display: block;
      height: 100%;
      width: 100%;
    }
    .ivu-btn {
      display: block;
      height: 100%;
      width: 100%;
      color: #2d8cf0;
    }
  }
}
</style>




