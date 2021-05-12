export default {
  path: 'schedule',
  name: 'schedule',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'manage',
      name: 'schedule-scheduleManage',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Manage")
    },
    {
      path: 'manage/:id',
      name: 'schedule-scheduleManage',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Manage")
    },
    {
      path: 'memo/:id',
      name: 'schedule-memo',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Memo")
    },
    {
      path: 'meeting',
      name: 'schedule-meeting',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Meeting")
    },
    {
      path: 'meeting/:meetingId',
      name: 'schedule-meetingId',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Meeting")
    },
    {
      path: 'add',
      name: 'schedule-addSchedule',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Add")
    },
    {
      path: 'edit/:id',
      name: 'schedule-editSchedule',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Edit")
    },
    {
      path: 'copy/:id',
      name: 'schedule-CopySchedule',
      component: () => import(/* webpackChunkName: "schedule" */ "../pages/schedule/Copy")
    }
  ]
}
