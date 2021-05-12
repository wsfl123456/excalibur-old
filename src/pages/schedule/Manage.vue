<template>
  <div>
    <div class="fn-area">
      <div class="search-fn">
        <div class="g-mb-16">
          <RadioGroup v-model="dataConf.search_type" @on-change="changeType">
            <Radio label="2">个人日程</Radio>
            <Radio label="1">会议室占用日程</Radio>
          </RadioGroup>
        </div>

        <div class="filter-fn">
          <div span="5">
            <DatePicker :value="dataConf.date" type="date" transfer class="datepicker" placeholder="选择要查看的日期" :clearable="false" confirm @on-change="changeDate"></DatePicker>
          </div>

          <div class="filter-sel" span="5" v-if="+dataConf.search_type === 1">
            <template>
              <Select v-model="roomId" placeholder="请选择会议室 " @on-change="changeId('roomId', $event)" clearable>
                <Option v-for="item in allRoom" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </template>
          </div>
          <div class="filter-sel" span="5" v-if="+dataConf.search_type === 2">
            <template>
              <Select v-model="userId" placeholder="请输入名称进行查询，如Jennifer Shen" @on-change="changeId('userId', $event)" clearable filterable>
                <Option v-for="item in allUser" :value="item.id" :key="item.id">{{ item.englishName }}</Option>
              </Select>
            </template>
          </div>
        </div>
      </div>
      <div class="addBtn">
        <router-link to="/schedule/add" ><Icon type="plus-circled" size="20"></Icon> 发起会议</router-link>
      </div>
    </div>
    <div class="m-calendar">
      <loading v-if="isLoading"></loading>

      <calender :events="events" @on-add="addPersonal" :go-to-date="dataConf.date" @view-change="viewChange"></calender>
    </div>
    <toast :is-toast="isToast" :msg="toastMsg" :status="toastState"></toast>
    <!--<full-calendar ref="calendar" :events="events" :config="calendarConf"  @event-selected="eventSelected"></full-calendar>-->
  </div>
</template>

<script>
  import { Schedule, Index } from '../../API/api'
  import Calender from '../../components/Calender'
  import Toast from '../../components/popup/Toast'
  import Loading from '../../components/popup/Loading'

  export default {
    components: {
      Loading,
      Toast,
      Calender
    },
    name: 'manage',
    data () {
      return {
        crumb: [
          {
            label: '日程计划'
          },
          {
            label: '我的日程'
          },
          {
            label: '日程管理'
          }
        ],
        isLoading: false,
        allUser: [],
        allRoom: [],
        idOpts: [],
        dataConf: {
          search_type: '2',
          date: '',
          id: null,
          date_type: 'day'
        },
        roomId: null,
        userId: null,
        isToast: false,
        toastMsg: null,
        toastState: null,
        events: []
      }
    },
    methods: {
      init () {
        this.checkType()
        this.initDate()

        sessionStorage.setItem('subMenu', 'schedule/manage')
        this.$store.dispatch('setCurrSubMenu', 'schedule/manage')
        this.$store.dispatch('setOpenedSub', ['schedule'])
        sessionStorage.setItem('openedSub', '["schedule"]')
      },
      viewChange (type, date) {
        switch (type) {
          case 'agendaWeek':
            this.dataConf.date_type = 'week'
            this.dataConf.date = date
            break
          case 'agendaDay':
            this.dataConf.date_type = 'day'
            this.dataConf.date = date
            break
          case 'month':
            this.dataConf.date_type = 'month'
            this.dataConf.date = date
            break
        }
        this.getSchedule()
      },
      initDate () {
        this.dataConf.date = new Date().getFullYear().toString() + '/' + ((new Date().getMonth()) + 1).toString() + '/' + new Date().getDate().toString()
      },
      checkType () {
        const id = this.$route.params.id
        if (id && id !== 'null') {
          this.dataConf.search_type = '1'
          this.dataConf.id = +id
          this.roomId = +id
        } else {
          this.dataConf.id = JSON.parse(localStorage.userInfo).id
          this.userId = JSON.parse(localStorage.userInfo).id
        }
        this.getAllUser()
        this.getMeetingRoom()
        // this.getSchedule()
      },
      getMeetingRoom (isSet) {
        this.$http.post(Schedule.meetingRooms, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allRoom = _data.retData
            if (isSet) {
              // this.idOpts = this.allRoom
            }
          }
        })
      },
      getAllUser (isSet) {
        this.$http.post(Index.allUsers, this.qs.stringify({}), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          const _data = res.data
          if (_data.retCode === 0) {
            this.allUser = _data.retData.data
            if (isSet) {
              // this.idOpts = this.allUser
            }
          }
        })
      },
      changeDate (date) {
        this.dataConf.date = date
        // this.calenderConf.defaultDate = date
        this.getSchedule()
      },
      changeId (type, v) {
        if (type === 'userId' && !v) {
          this.dataConf.id = JSON.parse(localStorage.userInfo).id
          this.userId = JSON.parse(localStorage.userInfo).id
        } else {
          this.dataConf.id = this[type]
        }
        this.getSchedule()
      },
      changeType (id) {
        if (+id === 1) {
          this.dataConf.id = null
          this.idOpts = this.allRoom
        } else {
          this.dataConf.id = JSON.parse(localStorage.userInfo).id
          this.idOpts = this.allUser
        }
        this.getSchedule()
      },
      addPersonal (data) {
        // data.startTime = data.startTime.format('YYYY-MM-DD HH:mm')
        // data.startTime = data.startTime
        // data.endTime = data.endTime.format('YYYY-MM-DD HH:mm')
        // data.endTime = data.endTime
        this.$http.post(Schedule.personal, this.qs.stringify(data), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then(res => {
          let _data = res.data
          if (_data.retCode === 0) {
            this.isToast = true
            this.toastState = 'success'
            this.toastMsg = '添加成功'
          } else {
            this.isToast = true
            this.toastState = null
            this.toastMsg = _data.retMsg
          }
          setTimeout(() => {
            this.isToast = false
            this.toastState = null
            this.toastMsg = null
          }, 1500)
        })
      },
      getSchedule () {
        this.isLoading = true
        this.$http.post(Schedule.allSchedule, this.qs.stringify(this.dataConf), {headers: {'Authorization': 'Bearer ' + this.$cookie.get('token')}}).then((res) => {
          let _data = res.data
          this.isLoading = false
          if (_data.retCode === 0) {
            this.events = _data.retData.data.map((item) => {
              return {
                title: item.name,
                start: item.startTime,
                end: item.endTime,
                agenda: item.agenda,
                room: item.room,
                roomName: item.roomName,
                scheduleId: item.id,
                creator: [item.createUser],

                /* 新加的内容 */
                dataType: item.dataType,
                outingTypeName: item.outingTypeName,
                operationArr: item.operationArr,
                customerName: item.customerName,
                projectName: item.projectName,
              }
            })
          } else {
            this.isToast = true
            this.toastMsg = _data.retMsg
            this.toastState = null
          }
          setTimeout(() => {
            this.isToast = false
          }, 1500)
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  .addBtn {
    text-align: right;
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
  .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
  }
  .fn-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .search-fn {
      flex: 1;
      margin-right: 32px;
    }
  }
  .m-calendar {
    position: relative;
  }
  .filter-fn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .filter-sel {
      width: 200px;
      margin-left: 10px;
    }
  }
</style>
