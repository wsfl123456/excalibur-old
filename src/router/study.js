export default {
  path: 'study',
  name: 'study',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'tips',
      name: 'growth-tipsList',
      component: () => import(/* webpackChunkName: "study" */ "../pages/tips/TipsList")
    },
    {
      path: 'tips/:tipsId/:productId/:toolkitId',
      name: 'growth-tipsDetail',
      component: () => import(/* webpackChunkName: "study" */ "../pages/tips/Tips")
    },
    {
      path: 'tipslist/:toolkitId',
      name: 'growth-filterTips',
      component: () => import(/* webpackChunkName: "study" */ "../pages/tips/TipsList")
    }
  ]
}
