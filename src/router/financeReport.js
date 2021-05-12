export default {
  name: 'financeReport',
  path: 'financeReport',
  component: {
    name: 'financeReport',
    render: h => h('router-view')
  },
  children: [
    {
      path: 'ar',
      name: 'ar',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/ar")
    },
    {
      path: 'ap',
      name: 'ap',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/ap")
    },
    {
      path: 'ce',
      name: 'ce',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/ce")
    },
    {
      path: 'marginSheet',
      name: 'marginSheet',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/marginSheet")
    },
    {
      path: 'bp',
      name: 'bp',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/bp")
    },
    {
      path: 'fc',
      name: 'fc',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/fc")
    },
    {
      path: 'fc/log',
      name: 'fcLog',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/log")
    },
    {
      path: 'fc/overhead',
      name: 'fcOverhead',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/overhead")
    },
    {
      path: 'fc/office',
      name: 'fcOffice',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/office")
    },
    {
      path: 'fc/staff',
      name: 'fcStaff',
      component: () => import(/* webpackChunkName: "financeReport" */ "../pages/financeReport/staff")
    },
  ]
};
