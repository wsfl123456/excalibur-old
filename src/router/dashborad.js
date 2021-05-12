export default {
  path: 'dashborad',
  name: 'dashborad',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'projects',
      name: 'dashborad-project',
      component: () => import(/* webpackChunkName: "dashborad" */ "../pages/dashborad/projects"),
      meta : {
        type : 'projects',
        parent : 'dashborad'
      }
    },
    {
      path: 'staff',
      name: 'dashborad-staff',
      component: () => import(/* webpackChunkName: "dashborad" */ "../pages/dashborad/staff"),
      meta : {
        type : "staff",
        parent : 'dashborad'
      }
    },
    {
      path: 'department',
      name: 'dashborad-department',
      component: () => import(/* webpackChunkName: "dashborad" */ "../pages/dashborad/department"),
      meta : {
        type : "department",
        parent : 'dashborad'
      }
    },
    {
      path: 'company',
      name: 'dashborad-company',
      component: () => import(/* webpackChunkName: "dashborad" */ "../pages/dashborad/company"),
      meta : {
        type : 'company',
        parent : 'dashborad'
      }
    },
    {
      path: 'businissunit',
      name: 'dashborad-businissUnit',
      component: () => import(/* webpackChunkName: "dashborad" */ "../pages/dashborad/businissUnit"),
      meta : {
        type : "businissUnit",
        parent : 'dashborad'
      }
    },
  ]
}
