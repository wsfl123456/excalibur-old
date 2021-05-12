export default {
  path: 'brands',
  name: 'brands',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'resource-brands-list',
      component: () => import(/* webpackChunkName: "brands" */ "../pages/brands/List"),
    },
    {
      path: 'add',
      name: 'resource-brands-add',
      component: () => import(/* webpackChunkName: "brands" */ "../pages/brands/Add")
    },
    {
      path: 'edit/:brandId',
      name: 'resource-brands-edit',
      component: () => import(/* webpackChunkName: "brands" */ "../pages/brands/Edit")
    }
  ]
}
