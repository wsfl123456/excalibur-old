export default {
  path: 'suppliers',
  name: 'suppliers',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'resource-suppliersList',
      component: () => import(/* webpackChunkName: "suppliersList" */ "../pages/suppliers/List")
    },
    {
      path: 'add',
      name: 'resource-supplierAdd',
      component: () => import(/* webpackChunkName: "suppliersList" */ "../pages/suppliers/Add")
    },
    {
      path: 'edit/:supplierId',
      name: 'resource-supplierEdit',
      component: () => import(/* webpackChunkName: "suppliersList" */ "../pages/suppliers/Edit")
    }
  ]
}
