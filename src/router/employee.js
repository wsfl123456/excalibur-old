export default {
  path: 'employee',
  name: 'Employee',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'basic',
      name: 'resource-employeeBasic',
      component: () => import(/* webpackChunkName: "employee" */ "../pages/hr/EmployeeBasic")
    },
    {
      path: 'addbasic',
      name: 'resource-hrBasicAdd',
      component: () => import(/* webpackChunkName: "employee" */ "../pages/hr/AddEmployeeBasic")
    },
    {
      path: 'contract',
      name: 'resource-hrContract',
      component: () => import(/* webpackChunkName: "employee" */ "../pages/hr/EmployeeContract")
    },
    {
      path: 'addcontract',
      name: 'resource-hrContractAdd',
      component: () => import(/* webpackChunkName: "employee" */ "../pages/hr/AddEmployeeContract")
    }
  ]
}
