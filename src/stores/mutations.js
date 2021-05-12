import * as types from './mutations-types'
// import * as _ from 'lodash'

export default {
  /**
   * index
   */
  [types.SET_BCRUMB] (state, data) {
    state.bcrumb = {
      label: data.label,
      url: data.url
    }
  },
  [types.SET_PRIMARYMENU] (state, data) {
    state.primaryMenu = data
  },
  [types.SET_CURRSUBMENU] (state, data) {
    state.currSubMenu = data
  },
  [types.SET_OPENEDSUB] (state, data) {
    state.openedSub = data
  },
  /**
   * 任务
   * @param state
   * @param detail
   */
  [types.ADD_FILE_FORM] (state) {
    state.filesForm.push(state.filesTemp)
  },
  // 任务筛选
  [types.TASK_FILTER] (state, obj) {
    state.taskFilter = obj
  },
  // 任务列表
  [types.TASK_LIST] (state, data) {
    if (data.reset) {
      state.taskList = data.data
    } else {
      state.taskList = state.taskList.concat(data.data)
    }
    state.taskToolkit = data.toolkit
  },
  // 可用工具包
  [types.TASK_FN_INFO] (state, data) {
    state.taskFunctionInfo = data
  },
  // 任务首页
  [types.TASK_INDEX] (state, data) {
    let menuKey = data.menuKey
    let taskSub = {
      submenus: data.submenus,
      toolkit: data.toolkit
    }
    state.subMenus[menuKey][1].subMenus = taskSub.submenus
  },
  // 写入工具包
  [types.TASK_TOOLKIT] (state, data) {
    state.taskToolkit = data
  },
  // 修改显示的单个任务详情
  [types.TASK_DETAIL] (state, detail) {
    state.taskDetail = detail
  },
  [types.TASK_DETAIL_FORM] (state, data) {
    state.taskDetailForm = data
  },
  // 修改单个任务详情显示状态
  [types.TASK_DETAIL_STATUS] (state, data) {
    if (data || data === false) {
      state.taskDetailStatus = data
    } else {
      state.taskDetailStatus = !state.taskDetailStatus
    }
  },
  // 添加的 任务资料
  [types.SELECTED_EXTRA_OPTIONS] (state, data) {
    state.selectedExtraOption.unshift(data)
  },
  [types.SET_EXTRA_OPTIONS] (state, data) {
    state.selectedExtraOption = data
  },
  // 添加任务资料 -> 任务资料详细列表
  [types.EXTRA_DATAS] (state, params) {
    state.extraDatas.unshift(params)
  },
  [types.SET_EXTRA_DATAS] (state, data) {
    state.extraDatas = data
  },
  // 从任务资料详细列表中 删除 某 任务资料
  [types.DEDUCT_EXTRA_DATAS] (state, data) {
    const i = state.selectedExtraOption.indexOf(data)
    state.selectedExtraOption.splice(i, 1)
    state.extraDatas.splice(i, 1)
  },
  // 更新任务资料
  [types.UPDATE_EXTRA_DATA_PARAM] (state, param) {
    state.extraDatas[param.index][param.key] = param.value
  },
  // 处理任务需求
  [types.HANDLE_REQUIREMENT] (state, data) {
    state.requirement = data
  },
  // 针对 canMore 的 item 增加一项
  [types.ADD_REQUIREMENT_ITEM] (state, params) {
    let item = JSON.parse(JSON.stringify(state.requirement[params.toolkitId][params.idx].items[0]))
    item.forEach((_item, _index) => {
      if (_item.hasOwnProperty('subItems')) {
        _item.subItems.forEach((_item_, _index_) => {
          _item_.value = ''
        })
      } else {
        _item.value = ''
      }
    })
    state.requirement[params.toolkitId][params.idx].items.push(item)
  },
  // 修改 任务需求中 radio/checkbox类 选中的值
  [types.CHANGE_REQUIREMENT_SELECTED_RADIO_N_CHK] (state, params) {
    state.requirement[params.toolkitId][params.rootIdx].items[params.parentIdx][params.idx].value = params.value
  },
  [types.SET_REQUIREMENT_ITEM_VAL] (state, params) {
    if (params.hasOwnProperty('isSub')) {
      state.requirement[params.toolkitId][params.rootIdx].items[params.parentIdx][params.idx].subItems[params.isSub].value = params.value
    } else {
      state.requirement[params.toolkitId][params.rootIdx].items[params.parentIdx][params.idx].value = params.value
    }
  }
}
