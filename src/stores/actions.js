import * as types from './mutations-types'
import axios from 'axios'
import Qs from 'qs'
import {Task} from '../API/api'
import {getCookie} from '../util/util'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = "/"
/**
 * index
 */
export const setBCrumb = ({commit}, payload) => commit(types.SET_BCRUMB, payload) // 写入面包屑
export const setPrimaryMenu = ({commit}, payload) => commit(types.SET_PRIMARYMENU, payload) // 写入主菜单
export const setCurrSubMenu = ({commit}, menu) => commit(types.SET_CURRSUBMENU, menu)
export const setOpenedSub = ({commit}, sub) => commit(types.SET_OPENEDSUB, sub)
/**
 * 任务
 * @param commit
 * @param payload
 * @returns {*}
 */
export const addFileForm = ({commit}) => commit(types.ADD_FILE_FORM)
export const setTaskFilter = ({commit}, payload) => {} // 设置任务筛选
export const setTaskList = ({commit, state}, data) => {
  /* toolkitId 需与当前选择工具包一致 */
  data.data.productId = state.tasks.currentToolkitPackageId;

  commit(types.TASK_FILTER, data.data) // 重写筛选条件
  axios.post(Task.list, Qs.stringify(data.data), {headers: {'Authorization': 'Bearer ' + getCookie('token')}}).then((res) => {
    const _data = res.data
    if (_data.retCode === 0) {
      localStorage.setItem('toolkit', JSON.stringify(_data.retData.productInfo))
      commit(types.TASK_LIST, {data: _data.retData.taskInfo.data || [], toolkit: _data.retData.productInfo, reset: data.data.page === 1}) // 列表数据
      commit(types.TASK_FN_INFO, _data.retData.functionInfo) // 可用工具包
    }
    if (data.cb) {
      data.cb(_data.retData.taskInfo ? _data.retData.taskInfo.data : null, _data.retCode, _data.retData)
    }
  })
} // 设置任务列表

export const setTaskFnInfo = ({commit}, payload) => commit(types.TASK_FN_INFO, payload) // 设置可用工具包
export const taskIndex = ({commit}, payload) => commit(types.TASK_INDEX, payload) // 任务首页
export const changeTaskDetail = ({commit}, payload) => commit(types.TASK_DETAIL, payload) // 修改显示的单个任务详情
export const getTaskDetailForm = ({commit}, payload) => commit(types.TASK_DETAIL_FORM, payload)
export const changeTaskDetailStatus = ({commit}, payload) => commit(types.TASK_DETAIL_STATUS, payload) // 修改单个任务详情显示状态
export const selectExtraOptions = ({commit}, payload) => commit(types.SELECTED_EXTRA_OPTIONS, payload) // 选择要添加的 任务资料
export const setExtraOptionns = ({commit}, payload) => commit(types.SET_EXTRA_OPTIONS, payload)
export const addExtraData = ({commit}, payload) => commit(types.EXTRA_DATAS, payload) // 添加 任务资料->任务资料列表
export const setExtraData = ({commit}, payload) => commit(types.SET_EXTRA_DATAS, payload)
export const deductExtraData = ({commit}, payload) => commit(types.DEDUCT_EXTRA_DATAS, payload) // 从 任务资料列表删除
export const updateExtraDataParam = ({commit}, payload) => commit(types.UPDATE_EXTRA_DATA_PARAM, payload) // 更新 任务资料信息
export const handleRequirement = ({commit}, payload) => commit(types.HANDLE_REQUIREMENT, payload) // 处理任务需求
export const addRequirementItem = ({commit}, payload) => commit(types.ADD_REQUIREMENT_ITEM, payload) // 针对 canMore 的 item 增加一项
export const changeRequirementSelectedRadioNChk = ({commit}, payload) => commit(types.CHANGE_REQUIREMENT_SELECTED_RADIO_N_CHK, payload) // // 修改 任务需求中 radio/checkbox类 选中的值
export const setRequirementItemValue = ({commit}, payload) => commit(types.SET_REQUIREMENT_ITEM_VAL, payload)
