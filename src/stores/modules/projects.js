/**
 * Created by Luna_Shu on 2018/2/27.
 *
 * @author Luna_Shu
 *
 */
import axios from 'axios'
import Qs from 'qs'
import {Project} from '../../API/api'
import {getCookie} from '../../util/util'

export const projects = {
  state: {
    projectsList: [],
    filter: {
      state: 0,
      functionType: 0,
      page: 1,
      page_size: 25,
      orderBy: 'createTime',
      asc: 'desc',
      customerId: null
    },
    detail: {},
    detailStatus: false
  },
  mutations: {
    setProjectsList (state, data) {
      if (data.reset) {
        state.projectsList = data.data
      } else {
        state.projectsList = state.projectsList.concat(data.data)
      }
    },
    setProjectFilter (state, obj) {
      state.filter = obj
    },
    setProjectDetail (state, data) {
      state.detail = data
    },
    projectDetailStatus (state, data) {
      if (data || data === false) {
        state.detailStatus = data
      } else {
        state.detailStatus = !state.detailStatus
      }
    }
  },
  actions: {
    setProjectsList ({commit}, data) {
      commit('setProjectFilter', data.data) // 重写筛选条件
      axios.post(Project.list, Qs.stringify(data.data), {headers: {'Authorization': 'Bearer ' + getCookie('token')}}).then((res) => {
        const _data = res.data
        if (_data.retCode === 0) {
          commit('setProjectsList', {data: _data.retData.data || [], reset: data.data.page === 1})
        }
        if (data.cb) {
          data.cb(_data.retData.data, _data.retCode)
        }
      })
    },
    changeProjectDetail ({commit}, payload) {
      commit('setProjectDetail', payload)
    },
    changeProjectDetailStatus ({commit}, payload) {
      commit('projectDetailStatus', payload)
    }
  },
  getters: {

  }
}
