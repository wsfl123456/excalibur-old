export default {
  path: 'sysNotice',
  name: 'systemNotice',
  component: () => import("../pages/PageContainer"),
  children: [
    {
      path: 'list',
      name: 'personal-sysNoticeList',
      component: () => import(/* webpackChunkName: "sysNotice" */ "../pages/notice/SysNoticeList")
    },
    {
      path: 'add',
      name: 'personal-addSysNotice',
      component: () => import(/* webpackChunkName: "sysNotice" */ "../pages/notice/AddSysNotice")
    },
    {
      path: 'edit/:id',
      name: 'personal-editSysNotice',
      component: () => import(/* webpackChunkName: "sysNotice" */ "../pages/notice/EditSysNotice")
    }
  ]
}
