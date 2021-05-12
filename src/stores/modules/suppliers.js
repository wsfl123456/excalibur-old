import axios from 'axios'
import Qs from 'qs'
import {Supply} from '../../API/api'
import {getCookie} from '../../util/util'

export const supply = {
  state: {
    list: [],
    filter: {
      serviceType: 0,
      signCompanyId: 0,
      state : 0,
      workState: 0,
      page: 1,
      perPage: 25,
      orderBy: 'createTime',
      asc: 'desc'
    },
    detail: {},
    detailStatus: false
  },
  mutations: {
    setSuppliersList (state, data) {
      if (data.reset) {
        state.list = data.data
      } else {
        state.list = state.list.concat(data.data)
      }
    },
    setSuppliersFilter (state, obj) {
      state.filter = obj
    },
    setSuppliersDetail (state, data) {
      state.detail = data
    },
    SupplierdetailStatus (state, data) {
      if (data || data === false) {
        state.detailStatus = data
      } else {
        state.detailStatus = !state.detailStatus
      }
    }
  },
  actions: {
    setSuppliersList ({commit}, data) {
      commit('setSuppliersFilter', data.data) // 重写筛选条件
      axios.post(Supply.list, Qs.stringify(data.data), {headers: {'Authorization': 'Bearer ' + getCookie('token')}}).then((res) => {
        const _data = res.data
        if (_data.retCode === 0) {
          commit('setSuppliersList', {data: _data.retData.data || [], reset: data.data.page === 1})
        }
        if (data.cb) {
          data.cb(_data.retData.data, _data.retCode)
        }
      })
    },
    changeSupplierDetail ({commit}, payload) {
      commit('setSuppliersDetail', payload)
    },
    changeSupplierDetailStatus ({commit}, payload) {
      commit('SupplierdetailStatus', payload)
    }
  },
  getters: {

  }
}
