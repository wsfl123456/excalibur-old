/**
 * Created by Luna_Shu on 2018/3/10.
 *
 * @author Luna_Shu
 *
 */
export const index = {
  state: {
    isSideMenu: false,
    menus: [],
    menuType: '',
    currMenu: sessionStorage.getItem('currMenu'),
    subMenuLoading: false,
    canJump: true,
    /* dashborad */
    dashboradActiveName : '',
    openDashborad : [],
    dashboradNum : 1,
    delNoticeNum: 0
  },
  mutations: {
    _toggleMenuJump (state, data) {
      state.canJump = data
    },
    _toggleSubMenuLoading (state, data) {
      state.subMenuLoading = data
    },
    _setCurrMenu (state, data) {
      state.currMenu = data
    },
    _setMenuType (state, data) {
      state.menuType = data
    },
    _setSideMenus (state, data) {
      state.menus = data
    },
    _toggleSide (state, data) {
      state.isSideMenu = data
    },
    changeDashboradActiveName(state, data) {
      state.dashboradActiveName = data
    },
    changeOpenDashborad(state, data) {
      state.openDashborad = data
      // sessionStorage.setItem('dashOpenName',data)
    },
    changeDashboradNum (state, data) {
      state.dashboradNum ++
    },
    reduceNoticeNum (state, data) {
      state.delNoticeNum ++
    }
  },
  actions: {
    toggleMenuJump ({commit}, payload) {
      commit('_toggleMenuJump', payload)
    },
    toggleSubMenuLoading ({commit}, payload) {
      commit('_toggleSubMenuLoading', payload)
    },
    setCurrMenu ({commit}, payload) {
      commit('_setCurrMenu', payload)
    },
    setMenuType ({commit}, payload) {
      commit('_setMenuType', payload)
    },
    setSideMenus ({commit}, payload) {
      commit('_setSideMenus', payload)
    },
    toggleSide ({commit}, payload) {
      commit('_toggleSide', payload)
    }
  },
  getters: {

  }
}
