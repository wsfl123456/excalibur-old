export default {
  path: 'vacation',
  name: 'vacation',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'out',
      name: 'schedule-out',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/Out")
    },
    {
      path: 'addOut',
      name: 'schedule-addOut',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/AddOut")
    },
    {
      path: 'editOut/:id',
      name: 'schedule-editOut',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/EditOut")
    },
    {
      path: 'apply',
      name: 'schedule-scheduleApply',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/Apply")
    },
    {
      path: 'audit',
      name: 'schedule-scheduleAudit',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/Audit")
    },
    {
      path: 'edit-apply/:applyId',
      name: 'schedule-scheduleEditApply',
      component: () => import(/* webpackChunkName: "vacation" */ "../pages/schedule/EditApply")
    }
  ]
}
