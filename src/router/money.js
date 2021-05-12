export default {
  path: 'money',
  name: 'Money',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'salaryManage',
      name: 'resource-hr-salaryManage',
      component: () => import(/* webpackChunkName: "salaryManage" */ "../pages/hr/HrSalary")
    },
    {
      path: 'addSalary',
      name: 'resource-hr-addHrSalary',
      component: () => import(/* webpackChunkName: "salaryManage" */ "../pages/hr/AddHrSalary")
    },
    {
      path: 'bonusManage',
      name: 'resource-hr-hrBonus',
      component: () => import(/* webpackChunkName: "salaryManage" */ "../pages/hr/HrBonus")
    }
  ]
}
