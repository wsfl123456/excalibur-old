export default {
  path: 'tasks',
  name: 'tasks',
  component: () => import(/* webpackChunkName: "tasks" */ "../pages/tasks/TaskPageContainer"),
  children: [
    {
      path: 'list',
      name: 'tasks-taskList',
      component: () => import(/* webpackChunkName: "tasks" */ "../pages/tasks/List")
    },
    {
      path: 'list/:customerId/:projectId',
      name: 'tasks-taskDetail',
      component: () => import(/* webpackChunkName: "tasks" */ "../pages/tasks/List")
    },
    {
      path: 'add/:customerId/:projectId/:productId/:toolkitId',
      name: 'tasks-addTask',
      component: () => import(/* webpackChunkName: "tasks" */ "../pages/tasks/AddTask")
    },
    {
      path: 'edit/:taskId/:customerId/:projectId',
      name: 'tasks-editTask',
      component: () => import(/* webpackChunkName: "tasks" */ "../pages/tasks/EditTask")
    },
    {
      path: 'info/:taskId',
      name: 'tasks-taskInfo',
      component: () => import(/* webpackChunkName: "tasks" */ "../components/finance/components/quotationDetail")
    },
  ]
}
