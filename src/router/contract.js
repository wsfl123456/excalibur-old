export default {
  path : 'contract',
  name : 'contract',
  component : {
    name: 'contract',
    render: h => h('router-view')
  },
  children : [
    {
      path : 'clientContract',
      name : 'clientContract',
      component : () => import(/* webpackChunkName: "contract" */ "../pages/contract/contract")
    },
    {
      path : 'supplierContract',
      name : 'supplierContract',
      component : () => import(/* webpackChunkName: "contract" */ "../pages/contract/contract")
    },
    {
      path : 'quotation',
      name : 'quotation',
      component : () => import(/* webpackChunkName: "contract" */ "../pages/contract/contract")
    }
  ]
}
