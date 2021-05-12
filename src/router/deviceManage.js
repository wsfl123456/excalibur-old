export default {
  path: 'deviceManage',
  name: 'deviceUser',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'deviceList',
      component: () => import(/* webpackChunkName: "device" */ "../pages/device/DeviceList")
    },
    {
      path: 'owner',
      name: 'deviceOwner',
      component: () => import(/* webpackChunkName: "device" */ "../pages/device/Owner")
    }
  ]
}
