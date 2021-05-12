export default {
  path: 'myReimburse',
  name: 'myReimburse',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'resource-support-reimburse-displayReimburse',
      component: () => import(/* webpackChunkName: "myReimburse" */ "../pages/support/reimburse/displayReimburse")
    },
    {
      path: 'add',
      name: 'resource-support-reimburse-addReimburse',
      component: () => import(/* webpackChunkName: "myReimburse" */ "../pages/support/reimburse/addReimburse")
    },
    {
      path: 'edit/:id',
      name: 'resource-support-reimburse-editReimburse',
      component: () => import(/* webpackChunkName: "myReimburse" */ "../pages/support/reimburse/editReimburse")
    }
  ]
}
