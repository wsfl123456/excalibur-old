<template>
  <div  class="canlender-box" v-clickoutside="closeDetail" @mousemove="checkDom">
    <full-calendar
      ref="calendar"
      :events="events"
      :config="calendarConf"
      @event-created="createEvent"
      @event-render="eventRender"
      @event-selected="eventSelected"
      @day-click="closeDetail"
      @view-render="viewChange"
    ></full-calendar>
    <div  v-if="isDetail" class="calender-pop" :style="{'top': detailPos.y + 'px', 'left': detailPos.x + 'px'}">
      <div v-if="dataType === 'meeting'" class="detail-container">
        <div class="detail-time">
          <p>
            {{detailStart}}
          </p>
          至
          <p>
            {{detailEnd}}
          </p>
        </div>
        <div class="detail-creator">
          <h3>会议发起人</h3>
          <div>
            <Avatar :icon="'person'" :src="detailCreator[0].headPic">{{detailCreator[0].name}}</Avatar>
            <p>{{detailCreator[0].name}}</p>
          </div>
        </div>
        <div class="detail-title">
          <h3>{{detailTitle}}</h3>
          {{detailRoom}}
        </div>
        <div class="detail-agenda">
          <pre>{{detailAgenda}}</pre>
        </div>
      </div>

      <div v-if="dataType === 'outing'" class="detail-container">
        <div class="detail-time">
          <p>
            {{detailStart}}
          </p>
          至
          <p>
            {{detailEnd}}
          </p>
        </div>
        <div class="detail-creator">
          <h3>外出类型</h3>
          <div>
            <p>{{outingTypeName}}</p>
          </div>
        </div>
        <div v-if="operationArr && operationArr.length" class="detail-creator">
          <h3>同行人员</h3>
          <div style="display:flex; flex-wrap: wrap">
            <div v-for="(i, k) in operationArr" :key="k" style="margin-left:5px;margin-top:5px">
               <Avatar :icon="'person'" :src="i.headPic">{{i.englishName}}</Avatar>
               <p>{{ i.englishName }}</p>
            </div>
          </div>
        </div>
        <div v-else class="detail-creator">
          <h3>同行人员</h3>
          <div>无</div>
        </div>
        <div style="margin:10px">
          <h3>外出项目</h3>
          <div style="margin-top:5px">
            <p>{{customerName}}</p>
            <p>{{projectName}}</p>
          </div>
        </div>
      </div>

      <div v-else-if="dataType === 'vacation'">
        <div class="detail-time">
          <p>
            {{detailStart}}
          </p>
          至
          <p>
            {{detailEnd}}
          </p>
        </div>
        <div class="detail-creator">
          <h3>请假类型</h3>
          <div>
            <p>{{detailTitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="isModal" class-name="agenda-modal" ok-text="完成" cancel-text="取消" width="480px" @on-cancel="cancel" @on-ok="submitpersonalAgenda">
      <h3>设置个人日程 <span><router-link to="/schedule/add">转到会议邀请 >></router-link></span></h3>

      <ul>
        <li class="g-mb-16">
          <i-input type="text" autofocus size="large" v-model="personalAgenda.name" class="ipt" placeholder="输入日程标题"></i-input>
        </li>
        <li class="g-mb-16">
          <i-input type="textarea" :autosize="{minRows: 1,maxRows: 5}" size="large" v-model="personalAgenda.agenda" class="ipt" placeholder="输入日程内容"></i-input>
        </li>
      </ul>
      <!--<div slot="footer" class="custom-footer">-->
        <!--<Button type="primary" size="large" class="ok" @click="submitReset">完成</Button>-->
      <!--</div>-->
    </Modal>
  </div>
</template>

<script>
  import { FullCalendar } from 'vue-full-calendar'
  import 'fullcalendar/dist/locale/zh-cn'
  import clickoutside from '../directives/clickoutside'
  import TransferDom from '../directives/transfer-dom'
  import CommonMemberIi from './CommonMemberii'
  // import {Schedule} from '../API/api'
  export default {
    name: 'calender',
    directives: {clickoutside, TransferDom},
    components: {
      CommonMemberIi,
      FullCalendar
    },
    watch: {
      goToDate: {
        handler (data) {
          if (data) {
            this.$refs.calendar.fireMethod('gotoDate', data)
          }
        }
      }
    },
    props: {
      events: {
        type: Array,
        default: []
      },
      goToDate: {},
      // defaultDate: {}
      calendarConf: {
        type: Object,
        default: function () {
          const _self = this
          return {
            // locale: 'zh-cn',
            contentHeight: 'auto',
            nowIndicator: true,
            slotLabelFormat: 'HH:mm',
            // defaultView: 'agendaDay',
            defaultView: 'month',
            eventLimit: true,
            dragScroll: false,
            eventLimitClick: 'agendaDay',
            // aspectRatio: 1.5,
            selectable: true,
            editable: false,
            eventStartEditable: false,
            eventDurationEditable: false,
            showNonCurrentDates: true,
            firstDay: 0,
            header: {
              left: 'today prev,next title',
              center: '',
              right: 'agendaDay,agendaWeek,month'
            },
            eventMouseover (ev, jq, view) {
              console.log(ev, jq, view)
              _self.eventDetail(ev, jq, 'show')
            },
            eventMouseout (ev, jq, view) {
              _self.eventDetail(ev, jq, 'hide')
            }
          }
        }
      }
    },
    data () {
      return {
        personalAgenda: {
          name: '',
          agenda: '',
          startTime: null,
          endTime: null
        },
        isModal: false,
        detailRoom: null,
        detailTitle: null,
        detailAgenda: null,
        detailStart: null,
        detailEnd: null,
        detailId: null,
        isDetail: false,
        detailCreator: [],
        detailPos: {
          x: null,
          y: null
        },
        dataType: "",
        outingTypeName: "",
        operationArr: [],
        customerName: '',
        projectName: '',
      }
    },
    mounted () {
    },
    methods: {
      checkDom () {
      },
      viewChange (view, ele, $el) {
        console.log(view)
        this.$emit('view-change', view.name, view.calendar.currentDate.format('YYYY/MM/DD'))
      },
      eventRender (event, $el) {},
      submitpersonalAgenda () {
        let eventData = {
          title: this.personalAgenda.name,
          start: this.personalAgenda.startTime,
          end: this.personalAgenda.endTime,
          agenda: this.personalAgenda.agenda
        }

        this.$refs.calendar.fireMethod('renderEvent', eventData, true)

        this.$emit('on-add', this.personalAgenda)
        this.personalAgenda.agenda = ''
        this.personalAgenda.name = ''
        this.$refs.calendar.fireMethod('unselect')
      },
      cancel () {
        this.isModal = false
        this.personalAgenda.agenda = ''
        this.personalAgenda.name = ''
        this.$refs.calendar.fireMethod('unselect')
      },
      createEvent (event) {
        this.isModal = true
        this.personalAgenda.startTime = event.start.format('YYYY-MM-DD HH:mm')
        this.personalAgenda.endTime = event.end.format('YYYY-MM-DD HH:mm')
      },
      eventDetail (event, jqEvent, status) {
        switch (status) {
          case 'show':
            this.isDetail = true
            this.detailPos = {
              x: jqEvent.clientX + 10 || jqEvent.pageX + 10,
              y: jqEvent.clientY || jqEvent.pageY
            }
            this.detailStart = event.start.format('YYYY-MM-DD HH:mm')
            this.detailEnd = event.end.format('YYYY-MM-DD HH:mm')
            this.detailTitle = event.title
            this.detailAgenda = event.agenda
            this.detailId = event._id
            this.detailRoom = event.roomName
            this.detailCreator = event.creator


            this.dataType = event.dataType
            this.outingTypeName = event.outingTypeName
            this.operationArr = event.operationArr
            this.customerName = event.customerName
            this.projectName = event.projectName

    //         const html = `
    //         <div class="calender-pop" :style="{'top': ${this.detailPos.y} + 'px', 'left': ${this.detailPos.x} + 'px'}">
    //   <div class="detail-container">
    //     <div class="detail-time">
    //       <p>
    //         ${this.detailStart}
    //       </p>
    //       至
    //       <p>
    //         ${this.detailEnd}
    //       </p>
    //     </div>
    //     <div class="detail-creator">
    //       <h3>会议发起人</h3>
    //       <common-member-ii :is-edit="false" :users="${this.detailCreator}" :can-exit="false"></common-member-ii>
    //     </div>
    //     <div class="detail-title">
    //       <h3>${this.detailTitle}</h3>
    //       ${this.detailRoom}
    //     </div>
    //     <div class="detail-agenda">
    //       <pre>${this.detailAgenda}</pre>
    //     </div>
    //   </div>
    // </div>
    //         `
            // jqEvent.currentTarget.append(html)
            break
          case 'hide':
            this.closeDetail()
            break
        }
      },
      eventSelected (event) {
        this.$router.push(`/schedule/meeting/${event.scheduleId}`)
      },
      closeDetail () {
        this.isDetail = false
      }
    }
  }
</script>

<style scoped lang="less">
  .canlender-box {
    position: relative;
  }
  .calender-pop {
    position: fixed;
    border: 1px solid #ced4da;
    border-radius: 5px;
    background-color: #fff;
    z-index: 100;
    transform: translate(0, -50%);
    width: 200px;
    .detail-container {
      min-height: 200px;
      /*max-height: 400px;*/
      /*overflow-y: auto;*/
    }
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: #fff;
      border-left: 1px solid #ced4da;
      border-bottom: 1px solid #ced4da;
      border-top: 0 none;
      border-right: 0 none;
      width: 10px;
      height: 10px;
    }
    /*top: ;*/
  }
  .detail-time {
    border-bottom: 1px solid #ced4da;
    padding: 10px;
    font-size: 14px;
  }
  .detail-title {
    border-bottom: 1px solid #ced4da;
    padding: 10px;
  }
  .detail-creator {
    > div {
      display: inline-block;
      text-align: center;
      margin-top: 5px;
    }
    .detail-title

  }
  .detail-agenda {
    padding: 10px;
    word-wrap: break-word;
    word-break: break-all;
    pre {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
  .agenda-modal {
    h3 {
      color: #495057;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 24px;
      span {
        font-size: 12px;
        margin-left: 16px;
        font-weight: normal;
      }
    }
    .ipt {
      .ivu-input {
        height: 48px;
      }
    }

    /*.ipt {*/
      /*height: 48px;*/
      /*border-radius: 4px;*/
      /*border: 1px solid #ced4da;*/
      /*font-size: 14px;*/
      /*padding: 0 16px;*/
      /*width: 100%;*/
    /*}*/
    /*.ipt-group {*/
      /*padding: 0;*/
      /*overflow: hidden;*/
      /*display: flex;*/
      /*button {*/
        /*height: 100%;*/
        /*border: 0 none;*/
        /*background-color: #2d8ef8;*/
        /*color: #fff;*/
        /*padding: 0 10px;*/
        /*transition: background-color .5s;*/
        /*&:hover {*/
          /*background-color: lighten(#2d8ef8, 10%);*/
        /*}*/
        /*&:active {*/
          /*background-color: darken(#2d8ef8, 10%);*/
        /*}*/
      /*}*/
      /*input {*/
        /*flex: 1;*/
        /*border: 0 none;*/
        /*height: 100%;*/
        /*padding: 0 16px;*/
      /*}*/
    /*}*/
  }
</style>
<style lang='less'>
.canlender-box {
  .fc-ltr .fc-popover .fc-header .fc-title, .fc-rtl .fc-popover .fc-header .fc-close {
    float: none !important;
  }
}
</style>
