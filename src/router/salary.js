export default {
  path: 'salary',
  name: 'salary',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'salary',
      name: 'growth-querySalary',
      component: () => import(/* webpackChunkName: "salary" */ "../pages/growth/Salary")
    },
    {
      path: 'bonus',
      name: 'growth-bonus',
      component: () => import(/* webpackChunkName: "salary" */ "../pages/growth/Bonus")
    }
  ]
}
