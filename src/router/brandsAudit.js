export default {
  path: 'brandsAudit',
  name: 'brandsAudit',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'resource-brandsAuditList',
      component: () => import(/* webpackChunkName: "brands" */ "../pages/brands/AuditList"),
    }
  ]
}
