export default {
  path: 'projects',
  name: 'projects',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'projects-projectLists',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/List")
    },
    {
      path: 'list/:customerId',
      name: 'projects-projectId',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/List")
    },
    {
      path: 'detail/:projectId',
      name: 'projects-projectDetail',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/Detail")
    },
    {
      path: 'add',
      name: 'projects-addProject',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/Add")
    },
    {
      path: 'edit/:projectId',
      name: 'projects-editProject',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/Edit")
    },
    {
      path: 'addpib/:projectId',
      name: 'projects-addPibProject',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/AddPib")
    },
    {
      path: 'editpib/:projectId',
      name: 'projects-editPibProject',
      component: () => import(/* webpackChunkName: "projects" */ "../pages/projects/EditPib")
    }
  ]
}
