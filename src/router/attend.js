export default {
  path: 'attend',
  name: 'Attend',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'attendance',
      name: 'resource-hr-attendance',
      component: () => import(/* webpackChunkName: "attend" */ "../pages/hr/Attendance")
    },
    {
      path: 'vacation',
      name: 'resource-hr-hrVacation',
      component: () => import(/* webpackChunkName: "attend" */ "../pages/hr/Vacation")
    }
  ]
}
