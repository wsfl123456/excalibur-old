export default {
  path: 'device',
  name: 'device',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'repair',
      name: 'resource-device-deviceRepair',
      component: () => import(/* webpackChunkName: "device" */ "../pages/device/Repair")
    }
  ]
}
