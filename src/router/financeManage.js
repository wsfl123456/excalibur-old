export default {
  path: 'financeManage',
  name: 'financeManage',
  component: {
    name: 'financeManage',
    render: h => h('router-view')
  },
  children: [
    {
      path: 'addFinanceCertificate',
      name: 'addFinanceCertificate',
      component: () => import(/* webpackChunkName: "contract" */ "../pages/contract/uploadCertificate")
    },
    {
      path: 'editFinanceCertificate/:id',
      name: 'editFinanceCertificate',
      component: () => import(/* webpackChunkName: "contract" */ "../pages/contract/uploadCertificate")
    }
  ]
}
