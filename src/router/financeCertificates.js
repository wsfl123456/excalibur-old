export default {
  path: 'financeCertificates',
  name: 'financeCertificates',
  component: {
    name: 'financeCertificates',
    render: h => h('router-view')
  },
  children: [
    {
      path: 'certificate',
      name: 'certificate',
      component: () => import(/* webpackChunkName: "contract" */ "../pages/contract/financeCertificate")
    },
    {
      path: 'invoice',
      name: 'invoice',
      component: () => import(/* webpackChunkName: "contract" */ "../pages/contract/invoice")
    }
  ]
};
