export default {
  path: 'menuConfManage',
  name: 'menuConfigManagement',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'setting',
      name: 'resource-system-sysSetting',
      component: () => import(/* webpackChunkName: "menuConfManage" */ "../pages/system/menus/Setting")
    },
    {
      path: 'role',
      name: 'resource-system-sysRole',
      component: () => import(/* webpackChunkName: "menuConfManage" */ "../pages/system/menus/Role")
    }
  ]
}
