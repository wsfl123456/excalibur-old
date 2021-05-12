export default {
  path: 'myDevice',
  name: 'myDevice',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'resource-support-myDeviceList',
      component: () => import(/* webpackChunkName: "myDevice" */ "../pages/support/MyDevice")
    },
    {
      path: 'add',
      name: 'resource-support-addMyDeviceRepair',
      component: () => import(/* webpackChunkName: "myDevice" */ "../pages/support/AddRepair")
    },
    {
      path: 'apply',
      name: 'resource-support-myDeviceApply',
      component: () => import(/* webpackChunkName: "myDevice" */ "../pages/support/MyApply")
    }
  ]
}
