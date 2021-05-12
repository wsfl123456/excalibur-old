export default {
  path: 'functionManage',
  name: 'functionManagement',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'toolkit',
      name: 'resource-system-sysToolkit',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Toolkit")
    },
    {
      path: 'auditor',
      name: 'resource-system-sysAuditor',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Auditor")
    },
    {
      path: 'meeting',
      name: 'resource-system-sysMeeting',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Meeting")
    },
    {
      path: 'device',
      name: 'resource-system-sysDevice',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Device")
    },
    {
      path: 'department',
      name: 'resource-system-sysDepartment',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Department")
    },
    {
      path: 'hoshinUnit',
      name: 'resource-system-sysHoshinUnit',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/HoshinUnit")
    },
    {
      path: 'tips',
      name: 'resource-system-sysTips',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/Tips")
    },
    {
      path: 'addTips',
      name: 'resource-system-sysAddTips',
      component:() => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/AddTips")
    },
    {
      path: 'editTips/:tipId',
      name: 'resource-system-sysEditTips',
      component: () => import(/* webpackChunkName: "functionManage" */ "../pages/system/functions/EditTips")
    }
  ]
}
