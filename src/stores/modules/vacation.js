/**
 * Created by Luna_Shu on 2018/3/10.
 *
 * @author Luna_Shu
 *
 */
import axios from 'axios'
import Qs from 'qs'
import {Schedule} from '../../API/api'
import {getCookie} from '../../util/util'

export const vacation = {
  state: {
    list: [],
    filter: {
      state: 0,
      applyType: 0,
      page: 1,
      perPage: 25,
      orderBy: 'createTime',
      asc: 'desc'
    },
    detail: {},
    detailStatus: false
  },
  mutations: {
    setVacationList (state, data) {
      if (data.reset) {
        state.list = data.data
      } else {
        state.list = state.list.concat(data.data)
      }
    },
    setVacationFilter (state, obj) {
      state.filter = obj
    },
    setVacationDetail (state, data) {
      state.detail = data
    },
    vacationDetailStatus (state, data) {
      if (data || data === false) {
        state.detailStatus = data
      } else {
        state.detailStatus = !state.detailStatus
      }
    }
  },
  actions: {
    setVacationList ({commit}, data) {
      commit('setVacationFilter', data.data) // 重写筛选条件
      axios.post(Schedule.vacaList, Qs.stringify(data.data), {headers: {'Authorization': 'Bearer ' + getCookie('token')}}).then((res) => {
        const _data = res.data
        if (_data.retCode === 0) {
          commit('setVacationList', {data: _data.retData.data || [], reset: data.data.page === 1})
        }
        if (data.cb) {
          data.cb(_data.retData.data, _data.retCode)
        }
      })
    },
    changeVacationDetail ({commit}, payload) {
      commit('setVacationDetail', payload)
    },
    changeVacationDetailStatus ({commit}, payload) {
      commit('vacationDetailStatus', payload)
    }
  },
  getters: {

  }
}
