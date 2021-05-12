import axios from 'axios'
import Qs from 'qs'
import {Brand} from '../../API/api'
import {getCookie} from '../../util/util'

export const brands = {
  state: {
    list: [],
    filter: {
      industry: 0,
      ncCompanyId: 0,
      state: 0,
      workState : 0,
      page: 1,
      perPage: 25,
      orderBy: 'createTime',
      asc: 'desc'
    },
    detail: {},
    detailStatus: false
  },
  mutations: {
    setBrandsList (state, data) {
      if (data.reset) {
        state.list = data.data
      } else {
        state.list = state.list.concat(data.data)
      }
    },
    setBrandsFilter (state, obj) {
      state.filter = obj
    },
    setBrandsDetail (state, data) {
      state.detail = data
    },
    brandDetailStatus (state, data) {
      if (data || data === false) {
        state.detailStatus = data
      } else {
        state.detailStatus = !state.detailStatus
      }
    }
  },
  actions: {
    setBrandsList ({commit}, data) {
      commit('setBrandsFilter', data.data) // 重写筛选条件
      axios.post(Brand.list, Qs.stringify(data.data), {headers: {'Authorization': 'Bearer ' + getCookie('token')}}).then((res) => {
        const _data = res.data
        if (_data.retCode === 0) {
          commit('setBrandsList', {data: _data.retData.data.data || [], reset: data.data.page === 1})
        }
        if (data.cb) {
          data.cb(_data.retData.data, _data.retCode)
        }
      })
    },
    changeBrandDetail ({commit}, payload) {
      commit('setBrandsDetail', payload)
    },
    changeBrandDetailStatus ({commit}, payload) {
      commit('brandDetailStatus', payload)
    }
  },
  getters: {

  }
}
